'use client';

import { useState, useEffect } from 'react';
import { exhibitionsController } from '@/controllers/exhibitions.controller';
import { X, Loader2 } from 'lucide-react';

export default function UpcomingExhibitions() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDynamicExhibitions() {
      try {
        const dbExhibitions = await exhibitionsController.fetchExhibitions();
        setUpcomingEvents(dbExhibitions || []);
      } catch (err) {
        console.error('Failed to load dynamic exhibitions:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDynamicExhibitions();
  }, []);

  return (
    <section className="py-4 bg-light w-100">
      <div className="container-fluid px-2 px-md-4">

        {/* Header */}
        <div className="card border-0 shadow-sm mb-4 rounded-3 overflow-hidden">
          <div className="card-header bg-primary text-white fw-bold d-flex justify-content-between align-items-center py-2 fs-7">
            <span><i className="bi bi-shop me-2"></i>Upcoming Festive Expos & Exhibitions</span>
            <span className="badge bg-warning text-dark">Session 2026</span>
          </div>
          <div className="card-body text-center py-3">
            <h4 className="fw-bold text-dark mb-1">TARANG UTSAV 2026</h4>
            <p className="small fw-semibold text-danger mb-0">
              Goa’s Biggest Exhibition cum Sale is back with GRAND FESTIVE EVENTS! 🎉
            </p>
          </div>
        </div>

        {/* Dynamic List */}
        {loading ? (
          <div className="text-center py-5 bg-white rounded-3 border">
            <Loader2 className="spinner-border text-primary spinner-border-sm me-2" />
            <span className="text-muted fw-bold small">Loading Expos...</span>
          </div>
        ) : upcomingEvents.length === 0 ? (
          <div className="card p-4 text-center text-muted fw-bold my-3">
            No active exhibitions found right now.
          </div>
        ) : (
          <div className="row g-3 mb-4">
            {upcomingEvents.map((item, idx) => {
              const daysList = Array.isArray(item.days)
                ? item.days
                : (item.daysInput ? item.daysInput.split(',').map(d => d.trim()) : []);

              return (
                <div key={item.id || idx} className="col-12 col-xl-6">
                  <div className="card border-0 shadow-sm rounded-3 overflow-hidden h-100">
                    <div className="bg-primary text-white text-center fw-bold py-1.5 fs-8 text-uppercase">
                      {item.badge}
                    </div>

                    <div className="p-3">
                      <div className="row g-3 align-items-center">
                        {/* Poster with Margin */}
                        {item.image && (
                          <div className="col-12 col-md-5 text-center my-1">
                            <div
                              className="border rounded-2 p-1 bg-white cursor-pointer"
                              onClick={() => setSelectedImage(item.image)}
                            >
                              <img
                                src={item.image}
                                alt={item.badge}
                                className="img-fluid rounded-1 object-fit-contain"
                                style={{ maxHeight: '200px' }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Details with Margins */}
                        <div className={`col-12 ${item.image ? 'col-md-7' : 'col-12'} d-flex flex-column justify-content-between h-100 my-1`}>
                          <div className="d-flex flex-column gap-2">
                            <div className="bg-light p-2 rounded-2 border fs-8">
                              <div className="fw-bold text-dark mb-1 text-truncate">
                                <i className="bi bi-geo-alt-fill text-danger me-1"></i>{item.location}
                              </div>
                              <div className="fw-semibold text-primary mb-1">
                                <i className="bi bi-calendar-check me-1"></i>{item.dates}
                              </div>
                              <div className="text-secondary small">
                                <i className="bi bi-clock me-1"></i>{item.timing}
                              </div>
                            </div>

                            {/* Chips */}
                            {daysList.length > 0 && (
                              <div className="d-flex gap-1 flex-wrap my-1">
                                {daysList.map((day, dIdx) => (
                                  <span key={dIdx} className="badge bg-primary-subtle text-primary border border-primary-subtle fs-9 flex-grow-1 py-1">
                                    {day}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Categories */}
                            {item.categories && (
                              <div className="fw-bold text-dark fs-9 bg-warning-subtle p-1.5 rounded border border-warning-subtle text-center text-truncate my-1">
                                🏷️ {item.categories}
                              </div>
                            )}
                          </div>

                          {/* Call Button */}
                          {item.contact && (
                            <div className="pt-2 border-top text-center mt-2">
                              <a href={`tel:${item.contact.split('|')[0].trim()}`} className="btn btn-sm btn-primary rounded-pill w-100 py-1.5 fs-8 text-truncate">
                                <i className="bi bi-telephone-fill me-1"></i>{item.contact}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-75" style={{ zIndex: 1050 }} onClick={() => setSelectedImage(null)}>
          <div className="position-relative p-2" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedImage(null)} className="btn btn-sm btn-dark rounded-circle position-absolute top-0 end-0 m-2">
              <X size={18} />
            </button>
            <img src={selectedImage} alt="Full View" className="img-fluid rounded-3" style={{ maxHeight: '85vh' }} />
          </div>
        </div>
      )}
    </section>
  );
}