'use client';

import { useEffect } from 'react';

export default function useScrollReveal(containerRef) {
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Viewport me aane par animation chalao
            entry.target.classList.add('active');
          } else {
            // Viewport se bahar jaane par active class hata do (taaki wapas aane par re-trigger ho)
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.15 } 
    );

    const elements = containerRef.current.querySelectorAll(
      '.anim-title, .anim-desc, .anim-btn-outline, .anim-btn-orange, .anim-fade-up'
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef]);
}