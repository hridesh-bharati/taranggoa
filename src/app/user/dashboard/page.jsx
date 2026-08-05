// src\app\user\dashboard\page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { communityService } from '@/services/community.service';
import { profileController } from '@/controllers/profile.controller';
import {
  FileText,
  Heart,
  MessageSquare,
  Image as ImageIcon,
  Sparkles,
  Clock,
  TrendingUp,
  ArrowUpRight,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function UserDashboardConsole() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (user?.uid) {
      const cached = profileController.getCache(user.uid);
      if (cached && isMounted) setProfileData(cached);
      profileController.fetchProfile(user.uid, user.email, (fresh) => {
        if (isMounted) setProfileData(fresh);
      });

      // Real-time listener for user's community posts and interactions
      const unsubscribe = communityService.subscribeToCommunityPosts((livePosts) => {
        if (!isMounted) return;
        const myPosts = livePosts.filter(p => p.authorId === user.uid);
        setPosts(myPosts);
        setLoading(false);
      });

      return () => {
        isMounted = false;
        if (typeof unsubscribe === 'function') unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, [user]);

  const totalPosts = posts.length;
  const totalLikes = posts.reduce((acc, p) => acc + (p.likes?.length || 0), 0);
  const totalComments = posts.reduce((acc, p) => acc + (p.commentsCount || 0), 0);
  const totalMedia = posts.filter(p => p.mediaUrl).length;

  return (
    <div className="container-fluid p-0">

      {/* Top Banner */}
      <div className="usr-top-banner mb-4">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
          <div>
            <h4 className="fw-black mb-1 fs-4 fs-md-3 d-flex align-items-center gap-2">
              <Sparkles size={22} className="text-warning" /> User Member Console
            </h4>
            <small className="opacity-90 fw-medium d-flex align-items-center gap-1.5 fs-8">
              <Clock size={13} /> Session Active • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </small>
          </div>

          <span className="badge bg-white text-dark rounded-pill px-3 py-1.5 fw-bold fs-8 align-self-start align-self-md-auto">
            • Account Verified
          </span>
        </div>
      </div>

      {/* STAT CARDS (Real-time DB Counts) */}
      <div className="row g-2.5 g-md-3 mb-4">

        {/* Posts */}
        <div className="col-6 col-xl-3">
          <div className="usr-card usr-card-purple p-3 p-md-3.5 h-100 position-relative">
            <FileText size={50} className="usr-card-icon-bg" />
            <div className="d-flex align-items-center justify-content-between mb-1.5">
              <span className="fw-bold fs-9 fs-md-8 text-uppercase opacity-90 text-truncate">MY POSTS</span>
              <div className="bg-white bg-opacity-20 rounded-circle p-1.5 d-flex align-items-center justify-content-center">
                <FileText size={15} className="text-white" />
              </div>
            </div>
            <h3 className="fw-black mb-0 fs-2 fs-md-1 font-mono">{loading ? '...' : totalPosts}</h3>
          </div>
        </div>

        {/* Likes */}
        <div className="col-6 col-xl-3">
          <div className="usr-card usr-card-cyan p-3 p-md-3.5 h-100 position-relative">
            <Heart size={50} className="usr-card-icon-bg" />
            <div className="d-flex align-items-center justify-content-between mb-1.5">
              <span className="fw-bold fs-9 fs-md-8 text-uppercase opacity-90 text-truncate">LIKES</span>
              <div className="bg-white bg-opacity-20 rounded-circle p-1.5 d-flex align-items-center justify-content-center">
                <Heart size={15} className="text-white" />
              </div>
            </div>
            <h3 className="fw-black mb-0 fs-2 fs-md-1 font-mono">{loading ? '...' : totalLikes}</h3>
          </div>
        </div>

        {/* Comments */}
        <div className="col-6 col-xl-3">
          <div className="usr-card usr-card-orange p-3 p-md-3.5 h-100 position-relative">
            <MessageSquare size={50} className="usr-card-icon-bg" />
            <div className="d-flex align-items-center justify-content-between mb-1.5">
              <span className="fw-bold fs-9 fs-md-8 text-uppercase opacity-90 text-truncate">DISCUSSIONS</span>
              <div className="bg-white bg-opacity-20 rounded-circle p-1.5 d-flex align-items-center justify-content-center">
                <MessageSquare size={15} className="text-white" />
              </div>
            </div>
            <h3 className="fw-black mb-0 fs-2 fs-md-1 font-mono">{loading ? '...' : totalComments}</h3>
          </div>
        </div>

        {/* Media */}
        <div className="col-6 col-xl-3">
          <div className="usr-card usr-card-pink p-3 p-md-3.5 h-100 position-relative">
            <ImageIcon size={50} className="usr-card-icon-bg" />
            <div className="d-flex align-items-center justify-content-between mb-1.5">
              <span className="fw-bold fs-9 fs-md-8 text-uppercase opacity-90 text-truncate">MEDIA</span>
              <div className="bg-white bg-opacity-20 rounded-circle p-1.5 d-flex align-items-center justify-content-center">
                <ImageIcon size={15} className="text-white" />
              </div>
            </div>
            <h3 className="fw-black mb-0 fs-2 fs-md-1 font-mono">{loading ? '...' : totalMedia}</h3>
          </div>
        </div>

      </div>

      {/* Widgets Section */}
      <div className="row g-3 g-md-4 align-items-start">

        {/* Left Recent Activity */}
        <div className="col-12 col-lg-8">
          <div className="usr-card bg-white p-3 p-md-4">
            <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
              <div>
                <h6 className="fw-bold text-dark mb-0 fs-6 d-flex align-items-center gap-2">
                  <TrendingUp size={18} className="text-primary" /> My Recent Activity
                </h6>
                <small className="text-muted fs-8">Your published community updates</small>
              </div>
              <Link href="/user/user-post" className="btn btn-sm btn-light border rounded-pill px-3 py-1 fw-bold fs-8 text-primary">
                View All <ArrowUpRight size={13} />
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-4"><Loader2 className="spinner-border text-primary spinner-border-sm" /> Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-4 bg-light rounded-3">
                <p className="text-muted fw-medium fs-8 mb-0">No published posts yet. Share something with the community!</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-2">
                {posts.slice(0, 5).map((post) => (
                  <div key={post.id} className="p-2.5 p-md-3 bg-light rounded-3 border d-flex align-items-center justify-content-between gap-2">
                    <div className="overflow-hidden">
                      <h6 className="fw-bold text-dark mb-0.5 fs-7 text-truncate">{post.title || post.caption}</h6>
                      <small className="text-muted fs-8">Type: {post.postType === 'blog' ? 'Article' : 'Quick Post'}</small>
                    </div>

                    <div className="d-flex align-items-center gap-2.5 text-muted fs-8 fw-bold flex-shrink-0">
                      <span><Heart size={13} className="text-danger me-1" />{post.likes?.length || 0}</span>
                      <span><MessageSquare size={13} className="text-primary me-1" />{post.commentsCount || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Account Overview */}
        <div className="col-12 col-lg-4">
          <div className="usr-card bg-white p-3 p-md-4">
            <h6 className="fw-bold text-dark border-bottom pb-3 mb-3 fs-6">Account Overview</h6>

            <div className="text-center py-2 mb-2">
              <div className="rounded-circle overflow-hidden border border-3 border-primary shadow-sm mx-auto mb-2" style={{ width: 68, height: 68 }}>
                {profileData?.photoURL ? (
                  <img src={profileData.photoURL} alt="" className="w-100 h-100 object-fit-cover" />
                ) : (
                  <div className="w-100 h-100 bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-4">
                    {profileData?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <h6 className="fw-bold text-dark mb-0 fs-7">{profileData?.name || user?.email?.split('@')[0] || 'Member'}</h6>
              <small className="text-muted fs-8 d-block">{profileData?.about || profileData?.description || 'Verified Member'}</small>
            </div>

            <div className="d-flex flex-column gap-2 fs-8 border-top pt-3">
              <div className="d-flex justify-content-between text-muted fw-semibold">
                <span>Email:</span>
                <span className="text-dark fw-bold text-truncate ms-2" style={{ maxWidth: 150 }}>{user?.email}</span>
              </div>
              <div className="d-flex justify-content-between text-muted fw-semibold">
                <span>Mobile:</span>
                <span className="text-dark fw-bold">{profileData?.mobile || 'Not provided'}</span>
              </div>
            </div>

            <Link href="/user/user-profile" className="btn text-white w-100 rounded-pill mt-3 py-2 fw-bold fs-8 shadow-sm" style={{ background: '#f15a24' }}>
              Edit Profile
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}

