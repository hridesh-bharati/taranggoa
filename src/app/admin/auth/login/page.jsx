// src\app\admin\auth\login\page.jsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Isolated Local Loading States
  const [submitting, setSubmitting] = useState(false);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const { login, loginWithGoogle } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setGoogleSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || 'Google login failed');
      setGoogleSubmitting(false);
    }
  };

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3 py-5">
      <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 bg-white" style={{ maxWidth: '440px', width: '100%' }}>

        <div className="text-center mb-4">
          <span className="badge bg-logo-orange text-white px-3 py-1.5 rounded-pill mb-2 fw-bold">WELCOME BACK</span>
          <h3 className="fw-extrabold text-dark m-0" style={{ fontWeight: 800 }}>Account Login</h3>
        </div>

        {error && (
          <div className="alert alert-danger fs-7 rounded-3 py-2 px-3 mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
            <div>{error}</div>
          </div>
        )}

        <form onSubmit={handleLogin}>
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
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label fw-bold fs-7 text-dark m-0">Password *</label>
              <Link href="/admin/auth/forgot-password" className="text-logo-orange fs-7 fw-bold text-decoration-none">Forgot?</Link>
            </div>
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control bg-light border-0 py-2.5 px-3 pe-5 rounded-3 fs-6"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn border-0 position-absolute end-0 top-50 translate-middle-y text-muted px-3"
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || googleSubmitting}
            className="btn bg-logo-orange text-white rounded-pill w-100 py-2.5 fw-bold shadow-sm mb-3"
          >
            {submitting ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <div className="text-center position-relative my-3">
          <hr className="text-secondary opacity-25" />
          <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted fs-7 fw-semibold">OR</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          disabled={submitting || googleSubmitting}
          className="btn btn-outline-secondary rounded-pill w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2"
        >
          {googleSubmitting ? (
            <span className="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true" />
          ) : (
            <>
              <i className="bi bi-google text-danger fs-6"></i>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <p className="text-center text-muted fs-7 mt-4 mb-0">
          Don't have an account? <Link href="/admin/auth/signup" className="text-logo-orange fw-bold text-decoration-none">Sign Up</Link>
        </p>

      </div>
    </main>
  );
}