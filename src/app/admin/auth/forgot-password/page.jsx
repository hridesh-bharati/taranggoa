// src\app\admin\auth\forgot-password\page.jsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { resetPassword } = useAuth();

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await resetPassword(email);
      setMessage(res.message || 'Password reset email sent successfully.');
      setEmail('');
    } catch (err) {
      setError(err.message || 'Failed to send password reset email.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3 py-5">
      <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 bg-white" style={{ maxWidth: '440px', width: '100%' }}>
        <div className="text-center mb-4">
          <span className="badge bg-warning text-dark px-3 py-1.5 rounded-pill mb-2 fw-bold">RESET PASSWORD</span>
          <h3 className="fw-extrabold text-dark m-0" style={{ fontWeight: 800 }}>Forgot Password?</h3>
          <p className="text-muted fs-7 mt-2 mb-0">Enter your registered email address to receive a password reset link.</p>
        </div>

        {error && (
          <div className="alert alert-danger fs-7 rounded-3 py-2 px-3 mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
            <div>{error}</div>
          </div>
        )}

        {message && (
          <div className="alert alert-success fs-7 rounded-3 py-2 px-3 mb-3 d-flex align-items-center gap-2">
            <i className="bi bi-check-circle-fill flex-shrink-0"></i>
            <div>{message}</div>
          </div>
        )}

        <form onSubmit={handleReset}>
          <div className="mb-4">
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

          <button
            type="submit"
            disabled={submitting}
            className="btn bg-logo-orange text-white rounded-pill w-100 py-2.5 fw-bold shadow-sm mb-3"
          >
            {submitting ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>

        <p className="text-center text-muted fs-7 mt-3 mb-0">
          Remembered your password? <Link href="/admin/auth/login" className="text-logo-orange fw-bold text-decoration-none">Back to Login</Link>
        </p>
      </div>
    </main>
  );
}