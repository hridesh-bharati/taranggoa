// src/context/AuthContext.js

'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';

import {
  onIdTokenChanged,
  getIdTokenResult,
  signOut,
} from 'firebase/auth';

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

  /*
   * ---------------------------------------------------------
   * Create server session
   * ---------------------------------------------------------
   */

  const refreshServerSession = useCallback(async (firebaseUser) => {
    if (!firebaseUser) {
      return false;
    }

    try {
      const idToken = await firebaseUser.getIdToken();

      const response = await fetch('/api/auth/session', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        credentials: 'include',

        body: JSON.stringify({
          idToken,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        console.error(
          'Server session creation failed:',
          data?.message || response.status
        );

        return false;
      }

      return true;
    } catch (error) {
      console.error(
        'Server session error:',
        error
      );

      return false;
    }
  }, []);


  const ADMIN_EMAIL = 'hridesh027@gmail.com';

  /*
   * ---------------------------------------------------------
   * Update Firebase user state
   * ---------------------------------------------------------
   */
  const updateUserState = useCallback(async (firebaseUser) => {
    if (!firebaseUser) {
      setUser(null);
      setIsAdmin(false);
      return;
    }

    try {
      const tokenResult = await getIdTokenResult(firebaseUser);
      const isUserAdmin = Boolean(tokenResult.claims?.admin) || firebaseUser?.email?.toLowerCase() === ADMIN_EMAIL;

      setUser(firebaseUser);
      setIsAdmin(isUserAdmin);
    } catch (error) {
      console.error('Failed to read Firebase user claims:', error);

      const isUserAdmin = firebaseUser?.email?.toLowerCase() === ADMIN_EMAIL;
      setUser(firebaseUser);
      setIsAdmin(isUserAdmin);
    }
  }, []);
  /*
   * ---------------------------------------------------------
   * Firebase Auth Listener
   * ---------------------------------------------------------
   */

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onIdTokenChanged(
      auth,
      async (firebaseUser) => {
        if (!mounted) {
          return;
        }

        try {
          if (firebaseUser) {
            await updateUserState(firebaseUser);
          } else {
            setUser(null);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error(
            'Auth state error:',
            error
          );

          if (mounted) {
            setUser(null);
            setIsAdmin(false);
          }
        } finally {
          if (mounted) {
            setInitializing(false);
          }
        }
      }
    );

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [updateUserState]);

  /*
   * ---------------------------------------------------------
   * Login
   * ---------------------------------------------------------
   */

  const login = useCallback(
    async (email, password) => {
      setAuthLoading(true);

      try {
        // Firebase login
        const result = await authController.login(
          email,
          password
        );

        // Create server-side HTTP-only session
        const sessionCreated =
          await refreshServerSession(result.user);

        if (!sessionCreated) {
          await signOut(auth).catch(() => { });

          throw new Error(
            'Login successful, but secure server session could not be created. Please try again.'
          );
        }

        // Update local auth state
        setUser(result.user);
        setIsAdmin(result.isAdmin);

        // Redirect
        router.replace(result.redirectUrl);
        router.refresh();

        return result;
      } finally {
        setAuthLoading(false);
      }
    },
    [refreshServerSession, router]
  );

  /*
   * ---------------------------------------------------------
   * Signup
   * ---------------------------------------------------------
   */

  const signup = useCallback(
    async (email, password, confirmPassword) => {
      setAuthLoading(true);

      try {
        // Firebase signup
        const result = await authController.signup(
          email,
          password,
          confirmPassword
        );

        // Create server session
        const sessionCreated =
          await refreshServerSession(result.user);

        if (!sessionCreated) {
          await signOut(auth).catch(() => { });

          throw new Error(
            'Account created, but secure server session could not be created. Please try logging in again.'
          );
        }

        // Update state
        setUser(result.user);
        setIsAdmin(result.isAdmin);

        // Redirect
        router.replace(result.redirectUrl);
        router.refresh();

        return result;
      } finally {
        setAuthLoading(false);
      }
    },
    [refreshServerSession, router]
  );

  /*
   * ---------------------------------------------------------
   * Google Login
   * ---------------------------------------------------------
   */

  const loginWithGoogle = useCallback(
    async () => {
      setAuthLoading(true);

      try {
        // Firebase Google authentication
        const result =
          await authController.loginWithGoogle();

        // Create server session
        const sessionCreated =
          await refreshServerSession(result.user);

        if (!sessionCreated) {
          await signOut(auth).catch(() => { });

          throw new Error(
            'Google login successful, but secure server session could not be created. Please try again.'
          );
        }

        // Update state
        setUser(result.user);
        setIsAdmin(result.isAdmin);

        // Redirect
        router.replace(result.redirectUrl);
        router.refresh();

        return result;
      } finally {
        setAuthLoading(false);
      }
    },
    [refreshServerSession, router]
  );

  /*
   * ---------------------------------------------------------
   * Logout
   * ---------------------------------------------------------
   */

  const logout = useCallback(async () => {
    setAuthLoading(true);

    try {
      const result = await authController.logout();

      setUser(null);
      setIsAdmin(false);

      router.replace(
        result?.redirectUrl ||
        '/admin/auth/login'
      );

      router.refresh();
    } catch (error) {
      console.error(
        'Logout error:',
        error
      );

      // Even if server logout fails,
      // remove Firebase client authentication.
      await signOut(auth).catch(() => { });

      setUser(null);
      setIsAdmin(false);

      router.replace('/admin/auth/login');
      router.refresh();
    } finally {
      setAuthLoading(false);
    }
  }, [router]);

  /*
   * ---------------------------------------------------------
   * Password Reset
   * ---------------------------------------------------------
   */

  const resetPassword = useCallback(
    async (email) => {
      return authController.resetPassword(email);
    },
    []
  );

  /*
   * ---------------------------------------------------------
   * Context Value
   * ---------------------------------------------------------
   */

  const value = useMemo(
    () => ({
      user,

      initializing,

      authLoading,

      loading: authLoading,

      isAuthenticated: Boolean(user),

      isAdmin,

      login,

      signup,

      logout,

      resetPassword,

      loginWithGoogle,
    }),
    [
      user,
      initializing,
      authLoading,
      isAdmin,
      login,
      signup,
      logout,
      resetPassword,
      loginWithGoogle,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/*
 * ---------------------------------------------------------
 * useAuth Hook
 * ---------------------------------------------------------
 */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}
