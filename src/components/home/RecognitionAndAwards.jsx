'use client';

import { useState, useRef } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function RecognitionAndAwards() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const [showAll, setShowAll] = useState(false);

  const awardList = [
    "The Giving Economy Changemakers Award 2021 – Crowdera Foundation",
    "Goa Star Women Award 2023",
    "Business Diva – Runner-Up 2020",
    "Goa's Women Achiever's Sushma Swaraj Award – Goa State BJP Mahila Morcha",
    "Appreciation by GCCI for Asturi collaborations (2022, 2023, 2024)",
    "Rotary Women Entrepreneur Award 2025 Rotary Club of Miramar"
  ];

  const galleryImages = [
    { src: '/images/recongniz-and-award1.png', alt: 'Speech Award Stage' },
    { src: '/images/recongniz-and-award2.png', alt: 'Felicitation Group Award' },
    { src: '/images/recongniz-and-award3.png', alt: 'Grand Asturi Award Ceremony' },
    { src: '/images/recongniz-and-award4.png', alt: 'Rotary Club Honor' },
    { src: '/images/recongniz-and-award5.png', alt: 'Award Celebration' },
    { src: '/images/recongniz-and-award6.png', alt: 'Achievers Stage' },
  ];

  // Show first 3 images initially, and all 6 when expanded
  const displayedImages = showAll ? galleryImages : galleryImages.slice(0, 3);

  return (
    <section ref={sectionRef} className="py-5 position-relative overflow-hidden" style={{ backgroundColor: '#FAF7F5' }}>
      
      {/* Top Right Orange Triangle Decor */}
      <div 
        className="position-absolute top-0 end-0"
        style={{
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 70px 70px 0',
          borderColor: 'transparent var(--logo-yellow, #f8a100) transparent transparent',
          zIndex: 1,
          opacity: 0.85
        }}
      ></div>

      <div className="container py-4 position-relative z-2">
        
        {/* Header Section */}
        <div className="text-center mb-5 anim-title">
          <span className="badge px-3 py-2 rounded-pill fw-bold text-uppercase mb-3 shadow-sm" style={{ backgroundColor: '#FEEFD6', color: 'var(--logo-orange, #e67e22)', letterSpacing: '1px', fontSize: '0.75rem' }}>
            Accolades & Milestones
          </span>
          <h2 className="display-5 fw-extrabold mb-3" style={{ color: '#2C1A1D', fontWeight: 800 }}>
            Recognition & Awards
          </h2>
          <p className="fs-6 text-muted mx-auto" style={{ maxWidth: '750px', lineHeight: '1.7' }}>
            Awards are not just recognition; they are a testament to the power of passion, perseverance, and unwavering belief that dreams are achievable with dedication.
          </p>
        </div>

        {/* Gallery Grid: 3 columns on PC (col-lg-4), 1 column on Mobile (col-12) */}
        <div className="row g-4 mb-4 anim-fade-up justify-content-center">
          {displayedImages.map((img, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4">
              <div 
                className="rounded-4 overflow-hidden h-100 position-relative border-0 shadow-sm transition-all"
                style={{ 
                  backgroundColor: '#ffffff',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-100 h-100 object-fit-cover transition-transform"
                    style={{ transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More / View Less Button */}
        {galleryImages.length > 3 && (
          <div className="text-center mb-5">
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn px-4 py-2 rounded-pill fw-bold shadow-sm transition-all"
              style={{
                backgroundColor: 'var(--logo-orange, #e67e22)',
                color: '#ffffff',
                border: 'none',
                letterSpacing: '0.5px'
              }}
            >
              {showAll ? 'Show Less <' : 'More Photos >'}
            </button>
          </div>
        )}

        {/* Award List Container */}
        <div className="row justify-content-center">
          <div className="col-12">
            <div 
              className="p-4 p-md-5 rounded-4 shadow-sm border-0 position-relative"
              style={{ 
                backgroundColor: '#ffffff',
                boxShadow: '0 15px 35px rgba(44, 26, 29, 0.06)'
              }}
            >
              <div className="d-flex flex-column gap-4">
                {awardList.map((award, idx) => (
                  <div key={idx} className="d-flex align-items-start gap-3 anim-desc pb-3 border-bottom border-light last-border-0">
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 mt-1 shadow-sm"
                      style={{ 
                        width: '32px', 
                        height: '32px', 
                        backgroundColor: '#FEEFD6',
                        color: 'var(--logo-orange, #e67e22)' 
                      }}
                    >
                      <i className="bi bi-trophy-fill fs-6"></i>
                    </div>
                    <div>
                      <span className="fw-bold fs-6" style={{ color: '#2C1A1D', lineHeight: '1.6' }}>
                        {award}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Dual Color Accent Strip */}
      <div 
        className="position-absolute bottom-0 start-0 end-0" 
        style={{ 
          height: '6px', 
          background: 'linear-gradient(90deg, var(--logo-orange) 0%, var(--logo-yellow) 100%)'
        }}
      ></div>

    </section>
  );
}