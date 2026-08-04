'use client';

import { useRef } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function AboutSection() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="py-5 bg-white position-relative overflow-hidden">
      
      {/* Background Decorative Large Vertical "about us" Text */}
      <div 
        className="position-absolute start-50 top-50 translate-middle pointer-events-none select-none d-none d-xl-block"
        style={{
          fontSize: '12rem',
          fontWeight: '900',
          color: 'rgba(203, 213, 225, 0.25)',
          writingMode: 'vertical-lr',
          transform: 'translate(-50%, -50%) rotate(180deg)',
          letterSpacing: '-2px',
          zIndex: 0
        }}
      >
        about us
      </div>

      <div className="container py-lg-4 position-relative z-2">
        <div className="row g-4 g-lg-5 align-items-stretch">
          
          {/* Left Column: Founder Card with Premium Frame */}
          <div className="col-lg-5 col-xl-4">
            <div className="h-100 d-flex flex-column anim-fade-up">
              
              {/* Image Box with Thick Yellow Border (Matching Poster) */}
              <div 
                className="p-2 mb-3 rounded-4 shadow-sm"
                style={{
                  backgroundColor: '#ffffff',
                  border: '6px solid var(--badge-yellow, #f5b000)'
                }}
              >
                <div className="rounded-3 overflow-hidden position-relative">
                  <img
                    src="/images/founder-of-taranggoa-sweta-cheri.png"
                    alt="Ms. Sweta Chari - President & Founder"
                    className="img-fluid w-100 object-fit-cover hover-lift"
                    style={{ height: '340px' }}
                  />
                </div>
              </div>

              {/* Founder Title */}
              <div className="text-center mb-3">
                <h4 className="fw-extrabold text-dark mb-0" style={{ fontWeight: 800 }}>Ms. Sweta Chari</h4>
                <span className="fw-bold fs-6 text-uppercase" style={{ color: 'var(--primary-purple, #6b21a8)', letterSpacing: '0.5px' }}>
                  President & Founder
                </span>
              </div>

              {/* Founder Bio Box */}
              <div className="p-3 bg-light rounded-4 border border-secondary border-opacity-10 flex-grow-1">
                <p className="text-secondary mb-0" style={{ lineHeight: '1.65', fontSize: '0.875rem' }}>
                  Sweta Chari, the founder of Tarang Empowering Women, hails from St. Estev, Goa. With a background in Electronic Engineering, she has worked as an engineer, technical writer, web designer, and vocational instructor. She also owns the fashion brand Stylie.co. Inspired by her participation in various expos, Sweta established Tarang to bring Goan entrepreneurs together on a single platform for growth and empowerment.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Letter & About Details */}
          <div className="col-lg-7 col-xl-8 d-flex flex-column justify-content-center">
            
            {/* Top Brand Tag */}
            <div className="d-flex align-items-center gap-2 mb-3 anim-title">
              <span 
                className="badge fw-bold px-3 py-2 rounded-pill shadow-sm" 
                style={{ backgroundColor: 'var(--purple-hover-bg, #f3e8ff)', color: 'var(--primary-purple, #6b21a8)' }}
              >
                • TARANG EMPOWERING WOMEN
              </span>
            </div>

            {/* Quote Block with Large Dropcap 'F' */}
            <div className="position-relative mb-4 anim-desc">
              <p className="fs-5 text-dark fw-normal fst-italic mb-0" style={{ lineHeight: '1.8' }}>
                <span 
                  className="float-start me-2 lh-1 fw-extrabold"
                  style={{ 
                    fontSize: '3.8rem', 
                    fontFamily: 'Georgia, serif',
                    color: 'var(--primary-purple, #6b21a8)',
                    marginTop: '-6px'
                  }}
                >
                  F
                </span>
                riendz... It is said, the future belongs to those who believe in the beauty of their dreams. So in order to enhance economic growth of our state, empowering women is essential. This will help in creating a more equitable and prosperous society.
              </p>
            </div>

            {/* Second Quote Paragraph */}
            <p className="text-secondary fs-6 mb-4 anim-desc" style={{ lineHeight: '1.75' }}>
              We the TARANG adopt unique ways to Empower Women in our state. We offer Economic opportunities to women in entrepreneurship, employment etc. Our initiatives support networks and community building.
            </p>

            {/* TARANG GOA Heading Section */}
            <div className="pt-3 border-top border-secondary border-opacity-25 anim-fade-up">
              <h3 className="display-6 fw-extrabold text-dark mb-3" style={{ fontWeight: 800 }}>
                TARANG <span style={{ color: 'var(--primary-purple, #6b21a8)' }}>GOA</span>
              </h3>

              <p className="text-secondary mb-3" style={{ lineHeight: '1.75' }}>
                Tarang Empowering women, an organization dedicated to fostering entrepreneurial spirit and providing a platform for women entrepreneurs, artisans to showcase their talents and innovations through exhibitions and trade fairs. We also provide skill development to turn their passion into business guiding them through Govt Schemes & marketing support.
              </p>

              <p className="text-secondary mb-0 fw-medium" style={{ lineHeight: '1.75' }}>
                From a small initiative aimed at supporting women entrepreneurs, Tarang has grown into a powerful platform uniting women entrepreneurs, local businesses, artisans, and self-help groups from across Goa, MSMEs from Goa and India.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Decorative Bottom Corner Geometry */}
      <div
        className="position-absolute bottom-0 start-0"
        style={{
          width: '0',
          height: '0',
          borderLeft: '100px solid var(--badge-yellow, #f5b000)',
          borderTop: '100px solid transparent',
          zIndex: 1,
          opacity: 0.85
        }}
      ></div>
    </section>
  );
}