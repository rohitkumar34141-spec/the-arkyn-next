// pages/products/index.js
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
import OTPModal from '../../components/OTPModal'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Products(){
  const [otpOpen, setOtpOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
    // Optional: subscribe to realtime changes (if you want live updates)
    // const channel = supabase
    //   .channel('public:products')
    //   .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => loadProducts())
    //   .subscribe()
    // return () => supabase.removeChannel(channel)
  }, [])

  async function loadProducts(){
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading products:', error)
      setProducts([])
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  return (
    <>
      <Header onSignIn={() => setOtpOpen(true)} />

      <main className="max-w-[1100px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold">All Products</h1>

        {loading ? (
          <p className="mt-6">Loading products…</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>

      <Footer />
      <OTPModal open={otpOpen} onClose={() => setOtpOpen(false)} />
    </>
  )
}
