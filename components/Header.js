import Link from 'next/link'

export default function Header({ onSignIn }) {
  return (
    <header className="w-full max-w-[1100px] mx-auto px-4 py-4 flex items-center justify-between">
      <Link href="/" legacyBehavior>
        <a className="text-2xl heading-serif font-semibold">The Arkyn</a>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/about" legacyBehavior>
          <a className="text-sm text-gray-600">About</a>
        </Link>
        <button
          onClick={onSignIn}
          className="px-3 py-2 bg-arkyn-500 text-white rounded-lg font-semibold shadow-sm"
        >
          Sign in
        </button>
      </div>
    </header>
  )
}
