export default function Hero({ onExplore }) {
  return (
    <section className="max-w-[1100px] mx-auto px-4 mb-6">
      <div className="card p-5 flex gap-4 items-center bg-gradient-to-b from-emerald-50 to-white">
        <div className="flex-1">
          <h1 className="heading-serif text-2xl font-semibold">
            Slow releases. Thoughtful pieces.
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Exclusive drops, ethically sourced materials — preview our upcoming collection.
          </p>

          <button onClick={onExplore} className="mt-4 px-4 py-2 bg-arkyn-500 text-white rounded-md">
            Explore Collection
          </button>
        </div>

        <img
          src="/images/p1.jpg"
          alt="hero"
          className="w-36 h-28 rounded-lg object-cover"
        />
      </div>
    </section>
  )
}
