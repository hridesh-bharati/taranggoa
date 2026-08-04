'use client';

import { useState, useEffect } from 'react';
import { eventController } from '@/controllers/event.controller';
import { Trash2, Edit3, Loader2, Calendar, MapPin, Image as ImageIcon, Plus, Images, X, Search } from 'lucide-react';
import Link from 'next/link';

export default function AdminEventDetailsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditIdItem] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [editForm, setEditForm] = useState({ title: '', date: '', location: '', description: '', images: [] });

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await eventController.fetchAllEvents();
      setEvents(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEvents(); }, []);

  // Filter & Simple Pagination (4 items per page)
  const filtered = events.filter(e => (e.title + e.location).toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / 4);
  const currentEvents = filtered.slice((page - 1) * 4, page * 4);

  const handleStartEdit = (item) => {
    setEditIdItem(item);
    setEditForm({
      title: item.title || '',
      date: item.date || '',
      location: item.location || '',
      description: item.description || '',
      images: item.gallery?.length ? item.gallery : (item.image ? [item.image] : [])
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await eventController.updateEvent(editItem.id, editForm);
      setEditIdItem(null);
      await loadEvents();
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this event?')) {
      await eventController.removeEvent(id);
      loadEvents();
    }
  };

  return (
    <div className="container-fluid py-3 px-2 px-md-4">
      {/* Header & Search */}
      <div className="d-flex align-items-center justify-content-between gap-2 mb-4 pb-2 border-bottom">
        <h4 className="fw-extrabold text-dark m-0">Events ({filtered.length})</h4>
        
        <div className="d-flex gap-2">
          <input 
            type="text" 
            placeholder="Search..." 
            className="form-control form-control-sm rounded-pill px-3" 
            value={search} 
            onChange={(e) => { setSearch(e.target.value); setPage(1); }} 
          />
          <Link href="/admin/event" className="btn btn-sm bg-logo-orange text-white rounded-pill px-3 fw-bold text-nowrap d-flex align-items-center gap-1">
            <Plus size={16} /> New
          </Link>
        </div>
      </div>

      {/* Quick Edit Box */}
      {editItem && (
        <form onSubmit={handleUpdateSubmit} className="card p-3 mb-4 shadow-sm border-0 bg-white rounded-4">
          <div className="d-flex justify-content-between mb-2">
            <h6 className="fw-bold m-0">Edit Event</h6>
            <button type="button" onClick={() => setEditIdItem(null)} className="btn btn-sm"><X size={16} /></button>
          </div>
          <div className="row g-2">
            <div className="col-md-6"><input className="form-control fs-7" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} required /></div>
            <div className="col-md-3"><input type="date" className="form-control fs-7" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} required /></div>
            <div className="col-md-3"><input className="form-control fs-7" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} required /></div>
            <div className="col-12"><textarea className="form-control fs-7" rows="2" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} required /></div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-2">
            <button type="submit" disabled={updating} className="btn btn-sm btn-primary rounded-pill px-3">{updating ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      )}

      {/* Grid */}
      {loading ? (
        <div className="text-center py-5"><Loader2 className="spinner-border text-primary" /></div>
      ) : (
        <>
          <div className="row g-3">
            {currentEvents.map((evt) => (
              <div key={evt.id} className="col-12 col-md-6">
                <div className="card border-0 rounded-4 bg-white shadow-sm p-3 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="rounded-3 overflow-hidden border bg-light mb-2 position-relative" style={{ height: '130px' }}>
                      {(evt.image || evt.gallery?.[0]) ? (
                        <img src={evt.image || evt.gallery[0]} alt="" className="w-100 h-100 object-fit-cover" />
                      ) : (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted"><ImageIcon size={24} /></div>
                      )}
                    </div>
                    <h6 className="fw-bold text-dark fs-7 mb-1 text-truncate">{evt.title}</h6>
                    <small className="text-muted d-block mb-1">{evt.date} • {evt.location}</small>
                    <p className="text-secondary fs-8 line-clamp-2 m-0">{evt.description}</p>
                  </div>
                  <div className="d-flex justify-content-end gap-2 pt-2 border-top mt-2">
                    <button onClick={() => handleStartEdit(evt)} className="btn btn-sm btn-outline-primary rounded-circle p-1"><Edit3 size={14} /></button>
                    <button onClick={() => handleDelete(evt.id)} className="btn btn-sm btn-outline-danger rounded-circle p-1"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Minimal Pagination Controls */}
          {totalPages > 1 && (
            <div className="d-flex align-items-center justify-content-center gap-2 my-4 pb-5 pb-lg-0">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn btn-sm btn-outline-dark rounded-pill px-3">Prev</button>
              <span className="fs-7 text-muted">{page} / {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn btn-sm btn-outline-dark rounded-pill px-3">Next</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}