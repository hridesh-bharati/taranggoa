'use client';

import { useRef } from 'react';
import Link from 'next/link';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function UpcomingExhibitions() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const upcomingEvents = [
    {
      id: 'raksha-bandhan-2026',
      badge: 'Raksha Bandhan Special 🎁',
      headerBg: '#007bff', // Bright Blue from Image 2
      title: 'TARANG UTSAV 2026',
      subtitle: 'Goa’s Biggest Exhibition cum Sale',
      location: 'Kala Academy Goa, Darya Sangam',
      dates: '12th – 16th August 2026',
      days: ['12 WED', '13 THU', '14 FRI', '15 SAT', '16 SUN'],
      timing: '11:00 AM to 09:00 PM',
      categories: 'Fashion | Handicrafts | Home Décor | Lifestyle | Furniture & Much More',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
      contact: '9158063030 | 8329539407 | 9168117661'
    },
    {
      id: 'ganesh-chaturthi-2026',
      badge: 'Ganesh Chaturthi Special 🪔',
      headerBg: '#dc3545', // Crimson Red from Image 2
      title: 'TARANG UTSAV 2026',
      subtitle: 'Goa’s Biggest MSME Expo',
      location: 'SGPDA Ground, Margao',
      dates: '27th – 31st August 2026',
      days: ['27 WED', '28 THU', '29 FRI', '30 SAT', '31 SUN'],
      timing: '11:00 AM to 09:00 PM',
      categories: 'Fashion | Handicrafts | Home Décor | Lifestyle | Furniture & Much More',
      image: 'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=800',
      contact: '9158063030 | 9168117661 | 8329539407'
    }
  ];

  return (
    <section ref={sectionRef} className="py-5 bg-light position-relative overflow-hidden">
      
      {/* Component Styles matching Image 2 Institutional Theme */}
      <style jsx global>{`
        .gov-portal-card {
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid #cce1ed;
          box-shadow: 0 4px 15px rgba(0, 51, 83, 0.08);
          overflow: hidden;
        }

        .gov-portal-header {
          background-color: #003353; /* Deep Navy Blue Header from Image 2 */
          color: #ffffff;
          padding: 12px 20px;
          font-weight: 800;
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .date-chip {
          background: #003353;
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          text-align: center;
        }
      `}</style>

      <div className="container py-3 position-relative z-2">
        
        {/* Main Section Header */}
        <div className="gov-portal-card mb-5 anim-title">
          <div className="gov-portal-header">
            <span><i className="bi bi-calendar-event-fill me-2 text-warning"></i>Upcoming Projects & Festive Expos</span>
            <span className="badge bg-warning text-dark fw-bold">Session 2026</span>
          </div>
          <div className="p-4 text-center bg-white">
            <h2 className="display-6 fw-extrabold mb-2" style={{ color: '#003353', fontWeight: 900 }}>
              TARANG UTSAV 2026
            </h2>
            <p className="lead fw-bold text-danger mb-0">
              Goa’s Biggest Exhibition cum Sale is back with TWO GRAND FESTIVE EVENTS! 🎉
            </p>
          </div>
        </div>

        {/* 2 Event Cards Matching Image 2 Stat Boxes */}
        <div className="row g-4 mb-5">
          {upcomingEvents.map((item, idx) => (
            <div key={idx} className="col-lg-6">
              <div className="gov-portal-card h-100 d-flex flex-column anim-fade-up hover-lift">
                
                {/* Event Card Colored Banner (Matched to Govt Stat Cards) */}
                <div 
                  className="p-3 text-white text-center fw-bold fs-5 shadow-sm"
                  style={{ backgroundColor: item.headerBg }}
                >
                  {item.badge}
                </div>

                <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                  <div>
                    {/* Location & Time Info */}
                    <div className="bg-light p-3 rounded-3 border mb-3">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <i className="bi bi-geo-alt-fill text-danger fs-5"></i>
                        <span className="fw-extrabold text-dark fs-6">{item.location}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <i className="bi bi-calendar-check-fill text-primary fs-5"></i>
                        <span className="fw-bold text-dark">{item.dates}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-clock-fill text-warning fs-5"></i>
                        <span className="fw-semibold text-secondary">{item.timing}</span>
                      </div>
                    </div>

                    {/* Date Strip Chips */}
                    <div className="d-flex gap-2 justify-content-between mb-3 overflow-x-auto pb-1">
                      {item.days.map((day, dIdx) => (
                        <div key={dIdx} className="date-chip flex-grow-1">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Image Showcase */}
                    <div className="rounded-3 overflow-hidden border mb-3">
                      <img src={item.image} alt={item.title} className="img-fluid w-100 object-fit-cover" style={{ height: '220px' }} />
                    </div>

                    {/* Category List */}
                    <p className="fw-bold text-center text-dark fs-7 mb-3 bg-warning-subtle p-2 rounded border border-warning">
                      🏷️ {item.categories}
                    </p>
                  </div>

                  {/* Booking Contact Strip */}
                  <div className="pt-2 border-top text-center">
                    <small className="text-muted d-block mb-1 fw-bold">For Bookings & Stalls Call:</small>
                    <a href={`tel:${item.contact.split('|')[0]}`} className="btn text-white fw-bold rounded-pill w-100 py-2 shadow-sm" style={{ backgroundColor: '#003353' }}>
                      <i className="bi bi-telephone-outbound-fill me-2"></i>{item.contact}
                    </a>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Support & Sponsorship Callout Box */}
        <div className="gov-portal-card anim-fade-up">
          <div className="p-4 text-center bg-white">
            <p className="fw-bold text-dark fs-6 mb-2" style={{ lineHeight: '1.7' }}>
              🤝 We look forward to your valuable support and sponsorship as this initiative aims to create livelihood opportunities for women-led businesses, homepreneurs, artisans, and emerging entrepreneurs.
            </p>
            <p className="fw-bold text-primary mb-0">
              Together, let’s empower local brands, encourage women entrepreneurship, and celebrate the spirit of festive shopping in Goa. ✨
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}