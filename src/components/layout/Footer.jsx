'use client';

import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const socialLinks = [
    { iconClass: 'bi-facebook', href: '#', label: 'Facebook' },
    { iconClass: 'bi-instagram', href: '#', label: 'Instagram' },
    { iconClass: 'bi-linkedin', href: '#', label: 'LinkedIn' },
    { iconClass: 'bi-youtube', href: '#', label: 'YouTube' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Exhibitions', href: '/exhibitions' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Entrepreneurs', href: '/entrepreneurs' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const usefulLinks = [
    { name: 'Member Registration', href: '/membership' },
    { name: 'Exhibitor Registration', href: '/exhibitor' },
    { name: 'Event Calendar', href: '/calendar' },
    { name: 'Media Coverage', href: '/media' },
    { name: 'FAQs', href: '/faqs' },
  ];

  return (
    <footer className="footer-section position-relative pt-5 pb-3">
      {/* Top Gradient Accent Line */}
      <div className="footer-top-border"></div>

      <div className="container-fluid px-3 px-md-5 py-4">
        <div className="row g-4 border-bottom border-secondary border-opacity-25 pb-5">
          
          {/* Brand Info & Socials */}
          <div className="col-lg-4 col-md-12">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img 
                src="/images/logo.jpg" 
                alt="Tarang Logo" 
                className="footer-logo bg-white p-1 rounded-2"
              />
              <span className="fw-bold fs-4 text-white">Tarang Goa</span>
            </div>
            
            <p className="footer-text mb-4 pe-lg-4">
              Promoting entrepreneurship, supporting artisans, and building a vibrant business community through premier exhibitions and community events across Goa & India.
            </p>

            <div className="d-flex gap-2">
              {socialLinks.map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  aria-label={soc.label}
                  className="social-icon-btn d-flex align-items-center justify-content-center rounded-circle"
                >
                  <i className={`bi ${soc.iconClass} fs-6`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-lg-2 col-md-4">
            <h6 className="footer-heading fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div className="col-6 col-lg-3 col-md-4">
            <h6 className="footer-heading fw-bold mb-3">Useful Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              {usefulLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="footer-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="col-lg-3 col-md-4">
            <h6 className="footer-heading fw-bold mb-3">Contact Us</h6>
            <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
              <li className="d-flex align-items-start gap-2 footer-contact-item">
                <MapPin size={18} className="contact-icon flex-shrink-0 mt-1" />
                <span>Tarang Goa, Panaji, Goa - 403001</span>
              </li>
              <li className="d-flex align-items-center gap-2 footer-contact-item">
                <Phone size={18} className="contact-icon flex-shrink-0" />
                <a href="tel:+919876543210" className="footer-contact-link">
                  +91 98765 43210
                </a>
              </li>
              <li className="d-flex align-items-center gap-2 footer-contact-item">
                <Mail size={18} className="contact-icon flex-shrink-0" />
                <a href="mailto:info@taranggoa.com" className="footer-contact-link">
                  info@taranggoa.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-3 gap-2 fs-7 footer-bottom-text">
          <p className="mb-0 text-center text-md-start">
            © {new Date().getFullYear()} Tarang Goa. All Rights Reserved.
          </p>
          <div className="d-flex align-items-center gap-3">
            <Link href="/privacy" className="footer-bottom-link">
              Privacy Policy
            </Link>
            <span className="opacity-20">•</span>
            <Link href="/terms" className="footer-bottom-link">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}