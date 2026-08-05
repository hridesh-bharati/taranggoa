// src\app\(website) \membership - user - page\page.jsx
'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { membershipController } from '@/controllers/membership.controller';
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
  AlertCircle,
  Check
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
  const [loading, setLoading] = useState(false);
  const [form, setFormData] = useState({
    fullName: '', phone: '', email: '', businessName: '',
    category: 'Individual Business Owner', address: '', city: '', state: ''
  });

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await membershipController.submitForm(form);
      showToast('success', 'Application submitted! Official team will contact you.');
      setFormData({
        fullName: '', phone: '', email: '', businessName: '',
        category: 'Individual Business Owner', address: '', city: '', state: ''
      });
    } catch (err) {
      showToast('error', err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-vh-100 bg-light">
      <Navbar />

      {/* Official Gov Header Banner */}
      <div className="gov-top-band py-2 px-3 text-center fs-8 fw-bold">
        <Sparkles size={14} className="me-1 text-warning" />
        OFFICIAL MEMBERSHIP PORTAL - TARANG WOMEN ENTREPRENEURS COMMUNITY (महिला उद्यमी पोर्टल)
      </div>

      <div className="container py-4">

        {/* Important Notice Banner (UP Scholarship Style) */}
        <div className="alert alert-warning border border-warning-subtle rounded-2 d-flex align-items-center gap-2 py-2 px-3 mb-4 fs-8 fw-semibold text-dark">
          <AlertCircle size={16} className="text-danger flex-shrink-0" />
          <span>निर्देश: आवेदन पत्र भरने से पूर्व अपनी सभी व्यावसायिक जानकारी ध्यानपूर्वक जांच लें। (Fee: ₹999/Year)</span>
        </div>

        <div className="row g-3">

          {/* Left Side: Scheme Eligibility & Benefits */}
          <div className="col-12 col-lg-5">
            <div className="card border rounded-2 shadow-sm bg-white overflow-hidden h-100">
              <div className="gov-card-header-secondary d-flex align-items-center gap-2">
                <FileText size={16} />
                <span>ELIGIBILITY & BENEFITS (पात्रता एवं लाभ)</span>
              </div>

              <div className="card-body p-3">

                {/* Who Can Join */}
                <div className="mb-3">
                  <span className="fw-bold text-danger fs-8 text-uppercase d-block mb-2">◆ Who Can Apply? (कौन आवेदन कर सकता है?)</span>
                  <ul className="list-unstyled d-flex flex-column gap-1.5 mb-0">
                    {WHO_CAN_JOIN.map((item, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2 fs-8 fw-medium text-dark">
                        <Check size={15} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="my-2.5 text-muted opacity-25" />

                {/* Benefits */}
                <div className="mb-3">
                  <span className="fw-bold text-success fs-8 text-uppercase d-block mb-2">◆ Key Benefits (मुख्य लाभ)</span>
                  <ul className="list-unstyled d-flex flex-column gap-1.5 mb-0">
                    {BENEFITS.map((item, idx) => (
                      <li key={idx} className="d-flex align-items-center gap-2 fs-8 fw-medium text-dark">
                        <CheckCircle2 size={15} className="text-success flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fee Box */}
                <div className="p-3 bg-light rounded-2 border text-center mt-auto">
                  <span className="text-muted fs-8 fw-bold text-uppercase d-block mb-1">Annual Processing Fee (वार्षिक शुल्क)</span>
                  <h3 className="fw-bold text-primary m-0">₹999 <small className="fs-8 text-muted fw-normal">/ Annual</small></h3>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side: Official Registration Form */}
          <div className="col-12 col-lg-7">
            <div className="card border rounded-2 shadow-sm bg-white overflow-hidden">
              <div className="gov-card-header-main d-flex align-items-center gap-2">
                <ShieldCheck size={16} className="text-warning" />
                <span>ONLINE APPLICATION FORM (ऑनलाइन आवेदन प्रपत्र)</span>
              </div>

              <div className="card-body p-3 p-md-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">

                    {/* Section 1 */}
                    <div className="col-12">
                      <div className="gov-section-strip">1. Personal Information (आवेदक का व्यक्तिगत विवरण)</div>
                    </div>

                    <FormInput label="Full Name (पूरा नाम) *" name="fullName" icon={User} value={form.fullName} onChange={handleChange} required placeholder="Name as per Aadhaar" />
                    <FormInput label="Phone / WhatsApp *" name="phone" type="tel" icon={Phone} value={form.phone} onChange={handleChange} required placeholder="10 Digit Mobile Number" />
                    <FormInput label="Email Address (ईमेल)" name="email" type="email" icon={Mail} value={form.email} onChange={handleChange} placeholder="email@domain.com" />

                    {/* Section 2 */}
                    <div className="col-12 mt-2">
                      <div className="gov-section-strip">2. Business / Entity Details (व्यावसायिक विवरण)</div>
                    </div>

                    <FormInput label="Business / Entity Name (फर्म का नाम) *" name="businessName" icon={Building2} value={form.businessName} onChange={handleChange} required placeholder="Establishment Name" />

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold fs-8 text-dark mb-1">Category Type (श्रेणी) *</label>
                      <div className="input-group input-group-sm">
                        <span className="input-group-text gov-input-addon">
                          <Tag size={14} />
                        </span>
                        <select name="category" value={form.category} onChange={handleChange} className="form-select gov-form-control">
                          {CATEGORIES.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                        </select>
                      </div>
                    </div>

                    <FormInput label="City / District (शहर / जिला) *" name="city" icon={MapPin} value={form.city} onChange={handleChange} required placeholder="District Name" />
                    <FormInput label="State (राज्य) *" name="state" icon={MapPin} value={form.state} onChange={handleChange} required placeholder="State Name" />

                    {/* Submit Section */}
                    <div className="col-12 mt-3 pt-2 border-top">
                      <button type="submit" disabled={loading} className="btn btn-gov-portal w-100 shadow-sm d-flex align-items-center justify-content-center gap-2">
                        {loading ? <Loader2 size={16} className="spinner-border spinner-border-sm" /> : <ShieldCheck size={16} />}
                        <span>Submit Registration Form (₹999)</span>
                      </button>
                    </div>

                  </div>
                </form>

                {/* Footer Help Contacts */}
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 pt-3 mt-3 border-top text-muted fs-8 fw-medium">
                  <span>Helpdesk: +91 9158063030 / 8329539407</span>
                  <span>Email: teamtaranggoa@gmail.com</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}

function FormInput({ label, name, type = "text", icon: Icon, value, onChange, required = false, placeholder, colSize = "col-12 col-md-6" }) {
  return (
    <div className={colSize}>
      <label className="form-label fw-bold fs-8 text-dark mb-1">{label}</label>
      <div className="input-group input-group-sm">
        {Icon && (
          <span className="input-group-text gov-input-addon">
            <Icon size={14} />
          </span>
        )}
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          className="form-control gov-form-control"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}