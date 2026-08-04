// src\app\admin\offers\delete\page.jsx


'use client';

import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 text-center bg-white" style={{ maxWidth: '480px', width: '100%' }}>
        
        {/* Icon */}
        <div className="d-flex justify-content-center mb-3">
          <div className="p-3 bg-warning-subtle text-warning rounded-circle">
            <Clock size={40} />
          </div>
        </div>

        {/* Title & Message */}
        <span className="badge bg-light text-dark border px-3 py-1.5 rounded-pill fw-bold fs-8 mb-2 d-inline-block">
          • UNDER DEVELOPMENT
        </span>
        
        <h2 className="fw-extrabold text-dark mb-2">Coming Soon</h2>
        
        <p className="text-secondary fs-7 mb-4">
          Offers management features are currently being built. Stay tuned for updates!
        </p>

        {/* Back Navigation */}
        <div>
          <Link 
            href="/admin" 
            className="btn btn-outline-dark rounded-3 px-4 py-2 fs-7 fw-bold d-inline-flex align-items-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>
        </div>

      </div>
    </div>
  );
}