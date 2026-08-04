import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc,
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  limit,
  serverTimestamp 
} from 'firebase/firestore';

export const eventService = {
  // Read All Events
  async getAllEvents() {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  // Read Limited Events for Home Page
  async getHomeEvents(limitCount = 3) {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  },

  // Create Event with Server Timestamp
  async createEvent(eventData) {
    const docRef = await addDoc(collection(db, 'events'), {
      ...eventData,
      createdAt: serverTimestamp()
    });
    return { id: docRef.id, ...eventData };
  },

  // Update Event with Server Timestamp
  async updateEvent(id, eventData) {
    const eventRef = doc(db, 'events', id);
    await updateDoc(eventRef, {
      ...eventData,
      updatedAt: serverTimestamp()
    });
    return { id, ...eventData };
  },

  // Delete Event
  async deleteEvent(id) {
    const eventRef = doc(db, 'events', id);
    await deleteDoc(eventRef);
    return { success: true };
  }
};