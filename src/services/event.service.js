import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';

export const eventService = {
  // Fetch Events (Latest 3 or All)
  async getEvents(limitCount = null) {
    let q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    if (limitCount) {
      q = query(collection(db, 'events'), orderBy('createdAt', 'desc'), limit(limitCount));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  // Add New Event
  async createEvent(eventData) {
    const docRef = await addDoc(collection(db, 'events'), {
      ...eventData,
      createdAt: new Date()
    });
    return { id: docRef.id, ...eventData };
  },

  // Delete Event
  async deleteEvent(eventId) {
    const eventRef = doc(db, 'events', eventId);
    await deleteDoc(eventRef);
    return { success: true };
  }
};