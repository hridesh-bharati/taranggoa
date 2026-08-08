'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function StatsCounter() {
  const stats = [
    { target: 150, suffix: '+', label: 'Exhibitions Organized' },
    { target: 5000, suffix: '+', label: 'Entrepreneurs Connected' },
    { target: 2000, suffix: '+', label: 'Artisans Supported' },
    { target: 50000, suffix: '+', label: 'Visitors & Customers', format: true },
    { target: 100, suffix: '+', label: 'Industry Partners' }
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // IntersectionObserver for live trigger when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Live ultra-fast counting animation (0.1 seconds / 100ms duration)
  useEffect(() => {
    if (!isVisible) return;

    const duration = 9000;
    const fps = 60;
    const totalFrames = Math.max(1, Math.round((duration / 1000) * fps));
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      const progress = Math.min(currentFrame / totalFrames, 1);

      setCounts(
        stats.map((stat) => {
          const currentVal = Math.floor(stat.target * progress);
          return currentVal > stat.target ? stat.target : currentVal;
        })
      );

      if (currentFrame >= totalFrames) {
        clearInterval(timer);
        setCounts(stats.map((stat) => stat.target));
      }
    }, 1000 / fps);

    return () => clearInterval(timer);
  }, [isVisible]);

  const formatNumber = (num, shouldFormat) => {
    if (shouldFormat) {
      return num.toLocaleString();
    }
    return num;
  };

  return (
    <section
      ref={sectionRef}
      className="py-5 text-white position-relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.6), rgba(30, 27, 75, 0.7)), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container-fluid py-4 text-center position-relative z-1">
        <small className="text-warning fw-bold text-uppercase tracking-wider d-block mb-1">OUR IMPACT</small>
        <h2 className="fw-bold mb-5 text-light shadow-sm">Empowering Businesses. Enriching Communities.</h2>

        <div className="row g-4 justify-content-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="col-10 col-sm-6 col-md-4 col-lg-2">
              <div
                className="p-4 rounded-4 h-100 d-flex flex-column justify-content-center align-items-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }}
              >
                <h1 className="display-5 fw-black text-warning mb-1" style={{ fontWeight: '900', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                  {formatNumber(counts[idx], stat.format)}{stat.suffix}
                </h1>
                <small className="text-light opacity-90 fw-semibold d-block">
                  {stat.label}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}