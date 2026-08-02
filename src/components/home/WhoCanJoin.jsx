'use client';

import { useRef } from 'react';
import useScrollReveal from '@/hooks/useScrollReveal';
import { 
  Store, 
  Rocket, 
  Palette, 
  Building2, 
  Briefcase, 
  Lightbulb, 
  UserCheck 
} from 'lucide-react';
import './WhoCanJoin.css';

export default function WhoCanJoin() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef);

  const categories = [
    { title: 'Entrepreneurs', icon: Store, badgeClass: 'badge-blue' },
    { title: 'Startups', icon: Rocket, badgeClass: 'badge-cyan' },
    { title: 'Artisans', icon: Palette, badgeClass: 'badge-yellow' },
    { title: 'MSMEs', icon: Building2, badgeClass: 'badge-red' },
    { title: 'Business Owners', icon: Briefcase, badgeClass: 'badge-purple' },
    { title: 'Innovators', icon: Lightbulb, badgeClass: 'badge-green' },
    { title: 'Professionals', icon: UserCheck, badgeClass: 'badge-teal' }
  ];

  return (
    <section ref={sectionRef} className="py-5 bg-white position-relative overflow-hidden">
      <div className="container-fluid px-3 px-md-5 py-3 text-center">
        
        {/* Animated Section Header */}
        <div className="mb-5">
          <span className="badge rounded-pill px-3 py-2 bg-purple-subtle text-purple-main fw-bold text-uppercase mb-2 anim-title">
            Target Community
          </span>
          <h2 className="display-6 fw-bold text-dark m-0 anim-desc">
            Who Can Join <span className="text-purple-main">Tarang Goa?</span>
          </h2>
        </div>

        {/* Animated Colorful Grid Cards */}
        <div className="row g-3 g-md-4 justify-content-center anim-fade-up">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;

            return (
              <div key={idx} className="col-6 col-sm-4 col-md-3 col-lg-auto">
                <div className={`join-card hover-lift p-3 p-md-4 rounded-4 text-center h-100 d-flex flex-column align-items-center justify-content-center ${cat.badgeClass}`}>
                  
                  {/* Icon Badge Container */}
                  <div className="icon-circle mb-3 shadow-sm d-flex align-items-center justify-content-center">
                    <Icon size={26} className="icon-svg" />
                  </div>
                  
                  {/* Category Title */}
                  <span className="fw-bold fs-6 text-dark category-title">{cat.title}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}