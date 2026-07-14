import { motion } from 'framer-motion';
import AdmissionSection from '../components/home/AdmissionSection';
import TopHeaderBar from '../components/home/TopHeaderBar';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';

export default function AdmissionPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <TopHeaderBar />
      <Navbar />
      <AdmissionSection />
      <Footer />
    </motion.div>
  );
}
