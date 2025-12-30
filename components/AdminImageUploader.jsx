// components/AdminImageUploader.jsx
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { createClient } from '@supabase/supabase-js'
import { resizeImage } from '../lib/imageResize'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function AdminImageUploader({ productId, bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'product-images', onComplete }) {
  const [uploading, setUploading] = useState(false)
  const [progressText, setProgressText] = useState('')
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState(null)

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return
    setError(null)
    setUploading(true)
    try {
      const file = acceptedFiles[0]
      setPreview(URL.createObjectURL(file))
      setProgressText('Resizing images...')

      // sizes
      const large = await resizeImage(file, 1200, 1200, 0.9)
      const medium = await resizeImage(file, 800, 800, 0.85)
      const thumb = await resizeImage(file, 320, 320, 0.8)

      const timestamp = Date.now()
      const baseName = `${productId || 'tmp'}-${timestamp}-${uuidv4()}`

      setProgressText('Uploading large...')
      const largePath = `products/${baseName}-lg.jpg`
      const { error: largeErr } = await supabase.storage.from(bucket).upload(largePath, large, { cacheControl: '3600', upsert: true })
      if (largeErr) throw largeErr

      setProgressText('Uploading medium...')
      const mediumPath = `products/${baseName}-md.jpg`
      const { error: mediumErr } = await supabase.storage.from(bucket).upload(mediumPath, medium, { cacheControl: '3600', upsert: true })
      if (mediumErr) throw mediumErr

      setProgressText('Uploading thumb...')
      const thumbPath = `products/${baseName}-th.jpg`
      const { error: thumbErr } = await supabase.storage.from(bucket).upload(thumbPath, thumb, { cacheControl: '3600', upsert: true })
      if (thumbErr) throw thumbErr

      setProgressText('Generating public URLs...')
      const largeUrl = supabase.storage.from(bucket).getPublicUrl(largePath).data.publicUrl
      const mediumUrl = supabase.storage.from(bucket).getPublicUrl(mediumPath).data.publicUrl
      const thumbUrl = supabase.storage.from(bucket).getPublicUrl(thumbPath).data.publicUrl

      setProgressText('Saving product record...')
      if (productId) {
        const { error: updateErr } = await supabase
          .from('products')
          .update({ image_url: mediumUrl })
          .eq('id', productId)
        if (updateErr) throw updateErr
      }

      setProgressText('Done')
      setUploading(false)
      if (onComplete) onComplete({ largeUrl, mediumUrl, thumbUrl })
    } catch (err) {
      console.error('Upload error', err)
      setError(err.message || String(err))
      setUploading(false)
      setProgressText('')
    }
  }, [productId, bucket, onComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
    maxSize: 8 * 1024 * 1024
  })

  return (
    <div className="w-full max-w-lg">
      <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer ${isDragActive ? 'border-black bg-gray-50' : 'border-slate-200'}`}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M7 16V7a4 4 0 118 0v9m-4 0v4"/></svg>
          <p className="text-sm text-slate-600">Drag & drop an image here, or click to select</p>
          <p className="text-xs text-slate-400">We create medium & thumbnail automatically and update product image.</p>
        </div>
      </div>

      <div className="mt-4">
        {preview && (
          <div className="flex gap-3 items-center">
            <img src={preview} alt="preview" className="w-24 h-24 object-cover rounded-md border" />
            <div>
              <div className="text-sm text-slate-700">{uploading ? 'Uploading...' : 'Preview'}</div>
              <div className="text-xs text-slate-500">{progressText}</div>
            </div>
          </div>
        )}

        {uploading && (
          <div className="mt-2">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-pink-500" style={{ width: '60%' }} />
            </div>
          </div>
        )}

        {error && (
          <div className="mt-2 text-sm text-red-600">Error: {error}</div>
        )}
      </div>
    </div>
  )
}
