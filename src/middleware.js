import { NextResponse } from 'next/server';

export function middleware(request) {
  // Static assets/API bypass
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};