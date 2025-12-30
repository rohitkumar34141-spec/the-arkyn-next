// pages/products/[slug].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import clientSupabase from "../../lib/supabaseClient";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [otpOpen, setOtpOpen] = useState(false); // ensure OTPModal has its state

  useEffect(() => {
    if (!slug) return;
    loadProduct();
  }, [slug]);

  async function loadProduct() {
    const { data, error } = await clientSupabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      setLoading(false);
      return;
    }

    setProduct(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading…
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Product not found
      </div>
    );
  }

  const imageSrc =
    (product?.images && product.images.length > 0 && product.images[0]) ||
    product?.image_url ||
    "/images/p1.jpg";

  return (
    <>
      <Head>
        <title>{product.name} — The Arkyn</title>
        <meta
          name="description"
          content={product.description || "Premium streetwear by The Arkyn"}
        />
      </Head>

      <section className="min-h-screen bg-black text-white px-4 md:px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* IMAGE */}
          <div className="relative aspect-[3/4] bg-black overflow-hidden rounded-xl">
            {/* Badge */}
            {product.is_featured && (
              <span className="absolute top-4 left-4 z-10 bg-white/90 text-black text-xs px-3 py-1 rounded tracking-widest font-medium">
                FEATURED
              </span>
            )}

            {!product.is_published && (
              <span className="absolute top-4 left-4 z-10 bg-black/80 text-white text-xs px-3 py-1 rounded tracking-widest">
                SOLD OUT
              </span>
            )}

            <Image
              src={product.image_url || "/images/p1.jpg"}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl font-semibold leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xl md:text-2xl font-medium">
                ₹{product.price ? (product.price / 100).toFixed(0) : "—"}
              </span>

              {product.mrp && (
                <span className="text-sm md:text-base text-gray-400 line-through">
                  ₹{(product.mrp / 100).toFixed(0)}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="mt-6 text-gray-300 leading-relaxed max-w-lg">
                {product.description}
              </p>
            )}

            {/* CTA */}
            <div className="mt-8">
              {product.is_published ? (
                <button className="w-full md:w-auto px-8 py-4 bg-white text-black font-semibold rounded-md hover:bg-white/90 transition">
                  Add to Cart
                </button>
              ) : (
                <button
                  disabled
                  className="w-full md:w-auto px-8 py-4 bg-white/20 text-white/60 rounded-md cursor-not-allowed"
                >
                  Sold Out
                </button>
              )}
            </div>

            {/* Trust */}
            <div className="mt-6 text-sm text-gray-400">
              ✔ Limited release &nbsp;•&nbsp; ✔ Premium fabric &nbsp;•&nbsp; ✔ Easy returns
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
