'use client';

import { useRef } from 'react';
import Link from 'next/link';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function RecentEventsSection() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const homeEvents = [
    {
      id: 'seva-pakhwada',
      badge: 'Felicitation',
      title: 'A Proud Moment - Tarang Felicitated at Seva Pakhwada',
      date: '17th September',
      location: 'Kala Academy, Goa',
      desc: 'Felicitated at the hands of Hon’ble Chief Minister of Goa, Dr. Pramod Sawant for promoting SHGs.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'popup-bazaar-2026',
      badge: 'Recent Event',
      title: 'Tarang Pop-Up Bazaar!',
      date: 'May 1st-3rd, 2026',
      location: 'Inox Courtyard Panaji Goa',
      desc: 'Inaugurated by Hon’ble CM Dr. Pramod Sawant celebrating and supporting local entrepreneurs.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'utsav-2026',
      badge: 'Flagship Event',
      title: 'Tarang Utsav 2026 - Celebrating Women Entrepreneurs',
      date: '16-19 April 2026',
      location: 'Kala Academy, Panaji',
      desc: 'Over 120 stalls with homegrown brands and a curated fashion show with 40+ women on the ramp.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <section ref={sectionRef} className="py-5 bg-light position-relative overflow-hidden">
      <div className="container py-3 position-relative z-2">
        
        {/* Header */}
        <div className="text-center mb-5 anim-title">
          <span 
            className="badge text-white fw-bold px-3 py-2 rounded-pill mb-2 shadow-sm"
            style={{ backgroundColor: 'var(--logo-orange, #f15a24)', fontSize: '0.75rem', letterSpacing: '0.5px' }}
          >
            • HIGHLIGHTS & MEMORIES
          </span>
          <h2 className="display-5 fw-extrabold text-dark m-0" style={{ fontWeight: 800 }}>
            Recent <span style={{ color: 'var(--primary-purple, #6b21a8)' }}>Events</span>
          </h2>
          <p className="text-muted mt-2">Glimpses of our vibrant exhibitions, felicitations, and bazaars across Goa</p>
        </div>

        {/* Event Cards Grid */}
        <div className="row g-4 mb-5">
          {homeEvents.map((item, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden bg-white hover-lift anim-fade-up">
                
                <div className="position-relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="card-img-top" 
                    style={{ height: '220px', objectFit: 'cover' }} 
                  />
                  <span 
                    className="position-absolute top-0 end-0 m-3 badge text-dark fw-bold px-3 py-2 rounded-pill shadow"
                    style={{ backgroundColor: 'var(--badge-yellow, #f5b000)' }}
                  >
                    {item.badge}
                  </span>
                </div>

                <div className="card-body p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold text-dark mb-2">{item.title}</h5>
                    <div className="d-flex align-items-center gap-2 text-muted fs-7 mb-3">
                      <span><i className="bi bi-calendar3 me-1 text-primary"></i>{item.date}</span>
                      <span>•</span>
                      <span><i className="bi bi-geo-alt-fill me-1 text-danger"></i>{item.location}</span>
                    </div>
                    <p className="text-secondary fs-7 mb-4" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                      {item.desc}
                    </p>
                  </div>

                  <Link 
                    href="/events" 
                    className="btn text-white rounded-3 w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2" 
                    style={{ backgroundColor: 'var(--primary-purple, #6b21a8)' }}
                  >
                    <span>Read Full Story</span>
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
            href="/events" 
            className="btn rounded-pill px-5 py-3 fw-bold hover-lift text-white"
            style={{ backgroundColor: 'var(--logo-orange, #f15a24)' }}
          >
            Explore All 8 Events <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>

      </div>
    </section>
  );
}