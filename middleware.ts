import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If no session and trying to access protected routes, redirect to login
  if (
    !session &&
    (req.nextUrl.pathname.startsWith("/dashboard") ||
      req.nextUrl.pathname.startsWith("/admin") ||
      req.nextUrl.pathname.startsWith("/tournaments/create"))
  ) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // For admin routes, check if user is admin
  if (session && req.nextUrl.pathname.startsWith("/admin")) {
    // Get user profile to check admin status
    const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", session.user.id).single()

    // If not admin, redirect to dashboard
    if (!profile?.is_admin) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = "/dashboard"
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}

// Specify which routes this middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/tournaments/create"],
}

