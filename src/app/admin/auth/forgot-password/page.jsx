'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage('Password reset email sent! Check your inbox/spam folder.');
      setEmail('');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3 py-5">
      <div className="card border-0 rounded-4 shadow-lg p-4 p-md-5 bg-white" style={{ maxWidth: '440px', width: '100%' }}>
        
        {/* Header */}
        <div className="text-center mb-4">
          <span className="badge bg-warning text-dark px-3 py-1.5 rounded-pill mb-2 fw-bold">
            ACCOUNT RECOVERY
          </span>
          <h3 className="fw-extrabold text-dark m-0" style={{ fontWeight: 800 }}>Reset Password</h3>
          <p className="text-secondary fs-7 mt-1">Enter your email to receive a password reset link</p>
        </div>

        {/* Success Alert */}
        {message && (
          <div className="alert alert-success fs-7 rounded-3 py-2 px-3 mb-3 d-flex align-items-center gap-2" role="alert">
            <i className="bi bi-check-circle-fill flex-shrink-0 text-success"></i>
            <div>{message}</div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger fs-7 rounded-3 py-2 px-3 mb-3 d-flex align-items-center gap-2" role="alert">
            <i className="bi bi-exclamation-triangle-fill flex-shrink-0"></i>
            <div>{error}</div>
          </div>
        )}

        {/* Reset Form */}
        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="form-label fw-bold fs-7 text-dark">Registered Email Address *</label>
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
            disabled={loading}
            className="btn bg-logo-orange text-white rounded-pill w-100 py-2.5 fw-bold shadow-sm hover-lift mb-3"
          >
            {loading ? (
              <span className="d-flex align-items-center justify-content-center gap-2">
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Sending Link...</span>
              </span>
            ) : (
              'Send Password Reset Link'
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-muted fs-7 mt-4 mb-0">
          Remember password?{' '}
          <Link href="/admin/auth/login" className="text-logo-orange fw-bold text-decoration-none">
            Back to Login
          </Link>
        </p>

      </div>
    </main>
  );
}