'use client';

import { useState, useEffect } from 'react';
import { membershipController } from '@/controllers/membership.controller';
import { userService } from '@/services/user.service';
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
  Printer
} from 'lucide-react';

export default function AdminMembershipsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [printData, setPrintData] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [membershipData, usersData] = await Promise.all([
        membershipController.fetchAdminList().catch(() => []),
        userService.getAllUsers().catch(() => [])
      ]);

      const photoMap = {};
      (usersData || []).forEach((u) => {
        if (u.email) photoMap[u.email.toLowerCase()] = u.photoURL || u.image || '';
        if (u.uid) photoMap[u.uid] = u.photoURL || u.image || '';
      });

      const enrichedList = (membershipData || []).map((m) => {
        const userEmailKey = (m.email || m.id || '').toLowerCase();
        const userUidKey = m.uid || '';
        const syncedPhoto = m.photoURL || m.image || photoMap[userEmailKey] || photoMap[userUidKey] || '';

        return {
          ...m,
          photoURL: syncedPhoto
        };
      });

      setList(enrichedList);
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

  const handlePrint = (item) => {
    setPrintData(item);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="container-fluid px-2 px-md-3 py-2 pb-5">

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #official-print-bill-section, #official-print-bill-section * {
            visibility: visible;
          }
          #official-print-bill-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: #ffffff !important;
            color: #000000 !important;
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Banner */}
      <div
        className="card border-0 rounded-4 p-3 p-md-4 mb-3 position-relative overflow-hidden no-print bg-primary-gradient"
      >
        <Users size={140} className="position-absolute end-0 bottom-0 text-white opacity-10" style={{ pointerEvents: 'none' }} />

        <div className="d-flex align-items-center justify-content-between position-relative z-1">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 text-white flex-shrink-0"
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

          <span className="badge rounded-pill px-3 py-2 fw-bold fs-7 flex-shrink-0 text-primary bg-white">
            {list.length} Applications
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5 bg-white rounded-4 no-print">
          <Loader2 className="spinner-border text-primary spinner-border-sm me-2" />
          <span className="text-muted fw-bold small">Loading membership records...</span>
        </div>
      ) : list.length === 0 ? (
        <div className="card border-0 rounded-4 p-4 text-center bg-white my-3 no-print">
          <p className="text-muted fw-medium mb-0">No active or paid memberships found in database.</p>
        </div>
      ) : (
        <div className="row g-3 no-print">
          {list.map((item) => {
            const isOpen = openId === item.id;
            const statusUpper = (item.status || 'pending').toLowerCase();

            return (
              <div key={item.id} className="col-12 col-md-6">
                <div className="card border-0 rounded-4 bg-white overflow-hidden">

                  <div
                    className="p-3 d-flex align-items-center justify-content-between"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    <div className="d-flex align-items-center gap-3 overflow-hidden me-2">
                      <div
                        className="rounded-circle overflow-hidden bg-light d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{
                          width: 44,
                          height: 44,
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                        }}
                      >
                        {item.photoURL ? (
                          <img src={item.photoURL} alt={item.fullName || 'User'} className="w-100 h-100 object-fit-cover" />
                        ) : (
                          <span className="fw-bold text-white fs-6">
                            {(item.fullName || item.name || 'W').charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>

                      <div className="overflow-hidden">
                        <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                          <strong className="text-dark fw-bold fs-7 text-truncate">
                            {item.fullName || item.name}
                          </strong>

                          {statusUpper === 'approved' ? (
                            <span className="badge bg-success-subtle text-success rounded-pill px-2.5 py-0.5 fs-9 fw-bold">
                              Approved
                            </span>
                          ) : statusUpper === 'rejected' ? (
                            <span className="badge bg-danger-subtle text-danger rounded-pill px-2.5 py-0.5 fs-9 fw-bold">
                              Rejected
                            </span>
                          ) : (
                            <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill px-2.5 py-0.5 fs-9 fw-bold">
                              Pending
                            </span>
                          )}

                          <span className="badge bg-light text-secondary rounded-pill px-2.5 py-0.5 fs-9 fw-normal text-truncate">
                            {item.category || 'Individual Business Owner'}
                          </span>
                        </div>

                        <div className="d-flex align-items-center gap-2 text-muted fs-8 fw-medium">
                          <Phone size={13} className="text-success flex-shrink-0" />
                          <span>{item.phone}</span>
                        </div>
                      </div>
                    </div>

                    <button className="btn btn-sm btn-light rounded-circle p-2 flex-shrink-0 border-0">
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

                  {isOpen && (
                    <div className="p-3 bg-light bg-opacity-50 fs-8 text-secondary">
                      <div className="d-flex flex-column gap-2 mb-3">
                        <div className="d-flex align-items-center justify-content-between bg-white p-2.5 rounded-3">
                          <span className="d-flex align-items-center gap-2 text-truncate">
                            <Mail size={15} className="text-primary flex-shrink-0" />
                            <strong className="text-dark text-truncate">{item.email || item.id}</strong>
                          </span>
                          <span className="badge bg-light text-dark rounded-pill px-2.5 py-1 fw-bold fs-8">
                            Fee: ₹{item.amount || 999}
                          </span>
                        </div>

                        <div className="d-flex align-items-center gap-2 bg-white p-2.5 rounded-3">
                          <MapPin size={15} className="text-danger flex-shrink-0" />
                          <span className="text-dark fw-semibold">{item.city ? `${item.city}, ` : ''}{item.state}</span>
                        </div>

                        {item.businessName && (
                          <div className="d-flex align-items-center gap-2 bg-white p-2.5 rounded-3">
                            <Briefcase size={15} className="text-primary flex-shrink-0" />
                            <span className="text-dark fw-semibold text-truncate">
                              Entity: <strong>{item.businessName}</strong>
                            </span>
                          </div>
                        )}

                        <div className="d-flex align-items-center justify-content-between bg-white p-2.5 rounded-3 fs-8">
                          <span className="d-flex align-items-center gap-2 text-secondary">
                            <Clock size={14} className="text-warning" /> Joined: <strong>{item.startDate ? new Date(item.startDate).toLocaleDateString() : 'N/A'}</strong>
                          </span>
                          <span className="d-flex align-items-center gap-2 text-secondary">
                            Renews: <strong className={item.isExpired ? 'text-danger' : 'text-success'}>{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}</strong>
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between pt-2">
                        <small className="text-muted fs-8 fw-semibold d-flex align-items-center gap-1">
                          <ShieldCheck size={14} className="text-primary" /> Verified Record
                        </small>

                        <div className="d-flex align-items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePrint(item); }}
                            className="btn btn-sm btn-primary rounded-pill px-3 py-1 fw-semibold fs-8 d-inline-flex align-items-center gap-1"
                            title="Print Official Invoice / Bill"
                          >
                            <Printer size={13} /> Print Bill
                          </button>

                          {statusUpper !== 'approved' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatus(item.id, 'approved'); }}
                              className="btn btn-sm btn-outline-success rounded-pill px-3 py-1 fw-semibold fs-8 d-inline-flex align-items-center gap-1 bg-white"
                            >
                              <Check size={13} /> Approve
                            </button>
                          )}

                          {statusUpper !== 'rejected' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatus(item.id, 'rejected'); }}
                              className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 fw-semibold fs-8 d-inline-flex align-items-center gap-1 bg-white"
                            >
                              <X size={13} /> Reject
                            </button>
                          )}

                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                            className="btn btn-sm btn-light text-danger rounded-circle p-2 border-0"
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

      {/* Printable Receipt */}
      {printData && (
        <div id="official-print-bill-section" className="d-none d-print-block">
          <div className="p-4 rounded-3 bg-white" style={{ maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-4">
              <div>
                <h2 className="fw-bold text-primary mb-1" style={{ color: '#1d4ed8' }}>TARANG WOMEN COMMUNITY</h2>
                <p className="text-muted small mb-0">Official Membership Tax Invoice & Payment Receipt</p>
                <small className="text-secondary">PAN India Women Empowerment Portal</small>
              </div>
              <div className="text-end">
                <span className="badge bg-primary text-white px-3 py-1 fs-7 fw-bold mb-2">OFFICIAL RECEIPT</span>
                <p className="small text-muted mb-0">Receipt ID: <strong>REC-{printData.id?.substring(0, 8).toUpperCase() || '1002'}</strong></p>
                <p className="small text-muted mb-0">Date: <strong>{new Date().toLocaleDateString('en-IN')}</strong></p>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-6">
                <h6 className="fw-bold text-uppercase text-secondary fs-9 mb-2">Billed To (Member Details):</h6>
                <p className="fw-bold text-dark mb-1 fs-6">{printData.fullName || printData.name || 'Member'}</p>
                <p className="small text-muted mb-1">Email: {printData.email || printData.id}</p>
                <p className="small text-muted mb-1">Phone: {printData.phone || 'N/A'}</p>
                <p className="small text-muted mb-0">Location: {printData.city ? `${printData.city}, ` : ''}{printData.state || 'India'}</p>
              </div>
              <div className="col-6 border-start ps-4">
                <h6 className="fw-bold text-uppercase text-secondary fs-9 mb-2">Organization / Business Details:</h6>
                <p className="fw-bold text-dark mb-1 fs-6">{printData.businessName || 'Individual Business'}</p>
                <p className="small text-muted mb-1">Category: {printData.category || 'Entrepreneur'}</p>
                <p className="small text-muted mb-1">Membership Status: <span className="text-success fw-bold">{printData.status?.toUpperCase() || 'APPROVED'}</span></p>
                <p className="small text-muted mb-0">Validity: 1 Year (365 Days)</p>
              </div>
            </div>

            <table className="table table-bordered mb-4 align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Description / Service</th>
                  <th>Join Date</th>
                  <th>Expiry Date</th>
                  <th className="text-end">Amount Paid</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <strong>Annual Women Entrepreneurship Membership Pass</strong>
                    <br />
                    <small className="text-muted">Access to PAN India Business Network & Directory</small>
                  </td>
                  <td>{printData.startDate ? new Date(printData.startDate).toLocaleDateString('en-IN') : 'N/A'}</td>
                  <td>{printData.expiryDate ? new Date(printData.expiryDate).toLocaleDateString('en-IN') : 'N/A'}</td>
                  <td className="text-end fw-bold">₹{printData.amount || 999}.00</td>
                </tr>
              </tbody>
            </table>

            <div className="p-3 bg-light rounded-3 mb-4">
              <div className="row fs-8">
                <div className="col-6 mb-1">
                  <span className="text-muted">Payment Status:</span> <strong className="text-success">{printData.paymentStatus || 'PAID'}</strong>
                </div>
                <div className="col-6 mb-1">
                  <span className="text-muted">Payment Mode:</span> <strong>Online / Razorpay UPI</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted">Razorpay Payment ID:</span> <span className="font-monospace fw-bold">{printData.razorpayPaymentId || 'N/A'}</span>
                </div>
                <div className="col-6">
                  <span className="text-muted">Razorpay Order ID:</span> <span className="font-monospace fw-bold">{printData.razorpayOrderId || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="row align-items-center mb-5">
              <div className="col-7">
                <small className="text-muted d-block">This is a computer-generated official receipt for Tarang Community Membership. No signature required.</small>
              </div>
              <div className="col-5">
                <div className="border-top pt-2">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Subtotal:</span>
                    <span>₹{printData.amount || 999}.00</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Tax / GST (Exempted):</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="d-flex justify-content-between fs-6 fw-bold text-dark border-top pt-2">
                    <span>Total Amount Paid:</span>
                    <span className="text-primary">₹{printData.amount || 999}.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-top pt-3 d-flex justify-content-between align-items-center">
              <small className="text-muted">Authorized Signatory - Tarang Admin Portal</small>
              <div className="text-end">
                <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 fw-bold fs-8">
                  ✓ VERIFIED PAYMENT & MEMBERSHIP
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}