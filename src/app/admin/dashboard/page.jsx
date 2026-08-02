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
      
      {/* 1. Purple Header Banner */}
      <div className="admin-top-banner mb-3 mb-md-4 d-flex align-items-center justify-content-between">
        <div>
          <h3 className="fw-extrabold m-0 text-white fs-4 fs-md-3" style={{ fontWeight: 900 }}>
            <i className="bi bi-speedometer2 me-2"></i>Admin Console
          </h3>
          <p className="m-0 text-white opacity-75 fs-7 mt-1">
            <i className="bi bi-calendar-event me-1"></i> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-bold shadow-sm fs-7 d-none d-sm-inline-block">
          • Session 2026 Active
        </span>
      </div>

      {/* 2. Top 4 Stat Cards (2 per row on Mobile: col-6) */}
      <div className="row g-2 g-md-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card dash-card stat-card-purple p-3 h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Users size={24} className="opacity-75" />
              <span className="fs-3 fw-extrabold">{loading ? '...' : members.length || 128}</span>
            </div>
            <small className="fw-bold text-uppercase opacity-75 fs-8 d-block text-truncate">Total Members</small>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card dash-card stat-card-cyan p-3 h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Store size={24} className="opacity-75" />
              <span className="fs-3 fw-extrabold">12</span>
            </div>
            <small className="fw-bold text-uppercase opacity-75 fs-8 d-block text-truncate">Stall Bookings</small>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card dash-card stat-card-orange p-3 h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <Inbox size={24} className="opacity-75" />
              <span className="fs-3 fw-extrabold">08</span>
            </div>
            <small className="fw-bold text-uppercase opacity-75 fs-8 d-block text-truncate">Inquiries</small>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="card dash-card stat-card-pink p-3 h-100">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <GalleryIcon size={24} className="opacity-75" />
              <span className="fs-3 fw-extrabold">24</span>
            </div>
            <small className="fw-bold text-uppercase opacity-75 fs-8 d-block text-truncate">Expo Banners</small>
          </div>
        </div>
      </div>

      {/* 3. Performance & Split Charts */}
      <div className="row g-3 g-md-4 mb-4">
        <div className="col-lg-8">
          <div className="card dash-card p-3 p-md-4 bg-white h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="fw-extrabold text-dark m-0">Weekly Stall Bookings</h6>
              <span className="badge bg-light text-primary border fw-bold">Live Sync</span>
            </div>
            <div className="bg-light rounded-4 p-4 text-center d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
              <p className="text-muted fw-bold mb-0 fs-7">📊 Weekly Exhibition Performance Chart</p>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card dash-card p-3 p-md-4 bg-white h-100">
            <h6 className="fw-extrabold text-dark mb-3">Artisan Category Split</h6>
            <div className="bg-light rounded-4 p-4 text-center d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
              <p className="text-muted fw-bold mb-0 fs-7">🍩 Category Split Chart</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recent Members & Inquiries */}
      <div className="row g-3 g-md-4">
        <div className="col-lg-7">
          <div className="card dash-card p-3 p-md-4 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="fw-extrabold text-dark m-0">Recent Tarang Members</h6>
              <Link href="/admin/members" className="btn btn-sm btn-light text-primary fw-bold rounded-pill fs-8">View All</Link>
            </div>

            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <tbody>
                  {loading ? (
                    <tr><td className="text-center py-3 fs-7">Loading members...</td></tr>
                  ) : members.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-2">
                        <div className="d-flex align-items-center gap-2">
                          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" alt="Avatar" className="avatar-img" />
                          <div className="text-start">
                            <strong className="d-block text-dark fs-7">Sunita Naik</strong>
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
                          <strong className="d-block text-dark fs-7">{m.name || 'Sunita Naik'}</strong>
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
            <h6 className="fw-extrabold text-dark mb-3">Latest Stall Inquiries</h6>
            <div className="d-flex flex-column gap-2">
              <div className="p-2.5 bg-light rounded-3 border">
                <strong className="d-block text-dark fs-7">Pooja Sharma</strong>
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