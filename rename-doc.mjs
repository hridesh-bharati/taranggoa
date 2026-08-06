// rename - doc.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCUZxFSAE758hsAQsIc6vKhyDMal0kXAW0",
  authDomain: "taranggoa-49002.firebaseapp.com",
  projectId: "taranggoa-49002",
  storageBucket: "taranggoa-49002.firebasestorage.app",
  messagingSenderId: "732581116227",
  appId: "1:732581116227:web:b41616452221cb50f997f6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function renameDocument(collectionName, oldDocId, newDocId) {
  try {
    const oldDocRef = doc(db, collectionName, oldDocId);
    const oldSnap = await getDoc(oldDocRef);

    if (!oldSnap.exists()) {
      console.log(`❌ Error: Document '${oldDocId}' nahi mila!`);
      return;
    }

    const newDocRef = doc(db, collectionName, newDocId);
    await setDoc(newDocRef, oldSnap.data());
    await deleteDoc(oldDocRef);

    console.log(`✅ Success: Document '${oldDocId}' successfully renamed to '${newDocId}'!`);
  } catch (error) {
    console.error('❌ Rename Error:', error);
  }
}

// target IDs
const COLLECTION = 'memberships';
const OLD_EMAIL = 'hridesh027@gmail.com';
const NEW_EMAIL = 'hridesh0277@gmail.com';

renameDocument(COLLECTION, OLD_EMAIL, NEW_EMAIL);