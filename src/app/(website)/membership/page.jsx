'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function MembershipPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/auth/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-warning" role="status"></div>
      </div>
    );
  }

  return (
    <main className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />

      <div className="container py-5 flex-grow-1">
        <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white mb-4 border-top border-4 border-warning">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
            <div>
              <span className="badge bg-warning text-dark px-3 py-1 rounded-pill mb-2 fw-bold">
                MEMBER DASHBOARD
              </span>
              <h3 className="fw-extrabold text-dark m-0" style={{ fontWeight: 800 }}>
                Welcome, {user.email}
              </h3>
            </div>

            <button 
              onClick={logout} 
              className="btn btn-outline-danger rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 shadow-sm align-self-start align-self-md-auto"
            >
              <i className="bi bi-box-arrow-right"></i>
              <span>Log Out</span>
            </button>
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="p-3 bg-light rounded-3 border">
                <span className="text-muted fw-bold fs-7 d-block">Registered Exhibitions</span>
                <span className="fs-4 fw-extrabold text-dark">02 Active</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-light rounded-3 border">
                <span className="text-muted fw-bold fs-7 d-block">Member Status</span>
                <span className="fs-4 fw-extrabold text-success">Verified Entrepreneur</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-light rounded-3 border">
                <span className="text-muted fw-bold fs-7 d-block">Support Desk</span>
                <span className="fs-4 fw-extrabold text-primary">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}