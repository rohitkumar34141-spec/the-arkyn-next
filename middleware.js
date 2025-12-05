// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow the secret unlock path
  if (pathname === "/admin/parth") {
    return NextResponse.next();
  }

  // Allow API routes (so admin can call APIs if needed)
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Protect /admin and any subpaths
  if (pathname.startsWith("/admin")) {
    // If cookie exists, allow
    const cookie = req.cookies.get("arkyn_admin")?.value;
    if (cookie) {
      return NextResponse.next();
    }

    // If no cookie, rewrite to 404 so admin is hidden
    const url = req.nextUrl.clone();
    url.pathname = "/404";
    return NextResponse.rewrite(url);
  }

  // Otherwise allow normally
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

