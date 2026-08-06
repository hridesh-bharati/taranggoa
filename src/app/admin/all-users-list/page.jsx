// src\app\admin\members\page.jsx isme aa rha  user ka pic saare DB cooneected nhi h kjya.. email key bole the nn
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/user.service';
import { showToast } from '@/utils/toast';
import { Users, Mail, Phone, ShieldCheck, UserCheck, Loader2, Trash2 } from 'lucide-react';

export default function AdminMembersPage() {
  const { user: currentUser, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data || []);
    } catch {
      showToast('error', 'Failed to load users list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (uid, email) => {
    // Prevent deletion if targeting the main admin or current logged-in admin
    if (email?.toLowerCase() === currentUser?.email?.toLowerCase() || isAdmin) {
      showToast('error', 'Admin account cannot be deleted!');
      return;
    }

    if (confirm(`Are you sure you want to permanently delete user: ${email || uid}?`)) {
      setDeletingId(uid);
      try {
        await userService.deleteUser(uid);
        setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== uid));
        showToast('success', 'Member record deleted successfully');
      } catch {
        showToast('error', 'Failed to delete member');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="container-fluid  p-0 pb-3 mb-5  px-md-4">

      {/* Compact Gradient Header */}
      <div
        className="card border-0 rounded-4 shadow-sm p-3 mb-3 bg-primary-gradient">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5 className="fw-bold text-white m-0 d-flex align-items-center gap-2">
              <Users className="text-white" size={22} /> Registered Members
            </h5>
            <small className="text-light fs-8">Manage system users and access privileges</small>
          </div>

          <span className="badge bg-white text-primary border shadow-sm rounded-pill px-3 py-2 fw-bold fs-7">
            {users.length} Users
          </span>
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="text-center py-5">
          <Loader2 className="spinner-border text-primary" style={{ width: '2rem', height: '2rem' }} />
        </div>
      ) : users.length === 0 ? (
        <div className="card border-0 rounded-4 shadow-sm p-4 text-center bg-white my-3">
          <p className="text-muted fw-medium mb-0">No registered members found.</p>
        </div>
      ) : (
        <div>
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
                  {users.map((u) => {
                    const isTargetAdmin = u.role === 'admin' || u.email?.toLowerCase() === currentUser?.email?.toLowerCase();

                    return (
                      <tr key={u.uid}>
                        <td className="ps-4 py-3">
                          <Link
                            href={`/profile/${u.uid}`}
                            className="text-decoration-none d-inline-block"
                            title={`View ${u.name || 'User'}'s Profile`}
                          >
                            <div className="d-flex align-items-center gap-3">
                              <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 38, height: 38 }}>
                                {u.photoURL ? (
                                  <img src={u.photoURL} alt={u.name} className="w-100 h-100 object-fit-cover" />
                                ) : (
                                  <span className="fw-bold text-primary">
                                    {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                                  </span>
                                )}
                              </div>
                              <h6 className="fw-bold text-dark mb-0 hover-text-primary">{u.name || 'Unnamed User'}</h6>
                            </div>
                          </Link>
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
                          {isTargetAdmin ? (
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
                          {!isTargetAdmin ? (
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
            {users.map((u) => {
              const isTargetAdmin = u.role === 'admin' || u.email?.toLowerCase() === currentUser?.email?.toLowerCase();

              return (
                <div key={u.uid} className="card border-0 rounded-4 shadow-sm p-3 bg-white">
                  <div className="d-flex align-items-center justify-content-between mb-2 pb-2 border-bottom">
                    <Link
                      href={`/profile/${u.uid}`}
                      className="text-decoration-none"
                      title={`View ${u.name || 'User'}'s Profile`}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: 36, height: 36 }}>
                          {u.photoURL ? (
                            <img src={u.photoURL} alt={u.name} className="w-100 h-100 object-fit-cover" />
                          ) : (
                            <span className="fw-bold text-primary ms-2">
                              {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                            </span>
                          )}
                        </div>
                        <h6 className="fw-bold text-dark mb-0 fs-6 hover-text-primary">{u.name || 'Unnamed User'}</h6>
                      </div>
                    </Link>

                    {!isTargetAdmin && (
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

                  <div className="d-flex flex-column gap-1.5 small text-secondary">
                    <div className="d-flex align-items-center gap-2">
                      <Mail size={14} className="text-muted flex-shrink-0" />
                      <span className="text-truncate">{u.email || 'N/A'}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Phone size={14} className="text-muted flex-shrink-0" />
                      <span>{u.mobile || 'Not Provided'}</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-top d-flex justify-content-between align-items-center">
                    <span className="text-muted fs-8">Role:</span>
                    {isTargetAdmin ? (
                      <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-2.5 py-1 fw-bold fs-8 d-inline-flex align-items-center gap-1">
                        <ShieldCheck size={12} /> Admin
                      </span>
                    ) : (
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-2.5 py-1 fw-bold fs-8 d-inline-flex align-items-center gap-1">
                        <UserCheck size={12} /> Member
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