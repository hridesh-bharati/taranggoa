import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';

export const exhibitionsController = {
  // 1. READ ALL
  async fetchExhibitions() {
    try {
      const colRef = collection(db, 'upcoming_exhibitions');
      const snap = await getDocs(colRef);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('Fetch Exhibitions Error:', err);
      throw err;
    }
  },

  // 2. READ SINGLE BY ID
  async fetchExhibitionById(id) {
    try {
      const docRef = doc(db, 'upcoming_exhibitions', id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() };
      }
      return null;
    } catch (err) {
      console.error('Fetch Single Exhibition Error:', err);
      throw err;
    }
  },

  // 3. CREATE
  async createExhibition(formData) {
    try {
      const colRef = collection(db, 'upcoming_exhibitions');

      const days = typeof formData.daysInput === 'string'
        ? formData.daysInput.split(',').map((d) => d.trim()).filter(Boolean)
        : (Array.isArray(formData.days) ? formData.days : []);

      const payload = {
        badge: formData.badge || '',
        title: formData.title || 'TARANG UTSAV 2026',
        location: formData.location || '',
        startDate: formData.startDate || '',
        endDate: formData.endDate || '',
        dates: formData.dates || '',
        days: days,
        timing: formData.timing || '11:00 AM to 09:00 PM',
        categories: formData.categories || 'Fashion | Handicrafts | Home Décor',
        image: formData.image || '',
        contact: formData.contact || '',
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(colRef, payload);
      return docRef.id;
    } catch (err) {
      console.error('Create Exhibition Error:', err);
      throw err;
    }
  },

  // 4. UPDATE
  async updateExhibition(id, formData) {
    try {
      const docRef = doc(db, 'upcoming_exhibitions', id);

      const days = typeof formData.daysInput === 'string'
        ? formData.daysInput.split(',').map((d) => d.trim()).filter(Boolean)
        : (Array.isArray(formData.days) ? formData.days : []);

      const payload = {
        badge: formData.badge || '',
        title: formData.title || 'TARANG UTSAV 2026',
        location: formData.location || '',
        startDate: formData.startDate || '',
        endDate: formData.endDate || '',
        dates: formData.dates || '',
        days: days,
        timing: formData.timing || '11:00 AM to 09:00 PM',
        categories: formData.categories || 'Fashion | Handicrafts | Home Décor',
        image: formData.image || '',
        contact: formData.contact || '',
        updatedAt: serverTimestamp(),
      };

      await updateDoc(docRef, payload);
      return true;
    } catch (err) {
      console.error('Update Exhibition Error:', err);
      throw err;
    }
  },

  // 5. DELETE
  async deleteExhibition(id) {
    try {
      const docRef = doc(db, 'upcoming_exhibitions', id);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      console.error('Delete Exhibition Error:', err);
      throw err;
    }
  }
};