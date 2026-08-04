'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Store, Inbox, Image as GalleryIcon, Loader2, ArrowUpRight } from 'lucide-react';
import { userService } from '@/services/user.service';
import { contactService } from '@/services/contact.service';
import { mediaService } from '@/services/media.service';

export default function AdminDashboardPage() {
  const [members, setMembers] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [mediaCount, setMediaCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        const userData = await userService.getAllUsers();
        if (isMounted) setMembers(userData || []);

        const inquiryData = await contactService.getAllInquiries();
        if (isMounted) setInquiries(inquiryData || []);

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

  return (
    <div className="container-fluid px-2 px-md-3 py-2 pb-5 mb-4">
      
      {/* Top Banner */}
      <div 
        className="mb-3 mb-md-4 d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 p-3 p-md-4 rounded-4 shadow-sm text-white"
        style={{ background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)' }}
      >
        <div>
          <h3 className="fw-extrabold m-0 text-white fs-4 fs-md-3" style={{ fontWeight: 900 }}>
            <i className="bi bi-speedometer2 me-2"></i>Admin Console
          </h3>
          <p className="m-0 text-white-50 fs-7 mt-1 fw-semibold">
            <i className="bi bi-calendar-event me-1"></i> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        <span className="badge bg-white text-dark px-3 py-2 rounded-pill fw-bold shadow-sm fs-7 align-self-start align-self-sm-auto">
          • Session Active
        </span>
      </div>

      {/* Stat Cards with Watermark */}
      <div className="row g-2 g-md-3 mb-4">
        {/* Total Members Card */}
        <div className="col-6 col-xl-3">
          <Link href="/admin/members" className="text-decoration-none">
            <div 
              className="card border-0 rounded-4 p-3 h-100 text-white position-relative overflow-hidden shadow-sm hover-scale transition-all"
              style={{ background: 'linear-gradient(135deg, #6b21a8 0%, #4c1d95 100%)' }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2 position-relative z-1">
                <Users size={26} className="opacity-90 text-white" />
                <span className="fs-1 fw-bold text-white" style={{ fontWeight: 900 }}>
                  {loading ? '...' : members.length}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between position-relative z-1">
                <small className="fw-bold text-uppercase fs-8 text-white-50" style={{ letterSpacing: '0.5px' }}>Total Members</small>
                <ArrowUpRight size={14} className="text-white opacity-75" />
              </div>
              <Users 
                size={110} 
                className="position-absolute end-0 bottom-0 text-white opacity-10 pointer-events-none" 
                style={{ transform: 'translate(15%, 20%)' }} 
              />
            </div>
          </Link>
        </div>

        {/* All Events Card */}
        <div className="col-6 col-xl-3">
          <Link href="/admin/eventdetails" className="text-decoration-none">
            <div 
              className="card border-0 rounded-4 p-3 h-100 text-white position-relative overflow-hidden shadow-sm hover-scale transition-all"
              style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2 position-relative z-1">
                <Store size={26} className="opacity-90 text-white" />
                <span className="fs-1 fw-bold text-white" style={{ fontWeight: 900 }}>
                  {loading ? '...' : members.filter(m => m.stallBooked || m.category).length || 12}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between position-relative z-1">
                <small className="fw-bold text-uppercase fs-8 text-white-50" style={{ letterSpacing: '0.5px' }}>All Events</small>
                <ArrowUpRight size={14} className="text-white opacity-75" />
              </div>
              <Store 
                size={110} 
                className="position-absolute end-0 bottom-0 text-white opacity-10 pointer-events-none" 
                style={{ transform: 'translate(15%, 20%)' }} 
              />
            </div>
          </Link>
        </div>

        {/* Inquiries Card */}
        <div className="col-6 col-xl-3">
          <Link href="/admin/inbox" className="text-decoration-none">
            <div 
              className="card border-0 rounded-4 p-3 h-100 text-white position-relative overflow-hidden shadow-sm hover-scale transition-all"
              style={{ background: 'linear-gradient(135deg, #f15a24 0%, #c2410c 100%)' }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2 position-relative z-1">
                <Inbox size={26} className="opacity-90 text-white" />
                <span className="fs-1 fw-bold text-white" style={{ fontWeight: 900 }}>
                  {loading ? '...' : inquiries.length}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between position-relative z-1">
                <small className="fw-bold text-uppercase fs-8 text-white-50" style={{ letterSpacing: '0.5px' }}>Inquiries</small>
                <ArrowUpRight size={14} className="text-white opacity-75" />
              </div>
              <Inbox 
                size={110} 
                className="position-absolute end-0 bottom-0 text-white opacity-10 pointer-events-none" 
                style={{ transform: 'translate(15%, 20%)' }} 
              />
            </div>
          </Link>
        </div>

        {/* Expo Media Card */}
        <div className="col-6 col-xl-3">
          <Link href="/admin/gallery" className="text-decoration-none">
            <div 
              className="card border-0 rounded-4 p-3 h-100 text-white position-relative overflow-hidden shadow-sm hover-scale transition-all"
              style={{ background: 'linear-gradient(135deg, #db2777 0%, #9d174d 100%)' }}
            >
              <div className="d-flex align-items-center justify-content-between mb-2 position-relative z-1">
                <GalleryIcon size={26} className="opacity-90 text-white" />
                <span className="fs-1 fw-bold text-white" style={{ fontWeight: 900 }}>
                  {loading ? '...' : mediaCount}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between position-relative z-1">
                <small className="fw-bold text-uppercase fs-8 text-white-50" style={{ letterSpacing: '0.5px' }}>Expo Media</small>
                <ArrowUpRight size={14} className="text-white opacity-75" />
              </div>
              <GalleryIcon 
                size={110} 
                className="position-absolute end-0 bottom-0 text-white opacity-10 pointer-events-none" 
                style={{ transform: 'translate(15%, 20%)' }} 
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Members & Latest Inquiries Section */}
      <div className="row g-3 g-md-4">
        {/* Recent Members */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 rounded-4 p-3 p-md-4 bg-white shadow-sm h-100">
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
              <h6 className="fw-bold text-dark m-0" style={{ fontWeight: 800 }}>Recent Tarang Members</h6>
              <Link href="/admin/members" className="btn btn-sm btn-light text-primary fw-bold rounded-pill fs-8">
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
                      <td colSpan="3" className="text-center py-3 text-muted fs-8">
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
                                src={m.photoURL || m.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100"} 
                                alt="Avatar" 
                                className="rounded-circle object-fit-cover border" 
                                style={{ width: 38, height: 38 }}
                              />
                            </Link>
                          </td>
                          <td>
                            <Link href={`/profile/${memberId}`} className="text-decoration-none">
                              <strong className="d-block text-dark fs-7 fw-bold hover-text-primary">
                                {m.name || 'Member'}
                              </strong>
                            </Link>
                            <small className="text-muted fs-8">{m.email || m.category || 'Member'}</small>
                          </td>
                          <td className="text-end">
                            <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill fw-bold fs-8">
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

        {/* Latest Inquiries */}
        <div className="col-12 col-lg-5">
          <div className="card border-0 rounded-4 p-3 p-md-4 bg-white shadow-sm h-100">
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
              <h6 className="fw-bold text-dark m-0" style={{ fontWeight: 800 }}>Latest Inquiries</h6>
              <Link href="/admin/inbox" className="btn btn-sm btn-light text-primary fw-bold rounded-pill fs-8">
                View Inbox
              </Link>
            </div>

            <div className="d-flex flex-column gap-2">
              {loading ? (
                <div className="text-center py-3">
                  <Loader2 className="spinner-border text-primary spinner-border-sm" />
                </div>
              ) : inquiries.length === 0 ? (
                <p className="text-muted fs-8 text-center py-3 mb-0">No new inquiries received yet.</p>
              ) : (
                inquiries.slice(0, 4).map((inq, i) => (
                  <div key={inq.id || i} className="p-2.5 bg-light rounded-3 border">
                    <strong className="d-block text-dark fs-7 fw-bold">{inq.name || inq.fullName || 'Visitor'}</strong>
                    <p className="text-secondary fs-8 mb-1 text-truncate">{inq.message || inq.query || 'Inquiry regarding stall booking.'}</p>
                    <small className="text-primary fw-bold fs-8">
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