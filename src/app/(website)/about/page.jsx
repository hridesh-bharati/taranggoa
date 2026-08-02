'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import useScrollReveal from '@/hooks/useScrollReveal';
import GoalsAndObjectives from '@/components/about/GoalsAndObjectives';

export default function AboutPage() {
  const headerRef = useRef(null);
  const founderRef = useRef(null);
  const initiativesRef = useRef(null);

  useScrollReveal(headerRef);
  useScrollReveal(founderRef);
  useScrollReveal(initiativesRef);

  const coreInitiatives = [
    { title: 'Skill Development Workshops', icon: 'bi-tools', bg: 'var(--badge-blue)' },
    { title: 'Govt Scheme Guidance', icon: 'bi-bank', bg: 'var(--badge-cyan)' },
    { title: 'Exhibitions & Trade Fairs', icon: 'bi-shop', bg: 'var(--badge-yellow)' },
    { title: 'Marketing & Network Support', icon: 'bi-diagram-3-fill', bg: 'var(--badge-green)' }
  ];

  return (
    <main className="min-vh-100 d-flex flex-column bg-light">
      {/* 1. Header Navbar */}
      <Navbar />

      {/* 2. Hero Banner - Deep Rich Purple */}
      <section 
        ref={headerRef} 
        className="py-5 text-white position-relative"
        style={{ 
          backgroundColor: 'var(--primary-purple)',
          backgroundImage: 'radial-gradient(circle at top right, var(--purple-light), var(--primary-purple), var(--purple-dark))'
        }}
      >
        <div className="container-fluid  py-4 text-center position-relative z-2">
          <span 
            className="badge text-dark fw-bold px-3 py-2 rounded-pill mb-3 anim-title" 
            style={{ backgroundColor: 'var(--badge-yellow)', fontSize: '0.75rem', letterSpacing: '1px' }}
          >
            • ABOUT TARANG GOA
          </span>
          <h1 className="display-4 fw-extrabold mb-3 anim-title" style={{ fontWeight: 800 }}>
            Empowering Dreams into Successful Businesses
          </h1>
          <p className="lead text-light opacity-90 mx-auto anim-desc" style={{ maxWidth: '720px' }}>
            Uniting women entrepreneurs, local businesses, artisans, self-help groups from across Goa and MSMEs from India.
          </p>
        </div>
      </section>

      {/* 3. Founder Profile & Our Journey Section */}
      <section ref={founderRef} className="py-5 bg-white">
        <div className="container-fluid  py-3">
          <div className="row g-4 g-lg-5 align-items-center">
            
            {/* Founder Card with Yellow Border */}
            <div className="col-lg-5">
              <div className="anim-fade-up">
                <div className="founder-img-wrapper mb-3">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                    alt="Ms. Sweta Chari"
                    className="img-fluid w-100 object-fit-cover"
                    style={{ height: '360px' }}
                  />
                </div>
                <div className="text-center">
                  <h4 className="fw-bold text-dark mb-0">Ms. Sweta Chari</h4>
                  <span className="fw-bold text-purple-main d-block fs-6 mb-2">
                    President & Founder
                  </span>
                  <p className="text-secondary fs-7 mb-0 text-start" style={{ lineHeight: '1.6' }}>
                    Founder of Tarang Empowering Women, hails from St. Estev, Goa. With a background in Electronic Engineering, she has worked as an engineer, technical writer, web designer, and vocational instructor. She also owns the fashion brand Stylie.co. Inspired by her participation in various expos, Sweta established Tarang to bring Goan entrepreneurs together on a single platform for growth and empowerment.
                  </p>
                </div>
              </div>
            </div>

            {/* Journey Details */}
            <div className="col-lg-7">
              <span 
                className="badge fw-bold px-3 py-2 rounded-pill mb-3 anim-title" 
                style={{ backgroundColor: 'var(--purple-hover-bg)', color: 'var(--primary-purple)' }}
              >
                • OUR JOURNEY
              </span>
              <h2 className="display-6 fw-extrabold text-dark mb-4 anim-title" style={{ fontWeight: 800 }}>
                Empowering Dreams into Successful Businesses
              </h2>

              <p className="lead text-dark fst-italic mb-3 anim-desc" style={{ lineHeight: '1.7' }}>
                "Friendz... It is said, the future belongs to those who believe in the beauty of their dreams. So in order to enhance economic growth of our state empowering women is essential. This will help in creating a more equitable and prosperous society."
              </p>

              <p className="text-secondary mb-3 anim-desc" style={{ lineHeight: '1.7' }}>
                We the TARANG adopt unique ways to Empower Women in our state. We offer Economic opportunities to women in entrepreneurship, employment etc. Our initiatives support networks and community building.
              </p>

              <p className="text-secondary mb-0 anim-fade-up" style={{ lineHeight: '1.7' }}>
                From a small initiative aimed at supporting women entrepreneurs, Tarang has grown into a powerful platform uniting women entrepreneurs, local businesses, artisans, and self-help groups from across Goa and MSMEs from India.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Goals & Objectives Section */}
      <GoalsAndObjectives />

      {/* 5. Core Initiatives (Badge Icon Boxes) */}
      <section ref={initiativesRef} className="py-5 bg-purple-light">
        <div className="container-fluid  py-3">
          <div className="text-center mb-5">
            <h3 className="fw-extrabold text-dark anim-title" style={{ fontWeight: 800 }}>Our Core Initiatives</h3>
            <p className="text-muted anim-desc">Empowering businesses through structural support and market access</p>
          </div>

          <div className="row g-4 mb-5">
            {coreInitiatives.map((item, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className="card border-0 rounded-4 shadow-sm p-4 h-100 bg-white text-center hover-lift anim-fade-up">
                  <div 
                    className="icon-badge-box mx-auto mb-3"
                    style={{ backgroundColor: item.bg }}
                  >
                    <i className={`bi ${item.icon}`}></i>
                  </div>
                  <h6 className="fw-bold text-dark m-0">{item.title}</h6>
                </div>
              </div>
            ))}
          </div>

          {/* Mission & Vision Cards */}
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card border-0 rounded-4 shadow-sm p-4 h-100 bg-white anim-fade-up border-top border-4 border-purple-main">
                <h4 className="fw-bold text-dark mb-3"><i className="bi bi-bullseye me-2 text-purple-main"></i>Our Mission</h4>
                <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>
                  To provide a vibrant, inclusive platform for women entrepreneurs and artisans to showcase their products, develop sustainable business skills, and access vital government schemes to scale their ventures.
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card border-0 rounded-4 shadow-sm p-4 h-100 bg-white anim-fade-up border-top border-4 border-warning">
                <h4 className="fw-bold text-dark mb-3"><i className="bi bi-eye-fill me-2 text-warning"></i>Our Vision</h4>
                <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>
                  To build an equitable and prosperous society in Goa and India where every woman with a dream has the resources, network, and opportunity to turn her passion into a flourishing economic enterprise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-5 text-white text-center" style={{ backgroundColor: 'var(--primary-purple)' }}>
        <div className="container-fluid  py-3">
          <h3 className="fw-bold mb-3">Become a Part of Tarang Today</h3>
          <p className="lead opacity-90 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
            Are you a woman entrepreneur, artisan, or business owner looking to expand your reach?
          </p>
          <Link href="/membership" className="btn btn-warning rounded-pill px-5 py-3 fw-bold text-dark hover-lift">
            Register as a Member <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>
      </section>

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}