import { memberService } from '@/services/member.service';

export const memberController = {
  async fetchMembers() {
    try {
      return await memberService.getAllMembers();
    } catch (error) {
      console.error('Fetch Members Error:', error);
      throw new Error('Failed to load members list.');
    }
  },

  async changeStatus(id, status) {
    try {
      await memberService.updateMemberStatus(id, status);
      return { success: true };
    } catch (error) {
      console.error('Update Status Error:', error);
      throw new Error('Could not update member status.');
    }
  },

  async removeMember(id) {
    try {
      await memberService.deleteMember(id);
      return { success: true };
    } catch (error) {
      console.error('Delete Member Error:', error);
      throw new Error('Could not delete member record.');
    }
  }
};