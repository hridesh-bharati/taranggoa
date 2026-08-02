'use client';

import { useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function ContactPage() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  const contactCards = [
    {
      icon: 'bi-geo-alt-fill',
      title: 'Our Head Office',
      details: ['Tarang Empowering Women', 'St. Estev / Panaji, Goa, India'],
      badgeBg: 'bg-logo-orange',
      textClass: 'text-logo-orange'
    },
    {
      icon: 'bi-telephone-fill',
      title: 'Call / WhatsApp Us',
      details: ['+91 98765 43210', '+91 832 2400000'],
      badgeBg: 'bg-primary',
      textClass: 'text-logo-blue'
    },
    {
      icon: 'bi-envelope-paper-fill',
      title: 'Email Address',
      details: ['info@taranggoa.org', 'support@taranggoa.org'],
      badgeBg: 'bg-warning',
      textClass: 'text-dark'
    },
    {
      icon: 'bi-clock-fill',
      title: 'Working Hours',
      details: ['Monday - Saturday', '10:00 AM - 06:00 PM'],
      badgeBg: 'bg-success',
      textClass: 'text-logo-green'
    }
  ];

  return (
    <main className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />

      <div ref={sectionRef}>
        
        {/* 1. Header Banner - Pure Logo Orange & Blue Accent */}
        <section className="py-5 bg-logo-orange text-white position-relative overflow-hidden">
          <div className="container py-4 text-center position-relative z-2">
            <span className="badge bg-warning text-dark fw-bold px-4 py-2 rounded-pill mb-3 anim-title shadow-sm d-inline-flex align-items-center gap-2">
              <i className="bi bi-chat-dots-fill"></i>
              • WE WOULD LOVE TO CONNECT WITH YOU
            </span>

            <h1 className="display-4 fw-extrabold mb-3 anim-title">
              Get in Touch <span className="text-warning">With Us</span>
            </h1>

            <p className="lead text-white opacity-90 mx-auto anim-desc fs-5" style={{ maxWidth: '750px' }}>
              Have questions about upcoming exhibitions, membership, or MSME government schemes? Send us a message and our team will get back to you.
            </p>
          </div>
        </section>

        {/* 2. Contact Info Cards (Bootstrap Pure Layout) */}
        <section className="py-5 bg-white">
          <div className="container py-2">
            
            <div className="row g-4 mb-5">
              {contactCards.map((info, idx) => (
                <div key={idx} className="col-md-6 col-lg-3">
                  <div className="card border-0 rounded-4 shadow-sm p-4 h-100 bg-light anim-fade-up hover-lift">
                    <div className={`icon-badge-box mb-3 ${info.badgeBg}`}>
                      <i className={`bi ${info.icon} fs-4 text-white`}></i>
                    </div>
                    <h5 className={`fw-bold mb-2 ${info.textClass}`}>{info.title}</h5>
                    {info.details.map((line, lIdx) => (
                      <p key={lIdx} className="text-secondary fs-7 mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Form & Direct Google Map */}
            <div className="row g-4 align-items-stretch">
              
              {/* Form Box */}
              <div className="col-lg-7">
                <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white h-100 anim-fade-up border-top border-4 border-warning">
                  
                  <div className="mb-4">
                    <span className="fw-bold text-uppercase fs-7 text-logo-orange">• SEND A MESSAGE</span>
                    <h3 className="fw-extrabold text-dark m-0">How Can We Help You?</h3>
                  </div>

                  {submitted && (
                    <div className="alert alert-success rounded-3 fw-bold mb-4" role="alert">
                      <i className="bi bi-check-circle-fill me-2"></i>
                      Thank you! Your message has been sent successfully.
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6 anim-desc">
                        <label className="form-label fw-bold text-dark fs-7">Full Name *</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required 
                          className="form-control form-control-lg bg-light border-0 fs-6 rounded-3" 
                          placeholder="e.g. Sweta Chari" 
                        />
                      </div>

                      <div className="col-md-6 anim-desc">
                        <label className="form-label fw-bold text-dark fs-7">Email Address *</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required 
                          className="form-control form-control-lg bg-light border-0 fs-6 rounded-3" 
                          placeholder="e.g. sweta@example.com" 
                        />
                      </div>

                      <div className="col-md-6 anim-desc">
                        <label className="form-label fw-bold text-dark fs-7">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-control form-control-lg bg-light border-0 fs-6 rounded-3" 
                          placeholder="+91 98765 43210" 
                        />
                      </div>

                      <div className="col-md-6 anim-desc">
                        <label className="form-label fw-bold text-dark fs-7">Subject</label>
                        <input 
                          type="text" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="form-control form-control-lg bg-light border-0 fs-6 rounded-3" 
                          placeholder="Exhibition Stall Booking / Inquiry" 
                        />
                      </div>

                      <div className="col-12 anim-desc">
                        <label className="form-label fw-bold text-dark fs-7">Your Message *</label>
                        <textarea 
                          name="message"
                          rows="4" 
                          value={formData.message}
                          onChange={handleChange}
                          required 
                          className="form-control bg-light border-0 fs-6 rounded-3 p-3" 
                          placeholder="Write your query or message here..."
                        ></textarea>
                      </div>

                      <div className="col-12 mt-4 anim-btn-orange">
                        <button 
                          type="submit" 
                          className="btn bg-logo-orange text-white rounded-pill px-5 py-3 fw-extrabold hover-lift w-100 shadow-sm"
                        >
                          Submit Message <i className="bi bi-send-fill ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>

              {/* Google Map Box */}
              <div className="col-lg-5">
                <div className="card border-0 rounded-4 shadow-sm overflow-hidden bg-white h-100 d-flex flex-column anim-fade-up">
                  
                  <div className="flex-grow-1 position-relative" style={{ minHeight: '320px' }}>
                    <iframe 
                      title="Tarang Goa Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123062.88390757262!2d73.7583685!3d15.4988824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfea084f728f33%3A0x6a0669d0d8291410!2sPanaji%2C%20Goa!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                      className="w-100 h-100 border-0 position-absolute top-0 start-0"
                      loading="lazy"
                    ></iframe>
                  </div>

                  {/* Social Strip */}
                  <div className="p-4 bg-dark text-white text-center">
                    <h6 className="fw-bold mb-2">Connect With Tarang On Social Media</h6>
                    <div className="d-flex justify-content-center gap-3 mt-3">
                      <a href="#facebook" className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                        <i className="bi bi-facebook fs-5"></i>
                      </a>
                      <a href="#instagram" className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                        <i className="bi bi-instagram fs-5"></i>
                      </a>
                      <a href="#whatsapp" className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                        <i className="bi bi-whatsapp fs-5"></i>
                      </a>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}