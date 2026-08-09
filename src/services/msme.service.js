import { msmeService } from '@/services/msme.service';
import { showToast } from '@/utils/toast';

export const msmeController = {
  // Fetch Single User Application
  async fetchUserApplication(email) {
    try {
      return await msmeService.getApplicationByEmail(email);
    } catch (error) {
      console.error('Fetch MSME Error:', error);
      showToast('error', 'Failed to load MSME details.');
      return null;
    }
  },

  // Save / Submit Form
  async submitForm(email, formData) {
    try {
      if (!formData.applicantName || !formData.phone || !formData.firmName) {
        throw new Error('Please fill all required basic fields.');
      }
      await msmeService.submitApplication(email, formData);
      showToast('success', 'MSME Registration Request Saved Successfully!');
      return true;
    } catch (error) {
      console.error('Submit MSME Error:', error);
      showToast('error', error.message || 'Failed to submit MSME application.');
      throw error;
    }
  },

  // Admin: Fetch All
  async fetchAllApplications() {
    try {
      return await msmeService.getAllApplications();
    } catch (error) {
      console.error('Admin MSME Fetch Error:', error);
      showToast('error', 'Failed to load MSME applications list.');
      return [];
    }
  },

  // Admin: Status Change
  async changeStatus(email, status) {
    try {
      await msmeService.updateStatus(email, status);
      showToast('success', `Status updated to ${status}`);
      return true;
    } catch (error) {
      console.error('Status Update Error:', error);
      showToast('error', 'Failed to update status.');
      throw error;
    }
  },

  // Admin: Delete Application
  async removeApplication(email) {
    try {
      await msmeService.deleteApplication(email);
      showToast('success', 'Application record deleted.');
      return true;
    } catch (error) {
      console.error('Delete MSME Error:', error);
      showToast('error', 'Failed to delete record.');
      throw error;
    }
  }
};