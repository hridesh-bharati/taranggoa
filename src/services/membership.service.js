import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';

const COLLECTION = 'memberships';

export const membershipService = {
  // Save/Update Application using Email as Document ID (Primary Key)
  async createApplication(data) {
    if (!data.email) throw new Error('Email is required as Primary Key.');

    // Clean Email for Doc ID
    const cleanEmail = data.email.toLowerCase().trim();
    const docRef = doc(db, COLLECTION, cleanEmail);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      throw new Error('An application with this email already exists.');
    }

    await setDoc(docRef, {
      ...data,
      email: cleanEmail,
      amount: 999,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: serverTimestamp(),
    });

    return cleanEmail;
  },

  // Fetch All
  async getAllApplications() {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
  },

  // Update Status
  async updateStatus(emailId, status) {
    const docRef = doc(db, COLLECTION, emailId);
    await updateDoc(docRef, { status });
  },

  // Delete Record
  async deleteApplication(emailId) {
    const docRef = doc(db, COLLECTION, emailId);
    await deleteDoc(docRef);
  }
};