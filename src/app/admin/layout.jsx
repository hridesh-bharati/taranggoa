'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Inbox, 
  CalendarCheck, 
  Store, 
  Upload, 
  Image as GalleryIcon, 
  Tag, 
  Trash2, 
  ShieldCheck, 
  ChevronDown,
  X,
  AlignRight,
  Bell,
  Globe
} from 'lucide-react';
import './Dashboard.css';

export default function AdminLayout({ children }) {
  const { user, isAdmin, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) router.push('/login');
      else if (!isAdmin) router.push('/');
    }
  }, [user, isAdmin, loading, router]);

  if (loading || !isAdmin) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="spinner-border text-logo-orange" role="status"></div>
      </div>
    );
  }

  const managementLinks = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, colorClass: 'icon-blue' },
    { name: 'Tarang Members', href: '/admin/members', icon: Users, colorClass: 'icon-cyan' },
    { name: 'Stall Applications', href: '/admin/members?filter=new', icon: UserPlus, colorClass: 'icon-yellow' },
    { name: 'Inquiries', href: '/admin/queries', icon: Inbox, colorClass: 'icon-purple' },
    { name: 'Stall Bookings', href: '/admin/stalls', icon: Store, colorClass: 'icon-red', hasDropdown: true },
    { name: 'Exhibition Logs', href: '/admin/logs', icon: CalendarCheck, colorClass: 'icon-teal', hasDropdown: true },
  ];

  const marketingLinks = [
    { name: 'Upload Media', href: '/admin/media', icon: Upload, colorClass: 'icon-cyan' },
    { name: 'Gallery Control', href: '/admin/gallery', icon: GalleryIcon, colorClass: 'icon-purple' },
    { name: 'Create Offers', href: '/admin/offers', icon: Tag, colorClass: 'icon-green' },
    { name: 'Delete Offers', href: '/admin/offers/delete', icon: Trash2, colorClass: 'icon-red' },
  ];

  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : 'A';

  return (
    <div className="min-vh-100 d-flex admin-dashboard-container">
      
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="admin-sidebar p-3 d-flex flex-column justify-content-between d-none d-lg-flex">
        <div>
          <div className="d-flex align-items-center gap-2 px-2 py-3 border-bottom border-light-subtle mb-2">
            <span className="app-icon-badge bg-logo-orange text-white d-flex align-items-center justify-content-center rounded-3" style={{ width: 36, height: 36 }}>
              <ShieldCheck size={20} />
            </span>
            <div>
              <h6 className="fw-black text-dark mb-0" style={{ fontWeight: 900 }}>TARANG ADMIN</h6>
              <small className="text-secondary fw-semibold" style={{ fontSize: '0.72rem' }}>Control Center</small>
            </div>
          </div>

          <div className="sidebar-section-title">MANAGEMENT</div>
          <ul className="nav flex-column gap-1 p-0 m-0">
            {managementLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <li key={link.href} className="nav-item">
                  <Link href={link.href} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className={`app-icon-badge ${link.colorClass} d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 30, height: 30, borderRadius: 8 }}>
                      <Icon size={16} className="text-white" />
                    </span>
                    <span className="flex-grow-1">{link.name}</span>
                    {link.hasDropdown && <ChevronDown size={14} className="opacity-50" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="sidebar-section-title">MARKETING</div>
          <ul className="nav flex-column gap-1 p-0 m-0">
            {marketingLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <li key={link.href} className="nav-item">
                  <Link href={link.href} className={`sidebar-link ${isActive ? 'active' : ''}`}>
                    <span className={`app-icon-badge ${link.colorClass} d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 30, height: 30, borderRadius: 8 }}>
                      <Icon size={16} className="text-white" />
                    </span>
                    <span className="flex-grow-1">{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-2 border-top d-flex align-items-center justify-content-between gap-2 mt-3">
          <div className="d-flex align-items-center gap-2 overflow-hidden">
            <div className="bg-logo-orange text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 fw-bold" style={{ width: 34, height: 34 }}>
              {userInitial}
            </div>
            <div className="overflow-hidden">
              <h6 className="fw-bold mb-0 text-dark fs-7 text-truncate">Admin Account</h6>
              <small className="text-secondary d-block fs-8 text-truncate">{user?.email}</small>
            </div>
          </div>
          <button onClick={() => logout()} className="btn btn-sm btn-outline-danger border-0 rounded-circle p-2" title="Logout">
            <i className="bi bi-box-arrow-right fs-6"></i>
          </button>
        </div>
      </aside>

      {/* 2. MOBILE LIGHT DRAWER */}
      {mobileDrawerOpen && (
        <div className="drawer-overlay d-lg-none" onClick={() => setMobileDrawerOpen(false)} />
      )}
      
      <div className={`mobile-admin-drawer p-3 d-flex flex-column justify-content-between d-lg-none ${mobileDrawerOpen ? 'open' : ''}`}>
        <div>
          <div className="d-flex align-items-center justify-content-between px-2 py-3 border-bottom mb-2">
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

          <div className="sidebar-section-title">MANAGEMENT</div>
          <ul className="nav flex-column gap-1 p-0 m-0">
            {managementLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <li key={link.href} className="nav-item">
                  <Link 
                    href={link.href} 
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileDrawerOpen(false)}
                  >
                    <span className={`app-icon-badge ${link.colorClass} d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 28, height: 28, borderRadius: 6 }}>
                      <Icon size={15} className="text-white" />
                    </span>
                    <span className="flex-grow-1">{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="sidebar-section-title">MARKETING</div>
          <ul className="nav flex-column gap-1 p-0 m-0">
            {marketingLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <li key={link.href} className="nav-item">
                  <Link 
                    href={link.href} 
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileDrawerOpen(false)}
                  >
                    <span className={`app-icon-badge ${link.colorClass} d-flex align-items-center justify-content-center flex-shrink-0`} style={{ width: 28, height: 28, borderRadius: 6 }}>
                      <Icon size={15} className="text-white" />
                    </span>
                    <span className="flex-grow-1">{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-2 border-top d-flex align-items-center justify-content-between gap-2 mt-3">
          <div className="overflow-hidden">
            <h6 className="fw-bold mb-0 text-dark fs-7 text-truncate">Admin Account</h6>
            <small className="text-muted d-block fs-8 text-truncate">{user?.email}</small>
          </div>
          <button onClick={() => logout()} className="btn btn-sm btn-outline-danger rounded-pill px-3 py-1 fw-bold">
            Logout
          </button>
        </div>
      </div>

      {/* TOPBAR & MAIN CONTENT */}
      <div className="flex-grow-1 d-flex flex-column overflow-x-hidden">
        <header className="bg-white border-bottom px-3 px-md-4 py-2.5 d-flex align-items-center justify-content-between sticky-top z-3 shadow-sm">
          <div className="d-flex align-items-center gap-2">
            <button 
              className="btn border-0 p-1.5 d-lg-none"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            >
              <AlignRight size={22} className="text-dark" />
            </button>
            <span className="badge bg-logo-orange text-white px-3 py-1.5 rounded-pill fw-bold">
              SYSTEM ONLINE
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-light rounded-circle p-2 text-dark border position-relative" title="Notifications">
              <Bell size={18} />
              <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
            </button>

            <Link 
              href="/" 
              className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-1.5 fw-bold d-flex align-items-center gap-1.5"
              title="Go to Main Website"
            >
              <Globe size={16} />
              <span className="d-none d-sm-inline">Home</span>
            </Link>
          </div>
        </header>

        <main className="p-3 p-md-4 flex-grow-1">{children}</main>
      </div>

      {/* MOBILE BOTTOM DOCK */}
      <div className="mobile-bottom-nav d-lg-none">
        <Link href="/admin/dashboard" className={`bottom-nav-item ${pathname === '/admin/dashboard' ? 'active' : ''}`}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </Link>

        <Link href="/admin/members" className={`bottom-nav-item ${pathname === '/admin/members' ? 'active' : ''}`}>
          <Users size={18} />
          <span>Members</span>
        </Link>

        <Link href="/admin/members?filter=new" className={`bottom-nav-item ${pathname.includes('filter=new') ? 'active' : ''}`}>
          <UserPlus size={18} />
          <span>Stalls</span>
        </Link>

        <Link href="/admin/queries" className={`bottom-nav-item ${pathname === '/admin/queries' ? 'active' : ''}`}>
          <Inbox size={18} />
          <span>Inbox</span>
        </Link>

        <button 
          onClick={() => setMobileDrawerOpen(true)}
          className="bottom-nav-item border-0 bg-transparent"
        >
          <div className="bottom-profile-avatar">{userInitial}</div>
          <span>Profile</span>
        </button>
      </div>

    </div>
  );
}