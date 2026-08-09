import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

export const memberService = {
  // Read All Members
  async getAllMembers() {
    const q = query(collection(db, 'members'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  // Update Member Status with Server Timestamp
  async updateMemberStatus(id, status) {
    const docRef = doc(db, 'members', id);
    await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
  },

  // Delete Member
  async deleteMember(id) {
    const docRef = doc(doc(db, 'members', id));
    await deleteDoc(docRef);
  }
};