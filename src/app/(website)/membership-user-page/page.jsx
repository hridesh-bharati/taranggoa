// src\app\(website) \membership - user - page\page.jsx
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
    fullName: '', phone: '', email: '', businessName: '',
    category: 'Individual Business Owner', address: '', city: '', state: ''
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Step 2 Validation (Move to Payment Step WITHOUT saving in DB yet)
  const handleValidateForm = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.email || !form.businessName || !form.city || !form.state) {
      showToast('error', 'Please fill all required fields');
      return;
    }
    setCurrentStep(3);
  };

  // Step 3 Payment Handler -> Only Saves DB Record on 100% Payment Success
  const handleRazorpayPayment = () => {
    setLoading(true);

    paymentController.processMembershipPayment({
      userDetails: form,
      onSuccess: () => {
        showToast('success', 'Payment Successful! 1-Year Membership Activated.');
        setFormData({
          fullName: '', phone: '', email: '', businessName: '',
          category: 'Individual Business Owner', address: '', city: '', state: ''
        });
        setCurrentStep(1);
        setLoading(false);
      },
      onError: (err) => {
        showToast('error', err.message || 'Payment cancelled or failed.');
        setLoading(false);
      }
    });
  };

  return (
    <main className="min-vh-100 bg-light d-flex flex-column">
      <Navbar />

      <div className="gov-top-band py-2 px-3 text-center fs-8 fw-bold">
        <Sparkles size={14} className="me-2 text-warning d-inline" />
        <span>OFFICIAL MEMBERSHIP PORTAL - TARANG WOMEN ENTREPRENEURS COMMUNITY</span>
      </div>

      <div className="container-fluid container-lg py-4 flex-grow-1">

        {/* 🌟 FULL-WIDTH PAGINATION TOPBAR */}
        <div className="card border-0 shadow-sm rounded-4 mb-4 bg-white p-3 p-md-4 w-100">
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
                className={`btn rounded-circle fw-bold d-flex align-items-center justify-content-center mx-auto shadow-sm ${currentStep >= 1 ? 'btn-primary text-white' : 'btn-light text-muted border'
                  }`}
                style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}
              >
                1
              </button>
              <small className={`fw-bold d-block mt-2 fs-8 text-uppercase ${currentStep === 1 ? 'text-primary' : 'text-muted'}`}>
                1. Scheme Info
              </small>
            </div>

            {/* Step 2 */}
            <div className="text-center position-relative z-2">
              <button
                onClick={() => currentStep > 2 && setCurrentStep(2)}
                className={`btn rounded-circle fw-bold d-flex align-items-center justify-content-center mx-auto shadow-sm ${currentStep >= 2 ? 'btn-primary text-white' : 'btn-light text-muted border'
                  }`}
                style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}
              >
                2
              </button>
              <small className={`fw-bold d-block mt-2 fs-8 text-uppercase ${currentStep === 2 ? 'text-primary' : 'text-muted'}`}>
                2. Application Form
              </small>
            </div>

            {/* Step 3 */}
            <div className="text-center position-relative z-2">
              <button
                className={`btn rounded-circle fw-bold d-flex align-items-center justify-content-center mx-auto shadow-sm ${currentStep === 3 ? 'btn-primary text-white' : 'btn-light text-muted border'
                  }`}
                style={{ width: '48px', height: '48px', fontSize: '1.1rem' }}
              >
                3
              </button>
              <small className={`fw-bold d-block mt-2 fs-8 text-uppercase ${currentStep === 3 ? 'text-primary' : 'text-muted'}`}>
                3. Pay & Submit (₹999)
              </small>
            </div>

          </div>
        </div>

        {/* STEP 1: SCHEME INFO */}
        {currentStep === 1 && (
          <div className="card border rounded-4 shadow-sm bg-white overflow-hidden">
            <div className="gov-card-header-secondary p-3.5 d-flex align-items-center gap-2">
              <FileText size={18} />
              <span className="fw-bold">STEP 1: ELIGIBILITY & SCHEME BENEFITS (पात्रता एवं लाभ)</span>
            </div>

            <div className="card-body p-3 p-md-4">
              <div className="row g-4">
                <div className="col-12 col-md-6">
                  <span className="fw-bold text-danger fs-8 text-uppercase d-block mb-3">◆ Who Can Apply? (कौन आवेदन कर सकता है?)</span>
                  <ul className="list-unstyled d-flex flex-column gap-2.5">
                    {WHO_CAN_JOIN.map((item, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2 fs-8 fw-medium text-dark">
                        <Check size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="col-12 col-md-6">
                  <span className="fw-bold text-success fs-8 text-uppercase d-block mb-3">◆ Key Benefits (मुख्य लाभ)</span>
                  <ul className="list-unstyled d-flex flex-column gap-2.5">
                    {BENEFITS.map((item, idx) => (
                      <li key={idx} className="d-flex align-items-center gap-2 fs-8 fw-medium text-dark">
                        <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-3 bg-light rounded-3 border text-center my-4">
                <span className="text-muted fs-8 fw-bold text-uppercase d-block mb-1">Annual Membership Fee (Valid for 1 Year)</span>
                <h2 className="fw-bold text-primary m-0">₹999 <small className="fs-8 text-muted fw-normal">/ Year</small></h2>
              </div>

              <div className="d-flex justify-content-end pt-3 border-top">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-primary px-4 py-2.5 rounded-3 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
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
          <div className="card border rounded-4 shadow-sm bg-white overflow-hidden">
            <div className="gov-card-header-main p-3.5 d-flex align-items-center gap-2">
              <ShieldCheck size={18} className="text-warning" />
              <span className="fw-bold">STEP 2: ONLINE APPLICATION FORM (ऑनलाइन आवेदन प्रपत्र)</span>
            </div>

            <div className="card-body p-3 p-md-4">
              <form onSubmit={handleValidateForm}>
                <div className="row g-3">

                  <div className="col-12">
                    <div className="gov-section-strip py-2 px-3 mb-1">1. Personal Information (व्यक्तिगत विवरण)</div>
                  </div>

                  <FormInput label="Full Name (पूरा नाम) *" name="fullName" icon={User} value={form.fullName} onChange={handleChange} required placeholder="Name as per Government ID" />
                  <FormInput label="Phone / WhatsApp *" name="phone" type="tel" icon={Phone} value={form.phone} onChange={handleChange} required placeholder="10 Digit Mobile Number" />
                  <FormInput label="Email Address (Primary Key) *" name="email" type="email" icon={Mail} value={form.email} onChange={handleChange} required placeholder="email@domain.com" colSize="col-12" />

                  <div className="col-12 mt-2">
                    <div className="gov-section-strip py-2 px-3 mb-1">2. Business / Entity Details (व्यावसायिक विवरण)</div>
                  </div>

                  <FormInput label="Business Name (फर्म का नाम) *" name="businessName" icon={Building2} value={form.businessName} onChange={handleChange} required placeholder="Establishment Name" />

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold fs-8 text-dark mb-1">Category Type (श्रेणी) *</label>
                    <div className="input-group">
                      <span className="input-group-text gov-input-addon px-3"><Tag size={15} /></span>
                      <select name="category" value={form.category} onChange={handleChange} className="form-select gov-form-control py-2 fs-8">
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

                    <button type="submit" className="btn btn-primary px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm">
                      <span>Proceed to Pay ₹999</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        )}

        {/* STEP 3: RAZORPAY PAYMENT & SUBMISSION */}
        {currentStep === 3 && (
          <div className="card border rounded-4 shadow-sm bg-white overflow-hidden text-center p-3 p-md-5" style={{ maxWidth: '650px', margin: '0 auto' }}>
            <div className="p-3 bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3 text-primary mx-auto" style={{ width: '64px', height: '64px' }}>
              <CreditCard size={32} />
            </div>

            <h4 className="fw-bold text-dark mb-1">STEP 3: Pay & Activate Membership</h4>
            <p className="text-muted fs-8 mb-4">Note: Your application will be saved in Database ONLY after successful payment.</p>

            <div className="bg-light p-3 rounded-3 border text-start mb-4 fs-8">
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Applicant:</span>
                <strong className="text-dark">{form.fullName}</strong>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Email:</span>
                <strong className="text-dark">{form.email}</strong>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Business:</span>
                <strong className="text-dark">{form.businessName}</strong>
              </div>
              <div className="d-flex justify-content-between mb-1">
                <span className="text-muted">Validity:</span>
                <strong className="text-success">1 Year (365 Days)</strong>
              </div>
              <hr className="my-2" />
              <div className="d-flex justify-content-between fs-7 fw-bold text-primary">
                <span>Total Amount Due:</span>
                <span>₹999.00</span>
              </div>
            </div>

            <div className="d-flex gap-2 justify-content-center">
              <button
                onClick={() => setCurrentStep(2)}
                className="btn btn-outline-secondary px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1"
              >
                <ArrowLeft size={16} /> Edit Form
              </button>

              <button
                onClick={handleRazorpayPayment}
                disabled={loading}
                className="btn btn-success px-4 py-2.5 fw-bold d-inline-flex align-items-center gap-2 shadow-sm"
              >
                {loading ? <Loader2 size={18} className="spinner-border spinner-border-sm" /> : <ShieldCheck size={18} />}
                <span>Pay ₹999 & Submit</span>
              </button>
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
      <label className="form-label fw-bold fs-8 text-dark mb-1">{label}</label>
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
          className="form-control gov-form-control py-2 fs-8"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}