'use client';

import { useRef } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import { Target, CheckCircle2 } from 'lucide-react';
import './GoalsAndObjectives.css';

export default function GoalsAndObjectives() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600', alt: 'Tarang Women Entrepreneurs' },
    { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600', alt: 'Exhibition Stall Display' },
    { src: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600', alt: 'Artisans Expo Group' },
    { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600', alt: 'Networking Event' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600', alt: 'Utsav Exhibition Gate' },
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600', alt: 'Goa MSME Meet' },
  ];

  const goals = [
    "To provide a profitable marketplace for women entrepreneurs & local businesses in Goa, MSME units in Goa as well as India, thus boosting state economic growth.",
    "Help micro and medium enterprises scale up and reach consumers under one unified platform with networking & livelihood opportunities.",
    "Promote maximum participation of Women Entrepreneurs and Artisans of Goa to keep Goan traditional art forms thriving."
  ];

  return (
    <div ref={sectionRef}>
      
      {/* Top Banner with Background Image + Overlay + Water Wave Effect */}
      <section className="hero-water-banner position-relative text-white text-center py-5">
        <div className="hero-bg-overlay"></div>
        
        <div className="container-fluid  py-4 position-relative z-2">
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

        {/* Water Wave SVG Bottom Effect */}
        <div className="water-wave-container">
          <svg className="water-wave" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="parallax-waves">
              <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.3)" />
              <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
              <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.8)" />
              <use href="#gentle-wave" x="48" y="7" fill="#ffffff" />
            </g>
          </svg>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-5 bg-white position-relative">
        <div className="container-fluid  py-3">
          
          {/* Section Heading Badge */}
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill bgradient-badge mb-3 shadow-sm">
              <Target size={22} className="text-purple-main" />
              <span className="fw-bold text-uppercase small text-purple-main">Our Mission & Purpose</span>
            </div>
            
            <h2 className="display-6 fw-bold text-dark m-0">
              Goals & <span className="text-purple-main">Objectives</span>
            </h2>
          </div>

          {/* BGradient Cards Grid */}
          <div className="row g-4 mb-5">
            {goals.map((goal, idx) => (
              <div key={idx} className="col-12 col-md-4">
                <div className="bgradient-card h-100 p-4 rounded-4 shadow-sm border d-flex flex-column gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <div className="icon-badge-box rounded-3 p-2 d-flex align-items-center justify-content-center">
                      <CheckCircle2 size={20} className="text-white" />
                    </div>
                    <span className="fw-bold text-muted small">0{idx + 1}. OBJECTIVE</span>
                  </div>
                  <p className="text-dark fw-medium fs-6 m-0 lh-base">
                    {goal}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 6-Grid Gallery */}
          <div className="row g-3 g-md-4">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-md-4">
                <div className="gallery-item-card rounded-4 overflow-hidden shadow-sm">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="img-fluid w-100 object-fit-cover gallery-img"
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