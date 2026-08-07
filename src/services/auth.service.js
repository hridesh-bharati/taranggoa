import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

const createServerSession = async (user) => {
  try {
    const idToken = await user.getIdToken();
    const res = await fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) throw new Error('Failed to create server session.');
  } catch (error) {
    await signOut(auth).catch(() => { });
    throw error;
  }
};

export const authService = {
  async login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    await createServerSession(credential.user);
    return credential.user;
  },

  async signup(email, password) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await createServerSession(credential.user);
    return credential.user;
  },

  async loginWithGoogle() {
    const credential = await signInWithPopup(auth, googleProvider);
    await createServerSession(credential.user);
    return credential.user;
  },

  async logout() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => { });
    await signOut(auth);
    return { success: true, redirectUrl: '/admin/auth/login' };
  },

  async resetPassword(email) {
    if (!email) throw new Error('Email is required.');
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Password reset link sent to your email inbox.' };
  },
};