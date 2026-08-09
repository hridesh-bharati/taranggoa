import { communityService } from '@/services/community.service';
import { showToast } from '@/utils/toast';

export const communityController = {
  // Upload Media to Cloudinary via /api/upload
  async uploadMedia(file, userId, onProgress) {
    if (!file) throw new Error('No file selected');

    const formData = new FormData();
    formData.append('file', file);
    if (userId) formData.append('userId', userId);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Real Progress Event Listener
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      });

      xhr.onload = () => {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          resolve(data.url); // Cloudinary secure_url
        } else {
          reject(new Error('Media upload failed'));
        }
      };

      xhr.onerror = () => reject(new Error('Network upload error'));
      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    });
  },

  // Publish Post / Article to Firebase
  async publishPost(postData) {
    try {
      await communityService.createCommunityPost(postData);
      showToast('success', postData.postType === 'blog' ? 'Article published!' : 'Post shared!');
    } catch (err) {
      showToast('error', err.message || 'Failed to publish');
      throw err;
    }
  },

  // Toggle Like
  async handleLike(postId, userId) {
    if (!userId) {
      showToast('error', 'Please login to like');
      return;
    }
    try {
      await communityService.toggleLike(postId, userId);
    } catch {
      showToast('error', 'Action failed');
    }
  },

  // Delete Post
  async deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await communityService.deleteCommunityPost(postId);
      showToast('success', 'Deleted successfully');
    } catch {
      showToast('error', 'Delete failed');
    }
  }
};