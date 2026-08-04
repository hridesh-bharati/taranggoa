'use client';

import { useState, useEffect } from 'react';
import { communityService } from '@/services/community.service';
import { mediaService } from '@/services/media.service';
import { Image as ImageIcon, Video as VideoIcon, Loader2, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { showToast } from '@/utils/toast';

const ITEMS_PER_PAGE = 12; // 4 Columns x 3 Rows = 12 Items

export default function GalleryView({ targetUserId = null, isAdminView = false }) {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const unsubCommunity = communityService.subscribeToCommunityPosts((liveCommunityPosts) => {
      mediaService.subscribeToPosts((liveMediaPosts) => {
        if (!isMounted) return;

        const allPostsMap = new Map();
        
        [...liveCommunityPosts, ...liveMediaPosts].forEach(p => {
          if (p.mediaUrl && !allPostsMap.has(p.id)) {
            allPostsMap.set(p.id, p);
          }
        });

        let combinedPosts = Array.from(allPostsMap.values());

        if (!isAdminView && targetUserId) {
          combinedPosts = combinedPosts.filter(p => p.authorId === targetUserId);
        }

        const items = combinedPosts.map(p => ({
          id: p.id,
          url: p.mediaUrl,
          type: p.mediaType || 'image',
          title: p.title || p.caption || 'Media Item',
          authorName: p.authorName,
          createdAt: p.createdAt
        }));

        setMediaItems(items);
        setLoading(false);
      });
    });

    return () => {
      isMounted = false;
      if (typeof unsubCommunity === 'function') unsubCommunity();
    };
  }, [targetUserId, isAdminView]);

  // Clean Pagination Calculation
  const totalPages = Math.ceil(mediaItems.length / ITEMS_PER_PAGE);
  const paginatedItems = mediaItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this media item?')) return;
    try {
      await mediaService.deletePost(id).catch(() => communityService.deletePost(id));
      showToast('success', 'Media deleted successfully');
    } catch {
      showToast('error', 'Failed to delete media');
    }
  };

  return (
    <div className="card border-0 rounded-4 shadow-sm p-4 bg-white border-top border-4 border-warning">
      <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4">
        <h5 className="fw-bold text-dark m-0 d-flex align-items-center gap-2">
          <ImageIcon className="text-warning" size={20} /> 
          {isAdminView ? 'All Platform Media Gallery' : 'My Media Gallery'}
        </h5>
        <span className="badge bg-warning-subtle text-warning border rounded-pill px-3 py-1 fw-bold fs-8">
          Total Media: {mediaItems.length}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5"><Loader2 className="spinner-border text-warning" /></div>
      ) : mediaItems.length === 0 ? (
        <div className="text-center py-5 bg-light rounded-3">
          <p className="text-muted fw-medium mb-0">No photos or videos found in gallery.</p>
        </div>
      ) : (
        <>
          {/* 4x3 Grid (12 Items) */}
          <div className="row g-3">
            {paginatedItems.map((item) => (
              <div key={item.id} className="col-6 col-md-4 col-lg-3">
                <div 
                  onClick={() => setSelectedMedia(item)}
                  className="rounded-3 overflow-hidden border shadow-sm position-relative bg-black group hover-scale transition-all" 
                  style={{ height: 160, cursor: 'pointer' }}
                >
                  {item.type === 'video' ? (
                    <video src={item.url} className="w-100 h-100 object-fit-cover" />
                  ) : (
                    <img src={item.url} alt={item.title} className="w-100 h-100 object-fit-cover" />
                  )}

                  {/* Media Type Badge */}
                  <span className="badge bg-dark bg-opacity-75 position-absolute top-0 end-0 m-1.5 fs-9">
                    {item.type === 'video' ? <VideoIcon size={12} className="me-1 text-danger" /> : <ImageIcon size={12} className="me-1 text-primary" />}
                    {item.type}
                  </span>

                  {/* Admin Delete Action */}
                  {isAdminView && (
                    <button 
                      onClick={(e) => handleDelete(e, item.id)}
                      className="btn btn-danger btn-sm position-absolute bottom-0 end-0 m-1.5 p-1 rounded-circle shadow"
                      title="Delete Media"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Minimalist Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex align-items-center justify-content-center gap-2 mt-4 pt-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="btn btn-outline-dark rounded-pill px-3 py-1.5 fw-semibold d-flex align-items-center gap-1 btn-sm"
              >
                <ChevronLeft size={16} /> Prev
              </button>

              <span className="fw-bold text-secondary px-3 fs-7">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="btn btn-outline-dark rounded-pill px-3 py-1.5 fw-semibold d-flex align-items-center gap-1 btn-sm"
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}

      {/* FULL-SCREEN LIGHTBOX MODAL PREVIEW */}
      {selectedMedia && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-85 p-3"
          onClick={() => setSelectedMedia(null)}
          style={{ zIndex: 1050, cursor: 'pointer' }}
        >
          <div className="position-relative max-w-lg w-100 text-center" onClick={(e) => e.stopPropagation()} style={{ cursor: 'default' }}>
            <button 
              onClick={() => setSelectedMedia(null)}
              className="btn btn-light rounded-circle position-absolute top-0 end-0 m-3 shadow z-3 d-flex align-items-center justify-content-center"
              style={{ width: 36, height: 36, cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            {selectedMedia.type === 'video' ? (
              <video src={selectedMedia.url} controls autoPlay className="w-100 rounded-4 shadow-lg bg-black" style={{ maxHeight: '80vh' }} />
            ) : (
              <img src={selectedMedia.url} alt="" className="w-100 rounded-4 shadow-lg object-fit-contain" style={{ maxHeight: '80vh' }} />
            )}

            {selectedMedia.title && (
              <div className="mt-3 text-white bg-dark bg-opacity-50 p-2 rounded-3 fs-7">
                {selectedMedia.title}
                {selectedMedia.authorName && <small className="d-block text-white-50 fs-9 mt-0.5">By {selectedMedia.authorName}</small>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}