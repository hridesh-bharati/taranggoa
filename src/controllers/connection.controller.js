import { connectionService } from '@/services/connection.service';
import { showToast } from '@/utils/toast';

export const connectionController = {
  async handleConnect(currentUserId, targetUserId) {
    if (!currentUserId) return showToast('error', 'Please login to connect');
    if (currentUserId === targetUserId) return;

    try {
      await connectionService.sendConnectionRequest(currentUserId, targetUserId);
      showToast('success', 'Connection request sent!');
    } catch {
      showToast('error', 'Failed to send request');
    }
  },

  async handleAccept(currentUserId, targetUserId) {
    try {
      await connectionService.acceptConnectionRequest(currentUserId, targetUserId);
      showToast('success', 'Connection accepted!');
    } catch {
      showToast('error', 'Failed to accept');
    }
  },

  async handleDisconnect(currentUserId, targetUserId) {
    try {
      await connectionService.removeConnection(currentUserId, targetUserId);
      showToast('info', 'Connection removed');
    } catch {
      showToast('error', 'Action failed');
    }
  }
};