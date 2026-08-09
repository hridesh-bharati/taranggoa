// src/app/(website)/membership-user-page/page.jsx
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { paymentController } from '@/controllers/payment.controller';
import { showToast } from '@/utils/toast';
import '@/styles/membership.css';
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Loader2,
  User,
  Phone,
  Mail,
  Building2,
  MapPin,
  Tag,
  FileText,
  Check,
  ArrowRight,
  ArrowLeft,
  CreditCard
} from 'lucide-react';

const WHO_CAN_JOIN = [
  'Individual Business Owners / Proprietors (व्यक्तिगत व्यवसायी)',
  'Registered Self Help Groups (स्वयं सहायता समूह)',
  'MSMEs in Service, Manufacturing, or Trading (एमएसएमई इकाइयाँ)',
  'Crafters, Artisans & Organic Food Producers (कारीगर व उत्पादक)'
];

const BENEFITS = [
  'Business Support & Growth (व्यापार विकास सहायता)',
  'Expert Mentorship (विशेषज्ञ परामर्श)',
  'Government Marketing Schemes (सरकारी योजना लाभ)',
  'Exhibition Opportunities (प्रदर्शनी व स्टॉल अवसर)',
  'MSME Registration Assistance (एमएसएमई पंजीकरण)',
  'Networking & Learning (नेटवर्किंग एवं प्रशिक्षण)'
];

const CATEGORIES = [
  { value: 'Individual Business Owner', label: 'Individual Business Owners / Proprietors' },
  { value: 'Registered Self Help Group', label: 'Registered Self Help Groups (SHG)' },
  { value: 'MSME Unit', label: 'MSMEs in Service, Manufacturing, or Trading' },
  { value: 'Crafter / Artisan', label: 'Crafters, Artisans & Organic Food Producers' }
];

