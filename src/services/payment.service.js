import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const paymentService = {
  // 1. Create Razorpay Order
  async createRazorpayOrder(userDetails, amount = 999) {
    const res = await fetch('/api/payment/razorpay-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, userDetails }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Razorpay order creation failed.');
    }
    return data;
  },

  // 2. Verify Razorpay Payment Signature
  async verifyPayment(verificationData) {
    const res = await fetch('/api/payment/razorpay-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(verificationData),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Payment signature verification failed.');
    }
    return data;
  },

  // 3. Fetch All Membership Payments
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
            paymentId: item.paymentId || data.razorpayPaymentId || data.lastTransactionId || 'N/A',
            gateway: item.gateway || 'Razorpay',
            status: item.status || data.paymentStatus || 'PAID',
            createdAt: item.date || data.startDate || new Date().toISOString(),
          });
        });
      } else if (data.paymentStatus === 'PAID' || data.razorpayPaymentId) {
        payments.push({
          id: docSnap.id,
          type: 'Membership',
          email: data.email || docSnap.id,
          name: data.fullName || data.name || 'Member',
          amount: data.amount || 999,
          paymentId: data.razorpayPaymentId || data.lastTransactionId || 'N/A',
          gateway: 'Razorpay',
          status: data.paymentStatus || 'PAID',
          createdAt: data.startDate || data.updatedAt || new Date().toISOString(),
        });
      }
    });

    return payments;
  },

  // 4. Fetch Stall Booking Payments
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
          gateway: data.gateway || 'Razorpay',
          status: data.status || 'PAID',
          createdAt: data.createdAt || new Date().toISOString(),
        };
      });
    } catch {
      return [];
    }
  },
};