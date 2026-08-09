// src\controllers\payment.controller.jsimport { paymentService } from '@/services/payment.service';
import { paymentService } from '@/services/payment.service';

export const paymentController = {
  // Trigger PhonePe payment & handle redirect
  async initiateMembershipPayment({ userDetails, onError }) {
    try {
      const data = await paymentService.initiatePhonePe(userDetails, 999);
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error('PhonePe Redirect URL missing.');
      }
    } catch (err) {
      if (onError) onError(err);
    }
  },

  // Fetch all payment logs for Admin Panel
  async fetchAllPayments() {
    try {
      const [memberships, bookings] = await Promise.all([
        paymentService.getMembershipPayments(),
        paymentService.getBookingPayments(),
      ]);

      const all = [...memberships, ...bookings];
      return all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error('Error in paymentController:', error);
      throw error;
    }
  },
};