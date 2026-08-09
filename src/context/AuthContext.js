'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { authController } from '@/controllers/auth.controller';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = 'hridesh027@gmail.com';
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAdmin(currentUser.email?.toLowerCase() === ADMIN_EMAIL);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const res = await authController.login(email, password);
    router.push(res.redirectUrl);
    return res;
  };

  const signup = async (email, password, confirmPassword) => {
    const res = await authController.signup(email, password, confirmPassword);
    router.push(res.redirectUrl);
    return res;
  };

  const loginWithGoogle = async () => {
    const res = await authController.loginWithGoogle();
    router.push(res.redirectUrl);
    return res;
  };

  const logout = async () => {
    await authController.logout();
    setUser(null);
    setIsAdmin(false);
    router.push('/admin/auth/login');
  };

  const resetPassword = async (email) => {
    return authController.resetPassword(email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        initializing,
        isAuthenticated: Boolean(user),
        login,
        signup,
        loginWithGoogle,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);