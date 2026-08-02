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
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPayments();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <h3 className="fw-extrabold text-dark m-0" style={{ fontWeight: 900 }}>Payment Transactions</h3>
        <p className="text-secondary fs-7 m-0">Razorpay payment logs for stall bookings and memberships</p>
      </div>

      <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="bg-light fs-7 text-uppercase fw-bold text-muted">
              <tr>
                <th className="ps-4">Transaction ID</th>
                <th>Member / Email</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="pe-4 text-end">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="spinner-border text-logo-orange" role="status"></div>
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">No payment logs recorded yet.</td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id}>
                    <td className="ps-4 font-monospace fw-bold text-primary">{p.razorpayPaymentId || p.id}</td>
                    <td>{p.email || 'N/A'}</td>
                    <td className="fw-bold">₹{p.amount || 0}</td>
                    <td>
                      <span className="badge bg-success rounded-pill">Paid</span>
                    </td>
                    <td className="pe-4 text-end text-muted fs-7">
                      {p.createdAt ? new Date(p.createdAt.seconds * 1000).toLocaleDateString() : 'Recent'}
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