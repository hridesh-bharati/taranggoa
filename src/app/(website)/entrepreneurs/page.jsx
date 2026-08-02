'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function EntrepreneursPage() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const [activeCategory, setActiveCategory] = useState('all');

  const entrepreneurs = [
    {
      id: 1,
      name: 'Sunita & Team (Self Help Group)',
      brand: 'Shree Ananth SHG',
      category: 'handicrafts',
      categoryLabel: 'Handicrafts & Decor',
      location: 'Ponda, Goa',
      experience: '5+ Years with Tarang',
      products: 'Jute Bags, Eco-friendly Torans, Clay Crafts',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      badge: 'Featured SHG',
      badgeClass: 'bg-logo-orange text-white'
    },
    {
      id: 2,
      name: 'Sweta Chari',
      brand: 'Goan Heritage Weaves',
      category: 'fashion',
      categoryLabel: 'Fashion & Handloom',
      location: 'Panaji, Goa',
      experience: '3+ Years with Tarang',
      products: 'Kunbi Sarees, Handloom Kurtis, Designer Dupattas',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
      badge: 'Star Artisan',
      badgeClass: 'bg-primary text-white'
    },
    {
      id: 3,
      name: 'Anjali Naik',
      brand: 'Goa Spice & Spreads',
      category: 'food',
      categoryLabel: 'Food & Edibles',
      location: 'Margao, Goa',
      experience: '4+ Years with Tarang',
      products: 'Hand-ground Masalas, Homemade Pickles, Sol Kadi Concentrates',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
      badge: 'Bestseller',
      badgeClass: 'bg-warning text-dark'
    },
    {
      id: 4,
      name: 'Pooja & Friends',
      brand: 'Aura Organic Wellness',
      category: 'wellness',
      categoryLabel: 'Wellness & Organic',
      location: 'Mapusa, Goa',
      experience: '2+ Years with Tarang',
      products: 'Handmade Soaps, Herbal Oils, Organic Skincare',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
      badge: 'Eco Friendly',
      badgeClass: 'bg-success text-white'
    },
    {
      id: 5,
      name: 'Reshma Fernandes',
      brand: 'Coastal Crochet & Crafts',
      category: 'handicrafts',
      categoryLabel: 'Handicrafts & Decor',
      location: 'Vasco da Gama, Goa',
      experience: '3+ Years with Tarang',
      products: 'Crochet Table Runners, Shell Jewelry, Wall Hangings',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600',
      badge: 'Homepreneur',
      badgeClass: 'bg-logo-orange text-white'
    },
    {
      id: 6,
      name: 'Meenal Shirodkar',
      brand: 'Goan Festive Hampers',
      category: 'food',
      categoryLabel: 'Food & Edibles',
      location: 'Bicholim, Goa',
      experience: '5+ Years with Tarang',
      products: 'Traditional Goan Sweets (Bebinca, Nevris), Festival Hampers',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
      badge: 'Festive Leader',
      badgeClass: 'bg-primary text-white'
    }
  ];

  const filteredEntrepreneurs = activeCategory === 'all' 
    ? entrepreneurs 
    : entrepreneurs.filter(item => item.category === activeCategory);

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
              url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1600')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="container py-5 text-center position-relative z-2">
            <div className="anim-title">
              <span className="badge bg-white text-dark fw-extrabold px-4 py-2 rounded-pill mb-3 shadow-sm d-inline-flex align-items-center gap-2">
                <i className="bi bi-people-fill text-logo-orange"></i>
                • EMPOWERING WOMEN & LOCAL ARTISANS
              </span>
            </div>

            <h1 className="display-4 fw-extrabold mb-3 anim-title text-uppercase" style={{ fontWeight: 900 }}>
              Our <span className="text-warning">Entrepreneurs</span>
            </h1>

            <div className="anim-desc mx-auto" style={{ maxWidth: '780px' }}>
              <p className="lead text-white opacity-90 fs-5" style={{ lineHeight: '1.7' }}>
                Meet the inspiring women-led businesses, self-help groups (SHGs), and local homepreneurs supported by Tarang across Goa and India.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Filter Pills & Grid Section */}
        <section className="py-5 bg-white">
          <div className="container py-2">
            
            {/* Category Filter Pills */}
            <div className="d-flex justify-content-center flex-wrap gap-2 mb-5 anim-fade-up">
              <button 
                onClick={() => setActiveCategory('all')}
                className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${
                  activeCategory === 'all' 
                    ? 'bg-logo-orange text-white shadow-sm' 
                    : 'btn-outline-secondary'
                }`}
              >
                All Entrepreneurs
              </button>
              <button 
                onClick={() => setActiveCategory('handicrafts')}
                className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${
                  activeCategory === 'handicrafts' 
                    ? 'bg-logo-orange text-white shadow-sm' 
                    : 'btn-outline-secondary'
                }`}
              >
                Handicrafts & Decor
              </button>
              <button 
                onClick={() => setActiveCategory('fashion')}
                className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${
                  activeCategory === 'fashion' 
                    ? 'bg-logo-orange text-white shadow-sm' 
                    : 'btn-outline-secondary'
                }`}
              >
                Fashion & Handloom
              </button>
              <button 
                onClick={() => setActiveCategory('food')}
                className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${
                  activeCategory === 'food' 
                    ? 'bg-logo-orange text-white shadow-sm' 
                    : 'btn-outline-secondary'
                }`}
              >
                Food & Edibles
              </button>
              <button 
                onClick={() => setActiveCategory('wellness')}
                className={`btn rounded-pill px-4 py-2 fw-bold transition-all ${
                  activeCategory === 'wellness' 
                    ? 'bg-logo-orange text-white shadow-sm' 
                    : 'btn-outline-secondary'
                }`}
              >
                Organic & Wellness
              </button>
            </div>

            {/* Entrepreneurs Grid */}
            <div className="row g-4">
              {filteredEntrepreneurs.map((item) => (
                <div key={item.id} className="col-lg-4 col-md-6 anim-fade-up">
                  <div className="card h-100 border-0 rounded-4 shadow-sm overflow-hidden bg-white hover-lift border-top border-4 border-warning">
                    
                    {/* Image & Category Tag */}
                    <div className="position-relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="card-img-top" 
                        style={{ height: '220px', objectFit: 'cover' }} 
                      />
                      <span className={`position-absolute top-0 end-0 m-3 badge fw-bold px-3 py-2 rounded-pill shadow ${item.badgeClass}`}>
                        {item.badge}
                      </span>
                    </div>

                    {/* Profile Details */}
                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                      <div>
                        <span className="badge bg-light text-dark border mb-2 fw-bold">
                          {item.categoryLabel}
                        </span>

                        <h5 className="fw-extrabold text-dark mb-1" style={{ fontWeight: 800 }}>
                          {item.brand}
                        </h5>
                        <p className="fw-bold text-logo-orange fs-7 mb-3">
                          By {item.name}
                        </p>

                        <div className="d-flex align-items-center gap-2 text-muted fs-7 mb-2">
                          <i className="bi bi-geo-alt-fill text-danger"></i>
                          <span className="fw-semibold text-dark">{item.location}</span>
                          <span>•</span>
                          <span className="text-secondary">{item.experience}</span>
                        </div>

                        <div className="p-2.5 bg-light rounded-3 border mb-4">
                          <small className="fw-bold text-dark d-block mb-1">Featured Products:</small>
                          <small className="text-secondary">{item.products}</small>
                        </div>
                      </div>

                      {/* Connect Action */}
                      <Link 
                        href="/contact" 
                        className="btn bg-logo-orange text-white rounded-3 w-100 py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                      >
                        <span>Connect / Book Stall</span>
                        <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* 3. Call to Action Box for New Registrations */}
            <div className="mt-5 p-4 p-md-5 rounded-4 bg-light border text-center anim-fade-up">
              <h3 className="fw-extrabold text-dark mb-2" style={{ fontWeight: 800 }}>
                Are You a Local Entrepreneur or SHG?
              </h3>
              <p className="text-secondary fs-6 mx-auto mb-4" style={{ maxWidth: '650px' }}>
                Join the Tarang network to showcase your products across state and national level exhibitions, PMS schemes, and pop-up bazaars.
              </p>
              <Link 
                href="/contact" 
                className="btn bg-logo-orange text-white rounded-pill px-5 py-3 fw-bold shadow-sm hover-lift"
              >
                Register As An Entrepreneur <i className="bi bi-person-plus-fill ms-2"></i>
              </Link>
            </div>

          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}