'use client';

import { useEffect, useState } from 'react';
import { paymentController } from '@/controllers/payment.controller';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPayments() {
      try {
        const data = await paymentController.fetchPayments();
        setPayments(data);
      } catch (err) {
        console.error('Failed to load payments:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPayments();
  }, []);

  const formatDate = (dateValue) => {
    if (!dateValue) return 'Recent';
    if (dateValue?.seconds) {
      return new Date(dateValue.seconds * 1000).toLocaleDateString('en-IN');
    }
    return new Date(dateValue).toLocaleDateString('en-IN');
  };

  return (
    <div className="p-3 p-md-4">
      <div className="mb-4">
        <h3 className="fw-extrabold text-dark m-0" style={{ fontWeight: 900 }}>
          Payment Transactions
        </h3>
        <p className="text-secondary fs-7 m-0">
          PhonePe & Razorpay transaction logs for memberships and bookings
        </p>
      </div>

      <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="bg-light fs-7 text-uppercase fw-bold text-muted">
              <tr>
                <th className="ps-4">Transaction ID</th>
                <th>Member / Email</th>
                <th>Type</th>
                <th>Gateway</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="pe-4 text-end">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-muted">
                    No payment logs recorded yet.
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id}>
                    <td className="ps-4 font-monospace fw-bold text-primary fs-7">
                      {p.paymentId}
                    </td>
                    <td>
                      <div className="fw-bold text-dark fs-7">{p.name}</div>
                      <small className="text-muted fs-8">{p.email}</small>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border rounded-pill fs-9">
                        {p.type}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill fs-9 ${p.gateway?.toLowerCase().includes('phonepe')
                          ? 'text-white'
                          : 'bg-info text-dark'
                          }`}
                        style={
                          p.gateway?.toLowerCase().includes('phonepe')
                            ? { backgroundColor: '#5f259f' }
                            : {}
                        }
                      >
                        {p.gateway || 'PhonePe'}
                      </span>
                    </td>
                    <td className="fw-bold text-dark">₹{p.amount || 0}.00</td>
                    <td>
                      <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-2.5 py-1 fs-9">
                        {p.status?.toUpperCase() || 'PAID'}
                      </span>
                    </td>
                    <td className="pe-4 text-end text-muted fs-7">
                      {formatDate(p.createdAt)}
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