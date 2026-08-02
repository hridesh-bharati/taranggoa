'use client';

import { useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// --- Multi-Trigger Scroll Observer ---
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            // Viewport se bahar jaane par active hata do taaki repeat ho
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
  }, []);
};

export default function EventsPage() {
  useScrollReveal();

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
      id: 'tarang-utsav-south-goa-2024',
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
      id: 'tarang-at-gox-goxfest-2024',
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
      id: 'empowerher-2025-womens-day',
      category: 'Recent Events',
      title: 'EmpowerHer 2025: Women Entrepreneurs & Economic Empowerment',
      subtitle: 'Supported by Ministry of MSME, Govt of India & JCI Bardez',
      date: '7th, 8th, and 9th March 2025',
      location: 'Panaji Convention Centre, Mala',
      layoutType: 'grid-mix',
      bulletPoints: [
        "EmpowerHer 2025, a landmark initiative by Tarang in collaboration with JCI Bardez Bandh-Man and supported by the Ministry of MSME, Government of India, was inaugurated by Hon'ble Minister Shri Mauvin Godinho.",
        "A key highlight of the event was the felicitation of two distinguished individuals: senior journalist Shri Prakash Kamat and community leader Smt. Mahy Mahesh Simepurushkar.",
        "Minister Godinho announced that the Industries Ministry will reserve industrial plots for women entrepreneurs."
      ],
      collageImages: [
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'
      ]
    }
  ];

  return (
    <main className="min-vh-100 d-flex flex-column bg-light overflow-x-hidden">
      <Navbar />

      {/* Clean Smooth Bounce CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .reveal { 
          opacity: 0; 
          will-change: transform, opacity;
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        .reveal-left {
          transform: translateX(-50px);
        }
        .reveal-left.active {
          opacity: 1;
          transform: translateX(0);
        }

        .reveal-right {
          transform: translateX(50px);
        }
        .reveal-right.active {
          opacity: 1;
          transform: translateX(0);
        }

        .reveal-up {
          transform: translateY(40px);
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

          <h1 className="display-3 fw-extrabold mb-3 reveal reveal-left" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
            Our Journey & <span className="text-warning">Recent Events</span>
          </h1>

          <p className="lead text-white opacity-90 mx-auto fs-5 reveal reveal-right" style={{ maxWidth: '800px', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            Empowering women entrepreneurs, local artisans, and MSME units across Goa and India through exhibitions, pop-up bazaars, and state level summits.
          </p>
        </div>
      </section>

      {/* Main Events Feed */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          <div className="d-flex flex-column gap-5">
            {eventsData.map((ev) => (
              <div key={ev.id} className="card border-0 rounded-4 shadow-lg overflow-hidden p-4 p-md-5 reveal reveal-up" style={{ backgroundColor: '#fff' }}>
                
                {/* Decoration */}
                <div className="position-absolute top-0 end-0" style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 70px 70px 0', borderColor: 'transparent #f5b000 transparent transparent' }}></div>

                {/* Category & Date */}
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                  <span className="fw-extrabold fs-4 text-uppercase reveal reveal-left" style={{ color: '#d94e34' }}>{ev.category}</span>
                  <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-semibold reveal reveal-right">{ev.date}</span>
                </div>

                <h2 className="display-6 fw-extrabold text-dark mb-1 reveal reveal-left">{ev.title}</h2>
                {ev.subtitle && <h6 className="fw-bold mb-3 reveal reveal-left" style={{ color: '#6b21a8' }}>{ev.subtitle}</h6>}

                <div className="d-flex flex-wrap gap-4 text-secondary mb-4 pb-3 border-bottom border-light reveal reveal-right">
                  <span><i className="bi bi-geo-alt-fill text-danger me-1"></i><strong>Location:</strong> {ev.location}</span>
                  <span><i className="bi bi-calendar-check-fill text-primary me-1"></i><strong>Date:</strong> {ev.date}</span>
                </div>

                {/* Layout: Editorial Left Stack */}
                {ev.layoutType === 'editorial-left-stack' && (
                  <div className="row g-4 align-items-start">
                    <div className="col-lg-5">
                      <div className="d-flex flex-column gap-3">
                        {ev.leftImages?.map((img, i) => (
                          <div key={i} className="rounded-3 overflow-hidden shadow-sm reveal reveal-left">
                            <img src={img} alt="Event" className="img-fluid w-100 object-fit-cover" style={{ height: '170px' }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="d-flex flex-column gap-3">
                        {ev.bulletPoints.map((pt, idx) => (
                          <div key={idx} className="d-flex align-items-start gap-2 reveal reveal-right">
                            <i className="bi bi-caret-right-fill flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                            <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>{pt}</p>
                          </div>
                        ))}
                      </div>
                      {ev.bottomImages && (
                        <div className="row g-3 mt-3">
                          {ev.bottomImages.map((img, idx) => (
                            <div key={idx} className="col-6 reveal reveal-up">
                              <div className="rounded-3 overflow-hidden border shadow-sm">
                                <img src={img} alt="Gallery" className="img-fluid w-100 object-fit-cover" style={{ height: '120px' }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Layout: Grid Mix */}
                {ev.layoutType === 'grid-mix' && (
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-6">
                      <div className="row g-2">
                        {ev.collageImages?.map((img, idx) => (
                          <div key={idx} className={`${idx === 0 ? 'col-12' : 'col-6'} reveal reveal-left`}>
                            <div className="rounded-3 overflow-hidden shadow-sm border">
                              <img src={img} alt="Collage" className="img-fluid w-100 object-fit-cover" style={{ height: idx === 0 ? '220px' : '130px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="d-flex flex-column gap-3">
                        {ev.bulletPoints.map((pt, idx) => (
                          <div key={idx} className="d-flex align-items-start gap-2 reveal reveal-right">
                            <i className="bi bi-caret-right-fill flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                            <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>{pt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Strip */}
                <div className="position-absolute bottom-0 start-0 end-0" style={{ height: '6px', background: 'linear-gradient(90deg, #f5b000 0%, #d94e34 100%)' }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}