// controllers/auth.controller.js

import { authService } from '@/services/auth.service';

// Clean Firebase error strings properly
const formatError = (error) => {
  return (
    error?.message
      ?.replace('Firebase: ', '')
      ?.replace(/\(auth\/.*?\)\.?/g, '')
      ?.trim() || 'Something went wrong'
  );
};

const prepareUser = (user) => {
  if (!user) throw new Error('User data is missing.');

  const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').toLowerCase().trim();
  const userEmail = (user.email || '').toLowerCase().trim();
  const isAdmin = Boolean(adminEmail && userEmail === adminEmail);

  return {
    user,
    isAdmin,
    redirectUrl: isAdmin ? '/admin/dashboard' : '/user/dashboard',
  };
};

export const authController = {
  async login(email, password) {
    try {
      const user = await authService.login(email, password);
      return prepareUser(user);
    } catch (error) {
      throw new Error(formatError(error));
    }
  },

  async signup(email, password, confirmPassword) {
    if (confirmPassword && password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    try {
      const user = await authService.signup(email, password);
      return prepareUser(user);
    } catch (error) {
      throw new Error(formatError(error));
    }
  },

  async loginWithGoogle() {
    try {
      const user = await authService.loginWithGoogle();
      return prepareUser(user);
    } catch (error) {
      throw new Error(formatError(error));
    }
  },

  async logout() {
    try {
      return await authService.logout();
    } catch (error) {
      throw new Error(formatError(error));
    }
  },

  async resetPassword(email) {
    try {
      return await authService.resetPassword(email);
    } catch (error) {
      throw new Error(formatError(error));
    }
  },
};