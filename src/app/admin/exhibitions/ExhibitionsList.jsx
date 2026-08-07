'use client';

import { useRouter } from 'next/navigation';
import { Trash2, Calendar, MapPin, Phone, Edit2 } from 'lucide-react';
import { exhibitionsController } from '@/controllers/exhibitions.controller';
import { showToast } from '@/utils/toast';

export default function ExhibitionsList({ list, onDeleteSuccess }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this exhibition record?')) return;
    try {
      await exhibitionsController.deleteExhibition(id);
      showToast('success', 'Exhibition deleted');
      if (onDeleteSuccess) onDeleteSuccess(id);
    } catch {
      showToast('error', 'Delete failed');
    }
  };

  if (list.length === 0) {
    return (
      <div className="card border-0 rounded-3 p-4 text-center bg-white shadow-sm text-muted fw-medium fs-8">
        No active exhibitions found in database.
      </div>
    );
  }

  return (
    <div className="row g-3">
      {list.map((item) => (
        <div key={item.id} className="col-12 col-md-6">
          <div className="card border-0 rounded-3 bg-white shadow-sm overflow-hidden h-100">
            <div className="p-2.5 bg-primary text-white fw-bold fs-8 text-center text-uppercase">
              {item.badge}
            </div>

            <div className="p-3 d-flex gap-3 align-items-center">
              {item.image && (
                <img src={item.image} alt={item.badge} className="rounded-2 border object-fit-cover flex-shrink-0" style={{ width: '80px', height: '80px' }} />
              )}

              <div className="flex-grow-1 fs-8 text-secondary overflow-hidden d-flex flex-column gap-1">
                <div className="fw-bold text-dark fs-8 text-truncate"><MapPin size={13} className="text-danger me-1 d-inline" />{item.location}</div>
                <div><Calendar size={13} className="text-primary me-1 d-inline" />{item.dates}</div>
                <div><Phone size={13} className="text-success me-1 d-inline" />{item.contact}</div>
              </div>

              <div className="d-flex flex-column gap-1 flex-shrink-0">
                <button
                  onClick={() => router.push(`/admin/exhibitions/add?id=${item.id}`)}
                  className="btn btn-sm btn-light text-primary rounded-circle p-2 border-0"
                  title="Edit Exhibition"
                >
                  <Edit2 size={15} />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-sm btn-light text-danger rounded-circle p-2 border-0"
                  title="Delete Exhibition"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}