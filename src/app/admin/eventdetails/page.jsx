'use client';

import { useState, useEffect } from 'react';
import { eventController } from '@/controllers/event.controller';
import { Trash2, Edit3, Loader2, Calendar, MapPin, Image as ImageIcon, Plus, Images, X } from 'lucide-react';
import Link from 'next/link';

export default function AdminEventDetailsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditIdItem] = useState(null);
  const [updating, setUpdating] = useState(false);

  const [editForm, setEditForm] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    images: []
  });

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await eventController.fetchAllEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Handle Edit Click
  const handleStartEdit = (item) => {
    setEditIdItem(item);
    const itemImages = item.gallery && item.gallery.length > 0 
      ? item.gallery 
      : (item.image ? [item.image] : []);

    setEditForm({
      title: item.title || '',
      date: item.date || '',
      location: item.location || '',
      description: item.description || '',
      images: itemImages
    });
  };

  // Add More Images in Edit Mode
  const handleEditImagesChange = async (e) => {
    try {
      const newImages = await eventController.processImageFiles(e.target.files);
      setEditForm((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    } catch (err) {
      alert('Failed to process image files.');
    }
  };

  // Remove Image in Edit Mode
  const handleRemoveEditImage = (indexToRemove) => {
    setEditForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Save Edit Changes
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editItem) return;

    setUpdating(true);
    try {
      await eventController.updateEvent(editItem.id, editForm);
      setEditIdItem(null);
      await loadEvents();
    } catch (err) {
      alert(err.message || 'Failed to update event');
    } finally {
      setUpdating(false);
    }
  };

  // Delete Event
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await eventController.removeEvent(id);
        await loadEvents();
      } catch (err) {
        alert(err.message || 'Failed to delete');
      }
    }
  };

  return (
    <div className="container-fluid py-3 px-2 px-md-4">
      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
        <div>
          <h4 className="fw-extrabold text-dark m-0">All Event Details</h4>
          <small className="text-secondary">Showing total {events.length} published events</small>
        </div>
        <Link 
          href="/admin/event" 
          className="btn btn-sm bg-logo-orange text-white rounded-pill px-3 py-1.5 fw-bold d-flex align-items-center gap-1.5"
        >
          <Plus size={16} />
          <span>Push New Event</span>
        </Link>
      </div>

      {/* EDIT MODAL / OVERLAY FORM */}
      {editItem && (
        <div className="card border-0 rounded-4 shadow-lg p-4 bg-white mb-4 border-start border-4 border-primary">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h6 className="fw-bold text-dark m-0">Edit Event Details</h6>
            <button onClick={() => setEditIdItem(null)} className="btn btn-sm btn-light rounded-circle p-1">
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleUpdateSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label small fw-bold text-secondary mb-1">Title</label>
              <input 
                type="text" 
                className="form-control rounded-3 fs-7" 
                value={editForm.title} 
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} 
                required 
              />
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary mb-1">Date</label>
              <input 
                type="date" 
                className="form-control rounded-3 fs-7" 
                value={editForm.date} 
                onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} 
                required 
              />
            </div>

            <div className="col-md-3">
              <label className="form-label small fw-bold text-secondary mb-1">Location</label>
              <input 
                type="text" 
                className="form-control rounded-3 fs-7" 
                value={editForm.location} 
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })} 
                required 
              />
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold text-secondary mb-1">Add / Edit Images</label>
              <input type="file" accept="image/*" multiple className="form-control rounded-3 fs-7" onChange={handleEditImagesChange} />
              
              {editForm.images.length > 0 && (
                <div className="mt-2 row g-2">
                  {editForm.images.map((imgSrc, idx) => (
                    <div key={idx} className="col-3 col-md-2 position-relative">
                      <div className="rounded-3 overflow-hidden border bg-light position-relative" style={{ height: '60px' }}>
                        <img src={imgSrc} alt={`Edit Preview ${idx}`} className="w-100 h-100 object-fit-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveEditImage(idx)}
                          className="btn btn-danger btn-sm p-0 rounded-circle position-absolute top-0 end-0 m-1 d-flex align-items-center justify-content-center"
                          style={{ width: '16px', height: '16px', fontSize: '9px' }}
                        >
                          <X size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="col-12">
              <label className="form-label small fw-bold text-secondary mb-1">Description</label>
              <textarea 
                rows="3" 
                className="form-control rounded-3 fs-7" 
                value={editForm.description} 
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} 
                required 
              ></textarea>
            </div>

            <div className="col-12 d-flex gap-2 justify-content-end">
              <button type="button" onClick={() => setEditIdItem(null)} className="btn btn-sm btn-light rounded-pill px-3">Cancel</button>
              <button type="submit" disabled={updating} className="btn btn-sm btn-primary rounded-pill px-4 fw-bold">
                {updating ? <Loader2 className="spinner-border spinner-border-sm" /> : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* EVENTS GRID: PC = 4 CARDS (col-lg-3), MOBILE = 1 CARD (col-12) */}
      {loading ? (
        <div className="text-center py-5">
          <Loader2 className="spinner-border text-primary" />
        </div>
      ) : events.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-white">
          <p className="text-muted fw-medium mb-0">No published events found in database.</p>
        </div>
      ) : (
        <div className="row g-3">
          {events.map((evt) => {
            const galleryCount = evt.gallery ? evt.gallery.length : (evt.image ? 1 : 0);
            const displayThumb = evt.image || (evt.gallery && evt.gallery[0]);

            return (
              /* Mobile: col-12 (1 Card), Tablet: col-md-6 (2 Cards), PC: col-lg-3 (4 Cards) */
              <div key={evt.id} className="col-12 col-md-6 col-lg-6">
                <div className="card border-0 rounded-4 h-100 bg-white shadow-sm overflow-hidden p-3 d-flex flex-column justify-content-between">
                  <div>
                    {/* Thumbnail & Gallery Badge */}
                    <div className="rounded-3 overflow-hidden border bg-light mb-2.5 position-relative" style={{ height: '140px' }}>
                      {displayThumb ? (
                        <img src={displayThumb} alt={evt.title} className="w-100 h-100 object-fit-cover" />
                      ) : (
                        <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center text-muted">
                          <ImageIcon size={28} />
                        </div>
                      )}

                      {galleryCount > 1 && (
                        <span className="position-absolute bottom-0 end-0 m-1.5 badge bg-dark bg-opacity-75 text-white fs-8 d-flex align-items-center gap-1 rounded-pill px-2 py-1">
                          <Images size={11} /> {galleryCount}
                        </span>
                      )}
                    </div>

                    <h6 className="fw-bold text-dark mb-1 line-clamp-2 fs-7" title={evt.title} style={{ lineHeight: '1.3' }}>
                      {evt.title}
                    </h6>

                    <div className="d-flex flex-column gap-1 text-muted fs-8 mb-2">
                      {evt.date && (
                        <span className="d-flex align-items-center gap-1 text-truncate">
                          <Calendar size={12} className="text-primary flex-shrink-0" /> {evt.date}
                        </span>
                      )}
                      {evt.location && (
                        <span className="d-flex align-items-center gap-1 text-truncate">
                          <MapPin size={12} className="text-danger flex-shrink-0" /> {evt.location}
                        </span>
                      )}
                    </div>

                    <p className="text-secondary fs-8 line-clamp-2 mb-3 m-0" style={{ lineHeight: '1.4' }}>
                      {evt.description}
                    </p>
                  </div>

                  {/* Actions (Edit / Delete) */}
                  <div className="d-flex align-items-center justify-content-end gap-1.5 pt-2 border-top mt-auto">
                    <button 
                      onClick={() => handleStartEdit(evt)} 
                      className="btn btn-sm btn-outline-primary rounded-circle p-1.5 d-flex align-items-center justify-content-center"
                      title="Edit Event"
                      style={{ width: '32px', height: '32px' }}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(evt.id)} 
                      className="btn btn-sm btn-outline-danger rounded-circle p-1.5 d-flex align-items-center justify-content-center"
                      title="Delete Event"
                      style={{ width: '32px', height: '32px' }}
                    >
                      <Trash2 size={14} />
                    </button>
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