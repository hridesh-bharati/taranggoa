'use client';

import { useRef } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function GoalsAndObjectives() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const galleryImages = [
    { src: '/images/our-aim1.png', alt: 'Tarang Women Entrepreneurs' },
    { src: '/images/our-aim2.png', alt: 'Exhibition Stall Display' },
    { src: '/images/our-aim3.png', alt: 'Artisans Expo Group' },
    { src: '/images/our-aim4.png', alt: 'Networking Event' },
    { src: '/images/our-aim5.png', alt: 'Utsav Exhibition Gate' },
    { src: '/images/our-aim6.png', alt: 'Goa MSME Meet' },
  ];

  const goals = [
    {
      id: '01. OBJECTIVE',
      text: 'To provide a profitable marketplace for women entrepreneurs & local businesses in Goa, MSME units in Goa as well as India, thus boosting state economic growth.',
      icon: 'bi-shop',
      iconBg: 'bg-logo-orange',
      textColor: 'text-logo-orange',
      bgLight: 'bg-light',
      borderColor: 'border-warning'
    },
    {
      id: '02. OBJECTIVE',
      text: 'Help micro and medium enterprises scale up and reach consumers under one unified platform with networking & livelihood opportunities.',
      icon: 'bi-graph-up-arrow',
      iconBg: 'bg-primary-gradient',
      textColor: 'text-logo-blue',
      bgLight: 'bg-light',
      borderColor: 'border-info'
    },
    {
      id: '03. OBJECTIVE',
      text: 'Promote maximum participation of Women Entrepreneurs and Artisans of Goa to keep Goan traditional art forms thriving.',
      icon: 'bi-palette-fill',
      iconBg: 'bg-purple-main',
      textColor: 'text-logo-green',
      bgLight: 'bg-light',
      borderColor: 'border-success'
    }
  ];

  return (
    <div ref={sectionRef}>
      {/* Top Banner with Background Image + Overlay + Wave Effect */}
      <section className="position-relative text-white text-center py-5 bg-dark">
        <div
          className="position-absolute top-0 start-0 w-100 h-100 opacity-25"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        <div className="container-fluid py-4 position-relative z-2">
          <span className="badge rounded-pill px-3 py-2 bg-warning text-dark fw-bold text-uppercase mb-3 shadow-sm">
            About Tarang Goa
          </span>
          <h1 className="display-5 fw-bold mb-3">
            Empowering Dreams into Successful Businesses
          </h1>
          <p className="lead opacity-90 mx-auto max-w-700">
            Uniting women entrepreneurs, local businesses, artisans, and self-help groups from across Goa and MSMEs from India.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-5 bg-white position-relative">
        <div className="container-fluid py-3">

          {/* Section Heading Badge */}
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill bg-purple-light border border-purple-subtle mb-3 shadow-sm">
              <i className="bi bi-bullseye fs-5 text-logo-blue"></i>
              <span className="fw-bold text-uppercase small text-logo-blue">Our Mission & Purpose</span>
            </div>

            <h2 className="display-6 fw-bold text-dark m-0">
              Goals & <span className="text-logo-blue">Objectives</span>
            </h2>
          </div>

          {/* Colorful Bootstrap Cards Grid */}
          <div className="row g-4 mb-5">
            {goals.map((item, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <div className={`card h-100 p-4 rounded-4 shadow-sm border ${item.borderColor} ${item.bgLight} d-flex flex-column gap-3`}>
                  <div className="d-flex align-items-center gap-3">
                    <div className={`icon-badge-box rounded-3 ${item.iconBg}`}>
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <span className={`fw-bold small border px-3 py-1 rounded-pill bg-white ${item.textColor}`}>
                      {item.id}
                    </span>
                  </div>
                  <p className="text-dark fw-medium fs-6 m-0 lh-base">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 6-Grid Gallery */}
          <div className="row g-3 g-md-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-md-4">
                <div className="rounded-4 overflow-hidden shadow-sm border border-light">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="img-fluid w-100 object-fit-cover"
                    style={{ height: '220px' }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}