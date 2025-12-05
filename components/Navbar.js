"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      padding: "15px 30px",
      borderBottom: "1px solid #222",
      background: "#000",
      color: "#fff",
      justifyContent: "space-between",
    }}>
      
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Image 
          src="/images/logo.png" 
          alt="The Arkyn Logo" 
          width={60} 
          height={60}
        />
        <h1 style={{ fontSize: "20px", margin: 0 }}>THE ARKYN</h1>
      </div>

      {/* Menu */}
      <div style={{ display: "flex", gap: "25px", fontSize: "16px" }}>
        <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
        <Link href="/products" style={{ color: "#fff", textDecoration: "none" }}>Products</Link>
        <Link href="/about" style={{ color: "#fff", textDecoration: "none" }}>About</Link>

      </div>

    </nav>
  );
}
