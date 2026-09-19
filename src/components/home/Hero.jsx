'use client';

import { useRef } from 'react';
import Link from 'next/link';
import useScrollReveal from '@/hooks/useScrollReveal';
import './Hero.css';

export default function Hero() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const features = [
    { icon: 'bi-flower1', title: 'Exhibitions', subtitle: '& Trade Fairs', bgColor: '#0a58ca' },
    { icon: 'bi-people-fill', title: 'Networking', subtitle: '& Mentorship', bgColor: '#ffc107' },
    { icon: 'bi-graph-up-arrow', title: 'Business', subtitle: 'Growth', bgColor: '#e64a19' },
    { icon: 'bi-person-arms-up', title: 'Support for', subtitle: 'All Entrepreneurs', bgColor: '#2e7d32' },
    { icon: 'bi-bank', title: 'Govt Support', subtitle: 'SHGs & Artisans', bgColor: '#1976d2' },
  ];

  return (
    <section ref={sectionRef} className="hero-section position-relative">
      {/* Background Overlay specifically optimized for mobile readability */}
      <div className="hero-bg-overlay"></div>

      <div className="container position-relative z-2 hero-container">
        <div className="row align-items-center">

          {/* Main Content */}
          <div className="col-12 col-lg-7 text-start">
            
            {/* Badge for extra polish on mobile */}
            <div className="hero-badge d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3">
              <span className="badge-dot"></span>
              <span className="fw-semibold">Goa's Premier Entrepreneur Network</span>
            </div>

            {/* Title */}
            <h1 className="hero-title mb-3 anim-title">
              Empowering <br />
              <span className="text-blue-custom">Entrepreneurs.</span> <br />
              Creating <br />
              <span className="text-orange-custom">Opportunities.</span>
            </h1>

            {/* Line Divider */}
            <div className="hero-line-divider mb-3 anim-fade-up"></div>

            {/* Sub-text */}
            <p className="hero-desc mb-4 anim-desc">
              Tarang Goa connects artisans, startups, and innovators through premier exhibitions, networking, and direct community support.
            </p>

            {/* Call to Actions (Full width on mobile, inline on desktop) */}
            <div className="hero-actions d-flex flex-column flex-sm-row gap-2 gap-sm-3 mb-4 mb-lg-5">
              <Link 
                href="#exhibitions" 
                className="btn btn-blue-primary rounded-pill fw-semibold d-inline-flex align-items-center justify-content-center gap-2 py-2 px-4 shadow-sm"
              >
                <i className="bi bi-compass fs-6"></i>
                <span>Explore Exhibitions</span>
                <i className="bi bi-arrow-right fs-6 ms-1"></i>
              </Link>

              <Link 
                href="/membership-user-page" 
                className="btn btn-blue-outline rounded-pill fw-semibold d-inline-flex align-items-center justify-content-center gap-2 py-2 px-4"
              >
                <i className="bi bi-person-plus fs-6"></i>
                <span>Become a Member</span>
              </Link>
            </div>

            {/* Feature Icons: Mobile me clean flexible grid */}
            <div className="hero-features-grid mt-2 anim-fade-up">
              {features.map((item, idx) => (
                <div key={idx} className="feature-item">
                  <div className="feature-card p-2 rounded-3 text-center h-100 d-flex flex-column align-items-center justify-content-center">
                    <div
                      className="feature-icon-circle mb-2 d-flex align-items-center justify-content-center rounded-circle text-white shadow-sm"
                      style={{ backgroundColor: item.bgColor }}
                    >
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <div className="feature-title fw-bold text-dark">
                      {item.title}
                    </div>
                    <div className="feature-subtitle text-muted">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Floating Video Card (Mobile friendly compact card) */}
          <div className="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-end mt-4 mt-lg-0">
            <div className="video-card-white d-flex align-items-center gap-3 anim-fade-up hover-lift w-100 w-sm-auto">
              <button className="btn-play-blue flex-shrink-0" aria-label="Play Video">
                <i className="bi bi-play-fill fs-3 ms-1"></i>
              </button>
              <div className="text-start">
                <h6 className="fw-bold mb-1 text-dark" style={{ fontSize: '0.9rem' }}>
                  Watch Tarang Goa
                </h6>
                <p className="mb-0 text-muted" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                  See how we empower businesses and communities
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}