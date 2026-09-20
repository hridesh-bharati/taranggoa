import { paymentService } from '@/services/payment.service';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const paymentController = {
  // Launch Razorpay Standard Checkout Popup
  async initiateMembershipPayment({ userDetails, onSuccess, onError }) {
    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        throw new Error('Razorpay SDK failed to load. Check your internet connection.');
      }

      // Step 1: Server se order generate karein
      const orderData = await paymentService.createRazorpayOrder(userDetails, 999);

      // Step 2: Razorpay Popup Options configure karein
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Tarang Women Community',
        description: 'Annual Membership Registration Fee (₹999)',
        order_id: orderData.orderId,
        prefill: {
          name: userDetails.fullName || '',
          email: userDetails.email || '',
          contact: userDetails.phone || '',
        },
        theme: {
          color: '#800020', // Tarang branding primary color
        },
        handler: async function (response) {
          try {
            // Step 3: Signature verify karein
            await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userDetails,
            });

            if (onSuccess) {
              onSuccess(response);
            } else {
              window.location.href = '/user/user-membership-page';
            }
          } catch (verificationError) {
            if (onError) onError(verificationError);
          }
        },
        modal: {
          ondismiss: function () {
            if (onError) onError(new Error('Payment window closed by user.'));
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
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