import { membershipService } from '@/services/membership.service';

export const membershipController = {
  async submitForm(formData) {
    if (!formData.fullName || !formData.phone || !formData.businessName) {
      throw new Error('Please fill all required fields.');
    }
    return await membershipService.createApplication(formData);
  },

  async fetchAdminList() {
    return await membershipService.getAllApplications();
  },

  async changeStatus(id, status) {
    return await membershipService.updateStatus(id, status);
  },

  async removeRecord(id) {
    return await membershipService.deleteApplication(id);
  }
};