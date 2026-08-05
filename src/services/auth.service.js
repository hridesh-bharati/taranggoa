// src/services/auth.service.js

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
} from 'firebase/auth';

import { auth, googleProvider } from '@/lib/firebase';

const createServerSession = async (user) => {
  const idToken = await user.getIdToken(true);
  const res = await fetch('/api/auth/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.message || 'Failed to create server session.');
  }
};

/**
 * Clears the server-side HttpOnly session cookie.
 */
const destroyServerSession = async () => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (error) {
    console.error('Server session destroy failed:', error);
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
    await destroyServerSession();
    await signOut(auth);
    return {
      success: true,
      redirectUrl: '/admin/auth/login',
    };
  },

  async resetPassword(email) {
    if (!email) {
      throw new Error('Email is required to reset password.');
    }
    return sendPasswordResetEmail(auth, email);
  },
};