'use client';

import { useState, useEffect } from 'react';
import { userService } from '@/services/user.service';
import { showToast } from '@/utils/toast';
import { Users, Search, Mail, Phone, ShieldCheck, UserCheck, Loader2, RefreshCw, Trash2 } from 'lucide-react';

const ADMIN_EMAIL = 'hridesh027@gmail.com';

export default function AdminMembersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch {
      showToast('error', 'Failed to load users list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Complete User Delete Function
  const handleDeleteUser = async (uid, email) => {
    if (email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      showToast('error', 'Main Admin account cannot be deleted!');
      return;
    }

    if (confirm(`Are you sure you want to permanently delete user: ${email || uid}?`)) {
      setDeletingId(uid);
      try {
        await userService.deleteUser(uid);
        setUsers((prevUsers) => prevUsers.filter((user) => user.uid !== uid));
        showToast('success', 'Member record deleted successfully');
      } catch {
        showToast('error', 'Failed to delete member');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.mobile?.includes(term)
    );
  });

  return (
    <div className="container-fluid py-3 px-3 px-md-4">
      {/* Header & Controls Section */}
      <div className="row align-items-center justify-content-between g-3 mb-4 pb-3 border-bottom">
        <div className="col-12 col-lg-5">
          <h4 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <Users className="text-primary" size={24} /> Registered Members
          </h4>
          <p className="text-muted text-secondary small mb-0">List of all registered users and admin access logs</p>
        </div>

        <div className="col-12 col-lg-7 d-flex align-items-center justify-content-lg-end gap-2">
          <div className="input-group shadow-sm rounded-pill overflow-hidden bg-white border" style={{ maxWidth: 320 }}>
            <span className="input-group-text bg-transparent border-0 text-muted ps-3">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control border-0 bg-transparent py-2 shadow-none"
              placeholder="Search name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button 
            onClick={fetchUsers} 
            className="btn btn-white border rounded-circle p-2 text-secondary shadow-sm d-flex align-items-center justify-content-center flex-shrink-0"
            title="Refresh Users List"
            style={{ width: 40, height: 40 }}
          >
            <RefreshCw size={16} className={loading ? 'text-primary' : ''} />
          </button>
        </div>
      </div>

      {/* Stats Counter */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card border-0 rounded-4 shadow-sm p-3 bg-white d-flex flex-row align-items-center gap-3">
            <div className="bg-primary-subtle text-primary p-3 rounded-circle">
              <Users size={22} />
            </div>
            <div>
              <h5 className="fw-bold text-dark mb-0">{users.length}</h5>
              <small className="text-muted fw-semibold">Total Accounts</small>
            </div>
          </div>
        </div>
      </div>

      {/* Content View */}
      {loading ? (
        <div className="text-center py-5">
          <Loader2 className="spinner-border text-primary" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-white">
          <p className="text-muted fw-medium mb-0">No members found matching your search.</p>
        </div>
      ) : (
        <div className="mb-2 pb-5 mb-lg-0 pb-lg-0">
          {/* Desktop Table View */}
          <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden d-none d-md-block">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light border-bottom">
                  <tr className="text-uppercase text-secondary fs-7 fw-bold">
                    <th className="ps-4 py-3">Member</th>
                    <th className="py-3">Contact Email</th>
                    <th className="py-3">Mobile Number</th>
                    <th className="py-3">Account Type</th>
                    <th className="pe-4 py-3 text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => {
                    const isUserAdmin = u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() || u.role === 'admin';

                    return (
                      <tr key={u.uid}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 40, height: 40 }}>
                              {u.photoURL ? (
                                <img src={u.photoURL} alt={u.name} className="w-100 h-100 object-fit-cover" />
                              ) : (
                                <span className="fw-bold text-primary">
                                  {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                                </span>
                              )}
                            </div>
                            <div>
                              <h6 className="fw-bold text-dark mb-0">{u.name || 'Unnamed User'}</h6>
                            </div>
                          </div>
                        </td>

                        <td className="py-3">
                          <span className="d-flex align-items-center gap-2 text-secondary">
                            <Mail size={14} className="text-muted flex-shrink-0" /> {u.email || 'N/A'}
                          </span>
                        </td>

                        <td className="py-3">
                          <span className="d-flex align-items-center gap-2 text-secondary">
                            <Phone size={14} className="text-muted flex-shrink-0" /> {u.mobile || 'Not Provided'}
                          </span>
                        </td>

                        <td className="py-3">
                          {isUserAdmin ? (
                            <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-1 fw-bold d-inline-flex align-items-center gap-1">
                              <ShieldCheck size={13} /> Admin
                            </span>
                          ) : (
                            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-bold d-inline-flex align-items-center gap-1">
                              <UserCheck size={13} /> Member
                            </span>
                          )}
                        </td>

                        <td className="pe-4 py-3 text-end">
                          {!isUserAdmin ? (
                            <button
                              onClick={() => handleDeleteUser(u.uid, u.email)}
                              disabled={deletingId === u.uid}
                              className="btn btn-sm btn-outline-danger rounded-circle p-2 d-inline-flex align-items-center justify-content-center"
                              title="Delete Member"
                              style={{ width: 34, height: 34 }}
                            >
                              {deletingId === u.uid ? (
                                <Loader2 size={14} className="spinner-border spinner-border-sm" />
                              ) : (
                                <Trash2 size={14} />
                              )}
                            </button>
                          ) : (
                            <span className="badge bg-light text-muted border rounded-pill px-2.5 py-1 fs-8">System Admin</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card Stack View */}
          <div className="d-md-none d-flex flex-column gap-3">
            {filteredUsers.map((u) => {
              const isUserAdmin = u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() || u.role === 'admin';

              return (
                <div key={u.uid} className="card border-0 rounded-4 shadow-sm p-3 bg-white">
                  <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 40, height: 40 }}>
                        {u.photoURL ? (
                          <img src={u.photoURL} alt={u.name} className="w-100 h-100 object-fit-cover" />
                        ) : (
                          <span className="fw-bold text-primary">
                            {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                          </span>
                        )}
                      </div>
                      <h6 className="fw-bold text-dark mb-0">{u.name || 'Unnamed User'}</h6>
                    </div>
                    
                    {!isUserAdmin && (
                      <button
                        onClick={() => handleDeleteUser(u.uid, u.email)}
                        disabled={deletingId === u.uid}
                        className="btn btn-sm btn-outline-danger border-0 p-1"
                        title="Delete Member"
                      >
                        {deletingId === u.uid ? <Loader2 size={16} className="spinner-border spinner-border-sm" /> : <Trash2 size={16} />}
                      </button>
                    )}
                  </div>

                  <div className="d-flex flex-column gap-2 small text-secondary">
                    <div className="d-flex align-items-center gap-2">
                      <Mail size={14} className="text-muted flex-shrink-0" />
                      <span className="text-truncate">{u.email || 'N/A'}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Phone size={14} className="text-muted flex-shrink-0" />
                      <span>{u.mobile || 'Not Provided'}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-top d-flex justify-content-between align-items-center">
                    <span className="text-muted small">Role:</span>
                    {isUserAdmin ? (
                      <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-2.5 py-1 fw-bold d-inline-flex align-items-center gap-1">
                        <ShieldCheck size={13} /> Admin
                      </span>
                    ) : (
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1 fw-bold d-inline-flex align-items-center gap-1">
                        <UserCheck size={13} /> Member
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}