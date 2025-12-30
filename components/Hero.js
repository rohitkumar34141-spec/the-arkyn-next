// components/Hero.js
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Hero({ onExplore }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const title = document.getElementById("arkyn-hero-title");

    const onScroll = () => {
      const y = window.scrollY;
      const isMobile = window.innerWidth < 768;

      // Parallax background (existing behavior)
      setOffset(y * (isMobile ? 0.1 : 0.25));

      // Luxury letter-spacing animation
      if (title) {
        const maxScroll = 280;
        const progress = Math.min(y / maxScroll, 1);

        const start = 0.22; // airy spacing
        const end = 0.04; // tight spacing

        const value = start - (start - end) * progress;
        title.style.letterSpacing = `${value}em`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleExplore =
    onExplore ?? (() => (window.location.href = "/products"));

  return (
    <section
      aria-label="Hero - The Arkyn"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Background */}
      <div
        className="absolute left-0 right-0 top-20 md:top-24 bottom-0 transform-gpu will-change-transform"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
        aria-hidden="true"
      >
        <Image
  src="/images/hero.jpg"
  alt="The Arkyn collection"
  fill
  priority
  sizes="(max-width: 768px) 100vw, 1200px"
  className="object-contain object-right"
 />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-8 pt-14 md:pt-16 pb-32">
        <div className="max-w-3xl text-center md:text-left">
          <p className="text-xs sm:text-sm tracking-widest text-amber-300/80 mb-4">
            LIMITED RELEASE • MADE IN SMALL BATCHES
          </p>

          <h1
            id="arkyn-hero-title"
            className="heading-serif text-white text-3xl sm:text-4xl md:text-6xl leading-tight font-semibold drop-shadow-lg tracking-[0.22em]"
          >
            THE ARKYN
          </h1>

          <p className="mt-4 text-gray-200 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
            Slow releases. Thoughtful pieces. Modern silhouettes crafted for
            everyday refinement.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <button
              onClick={handleExplore}
              className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-400/95 text-black font-semibold rounded-md shadow-2xl transform-gpu active:scale-95"
            >
              Explore Collection
            </button>

            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 border border-white/20 rounded-md text-sm text-white/90 hover:bg-white/5"
            >
              Our Story
            </Link>
          </div>

          <div className="mt-8 flex gap-3 items-center justify-center md:justify-start relative z-[50]">
            <div className="flex -space-x-3">
              <img
                src="/images/p1.jpg"
                className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-md ring-2 ring-black"
                alt="sample"
              />
              <img
                src="/images/p2.jpg"
                className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-md ring-2 ring-black"
                alt="sample"
              />
              <img
                src="/images/p3.jpg"
                className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-md ring-2 ring-black"
                alt="sample"
              />
            </div>
            <span className="text-sm text-gray-300/80 ml-3">
              Join the waitlist for first access
            </span>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-10 md:h-16"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0 C300 80 1140 0 1440 80 L1440 120 L0 120 Z"
            fill="rgba(0,0,0,0.9)"
          />
        </svg>
      </div>
    </section>
  );
}
