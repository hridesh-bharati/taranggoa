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
    { icon: 'bi-person-arms-up', title: 'Support for', subtitle: 'All Entrepreneurs', bgColor: '#2e7d32' }
  ];

  return (
    <section
      ref={sectionRef}
      className="hero-section position-relative"
      style={{
        backgroundImage: `linear-gradient(
          to right,
          #ffffff 0%,
          #ffffff 44%,
          rgba(255, 255, 255, 0.8) 58%,
          rgba(255, 255, 255, 0) 100%
        ), url('/images/home-image.png')`
      }}
    >
      <div className="container position-relative z-2">
        <div className="row align-items-center">

          {/* Left Side Content */}
          <div className="col-12 col-lg-6 text-start">

            {/* Title */}
            <h1 className="hero-title mb-2 anim-title">
              Empowering <br />
              <span className="text-blue-custom">Entrepreneurs.</span> <br />
              Creating <br />
              <span className="text-orange-custom">Opportunities.</span>
            </h1>

            {/* Line Divider */}
            <div className="hero-line-divider mb-3 anim-fade-up"></div>

            {/* Sub-text */}
            <p className="hero-desc mb-3 anim-desc">
              Tarang Goa is a platform that connects entrepreneurs, artisans, startups, businesses and innovators through exhibitions, networking and support to grow together.
            </p>

            {/* Buttons (Fixed Explore Exhibitions Visibility) */}
            <div className="d-flex flex-wrap gap-3 mb-3 align-items-center">
              <Link href="/exhibitions" className="btn btn-blue-primary rounded-pill fw-semibold d-inline-flex align-items-center gap-2 border-0 anim-btn-orange">
                <i className="bi bi-person-fill fs-6"></i>
                <span>Explore Exhibitions</span>
                <i className="bi bi-arrow-right fs-6 ms-1"></i>
              </Link>

              <Link href="/membership" className="btn btn-blue-outline rounded-pill fw-semibold d-inline-flex align-items-center gap-2 anim-btn-outline">
                <i className="bi bi-person-plus fs-6"></i>
                <span>Become a Member</span>
              </Link>
            </div>

            {/* Feature Icons Grid */}
            <div className="row g-2 max-w-lg mt-2 anim-fade-up">
              {features.map((item, idx) => (
                <div key={idx} className="col-3 text-center hover-lift">
                  <div
                    className="feature-icon-circle mb-1-5"
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <i className={`bi ${item.icon} text-white fs-5`}></i>
                  </div>
                  <div className="feature-title">{item.title}</div>
                  <div className="feature-subtitle">{item.subtitle}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Floating Video Card */}
          <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end align-items-end mt-3 mt-lg-0">
            <div className="video-card-white d-flex align-items-center gap-3 anim-fade-up hover-lift">
              <button className="btn-play-blue" aria-label="Play Video">
                <i className="bi bi-play-fill fs-3 ms-1"></i>
              </button>
              <div>
                <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.85rem' }}>
                  Watch Tarang Goa
                </h6>
                <p className="mb-0 text-muted" style={{ fontSize: '0.72rem', lineHeight: '1.25' }}>
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