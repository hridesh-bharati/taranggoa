'use client';

import { useState, useEffect } from 'react';
import { membershipController } from '@/controllers/membership.controller';
import { showToast } from '@/utils/toast';
import {
  Users,
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
  Clock,
  AlertTriangle,
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

  return (
    <div className="container-fluid px-2 px-md-3 py-3 pb-5">

      {/* 🌟 Blue Header Banner (Matching Second Screenshot) */}
      <div
        className="card border-0 rounded-4 shadow-sm p-3 p-md-4 mb-4 position-relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)' }}
      >
        <Users size={140} className="card-watermark-right text-white" style={{ opacity: 0.12 }} />

        <div className="d-flex align-items-center justify-content-between position-relative z-1">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 text-white shadow-sm flex-shrink-0"
              style={{ width: 42, height: 42, background: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="fw-bold text-white mb-0 fs-6 fs-md-4">Women Memberships</h4>
              <p className="text-white-50 small mb-0 fw-semibold d-none d-sm-block">
                Manage PAN India membership submissions & applications
              </p>
            </div>
          </div>

          <span className="badge rounded-pill px-3.5 py-2 fw-bold fs-7 flex-shrink-0 text-primary bg-white shadow-sm">
            {list.length} Applications
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
          <Loader2 className="spinner-border text-primary spinner-border-sm me-2" />
          <span className="text-muted fw-bold small">Loading membership records...</span>
        </div>
      ) : list.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm p-4 text-center bg-white my-3">
          <p className="text-muted fw-medium mb-0">No active or paid memberships found in database.</p>
        </div>
      ) : (
        /* PC Grid View: 2 Cards per Row (col-12 col-md-6) */
        <div className="row g-3">
          {list.map((item) => {
            const isOpen = openId === item.id;
            const statusUpper = (item.status || 'pending').toLowerCase();

            return (
              <div key={item.id} className="col-12 col-md-6">
                <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">

                  {/* Compact Header */}
                  <div
                    className="p-3 d-flex align-items-center justify-content-between"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    <div className="d-flex align-items-center gap-2.5 overflow-hidden me-2">
                      {/* Avatar */}
                      <div
                        className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold fs-6 flex-shrink-0 shadow-2xs"
                        style={{
                          width: 40,
                          height: 40,
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                        }}
                      >
                        {(item.fullName || item.name || 'W').charAt(0).toUpperCase()}
                      </div>

                      {/* Header Main Info */}
                      <div className="overflow-hidden">
                        <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                          <strong className="text-dark fw-bold fs-7 text-truncate">
                            {item.fullName || item.name}
                          </strong>

                          {/* Status Badge */}
                          {statusUpper === 'approved' ? (
                            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2.5 py-0.5 fs-9 fw-bold">
                              Approved
                            </span>
                          ) : statusUpper === 'rejected' ? (
                            <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-2.5 py-0.5 fs-9 fw-bold">
                              Rejected
                            </span>
                          ) : (
                            <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-2.5 py-0.5 fs-9 fw-bold">
                              Pending
                            </span>
                          )}

                          {/* Category Badge */}
                          <span className="badge bg-light text-secondary border rounded-pill px-2.5 py-0.5 fs-9 fw-normal text-truncate">
                            {item.category || 'Individual Business Owner'}
                          </span>
                        </div>

                        {/* Phone */}
                        <div className="d-flex align-items-center gap-1 text-muted fs-8 fw-medium">
                          <Phone size={12} className="text-success flex-shrink-0" />
                          <span>{item.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Button */}
                    <button className="btn btn-sm btn-light rounded-circle p-1.5 flex-shrink-0 border-0 bg-opacity-75">
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

                  {/* 🔽 Accordion Body */}
                  {isOpen && (
                    <div className="p-3 bg-light bg-opacity-50 border-top fs-8 text-secondary">

                      <div className="d-flex flex-column gap-2 mb-3">
                        {/* Email & Fee */}
                        <div className="d-flex align-items-center justify-content-between bg-white p-2.5 rounded-3 border">
                          <span className="d-flex align-items-center gap-2 text-truncate">
                            <Mail size={14} className="text-primary flex-shrink-0" />
                            <strong className="text-dark text-truncate">{item.id || item.email}</strong>
                          </span>
                          <span className="badge bg-light text-dark border rounded-pill px-2.5 py-1 fw-bold fs-8">
                            <Tag size={12} className="text-success me-1" /> Fee: ₹{item.amount || 999}
                          </span>
                        </div>

                        {/* Location */}
                        <div className="d-flex align-items-center gap-2 bg-white p-2.5 rounded-3 border">
                          <MapPin size={14} className="text-danger flex-shrink-0" />
                          <span className="text-dark fw-semibold">{item.city ? `${item.city}, ` : ''}{item.state}</span>
                        </div>

                        {/* Entity Name */}
                        {item.businessName && (
                          <div className="d-flex align-items-center gap-2 bg-white p-2.5 rounded-3 border">
                            <Briefcase size={14} className="text-purple-main flex-shrink-0" />
                            <span className="text-dark fw-semibold text-truncate">
                              Entity: <strong>{item.businessName}</strong>
                            </span>
                          </div>
                        )}

                        {/* Validity Dates */}
                        <div className="d-flex align-items-center justify-content-between bg-white p-2.5 rounded-3 border fs-8">
                          <span className="d-flex align-items-center gap-1 text-secondary">
                            <Clock size={13} className="text-warning" /> Joined: <strong>{item.startDate ? new Date(item.startDate).toLocaleDateString() : 'N/A'}</strong>
                          </span>
                          <span className="d-flex align-items-center gap-1 text-secondary">
                            Renews: <strong className={item.isExpired ? 'text-danger' : 'text-success'}>{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="d-flex align-items-center justify-content-between border-top pt-2 mt-1">
                        <small className="text-muted fs-8 fw-semibold d-flex align-items-center gap-1">
                          <ShieldCheck size={14} className="text-primary" /> Verified Action
                        </small>

                        <div className="d-flex align-items-center gap-2">
                          {statusUpper !== 'approved' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatus(item.id, 'approved'); }}
                              className="btn btn-sm btn-outline-success rounded-pill px-3 py-1 fw-semibold fs-8 d-inline-flex align-items-center gap-1 shadow-sm bg-white"
                            >
                              <Check size={13} /> Approve
                            </button>
                          )}

                          {statusUpper !== 'rejected' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatus(item.id, 'rejected'); }}
                              className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 fw-semibold fs-8 d-inline-flex align-items-center gap-1 shadow-sm bg-white"
                            >
                              <X size={13} /> Reject
                            </button>
                          )}

                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                            className="btn btn-sm btn-light border text-danger rounded-circle p-1.5 shadow-2xs"
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