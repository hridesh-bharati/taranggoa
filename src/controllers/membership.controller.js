import { membershipService } from '@/services/membership.service';

export const membershipController = {
  // Save Membership in DB only after PhonePe Payment Success
  async submitPaidMembership(formData, paymentResponse) {
    if (!formData.fullName || !formData.phone || !formData.email) {
      throw new Error('Please fill all required fields.');
    }
    return await membershipService.createPaidMembership(formData, paymentResponse);
  },

  // Fetch Admin Applications List with Expiry Calculation
  async fetchAdminList() {
    return await membershipService.getAllApplications();
  },

  // Update Status
  async changeStatus(id, status) {
    return await membershipService.updateStatus(id, status);
  },

  // Delete Record
  async removeRecord(id) {
    return await membershipService.deleteApplication(id);
  }
};