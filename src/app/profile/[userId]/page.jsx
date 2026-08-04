'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FollowButton from '@/components/common/FollowButton';
import { profileController } from '@/controllers/profile.controller';
import { communityService } from '@/services/community.service';
import { connectionService } from '@/services/connection.service';
import { 
  UserCheck, 
  FileText, 
  Heart, 
  MessageSquare, 
  Clock, 
  Loader2, 
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  Sparkles,
  Share2,
  ShieldCheck,
  Calendar,
  Award
} from 'lucide-react';

export default function PublicProfilePage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const userId = resolvedParams.userId;

  const [profileData, setProfileData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [connectionsCount, setConnectionsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      profileController.fetchProfile(userId, '', (freshData) => {
        setProfileData(freshData);
      });

      // Fetch User Posts
      const unsubscribePosts = communityService.subscribeToCommunityPosts((allPosts) => {
        const filtered = allPosts.filter(p => p.authorId === userId);
        setUserPosts(filtered);
        setLoading(false);
      });

      // Real-time Connections/Followers Count
      const unsubscribeConnections = connectionService.subscribeUserConnectionsCount(
        userId,
        (count) => setConnectionsCount(count)
      );

      return () => {
        unsubscribePosts();
        unsubscribeConnections();
      };
    }
  }, [userId]);

  const totalLikes = userPosts.reduce((acc, p) => acc + (p.likes?.length || 0), 0);
  const formatTime = (ts) => ts?.toDate ? ts.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently';

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <Loader2 className="spinner-border text-primary" size={32} />
      </div>
    );
  }

  // Stat Box Component
  const StatBox = ({ count, label, textClass, bgClass }) => (
    <div className={`p-3 rounded-3 ${bgClass} border h-100 text-center`}>
      <span className={`fw-black fs-3 d-block font-mono ${textClass}`}>{count}</span>
      <small className="text-dark fw-bold fs-9 text-uppercase tracking-wider d-block mt-1">{label}</small>
    </div>
  );

  return (
    <div className="min-vh-100 bg-light d-flex flex-column" style={{ backgroundColor: '#f4f5f8' }}>
      <Navbar />

      <div className="container py-4 flex-grow-1" style={{ maxWidth: 1000 }}>
        
        {/* BACK TO PREVIOUS PAGE (-1 NAVIGATION) */}
        <button 
          type="button"
          onClick={() => router.back()} 
          className="btn btn-sm btn-white border bg-white rounded-pill px-3 py-1.5 fw-bold text-secondary mb-3 d-inline-flex align-items-center gap-2 shadow-sm"
        >
          <ArrowLeft size={16} /> Back 
        </button>

        {/* 🔵 BLUE HERO HEADER CARD */}
        <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden mb-4">
          
          {/* Cover Banner */}
          <div 
            className="w-100 position-relative" 
            style={{ 
              height: 140, 
              background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)' 
            }}
          >
            <div className="position-absolute top-0 end-0 p-3 opacity-25 text-white">
              <Sparkles size={70} />
            </div>
          </div>

          {/* Profile Header Body */}
          <div className="card-body p-3 p-md-4 pt-0 position-relative">
            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start justify-content-between gap-3">
              
              {/* Avatar + Details Container */}
              <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-3 text-center text-md-start w-100">
                
                {/* Avatar with Offset */}
                <div 
                  className="rounded-circle p-1 border border-4 border-white bg-white shadow-sm flex-shrink-0 position-relative" 
                  style={{ width: 110, height: 110, marginTop: -50, zIndex: 2 }}
                >
                  <div className="rounded-circle overflow-hidden w-100 h-100 bg-light d-flex align-items-center justify-content-center">
                    {profileData?.photoURL ? (
                      <img src={profileData.photoURL} alt="User" className="w-100 h-100 object-fit-cover" />
                    ) : (
                      <div className="w-100 h-100 bg-primary text-white d-flex align-items-center justify-content-center fw-black fs-2">
                        {profileData?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  
                  <span className="position-absolute bottom-0 end-0 bg-success text-white p-1 rounded-circle border border-2 border-white shadow-sm">
                    <ShieldCheck size={12} />
                  </span>
                </div>

                {/* Name, Badge and Designation */}
                <div className="pt-md-2 flex-grow-1">
                  <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 flex-wrap mb-1">
                    <h4 className="fw-black text-dark m-0 fs-4">{profileData?.name || 'Community Member'}</h4>
                    {profileData?.role === 'admin' ? (
                      <span className="badge bg-danger text-white fs-9 px-2.5 py-1 rounded-pill">
                        ADMIN
                      </span>
                    ) : (
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle fs-9 px-2.5 py-1 rounded-pill d-inline-flex align-items-center gap-1">
                        <UserCheck size={12} /> VERIFIED MEMBER
                      </span>
                    )}
                  </div>

                  <p className="text-secondary fs-7 fw-bold mb-0 d-flex align-items-center justify-content-center justify-content-md-start gap-1.5">
                    <Briefcase size={14} className="text-primary flex-shrink-0" /> 
                    <span>{profileData?.about || 'Senior Technical Director.'}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex align-items-center gap-2 pt-2 pt-md-3 flex-shrink-0">
                <FollowButton targetUserId={userId} />
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Profile link copied!');
                  }}
                  className="btn btn-sm btn-light border text-secondary rounded-pill px-3 py-1.5 fw-bold fs-8 d-inline-flex align-items-center gap-1.5 shadow-sm"
                >
                  <Share2 size={13} /> Share Profile
                </button>
              </div>
            </div>

            {/* STAT CARDS */}
            <div className="row g-2 g-md-3 mt-3 pt-3 border-top">
              <div className="col-4">
                <StatBox count={userPosts.length} label="Posts & Articles" textClass="text-primary" bgClass="bg-primary-subtle" />
              </div>
              <div className="col-4">
                <StatBox count={totalLikes} label="Likes Received" textClass="text-danger" bgClass="bg-danger-subtle" />
              </div>
              <div className="col-4">
                <StatBox count={connectionsCount} label="Connections" textClass="text-success" bgClass="bg-success-subtle" />
              </div>
            </div>

          </div>
        </div>

        {/* MAIN RESPONSIVE GRID */}
        <div className="row g-3 g-md-4 align-items-start">
          
          {/* LEFT SIDEBAR */}
          <div className="col-12 col-lg-4 position-sticky" style={{ top: 80 }}>
            <div className="card border-0 rounded-4 shadow-sm bg-white p-3 p-md-4 mb-3">
              <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
                <h6 className="fw-black text-dark mb-0 fs-7 text-uppercase tracking-wider">
                  Profile Highlights
                </h6>
                <Award size={16} className="text-primary" />
              </div>

              <div className="d-flex flex-column gap-2 fs-8">
                {profileData?.email && (
                  <div className="d-flex align-items-center gap-2 text-secondary fw-medium p-2 rounded-3 bg-light">
                    <div className="bg-primary-subtle text-primary p-2 rounded-circle border border-primary-subtle flex-shrink-0">
                      <Mail size={14} />
                    </div>
                    <span className="text-truncate text-dark fw-bold">{profileData.email}</span>
                  </div>
                )}

                {profileData?.mobile && (
                  <div className="d-flex align-items-center gap-2 text-secondary fw-medium p-2 rounded-3 bg-light">
                    <div className="bg-success-subtle text-success p-2 rounded-circle border border-success-subtle flex-shrink-0">
                      <Phone size={14} />
                    </div>
                    <span className="text-dark fw-bold">{profileData.mobile}</span>
                  </div>
                )}

                <div className="d-flex align-items-center gap-2 text-secondary fw-medium p-2 rounded-3 bg-light">
                  <div className="bg-warning-subtle text-warning p-2 rounded-circle border border-warning-subtle flex-shrink-0">
                    <Calendar size={14} />
                  </div>
                  <span className="text-dark fw-bold">Active Network Member</span>
                </div>
              </div>

              {/* Bio Section */}
              {profileData?.description && (
                <div className="border-top pt-3 mt-3">
                  <h6 className="fw-black text-dark fs-8 text-uppercase mb-2">About Bio</h6>
                  <div className="p-3 bg-light rounded-3 border-start border-3 border-warning">
                    <p className="text-dark fs-8 fw-semibold mb-0 text-break" style={{ lineHeight: 1.5 }}>
                      {profileData.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT MAIN FEED */}
          <div className="col-12 col-lg-8">
            <div className="card border-0 rounded-4 shadow-sm bg-white p-3 p-md-4">
              <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
                <h6 className="fw-black text-dark mb-0 fs-7 text-uppercase tracking-wider">
                  Published Activity ({userPosts.length})
                </h6>
                <Sparkles size={14} className="text-warning" />
              </div>

              {userPosts.length === 0 ? (
                <div className="text-center py-5 bg-light rounded-4 border">
                  <FileText size={32} className="text-muted mb-2 opacity-50" />
                  <p className="text-muted fw-medium fs-8 mb-0">No published content shared yet.</p>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {userPosts.map((post) => (
                    <div key={post.id} className="p-3 bg-light rounded-3 border">
                      
                      {/* Post Header */}
                      <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                        <small className="text-muted fs-8 d-flex align-items-center gap-1 fw-bold">
                          <Clock size={11} className="text-primary" /> {formatTime(post.createdAt)}
                        </small>
                        {post.postType === 'blog' && (
                          <span className="badge bg-primary-subtle text-primary border border-primary-subtle fs-9 px-2.5 py-0.5 rounded-pill fw-bold">
                            Article
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      {post.title && <h6 className="fw-bold text-dark mb-1 fs-6">{post.title}</h6>}
                      <p className="fs-7 text-dark fw-medium mb-2 text-break">{post.caption}</p>

                      {/* Media */}
                      {post.mediaUrl && (
                        <div className="rounded-3 overflow-hidden mb-2 bg-black border shadow-sm" style={{ maxHeight: 280 }}>
                          {post.mediaType === 'video' ? (
                            <video src={post.mediaUrl} controls className="w-100" style={{ maxHeight: 280 }} />
                          ) : (
                            <img src={post.mediaUrl} alt="" className="w-100 object-fit-cover" style={{ maxHeight: 280 }} />
                          )}
                        </div>
                      )}

                      {/* Footer Counters */}
                      <div className="d-flex align-items-center justify-content-between border-top pt-2 mt-2 text-muted fs-8 fw-bold">
                        <span className="d-flex align-items-center gap-1.5 text-danger">
                          <Heart size={14} fill="#ef4444" /> {post.likes?.length || 0} Likes
                        </span>
                        <span className="d-flex align-items-center gap-1.5 text-primary">
                          <MessageSquare size={14} /> {post.commentsCount || 0} Discussions
                        </span>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}