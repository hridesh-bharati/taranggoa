'use client';

import { useState, useEffect } from 'react';
import { eventController } from '@/controllers/event.controller';
import { Plus, Trash2, Calendar, MapPin, Loader2 } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    badge: 'Recent Event',
    date: '',
    location: '',
    description: '',
    image: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await eventController.addEvent(form);
      setForm({ title: '', badge: 'Recent Event', date: '', location: '', description: '', image: '' });
      await loadEvents();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this event permanently?')) {
      try {
        await eventController.removeEvent(id);
        await loadEvents();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="container-fluid py-3">
      <h4 className="fw-extrabold text-dark mb-4">Event Management</h4>

      <div className="row g-4">
        {/* Add Event Form */}
        <div className="col-lg-4">
          <div className="card border-0 rounded-4 shadow-sm p-4 bg-white">
            <h6 className="fw-bold text-dark mb-3">Add New Event</h6>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <input 
                type="text" 
                placeholder="Event Title" 
                className="form-control rounded-3" 
                value={form.title} 
                onChange={(e) => setForm({ ...form, title: e.target.value })} 
                required 
              />
              <select 
                className="form-select rounded-3" 
                value={form.badge} 
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
              >
                <option value="Recent Event">Recent Event</option>
                <option value="Felicitation">Felicitation</option>
                <option value="Flagship Event">Flagship Event</option>
              </select>
              <input 
                type="text" 
                placeholder="Date (e.g. 16-19 April 2026)" 
                className="form-control rounded-3" 
                value={form.date} 
                onChange={(e) => setForm({ ...form, date: e.target.value })} 
                required 
              />
              <input 
                type="text" 
                placeholder="Location (e.g. Kala Academy, Goa)" 
                className="form-control rounded-3" 
                value={form.location} 
                onChange={(e) => setForm({ ...form, location: e.target.value })} 
                required 
              />
              <input 
                type="url" 
                placeholder="Image URL (Cloudinary / Unsplash)" 
                className="form-control rounded-3" 
                value={form.image} 
                onChange={(e) => setForm({ ...form, image: e.target.value })} 
                required 
              />
              <textarea 
                rows="3" 
                placeholder="Short Description" 
                className="form-control rounded-3" 
                value={form.description} 
                onChange={(e) => setForm({ ...form, description: e.target.value })} 
                required 
              ></textarea>

              <button type="submit" disabled={submitting} className="btn text-white fw-bold rounded-pill py-2.5 bg-logo-orange">
                {submitting ? <Loader2 className="spinner-border spinner-border-sm" /> : <><Plus size={16} className="me-1" /> Publish Event</>}
              </button>
            </form>
          </div>
        </div>

        {/* Existing Events List */}
        <div className="col-lg-8">
          <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden p-3">
            <h6 className="fw-bold text-dark mb-3 px-2">Published Events ({events.length})</h6>
            {loading ? (
              <div className="text-center py-4"><Loader2 className="spinner-border text-primary" /></div>
            ) : events.length === 0 ? (
              <p className="text-muted text-center py-4">No events found.</p>
            ) : (
              <div className="d-flex flex-column gap-2">
                {events.map((item) => (
                  <div key={item.id} className="p-3 border rounded-3 d-flex align-items-center justify-content-between gap-3">
                    <img src={item.image} alt={item.title} className="rounded-3 object-fit-cover" style={{ width: 60, height: 60 }} />
                    <div className="flex-grow-1 overflow-hidden">
                      <h6 className="fw-bold text-dark m-0 text-truncate">{item.title}</h6>
                      <small className="text-muted d-block">{item.date} • {item.location}</small>
                    </div>
                    <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-outline-danger rounded-circle p-2">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}