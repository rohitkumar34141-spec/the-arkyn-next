import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import OTPModal from '../../components/OTPModal'
import { useState } from 'react'
import products from '../../data/products'

export default function ProductDetail(){
  const router = useRouter()
  const { slug } = router.query
  const product = products.find(p => p.slug === slug)
  const [otpOpen, setOtpOpen] = useState(false)

  if (!product) return <p>Loading...</p>

  return (
    <>
      <Header onSignIn={() => setOtpOpen(true)} />

      <main className="max-w-[800px] mx-auto px-4 py-6">
        <img
          src={product.images[0]}
          className="w-full h-72 object-cover rounded-xl card"
        />

        <h1 className="text-2xl font-semibold mt-4">{product.title}</h1>
        <p className="text-gray-500 mt-1">{product.description}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="text-lg font-bold">
            {product.in_stock ? (product.mrp ? `₹${product.mrp}` : "In stock") : "Coming Soon"}
          </div>

          {!product.in_stock ? (
            <button
              onClick={() => setOtpOpen(true)}
              className="px-4 py-2 bg-arkyn-500 text-white rounded-md"
            >
              Notify Me
            </button>
          ) : (
            <button className="px-4 py-2 bg-arkyn-500 text-white rounded-md">Add to Cart</button>
          )}
        </div>
      </main>

      <Footer />
      <OTPModal open={otpOpen} onClose={() => setOtpOpen(false)} />
    </>
  )
}
