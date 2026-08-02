'use client';

import { useRef } from 'react';
import Link from 'next/link';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function Hero() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const features = [
    {
      icon: 'bi-flower1',
      title: 'Exhibitions',
      subtitle: '& Trade Fairs'
    },
    {
      icon: 'bi-people-fill',
      title: 'Networking',
      subtitle: '& Mentorship'
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'Business',
      subtitle: 'Growth'
    },
    {
      icon: 'bi-person-arms-up',
      title: 'Support for',
      subtitle: 'All Entrepreneurs'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="hero-section position-relative overflow-hidden d-flex align-items-center py-5 py-lg-0"
      style={{
        minHeight: 'calc(100vh - 80px)',
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(11, 12, 27, 0.95) 0%,
          rgba(11, 12, 27, 0.85) 40%,
          rgba(11, 12, 27, 0.4) 100%
        ), url('/images/home-image.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Desktop Gradient Overlay adjustment via pseudo style or inline query handling */}
      <style jsx>{`
        @media (min-width: 992px) {
          .hero-section {
            background-image: linear-gradient(
              to right,
              #0b0c1b 0%,
              #0b0c1b 38%,
              rgba(11, 12, 27, 0.85) 55%,
              rgba(11, 12, 27, 0.2) 100%
            ), url('/images/home-image.png') !important;
            background-position: center right !important;
          }
        }
      `}</style>

      <div className="container  position-relative z-2 py-3 py-lg-5">
        <div className="row align-items-center g-4 g-lg-5">
          
          {/* Left Content Column */}
          <div className="col-12 col-lg-7 col-xl-6 text-start">
            
            {/* Sub-tagline */}
            <div className="d-flex align-items-center gap-2 mb-3 text-warning fw-semibold tracking-wider text-uppercase" style={{ fontSize: '0.8rem' }}>
              <span style={{ width: '20px', height: '1.5px', backgroundColor: '#ffb703' }}></span>
              <span>TOGETHER WE RISE</span>
              <span style={{ width: '20px', height: '1.5px', backgroundColor: '#ffb703' }}></span>
            </div>

            {/* Main Headline */}
            <h1 className="display-4 text-white fw-bold mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.2' }}>
              Empowering <br className="d-none d-sm-block" />
              <span style={{ color: '#ffc107' }}>Entrepreneurs.</span> <br />
              Creating <br className="d-none d-sm-block" />
              <span style={{ color: '#a855f7' }}>Opportunities.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-white-50 fs-6 mb-4 pe-lg-3" style={{ lineHeight: '1.6', maxWidth: '520px' }}>
              Tarang Goa is a platform that connects entrepreneurs, artisans, startups, businesses and innovators through exhibitions, networking and support to grow together.
            </p>

            {/* CTA Buttons */}
            <div className="d-flex flex-column flex-sm-row flex-wrap gap-3 mb-4 mb-lg-5">
              <Link href="/exhibitions" className="btn rounded-pill px-4 py-2-5 fw-bold d-inline-flex align-items-center justify-content-center gap-2 border-0 shadow-lg hover-scale" style={{ backgroundColor: '#ffc107', color: '#000' }}>
                <span>Explore Exhibitions</span>
                <i className="bi bi-arrow-right fs-5"></i>
              </Link>
              
              <Link href="/membership" className="btn btn-outline-light rounded-pill px-4 py-2-5 fw-semibold d-inline-flex align-items-center justify-content-center gap-2 hover-scale" style={{ borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                <span>Become a Member</span>
                <i className="bi bi-person-plus text-warning"></i>
              </Link>
            </div>

            {/* 4 Features Cards Grid */}
            <div className="row g-2 g-sm-3">
              {features.map((item, idx) => (
                <div key={idx} className="col-6 col-md-3">
                  <div className="d-flex align-items-center gap-2 p-2 h-100 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(4px)' }}>
                    <div className="rounded-3 p-2 d-flex align-items-center justify-content-center flex-shrink-0" style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', width: 36, height: 36 }}>
                      <i className={`bi ${item.icon} fs-6`}></i>
                    </div>
                    <div className="overflow-hidden">
                      <span className="fw-semibold text-white d-block text-truncate" style={{ fontSize: '0.75rem', lineHeight: '1.2' }}>{item.title}</span>
                      <small className="text-white-50 d-block text-truncate" style={{ fontSize: '0.65rem' }}>{item.subtitle}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Video Floating Card */}
          <div className="col-12 col-lg-5 col-xl-6 d-flex justify-content-center justify-content-lg-end align-items-end mt-4 mt-lg-0">
            <div 
              className="p-3 shadow-lg d-flex align-items-center gap-3 rounded-4 border hover-scale"
              style={{
                maxWidth: '340px',
                width: '100%',
                backgroundColor: 'rgba(15, 10, 30, 0.85)',
                backdropFilter: 'blur(16px)',
                borderColor: 'rgba(168, 85, 247, 0.3)'
              }}
            >
              <button className="btn rounded-circle p-0 d-flex align-items-center justify-content-center flex-shrink-0 text-white border-0 shadow" style={{ width: 44, height: 44, background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' }} aria-label="Play Video">
                <i className="bi bi-play-fill fs-3 ms-1"></i>
              </button>
              <div>
                <h6 className="fw-bold mb-1 text-white fs-6">Discover Tarang Goa</h6>
                <small className="text-white-50 d-block lh-sm" style={{ fontSize: '0.75rem' }}>
                  Watch how we empower businesses and communities
                </small>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}