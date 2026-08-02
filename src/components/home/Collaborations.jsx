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
    { src: 'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600', title: 'Ganesh Chaturthi Utsav' },
    { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600', title: 'EmpowerHer Expo' },
    { src: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600', title: 'Christmas Trade Fair' }
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
      <div className="container-fluid px-3 px-md-5 mb-4">
        <div className="ticker-bar d-flex align-items-center gap-3 p-2 px-3 shadow-sm rounded-3">
          <div className="ticker-badge d-flex align-items-center gap-2 px-3 py-1 rounded-2 fw-bold text-uppercase">
            <Megaphone size={18} className="ticker-icon" />
            <span>Announcement</span>
          </div>
          <marquee behavior="scroll" direction="left" className="m-0 fw-semibold fs-6">
            📢 विज्ञप्ति: Tarang Goa organizes mega trade fairs, exhibitions & skill development workshops across Goa and India. Register now for upcoming expos!
          </marquee>
        </div>
      </div>

      <div className="container-fluid px-3 px-md-5 position-relative z-2">

        {/* 3-Column Institutional Grid */}
        <div className="row g-4 align-items-stretch mb-4">

          {/* Card 1: Key Collaborations (Marquee Loop) */}
          <div className="col-lg-4 col-md-6">
            <div className="uni-card h-100 d-flex flex-column anim-fade-up">
              <div className="uni-card-header d-flex align-items-center gap-2 px-3 py-3 text-white">
                <ListChecks size={20} />
                <span className="fw-bold">Key Collaborations</span>
              </div>
              <div className="uni-card-body flex-grow-1 p-3">
                <div className="marquee-wrapper overflow-hidden position-relative">
                  <div className="marquee-content d-flex flex-column gap-2">
                    {[...partners, ...partners].map((partner, idx) => (
                      <div key={idx} className="partner-item p-2 border-bottom d-flex align-items-center gap-2">
                        <ChevronRight size={16} className="text-purple-main flex-shrink-0" />
                        <span className="fw-semibold text-dark fs-7">{partner}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Events in Focus (Image Slider) */}
          <div className="col-lg-4 col-md-6">
            <div className="uni-card h-100 d-flex flex-column anim-fade-up">
              <div className="uni-card-header d-flex align-items-center gap-2 px-3 py-3 text-white">
                <Newspaper size={20} />
                <span className="fw-bold">Events in Focus</span>
              </div>
              <div className="uni-card-body flex-grow-1 p-3 d-flex flex-column justify-content-center">
                <div className="position-relative w-100 rounded-3 overflow-hidden border event-slider-container">
                  {posterImages.map((img, idx) => (
                    <div
                      key={idx}
                      className={`position-absolute top-0 start-0 w-100 h-100 transition-fade ${
                        idx === currentImgIndex ? 'opacity-100 z-2' : 'opacity-0 z-1'
                      }`}
                    >
                      <img src={img.src} alt={img.title} className="img-fluid w-100 h-100 object-fit-cover" />
                      <div className="position-absolute bottom-0 start-0 end-0 p-2 px-3 bg-dark bg-opacity-75 text-white">
                        <small className="fw-bold text-warning d-block">{img.title}</small>
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
                <Sparkles size={20} />
                <span className="fw-bold">Tarang Utsav Highlights</span>
              </div>
              <div className="uni-card-body flex-grow-1 p-3 text-center d-flex flex-column justify-content-between">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"
                  alt="Utsav Meet"
                  className="img-fluid rounded-3 border mb-3 object-fit-cover highlights-img"
                />
                <p className="text-secondary fs-7 mb-3 lh-base">
                  "Connecting over 5000+ women entrepreneurs and artisans directly with consumers across India."
                </p>
                <Link href="/gallery" className="btn btn-warning fw-bold text-dark w-100 rounded-pill py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm">
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
            <Award size={20} />
            <span className="fw-bold">Annual Flagship Showcase - Tarang Utsav</span>
          </div>
          <div className="uni-card-body p-0">
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