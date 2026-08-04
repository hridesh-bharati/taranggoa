'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import useScrollReveal from '@/hooks/useScrollReveal';
import { 
  Megaphone, 
  ListChecks, 
  Newspaper, 
  Sparkles, 
  Award, 
  ChevronRight, 
  ArrowRight 
} from 'lucide-react';
import './Collaborations.css';

export default function Collaborations() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const partners = [
    "Goa Chamber of Commerce & Industry (GCCI)",
    "JCI, Junior Chamber International",
    "Ministry of MSME, Government of India",
    "Swayampoorna Goa - Government of Goa Initiative",
    "District Rural Development Agency (DRDA)",
    "Goa State Urban Development Agency (GSUDA)",
    "Rotary Club of Riveira Panaji",
    "Rotary Club of Bardez",
    "Goa Industrial Development Corporation (GIDC)",
    "Department of Tourism",
    "Rotary Club of Miramar"
  ];

  const posterImages = [
    { src: '/images/recent-event-pop-up-bazar-pictures/recent-event-pop-bazar3.png', title: 'Ganesh Chaturthi Utsav' },
    { src: '/images/recent-event-pop-up-bazar-pictures/recent-event-pop-bazar4.png', title: 'EmpowerHer Expo' },
    { src: '/images/recent-event-pop-up-bazar-pictures/recent-event-pop-bazar5.png', title: 'Christmas Trade Fair' },
    { src: '/images/recent-event-pop-up-bazar-pictures/recent-event-pop-bazar6.png', title: 'Pop-Up bazar poster' }
  ];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % posterImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [posterImages.length]);

  return (
    <section ref={sectionRef} className="py-5 bg-light position-relative overflow-hidden">
      
      {/* Ticker Announcement Bar */}
      <div className="container-fluid px-3 px-md-5 mb-4 anim-fade-up">
        <div className="ticker-bar d-flex align-items-center gap-3 p-2 px-3 shadow-sm rounded-3">
          <div className="ticker-badge d-flex align-items-center gap-2 px-3 py-1-5 rounded-2 fw-bold text-uppercase fs-7 shadow-sm">
            <Megaphone size={16} className="text-white" />
            <span>Announcement</span>
          </div>
          <marquee behavior="scroll" direction="left" className="m-0 fw-semibold fs-6 text-dark">
            📢 विज्ञप्ति: Tarang Goa organizes mega trade fairs, exhibitions & skill development workshops across Goa and India. Register now for upcoming expos!
          </marquee>
        </div>
      </div>

      <div className="container-fluid px-3 px-md-5 position-relative z-2">

        {/* 3-Column Institutional Grid */}
        <div className="row g-4 align-items-stretch mb-4">

          {/* Card 1: Key Collaborations (Vertical Scroll Marquee) */}
          <div className="col-lg-4 col-md-6">
            <div className="uni-card h-100 d-flex flex-column anim-fade-up">
              <div className="uni-card-header d-flex align-items-center gap-2 px-3 py-3 text-white">
                <ListChecks size={20} className="text-warning" />
                <span className="fw-bold">Key Collaborations</span>
              </div>
              <div className="uni-card-body flex-grow-1 p-3">
                <div className="marquee-wrapper overflow-hidden position-relative">
                  <div className="marquee-content-animated d-flex flex-column gap-1">
                    {[...partners, ...partners].map((partner, idx) => (
                      <div key={idx} className="partner-item p-2 d-flex align-items-center gap-2">
                        <ChevronRight size={16} style={{ color: '#0056bf' }} className="flex-shrink-0" />
                        <span className="fw-semibold text-dark fs-7">{partner}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Events in Focus (Fade Image Slider) */}
          <div className="col-lg-4 col-md-6">
            <div className="uni-card h-100 d-flex flex-column anim-fade-up">
              <div className="uni-card-header d-flex align-items-center gap-2 px-3 py-3 text-white">
                <Newspaper size={20} className="text-warning" />
                <span className="fw-bold">Events in Focus</span>
              </div>
              <div className="uni-card-body flex-grow-1 p-3 d-flex flex-column justify-content-center">
                <div className="position-relative w-100 rounded-3 overflow-hidden border event-slider-container">
                  {posterImages.map((img, idx) => (
                    <div
                      key={idx}
                      className={`position-absolute top-0 start-0 w-100 h-100 transition-fade ${
                        idx === currentImgIndex ? 'image-scale-enter' : 'image-scale-exit'
                      }`}
                    >
                      <img src={img.src} alt={img.title} className="img-fluid w-100 h-100 object-fit-cover" />
                      <div className="position-absolute bottom-0 start-0 end-0 p-2 px-3 bg-dark bg-opacity-75 text-white">
                        <small className="fw-bold text-warning d-block fs-7">{img.title}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Utsav Highlights */}
          <div className="col-lg-4 col-md-12">
            <div className="uni-card h-100 d-flex flex-column anim-fade-up">
              <div className="uni-card-header d-flex align-items-center gap-2 px-3 py-3 text-white">
                <Sparkles size={20} className="text-warning" />
                <span className="fw-bold">Tarang Utsav Highlights</span>
              </div>
              <div className="uni-card-body flex-grow-1 p-3 text-center d-flex flex-column justify-content-between">
                <div className="overflow-hidden rounded-3 border mb-2">
                  <img
                    src="/images/recent-event-pop-up-bazar-pictures/recent-event-pop-bazar1.png"
                    alt="Utsav Meet"
                    className="img-fluid object-fit-cover highlights-img"
                  />
                </div>
                <p className="text-secondary fs-7 mb-3 lh-base fw-medium">
                  "Connecting over 5000+ women entrepreneurs and artisans directly with consumers across India."
                </p>
                <Link 
                  href="/gallery" 
                  className="btn fw-bold text-white w-100 rounded-pill py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm border-0"
                  style={{ backgroundColor: '#0056bf', transition: 'all 0.3s ease' }}
                >
                  <span>Explore Gallery</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Showcase Banner Card */}
        <div className="uni-card anim-fade-up overflow-hidden">
          <div className="uni-card-header d-flex align-items-center gap-2 px-3 py-3 text-white">
            <Award size={20} className="text-warning" />
            <span className="fw-bold">Annual Flagship Showcase - Tarang Utsav</span>
          </div>
          <div className="uni-card-body p-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1200"
              alt="Utsav Banner"
              className="img-fluid w-100 object-fit-cover bottom-banner-img"
            />
          </div>
        </div>

      </div>
    </section>
  );
}