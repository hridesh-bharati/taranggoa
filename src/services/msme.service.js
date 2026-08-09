import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';

export const msmeService = {
  // 1. Submit or Update Full MSME Application
  async submitApplication(email, applicationData) {
    if (!email) throw new Error('Email is required');
    const cleanEmail = email.toLowerCase().trim();
    const docRef = doc(db, 'msme_applications', cleanEmail);

    const payload = {
      applicantName: applicationData.applicantName || '',
      aadhaarNumber: applicationData.aadhaarNumber || '',
      panNumber: applicationData.panNumber || '',
      gstinNumber: applicationData.gstinNumber || '',
      phone: applicationData.phone || '',
      email: cleanEmail,

      firmName: applicationData.firmName || '',
      entityType: applicationData.entityType || 'Proprietorship',
      category: applicationData.category || 'Micro',
      businessType: applicationData.businessType || 'Manufacturing',
      nicCode: applicationData.nicCode || '',
      businessActivityDesc: applicationData.businessActivityDesc || '',

      bankAccountNo: applicationData.bankAccountNo || '',
      ifscCode: applicationData.ifscCode || '',

      investmentAmount: applicationData.investmentAmount || '',
      annualTurnover: applicationData.annualTurnover || '',

      address: applicationData.address || '',
      city: applicationData.city || '',
      state: applicationData.state || '',

      status: applicationData.status || 'PENDING',
      updatedAt: serverTimestamp(),
      createdAt: applicationData.createdAt || serverTimestamp(),
    };

    await setDoc(docRef, payload, { merge: true });
    return true;
  },

  // 2. Fetch User MSME Data
  async getApplicationByEmail(email) {
    if (!email) return null;
    const cleanEmail = email.toLowerCase().trim();
    const docRef = doc(db, 'msme_applications', cleanEmail);
    const snap = await getDoc(docRef);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  },

  // 3. Fetch All MSME Applications for Admin
  async getAllApplications() {
    const colRef = collection(db, 'msme_applications');
    const snap = await getDocs(colRef);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  // 4. Update Status (Admin)
  async updateStatus(email, status) {
    const cleanEmail = email.toLowerCase().trim();
    const docRef = doc(db, 'msme_applications', cleanEmail);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });
    return true;
  },

  // 5. Delete Request
  async deleteApplication(email) {
    const cleanEmail = email.toLowerCase().trim();
    const docRef = doc(db, 'msme_applications', cleanEmail);
    await deleteDoc(docRef);
    return true;
  }
};

export default msmeService;