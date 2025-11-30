// components/Hero.js
import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Cinematic Dark Hero for The Arkyn
 * - Full-bleed hero with gradient overlay
 * - Subtle parallax on the background image
 * - Big serif headline, tagline, CTA
 *
 * Expects: public/images/hero.jpg (wide 16:9)
 */

export default function Hero({ onExplore = () => (window.location = "/products") }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function onScroll() {
      setOffset(window.pageYOffset * 0.25);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section aria-label="Hero — The Arkyn" className="relative overflow-hidden bg-black text-white">
      {/* Background image with subtle parallax */}
      <div
        className="absolute inset-0 transform-gpu will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        aria-hidden="true"
      >
        <img
          src="/images/hero.jpg"
          alt="The Arkyn collection"
          className="w-full h-[70vh] md:h-[86vh] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 py-20 md:py-32">
        <div className="max-w-3xl">
          <p className="text-sm tracking-widest text-amber-300/80 mb-4">LIMITED RELEASE • MADE IN SMALL BATCHES</p>

          <h1 className="heading-serif text-white text-4xl md:text-6xl leading-tight font-semibold drop-shadow-lg">
            The Arkyn
          </h1>

          <p className="mt-4 text-gray-200 text-base md:text-lg max-w-xl">
            Slow releases. Thoughtful pieces. Modern silhouettes crafted for everyday refinement.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onExplore}
              className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400/95 text-black font-semibold rounded-md shadow-2xl transform-gpu active:scale-95"
            >
              Explore Collection
            </button>

            <Link href="/about" legacyBehavior>
              <a className="inline-flex items-center px-4 py-3 border border-white/20 rounded-md text-sm text-white/90 hover:bg-white/5">
                Our Story
              </a>
            </Link>
          </div>

          <div className="mt-8 flex gap-3 items-center">
            <div className="flex -space-x-3">
              <img src="/images/p1.jpg" className="w-14 h-14 object-cover rounded-md ring-2 ring-black" alt="sample" />
              <img src="/images/p2.jpg" className="w-14 h-14 object-cover rounded-md ring-2 ring-black" alt="sample" />
              <img src="/images/p3.jpg" className="w-14 h-14 object-cover rounded-md ring-2 ring-black" alt="sample" />
            </div>

            <span className="text-sm text-gray-300/80 ml-3">Join the waitlist for first access</span>
          </div>
        </div>
      </div>

      {/* Decorative bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 120" className="w-full h-10 md:h-16" preserveAspectRatio="none">
          <path d="M0 0 C300 80 1140 0 1440 80 L1440 120 L0 120 Z" fill="rgba(0,0,0,0.9)" />
        </svg>
      </div>
    </section>
  );
}
