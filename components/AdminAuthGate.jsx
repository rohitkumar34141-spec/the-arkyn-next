// components/AdminAuthGate.jsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdminAuthGate({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session || null);
      setLoading(false);
    }
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      mounted = false;
      listener?.subscription?.unsubscribe?.();
    };
  }, []);

  if (loading) return <div>Loading admin...</div>;

  if (!session) {
    if (typeof window !== "undefined") {
      window.location.href = "/thearkynparth-admin/login";
    }
    return null;
  }

  return <>{children}</>;
}
