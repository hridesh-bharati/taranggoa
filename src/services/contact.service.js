// src\services\contact.service.js
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

export const contactService = {
  // 1. Save Public Inquiry Form Message
  async sendMessage(formData) {
    const docRef = await addDoc(collection(db, 'inquiries'), {
      ...formData,
      status: 'unread', // 'unread' or 'read'
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  // 2. Get All Inquiries for Admin Inbox
  async getAllInquiries() {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },

  // 3. Mark Message as Read
  async markAsRead(id) {
    const docRef = doc(db, 'inquiries', id);
    await updateDoc(docRef, { status: 'read' });
  },

  // 4. Delete Inquiry Message
  async deleteInquiry(id) {
    await deleteDoc(doc(db, 'inquiries', id));
  }
};