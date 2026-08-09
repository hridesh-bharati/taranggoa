'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  ShieldCheck,
  Award,
  Sparkles,
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Tag,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Loader2,
  Calendar,
  FileText,
  Timer,
  Printer,
  QrCode
} from 'lucide-react';

export default function UserMembershipPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [membership, setMembership] = useState(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    async function fetchUserMembership() {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const cleanEmail = user.email.toLowerCase().trim();
        const docRef = doc(db, 'memberships', cleanEmail);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMembership({
            id: docSnap.id,
            ...docSnap.data()
          });
        }
      } catch (err) {
        console.error('Error fetching user membership:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserMembership();
  }, [user]);

  // Live Timer
  useEffect(() => {
    if (!membership?.expiryDate) return;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(membership.expiryDate).getTime();
      const diff = expiry - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [membership?.expiryDate]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-white my-3">
        <Loader2 size={32} className="spinner-border text-primary mx-auto mb-2" />
        <span className="text-muted fw-bold fs-7">Loading credentials...</span>
      </div>
    );
  }

  if (!membership) {
    return (
      <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden text-center my-3">
        <div className="p-2 text-white fw-bold fs-7 text-uppercase" style={{ backgroundColor: '#800020' }}>
          ✨ OFFICIAL MEMBERSHIP PORTAL - TARANG WOMEN ENTREPRENEURS COMMUNITY
        </div>
        <div className="p-4 p-md-5">
          <div
            className="p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto"
            style={{ width: 64, height: 64, backgroundColor: 'rgba(128, 0, 32, 0.08)', color: '#800020' }}
          >
            <Award size={32} />
          </div>
          <h5 className="fw-bold text-dark mb-2">No Active Membership Found</h5>
          <p className="text-muted fs-7 mb-4">You have not registered for an official membership pass yet.</p>
          <div>
            <a href="/membership-user-page" className="btn rounded-pill px-4 py-2.5 fw-bold fs-7 text-white shadow-sm" style={{ backgroundColor: '#800020' }}>
              Apply Now (₹999 / Year)
            </a>
          </div>
        </div>
      </div>
    );
  }

  const formatDigit = (num) => (num < 10 ? `0${num}` : num);
  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(
    `upi://pay?pa=taranggoa@upi&pn=Tarang%20Community&am=999&cu=INR&tn=Membership%20Renewal%20${membership.email || ''}`
  )}`;

  const paymentHistoryList = membership.paymentHistory || [
    {
      amount: membership.amount || 999,
      date: membership.startDate || new Date().toISOString(),
      paymentId: membership.lastTransactionId || 'N/A',
      status: membership.paymentStatus || 'PAID'
    }
  ];

  return (
    <div className="d-flex flex-column gap-3 py-2">

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #printable-pass-section, #printable-pass-section * { visibility: visible; }
          #printable-pass-section { position: absolute; left: 0; top: 0; width: 100%; background: #fff !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Hero Banner Header */}
      <div className="rounded-4 overflow-hidden shadow-sm no-print">
        <div className="p-2 px-3 text-white fw-bold fs-8 d-flex align-items-center justify-content-between" style={{ backgroundColor: '#800020' }}>
          <span>✨ OFFICIAL MEMBERSHIP PORTAL - TARANG COMMUNITY</span>
          <button onClick={handlePrint} className="btn btn-sm bg-white text-dark rounded-pill fw-bold fs-8 d-inline-flex align-items-center gap-1 shadow-sm">
            <Printer size={14} /> Print Pass
          </button>
        </div>

        <div className="p-3 p-md-4 text-white position-relative" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #0d6efd 100%)' }}>
          <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 position-relative z-1">
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center rounded-3 text-white shadow-sm flex-shrink-0" style={{ width: 44, height: 44, background: 'rgba(255, 255, 255, 0.2)' }}>
                <Sparkles size={22} />
              </div>
              <div>
                <span className="badge bg-warning text-dark fw-bold px-2.5 py-1 mb-1 fs-9 rounded-pill text-uppercase">
                  Digital Pass
                </span>
                <h4 className="fw-bold text-white mb-0 fs-6 fs-md-5">Women Entrepreneurship Membership Card</h4>
                <p className="text-white-50 small mb-0 fw-medium">TARANG WOMEN ENTREPRENEURS COMMUNITY</p>
              </div>
            </div>

            <div className="flex-shrink-0">
              {timeLeft.isExpired ? (
                <span className="badge bg-danger text-white rounded-pill px-3 py-2 fw-bold fs-8 d-inline-flex align-items-center gap-1 shadow-sm">
                  <AlertTriangle size={14} /> EXPIRED
                </span>
              ) : (
                <span className="badge bg-success text-white rounded-pill px-3 py-2 fw-bold fs-8 d-inline-flex align-items-center gap-1 shadow-sm">
                  <ShieldCheck size={14} /> ACTIVE ({timeLeft.days}d {formatDigit(timeLeft.hours)}h Left)
                </span>
              )}
            </div>
          </div>

          <Award size={160} className="position-absolute end-0 bottom-0 text-white" style={{ opacity: 0.1, transform: 'translate(20px, 20px)', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Countdown Timer & UPI QR */}
      {!timeLeft.isExpired && (
        <div className="card border-0 rounded-4 shadow-sm bg-white p-3 p-md-4 no-print">
          <div className="row g-3 align-items-center">

            <div className="col-12 col-md-8 border-end-md">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="fw-bold fs-7 d-flex align-items-center gap-2" style={{ color: '#1e3a8a' }}>
                  <Timer size={18} /> MEMBERSHIP REMAINING TIME COUNTER
                </span>
                <span className="spinner-grow spinner-grow-sm text-success p-1" role="status"></span>
              </div>

              <div className="row g-2 text-center">
                <div className="col-3">
                  <div className="p-2.5 rounded-3 bg-light">
                    <h3 className="fw-extrabold m-0 fs-5 text-primary">{timeLeft.days}</h3>
                    <small className="text-muted fs-9 fw-bold">DAYS</small>
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-2.5 rounded-3 bg-light">
                    <h3 className="fw-extrabold m-0 fs-5 text-primary">{formatDigit(timeLeft.hours)}</h3>
                    <small className="text-muted fs-9 fw-bold">HOURS</small>
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-2.5 rounded-3 bg-light">
                    <h3 className="fw-extrabold m-0 fs-5 text-primary">{formatDigit(timeLeft.minutes)}</h3>
                    <small className="text-muted fs-9 fw-bold">MINS</small>
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-2.5 rounded-3 bg-danger bg-opacity-10">
                    <h3 className="fw-extrabold text-danger m-0 fs-5">{formatDigit(timeLeft.seconds)}</h3>
                    <small className="text-danger fs-9 fw-bold">SECS</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 text-center">
              <div className="p-2.5 bg-light rounded-3 d-inline-block w-100">
                <div className="d-flex align-items-center justify-content-center gap-1 text-dark fw-bold fs-8 mb-1">
                  <QrCode size={14} className="text-primary" /> RENEWAL UPI QR
                </div>
                <img src={upiQrUrl} alt="UPI QR" className="rounded border bg-white p-1 mb-1" style={{ width: '85px', height: '80px', objectFit: 'contain' }} />
                <small className="d-block text-muted fs-9 fw-semibold">Scan to Renew (₹999 / Year)</small>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Main Details Card */}
      <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden no-print">
        <div className="p-3 text-white d-flex align-items-center justify-content-between" style={{ backgroundColor: '#1e3a8a' }}>
          <span className="fw-bold fs-7 d-flex align-items-center gap-2">
            <FileText size={18} /> PASS DETAILS
          </span>
          <span className="badge bg-warning text-dark rounded-pill px-3 py-1 fs-8 fw-bold">
            Status: {membership.status?.toUpperCase() || 'APPROVED'}
          </span>
        </div>

        <div className="card-body p-3 p-md-4">
          <div className="row g-3">

            {/* 1. Personal Details */}
            <div className="col-12">
              <div className="p-2 px-3 rounded-3 fw-bold fs-7 d-flex align-items-center gap-2 bg-primary bg-opacity-10 text-primary border-start border-4 border-primary">
                <User size={16} /> 1. PERSONAL DETAILS
              </div>
            </div>

            <DetailItem icon={User} label="Full Name" value={membership.fullName || membership.name || 'N/A'} col="col-12 col-md-6" />
            <DetailItem icon={Mail} label="Registered Email" value={membership.email || membership.id} col="col-12 col-md-6" />
            <DetailItem icon={Phone} label="Contact Number" value={membership.phone || 'N/A'} col="col-12 col-md-6" />

            {/* 2. Business Details */}
            <div className="col-12 mt-2">
              <div className="p-2 px-3 rounded-3 fw-bold fs-7 d-flex align-items-center gap-2 bg-primary bg-opacity-10 text-primary border-start border-4 border-primary">
                <Building2 size={16} /> 2. BUSINESS DETAILS
              </div>
            </div>

            <DetailItem icon={Building2} label="Business Name" value={membership.businessName || 'N/A'} col="col-12 col-md-6" />
            <DetailItem icon={Tag} label="Category" value={membership.category || 'Individual Business Owner'} col="col-12 col-md-6" />
            <DetailItem icon={MapPin} label="Location" value={`${membership.city ? membership.city + ', ' : ''}${membership.state || 'N/A'}`} col="col-12" />

            {/* 3. Validity & Dates */}
            <div className="col-12 mt-2">
              <div className="p-2 px-3 rounded-3 fw-bold fs-7 d-flex align-items-center gap-2 bg-primary bg-opacity-10 text-primary border-start border-4 border-primary">
                <Clock size={16} /> 3. VALIDITY & DATES
              </div>
            </div>

            <DetailItem
              icon={Calendar}
              label="Joined Date"
              value={membership.startDate ? new Date(membership.startDate).toLocaleDateString('en-IN') : 'N/A'}
              col="col-12 col-md-4"
            />
            <DetailItem
              icon={Clock}
              label="Renewal Date"
              value={membership.expiryDate ? new Date(membership.expiryDate).toLocaleDateString('en-IN') : 'N/A'}
              highlight={timeLeft.isExpired ? 'text-danger fw-bold' : 'text-success fw-bold'}
              col="col-12 col-md-4"
            />
            <DetailItem icon={CheckCircle2} label="Validity Plan" value="₹999 / Year" col="col-12 col-md-4" />

            {/* 4. Payment History */}
            <div className="col-12 mt-2">
              <div className="p-2 px-3 rounded-3 fw-bold fs-7 d-flex align-items-center justify-content-between bg-primary bg-opacity-10 text-primary border-start border-4 border-primary">
                <span className="d-flex align-items-center gap-2">
                  <Receipt size={16} /> 4. PAYMENT HISTORY & RENEWALS
                </span>
                <span className="badge bg-primary text-white rounded-pill px-2.5 py-0.5 fs-9">
                  {paymentHistoryList.length} Payment(s)
                </span>
              </div>
            </div>

            <div className="col-12">
              <div className="p-3 bg-light rounded-3">
                <div className="table-responsive">
                  <table className="table table-sm table-hover align-middle mb-0 fs-8">
                    <thead>
                      <tr className="text-muted text-uppercase fs-9">
                        <th>#</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Transaction ID</th>
                        <th>Gateway</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistoryList.map((pay, idx) => (
                        <tr key={idx}>
                          <td className="fw-bold">{idx + 1}</td>
                          <td>{pay.date ? new Date(pay.date).toLocaleDateString('en-IN') : 'N/A'}</td>
                          <td className="fw-bold text-primary">₹{pay.amount || 999}.00</td>
                          <td className="font-monospace">{pay.paymentId || membership.lastTransactionId || 'N/A'}</td>
                          <td><span className="badge bg-purple-subtle text-purple fw-bold">{pay.gateway || 'PhonePe PG'}</span></td>
                          <td>
                            <span className="badge bg-success text-white rounded-pill px-2 py-0.5 fs-9">
                              {pay.status || 'PAID'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Printable Section */}
      <div id="printable-pass-section" className="d-none d-print-block p-4 bg-white">
        <div className="border border-3 p-4 rounded-3" style={{ borderColor: '#1e3a8a' }}>
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
            <div>
              <h2 className="fw-bold mb-0" style={{ color: '#1e3a8a' }}>TARANG WOMEN COMMUNITY</h2>
              <small className="text-muted d-block">Official Membership Certificate & Tax Invoice (₹999 / Year)</small>
            </div>
            <div className="text-end">
              <span className="badge bg-primary text-white px-3 py-1 fs-7 fw-bold mb-1">MEMBERSHIP RECEIPT</span>
              <p className="small text-muted mb-0">Date: {new Date().toLocaleDateString('en-IN')}</p>
            </div>
          </div>

          <div className="row mb-4 fs-7">
            <div className="col-6">
              <h6 className="fw-bold text-uppercase fs-9 text-muted mb-1">Member Details:</h6>
              <p className="fw-bold text-dark mb-0 fs-6">{membership.fullName || membership.name}</p>
              <p className="mb-0">Email: {membership.email || membership.id}</p>
              <p className="mb-0">Phone: {membership.phone || 'N/A'}</p>
              <p className="mb-0">Location: {membership.city ? `${membership.city}, ` : ''}{membership.state}</p>
            </div>
            <div className="col-6 border-start ps-3">
              <h6 className="fw-bold text-uppercase fs-9 text-muted mb-1">Business Details:</h6>
              <p className="fw-bold text-dark mb-0 fs-6">{membership.businessName || 'Individual Business'}</p>
              <p className="mb-0">Category: {membership.category || 'Entrepreneur'}</p>
              <p className="mb-0">Status: <strong className="text-success">{membership.status?.toUpperCase() || 'APPROVED'}</strong></p>
            </div>
          </div>

          <table className="table table-bordered mb-4 align-middle fs-7">
            <thead className="table-light">
              <tr>
                <th>Description</th>
                <th>Joined Date</th>
                <th>Renewal Date</th>
                <th className="text-end">Amount Paid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Tarang Women Entrepreneurship Annual Membership Pass</strong>
                  <br />
                  <small className="text-muted">Access to PAN India Network & Exhibitions</small>
                </td>
                <td>{membership.startDate ? new Date(membership.startDate).toLocaleDateString('en-IN') : 'N/A'}</td>
                <td>{membership.expiryDate ? new Date(membership.expiryDate).toLocaleDateString('en-IN') : 'N/A'}</td>
                <td className="text-end fw-bold">₹{membership.amount || 999}.00</td>
              </tr>
            </tbody>
          </table>

          <div className="p-3 bg-light rounded-3 mb-4 fs-8">
            <div className="row">
              <div className="col-6">Payment Status: <strong className="text-success">{membership.paymentStatus || 'PAID'}</strong></div>
              <div className="col-6 text-end">PhonePe Txn ID: <span className="font-monospace fw-bold">{membership.lastTransactionId || 'N/A'}</span></div>
            </div>
          </div>

          <div className="border-top pt-3 d-flex justify-content-between align-items-center">
            <small className="text-muted">Computer generated official digital pass. Valid across all Tarang expos.</small>
            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-1 fw-bold fs-8">
              ✓ VERIFIED MEMBER PASS
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}

function DetailItem({ icon: Icon, label, value, col = 'col-12 col-md-6', highlight = '' }) {
  return (
    <div className={col}>
      <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-3 h-100">
        {Icon && (
          <div
            className="rounded-3 bg-white shadow-sm d-flex align-items-center justify-content-center text-primary flex-shrink-0"
            style={{ width: 42, height: 42, color: '#1e3a8a' }}
          >
            <Icon size={18} />
          </div>
        )}
        <div className="overflow-hidden">
          <small className="text-uppercase fw-bold text-muted d-block fs-8 mb-1" style={{ letterSpacing: '0.4px' }}>
            {label}
          </small>
          <span className={`fw-bold text-dark d-block text-truncate fs-7 ${highlight}`}>
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}