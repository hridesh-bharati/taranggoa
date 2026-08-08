import { authService } from '@/services/auth.service';
import { getIdTokenResult } from 'firebase/auth';

const ADMIN_EMAIL = 'hridesh027@gmail.com';

const formatError = (error) => {
  const code = error?.code || error?.message || '';
  if (code.includes('auth/invalid-credential')) return 'Invalid email or password.';
  if (code.includes('auth/email-already-in-use')) return 'Email already registered.';
  if (code.includes('auth/popup-closed-by-user')) return 'Sign-in popup was closed.';
  if (code.includes('auth/too-many-requests')) return 'Too many attempts. Try again later.';
  return error?.message?.replace('Firebase: ', '').replace(/\(auth\/.*?\)\.?/g, '').trim() || 'Authentication failed.';
};

const prepareUser = async (user) => {
  const tokenResult = await getIdTokenResult(user);

  // Check both Firebase Custom Claim AND specific Admin Email
  const isAdmin = Boolean(tokenResult.claims?.admin) || user?.email?.toLowerCase() === ADMIN_EMAIL;

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
      return await prepareUser(user);
    } catch (err) {
      throw new Error(formatError(err));
    }
  },

  async signup(email, password, confirmPassword) {
    if (confirmPassword && password !== confirmPassword) throw new Error('Passwords do not match.');
    try {
      const user = await authService.signup(email, password);
      return await prepareUser(user);
    } catch (err) {
      throw new Error(formatError(err));
    }
  },

  async loginWithGoogle() {
    try {
      const user = await authService.loginWithGoogle();
      return await prepareUser(user);
    } catch (err) {
      throw new Error(formatError(err));
    }
  },

  async logout() {
    return authService.logout();
  },

  async resetPassword(email) {
    try {
      return await authService.resetPassword(email);
    } catch (err) {
      throw new Error(formatError(err));
    }
  },
};