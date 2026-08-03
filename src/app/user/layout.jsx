'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { profileController } from '@/controllers/profile.controller';
import './UserDashboard.css';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  Image as ImageIcon, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Home, 
  ShieldCheck
} from 'lucide-react';

export default function UserLayout({ children }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (user?.uid) {
      const cached = profileController.getCache(user.uid);
      if (cached) setProfileData(cached);
      profileController.fetchProfile(user.uid, user.email, (fresh) => setProfileData(fresh));
    }
  }, [user]);

  const menuGroups = [
    {
      title: 'MY DASHBOARD',
      items: [
        { name: 'Dashboard', href: '/user/dashboard', icon: LayoutDashboard },
        { name: 'My Profile', href: '/user/user-profile', icon: User },
      ]
    },
    {
      title: 'CONTENT & MEDIA',
      items: [
        { name: 'New Post', href: '/user/user-new-post', icon: FileText },
        { name: 'Gallery', href: '/user/user-gallary', icon: ImageIcon },
        { name: 'Articles', href: '/user/user-post', icon: FileText },
      ]
    },
    {
      title: 'COMMUNITY',
      items: [
        { name: 'Community Hub', href: '/community', icon: Users },
      ]
    }
  ];

  return (
    <div className="usr-dashboard-container d-flex min-vh-100">
      
      {/* 🔴 BACKDROP OVERLAY FOR MOBILE */}
      {drawerOpen && (
        <div className="usr-drawer-overlay d-lg-none" onClick={() => setDrawerOpen(false)} />
      )}

      {/* 🔴 OFFCANVAS SIDEBAR (MOBILE & DESKTOP) */}
      <aside className={`usr-sidebar ${drawerOpen ? 'usr-drawer-open' : ''}`}>
        
        {/* Sidebar Header */}
        <div className="p-3 border-bottom d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div className="text-white p-2 rounded-3 d-flex align-items-center justify-content-center shadow-sm" style={{ width: 36, height: 36, background: '#f15a24' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h6 className="fw-extrabold text-dark mb-0 fs-7">TARANG MEMBER</h6>
              <small className="text-muted fs-8 fw-semibold">Control Center</small>
            </div>
          </div>
          <button onClick={() => setDrawerOpen(false)} className="btn btn-sm btn-light border-0 d-lg-none text-muted">
            <X size={20} />
          </button>
        </div>

        {/* Menu Navigation */}
        <div className="p-3 flex-grow-1 overflow-auto">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="mb-3">
              <div className="usr-section-title">{group.title}</div>
              <div className="d-flex flex-column gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      className={`usr-nav-link ${isActive ? 'active' : ''}`}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Account Details */}
        <div className="p-3 border-top bg-light m-2 rounded-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <div className="rounded-circle overflow-hidden border bg-white d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 34, height: 34 }}>
              {profileData?.photoURL ? (
                <img src={profileData.photoURL} alt="" className="w-100 h-100 object-fit-cover" />
              ) : (
                <span className="fw-bold text-primary fs-8">{profileData?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="overflow-hidden">
              <h6 className="fw-bold text-dark mb-0 fs-8 text-truncate">{profileData?.name || 'Member'}</h6>
              <small className="text-muted fs-9 d-block text-truncate">{user?.email}</small>
            </div>
          </div>
          <button onClick={logout} className="btn btn-sm btn-outline-danger w-100 rounded-pill fw-bold fs-8 d-flex align-items-center justify-content-center gap-1">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </aside>

      {/* 🔴 RIGHT MAIN CONTENT WRAPPER */}
      <div className="usr-main-wrapper flex-grow-1 d-flex flex-column min-vh-100">
        
        {/* Top Navbar */}
        <header className="bg-white border-bottom px-3 px-lg-4 py-3 d-flex align-items-center justify-content-between sticky-top z-2">
          <div className="d-flex align-items-center gap-2">
            <button onClick={() => setDrawerOpen(true)} className="btn btn-light border-0 d-lg-none p-1.5 rounded-circle text-dark">
              <Menu size={20} />
            </button>
            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1 fw-bold fs-8 d-flex align-items-center gap-1">
              <span className="bg-success rounded-circle d-inline-block" style={{ width: 6, height: 6 }} /> MEMBER ONLINE
            </span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-light border rounded-circle p-2 text-secondary">
              <Bell size={16} />
            </button>
            <Link href="/" className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1.5 fw-bold fs-8 d-flex align-items-center gap-1">
              <Home size={14} /> Website Home
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-3 p-lg-4 flex-grow-1">
          {children}
        </main>
      </div>

    </div>
  );
}