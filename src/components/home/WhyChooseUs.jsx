import React from 'react';

const WhyChooseUs = () => {
  return (
    <div >
      {/* SVG Brush Mask Filters & Styles */}
      <style>{`
        .wcu-banner {
          display: flex;
          width: 100%;
          margin: 0 auto;
          height: 140px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .wcu-card {
          flex: 1;
          display: flex;
          align-items: center;
          padding: 0 30px;
          position: relative;
          color: #ffffff;
        }

        /* 1. Blue Section */
        .wcu-blue {
          background-color: #0052cc;
          z-index: 1;
        }

        /* 2. Yellow Section with Brush Border on Left */
        .wcu-yellow {
          background-color: #ffcc00;
          color: #111111;
          z-index: 2;
        }

        /* 3. Orange Gradient Section with Brush Border on Left */
        .wcu-orange {
          background: linear-gradient(90deg, #ff4e00 0%, #e63900 100%);
          color: #ffffff;
          z-index: 3;
        }

        /* Realistic Rough Paint Brush Edge Cut */
        .brush-edge-left::before {
          content: "";
          position: absolute;
          top: 0;
          left: -35px;
          width: 40px;
          height: 100%;
          background: inherit;
          /* Detailed grunge brush stroke polygon */
          clip-path: polygon(
            100% 0%, 25% 2%, 60% 5%, 15% 9%, 75% 12%, 10% 16%, 85% 20%, 
            20% 24%, 90% 28%, 15% 32%, 70% 36%, 5% 40%, 80% 44%, 
            25% 48%, 95% 52%, 10% 56%, 85% 60%, 30% 64%, 75% 68%, 
            15% 72%, 90% 76%, 20% 80%, 80% 84%, 10% 88%, 85% 92%, 
            30% 96%, 70% 98%, 100% 100%
          );
        }

        /* Responsive view for mobile */
        @media (max-width: 900px) {
          .wcu-banner {
            flex-direction: column;
            height: auto;
          }
          .wcu-card {
            padding: 25px 20px;
          }
          .brush-edge-left::before {
            display: none;
          }
        }
      `}</style>

      {/* Main Banner Container */}
      <div className="wcu-banner">
        
        {/* Section 1: Our Mission (Blue) */}
        <div className="wcu-card wcu-blue">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Target SVG Icon */}
            <svg style={{ width: '45px', height: '45px', flexShrink: 0, stroke: '#ffffff' }} viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="6"></circle>
              <circle cx="12" cy="12" r="2"></circle>
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4"></path>
            </svg>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '4px' }}>Our Mission</h3>
              <p style={{ fontSize: '0.8rem', lineHeight: '1.3', opacity: '0.95', margin: 0 }}>
                To empower entrepreneurs, promote artisan excellence and create sustainable business opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Our Vision (Yellow with Brush Edge) */}
        <div className="wcu-card wcu-yellow brush-edge-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingLeft: '10px' }}>
            {/* Eye SVG Icon */}
            <svg style={{ width: '45px', height: '45px', flexShrink: 0, stroke: '#111111' }} viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '4px' }}>Our Vision</h3>
              <p style={{ fontSize: '0.8rem', lineHeight: '1.3', opacity: '0.9', margin: 0 }}>
                To build a thriving community where businesses grow, ideas innovate and society prospers.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Our Commitment (Orange with Brush Edge) */}
        <div className="wcu-card wcu-orange brush-edge-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingLeft: '10px' }}>
            {/* Handshake SVG Icon */}
            <svg style={{ width: '45px', height: '45px', flexShrink: 0, stroke: '#ffffff' }} viewBox="0 0 24 24" fill="none" strokeWidth="2">
              <path d="M11 15h2M12 11v4M9 18l3 3 3-3M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"></path>
              <path d="M8 11h8v3H8z"></path>
            </svg>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '4px' }}>Our Commitment</h3>
              <p style={{ fontSize: '0.8rem', lineHeight: '1.3', opacity: '0.95', margin: 0 }}>
                To support, guide and connect entrepreneurs at every step of their journey.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhyChooseUs;