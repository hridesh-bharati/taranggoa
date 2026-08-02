import { NextResponse } from 'next/server';

export function middleware(request) {
  return NextResponse.next();
}

// जिन रूट्स पर मिडलवेयर चलाना हो (ऑप्शनल)
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};