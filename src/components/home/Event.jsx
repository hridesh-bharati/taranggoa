'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, CalendarX, ChevronDown, ChevronUp } from 'lucide-react';
import { eventController } from '@/controllers/event.controller';

export default function RecentEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await eventController.fetchAllEvents();
        const allEvents = data || [];

        // Fisher-Yates Shuffling for Randomness
        const shuffled = [...allEvents].sort(() => 0.5 - Math.random());
        
        // Pick top 4 random events
        setEvents(shuffled.slice(0, 4));
      } catch (err) {
        console.error('Failed to load recent events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  // Toggle Read More / Read Less per Card
  const toggleReadMore = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="py-5 bg-light">
      <div className="container-fluid px-md-5 px-3">
        
        {/* Section Header */}
        <div className="text-center mb-5">
          <span 
            className="badge rounded-pill px-3 py-2 fw-bold text-uppercase mb-2" 
            style={{ backgroundColor: '#f15a24', color: '#fff', fontSize: '0.72rem', letterSpacing: '0.8px' }}
          >
            • Highlights & Memories
          </span>
          <h2 className="fw-extrabold text-dark display-6 mb-2" style={{ fontWeight: 900 }}>
            Recent <span style={{ color: 'var(--primary-purple, #6f42c1)' }}>Events</span>
          </h2>
          <p className="text-secondary fs-7 m-0">
            Glimpses of our vibrant exhibitions, felicitations, and bazaars across Goa
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status"></div>
          </div>
        ) : events.length === 0 ? (
          /* Empty State */
          <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-white my-4">
            <div className="d-flex justify-content-center mb-3">
              <div className="p-3 bg-light rounded-circle text-muted">
                <CalendarX size={36} />
              </div>
            </div>
            <h5 className="fw-bold text-dark mb-1">No Recent Events Found</h5>
            <p className="text-secondary fs-7 m-0">Check back soon for upcoming exhibitions and event highlights!</p>
          </div>
        ) : (
          /* Desktop (lg) = 4 Cards (col-lg-3), Tablet (md) = 2 Cards (col-md-6), Mobile = 1 Card (col-12) */
          <div className="row g-3 mb-5">
            {events.map((evt) => {
              const displayThumb = evt.image || (evt.gallery && evt.gallery[0]) || '/images/placeholder.png';
              const isExpanded = !!expandedCards[evt.id];
              const descText = evt.description || '';
              
              // 10 lines is roughly ~250-300 characters
              const isLongText = descText.length > 250;

              return (
                <div key={evt.id} className="col-12 col-md-6 col-lg-3">
                  <div className="card h-100 border-0 rounded-4 shadow-sm bg-white overflow-hidden d-flex flex-column transition-all hover-lift">
                    
                    {/* Image Container */}
                    <div className="position-relative overflow-hidden" style={{ height: '180px' }}>
                      <img 
                        src={displayThumb} 
                        alt={evt.title} 
                        className="w-100 h-100 object-fit-cover"
                      />
                      {evt.category && (
                        <span 
                          className="position-absolute top-0 end-0 m-2 badge rounded-pill fw-bold px-2.5 py-1 shadow-sm"
                          style={{ backgroundColor: '#f5b000', color: '#000', fontSize: '0.68rem' }}
                        >
                          {evt.category}
                        </span>
                      )}
                    </div>

                    {/* Body Content */}
                    <div className="card-body p-3 d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="fw-extrabold text-dark mb-2 fs-6" style={{ lineHeight: '1.3' }}>
                          {evt.title}
                        </h5>

                        {/* Date & Location */}
                        <div className="d-flex flex-column gap-1 text-muted fs-8 fw-semibold mb-3">
                          {evt.date && (
                            <span className="d-flex align-items-center gap-1">
                              <Calendar size={13} className="text-primary flex-shrink-0" />
                              <span className="text-truncate">{evt.date}</span>
                            </span>
                          )}
                          {evt.location && (
                            <span className="d-flex align-items-center gap-1">
                              <MapPin size={13} className="text-danger flex-shrink-0" />
                              <span className="text-truncate">{evt.location}</span>
                            </span>
                          )}
                        </div>

                        {/* Description Text (Strict 10 Lines Limit when collapsed) */}
                        <p 
                          className="text-secondary fs-7 m-0" 
                          style={
                            !isExpanded ? {
                              display: '-webkit-box',
                              WebkitLineClamp: 10,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              lineHeight: '1.5'
                            } : {
                              lineHeight: '1.5'
                            }
                          }
                        >
                          {descText}
                        </p>
                      </div>

                      {/* Read More / Read Less Button */}
                      {isLongText && (
                        <div className="pt-2 mt-auto border-top border-light">
                          <button
                            type="button"
                            onClick={() => toggleReadMore(evt.id)}
                            className="btn btn-link p-0 text-decoration-none fw-bold fs-8 d-inline-flex align-items-center gap-1"
                            style={{ color: 'var(--primary-purple, #6f42c1)' }}
                          >
                            <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </div>
                      )}

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Explore All Events Main Button */}
        {events.length > 0 && (
          <div className="text-center">
            <Link 
              href="/events" 
              className="btn rounded-pill px-4 py-3 fw-bold text-white shadow d-inline-flex align-items-center gap-2"
              style={{ backgroundColor: '#f15a24', fontSize: '0.95rem' }}
            >
              <span>Explore All Events</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}