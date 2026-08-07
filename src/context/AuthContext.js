'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { onIdTokenChanged, getIdTokenResult } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { authController } from '@/controllers/auth.controller';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const isFirstMount = useRef(true);

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
      console.error('Session sync error:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          if (!isFirstMount.current) {
            await refreshServerSession(firebaseUser);
          }
          const tokenResult = await getIdTokenResult(firebaseUser);
          setUser(firebaseUser);
          setIsAdmin(Boolean(tokenResult.claims?.admin));
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } catch (err) {
        setUser(null);
        setIsAdmin(false);
      } finally {
        setInitializing(false);
        isFirstMount.current = false;
      }
    });

    return unsubscribe;
  }, [refreshServerSession]);

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const result = await authController.login(email, password);
      router.refresh();
      router.replace(result.redirectUrl);
      return result;
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (email, password, confirmPassword) => {
    setAuthLoading(true);
    try {
      const result = await authController.signup(email, password, confirmPassword);
      router.refresh();
      router.replace(result.redirectUrl);
      return result;
    } finally {
      setAuthLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setAuthLoading(true);
    try {
      const result = await authController.loginWithGoogle();
      router.refresh();
      router.replace(result.redirectUrl);
      return result;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      const result = await authController.logout();
      router.refresh();
      router.replace(result?.redirectUrl || '/admin/auth/login');
    } finally {
      setAuthLoading(false);
    }
  };

  const resetPassword = (email) => authController.resetPassword(email);

  const value = useMemo(
    () => ({
      user,
      initializing,
      authLoading,
      isAuthenticated: Boolean(user),
      isAdmin,
      login,
      signup,
      logout,
      resetPassword,
      loginWithGoogle,
    }),
    [user, initializing, authLoading, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}