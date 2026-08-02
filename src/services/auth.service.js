import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export const authService = {
  login: (email, password) => signInWithEmailAndPassword(auth, email, password),
  signup: (email, password) => createUserWithEmailAndPassword(auth, email, password),
  logout: () => signOut(auth),
  resetPassword: (email) => sendPasswordResetEmail(auth, email),
  loginWithGoogle: () => signInWithPopup(auth, googleProvider),
};