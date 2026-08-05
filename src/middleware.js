import { NextResponse } from 'next/server';

export async function middleware(request) {
  const session = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthPage = pathname.startsWith('/admin/auth');

  // 1. Logged-in user trying to access Auth Pages (Login/Signup) -> Redirect to Dashboard
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // 2. Unauthenticated user trying to access protected Admin Pages -> Redirect to Login
  if (isAdminRoute && !isAuthPage && !session) {
    return NextResponse.redirect(new URL('/admin/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};