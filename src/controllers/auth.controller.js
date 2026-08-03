// src\controllers\auth.controller.js
import { authService } from '@/services/auth.service';

const ADMIN_EMAIL = 'hridesh027@gmail.com';

const formatFirebaseError = (error) => {
  return error.message ? error.message.replace('Firebase: ', '') : 'An unexpected error occurred.';
};

export const authController = {
  // --- Email & Password Login ---
  async login(email, password, router) {
    try {
      const res = await authService.login(email, password);
      const userEmail = res.user.email?.toLowerCase();
      const isAdmin = userEmail === ADMIN_EMAIL.toLowerCase();
      
      const targetPath = isAdmin ? '/admin/dashboard' : '/user/dashboard';
      if (router) router.push(targetPath);
      return { success: true, user: res.user, isAdmin, redirectUrl: targetPath };
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    }
  },

  // Alias for compatibility with AuthContext
  async handleLogin(email, password) {
    return await this.login(email, password, null);
  },

  // --- Email & Password Signup ---
  async signup(email, password, confirmPassword, router) {
    if (confirmPassword && password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    try {
      const res = await authService.signup(email, password);
      const userEmail = res.user.email?.toLowerCase();
      const isAdmin = userEmail === ADMIN_EMAIL.toLowerCase();

      const targetPath = isAdmin ? '/admin/dashboard' : '/user/dashboard';
      if (router) router.push(targetPath);
      return { success: true, user: res.user, isAdmin, redirectUrl: targetPath };
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    }
  },

  // Alias for compatibility with AuthContext
  async handleSignup(email, password) {
    return await this.signup(email, password, null, null);
  },

  // --- Google OAuth Login / Signup ---
  async loginWithGoogle(router) {
    try {
      const res = await authService.loginWithGoogle();
      const userEmail = res.user.email?.toLowerCase();
      const isAdmin = userEmail === ADMIN_EMAIL.toLowerCase();

      const targetPath = isAdmin ? '/admin/dashboard' : '/user/dashboard';
      if (router) router.push(targetPath);
      return { success: true, user: res.user, isAdmin, redirectUrl: targetPath };
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    }
  },

  // Alias for compatibility with AuthContext
  async handleGoogleLogin() {
    return await this.loginWithGoogle(null);
  },

  // --- Password Reset ---
  async resetPassword(email) {
    if (!email) {
      throw new Error('Please enter a valid email address.');
    }
    try {
      await authService.resetPassword(email);
      return { success: true, message: 'Password reset link sent to your email.' };
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    }
  },

  // Alias for compatibility with AuthContext
  async handleResetPassword(email) {
    return await this.resetPassword(email);
  },

  // --- Logout ---
  async logout(router) {
    try {
      await authService.logout();
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
      if (router) router.push('/admin/auth/login');
      return { success: true };
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    }
  },

  // Alias for compatibility with AuthContext
  async handleLogout() {
    return await this.logout(null);
  }
};