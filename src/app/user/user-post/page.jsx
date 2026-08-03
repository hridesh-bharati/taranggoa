'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { communityService } from '@/services/community.service';
import { communityController } from '@/controllers/community.controller';
import { showToast } from '@/utils/toast';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Trash2, Edit2, Clock, Heart, MessageSquare, Loader2, FileText, Check, X } from 'lucide-react';

export default function MyPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Minimal Edit States
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCaption, setEditCaption] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = communityService.subscribeToCommunityPosts((livePosts) => {
      const myUserPosts = livePosts.filter(p => p.authorId === user.uid);
      setPosts(myUserPosts);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Start Edit Mode
  const handleEditClick = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title || '');
    setEditCaption(post.caption || '');
  };

  // Save Edit to Firestore
  const handleSaveEdit = async (postId, isBlog) => {
    if (!editCaption.trim()) return showToast('error', 'Caption cannot be empty');

    setUpdating(true);
    try {
      const postRef = doc(db, 'community_posts', postId);
      await updateDoc(postRef, {
        ...(isBlog && { title: editTitle.trim() }),
        caption: editCaption.trim(),
        updatedAt: serverTimestamp()
      });

      showToast('success', 'Post updated successfully!');
      setEditingId(null);
    } catch {
      showToast('error', 'Failed to update post');
    } finally {
      setUpdating(false);
    }
  };

  const formatTime = (ts) => ts?.toDate ? ts.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Just now';

  return (
    <div className="card border-0 rounded-4 shadow-sm p-4 bg-white border-top border-4 border-success">
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4">
        <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
          <FileText className="text-success" size={20} /> My Posts & Articles
        </h5>
        <span className="badge bg-success-subtle text-success rounded-pill px-3 py-1 fw-bold fs-8">
          Total: {posts.length}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5"><Loader2 className="spinner-border text-success" /></div>
      ) : posts.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3">
          <p className="text-muted fw-medium mb-0">You haven't posted any content or article yet.</p>
        </div>
      ) : (
        <div className="row g-3">
          {posts.map((post) => {
            const isEditing = editingId === post.id;

            return (
              <div key={post.id} className="col-12 col-md-6">
                <div className="card border-0 rounded-3 shadow-sm bg-light overflow-hidden h-100 d-flex flex-column justify-content-between p-3">
                  <div>
                    {/* Header Action Bar */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted fs-8 d-flex align-items-center gap-1">
                        <Clock size={11} /> {formatTime(post.createdAt)}
                      </small>
                      
                      <div className="d-flex align-items-center gap-2">
                        {!isEditing && (
                          <button onClick={() => handleEditClick(post)} className="btn btn-link text-primary p-0" title="Edit">
                            <Edit2 size={15} />
                          </button>
                        )}
                        <button onClick={() => communityController.deletePost(post.id)} className="btn btn-link text-danger p-0" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Minimal In-line Edit Mode Form */}
                    {isEditing ? (
                      <div className="mb-2">
                        {post.postType === 'blog' && (
                          <input
                            type="text"
                            className="form-control form-control-sm fw-bold border mb-2"
                            placeholder="Article Title..."
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                          />
                        )}
                        <textarea
                          rows={3}
                          className="form-control form-control-sm border mb-2 fs-7"
                          placeholder="Post Content..."
                          value={editCaption}
                          onChange={(e) => setEditCaption(e.target.value)}
                          disabled={updating}
                        />
                        <div className="d-flex gap-2">
                          <button 
                            onClick={() => handleSaveEdit(post.id, post.postType === 'blog')} 
                            disabled={updating} 
                            className="btn btn-sm btn-success rounded-pill px-3 py-1 fs-8 fw-bold d-flex align-items-center gap-1"
                          >
                            {updating ? <Loader2 size={12} className="spinner-border spinner-border-sm" /> : <Check size={12} />} Save
                          </button>
                          <button 
                            onClick={() => setEditingId(null)} 
                            className="btn btn-sm btn-light border rounded-pill px-3 py-1 fs-8 fw-bold d-flex align-items-center gap-1"
                          >
                            <X size={12} /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {post.title && <h6 className="fw-bold text-dark mb-1 fs-7">{post.title}</h6>}
                        <p className="fs-7 text-secondary text-truncate-2 mb-2">{post.caption}</p>
                      </>
                    )}

                    {/* Media Render */}
                    {!isEditing && post.mediaUrl && (
                      <div className="rounded-2 overflow-hidden mb-2" style={{ maxHeight: 160 }}>
                        {post.mediaType === 'video' ? (
                          <video src={post.mediaUrl} className="w-100" />
                        ) : (
                          <img src={post.mediaUrl} alt="" className="w-100 object-fit-cover" style={{ height: 160 }} />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="d-flex align-items-center justify-content-between border-top pt-2 mt-2 text-muted fs-8">
                    <span><Heart size={13} className="text-danger me-1" />{post.likes?.length || 0} Likes</span>
                    <span><MessageSquare size={13} className="text-primary me-1" />{post.commentsCount || 0} Discussions</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}