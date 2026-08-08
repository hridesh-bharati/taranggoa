'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';
import GoalsAndObjectives from '@/components/about/GoalsAndObjectives';

export default function AboutPage() {
  const headerRef = useRef(null);
  const founderRef = useRef(null);
  const initiativesRef = useRef(null);

  useScrollReveal(headerRef);
  useScrollReveal(founderRef);
  useScrollReveal(initiativesRef);

  // --- TARANG LOGO OFFICIAL BRAND PALETTE & Core Initiatives Data ---
  const coreInitiatives = [
    {
      title: 'Skill Development Workshops',
      desc: 'Hands-on training sessions to hone practical skills and elevate business capacity.',
      icon: 'bi-tools',
      color: 'var(--logo-blue)',
      bgColor: '#e6f3fa', // Derived lighter blue
      borderColor: '#b3d9f0',
      gradient: 'linear-gradient(135deg, var(--logo-blue) 0%, #006eb0 100%)'
    },
    {
      title: 'Govt Scheme Guidance',
      desc: 'Step-by-step assistance in understanding and applying for official state and central financial schemes.',
      icon: 'bi-bank',
      color: 'var(--logo-green)',
      bgColor: '#f4f9ec', // Derived lighter green
      borderColor: '#e2f0d1',
      gradient: 'linear-gradient(135deg, var(--logo-green) 0%, #76a835 100%)'
    },
    {
      title: 'Exhibitions & Trade Fairs',
      desc: 'Premier platforms and stalls for showcasing products directly to consumers and bulk buyers.',
      icon: 'bi-shop',
      color: 'var(--logo-yellow)',
      bgColor: '#fef6e6', // Derived lighter yellow
      borderColor: '#fdebc5',
      gradient: 'linear-gradient(135deg, var(--logo-yellow) 0%, #d68b00 100%)'
    },
    {
      title: 'Marketing & Network Support',
      desc: 'Comprehensive community building and modern marketing avenues for sustainable business reach.',
      icon: 'bi-diagram-3-fill',
      color: 'var(--logo-orange)',
      bgColor: '#fef1eb', // Derived lighter orange
      borderColor: '#fdd9c8',
      gradient: 'linear-gradient(135deg, var(--logo-orange) 0%, #d44d1d 100%)'
    }
  ];

  return (
    <main className="min-vh-100 d-flex flex-column webapp-bg p-0 m-0 overflow-hidden">
      {/* 1. Header Navbar */}
      <Navbar />

      {/* 2. Hero Banner - Optimized with Bootstrap and Fixed Attachment */}
      <section
        ref={headerRef}
        className="hero-section text-white position-relative overflow-hidden py-5 d-flex align-items-center"
        style={{
          // Fixed background attachment is now handled via CSS variable/class for reliability
          backgroundImage: 'url("https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // This fixes the image relative to viewport
          minHeight: '520px'
        }}
      >
        {/* Dynamic Dark Gradient Overlay */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)',
            zIndex: 1
          }}
        />

        {/* Ambient Glow Orbs (Brand colors used) */}
        <div className="position-absolute rounded-circle blur-orb top-0 start-0 translate-middle-x" style={{ width: '400px', height: '400px', background: 'rgba(0, 129, 203, 0.25)', filter: 'blur(100px)', zIndex: 1 }} /> {/* --logo-blue */}
        <div className="position-absolute rounded-circle blur-orb bottom-0 end-0 translate-middle-y" style={{ width: '400px', height: '400px', background: 'rgba(241, 90, 36, 0.2)', filter: 'blur(100px)', zIndex: 1 }} />  {/* --logo-orange */}

        {/* Content Layer */}
        <div className="container-fluid py-4 py-md-5 text-center position-relative" style={{ zIndex: 2 }}>
          <div className="d-inline-flex align-items-center gap-2 mb-3">
            <span className="badge bg-white bg-opacity-10 text-white fw-semibold px-3 py-2 rounded-pill shadow-sm border border-white border-opacity-20 hero-badge" style={{ backdropFilter: 'blur(12px)', letterSpacing: '1px', fontSize: '0.8rem' }}>
              <i className="bi bi-star-fill me-2" style={{ color: 'var(--logo-yellow)' }}></i> ABOUT TARANG GOA
            </span>
          </div>

          <h1 className="display-4 display-md-3 fw-black mb-3 anim-title text-white hero-title" style={{ fontWeight: 900, letterSpacing: '-0.5px', lineHeight: '1.15' }}>
            Empowering Dreams into <br className="d-none d-md-block" />
            <span className="text-gradient-gold">Successful Businesses</span>
          </h1>

          <p className="lead text-light opacity-90 mx-auto anim-desc hero-desc" style={{ maxWidth: '720px', lineHeight: '1.6', fontSize: '1.1rem', fontWeight: 400 }}>
            Tarang Goa is a dedicated platform connecting entrepreneurs, artisans, startups, and innovators across Goa and India.
          </p>

          <div className="d-flex flex-wrap gap-3 justify-content-center mt-4">
            <Link href="/membership" className="btn rounded-pill px-4 py-3 fw-bold text-dark hover-app-btn shadow-lg hero-btn" style={{ backgroundColor: 'var(--logo-yellow)', border: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              Join Tarang <i className="bi bi-arrow-right ms-1"></i>
            </Link>
            <Link href="/events" className="btn btn-outline-light rounded-pill px-4 py-3 fw-bold hover-app-btn hero-btn" style={{ backdropFilter: 'blur(10px)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
              <i className="bi bi-calendar-event me-2"></i> Upcoming Events
            </Link>
          </div>
        </div>

        {/* Floating Scroll Arrow */}
        <div
          className="position-absolute start-50 translate-middle-x d-flex justify-content-center align-items-center "
          style={{ bottom: '22px', zIndex: 90, cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: window.innerHeight * 0.55, behavior: 'smooth' })}
        >
          <div className="arrow-container d-flex flex-column align-items-center p-2 rounded-circle" style={{ backgroundColor: '#ffffff', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.18)' }}>
            <span className="arrow arrow-1"></span>
            <span className="arrow arrow-2"></span>
            <span className="arrow arrow-3"></span>
          </div>
        </div>
      </section>

      {/* 3. Founder Profile Section */}
      <section ref={founderRef} className="py-5 position-relative" style={{ paddingTop: '70px !important' }}>
        <div className="container-fluid py-4">
          <div className="row g-4 g-lg-5 align-items-stretch">

            {/* Founder Image Card */}
            <div className="col-lg-5">
              <div className="anim-fade-up h-100">
                <div className="position-relative rounded-4 overflow-hidden shadow-md h-100 border-0 founder-card-wrap" style={{ minHeight: '480px', backgroundColor: '#ffffff' }}>

                  {/* Decorative Background Glow (using logo blue and yellow) */}
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(180deg, rgba(0,129,203,0.05) 0%, rgba(248,161,0,0.1) 100%)' }} />

                  <img
                    src="images/founder-of-taranggoa-sweta-cheri.png"
                    alt="Ms. Sweta Chari"
                    className="img-fluid w-100 h-100 position-absolute top-0 start-0"
                    style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  />

                  {/* Glassmorphic Overlay Tag */}
                  <div
                    className="position-absolute bottom-0 start-0 end-0 p-4 m-3 rounded-4"
                    style={{
                      background: 'rgba(15, 23, 42, 0.75)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    <span className="badge rounded-pill px-3 py-1 mb-2 fw-bold text-dark shadow-sm" style={{ backgroundColor: 'var(--logo-yellow)', fontSize: '0.75rem' }}>
                      LEADERSHIP
                    </span>
                    <h3 className="fw-extrabold text-white mb-0" style={{ fontWeight: 800 }}>Ms. Sweta Chari</h3>
                    <p className="text-light opacity-90 fw-semibold mb-0" style={{ fontSize: '0.92rem' }}>President & Founder, Tarang Goa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Founder Narrative Details */}
            <div className="col-lg-7 d-flex flex-column justify-content-center">
              <div className="anim-fade-up">
                <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                  <span className="badge fw-bold px-3 py-2 rounded-pill border" style={{ backgroundColor: '#e6f3fa', borderColor: '#b3d9f0', color: 'var(--logo-blue)', letterSpacing: '0.5px' }}>
                    <i className="bi bi-clock-history me-1"></i> OUR JOURNEY
                  </span>
                  <span className="badge text-dark fw-bold px-3 py-2 rounded-pill shadow-sm" style={{ backgroundColor: 'var(--logo-yellow)' }}>Since 2020</span>
                </div>

                <h2 className="display-6 fw-extrabold text-dark mb-4 anim-title" style={{ fontWeight: 900, letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                  Empowering Dreams into <br />
                  <span style={{ color: 'var(--logo-blue)' }}>Successful Businesses</span>
                </h2>

                {/* Quote Glass Card */}
                <div className="bg-white rounded-4 p-4 mb-4 border-start border-4 shadow-sm" style={{ borderColor: 'var(--logo-yellow)', backgroundColor: '#ffffff' }}>
                  <p className="lead text-dark fst-italic mb-0" style={{ lineHeight: '1.7', fontSize: '1.05rem', fontWeight: 500 }}>
                    "The future belongs to those who believe in the beauty of their dreams. To enhance economic growth of our state, empowering women is essential for creating a more equitable and prosperous society."
                  </p>
                </div>

                <p className="text-secondary mb-3 anim-desc" style={{ lineHeight: '1.8', fontSize: '1rem' }}>
                  At <strong style={{ color: 'var(--logo-blue)' }}>TARANG</strong>, we adopt unique ways to Empower Women across the state. We offer direct economic opportunities in entrepreneurship, skill refinement, and self-reliance while cultivating tight-knit support communities.
                </p>

                <p className="text-secondary mb-4 anim-fade-up" style={{ lineHeight: '1.8', fontSize: '1rem' }}>
                  From a small grass-root initiative, Tarang has expanded into a powerful platform uniting women entrepreneurs, local artisans, self-help groups (SHGs), and MSMEs from across Goa and India.
                </p>

                {/* Stat Grid (using derived lighter brand colors) */}
                <div className="row g-3 mt-1">
                  <div className="col-4">
                    <div className="p-3 rounded-4 text-center webapp-stat-card border" style={{ backgroundColor: '#e6f3fa', borderColor: '#b3d9f0' }}>
                      <h3 className="fw-black mb-1" style={{ color: 'var(--logo-blue)', fontWeight: 900 }}>500+</h3>
                      <span className="fw-bold d-block" style={{ color: '#005d91', fontSize: '0.75rem', letterSpacing: '0.5px' }}>MEMBERS</span>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="p-3 rounded-4 text-center webapp-stat-card border" style={{ backgroundColor: '#fef6e6', borderColor: '#fdebc5' }}>
                      <h3 className="fw-black mb-1" style={{ color: 'var(--logo-yellow)', fontWeight: 900 }}>50+</h3>
                      <span className="fw-bold d-block" style={{ color: '#a36a00', fontSize: '0.75rem', letterSpacing: '0.5px' }}>EVENTS</span>
                    </div>
                  </div>

                  <div className="col-4">
                    <div className="p-3 rounded-4 text-center webapp-stat-card border" style={{ backgroundColor: '#f4f9ec', borderColor: '#e2f0d1' }}>
                      <h3 className="fw-black mb-1" style={{ color: 'var(--logo-green)', fontWeight: 900 }}>30+</h3>
                      <span className="fw-bold d-block" style={{ color: '#628e2b', fontSize: '0.75rem', letterSpacing: '0.5px' }}>PARTNERS</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Goals & Objectives */}
      <GoalsAndObjectives />

      {/* 5. Core Initiatives Section */}
      <section ref={initiativesRef} className="py-5" style={{ backgroundColor: '#f1f5f9' }}>
        <div className="container-fluid py-4">
          <div className="text-center mb-5">
            <span className="badge fw-bold px-3 py-2 rounded-pill mb-3 border shadow-sm" style={{ backgroundColor: '#e6f3fa', borderColor: '#b3d9f0', color: 'var(--logo-blue)', letterSpacing: '0.5px' }}>
              <i className="bi bi-grid-3x3-gap-fill me-1"></i> WHAT WE DO
            </span>
            <h2 className="display-6 fw-extrabold text-dark anim-title" style={{ fontWeight: 900, letterSpacing: '-0.5px' }}>Core Initiatives</h2>
            <p className="text-muted anim-desc mx-auto" style={{ maxWidth: '600px', fontSize: '1rem' }}>Empowering businesses through structured support, training, and strategic market access.</p>
          </div>

          {/* Initiatives Cards Grid - Colors dynamic based on data */}
          <div className="row g-4 mb-5">
            {coreInitiatives.map((item, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div
                  className="card border-0 rounded-4 p-4 h-100 text-start shadow-sm webapp-card position-relative overflow-hidden"
                  style={{
                    backgroundColor: item.bgColor,
                    border: `1px solid ${item.borderColor}`,
                    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* Top Color Line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: item.gradient }} />

                  <div
                    className="mb-3 shadow-sm"
                    style={{
                      background: item.gradient,
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff'
                    }}
                  >
                    <i className={`bi ${item.icon} fs-4`}></i>
                  </div>
                  <h5 className="fw-bold text-dark mb-2" style={{ fontWeight: 700 }}>{item.title}</h5>
                  <p className="text-secondary small mb-0" style={{ lineHeight: '1.65', fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mission & Vision Dual Cards */}
          <div className="row g-4">
            <div className="col-md-6">
              <div
                className="card border-0 rounded-4 p-4 p-md-5 h-100 anim-fade-up shadow-sm webapp-card position-relative overflow-hidden"
                style={{ backgroundColor: '#ffffff', border: '1px solid #b3d9f0' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', backgroundColor: 'var(--logo-blue)' }} />

                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="rounded-3 p-3 text-white shadow-sm" style={{ backgroundColor: 'var(--logo-blue)' }}>
                    <i className="bi bi-bullseye fs-3"></i>
                  </div>
                  <div>
                    <small className="text-uppercase fw-bold" style={{ color: 'var(--logo-blue)', letterSpacing: '1px', fontSize: '0.75rem' }}>PURPOSE</small>
                    <h3 className="fw-extrabold text-dark mb-0" style={{ fontWeight: 800 }}>Our Mission</h3>
                  </div>
                </div>
                <p className="text-secondary mb-0" style={{ lineHeight: '1.7', fontSize: '1rem' }}>
                  To provide a vibrant, inclusive platform for women entrepreneurs and artisans to showcase their products, develop sustainable business skills, and access vital government schemes to scale their ventures.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="card border-0 rounded-4 p-4 p-md-5 h-100 anim-fade-up shadow-sm webapp-card position-relative overflow-hidden"
                style={{ backgroundColor: '#ffffff', border: '1px solid #fdebc5' }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', backgroundColor: 'var(--logo-yellow)' }} />

                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="rounded-3 p-3 text-dark shadow-sm" style={{ backgroundColor: 'var(--logo-yellow)' }}>
                    <i className="bi bi-eye-fill fs-3"></i>
                  </div>
                  <div>
                    <small className="text-uppercase fw-bold" style={{ color: '#a36a00', letterSpacing: '1px', fontSize: '0.75rem' }}>ASPIRATION</small>
                    <h3 className="fw-extrabold text-dark mb-0" style={{ fontWeight: 800 }}>Our Vision</h3>
                  </div>
                </div>
                <p className="text-secondary mb-0" style={{ lineHeight: '1.7', fontSize: '1rem' }}>
                  To build an equitable and prosperous society in Goa and India where every woman with a dream has the resources, network, and opportunity to turn her passion into a flourishing economic enterprise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 6. Refined CTA Banner */}
      <section
        className="py-5 text-white position-relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #0081cb 50%, #f15a24 100%)'
        }}
      >
        <div className="container-fluid py-4 text-center position-relative z-2">
          <div className="d-inline-flex align-items-center gap-2 bg-white bg-opacity-10 rounded-pill px-4 py-2 mb-3 border border-white border-opacity-20" style={{ backdropFilter: 'blur(10px)' }}>
            <i className="bi bi-megaphone-fill" style={{ color: '#f8a100' }}></i>
            <span className="fw-bold text-white" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>JOIN THE MOVEMENT</span>
          </div>

          <h2 className="display-6 fw-black mb-3 text-white" style={{ fontWeight: 900, letterSpacing: '-0.5px' }}>
            Become a Part of Tarang Today
          </h2>

          <p className="lead text-light opacity-90 mb-4 mx-auto" style={{ maxWidth: '600px', fontSize: '1.05rem' }}>
            Are you a woman entrepreneur, artisan, or business owner looking to expand your reach and grow?
          </p>

          <Link
            href="/membership"
            className="btn rounded-pill px-5 py-3 fw-bold text-dark hover-app-btn shadow-lg"
            style={{ backgroundColor: '#f8a100', border: 'none', fontSize: '1rem', transition: 'all 0.3s ease' }}
          >
            Register as a Member <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </section>

      {/* 7. Footer */}
      <Footer />

      {/* Optimized Styles - Reduced CSS */}
      <style jsx>{`
        /* Defined only essential custom interactions/gradients not easily done in standard BS5 */

        .text-gradient-gold {
          background: linear-gradient(135deg, var(--logo-yellow) 0%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hover-app-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.2) !important;
        }

        .webapp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px -8px rgba(0, 0, 0, 0.1) !important;
        }

        .webapp-stat-card:hover {
          transform: translateY(-3px);
        }

        .founder-card-wrap:hover {
          transform: translateY(-4px);
        }

        /* Scroll Arrow Animation */
        .arrow-container {
          gap: 2px;
          width: 46px;
          height: 46px;
        }

        .arrow {
          display: block;
          width: 14px;
          height: 14px;
          border-right: 3px solid var(--logo-yellow);
          border-bottom: 3px solid var(--logo-yellow);
          transform: rotate(45deg);
          animation: arrowWave 1.5s infinite;
          opacity: 0;
          margin-top: -6px;
        }

        .arrow-1 { animation-delay: 0s; margin-top: 2px; }
        .arrow-2 { animation-delay: 0.2s; }
        .arrow-3 { animation-delay: 0.4s; }

        @keyframes arrowWave {
          0% { opacity: 0; transform: rotate(45deg) translate(-6px, -6px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: rotate(45deg) translate(6px, 6px); }
        }

        /* Essential Mobile Adjustments not covered by BS5 display classes */
        @media (max-width: 768px) {
          .hero-section {
            background-attachment: scroll !important; /* Fixed bg often breaks on mobile */
          }
          .hero-title {
            font-size: 1.6rem !important;
          }
        }
      `}</style>
    </main>
  );
}