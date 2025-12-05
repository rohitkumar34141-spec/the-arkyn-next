// pages/thearkynparth-admin/login.js
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminLogin() {
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_ADMIN_EMAIL || "");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleSend(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    // send magic link and redirect back to /thearkynparth-admin
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/thearkynparth-admin`
      }
    });

    if (error) {
      setMsg("Error sending magic link: " + error.message);
    } else {
      setMsg("Magic link sent — check your email.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSend} className="p-6 bg-neutral-900 rounded w-full max-w-sm">
        <h2 className="text-xl mb-4">The Arkyn — Admin Login</h2>

        <input
          type="email"
          placeholder="your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 bg-black border border-neutral-700 rounded"
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-white text-black rounded"
          disabled={loading}
        >
          {loading ? "Sending…" : "Send magic link"}
        </button>

        <p className="text-sm mt-3">{msg}</p>
      </form>
    </div>
  );
}
