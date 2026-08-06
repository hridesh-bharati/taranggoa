'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    // Admin WhatsApp Number from Env or Fallback
    const adminWhatsapp = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP || '919172679953';

    // Pre-filled WhatsApp message
    const message = encodeURIComponent(
      `Hello TarangGoa Team,\n\nI want to subscribe to your newsletter for exhibition updates & upcoming events.\n\nMy Email: ${email}`
    );

    // Open WhatsApp Web/App
    window.open(`https://wa.me/${adminWhatsapp}?text=${message}`, '_blank');
    setEmail('');
  };

  return (
    <section className="py-4 py-md-5 w-100 bg-light">
      <div className="container-fluid px-3 px-md-4">
        <div
          className="card border-0 shadow-sm rounded-4 p-4 p-md-5 text-white"
          style={{ background: 'linear-gradient(135deg, #003353 0%, #2874f0 100%)' }}
        >
          <div className="row align-items-center g-4">

            {/* Left Column: Heading & Info */}
            <div className="col-12 col-lg-6">
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill fs-9">
                  📩 STAY CONNECTED
                </span>
              </div>
              <h3 className="fw-extrabold mb-2 text-white">
                Never Miss a Festive Expo & Event Update!
              </h3>
              <p className="text-white-50 mb-0 fs-8">
                Subscribe now to receive exclusive updates on upcoming Tarang Utsav exhibitions, stall bookings, and business opportunities directly on WhatsApp.
              </p>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="col-12 col-lg-6">
              <form onSubmit={handleSubscribe} className="bg-white p-2 p-md-2.5 rounded-pill shadow-sm d-flex gap-2">
                <input
                  type="email"
                  className="form-control border-0 bg-transparent px-3 fs-8 fw-semibold shadow-none text-dark"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="btn btn-warning text-dark fw-bold rounded-pill px-4 py-2 text-nowrap fs-8 shadow-sm d-flex align-items-center gap-2"
                >
                  <span>Subscribe</span>
                  <i className="bi bi-whatsapp text-success fs-6"></i>
                </button>
              </form>
              <small className="text-white-50 fs-9 mt-2 d-block text-center text-lg-start ps-2">
                🔒 We respect your privacy. Instant redirection via WhatsApp.
              </small>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}