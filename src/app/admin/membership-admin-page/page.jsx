'use client';

import { useState, useEffect } from 'react';
import { membershipController } from '@/controllers/membership.controller';
import { showToast } from '@/utils/toast';
import {
  Check,
  X,
  Trash2,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Briefcase,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function AdminMembershipsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await membershipController.fetchAdminList();
      setList(data || []);
    } catch {
      showToast('error', 'Failed to fetch memberships');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleStatus = async (id, status) => {
    try {
      await membershipController.changeStatus(id, status);
      setList(prev => prev.map(m => m.id === id ? { ...m, status } : m));
      showToast('success', `Status updated to ${status}`);
    } catch {
      showToast('error', 'Status update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    try {
      await membershipController.removeRecord(id);
      setList(prev => prev.filter(m => m.id !== id));
      showToast('success', 'Record deleted');
    } catch {
      showToast('error', 'Delete failed');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2 py-0.5 fs-8 fw-semibold">Approved</span>;
      case 'rejected':
        return <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-2 py-0.5 fs-8 fw-semibold">Rejected</span>;
      default:
        return <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-2 py-0.5 fs-8 fw-semibold">Pending</span>;
    }
  };

  return (
    <div className="container-fluid px-2 px-md-3 py-4">

      {/* Header Banner */}
      <div className="card border-0 rounded-4 shadow-sm bg-primary bg-gradient text-white p-3 p-md-4 mb-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="p-2.5 bg-white bg-opacity-25 rounded-3 d-flex align-items-center justify-content-center">
              <Sparkles size={22} className="text-white" />
            </div>
            <div>
              <h4 className="fw-bold text-white mb-0 fs-5 fs-md-4">Women Memberships</h4>
              <p className="text-white-50 small mb-0 d-none d-sm-block">
                Manage PAN India membership submissions & applications
              </p>
            </div>
          </div>

          <span className="badge bg-white text-primary rounded-pill px-3 py-2 fw-bold fs-7">
            {list.length} Applications
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm">
          <Loader2 className="spinner-border text-primary spinner-border-sm me-2" />
          <span className="text-muted fw-bold small">Loading applications...</span>
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm text-muted fw-semibold">
          No applications found in database.
        </div>
      ) : (
        <div className="row g-3">
          {list.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="col-12 col-md-6">

                {/* Polished Compact Card */}
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                  {/* Card Header */}
                  <div
                    className="card-body p-3 d-flex align-items-center justify-content-between"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    <div className="d-flex align-items-center gap-3 overflow-hidden me-2">

                      {/* Compact Avatar */}
                      <div
                        className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0 shadow-sm"
                        style={{
                          width: 40,
                          height: 40,
                          fontSize: '15px',
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                        }}
                      >
                        {(item.fullName || item.name || 'W').charAt(0).toUpperCase()}
                      </div>

                      {/* Clean Single/Double Row Alignment */}
                      <div className="overflow-hidden">
                        <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                          <span className="fw-bold text-dark text-truncate fs-7">
                            {item.fullName || item.name}
                          </span>
                          {getStatusBadge(item.status)}
                          <span className="badge bg-light text-secondary border rounded-pill px-2 py-0.5 fs-8 fw-normal text-truncate ms-auto ms-sm-0">
                            {item.category || 'Individual'}
                          </span>
                        </div>

                        <div className="d-flex align-items-center gap-1 text-muted fs-8 fw-medium">
                          <Phone size={12} className="text-success flex-shrink-0" />
                          <span>{item.phone}</span>
                        </div>
                      </div>
                    </div>

                    <button className="btn btn-sm btn-light border-0 rounded-circle p-1.5 flex-shrink-0 ms-1 bg-opacity-75">
                      <ChevronDown
                        size={16}
                        className="text-secondary"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease-in-out'
                        }}
                      />
                    </button>
                  </div>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="card-footer bg-light bg-opacity-50 border-top p-3">

                      {/* Details Grid */}
                      <div className="row g-2 mb-3">
                        <div className="col-12 col-sm-7">
                          <div className="d-flex align-items-center gap-2 text-secondary fs-8">
                            <Mail size={14} className="text-primary flex-shrink-0" />
                            <span className="text-truncate">{item.email || item.id}</span>
                          </div>
                        </div>

                        <div className="col-12 col-sm-5">
                          <div className="d-flex align-items-center gap-2 text-secondary fs-8">
                            <Tag size={14} className="text-success flex-shrink-0" />
                            <span>Fee: <strong className="text-dark">₹{item.amount || 999}</strong></span>
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="d-flex align-items-center gap-2 text-secondary fs-8">
                            <MapPin size={14} className="text-danger flex-shrink-0" />
                            <span>{item.city ? `${item.city}, ` : ''}{item.state}</span>
                          </div>
                        </div>

                        {item.businessName && (
                          <div className="col-12">
                            <div className="d-flex align-items-center gap-2 text-secondary fs-8">
                              <Briefcase size={14} className="text-purple-main flex-shrink-0" />
                              <span className="text-truncate">Entity: <strong className="text-dark">{item.businessName}</strong></span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Bar */}
                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pt-2 border-top">
                        <small className="text-muted d-flex align-items-center gap-1 fs-8">
                          <ShieldCheck size={14} className="text-primary" /> Verified Action
                        </small>

                        <div className="d-flex align-items-center gap-2">
                          {item.status !== 'approved' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatus(item.id, 'approved'); }}
                              className="btn btn-sm btn-success rounded-pill px-3 py-1 fs-8 fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
                            >
                              <Check size={13} /> Approve
                            </button>
                          )}

                          {item.status !== 'rejected' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatus(item.id, 'rejected'); }}
                              className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 fs-8 fw-semibold d-inline-flex align-items-center gap-1 shadow-sm"
                            >
                              <X size={13} /> Reject
                            </button>
                          )}

                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                            className="btn btn-sm btn-light border text-danger rounded-circle p-1.5 ms-1"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}