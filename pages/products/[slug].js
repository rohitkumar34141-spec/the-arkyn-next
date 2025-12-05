// pages/products/[slug].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OTPModal from "../../components/OTPModal";

export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [otpOpen, setOtpOpen] = useState(false); // ensure OTPModal has its state

  useEffect(() => {
    if (!router.isReady) return;
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, slug]);

  async function loadProduct() {
    setLoading(true);
    setErrorMsg("");
    setProduct(null);

    try {
      if (!slug) {
        setErrorMsg("Missing product identifier.");
        setLoading(false);
        return;
      }

      const decoded = decodeURIComponent(slug).trim();

      async function tryQuery(builder) {
        const { data, error } = await builder.maybeSingle();
        if (error) console.warn("Query error:", error);
        return data || null;
      }

      let row = await tryQuery(
        supabase.from("products").select("*").eq("slug", decoded)
      );

      if (!row) {
        row = await tryQuery(
          supabase.from("products").select("*").ilike("slug", decoded)
        );
      }

      if (!row) {
        const altSpace = decoded.replace(/-/g, " ").replace(/\s+/g, " ").trim();
        const altDash = decoded.replace(/\s+/g, "-").trim();
        if (altSpace !== decoded) {
          row = await tryQuery(
            supabase.from("products").select("*").ilike("slug", altSpace)
          );
        }
        if (!row && altDash !== decoded) {
          row = await tryQuery(
            supabase.from("products").select("*").ilike("slug", altDash)
          );
        }
      }

      if (!row) {
        row = await tryQuery(
          supabase.from("products").select("*").ilike("name", `%${decoded}%`)
        );
      }

      if (!row) {
        setErrorMsg("Product not found.");
      } else {
        setProduct(row);
      }
    } catch (err) {
      console.error("Unexpected error loading product:", err);
      setErrorMsg("Failed to load product.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <>
        <Header onSignIn={() => setOtpOpen(true)} />
        <main className="max-w-[1100px] mx-auto px-4 py-6">Loading...</main>
        <Footer />
        <OTPModal open={otpOpen} onClose={() => setOtpOpen(false)} />
      </>
    );
  }

  if (errorMsg) {
    return (
      <>
        <Header onSignIn={() => setOtpOpen(true)} />
        <main className="max-w-[1100px] mx-auto px-4 py-6">
          <p className="text-red-500">{errorMsg}</p>
          <p className="mt-4">
            Try visiting <a href="/products" className="underline">All Products</a>.
          </p>
        </main>
        <Footer />
        <OTPModal open={otpOpen} onClose={() => setOtpOpen(false)} />
      </>
    );
  }

  const imageSrc =
    (product?.images && product.images.length > 0 && product.images[0]) ||
    product?.image_url ||
    "/images/p1.jpg";

  return (
    <>
      <Header onSignIn={() => setOtpOpen(true)} />
      <main className="max-w-[1100px] mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <img
              src={imageSrc}
              alt={product?.name || product?.title || "Product"}
              className="w-full object-cover"
              onError={(e) => (e.currentTarget.src = "/images/p1.jpg")}
            />
          </div>

          <div className="col-span-2">
            <h1 className="text-2xl font-semibold mb-2">{product?.name || product?.title}</h1>
            <p className="text-gray-400 mb-4">Category: {product?.category || "—"}</p>
            <p className="mb-4">{product?.description}</p>
            {typeof product?.price !== "undefined" && product?.price !== null ? (
              <p className="text-xl font-bold">₹{(product.price / 100).toFixed(2)}</p>
            ) : (
              <p className="text-xl font-bold">Price not set</p>
            )}
          </div>
        </div>
            </main>
      <Footer />
      <OTPModal open={otpOpen} onClose={() => setOtpOpen(false)} />
    </>
  );
}
