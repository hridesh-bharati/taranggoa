'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { communityService } from '@/services/community.service';
import { Image as ImageIcon, Video as VideoIcon, Loader2 } from 'lucide-react';

export default function MyGallery() {
  const { user } = useAuth();
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = communityService.subscribeToCommunityPosts((livePosts) => {
      const items = livePosts
        .filter(p => p.authorId === user.uid && p.mediaUrl)
        .map(p => ({ id: p.id, url: p.mediaUrl, type: p.mediaType, title: p.title || p.caption }));
      setMediaItems(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="card border-0 rounded-4 shadow-sm p-4 bg-white border-top border-4 border-warning">
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4">
        <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
          <ImageIcon className="text-warning" size={20} /> My Media Gallery
        </h5>
        <span className="badge bg-warning-subtle text-warning border rounded-pill px-3 py-1 fw-bold fs-8">
          Total Media: {mediaItems.length}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5"><Loader2 className="spinner-border text-warning" /></div>
      ) : mediaItems.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3">
          <p className="text-muted fw-medium mb-0">No photos or videos uploaded in gallery yet.</p>
        </div>
      ) : (
        <div className="row g-3">
          {mediaItems.map((item) => (
            <div key={item.id} className="col-6 col-md-4 col-lg-3">
              <div className="rounded-3 overflow-hidden border shadow-sm position-relative bg-black" style={{ height: 160 }}>
                {item.type === 'video' ? (
                  <>
                    <video src={item.url} className="w-100 h-100 object-fit-cover" />
                    <span className="badge bg-dark position-absolute top-0 end-0 m-1.5 fs-9">
                      <VideoIcon size={12} className="me-1 text-danger" /> Video
                    </span>
                  </>
                ) : (
                  <img src={item.url} alt="" className="w-100 h-100 object-fit-cover" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}