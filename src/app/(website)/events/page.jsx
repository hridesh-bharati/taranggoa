'use client';

import { useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// --- Multi-Trigger Scroll Observer ---
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active');
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
};

export default function EventsPage() {
  useScrollReveal();

  // COMPLETE DATA FROM ALL 24 SCREENSHOTS PROVIDED
  const eventsData = [
    // --- RECENT EVENTS ---
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
      topImage: '/images/recent-event-main-pic.png'
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
      gallery6: [
        '/images/recent-event-pop-up-bazar-pictures/recent-event-pop-bazar1.png',
        '/images/recent-event-pop-up-bazar-pictures/recent-event-pop-bazar2.png',
        '/images/recent-event-pop-up-bazar-pictures/recent-event-pop-bazar3.png',
        '/images/recent-event-pop-up-bazar-pictures/recent-event-pop-bazar4.png',
        '/images/recent-event-pop-up-bazar-pictures/recent-event-pop-bazar5.png',
        '/images/recent-event-pop-up-bazar-pictures/recent-event-pop-bazar6.png'
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
      kalaImages: [
        '/images/kala-academy-images/kala-academy1.png',
        '/images/kala-academy-images/kala-academy2.png',
        '/images/kala-academy-images/kala-academy3.png',
        '/images/kala-academy-images/kala-academy4.png',
        '/images/kala-academy-images/kala-academy5.png',
        '/images/kala-academy-images/kala-academy6.png'
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
      grid4Images: [
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
      collageImages: [
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
      grid4Images: [
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
      gallery6: [
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
        "The Carnival Market reaffirmed the belief that entrepreneurship has no boundaries. It celebrated diverse abilities and equal opportunities, offering a welcoming space where every entrepreneur—regardless of physical ability—could thrive. By coming together in support of this initiative, participants and visitors contributed to building a more inclusive and equitable society. The atmosphere was electric, the support was overwhelming, and yes—we truly rocked it!"
      ],
      collageImages: [
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
      leftImages: [
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
      leftImages: [
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
        "Meeting Gurudev Sri Sri Ravi Shankar was a divine blessing — his presence is truly beyond words, presented him Goan miniature Artifact Gudi and some goan products. Exhibitors gained good network, made good sale and connects for their business."
      ],
      collageImages: [
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
        "The event was graced by esteemed dignitaries: Chief Guest: Smt. Varsha Naik, Director, Department of Empowerment of Persons with Disabilities, Government of Goa; Guest of Honour: Smt. Arati Bandodkar, President, BJP Mahila Morcha – Goa; Special Guest: Ms. Swati Patel, Principal, Podar International School.",
        "Over the two days, the bazaar witnessed an enthusiastic response from the public with stalls showcasing: Handcrafted products, Sustainable fashion, Homemade edibles, Art & décor, Wellness items and more.",
        "With over 70 plus participating vendors and a footfall of 5000+ visitors, the event served as a vibrant marketplace and a celebration of local talent."
      ],
      leftImages: [
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
        "EmpowerHer 2025, a landmark initiative by Tarang in collaboration with JCI Bardez Bandh-Man and supported by the Ministry of MSME, Government of India, was inaugurated by Hon'ble Minister Shri Mauvin Godinho. Held from March 7th to 9th at the Panaji Convention Centre, the event aimed to celebrate, support, and scale women-led businesses and MSMEs through a vibrant showcase of stalls, contests, workshops, and cultural performances.",
        "A key highlight of the event was the felicitation of two distinguished individuals: senior journalist and social worker Shri Prakash Kamat, and noted community leader Smt. Mahy Mahesh Simepurushkar, for their commendable service and contributions to society.",
        "Addressing the gathering, Minister Godinho underscored the pivotal role of women in driving societal progress and economic development. In a major announcement, he declared that the Industries Ministry will reserve industrial plots for women entrepreneurs, marking a significant step towards fostering inclusivity and empowerment. He also stressed that Women's Day should not be limited to one date, but rather celebrated every day by supporting women in all spheres of life—personal, social, and professional."
      ],
      collageImages: [
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
        "Total 20 Women Entrepreneurs showcased handmade creations. The event embodied the spirit of First anniversary at Gox celebration, attracting travellers, offering them unique Goan products directly from the hands of passionate local artisans and business owners."
      ],
      grid4Images: [
        'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600'
      ]
    },
    // --- PAST EVENTS ---
    {
      id: 'diwali-edition-2024',
      category: 'Past Events',
      title: 'Tarang Utsav – Diwali Edition 2024',
      subtitle: 'Organised in association with DRDA, Goa Tourism, and NABARD',
      date: '25th to 28th October 2024',
      location: 'Don Bosco Oratory, Panaji, Goa',
      layoutType: 'split-2x2',
      bulletPoints: [
        "The Diwali Edition of Tarang Utsav 2024 was successfully held over four festive days, featuring 100+ local & women-led brands offering handcrafted fashion, home décor, gourmet products, and Diwali gifts. Also NABARD FPOs and artisans under Goa Handicrafts Participated.",
        "The event was inaugurated by: Shri Mangirish Pai Raiker, Chairman, ASSOCHAM Goa; Smt. Sandhya Kamat, Director, Handicrafts, Coir & Textiles; Shri Vinayak Parsekar, Ex-Municipal Officer, CCP Panaji. The Utsav celebrated local entrepreneurship and women empowerment, attracting large footfall and enthusiastic participation. Visitors enjoyed shopping with purpose while supporting small businesses and self-help groups in a culturally vibrant festive atmosphere.",
        "Tarang Utsav continues to strengthen its mission of promoting inclusive growth and local economic development in Goa."
      ],
      grid4Images: [
        'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600'
      ]
    },
    {
      id: 'womens-day-2024',
      category: 'Past Events',
      title: 'Celebrating Woman\'s Day 2024',
      subtitle: 'State level women achievers felicitation & fashion showcase',
      date: '8th March 2024',
      location: 'Panaji, Goa',
      layoutType: 'grid-6-special',
      bulletPoints: [
        "TARANG has realised that, women's empowerment is now the most effective way to achieve sustainable development of the state. Accordingly we PLAN and EXECUTE. We accept CHALLENGES in order to give OPPORTUNITIES to our Goan Entrepreneurs.",
        "Together we Rise..."
      ],
      gallery6: [
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
      grid4Images: [
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
        "The event embodied the spirit of celebration, attracting both local and outstation visitors, offering them unique festival products directly from the hands of passionate local artisans and business owners."
      ],
      grid4Images: [
        'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600'
      ]
    }
  ];

  return (
    <main className="min-vh-100 d-flex flex-column bg-light overflow-x-hidden">
      <Navbar />

      {/* Clean Smooth Bounce CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .reveal { 
          opacity: 0; 
          will-change: transform, opacity;
          transition: all 0.7s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        .reveal-left {
          transform: translateX(-80px);
        }
        .reveal-left.active {
          opacity: 1;
          transform: translateX(0);
        }

        .reveal-right {
          transform: translateX(80px);
        }
        .reveal-right.active {
          opacity: 1;
          transform: translateX(0);
        }

        .reveal-up {
          transform: translateY(50px);
        }
        .reveal-up.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}} />

      {/* Hero Header */}
      <section className="py-5 text-white position-relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(135deg, rgba(2, 40, 89, 0.92) 0%, rgba(0, 150, 214, 0.88) 100%), url(https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container py-5 text-center position-relative">
          <span className="badge bg-white text-dark bg-opacity-25 px-4 py-2 rounded-pill mb-3 d-inline-flex align-items-center gap-2 border border-white border-opacity-25 reveal reveal-up">
            <i className="bi bi-droplet-fill text-info"></i>
            • TARANG OFFICIAL EVENTS ARCHIVE
          </span>

          <h1 className="display-3 fw-bolder mb-3 reveal reveal-left" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
            Our Journey & <span className="text-warning">Recent Events</span>
          </h1>

          <p className="lead text-white opacity-90 mx-auto fs-5 reveal reveal-right" style={{ maxWidth: '800px', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            Empowering women entrepreneurs, local artisans, and MSME units across Goa and India through exhibitions, pop-up bazaars, and state level summits.
          </p>
        </div>
      </section>

      {/* Main Events Feed */}
      <section className="py-5 bg-white">
        <div className="container py-3">
          <div className="d-flex flex-column gap-5">
            {eventsData.map((ev) => (
              <div key={ev.id} className="card border-0 rounded-4 shadow-lg overflow-hidden p-4 p-md-5 reveal reveal-up" style={{ backgroundColor: '#fff' }}>

                {/* Decoration */}
                <div className="position-absolute top-0 end-0" style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 70px 70px 0', borderColor: 'transparent #f5b000 transparent transparent' }}></div>

                {/* Category & Date */}
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                  <span className="fw-extrabold fs-4 text-uppercase reveal reveal-left" style={{ color: '#d94e34' }}>{ev.category}</span>
                  <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-semibold reveal reveal-right">{ev.date}</span>
                </div>

                <h2 className="display-6 fw-extrabold text-dark mb-1 reveal reveal-left">{ev.title}</h2>
                {ev.subtitle && <h6 className="fw-bold mb-3 reveal reveal-left" style={{ color: '#6b21a8' }}>{ev.subtitle}</h6>}

                <div className="d-flex flex-wrap gap-4 text-secondary mb-4 pb-3 border-bottom border-light reveal reveal-right">
                  <span><i className="bi bi-geo-alt-fill text-danger me-1"></i><strong>Location:</strong> {ev.location}</span>
                  <span><i className="bi bi-calendar-check-fill text-primary me-1"></i><strong>Date:</strong> {ev.date}</span>
                </div>

                {/* Layout: Editorial Top Image (For 1st Event) */}
                {ev.layoutType === 'editorial-top-image' && (
                  <div className="d-flex flex-column gap-4">
                    <div className="rounded-4 overflow-hidden shadow-sm reveal reveal-up">
                      <img src={ev.topImage} alt={ev.title} className="img-fluid w-100 object-fit-cover" style={{ maxHeight: '450px' }} />
                    </div>
                    <div className="d-flex flex-column gap-3 mt-2">
                      {ev.bulletPoints.map((pt, idx) => (
                        <div key={idx} className="d-flex align-items-start gap-2 reveal reveal-right">
                          <i className="bi bi-caret-right-fill flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                          <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>{pt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Layout: Pop-Up Bazaar Custom Grid (2 wide landscape top, 3 taller bottom) */}
                {ev.layoutType === 'pop-up-bazaar-grid' && (
                  <div className="d-flex flex-column gap-4">
                    {/* Top Row: 2 Wide Images */}
                    <div className="row g-3">
                      {ev.gallery6?.slice(0, 2).map((img, idx) => (
                        <div key={idx} className="col-lg-6 col-md-6 reveal reveal-left">
                          <div className="rounded-3 overflow-hidden shadow-sm border">
                            <img src={img} alt="Pop-Up Bazaar Top" className="img-fluid w-100 object-fit-cover" style={{ height: '260px' }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Row: 3 Taller Images */}
                    <div className="row g-3">
                      {ev.gallery6?.slice(2).map((img, idx) => (
                        <div key={idx} className="col-lg-3 col-12 reveal reveal-up">
                          <div className="rounded-3 overflow-hidden shadow-sm border">
                            <img src={img} alt="Pop-Up Bazaar Bottom" className="img-fluid w-100 object-fit-cover" style={{ height: '260px' }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Description Text Box */}
                    <div className="p-4 bg-light rounded-4 border mt-2">
                      {ev.bulletPoints.map((pt, idx) => (
                        <p key={idx} className="text-secondary mb-2 reveal reveal-right" style={{ lineHeight: '1.7' }}>{pt}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Layout: Kala Academy Custom Grid (2 wide landscape top, 4 taller bottom) */}
                {ev.layoutType === 'kala-academy-grid' && (
                  <div className="d-flex flex-column gap-4">
                    {/* Top Row: 2 Wide Landscape Images */}
                    <div className="row g-3">
                      {ev.kalaImages?.slice(0, 2).map((img, idx) => (
                        <div key={idx} className="col-lg-6 col-md-6 reveal reveal-left">
                          <div className="rounded-3 overflow-hidden shadow-sm border">
                            <img src={img} alt="Kala Academy Top" className="img-fluid w-100 object-fit-cover" style={{ height: '260px' }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Row: 4 Portrait/Taller Images */}
                    <div className="row g-3">
                      {ev.kalaImages?.slice(2).map((img, idx) => (
                        <div key={idx} className="col-lg-3 col-md-3 col-6 reveal reveal-up">
                          <div className="rounded-3 overflow-hidden shadow-sm border">
                            <img src={img} alt="Kala Academy Bottom" className="img-fluid w-100 object-fit-cover" style={{ height: '260px' }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Description Text Box */}
                    <div className="p-4 bg-light rounded-4 border mt-2">
                      {ev.bulletPoints.map((pt, idx) => (
                        <p key={idx} className="text-secondary mb-2 reveal reveal-right" style={{ lineHeight: '1.7' }}>{pt}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Layout: Editorial Left Stack */}
                {ev.layoutType === 'editorial-left-stack' && (
                  <div className="row g-4 align-items-start">
                    <div className="col-lg-5">
                      <div className="d-flex flex-column gap-3">
                        {ev.leftImages?.map((img, i) => (
                          <div key={i} className="rounded-3 overflow-hidden shadow-sm reveal reveal-left">
                            <img src={img} alt="Event" className="img-fluid w-100 object-fit-cover" style={{ height: '170px' }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="d-flex flex-column gap-3">
                        {ev.bulletPoints.map((pt, idx) => (
                          <div key={idx} className="d-flex align-items-start gap-2 reveal reveal-right">
                            <i className="bi bi-caret-right-fill flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                            <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>{pt}</p>
                          </div>
                        ))}
                      </div>
                      {ev.bottomImages && (
                        <div className="row g-3 mt-3">
                          {ev.bottomImages.map((img, idx) => (
                            <div key={idx} className="col-6 reveal reveal-up">
                              <div className="rounded-3 overflow-hidden border shadow-sm">
                                <img src={img} alt="Gallery" className="img-fluid w-100 object-fit-cover" style={{ height: '120px' }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Layout: Grid Mix */}
                {ev.layoutType === 'grid-mix' && (
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-6">
                      <div className="row g-2">
                        {ev.collageImages?.map((img, idx) => (
                          <div key={idx} className={`${idx === 0 ? 'col-12' : 'col-6'} reveal reveal-left`}>
                            <div className="rounded-3 overflow-hidden shadow-sm border">
                              <img src={img} alt="Collage" className="img-fluid w-100 object-fit-cover" style={{ height: idx === 0 ? '220px' : '130px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="d-flex flex-column gap-3">
                        {ev.bulletPoints.map((pt, idx) => (
                          <div key={idx} className="d-flex align-items-start gap-2 reveal reveal-right">
                            <i className="bi bi-caret-right-fill flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                            <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>{pt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Layout: Split 2x2 */}
                {ev.layoutType === 'split-2x2' && (
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-6">
                      <div className="row g-2">
                        {ev.grid4Images?.map((img, idx) => (
                          <div key={idx} className="col-6 reveal reveal-left">
                            <div className="rounded-3 overflow-hidden shadow-sm border">
                              <img src={img} alt="Event" className="img-fluid w-100 object-fit-cover" style={{ height: '140px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="d-flex flex-column gap-3">
                        {ev.bulletPoints.map((pt, idx) => (
                          <div key={idx} className="d-flex align-items-start gap-2 reveal reveal-right">
                            <i className="bi bi-caret-right-fill flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                            <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>{pt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Layout: Grid 6 Special */}
                {ev.layoutType === 'grid-6-special' && (
                  <div>
                    <div className="row g-2 mb-4">
                      {ev.gallery6?.map((img, idx) => (
                        <div key={idx} className="col-md-4 col-6 reveal reveal-left">
                          <div className="rounded-3 overflow-hidden shadow-sm border">
                            <img src={img} alt="Gallery" className="img-fluid w-100 object-fit-cover" style={{ height: '150px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-light rounded-3 border">
                      {ev.bulletPoints.map((pt, idx) => (
                        <p key={idx} className="text-dark fw-medium mb-1 reveal reveal-right" style={{ lineHeight: '1.7' }}>{pt}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Layout: Single Grid Frame */}
                {ev.layoutType === 'single-grid-frame' && (
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="row g-2">
                        {ev.grid4Images?.map((img, idx) => (
                          <div key={idx} className="col-6 reveal reveal-left">
                            <div className="rounded-3 overflow-hidden shadow-sm border">
                              <img src={img} alt="Event" className="img-fluid w-100 object-fit-cover" style={{ height: '130px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center">
                      <div className="p-4 bg-light rounded-4 border w-100">
                        {ev.bulletPoints.map((pt, idx) => (
                          <p key={idx} className="text-secondary mb-0 reveal reveal-right" style={{ lineHeight: '1.7' }}>{pt}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Layout: Grid 2x2 Left */}
                {ev.layoutType === 'grid-2x2-left' && (
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="row g-2">
                        {ev.grid4Images?.map((img, idx) => (
                          <div key={idx} className="col-6 reveal reveal-left">
                            <div className="rounded-3 overflow-hidden shadow-sm border">
                              <img src={img} alt="Event" className="img-fluid w-100 object-fit-cover" style={{ height: '140px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="d-flex flex-column gap-3">
                        {ev.bulletPoints.map((pt, idx) => (
                          <div key={idx} className="d-flex align-items-start gap-2 reveal reveal-right">
                            <i className="bi bi-caret-right-fill flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                            <p className="text-secondary mb-0" style={{ lineHeight: '1.7' }}>{pt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer Strip */}
                <div className="position-absolute bottom-0 start-0 end-0" style={{ height: '6px', background: 'linear-gradient(90deg, #f5b000 0%, #d94e34 100%)' }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}