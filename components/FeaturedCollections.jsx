"use client";

import Image from "next/image";

export default function FeaturedCollections() {
  return (
    <section
      style={{
        background: "#000",
        color: "#fff",
        padding: "60px 80px",
        borderTop: "1px solid #181818",
        borderBottom: "1px solid #181818",
      }}
    >
      {/* Section Heading */}
      <div style={{ marginBottom: "30px" }}>
        <p style={{ letterSpacing: "0.2em", color: "#f5b607", fontSize: "12px" }}>
          CURATED DROPS • LIMITED PIECES
        </p>
        <h2 style={{ fontSize: "32px", margin: "5px 0 10px" }}>Featured Collections</h2>
        <p style={{ maxWidth: "480px", color: "#aaa", fontSize: "14px" }}>
          Explore silhouettes, outerwear and accessories crafted for slow, deliberate wardrobes.
        </p>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "24px",
        }}
      >
        {/* p1 – Streetwear silhouette */}
        <div
          style={{
            background: "#101010",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid #222",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "260px" }}>
            <Image
              src="/images/p1.jpg"
              alt="Streetwear silhouette"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "18px 20px" }}>
            <h3 style={{ margin: 0, fontSize: "18px" }}>Shadow Silhouettes</h3>
            <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#bbb" }}>
              Clean lines, dark tones, built for late-night city walks.
            </p>
          </div>
        </div>

        {/* p2 – Jacket close-up */}
        <div
          style={{
            background: "#101010",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid #222",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "260px" }}>
            <Image
              src="/images/p2.jpg"
              alt="Jacket close-up"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "18px 20px" }}>
            <h3 style={{ margin: 0, fontSize: "18px" }}>Outerwear Focus</h3>
            <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#bbb" }}>
              Textures, hardware and cuts that age beautifully over time.
            </p>
          </div>
        </div>

        {/* p3 – Dark accessories */}
        <div
          style={{
            background: "#101010",
            borderRadius: "14px",
            overflow: "hidden",
            border: "1px solid #222",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "260px" }}>
            <Image
              src="/images/p3.jpg"
              alt="Dark accessories"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "18px 20px" }}>
            <h3 style={{ margin: 0, fontSize: "18px" }}>Signal Accessories</h3>
            <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#bbb" }}>
              Subtle details that quietly say everything about your taste.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
