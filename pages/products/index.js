import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
import OTPModal from '../../components/OTPModal'
import products from '../../data/products'
import { useState } from 'react'

export default function Products(){
  const [otpOpen, setOtpOpen] = useState(false)

  return (
    <>
      <Header onSignIn={() => setOtpOpen(true)} />

      <main className="max-w-[1100px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold">All Products</h1>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      <Footer />
      <OTPModal open={otpOpen} onClose={() => setOtpOpen(false)} />
    </>
  )
}
