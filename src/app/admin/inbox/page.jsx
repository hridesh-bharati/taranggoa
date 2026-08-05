'use client';

import { useState, useEffect } from 'react';
import { contactService } from '@/services/contact.service';
import { showToast } from '@/utils/toast';
import {
  Inbox,
  Mail,
  Phone,
  Trash2,
  Clock,
  CheckCircle2,
  Loader2,
  User
} from 'lucide-react';

export default function AdminInboxPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await contactService.getAllInquiries();
      setInquiries(data || []);
    } catch {
      showToast('error', 'Failed to load inbox messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await contactService.markAsRead(id);
      setInquiries(prev => prev.map(item => item.id === id ? { ...item, status: 'read' } : item));
      showToast('success', 'Marked as read');
    } catch {
      showToast('error', 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await contactService.deleteInquiry(id);
      setInquiries(prev => prev.filter(item => item.id !== id));
      showToast('success', 'Message deleted');
    } catch {
      showToast('error', 'Delete failed');
    }
  };

  const formatTime = (ts) => ts?.toDate ? ts.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently';

  return (
    <div className="container-fluid pb-2 mb-5 px-md-4">

      {/* Compact Gradient Header */}
      <div
        className="card border-0 rounded-4 shadow-sm p-3 mb-3"
        style={{ background: 'linear-gradient(135deg, #eef2f7 0%, #e6edf5 100%)' }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
              <Inbox className="text-primary" size={22} /> Inbox
            </h5>
            <small className="text-secondary fs-8">User inquiries and contact submissions</small>
          </div>

          <span className="badge bg-white text-primary border shadow-sm rounded-pill px-3 py-2 fw-bold fs-7">
            {inquiries.length} Messages
          </span>
        </div>
      </div>

      {/* Messages Grid */}
      {loading ? (
        <div className="text-center py-5">
          <Loader2 className="spinner-border text-primary" style={{ width: '2rem', height: '2rem' }} />
        </div>
      ) : inquiries.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm p-4 text-center bg-white my-3">
          <p className="text-muted fw-medium mb-0 fs-7">No contact messages found in database.</p>
        </div>
      ) : (
        <div className="row g-3">
          {inquiries.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-xl-4 p-0">
              <div
                className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 bg-white"
                style={{
                  borderLeft: item.status === 'unread' ? '4px solid #0d6efd' : '4px solid #dee2e6'
                }}
              >
                {/* Card Header */}
                <div className="p-3 border-bottom d-flex align-items-center justify-content-between bg-light">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0"
                      style={{
                        width: 36,
                        height: 36,
                        background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)'
                      }}
                    >
                      {item.name ? item.name.charAt(0).toUpperCase() : <User size={16} />}
                    </div>
                    <div className="overflow-hidden">
                      <h6 className="fw-bold text-dark mb-0 text-truncate fs-7">{item.name || 'Anonymous User'}</h6>
                      <small className="text-muted fs-8 d-flex align-items-center gap-1">
                        <Clock size={11} /> {formatTime(item.createdAt)}
                      </small>
                    </div>
                  </div>

                  <span className={`badge rounded-pill px-2.5 py-1 fs-8 fw-bold flex-shrink-0 ${item.status === 'unread' ? 'bg-primary text-white shadow-sm' : 'bg-white text-secondary border'}`}>
                    {item.status === 'unread' ? 'New' : 'Read'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    {item.subject && (
                      <div className="mb-2">
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1 fs-8 fw-bold">
                          Topic: {item.subject}
                        </span>
                      </div>
                    )}

                    <p className="fs-7 text-secondary bg-light p-3 rounded-3 border-0 mb-3 text-break" style={{ minHeight: 65, lineHeight: 1.5 }}>
                      "{item.message}"
                    </p>

                    <div className="d-flex flex-column gap-1 fs-8 text-secondary mb-3 bg-white p-2 rounded-3 border">
                      <span className="d-flex align-items-center gap-2 text-truncate">
                        <Mail size={13} className="text-primary flex-shrink-0" />
                        <span className="text-dark fw-medium text-truncate">{item.email}</span>
                      </span>
                      {item.phone && (
                        <span className="d-flex align-items-center gap-2 text-truncate">
                          <Phone size={13} className="text-success flex-shrink-0" />
                          <span className="text-dark fw-medium">{item.phone}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="d-flex align-items-center justify-content-between border-top pt-2 mt-auto">
                    {item.status === 'unread' ? (
                      <button
                        onClick={() => handleMarkAsRead(item.id)}
                        className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-semibold fs-8 d-flex align-items-center gap-1 shadow-sm"
                      >
                        <CheckCircle2 size={13} /> Mark Read
                      </button>
                    ) : (
                      <span className="text-muted fs-8 fw-medium d-flex align-items-center gap-1">
                        <CheckCircle2 size={13} className="text-success" /> Processed
                      </span>
                    )}

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-sm btn-light text-danger border rounded-circle p-1.5 shadow-sm"
                      title="Delete Inquiry"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}