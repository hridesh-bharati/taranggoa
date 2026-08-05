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
    <main className="min-vh-100 bg-light d-flex flex-column">
      <Navbar />

      {/* Official Gov Header Banner */}
      <div className="gov-top-band py-2 px-3 text-center fs-8 fw-bold">
        <Sparkles size={14} className="me-2 text-warning d-inline" />
        <span>OFFICIAL MEMBERSHIP PORTAL - TARANG WOMEN ENTREPRENEURS COMMUNITY (महिला उद्यमी पोर्टल)</span>
      </div>

      {/* Main Container - Mobile me full width and compact padding */}
      <div className="container-fluid container-lg py-3 py-md-4 px-2 px-sm-3 flex-grow-1">

        {/* Important Notice Banner */}
        <div className="alert alert-warning border border-warning-subtle rounded-3 d-flex align-items-center gap-2 py-2 px-3 mb-3 mb-md-4 fs-8 fw-semibold text-dark shadow-sm">
          <AlertCircle size={18} className="text-danger flex-shrink-0" />
          <span>निर्देश: आवेदन पत्र भरने से पूर्व अपनी सभी व्यावसायिक जानकारी ध्यानपूर्वक जांच लें। (Fee: ₹999/Year)</span>
        </div>

        <div className="row g-3 g-lg-4">

          {/* Left Side: Scheme Eligibility & Benefits */}
          <div className="col-12 col-lg-5">
            <div className="card border rounded-3 shadow-sm bg-white overflow-hidden h-100 d-flex flex-column">
              <div className="gov-card-header-secondary d-flex align-items-center gap-2 p-3">
                <FileText size={18} />
                <span className="fw-bold">ELIGIBILITY & BENEFITS (पात्रता एवं लाभ)</span>
              </div>

              <div className="card-body p-3 p-md-4 d-flex flex-column justify-content-between">

                {/* Who Can Join */}
                <div className="mb-4">
                  <span className="fw-bold text-danger fs-8 text-uppercase d-block mb-3">◆ Who Can Apply? (कौन आवेदन कर सकता है?)</span>
                  <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                    {WHO_CAN_JOIN.map((item, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2 fs-8 fw-medium text-dark">
                        <Check size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <hr className="my-3 text-muted opacity-25" />

                {/* Benefits */}
                <div className="mb-4">
                  <span className="fw-bold text-success fs-8 text-uppercase d-block mb-3">◆ Key Benefits (मुख्य लाभ)</span>
                  <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                    {BENEFITS.map((item, idx) => (
                      <li key={idx} className="d-flex align-items-center gap-2 fs-8 fw-medium text-dark">
                        <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fee Box */}
                <div className="p-3 bg-light rounded-3 border text-center mt-auto">
                  <span className="text-muted fs-8 fw-bold text-uppercase d-block mb-1">Annual Processing Fee (वार्षिक शुल्क)</span>
                  <h3 className="fw-bold text-primary m-0 fs-3">₹999 <small className="fs-8 text-muted fw-normal">/ Annual</small></h3>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side: Official Registration Form */}
          <div className="col-12 col-lg-7">
            <div className="card border rounded-3 shadow-sm bg-white overflow-hidden">
              <div className="gov-card-header-main d-flex align-items-center gap-2 p-3">
                <ShieldCheck size={18} className="text-warning" />
                <span className="fw-bold">ONLINE APPLICATION FORM (ऑनलाइन आवेदन प्रपत्र)</span>
              </div>

              <div className="card-body p-3 p-sm-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">

                    {/* Section 1 */}
                    <div className="col-12">
                      <div className="gov-section-strip py-2 px-3 mb-1">1. Personal Information (आवेदक का व्यक्तिगत विवरण)</div>
                    </div>

                    <FormInput label="Full Name (पूरा नाम) *" name="fullName" icon={User} value={form.fullName} onChange={handleChange} required placeholder="Name as per Government ID" />
                    <FormInput label="Phone / WhatsApp *" name="phone" type="tel" icon={Phone} value={form.phone} onChange={handleChange} required placeholder="10 Digit Mobile Number" />
                    <FormInput label="Email Address (ईमेल)" name="email" type="email" icon={Mail} value={form.email} onChange={handleChange} placeholder="email@domain.com" colSize="col-12" />

                    {/* Section 2 */}
                    <div className="col-12 mt-2">
                      <div className="gov-section-strip py-2 px-3 mb-1">2. Business / Entity Details (व्यावसायिक विवरण)</div>
                    </div>

                    <FormInput label="Business / Entity Name (फर्म का नाम) *" name="businessName" icon={Building2} value={form.businessName} onChange={handleChange} required placeholder="Establishment Name" />

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold fs-8 text-dark mb-1">Category Type (श्रेणी) *</label>
                      <div className="input-group">
                        <span className="input-group-text gov-input-addon px-3">
                          <Tag size={15} />
                        </span>
                        <select name="category" value={form.category} onChange={handleChange} className="form-select gov-form-control py-2 fs-8">
                          {CATEGORIES.map(cat => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
                        </select>
                      </div>
                    </div>

                    <FormInput label="City / District (शहर / जिला) *" name="city" icon={MapPin} value={form.city} onChange={handleChange} required placeholder="District Name" />
                    <FormInput label="State (राज्य) *" name="state" icon={MapPin} value={form.state} onChange={handleChange} required placeholder="State Name" />

                    {/* Submit Section */}
                    <div className="col-12 mt-3 pt-3 border-top">
                      <button type="submit" disabled={loading} className="btn btn-gov-portal w-100 py-2 shadow-sm d-flex align-items-center justify-content-center gap-2 fw-bold">
                        {loading ? <Loader2 size={18} className="spinner-border spinner-border-sm" /> : <ShieldCheck size={18} />}
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