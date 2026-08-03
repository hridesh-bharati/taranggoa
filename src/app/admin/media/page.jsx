'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mediaService } from '@/services/media.service';
import { profileController } from '@/controllers/profile.controller';
import { showToast } from '@/utils/toast';
import { 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Send, 
  Trash2, 
  Loader2, 
  MessageSquare, 
  ThumbsUp, 
  Clock, 
  X 
} from 'lucide-react';

export default function AdminMediaPage() {
  const { user } = useAuth();
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('image');
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  const [activeCommentPost, setActiveCommentPost] = useState(null);
  const [commentsMap, setCommentsMap] = useState({});
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (user?.uid) {
      const cached = profileController.getCache(user.uid);
      if (cached) setUserProfile(cached);
      profileController.fetchProfile(user.uid, user.email, (fresh) => setUserProfile(fresh));
    }
    loadPosts();
  }, [user]);

  const loadPosts = async () => {
    try {
      const data = await mediaService.getAllPosts();
      setPosts(data);
    } catch {
      showToast('error', 'Failed to load posts');
    } finally {
      setFetching(false);
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

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file || !caption.trim()) return showToast('error', 'Select media and write a caption');

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', user.uid);

    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable) setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
    };

    xhr.onload = async () => {
      if (xhr.status === 200) {
        const uploadData = JSON.parse(xhr.responseText);
        await mediaService.createPost({
          mediaUrl: uploadData.url,
          mediaType: fileType,
          caption: caption.trim(),
          authorName: userProfile?.name || 'Admin',
          authorEmail: user.email,
          authorPhoto: userProfile?.photoURL || '',
          authorId: user.uid
        });
        showToast('success', 'Published!');
        setCaption(''); setFile(null); setPreview(null);
        loadPosts();
      } else {
        showToast('error', 'Upload failed');
      }
      setUploading(false);
    };
    xhr.open('POST', '/api/upload');
    xhr.send(formData);
  };

  const handleDeletePost = async (postId) => {
    if (!confirm('Delete this post?')) return;
    try {
      await mediaService.deletePost(postId);
      setPosts(posts.filter(p => p.id !== postId));
      showToast('success', 'Post deleted');
    } catch {
      showToast('error', 'Failed to delete');
    }
  };

  const toggleComments = async (postId) => {
    if (activeCommentPost === postId) {
      setActiveCommentPost(null);
    } else {
      setActiveCommentPost(postId);
      if (!commentsMap[postId]) {
        const comments = await mediaService.getComments(postId);
        setCommentsMap(prev => ({ ...prev, [postId]: comments }));
      }
    }
  };

  const handleAddComment = async (postId) => {
    if (!newComment.trim()) return;
    try {
      const commentObj = {
        text: newComment.trim(),
        userName: userProfile?.name || 'Admin',
        userPhoto: userProfile?.photoURL || '',
        userId: user.uid
      };
      await mediaService.addComment(postId, commentObj);
      const updated = await mediaService.getComments(postId);
      setCommentsMap(prev => ({ ...prev, [postId]: updated }));
      setPosts(posts.map(p => p.id === postId ? { ...p, commentsCount: (p.commentsCount || 0) + 1 } : p));
      setNewComment('');
    } catch {
      showToast('error', 'Failed to comment');
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      await mediaService.deleteComment(postId, commentId);
      setCommentsMap(prev => ({ ...prev, [postId]: prev[postId].filter(c => c.id !== commentId) }));
      setPosts(posts.map(p => p.id === postId ? { ...p, commentsCount: Math.max(0, (p.commentsCount || 1) - 1) } : p));
    } catch {
      showToast('error', 'Failed to delete comment');
    }
  };

  const formatTime = (ts) => ts?.toDate ? ts.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just now';

  return (
    <div className="container-fluid py-3 px-3 px-lg-4">
      <h4 className="fw-black text-dark mb-4 fs-4">Media & Video Manager</h4>

      {/* CREATE POST CARD */}
      <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
        <h6 className="fw-bold text-dark border-bottom pb-3 mb-3 fs-6">Create New Post</h6>
        <form onSubmit={handleUpload}>
          <textarea
            rows="3"
            className="form-control bg-light border-0 py-2 fs-7 fw-medium mb-3"
            placeholder="Write a caption or announcement..."
            value={caption}
            disabled={uploading}
            onChange={(e) => setCaption(e.target.value)}
          />

          {preview && (
            <div className="mb-3 position-relative d-inline-block">
              {fileType === 'video' ? (
                <video src={preview} controls className="rounded-3 border" style={{ maxHeight: 200 }} />
              ) : (
                <img src={preview} alt="Preview" className="rounded-3 border" style={{ maxHeight: 200 }} />
              )}
              {!uploading && (
                <button type="button" className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-1" onClick={() => { setFile(null); setPreview(null); }}>✕</button>
              )}
            </div>
          )}

          {uploading && (
            <div className="mb-3">
              <div className="d-flex justify-content-between fs-8 fw-bold mb-1">
                <span>Uploading...</span><span>{uploadProgress}%</span>
              </div>
              <div className="progress rounded-pill" style={{ height: 6 }}>
                <div className="progress-bar bg-warning" style={{ width: `${uploadProgress}%`, backgroundColor: '#f15a24' }} />
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between border-top pt-3">
            <div className="d-flex gap-2">
              <label className="btn btn-light rounded-pill px-3 py-1.5 fw-bold fs-7 text-secondary cursor-pointer">
                <ImageIcon size={18} className="me-1 text-primary" /> Photo
                <input type="file" accept="image/*" className="d-none" disabled={uploading} onChange={handleFileChange} />
              </label>
              <label className="btn btn-light rounded-pill px-3 py-1.5 fw-bold fs-7 text-secondary cursor-pointer">
                <VideoIcon size={18} className="me-1 text-danger" /> Video
                <input type="file" accept="video/*" className="d-none" disabled={uploading} onChange={handleFileChange} />
              </label>
            </div>
            <button type="submit" disabled={uploading || !file} className="btn bg-logo-orange text-white rounded-pill px-4 py-2 fw-bold fs-7 d-flex align-items-center gap-2">
              {uploading ? <Loader2 size={16} className="spinner-border spinner-border-sm" /> : <Send size={16} />} Publish
            </button>
          </div>
        </form>
      </div>

      {/* 🔴 FIX: align-items-start keeps cards at their natural height */}
      <h6 className="fw-bold text-dark mb-3">Published Media ({posts.length})</h6>
      {fetching ? (
        <div className="text-center py-4"><Loader2 className="spinner-border text-primary" /></div>
      ) : (
        <div className="row g-4 align-items-start">
          {posts.map((post) => {
            const isCommentOpen = activeCommentPost === post.id;

            return (
              <div key={post.id} className="col-12 col-md-6 col-lg-4">
                <div className="card border-0 rounded-4 shadow-sm overflow-hidden bg-white">
                  
                  {/* Header */}
                  <div className="p-3 d-flex align-items-center justify-content-between border-bottom">
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center" style={{ width: 34, height: 34 }}>
                        {post.authorPhoto ? <img src={post.authorPhoto} alt="" className="w-100 h-100 object-fit-cover" /> : <span className="fw-bold text-primary fs-7">{post.authorName?.charAt(0)}</span>}
                      </div>
                      <div>
                        <h6 className="fw-bold text-dark mb-0 fs-7">{post.authorName}</h6>
                        <small className="text-muted fs-8"><Clock size={10} className="me-1" />{formatTime(post.createdAt)}</small>
                      </div>
                    </div>
                    <button onClick={() => handleDeletePost(post.id)} className="btn btn-link text-danger p-0"><Trash2 size={16} /></button>
                  </div>

                  {/* Media */}
                  {post.mediaType === 'video' ? (
                    <video src={post.mediaUrl} controls preload="metadata" className="w-100 bg-black" style={{ height: 220 }} />
                  ) : (
                    <img src={post.mediaUrl} alt="" className="w-100 object-fit-cover" style={{ height: 220 }} />
                  )}

                  {/* Footer Stats */}
                  <div className="p-3">
                    <p className="fs-7 text-dark fw-medium mb-3">{post.caption}</p>
                    <div className="d-flex justify-content-between border-top pt-2 text-muted fs-8">
                      <span className="fw-semibold text-primary"><ThumbsUp size={14} className="me-1" />{post.likes?.length || 0} Likes</span>
                      <button onClick={() => toggleComments(post.id)} className="btn btn-link text-secondary p-0 text-decoration-none fw-semibold fs-8">
                        <MessageSquare size={14} className="me-1" />{post.commentsCount || 0} Comments
                      </button>
                    </div>
                  </div>

                  {/* Isolated Toggle Comments (Sirf issi card ka height adjust hoga) */}
                  {isCommentOpen && (
                    <div className="bg-light p-3 border-top">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="fw-bold fs-8 text-dark">Comments</span>
                        <button onClick={() => setActiveCommentPost(null)} className="btn btn-sm btn-link text-secondary p-0"><X size={14} /></button>
                      </div>

                      <div className="d-flex flex-column gap-2 mb-3 overflow-auto" style={{ maxHeight: 200 }}>
                        {(commentsMap[post.id] || []).map((c) => (
                          <div key={c.id} className="bg-white p-2 rounded-3 border d-flex justify-content-between align-items-start">
                            <div>
                              <span className="fw-bold fs-8 d-block text-dark">{c.userName}</span>
                              <span className="fs-8 text-secondary text-break">{c.text}</span>
                            </div>
                            <button onClick={() => handleDeleteComment(post.id, c.id)} className="btn btn-link text-danger p-0 ms-2"><Trash2 size={12} /></button>
                          </div>
                        ))}
                      </div>

                      <div className="input-group input-group-sm">
                        <input
                          type="text"
                          className="form-control fs-8 border-0 shadow-sm"
                          placeholder="Reply as Admin..."
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
  );
}