'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { authController } from '@/controllers/auth.controller';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

const ADMIN_EMAIL = 'hridesh027@gmail.com';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const result = await authController.handleLogin(email, password);
    router.push(result.redirectUrl);
  };

  const signup = async (email, password) => {
    const result = await authController.handleSignup(email, password);
    router.push(result.redirectUrl);
  };

  const loginWithGoogle = async () => {
    const result = await authController.handleGoogleLogin();
    router.push(result.redirectUrl);
  };

  const logout = async () => {
    await authController.handleLogout();
    router.push('/auth/login');
  };

  const resetPassword = (email) => authController.handleResetPassword(email);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signup, login, logout, resetPassword, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);