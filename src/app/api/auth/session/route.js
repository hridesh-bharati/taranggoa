import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase-admin';

export const runtime = 'nodejs';
const COOKIE_NAME = 'session';
const SESSION_DURATION = 5 * 24 * 60 * 60 * 1000; // 5 days

export async function POST(request) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json(
        { success: false, message: 'ID token required' },
        { status: 400 }
      );
    }

    // Verify Firebase ID token fast locally (NO revocation network trip)
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (!decodedToken?.uid) {
      return NextResponse.json(
        { success: false, message: 'Invalid Firebase token' },
        { status: 401 }
      );
    }

    // Create secure server-side session cookie
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Session created',
    });

    response.cookies.set(COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 5 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('SESSION ERROR:', {
      code: error?.code,
      message: error?.message,
    });

    return NextResponse.json(
      { success: false, message: 'Unable to create secure session' },
      { status: 401 }
    );
  }
}