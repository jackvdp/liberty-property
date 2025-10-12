import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {createSupabaseServer} from "@/lib/db/supabase/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Use the same configuration as our createSupabaseServer
  const supabase = await createSupabaseServer()

  // Refresh session if expired - required for Server Components
  // This will automatically refresh the session token if needed
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Protect dashboard routes - require authentication
  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      // Not authenticated, redirect to login
      const loginUrl = new URL('/login', request.url)
      // Store the original URL to redirect back after login
      loginUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // If already logged in, redirect away from login page
  if (pathname === '/login' && user) {
    // Check if there's a redirectTo parameter
    const redirectTo = request.nextUrl.searchParams.get('redirectTo')
    const dashboardUrl = new URL(redirectTo || '/dashboard', request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return response
}

// Configure which routes middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
