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
  // 1. Create 1-Year Membership Document AFTER PhonePe Payment Success
  async createPaidMembership(formData, paymentResponse) {
    if (!formData.email) throw new Error('Email is required as Primary Key.');

    const cleanEmail = formData.email.toLowerCase().trim();
    const docRef = doc(db, COLLECTION, cleanEmail);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().membershipStatus === 'ACTIVE') {
      throw new Error('An active membership already exists with this email.');
    }

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(startDate.getDate() + 365);

    const txnId = paymentResponse?.transactionId || paymentResponse?.paymentId || `TXN_${Date.now()}`;

    const payload = {
      ...formData,
      email: cleanEmail,
      amount: 999,
      status: 'approved',
      paymentStatus: 'PAID',
      membershipStatus: 'ACTIVE',
      gateway: 'PhonePe',
      phonepeMerchantId: paymentResponse?.merchantId || 'M22VWHRMH78WC',
      lastTransactionId: txnId,
      paymentHistory: [
        {
          amount: 999,
          date: startDate.toISOString(),
          paymentId: txnId,
          gateway: 'PhonePe PG',
          status: 'PAID'
        }
      ],
      createdAt: serverTimestamp(),
      startDate: startDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    };

    await setDoc(docRef, payload);
    return cleanEmail;
  },

  // 2. Fetch All Applications & Calculate Days Left for Expiry
  async getAllApplications() {
    const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const now = new Date();

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      let remainingDays = 0;
      let isExpired = false;

      if (data.expiryDate) {
        const expiry = new Date(data.expiryDate);
        const diffTime = expiry - now;
        remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (remainingDays <= 0) {
          isExpired = true;
          remainingDays = 0;
        }
      }

      return {
        id: docSnap.id,
        ...data,
        remainingDays,
        isExpired,
        membershipStatus: isExpired ? 'EXPIRED' : 'ACTIVE'
      };
    });
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