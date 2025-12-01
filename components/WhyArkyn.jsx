"use client";

export default function WhyArkyn() {
  return (
    <section
      style={{
        background: "#050505",
        color: "#fff",
        padding: "60px 80px",
        borderTop: "1px solid #181818",
        borderBottom: "1px solid #181818",
      }}
    >
      {/* Small label */}
      <p
        style={{
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontSize: "11px",
          color: "#f5b607",
          margin: 0,
        }}
      >
        Why The Arkyn
      </p>

      {/* Heading + subtitle */}
      <div style={{ marginTop: "10px", marginBottom: "30px", maxWidth: "640px" }}>
        <h2 style={{ fontSize: "30px", margin: "0 0 10px" }}>
          Slow releases. Thoughtful pieces.
        </h2>
        <p style={{ margin: 0, color: "#b3b3b3", fontSize: "14px", lineHeight: 1.6 }}>
          The Arkyn is built for people who don’t chase trends. We release in small
          batches, refine every fit, and focus on pieces that stay in your wardrobe
          for years — not weeks.
        </p>
      </div>

      {/* 3 pillars */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "28px",
        }}
      >
        {/* Card 1 */}
        <div
          style={{
            background: "#0c0c0c",
            borderRadius: "14px",
            border: "1px solid #222",
            padding: "18px 18px 20px",
          }}
        >
          <h3 style={{ margin: "0 0 8px", fontSize: "17px" }}>
            Limited, not loud.
          </h3>
          <p style={{ margin: 0, color: "#b3b3b3", fontSize: "13px", lineHeight: 1.7 }}>
            Each drop is small-batch only. Once a run is gone, it doesn’t return in the
            same form — keeping your pieces quietly rare.
          </p>
        </div>

        {/* Card 2 */}
        <div
          style={{
            background: "#0c0c0c",
            borderRadius: "14px",
            border: "1px solid #222",
            padding: "18px 18px 20px",
          }}
        >
          <h3 style={{ margin: "0 0 8px", fontSize: "17px" }}>
            Built to be worn hard.
          </h3>
          <p style={{ margin: 0, color: "#b3b3b3", fontSize: "13px", lineHeight: 1.7 }}>
            Fabrics, hardware and stitching are chosen to handle late nights, city
            weather and repeat wear without falling apart.
          </p>
        </div>

        {/* Card 3 */}
        <div
          style={{
            background: "#0c0c0c",
            borderRadius: "14px",
            border: "1px solid #222",
            padding: "18px 18px 20px",
          }}
        >
          <h3 style={{ margin: "0 0 8px", fontSize: "17px" }}>
            Designed to stay relevant.
          </h3>
          <p style={{ margin: 0, color: "#b3b3b3", fontSize: "13px", lineHeight: 1.7 }}>
            No screaming logos. No seasonal noise. Just silhouettes that still look
            right three winters from now.
          </p>
        </div>
      </div>
    </section>
  );
}
