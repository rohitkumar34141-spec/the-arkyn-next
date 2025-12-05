// pages/thearkynparth-admin/index.js
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoadingSession(false);
    }
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoadingSession(false);
    });

    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  if (loadingSession) return <div className="min-h-screen flex items-center justify-center">Checking session…</div>;
  if (!session) {
    if (typeof window !== "undefined") router.push("/thearkynparth-admin/login");
    return null;
  }

  return <AdminApp />;
}

function AdminApp() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadProducts(); }, []);

  async function loadProducts() {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) return alert("Error loading products: " + error.message);
    setProducts(data || []);
    setLoading(false);
  }

  async function handleAdd() {
    const slug = `new-piece-${Date.now()}`;
    // new products are created unpublished by default
    const { error } = await supabase.from("products").insert([{
      name: "New Piece",
      slug,
      description: "",
      price: 199900,
      mrp: 249900,
      image_url: "/images/p1.jpg",
      category: "tees",
      is_featured: false,
      is_published: false
    }]);
    if (error) return alert("Add failed: " + error.message);
    loadProducts();
  }

  async function handleUpdate(id, field, value) {
    const { error } = await supabase.from("products").update({ [field]: value }).eq("id", id);
    if (error) return alert("Update failed: " + error.message);
    loadProducts();
  }

  async function handleDelete(id) {
    if (!confirm("Delete product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return alert("Delete failed: " + error.message);
    loadProducts();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">The Arkyn — Admin Panel</h1>
        <div className="flex gap-2">
          <button onClick={handleAdd} className="px-4 py-2 border rounded">+ Add Product</button>
          <button onClick={handleLogout} className="px-4 py-2 border rounded">Logout</button>
        </div>
      </header>

      {loading ? <p>Loading…</p> : (
        <div className="space-y-4">
          {products.map(p => (
            <div key={p.id} className="border p-4 rounded grid md:grid-cols-4 gap-4">
              <div className="w-32 h-40 overflow-hidden">
                <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="col-span-2">
                <input defaultValue={p.name} onBlur={(e) => handleUpdate(p.id, "name", e.target.value)} className="w-full p-2 bg-black border rounded" />
                <input defaultValue={p.slug} onBlur={(e) => handleUpdate(p.id, "slug", e.target.value)} className="w-full p-2 bg-black border rounded mt-2" />
                <textarea defaultValue={p.description} onBlur={(e) => handleUpdate(p.id, "description", e.target.value)} className="w-full p-2 bg-black border rounded mt-2" />
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <input type="number" defaultValue={p.price/100} onBlur={(e) => handleUpdate(p.id, "price", Number(e.target.value)*100)} className="p-2 bg-black border rounded" />
                  <input type="number" defaultValue={p.mrp ? p.mrp/100 : ""} onBlur={(e) => handleUpdate(p.id, "mrp", e.target.value ? Number(e.target.value)*100 : null)} className="p-2 bg-black border rounded" />
                  <input defaultValue={p.category} onBlur={(e) => handleUpdate(p.id, "category", e.target.value)} className="p-2 bg-black border rounded" />
                </div>
                <input defaultValue={p.image_url} onBlur={(e) => handleUpdate(p.id, "image_url", e.target.value)} className="w-full p-2 bg-black border rounded mt-2" />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={p.is_featured} onChange={(e) => handleUpdate(p.id, "is_featured", e.target.checked)} />
                  Featured
                </label>

                {/* Published toggle */}
                <label className="flex items-center gap-2 mt-2">
                  <input type="checkbox" defaultChecked={p.is_published} onChange={(e) => handleUpdate(p.id, "is_published", e.target.checked)} />
                  Published
                </label>

                <button onClick={() => handleDelete(p.id)} className="mt-3 px-3 py-2 border rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
