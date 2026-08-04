'use client';

import { useState } from 'react';
import { eventController } from '@/controllers/event.controller';
import { Plus, Loader2, Calendar, MapPin, X, Send, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AdminPushEventPage() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    images: []
  });

  // Handle Image Selection
  const handleImagesChange = async (e) => {
    try {
      const newImages = await eventController.processImageFiles(e.target.files);
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    } catch (err) {
      alert('Failed to process image files.');
    }
  };

  // Remove Image Preview
  const handleRemoveImage = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await eventController.addEvent(form);
      alert('Event published successfully!');
      setForm({ title: '', date: '', location: '', description: '', images: [] });
    } catch (err) {
      alert(err.message || 'Failed to push event');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid py-3 px-2 px-md-4">
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
        <div>
          <h4 className="fw-extrabold text-dark m-0">Push New Event</h4>
          <small className="text-secondary">Create and publish new event to database</small>
        </div>
        <Link 
          href="/admin/eventdetails" 
          className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1.5 fw-bold d-flex align-items-center gap-2"
        >
          <Eye size={16} />
          <span>View All Events</span>
        </Link>
      </div>

      {/* Push Form Card */}
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
            <h6 className="fw-bold text-dark mb-3">Event Details</h6>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div>
                <label className="form-label small fw-bold text-secondary mb-1">Event Title</label>
                <input 
                  type="text" 
                  placeholder="Enter Event Title" 
                  className="form-control rounded-3 py-2 fs-7" 
                  value={form.title} 
                  onChange={(e) => setForm({ ...form, title: e.target.value })} 
                  required 
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-secondary mb-1">Event Date</label>
                  <input 
                    type="date" 
                    className="form-control rounded-3 py-2 fs-7" 
                    value={form.date} 
                    onChange={(e) => setForm({ ...form, date: e.target.value })} 
                    required 
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold text-secondary mb-1">Event Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Kala Academy, Panaji" 
                    className="form-control rounded-3 py-2 fs-7" 
                    value={form.location} 
                    onChange={(e) => setForm({ ...form, location: e.target.value })} 
                    required 
                  />
                </div>
              </div>

              {/* Multiple Images Upload Field */}
              <div>
                <label className="form-label small fw-bold text-secondary mb-1 d-flex align-items-center justify-content-between">
                  <span>Upload Images (Multiple)</span>
                  <span className="badge bg-light text-dark border fs-8">{form.images.length} Selected</span>
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="form-control rounded-3 py-2 fs-7" 
                  onChange={handleImagesChange} 
                />

                {/* Multiple Images Grid Preview */}
                {form.images.length > 0 && (
                  <div className="mt-3 row g-2">
                    {form.images.map((imgSrc, idx) => (
                      <div key={idx} className="col-3 col-md-2 position-relative">
                        <div className="rounded-3 overflow-hidden border bg-light position-relative" style={{ height: '70px' }}>
                          <img src={imgSrc} alt={`Preview ${idx}`} className="w-100 h-100 object-fit-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="btn btn-danger btn-sm p-0 rounded-circle position-absolute top-0 end-0 m-1 d-flex align-items-center justify-content-center"
                            style={{ width: '18px', height: '18px', fontSize: '10px' }}
                            title="Remove image"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="form-label small fw-bold text-secondary mb-1">Description</label>
                <textarea 
                  rows="4" 
                  placeholder="Write event description details..." 
                  className="form-control rounded-3 fs-7" 
                  value={form.description} 
                  onChange={(e) => setForm({ ...form, description: e.target.value })} 
                  required 
                ></textarea>
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="btn bg-logo-orange text-white fw-bold rounded-pill px-4 py-2.5 d-inline-flex align-items-center gap-2 shadow-sm"
                >
                  {submitting ? (
                    <Loader2 className="spinner-border spinner-border-sm" />
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Publish Event</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}