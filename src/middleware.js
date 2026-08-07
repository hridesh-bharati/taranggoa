// src\middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isAuthPage = pathname.startsWith('/admin/auth');

  // 1. Unauthenticated user trying to access /admin (except auth pages)
  if (isAdminRoute && !isAuthPage && !session) {
    return NextResponse.redirect(new URL('/admin/auth/login', request.url));
  }

  // 2. Logged in user trying to access login/signup pages
  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};