export default function MembershipClientPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    businessName: '',
    category: 'Individual Business Owner',
    address: '',
    city: '',
    state: ''
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Step 2 Validation
  const handleValidateForm = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.email || !form.businessName || !form.city || !form.state) {
      showToast('error', 'Please fill all required fields');
      return;
    }
    setCurrentStep(3);
  };

  // Step 3 PhonePe Payment Initiation via Single Controller
  const handlePhonePePayment = () => {
    setLoading(true);

    paymentController.initiateMembershipPayment({
      userDetails: form,
      onError: (err) => {
        showToast('error', err.message || 'PhonePe payment initialization failed.');
        setLoading(false);
      }
    });
  };

  return (
    <main className="min-vh-100 bg-light d-flex flex-column">
      <Navbar />

      <div className="gov-top-band py-2 px-3 text-center small fw-bold">
        <Sparkles size={14} className="me-2 text-warning d-inline" />
        <span>OFFICIAL MEMBERSHIP PORTAL - TARANG WOMEN ENTREPRENEURS COMMUNITY</span>
      </div>

      <div className="container-fluid container-lg py-4 flex-grow-1">

        {/* Top Pagination Stepper */}
        <div className="card border-0 shadow-sm rounded-3 mb-4 bg-white p-1 p-md-4 w-100">
          <div className="d-flex justify-content-between align-items-center position-relative w-100 px-2 px-md-5">
            <div className="position-absolute top-50 start-0 end-0 translate-middle-y bg-secondary bg-opacity-20" style={{ height: '4px', zIndex: 1, margin: '0 40px' }}></div>
            <div
              className="position-absolute top-50 start-0 translate-middle-y bg-primary transition-all"
              style={{
                height: '4px',
                zIndex: 1,
                margin: '0 40px',
                width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : 'calc(100% - 80px)',
                transition: 'width 0.35s ease'
              }}
            ></div>

            {/* Step 1 */}
            <div className="text-center position-relative z-2">
              <button
                onClick={() => setCurrentStep(1)}
                className={`btn rounded-circle fw-bold d-flex align-items-center justify-content-center mx-auto shadow-sm ${currentStep >= 1 ? 'btn-primary text-white' : 'btn-light text-muted border'}`}
                style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}
              >
                1
              </button>
              <small className={`fw-bold d-block mt-2 small text-uppercase ${currentStep === 1 ? 'text-primary' : 'text-muted'}`}>
                1. Scheme Info
              </small>
            </div>

            {/* Step 2 */}
            <div className="text-center position-relative z-2">
              <button
                onClick={() => currentStep > 2 && setCurrentStep(2)}
                className={`btn rounded-circle fw-bold d-flex align-items-center justify-content-center mx-auto shadow-sm ${currentStep >= 2 ? 'btn-primary text-white' : 'btn-light text-muted border'}`}
                style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}
              >
                2
              </button>
              <small className={`fw-bold d-block mt-2 small text-uppercase ${currentStep === 2 ? 'text-primary' : 'text-muted'}`}>
                2. Application Form
              </small>
            </div>

            {/* Step 3 */}
            <div className="text-center position-relative z-2">
              <button
                className={`btn rounded-circle fw-bold d-flex align-items-center justify-content-center mx-auto shadow-sm ${currentStep === 3 ? 'btn-primary text-white' : 'btn-light text-muted border'}`}
                style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}
              >
                3
              </button>
              <small className={`fw-bold d-block mt-2 small text-uppercase ${currentStep === 3 ? 'text-primary' : 'text-muted'}`}>
                3. Pay via PhonePe (₹999)
              </small>
            </div>

          </div>
        </div>

        {/* STEP 1: SCHEME INFO */}
        {currentStep === 1 && (
          <div className="card border rounded-3 shadow-sm bg-white overflow-hidden">
            <div className="gov-card-header-secondary p-3 d-flex align-items-center gap-2">
              <FileText size={18} />
              <span className="fw-bold">STEP 1: ELIGIBILITY & SCHEME BENEFITS (पात्रता एवं लाभ)</span>
            </div>

            <div className="card-body p-3 p-md-4">
              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <span className="fw-bold text-danger small text-uppercase d-block mb-3">◆ Who Can Apply? (कौन आवेदन कर सकता है?)</span>
                  <ul className="list-unstyled d-flex flex-column gap-2">
                    {WHO_CAN_JOIN.map((item, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2 small fw-medium text-dark">
                        <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-12 col-md-6">
                  <span className="fw-bold text-success small text-uppercase d-block mb-3">◆ Key Benefits (मुख्य लाभ)</span>
                  <ul className="list-unstyled d-flex flex-column gap-2">
                    {BENEFITS.map((item, idx) => (
                      <li key={idx} className="d-flex align-items-center gap-2 small fw-medium text-dark">
                        <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-light rounded-3 border text-center my-4">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">Annual Membership Fee (Valid for 1 Year)</span>
                <h2 className="fw-bold text-primary m-0">₹999 <small className="small text-muted fw-normal">/ Year</small></h2>
              </div>

              <div className="d-flex justify-content-end pt-3 border-top">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-gov-portal shadow-sm d-inline-flex align-items-center gap-2"
                >
                  <span>Proceed to Fill Form</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: REGISTRATION FORM */}
        {currentStep === 2 && (
          <div className="card border rounded-3 shadow-sm bg-white overflow-hidden">
            <div className="gov-card-header-main p-3 d-flex align-items-center gap-2">
              <ShieldCheck size={18} className="text-warning" />
              <span className="fw-bold">STEP 2: ONLINE APPLICATION FORM (ऑनलाइन आवेदन प्रपत्र)</span>
            </div>

            <div className="card-body p-3 p-md-4">
              <form onSubmit={handleValidateForm}>
                <div className="row g-3">

                  <div className="col-12">
                    <div className="gov-section-strip">1. Personal Information (व्यक्तिगत विवरण)</div>
                  </div>

                  <FormInput label="Full Name (पूरा नाम) *" name="fullName" icon={User} value={form.fullName} onChange={handleChange} required placeholder="Name as per Government ID" />
                  <FormInput label="Phone / WhatsApp *" name="phone" type="tel" icon={Phone} value={form.phone} onChange={handleChange} required placeholder="10 Digit Mobile Number" />
                  <FormInput label="Email Address *" name="email" type="email" icon={Mail} value={form.email} onChange={handleChange} required placeholder="email@domain.com" colSize="col-12" />

                  <div className="col-12 mt-2">
                    <div className="gov-section-strip">2. Business / Entity Details (व्यावसायिक विवरण)</div>
                  </div>

                  <FormInput label="Business Name (फर्म का नाम) *" name="businessName" icon={Building2} value={form.businessName} onChange={handleChange} required placeholder="Establishment Name" />

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold small text-dark mb-1">Category Type (श्रेणी) *</label>
                    <div className="input-group">
                      <span className="input-group-text gov-input-addon px-3"><Tag size={15} /></span>
                      <select name="category" value={form.category} onChange={handleChange} className="form-select gov-form-control py-2 small">
                        {CATEGORIES.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                      </select>
                    </div>
                  </div>

                  <FormInput label="City / District *" name="city" icon={MapPin} value={form.city} onChange={handleChange} required placeholder="District Name" />
                  <FormInput label="State *" name="state" icon={MapPin} value={form.state} onChange={handleChange} required placeholder="State Name" />

                  <div className="col-12 mt-4 pt-3 border-top d-flex justify-content-between align-items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="btn btn-outline-secondary px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <button type="submit" className="btn btn-gov-portal shadow-sm d-inline-flex align-items-center gap-2">
                      <span>Proceed to Pay ₹999</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        )}

        {/* STEP 3: PHONEPE PAYMENT & SUBMISSION */}
        {currentStep === 3 && (
          <div className="card border-0 rounded-3 shadow-sm bg-white overflow-hidden mx-auto" style={{ maxWidth: '600px' }}>

            {/* Header Strip */}
            <div className="p-3 text-white d-flex align-items-center justify-content-between" style={{ background: 'linear-gradient(135deg, #5f259f 0%, #3f186c 100%)' }}>
              <span className="fw-bold small d-flex align-items-center gap-2">
                <CreditCard size={18} /> STEP 3: PAYMENT CHECKOUT
              </span>
              <span className="badge bg-warning text-dark rounded-pill px-3 py-1 small fw-bold text-uppercase">
                PhonePe PG
              </span>
            </div>

            <div className="p-4 p-md-5 text-center">

              {/* PhonePe Brand Icon Box */}
              <div
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow-sm"
                style={{ width: '68px', height: '68px', backgroundColor: '#f3e8ff', color: '#5f259f' }}
              >
                <CreditCard size={32} />
              </div>

              <h5 className="fw-bold text-dark mb-1">Complete Payment</h5>
              <p className="text-muted small mb-4">
                You will be redirected securely to PhonePe UPI / Net Banking / Card Checkout.
              </p>

              {/* Structured Receipt Summary Box */}
              <div className="card border-0 bg-light rounded-3 p-3 text-start mb-4">
                <div className="gov-section-strip py-1 px-2 mb-2 small">
                  PAYMENT SUMMARY (भुगतान विवरण)
                </div>

                <div className="d-flex flex-column gap-2 small">
                  <div className="d-flex justify-content-between align-items-center pb-1 border-bottom">
                    <span className="text-muted fw-semibold">Applicant Name</span>
                    <strong className="text-dark">{form.fullName}</strong>
                  </div>

                  <div className="d-flex justify-content-between align-items-center pb-1 border-bottom">
                    <span className="text-muted fw-semibold">Registered Email</span>
                    <strong className="text-dark">{form.email}</strong>
                  </div>

                  <div className="d-flex justify-content-between align-items-center pb-1 border-bottom">
                    <span className="text-muted fw-semibold">Business Establishment</span>
                    <strong className="text-dark">{form.businessName}</strong>
                  </div>

                  <div className="d-flex justify-content-between align-items-center pb-1 border-bottom">
                    <span className="text-muted fw-semibold">Membership Plan</span>
                    <span className="badge bg-success-subtle text-success border border-success-subtle fw-bold small">
                      1 Year Pass (365 Days)
                    </span>
                  </div>

                  <div className="d-flex justify-content-between align-items-center pt-1 fs-6">
                    <strong className="text-dark">Total Payable Amount</strong>
                    <strong className="fs-5" style={{ color: '#5f259f' }}>₹999.00</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-outline-secondary px-4 py-2 fw-bold small rounded-pill d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <ArrowLeft size={16} /> Edit Details
                </button>

                <button
                  onClick={handlePhonePePayment}
                  disabled={loading}
                  className="btn text-white px-4 py-2 fw-bold small rounded-pill shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: '#5f259f', borderColor: '#5f259f' }}
                >
                  {loading ? (
                    <Loader2 size={18} className="spinner-border spinner-border-sm" />
                  ) : (
                    <ShieldCheck size={18} />
                  )}
                  <span>Pay ₹999 with PhonePe</span>
                </button>
              </div>

              {/* Security Note */}
              <small className="d-block text-muted small mt-3">
                🔒 256-Bit SSL Encrypted Official Gateway Session
              </small>

            </div>
          </div>
        )}

      </div>

      <Footer />
    </main>
  );
}

function FormInput({ label, name, type = "text", icon: Icon, value, onChange, required = false, placeholder, colSize = "col-12 col-md-6" }) {
  return (
    <div className={colSize}>
      <label className="form-label fw-bold small text-dark mb-1">{label}</label>
      <div className="input-group">
        {Icon && (
          <span className="input-group-text gov-input-addon px-3">
            <Icon size={15} />
          </span>
        )}
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className="form-control gov-form-control py-2 small"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}