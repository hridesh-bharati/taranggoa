'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { onIdTokenChanged, getIdTokenResult, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { authController } from '@/controllers/auth.controller';

const AuthContext = createContext(null);

const SESSION_STALE_TIME_MS = 4 * 24 * 60 * 60 * 1000; // 4 Days
const FETCH_TIMEOUT_MS = 8000; // 8 Seconds
const STORAGE_SYNC_KEY = 'session_sync_metadata';

// --- Standalone Helper Utilities ---

function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'));
    }

    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);

    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    };

    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

function createCombinedSignal(externalSignal, timeoutMs) {
  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => timeoutController.abort(), timeoutMs);

  if (!externalSignal) {
    return { signal: timeoutController.signal, cleanup: () => clearTimeout(timeoutId) };
  }

  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.any === 'function') {
    const combinedSignal = AbortSignal.any([externalSignal, timeoutController.signal]);
    return { signal: combinedSignal, cleanup: () => clearTimeout(timeoutId) };
  }

  const mergedController = new AbortController();
  const onAbort = () => mergedController.abort();

  if (externalSignal.aborted || timeoutController.signal.aborted) {
    mergedController.abort();
  } else {
    externalSignal.addEventListener('abort', onAbort, { once: true });
    timeoutController.signal.addEventListener('abort', onAbort, { once: true });
  }

  return {
    signal: mergedController.signal,
    cleanup: () => {
      clearTimeout(timeoutId);
      externalSignal.removeEventListener('abort', onAbort);
    },
  };
}

async function fetchWithRetry(url, options = {}, retries = 3, backoffMs = 500) {
  // Fast fail if the browser is explicitly offline
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return null;
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    if (options.signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    const { signal, cleanup } = createCombinedSignal(options.signal, FETCH_TIMEOUT_MS);

    try {
      const response = await fetch(url, { ...options, signal });

      if (response.ok || (response.status >= 400 && response.status < 500)) {
        return response;
      }
    } catch (err) {
      if (err.name === 'AbortError' && options.signal?.aborted) {
        throw err;
      }
    } finally {
      cleanup();
    }

    if (attempt < retries) {
      await sleep(backoffMs * Math.pow(2, attempt - 1), options.signal);
    }
  }

  return null;
}

function getSyncMetadata() {
  if (typeof window === 'undefined') return { uid: null, time: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_SYNC_KEY);
    return raw ? JSON.parse(raw) : { uid: null, time: 0 };
  } catch {
    return { uid: null, time: 0 };
  }
}

function setSyncMetadata(uid) {
  if (typeof window === 'undefined' || !uid) return;
  try {
    localStorage.setItem(STORAGE_SYNC_KEY, JSON.stringify({ uid, time: Date.now() }));
  } catch (e) {
    console.warn('Storage write failed:', e);
  }
}

function clearSyncMetadata() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_SYNC_KEY);
  } catch { }
}

// --- Auth Provider Component ---

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const abortControllerRef = useRef(null);
  const activeSyncRef = useRef(null);

  const clearAuthState = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
  }, []);

  const refreshServerSession = useCallback(async (firebaseUser, externalSignal) => {
    if (!firebaseUser) return false;

    if (activeSyncRef.current?.uid === firebaseUser.uid) {
      return activeSyncRef.current.promise;
    }

    const syncPromise = (async () => {
      try {
        const token = await firebaseUser.getIdToken();
        const res = await fetchWithRetry('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken: token }),
          signal: externalSignal,
        });

        if (res && res.ok) {
          setSyncMetadata(firebaseUser.uid);
          return true;
        }
        return false;
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Session sync error:', error);
        }
        return false;
      } finally {
        if (activeSyncRef.current?.uid === firebaseUser.uid) {
          activeSyncRef.current = null;
        }
      }
    })();

    activeSyncRef.current = { uid: firebaseUser.uid, promise: syncPromise };
    return syncPromise;
  }, []);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (firebaseUser) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      try {
        if (firebaseUser) {
          const { uid: lastUid, time: lastTime } = getSyncMetadata();
          const now = Date.now();
          const isDifferentUser = lastUid !== firebaseUser.uid;
          const isSessionStale = now - lastTime > SESSION_STALE_TIME_MS;

          if (isDifferentUser || isSessionStale) {
            const ok = await refreshServerSession(firebaseUser, signal);
            if (!ok) {
              await signOut(auth).catch(() => { });
              clearSyncMetadata();
              clearAuthState();
              return;
            }
          }

          const tokenResult = await getIdTokenResult(firebaseUser);
          setUser(firebaseUser);
          setIsAdmin(Boolean(tokenResult.claims?.admin));
        } else {
          clearSyncMetadata();
          clearAuthState();
        }
      } catch (err) {
        await signOut(auth).catch(() => { });
        clearSyncMetadata();
        clearAuthState();
      } finally {
        setInitializing(false);
      }
    });

    return () => {
      unsubscribe();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [refreshServerSession, clearAuthState]);

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const result = await authController.login(email, password);

      const isSessionCreated = await refreshServerSession(result.user);
      if (!isSessionCreated) {
        await signOut(auth).catch(() => { });
        clearSyncMetadata();
        clearAuthState();
        throw new Error('Failed to establish a secure session. Please try again.');
      }

      router.replace(result.redirectUrl);
      router.refresh();
      return result;
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (email, password, confirmPassword) => {
    setAuthLoading(true);
    try {
      const result = await authController.signup(email, password, confirmPassword);

      const isSessionCreated = await refreshServerSession(result.user);
      if (!isSessionCreated) {
        await signOut(auth).catch(() => { });
        clearSyncMetadata();
        clearAuthState();
        throw new Error('Account created, but server session creation failed. Please log in.');
      }

      router.replace(result.redirectUrl);
      router.refresh();
      return result;
    } finally {
      setAuthLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setAuthLoading(true);
    try {
      const result = await authController.loginWithGoogle();

      const isSessionCreated = await refreshServerSession(result.user);
      if (!isSessionCreated) {
        await signOut(auth).catch(() => { });
        clearSyncMetadata();
        clearAuthState();
        throw new Error('Google sign-in succeeded, but server session failed. Please try again.');
      }

      router.replace(result.redirectUrl);
      router.refresh();
      return result;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      const result = await authController.logout();
      clearSyncMetadata();
      clearAuthState();
      router.replace(result?.redirectUrl || '/admin/auth/login');
      router.refresh();
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
      loading: authLoading,
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