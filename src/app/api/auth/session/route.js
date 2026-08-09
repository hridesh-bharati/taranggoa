import { NextResponse } from 'next/server';
import admin from '@/lib/firebase-admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { success: false, message: 'ID Token required' },
        { status: 400 }
      );
    }

    // 5 days session cookie duration
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

    const response = NextResponse.json({ success: true, message: 'Session created' });

    response.cookies.set('session', sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    });

    return response;
  } catch (error) {
    console.error('Session API Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create session' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Session deleted' });
  response.cookies.set('session', '', { maxAge: 0, path: '/' });
  return response;
}