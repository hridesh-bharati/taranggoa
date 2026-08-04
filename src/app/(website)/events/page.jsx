'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { eventController } from '@/controllers/event.controller';
import useScrollReveal from '@/hooks/useScrollReveal';
import { CalendarX, Loader2, Search, MapPin, Tag, RotateCcw, ChevronDown, ChevronUp, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 3; // Har page par exact 3 events load honge

export default function EventsPage() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Filter States
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Pagination & Card Read More State
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCards, setExpandedCards] = useState({});

  const containerRef = useRef(null);
  useScrollReveal(containerRef);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const response = await eventController.fetchAllEvents();
        const data = Array.isArray(response) 
          ? response 
          : (response?.data || response?.events || []);
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

  const toggleReadMore = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetFilters = () => {
    setSearchTitle('');
    setSearchLocation('');
    setSelectedCategory('');
    setCurrentPage(1);
  };

  const categoriesList = Array.from(
    new Set(eventsData.map((ev) => ev.category || 'Recent Event'))
  );

  // Filter Logic
  const filteredEvents = eventsData.filter((ev) => {
    const titleMatch = (ev.title || '').toLowerCase().includes(searchTitle.toLowerCase()) ||
                       (ev.subtitle || '').toLowerCase().includes(searchTitle.toLowerCase());
    const locationMatch = (ev.location || '').toLowerCase().includes(searchLocation.toLowerCase());
    const categoryMatch = selectedCategory === '' || 
                          (ev.category || 'Recent Event').toLowerCase() === selectedCategory.toLowerCase();

    return titleMatch && locationMatch && categoryMatch;
  });

  // Simple Pagination Calculation
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const currentEvents = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const FilterContent = () => (
    <div className="row g-3">
      <div className="col-12 col-md-4">
        <label className="form-label fs-7 fw-bold text-secondary mb-1">Search Keyword</label>
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0"><Search size={16} className="text-muted" /></span>
          <input
            type="text"
            className="form-control bg-white border-start-0 shadow-none fs-7"
            placeholder="Search by Title..."
            value={searchTitle}
            onChange={(e) => { setSearchTitle(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <div className="col-12 col-md-4">
        <label className="form-label fs-7 fw-bold text-secondary mb-1">Location / Venue</label>
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0"><MapPin size={16} className="text-muted" /></span>
          <input
            type="text"
            className="form-control bg-white border-start-0 shadow-none fs-7"
            placeholder="Location / Address..."
            value={searchLocation}
            onChange={(e) => { setSearchLocation(e.target.value); setCurrentPage(1); }}
          />
        </div>
      </div>

      <div className="col-12 col-md-3">
        <label className="form-label fs-7 fw-bold text-secondary mb-1">Category</label>
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0"><Tag size={16} className="text-muted" /></span>
          <select
            className="form-select bg-white border-start-0 shadow-none fs-7"
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
          >
            <option value="">All Categories</option>
            {categoriesList.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="col-12 col-md-1 d-flex align-items-end">
        <button
          type="button"
          className="btn btn-outline-secondary w-100 fs-7 py-2 rounded-3 d-flex align-items-center justify-content-center gap-1"
          onClick={resetFilters}
          title="Reset Filters"
        >
          <RotateCcw size={16} />
          <span className="d-md-none">Reset</span>
        </button>
      </div>
    </div>
  );

  return (
    <main ref={containerRef} className="min-vh-100 d-flex flex-column bg-light overflow-x-hidden">
      <Navbar />

      {/* Hero Header */}
      <section className="py-5 text-white position-relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(135deg, rgba(2, 40, 89, 0.92) 0%, rgba(0, 150, 214, 0.88) 100%), url(https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container py-5 text-center position-relative">
          <span className="badge bg-white text-dark bg-opacity-25 px-4 py-2 rounded-pill mb-3 d-inline-flex align-items-center gap-2 border border-white border-opacity-25 anim-title active">
            <i className="bi bi-droplet-fill text-info"></i>
            • TARANG OFFICIAL EVENTS ARCHIVE
          </span>

          <h1 className="display-3 fw-bolder mb-3 anim-desc active" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
            Our Journey & <span className="text-warning">Recent Events</span>
          </h1>

          <p className="lead text-white opacity-90 mx-auto fs-5 anim-desc active" style={{ maxWidth: '800px', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            Empowering women entrepreneurs, local artisans, and MSME units across Goa and India through exhibitions, pop-up bazaars, and state level summits.
          </p>
        </div>
      </section>

      {/* Mobile Filter Button */}
      <div className="container mt-3 d-block d-md-none">
        <button 
          onClick={() => setShowMobileFilter(true)}
          className="btn btn-dark w-100 py-2.5 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
        >
          <SlidersHorizontal size={18} className="text-warning" />
          <span>Filter Events</span>
          {(searchTitle || searchLocation || selectedCategory) && (
            <span className="badge bg-warning text-dark rounded-circle ms-1">•</span>
          )}
        </button>
      </div>

      {/* Main Events Feed */}
      <section className="py-5 bg-white">
        <div className="container py-3">

          <div className="d-none d-md-block card border-0 shadow-sm rounded-4 p-4 mb-5 bg-light">
            <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <SlidersHorizontal size={20} className="text-warning" />
              <span>Filter & Search Events</span>
            </h5>
            <FilterContent />
          </div>

          {showMobileFilter && (
            <div className="position-fixed top-0 start-0 w-100 h-100 z-3 bg-dark bg-opacity-50 d-flex align-items-end d-md-none">
              <div className="bg-white w-100 rounded-top-4 p-4 shadow-lg" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                  <h5 className="fw-bold m-0 d-flex align-items-center gap-2">
                    <SlidersHorizontal size={20} className="text-warning" />
                    <span>Filter Events</span>
                  </h5>
                  <button onClick={() => setShowMobileFilter(false)} className="btn btn-light rounded-circle p-1">
                    <X size={20} />
                  </button>
                </div>
                <FilterContent />
                <button onClick={() => setShowMobileFilter(false)} className="btn btn-warning w-100 mt-4 py-2.5 fw-bold rounded-3">
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-5">
              <Loader2 className="spinner-border text-logo-orange" style={{ width: '3rem', height: '3rem' }} />
              <p className="text-muted fw-bold mt-3 fs-7">Loading events from database...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-light my-4">
              <div className="d-flex justify-content-center mb-3">
                <div className="p-3 bg-white rounded-circle text-muted shadow-sm">
                  <CalendarX size={36} />
                </div>
              </div>
              <h5 className="fw-bold text-dark mb-1">No Events Found</h5>
              <p className="text-secondary fs-7 m-0">No matching events match your search criteria.</p>
              {(searchTitle || searchLocation || selectedCategory) && (
                <div className="mt-3">
                  <button onClick={resetFilters} className="btn btn-warning btn-sm fw-bold rounded-pill px-4">Clear All Filters</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="d-flex flex-column gap-5">
                {currentEvents.map((ev, index) => {
                  const galleryList = ev.gallery || ev.gallery6 || ev.kalaImages || ev.grid4Images || ev.collageImages || ev.leftImages || [];
                  const topImg = ev.image || ev.topImage || (galleryList.length > 0 ? galleryList[0] : null);
                  
                  const cardId = ev.id || ev.slugId || index;
                  const isExpanded = !!expandedCards[cardId];
                  
                  const descText = ev.description || '';
                  const hasLongDesc = descText.length > 220;
                  const bulletList = ev.bulletPoints || [];
                  const hasLongBullets = bulletList.length > 3;

                  return (
                    <div key={cardId} className="card border-0 rounded-4 shadow-lg overflow-hidden p-4 p-md-5 anim-fade-up active position-relative" style={{ backgroundColor: '#fff' }}>

                      <div className="position-absolute top-0 end-0" style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 70px 70px 0', borderColor: 'transparent #f5b000 transparent transparent' }}></div>

                      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                        <span className="fw-bold fs-4 text-uppercase" style={{ color: '#d94e34' }}>
                          {ev.category || 'Recent Event'}
                        </span>
                        {ev.date && (
                          <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-semibold">
                            {ev.date}
                          </span>
                        )}
                      </div>

                      <h2 className="display-6 fw-bolder text-dark mb-1">{ev.title}</h2>
                      {ev.subtitle && <h6 className="fw-bold mb-3" style={{ color: '#6b21a8' }}>{ev.subtitle}</h6>}

                      <div className="d-flex flex-wrap gap-4 text-secondary mb-4 pb-3 border-bottom border-light">
                        {ev.location && <span><i className="bi bi-geo-alt-fill text-danger me-1"></i><strong>Location / Address:</strong> {ev.location}</span>}
                        {ev.date && <span><i className="bi bi-calendar-check-fill text-primary me-1"></i><strong>Date:</strong> {ev.date}</span>}
                      </div>

                      {ev.layoutType === 'editorial-top-image' && topImg && (
                        <div className="rounded-4 overflow-hidden shadow-sm mb-4">
                          <img src={topImg} alt={ev.title} className="img-fluid w-100 object-fit-cover" style={{ maxHeight: '450px' }} />
                        </div>
                      )}

                      {(ev.layoutType === 'pop-up-bazaar-grid' || ev.layoutType === 'grid-6-special') && galleryList.length > 0 && (
                        <div className="d-flex flex-column gap-4 mb-3">
                          <div className="row g-3">
                            {galleryList.slice(0, 2).map((img, idx) => (
                              <div key={idx} className="col-lg-6 col-md-6">
                                <div className="rounded-3 overflow-hidden shadow-sm border">
                                  <img src={img} alt="Gallery Top" className="img-fluid w-100 object-fit-cover" style={{ height: '260px' }} />
                                </div>
                              </div>
                            ))}
                          </div>
                          {galleryList.length > 2 && (
                            <div className="row g-3">
                              {galleryList.slice(2).map((img, idx) => (
                                <div key={idx} className="col-lg-3 col-6">
                                  <div className="rounded-3 overflow-hidden shadow-sm border">
                                    <img src={img} alt="Gallery Bottom" className="img-fluid w-100 object-fit-cover" style={{ height: '220px' }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {(ev.layoutType === 'split-2x2' || ev.layoutType === 'grid-mix' || ev.layoutType === 'grid-2x2-left' || ev.layoutType === 'single-grid-frame' || ev.layoutType === 'editorial-left-stack') && galleryList.length > 0 && (
                        <div className="row g-4 align-items-center mb-3">
                          <div className="col-lg-6">
                            <div className="row g-2">
                              {galleryList.map((img, idx) => (
                                <div key={idx} className={`${idx === 0 && ev.layoutType === 'grid-mix' ? 'col-12' : 'col-6'}`}>
                                  <div className="rounded-3 overflow-hidden shadow-sm border">
                                    <img src={img} alt="Grid Item" className="img-fluid w-100 object-fit-cover" style={{ height: idx === 0 && ev.layoutType === 'grid-mix' ? '220px' : '150px' }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            {bulletList.length > 0 ? (
                              <div className="d-flex flex-column gap-3">
                                {(isExpanded ? bulletList : bulletList.slice(0, 3)).map((pt, idx) => (
                                  <div key={idx} className="d-flex align-items-start gap-2">
                                    <i className="bi bi-caret-right-fill flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                                    <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>{pt}</p>
                                  </div>
                                ))}
                                {hasLongBullets && (
                                  <button
                                    type="button"
                                    onClick={() => toggleReadMore(cardId)}
                                    className="btn btn-link p-0 text-decoration-none fw-bold d-inline-flex align-items-center gap-1 border-0 bg-transparent text-start"
                                    style={{ color: '#6b21a8' }}
                                  >
                                    <span>{isExpanded ? 'Read Less' : 'Read More Story'}</span>
                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                  </button>
                                )}
                              </div>
                            ) : (
                              <div>
                                <p 
                                  className="text-secondary" 
                                  style={{ 
                                    lineHeight: '1.7',
                                    ...(!isExpanded && hasLongDesc ? {
                                      display: '-webkit-box',
                                      WebkitLineClamp: 4,
                                      WebkitBoxOrient: 'vertical',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis'
                                    } : {})
                                  }}
                                >
                                  {descText}
                                </p>
                                {hasLongDesc && (
                                  <button
                                    type="button"
                                    onClick={() => toggleReadMore(cardId)}
                                    className="btn btn-link p-0 text-decoration-none fw-bold d-inline-flex align-items-center gap-1 border-0 bg-transparent"
                                    style={{ color: '#6b21a8' }}
                                  >
                                    <span>{isExpanded ? 'Read Less' : 'Read More Story'}</span>
                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {(!ev.layoutType || ev.layoutType === 'standard') && topImg && (
                        <div className="rounded-4 overflow-hidden shadow-sm mb-4">
                          <img src={topImg} alt={ev.title} className="img-fluid w-100 object-fit-cover" style={{ maxHeight: '420px' }} />
                        </div>
                      )}

                      {ev.layoutType !== 'split-2x2' && ev.layoutType !== 'grid-mix' && ev.layoutType !== 'grid-2x2-left' && ev.layoutType !== 'single-grid-frame' && ev.layoutType !== 'editorial-left-stack' && (
                        <div className="mt-2">
                          {bulletList.length > 0 ? (
                            <div className="p-4 bg-light rounded-4 border">
                              {(isExpanded ? bulletList : bulletList.slice(0, 3)).map((pt, idx) => (
                                <p key={idx} className="text-secondary mb-2" style={{ lineHeight: '1.7' }}>
                                  • {pt}
                                </p>
                              ))}

                              {hasLongBullets && (
                                <button
                                  type="button"
                                  onClick={() => toggleReadMore(cardId)}
                                  className="btn btn-link p-0 mt-2 text-decoration-none fw-bold d-inline-flex align-items-center gap-1 border-0 bg-transparent"
                                  style={{ color: '#6b21a8' }}
                                >
                                  <span>{isExpanded ? 'Show Less Details' : 'Read Full Story'}</span>
                                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                              )}
                            </div>
                          ) : descText ? (
                            <div>
                              <p 
                                className="text-secondary" 
                                style={{ 
                                  lineHeight: '1.7',
                                  ...(!isExpanded && hasLongDesc ? {
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                  } : {})
                                }}
                              >
                                {descText}
                              </p>

                              {hasLongDesc && (
                                <button
                                  type="button"
                                  onClick={() => toggleReadMore(cardId)}
                                  className="btn btn-link p-0 text-decoration-none fw-bold d-inline-flex align-items-center gap-1 border-0 bg-transparent mt-1"
                                  style={{ color: '#6b21a8' }}
                                >
                                  <span>{isExpanded ? 'Read Less' : 'Read Full Story'}</span>
                                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>
                              )}
                            </div>
                          ) : null}
                        </div>
                      )}

                      <div className="position-absolute bottom-0 start-0 end-0" style={{ height: '6px', background: 'linear-gradient(90deg, #f5b000 0%, #d94e34 100%)' }}></div>
                    </div>
                  );
                })}
              </div>

              {/* Clean & Minimalist Pagination Controls */}
              {totalPages > 1 && (
                <div className="d-flex align-items-center justify-content-center gap-2 mt-5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="btn btn-outline-dark rounded-pill px-3 py-1.5 fw-semibold d-flex align-items-center gap-1"
                  >
                    <ChevronLeft size={18} /> Prev
                  </button>

                  <span className="fw-bold text-secondary px-3">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="btn btn-outline-dark rounded-pill px-3 py-1.5 fw-semibold d-flex align-items-center gap-1"
                  >
                    Next <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}