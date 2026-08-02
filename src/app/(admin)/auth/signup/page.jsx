'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authController } from '@/controllers/auth.controller';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authController.signup(email, password, confirmPassword, router);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    try {
      await authController.loginWithGoogle(router);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3 py-5">
      <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 bg-white" style={{ maxWidth: '440px', width: '100%' }}>
        <div className="text-center mb-4">
          <span className="badge bg-primary text-white px-3 py-1.5 rounded-pill mb-2 fw-bold">JOIN TARANG GOA</span>
          <h3 className="fw-extrabold text-dark m-0" style={{ fontWeight: 800 }}>Create Account</h3>
        </div>

        {error && (
          <div className="alert alert-danger fs-7 rounded-3 py-2 px-3 mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label fw-bold fs-7 text-dark">Email Address *</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control bg-light border-0 py-2.5 px-3 rounded-3 fs-6" 
              placeholder="e.g. user@example.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold fs-7 text-dark">Password *</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control bg-light border-0 py-2.5 px-3 rounded-3 fs-6" 
              placeholder="Minimum 6 characters"
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold fs-7 text-dark">Confirm Password *</label>
            <input 
              type="password" 
              required 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control bg-light border-0 py-2.5 px-3 rounded-3 fs-6" 
              placeholder="Re-enter password"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn bg-logo-orange text-white rounded-pill w-100 py-2.5 fw-bold shadow-sm mb-3"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center position-relative my-3">
          <hr className="text-secondary opacity-25" />
          <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted fs-7 fw-semibold">OR</span>
        </div>

        <button 
          onClick={handleGoogleSignup}
          type="button"
          className="btn btn-outline-secondary rounded-pill w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2"
        >
          <i className="bi bi-google text-danger fs-6"></i>
          <span>Sign up with Google</span>
        </button>

        <p className="text-center text-muted fs-7 mt-4 mb-0">
          Already registered? <Link href="/auth/login" className="text-logo-orange fw-bold text-decoration-none">Log In</Link>
        </p>
      </div>
    </main>
  );
}