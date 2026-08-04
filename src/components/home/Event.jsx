'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, CalendarX, ChevronDown, ChevronUp } from 'lucide-react';
import { eventController } from '@/controllers/event.controller';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function RecentEventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});
  const sectionRef = useRef(null);

  useScrollReveal(sectionRef, [loading, events.length]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await eventController.fetchAllEvents();
        
        const allEvents = Array.isArray(response) 
          ? response 
          : (response?.data || response?.events || []);

        if (allEvents.length > 0) {
          const shuffled = [...allEvents].sort(() => 0.5 - Math.random());
          setEvents(shuffled.slice(0, 6));
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error('Failed to load recent events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const toggleReadMore = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section ref={sectionRef} className="py-5 bg-light position-relative overflow-hidden">
      <div className="container py-3 position-relative z-2">
        
        {/* Header */}
        <div className="text-center mb-5 anim-title active">
          <span 
            className="badge text-white fw-bold px-3 py-2 rounded-pill mb-2 shadow-sm"
            style={{ backgroundColor: 'var(--logo-orange, #f15a24)', fontSize: '0.75rem', letterSpacing: '0.5px' }}
          >
            • HIGHLIGHTS & MEMORIES
          </span>
          <h2 className="display-5 fw-extrabold text-dark m-0" style={{ fontWeight: 800 }}>
            Recent <span style={{ color: 'var(--primary-purple, #6b21a8)' }}>Events</span>
          </h2>
          <p className="text-muted mt-2 anim-desc active">
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
          /* Event Cards Grid */
          <div className="row g-4 mb-5">
            {events.map((item, idx) => {
              const displayThumb = item.image || (item.gallery && item.gallery[0]) || '/images/placeholder.png';
              const cardId = item.id || idx;
              const isExpanded = !!expandedCards[cardId];
              const descText = item.description || item.desc || '';
              const isLongText = descText.length > 130;

              return (
                <div key={cardId} className="col-lg-4 col-md-6 anim-fade-up active">
                  <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden bg-white hover-lift transition-all d-flex flex-column">
                    
                    {/* Image Container */}
                    <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                      <img 
                        src={displayThumb} 
                        alt={item.title} 
                        className="w-100 h-100 object-fit-cover transition-transform" 
                        style={{ objectFit: 'cover' }}
                      />
                    </div>

                    {/* Card Body */}
                    <div className="card-body p-4 d-flex flex-column justify-content-between flex-grow-1">
                      <div>
                        {/* Fixed Title Height for Grid Consistency */}
                        <h5 className="fw-bold text-dark mb-3" style={{ minHeight: '2.8rem', lineHeight: '1.4' }}>
                          {item.title}
                        </h5>
                        
                       {/* Date & Location Strict Horizontal Layout */}
<div className="d-flex align-items-center justify-content-between text-muted fs-7 mb-3 border-bottom pb-2 gap-2">
  {item.date && (
    <div className="d-flex align-items-center gap-1 flex-shrink-0">
      <Calendar size={14} className="text-primary flex-shrink-0" />
      <span className="fw-medium text-dark-subtle">{item.date}</span>
    </div>
  )}
  
  {item.date && item.location && <span className="text-black-50">•</span>}

  {item.location && (
    <div className="d-flex align-items-center gap-1 overflow-hidden" style={{ minWidth: 0 }}>
      <MapPin size={14} className="text-danger flex-shrink-0" />
      <span className="fw-medium text-dark-subtle text-truncate">{item.location}</span>
    </div>
  )}
</div>

                        {/* Description */}
                        <p 
                          className="text-secondary mb-2" 
                          style={{
                            fontSize: '0.875rem',
                            lineHeight: '1.6',
                            ...(!isExpanded && {
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            })
                          }}
                        >
                          {descText}
                        </p>

                        {/* Inline Read More / Read Less Toggle */}
                        {isLongText && (
                          <div className="mb-3">
                            <button
                              type="button"
                              onClick={() => toggleReadMore(cardId)}
                              className="btn btn-link p-0 text-decoration-none fw-bold d-inline-flex align-items-center gap-1 border-0 bg-transparent"
                              style={{ color: 'var(--primary-purple, #6b21a8)', fontSize: '0.82rem' }}
                            >
                              <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        <Link 
                          href="/events" 
                          className="btn text-white rounded-3 w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2" 
                          style={{ backgroundColor: 'var(--primary-purple, #6b21a8)', transition: 'background-color 0.2s' }}
                        >
                          <span>Read Full Story</span>
                          <ArrowRight size={16} />
                        </Link>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        {events.length > 0 && (
          <div className="text-center anim-btn-orange active">
            <Link 
              href="/events" 
              className="btn rounded-pill px-5 py-3 fw-bold hover-lift text-white d-inline-flex align-items-center gap-2 shadow"
              style={{ backgroundColor: 'var(--logo-orange, #f15a24)' }}
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