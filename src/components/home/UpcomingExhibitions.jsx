'use client';

import { useRef } from 'react';
import Link from 'next/link';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function UpcomingExhibitions() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const exhibitions = [
    {
      date: '15', 
      month: 'AUG',
      title: 'Tarang Business Expo 2026',
      duration: '15-17 Aug 2026 • Panaji, Goa',
      desc: 'A multi-sector exhibition bringing together entrepreneurs, startups and businesses.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400'
    },
    {
      date: '05', 
      month: 'SEP',
      title: 'Artisan & Craft Fair',
      duration: '05-07 Sep 2026 • Margao, Goa',
      desc: 'Celebrating local artisans and traditional crafts from across Goa.',
      image: 'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=400'
    },
    {
      date: '20', 
      month: 'SEP',
      title: 'Women Entrepreneurs Summit',
      duration: '20 Sep 2026 • Vasco, Goa',
      desc: 'An exclusive summit for women entrepreneurs to learn, connect and grow together.',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <section ref={sectionRef} className="py-5 bg-light position-relative overflow-hidden">
      <div className="container py-4">
        
        {/* Section Header */}
        <div className="text-center mb-5 anim-title">
          <span 
            className="badge text-white fw-bold px-3 py-2 rounded-pill mb-2 shadow-sm"
            style={{ backgroundColor: 'var(--badge-red, #d94e34)', fontSize: '0.75rem', letterSpacing: '0.5px' }}
          >
            • UPCOMING EXHIBITIONS
          </span>
          <h2 className="display-6 fw-extrabold text-dark m-0" style={{ fontWeight: 800 }}>
            Explore. <span style={{ color: 'var(--primary-purple, #6b21a8)' }}>Connect.</span> Grow.
          </h2>
          <p className="text-muted mt-2">Join our upcoming exhibitions and showcase your products, services and ideas.</p>
        </div>

        {/* Cards Grid */}
        <div className="row g-4 mb-5">
          {exhibitions.map((item, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden bg-white hover-lift anim-fade-up">
                
                {/* Event Image + Top Date Badge */}
                <div className="position-relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="card-img-top" 
                    style={{ height: '200px', objectFit: 'cover' }} 
                  />
                  <div 
                    className="position-absolute top-0 end-0 m-3 px-3 py-2 rounded-3 text-center text-white shadow"
                    style={{ backgroundColor: 'var(--badge-red, #d94e34)', backdropFilter: 'blur(4px)' }}
                  >
                    <span className="h4 fw-extrabold d-block m-0 lh-1">{item.date}</span>
                    <small className="fw-bold text-uppercase" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>{item.month}</small>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold text-dark mb-1">{item.title}</h5>
                    <small className="fw-semibold d-block mb-3" style={{ color: 'var(--primary-purple, #6b21a8)' }}>
                      <i className="bi bi-geo-alt-fill me-1"></i>{item.duration}
                    </small>
                    <p className="text-secondary fs-7 mb-4" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                      {item.desc}
                    </p>
                  </div>

                  <Link 
                    href={`/exhibitions/${idx}`} 
                    className="btn text-white rounded-3 w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2" 
                    style={{ backgroundColor: 'var(--primary-purple, #6b21a8)' }}
                  >
                    <span>View Details</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center anim-fade-up">
          <Link 
            href="/exhibitions" 
            className="btn rounded-pill px-4 py-2.5 fw-bold anim-btn-outline hover-lift"
            style={{ 
              borderColor: 'var(--primary-purple, #6b21a8)', 
              color: 'var(--primary-purple, #6b21a8)',
              borderWidth: '2px'
            }}
          >
            View All Exhibitions <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

      </div>
    </section>
  );
}