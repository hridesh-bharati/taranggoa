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

  // Real-time Connection Status Listener
  subscribeConnectionStatus(currentUserId, targetUserId, callback) {
    if (!currentUserId || !targetUserId) return () => {};
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

  // 🔴 Real-time Total Connections/Followers Count for any User
  subscribeUserConnectionsCount(userId, callback) {
    if (!userId) return () => {};
    const q = query(
      collection(db, 'connections'),
      where('status', '==', 'connected')
    );

    return onSnapshot(q, (snapshot) => {
      const userConnections = snapshot.docs.filter(docSnap => {
        const data = docSnap.data();
        return data.senderId === userId || data.receiverId === userId;
      });
      callback(userConnections.length);
    });
  },

  // Send Connect Request
  async sendConnectionRequest(senderId, receiverId) {
    const connId = this.getConnectionId(senderId, receiverId);
    const connRef = doc(db, 'connections', connId);

    await setDoc(connRef, {
      id: connId,
      senderId,
      receiverId,
      status: 'pending',
      createdAt: serverTimestamp()
    });
  },

  // Accept Connection Request
  async acceptConnectionRequest(senderId, receiverId) {
    const connId = this.getConnectionId(senderId, receiverId);
    const connRef = doc(db, 'connections', connId);

    await updateDoc(connRef, {
      status: 'connected',
      connectedAt: serverTimestamp()
    });
  },

  // Remove / Reject Connection
  async removeConnection(senderId, receiverId) {
    const connId = this.getConnectionId(senderId, receiverId);
    const connRef = doc(db, 'connections', connId);
    await deleteDoc(connRef);
  }
};