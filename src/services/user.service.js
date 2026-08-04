import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query } from 'firebase/firestore';

export const userService = {
  // Fetch all registered/logged-in users
  async getAllUsers() {
    const q = query(collection(db, 'users'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
  },

  // Toggle user active/blocked status (Optional Admin Control)
  async updateUserStatus(uid, status) {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, { status });
  },

  // Delete user document permanently from Firestore
  async deleteUser(uid) {
    const userRef = doc(db, 'users', uid);
    await deleteDoc(userRef);
    return { success: true };
  }
};