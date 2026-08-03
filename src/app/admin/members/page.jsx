'use client';

import { useEffect, useState } from 'react';
import { memberController } from '@/controllers/member.controller';

export default function AdminMembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const data = await memberController.fetchMembers();
      setMembers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await memberController.changeStatus(id, status);
      await loadMembers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to remove this record?')) {
      try {
        await memberController.removeMember(id);
        await loadMembers();
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3 className="fw-extrabold text-dark m-0" style={{ fontWeight: 900 }}>Members & Stalls</h3>
          <p className="text-secondary fs-7 m-0">Approve, decline or update stall applications</p>
        </div>
        <button onClick={loadMembers} className="btn btn-outline-secondary rounded-pill fw-bold">
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh
        </button>
      </div>

      <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="bg-light fs-7 text-uppercase fw-bold text-muted">
              <tr>
                <th className="ps-4">Applicant</th>
                <th>Brand Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th className="pe-4 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="spinner-border text-logo-orange" role="status"></div>
                  </td>
                </tr>
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">No registrations found.</td>
                </tr>
              ) : (
                members.map((m) => (
                  <tr key={m.id}>
                    <td className="ps-4">
                      <strong className="d-block text-dark">{m.name || 'N/A'}</strong>
                      <small className="text-muted">{m.email}</small>
                    </td>
                    <td>{m.brandName || 'N/A'}</td>
                    <td>{m.phone || 'N/A'}</td>
                    <td>
                      <span className={`badge rounded-pill ${m.status === 'Approved' ? 'bg-success' : m.status === 'Declined' ? 'bg-danger' : 'bg-warning text-dark'}`}>
                        {m.status || 'Pending'}
                      </span>
                    </td>
                    <td className="pe-4 text-end">
                      <div className="d-inline-flex gap-2">
                        <button 
                          onClick={() => handleStatusChange(m.id, 'Approved')}
                          className="btn btn-sm btn-success rounded-pill fw-bold"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleStatusChange(m.id, 'Declined')}
                          className="btn btn-sm btn-outline-danger rounded-pill fw-bold"
                        >
                          Decline
                        </button>
                        <button 
                          onClick={() => handleDelete(m.id)}
                          className="btn btn-sm btn-light text-danger rounded-circle"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}