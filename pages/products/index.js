import Image from "next/image";
// pages/products/index.js
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import clientSupabase from "../../lib/supabaseClient";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const { data, error } = await clientSupabase
      .from("products")
      .select("*")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setProducts(data || []);
    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>The Arkyn — Products</title>
        <meta
          name="description"
          content="Explore premium streetwear from The Arkyn. Slow releases, thoughtful pieces."
        />
      </Head>

      <section className="min-h-screen bg-black text-white px-4 md:px-8 py-12">
        <header className="max-w-7xl mx-auto mb-10">
          <h1 className="text-2xl md:text-4xl font-semibold">
            Our Collection
          </h1>
          <p className="mt-2 text-gray-400 max-w-xl">
            Slow releases. Limited quantities. Crafted with intention.
          </p>
        </header>

        {loading ? (
          <p className="text-center text-gray-400">Loading…</p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group block"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden rounded-lg">
                {/* FEATURED badge */}
{product.is_featured && (
  <span className="absolute top-3 left-3 z-10 bg-white/90 text-black text-[10px] px-2 py-1 rounded tracking-widest font-medium">
    FEATURED
  </span>
)}

{/* SOLD OUT badge */}
{!product.is_published && (
  <span className="absolute top-3 left-3 z-10 bg-black/80 text-white text-[10px] px-2 py-1 rounded tracking-widest">
    SOLD OUT
  </span>
)}
                  <Image
  src={product.image_url || "/images/p1.jpg"}
  alt={product.name}
  fill
  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
/>
                </div>

                {/* Text */}
                <div className="mt-3 px-1">
                  <h3 className="text-sm md:text-base font-medium leading-snug">
                    {product.name}
                  </h3>

                  <div className="mt-1 text-xs md:text-sm text-gray-400">
                    ₹{product.price ? (product.price / 100).toFixed(0) : "—"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
