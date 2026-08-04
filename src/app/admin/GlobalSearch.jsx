'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Loader2, 
  User, 
  Inbox, 
  Calendar, 
  Tag, 
  ArrowRight 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/user.service';
import { contactService } from '@/services/contact.service';
import { eventController } from '@/controllers/event.controller';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState({
    members: [],
    inbox: [],
    events: [],
    offers: []
  });

  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  // Escape key click se modal close karne ke liye
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Modal open hote hi input field par auto focus
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search Logic (Debounced)
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults({ members: [], inbox: [], events: [], offers: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const term = query.toLowerCase();

        const [users, inquiries, events, offersSnap] = await Promise.all([
          userService.getAllUsers().catch(() => []),
          contactService.getAllInquiries().catch(() => []),
          eventController.fetchAllEvents().catch(() => []),
          getDocs(collection(db, 'offers')).catch(() => ({ docs: [] }))
        ]);

        const offersList = offersSnap.docs ? offersSnap.docs.map(d => ({ id: d.id, ...d.data() })) : [];

        setResults({
          members: users.filter((u) =>
            u.name?.toLowerCase().includes(term) ||
            u.email?.toLowerCase().includes(term) ||
            u.mobile?.includes(term)
          ).slice(0, 3),

          inbox: inquiries.filter((i) =>
            i.name?.toLowerCase().includes(term) ||
            i.email?.toLowerCase().includes(term) ||
            i.subject?.toLowerCase().includes(term) ||
            i.message?.toLowerCase().includes(term)
          ).slice(0, 3),

          events: events.filter((e) =>
            e.title?.toLowerCase().includes(term) ||
            e.location?.toLowerCase().includes(term) ||
            e.description?.toLowerCase().includes(term)
          ).slice(0, 3),

          offers: offersList.filter((o) =>
            o.title?.toLowerCase().includes(term) ||
            o.code?.toLowerCase().includes(term)
          ).slice(0, 3)
        });
      } catch (err) {
        console.error('Global Search Error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleNavigate = (path) => {
    setIsOpen(false);
    setQuery('');
    router.push(path);
  };

  const totalCount = 
    results.members.length + 
    results.inbox.length + 
    results.events.length + 
    results.offers.length;

  return (
    <>
      {/* Topbar Trigger Input Box */}
      <div 
        className="input-group shadow-sm rounded-pill border overflow-hidden bg-light cursor-pointer"
        style={{ width: '100%', maxWidth: '280px' }}
        onClick={() => setIsOpen(true)}
      >
        <span className="input-group-text bg-transparent border-0 text-muted ps-3 py-1.5">
          <Search size={15} />
        </span>
        <input
          type="text"
          className="form-control border-0 bg-transparent py-1.5 fs-8 shadow-none cursor-pointer"
          placeholder="Search..."
          readOnly
        />
      </div>

      {/* Instagram Style Center Modal Pop-up */}
      {isOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.55)', 
            backdropFilter: 'blur(5px)',
            zIndex: 1050 
          }}
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div 
            ref={modalRef}
            className="bg-white rounded-4 shadow-lg overflow-hidden w-100 d-flex flex-column" 
            style={{ maxWidth: '550px', maxHeight: '80vh' }}
          >
            {/* Modal Search Header */}
            <div className="p-3 border-bottom d-flex align-items-center gap-2">
              {loading ? (
                <Loader2 size={18} className="spinner-border spinner-border-sm text-primary flex-shrink-0" />
              ) : (
                <Search size={18} className="text-muted flex-shrink-0" />
              )}
              <input
                ref={inputRef}
                type="text"
                className="form-control border-0 shadow-none fs-6 bg-transparent p-0"
                placeholder="Search members, inbox, events, offers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button onClick={() => setQuery('')} className="btn btn-sm text-muted p-1 border-0">
                  <X size={16} />
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)} 
                className="btn btn-sm btn-light rounded-circle p-1 border-0 ms-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results Counter / Title Header */}
            {query.length >= 2 && (
              <div className="px-3 py-2 border-bottom bg-light d-flex justify-content-between align-items-center">
                <span className="text-uppercase fw-bold text-secondary fs-8">Search Results</span>
                <span className="badge bg-primary rounded-pill fs-8">{totalCount} Found</span>
              </div>
            )}

            {/* Results Scrollable Area */}
            <div className="overflow-y-auto flex-grow-1 p-2">
              {query.length < 2 && (
                <div className="p-5 text-center text-muted fs-8">
                  Type at least 2 characters to search...
                </div>
              )}

              {query.length >= 2 && totalCount === 0 && !loading && (
                <div className="p-5 text-center text-muted fs-8">
                  No matching records found for "{query}".
                </div>
              )}

              {/* Members Category */}
              {results.members.length > 0 && (
                <div className="mb-2 p-1">
                  <div className="text-primary fw-bold fs-8 mb-1 px-2 d-flex align-items-center gap-1">
                    <User size={13} /> Registered Members ({results.members.length})
                  </div>
                  {results.members.map((m) => (
                    <div
                      key={m.uid}
                      onClick={() => handleNavigate('/admin/members')}
                      className="p-2.5 rounded-3 hover-bg-light cursor-pointer d-flex align-items-center justify-content-between"
                    >
                      <div className="overflow-hidden">
                        <h6 className="fw-bold text-dark fs-8 mb-0 text-truncate">{m.name || 'User'}</h6>
                        <small className="text-muted fs-8 d-block text-truncate">{m.email}</small>
                      </div>
                      <ArrowRight size={14} className="text-muted flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Inbox Messages Category */}
              {results.inbox.length > 0 && (
                <div className="mb-2 p-1 border-top">
                  <div className="fw-bold fs-8 mb-1 px-2 pt-2 d-flex align-items-center gap-1" style={{ color: '#6b21a8' }}>
                    <Inbox size={13} /> Inbox Messages ({results.inbox.length})
                  </div>
                  {results.inbox.map((i) => (
                    <div
                      key={i.id}
                      onClick={() => handleNavigate('/admin/inbox')}
                      className="p-2.5 rounded-3 hover-bg-light cursor-pointer d-flex align-items-center justify-content-between"
                    >
                      <div className="overflow-hidden">
                        <h6 className="fw-bold text-dark fs-8 mb-0 text-truncate">{i.name} - <span className="fw-normal text-secondary">{i.subject || 'Message'}</span></h6>
                        <small className="text-muted fs-8 d-block text-truncate">"{i.message}"</small>
                      </div>
                      <ArrowRight size={14} className="text-muted flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Events Category */}
              {results.events.length > 0 && (
                <div className="mb-2 p-1 border-top">
                  <div className="text-success fw-bold fs-8 mb-1 px-2 pt-2 d-flex align-items-center gap-1">
                    <Calendar size={13} /> Events ({results.events.length})
                  </div>
                  {results.events.map((e) => (
                    <div
                      key={e.id}
                      onClick={() => handleNavigate('/admin/eventdetails')}
                      className="p-2.5 rounded-3 hover-bg-light cursor-pointer d-flex align-items-center justify-content-between"
                    >
                      <div className="overflow-hidden">
                        <h6 className="fw-bold text-dark fs-8 mb-0 text-truncate">{e.title}</h6>
                        <small className="text-muted fs-8 d-block text-truncate">{e.location}</small>
                      </div>
                      <ArrowRight size={14} className="text-muted flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* Offers Category */}
              {results.offers.length > 0 && (
                <div className="p-1 border-top">
                  <div className="text-danger fw-bold fs-8 mb-1 px-2 pt-2 d-flex align-items-center gap-1">
                    <Tag size={13} /> Special Offers ({results.offers.length})
                  </div>
                  {results.offers.map((o) => (
                    <div
                      key={o.id}
                      onClick={() => handleNavigate('/admin/offers/delete')}
                      className="p-2.5 rounded-3 hover-bg-light cursor-pointer d-flex align-items-center justify-content-between"
                    >
                      <div className="overflow-hidden">
                        <h6 className="fw-bold text-dark fs-8 mb-0 text-truncate">{o.title}</h6>
                        <small className="text-muted fs-8 d-block text-truncate">Code: {o.code || 'N/A'}</small>
                      </div>
                      <ArrowRight size={14} className="text-muted flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}