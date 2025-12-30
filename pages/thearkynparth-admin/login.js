// pages/thearkynparth-admin/login.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../lib/supabaseClient";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState(process.env.NEXT_PUBLIC_ADMIN_EMAIL || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ On mount: if already logged in as admin, go to dashboard
  useEffect(() => {
    const checkSession = async () => {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) return;

      const userEmail = data.user.email || "";
      if (
        adminEmail &&
        userEmail.toLowerCase() === adminEmail.toLowerCase()
      ) {
        router.replace("/thearkynparth-admin");
      }
    };

    checkSession();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMsg("");

    try {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (!adminEmail) {
        setErrorMsg("Admin email is not configured on the server.");
        setLoading(false);
        return;
      }

      if (email.toLowerCase() !== adminEmail.toLowerCase()) {
        setErrorMsg("Only the admin email is allowed to log in.");
        setLoading(false);
        return;
      }

      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/thearkynparth-admin/login`
          : undefined; // 👈 redirect BACK to this login page

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error(error);
        setErrorMsg(error.message || "Something went wrong sending the magic link.");
      } else {
        setMessage("Magic link sent! Open the email on this same browser.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Unexpected error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff" }}>
      {/* keep your navbar here if you had it */}
      <main
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            padding: 24,
            borderRadius: 12,
            background: "#111",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
          }}
        >
          <h1 style={{ marginBottom: 16, fontSize: 22 }}>
            The Arkyn — Admin Login
          </h1>
          <p style={{ marginBottom: 12, fontSize: 13 }}>
            Enter the admin email to receive a magic link.
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4, fontSize: 13 }}>
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: 10,
                  borderRadius: 6,
                  border: "1px solid #444",
                  background: "#000",
                  color: "#fff",
                }}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 8,
                border: "none",
                marginTop: 8,
                cursor: "pointer",
                background: "#fff",
                color: "#000",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Sending magic link..." : "Send magic link"}
            </button>
          </form>

          <p style={{ marginTop: 10, fontSize: 12, color: "#aaa" }}>
            After clicking the magic link, it must open in the{" "}
            <span style={{ fontWeight: 600 }}>same browser</span>.
          </p>

          {message && (
            <p style={{ marginTop: 12, color: "lightgreen", fontSize: 13 }}>
              {message}
            </p>
          )}
          {errorMsg && (
            <p style={{ marginTop: 12, color: "salmon", fontSize: 13 }}>
              {errorMsg}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
