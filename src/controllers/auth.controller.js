import { authService } from '@/services/auth.service';

const ADMIN_TYPED_EMAIL = 'Teamtaranggoa@gmail.com';

const formatError = (error) => {
  const code = error?.code || error?.message || '';
  if (code.includes('auth/invalid-credential')) return 'Invalid email or password.';
  if (code.includes('auth/email-already-in-use')) return 'Email is already registered.';
  if (code.includes('auth/popup-closed-by-user')) return 'Sign-in popup was closed.';
  if (code.includes('auth/too-many-requests')) return 'Too many attempts. Try again later.';
  return error?.message?.replace('Firebase: ', '').replace(/\(auth\/.*?\)\.?/g, '').trim() || 'Authentication failed.';
};

export const authController = {
  async login(typedEmail, password) {
    try {
      const user = await authService.login(typedEmail.trim(), password);

      // Agar user ne login form me exact 'Teamtaranggoa@gmail.com' type kiya hai tabhi Admin
      const isAdmin = typedEmail.trim() === ADMIN_TYPED_EMAIL;

      if (typeof window !== 'undefined') {
        if (isAdmin) {
          localStorage.setItem('admin_exact_flag', 'true');
        } else {
          localStorage.removeItem('admin_exact_flag');
        }
      }

      return {
        user,
        isAdmin,
        redirectUrl: isAdmin ? '/admin/dashboard' : '/user/dashboard'
      };
    } catch (err) {
      throw new Error(formatError(err));
    }
  },

  async signup(email, password, confirmPassword) {
    if (confirmPassword && password !== confirmPassword) throw new Error('Passwords do not match.');
    try {
      const user = await authService.signup(email.trim(), password);
      const isAdmin = email.trim() === ADMIN_TYPED_EMAIL;

      if (typeof window !== 'undefined') {
        if (isAdmin) {
          localStorage.setItem('admin_exact_flag', 'true');
        } else {
          localStorage.removeItem('admin_exact_flag');
        }
      }

      return {
        user,
        isAdmin,
        redirectUrl: isAdmin ? '/admin/dashboard' : '/user/dashboard'
      };
    } catch (err) {
      throw new Error(formatError(err));
    }
  },

  async loginWithGoogle() {
    try {
      const user = await authService.loginWithGoogle();
      // Google Auth me lower case rehta hai, isko check karenge
      const isAdmin = user?.email?.toLowerCase().trim() === ADMIN_TYPED_EMAIL.toLowerCase();

      if (typeof window !== 'undefined') {
        if (isAdmin) localStorage.setItem('admin_exact_flag', 'true');
        else localStorage.removeItem('admin_exact_flag');
      }

      return {
        user,
        isAdmin,
        redirectUrl: isAdmin ? '/admin/dashboard' : '/user/dashboard'
      };
    } catch (err) {
      throw new Error(formatError(err));
    }
  },

  async logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_exact_flag');
    }
    await authService.logout();
    return { success: true };
  },

  async resetPassword(email) {
    try {
      return await authService.resetPassword(email);
    } catch (err) {
      throw new Error(formatError(err));
    }
  },
};