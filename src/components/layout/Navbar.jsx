'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Info,
  Calendar,
  Image as GalleryIcon,
  Briefcase,
  Newspaper,
  PhoneCall,
  UserPlus,
  MoreVertical,
  Sparkles,
  Globe,
  X,
  AlignRight
} from 'lucide-react';
import { useState } from 'react';
import './Navbar.css'

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  const navLinks = [
    { name: 'Home', href: '/', icon: Home, colorClass: 'icon-blue' },
    { name: 'About Us', href: '/about', icon: Info, colorClass: 'icon-cyan' },
    { name: 'Exhibitions', href: '/exhibitions', icon: Sparkles, colorClass: 'icon-yellow' },
    { name: 'Events', href: '/events', icon: Calendar, colorClass: 'icon-red' },
    { name: 'Gallery', href: '/gallery', icon: GalleryIcon, colorClass: 'icon-purple' },
    { name: 'Entrepreneurs', href: '/entrepreneurs', icon: Briefcase, colorClass: 'icon-green' },
    { name: 'News', href: '/news', icon: Newspaper, colorClass: 'icon-teal' },
    { name: 'Contact Us', href: '/contact', icon: PhoneCall, colorClass: 'icon-indigo' },
  ];

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm py-1 py-lg-2 custom-navbar">
      <div className="container-fluid px-3 px-xl-5 position-relative">

        {/* Brand Logo */}
        <Link href="/" className="navbar-brand d-flex align-items-center py-0 me-0 me-lg-3">
          <img
            src="/images/logo.jpg"
            alt="Tarang Logo"
            style={{ height: '42px', width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* WhatsApp-style Three-Dot Button for Mobile */}
        <button
          className="three-dot-btn d-lg-none ms-auto"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} className="text-dark" /> : <AlignRight size={22} className="text-dark" />}
        </button>

        {/* Smooth Top-to-Bottom Slide Drawer */}
        <div className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`}>

          {/* Navigation Links */}
          <ul className="navbar-nav mx-auto align-items-lg-center gap-xl-1 py-2 py-lg-0 w-100 justify-content-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <li key={link.href} className="nav-item">
                  <Link
                    href={link.href}
                    className={`nav-link custom-nav-link d-flex align-items-center gap-2 px-2 px-xl-3 py-2 ${isActive ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {/* Mobile Colorful Icon Badge */}
                    <span className={`app-icon-badge d-lg-none ${link.colorClass}`}>
                      <Icon size={16} className="text-white" />
                    </span>

                    {/* Desktop Icon */}
                    <Icon size={15} className="d-none d-lg-inline nav-icon" />

                    <span className="fw-medium nav-text">{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Action Group: Register CTA & Language Switcher */}
          <div className="bottom-action-group pt-2 pt-lg-0 d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2 flex-shrink-0">

            <Link
              href="/membership"
              className="btn btn-register rounded-pill px-3 py-2 d-flex align-items-center justify-content-center gap-2 fw-bold shadow-sm"
              onClick={() => setIsOpen(false)}
            >
              <UserPlus size={16} />
              <span>Register Now</span>
            </Link>

            {/* Language Dropdown */}
            <div className="language-selector d-flex align-items-center justify-content-center gap-1 rounded-pill px-2 py-1">
              <Globe size={15} className="lang-icon" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="lang-select-dropdown bg-transparent border-0 fw-semibold"
              >
                <option value="EN">EN</option>
                <option value="HI">HI</option>
                <option value="MR">MR</option>
              </select>
            </div>

          </div>
        </div>

      </div>
    </nav>
  );
}