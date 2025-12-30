// lib/imageResize.js
export async function resizeImage(file, maxWidth, maxHeight, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      let { width, height } = img
      const ratio = Math.min(maxWidth / width, maxHeight / height, 1)
      const newWidth = Math.round(width * ratio)
      const newHeight = Math.round(height * ratio)

      const canvas = document.createElement('canvas')
      canvas.width = newWidth
      canvas.height = newHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Canvas is empty'))
          const ext = 'jpg'
          const resizedFile = new File([blob], `${file.name.replace(/\.[^/.]+$/, '')}.${ext}`, { type: 'image/jpeg', lastModified: Date.now() })
          resolve(resizedFile)
        },
        'image/jpeg',
        quality
      )
      URL.revokeObjectURL(url)
    }
    img.onerror = (e) => {
      URL.revokeObjectURL(url)
      reject(e)
    }
    img.src = url
  })
}
