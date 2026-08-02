'use client';

import { useRef } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function RecognitionAndAwards() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const awardList = [
    "The Giving Economy Changemakers Award 2021 – Crowdera Foundation",
    "Goa Star Women Award 2023",
    "Business Diva – Runner-Up 2020",
    "Goa's Women Achiever's Sushma Swaraj Award – Goa State BJP Mahila Morcha",
    "Appreciation by GCCI for Asturi collaborations (2022, 2023, 2024)",
    "Rotary Women Entrepreneur Award 2025 Rotary Club of Miramar"
  ];

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600', alt: 'Speech Award Stage' },
    { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600', alt: 'Felicitation Group Award' },
    { src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600', alt: 'Grand Asturi Award Ceremony' },
    { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600', alt: 'Rotary Club Honor' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600', alt: 'Asturi Presentation Award' },
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600', alt: 'State Level Felicitation' },
  ];

  return (
    <section ref={sectionRef} className="py-5 bg-white position-relative overflow-hidden">
      
      {/* Top Right Orange Triangle Decor (Exact match to screenshot) */}
      <div 
        className="position-absolute top-0 end-0"
        style={{
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 60px 60px 0',
          borderColor: 'transparent var(--logo-yellow, #f8a100) transparent transparent',
          zIndex: 1
        }}
      ></div>

      <div className="container py-3 position-relative z-2">
        
        {/* Header Section */}
        <div className="text-center mb-4 anim-title">
          <h2 className="display-5 fw-extrabold text-logo-orange mb-2" style={{ color: 'var(--logo-orange)', fontWeight: 800 }}>
            Recognition & Awards
          </h2>
          <p className="fs-6 text-secondary fw-medium mx-auto" style={{ maxWidth: '850px', lineHeight: '1.6' }}>
            Awards are not just Recognition it's a Testament to the power of Passion, Perseverance and Unwavering belief That Dreams are Achievable with Dedication.
          </p>
        </div>

        {/* 6 Grid Award Ceremony Photos */}
        <div className="row g-3 mb-5 anim-fade-up">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="col-md-6">
              <div className="rounded-3 overflow-hidden shadow-sm border border-light hover-lift">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="img-fluid w-100 object-fit-cover"
                  style={{ height: '210px' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Orange Caret Arrow Bulleted List */}
        <div className="row g-3 px-lg-2 mb-4">
          <div className="col-12">
            <div className="d-flex flex-column gap-3">
              {awardList.map((award, idx) => (
                <div key={idx} className="d-flex align-items-center gap-3 anim-desc">
                  <i className="bi bi-caret-right-fill fs-4 flex-shrink-0" style={{ color: 'var(--logo-orange)' }}></i>
                  <span className="fw-bold text-dark fs-6" style={{ letterSpacing: '0.2px' }}>
                    {award}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Orange/Yellow Dual Chevron Accent Strip */}
      <div 
        className="position-absolute bottom-0 start-0 end-0" 
        style={{ 
          height: '16px', 
          background: 'linear-gradient(90deg, var(--logo-orange) 0%, var(--logo-yellow) 100%)'
        }}
      ></div>

    </section>
  );
}