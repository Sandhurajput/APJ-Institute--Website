import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TopHeaderBar from '../components/home/TopHeaderBar';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';
import { buildingImage } from '../data/homepageData';
// Import classroom images directly
import classroomStudents1 from '../components/home/WhatsApp Image 2026-05-17 at 9.41.09 PM.jpeg';
import classroomStudents2 from '../components/home/WhatsApp Image 2026-05-17 at 9.41.12 PM.jpeg';
import classroomStudents3 from '../components/home/WhatsApp Image 2026-05-17 at 9.41.14 PM.jpeg';
import posterBanner from '../../WhatsApp Image 2026-05-17 at 9.40.59 PM.jpeg';
import labCollageImage from '../../WhatsApp Image 2026-05-17 at 9.41.19 PM.jpeg';
import sec1Image from '../sec1.jpg';
import sec2Image from '../sec2.jpg';
import mainVideo from '../mainvd.mp4';
import firstsc1 from '../fistsc1.jpg';
import firstsc2 from '../firstsc2.jpg';
import sectionImage from '../section .jpg';
import lastsc1 from '../lastsc1.jpg';
import lastsc2 from '../lastsc2.jpg';
import lastsc3 from '../lastsc3.jpg';
import lastsc4 from '../lastsc4.jpg';

export default function About() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <TopHeaderBar />
      <Navbar />

      {/* Main 2-Column Layout Container */}
      <div className="flex bg-white gap-8 lg:gap-16 px-6 lg:px-12 py-8 lg:py-12">
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 bg-white rounded-3xl shadow-lg p-8 md:p-16 border border-slate-200 mt-16 lg:mt-32"
        >
          {/* Section 1: Hero */}
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* LEFT SIDE - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 bg-[#1e3a5f] text-white rounded-full text-xs font-bold uppercase mb-6">
                  Admissions Open
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                  Turn Your Ambition into <span className="text-[#1e3a5f]">Achievement</span>
                </h1>
                <p className="text-base text-slate-600 mb-8 leading-relaxed">
                  Empowering students with world-class education, innovation, and genuine opportunities.
                </p>
                
                {/* Button Group */}
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('/#contact')}
                    className="px-6 py-3 bg-[#1e3a5f] text-white font-bold rounded-full hover:bg-[#152a45] transition text-sm"
                  >
                    Apply Today
                  </button>
                  <button
                    onClick={() => navigate('/#courses')}
                    className="px-6 py-3 border-2 border-[#1e3a5f] text-[#1e3a5f] font-bold rounded-full hover:bg-blue-50 transition text-sm"
                  >
                    Explore Campus
                  </button>
                </div>
              </motion.div>

              {/* RIGHT SIDE - Image Stack */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-96"
              >
                {/* Large Image - Background */}
                <div className="rounded-3xl overflow-hidden h-full bg-slate-300 shadow-lg">
                  <img src={firstsc1} alt="Campus Building" className="w-full h-full object-cover" />
                </div>
                
                {/* Small Image - Overlay on top left */}
                <div className="absolute -top-8 -left-8 rounded-2xl overflow-hidden w-40 h-40 bg-slate-300 shadow-xl border-4 border-white">
                  <img src={firstsc2} alt="Students" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Section 2: Stats and Quote Box - Two Column Layout */}
          <div className="mb-0 bg-[#1e3a5f] text-white rounded-none p-0 grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
            {/* LEFT SIDE - Image with Stats */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="relative p-8"
            >
              {/* Main Image */}
              <div className="rounded-none overflow-hidden h-64 bg-slate-400 mb-6">
                <img src={sec1Image} alt="Graduates" className="w-full h-full object-cover" />
              </div>
              
              {/* Text below image */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white mb-2">Excellence in Education</h3>
                  <p className="text-sm text-white leading-relaxed">
                    Our institution is dedicated to providing world-class education with a focus on innovation, research, and practical learning.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-2">Proven Track Record</h3>
                  <p className="text-sm text-white leading-relaxed">
                    With decades of excellence, we have produced leaders and professionals who are making a difference in their respective fields.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - Text and Single Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 p-8 flex flex-col justify-center"
            >
              <div>
                <span className="inline-block px-3 py-1 bg-blue-500 rounded-full text-xs font-bold uppercase mb-4">
                  Why Choose Us
                </span>
                <p className="text-xl font-semibold mb-4">
                  "The right opportunity can turn dreams into limitless potential."
                </p>
                <p className="text-sm text-blue-100 leading-relaxed">
                  Explore comprehensive programs with industry experts, practical training, and career support. Our students succeed because we focus on real-world skills.
                </p>
              </div>

              {/* Single Image on right */}
              <div className="rounded-none overflow-hidden h-64 bg-slate-400">
                <img src={sec2Image} alt="Campus" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>

          {/* Section 3: Why Choose Us with Feature Cards */}
          <div className="mb-12 px-6 py-8">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-block px-4 py-2 bg-slate-200 rounded-full text-xs font-semibold text-slate-600 border border-slate-300">
                Why Choose Us
              </span>
            </div>

            {/* Title - 2 lines bold */}
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight text-center">
              One of the largest, most<br />diverse universities in the World
            </h2>

            {/* Description - 2 lines normal text */}
            <p className="text-center text-slate-600 text-sm mb-12 leading-relaxed max-w-2xl mx-auto">
              Home to students from every corner of the globe, fostering diversity, inclusion, and world-class academic excellence.
            </p>

            {/* Three Feature Cards */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { 
                  icon: '📚', 
                  title: 'Inspiring Student Life', 
                  desc: 'We have focused on generating new knowledge & promoting' 
                },
                { 
                  icon: '�', 
                  title: 'Education Affordability', 
                  desc: 'We have focused on generating new knowledge & promoting'
                },
                { 
                  icon: '�', 
                  title: 'Core-level Academics solutions', 
                  desc: 'We have focused on generating new knowledge & promoting'
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`text-center p-8 rounded-3xl transition-all flex flex-col justify-center items-center h-80 ${
                    idx === 1 
                      ? 'bg-white text-slate-900 border-2 border-[#1e3a5f] shadow-lg' 
                      : 'bg-white text-slate-900 border-2 border-slate-300 hover:shadow-lg'
                  }`}
                >
                  <span className="text-5xl mb-4 block">{item.icon}</span>
                  <h3 className={`font-black text-lg mb-3 ${idx === 1 ? 'text-slate-900' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm mb-4 leading-relaxed ${idx === 1 ? 'text-slate-600' : 'text-slate-600'}`}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 4: Background Image with Blue Info Box */}
          <div className="px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden h-96 bg-slate-300 shadow-lg mb-0"
          >
            {/* Background Image - Full Coverage */}
            <img 
              src={labCollageImage} 
              alt="Event Background" 
              className="w-full h-full object-cover"
            />
            
            {/* Light Dark Overlay */}
            <div className="absolute inset-0 bg-black/25"></div>
            
            {/* Cylindrical Text Container - Expanded */}
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black/40 rounded-3xl p-10 max-w-2xl backdrop-blur-sm">
              {/* Heading - 3 rows */}
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">
                Excellence in<br />Healthcare<br />Education
              </h2>
              
              {/* Description Text - Larger and covering more space */}
              <p className="text-white font-semibold text-base leading-relaxed">
                APJ Institute is committed to delivering world-class medical and paramedical education with state-of-the-art facilities, experienced faculty, and hands-on practical training that prepares students for successful healthcare careers and makes a meaningful impact in society. We foster innovation, excellence, and professional development through comprehensive curriculum and mentorship programs.
              </p>
            </div>
            
            {/* Medical Icons - Right Side */}
            {/* REMOVED - Icons section removed */}
          </motion.div>

          {/* Section 5: Our Faculty & Programs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mb-12 mt-16 pt-12"
          >
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-block px-3 py-1 bg-slate-200 rounded-full text-xs font-semibold text-slate-600 border border-slate-300">
                Our Expertise
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-black text-slate-900 mb-8 leading-tight text-center">
              Specialized Programs &<br />Expert Faculty
            </h2>

            {/* 4 Fields Grid with Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Field 1: Medical */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex flex-col"
              >
                <div className="rounded-2xl overflow-hidden h-56 mb-4 bg-slate-300 shadow-lg">
                  <img src={lastsc1} alt="Medical Program" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-[#1e3a5f] mb-3">Medical Program</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Comprehensive medical education with hands-on clinical training. Our faculty members are experienced healthcare professionals dedicated to shaping the next generation of doctors with cutting-edge medical knowledge and ethical practices.
                  </p>
                  <p className="text-xs text-slate-500 font-semibold">• MBBS Program • Clinical Rotation • Research Opportunities</p>
                </div>
              </motion.div>

              {/* Field 2: Paramedical */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-col"
              >
                <div className="rounded-2xl overflow-hidden h-56 mb-4 bg-slate-300 shadow-lg">
                  <img src={lastsc2} alt="Paramedical Program" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-[#1e3a5f] mb-3">Paramedical Program</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Specialized training in radiology and laboratory sciences. Our paramedical courses ensure students gain practical expertise and professional certification to support healthcare delivery across diverse settings.
                  </p>
                  <p className="text-xs text-slate-500 font-semibold">• Radiology • Lab Sciences</p>
                </div>
              </motion.div>

              {/* Field 3: Research & Innovation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col"
              >
                <div className="rounded-2xl overflow-hidden h-56 mb-4 bg-slate-300 shadow-lg">
                  <img src={lastsc3} alt="Research & Innovation" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-[#1e3a5f] mb-3">Research & Innovation</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    State-of-the-art laboratories and research facilities for groundbreaking medical discoveries. Students collaborate with internationally trained researchers to advance healthcare knowledge and contribute to scientific advancement.
                  </p>
                  <p className="text-xs text-slate-500 font-semibold">• Research Labs • Publications • Innovation Hub</p>
                </div>
              </motion.div>

              {/* Field 4: Professional Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-col"
              >
                <div className="rounded-2xl overflow-hidden h-56 mb-4 bg-slate-300 shadow-lg">
                  <img src={lastsc4} alt="Professional Development" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-[#1e3a5f] mb-3">Professional Development</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    Mentorship programs, internships, and career guidance to prepare students for successful healthcare careers. Our alumni network spans leading hospitals and medical institutions worldwide, opening doors to excellence.
                  </p>
                  <p className="text-xs text-slate-500 font-semibold">• Mentorship • Internships • Career Placement</p>
                </div>
              </motion.div>

            </div>
          </motion.div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-sky-100 rounded-3xl shadow-lg p-6 md:p-10 flex-col border border-blue-200"
        >
          {/* Section 1: Full-Coverage Video */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 rounded-2xl overflow-hidden bg-slate-900 shadow-lg h-[500px]"
          >
            <div className="relative w-full h-full bg-black flex items-center justify-center group cursor-pointer">
              {/* Video Player */}
              <video 
                src={mainVideo}
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
              ></video>
              
              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <p className="text-white text-sm font-semibold">Campus Tour & Student Life</p>
                <p className="text-gray-300 text-xs">Discover APJ Institute</p>
              </div>
            </div>
          </motion.div>

          {/* Section 2: Voices - Testimonials */}
          <div className="mb-12">
            {/* Heading with Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-block px-4 py-2 bg-slate-200 rounded-full text-xs font-semibold text-slate-600 border border-slate-300">
                Testimonials
              </span>
            </div>
            
            {/* Title - 2 rows bold */}
            <h2 className="text-3xl font-black text-slate-900 mb-8 leading-tight text-center">
              Voices From Our<br />Global Community
            </h2>

            {/* Featured Card (Large - Left) and Regular Card (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Featured Card - Teal Background */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="bg-[#1e3a5f] text-white rounded-3xl p-6"
              >
                <p className="text-sm mb-4 leading-relaxed font-semibold">
                  "A truly transformative learning experience. The curriculum is well-designed with practical exposure combined with theoretical knowledge. The campus environment is inclusive and supportive. I have gained confidence and practical skills that will help me excel in my healthcare career. Highly recommended!"
                </p>
                <div className="flex items-center gap-3">
                  <img src={classroomStudents1} alt="Priya Sharma" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm">Priya Sharma</p>
                    <p className="text-xs text-blue-50">Medical Student</p>
                  </div>
                </div>
              </motion.div>

              {/* Regular Card - White Background */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white text-slate-900 rounded-3xl p-6 border-2 border-slate-200"
              >
                <p className="text-sm mb-4 leading-relaxed font-semibold">
                  "Education that builds confidence. The faculty here understand student needs and provide personalized guidance with compassion and professionalism. Every class is engaging and the practical labs are outstanding."
                </p>
                <div className="flex items-center gap-3">
                  <img src={classroomStudents2} alt="Rahul Kumar" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm">Rahul Kumar</p>
                    <p className="text-xs text-slate-600">Paramedical Grad</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Row - 4 Real Campus/Student Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {[new20, new21, new22, new24].map((imgSrc, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="rounded-3xl overflow-hidden h-72 shadow-lg border-2 border-slate-200 group"
                >
                  <img 
                    src={imgSrc} 
                    alt={`Campus Activity ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 3: News Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Header with Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="inline-block px-3 py-1 bg-[#1e3a5f] text-white rounded-full text-xs font-bold">
                  Updates
                </span>
              </div>
              <button className="px-3 py-1 border border-slate-300 text-xs font-semibold text-slate-600 rounded-full hover:bg-slate-50 transition">
                View All
              </button>
            </div>
            
            {/* Title */}
            <h2 className="text-3xl font-black text-slate-900 mb-6">News about our university</h2>
            
            {/* News Items */}
            <div className="space-y-3">
              {[
                { date: 'Jan 09, 2026', title: 'How can I apply for admission?', isActive: true },
                { date: 'Jan 08, 2026', title: 'How can I apply for admission?', isActive: false },
                { date: 'Jan 07, 2026', title: 'How can I apply for admission?', isActive: false },
                { date: 'Jan 06, 2026', title: 'How can I apply for admission?', isActive: false },
                { date: 'Jan 05, 2026', title: 'How can I apply for admission?', isActive: false },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`rounded-2xl p-4 flex items-center justify-between border-2 transition cursor-pointer hover:bg-[#1e3a5f] hover:text-white hover:border-[#1e3a5f] group ${
                    item.isActive 
                      ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' 
                      : 'bg-white text-slate-900 border-slate-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex-1">
                    <p className={`text-xs mb-1 ${
                      item.isActive 
                        ? 'text-blue-100' 
                        : 'text-slate-600 group-hover:text-blue-100'
                    }`}>{item.date}</p>
                    <p className={`text-sm font-semibold ${
                      item.isActive 
                        ? 'text-white' 
                        : 'text-slate-900 group-hover:text-white'
                    }`}>{item.title}</p>
                  </div>
                  <button className={`ml-3 px-3 py-1 rounded-full text-xs font-bold transition ${
                    item.isActive 
                      ? 'bg-white text-[#1e3a5f] hover:bg-blue-50' 
                      : 'bg-slate-100 text-slate-600 group-hover:bg-[#1e3a5f] group-hover:text-white'
                  }`}>
                    {item.isActive ? '↓ Read More' : '↓'}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Section 4: FAQ with Image and Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Header with Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-block px-3 py-1 bg-slate-200 rounded-full text-xs font-semibold text-slate-600 border border-slate-300">
                FAQs
              </span>
            </div>
            
            {/* Title - 2 rows */}
            <h2 className="text-3xl font-black text-slate-900 mb-8 leading-tight text-center">
              Frequently Asked<br />Questions?
            </h2>

            {/* Main Content - Image Left, Text/Questions Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left - Image */}
              <div className="rounded-3xl overflow-hidden h-full min-h-[600px] bg-slate-300 shadow-lg">
                <img src={sectionImage} alt="Campus Building" className="w-full h-full object-cover" />
              </div>

              {/* Right - FAQ Content */}
              <div className="space-y-4">
                {/* Info Box */}
                <div className="bg-white rounded-2xl p-6 border-2 border-slate-200">
                  <h3 className="text-lg font-black text-slate-900 mb-4">Have Questions? We're Here to Help</h3>
                  
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    We understand that choosing the right institute is an important decision. Our experienced admissions team is ready to guide you through every step of the process. Whether you're curious about our programs, admission requirements, or campus life, we have the answers you're looking for.
                  </p>
                  
                  <div className="flex gap-4">
                    <a 
                      href="mailto:apjinstituteparamedicaldantewa@gmail.com"
                      className="flex-1 px-4 py-2 bg-[#1e3a5f] text-white font-bold rounded-lg hover:bg-[#152a45] transition text-sm text-center flex items-center justify-center gap-2"
                    >
                      ✉ Email Us
                    </a>
                    <button 
                      onClick={() => navigate('/admission')}
                      className="flex-1 px-4 py-2 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition text-sm text-center flex items-center justify-center gap-2"
                    >
                      📞 Call Us
                    </button>
                  </div>
                </div>

                {/* FAQ Questions */}
                <div className="space-y-3">
                  {[
                    { q: 'What programs does the university offer?' },
                    { q: 'How can I apply for admission?' },
                    { q: 'Are scholarships or financial aid available?' },
                    { q: 'Does the university provide on-campus accommodation?' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white border-2 border-slate-200 rounded-xl p-4 hover:shadow-md transition flex items-center justify-between"
                    >
                      <p className="font-bold text-slate-900 text-sm">{item.q}</p>
                      <button className="text-slate-400 hover:text-slate-600 text-lg flex-shrink-0">+</button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 5: CTA Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="bg-white border-4 border-slate-300 rounded-3xl p-12 text-center"
          >
            <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
              Start Your Journey<br />Toward a Brighter Future.
            </h2>
            
            <p className="text-slate-600 text-sm mb-8 leading-relaxed max-w-xl mx-auto">
              Join a diverse, forward-thinking academic community committed to excellence, innovation, and creating lasting impact on society.
            </p>
            
            <button 
              onClick={() => navigate('/admission')}
              className="px-8 py-3 bg-[#1e3a5f] hover:bg-[#152a45] text-white font-bold rounded-full transition"
            >
              Apply Now →
            </button>
          </motion.div>

          {/* Section 6: Info Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#1e3a5f] text-white rounded-b-3xl p-12 -mt-1 space-y-6"
          >
            {/* Row 1 */}
            <p className="text-sm leading-relaxed">
              APJ Institute is dedicated to providing comprehensive medical and paramedical education that prepares students for successful healthcare careers. With state-of-the-art facilities and experienced faculty, we ensure every student receives practical training combined with theoretical excellence.
            </p>

            {/* Row 2 */}
            <p className="text-sm leading-relaxed">
              Our programs are designed to meet industry standards and global healthcare requirements. We focus on hands-on learning, research opportunities, and mentorship from experienced healthcare professionals to develop well-rounded practitioners.
            </p>

            {/* Row 3 */}
            <p className="text-sm leading-relaxed">
              With a commitment to social responsibility, we run community health programs and organize outreach initiatives. Our students actively participate in these activities, developing a sense of duty toward society while gaining valuable real-world experience.
            </p>

            {/* Row 4 */}
            <p className="text-sm leading-relaxed">
              Join our diverse community of learners from across the globe. At APJ Institute, we believe in fostering an inclusive environment where every student can thrive, innovate, and contribute meaningfully to the healthcare sector and society at large.
            </p>

            {/* Row 5 */}
            <p className="text-sm leading-relaxed">
              Our alumni network spans across prestigious healthcare institutions, research organizations, and hospitals worldwide. We take pride in the achievements of our graduates who continue to make a difference in patient care, medical research, and healthcare innovation globally.
            </p>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </motion.div>
  );
}
