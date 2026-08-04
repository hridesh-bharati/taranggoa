import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { v2 as cloudinary } from 'cloudinary';

// Next.js / Node.js Built-in Env Loader
process.loadEnvFile('.env.local');

// 1. Firebase Client Config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 2. Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 3. ALL 18 EVENTS COMPLETE DATA
const eventsData = [
  {
    id: 'seva-pakhwada-award',
    category: 'Recent Event',
    title: 'A Proud Moment - Tarang Felicitated at Seva Pakhwada',
    subtitle: 'Honored for Contribution in promoting Self Help Groups (SHGs)',
    date: '17th September 2025',
    location: 'Kala Academy, Panaji',
    layoutType: 'editorial-top-image',
    bulletPoints: [
      "We are deeply honored to be felicitated for our contribution in promoting Self Help Groups (SHGs) at the Seva Pakhwada event on 17th September at Kala Academy, organized by the Goa State Rural Livelihoods Mission, Department of Rural Development, Government of Goa.",
      "The felicitation was done at the hands of Hon'ble Chief Minister of Goa, Dr. Pramod Sawant, along with respected ministers and dignitaries present at the event.",
      "This recognition strengthens our commitment to empower women entrepreneurs, SHGs, and small businesses, helping them achieve new heights in business."
    ],
    mainImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'pop-up-bazaar-2026',
    category: 'Recent Event',
    title: 'Tarang Pop-Up Bazaar!',
    subtitle: 'In association with Panjim Inox Courtyard',
    date: 'May 1st-3rd, 2026',
    location: 'Inox Courtyard Panaji Goa',
    layoutType: 'pop-up-bazaar-grid',
    bulletPoints: [
      "Hon'ble CM of Goa, & Chairperson of ESG, Dr. Pramod Sawant, Hon'ble MLA Delaila Lobo, Vice Chairman, General Manager Mrunal Walke, along with the entire ESG team, visited the Purumetoche Fest and Pop-Up Bazaar in Panjii.",
      "A proud moment celebrating and supporting local entrepreneurs."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'tarang-utsav-2026-women',
    category: 'Recent Event',
    title: 'Tarang Utsav 2026 - Celebrating Women Entrepreneurs',
    subtitle: 'Over 120 stalls featuring women entrepreneurs and homegrown brands',
    date: '16, 17, 18 & 19 April 2026',
    location: 'Kala Academy, Panaji',
    layoutType: 'kala-academy-grid',
    bulletPoints: [
      "Over 120 stalls featuring women entrepreneurs and homegrown brands came together to showcase creativity, innovation, and local talent. ✨",
      "The event also featured a specially curated fashion show with 40+ women across all age groups confidently flaunting their finest creations on the ramp. Influencers and glam artist partners added glamour and vibrancy to the celebration.",
      "The event was proudly supported by the Department of Art & Culture, DRDA-GSRLM, and the Department of Handicrafts, Textile & Coir, Government of Goa, JCI Bardez Bandhan."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'tarang-utsav-2025-margao',
    category: 'Recent Event',
    title: 'Tarang Utsav 2025',
    subtitle: 'The four-day extravaganza',
    date: '14th – 17th August 2025',
    location: 'BPS Sports Club, Margao',
    layoutType: 'grid-2x2-left',
    bulletPoints: [
      "The four-day extravaganza was inaugurated by Shri Digambar Kamat, Hon'ble MLA, Margao, along with a special guest Smt. Deepali Naik, Project Director, DRDA South Goa.",
      "The event is expected to attract thousands of visitors, providing a unique platform for small businesses and homegrown brands to connect with the community, expand their market reach, and gain visibility."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'tarang-utsav-2025-diwali',
    category: 'Recent Event',
    title: 'Tarang Utsav 2025 – Diwali Edition Shopping Festival',
    subtitle: 'Organised in association with DRDA, Goa Tourism, and NABARD',
    date: '16th to 19th October, 2025',
    location: 'Don Bosco Oratory, Panjim',
    layoutType: 'grid-mix',
    bulletPoints: [
      "As a mark of respect and condolence to the late MLA and Minister Shri Ravi Naik, the inaugural ceremony was not conducted. The organisers and participants observed the occasion with solemnity, honouring his contribution and legacy in public service.",
      "Despite the absence of a formal inauguration, the festival witnessed enthusiastic participation from entrepreneurs, artisans, and visitors, reaffirming Tarang Utsav's commitment to inclusive growth, community support, and festive celebration with sensitivity and dignity.",
      "Featuring 150+ stalls from across India and Goa's finest local brands! Explore an amazing range of festive collections, kurtis, designer wear, furniture, home décor, festive products, gift hampers, and much more — all under one roof!"
    ],
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'christmas-fair-2025',
    category: 'Recent Event',
    title: 'Christmas Fair 2025',
    subtitle: 'Supported by GSUDA, Desserts & More and JCI Bardet Bhandan',
    date: '9th & 10th Dec 2025',
    location: 'Dr. FL Gomes Garden Panaji',
    layoutType: 'split-2x2',
    bulletPoints: [
      "The Christmas Fair by Tarang Supported by GSUDA, Desserts & More and JCI Bardet Bhandan was inaugurated in the esteemed presence of Madam Sandra Fernandes, President of the GCCI Women's Wing, and Mrs. Pallavi Salgaonkar, Owner & Proprietor of the Bakery Chain Desserts & More.",
      "Witness 70+ stalls showcasing the incredible talent of local women entrepreneurs, crafters, artisans, along with beautiful Christmas décor, festive products, and much more."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'carnival-fair-2026',
    category: 'Recent Event',
    title: 'Carnival Fair 2026',
    subtitle: 'In association with JCI Bardez and Rotary Clubs',
    date: '14th and 15th Feb 2026',
    location: 'Dr. F. L. Gomes Garden, Panaji',
    layoutType: 'grid-6-special',
    bulletPoints: [
      "Featured 60+ women entrepreneurs at this carnival fair which was held on 14th and 15th February 2026.",
      "Inaugural ceremony was graced by chief guest Rotarian Rtn. Savcote Mamta nine zone president of JCI India Zone II — 2026 Rotarian Sandesh Gadhavi president of Rotary club of Miramar. Footfall tracked - 8000 plus."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    id: 'carnival-market-5th-edition',
    category: 'Recent Events',
    title: 'Carnival Market – Fifth Edition: A Celebration of Inclusivity & Entrepreneurship',
    subtitle: 'A unique marketplace for small businesses and specially-abled individuals',
    date: '1st March 2025',
    location: 'Menezes Branganza Garden, Panaji',
    layoutType: 'grid-mix',
    bulletPoints: [
      "Carnival Market opened with great enthusiasm, celebrating the message of inclusivity, empowerment, and entrepreneurial spirit. The event was proudly inaugurated by Ms Jyoti Dahiya, Manager at Bank of Maharashtra, Dr. Sandhya Kini Mayenkar, owner of Kini Supermarket and representative of the Rotary Club of Miramar, and Shri Prakash Kamat, noted social worker and passionate advocate for persons with disabilities.",
      "This unique marketplace went beyond being a traditional bazaar—it provided a platform to uplift small businesses and spotlight the talents of persons with disabilities. Each stall reflected a story of determination, creativity, and the dream of economic independence, featuring handmade goods to local specialty products.",
      "The Carnival Market reaffirmed the belief that entrepreneurship has no boundaries. It celebrated diverse abilities and equal opportunities, offering a welcoming space where every entrepreneur—regardless of physical ability—could thrive."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'tarang-utsav-2024-north-goa',
    category: 'Recent Events',
    title: 'TARANG UTSAV 2024 (North Goa)',
    subtitle: 'In collaboration with Government of Goa under Swayampoorna Initiative',
    date: '16th to 19th Aug, 2024',
    location: 'Kala Academy Panaji',
    layoutType: 'editorial-left-stack',
    bulletPoints: [
      "TARANG UTSAV 2024 (North Goa) was in collaboration with Government of Goa under Swayampoorna Initiative; DITC, GSRLM - DRDA North, MSME, Ministry of India & KVIC. Total stalls: 120 (Women entrepreneurs & MSMEs across GOA & India.",
      "The event attracted a diverse audience, including local residents, tourists, and business enthusiasts. The high footfall reflected the event’s appeal and the strong interest in supporting local businesses.",
      "The event provided a significant boost to the participating businesses, enabling them to generate substantial sales and build valuable connections with customers and other entrepreneurs."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'tarang-utsav-2024-south-goa',
    category: 'Recent Events',
    title: 'TARANG UTSAV 2024 (South Goa)',
    subtitle: 'In collaboration with Government of Goa under Swayampoorna Initiative',
    date: '30th Aug. to 2nd Sept. 2024',
    location: 'BPS Sports Club, Margao',
    layoutType: 'editorial-left-stack',
    bulletPoints: [
      "TARANG UTSAV 2024 (South Goa) was organized in collaboration with Government of Goa under Swayampoorna Initiative; GSUDA, GSRLM - DRDA South. Total stalls: 70 (Women entrepreneurs & SHGs across Goa).",
      "The event featured an array of 70 stalls showcasing festival products ranging from handicrafts to fashion, lifestyle, and food items.",
      "A majority of the stalls were proudly run by women entrepreneurs, providing them with a platform to display their products, engage with consumers, and grow their businesses."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'goa-mohotsav-2025-bangalore',
    category: 'Recent Events',
    title: 'Goa Mohotsav 2025 (Bangalore)',
    subtitle: '(in collaboration Art of Living Committee Goa) Showcase of Goan brands in Bangalore',
    date: '25th May & 26th May 2025',
    location: 'Art of Living Centre, Bangalore',
    layoutType: 'grid-mix',
    bulletPoints: [
      "Tarang's first out-of-state event happened in a spiritually uplifting space at Art of Living Centre, Bangalore.",
      "Showcased Goan Brands at the Goa Mohotsav at the Art of Living Centre, Bangalore, that is visited by thousands of people across the globe.",
      "Meeting Gurudev Sri Sri Ravi Shankar was a divine blessing — his presence is truly beyond words, presented him Goan miniature Artifact Gudi and some goan products."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'summer-bazaar-2025',
    category: 'Recent Events',
    title: 'Summer Bazaar',
    subtitle: 'In collaboration with Podar International School Goa & DRDA',
    date: '17-18 May 2025',
    location: 'Kala Academy Goa',
    layoutType: 'editorial-left-stack',
    bulletPoints: [
      "The Tarang Summer Bazaar was successfully inaugurated on 17th May at Kala Academy, Goa, marking yet another milestone in our journey to empower local entrepreneurs and create inclusive business opportunities.",
      "The event was graced by esteemed dignitaries: Chief Guest: Smt. Varsha Naik, Director, Department of Empowerment of Persons with Disabilities, Government of Goa.",
      "With over 70 plus participating vendors and a footfall of 5000+ visitors, the event served as a vibrant marketplace and a celebration of local talent."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'empowerher-2025',
    category: 'Recent Events',
    title: 'EmpowerHer 2025: Women Entrepreneurs & Economic Empowerment',
    subtitle: 'Supported by Ministry of MSME, Govt of India & JCI Bardez',
    date: '7th, 8th, and 9th March 2025',
    location: 'Panaji Convention Centre, Mala',
    layoutType: 'grid-mix',
    bulletPoints: [
      "EmpowerHer 2025, a landmark initiative by Tarang in collaboration with JCI Bardez Bandh-Man and supported by the Ministry of MSME, Government of India, was inaugurated by Hon'ble Minister Shri Mauvin Godinho.",
      "A key highlight of the event was the felicitation of two distinguished individuals: senior journalist Shri Prakash Kamat and community leader Smt. Mahy Mahesh Simepurushkar.",
      "Minister Godinho declared that the Industries Ministry will reserve industrial plots for women entrepreneurs."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'tarang-at-gox-goxfest-2024',
    category: 'Recent Events',
    title: 'TARANG AT GOX – GOXFEST',
    subtitle: 'In collaboration with GMR Group',
    date: '5-6-7 Jan 2024',
    location: 'Manohar International Airport, Mopa',
    layoutType: 'split-2x2',
    bulletPoints: [
      "The event was in collaboration with GMR Group at Mopa International Airport.",
      "Total 20 Women Entrepreneurs showcased handmade creations directly to passionate travellers."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'diwali-edition-2024',
    category: 'Past Events',
    title: 'Tarang Utsav – Diwali Edition 2024',
    subtitle: 'Organised in association with DRDA, Goa Tourism, and NABARD',
    date: '25th to 28th October 2024',
    location: 'Don Bosco Oratory, Panaji, Goa',
    layoutType: 'split-2x2',
    bulletPoints: [
      "The Diwali Edition of Tarang Utsav 2024 was successfully held over four festive days, featuring 100+ local & women-led brands.",
      "The event was inaugurated by Shri Mangirish Pai Raiker, ASSOCHAM Goa, Smt. Sandhya Kamat, and Shri Vinayak Parsekar.",
      "Tarang Utsav continues to strengthen its mission of promoting inclusive growth."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'womens-day-2024',
    category: 'Past Events',
    title: "Celebrating Woman's Day 2024",
    subtitle: 'State level women achievers felicitation & fashion showcase',
    date: '8th March 2024',
    location: 'Panaji, Goa',
    layoutType: 'grid-6-special',
    bulletPoints: [
      "TARANG has realised that women's empowerment is now the most effective way to achieve sustainable development of the state.",
      "Together we Rise..."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    id: 'chaturthi-exhibition-2023',
    category: 'Past Events',
    title: 'Tarang Chaturthi Shopping Exhibition',
    subtitle: 'Supported by DRDA South Goa, Rotary Club of Margao Sunrise',
    date: 'Sept 1, 2, 3 2023',
    location: 'BPS Sports Club Margao',
    layoutType: 'single-grid-frame',
    bulletPoints: [
      "A grand festive bazaar organized ahead of Ganesh Chaturthi to provide direct market access to Goan artisans, self-help groups, and local home-preneurs."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'
    ]
  },
  {
    id: 'diwali-shopping-2023',
    category: 'Past Events',
    title: 'Diwali Shopping Festival',
    subtitle: 'Supported by GSUDA, Khadi India',
    date: '7-8-9-10 Oct 2023',
    location: 'Don Bosco Oratory, Panaji',
    layoutType: 'split-2x2',
    bulletPoints: [
      "The event embodied the spirit of celebration, attracting both local and outstation visitors, offering them unique festival products directly from local business owners."
    ],
    gallery: [
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600'
    ]
  }
];

// Helper: Upload Image to Cloudinary
async function uploadToCloudinary(imageSource) {
  try {
    const result = await cloudinary.uploader.upload(imageSource, {
      folder: 'tarang_events',
      use_filename: true,
      unique_filename: true,
    });
    return result.secure_url;
  } catch (err) {
    console.error('  └─ Cloudinary Upload Failed:', err.message);
    return imageSource;
  }
}

// Main Execution
async function runSeeder() {
  console.log(`🚀 Seeding ${eventsData.length} Events to Cloudinary & Firestore...\n`);

  for (let i = 0; i < eventsData.length; i++) {
    const item = eventsData[i];
    console.log(`[${i + 1}/${eventsData.length}] Processing: ${item.title}`);

    // Main Image
    let mainImageUrl = item.mainImage || (item.gallery && item.gallery[0]) || '';
    if (mainImageUrl && mainImageUrl.startsWith('http')) {
      console.log('  └─ Uploading main image...');
      mainImageUrl = await uploadToCloudinary(mainImageUrl);
    }

    // Gallery Images
    let uploadedGallery = [];
    if (item.gallery && item.gallery.length > 0) {
      for (let g = 0; g < item.gallery.length; g++) {
        if (item.gallery[g].startsWith('http')) {
          console.log(`  └─ Uploading gallery image ${g + 1}/${item.gallery.length}...`);
          const uploadedUrl = await uploadToCloudinary(item.gallery[g]);
          uploadedGallery.push(uploadedUrl);
        } else {
          uploadedGallery.push(item.gallery[g]);
        }
      }
    }

    const eventPayload = {
      slugId: item.id,
      category: item.category,
      title: item.title,
      subtitle: item.subtitle || '',
      date: item.date,
      location: item.location,
      layoutType: item.layoutType || 'standard',
      bulletPoints: item.bulletPoints || [],
      description: item.bulletPoints ? item.bulletPoints.join(' ') : '',
      image: mainImageUrl,
      gallery: uploadedGallery,
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, 'events'), eventPayload);
      console.log(`  └─ Saved to Firestore! Doc ID: ${docRef.id}\n`);
    } catch (err) {
      console.error(`  └─ Firestore Save Error: ${err.message}`);
    }
  }

  console.log('🎉 All 18 Events Uploaded & Saved Successfully!');
  process.exit(0);
}

runSeeder();