import { paymentService } from '@/services/payment.service';

export const paymentController = {
  async fetchPayments() {
    try {
      return await paymentService.getAllPayments();
    } catch (error) {
      console.error('Fetch Payments Error:', error);
      throw new Error('Failed to load payment transactions.');
    }
  }
};