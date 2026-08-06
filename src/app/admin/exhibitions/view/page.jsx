'use client';

import { useState, useEffect } from 'react';
import { exhibitionsController } from '@/controllers/exhibitions.controller';
import ExhibitionsList from '../ExhibitionsList';
import { useRouter } from 'next/navigation';
import { Eye, Plus, Loader2 } from 'lucide-react';

export default function ViewExhibitionsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await exhibitionsController.fetchExhibitions();
      setList(data || []);
    } catch {
      // Handled in controller
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div className="container-fluid px-2 px-md-3 py-2">
      <div className="card border-0 rounded-3 p-3 mb-3 text-white shadow-sm" style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)' }}>
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
            <Eye size={20} /> All Published Exhibitions ({list.length})
          </h5>
          <button onClick={() => router.push('/admin/exhibitions/add')} className="btn btn-sm bg-white text-primary fw-bold rounded-pill px-3 py-1.5 fs-8">
            <Plus size={15} className="me-1" /> Add New Expo
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5 bg-white rounded-3 shadow-sm">
          <Loader2 className="spinner-border text-primary spinner-border-sm me-2" />
          <span className="text-muted fw-bold small">Loading exhibitions...</span>
        </div>
      ) : (
        <ExhibitionsList list={list} onDeleteSuccess={(id) => setList(prev => prev.filter(i => i.id !== id))} />
      )}
    </div>
  );
}