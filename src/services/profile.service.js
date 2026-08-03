import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const profileService = {
  getUserProfile: async (uid) => {
    if (!uid) return null;
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  },

  updateUserProfile: async (uid, data) => {
    if (!uid) throw new Error('User ID missing');
    const docRef = doc(db, 'users', uid);
    await setDoc(docRef, data, { merge: true });
    return data;
  }
};