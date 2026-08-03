'use client';

import { useState, useEffect } from 'react';
import { userService } from '@/services/user.service';
import { showToast } from '@/utils/toast';
import { Users, Search, Mail, Phone, ShieldCheck, UserCheck, Loader2, RefreshCw } from 'lucide-react';

export default function AdminMembersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Search Filter (by Name, Email, or Mobile)
  const filteredUsers = users.filter(user => {
    const term = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.mobile?.includes(term)
    );
  });

  return (
    <div className="container-fluid py-2 px-2 px-md-3 px-lg-4">
      {/* Header & Search Bar */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-black text-dark mb-1 fs-4 d-flex align-items-center gap-2">
            <Users className="text-primary" size={24} /> Registered Members
          </h4>
          <small className="text-muted fw-medium">List of all users logged in through authentication</small>
        </div>

        <div className="d-flex align-items-center gap-2 w-100 w-md-auto">
          {/* Search Input */}
          <div className="input-group shadow-sm rounded-pill overflow-hidden bg-white border flex-grow-1 flex-md-grow-0" style={{ maxWidth: 300 }}>
            <span className="input-group-text bg-transparent border-0 text-muted ps-3">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control border-0 bg-transparent fs-7 py-2"
              placeholder="Search name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Refresh Button */}
          <button 
            onClick={fetchUsers} 
            className="btn btn-light border rounded-circle p-2 text-secondary shadow-sm flex-shrink-0"
            title="Refresh Users List"
          >
            <RefreshCw size={16} className={loading ? 'spin-animation' : ''} />
          </button>
        </div>
      </div>

      {/* Users Count Stats */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-md-4">
          <div className="card border-0 rounded-4 shadow-sm p-3 bg-white d-flex flex-row align-items-center gap-3">
            <div className="bg-primary-subtle text-primary p-3 rounded-circle">
              <Users size={22} />
            </div>
            <div>
              <h5 className="fw-bold text-dark mb-0">{users.length}</h5>
              <small className="text-muted fs-8 fw-semibold">Total Accounts</small>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table / Grid (Mobile Responsive container) */}
      {loading ? (
        <div className="text-center py-5">
          <Loader2 className="spinner-border text-primary" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm p-5 text-center bg-white">
          <p className="text-muted fw-medium mb-0">No members found matching your search.</p>
        </div>
      ) : (
        <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-nowrap">
              <thead className="bg-light border-bottom">
                <tr className="fs-8 text-uppercase text-secondary fw-bold">
                  <th className="ps-3 ps-md-4 py-3">Member</th>
                  <th className="py-3">Contact Email</th>
                  <th className="py-3">Mobile Number</th>
                  <th className="py-3">Account Type</th>
                  <th className="pe-3 pe-md-4 py-3 text-end">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y fs-7">
                {filteredUsers.map((u) => (
                  <tr key={u.uid}>
                    {/* User Profile & Name */}
                    <td className="ps-3 ps-md-4 py-3">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 40, height: 40 }}>
                          {u.photoURL ? (
                            <img src={u.photoURL} alt={u.name} className="w-100 h-100 object-fit-cover" />
                          ) : (
                            <span className="fw-bold text-primary fs-7">
                              {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                            </span>
                          )}
                        </div>
                        <div>
                          <h6 className="fw-bold text-dark mb-0 fs-7">{u.name || 'Unnamed User'}</h6>
                          <small className="text-muted fs-8">UID: {u.uid.slice(0, 8)}...</small>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3">
                      <span className="d-flex align-items-center gap-1.5 text-secondary fw-medium">
                        <Mail size={14} className="text-muted flex-shrink-0" /> {u.email || 'N/A'}
                      </span>
                    </td>

                    {/* Phone */}
                    <td className="py-3">
                      <span className="d-flex align-items-center gap-1.5 text-secondary fw-medium">
                        <Phone size={14} className="text-muted flex-shrink-0" /> {u.mobile || 'Not Provided'}
                      </span>
                    </td>

                    {/* Role Badge */}
                    <td className="py-3">
                      {u.role === 'admin' ? (
                        <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-1 fw-bold fs-8 d-inline-flex align-items-center gap-1">
                          <ShieldCheck size={13} /> Admin
                        </span>
                      ) : (
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 fw-bold fs-8 d-inline-flex align-items-center gap-1">
                          <UserCheck size={13} /> Member
                        </span>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="pe-3 pe-md-4 py-3 text-end">
                      <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2.5 py-1 fw-bold fs-8">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}