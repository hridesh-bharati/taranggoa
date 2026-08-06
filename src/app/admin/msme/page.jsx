'use client';

import { useState, useEffect } from 'react';
import { msmeService } from '@/services/msme.service';
import { showToast } from '@/utils/toast';
import {
  Building2,
  Check,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Trash2,
  User,
  X,
  CreditCard,
  Landmark,
  TrendingUp,
  Fingerprint,
  Tag,
  Briefcase,
  FileCheck,
  Printer,
  ChevronDown,
  Search
} from 'lucide-react';
import '@/app/user/msme/msme.css';

export default function AdminMSMEPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [printData, setPrintData] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const data = await msmeService.getAllApplications();
      setList(data || []);
    } catch {
      showToast('error', 'Failed to fetch MSME records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  const handleStatusChange = async (email, status) => {
    try {
      await msmeService.updateStatus(email, status);
      setList(prev => prev.map(item => item.id === email ? { ...item, status } : item));
      showToast('success', `Updated to ${status}`);
    } catch {
      showToast('error', 'Status update failed');
    }
  };

  const handleDelete = async (email) => {
    if (!confirm('Delete this record?')) return;
    try {
      await msmeService.deleteApplication(email);
      setList(prev => prev.filter(item => item.id !== email));
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

  // Search Filter by Name, Email, or Mobile Number
  const filteredList = list.filter((item) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    const nameMatch = (item.applicantName || '').toLowerCase().includes(term);
    const emailMatch = (item.email || item.id || '').toLowerCase().includes(term);
    const phoneMatch = (item.phone || '').toLowerCase().includes(term);
    const firmMatch = (item.firmName || '').toLowerCase().includes(term);
    return nameMatch || emailMatch || phoneMatch || firmMatch;
  });

  if (loading) {
    return (
      <div className="text-center py-5 bg-white rounded-3 shadow-sm no-print">
        <Loader2 className="spinner-border text-primary spinner-border-sm me-2" />
        <span className="text-muted fw-bold small">Loading MSME records...</span>
      </div>
    );
  }

  return (
    <div className="container-fluid px-2 px-md-3 py-2 pb-5">

      {/* Printable Area Rules */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #official-print-msme-section, #official-print-msme-section * { visibility: visible; }
          #official-print-msme-section {
            position: absolute; left: 0; top: 0; width: 100%;
            background: #ffffff !important; color: #000000 !important; padding: 20px;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Top Banner Header */}
      <div className="rounded-3 overflow-hidden shadow-sm mb-3 no-print">
        <div className="gov-top-band p-2 px-3 fw-bold fs-8 text-uppercase text-center">
          ✨ OFFICIAL MEMBERSHIP PORTAL - TARANG WOMEN ENTREPRENEURS COMMUNITY
        </div>
        <div className="gov-portal-header p-3 p-md-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center justify-content-center rounded-3 text-white" style={{ width: 40, height: 40, background: 'rgba(255, 255, 255, 0.2)' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="fw-bold text-white mb-0 fs-6 fs-md-5">MSME Applications Control</h4>
              <p className="text-white-50 small mb-0 d-none d-sm-block">Manage member MSME requests and credentials</p>
            </div>
          </div>
          <span className="badge rounded-pill px-3 py-2 fw-bold fs-7 text-primary bg-white shadow-sm">
            {filteredList.length} / {list.length} Records
          </span>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="card border-0 rounded-3 bg-white p-2.5 shadow-sm mb-3 no-print">
        <div className="input-group">
          <span className="input-group-text bg-light border-0 text-muted">
            <Search size={16} />
          </span>
          <input
            type="text"
            className="form-control bg-light border-0 fs-8 fw-semibold"
            placeholder="Search MSME by Name, Mobile Number, Email, or Firm Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="btn btn-light border-0 text-muted fs-8" onClick={() => setSearchTerm('')}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Accordion Grid Layout (col-12 col-lg-6) */}
      {filteredList.length === 0 ? (
        <div className="card border-0 rounded-3 p-4 text-center bg-white shadow-sm text-muted fw-medium no-print">
          {searchTerm ? 'No MSME records matching your search.' : 'No MSME registration requests found.'}
        </div>
      ) : (
        <div className="row g-3 no-print">
          {filteredList.map((item) => {
            const isOpen = openId === item.id;
            const sections = [
              {
                title: '1. APPLICANT IDENTIFICATION',
                fields: [
                  { label: 'Name', val: item.applicantName, Icon: User, color: 'text-primary' },
                  { label: 'Phone', val: item.phone, Icon: Phone, color: 'text-success' },
                  { label: 'Email', val: item.email, Icon: Mail, color: 'text-primary' },
                  { label: 'Aadhaar', val: '[Aadhaar Redacted]', Icon: Fingerprint, color: 'text-danger' },
                  { label: 'PAN', val: item.panNumber, Icon: CreditCard, color: 'text-info' },
                  { label: 'GSTIN', val: item.gstinNumber || 'N/A', Icon: FileCheck, color: 'text-success' },
                ]
              },
              {
                title: '2. BUSINESS & FINANCIALS',
                fields: [
                  { label: 'Entity Type', val: item.entityType || 'Proprietorship', Icon: Briefcase, color: 'text-warning' },
                  { label: 'Scale', val: item.category || 'Micro', Icon: Tag, color: 'text-info' },
                  { label: 'Major Sector', val: item.businessType, Icon: Briefcase, color: 'text-danger' },
                  { label: 'NIC Code', val: item.nicCode || 'N/A', Icon: Tag, color: 'text-primary' },
                  { label: 'Investment', val: `₹${item.investmentAmount || '0'}`, Icon: TrendingUp, color: 'text-danger' },
                  { label: 'Annual Turnover', val: `₹${item.annualTurnover || '0'}`, Icon: TrendingUp, color: 'text-success' },
                ]
              },
              {
                title: '3. BANK & LOCATION DETAILS',
                fields: [
                  { label: 'Account No', val: item.bankAccountNo || 'N/A', Icon: Landmark, color: 'text-success' },
                  { label: 'IFSC Code', val: item.ifscCode || 'N/A', Icon: Landmark, color: 'text-info' },
                  { label: 'Office Address', val: item.address ? `${item.address}, ${item.city || ''}, ${item.state || ''}` : 'N/A', Icon: MapPin, color: 'text-danger', full: true },
                ]
              }
            ];

            return (
              <div key={item.id} className="col-12 col-lg-6">
                <div className="card border-0 rounded-3 bg-white shadow-sm overflow-hidden">

                  {/* Compact Header Bar (Accordion Trigger) */}
                  <div
                    className="p-3 d-flex align-items-center justify-content-between bg-white"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                  >
                    <div className="d-flex align-items-center gap-2.5 overflow-hidden me-2">
                      <div className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 38, height: 38 }}>
                        <Building2 size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <div className="d-flex align-items-center gap-2 mb-0.5">
                          <strong className="text-dark fw-bold fs-7 text-truncate">
                            {item.firmName || 'Unnamed Enterprise'}
                          </strong>
                          <span className={`badge rounded-pill px-2.5 py-0.5 fs-9 fw-bold ${item.status === 'COMPLETED' ? 'bg-success text-white' : item.status === 'REJECTED' ? 'bg-danger text-white' : 'bg-warning text-dark'}`}>
                            {item.status || 'PENDING'}
                          </span>
                        </div>
                        <div className="text-muted fs-8 fw-medium text-truncate">
                          {item.applicantName || 'Member'} • {item.phone || 'N/A'}
                        </div>
                      </div>
                    </div>

                    <button className="btn btn-sm btn-light rounded-circle p-1.5 flex-shrink-0 border-0">
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

                  {/* Accordion Expandable Content */}
                  {isOpen && (
                    <div className="p-3 bg-light bg-opacity-50 border-top">
                      <div className="row g-3">
                        {sections.map((sec, sIdx) => (
                          <div key={sIdx} className="col-12">
                            <div className="gov-section-strip mb-2">{sec.title}</div>
                            <div className="row g-2">
                              {sec.fields.map((f, fIdx) => (
                                <div key={fIdx} className={f.full ? 'col-12' : 'col-12 col-sm-6'}>
                                  <div className="p-2 bg-white rounded-3 border d-flex align-items-center gap-2 h-100">
                                    <f.Icon size={15} className={`${f.color} flex-shrink-0 ms-1`} />
                                    <div className="overflow-hidden">
                                      <small className="text-muted d-block fs-9 fw-bold text-uppercase" style={{ fontSize: '10px' }}>
                                        {f.label}
                                      </small>
                                      <span className="fw-bold text-dark fs-8 text-truncate d-block">
                                        {f.val || 'N/A'}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Bar */}
                      <div className="d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top">
                        <button onClick={(e) => { e.stopPropagation(); handlePrint(item); }} className="btn btn-sm btn-primary rounded-pill px-3 py-1 fs-8 fw-bold d-inline-flex align-items-center gap-1 shadow-sm">
                          <Printer size={13} /> Print Form
                        </button>
                        {item.status !== 'COMPLETED' && (
                          <button onClick={(e) => { e.stopPropagation(); handleStatusChange(item.id, 'COMPLETED'); }} className="btn btn-sm btn-outline-success rounded-pill px-3 py-1 fs-8 fw-bold bg-white">
                            <Check size={13} className="me-1" /> Complete
                          </button>
                        )}
                        {item.status !== 'REJECTED' && (
                          <button onClick={(e) => { e.stopPropagation(); handleStatusChange(item.id, 'REJECTED'); }} className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 fs-8 fw-bold bg-white">
                            <X size={13} className="me-1" /> Reject
                          </button>
                        )}
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="btn btn-sm btn-light text-danger rounded-circle p-1.5 border-0" title="Delete">
                          <Trash2 size={13} />
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Printable Template Section */}
      {printData && (
        <div id="official-print-msme-section" className="d-none d-print-block p-4 bg-white">
          <div className="border border-3 p-4 rounded-3" style={{ borderColor: '#1e3a8a' }}>

            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
              <div>
                <h2 className="fw-bold mb-0" style={{ color: '#1e3a8a' }}>TARANG WOMEN COMMUNITY</h2>
                <small className="text-muted d-block">Official MSME / Udyam Registration Assistance Application</small>
              </div>
              <div className="text-end">
                <span className="badge bg-primary text-white px-3 py-1 fs-7 fw-bold mb-1">MSME FORM</span>
                <p className="small text-muted mb-0">Date: {new Date().toLocaleDateString('en-IN')}</p>
              </div>
            </div>

            <div className="row mb-4 fs-7 g-3">
              <div className="col-6">
                <h6 className="fw-bold text-uppercase fs-9 text-muted mb-2 border-bottom pb-1">1. Applicant Details:</h6>
                <p className="mb-1"><strong>Name:</strong> {printData.applicantName || 'N/A'}</p>
                <p className="mb-1"><strong>Email:</strong> {printData.email}</p>
                <p className="mb-1"><strong>Phone:</strong> {printData.phone || 'N/A'}</p>
                <p className="mb-1"><strong>Aadhaar:</strong> [Aadhaar Redacted]</p>
                <p className="mb-1"><strong>PAN:</strong> {printData.panNumber || 'N/A'}</p>
                <p className="mb-0"><strong>GSTIN:</strong> {printData.gstinNumber || 'N/A'}</p>
              </div>

              <div className="col-6 border-start ps-3">
                <h6 className="fw-bold text-uppercase fs-9 text-muted mb-2 border-bottom pb-1">2. Enterprise Details:</h6>
                <p className="mb-1"><strong>Firm Name:</strong> {printData.firmName || 'N/A'}</p>
                <p className="mb-1"><strong>Entity Type:</strong> {printData.entityType || 'Proprietorship'}</p>
                <p className="mb-1"><strong>Category Scale:</strong> {printData.category || 'Micro'}</p>
                <p className="mb-1"><strong>Sector:</strong> {printData.businessType || 'N/A'}</p>
                <p className="mb-1"><strong>NIC Code:</strong> {printData.nicCode || 'N/A'}</p>
                <p className="mb-0"><strong>Status:</strong> <strong className="text-success">{printData.status?.toUpperCase() || 'PENDING'}</strong></p>
              </div>
            </div>

            <div className="row mb-4 fs-7 g-3">
              <div className="col-6">
                <h6 className="fw-bold text-uppercase fs-9 text-muted mb-2 border-bottom pb-1">3. Financials & Bank:</h6>
                <p className="mb-1"><strong>Bank Account:</strong> {printData.bankAccountNo || 'N/A'}</p>
                <p className="mb-1"><strong>IFSC Code:</strong> {printData.ifscCode || 'N/A'}</p>
                <p className="mb-1"><strong>Investment:</strong> ₹{printData.investmentAmount || '0'}</p>
                <p className="mb-0"><strong>Turnover:</strong> ₹{printData.annualTurnover || '0'}</p>
              </div>

              <div className="col-6 border-start ps-3">
                <h6 className="fw-bold text-uppercase fs-9 text-muted mb-2 border-bottom pb-1">4. Address Details:</h6>
                <p className="mb-0"><strong>Address:</strong> {printData.address ? `${printData.address}, ${printData.city || ''}, ${printData.state || ''}` : 'N/A'}</p>
              </div>
            </div>

            <div className="border-top pt-3 d-flex justify-content-between align-items-center">
              <small className="text-muted">Computer generated official MSME registration application copy.</small>
              <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 fw-bold fs-8">
                ✓ VERIFIED MEMBER APPLICATION
              </span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}