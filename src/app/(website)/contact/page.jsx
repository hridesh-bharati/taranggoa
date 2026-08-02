'use client';

import { useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function ContactPage() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  // Exact Gradients, Borders & Shadows matching "Who Can Join Tarang Goa"
  const contactCards = [
    { 
      icon: 'bi-geo-alt-fill', 
      title: 'Our Head Office', 
      detail1: 'Tarang Empowering Women', 
      detail2: 'St. Estev / Panaji, Goa, India', 
      bgGradient: 'linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)',
      borderColor: 'rgba(217, 78, 52, 0.25)',
      iconBg: 'linear-gradient(135deg, #d94e34 0%, #dc2626 100%)',
      iconShadow: '0 6px 15px rgba(217, 78, 52, 0.35)'
    },
    { 
      icon: 'bi-telephone-fill', 
      title: 'Call / WhatsApp', 
      detail1: '+91 98765 43210', 
      detail2: '+91 832 2400000', 
      bgGradient: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)',
      borderColor: 'rgba(0, 136, 204, 0.25)',
      iconBg: 'linear-gradient(135deg, #0088cc 0%, #0284c7 100%)',
      iconShadow: '0 6px 15px rgba(0, 136, 204, 0.35)'
    },
    { 
      icon: 'bi-envelope-paper-fill', 
      title: 'Email Address', 
      detail1: 'info@taranggoa.org', 
      detail2: 'support@taranggoa.org', 
      bgGradient: 'linear-gradient(135deg, #ccfbf1 0%, #f0fdfa 100%)',
      borderColor: 'rgba(20, 184, 166, 0.25)',
      iconBg: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      iconShadow: '0 6px 15px rgba(20, 184, 166, 0.35)'
    },
    { 
      icon: 'bi-clock-fill', 
      title: 'Working Hours', 
      detail1: 'Monday - Saturday', 
      detail2: '10:00 AM - 06:00 PM', 
      bgGradient: 'linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)',
      borderColor: 'rgba(124, 179, 66, 0.3)',
      iconBg: 'linear-gradient(135deg, #7cb342 0%, #16a34a 100%)',
      iconShadow: '0 6px 15px rgba(124, 179, 66, 0.35)'
    }
  ];

  return (
    <main className="min-vh-100 bg-light">
      <Navbar />

      <div ref={sectionRef}>
        {/* Header Hero Banner */}
        <section 
          className="py-5 text-white text-center position-relative overflow-hidden"
          style={{ 
            backgroundImage: `linear-gradient(rgba(11, 12, 27, 0.85), rgba(11, 12, 27, 0.85)), url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="container py-4">
            <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-bold text-uppercase mb-3 anim-title" style={{ color: '#6b21a8' }}>
              <i className="bi bi-geo-alt-fill me-1"></i> We Would Love To Connect With You
            </span>
            <h1 className="display-4 fw-bold text-uppercase anim-title mb-3">
              Get In Touch <span className="text-warning">With Us</span>
            </h1>
            <p className="lead mx-auto p-3 rounded-4 bg-dark bg-opacity-50 text-white-50 anim-desc" style={{ maxWidth: '720px' }}>
              Have questions about upcoming exhibitions, membership, or MSME government schemes? Send us a message and our team will get back to you.
            </p>
          </div>
        </section>

        {/* Colorful Cards Container (Mobile me exact 2-2 per row) */}
        <div className="container py-5">
          <div className="row g-3 g-md-4 mb-5">
            {contactCards.map((c, idx) => (
              <div key={idx} className="col-6 col-lg-3">
                <div 
                  className="card border-0 p-3 p-md-4 h-100 anim-fade-up"
                  style={{
                    background: c.bgGradient,
                    border: `1px solid ${c.borderColor}`,
                    borderRadius: '20px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
                  }}
                >
                  {/* Colorful Rounded Icon Circle */}
                  <div 
                    className="d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '16px',
                      background: c.iconBg,
                      boxShadow: c.iconShadow
                    }}
                  >
                    <i className={`bi ${c.icon} fs-4 text-white`}></i>
                  </div>

                  <h6 className="fw-bold text-dark mb-2" style={{ fontSize: '1rem' }}>{c.title}</h6>
                  <small className="text-secondary d-block fw-semibold text-truncate">{c.detail1}</small>
                  <small className="text-muted d-block text-truncate" style={{ fontSize: '0.8rem' }}>{c.detail2}</small>
                </div>
              </div>
            ))}
          </div>

          {/* Form & Map Section */}
          <div className="row g-4">
            {/* Direct Contact Form */}
            <div className="col-lg-7">
              <div className="card border-0 rounded-4 shadow-sm p-4 p-md-5 bg-white border-top border-4 border-warning anim-fade-up">
                <span className="fw-bold text-uppercase small" style={{ color: '#6b21a8' }}>• Direct Contact Form</span>
                <h3 className="fw-bold mb-4">How Can We Help You?</h3>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row g-3">
                    <div className="col-md-6 anim-desc">
                      <label className="form-label fw-bold small">Full Name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control bg-light border-0 py-2.5 rounded-3" placeholder="Sweta Chari" required />
                    </div>
                    <div className="col-md-6 anim-desc">
                      <label className="form-label fw-bold small">Email Address <span className="text-danger">*</span></label>
                      <input type="email" className="form-control bg-light border-0 py-2.5 rounded-3" placeholder="sweta@example.com" required />
                    </div>
                    <div className="col-md-6 anim-desc">
                      <label className="form-label fw-bold small">Phone Number</label>
                      <input type="tel" className="form-control bg-light border-0 py-2.5 rounded-3" placeholder="+91 98765 43210" />
                    </div>
                    <div className="col-md-6 anim-desc">
                      <label className="form-label fw-bold small">Inquiry Subject</label>
                      <input type="text" className="form-control bg-light border-0 py-2.5 rounded-3" placeholder="Exhibition Stall / Membership" />
                    </div>
                    <div className="col-12 anim-desc">
                      <label className="form-label fw-bold small">Your Message <span className="text-danger">*</span></label>
                      <textarea className="form-control bg-light border-0 p-3 rounded-3" rows="4" placeholder="Type your details or requirements here..." required></textarea>
                    </div>
                    <div className="col-12 mt-4 anim-btn-orange">
                      <button type="submit" className="btn btn-warning rounded-pill w-100 py-3 fw-bold text-dark shadow-sm">
                        Submit Message <i className="bi bi-send-fill ms-1"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Google Location Map */}
            <div className="col-lg-5">
              <div className="card border-0 rounded-4 shadow-sm overflow-hidden bg-white h-100 min-vh-40 anim-fade-up">
                <iframe 
                  title="Panaji Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123062.88390757262!2d73.7583685!3d15.4988824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfea084f728f33%3A0x6a0669d0d8291410!2sPanaji%2C%20Goa!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  className="w-100 h-100 border-0"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}