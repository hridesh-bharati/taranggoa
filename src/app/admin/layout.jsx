// src\app\admin\layout.jsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { profileController } from '@/controllers/profile.controller';
import GlobalSearch from '@/app/admin/GlobalSearch';
import {
  LayoutDashboard,
  User,
  Users,
  Inbox,
  CalendarCheck,
  Store,
  Building2,
  Upload,
  Image as GalleryIcon,
  Tag,
  Trash2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  AlignRight,
  Bell,
  Home,
  PlusSquare,
  History
} from 'lucide-react';
import './Dashboard.css';

export default function AdminLayout({ children }) {
  const { user, isAdmin, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const isAuthPage = pathname?.includes('/admin/auth');

  useEffect(() => {
    if (user?.uid) {
      const cached = profileController.getCache(user.uid);
      if (cached?.photoURL) {
        setProfilePhoto(cached.photoURL);
      }

      profileController.fetchProfile(user.uid, user.email, (freshData) => {
        if (freshData?.photoURL) {
          setProfilePhoto(freshData.photoURL);
        }
      }).catch((err) => console.error("Profile image load error:", err));
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !isAuthPage) {
      if (!user) {
        router.replace('/admin/auth/login');
      } else if (!isAdmin) {
        router.replace('/user/dashboard');
      }
    }
  }, [user, isAdmin, loading, router, isAuthPage]);

  if (isAuthPage) return <>{children}</>;

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-logo-orange" role="status"></div>
      </div>
    );
  }

  const navigationGroups = [
    {
      title: 'CORE SYSTEM',
      links: [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, colorClass: 'icon-blue' },
        { name: 'Entrepreneurs', href: '/entrepreneurs', icon: LayoutDashboard, colorClass: 'icon-blue' },
      ]
    },
    {
      title: 'EVENT & MEMBER MANAGEMENT',
      links: [
        { name: 'Users List', href: '/admin/all-users-list', icon: Users, colorClass: 'icon-cyan' },
        { name: 'Membership', href: '/admin/membership-admin-page', icon: History, colorClass: 'icon-teal' },
        { name: 'MSME Requests', href: '/admin/msme', icon: Building2, colorClass: 'icon-yellow' },
        { name: 'Inquiries', href: '/admin/inbox', icon: Inbox, colorClass: 'icon-purple' },
        { name: 'Add Event', href: '/admin/event', icon: CalendarCheck, colorClass: 'icon-red' },
        { name: 'All Events', href: '/admin/eventdetails', icon: Store, colorClass: 'icon-teal' },
      ]
    },
    {
      title: 'OFFERS MANAGEMENT',
      links: [
        { name: 'Create Offer', href: '/admin/offers', icon: Tag, colorClass: 'icon-green' },
        { name: 'Manage Offers', href: '/admin/offers/delete', icon: Trash2, colorClass: 'icon-red' },
      ]
    },
    {
      title: 'MEDIA & GALLERY',
      links: [
        { name: 'Upload Media', href: '/admin/media', icon: Upload, colorClass: 'icon-cyan' },
        { name: 'Gallery Control', href: '/admin/gallery', icon: GalleryIcon, colorClass: 'icon-purple' },
      ]
    },
    {
      title: 'PROFILE',
      links: [
        { name: 'My Profile', href: '/admin/profile', icon: User, colorClass: 'icon-green' },
      ]
    },
  ];

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'A';

  const renderNavLinks = (isMobile = false) => {
    return navigationGroups.map((group, index) => (
      <div key={index} className="nav-group-section mb-3">
        {(!desktopCollapsed || isMobile) && (
          <div className="sidebar-section-title px-2 mb-2 text-muted fw-bold text-uppercase" style={{ fontSize: '0.68rem', letterSpacing: '0.5px' }}>
            {group.title}
          </div>
        )}
        <ul className="nav flex-column gap-1 p-0 m-0">
          {group.links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <li key={link.href} className="nav-item" title={desktopCollapsed && !isMobile ? link.name : ''}>
                <Link
                  href={link.href}
                  className={`sidebar-link ${isActive ? 'active' : ''} d-flex align-items-center gap-2 p-2 rounded-3 text-decoration-none text-dark`}
                  onClick={() => isMobile && setMobileDrawerOpen(false)}
                >
                  <span className={`app-icon-badge ${link.colorClass} d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 30, height: 30, borderRadius: 8 }}>
                    <Icon size={16} className="text-white" />
                  </span>
                  {(!desktopCollapsed || isMobile) && (
                    <span className="flex-grow-1 text-truncate fs-7 fw-semibold">{link.name}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    ));
  };

  const renderUserAvatar = (size = 34) => {
    if (profilePhoto) {
      return (
        <img
          src={profilePhoto}
          alt="Profile"
          className="rounded-circle object-fit-cover flex-shrink-0 border border-2 border-white shadow-sm"
          style={{ width: size, height: size }}
          onError={() => setProfilePhoto(null)}
        />
      );
    }
    return (
      <div
        className="bg-logo-orange text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 fw-bold shadow-sm"
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {userInitial}
      </div>
    );
  };

  return (
    <div className="min-vh-100 d-flex admin-dashboard-container">

      {/* 1. DESKTOP SIDEBAR */}
      <aside
        className={`admin-sidebar p-3 d-flex flex-column justify-content-between d-none d-lg-flex ${desktopCollapsed ? 'collapsed' : ''}`}
        style={{
          width: desktopCollapsed ? '80px' : '260px',
          transition: 'width 0.25s ease-in-out',
          flexShrink: 0
        }}
      >
        <div className="overflow-y-auto custom-scrollbar">
          <div className="d-flex align-items-center justify-content-between px-1 py-2 border-bottom border-light-subtle mb-3">
            <div className="d-flex align-items-center gap-2 overflow-hidden">
              <span className="app-icon-badge bg-logo-orange text-white d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" style={{ width: 36, height: 36 }}>
                <ShieldCheck size={20} />
              </span>
              {!desktopCollapsed && (
                <div className="text-truncate">
                  <img src="/logo.png" className='img-fluid w-100' alt="" />
                </div>
              )}
            </div>
          </div>

          {renderNavLinks(false)}
        </div>

        <div className="p-2 border-top d-flex align-items-center justify-content-between gap-2 mt-auto">
          <div className="d-flex align-items-center gap-2 overflow-hidden">
            {renderUserAvatar(34)}
            {!desktopCollapsed && (
              <div className="overflow-hidden">
                <h6 className="fw-bold mb-0 text-dark fs-7 text-truncate">Admin Account</h6>
                <small className="text-secondary d-block fs-8 text-truncate">{user?.email}</small>
              </div>
            )}
          </div>
          {!desktopCollapsed && (
            <button onClick={() => logout()} className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2 flex-shrink-0" title="Logout">
              <i className="bi bi-box-arrow-right fs-6"></i>
            </button>
          )}
        </div>
      </aside>

      {/* 2. MOBILE DRAWER */}
      {mobileDrawerOpen && (
        <div className="drawer-overlay d-lg-none" onClick={() => setMobileDrawerOpen(false)} />
      )}

      <div className={`mobile-admin-drawer p-3 d-flex flex-column justify-content-between d-lg-none ${mobileDrawerOpen ? 'open' : ''}`}>
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 90px)' }}>
          <div className="d-flex align-items-center justify-content-between px-2 py-3 border-bottom mb-3">
            <div className="d-flex align-items-center gap-2">
              <span className="app-icon-badge bg-logo-orange text-white d-flex align-items-center justify-content-center rounded-3" style={{ width: 34, height: 34 }}>
                <ShieldCheck size={18} />
              </span>
              <h6 className="fw-black text-dark mb-0" style={{ fontWeight: 900 }}>TARANG ADMIN</h6>
            </div>
            <button onClick={() => setMobileDrawerOpen(false)} className="btn border-0 p-1 text-dark">
              <X size={22} />
            </button>
          </div>

          {renderNavLinks(true)}
        </div>

        <div className="p-2 border-top d-flex align-items-center justify-content-between gap-2 mt-auto">
          <div className="d-flex align-items-center gap-2 overflow-hidden">
            {renderUserAvatar(32)}
            <div className="overflow-hidden">
              <h6 className="fw-bold mb-0 text-dark fs-7 text-truncate">Admin Account</h6>
              <small className="text-muted d-block fs-8 text-truncate">{user?.email}</small>
            </div>
          </div>
          <button onClick={() => logout()} className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 fw-bold">
            Logout
          </button>
        </div>
      </div>

      {/* 3. TOPBAR & MAIN CONTENT */}
      <div className="flex-grow-1 d-flex flex-column overflow-x-hidden">
        <header className="bg-white border-bottom p-2 d-flex align-items-center justify-content-between sticky-top z-3 shadow-sm">

          {/* Topbar Left Side */}
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-light rounded-circle p-1.5 border text-dark d-none d-lg-flex align-items-center justify-content-center"
              onClick={() => setDesktopCollapsed(!desktopCollapsed)}
              title={desktopCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              style={{ width: 34, height: 34 }}
            >
              {desktopCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>

          {/* Topbar Right Side */}
          <div className="d-flex align-items-center gap-2">
            {/* Mobile Logo */}
            <img src="/logo.png" className='img-fluid w-25 d-lg-none d-flex' alt="Logo" />

            {/* Mobile Home Icon (Logo ke baad) */}
            <Link
              href="/"
              className="btn btn-light rounded-circle p-2 text-dark border d-flex d-lg-none align-items-center justify-content-center flex-shrink-0"
              title="Go to Website Home"
              style={{ width: 36, height: 36 }}
            >
              <Home size={18} />
            </Link>

            {/* GLOBAL SEARCH BOX */}
            <GlobalSearch />

            <button className="btn btn-light rounded-circle p-2 text-dark border position-relative" title="Notifications">
              <Bell size={18} />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </button>

            {/* Desktop Home Button */}
            <Link
              href="/"
              className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1 fw-bold d-none d-sm-flex align-items-center gap-1"
              title="Go to Main Website"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>

            <button
              className="btn btn-light border rounded-circle p-2 d-lg-none text-dark"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              title="Open Navigation"
            >
              <AlignRight size={18} />
            </button>
          </div>
        </header>

        <main className="p-2 flex-grow-1">{children}</main>
      </div>

      {/* 4. MOBILE BOTTOM DOCK */}
      <div className="mobile-bottom-nav d-lg-none">
        <Link href="/admin/dashboard" className={`bottom-nav-item ${pathname === '/admin/dashboard' ? 'active' : ''}`}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        <Link href="/admin/members" className={`bottom-nav-item ${pathname === '/admin/members' ? 'active' : ''}`}>
          <Users size={18} />
          <span>Members</span>
        </Link>

        <Link href="/admin/media" className={`bottom-nav-item ${pathname === '/admin/media' ? 'active' : ''}`}>
          <PlusSquare size={18} />
          <span>Post</span>
        </Link>

        <Link href="/admin/inbox" className={`bottom-nav-item ${pathname === '/admin/inbox' ? 'active' : ''}`}>
          <Inbox size={18} />
          <span>Inbox</span>
        </Link>

        <Link href="/admin/profile" className={`bottom-nav-item ${pathname === '/admin/profile' ? 'active' : ''}`}>
          <div className="bottom-profile-avatar overflow-hidden d-flex align-items-center justify-content-center">
            {renderUserAvatar(24)}
          </div>
          <span>Profile</span>
        </Link>
      </div>

    </div>
  );
}