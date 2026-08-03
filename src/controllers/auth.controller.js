
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
      
      const targetPath = isAdmin ? '/admin/dashboard' : '/membership';
      router.push(targetPath);
      return { success: true, user: res.user, isAdmin };
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    }
  },

  // --- Email & Password Signup ---
  async signup(email, password, confirmPassword, router) {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    try {
      const res = await authService.signup(email, password);
      const userEmail = res.user.email?.toLowerCase();
      const isAdmin = userEmail === ADMIN_EMAIL.toLowerCase();

      const targetPath = isAdmin ? '/admin/dashboard' : '/membership';
      router.push(targetPath);
      return { success: true, user: res.user, isAdmin };
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    }
  },

  // --- Google OAuth Login / Signup ---
  async loginWithGoogle(router) {
    try {
      const res = await authService.loginWithGoogle();
      const userEmail = res.user.email?.toLowerCase();
      const isAdmin = userEmail === ADMIN_EMAIL.toLowerCase();

      const targetPath = isAdmin ? '/admin/dashboard' : '/membership';
      router.push(targetPath);
      return { success: true, user: res.user, isAdmin };
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    }
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

  // --- Logout ---
  async logout(router) {
    try {
      await authService.logout();
      router.push('/admin/auth/login');
    } catch (error) {
      throw new Error(formatFirebaseError(error));
    }
  }
};