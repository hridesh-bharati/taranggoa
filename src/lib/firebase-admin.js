import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

function getAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error('CRITICAL: Firebase Admin environment variables are missing.');
    return null;
  }

  // Sanitizes quotes and handles escaped newlines from Vercel/ENV string formatting
  privateKey = privateKey
    .replace(/^"(.*)"$/, '$1')
    .replace(/\\n/g, '\n');

  try {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } catch (error) {
    console.error('Firebase Admin Initialization Error:', error);
    return null;
  }
}

const adminApp = getAdminApp();

export const adminAuth = adminApp ? getAuth(adminApp) : null;
export default adminApp;