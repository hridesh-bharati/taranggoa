'use client';

import { useRef, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function ContactPage() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      // Auto hide alert after 5s
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const contactCards = [
    {
      icon: 'bi-geo-alt-fill',
      title: 'Our Head Office',
      detail1: 'Tarang Empowering Women',
      detail2: 'St. Estev / Panaji, Goa, India',
      badgeClass: 'bg-logo-orange text-white'
    },
    {
      icon: 'bi-telephone-fill',
      title: 'Call / WhatsApp',
      detail1: '+91 98765 43210',
      detail2: '+91 832 2400000',
      badgeClass: 'bg-primary text-white'
    },
    {
      icon: 'bi-envelope-paper-fill',
      title: 'Email Address',
      detail1: 'info@taranggoa.org',
      detail2: 'support@taranggoa.org',
      badgeClass: 'bg-warning text-dark'
    },
    {
      icon: 'bi-clock-fill',
      title: 'Working Hours',
      detail1: 'Monday - Saturday',
      detail2: '10:00 AM - 06:00 PM',
      badgeClass: 'bg-success text-white'
    }
  ];

  return (
    <main className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />

      <div ref={sectionRef}>
        
        {/* 1. Ultra-Clean Hero Header Banner */}
        <section 
          className="py-5 text-white position-relative overflow-hidden"
          style={{ 
            backgroundColor: 'var(--logo-orange, #f15a24)',
            backgroundImage: `
              linear-gradient(135deg, rgba(241, 90, 36, 0.92) 0%, rgba(2, 40, 89, 0.88) 100%),
              url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="container py-5 text-center position-relative z-2">
            
            <div className="anim-title">
              <span 
                className="badge text-dark fw-extrabold px-4 py-2 rounded-pill mb-3 shadow-sm d-inline-flex align-items-center gap-2"
                style={{ 
                  backgroundColor: '#ffffff', 
                  fontSize: '0.825rem', 
                  letterSpacing: '1px',
                  fontWeight: 800
                }}
              >
                <i className="bi bi-geo-alt-fill text-logo-orange"></i>
                • WE WOULD LOVE TO CONNECT WITH YOU
              </span>
            </div>

            <h1 
              className="display-3 fw-extrabold mb-3 anim-title text-uppercase" 
              style={{ fontWeight: 900, letterSpacing: '-0.5px', textShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
            >
              Get in Touch <span className="text-warning">With Us</span>
            </h1>

            <div className="anim-desc mx-auto" style={{ maxWidth: '780px' }}>
              <p 
                className="fs-5 text-white fw-bold p-3.5 rounded-4 shadow-sm" 
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.22)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  lineHeight: '1.7',
                  textShadow: '0 2px 6px rgba(0,0,0,0.4)'
                }}
              >
                Have questions about upcoming exhibitions, membership, or MSME government schemes? Send us a message and our team will get back to you.
              </p>
            </div>

          </div>
        </section>

        {/* 2. Contact Cards Row */}
        <section className="py-5 bg-white">
          <div className="container py-2">
            
            <div className="row g-4 mb-5">
              {contactCards.map((info, idx) => (
                <div key={idx} className="col-md-6 col-lg-3">
                  <div className="card border-0 rounded-4 shadow-sm p-4 h-100 bg-light anim-fade-up hover-lift">
                    <div className={`icon-badge-box mb-3 ${info.badgeClass}`}>
                      <i className={`bi ${info.icon} fs-4`}></i>
                    </div>
                    <h5 className="fw-extrabold text-dark mb-2" style={{ fontWeight: 800 }}>{info.title}</h5>
                    <p className="text-secondary fs-7 mb-0">{info.detail1}</p>
                    <p className="text-muted fs-7 mb-0">{info.detail2}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Form & Google Map Layout */}
            <div className="row g-4 align-items-stretch">
              
              {/* Minimal Modern Form */}
              <div className="col-lg-7">
                <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white h-100 anim-fade-up border-top border-4 border-warning">
                  
                  <div className="mb-4">
                    <span className="fw-bold text-uppercase fs-7 text-logo-orange">• DIRECT CONTACT FORM</span>
                    <h3 className="fw-extrabold text-dark m-0" style={{ fontWeight: 800 }}>How Can We Help You?</h3>
                  </div>

                  {submitted && (
                    <div className="alert alert-success rounded-3 fw-bold mb-4 d-flex align-items-center gap-2" role="alert">
                      <i className="bi bi-check-circle-fill fs-5 text-success"></i>
                      <span>Thank you! Your message has been sent successfully. We will contact you soon.</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      
                      {/* Name */}
                      <div className="col-md-6 anim-desc">
                        <label className="form-label fw-bold text-dark fs-7">Full Name <span className="text-danger">*</span></label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required 
                          className="form-control form-control-lg bg-light border-0 fs-6 rounded-3 px-3 py-2.5" 
                          placeholder="Sweta Chari" 
                        />
                      </div>

                      {/* Email */}
                      <div className="col-md-6 anim-desc">
                        <label className="form-label fw-bold text-dark fs-7">Email Address <span className="text-danger">*</span></label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required 
                          className="form-control form-control-lg bg-light border-0 fs-6 rounded-3 px-3 py-2.5" 
                          placeholder="sweta@example.com" 
                        />
                      </div>

                      {/* Phone */}
                      <div className="col-md-6 anim-desc">
                        <label className="form-label fw-bold text-dark fs-7">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-control form-control-lg bg-light border-0 fs-6 rounded-3 px-3 py-2.5" 
                          placeholder="+91 98765 43210" 
                        />
                      </div>

                      {/* Subject */}
                      <div className="col-md-6 anim-desc">
                        <label className="form-label fw-bold text-dark fs-7">Inquiry Subject</label>
                        <input 
                          type="text" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="form-control form-control-lg bg-light border-0 fs-6 rounded-3 px-3 py-2.5" 
                          placeholder="Exhibition Stall / Membership" 
                        />
                      </div>

                      {/* Message */}
                      <div className="col-12 anim-desc">
                        <label className="form-label fw-bold text-dark fs-7">Your Message <span className="text-danger">*</span></label>
                        <textarea 
                          name="message"
                          rows="4" 
                          value={formData.message}
                          onChange={handleChange}
                          required 
                          className="form-control bg-light border-0 fs-6 rounded-3 p-3" 
                          placeholder="Type your details or requirements here..."
                        ></textarea>
                      </div>

                      {/* Submit Button */}
                      <div className="col-12 mt-4 anim-btn-orange">
                        <button 
                          type="submit" 
                          disabled={loading}
                          className="btn bg-logo-orange text-white rounded-pill px-5 py-3 fw-extrabold hover-lift w-100 shadow-sm d-flex align-items-center justify-content-center gap-2"
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              <span>Sending Message...</span>
                            </>
                          ) : (
                            <>
                              <span>Submit Message</span>
                              <i className="bi bi-send-fill"></i>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  </form>

                </div>
              </div>

              {/* Map & Social Block */}
              <div className="col-lg-5">
                <div className="card border-0 rounded-4 shadow-sm overflow-hidden bg-white h-100 d-flex flex-column anim-fade-up">
                  
                  {/* Google Map */}
                  <div className="flex-grow-1 position-relative" style={{ minHeight: '320px' }}>
                    <iframe 
                      title="Tarang Goa Location Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123062.88390757262!2d73.7583685!3d15.4988824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfea084f728f33%3A0x6a0669d0d8291410!2sPanaji%2C%20Goa!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                      className="w-100 h-100 border-0 position-absolute top-0 start-0"
                      loading="lazy"
                    ></iframe>
                  </div>

                  {/* Social Handles Strip */}
                  <div className="p-4 bg-dark text-white text-center">
                    <h6 className="fw-bold mb-1">Connect With Us On Social Media</h6>
                    <small className="text-secondary d-block mb-3">Stay updated with our latest exhibitions & bazaars</small>
                    <div className="d-flex justify-content-center gap-3">
                      <a href="#facebook" aria-label="Facebook" className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center hover-lift" style={{ width: 42, height: 42 }}>
                        <i className="bi bi-facebook fs-5"></i>
                      </a>
                      <a href="#instagram" aria-label="Instagram" className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center hover-lift" style={{ width: 42, height: 42 }}>
                        <i className="bi bi-instagram fs-5"></i>
                      </a>
                      <a href="#whatsapp" aria-label="WhatsApp" className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center hover-lift" style={{ width: 42, height: 42 }}>
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