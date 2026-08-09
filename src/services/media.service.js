import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  increment
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
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) return;

    const likesArr = postSnap.data()?.likes || [];

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

  // 6. Add Comment (Atomic increment - Fast)
  async addComment(postId, commentData) {
    await addDoc(collection(db, `posts/${postId}/comments`), {
      ...commentData,
      createdAt: serverTimestamp()
    });

    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, { commentsCount: increment(1) });
  },

  // 7. Edit Comment
  async editComment(postId, commentId, newText) {
    const commentRef = doc(db, `posts/${postId}/comments`, commentId);
    await updateDoc(commentRef, {
      text: newText,
      editedAt: serverTimestamp()
    });
  },

  // 8. Delete Comment (Atomic decrement)
  async deleteComment(postId, commentId) {
    await deleteDoc(doc(db, `posts/${postId}/comments`, commentId));

    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, { commentsCount: increment(-1) });
  }
};