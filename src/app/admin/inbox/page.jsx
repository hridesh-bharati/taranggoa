// src\app\admin\inbox\page.jsx
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
  Search, 
  RefreshCw,
  User
} from 'lucide-react';

export default function AdminInboxPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await contactService.getAllInquiries();
      setInquiries(data);
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
      setInquiries(inquiries.map(item => item.id === id ? { ...item, status: 'read' } : item));
      showToast('success', 'Marked as read');
    } catch {
      showToast('error', 'Action failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      await contactService.deleteInquiry(id);
      setInquiries(inquiries.filter(item => item.id !== id));
      showToast('success', 'Message deleted');
    } catch {
      showToast('error', 'Delete failed');
    }
  };

  const formatTime = (ts) => ts?.toDate ? ts.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recently';

  const filteredInquiries = inquiries.filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.subject?.toLowerCase().includes(term) ||
      item.message?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="container-fluid py-3 px-3 px-lg-4 min-vh-100">
      
      {/* Header & Search */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-black text-dark mb-1 fs-4 d-flex align-items-center gap-2">
            <Inbox className="text-primary" size={24} /> Contact Messages Inbox
          </h4>
          <small className="text-muted fw-medium">Manage user inquiries submitted through the contact form</small>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div className="input-group shadow-sm rounded-pill overflow-hidden bg-white border" style={{ maxWidth: 300 }}>
            <span className="input-group-text bg-transparent border-0 text-muted ps-3">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control border-0 bg-transparent fs-7 py-2"
              placeholder="Search sender, email, topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button 
            onClick={fetchInquiries} 
            className="btn btn-light border rounded-circle p-2 text-secondary shadow-sm"
            title="Refresh Messages"
          >
            <RefreshCw size={16} className={loading ? 'spin-animation' : ''} />
          </button>
        </div>
      </div>

      {/* Messages Grid (Blue Gradient + Glassmorphism Cards) */}
      {loading ? (
        <div className="text-center py-5">
          <Loader2 className="spinner-border text-primary" />
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-white">
          <p className="text-muted fw-medium mb-0">No contact messages found.</p>
        </div>
      ) : (
        <div className="row g-4 align-items-start">
          {filteredInquiries.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-xl-4">
              <div 
                className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 position-relative transition-all"
                style={{
                  background: 'linear-gradient(135deg, rgba(224, 242, 254, 0.85) 0%, rgba(240, 249, 255, 0.95) 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: item.status === 'unread' ? '1px solid rgba(2, 132, 199, 0.4)' : '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Header Badge */}
                <div className="p-3 border-bottom d-flex align-items-center justify-content-between bg-white bg-opacity-50">
                  <div className="d-flex align-items-center gap-2">
                    <div 
                      className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold shadow-sm"
                      style={{ 
                        width: 36, 
                        height: 36, 
                        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' 
                      }}
                    >
                      {item.name ? item.name.charAt(0).toUpperCase() : <User size={18} />}
                    </div>
                    <div>
                      <h6 className="fw-bold text-dark mb-0 fs-7">{item.name || 'Anonymous User'}</h6>
                      <small className="text-muted fs-8 d-flex align-items-center gap-1">
                        <Clock size={11} /> {formatTime(item.createdAt)}
                      </small>
                    </div>
                  </div>

                  <span className={`badge rounded-pill px-2.5 py-1 fs-8 fw-bold ${item.status === 'unread' ? 'bg-primary text-white shadow-sm' : 'bg-light text-secondary border'}`}>
                    {item.status === 'unread' ? 'New Message' : 'Read'}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-3">
                  {/* Subject */}
                  {item.subject && (
                    <div className="mb-2">
                      <span className="badge bg-white text-primary border rounded-pill px-2.5 py-1 fs-8 fw-bold mb-1">
                        Topic: {item.subject}
                      </span>
                    </div>
                  )}

                  {/* Message Box */}
                  <p className="fs-7 text-dark fw-normal bg-white bg-opacity-60 p-3 rounded-3 border mb-3 text-break" style={{ minHeight: 80 }}>
                    "{item.message}"
                  </p>

                  {/* Contact Info */}
                  <div className="d-flex flex-column gap-1 fs-8 text-secondary mb-3 bg-white bg-opacity-40 p-2 rounded-2 border">
                    <span className="d-flex align-items-center gap-1.5 text-truncate">
                      <Mail size={13} className="text-primary flex-shrink-0" /> {item.email}
                    </span>
                    {item.phone && (
                      <span className="d-flex align-items-center gap-1.5 text-truncate">
                        <Phone size={13} className="text-success flex-shrink-0" /> {item.phone}
                      </span>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                    {item.status === 'unread' ? (
                      <button 
                        onClick={() => handleMarkAsRead(item.id)}
                        className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-bold fs-8 d-flex align-items-center gap-1"
                      >
                        <CheckCircle2 size={13} /> Mark Read
                      </button>
                    ) : (
                      <span className="text-muted fs-8 fw-semibold d-flex align-items-center gap-1">
                        <CheckCircle2 size={13} className="text-success" /> Processed
                      </span>
                    )}

                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-sm btn-link text-danger p-0 border-0" 
                      title="Delete Inquiry"
                    >
                      <Trash2 size={16} />
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