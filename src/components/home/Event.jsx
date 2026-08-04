'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { eventController } from '@/controllers/event.controller';

// Default Fallback Data matching your screenshot
const dummyEvents = [
  {
    id: '1',
    badge: 'Felicitation',
    title: 'A Proud Moment - Tarang Felicitated at Seva Pakhwada',
    date: '17th September',
    location: 'Kala Academy, Goa',
    description: 'Felicitated at the hands of Hon\'ble Chief Minister of Goa, Dr. Pramod Sawant for promoting SHGs.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop'
  },
  {
    id: '2',
    badge: 'Recent Event',
    title: 'Tarang Pop-Up Bazaar!',
    date: 'May 1st-3rd, 2026',
    location: 'Inox Courtyard Panaji Goa',
    description: 'Inaugurated by Hon\'ble CM Dr. Pramod Sawant celebrating and supporting local entrepreneurs.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&auto=format&fit=crop'
  },
  {
    id: '3',
    badge: 'Flagship Event',
    title: 'Tarang Utsav 2026 - Celebrating Women Entrepreneurs',
    date: '16-19 April 2026',
    location: 'Kala Academy, Panaji',
    description: 'Over 120 stalls with homegrown brands and a curated fashion show with 40+ women on the ramp.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop'
  }
];

export default function RecentEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await eventController.fetchHomeEvents();
        setEvents(data.length > 0 ? data : dummyEvents);
      } catch (err) {
        console.error(err);
        setEvents(dummyEvents);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  return (
    <section className="py-5 bg-light">
      <div className="container px-3 px-md-4">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge rounded-pill px-3 py-2 fw-bold text-uppercase mb-2" style={{ backgroundColor: '#f15a24', color: '#fff', fontSize: '0.72rem', letterSpacing: '0.8px' }}>
            • Highlights & Memories
          </span>
          <h2 className="fw-extrabold text-dark display-6 mb-2" style={{ fontWeight: 900 }}>
            Recent <span style={{ color: 'var(--primary-purple)' }}>Events</span>
          </h2>
          <p className="text-secondary fs-7 m-0">
            Glimpses of our vibrant exhibitions, felicitations, and bazaars across Goa
          </p>
        </div>

        {/* Events Cards Row */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-logo-orange" role="status"></div>
          </div>
        ) : (
          <div className="row g-4 mb-5">
            {events.map((evt) => (
              <div key={evt.id} className="col-lg-4 col-md-6">
                <div className="card h-100 border-0 rounded-4 shadow-sm bg-white overflow-hidden d-flex flex-column transition-all hover-lift">
                  
                  {/* Image & Badge Wrapper */}
                  <div className="position-relative overflow-hidden" style={{ height: '210px' }}>
                    <img 
                      src={evt.image} 
                      alt={evt.title} 
                      className="w-100 h-100 object-fit-cover"
                    />
                    <span 
                      className="position-absolute top-0 end-0 m-3 badge rounded-pill fw-bold px-3 py-2 shadow-sm"
                      style={{ backgroundColor: '#f5b000', color: '#000', fontSize: '0.72rem' }}
                    >
                      {evt.badge || 'Recent Event'}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="card-body p-4 d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-extrabold text-dark mb-3 line-clamp-2" style={{ fontSize: '1.05rem', lineHeight: '1.4' }}>
                        {evt.title}
                      </h5>

                      {/* Date & Location */}
                      <div className="d-flex flex-wrap align-items-center gap-3 text-muted fs-8 fw-semibold mb-3">
                        <span className="d-flex align-items-center gap-1">
                          <Calendar size={14} className="text-primary" />
                          {evt.date}
                        </span>
                        <span className="d-flex align-items-center gap-1">
                          <MapPin size={14} className="text-danger" />
                          {evt.location}
                        </span>
                      </div>

                      <p className="text-secondary fs-8 line-clamp-3 mb-4" style={{ lineHeight: '1.5' }}>
                        {evt.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Link 
                      href={`/events/${evt.id}`} 
                      className="btn w-100 rounded-3 py-2.5 fw-bold text-white d-flex align-items-center justify-content-center gap-2 shadow-sm"
                      style={{ backgroundColor: 'var(--primary-purple)', transition: 'all 0.2s ease' }}
                    >
                      <span>Read Full Story</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Explore All Events CTA Button */}
        <div className="text-center">
          <Link 
            href="/events" 
            className="btn rounded-pill px-4 py-3 fw-bold text-white shadow d-inline-flex align-items-center gap-2"
            style={{ backgroundColor: '#f15a24', fontSize: '0.95rem' }}
          >
            <span>Explore All 8 Events</span>
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}