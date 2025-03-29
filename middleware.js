import { NextResponse } from "next/server"

// Add paths that require authentication
const protectedPaths = ["/dashboard", "/bookings", "/profile"]

// Add paths that should redirect if already authenticated
const authPaths = ["/login", "/signup"]

export async function middleware(request) {
  // For the preview environment, we'll let client-side auth handle redirects
  // This is because we're using localStorage for auth in the preview
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/bookings/:path*", "/profile/:path*", "/login", "/signup"],
}

