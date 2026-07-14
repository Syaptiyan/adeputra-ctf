import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protected routes that require authentication
  const protectedPaths = ['/challenges', '/leaderboard', '/profile']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  // Admin routes - require admin role
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')

  if (isProtectedPath) {
    // Redirect to login if not authenticated
    if (!user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Check if email is verified
    if (!user.email_confirmed_at) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/unverified'
      return NextResponse.redirect(redirectUrl)
    }
  }

  if (isAdminPath) {
    // Redirect to login if not authenticated
    if (!user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Check if email is verified
    if (!user.email_confirmed_at) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/unverified'
      return NextResponse.redirect(redirectUrl)
    }

    // Check admin role using RPC
    const { data: isAdmin, error } = await supabase.rpc('is_admin', {
      p_user_id: user.id
    })

    if (error || !isAdmin) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/'
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Redirect authenticated users away from login/register
  if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
    if (user && user.email_confirmed_at) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/challenges'
      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}

export const config = {
  matcher: [
    '/challenges/:path*',
    '/leaderboard/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/change-email',
    '/login',
    '/register',
  ],
}
