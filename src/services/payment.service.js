import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const paymentService = {
  // 1. PhonePe initiate API call
  async initiatePhonePe(userDetails, amount = 999) {
    const res = await fetch('/api/payment/phonepe-initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, userDetails }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Payment initialization failed.');
    }
    return data;
  },

  // 2. Fetch All Membership Payments
  async getMembershipPayments() {
    const snapshot = await getDocs(collection(db, 'memberships'));
    const payments = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.paymentHistory && Array.isArray(data.paymentHistory)) {
        data.paymentHistory.forEach((item, index) => {
          payments.push({
            id: `${docSnap.id}_mem_${index}`,
            type: 'Membership',
            email: data.email || docSnap.id,
            name: data.fullName || data.name || 'Member',
            amount: item.amount || data.amount || 999,
            paymentId: item.paymentId || data.lastTransactionId || 'N/A',
            gateway: item.gateway || (data.phonepeMerchantId ? 'PhonePe' : 'Razorpay'),
            status: item.status || data.paymentStatus || 'PAID',
            createdAt: item.date || data.startDate || new Date().toISOString(),
          });
        });
      } else if (data.paymentStatus === 'PAID' || data.lastTransactionId) {
        payments.push({
          id: docSnap.id,
          type: 'Membership',
          email: data.email || docSnap.id,
          name: data.fullName || data.name || 'Member',
          amount: data.amount || 999,
          paymentId: data.lastTransactionId || 'N/A',
          gateway: data.phonepeMerchantId ? 'PhonePe' : 'Razorpay',
          status: data.paymentStatus || 'PAID',
          createdAt: data.startDate || data.updatedAt || new Date().toISOString(),
        });
      }
    });

    return payments;
  },

  // 3. Fetch Stall Booking Payments
  async getBookingPayments() {
    try {
      const snapshot = await getDocs(collection(db, 'bookings'));
      return snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          type: 'Stall Booking',
          email: data.email || 'N/A',
          name: data.name || 'Vendor',
          amount: data.amount || 0,
          paymentId: data.paymentId || data.transactionId || 'N/A',
          gateway: data.gateway || 'Online',
          status: data.status || 'PAID',
          createdAt: data.createdAt || new Date().toISOString(),
        };
      });
    } catch {
      return [];
    }
  },
};