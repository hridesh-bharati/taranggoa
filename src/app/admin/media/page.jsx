'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mediaService } from '@/services/media.service';
import { profileController } from '@/controllers/profile.controller';
import { showToast } from '@/utils/toast';
import { Image as ImageIcon, Video as VideoIcon, Send, Loader2 } from 'lucide-react';

export default function AdminMediaPage() {
  const { user, isAdmin } = useAuth();  
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('image');
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Load user profile cache on mount
  useState(() => {
    if (user?.uid) {
      const cached = profileController.getCache(user.uid);
      if (cached) setUserProfile(cached);
      profileController.fetchProfile(user.uid, user.email, (fresh) => setUserProfile(fresh));
    }
  });

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
    if (!file || !caption.trim()) return showToast('error', 'Select media and write caption');

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
          authorName: userProfile?.name || (isAdmin ? 'Admin' : user.email.split('@')[0]),
          authorEmail: user.email,
          authorPhoto: userProfile?.photoURL || '',
          authorId: user.uid
        });
        showToast('success', 'Published successfully!');
        setCaption(''); setFile(null); setPreview(null);
      } else {
        showToast('error', 'Upload failed');
      }
      setUploading(false);
    };
    xhr.open('POST', '/api/upload');
    xhr.send(formData);
  };

  return (
    <div className="container-fluid py-3 px-3 px-lg-4" style={{ maxWidth: 800 }}>
      <h4 className="fw-black text-dark mb-4 fs-4">{isAdmin ? 'Media & Video Manager' : 'Create Post & Share Media'}</h4>

      {/* CREATE POST CARD */}
      <div className="card border-0 rounded-4 shadow-sm p-4 bg-white mb-4">
        <h6 className="fw-bold text-dark border-bottom pb-3 mb-3 fs-6">Create New Post</h6>
        <form onSubmit={handleUpload}>
          <textarea
            rows="4"
            className="form-control bg-light border-0 py-2 fs-7 fw-medium mb-3"
            placeholder="Write a caption or announcement..."
            value={caption}
            disabled={uploading}
            onChange={(e) => setCaption(e.target.value)}
          />

          {preview && (
            <div className="mb-3 position-relative d-inline-block">
              {fileType === 'video' ? (
                <video src={preview} controls className="rounded-3 border" style={{ maxHeight: 220 }} />
              ) : (
                <img src={preview} alt="Preview" className="rounded-3 border" style={{ maxHeight: 220 }} />
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
    </div>
  );
}