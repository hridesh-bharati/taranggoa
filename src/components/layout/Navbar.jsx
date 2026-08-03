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
  Globe,
  X,
  AlignRight,
  User,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { profileController } from '@/controllers/profile.controller';
import './Navbar.css';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const { user, logout } = useAuth();

  // Load Cached & Fresh Firestore Profile Data (With Cloudinary URL support)
  useEffect(() => {
    if (user?.uid) {
      // 1. Instant cache load
      const cached = profileController.getCache(user.uid);
      if (cached) setProfileData(cached);

      // 2. Background Firestore sync
      profileController.fetchProfile(user.uid, user.email, (freshData) => {
        setProfileData(freshData);
      }).catch((err) => console.error('Navbar profile fetch error:', err));
    } else {
      setProfileData(null);
    }
  }, [user]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home, colorClass: 'icon-blue' },
    { name: 'About Us', href: '/about', icon: Info, colorClass: 'icon-cyan' },
    { name: 'Events', href: '/events', icon: Calendar, colorClass: 'icon-red' },
    { name: 'Gallery', href: '/gallery', icon: GalleryIcon, colorClass: 'icon-purple' },
    { name: 'Entrepreneurs', href: '/entrepreneurs', icon: Briefcase, colorClass: 'icon-green' },
    { name: 'Post', href: '/adminpost', icon: Briefcase, colorClass: 'icon-green' },
    { name: 'News', href: '/news', icon: Newspaper, colorClass: 'icon-teal' },
    { name: 'Contact Us', href: '/contact', icon: PhoneCall, colorClass: 'icon-indigo' },
  ];

  const displayName = profileData?.name || user?.displayName || 'User Profile';
  const displayPhoto = profileData?.photoURL || user?.photoURL;
  const userInitial = displayName ? displayName.charAt(0).toUpperCase() : 'U';

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

        {/* Mobile Toggle Button */}
        <button
          className="three-dot-btn d-lg-none ms-auto"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} className="text-dark" /> : <AlignRight size={22} className="text-dark" />}
        </button>

        {/* Navigation Drawer */}
        <div className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`}>

          {/* Links */}
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
                    <span className={`app-icon-badge d-lg-none ${link.colorClass}`}>
                      <Icon size={16} className="text-white" />
                    </span>
                    <Icon size={15} className="d-none d-lg-inline nav-icon" />
                    <span className="fw-medium nav-text">{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Action Group */}
          <div className="bottom-action-group pt-2 pt-lg-0 d-flex flex-column flex-lg-row align-items-stretch align-items-lg-center gap-2 flex-shrink-0">

            {/* Logged-In User Profile Avatar & Dropdown */}
            {user ? (
              <div className="position-relative">
                <button
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="btn p-0 border-0 d-flex align-items-center gap-2"
                >
                  <div className="bg-logo-orange text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm overflow-hidden" style={{ width: 38, height: 38 }}>
                    {displayPhoto ? (
                      <img src={displayPhoto} alt="User" className="rounded-circle w-100 h-100 object-fit-cover" />
                    ) : (
                      userInitial
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div 
                    className="position-absolute end-0 mt-2 bg-white rounded-4 shadow-lg p-2 z-3 border"
                    style={{ minWidth: '220px' }}
                  >
                    <div className="px-3 py-2 border-bottom">
                      <p className="fw-bold mb-0 text-dark fs-7 text-truncate">{displayName}</p>
                      <small className="text-muted text-truncate d-block fs-8">{user.email}</small>
                    </div>

                    <Link 
                      href="/admin/dashboard" 
                      className="dropdown-item d-flex align-items-center gap-2 p-2 rounded-3 fs-7 fw-medium text-dark mt-1"
                      onClick={() => setShowDropdown(false)}
                    >
                      <LayoutDashboard size={16} className="text-primary" />
                      <span>Dashboard</span>
                    </Link>

                    <Link 
                      href="/admin/profile" 
                      className="dropdown-item d-flex align-items-center gap-2 p-2 rounded-3 fs-7 fw-medium text-dark"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User size={16} className="text-success" />
                      <span>My Profile</span>
                    </Link>

                    <hr className="my-1 opacity-25" />

                    <button 
                      onClick={() => {
                        setShowDropdown(false);
                        logout();
                      }}
                      className="dropdown-item text-danger d-flex align-items-center gap-2 p-2 rounded-3 fs-7 fw-semibold w-100 border-0 bg-transparent"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login CTA */
              <Link
                href="/admin/auth/login"
                className="btn btn-register rounded-pill px-3 py-2 d-flex align-items-center justify-content-center gap-2 fw-bold shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <UserPlus size={16} />
                <span>Login</span>
              </Link>
            )}

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