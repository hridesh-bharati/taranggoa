// src\lib\server - auth.js
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

/**
 * Server Components aur Server Actions me full cryptographic verification + revocation check.
 */
export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  if (!session) return null;

  try {
    // True verification including token revocation check
    const decodedToken = await adminAuth.verifySessionCookie(session, true);
    return decodedToken;
  } catch (error) {
    return null;
  }
}