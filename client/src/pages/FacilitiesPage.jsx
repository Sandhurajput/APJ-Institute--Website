import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Microscope, ActivitySquare, BookOpen, Home, Coffee, Users, Bus, HeartPulse, 
  Sparkles, Play, ChevronRight, Zap, ShieldCheck, Award, GraduationCap, Monitor,
  Syringe, ArrowRight, Star
} from 'lucide-react';


/* ─── Advanced Magnetic Button Component ─── */
const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

/* ─── CountUp Component ─── */
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
  }, [to, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── Glowing Particle Component ─── */
const FloatingParticle = ({ size, color, top, left, delay, duration }) => (
  <motion.div
    animate={{ 
      y: [0, -40, 0], 
      x: [0, 20, 0], 
      opacity: [0.2, 0.8, 0.2],
      scale: [1, 1.2, 1]
    }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    className={`absolute rounded-full blur-[2px] ${color}`}
    style={{ width: size, height: size, top, left }}
  />
);

/* ─── Main Page Component ─── */
export default function FacilitiesPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // Smooth scroll springs
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  
  // Transforms
  const heroY = useTransform(smoothProgress, [0, 0.2], ['0%', '50%']);
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  
  const bentoY = useTransform(smoothProgress, [0.1, 0.3], ['20%', '0%']);
  
  // Data
  const bentoItems = [
    { title: "Advanced Laboratories", desc: "Hands-on experience with modern medical equipment.", icon: <Microscope size={28}/>, img: "/assets/lab_demo.png", span: "md:col-span-6 md:row-span-1" },
    { title: "Practical Training", desc: "Master real-world clinical skills and procedures.", icon: <ActivitySquare size={28}/>, img: "/assets/practice.png", span: "md:col-span-6 md:row-span-1" },
    { title: "Modern Classrooms", desc: "Engaging and interactive learning environments.", icon: <Monitor size={28}/>, img: "/assets/classroom.png", span: "md:col-span-7 md:row-span-1" },
    { title: "Supportive Faculty", desc: "Expert teachers dedicated to student success.", icon: <Users size={28}/>, img: "/assets/teacher.png", span: "md:col-span-5 md:row-span-1" },
  ];

  const features = [
    { title: "Advanced Labs", desc: "Industry-grade testing equipment.", icon: <Microscope size={24}/>, img: "/assets/lab_demo.png" },
    { title: "Boys Hostel", desc: "Safe, secure living spaces exclusively for boys.", icon: <Home size={24}/>, img: "/assets/facility.jpeg" },
    { title: "Practical Training", desc: "Real-world clinical exposure.", icon: <ActivitySquare size={24}/>, img: "/assets/practice.png" },
    { title: "Expert Faculty", desc: "Highly supportive and experienced teachers.", icon: <Users size={24}/>, img: "/assets/teacher.png" },
    { title: "Paramedical Courses", desc: "Comprehensive programs for aspiring healthcare professionals.", icon: <BookOpen size={24}/>, img: "/assets/lab_setup.jpg", hideText: true },
    { title: "Modern Classrooms", desc: "Engaging learning environments.", icon: <Monitor size={24}/>, img: "/assets/classroom.png" },
  ];

  return (
    <div ref={containerRef} className="bg-[#020617] min-h-screen text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30">

      
      {/* Ambient Global Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-screen"></div>
      </div>

      <section className="relative min-h-screen flex flex-col pt-10 overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-[url('/assets/hero_bg.png')] bg-cover bg-center opacity-100"></div>
          {/* Layered Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/40 to-[#020617]"></div>
          
          {/* Animated Light Beams */}
          <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)] blur-[1px] origin-left -rotate-12" />
        </motion.div>

        {/* Particles */}
        <FloatingParticle size="8px" color="bg-cyan-400" top="20%" left="15%" delay={0} duration={4} />
        <FloatingParticle size="12px" color="bg-blue-400" top="30%" left="80%" delay={1} duration={5} />
        <FloatingParticle size="6px" color="bg-indigo-400" top="70%" left="10%" delay={2} duration={3} />
        <FloatingParticle size="10px" color="bg-cyan-300" top="60%" left="75%" delay={0.5} duration={6} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 w-full flex-grow flex flex-col items-center justify-center text-center pb-12">
          
          <motion.div initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl mb-8 shadow-[0_0_40px_rgba(34,211,238,0.15)] relative overflow-hidden group">
            <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
            <Sparkles className="text-cyan-400 w-5 h-5 animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">Redefining Healthcare Education</span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1 initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] md:leading-[1.05] tracking-tighter">
              Experience the <br className="hidden sm:block" />
              <span className="relative inline-block mt-2 sm:mt-0">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-[#1e3a5f]">Future</span>
                <motion.span animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0 bg-cyan-400/20 blur-[20px] md:blur-[40px] z-0"></motion.span>
              </span> of Learning
            </motion.h1>
          </div>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg md:text-xl text-blue-100/70 mb-10 leading-relaxed font-medium max-w-3xl">
            Step into an immersive, ultra-modern campus designed to transform aspiring students into elite healthcare professionals.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-6 relative z-20 justify-center"
          >
            <MagneticButton 
              onClick={() => document.getElementById('campus-ecosystem')?.scrollIntoView({ behavior: 'smooth' })}
              className="relative group overflow-hidden px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-white text-[#020617] font-bold text-sm sm:text-base flex items-center gap-3 shadow-[0_0_50px_rgba(255,255,255,0.15)] w-full sm:w-auto justify-center"
            >
              <span className="relative z-10 flex items-center gap-2">Explore Campus <ArrowRight className="group-hover:translate-x-1.5 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Floating Glass Stats Inside Hero Section */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="relative z-30 w-full px-4 pb-16 md:pb-24 lg:pb-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 p-3 sm:p-4 rounded-3xl md:rounded-[2.5rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
              {[ { v: "100", s: "%", l: "Practical Training" }, { v: "10", s: "+", l: "Expert Faculty" }, { v: "5", s: "+", l: "Advanced Labs" }, { v: "24", s: "/7", l: "Boys Hostel" } ].map((stat, i) => (
                <div key={i} className="text-center p-3 sm:p-4 md:p-6 relative group overflow-hidden rounded-2xl md:rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <h4 className="text-3xl md:text-4xl font-black text-white mb-1 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-500 origin-center"><CountUp to={stat.v} suffix={stat.s} /></h4>
                  <p className="text-[10px] md:text-xs font-bold text-blue-200/60 uppercase tracking-widest">{stat.l}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          2. BENTO GRID FACILITY EXPERIENCE
      ════════════════════════════════════════════ */}
      <section id="campus-ecosystem" className="min-h-screen flex flex-col justify-center pt-24 pb-40 relative z-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }} className="mb-12 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight mb-4">
              Immersive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#1e3a5f]">Campus Ecosystem</span>
            </h2>
          </motion.div>

          <motion.div style={{ y: bentoY }} className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[240px] lg:auto-rows-[280px]">
            {bentoItems.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5 hover:border-cyan-500/30 transition-all duration-700 ${item.span}`}
              >
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-out z-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent z-0 group-hover:via-[#020617]/20 transition-all duration-700"></div>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-screen"></div>

                <div className="absolute inset-0 p-5 sm:p-6 lg:p-8 flex flex-col justify-end z-10">
                  <motion.div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-cyan-300 mb-4 lg:mb-6 group-hover:-translate-y-2 group-hover:bg-cyan-400 group-hover:text-[#020617] group-hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] transition-all duration-500">
                    {item.icon}
                  </motion.div>
                  <h3 className="text-2xl lg:text-3xl font-black text-white mb-2 group-hover:-translate-y-1 transition-transform duration-500 tracking-tight leading-tight">{item.title}</h3>
                  <p className="text-blue-100/60 text-sm lg:text-base font-medium group-hover:-translate-y-1 transition-transform duration-500 delay-75 line-clamp-2 md:line-clamp-none">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          3. MAGAZINE-STYLE STUDENT LIFE COLLAGE
      ════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 md:py-32 relative overflow-hidden bg-white text-slate-900 rounded-3xl md:rounded-[4rem] mx-4 md:mx-6 lg:mx-8 shadow-[0_0_100px_rgba(0,0,0,1)]">
        {/* Soft Radial Glows on White */}
        <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-blue-50 to-transparent opacity-80 pointer-events-none"></div>
        <div className="absolute -left-40 top-1/2 w-full md:w-[600px] h-[600px] bg-cyan-100/50 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1e3a5f]/20 bg-blue-50 mb-6 sm:mb-8">
                <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1e3a5f]">Campus Life</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#020617] mb-6 sm:mb-8 tracking-tighter leading-[1.1]">
                A Community <br/>That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a5f] to-blue-500">Inspires</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 font-medium mb-10 sm:mb-12 leading-relaxed max-w-xl">
                Beyond rigorous academics, experience a vibrant lifestyle. Our integrated campus fosters holistic growth, ensuring you thrive mentally, physically, and socially.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: "Secure Boys Hostel", desc: "Premium accommodation exclusively for boys." },
                  { title: "Advanced Laboratories", desc: "State-of-the-art practical training facilities." },
                  { title: "Digital Library", desc: "Extensive collection of medical resources." }
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.5 }}
                    className="flex gap-6 group cursor-pointer"
                  >
                    <div className="w-1.5 h-auto bg-slate-200 group-hover:bg-[#1e3a5f] rounded-full transition-colors duration-500"></div>
                    <div>
                      <h4 className="text-2xl font-bold text-[#020617] mb-2 group-hover:text-[#1e3a5f] transition-colors">{item.title}</h4>
                      <p className="text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Overlapping Collage */}
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full mt-10 lg:mt-0 block">
              <motion.div initial={{ opacity: 0, y: 50, rotate: -5 }} whileInView={{ opacity: 1, y: 0, rotate: -2 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-0 right-2 sm:right-10 w-[65%] sm:w-[60%] h-[60%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10 group"
              >
                <img src="/assets/teacher.png" alt="Lab Equipment" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </motion.div>
              
              <motion.div initial={{ opacity: 0, y: 50, rotate: 5 }} whileInView={{ opacity: 1, y: 0, rotate: 3 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }}
                className="absolute bottom-4 sm:bottom-10 left-2 sm:left-10 w-[70%] sm:w-[65%] h-[55%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20 group"
              >
                <img src="/assets/classroom.png" alt="Practical Training" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              </motion.div>

              {/* Floating Testimonial Snippet */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8, type: "spring" }}
                className="absolute top-[45%] left-0 sm:left-[-10px] -translate-y-1/2 z-30 bg-white/95 backdrop-blur-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white max-w-[180px] sm:max-w-[250px]"
              >
                <div className="flex text-amber-400 mb-2 sm:mb-3 gap-0.5 sm:gap-1">
                  {[...Array(5)].map((_, idx) => <Star key={idx} size={12} className="sm:w-[14px] sm:h-[14px]" fill="currentColor" />)}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm font-bold italic leading-snug">"Excellent practical training facilities for students."</p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          5. ADVANCED FEATURE CARDS (WHY CHOOSE US)
      ════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative z-10">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }} className="text-center mb-12 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 md:mb-6">Designed For <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Greatness</span></h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group relative p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-[#020617] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden"
              >
                {/* Background Image */}
                <img src={feature.img} alt={feature.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out z-0" />
                <div className={`absolute inset-0 ${feature.hideText ? 'bg-black/10' : 'bg-gradient-to-t from-[#020617] via-[#020617]/60 to-[#020617]/10 group-hover:via-[#020617]/40'} z-0 transition-all duration-700`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {!feature.hideText && (
                    <>
                      <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-cyan-400 mb-8 group-hover:-translate-y-2 group-hover:scale-110 group-hover:shadow-[0_20px_40px_rgba(34,211,238,0.2)] group-hover:bg-cyan-500/10 transition-all duration-500">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">{feature.title}</h3>
                      <p className="text-slate-400 text-lg font-medium leading-relaxed">{feature.desc}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          6. MAGNETIC & GLOWING CTA SECTION
      ════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl px-4 lg:px-8 relative z-10"
        >
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] text-center p-6 sm:p-10 md:p-16 shadow-[0_0_80px_rgba(30,58,95,0.6)] border border-white/20 group">
            
            {/* Video Background */}
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-100">
              <source src="/assets/apj.mp4" type="video/mp4" />
            </video>
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/40 to-transparent z-0"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.4 }}
                className="w-16 h-16 bg-white/10 backdrop-blur-2xl rounded-2xl flex items-center justify-center border border-white/20 mb-6 shadow-[0_0_50px_rgba(34,211,238,0.5)]">
                <Zap size={32} className="text-cyan-400" />
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-[1.1] drop-shadow-lg">
                Begin Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white filter drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">Legacy</span>
              </h2>
              
              <p className="text-cyan-50 text-lg md:text-xl font-medium mb-10 leading-relaxed max-w-xl mx-auto drop-shadow-md">
                Join an elite community of medical professionals. Admissions are now open.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full">
                <MagneticButton 
                  onClick={() => navigate('/contact')}
                  className="w-full sm:w-auto px-6 py-3.5 sm:px-10 sm:py-4 rounded-full border border-white/50 text-white font-black text-base sm:text-lg hover:bg-white/20 transition-colors backdrop-blur-md"
                >
                  Contact Us
                </MagneticButton>
              </div>
            </div>
          </div>
        </motion.div>
      </section>


    </div>
  );
}
