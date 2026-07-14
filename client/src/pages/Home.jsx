import { motion } from 'framer-motion';
import Navbar from '../components/home/Navbar';
import HeroSlider from '../components/home/HeroSlider';
import HighlightCards from '../components/home/HighlightCards';
import UpdatesSection from '../components/home/UpdatesSection';
import AdmissionSection, { AdmissionSectionWithVideo } from '../components/home/AdmissionSection';
import AboutSection from '../components/home/AboutSection';
import FacultySection from '../components/home/FacultySection';
import EventsSection from '../components/home/EventsSection';
import CoursesSection from '../components/home/CoursesSection';
import GallerySection from '../components/home/GallerySection';

import ContactSection from '../components/home/ContactSection';

export default function Home() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Navbar />
      <HeroSlider />
      <HighlightCards />
      <UpdatesSection />
      <AdmissionSectionWithVideo />
      <AboutSection />
      <FacultySection />
      <EventsSection />
      <CoursesSection />
      <GallerySection />

      <ContactSection />
    </motion.main>
  );
}
