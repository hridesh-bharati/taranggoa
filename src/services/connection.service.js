import { db } from '@/lib/firebase';
import {
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  collection,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';

export const connectionService = {
  getConnectionId(userA, userB) {
    return userA < userB ? `${userA}_${userB}` : `${userB}_${userA}`;
  },

  // 1. Real-time Connection Status Listener
  subscribeConnectionStatus(currentUserId, targetUserId, callback) {
    if (!currentUserId || !targetUserId) return () => { };
    const connId = this.getConnectionId(currentUserId, targetUserId);
    const connRef = doc(db, 'connections', connId);

    return onSnapshot(connRef, (docSnap) => {
      if (docSnap.exists()) {
        callback(docSnap.data());
      } else {
        callback({ status: 'none' });
      }
    });
  },

  // 2. Real-time Total Connections Count (Optimized & High Performance)
  subscribeUserConnectionsCount(userId, callback) {
    if (!userId) return () => { };

    // Direct Firestore array-contains query (Zero wasted reads)
    const q = query(
      collection(db, 'connections'),
      where('status', '==', 'connected'),
      where('users', 'array-contains', userId)
    );

    return onSnapshot(q, (snapshot) => {
      callback(snapshot.docs.length);
    });
  },

  // 3. Send Connect Request
  async sendConnectionRequest(senderId, receiverId) {
    const connId = this.getConnectionId(senderId, receiverId);
    const connRef = doc(db, 'connections', connId);

    await setDoc(connRef, {
      id: connId,
      senderId,
      receiverId,
      users: [senderId, receiverId], // Scalable array lookup for queries
      status: 'pending',
      createdAt: serverTimestamp()
    });
  },

  // 4. Accept Connection Request
  async acceptConnectionRequest(senderId, receiverId) {
    const connId = this.getConnectionId(senderId, receiverId);
    const connRef = doc(db, 'connections', connId);

    await updateDoc(connRef, {
      status: 'connected',
      connectedAt: serverTimestamp()
    });
  },

  // 5. Remove / Reject Connection
  async removeConnection(senderId, receiverId) {
    const connId = this.getConnectionId(senderId, receiverId);
    const connRef = doc(db, 'connections', connId);
    await deleteDoc(connRef);
  }
};