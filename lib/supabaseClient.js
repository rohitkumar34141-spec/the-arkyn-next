// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fail early if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. " +
    "Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are in your .env.local file."
  );
}

// Create the client (named export so existing code still works)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// EXPOSE SUPABASE CLIENT TO BROWSER FOR DEBUGGING (DEV ONLY)
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  // attach the client so you can run debug commands from the console
  window.supabase = supabase;
}

// optional default export for convenience (won't break named imports)
export default supabase;
