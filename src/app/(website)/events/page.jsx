'use client';

import { useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function EventsPage() {
  const headerRef = useRef(null);
  const eventsListRef = useRef(null);

  useScrollReveal(headerRef);
  useScrollReveal(eventsListRef);

  // Complete List of All Real Events from Posters & Screenshots
  const eventsData = [
    {
      id: 'summer-bazaar-2025',
      category: 'Recent Events',
      title: 'Summer Bazaar',
      subtitle: 'In collaboration with Podar International School Goa & DRDA',
      date: '17-18 May 2025',
      location: 'Kala Academy Goa',
      layoutType: 'editorial-left-stack',
      bulletPoints: [
        "The Tarang Summer Bazaar was successfully inaugurated on 17th May at Kala Academy, Goa, marking yet another milestone in our journey to empower local entrepreneurs and create inclusive business opportunities.",
        "The event was graced by esteemed dignitaries: Chief Guest: Smt. Varsha Naik, Director, Department of Empowerment of Persons with Disabilities, Government of Goa; Guest of Honour: Smt. Arati Bandodkar, President, BJP Mahila Morcha – Goa; Special Guest: Ms. Swati Patel, Principal, Podar International School.",
        "Over the two days, the bazaar witnessed an enthusiastic response from the public with stalls showcasing: Handcrafted products, Sustainable fashion, Homemade edibles, Art & décor, Wellness items and more.",
        "With over 70 plus participating vendors and a footfall of 5000+ visitors, the event served as a vibrant marketplace and a celebration of local talent."
      ],
      leftImages: [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600'
      ],
      bottomImages: [
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400'
      ]
    },
    {
      id: 'goa-mohotsav-bangalore-2025',
      category: 'Recent Events',
      title: 'Goa Mohotsav 2025 (Bangalore)',
      subtitle: '(in collaboration Art of Living Committee Goa) Showcase of Goan brands in Bangalore',
      date: '25th May & 26th May 2025',
      location: 'Art of Living Centre, Bangalore',
      layoutType: 'grid-mix',
      bulletPoints: [
        "Tarang's first out-of-state event happened in a spiritually uplifting space at Art of Living Centre, Bangalore.",
        "Showcased Goan Brands at the Goa Mohotsav at the Art of Living Centre, Bangalore, that is visited by thousands of people across the globe.",
        "Meeting Gurudev Sri Sri Ravi Shankar was a divine blessing — his presence is truly beyond words, presented him Goan miniature Artifact Gudi and some goan products. Exhibitors gained good network, made good sale and connects for their business."
      ],
      collageImages: [
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600'
      ]
    },
    {
      id: 'utsav-south-goa-2024',
      category: 'Recent Events',
      title: 'TARANG UTSAV 2024 (South Goa)',
      subtitle: 'In collaboration with Government of Goa under Swayampoorna Initiative',
      date: '30th Aug. to 2nd Sept. 2024',
      location: 'BPS Sports Club, Margao',
      layoutType: 'editorial-left-stack',
      bulletPoints: [
        "TARANG UTSAV 2024 (South Goa) was organized in collaboration with Government of Goa under Swayampoorna Initiative; GSUDA, GSRLM - DRDA South. Total stalls: 70 (Women entrepreneurs & SHGs across Goa).",
        "The event featured an array of 70 stalls showcasing festival products ranging from handicrafts to fashion, lifestyle, and food items.",
        "A majority of the stalls were proudly run by women entrepreneurs, providing them with a platform to display their products, engage with consumers, and grow their businesses."
      ],
      leftImages: [
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600'
      ],
      bottomImages: [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400'
      ]
    },
    {
      id: 'goxfest-airport-2024',
      category: 'Recent Events',
      title: 'TARANG AT GOX – GOXFEST',
      subtitle: 'In collaboration with GMR Group',
      date: '5-6-7 Jan 2024',
      location: 'Manohar International Airport, Mopa',
      layoutType: 'split-2x2',
      bulletPoints: [
        "The event was in collaboration with GMR Group at Mopa International Airport.",
        "Total 20 Women Entrepreneurs showcased handmade creations. The event embodied the spirit of First anniversary at Gox celebration, attracting travellers, offering them unique Goan products directly from the hands of passionate local artisans and business owners."
      ],
      grid4Images: [
        'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600'
      ]
    },
    {
      id: 'womans-day-2024',
      category: 'Celebration',
      title: 'Celebrating Woman\'s Day 2024',
      subtitle: 'State level women achievers felicitation & fashion showcase',
      date: '8th March 2024',
      location: 'Panaji, Goa',
      layoutType: 'grid-6-special',
      bulletPoints: [
        "TARANG has realised that, women's empowerment is now the most effective way to achieve sustainable development of the state. Accordingly we PLAN and EXECUTE. We accept CHALLENGES in order to give OPPORTUNITIES to our Goan Entrepreneurs.",
        "Together we Rise..."
      ],
      gallery6: [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400'
      ]
    },
    {
      id: 'chaturthi-exhibition-2023',
      category: 'Past Events',
      title: 'Tarang Chaturthi Shopping Exhibition',
      subtitle: 'Supported by DRDA South Goa, Rotary Club of Margao Sunrise',
      date: 'Sept 1, 2, 3 2023',
      location: 'BPS Sports Club Margao',
      layoutType: 'single-grid-frame',
      bulletPoints: [
        "A grand festive bazaar organized ahead of Ganesh Chaturthi to provide direct market access to Goan artisans, self-help groups, and local home-preneurs."
      ],
      grid4Images: [
        'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'
      ]
    },
    {
      id: 'diwali-shopping-2023',
      category: 'Past Events',
      title: 'Diwali Shopping Festival',
      subtitle: 'Supported by GSUDA, Khadi India',
      date: '7-8-9-10 Oct 2023',
      location: 'Don Bosco Oratory, Panaji',
      layoutType: 'split-2x2',
      bulletPoints: [
        "The event embodied the spirit of celebration, attracting both local and outstation visitors, offering them unique festival products directly from the hands of passionate local artisans and business owners."
      ],
      grid4Images: [
        'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600'
      ]
    }
  ];

  return (
    <main className="min-vh-100 d-flex flex-column bg-light position-relative">
      <Navbar />

      {/* Hero Header Banner */}
      <section 
        ref={headerRef} 
        className="py-5 text-white position-relative overflow-hidden"
        style={{ 
          backgroundColor: 'var(--primary-purple, #6b21a8)',
          backgroundImage: 'radial-gradient(circle at top right, var(--purple-light, #8b5cf6), var(--primary-purple, #6b21a8), var(--purple-dark, #4c1d95))'
        }}
      >
        <div className="container py-4 text-center position-relative z-2">
          <span 
            className="badge fw-bold px-3 py-2 rounded-pill mb-3 anim-title shadow-sm" 
            style={{ backgroundColor: 'var(--badge-yellow, #f5b000)', color: '#000', fontSize: '0.75rem', letterSpacing: '1px' }}
          >
            • TARANG OFFICIAL EVENTS ARCHIVE
          </span>
          <h1 className="display-4 fw-extrabold mb-3 anim-title" style={{ fontWeight: 800 }}>
            Our Journey & Recent Events
          </h1>
          <p className="lead text-light opacity-90 mx-auto anim-desc" style={{ maxWidth: '750px' }}>
            Empowering women entrepreneurs, local artisans, and MSME units across Goa and India through exhibitions, pop-up bazaars, and state level summits.
          </p>
        </div>
      </section>

      {/* Main Events Feed Section */}
      <section ref={eventsListRef} className="py-5 bg-white">
        <div className="container py-3">
          <div className="d-flex flex-column gap-5">
            {eventsData.map((ev) => (
              <div 
                key={ev.id} 
                id={ev.id} 
                className="card border-0 rounded-4 shadow-lg overflow-hidden position-relative p-4 p-md-5 anim-fade-up hover-lift"
                style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                
                {/* Top Corner Triangle Decor (Matching Poster Style) */}
                <div 
                  className="position-absolute top-0 end-0 pointer-events-none"
                  style={{
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderWidth: '0 70px 70px 0',
                    borderColor: 'transparent var(--badge-yellow, #f5b000) transparent transparent',
                    zIndex: 1
                  }}
                ></div>

                {/* Section Tag & Category */}
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                  <span className="fw-extrabold fs-4 text-uppercase" style={{ color: 'var(--badge-red, #d94e34)', letterSpacing: '0.5px' }}>
                    {ev.category}
                  </span>
                  <span className="badge px-3 py-1.5 rounded-pill fw-semibold" style={{ backgroundColor: 'var(--purple-hover-bg, #f3e8ff)', color: 'var(--primary-purple, #6b21a8)' }}>
                    {ev.date}
                  </span>
                </div>

                {/* Main Event Title & Subtitle */}
                <h2 className="display-6 fw-extrabold text-dark mb-1" style={{ fontWeight: 800 }}>
                  {ev.title}
                </h2>
                {ev.subtitle && (
                  <h6 className="fw-bold mb-3" style={{ color: 'var(--primary-purple, #6b21a8)' }}>
                    {ev.subtitle}
                  </h6>
                )}

                {/* Meta Details Bar */}
                <div className="d-flex flex-wrap gap-4 text-secondary fs-6 mb-4 pb-3 border-bottom border-light">
                  <span><i className="bi bi-geo-alt-fill text-danger me-1"></i><strong>Location:</strong> {ev.location}</span>
                  <span><i className="bi bi-calendar-check-fill text-primary me-1"></i><strong>Date:</strong> {ev.date}</span>
                </div>

                {/* --- LAYOUT TYPE 1: Editorial Left Stack Images --- */}
                {ev.layoutType === 'editorial-left-stack' && (
                  <div className="row g-4 align-items-start">
                    {/* Left Column Stacked Images */}
                    <div className="col-lg-5">
                      <div className="d-flex flex-column gap-3">
                        {ev.leftImages?.map((img, i) => (
                          <div key={i} className="rounded-3 overflow-hidden shadow-sm border border-2 border-light">
                            <img src={img} alt="Event Photo" className="img-fluid w-100 object-fit-cover" style={{ height: '170px' }} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column Bullet Text Content */}
                    <div className="col-lg-7">
                      <div className="d-flex flex-column gap-3">
                        {ev.bulletPoints.map((pt, pIdx) => (
                          <div key={pIdx} className="d-flex align-items-start gap-2">
                            <i className="bi bi-caret-right-fill fs-5 flex-shrink-0 mt-1" style={{ color: 'var(--badge-red, #d94e34)' }}></i>
                            <p className="text-secondary fs-6 mb-0" style={{ lineHeight: '1.7' }}>
                              {pt}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Extra Gallery if available */}
                      {ev.bottomImages && (
                        <div className="row g-3 mt-3">
                          {ev.bottomImages.map((bImg, bIdx) => (
                            <div key={bIdx} className="col-6">
                              <div className="rounded-3 overflow-hidden border shadow-sm">
                                <img src={bImg} alt="Additional Highlight" className="img-fluid w-100 object-fit-cover" style={{ height: '120px' }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* --- LAYOUT TYPE 2: Grid Mix Collage --- */}
                {ev.layoutType === 'grid-mix' && (
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-6">
                      <div className="row g-2">
                        {ev.collageImages?.map((cImg, cIdx) => (
                          <div key={cIdx} className={cIdx === 0 ? 'col-12' : 'col-6'}>
                            <div className="rounded-3 overflow-hidden shadow-sm border">
                              <img src={cImg} alt="Collage Photo" className="img-fluid w-100 object-fit-cover" style={{ height: cIdx === 0 ? '220px' : '130px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="d-flex flex-column gap-3 pe-lg-2">
                        {ev.bulletPoints.map((pt, pIdx) => (
                          <div key={pIdx} className="d-flex align-items-start gap-2">
                            <i className="bi bi-caret-right-fill fs-5 flex-shrink-0 mt-1" style={{ color: 'var(--badge-red, #d94e34)' }}></i>
                            <p className="text-secondary fs-6 mb-0" style={{ lineHeight: '1.7' }}>
                              {pt}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- LAYOUT TYPE 3: Split 2x2 Grid --- */}
                {ev.layoutType === 'split-2x2' && (
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-6">
                      <div className="row g-2">
                        {ev.grid4Images?.map((gImg, gIdx) => (
                          <div key={gIdx} className="col-6">
                            <div className="rounded-3 overflow-hidden shadow-sm border">
                              <img src={gImg} alt="GoxFest Photo" className="img-fluid w-100 object-fit-cover" style={{ height: '140px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="d-flex flex-column gap-3">
                        {ev.bulletPoints.map((pt, pIdx) => (
                          <div key={pIdx} className="d-flex align-items-start gap-2">
                            <i className="bi bi-caret-right-fill fs-5 flex-shrink-0 mt-1" style={{ color: 'var(--badge-red, #d94e34)' }}></i>
                            <p className="text-secondary fs-6 mb-0" style={{ lineHeight: '1.75' }}>
                              {pt}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- LAYOUT TYPE 4: Grid 6 Special (Woman's Day) --- */}
                {ev.layoutType === 'grid-6-special' && (
                  <div>
                    <div className="row g-2 mb-4">
                      {ev.gallery6?.map((gImg, gIdx) => (
                        <div key={gIdx} className="col-md-4 col-6">
                          <div className="rounded-3 overflow-hidden shadow-sm border">
                            <img src={gImg} alt="Woman's Day Celebration" className="img-fluid w-100 object-fit-cover" style={{ height: '150px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-light rounded-3 border">
                      {ev.bulletPoints.map((pt, pIdx) => (
                        <p key={pIdx} className="text-dark fw-medium mb-1" style={{ lineHeight: '1.7' }}>
                          {pt}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- LAYOUT TYPE 5: Single Grid Frame --- */}
                {ev.layoutType === 'single-grid-frame' && (
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="row g-2">
                        {ev.grid4Images?.map((gImg, gIdx) => (
                          <div key={gIdx} className="col-6">
                            <div className="rounded-3 overflow-hidden shadow-sm border">
                              <img src={gImg} alt="Chaturthi Exhibition" className="img-fluid w-100 object-fit-cover" style={{ height: '130px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center">
                      <div className="p-4 bg-light rounded-4 border w-100">
                        {ev.bulletPoints.map((pt, pIdx) => (
                          <p key={pIdx} className="text-secondary fs-6 mb-0" style={{ lineHeight: '1.75' }}>
                            {pt}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Decorative Angle Strip (Matching Poster) */}
                <div 
                  className="position-absolute bottom-0 start-0 end-0"
                  style={{
                    height: '8px',
                    background: 'linear-gradient(90deg, var(--badge-yellow, #f5b000) 0%, var(--badge-red, #d94e34) 100%)'
                  }}
                ></div>

              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}