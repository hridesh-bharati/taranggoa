'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useAuth } from '@/context/AuthContext';
import { communityService } from '@/services/community.service';
import { communityController } from '@/controllers/community.controller';
import { profileController } from '@/controllers/profile.controller';
import { userService } from '@/services/user.service';
import { showToast } from '@/utils/toast';
import { 
  Heart, 
  MessageSquare, 
  Send, 
  Loader2, 
  Clock, 
  Image as ImageIcon, 
  Video, 
  Trash2, 
  Edit2, 
  Check, 
  X,
  FileText,
  Share2,
  TrendingUp,
  UserCheck,
  Sparkles,
  Users
} from 'lucide-react';

export default function LinkedInCommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🔴 FIX: Added articleLimit state (Default 10)
  const [articleLimit, setArticleLimit] = useState(10);

  // Post Creator States
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [postType, setPostType] = useState('quick');
  const [caption, setCaption] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('image');
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  // Discussion States
  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [commentsMap, setCommentsMap] = useState({});
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  const captionInputRef = useRef(null);
  const blogTitleInputRef = useRef(null);

  useEffect(() => {
    if (user?.uid) {
      const cached = profileController.getCache(user.uid);
      if (cached) setUserProfile(cached);
      profileController.fetchProfile(user.uid, user.email, (fresh) => setUserProfile(fresh));
    }

    loadUsers();

    const unsubscribe = communityService.subscribeToCommunityPosts((livePosts) => {
      setPosts(livePosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!activeCommentPost) return;
    const unsubscribeComments = communityService.subscribeToDiscussions(activeCommentPost, (liveComments) => {
      setCommentsMap(prev => ({ ...prev, [activeCommentPost]: liveComments }));
    });
    return () => unsubscribeComments();
  }, [activeCommentPost]);

  useEffect(() => {
    if (isComposerOpen) {
      setTimeout(() => {
        if (postType === 'blog' && blogTitleInputRef.current) {
          blogTitleInputRef.current.focus();
        } else if (captionInputRef.current) {
          captionInputRef.current.focus();
        }
      }, 100);
    }
  }, [isComposerOpen, postType]);

  const loadUsers = async () => {
    try {
      const allUsers = await userService.getAllUsers();
      setActiveUsers(allUsers);
    } catch {
      // Graceful handling
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setFileType(selected.type.startsWith('video/') ? 'video' : 'image');
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!user) return showToast('error', 'Please login to post');
    if (!caption.trim()) return showToast('error', 'Please enter post content');

    setUploading(true);
    setUploadProgress(0);

    let mediaUrl = '';
    try {
      if (file) {
        mediaUrl = await communityController.uploadMedia(file, user.uid, (percent) => {
          setUploadProgress(percent);
        });
      }

      await communityController.publishPost({
        postType,
        title: blogTitle.trim(),
        caption: caption.trim(),
        mediaUrl,
        mediaType: fileType,
        authorName: userProfile?.name || user.displayName || user.email.split('@')[0],
        authorEmail: user.email,
        authorPhoto: userProfile?.photoURL || '',
        authorId: user.uid
      });

      setCaption('');
      setBlogTitle('');
      setFile(null);
      setPreview(null);
      setPostType('quick');
      setIsComposerOpen(false);
    } catch {
      // Handled in controller
    } finally {
      setUploading(false);
    }
  };

  const handleAddComment = async (postId) => {
    if (!user) return showToast('error', 'Please login to comment');
    if (!newComment.trim()) return;

    try {
      await communityService.addDiscussion(postId, {
        text: newComment.trim(),
        userName: userProfile?.name || user.displayName || user.email.split('@')[0],
        userPhoto: userProfile?.photoURL || '',
        userId: user.uid
      });
      setNewComment('');
    } catch {
      showToast('error', 'Failed to add comment');
    }
  };

  const handleSaveEditComment = async (postId, commentId) => {
    if (!editText.trim()) return;
    try {
      await communityService.editDiscussion(postId, commentId, editText.trim());
      setEditingCommentId(null);
      setEditText('');
    } catch {
      showToast('error', 'Failed to update');
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await communityService.deleteDiscussion(postId, commentId);
    } catch {
      showToast('error', 'Failed to delete');
    }
  };

  const scrollToPost = (postId) => {
    const el = document.getElementById(`post-${postId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const formatTime = (ts) => ts?.toDate ? ts.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just now';

  const myPostsCount = posts.filter(p => p.authorId === user?.uid).length;

  return (
    <div className="min-vh-100 bg-light pb-5" style={{ backgroundColor: '#f3f4f6' }}>
      <Navbar />

      <div className="container py-4 px-2 px-md-3">

        {/* TOP MEMBERS BAR */}
        {activeUsers.length > 0 && (
          <div 
            className="card border-0 rounded-4 shadow-sm p-3 mb-4 text-white overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, #0a66c2 0%, #004182 100%)',
              boxShadow: '0 4px 12px rgba(10, 102, 194, 0.15)'
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-2">
              <small className="fw-bold fs-8 text-uppercase tracking-wider opacity-90 d-flex align-items-center gap-1.5">
                <Users size={14} /> Active Members & Network
              </small>
              <span className="badge bg-white text-primary rounded-pill px-2.5 py-1 fs-9 fw-bold">
                {activeUsers.length} Online
              </span>
            </div>

            <div className="d-flex align-items-center gap-3 overflow-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {activeUsers.map((u) => (
                <div key={u.uid} className="d-flex flex-column align-items-center text-center flex-shrink-0" style={{ width: 62 }}>
                  <div 
                    className="rounded-circle p-0.5 border border-2 border-white shadow-sm bg-white" 
                    style={{ width: 50, height: 50 }}
                  >
                    <div className="rounded-circle overflow-hidden w-100 h-100 bg-light d-flex align-items-center justify-content-center">
                      {u.photoURL ? (
                        <img src={u.photoURL} alt={u.name} className="w-100 h-100 object-fit-cover" />
                      ) : (
                        <span className="fw-bold text-primary fs-7">{u.name?.charAt(0).toUpperCase() || 'U'}</span>
                      )}
                    </div>
                  </div>
                  <small className="text-white fw-semibold fs-9 text-truncate w-100 mt-1">{u.name || 'Member'}</small>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="row g-3 g-lg-4 align-items-start">
          
          {/* LEFT SIDEBAR: PROFILE */}
          <div className="col-12 col-md-4 col-lg-3 d-none d-md-block position-sticky" style={{ top: 80 }}>
            <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
              <div className="w-100" style={{ height: 60, background: 'linear-gradient(135deg, #0a66c2 0%, #6366f1 100%)' }} />
              
              <div className="card-body text-center pt-0 position-relative">
                <div className="rounded-circle overflow-hidden border border-3 border-white bg-white mx-auto shadow-sm" style={{ width: 64, height: 64, marginTop: -32 }}>
                  {userProfile?.photoURL ? (
                    <img src={userProfile.photoURL} alt="User" className="w-100 h-100 object-fit-cover" />
                  ) : (
                    <div className="w-100 h-100 bg-primary text-white d-flex align-items-center justify-content-center fw-bold fs-5">
                      {userProfile?.name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                </div>

                <h6 className="fw-bold text-dark mb-0 mt-2 fs-7">{userProfile?.name || user?.email?.split('@')[0] || 'Member'}</h6>
                <small className="text-secondary fs-8 d-block mb-3 fw-medium text-truncate">
                  {userProfile?.about || userProfile?.description || 'Senior Technical Director'}
                </small>

                <div className="border-top border-bottom py-2 text-start fs-8">
                  <div className="d-flex justify-content-between text-muted fw-semibold py-1">
                    <span>Your Posts</span>
                    <span className="text-primary font-mono fw-bold">{myPostsCount}</span>
                  </div>
                  <div className="d-flex justify-content-between text-muted fw-semibold py-1">
                    <span>Total Community Posts</span>
                    <span className="text-primary font-mono fw-bold">{posts.length}</span>
                  </div>
                </div>

                <div className="pt-2 text-start">
                  <span className="text-secondary fs-8 fw-bold d-flex align-items-center gap-1">
                    <UserCheck size={14} className="text-success" /> Verified Member
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER MAIN FEED */}
          <div className="col-12 col-md-8 col-lg-6">
            
            {/* POST COMPOSER */}
            {user && (
              <div className="card border-0 rounded-4 shadow-sm bg-white p-3 mb-3">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 40, height: 40 }}>
                    {userProfile?.photoURL ? (
                      <img src={userProfile.photoURL} alt="Profile" className="w-100 h-100 object-fit-cover" />
                    ) : (
                      <span className="fw-bold text-primary fs-6">{userProfile?.name?.charAt(0) || 'U'}</span>
                    )}
                  </div>
                  
                  <input
                    type="text"
                    onClick={() => { setPostType('quick'); setIsComposerOpen(true); }}
                    readOnly
                    className="form-control rounded-pill bg-light border text-start text-muted fs-7 py-2 px-3 fw-medium cursor-pointer"
                    placeholder="Start a post, share news or article..."
                  />
                </div>

                <div className="d-flex align-items-center justify-content-around border-top pt-2">
                  <button onClick={() => { setPostType('quick'); setIsComposerOpen(true); }} className="btn btn-sm btn-light border-0 text-secondary fw-semibold fs-8 d-flex align-items-center gap-1.5 rounded-pill px-3">
                    <ImageIcon size={16} className="text-primary" /> Photo
                  </button>

                  <button onClick={() => { setPostType('quick'); setIsComposerOpen(true); }} className="btn btn-sm btn-light border-0 text-secondary fw-semibold fs-8 d-flex align-items-center gap-1.5 rounded-pill px-3">
                    <Video size={16} className="text-success" /> Video
                  </button>

                  <button onClick={() => { setPostType('blog'); setIsComposerOpen(true); }} className="btn btn-sm btn-light border-0 text-secondary fw-semibold fs-8 d-flex align-items-center gap-1.5 rounded-pill px-3">
                    <FileText size={16} className="text-warning" /> Article
                  </button>
                </div>
              </div>
            )}

            {/* EXPANDABLE COMPOSER */}
            {isComposerOpen && (
              <div className="card border-0 rounded-4 shadow-lg bg-white p-3 mb-3 border-start border-4 border-warning">
                <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
                  <h6 className="fw-bold text-dark mb-0 fs-7">
                    {postType === 'blog' ? 'Create Article / Blog' : 'Create Quick Post'}
                  </h6>
                  <button onClick={() => setIsComposerOpen(false)} className="btn btn-sm btn-link text-secondary p-0"><X size={18} /></button>
                </div>

                <form onSubmit={handlePublish}>
                  {postType === 'blog' && (
                    <input
                      ref={blogTitleInputRef}
                      type="text"
                      className="form-control border-0 bg-light fw-bold fs-6 py-2 rounded-3 mb-2"
                      placeholder="Article Title..."
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      required
                    />
                  )}

                  <textarea
                    ref={captionInputRef}
                    rows={postType === 'blog' ? 5 : 3}
                    className="form-control border-0 bg-light fs-7 py-2 rounded-3 mb-2 fw-medium"
                    placeholder={postType === 'blog' ? 'Write full article details...' : 'What do you want to talk about?'}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    disabled={uploading}
                    required
                  />

                  {preview && (
                    <div className="mb-2 position-relative d-inline-block">
                      {fileType === 'video' ? (
                        <video src={preview} controls className="rounded-3 border" style={{ maxHeight: 180 }} />
                      ) : (
                        <img src={preview} alt="Preview" className="rounded-3 border" style={{ maxHeight: 180 }} />
                      )}
                      {!uploading && (
                        <button type="button" className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-1" onClick={() => { setFile(null); setPreview(null); }}>✕</button>
                      )}
                    </div>
                  )}

                  {uploading && (
                    <div className="mb-2">
                      <div className="d-flex justify-content-between fs-8 fw-bold mb-1 text-dark">
                        <span>Uploading Media...</span><span>{uploadProgress}%</span>
                      </div>
                      <div className="progress rounded-pill" style={{ height: 8 }}>
                        <div 
                          className="progress-bar progress-bar-striped progress-bar-animated" 
                          style={{ width: `${uploadProgress}%`, backgroundColor: '#f15a24' }} 
                        />
                      </div>
                    </div>
                  )}

                  <div className="d-flex align-items-center justify-content-between border-top pt-2">
                    <div className="d-flex gap-2">
                      <label className="btn btn-sm btn-light rounded-pill px-3 py-1 fw-semibold fs-8 text-secondary cursor-pointer">
                        <ImageIcon size={15} className="me-1 text-primary" /> Photo
                        <input type="file" accept="image/*" className="d-none" disabled={uploading} onChange={handleFileChange} />
                      </label>

                      <label className="btn btn-sm btn-light rounded-pill px-3 py-1 fw-semibold fs-8 text-secondary cursor-pointer">
                        <Video size={15} className="me-1 text-success" /> Video
                        <input type="file" accept="video/*" className="d-none" disabled={uploading} onChange={handleFileChange} />
                      </label>
                    </div>

                    <button type="submit" disabled={uploading} className="btn btn-sm bg-logo-orange text-white rounded-pill px-4 py-1.5 fw-bold fs-8 d-flex align-items-center gap-1">
                      {uploading ? <Loader2 size={14} className="spinner-border spinner-border-sm" /> : <Send size={14} />} Publish
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* REAL FEED LIST */}
            {loading ? (
              <div className="text-center py-5"><Loader2 className="spinner-border text-primary" /></div>
            ) : posts.length === 0 ? (
              <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-white">
                <p className="text-muted fw-medium mb-0">No community posts yet.</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {posts.map((post) => {
                  const isLiked = user && post.likes?.includes(user.uid);
                  const isCommentOpen = activeCommentPost === post.id;
                  const isPostOwner = (user && user.uid === post.authorId) || userProfile?.role === 'admin';
                  const authorAvatar = (user && user.uid === post.authorId && userProfile?.photoURL) ? userProfile.photoURL : post.authorPhoto;

                  return (
                    <div id={`post-${post.id}`} key={post.id} className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
                      {/* Header */}
                      <div className="p-3 d-flex align-items-center justify-content-between border-bottom">
                        <div className="d-flex align-items-center gap-2">
                          <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                            {authorAvatar ? <img src={authorAvatar} alt="" className="w-100 h-100 object-fit-cover" /> : <span className="fw-bold text-primary fs-7">{post.authorName?.charAt(0)}</span>}
                          </div>
                          <div>
                            <h6 className="fw-bold text-dark mb-0 fs-7 d-flex align-items-center gap-1.5">
                              {post.authorName}
                              {post.postType === 'blog' && <span className="badge bg-primary-subtle text-primary border border-primary-subtle fs-9 px-2 py-0.5 rounded-pill">Article</span>}
                            </h6>
                            <small className="text-muted fs-8 d-flex align-items-center gap-1"><Clock size={10} /> {formatTime(post.createdAt)}</small>
                          </div>
                        </div>

                        {isPostOwner && (
                          <button onClick={() => communityController.deletePost(post.id)} className="btn btn-link text-danger p-0"><Trash2 size={16} /></button>
                        )}
                      </div>

                      {post.postType === 'blog' && post.title && (
                        <div className="px-3 pt-3"><h5 className="fw-bold text-dark mb-1 fs-6">{post.title}</h5></div>
                      )}

                      <div className="px-3 pt-2 pb-1"><p className="fs-7 text-dark fw-normal mb-2 text-break">{post.caption}</p></div>

                      {post.mediaUrl && (
                        post.mediaType === 'video' ? (
                          <video src={post.mediaUrl} controls preload="metadata" className="w-100 bg-black" style={{ maxHeight: 360 }} />
                        ) : (
                          <img src={post.mediaUrl} alt="" className="w-100 object-fit-cover" style={{ maxHeight: 360 }} />
                        )
                      )}

                      {/* Footer Stats & Actions */}
                      <div className="p-3 border-top">
                        <div className="d-flex align-items-center justify-content-between text-muted fs-8 pb-2 border-bottom mb-2">
                          <span><Heart size={12} className="text-danger me-1" />{post.likes?.length || 0} Likes</span>
                          <span>{post.commentsCount || 0} Discussions</span>
                        </div>

                        <div className="d-flex align-items-center justify-content-around">
                          <button onClick={() => communityController.handleLike(post.id, user?.uid)} className={`btn btn-light btn-sm rounded-pill flex-grow-1 border-0 fw-bold fs-8 d-flex align-items-center justify-content-center gap-1 ${isLiked ? 'text-danger' : 'text-secondary'}`}>
                            <Heart size={16} fill={isLiked ? '#ef4444' : 'none'} /> Like
                          </button>

                          <button onClick={() => setActiveCommentPost(isCommentOpen ? null : post.id)} className="btn btn-light btn-sm rounded-pill flex-grow-1 border-0 text-secondary fw-bold fs-8 d-flex align-items-center justify-content-center gap-1">
                            <MessageSquare size={16} /> Comment
                          </button>

                          <button onClick={() => { navigator.clipboard.writeText(window.location.href); showToast('success', 'Link copied!'); }} className="btn btn-light btn-sm rounded-pill flex-grow-1 border-0 text-secondary fw-bold fs-8 d-flex align-items-center justify-content-center gap-1">
                            <Share2 size={16} /> Share
                          </button>
                        </div>
                      </div>

                      {/* Slide-down Discussion */}
                      {isCommentOpen && (
                        <div className="bg-light p-3 border-top">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <span className="fw-bold fs-8 text-dark">Discussion</span>
                            <button onClick={() => setActiveCommentPost(null)} className="btn btn-sm btn-link text-secondary p-0"><X size={14} /></button>
                          </div>

                          <div className="d-flex flex-column gap-2 mb-3 overflow-auto" style={{ maxHeight: 220 }}>
                            {(commentsMap[post.id] || []).length === 0 ? (
                              <small className="text-muted text-center py-2">No discussions yet.</small>
                            ) : (
                              (commentsMap[post.id] || []).map((c) => {
                                const isOwner = (user && user.uid === c.userId) || userProfile?.role === 'admin';
                                const commenterAvatar = (user && user.uid === c.userId && userProfile?.photoURL) ? userProfile.photoURL : c.userPhoto;

                                return (
                                  <div key={c.id} className="bg-white p-2 rounded-3 border d-flex justify-content-between align-items-start gap-2">
                                    <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 26, height: 26 }}>
                                      {commenterAvatar ? <img src={commenterAvatar} alt="" className="w-100 h-100 object-fit-cover" /> : <span className="fw-bold text-primary fs-8">{c.userName?.charAt(0)}</span>}
                                    </div>

                                    <div className="flex-grow-1 overflow-hidden">
                                      <div className="d-flex align-items-center justify-content-between mb-0.5">
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
                              placeholder="Write a comment..."
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                            />
                            <button onClick={() => handleAddComment(post.id)} className="btn bg-logo-orange text-white"><Send size={13} /></button>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR: ACTIVE POSTS & ARTICLES WITH TOGGLE */}
          <div className="col-12 col-lg-3 d-none d-lg-block position-sticky" style={{ top: 80 }}>
            <div className="card border-0 rounded-4 shadow-sm bg-white p-3">
              <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                <h6 className="fw-bold text-dark mb-0 fs-7 d-flex align-items-center gap-1.5">
                  <TrendingUp size={15} className="text-primary" /> Active Posts & Articles
                </h6>
                <Sparkles size={13} className="text-warning" />
              </div>

              {/* TOP ITEMS LIST */}
              <div className="d-flex flex-column gap-2 fs-8">
                {posts.slice(0, articleLimit).length === 0 ? (
                  <small className="text-muted">No published items yet.</small>
                ) : (
                  posts.slice(0, articleLimit).map((item) => {
                    const authorAvatar = (user && user.uid === item.authorId && userProfile?.photoURL) ? userProfile.photoURL : item.authorPhoto;

                    return (
                      <div 
                        key={item.id} 
                        onClick={() => scrollToPost(item.id)} 
                        className="d-flex align-items-center gap-2 border-bottom pb-2 cursor-pointer hover-bg-light p-1.5 rounded transition-all"
                        style={{ cursor: 'pointer' }}
                        title="Click to view post"
                      >
                        <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 28, height: 28 }}>
                          {authorAvatar ? (
                            <img src={authorAvatar} alt="" className="w-100 h-100 object-fit-cover" />
                          ) : (
                            <span className="fw-bold text-primary fs-9">{item.authorName?.charAt(0)}</span>
                          )}
                        </div>

                        <div className="flex-grow-1 overflow-hidden">
                          <span className="fw-bold text-dark d-block text-truncate">
                            • {item.title || item.caption.slice(0, 30)}...
                          </span>
                          <small className="text-muted d-block fs-9 text-truncate">
                            By {item.authorName} {item.postType === 'blog' && <span className="text-primary fw-bold ms-1">(Article)</span>}
                          </small>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* 🔴 TOGGLE MORE / LESS BUTTON */}
              {posts.length > 10 && (
                <button 
                  onClick={() => setArticleLimit(articleLimit === 10 ? posts.length : 10)}
                  className="btn btn-sm btn-light border text-primary fw-bold fs-8 w-100 mt-2 rounded-pill shadow-2xs"
                >
                  {articleLimit === 10 ? `+ More Articles (${posts.length - 10})` : 'Show Less'}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}