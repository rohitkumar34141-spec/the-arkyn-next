import { useState } from 'react'

export default function OTPModal({ open, onClose }) {
  const [step, setStep] = useState(0)

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500">✕</button>

        <h3 className="text-lg font-semibold">Sign in to The Arkyn</h3>
        <p className="text-sm text-gray-500">Enter your mobile number to continue.</p>

        {step === 0 && (
          <div className="mt-4">
            <input className="w-full p-3 border rounded-md" placeholder="+91 98765 43210" />

            <button
              onClick={() => setStep(1)}
              className="w-full mt-4 py-2 bg-arkyn-500 text-white rounded-md"
            >
              Send Code
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="mt-4">
            <p className="text-gray-600">Enter 6-digit code</p>

            <div className="flex gap-2 mt-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <input key={i} maxLength={1} className="w-10 h-10 border rounded-md text-center" />
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 border py-2 rounded-md"
                onClick={() => setStep(0)}
              >
                Back
              </button>

              <button
                onClick={() => { alert("Design demo complete!"); onClose(); }}
                className="flex-1 bg-arkyn-500 text-white py-2 rounded-md"
              >
                Verify
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
