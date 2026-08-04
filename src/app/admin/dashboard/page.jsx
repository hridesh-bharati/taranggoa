'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Store, Inbox, Image as GalleryIcon, Loader2, ArrowUpRight } from 'lucide-react';
import { userService } from '@/services/user.service';
import { contactService } from '@/services/contact.service';
import { mediaService } from '@/services/media.service';
import { eventController } from '@/controllers/event.controller';

// Recharts Components
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

function MiniDonutChart({ value, color = '#ffffff' }) {
  const chartData = [
    { name: 'Active', value: value || 0 },
    { name: 'Remaining', value: value === 0 ? 1 : Math.max(20 - value, 1) },
  ];

  return (
    <div className="position-relative d-inline-flex align-items-center justify-content-center" style={{ width: 68, height: 68 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={22}
            outerRadius={28}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="rgba(255, 255, 255, 0.25)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <span className="position-absolute fs-5 text-white fw-bold">
        {value}
      </span>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [members, setMembers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [eventsCount, setEventsCount] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);
  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        const userData = await userService.getAllUsers();
        if (isMounted) {
          const userList = userData || [];
          setMembers(userList);

          const monthCounts = {};
          const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

          userList.forEach((u) => {
            let dateObj = null;
            if (u.createdAt?.toDate) {
              dateObj = u.createdAt.toDate();
            } else if (u.createdAt) {
              dateObj = new Date(u.createdAt);
            } else {
              dateObj = new Date();
            }

            const monthName = monthsOrder[dateObj.getMonth()];
            monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
          });

          const currentMonthIndex = new Date().getMonth();
          const dynamicGrowth = [];
          let cumulativeUsers = 0;

          for (let i = 5; i >= 0; i--) {
            const idx = (currentMonthIndex - i + 12) % 12;
            const mName = monthsOrder[idx];
            cumulativeUsers += (monthCounts[mName] || 0);
            dynamicGrowth.push({
              month: mName,
              users: cumulativeUsers || userList.length || 0,
            });
          }

          setGrowthData(dynamicGrowth);
        }

        const inquiryData = await contactService.getAllInquiries();
        if (isMounted) setInquiries(inquiryData || []);

        const allEvents = await eventController.fetchAllEvents();
        if (isMounted) setEventsCount(allEvents?.length || 0);

        const unsubMedia = mediaService.subscribeToPosts((liveMedia) => {
          if (isMounted) setMediaCount(liveMedia?.length || 0);
        });

        return () => {
          if (typeof unsubMedia === 'function') unsubMedia();
        };
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const metricsData = [
    { name: 'Members', count: members.length, color: '#8b5cf6' },
    { name: 'Events', count: eventsCount, color: '#0284c7' },
    { name: 'Inquiries', count: inquiries.length, color: '#f97316' },
    { name: 'Media', count: mediaCount, color: '#ec4899' },
  ];

  return (
    <div className="container-fluid px-2 px-md-3 py-2 pb-5 mb-4">
      {/* Top Banner */}
      <div
        className="mb-3 mb-md-4 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 p-3 p-md-4 rounded-4 shadow-sm text-white"
        style={{ background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)' }}
      >
        <div>
          <h3 className="m-0 text-white fs-4 fs-md-3 fw-bold">
            <i className="bi bi-speedometer2 me-2"></i>Admin Console
          </h3>
          <p className="m-0 text-white-50 small mt-1 fw-semibold">
            <i className="bi bi-calendar-event me-1"></i>{' '}
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-bold shadow-sm small align-self-start align-self-sm-auto d-inline-flex align-items-center gap-2">
          <span className="spinner-grow spinner-grow-sm text-danger p-1" role="status" aria-hidden="true" style={{ width: '8px', height: '8px' }}></span>
          <span>Session Active</span>
        </span>
      </div>

      {/* 🌟 Glowing & Curved Stat Cards with Bottom Right Watermark */}
      <div className="row g-3 mb-4">
        {/* Total Members Card */}
        <div className="col-6 col-xl-3">
          <Link href="/admin/members" className="text-decoration-none">
            <div className="card dash-card stat-card-purple p-3 p-md-4 h-100">
              <Users size={120} className="card-watermark-right text-white" />
              <div className="d-flex align-items-center justify-content-between mb-3 position-relative z-1">
                <Users size={32} className="text-white" />
                <MiniDonutChart value={loading ? 0 : members.length} color="#ffffff" />
              </div>
              <div className="d-flex align-items-center justify-content-between position-relative z-1 mt-2">
                <small className="fw-bold text-uppercase text-white opacity-90 fs-8">
                  Total Members
                </small>
                <ArrowUpRight size={16} className="text-white opacity-75" />
              </div>
            </div>
          </Link>
        </div>

        {/* All Events Card */}
        <div className="col-6 col-xl-3">
          <Link href="/admin/eventdetails" className="text-decoration-none">
            <div className="card dash-card stat-card-cyan p-3 p-md-4 h-100">
              <Store size={130} className="card-watermark-right text-white" />
              <div className="d-flex align-items-center justify-content-between mb-3 position-relative z-1">
                <Store size={32} className="text-white" />
                <MiniDonutChart value={loading ? 0 : eventsCount} color="#ffffff" />
              </div>
              <div className="d-flex align-items-center justify-content-between position-relative z-1 mt-2">
                <small className="fw-bold text-uppercase text-white opacity-90 fs-8">
                  All Events
                </small>
                <ArrowUpRight size={16} className="text-white opacity-75" />
              </div>
            </div>
          </Link>
        </div>

        {/* Inquiries Card */}
        <div className="col-6 col-xl-3">
          <Link href="/admin/inbox" className="text-decoration-none">
            <div className="card dash-card stat-card-orange p-3 p-md-4 h-100">
              <Inbox size={130} className="card-watermark-right text-white" />
              <div className="d-flex align-items-center justify-content-between mb-3 position-relative z-1">
                <Inbox size={32} className="text-white" />
                <MiniDonutChart value={loading ? 0 : inquiries.length} color="#ffffff" />
              </div>
              <div className="d-flex align-items-center justify-content-between position-relative z-1 mt-2">
                <small className="fw-bold text-uppercase text-white opacity-90 fs-8">
                  Inquiries
                </small>
                <ArrowUpRight size={16} className="text-white opacity-75" />
              </div>
            </div>
          </Link>
        </div>

        {/* Media Card */}
        <div className="col-6 col-xl-3">
          <Link href="/admin/gallery" className="text-decoration-none">
            <div className="card dash-card stat-card-pink p-3 p-md-4 h-100">
              <GalleryIcon size={130} className="card-watermark-right text-white" />
              <div className="d-flex align-items-center justify-content-between mb-3 position-relative z-1">
                <GalleryIcon size={32} className="text-white" />
                <MiniDonutChart value={loading ? 0 : mediaCount} color="#ffffff" />
              </div>
              <div className="d-flex align-items-center justify-content-between position-relative z-1 mt-2">
                <small className="fw-bold text-uppercase text-white opacity-90 fs-8">
                  Expo Media
                </small>
                <ArrowUpRight size={16} className="text-white opacity-75" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="row g-3 g-md-4 mb-4">
        {/* User Registration Growth Area Chart */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 rounded-4 p-3 p-md-4 bg-white shadow-sm h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="fw-bold text-dark m-0">User Registration Growth</h6>
              <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1 fw-bold small">
                Live DB Trend
              </span>
            </div>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="userGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0a66c2" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0a66c2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="users" stroke="#0a66c2" strokeWidth={3} fillOpacity={1} fill="url(#userGrowthGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Metrics Distribution Bar Chart */}
        <div className="col-12 col-lg-5">
          <div className="card border-0 rounded-4 p-3 p-md-4 bg-white shadow-sm h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h6 className="fw-bold text-dark m-0">Metrics Distribution</h6>
              <span className="badge bg-light text-secondary rounded-pill px-3 py-1 fw-bold small">
                Live DB Overview
              </span>
            </div>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metricsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {metricsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Members & Latest Inquiries */}
      <div className="row g-3 g-md-4">
        <div className="col-12 col-lg-7">
          <div className="card border-0 rounded-4 p-3 p-md-4 bg-white shadow-sm h-100">
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
              <h6 className="fw-bold text-dark m-0">Recent Tarang Members</h6>
              <Link href="/admin/members" className="btn btn-sm btn-light text-primary fw-bold rounded-pill small">
                View All
              </Link>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        <Loader2 className="spinner-border text-primary spinner-border-sm me-2" /> Loading members...
                      </td>
                    </tr>
                  ) : members.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-3 text-muted small">
                        No registered members found in database.
                      </td>
                    </tr>
                  ) : (
                    members.slice(0, 5).map((m, idx) => {
                      const memberId = m.uid || m.id;
                      return (
                        <tr key={memberId || idx}>
                          <td style={{ width: '45px' }}>
                            <Link href={`/profile/${memberId}`} className="text-decoration-none">
                              <img
                                src={m.photoURL || m.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100'}
                                alt="Avatar"
                                className="rounded-circle object-fit-cover border"
                                style={{ width: 38, height: 38 }}
                              />
                            </Link>
                          </td>
                          <td>
                            <Link href={`/profile/${memberId}`} className="text-decoration-none">
                              <strong className="d-block text-dark small fw-bold hover-text-primary">
                                {m.name || 'Member'}
                              </strong>
                            </Link>
                            <small className="text-muted">{m.email || m.category || 'Member'}</small>
                          </td>
                          <td className="text-end">
                            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill fw-bold small">
                              {m.status || 'APPROVED'}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="card border-0 rounded-4 p-3 p-md-4 bg-white shadow-sm h-100">
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
              <h6 className="fw-bold text-dark m-0">Latest Inquiries</h6>
              <Link href="/admin/inbox" className="btn btn-sm btn-light text-primary fw-bold rounded-pill small">
                View Inbox
              </Link>
            </div>

            <div className="d-flex flex-column gap-2">
              {loading ? (
                <div className="text-center py-3">
                  <Loader2 className="spinner-border text-primary spinner-border-sm" />
                </div>
              ) : inquiries.length === 0 ? (
                <p className="text-muted small text-center py-3 mb-0">No new inquiries received yet.</p>
              ) : (
                inquiries.slice(0, 4).map((inq, i) => (
                  <div key={inq.id || i} className="p-3 bg-light rounded-3 border">
                    <strong className="d-block text-dark small fw-bold">{inq.name || inq.fullName || 'Visitor'}</strong>
                    <p className="text-secondary small mb-1 text-truncate">
                      {inq.message || inq.query || 'Inquiry regarding stall booking.'}
                    </p>
                    <small className="text-primary fw-bold">
                      {inq.createdAt?.toDate ? inq.createdAt.toDate().toLocaleDateString() : 'Recent'}
                    </small>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}