import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export const authService = {
  async login(email, password) {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  },

  async signup(email, password) {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    return credential.user;
  },

  async loginWithGoogle() {
    const credential = await signInWithPopup(auth, googleProvider);
    return credential.user;
  },

  async logout() {
    await signOut(auth);
  },

  async resetPassword(email) {
    if (!email) throw new Error('Email is required.');
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: 'Password reset link sent to your email.' };
  },
};