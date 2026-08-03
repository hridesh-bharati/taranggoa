// Feed
'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/context/AuthContext';
import { mediaService } from '@/services/media.service';
import { profileController } from '@/controllers/profile.controller';
import { showToast } from '@/utils/toast';
import { Heart, MessageCircle, Send, Loader2, Clock, Image as ImageIcon, Video, Grid, Trash2, Edit2, Check, X } from 'lucide-react';

export default function PublicFeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [commentsMap, setCommentsMap] = useState({});
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (user?.uid) {
      const cached = profileController.getCache(user.uid);
      if (cached) setUserProfile(cached);
      profileController.fetchProfile(user.uid, user.email, (fresh) => setUserProfile(fresh));
    }

    // 🔴 Real-time Snapshot Subscription for Posts
    const unsubscribe = mediaService.subscribeToPosts((livePosts) => {
      setPosts(livePosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Real-time Comments Listener when Comment Box is Opened
  useEffect(() => {
    if (!activeCommentPost) return;

    const unsubscribeComments = mediaService.subscribeToComments(activeCommentPost, (liveComments) => {
      setCommentsMap(prev => ({ ...prev, [activeCommentPost]: liveComments }));
    });

    return () => unsubscribeComments();
  }, [activeCommentPost]);

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

  const filteredPosts = posts.filter(post => {
    if (filter === 'image') return post.mediaType !== 'video';
    if (filter === 'video') return post.mediaType === 'video';
    return true;
  });

  return (
    <div className="min-vh-100 bg-light">
      <Navbar />

      <div className="container-fluid py-4 px-3 px-lg-5">
        <div className="text-center mb-4">
          <h3 className="fw-black text-dark mb-1">Community Feed</h3>
          <p className="text-muted fs-7 mb-3">Explore posts, updates, and discussions</p>

          <div className="d-inline-flex bg-white p-1 rounded-pill shadow-sm border gap-1">
            <button onClick={() => setFilter('all')} className={`btn btn-sm rounded-pill px-3 py-1.5 fw-bold fs-7 ${filter === 'all' ? 'bg-logo-orange text-white' : 'text-secondary border-0'}`}><Grid size={15} /> All</button>
            <button onClick={() => setFilter('image')} className={`btn btn-sm rounded-pill px-3 py-1.5 fw-bold fs-7 ${filter === 'image' ? 'bg-logo-orange text-white' : 'text-secondary border-0'}`}><ImageIcon size={15} /> Photos</button>
            <button onClick={() => setFilter('video')} className={`btn btn-sm rounded-pill px-3 py-1.5 fw-bold fs-7 ${filter === 'video' ? 'bg-logo-orange text-white' : 'text-secondary border-0'}`}><Video size={15} /> Videos</button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5"><Loader2 className="spinner-border text-primary" /></div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-5 bg-white rounded-4 shadow-sm border p-4 max-w-md mx-auto">
            <p className="text-muted fw-medium mb-0">No posts found in this category.</p>
          </div>
        ) : (
          <div className="row g-4 align-items-start justify-content-center">
            {filteredPosts.map((post) => {
              const isLiked = user && post.likes?.includes(user.uid);
              const isCommentOpen = activeCommentPost === post.id;
              const isPostOwner = user && user.uid === post.authorId;

              // 🔴 Dynamic Avatar Sync: Active user updates instantly reflect
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
                      <video src={post.mediaUrl} controls preload="metadata" className="w-100 bg-black" style={{ height: 260 }} />
                    ) : (
                      <img src={post.mediaUrl} alt="" className="w-100 object-fit-cover" style={{ height: 260 }} />
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

                    {/* Real-time Comments Box */}
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
        )}
      </div>
    </div>
  );
}