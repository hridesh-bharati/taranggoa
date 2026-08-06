import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// TarangGoa Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUZxFSAE758hsAQsIc6vKhyDMal0kXAW0",
  authDomain: "taranggoa-49002.firebaseapp.com",
  projectId: "taranggoa-49002",
  storageBucket: "taranggoa-49002.firebasestorage.app",
  messagingSenderId: "732581116227",
  appId: "1:732581116227:web:b41616452221cb50f997f6"
};

// Initialize Firebase App & Firestore Database
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Seed Data for Upcoming Exhibitions
const mockExhibitions = [
  {
    badge: 'Raksha Bandhan Special 🎁',
    title: 'TARANG UTSAV 2026',
    subtitle: 'Goa’s Biggest Exhibition cum Sale',
    location: 'Kala Academy Goa, Darya Sangam',
    startDate: '2026-08-12',
    endDate: '2026-08-16',
    dates: '12th – 16th August 2026',
    days: ['12 WED', '13 THU', '14 FRI', '15 SAT', '16 SUN'],
    timing: '11:00 AM to 09:00 PM',
    categories: 'Fashion | Handicrafts | Home Décor | Lifestyle | Furniture & Much More',
    image: '/images/upcoming-images/upcomin-pic1.png',
    contact: '9158063030 | 8329539407 | 9168117661',
    createdAt: serverTimestamp()
  },
  {
    badge: 'Ganesh Chaturthi Special 🪔',
    title: 'TARANG UTSAV 2026',
    subtitle: 'Goa’s Biggest MSME Expo',
    location: 'SGPDA Ground, Margao',
    startDate: '2026-08-27',
    endDate: '2026-08-31',
    dates: '27th – 31st August 2026',
    days: ['27 WED', '28 THU', '29 FRI', '30 SAT', '31 SUN'],
    timing: '11:00 AM to 09:00 PM',
    categories: 'Fashion | Handicrafts | Home Décor | Lifestyle | Furniture & Much More',
    image: '/images/upcoming-images/upcomin-pic2.png',
    contact: '9158063030 | 9168117661 | 8329539407',
    createdAt: serverTimestamp()
  }
];

async function seedExhibitionsData() {
  console.log("🚀 Connecting to TarangGoa Firebase Firestore...");
  try {
    const colRef = collection(db, "upcoming_exhibitions");
    for (const expo of mockExhibitions) {
      const docRef = await addDoc(colRef, expo);
      console.log(`✅ Seeded: ${expo.badge} (Doc ID: ${docRef.id})`);
    }
    console.log("\n🎉 Success! 2 Exhibition records successfully added to Firestore.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Error:", error);
    process.exit(1);
  }
}

seedExhibitionsData();