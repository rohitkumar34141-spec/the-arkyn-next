// pages/thearkynparth-admin/products/[id].js
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import AdminImageUploader from '../../../components/AdminImageUploader'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function ProductEditPage() {
  const router = useRouter()
  const { id } = router.query
  const [product, setProduct] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState(null)

  useEffect(() => {
  if (!id) return

  (async () => {
    // DEBUG: check current Supabase auth user/session
    try {
      const userRes = await supabase.auth.getUser()
      console.log('DEBUG supabase.auth.getUser():', userRes) // <-- look for userRes.data.user.email
    } catch (err) {
      console.error('DEBUG getUser error', err)
    }

    const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
    if (error) {
      console.error(error)
      setMsg('Failed to load product')
      return
    }
    setProduct(data)
  })()
}, [id])

  const save = async () => {
    if (!product) return
    setSaving(true)
    setMsg(null)
    const { data, error } = await supabase.from('products').update({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      mrp: product.mrp,
      category: product.category,
      is_featured: product.is_featured,
      is_published: product.is_published
    }).eq('id', id).select().single()
    setSaving(false)
    if (error) {
      console.error(error)
      setMsg('Save failed: ' + error.message)
    } else {
      setProduct(data)
      setMsg('Saved successfully')
    }
  }

  if (!id) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
  <h1 className="text-2xl font-semibold">Edit Product</h1>
  <Link href="/thearkynparth-admin" className="text-sm underline">← Back to list</Link>
</div>

      {!product ? (
        <div>Loading product...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium">Name</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value={product.name || ''} onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))} />

            <label className="block text-sm font-medium mt-4">Slug</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value={product.slug || ''} onChange={(e) => setProduct(prev => ({ ...prev, slug: e.target.value }))} />

            <label className="block text-sm font-medium mt-4">Description</label>
            <textarea rows="6" className="w-full border rounded px-3 py-2 mt-1" value={product.description || ''} onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))} />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">Price (INR paise)</label>
                <input type="number" className="w-full border rounded px-3 py-2 mt-1" value={product.price || 0} onChange={(e) => setProduct(prev => ({ ...prev, price: Number(e.target.value) }))} />
              </div>
              <div>
                <label className="block text-sm font-medium">MRP (INR paise)</label>
                <input type="number" className="w-full border rounded px-3 py-2 mt-1" value={product.mrp || 0} onChange={(e) => setProduct(prev => ({ ...prev, mrp: Number(e.target.value) }))} />
              </div>
            </div>

            <label className="block text-sm font-medium mt-4">Category</label>
            <input className="w-full border rounded px-3 py-2 mt-1" value={product.category || ''} onChange={(e) => setProduct(prev => ({ ...prev, category: e.target.value }))} />

            <div className="flex items-center gap-4 mt-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={Boolean(product.is_featured)} onChange={(e) => setProduct(prev => ({ ...prev, is_featured: e.target.checked }))} />
                <span className="text-sm">Featured</span>
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" checked={Boolean(product.is_published)} onChange={(e) => setProduct(prev => ({ ...prev, is_published: e.target.checked }))} />
                <span className="text-sm">Published</span>
              </label>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={save} className="px-4 py-2 rounded bg-black text-white" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</button>
              <button onClick={() => router.reload()} className="px-4 py-2 rounded border">Reload</button>
              {msg && <div className="text-sm text-slate-700 ml-3">{msg}</div>}
            </div>
          </div>

          <aside className="space-y-4">
            <div>
              <div className="text-sm font-medium">Current Image</div>
              <div className="mt-2">
                <img src={product.image_url || '/images/p1.jpg'} alt="current" className="w-48 h-48 object-cover rounded-md border" />
              </div>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Upload new image</div>
              <AdminImageUploader productId={id} onComplete={(images) => {
                // update local preview with new medium URL
                setProduct(prev => ({ ...prev, image_url: images.mediumUrl }))
                setMsg('Image uploaded')
              }} />
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}
