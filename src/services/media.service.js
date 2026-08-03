import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp, 
  arrayUnion, 
  arrayRemove 
} from 'firebase/firestore';

export const mediaService = {
  // 1. Create Post
  async createPost(postData) {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...postData,
      likes: [],
      commentsCount: 0,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  // 2. Real-time Posts Listener (onSnapshot)
  subscribeToPosts(callback) {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(posts);
    });
  },

  // 3. Delete Post
  async deletePost(postId) {
    await deleteDoc(doc(db, 'posts', postId));
  },

  // 4. Toggle Like
  async toggleLike(postId, userId) {
    const postRef = doc(db, 'posts', postId);
    const likesArr = (await mediaService.getDocData(postId))?.likes || [];

    if (likesArr.includes(userId)) {
      await updateDoc(postRef, { likes: arrayRemove(userId) });
    } else {
      await updateDoc(postRef, { likes: arrayUnion(userId) });
    }
  },

  // 5. Real-time Comments Listener (onSnapshot)
  subscribeToComments(postId, callback) {
    const q = query(collection(db, `posts/${postId}/comments`), orderBy('createdAt', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(comments);
    });
  },

  // 6. Add Comment
  async addComment(postId, commentData) {
    await addDoc(collection(db, `posts/${postId}/comments`), {
      ...commentData,
      createdAt: serverTimestamp()
    });
    
    // Update counter
    const postRef = doc(db, 'posts', postId);
    const currentCount = (await mediaService.getDocData(postId))?.commentsCount || 0;
    await updateDoc(postRef, { commentsCount: currentCount + 1 });
  },

  // 7. Edit Comment
  async editComment(postId, commentId, newText) {
    const commentRef = doc(db, `posts/${postId}/comments`, commentId);
    await updateDoc(commentRef, { 
      text: newText,
      editedAt: serverTimestamp() 
    });
  },

  // 8. Delete Comment
  async deleteComment(postId, commentId) {
    await deleteDoc(doc(db, `posts/${postId}/comments`, commentId));

    const postRef = doc(db, 'posts', postId);
    const currentCount = (await mediaService.getDocData(postId))?.commentsCount || 1;
    await updateDoc(postRef, { commentsCount: Math.max(0, currentCount - 1) });
  },

  // Helper
  async getDocData(postId) {
    const snapshot = await mediaService.getDoc(doc(db, 'posts', postId));
    return snapshot.data();
  }
};