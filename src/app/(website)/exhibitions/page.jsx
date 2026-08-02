'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function ExhibitionsPage() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const [activeTab, setActiveTab] = useState('all');

  const exhibitions = [
    {
      id: 'raksha-bandhan-2026',
      title: 'Tarang Utsav 2026 - Raksha Bandhan Special',
      date: '12 - 16 Aug 2026',
      location: 'Kala Academy Goa, Darya Sangam',
      type: 'upcoming',
      badge: 'Upcoming',
      badgeClass: 'bg-primary text-white',
      desc: 'Goa’s biggest festive exhibition cum sale featuring fashion, handicrafts, home décor, and lifestyle products.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'ganesh-chaturthi-2026',
      title: 'Tarang Utsav 2026 - Ganesh Chaturthi Special',
      date: '27 - 31 Aug 2026',
      location: 'SGPDA Ground, Margao, Goa',
      type: 'upcoming',
      badge: 'Upcoming',
      badgeClass: 'bg-primary text-white',
      desc: 'Grand MSME Expo and festive shopping bazaar bringing together 120+ local women entrepreneurs and artisans.',
      image: 'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'popup-bazaar-2026',
      title: 'Tarang Pop-Up Bazaar 2026',
      date: '01 - 03 May 2026',
      location: 'Inox Courtyard, Panaji, Goa',
      type: 'past',
      badge: 'Completed',
      badgeClass: 'bg-secondary text-white',
      desc: 'Special weekend pop-up bazaar inaugurated by Hon’ble CM Dr. Pramod Sawant supporting Goan homepreneurs.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'carnival-fair-2026',
      title: 'Carnival Fair 2026',
      date: '14 - 15 Feb 2026',
      location: 'Dr. F. L. Gomes Garden, Panaji, Goa',
      type: 'past',
      badge: 'Completed',
      badgeClass: 'bg-secondary text-white',
      desc: 'A vibrant carnival market featuring 60+ women entrepreneurs with over 8000+ public footfall.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'diwali-edition-2025',
      title: 'Tarang Utsav 2025 - Diwali Edition',
      date: '16 - 19 Oct 2025',
      location: 'Don Bosco Oratory, Panjim',
      type: 'past',
      badge: 'Completed',
      badgeClass: 'bg-secondary text-white',
      desc: 'Diwali festive shopping festival featuring 150+ stalls organized in association with DRDA & Goa Tourism.',
      image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'goa-mohotsav-2025',
      title: 'Goa Mohotsav 2025 (Bangalore)',
      date: '25 - 26 May 2025',
      location: 'Art of Living Centre, Bangalore',
      type: 'past',
      badge: 'National Expo',
      badgeClass: 'bg-warning text-dark',
      desc: 'Tarang’s first out-of-state national exhibition showcasing authentic Goan handicraft & MSME brands in Bangalore.',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const filteredExhibitions = activeTab === 'all' 
    ? exhibitions 
    : exhibitions.filter(item => item.type === activeTab);

  return (
    <main className="min-vh-100 d-flex flex-column bg-light">
      <Navbar />

      <div ref={sectionRef}>
        
        {/* 1. Header Banner */}
        <section 
          className="py-5 text-white position-relative overflow-hidden"
          style={{ 
            backgroundColor: 'var(--logo-orange, #f15a24)',
            backgroundImage: `
              linear-gradient(135deg, rgba(241, 90, 36, 0.92) 0%, rgba(2, 40, 89, 0.88) 100%),
              url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="container py-5 text-center position-relative z-2">
            <div className="anim-title">
              <span className="badge bg-white text-dark fw-extrabold px-4 py-2 rounded-pill mb-3 shadow-sm d-inline-flex align-items-center gap-2">
                <i className="bi bi-shop text-logo-orange"></i>
                • TARANG EXHIBITIONS & BAZAARS
              </span>
            </div>

            <h1 className="display-4 fw-extrabold mb-3 anim-title text-uppercase" style={{ fontWeight: 900 }}>
              Explore <span className="text-warning">Exhibitions</span>
            </h1>

            <div className="anim-desc mx-auto" style={{ maxWidth: '750px' }}>
              <p className="lead text-white opacity-90 fs-5" style={{ lineHeight: '1.7' }}>
                Discover state-level trade expos, pop-up bazaars, and cultural shopping festivals organized to empower local women entrepreneurs and artisans across Goa and India.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Filter Tabs & Content Section */}
        <section className="py-5 bg-white">
          <div className="container py-2">
            
            {/* Filter Pills */}
            <div className="d-flex justify-content-center gap-2 mb-5 anim-fade-up">
              <button 
                onClick={() => setActiveTab('all')}
                className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${
                  activeTab === 'all' 
                    ? 'bg-logo-orange text-white shadow-sm' 
                    : 'btn-outline-secondary'
                }`}
              >
                All Exhibitions
              </button>
              <button 
                onClick={() => setActiveTab('upcoming')}
                className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${
                  activeTab === 'upcoming' 
                    ? 'bg-logo-orange text-white shadow-sm' 
                    : 'btn-outline-secondary'
                }`}
              >
                Upcoming Expos
              </button>
              <button 
                onClick={() => setActiveTab('past')}
                className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${
                  activeTab === 'past' 
                    ? 'bg-logo-orange text-white shadow-sm' 
                    : 'btn-outline-secondary'
                }`}
              >
                Past Archives
              </button>
            </div>

            {/* Cards Grid */}
            <div className="row g-4">
              {filteredExhibitions.map((item, idx) => (
                <div key={idx} className="col-lg-4 col-md-6 anim-fade-up">
                  <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden bg-white hover-lift">
                    
                    {/* Image & Status Badge */}
                    <div className="position-relative">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="card-img-top" 
                        style={{ height: '210px', objectFit: 'cover' }} 
                      />
                      <span className={`position-absolute top-0 end-0 m-3 badge fw-bold px-3 py-2 rounded-pill shadow ${item.badgeClass}`}>
                        {item.badge}
                      </span>
                    </div>

                    {/* Body Info */}
                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="fw-extrabold text-dark mb-2" style={{ fontWeight: 800 }}>{item.title}</h5>
                        
                        <div className="d-flex align-items-center gap-2 text-muted fs-7 mb-2">
                          <i className="bi bi-calendar-event-fill text-primary"></i>
                          <span className="fw-semibold text-dark">{item.date}</span>
                        </div>

                        <div className="d-flex align-items-center gap-2 text-muted fs-7 mb-3">
                          <i className="bi bi-geo-alt-fill text-danger"></i>
                          <span>{item.location}</span>
                        </div>

                        <p className="text-secondary fs-7 mb-4" style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                          {item.desc}
                        </p>
                      </div>

                      {/* Action Button */}
                      <Link 
                        href="/contact" 
                        className="btn bg-logo-orange text-white rounded-3 w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                      >
                        <span>Stall Booking / Info</span>
                        <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}