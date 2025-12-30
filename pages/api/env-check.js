export default function handler(req, res) {
  res.json({
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY_present: !!process.env.SUPABASE_KEY,
    PUBLIC_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    PUBLIC_KEY_present: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  });
}
