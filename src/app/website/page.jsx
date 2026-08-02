import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import AboutSection from '@/components/home/AboutSection';
import Collaborations from '@/components/home/Collaborations';
import UpcomingExhibitions from '@/components/home/UpcomingExhibitions';
import RecognitionAndAwards from '@/components/home/RecognitionAndAwards';
import RecentEventsSection from '@/components/home/RecentEventsSection';
import WhoCanJoin from '@/components/home/WhoCanJoin';
import StatsCounter from '@/components/home/StatsCounter';
import Testimonials from '@/components/home/Testimonials';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Newsletter from '@/components/home/Newsletter';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="min-vh-100 d-flex flex-column">
      <Navbar />
      <Hero />
      <AboutSection />
      <Collaborations />
      <UpcomingExhibitions />
      <RecentEventsSection />
      <RecognitionAndAwards />
      <WhoCanJoin />
      <StatsCounter />
      <Testimonials />
      <WhyChooseUs />
      <Newsletter />
      <Footer />
    </main>
  );
}