import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Admin(){
  return (
    <>
      <Header />
      <main className="max-w-[800px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold">Admin (Coming Soon)</h1>
        <p className="text-gray-600 mt-2">
          Here you will be able to manage products, stock status, and notifications.
        </p>
      </main>
      <Footer />
    </>
  )
}
