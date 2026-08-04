'use client';

import { useState } from 'react';
import { eventController } from '@/controllers/event.controller';
import { Loader2, X, Send, Eye, CalendarPlus, UploadCloud } from 'lucide-react';
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
    } catch {
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
    <div className="container-fluid p-0 p-md-3 pb-5 mb-5">
      <div className="row justify-content-center g-0">
        <div className="col-12 col-lg-9">
          
          {/* Main Card - Full Width on Mobile */}
          <div className="card border-0 rounded-0 rounded-md-4 shadow-sm bg-white overflow-hidden">
            
            {/* Direct Header Bar */}
            <div className="p-3 p-md-4 bg-primary text-white d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <CalendarPlus size={22} className="text-warning" />
                <h5 className="fw-bold m-0 text-white fs-6 fs-md-5">Push New Event</h5>
              </div>

              <Link 
                href="/admin/eventdetails" 
                className="btn btn-sm btn-light text-primary fw-bold rounded-pill px-3 py-1 d-flex align-items-center gap-1.5 shadow-sm"
              >
                <Eye size={15} />
                <span>View All</span>
              </Link>
            </div>

            {/* Form Section */}
            <div className="p-3 p-md-4">
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                
                <div>
                  <label className="form-label fw-bold text-dark small mb-1">Event Title</label>
                  <input 
                    type="text" 
                    placeholder="Enter Event Title" 
                    className="form-control rounded-3 py-2 fs-7" 
                    value={form.title} 
                    onChange={(e) => setForm({ ...form, title: e.target.value })} 
                    required 
                  />
                </div>

                <div className="row g-2 g-md-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold text-dark small mb-1">Event Date</label>
                    <input 
                      type="date" 
                      className="form-control rounded-3 py-2 fs-7" 
                      value={form.date} 
                      onChange={(e) => setForm({ ...form, date: e.target.value })} 
                      required 
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label fw-bold text-dark small mb-1">Event Location</label>
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

                {/* Images Upload Field */}
                <div>
                  <label className="form-label fw-bold text-dark small mb-1 d-flex align-items-center justify-content-between">
                    <span className="d-flex align-items-center gap-1">
                      <UploadCloud size={16} className="text-primary" /> Upload Images
                    </span>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle fs-8">
                      {form.images.length} Selected
                    </span>
                  </label>
                  
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="form-control rounded-3 py-2 fs-7" 
                    onChange={handleImagesChange} 
                  />

                  {/* Previews */}
                  {form.images.length > 0 && (
                    <div className="mt-2 row g-2">
                      {form.images.map((imgSrc, idx) => (
                        <div key={idx} className="col-3 col-md-2 position-relative">
                          <div className="rounded-3 overflow-hidden border bg-light position-relative" style={{ height: '70px' }}>
                            <img src={imgSrc} alt={`Preview ${idx}`} className="w-100 h-100 object-fit-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                              className="btn btn-danger p-0 rounded-circle position-absolute top-0 end-0 m-1 d-flex align-items-center justify-content-center"
                              style={{ width: '20px', height: '20px', fontSize: '10px' }}
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
                  <label className="form-label fw-bold text-dark small mb-1">Description</label>
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
                    className="btn text-white fw-bold rounded-3 w-100 py-2.5 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                    style={{ backgroundColor: '#f15a24' }}
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
    </div>
  );
}