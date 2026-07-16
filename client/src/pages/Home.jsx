import { motion } from 'framer-motion';
import HeroSlider from '../components/home/HeroSlider';
import HighlightCards from '../components/home/HighlightCards';
import UpdatesSection from '../components/home/UpdatesSection';
import AdmissionSection from '../components/home/AdmissionSection';
import AboutSection from '../components/home/AboutSection';
import CoursesSection from '../components/home/CoursesSection';
import ContactSection from '../components/home/ContactSection';

export default function Home() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <HeroSlider />
      <HighlightCards />
      <UpdatesSection />
      <AdmissionSection variant="homepage" />
      <AboutSection />
      <CoursesSection />
      <ContactSection />
    </motion.main>
  );
}