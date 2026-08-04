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

  const searchRef = useRef(null);
  const router = useRouter();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Universal Dynamic Search Query
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults({ members: [], inbox: [], events: [], offers: [] });
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setIsOpen(true);
      try {
        const term = query.toLowerCase();

        // Parallel Fetch from all sources
        const [users, inquiries, events, offersSnap] = await Promise.all([
          userService.getAllUsers().catch(() => []),
          contactService.getAllInquiries().catch(() => []),
          eventController.fetchAllEvents().catch(() => []),
          getDocs(collection(db, 'offers')).catch(() => ({ docs: [] }))
        ]);

        const offersList = offersSnap.docs ? offersSnap.docs.map(d => ({ id: d.id, ...d.data() })) : [];

        // 1. Members
        const filteredMembers = users.filter((u) =>
          u.name?.toLowerCase().includes(term) ||
          u.email?.toLowerCase().includes(term) ||
          u.mobile?.includes(term)
        ).slice(0, 3);

        // 2. Inbox
        const filteredInbox = inquiries.filter((i) =>
          i.name?.toLowerCase().includes(term) ||
          i.email?.toLowerCase().includes(term) ||
          i.subject?.toLowerCase().includes(term) ||
          i.message?.toLowerCase().includes(term)
        ).slice(0, 3);

        // 3. Events
        const filteredEvents = events.filter((e) =>
          e.title?.toLowerCase().includes(term) ||
          e.location?.toLowerCase().includes(term) ||
          e.description?.toLowerCase().includes(term)
        ).slice(0, 3);

        // 4. Offers
        const filteredOffers = offersList.filter((o) =>
          o.title?.toLowerCase().includes(term) ||
          o.code?.toLowerCase().includes(term)
        ).slice(0, 3);

        setResults({
          members: filteredMembers,
          inbox: filteredInbox,
          events: filteredEvents,
          offers: filteredOffers
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
    <div className="position-relative" ref={searchRef} style={{ width: '100%', maxWidth: '280px' }}>
      {/* Topbar Search Input */}
      <div className="input-group shadow-sm rounded-pill border overflow-hidden bg-light position-relative">
        <span className="input-group-text bg-transparent border-0 text-muted ps-3 py-1.5">
          {loading ? (
            <Loader2 size={15} className="spinner-border spinner-border-sm text-primary" />
          ) : (
            <Search size={15} />
          )}
        </span>
        <input
          type="text"
          className="form-control border-0 bg-transparent py-1.5 fs-8 shadow-none"
          placeholder="Search members, events, inbox..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
        />
        {query && (
          <button onClick={() => { setQuery(''); setIsOpen(false); }} className="btn btn-sm text-muted pe-2 py-0 border-0">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Live Dropdown Popup */}
      {isOpen && (
        <div 
          className="position-absolute top-100 start-0 end-0 mt-2 bg-white rounded-4 shadow-lg border overflow-hidden z-3" 
          style={{ minWidth: '320px' }}
        >
          <div className="p-2 border-bottom bg-light d-flex justify-content-between align-items-center">
            <span className="text-uppercase fw-bold text-secondary fs-8">Live Search Results</span>
            <span className="badge bg-primary rounded-pill fs-8">{totalCount} Found</span>
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: '380px' }}>
            {totalCount === 0 && !loading && (
              <div className="p-4 text-center text-muted fs-8">
                No matching records found for "{query}".
              </div>
            )}

            {/* Members Category */}
            {results.members.length > 0 && (
              <div className="p-2 border-bottom">
                <div className="text-primary fw-bold fs-8 mb-1 px-2 d-flex align-items-center gap-1">
                  <User size={13} /> Registered Members ({results.members.length})
                </div>
                {results.members.map((m) => (
                  <div
                    key={m.uid}
                    onClick={() => handleNavigate('/admin/members')}
                    className="p-2 rounded-3 hover-bg-light cursor-pointer d-flex align-items-center justify-content-between"
                  >
                    <div className="overflow-hidden">
                      <h6 className="fw-bold text-dark fs-8 mb-0 text-truncate">{m.name || 'User'}</h6>
                      <small className="text-muted fs-8 d-block text-truncate">{m.email}</small>
                    </div>
                    <ArrowRight size={13} className="text-muted flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}

            {/* Inbox Messages Category */}
            {results.inbox.length > 0 && (
              <div className="p-2 border-bottom">
                <div className="fw-bold fs-8 mb-1 px-2 d-flex align-items-center gap-1" style={{ color: '#6b21a8' }}>
                  <Inbox size={13} /> Inbox Messages ({results.inbox.length})
                </div>
                {results.inbox.map((i) => (
                  <div
                    key={i.id}
                    onClick={() => handleNavigate('/admin/inbox')}
                    className="p-2 rounded-3 hover-bg-light cursor-pointer d-flex align-items-center justify-content-between"
                  >
                    <div className="overflow-hidden">
                      <h6 className="fw-bold text-dark fs-8 mb-0 text-truncate">{i.name} - <span className="fw-normal text-secondary">{i.subject || 'Message'}</span></h6>
                      <small className="text-muted fs-8 d-block text-truncate">"{i.message}"</small>
                    </div>
                    <ArrowRight size={13} className="text-muted flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}

            {/* Events Category */}
            {results.events.length > 0 && (
              <div className="p-2 border-bottom">
                <div className="text-success fw-bold fs-8 mb-1 px-2 d-flex align-items-center gap-1">
                  <Calendar size={13} /> Events ({results.events.length})
                </div>
                {results.events.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => handleNavigate('/admin/eventdetails')}
                    className="p-2 rounded-3 hover-bg-light cursor-pointer d-flex align-items-center justify-content-between"
                  >
                    <div className="overflow-hidden">
                      <h6 className="fw-bold text-dark fs-8 mb-0 text-truncate">{e.title}</h6>
                      <small className="text-muted fs-8 d-block text-truncate">{e.location}</small>
                    </div>
                    <ArrowRight size={13} className="text-muted flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}

            {/* Offers Category */}
            {results.offers.length > 0 && (
              <div className="p-2">
                <div className="text-danger fw-bold fs-8 mb-1 px-2 d-flex align-items-center gap-1">
                  <Tag size={13} /> Special Offers ({results.offers.length})
                </div>
                {results.offers.map((o) => (
                  <div
                    key={o.id}
                    onClick={() => handleNavigate('/admin/offers/delete')}
                    className="p-2 rounded-3 hover-bg-light cursor-pointer d-flex align-items-center justify-content-between"
                  >
                    <div className="overflow-hidden">
                      <h6 className="fw-bold text-dark fs-8 mb-0 text-truncate">{o.title}</h6>
                      <small className="text-muted fs-8 d-block text-truncate">Code: {o.code || 'N/A'}</small>
                    </div>
                    <ArrowRight size={13} className="text-muted flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}