import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container-fluid  py-4">
        <div className="row g-4 border-bottom border-secondary pb-5">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bg-warning rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                <i className="bi bi-sun-fill text-purple fs-6"></i>
              </div>
              <span className="fw-bold fs-4">Tarang Goa</span>
            </div>
            <p className="text-secondary fs-7 mb-4">
              Promoting entrepreneurship, supporting artisans and building a strong business community through exhibitions and events.
            </p>
            <div className="d-flex gap-3">
              {['facebook', 'instagram', 'linkedin', 'youtube'].map((soc, idx) => (
                <a key={idx} href="#" className="btn btn-outline-secondary rounded-circle btn-sm d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                  <i className={`bi bi-${soc}`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3 text-warning">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 fs-7 text-secondary">
              <li><Link href="/about" className="text-decoration-none text-secondary">About Us</Link></li>
              <li><Link href="/exhibitions" className="text-decoration-none text-secondary">Exhibitions</Link></li>
              <li><Link href="/events" className="text-decoration-none text-secondary">Events</Link></li>
              <li><Link href="/gallery" className="text-decoration-none text-secondary">Gallery</Link></li>
              <li><Link href="/entrepreneurs" className="text-decoration-none text-secondary">Entrepreneurs</Link></li>
              <li><Link href="/contact" className="text-decoration-none text-secondary">Contact Us</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-3">
            <h6 className="fw-bold mb-3 text-warning">Useful Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 fs-7 text-secondary">
              <li><Link href="/membership" className="text-decoration-none text-secondary">Member Registration</Link></li>
              <li><Link href="/exhibitor" className="text-decoration-none text-secondary">Exhibitor Registration</Link></li>
              <li><Link href="/calendar" className="text-decoration-none text-secondary">Event Calendar</Link></li>
              <li><Link href="/media" className="text-decoration-none text-secondary">Media Coverage</Link></li>
              <li><Link href="/faqs" className="text-decoration-none text-secondary">FAQs</Link></li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h6 className="fw-bold mb-3 text-warning">Contact Us</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 fs-7 text-secondary">
              <li><i className="bi bi-geo-alt me-2 text-warning"></i>Tarang Goa, Panaji, Goa - 403001</li>
              <li><i className="bi bi-telephone me-2 text-warning"></i>+91 98765 43210</li>
              <li><i className="bi bi-envelope me-2 text-warning"></i>info@taranggoa.com</li>
            </ul>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-between align-items-center pt-3 fs-7 text-secondary">
          <p className="mb-0">© 2026 Tarang Goa. All Rights Reserved.</p>
          <div className="d-flex gap-3">
            <Link href="/privacy" className="text-secondary text-decoration-none">Privacy Policy</Link>
            <Link href="/terms" className="text-secondary text-decoration-none">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}