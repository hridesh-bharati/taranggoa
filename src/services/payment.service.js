// src\services\payment.service.js
import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export const paymentService = {
  // 1. Script Loader
  loadRazorpayScript() {
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
  },

  // 2. Open Gateway Popup
  openCheckout({ amount, orderId, userDetails, onSuccess, onFailure }) {
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!key) {
      onFailure(new Error('Razorpay Key ID is missing in environment variables.'));
      return;
    }

    const options = {
      key: key,
      amount: amount * 100, // Amount in paise (99900)
      currency: 'INR',
      name: 'Tarang Women Entrepreneurs',
      description: 'Annual Membership Registration Fee',
      image: '/logo.png',
      order_id: orderId,
      prefill: {
        name: userDetails.fullName || '',
        email: userDetails.email || '',
        contact: userDetails.phone || '',
      },
      notes: {
        businessName: userDetails.businessName || '',
        category: userDetails.category || '',
      },
      theme: {
        color: '#1e3a8a',
      },
      handler: function (response) {
        onSuccess(response);
      },
      modal: {
        ondismiss: function () {
          onFailure(new Error('Payment process cancelled by user.'));
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  },

  // 3. Update Payment Status in Firestore
  async updatePaymentRecord(emailId, paymentDetails) {
    const cleanEmail = emailId.toLowerCase().trim();
    const docRef = doc(db, 'memberships', cleanEmail);

    await updateDoc(docRef, {
      paymentStatus: 'PAID',
      status: 'approved', // Auto-approve on successful payment
      razorpayPaymentId: paymentDetails.razorpay_payment_id || '',
      razorpayOrderId: paymentDetails.razorpay_order_id || '',
      razorpaySignature: paymentDetails.razorpay_signature || '',
      paidAt: serverTimestamp(),
    });
  }
};