import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
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
  // Create Post
  async createPost(postData) {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...postData,
      likes: [],
      commentsCount: 0,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  // Fetch All Posts
  async getAllPosts() {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Delete Post
  async deletePost(postId) {
    await deleteDoc(doc(db, 'posts', postId));
  },

  // Toggle Like
  async toggleLike(postId, userId) {
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) return;

    const likes = postSnap.data().likes || [];
    if (likes.includes(userId)) {
      await updateDoc(postRef, { likes: arrayRemove(userId) });
    } else {
      await updateDoc(postRef, { likes: arrayUnion(userId) });
    }
  },

  // Add Comment
  async addComment(postId, commentData) {
    await addDoc(collection(db, `posts/${postId}/comments`), {
      ...commentData,
      createdAt: serverTimestamp()
    });
    
    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    const count = (postSnap.data()?.commentsCount || 0) + 1;
    await updateDoc(postRef, { commentsCount: count });
  },

  // 🔴 Edit Comment
  async editComment(postId, commentId, newText) {
    const commentRef = doc(db, `posts/${postId}/comments`, commentId);
    await updateDoc(commentRef, { 
      text: newText,
      editedAt: serverTimestamp() 
    });
  },

  // 🔴 Delete Comment
  async deleteComment(postId, commentId) {
    await deleteDoc(doc(db, `posts/${postId}/comments`, commentId));

    const postRef = doc(db, 'posts', postId);
    const postSnap = await getDoc(postRef);
    const currentCount = postSnap.data()?.commentsCount || 1;
    await updateDoc(postRef, { commentsCount: Math.max(0, currentCount - 1) });
  },

  // Get Comments for Post
  async getComments(postId) {
    const q = query(collection(db, `posts/${postId}/comments`), orderBy('createdAt', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};