'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { eventController } from '@/controllers/event.controller';
import { CalendarX, Loader2 } from 'lucide-react';

// --- Multi-Trigger Scroll Observer ---
const useScrollReveal = (deps = []) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, deps);
};

export default function EventsPage() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useScrollReveal([eventsData]);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const data = await eventController.fetchAllEvents();
        setEventsData(data || []);
      } catch (err) {
        console.error('Error fetching events from DB:', err);
        setEventsData([]);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  return (
    <main className="min-vh-100 d-flex flex-column bg-light overflow-x-hidden">
      <Navbar />

      {/* Clean Smooth Bounce CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .reveal { 
          opacity: 0; 
          will-change: transform, opacity;
          transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        .reveal-left {
          transform: translateX(-80px);
        }
        .reveal-left.active {
          opacity: 1;
          transform: translateX(0);
        }

        .reveal-right {
          transform: translateX(80px);
        }
        .reveal-right.active {
          opacity: 1;
          transform: translateX(0);
        }

        .reveal-up {
          transform: translateY(50px);
        }
        .reveal-up.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}} />

      {/* Hero Header */}
      <section className="py-5 text-white position-relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(135deg, rgba(2, 40, 89, 0.92) 0%, rgba(0, 150, 214, 0.88) 100%), url(https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container py-5 text-center position-relative">
          <span className="badge bg-white text-dark bg-opacity-25 px-4 py-2 rounded-pill mb-3 d-inline-flex align-items-center gap-2 border border-white border-opacity-25 reveal reveal-up">
            <i className="bi bi-droplet-fill text-info"></i>
            • TARANG OFFICIAL EVENTS ARCHIVE
          </span>

          <h1 className="display-3 fw-bolder mb-3 reveal reveal-left" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
            Our Journey & <span className="text-warning">Recent Events</span>
          </h1>

          <p className="lead text-white opacity-90 mx-auto fs-5 reveal reveal-right" style={{ maxWidth: '800px', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            Empowering women entrepreneurs, local artisans, and MSME units across Goa and India through exhibitions, pop-up bazaars, and state level summits.
          </p>
        </div>
      </section>

      {/* Main Events Feed (Direct Database Fetch) */}
      <section className="py-5 bg-white">
        <div className="container py-3">

          {loading ? (
            <div className="text-center py-5">
              <Loader2 className="spinner-border text-logo-orange" style={{ width: '3rem', height: '3rem' }} />
              <p className="text-muted fw-bold mt-3 fs-7">Loading events from database...</p>
            </div>
          ) : eventsData.length === 0 ? (
            <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-light my-4">
              <div className="d-flex justify-content-center mb-3">
                <div className="p-3 bg-white rounded-circle text-muted shadow-sm">
                  <CalendarX size={36} />
                </div>
              </div>
              <h5 className="fw-bold text-dark mb-1">No Events Found in Database</h5>
              <p className="text-secondary fs-7 m-0">No published events found in Firestore database.</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-5">
              {eventsData.map((ev) => {
                const galleryList = ev.gallery || ev.gallery6 || ev.kalaImages || ev.grid4Images || ev.collageImages || ev.leftImages || [];
                const topImg = ev.image || ev.topImage || (galleryList.length > 0 ? galleryList[0] : null);

                return (
                  <div key={ev.id || ev.slugId} className="card border-0 rounded-4 shadow-lg overflow-hidden p-4 p-md-5 reveal reveal-up position-relative" style={{ backgroundColor: '#fff' }}>

                    {/* Corner Accent */}
                    <div className="position-absolute top-0 end-0" style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 70px 70px 0', borderColor: 'transparent #f5b000 transparent transparent' }}></div>

                    {/* Category & Date */}
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                      <span className="fw-extrabold fs-4 text-uppercase reveal reveal-left" style={{ color: '#d94e34' }}>
                        {ev.category || 'Recent Event'}
                      </span>
                      {ev.date && (
                        <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-semibold reveal reveal-right">
                          {ev.date}
                        </span>
                      )}
                    </div>

                    <h2 className="display-6 fw-extrabold text-dark mb-1 reveal reveal-left">{ev.title}</h2>
                    {ev.subtitle && <h6 className="fw-bold mb-3 reveal reveal-left" style={{ color: '#6b21a8' }}>{ev.subtitle}</h6>}

                    <div className="d-flex flex-wrap gap-4 text-secondary mb-4 pb-3 border-bottom border-light reveal reveal-right">
                      {ev.location && <span><i className="bi bi-geo-alt-fill text-danger me-1"></i><strong>Location:</strong> {ev.location}</span>}
                      {ev.date && <span><i className="bi bi-calendar-check-fill text-primary me-1"></i><strong>Date:</strong> {ev.date}</span>}
                    </div>

                    {/* 1. Layout: Editorial Top Image */}
                    {ev.layoutType === 'editorial-top-image' && (
                      <div className="d-flex flex-column gap-4">
                        {topImg && (
                          <div className="rounded-4 overflow-hidden shadow-sm reveal reveal-up">
                            <img src={topImg} alt={ev.title} className="img-fluid w-100 object-fit-cover" style={{ maxHeight: '450px' }} />
                          </div>
                        )}
                      </div>
                    )}

                    {/* 2. Layout: Pop-Up Bazaar / Gallery Grid */}
                    {(ev.layoutType === 'pop-up-bazaar-grid' || ev.layoutType === 'grid-6-special') && galleryList.length > 0 && (
                      <div className="d-flex flex-column gap-4 mb-3">
                        <div className="row g-3">
                          {galleryList.slice(0, 2).map((img, idx) => (
                            <div key={idx} className="col-lg-6 col-md-6 reveal reveal-left">
                              <div className="rounded-3 overflow-hidden shadow-sm border">
                                <img src={img} alt="Gallery Top" className="img-fluid w-100 object-fit-cover" style={{ height: '260px' }} />
                              </div>
                            </div>
                          ))}
                        </div>
                        {galleryList.length > 2 && (
                          <div className="row g-3">
                            {galleryList.slice(2).map((img, idx) => (
                              <div key={idx} className="col-lg-3 col-6 reveal reveal-up">
                                <div className="rounded-3 overflow-hidden shadow-sm border">
                                  <img src={img} alt="Gallery Bottom" className="img-fluid w-100 object-fit-cover" style={{ height: '220px' }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 3. Layout: Split 2x2 / Grid Mix / Custom Grid */}
                    {(ev.layoutType === 'split-2x2' || ev.layoutType === 'grid-mix' || ev.layoutType === 'grid-2x2-left' || ev.layoutType === 'single-grid-frame' || ev.layoutType === 'editorial-left-stack') && galleryList.length > 0 && (
                      <div className="row g-4 align-items-center mb-3">
                        <div className="col-lg-6">
                          <div className="row g-2">
                            {galleryList.map((img, idx) => (
                              <div key={idx} className={`${idx === 0 && ev.layoutType === 'grid-mix' ? 'col-12' : 'col-6'} reveal reveal-left`}>
                                <div className="rounded-3 overflow-hidden shadow-sm border">
                                  <img src={img} alt="Grid Item" className="img-fluid w-100 object-fit-cover" style={{ height: idx === 0 && ev.layoutType === 'grid-mix' ? '220px' : '150px' }} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="col-lg-6">
                          {ev.bulletPoints && ev.bulletPoints.length > 0 ? (
                            <div className="d-flex flex-column gap-3">
                              {ev.bulletPoints.map((pt, idx) => (
                                <div key={idx} className="d-flex align-items-start gap-2 reveal reveal-right">
                                  <i className="bi bi-caret-right-fill flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                                  <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>{pt}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-secondary" style={{ lineHeight: '1.7' }}>{ev.description}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* 4. Standard Fallback Banner Layout */}
                    {(!ev.layoutType || ev.layoutType === 'standard') && topImg && (
                      <div className="rounded-4 overflow-hidden shadow-sm mb-4 reveal reveal-up">
                        <img src={topImg} alt={ev.title} className="img-fluid w-100 object-fit-cover" style={{ maxHeight: '420px' }} />
                      </div>
                    )}

                    {/* Bullet Points / Text Description */}
                    {ev.layoutType !== 'split-2x2' && ev.layoutType !== 'grid-mix' && ev.layoutType !== 'grid-2x2-left' && ev.layoutType !== 'single-grid-frame' && ev.layoutType !== 'editorial-left-stack' && (
                      <div>
                        {ev.bulletPoints && ev.bulletPoints.length > 0 ? (
                          <div className="p-4 bg-light rounded-4 border mt-2">
                            {ev.bulletPoints.map((pt, idx) => (
                              <p key={idx} className="text-secondary mb-2 reveal reveal-right" style={{ lineHeight: '1.7' }}>{pt}</p>
                            ))}
                          </div>
                        ) : ev.description ? (
                          <p className="text-secondary mt-2" style={{ lineHeight: '1.7' }}>{ev.description}</p>
                        ) : null}
                      </div>
                    )}

                    {/* Footer Gradient Strip */}
                    <div className="position-absolute bottom-0 start-0 end-0" style={{ height: '6px', background: 'linear-gradient(90deg, #f5b000 0%, #d94e34 100%)' }}></div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}