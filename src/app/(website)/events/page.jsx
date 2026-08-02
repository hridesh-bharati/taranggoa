'use client';

import { useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// --- Custom Scroll Reveal Hook (Updates to add 'active' class for jhatka animations) ---
const useScrollReveal = (refs) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add 'active' class to trigger the jhatka CSS animations
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Observe all elements with .anim-title, .anim-desc, .anim-fade-up, etc.
    const selectors = ['.anim-title', '.anim-desc', '.anim-btn-outline', '.anim-btn-orange', '.anim-fade-up', '.anim-snap-card'];
    const elements = document.querySelectorAll(selectors.join(','));
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [refs]);
};

export default function EventsPage() {
  const headerRef = useRef(null);
  const eventsListRef = useRef(null);

  useScrollReveal([headerRef, eventsListRef]);

  // Complete List of All Real Events extracted from your Posters & Screenshots
  const eventsData = [
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
      ],
      bottomImages: [
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400'
      ]
    },
    {
      id: 'goa-mohotsav-bangalore-2025',
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
      id: 'tarang-utsav-south-goa-2024',
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
      ],
      bottomImages: [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400'
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
    {
      id: 'empowerher-2025-womens-day',
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
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600'
      ]
    },
    {
      id: 'tarang-pakhwada-award',
      category: 'Recent Events',
      title: 'A Proud Moment - Tarang Felicitated at Seva Pakhwada',
      subtitle: 'Honored for Contribution in promoting SHGs',
      date: '17th September 2025',
      location: 'Kala Academy, Panaji',
      layoutType: 'editorial-left-stack',
      bulletPoints: [
        "We are deeply honored to be felicitated for our contribution in promoting Self Help Groups (SHGs) at the Seva Pakhwada event on 17th September at Kala Academy, organized by the Goa State Rural Livelihoods Mission, Department of Rural Development, Government of Goa.",
        "The felicitation was done at the hands of Hon'ble Chief Minister of Goa, Dr. Pramod Sawant, along with respected ministers and dignitaries present at the event.",
        "This recognition strengthens our commitment to empower women entrepreneurs, SHGs, and small businesses, helping them achieve new heights in business."
      ],
      leftImages: [
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600'
      ]
    },
    {
      id: 'tarang-pop-up-bazaar-2026',
      category: 'Recent Events',
      title: 'Tarang Pop-Up Bazaar!',
      subtitle: 'In association with Panjim Inox Courtyard',
      date: 'May 1st-3rd, 2026',
      location: 'Inox Courtyard Panaji Goa',
      layoutType: 'grid-mix',
      bulletPoints: [
        "Hon'ble CM of Goa, & Chairperson of ESG, Dr. Pramod Sawant, Hon'ble MLA Delaila Lobo, Vice Chairman, General Manager Mrunal Walke, along with the entire ESG team, visited the Purumetoche Fest and Pop-Up Bazaar in Panjii.",
        "A proud moment celebrating and supporting local entrepreneurs."
      ],
      collageImages: [
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1561999991-567a4a9a3b09?auto=format&fit=crop&q=80&w=600'
      ]
    },
    {
      id: 'tarang-utsav-2026-women',
      category: 'Recent Events',
      title: 'Tarang Utsav 2026 - Celebrating Women Entrepreneurs',
      subtitle: 'Over 120 stalls featuring women entrepreneurs',
      date: '16, 17, 18 & 19 April 2026',
      location: 'Kala Academy, Panaji',
      layoutType: 'editorial-left-stack',
      bulletPoints: [
        "Over 120 stalls featuring women entrepreneurs and homegrown brands came together to showcase creativity, innovation, and local talent.",
        "The event also featured a special curated fashion show with 40+ women across all age groups confidently flaunting their finest creations on the ramp.",
        "Influencers and glam artist partners added glamour and vibrancy to the celebration.",
        "The event was proudly supported by the Department of Art & Culture, DRDA-GSRLM, and the Department of Handicrafts, Textile & Coir, Government of Goa, JCI Bardez Panjim."
      ],
      leftImages: [
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=600'
      ]
    },
    {
      id: 'tarang-utsav-2025-margao',
      category: 'Recent Events',
      title: 'Tarang Utsav 2025',
      subtitle: 'The four-day extravaganza',
      date: '14th – 17th August 2025',
      location: 'BPS Sports Club, Margao',
      layoutType: 'grid-2x2-left',
      bulletPoints: [
        "The four-day extravaganza inaugurated by Shri Digambar Kamat, Hon'ble MLA, Margao, along with a special guest Smt. Deepali Naik, Project Director, DRDA South Goa.",
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
      category: 'Recent Events',
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
      category: 'Recent Events',
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
      category: 'Recent Events',
      title: 'Carnival Fair 2026',
      subtitle: 'In association with JCI Bardez and Rotary Clubs',
      date: '14th and 15th Feb 2026',
      location: 'Dr. F. L. Gomes Garden, Panaji',
      layoutType: 'grid-6-special',
      bulletPoints: [
        "Featured 60+ women entrepreneurs at this carnival fair.",
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
      id: 'carnival-market-2025',
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
    <main className="min-vh-100 d-flex flex-column bg-light position-relative">
      <Navbar />

      {/* =========================================================
          GLOBAL REUSABLE SNAP & SCROLL ANIMATIONS
          ========================================================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Default Hidden State for Elements */
        .anim-title,
        .anim-desc,
        .anim-btn-outline,
        .anim-btn-orange,
        .anim-fade-up,
        .anim-snap-card {
          opacity: 0;
          will-change: transform, opacity;
        }

        /* --- ACTIVE TRIGGERS (SCROLL REVEAL / OBSERVER) --- */

        /* 1. Main Title - Top to Bottom Snap */
        .anim-title.active {
          animation: snapDown 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.1s forwards;
        }

        /* 2. Description - Right to Left Snap */
        .anim-desc.active {
          animation: snapRightToLeft 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.35s forwards;
        }

        /* 3. Outline Button - Right to Left Snap */
        .anim-btn-outline.active {
          animation: snapRightToLeft 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.65s forwards;
        }

        /* 4. Orange/Red Button - Delay Jhatka Snap */
        .anim-btn-orange.active {
          animation: snapRightToLeft 0.35s cubic-bezier(0.68, -0.6, 0.265, 1.75) 0.8s forwards;
        }

        /* 5. General Fade Up for Cards */
        .anim-fade-up.active {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        /* 6. Card Snap Animation - New for events list */
        .anim-snap-card.active {
          animation: snapScaleUp 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }

        /* --- KEYFRAMES --- */

        @keyframes snapDown {
          0% {
            opacity: 0;
            transform: translateY(-80px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes snapRightToLeft {
          0% {
            opacity: 0;
            transform: translateX(120px);
          }
          80% {
            transform: translateX(-10px); /* Bounce Jhatka */
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes snapScaleUp {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(30px);
          }
          70% {
            transform: scale(1.02) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* Card Hover Lift Utility */
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }

        .hover-lift:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15) !important;
        }

        /* Vertical Marquee Animation */
        @keyframes marqueeVertical {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }

        .marquee-content {
          animation: marqueeVertical 18s linear infinite;
        }

        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }

        /* Image Fade Animation */
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.98); }
          15% { opacity: 1; transform: scale(1); }
          85% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.02); }
        }

        .fade-image-active {
          animation: fadeInOut 4s ease-in-out infinite;
        }

        @keyframes waterRipple {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
      `}} />

      {/* Hero Header Banner with Ocean Blue Water Wave Effect & Background Photos */}
      <section 
        ref={headerRef} 
        className="py-5 text-white position-relative overflow-hidden"
        style={{ 
          backgroundColor: '#005f9e',
          backgroundImage: `
            linear-gradient(135deg, rgba(2, 40, 89, 0.92) 0%, rgba(0, 95, 158, 0.85) 50%, rgba(0, 150, 214, 0.88) 100%),
            url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1600')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxShadow: 'inset 0 -10px 25px rgba(0,0,0,0.2)'
        }}
      >
        {/* Subtly Animated Water Ripple Overlay Pattern */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 60%)`,
            backgroundSize: '180px 180px',
            animation: 'waterRipple 12s infinite linear'
          }}
        ></div>

        <div className="container py-5 text-center position-relative z-2">
          
          {/* Glassmorphism Category Badge */}
          <span 
            className="badge text-white fw-bold px-4 py-2 rounded-pill mb-3 shadow-sm d-inline-flex align-items-center gap-2 anim-title" 
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.18)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              fontSize: '0.8rem', 
              letterSpacing: '1.2px' 
            }}
          >
            <i className="bi bi-droplet-fill text-info fs-6"></i>
            • TARANG OFFICIAL EVENTS ARCHIVE
          </span>

          {/* Main Headline */}
          <h1 
            className="display-3 fw-extrabold mb-3 anim-title" 
            style={{ 
              fontWeight: 900, 
              textShadow: '0 4px 15px rgba(0,0,0,0.3)',
              letterSpacing: '-0.5px' 
            }}
          >
            Our Journey & <span className="text-warning">Recent Events</span>
          </h1>

          {/* Subtitle Line */}
          <p 
            className="lead text-light opacity-90 mx-auto anim-desc fs-5" 
            style={{ 
              maxWidth: '800px', 
              lineHeight: '1.7',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)' 
            }}
          >
            Empowering women entrepreneurs, local artisans, and MSME units across Goa and India through exhibitions, pop-up bazaars, and state level summits.
          </p>

          {/* Water Wave Decor Effect at Bottom */}
          <div 
            className="position-absolute bottom-0 start-0 end-0"
            style={{
              height: '24px',
              background: 'rgba(255, 255, 255, 0.15)',
              clipPath: 'ellipse(75% 100% at 50% 100%)',
              pointerEvents: 'none'
            }}
          ></div>
        </div>
      </section>

      {/* Main Events Feed Section */}
      <section ref={eventsListRef} className="py-5 bg-white">
        <div className="container py-3">
          <div className="d-flex flex-column gap-5">
            {eventsData.map((ev, index) => (
              <div 
                key={ev.id} 
                id={ev.id} 
                className="card border-0 rounded-4 shadow-lg overflow-hidden position-relative p-4 p-md-5 hover-lift anim-snap-card"
                style={{ backgroundColor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)' }}
              >
                
                {/* Top Corner Triangle Decor (Matching Poster Style) */}
                <div 
                  className="position-absolute top-0 end-0 pointer-events-none"
                  style={{
                    width: 0,
                    height: 0,
                    borderStyle: 'solid',
                    borderWidth: '0 70px 70px 0',
                    borderColor: 'transparent #f5b000 transparent transparent',
                    zIndex: 1
                  }}
                ></div>

                {/* Section Tag & Category */}
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
                  <span className="fw-extrabold fs-4 text-uppercase" style={{ color: '#d94e34', letterSpacing: '0.5px' }}>
                    {ev.category}
                  </span>
                  <span className="badge px-3 py-1.5 rounded-pill fw-semibold" style={{ backgroundColor: '#f3e8ff', color: '#6b21a8' }}>
                    {ev.date}
                  </span>
                </div>

                {/* Main Event Title & Subtitle */}
                <h2 className="display-6 fw-extrabold text-dark mb-1" style={{ fontWeight: 800 }}>
                  {ev.title}
                </h2>
                {ev.subtitle && (
                  <h6 className="fw-bold mb-3" style={{ color: '#6b21a8' }}>
                    {ev.subtitle}
                  </h6>
                )}

                {/* Meta Details Bar */}
                <div className="d-flex flex-wrap gap-4 text-secondary fs-6 mb-4 pb-3 border-bottom border-light">
                  <span><i className="bi bi-geo-alt-fill text-danger me-1"></i><strong>Location:</strong> {ev.location}</span>
                  <span><i className="bi bi-calendar-check-fill text-primary me-1"></i><strong>Date:</strong> {ev.date}</span>
                </div>

                {/* --- LAYOUT TYPE 1: Editorial Left Stack Images --- */}
                {ev.layoutType === 'editorial-left-stack' && (
                  <div className="row g-4 align-items-start">
                    {/* Left Column Stacked Images */}
                    <div className="col-lg-5">
                      <div className="d-flex flex-column gap-3">
                        {ev.leftImages?.map((img, i) => (
                          <div key={i} className="rounded-3 overflow-hidden shadow-sm border border-2 border-light">
                            <img src={img} alt="Event Photo" className="img-fluid w-100 object-fit-cover" style={{ height: '170px' }} />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column Bullet Text Content */}
                    <div className="col-lg-7">
                      <div className="d-flex flex-column gap-3">
                        {ev.bulletPoints.map((pt, pIdx) => (
                          <div key={pIdx} className="d-flex align-items-start gap-2 anim-fade-up">
                            <i className="bi bi-caret-right-fill fs-5 flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                            <p className="text-secondary fs-6 mb-0" style={{ lineHeight: '1.7' }}>
                              {pt}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Extra Gallery if available */}
                      {ev.bottomImages && (
                        <div className="row g-3 mt-3">
                          {ev.bottomImages.map((bImg, bIdx) => (
                            <div key={bIdx} className="col-6">
                              <div className="rounded-3 overflow-hidden border shadow-sm">
                                <img src={bImg} alt="Additional Highlight" className="img-fluid w-100 object-fit-cover" style={{ height: '120px' }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* --- LAYOUT TYPE 2: Grid Mix Collage --- */}
                {ev.layoutType === 'grid-mix' && (
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-6">
                      <div className="row g-2">
                        {ev.collageImages?.map((cImg, cIdx) => (
                          <div key={cIdx} className={cIdx === 0 ? 'col-12' : 'col-6'}>
                            <div className="rounded-3 overflow-hidden shadow-sm border">
                              <img src={cImg} alt="Collage Photo" className="img-fluid w-100 object-fit-cover" style={{ height: cIdx === 0 ? '220px' : '130px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="d-flex flex-column gap-3 pe-lg-2">
                        {ev.bulletPoints.map((pt, pIdx) => (
                          <div key={pIdx} className="d-flex align-items-start gap-2 anim-fade-up">
                            <i className="bi bi-caret-right-fill fs-5 flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                            <p className="text-secondary fs-6 mb-0" style={{ lineHeight: '1.7' }}>
                              {pt}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- LAYOUT TYPE 3: Split 2x2 Grid --- */}
                {ev.layoutType === 'split-2x2' && (
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-6">
                      <div className="row g-2">
                        {ev.grid4Images?.map((gImg, gIdx) => (
                          <div key={gIdx} className="col-6">
                            <div className="rounded-3 overflow-hidden shadow-sm border">
                              <img src={gImg} alt="GoxFest Photo" className="img-fluid w-100 object-fit-cover" style={{ height: '140px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="d-flex flex-column gap-3">
                        {ev.bulletPoints.map((pt, pIdx) => (
                          <div key={pIdx} className="d-flex align-items-start gap-2 anim-fade-up">
                            <i className="bi bi-caret-right-fill fs-5 flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                            <p className="text-secondary fs-6 mb-0" style={{ lineHeight: '1.75' }}>
                              {pt}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- LAYOUT TYPE 4: Grid 6 Special (Woman's Day / Carnival) --- */}
                {ev.layoutType === 'grid-6-special' && (
                  <div>
                    <div className="row g-2 mb-4">
                      {ev.gallery6?.map((gImg, gIdx) => (
                        <div key={gIdx} className="col-md-4 col-6">
                          <div className="rounded-3 overflow-hidden shadow-sm border">
                            <img src={gImg} alt="Celebration Gallery" className="img-fluid w-100 object-fit-cover" style={{ height: '150px' }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-light rounded-3 border">
                      {ev.bulletPoints.map((pt, pIdx) => (
                        <p key={pIdx} className="text-dark fw-medium mb-1 anim-fade-up" style={{ lineHeight: '1.7' }}>
                          {pt}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- LAYOUT TYPE 5: Single Grid Frame (Chaturthi) --- */}
                {ev.layoutType === 'single-grid-frame' && (
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="row g-2">
                        {ev.grid4Images?.map((gImg, gIdx) => (
                          <div key={gIdx} className="col-6">
                            <div className="rounded-3 overflow-hidden shadow-sm border">
                              <img src={gImg} alt="Exhibition Grid" className="img-fluid w-100 object-fit-cover" style={{ height: '130px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center">
                      <div className="p-4 bg-light rounded-4 border w-100">
                        {ev.bulletPoints.map((pt, pIdx) => (
                          <p key={pIdx} className="text-secondary fs-6 mb-0 anim-fade-up" style={{ lineHeight: '1.75' }}>
                            {pt}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- LAYOUT TYPE 6: 2x2 Grid Left Layout (Tarang Utsav 2025 Margao) --- */}
                {ev.layoutType === 'grid-2x2-left' && (
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <div className="row g-2">
                        {ev.grid4Images?.map((gImg, gIdx) => (
                          <div key={gIdx} className="col-6">
                            <div className="rounded-3 overflow-hidden shadow-sm border">
                              <img src={gImg} alt="Event Photos" className="img-fluid w-100 object-fit-cover" style={{ height: '140px' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="d-flex flex-column gap-3">
                        {ev.bulletPoints.map((pt, pIdx) => (
                          <div key={pIdx} className="d-flex align-items-start gap-2 anim-fade-up">
                            <i className="bi bi-caret-right-fill fs-5 flex-shrink-0 mt-1" style={{ color: '#d94e34' }}></i>
                            <p className="text-secondary fs-6 mb-0" style={{ lineHeight: '1.75' }}>
                              {pt}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Decorative Angle Strip (Matching Poster) */}
                <div 
                  className="position-absolute bottom-0 start-0 end-0"
                  style={{
                    height: '8px',
                    background: 'linear-gradient(90deg, #f5b000 0%, #d94e34 100%)'
                  }}
                ></div>

              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}