import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Search, Clock, Users, BookOpen, ChevronRight, IndianRupee,
  Microscope, Stethoscope, HeartPulse, Activity, Trophy, Star,
  CheckCircle2, ArrowRight, ActivitySquare, Award, GraduationCap, Building
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { getCourses } from '../data/coursesData';

const IconMap = {
  Microscope, Activity, HeartPulse, ActivitySquare, Stethoscope, Users,
  BookOpen, Clock, CheckCircle2, Award, Building, GraduationCap, Star, Trophy
};

const categories = ["All", "Degree", "Diploma", "Certification"];

const CountUp = ({ to, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const end = parseInt(to, 10);
      const totalDuration = duration * 1000;
      
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / totalDuration, 1);
        const easeProgress = progress * (2 - progress);
        setCount(Math.floor(easeProgress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, courses]);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } }
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800 overflow-x-hidden selection:bg-blue-900/30">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center py-32 overflow-hidden bg-slate-900 border-b border-slate-800">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 bg-slate-900">
          <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center bg-fixed opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80"></div>
          {/* Animated Glows */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[120px]"
          ></motion.div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px]"
          ></motion.div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#1e3a5f] bg-[#1e3a5f]/20 backdrop-blur-md mb-8 shadow-sm"
          >
            <SparklesIcon className="text-white w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">Admissions Open 2026-27</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-2xl"
          >
            Build Your Future in <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a5f] to-blue-400 filter drop-shadow-[0_0_20px_rgba(30,58,95,0.5)]">Healthcare</span>
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light"
          >
            Equipping the next generation of paramedical and nursing professionals with world-class training, modern labs, and 100% placement support.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <motion.a 
              href="#courses" 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="px-8 py-4 rounded-full bg-[#1e3a5f] text-white font-bold text-lg shadow-[0_0_30px_rgba(30,58,95,0.6)] hover:shadow-[0_0_50px_rgba(30,58,95,0.8)] hover:brightness-125 transition-all duration-300"
            >
              Explore Courses
            </motion.a>
            <Link to="/contact" className="group px-8 py-4 rounded-full border border-slate-500 bg-white/10 backdrop-blur-md text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
              Contact Advisor <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="relative z-20 -mt-16 mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {[
            { label: "Students", value: 5000, suffix: "+", icon: <Users className="text-[#1e3a5f] mb-2" size={28} /> },
            { label: "Placement", value: 95, suffix: "%", icon: <Trophy className="text-blue-400 mb-2" size={28} /> },
            { label: "Experience", value: 10, suffix: "+ Yrs", icon: <Award className="text-indigo-400 mb-2" size={28} /> },
            { label: "Modern Labs", value: 15, suffix: "+", icon: <Microscope className="text-purple-400 mb-2" size={28} /> }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center justify-center p-4 text-center group"
            >
              <div className="group-hover:-translate-y-2 transition-transform duration-300 ease-out">{stat.icon}</div>
              <h3 className="text-3xl font-black text-slate-900 tracking-wider my-1 drop-shadow-md">
                <CountUp to={stat.value} duration={2} suffix={stat.suffix} />
              </h3>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. PREMIUM COURSE CARDS SECTION */}
      <section id="courses" className="mx-auto max-w-7xl px-4 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4"><span className="text-[#1e3a5f]">Premium</span> Programs</h2>
            <p className="text-slate-600 max-w-xl">Choose from our industry-aligned paramedical and nursing courses designed to secure your future in the booming healthcare sector.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white/50 backdrop-blur-sm py-3.5 pl-12 pr-5 text-sm text-slate-900 focus:border-[#1e3a5f]/50 focus:ring-1 focus:ring-[#1e3a5f]/50 focus:outline-none transition-all placeholder-slate-400 shadow-inner"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 ${
                selectedCategory === category
                  ? "bg-[#1e3a5f] text-white shadow-[0_0_20px_rgba(30,58,95,0.5)]"
                  : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-[#1e3a5f]/10 hover:text-slate-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.article
                layout
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
                key={course.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white backdrop-blur-xl border border-slate-200 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(37,99,235,0.4)]"
              >
                {/* Image Section */}
                <div className="relative h-60 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10"></div>
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                    loading="lazy"
                  />
                  {/* Floating Icon */}
                  <div className="absolute top-4 right-4 z-20 h-12 w-12 rounded-2xl bg-white/90 backdrop-blur border border-slate-200 flex items-center justify-center text-[#1e3a5f] shadow-lg group-hover:bg-[#1e3a5f] group-hover:text-white transition-colors duration-300">
                    {course.iconName && IconMap[course.iconName] ? React.createElement(IconMap[course.iconName], { size: 24 }) : <BookOpen size={24} />}
                  </div>
                  {/* Category Badge */}
                  <span className="absolute bottom-4 left-4 z-20 rounded-full px-4 py-1.5 text-xs font-black tracking-widest uppercase bg-[#1e3a5f] text-white backdrop-blur border border-white/20 shadow-lg">
                    {course.category}
                  </span>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-6 sm:p-8 relative">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1e3a5f]/10 rounded-full blur-2xl group-hover:bg-[#1e3a5f]/20 transition-all duration-500"></div>
                  
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1e3a5f] transition-colors leading-tight mb-3">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1 line-clamp-3">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm font-medium border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock size={16} className="text-[#1e3a5f]" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <IndianRupee size={16} className="text-[#1e3a5f]" />
                      {course.fees}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <BookOpen size={16} className="text-[#1e3a5f]" />
                      <span className="truncate">{course.eligibility}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <Trophy size={16} className="text-emerald-500" />
                      {course.salary}
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    className="mt-8 flex items-center justify-center gap-2 w-full rounded-2xl bg-slate-50 border border-slate-200 py-3.5 text-sm font-bold text-slate-900 group-hover:text-white group-hover:bg-[#1e3a5f] group-hover:border-transparent transition-all duration-300"
                  >
                    Apply Now <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredCourses.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl font-bold text-slate-600">No programs found matching your criteria.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-6 rounded-full bg-blue-600/20 text-blue-400 border border-blue-600/30 px-8 py-3 text-sm font-bold hover:bg-blue-600 hover:text-slate-900 transition-colors"
            >
              View All Programs
            </button>
          </div>
        )}
      </section>

      {/* 4. WHY CHOOSE US & CAREER OUTCOMES */}
      <section className="bg-white py-24 relative overflow-hidden border-t border-slate-100">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Your Pathway to a <span className="text-[#1e3a5f]">Secure Career</span></h2>
            <p className="text-lg text-slate-600">We don't just provide education; we guarantee practical exposure and career readiness in the healthcare industry.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "100% Practical Training", desc: "Hands-on experience in modern simulated labs and tie-up hospitals.", icon: <ActivitySquare size={24} />, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop" },
              { title: "Assured Placement", desc: "Dedicated placement cell with tie-ups to 50+ leading hospitals and diagnostic centers.", icon: <Building size={24} />, image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop" },
              { title: "Experienced Faculty", desc: "Learn directly from practicing doctors, surgeons, and expert technologists.", icon: <GraduationCap size={24} />, image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop" },
              { title: "Modern Medical Labs", desc: "Fully equipped pathology, microbiology, and radiology practical labs.", icon: <Microscope size={24} />, image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop" },
              { title: "Hostel Facility", desc: "Safe, secure, and comfortable separate hostels for boys and girls.", icon: <CheckCircle2 size={24} />, image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=600&auto=format&fit=crop" },
              { title: "Govt. Approved", desc: "All courses are fully recognized and affiliated with medical boards.", icon: <Star size={24} />, image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=600&auto=format&fit=crop" },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                className="bg-slate-50 border border-slate-200 p-6 rounded-3xl hover:bg-white hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 flex flex-col gap-3 group"
              >
                <div className="w-full h-48 rounded-2xl overflow-hidden mb-2 relative">
                  <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/30 shadow-lg">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. STUDENT SUCCESS & TESTIMONIALS */}
      <section className="py-24 bg-slate-50 relative border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-200 pb-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Student <span className="text-[#1e3a5f]">Success</span></h2>
              <p className="text-slate-600 max-w-xl text-lg">Hear from our alumni who are now successfully working in top hospitals and healthcare centers.</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", course: "BMLT Batch 2022", role: "Lab Tech, Apollo", text: "The practical training at APJ Institute gave me the confidence to handle advanced pathology equipment from day one of my job.", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop" },
              { name: "Priya Patel", course: "B.Sc Nursing", role: "Staff Nurse", text: "Excellent faculty and continuous hospital visits ensured I was completely ready for the challenging environment of an ICU.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
              { name: "Amit Kumar", course: "X-Ray Technician", role: "Radiologist Asst.", text: "Thanks to the placement cell, I got an offer letter before I even finished my final semester exams!", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop" }
            ].map((review, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:-translate-y-2 transition-all duration-300 relative flex flex-col h-full group hover:border-blue-300"
              >
                <p className="text-slate-600 text-lg mb-8 leading-relaxed flex-1">"{review.text}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover border border-slate-300 shadow-sm group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <p className="text-xs text-[#1e3a5f] font-medium">{review.role} • {review.course}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PREMIUM CTA SECTION */}
      <section className="relative py-24 mx-4 sm:mx-8 lg:mx-auto max-w-7xl mb-24 overflow-hidden rounded-[3rem] shadow-[0_0_100px_rgba(37,99,235,0.2)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f3a] via-[#1e3a5f] to-[#0f1f3a] z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2000&auto=format&fit=crop')] opacity-10 mix-blend-overlay object-cover"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
        
        <div className="relative z-10 text-center px-4 md:px-12 py-16 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-2xl"
          >
            <Stethoscope size={40} className="text-blue-300" />
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">Your Medical Career <br/>Starts Here</h2>
          <p className="text-xl text-blue-100/90 max-w-2xl mb-10 font-light">Join thousands of successful healthcare professionals. Limited seats available for the upcoming academic session.</p>
          
          <div className="flex flex-col sm:flex-row gap-5 mt-4">
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
              <Link to="/contact" className="px-10 py-5 rounded-full bg-[#1e3a5f] hover:bg-[#2a4d75] text-white font-black text-lg shadow-[0_0_40px_rgba(30,58,95,0.6)] transition-colors duration-300 flex items-center justify-center gap-2 group">
                Apply Now <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </motion.div>
            <motion.a 
              href="https://wa.me/919243758191" 
              target="_blank" 
              rel="noreferrer" 
              whileHover={{ scale: 1.05 }}
              className="px-10 py-5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-lg shadow-[0_0_40px_rgba(37,211,102,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              Chat on WhatsApp
            </motion.a>
          </div>
        </div>
      </section>

    </div>
  );
}

// Sparkles Icon component
function SparklesIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
