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
    <div className="container-fluid p-3 mb-6 pb-6 min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      
      {/* Header & Search */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
        <div>
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <Inbox className="text-primary" size={24} /> Inbox
          </h4>
          <small className="text-secondary fw-medium">Manage user inquiries submitted through the contact form</small>
        </div>

        <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
          <div className="input-group shadow-sm rounded-pill overflow-hidden bg-white border flex-grow-1 flex-md-grow-0" style={{ maxWidth: 320 }}>
            <span className="input-group-text bg-transparent border-0 text-muted ps-3">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control border-0 bg-transparent small py-2"
              placeholder="Search sender, email, topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button 
            onClick={fetchInquiries} 
            className="btn btn-light border rounded-circle p-2 text-secondary shadow-sm flex-shrink-0"
            title="Refresh Messages"
          >
            <RefreshCw size={16} className={loading ? 'spin-animation' : ''} />
          </button>
        </div>
      </div>

      {/* Messages Grid */}
      {loading ? (
        <div className="text-center py-5">
          <Loader2 className="spinner-border text-primary" size={32} />
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-white">
          <p className="text-muted fw-medium small mb-0">No contact messages found.</p>
        </div>
      ) : (
        <div className="row g-4 mb-5 mb-lg-0  pb-2 align-items-start">
          {filteredInquiries.map((item) => (
            <div key={item.id} className="col-12 col-md-6 col-xl-4">
              <div 
                className="card border-0 rounded-4 overflow-hidden shadow-sm h-100 position-relative bg-white"
                style={{
                  borderLeft: item.status === 'unread' ? '4px solid #0d6efd' : '4px solid #dee2e6'
                }}
              >
                {/* Header Badge */}
                <div className="p-3 border-bottom d-flex align-items-center justify-content-between bg-light">
                  <div className="d-flex align-items-center gap-2">
                    <div 
                      className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold shadow-sm flex-shrink-0"
                      style={{ 
                        width: 38, 
                        height: 38, 
                        background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)' 
                      }}
                    >
                      {item.name ? item.name.charAt(0).toUpperCase() : <User size={18} />}
                    </div>
                    <div className="overflow-hidden">
                      <h6 className="fw-bold text-dark mb-0 text-truncate">{item.name || 'Anonymous User'}</h6>
                      <small className="text-muted small d-flex align-items-center gap-1">
                        <Clock size={11} /> {formatTime(item.createdAt)}
                      </small>
                    </div>
                  </div>

                  <span className={`badge rounded-pill px-2.5 py-1 small fw-bold flex-shrink-0 ${item.status === 'unread' ? 'bg-primary text-white shadow-sm' : 'bg-white text-secondary border'}`}>
                    {item.status === 'unread' ? 'New' : 'Read'}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                  <div>
                    {/* Subject */}
                    {item.subject && (
                      <div className="mb-2">
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1 small fw-bold">
                          Topic: {item.subject}
                        </span>
                      </div>
                    )}

                    {/* Message Box */}
                    <p className="small text-secondary bg-light p-3 rounded-3 border-0 mb-3 text-break" style={{ minHeight: 75, lineHeight: 1.5 }}>
                      "{item.message}"
                    </p>

                    {/* Contact Info */}
                    <div className="d-flex flex-column gap-1 small text-secondary mb-3 bg-white p-2.5 rounded-3 border">
                      <span className="d-flex align-items-center gap-2 text-truncate">
                        <Mail size={14} className="text-primary flex-shrink-0" /> 
                        <span className="text-dark fw-medium text-truncate">{item.email}</span>
                      </span>
                      {item.phone && (
                        <span className="d-flex align-items-center gap-2 text-truncate">
                          <Phone size={14} className="text-success flex-shrink-0" /> 
                          <span className="text-dark fw-medium">{item.phone}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="d-flex align-items-center justify-content-between border-top pt-2.5 mt-auto">
                    {item.status === 'unread' ? (
                      <button 
                        onClick={() => handleMarkAsRead(item.id)}
                        className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 fw-semibold small d-flex align-items-center gap-1 shadow-sm"
                      >
                        <CheckCircle2 size={14} /> Mark Read
                      </button>
                    ) : (
                      <span className="text-muted small fw-medium d-flex align-items-center gap-1">
                        <CheckCircle2 size={14} className="text-success" /> Processed
                      </span>
                    )}

                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-sm btn-light text-danger border rounded-circle p-2 shadow-sm" 
                      title="Delete Inquiry"
                    >
                      <Trash2 size={14} />
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