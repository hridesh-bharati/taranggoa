'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { msmeService } from '@/services/msme.service';
import { showToast } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import {
  Building2,
  FileText,
  Loader2,
  Lock,
  Send,
  User,
  Phone,
  Mail,
  MapPin,
  Tag,
  CreditCard,
  Landmark,
  Briefcase,
  TrendingUp,
  IndianRupee,
  FileCheck,
  Fingerprint,
  ShieldCheck
} from 'lucide-react';
import './msme.css';

export default function UserMSMEPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSaving] = useState(false);
  const [isMemberActive, setIsMemberActive] = useState(false);
  const [existingData, setExistingData] = useState(null);

  const [formData, setFormData] = useState({
    applicantName: '',
    aadhaarNumber: '',
    panNumber: '',
    gstinNumber: '',
    phone: '',
    email: '',
    firmName: '',
    entityType: 'Proprietorship',
    category: 'Micro',
    businessType: 'Manufacturing',
    nicCode: '',
    businessActivityDesc: '',
    bankAccountNo: '',
    ifscCode: '',
    investmentAmount: '',
    annualTurnover: '',
    address: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    async function checkMembershipAndFetchMSME() {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const cleanEmail = user.email.toLowerCase().trim();
        const memRef = doc(db, 'memberships', cleanEmail);
        const memSnap = await getDoc(memRef);

        let active = false;
        if (memSnap.exists()) {
          const mData = memSnap.data();
          const expiry = mData.expiryDate ? new Date(mData.expiryDate) : null;
          const isExpired = expiry ? new Date() > expiry : false;

          if ((mData.paymentStatus === 'PAID' || mData.status === 'APPROVED') && !isExpired) {
            active = true;
          }
        }

        setIsMemberActive(active);

        if (active) {
          const app = await msmeService.getApplicationByEmail(cleanEmail);
          if (app) {
            setExistingData(app);
            setFormData({
              applicantName: app.applicantName || '',
              aadhaarNumber: app.aadhaarNumber || '',
              panNumber: app.panNumber || '',
              gstinNumber: app.gstinNumber || '',
              phone: app.phone || '',
              email: app.email || cleanEmail,
              firmName: app.firmName || '',
              entityType: app.entityType || 'Proprietorship',
              category: app.category || 'Micro',
              businessType: app.businessType || 'Manufacturing',
              nicCode: app.nicCode || '',
              businessActivityDesc: app.businessActivityDesc || '',
              bankAccountNo: app.bankAccountNo || '',
              ifscCode: app.ifscCode || '',
              investmentAmount: app.investmentAmount || '',
              annualTurnover: app.annualTurnover || '',
              address: app.address || '',
              city: app.city || '',
              state: app.state || ''
            });
          }
        }
      } catch (err) {
        console.error('MSME Access Verification Error:', err);
      } finally {
        setLoading(false);
      }
    }

    checkMembershipAndFetchMSME();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isMemberActive) return;

    setSaving(true);
    try {
      await msmeService.submitApplication(user.email, formData);
      showToast('success', 'MSME Registration Request Saved Successfully!');
      const updated = await msmeService.getApplicationByEmail(user.email);
      setExistingData(updated);
    } catch (err) {
      showToast('error', err.message || 'Failed to submit request');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="card border-0 rounded-3 shadow-sm p-5 text-center bg-white my-3">
        <Loader2 size={32} className="spinner-border text-primary mx-auto mb-2" />
        <span className="text-muted fw-bold small">Verifying Official Access...</span>
      </div>
    );
  }

  if (!isMemberActive) {
    return (
      <div className="card border-0 rounded-3 shadow-sm bg-white overflow-hidden my-3 text-center">
        <div className="gov-top-band p-2 text-center fw-bold small text-uppercase">
          🔒 OFFICIAL MEMBERSHIP PORTAL - TARANG WOMEN ENTREPRENEURS COMMUNITY
        </div>
        <div className="p-4 p-md-5">
          <div className="p-3 rounded-circle d-inline-flex align-items-center justify-content-center mb-3 mx-auto bg-danger bg-opacity-10 text-danger" style={{ width: 64, height: 64 }}>
            <Lock size={32} />
          </div>
          <h5 className="fw-bold text-dark mb-2">Active Membership Required</h5>
          <p className="text-muted small mb-4 mx-auto" style={{ maxWidth: '480px' }}>
            MSME / Udyam Govt Registration Assistance is exclusively available for active Tarang Community Members. Please purchase or renew your membership pass.
          </p>
          <button onClick={() => router.push('/user/user-membership-page')} className="btn btn-gov-portal rounded-pill shadow-sm">
            Go to Membership Portal (₹999 / Year)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3 py-2">
      {/* Official Govt Portal Top Strip */}
      <div className="rounded-3 overflow-hidden shadow-sm">
        <div className="gov-top-band p-2 px-3 fw-bold small text-uppercase text-center">
          ✨ OFFICIAL MEMBERSHIP PORTAL - TARANG WOMEN ENTREPRENEURS COMMUNITY
        </div>

        <div className="gov-portal-header p-3 p-md-4">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <span className="badge bg-warning text-dark fw-bold px-3 py-1 mb-2 rounded-pill text-uppercase small">
                Scheme Assistance Portal
              </span>
              <h4 className="fw-bold text-white mb-1 fs-5">MSME / Udyam Registration Form</h4>
              <p className="text-white-50 small mb-0">Fill required credentials to apply for Govt MSME Certificate Guidance</p>
            </div>
            <Building2 size={40} className="text-white opacity-50 d-none d-sm-block" />
          </div>
        </div>
      </div>

      {/* Main Official Form Card */}
      <div className="card border-0 rounded-3 shadow-sm bg-white overflow-hidden">
        <div className="gov-card-header-main p-3 d-flex align-items-center justify-content-between">
          <span className="d-flex align-items-center gap-2 fw-bold small">
            <ShieldCheck size={18} /> STEP 1: ONLINE APPLICATION FORM
          </span>
          {existingData && (
            <span className={`badge rounded-pill px-3 py-1 fw-bold small ${existingData.status === 'COMPLETED' ? 'bg-success' : existingData.status === 'REJECTED' ? 'bg-danger' : 'bg-warning text-dark'}`}>
              STATUS: {existingData.status || 'PENDING'}
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-3 p-md-4">
          <div className="row g-3">

            {/* 1. Personal Information */}
            <div className="col-12">
              <div className="gov-section-strip">
                1. PERSONAL INFORMATION
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">Full Name *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><User size={16} /></span>
                <input type="text" className="form-control gov-form-control" required value={formData.applicantName} onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })} placeholder="Name as per Government ID" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">Phone / WhatsApp *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><Phone size={16} /></span>
                <input type="tel" className="form-control gov-form-control" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="10 Digit Mobile Number" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">Aadhaar Number *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><Fingerprint size={16} /></span>
                <input type="text" className="form-control gov-form-control" required maxLength="12" value={formData.aadhaarNumber} onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })} placeholder="12 Digit Aadhaar Number" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">PAN Card Number *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><CreditCard size={16} /></span>
                <input type="text" className="form-control gov-form-control text-uppercase" required maxLength="10" value={formData.panNumber} onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })} placeholder="10 Digit PAN Number" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">GSTIN Number (Optional)</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><FileCheck size={16} /></span>
                <input type="text" className="form-control gov-form-control text-uppercase" maxLength="15" value={formData.gstinNumber} onChange={(e) => setFormData({ ...formData, gstinNumber: e.target.value.toUpperCase() })} placeholder="Optional 15 Digit GSTIN" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">Registered Email *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><Mail size={16} /></span>
                <input type="email" className="form-control gov-form-control text-muted" disabled value={user?.email || formData.email} />
              </div>
            </div>

            {/* 2. Business Details */}
            <div className="col-12 mt-4">
              <div className="gov-section-strip">
                2. BUSINESS / ENTITY DETAILS
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">Business Name *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><Building2 size={16} /></span>
                <input type="text" className="form-control gov-form-control" required value={formData.firmName} onChange={(e) => setFormData({ ...formData, firmName: e.target.value })} placeholder="Firm / Business Name" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">Type of Business Entity *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><Briefcase size={16} /></span>
                <select className="form-select gov-form-control" value={formData.entityType} onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}>
                  <option value="Proprietorship">Proprietorship</option>
                  <option value="Partnership">Partnership Firm</option>
                  <option value="Pvt Ltd">Private Limited Company</option>
                  <option value="SHG">Self Help Group (SHG)</option>
                  <option value="Trust/Society">Trust / Co-operative Society</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">Category Scale *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><Tag size={16} /></span>
                <select className="form-select gov-form-control" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                  <option value="Micro">Micro Enterprise (Investment ≤ ₹1 Cr)</option>
                  <option value="Small">Small Enterprise (Investment ≤ ₹10 Cr)</option>
                  <option value="Medium">Medium Enterprise (Investment ≤ ₹50 Cr)</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">Major Activity Sector *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><Briefcase size={16} /></span>
                <select className="form-select gov-form-control" value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Services">Services</option>
                  <option value="Trading">Trading / Retail</option>
                  <option value="Artisans">Artisans & Food Producers</option>
                </select>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">NIC Code (2-Digit Code)</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><Tag size={16} /></span>
                <input type="text" className="form-control gov-form-control" value={formData.nicCode} onChange={(e) => setFormData({ ...formData, nicCode: e.target.value })} placeholder="e.g. 10 (Food) / 14 (Apparel) / 62 (IT)" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">Activity Description</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><FileText size={16} /></span>
                <input type="text" className="form-control gov-form-control" value={formData.businessActivityDesc} onChange={(e) => setFormData({ ...formData, businessActivityDesc: e.target.value })} placeholder="Brief summary of product/service" />
              </div>
            </div>

            {/* 3. Bank Account Details */}
            <div className="col-12 mt-4">
              <div className="gov-section-strip">
                3. BANK ACCOUNT DETAILS
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">Bank Account Number *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><Landmark size={16} /></span>
                <input type="text" className="form-control gov-form-control" required value={formData.bankAccountNo} onChange={(e) => setFormData({ ...formData, bankAccountNo: e.target.value })} placeholder="Account Number" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">IFSC Code *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><Landmark size={16} /></span>
                <input type="text" className="form-control gov-form-control text-uppercase" required maxLength="11" value={formData.ifscCode} onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })} placeholder="SBIN0001234" />
              </div>
            </div>

            {/* 4. Financial Figures */}
            <div className="col-12 mt-4">
              <div className="gov-section-strip">
                4. FINANCIAL FIGURES
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">Investment in Plant & Machinery (₹) *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><IndianRupee size={16} /></span>
                <input type="number" className="form-control gov-form-control" required value={formData.investmentAmount} onChange={(e) => setFormData({ ...formData, investmentAmount: e.target.value })} placeholder="Declared Investment in Rupees" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">Annual Turnover (₹) *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><TrendingUp size={16} /></span>
                <input type="number" className="form-control gov-form-control" required value={formData.annualTurnover} onChange={(e) => setFormData({ ...formData, annualTurnover: e.target.value })} placeholder="Declared Turnover in Rupees" />
              </div>
            </div>

            {/* 5. Address Details */}
            <div className="col-12 mt-4">
              <div className="gov-section-strip">
                5. LOCATION DETAILS
              </div>
            </div>

            <div className="col-12">
              <label className="form-label fw-bold small text-dark mb-1">Office / Unit Address *</label>
              <div className="input-group">
                <span className="input-group-text gov-input-addon"><MapPin size={16} /></span>
                <input type="text" className="form-control gov-form-control" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Plot No, Street, Landmark" />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">City / District *</label>
              <input type="text" className="form-control gov-form-control" required value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="City Name" />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-bold small text-dark mb-1">State *</label>
              <input type="text" className="form-control gov-form-control" required value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} placeholder="State Name" />
            </div>

            {/* Submit Button */}
            <div className="col-12 text-end mt-4 pt-3 border-top">
              <button type="submit" disabled={submitting} className="btn btn-gov-portal shadow-sm">
                {submitting ? <Loader2 size={16} className="spinner-border spinner-border-sm me-1" /> : <Send size={16} className="me-1" />}
                {existingData ? 'Update Application' : 'Save & Submit MSME Form'}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}