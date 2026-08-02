'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Store, Inbox, Image as GalleryIcon } from 'lucide-react';
import { memberController } from '@/controllers/member.controller';

export default function AdminDashboardPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await memberController.fetchMembers();
        setMembers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      {/* 1. Top Banner */}
      <div className="admin-top-banner mb-3 mb-md-4 d-flex align-items-center justify-content-between">
        <div>
          <h3 className="fw-black m-0 text-white fs-4 fs-md-3" style={{ fontWeight: 900 }}>
            <i className="bi bi-speedometer2 me-2"></i>Admin Console
          </h3>
          <p className="m-0 text-white opacity-90 fs-7 mt-1 fw-semibold">
            <i className="bi bi-calendar-event me-1"></i> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-extrabold shadow-sm fs-7 d-none d-sm-inline-block">
          • Session 2026 Active
        </span>
      </div>

      {/* 2. Top Stat Cards */}
      <div className="row g-2 g-md-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card dash-card stat-card-purple p-3 h-100 position-relative">
            <div className="d-flex align-items-center justify-content-between mb-2 position-relative z-1">
              <Users size={26} className="opacity-90" />
              <span className="fs-1 fw-black text-white" style={{ fontWeight: 900 }}>{loading ? '...' : members.length || 128}</span>
            </div>
            <small className="fw-extrabold text-uppercase opacity-90 fs-8 d-block text-truncate position-relative z-1" style={{ letterSpacing: '0.5px' }}>Total Members</small>
            <Users size={110} className="card-watermark-icon" />
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card dash-card stat-card-cyan p-3 h-100 position-relative">
            <div className="d-flex align-items-center justify-content-between mb-2 position-relative z-1">
              <Store size={26} className="opacity-90" />
              <span className="fs-1 fw-black text-white" style={{ fontWeight: 900 }}>12</span>
            </div>
            <small className="fw-extrabold text-uppercase opacity-90 fs-8 d-block text-truncate position-relative z-1" style={{ letterSpacing: '0.5px' }}>Stall Bookings</small>
            <Store size={110} className="card-watermark-icon" />
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card dash-card stat-card-orange p-3 h-100 position-relative">
            <div className="d-flex align-items-center justify-content-between mb-2 position-relative z-1">
              <Inbox size={26} className="opacity-90" />
              <span className="fs-1 fw-black text-white" style={{ fontWeight: 900 }}>08</span>
            </div>
            <small className="fw-extrabold text-uppercase opacity-90 fs-8 d-block text-truncate position-relative z-1" style={{ letterSpacing: '0.5px' }}>Inquiries</small>
            <Inbox size={110} className="card-watermark-icon" />
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card dash-card stat-card-pink p-3 h-100 position-relative">
            <div className="d-flex align-items-center justify-content-between mb-2 position-relative z-1">
              <GalleryIcon size={26} className="opacity-90" />
              <span className="fs-1 fw-black text-white" style={{ fontWeight: 900 }}>24</span>
            </div>
            <small className="fw-extrabold text-uppercase opacity-90 fs-8 d-block text-truncate position-relative z-1" style={{ letterSpacing: '0.5px' }}>Expo Banners</small>
            <GalleryIcon size={110} className="card-watermark-icon" />
          </div>
        </div>
      </div>

      {/* 3. Performance & Charts */}
      <div className="row g-3 g-md-4 mb-4">
        <div className="col-lg-8">
          <div className="card dash-card p-3 p-md-4 bg-white h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="fw-black text-dark m-0" style={{ fontWeight: 800 }}>Weekly Stall Bookings</h6>
              <span className="badge bg-light text-primary border fw-bold">Live Sync</span>
            </div>
            <div className="bg-light rounded-4 p-4 text-center d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
              <p className="text-secondary fw-bold mb-0 fs-7">📊 Weekly Exhibition Performance Chart</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card dash-card p-3 p-md-4 bg-white h-100">
            <h6 className="fw-black text-dark mb-3" style={{ fontWeight: 800 }}>Artisan Category Split</h6>
            <div className="bg-light rounded-4 p-4 text-center d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
              <p className="text-secondary fw-bold mb-0 fs-7">🍩 Category Split Chart</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recent Members & Inquiries */}
      <div className="row g-3 g-md-4">
        <div className="col-lg-7">
          <div className="card dash-card p-3 p-md-4 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="fw-black text-dark m-0" style={{ fontWeight: 800 }}>Recent Tarang Members</h6>
              <Link href="/admin/members" className="btn btn-sm btn-light text-primary fw-bold rounded-pill fs-8">View All</Link>
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <tbody>
                  {loading ? (
                    <tr><td className="text-center py-3 fs-7 fw-bold">Loading members...</td></tr>
                  ) : members.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="py-2">
                        <div className="d-flex align-items-center gap-2">
                          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" alt="Avatar" className="avatar-img" />
                          <div className="text-start">
                            <strong className="d-block text-dark fs-7 fw-bold">Sunita Naik</strong>
                            <small className="text-muted fs-8">Handicrafts & Decor</small>
                          </div>
                          <span className="ms-auto badge bg-success-subtle text-success border border-success-subtle rounded-pill fw-bold fs-8">
                            APPROVED
                          </span>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    members.slice(0, 4).map((m, idx) => (
                      <tr key={m.id || idx}>
                        <td style={{ width: '45px' }}>
                          <img src={m.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100"} alt="Avatar" className="avatar-img" />
                        </td>
                        <td>
                          <strong className="d-block text-dark fs-7 fw-bold">{m.name || 'Sunita Naik'}</strong>
                          <small className="text-muted fs-8">{m.category || 'Handicrafts'}</small>
                        </td>
                        <td className="text-end">
                          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill fw-bold fs-8">
                            {m.status || 'APPROVED'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        <div className="col-lg-5">
          <div className="card dash-card p-3 p-md-4 bg-white">
            <h6 className="fw-black text-dark mb-3" style={{ fontWeight: 800 }}>Latest Stall Inquiries</h6>
            <div className="d-flex flex-column gap-2">
              <div className="p-2.5 bg-light rounded-3 border">
                <strong className="d-block text-dark fs-7 fw-bold">Pooja Sharma</strong>
                <p className="text-secondary fs-8 mb-1">Inquiry about Tarang Utsav 2026 Margao stall availability.</p>
                <small className="text-primary fw-bold fs-8">2 hours ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}