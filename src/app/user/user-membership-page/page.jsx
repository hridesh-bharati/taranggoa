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
  FileText
} from 'lucide-react';

export default function UserMembershipPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [membership, setMembership] = useState(null);

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
          const data = docSnap.data();
          const now = new Date();
          let remainingDays = 0;
          let isExpired = false;

          if (data.expiryDate) {
            const expiry = new Date(data.expiryDate);
            const diffTime = expiry - now;
            remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (remainingDays <= 0) {
              isExpired = true;
              remainingDays = 0;
            }
          }

          setMembership({
            id: docSnap.id,
            ...data,
            remainingDays,
            isExpired,
            computedStatus: isExpired ? 'EXPIRED' : 'ACTIVE'
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

  if (loading) {
    return (
      <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-white my-3">
        <Loader2 size={32} className="spinner-border text-primary mx-auto mb-2" />
        <span className="text-muted fw-bold fs-7">Loading your membership credentials...</span>
      </div>
    );
  }

  if (!membership) {
    return (
      <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white text-center my-3">
        <div
          className="p-3 bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3 text-primary mx-auto"
          style={{ width: 64, height: 64 }}
        >
          <Award size={32} />
        </div>
        <h5 className="fw-bold text-dark mb-2">No Active Membership Found</h5>
        <p className="text-muted fs-7 mb-4">You have not registered for an official membership pass yet.</p>
        <div>
          <a href="/membership" className="btn btn-primary rounded-pill px-4 py-2.5 fw-bold fs-7 shadow-sm">
            Apply Now (₹999 / Year)
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-4 pb-4">

      {/* 🌟 Official Top Blue Header Banner */}
      <div
        className="card border-0 rounded-4 shadow-sm p-3 p-md-4 position-relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)' }}
      >
        <Award
          size={160}
          className="position-absolute end-0 bottom-0 text-white"
          style={{ opacity: 0.1, transform: 'translate(20px, 20px)' }}
        />

        <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 position-relative z-1">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 text-white shadow-sm flex-shrink-0"
              style={{ width: 48, height: 48, background: 'rgba(255, 255, 255, 0.2)' }}
            >
              <Sparkles size={24} />
            </div>
            <div>
              <span className="badge bg-warning text-dark fw-bold px-2.5 py-1 mb-1 fs-9 rounded-pill text-uppercase">
                Official Digital Pass
              </span>
              <h4 className="fw-bold text-white mb-0 fs-6 fs-md-4">Women Entrepreneurship Membership Card</h4>
              <p className="text-white-50 small mb-0 fw-medium">TARANG WOMEN ENTREPRENEURS COMMUNITY</p>
            </div>
          </div>

          {/* Active / Expired Badge */}
          <div className="flex-shrink-0">
            {membership.isExpired ? (
              <span className="badge bg-danger text-white border border-light rounded-pill px-3 py-2 fw-bold fs-8 d-inline-flex align-items-center gap-1 shadow-sm">
                <AlertTriangle size={14} /> EXPIRED
              </span>
            ) : (
              <span className="badge bg-success text-white border border-light rounded-pill px-3 py-2 fw-bold fs-8 d-inline-flex align-items-center gap-1 shadow-sm">
                <ShieldCheck size={14} /> ACTIVE ({membership.remainingDays} Days Left)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 🌟 Main Membership Details Card */}
      <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
        <div className="p-3 px-md-4 bg-light border-bottom d-flex align-items-center justify-content-between">
          <span className="fw-bold text-dark fs-7 d-flex align-items-center gap-2">
            <FileText size={18} className="text-primary" /> APPLICATION & PASS DETAILS
          </span>
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fs-8 fw-bold">
            Status: {membership.status?.toUpperCase() || 'APPROVED'}
          </span>
        </div>

        <div className="card-body p-3 p-md-4">
          <div className="row g-3">

            {/* Section 1: Personal Information */}
            <div className="col-12">
              <div
                className="p-2 px-3 rounded-2 fw-bold fs-8 text-primary d-flex align-items-center gap-2"
                style={{
                  background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.02) 100%)',
                  borderLeft: '4px solid #2563eb'
                }}
              >
                <User size={14} /> 1. PERSONAL INFORMATION
              </div>
            </div>

            <DetailItem icon={User} label="Full Name" value={membership.fullName || membership.name || 'N/A'} col="col-12 col-md-6" />
            <DetailItem icon={Mail} label="Registered Email" value={membership.email || membership.id} col="col-12 col-md-6" />
            <DetailItem icon={Phone} label="Contact / WhatsApp" value={membership.phone || 'N/A'} col="col-12 col-md-6" />

            {/* Section 2: Business Information */}
            <div className="col-12 mt-3">
              <div
                className="p-2 px-3 rounded-2 fw-bold fs-8 text-primary d-flex align-items-center gap-2"
                style={{
                  background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.02) 100%)',
                  borderLeft: '4px solid #2563eb'
                }}
              >
                <Building2 size={14} /> 2. BUSINESS & CATEGORY DETAILS
              </div>
            </div>

            <DetailItem icon={Building2} label="Business Name" value={membership.businessName || 'N/A'} col="col-12 col-md-6" />
            <DetailItem icon={Tag} label="Category" value={membership.category || 'Individual Business Owner'} col="col-12 col-md-6" />
            <DetailItem icon={MapPin} label="Location" value={`${membership.city ? membership.city + ', ' : ''}${membership.state || 'N/A'}`} col="col-12" />

            {/* Section 3: Membership Validity */}
            <div className="col-12 mt-3">
              <div
                className="p-2 px-3 rounded-2 fw-bold fs-8 text-primary d-flex align-items-center gap-2"
                style={{
                  background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.02) 100%)',
                  borderLeft: '4px solid #2563eb'
                }}
              >
                <Clock size={14} /> 3. MEMBERSHIP VALIDITY & EXPIRY
              </div>
            </div>

            <DetailItem
              icon={Calendar}
              label="Joined Date"
              value={
                membership.startDate
                  ? new Date(membership.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                  : 'N/A'
              }
              col="col-12 col-md-4"
            />
            <DetailItem
              icon={Clock}
              label="Renewal / Expiry Date"
              value={
                membership.expiryDate
                  ? new Date(membership.expiryDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                  : 'N/A'
              }
              highlight={membership.isExpired ? 'text-danger fw-bold' : 'text-success fw-bold'}
              col="col-12 col-md-4"
            />
            <DetailItem icon={CheckCircle2} label="Validity Duration" value="1 Year (365 Days)" col="col-12 col-md-4" />

            {/* Section 4: Payment Record */}
            <div className="col-12 mt-3">
              <div
                className="p-2 px-3 rounded-2 fw-bold fs-8 text-primary d-flex align-items-center gap-2"
                style={{
                  background: 'linear-gradient(90deg, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0.02) 100%)',
                  borderLeft: '4px solid #2563eb'
                }}
              >
                <Receipt size={14} /> 4. PAYMENT & TRANSACTION RECORD
              </div>
            </div>

            <div className="col-12">
              <div className="p-3 bg-light bg-opacity-75 rounded-3 border">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-2">
                      <span className="text-muted fs-8 fw-medium">Amount Paid:</span>
                      <strong className="text-primary fs-7 fw-bold">₹{membership.amount || 999}.00</strong>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted fs-8 fw-medium">Razorpay Payment ID:</span>
                      <strong className="text-dark fs-8 font-monospace">{membership.razorpayPaymentId || 'N/A'}</strong>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-2">
                      <span className="text-muted fs-8 fw-medium">Payment Status:</span>
                      <span className="badge bg-success text-white rounded-pill px-2.5 py-1 fw-bold fs-9">
                        {membership.paymentStatus || 'PAID'}
                      </span>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-muted fs-8 fw-medium">Razorpay Order ID:</span>
                      <strong className="text-dark fs-8 font-monospace">{membership.razorpayOrderId || 'N/A'}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

function DetailItem({ icon: Icon, label, value, col = 'col-12 col-md-6', highlight = '' }) {
  return (
    <div className={col}>
      <div className="p-2.5 bg-white rounded-3 border d-flex align-items-center gap-3 h-100 shadow-2xs">
        {Icon && (
          <div
            className="rounded-2 d-flex align-items-center justify-content-center text-primary flex-shrink-0"
            style={{ width: 34, height: 34, backgroundColor: '#f1f5f9' }}
          >
            <Icon size={16} />
          </div>
        )}
        <div className="overflow-hidden">
          <span className="text-muted fs-9 fw-bold text-uppercase d-block mb-0.5" style={{ letterSpacing: '0.4px' }}>
            {label}
          </span>
          <span className={`fs-8 fw-bold text-dark text-truncate d-block ${highlight}`}>
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}