import Header from '../components/Header'
import Footer from '../components/Footer'
import OTPModal from '../components/OTPModal'
import { useState } from 'react'

export default function About(){
  const [otpOpen, setOtpOpen] = useState(false)

  return (
    <>
      <Header onSignIn={() => setOtpOpen(true)} />

      <main className="max-w-[800px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold">About The Arkyn</h1>
        <p className="text-gray-600 mt-3">
          The Arkyn launches limited collections built from responsible materials.
          We curate small runs — join the waitlist to be notified.
        </p>
      </main>

      <Footer />
      <OTPModal open={otpOpen} onClose={() => setOtpOpen(false)} />
    </>
  )
}
