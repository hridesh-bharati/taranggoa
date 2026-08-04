'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/context/AuthContext';
import { mediaService } from '@/services/media.service';
import { profileController } from '@/controllers/profile.controller';
import { showToast } from '@/utils/toast';
import { Heart, MessageCircle, Send, Loader2, Clock, Image as ImageIcon, Video, Grid, Trash2, Edit2, Check, X, Sparkles, TrendingUp, Users } from 'lucide-react';

const BATCH_SIZE = 12; // Initial 4x3 Grid (12 Posts)

export default function PublicFeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filter, setFilter] = useState('all');
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [commentsMap, setCommentsMap] = useState({});
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const loaderRef = useRef(null);

  useEffect(() => {
    if (user?.uid) {
      const cached = profileController.getCache(user.uid);
      if (cached) setUserProfile(cached);
      profileController.fetchProfile(user.uid, user.email, (fresh) => setUserProfile(fresh));
    }

    const unsubscribe = mediaService.subscribeToPosts((livePosts) => {
      setPosts(livePosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!activeCommentPost) return;

    const unsubscribeComments = mediaService.subscribeToComments(activeCommentPost, (liveComments) => {
      setCommentsMap(prev => ({ ...prev, [activeCommentPost]: liveComments }));
    });

    return () => unsubscribeComments();
  }, [activeCommentPost]);

  // Filter Posts
  const filteredPosts = posts.filter(post => {
    if (filter === 'image') return post.mediaType !== 'video';
    if (filter === 'video') return post.mediaType === 'video';
    return true;
  });

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  // Infinite Scroll Trigger via IntersectionObserver
  useEffect(() => {
    if (loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + BATCH_SIZE);
            setLoadingMore(false);
          }, 600); // Smooth real-app delay feeling
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore, visibleCount, filteredPosts.length]);

  const handleLike = async (postId) => {
    if (!user) return showToast('error', 'Please login to like');
    try {
      await mediaService.toggleLike(postId, user.uid);
    } catch {
      showToast('error', 'Action failed');
    }
  };

  const handleAddComment = async (postId) => {
    if (!user) return showToast('error', 'Please login to comment');
    if (!newComment.trim()) return;

    try {
      const commentObj = {
        text: newComment.trim(),
        userName: userProfile?.name || user.displayName || user.email.split('@')[0],
        userPhoto: userProfile?.photoURL || '',
        userId: user.uid
      };
      await mediaService.addComment(postId, commentObj);
      setNewComment('');
    } catch {
      showToast('error', 'Failed to add comment');
    }
  };

  const handleSaveEditComment = async (postId, commentId) => {
    if (!editText.trim()) return;
    try {
      await mediaService.editComment(postId, commentId, editText.trim());
      setEditingCommentId(null);
      setEditText('');
    } catch {
      showToast('error', 'Failed to update comment');
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await mediaService.deleteComment(postId, commentId);
    } catch {
      showToast('error', 'Failed to delete comment');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Delete your post?')) return;
    try {
      await mediaService.deletePost(postId);
      showToast('success', 'Post deleted');
    } catch {
      showToast('error', 'Failed to delete post');
    }
  };

  const formatTime = (ts) => ts?.toDate ? ts.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just now';

  const totalPosts = posts.length;
  const imagePosts = posts.filter(p => p.mediaType !== 'video').length;
  const videoPosts = posts.filter(p => p.mediaType === 'video').length;

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 50%, #fff5f5 100%)' }}>
      <Navbar />

      <div className="container-fluid py-4 px-3 px-lg-5">
        {/* Header Topbar */}
        <div className="mb-5">
          <div className="position-relative overflow-hidden rounded-4 p-4 p-md-5 mb-4" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)'
          }}>
            <div className="position-absolute" style={{ top: '-50px', right: '-30px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
            <div className="position-absolute" style={{ bottom: '-70px', left: '-40px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}></div>
            
            <div className="position-relative d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="bg-white bg-opacity-20 rounded-3 p-3 d-flex align-items-center justify-content-center" style={{ backdropFilter: 'blur(10px)' }}>
                  <Sparkles className="text-danger" size={28} />
                </div>
                <div>
                  <h1 className="text-white fw-bold mb-1 display-6" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                    Community Feed
                  </h1>
                  <p className="text-white text-opacity-90 mb-0 fs-6">
                    <Users className="me-1" size={18} />
                    {totalPosts} posts • Stay connected with your community
                  </p>
                </div>
              </div>

              <div className="d-flex gap-3 align-items-center">
                <div className="bg-primary bg-opacity-20 rounded-pill px-4 py-2 d-flex align-items-center gap-2" style={{ backdropFilter: 'blur(10px)' }}>
                  <TrendingUp className="text-white" size={18} />
                  <span className="text-white fw-semibold">Live Feed</span>
                  <span className="bg-success bg-opacity-50 rounded-pill px-2 py-0.5 text-white fs-8">● Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <div className="d-flex flex-wrap gap-2">
              <button
                onClick={() => { setFilter('all'); setVisibleCount(BATCH_SIZE); }}
                className={`btn rounded-pill px-4 py-2 fw-bold transition-all d-flex align-items-center gap-2 ${
                  filter === 'all' ? 'text-white shadow-lg' : 'bg-white text-secondary border-0 shadow-sm'
                }`}
                style={{
                  background: filter === 'all' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                  transform: filter === 'all' ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: filter === 'all' ? '0 8px 25px rgba(102, 126, 234, 0.35)' : '0 2px 8px rgba(0,0,0,0.06)'
                }}
              >
                <Grid size={16} className={filter === 'all' ? 'text-white' : 'text-primary'} />
                <span>All Posts</span>
                <span className={`badge rounded-pill ${filter === 'all' ? 'bg-white bg-opacity-25 text-white' : 'bg-primary bg-opacity-10 text-primary'}`}>
                  {totalPosts}
                </span>
              </button>

              <button
                onClick={() => { setFilter('image'); setVisibleCount(BATCH_SIZE); }}
                className={`btn rounded-pill px-4 py-2 fw-bold transition-all d-flex align-items-center gap-2 ${
                  filter === 'image' ? 'text-white shadow-lg' : 'bg-white text-secondary border-0 shadow-sm'
                }`}
                style={{
                  background: filter === 'image' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 'white',
                  transform: filter === 'image' ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: filter === 'image' ? '0 8px 25px rgba(245, 87, 108, 0.35)' : '0 2px 8px rgba(0,0,0,0.06)'
                }}
              >
                <ImageIcon size={16} className={filter === 'image' ? 'text-white' : 'text-danger'} />
                <span>Photos</span>
                <span className={`badge rounded-pill ${filter === 'image' ? 'bg-white bg-opacity-25 text-white' : 'bg-danger bg-opacity-10 text-danger'}`}>
                  {imagePosts}
                </span>
              </button>

              <button
                onClick={() => { setFilter('video'); setVisibleCount(BATCH_SIZE); }}
                className={`btn rounded-pill px-4 py-2 fw-bold transition-all d-flex align-items-center gap-2 ${
                  filter === 'video' ? 'text-white shadow-lg' : 'bg-white text-secondary border-0 shadow-sm'
                }`}
                style={{
                  background: filter === 'video' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : 'white',
                  transform: filter === 'video' ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: filter === 'video' ? '0 8px 25px rgba(79, 172, 254, 0.35)' : '0 2px 8px rgba(0,0,0,0.06)'
                }}
              >
                <Video size={16} className={filter === 'video' ? 'text-white' : 'text-info'} />
                <span>Videos</span>
                <span className={`badge rounded-pill ${filter === 'video' ? 'bg-white bg-opacity-25 text-white' : 'bg-info bg-opacity-10 text-info'}`}>
                  {videoPosts}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-5">
            <Loader2 className="spinner-border text-primary" size={40} />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm border p-4 max-w-md mx-auto">
            <p className="text-muted fw-medium mb-0">No posts found in this category.</p>
          </div>
        ) : (
          <>
            <div className="row g-4 align-items-start justify-content-center">
              {displayedPosts.map((post) => {
                const isLiked = user && post.likes?.includes(user.uid);
                const isCommentOpen = activeCommentPost === post.id;
                const isPostOwner = user && user.uid === post.authorId;

                const authorAvatar = (isPostOwner && userProfile?.photoURL) 
                  ? userProfile.photoURL 
                  : post.authorPhoto;

                return (
                  <div key={post.id} className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
                      
                      {/* Header */}
                      <div className="p-3 d-flex align-items-center justify-content-between border-bottom">
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
                            {authorAvatar ? <img src={authorAvatar} alt="" className="w-100 h-100 object-fit-cover" /> : <span className="fw-bold text-primary fs-7">{post.authorName?.charAt(0)}</span>}
                          </div>
                          <div>
                            <h6 className="fw-bold text-dark mb-0 fs-7">{post.authorName}</h6>
                            <small className="text-muted fs-8"><Clock size={10} className="me-1" />{formatTime(post.createdAt)}</small>
                          </div>
                        </div>

                        {isPostOwner && (
                          <button onClick={() => handleDeletePost(post.id)} className="btn btn-link text-danger p-0" title="Delete Post">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>

                      {/* Media */}
                      {post.mediaType === 'video' ? (
                        <video 
                          src={post.mediaUrl} 
                          controls 
                          preload="metadata" 
                          className="w-100 bg-black" 
                          style={{ height: 260, cursor: 'pointer' }}
                          onClick={() => setSelectedMedia({ url: post.mediaUrl, type: 'video', caption: post.caption })} 
                        />
                      ) : (
                        <img 
                          src={post.mediaUrl} 
                          alt="" 
                          className="w-100 object-fit-cover" 
                          style={{ height: 260, cursor: 'pointer' }} 
                          onClick={() => setSelectedMedia({ url: post.mediaUrl, type: 'image', caption: post.caption })}
                        />
                      )}

                      {/* Caption & Actions */}
                      <div className="p-3">
                        <p className="fs-7 text-dark fw-medium mb-3">{post.caption}</p>
                        <div className="d-flex align-items-center gap-4 border-top pt-2">
                          <button onClick={() => handleLike(post.id)} className={`btn p-0 border-0 fs-7 fw-bold ${isLiked ? 'text-danger' : 'text-secondary'}`}>
                            <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} className="me-1" />{post.likes?.length || 0}
                          </button>
                          <button onClick={() => setActiveCommentPost(isCommentOpen ? null : post.id)} className="btn p-0 border-0 fs-7 fw-bold text-secondary">
                            <MessageCircle size={18} className="me-1" />{post.commentsCount || 0}
                          </button>
                        </div>
                      </div>

                      {/* Comments Box */}
                      {isCommentOpen && (
                        <div className="bg-light p-3 border-top">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="fw-bold fs-8 text-dark">Discussion</span>
                            <button onClick={() => setActiveCommentPost(null)} className="btn btn-sm btn-link text-secondary p-0"><X size={14} /></button>
                          </div>

                          <div className="d-flex flex-column gap-2 mb-3 overflow-auto" style={{ maxHeight: 220 }}>
                            {(commentsMap[post.id] || []).length === 0 ? (
                              <small className="text-muted text-center py-2">No comments yet.</small>
                            ) : (
                              (commentsMap[post.id] || []).map((c) => {
                                const isOwner = user && user.uid === c.userId;
                                const commenterAvatar = (isOwner && userProfile?.photoURL) ? userProfile.photoURL : c.userPhoto;

                                return (
                                  <div key={c.id} className="bg-white p-2.5 rounded-3 border d-flex justify-content-between align-items-start gap-2">
                                    <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 28, height: 28 }}>
                                      {commenterAvatar ? <img src={commenterAvatar} alt="" className="w-100 h-100 object-fit-cover" /> : <span className="fw-bold text-primary fs-8">{c.userName?.charAt(0)}</span>}
                                    </div>

                                    <div className="flex-grow-1 overflow-hidden">
                                      <div className="d-flex align-items-center justify-content-between mb-1">
                                        <span className="fw-bold fs-8 text-dark">{c.userName}</span>
                                        <small className="text-muted fs-8">{formatTime(c.createdAt)}</small>
                                      </div>

                                      {editingCommentId === c.id ? (
                                        <div className="input-group input-group-sm mt-1">
                                          <input type="text" className="form-control fs-8" value={editText} onChange={(e) => setEditText(e.target.value)} />
                                          <button onClick={() => handleSaveEditComment(post.id, c.id)} className="btn btn-success btn-sm"><Check size={12} /></button>
                                          <button onClick={() => setEditingCommentId(null)} className="btn btn-light btn-sm border"><X size={12} /></button>
                                        </div>
                                      ) : (
                                        <span className="fs-7 text-dark fw-normal text-break d-block">{c.text}</span>
                                      )}
                                    </div>

                                    {isOwner && editingCommentId !== c.id && (
                                      <div className="d-flex gap-1 flex-shrink-0">
                                        <button onClick={() => { setEditingCommentId(c.id); setEditText(c.text); }} className="btn btn-link text-primary p-0"><Edit2 size={12} /></button>
                                        <button onClick={() => handleDeleteComment(post.id, c.id)} className="btn btn-link text-danger p-0"><Trash2 size={12} /></button>
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            )}
                          </div>

                          <div className="input-group input-group-sm shadow-sm rounded-3 overflow-hidden">
                            <input
                              type="text"
                              className="form-control fs-8 border-0"
                              placeholder="Add a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                            />
                            <button onClick={() => handleAddComment(post.id)} className="btn bg-logo-orange text-white"><Send size={13} /></button>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll Loader Target */}
            <div ref={loaderRef} className="text-center py-4 my-2">
              {loadingMore ? (
                <div className="d-inline-flex align-items-center gap-2 bg-white px-4 py-2 rounded-pill shadow-sm border">
                  <Loader2 className="spinner-border spinner-border-sm text-primary" size={16} />
                  <span className="fs-7 text-secondary fw-semibold">Loading more posts...</span>
                </div>
              ) : !hasMore && displayedPosts.length > 0 ? (
                <small className="text-muted fw-medium fs-8">You've reached the end of the feed ✨</small>
              ) : null}
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-75" 
          style={{ zIndex: 1050 }}
          onClick={() => setSelectedMedia(null)}
        >
          <div className="position-relative p-3 max-w-lg w-100 text-center" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedMedia(null)} 
              className="position-absolute top-0 end-0 m-3 btn btn-dark rounded-circle p-2 d-flex align-items-center justify-content-center shadow"
              style={{ width: 36, height: 36, zIndex: 1060 }}
            >
              <X size={20} />
            </button>

            {selectedMedia.type === 'video' ? (
              <video src={selectedMedia.url} controls autoPlay className="w-100 rounded-4 shadow-lg bg-black" style={{ maxHeight: '80vh' }} />
            ) : (
              <img src={selectedMedia.url} alt="" className="w-100 rounded-4 shadow-lg object-fit-contain" style={{ maxHeight: '80vh' }} />
            )}

            {selectedMedia.caption && (
              <p className="text-white mt-3 fs-6 px-3 py-2 bg-dark bg-opacity-50 rounded-3 d-inline-block">
                {selectedMedia.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}