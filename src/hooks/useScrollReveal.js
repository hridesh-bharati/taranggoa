'use client';

import { useEffect } from 'react';

export default function useScrollReveal(containerRef) {
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 } // 15% Viewport me aate hi trigger hoga
    );

    const elements = containerRef.current.querySelectorAll(
      '.anim-title, .anim-desc, .anim-btn-outline, .anim-btn-orange, .anim-fade-up'
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef]);
}