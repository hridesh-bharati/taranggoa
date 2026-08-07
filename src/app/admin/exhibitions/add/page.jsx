'use client';

import exhibitionForm from '../exhibitionForm';
import { useRouter } from 'next/navigation';
import { Plus, Eye } from 'lucide-react';
export default function AddExhibitionPage() {
  const router = useRouter();

  return (
    <div className="container-fluid px-2 px-md-3 py-2">
      <div className="card border-0 rounded-3 p-3 mb-3 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)' }}>
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
            <Plus size={20} /> Add New Exhibition
          </h5>
          <button onClick={() => router.push('/admin/exhibitions/view')} className="btn btn-sm bg-white text-primary fw-bold rounded-pill px-3 py-1.5 fs-8">
            <Eye size={15} className="me-1" /> View All Expos
          </button>
        </div>
      </div>

      <exhibitionForm onSuccess={() => router.push('/admin/exhibitions/view')} />
    </div>
  );
}