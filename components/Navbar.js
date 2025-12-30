"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-20 md:h-24 bg-black border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        
        {/* LOGO + BRAND TEXT */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="The Arkyn"
            width={69}
            height={69}
            priority
          />
          <span className="text-white font-medium text-lg md:text-xl tracking-[0.18em] whitespace-nowrap">
  THE ARKYN
</span>
        </div>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>
      </div>

    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-white font-medium hover:text-neutral-300 transition-colors"
    >
      {children}
    </Link>
  );
}
