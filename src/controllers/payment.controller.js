import { paymentService } from '@/services/payment.service';
import { membershipController } from '@/controllers/membership.controller';

export const paymentController = {
  async processMembershipPayment({ userDetails, onSuccess, onError }) {
    try {
      // 1. Script Check
      const isLoaded = await paymentService.loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Please check your network.');
      }

      // 2. Create Order via Next.js API Route
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 999,
          email: userDetails.email,
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.success) {
        throw new Error(orderData.message || 'Failed to create Razorpay Order.');
      }

      // 3. Trigger Razorpay Popup & Save to DB ONLY on Success
      paymentService.openCheckout({
        amount: 999,
        orderId: orderData.orderId,
        userDetails,
        onSuccess: async (response) => {
          try {
            // Save Application to Firestore DB ONLY after 100% successful payment
            await membershipController.submitPaidMembership(userDetails, response);
            onSuccess(response);
          } catch (dbErr) {
            onError(new Error(dbErr.message || 'Payment done but saving details failed. Contact support.'));
          }
        },
        onFailure: (err) => {
          onError(err);
        }
      });

    } catch (err) {
      onError(err);
    }
  }
};