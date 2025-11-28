import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import OTPModal from '../components/OTPModal'
import products from '../data/products'

export default function Home(){
  const [otpOpen, setOtpOpen] = useState(false)

  return (
    <>
      <Header onSignIn={() => setOtpOpen(true)} />

      <Hero onExplore={() => window.scrollTo({top: 700, behavior:'smooth'})} />

      <section className="max-w-[1100px] mx-auto px-4">
        <h2 className="text-lg font-semibold">New arrivals</h2>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <Footer />
      <OTPModal open={otpOpen} onClose={() => setOtpOpen(false)} />
    </>
  )
}
