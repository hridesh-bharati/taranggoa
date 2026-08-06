import { showToast } from '@/utils/toast';

export const phonePeController = {
  async initiateMembershipPayment({ userDetails, onError }) {
    try {
      const res = await fetch('/api/payment/phonepe-initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 999,
          userDetails,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'PhonePe payment initialization failed.');
      }

      // PhonePe PG Checkout Page par Redirect karein
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error('PhonePe Redirect URL missing.');
      }
    } catch (err) {
      onError(err);
    }
  }
};