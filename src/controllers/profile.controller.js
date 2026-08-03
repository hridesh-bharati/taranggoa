import { profileService } from '@/services/profile.service';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, writeBatch, doc } from 'firebase/firestore';

const CACHE_KEY_PREFIX = 'user_profile_cache_';

const formatError = (error) => {
  return error.message ? error.message.replace('Firebase: ', '') : 'An unexpected error occurred.';
};

// 🔴 Helper: Update Photo URL across all user posts in Firestore
const syncPhotoToUserPosts = async (userId, newPhotoUrl) => {
  try {
    if (!userId || !newPhotoUrl) return;
    const batch = writeBatch(db);
    const q = query(collection(db, 'posts'), where('authorId', '==', userId));
    const snap = await getDocs(q);

    if (!snap.empty) {
      snap.forEach((postDoc) => {
        batch.update(doc(db, 'posts', postDoc.id), { authorPhoto: newPhotoUrl });
      });
      await batch.commit();
    }
  } catch (e) {
    console.warn('Post author photo batch sync failed:', e);
  }
};

export const profileController = {
  // LocalStorage Helpers
  getCache(uid) {
    if (typeof window === 'undefined') return null;
    try {
      const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}${uid}`);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  },

  setCache(uid, data) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`${CACHE_KEY_PREFIX}${uid}`, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  },

  async uploadImage(file, userId) {
    if (!userId) throw new Error('User ID is required for image upload.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to upload image');
    
    // Add timestamp query parameter to bust browser cache
    const freshUrl = `${data.url}?v=${Date.now()}`;
    return freshUrl;
  },

  async fetchProfile(uid, defaultEmail, onFreshData) {
    if (!uid) return null;
    const cachedData = this.getCache(uid);

    try {
      const profile = await profileService.getUserProfile(uid);
      let finalData = profile;

      if (!profile) {
        finalData = {
          name: 'Hridesh',
          email: defaultEmail || '',
          mobile: '',
          about: '',
          description: '',
          photoURL: ''
        };
        await profileService.updateUserProfile(uid, finalData);
      }

      this.setCache(uid, finalData);
      if (onFreshData) onFreshData(finalData);

      return cachedData || finalData;
    } catch (error) {
      if (cachedData) return cachedData;
      throw new Error(formatError(error));
    }
  },

  async saveProfile(uid, profileData) {
    if (!uid) throw new Error('User ID is required to save profile.');
    try {
      await profileService.updateUserProfile(uid, profileData);
      this.setCache(uid, profileData);

      // Sync updated photo in all previous posts
      if (profileData.photoURL) {
        await syncPhotoToUserPosts(uid, profileData.photoURL);
      }

      return { success: true, message: 'Profile updated successfully!' };
    } catch (error) {
      throw new Error(formatError(error));
    }
  }
};