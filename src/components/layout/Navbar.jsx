'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Info,
  Calendar,
  Image as GalleryIcon,
  Briefcase,
  Users,
  PhoneCall,
  UserPlus,
  Globe,
  X,
  AlignRight
} from 'lucide-react';
import { useState, useEffect, lazy, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { profileController } from '@/controllers/profile.controller';
import './Navbar.css';

// Lazy load LanguageTranslator
const LanguageTranslator = lazy(() => import('@/components/layout/LanguageTranslator'));

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loadTranslator, setLoadTranslator] = useState(false);

  const { user, isAdmin: isContextAdmin } = useAuth();

  useEffect(() => {
    if (user?.uid) {
      const cached = profileController.getCache(user.uid);
      if (cached) setProfileData(cached);

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
    { name: 'Membership', href: '/membership-user-page', icon: Briefcase, colorClass: 'icon-green' },
    { name: 'Entrepreneurs', href: '/entrepreneurs', icon: Briefcase, colorClass: 'icon-green' },
    { name: 'Contact Us', href: '/contact', icon: PhoneCall, colorClass: 'icon-indigo' },
  ];

  const displayName = profileData?.name || user?.displayName || 'User Profile';
  const displayPhoto = profileData?.photoURL || user?.photoURL;
  const userInitial = displayName ? displayName.charAt(0).toUpperCase() : 'U';

  const ADMIN_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || '').toLowerCase().trim();
  const userEmail = (user?.email || '').toLowerCase().trim();

  const isAdmin =
    isContextAdmin ||
    profileData?.role === 'admin' ||
    (Boolean(ADMIN_EMAIL) && userEmail === ADMIN_EMAIL);

  const dashboardLink = isAdmin ? '/admin/dashboard' : '/user/dashboard';

  return (
    <nav className="navbar navbar-expand-lg bg-white sticky-top shadow-sm py-1 py-lg-2 custom-navbar">
      <div className="container-fluid px-3 px-xl-5 position-relative d-flex align-items-center justify-content-between">

        {/* Brand Logo - Strictly Left */}
        <Link
          href="/"
          className="navbar-brand d-flex align-items-center py-0"
        >
          <img
            src="/mainlogo.png"
            alt="Tarang Logo"
            className="tarang-logo"
          />
        </Link>

        {/* Mobile Toggle Button - Strictly Right */}
        <button
          className="three-dot-btn d-lg-none"
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

            {/* Logged-In User Profile Avatar */}
            {user ? (
              <Link
                href={dashboardLink}
                className="d-flex align-items-center gap-2 text-decoration-none"
                onClick={() => setIsOpen(false)}
                title="Go to Dashboard"
              >
                <div
                  className="bg-logo-orange text-white rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm overflow-hidden flex-shrink-0"
                  style={{ width: 38, height: 38 }}
                >
                  {displayPhoto ? (
                    <img
                      src={displayPhoto}
                      alt="User"
                      className="rounded-circle w-100 h-100 object-fit-cover"
                    />
                  ) : (
                    userInitial
                  )}
                </div>

                <span className="d-lg-none fw-bold small text-dark text-truncate">
                  {displayName}
                </span>
              </Link>
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

            {/* Language Selector */}
            <div className="language-selector d-flex align-items-center justify-content-center gap-1 rounded-pill">
              {!loadTranslator ? (
                <button
                  className="btn btn-light btn-sm rounded-pill px-2 py-1 fw-semibold d-flex align-items-center gap-1 text-secondary"
                  onClick={() => setLoadTranslator(true)}
                  title="Change Language"
                >
                  <Globe size={15} />
                  <span>Translate</span>
                </button>
              ) : (
                <Suspense fallback={<small className="text-muted p-3">Loading...</small>}>
                  <LanguageTranslator />
                </Suspense>
              )}
            </div>

          </div>
        </div>

      </div>
    </nav>
  );
}