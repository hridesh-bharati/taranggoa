import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';

export const memberService = {
  async getAllMembers() {
    const q = query(collection(db, 'members'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  async updateMemberStatus(id, status) {
    const docRef = doc(db, 'members', id);
    await updateDoc(docRef, { status, updatedAt: new Date() });
  },

  async deleteMember(id) {
    const docRef = doc(db, 'members', id);
    await deleteDoc(docRef);
  }
};