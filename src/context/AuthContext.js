'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { onIdTokenChanged, getIdTokenResult } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { authController } from '@/controllers/auth.controller';

const AuthContext = createContext(null);
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() || '';

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const refreshServerSession = useCallback(async (firebaseUser) => {
    if (!firebaseUser) return;
    try {
      const token = await firebaseUser.getIdToken();
      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: token }),
      });
    } catch (error) {
      console.error('Session refresh error:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Avoid duplicate session creation on first login
          if (initialized) {
            await refreshServerSession(firebaseUser);
          }
          setUser(firebaseUser);

          const tokenResult = await getIdTokenResult(firebaseUser);
          const claimAdmin = tokenResult.claims.admin === true;
          const emailAdmin = Boolean(
            ADMIN_EMAIL && firebaseUser.email?.toLowerCase() === ADMIN_EMAIL
          );

          setIsAdmin(claimAdmin || emailAdmin);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Auth listener error:', error);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    });

    // FIXED: Removed `initialized` from dependency array
    return unsubscribe;
  }, [refreshServerSession]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await authController.login(email, password);
      setUser(result.user);
      router.replace(result.redirectUrl);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, confirmPassword) => {
    setLoading(true);
    try {
      const result = await authController.signup(email, password, confirmPassword);
      setUser(result.user);
      router.replace(result.redirectUrl);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await authController.loginWithGoogle();
      setUser(result.user);
      router.replace(result.redirectUrl);
      return result;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const result = await authController.logout();
      setUser(null);
      setIsAdmin(false);
      router.replace(result?.redirectUrl || '/admin/auth/login');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = (email) => authController.resetPassword(email);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin,
      login,
      signup,
      logout,
      resetPassword,
      loginWithGoogle,
    }),
    [user, loading, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}