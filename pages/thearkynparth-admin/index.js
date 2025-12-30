// pages/thearkynparth-admin/index.js
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient"; 
import { useRouter } from "next/router";
import Link from "next/link";
import clientSupabase from "../../lib/supabaseClient";

// Client-side protected admin panel.
// No getServerSideProps to avoid magic-link SSR loop while debugging.

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAdmin = async () => {
      try {
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        const { data, error } = await clientSupabase.auth.getUser();

        if (error || !data?.user) {
          if (mounted) router.replace("/thearkynparth-admin/login");
          return;
        }

        const email = data.user.email || "";
        if (!adminEmail || email.toLowerCase() !== adminEmail.toLowerCase()) {
          await clientSupabase.auth.signOut();
          if (mounted) router.replace("/thearkynparth-admin/login");
          return;
        }

        if (mounted) setUser(data.user);
      } catch (err) {
        console.error("checkAdmin error:", err);
        if (mounted) router.replace("/thearkynparth-admin/login");
      } finally {
        if (mounted) setChecking(false);
      }
    };

    checkAdmin();
    return () => {
      mounted = false;
    };
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Checking admin access…
      </div>
    );
  }

  return <AdminApp user={user} />;
}

function AdminApp({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadProducts() {
    setLoading(true);
    const { data, error } = await clientSupabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Error loading products: " + error.message);
      setLoading(false);
      return;
    }
    setProducts(data || []);
    setLoading(false);
  }

  async function handleAdd() {
    const slug = `new-piece-${Date.now()}`;
    const { error } = await clientSupabase.from("products").insert([
      {
        name: "New Piece",
        slug,
        description: "",
        price: 199900,
        mrp: 249900,
        image_url: "/images/p1.jpg",
        category: "tees",
        is_featured: false,
        is_published: false,
      },
    ]);
    if (error) return alert("Add failed: " + error.message);
    loadProducts();
  }

  async function handleUpdate(id, field, value) {
    const { error } = await clientSupabase
      .from("products")
      .update({ [field]: value })
      .eq("id", id);
    if (error) return alert("Update failed: " + error.message);
    loadProducts();
  }

  async function handleDelete(id) {
    if (!confirm("Delete product?")) return;
    const { error } = await clientSupabase.from("products").delete().eq("id", id);
    if (error) return alert("Delete failed: " + error.message);
    loadProducts();
  }

  async function handleLogout() {
    await clientSupabase.auth.signOut();
    window.location.href = "/thearkynparth-admin/login";
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl">The Arkyn — Admin Panel</h1>
          <div className="text-sm text-gray-300">
            Logged in as: {user?.email}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="px-4 py-2 border rounded bg-white/5 hover:bg-white/10"
          >
            + Add Product
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border rounded bg-white/5 hover:bg-white/10"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Product list */}
      {loading ? (
        <p>Loading…</p>
      ) : (
        <div className="space-y-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="border p-4 rounded grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/2"
            >
              {/* Image */}
              <div className="w-full md:w-32 h-48 md:h-40 overflow-hidden rounded">
                <img
                  src={p.image_url || "/images/p1.jpg"}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main form */}
              <div className="col-span-1 md:col-span-2">
                <input
                  defaultValue={p.name}
                  onBlur={(e) =>
                    handleUpdate(p.id, "name", e.target.value)
                  }
                  className="w-full p-2 bg-black/20 border rounded text-white"
                  placeholder="Product name"
                />

                <input
                  defaultValue={p.slug}
                  onBlur={(e) =>
                    handleUpdate(p.id, "slug", e.target.value)
                  }
                  className="w-full p-2 bg-black/20 border rounded mt-2 text-white"
                  placeholder="slug (seo-friendly)"
                />

                <textarea
                  defaultValue={p.description}
                  onBlur={(e) =>
                    handleUpdate(p.id, "description", e.target.value)
                  }
                  className="w-full p-2 bg-black/20 border rounded mt-2 text-white"
                  placeholder="description"
                />

                <div className="grid grid-cols-3 gap-2 mt-2">
                  <input
                    type="number"
                    defaultValue={
                      p.price ? (p.price / 100).toFixed(2) : ""
                    }
                    onBlur={(e) => {
                      const v = e.target.value
                        ? Math.round(Number(e.target.value) * 100)
                        : null;
                      handleUpdate(p.id, "price", v);
                    }}
                    className="p-2 bg-black/20 border rounded text-white"
                    placeholder="price (INR)"
                  />
                  <input
                    type="number"
                    defaultValue={
                      p.mrp ? (p.mrp / 100).toFixed(2) : ""
                    }
                    onBlur={(e) => {
                      const v = e.target.value
                        ? Math.round(Number(e.target.value) * 100)
                        : null;
                      handleUpdate(p.id, "mrp", v);
                    }}
                    className="p-2 bg-black/20 border rounded text-white"
                    placeholder="mrp (INR)"
                  />
                  <input
                    defaultValue={p.category}
                    onBlur={(e) =>
                      handleUpdate(p.id, "category", e.target.value)
                    }
                    className="p-2 bg-black/20 border rounded text-white"
                    placeholder="category"
                  />
                </div>

                <input
                  defaultValue={p.image_url}
                  onBlur={(e) =>
                    handleUpdate(p.id, "image_url", e.target.value)
                  }
                  className="w-full p-2 bg-black/20 border rounded mt-2 text-white"
                  placeholder="image url"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 md:items-start">
                <div className="flex flex-col gap-2 w-full">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      defaultChecked={p.is_featured}
                      onChange={(e) =>
                        handleUpdate(p.id, "is_featured", e.target.checked)
                      }
                    />
                    Featured
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      defaultChecked={p.is_published}
                      onChange={(e) =>
                        handleUpdate(p.id, "is_published", e.target.checked)
                      }
                    />
                    Published
                  </label>
                </div>

                <div className="flex gap-2 mt-2">
                  <Link
                    href={`/thearkynparth-admin/products/${p.id}`}
                    className="px-3 py-2 bg-indigo-600 rounded text-sm font-medium"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-2 border rounded text-sm"
                  >
                    Delete
                  </button>
                </div>

                <div className="text-xs text-slate-300 mt-4">
                  ID: {p.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
