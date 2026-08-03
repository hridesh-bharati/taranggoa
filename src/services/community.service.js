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
  arrayRemove,
  getDoc
} from 'firebase/firestore';

export const communityService = {
  // 1. Create Article / Community Post
  async createCommunityPost(postData) {
    const docRef = await addDoc(collection(db, 'community_posts'), {
      ...postData,
      likes: [],
      commentsCount: 0,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  // 2. Real-time Subscription for Community Posts
  subscribeToCommunityPosts(callback) {
    const q = query(collection(db, 'community_posts'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(posts);
    });
  },

  // 3. Delete Post
  async deleteCommunityPost(postId) {
    await deleteDoc(doc(db, 'community_posts', postId));
  },

  // 4. Toggle Like Action
  async toggleLike(postId, userId) {
    const postRef = doc(db, 'community_posts', postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) return;

    const likes = postSnap.data()?.likes || [];
    if (likes.includes(userId)) {
      await updateDoc(postRef, { likes: arrayRemove(userId) });
    } else {
      await updateDoc(postRef, { likes: arrayUnion(userId) });
    }
  },

  // 5. Real-time Subscription for Discussions/Comments
  subscribeToDiscussions(postId, callback) {
    const q = query(collection(db, `community_posts/${postId}/discussions`), orderBy('createdAt', 'asc'));
    return onSnapshot(q, (snapshot) => {
      const discussions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(discussions);
    });
  },

  // 6. Add Discussion Comment
  async addDiscussion(postId, commentData) {
    await addDoc(collection(db, `community_posts/${postId}/discussions`), {
      ...commentData,
      createdAt: serverTimestamp()
    });

    const postRef = doc(db, 'community_posts', postId);
    const postSnap = await getDoc(postRef);
    const count = (postSnap.data()?.commentsCount || 0) + 1;
    await updateDoc(postRef, { commentsCount: count });
  },

  // 7. Edit Discussion Comment
  async editDiscussion(postId, commentId, newText) {
    const commentRef = doc(db, `community_posts/${postId}/discussions`, commentId);
    await updateDoc(commentRef, { 
      text: newText,
      updatedAt: serverTimestamp() 
    });
  },

  // 8. Delete Discussion Comment
  async deleteDiscussion(postId, commentId) {
    await deleteDoc(doc(db, `community_posts/${postId}/discussions`, commentId));

    const postRef = doc(db, 'community_posts', postId);
    const postSnap = await getDoc(postRef);
    const currentCount = postSnap.data()?.commentsCount || 1;
    await updateDoc(postRef, { commentsCount: Math.max(0, currentCount - 1) });
  }
};