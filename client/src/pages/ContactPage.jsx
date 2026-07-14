import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin, Phone, Mail, Clock, Send, ArrowRight,
  ChevronDown, GraduationCap, HelpCircle, PhoneCall
} from 'lucide-react';


/* ─── FAQ Data ─── */
const faqs = [
  { q: "How can I apply for admission?", a: "You can apply online through our website or visit the campus directly. Fill the enquiry form above and our team will guide you through the complete admission process." },
  { q: "What courses are available at APJ Institute?", a: "We offer BMLT (3 Years), DMLT (2 Years), X-Ray / Radiography Technician (2 Years), OT Technician (2 Years), B.Sc. Nursing (4 Years), and Hospital Assistant Certification (6 Months)." },
  { q: "Is hostel facility available?", a: "Yes, we provide safe and comfortable separate hostel facilities for boys and girls with mess, Wi-Fi, and 24/7 security." },
  { q: "How to contact the administration office?", a: "You can call us at 9243758191 / 9307616474, email info@apjinstitutedantewada.com, or visit us at Sanjay Nagar, near BSNL Exchange Office, Dantewada (C.G.)." },
  { q: "What is the fee structure?", a: "Fee varies by course. BMLT starts at ₹45,000/year. Contact our admission office for the complete fee breakdown and available scholarship options." },
];

/* ─── Accordion Item ─── */
function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-500 ${isOpen ? 'border-[#1e3a5f] bg-white shadow-[0_0_20px_rgba(30,58,95,0.15)] scale-[1.01]' : 'border-slate-200 bg-white hover:border-[#1e3a5f]/40 shadow-sm hover:shadow-md'}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
      >
        <span className={`text-base font-bold pr-4 transition-colors duration-300 ${isOpen ? 'text-[#1e3a5f]' : 'text-slate-800 group-hover:text-[#1e3a5f]'}`}>{faq.q}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-[#1e3a5f]/10' : 'bg-slate-100 group-hover:bg-[#1e3a5f]/5'}`}>
          <ChevronDown size={18} className={`shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#1e3a5f]' : 'text-slate-400 group-hover:text-[#1e3a5f]'}`} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 mt-2">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
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

/* ─── Main Contact Page ─── */
export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } }
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800 overflow-x-hidden selection:bg-[#1e3a5f]/30">

      {/* ════════════════════════════════════════════
          1. HERO SECTION
      ════════════════════════════════════════════ */}
      <section className="relative min-h-[65vh] flex flex-col justify-center items-center py-32 overflow-hidden bg-slate-900 border-b border-slate-800">
        {/* Background Effects with Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-fixed opacity-50 mix-blend-luminosity"
          ></motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#071028]/80 via-[#071028]/60 to-[#071028]/95"></div>
          {/* Animated Glows */}
          <motion.div 
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]"
          ></motion.div>
          <motion.div 
            animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[150px]"
          ></motion.div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#1e3a5f]/50 bg-[#1e3a5f]/30 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(30,58,95,0.3)]"
          >
            <SparklesIcon className="text-white w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">We're Here to Help</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight drop-shadow-2xl"
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#1e3a5f] filter drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">APJ Institute</span>
          </motion.h1>

          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-lg md:text-xl text-blue-50/90 mb-10 leading-relaxed font-light"
          >
            Reach out for admissions, career guidance, or campus visits. Start your journey toward a secure future in healthcare today.
          </motion.p>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center items-center gap-5"
          >
            <a 
              href="tel:9243758191" 
              className="group px-8 py-4 rounded-full bg-[#1e3a5f] text-white font-bold text-lg shadow-[0_0_30px_rgba(30,58,95,0.5)] hover:shadow-[0_0_50px_rgba(30,58,95,0.8)] hover:-translate-y-1 hover:bg-[#152a45] transition-all duration-300 flex items-center gap-2"
            >
              <PhoneCall size={20} className="group-hover:scale-110 transition-transform duration-300" /> Call Now
            </a>
            <a href="https://wa.me/919243758191" target="_blank" rel="noreferrer" className="group px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-white font-bold text-lg hover:bg-white/15 hover:-translate-y-1 shadow-lg transition-all duration-300 flex items-center gap-2">
              Contact Advisor <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          2. CONTACT INFO CARDS (STATS STYLE)
      ════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-16 mx-auto max-w-6xl px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-[0_20px_50px_rgba(30,58,95,0.08)]"
        >
          {[
            { icon: <MapPin size={28} />, label: 'Our Address', value: 'Sanjay Nagar, Dantewada', color: 'text-blue-600', bg: 'bg-blue-50' },
            { icon: <Phone size={28} />, label: 'Phone Number', value: '92437 58191', color: 'text-[#1e3a5f]', bg: 'bg-[#1e3a5f]/5' },
            { icon: <Mail size={28} />, label: 'Email Address', value: 'info@apjinstitute.com', color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { icon: <Clock size={28} />, label: 'Working Hours', value: 'Mon – Sat: 9 AM – 5 PM', color: 'text-purple-600', bg: 'bg-purple-50' },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex flex-col items-center justify-center p-6 text-center group bg-white rounded-2xl hover:bg-slate-50 shadow-sm hover:shadow-[0_10px_30px_rgba(30,58,95,0.08)] transition-all duration-500 border border-transparent hover:border-slate-200 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`w-16 h-16 rounded-2xl ${card.bg} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out`}>
                <div className={`${card.color}`}>{card.icon}</div>
              </div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest my-1 relative z-10">{card.label}</h3>
              <p className="text-base font-extrabold text-slate-800 leading-relaxed whitespace-pre-line relative z-10">{card.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          3. CONTACT FORM + MAP
      ════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8 py-24 relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-200/40 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#1e3a5f]/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="mb-10">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Send Us a <span className="text-[#1e3a5f]">Message</span></h2>
              <p className="text-slate-600 text-lg font-medium">Fill the form and our admissions team will respond within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(30,58,95,0.06)] space-y-6 relative overflow-hidden group/form">
              {/* Form subtle background gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -z-10 transition-opacity duration-700 opacity-50 group-focus-within/form:opacity-100"></div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative">
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder=" "
                    className="peer w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 pt-7 pb-3 text-sm text-slate-900 focus:bg-white focus:border-[#1e3a5f] focus:ring-4 focus:ring-[#1e3a5f]/10 focus:outline-none transition-all shadow-sm" />
                  <label htmlFor="name" className="absolute left-5 top-5 text-sm font-bold text-slate-400 transition-all duration-300 peer-focus:-translate-y-2 peer-focus:text-[10px] peer-focus:text-[#1e3a5f] peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-slate-500 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest cursor-text">
                    Full Name
                  </label>
                </div>
                <div className="relative">
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder=" "
                    className="peer w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 pt-7 pb-3 text-sm text-slate-900 focus:bg-white focus:border-[#1e3a5f] focus:ring-4 focus:ring-[#1e3a5f]/10 focus:outline-none transition-all shadow-sm" />
                  <label htmlFor="phone" className="absolute left-5 top-5 text-sm font-bold text-slate-400 transition-all duration-300 peer-focus:-translate-y-2 peer-focus:text-[10px] peer-focus:text-[#1e3a5f] peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-slate-500 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest cursor-text">
                    Phone Number
                  </label>
                </div>
              </div>
              
              <div className="relative">
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder=" "
                  className="peer w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 pt-7 pb-3 text-sm text-slate-900 focus:bg-white focus:border-[#1e3a5f] focus:ring-4 focus:ring-[#1e3a5f]/10 focus:outline-none transition-all shadow-sm" />
                <label htmlFor="email" className="absolute left-5 top-5 text-sm font-bold text-slate-400 transition-all duration-300 peer-focus:-translate-y-2 peer-focus:text-[10px] peer-focus:text-[#1e3a5f] peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-slate-500 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest cursor-text">
                  Email Address
                </label>
              </div>
              
              <div className="relative">
                <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required
                  className="peer w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 pt-7 pb-3 text-sm text-slate-900 focus:bg-white focus:border-[#1e3a5f] focus:ring-4 focus:ring-[#1e3a5f]/10 focus:outline-none transition-all appearance-none shadow-sm cursor-pointer">
                  <option value="" disabled hidden></option>
                  <option value="admission">Admission Enquiry</option>
                  <option value="course">Course Information</option>
                  <option value="placement">Placement Support</option>
                  <option value="hostel">Hostel Facility</option>
                  <option value="other">Other</option>
                </select>
                <label htmlFor="subject" className={`absolute left-5 transition-all duration-300 font-bold uppercase tracking-widest cursor-pointer ${formData.subject ? 'top-3 text-[10px] text-slate-500' : 'top-5 text-sm text-slate-400 normal-case tracking-normal peer-focus:top-3 peer-focus:text-[10px] peer-focus:text-[#1e3a5f] peer-focus:uppercase peer-focus:tracking-widest'}`}>
                  Subject
                </label>
                <ChevronDown className="absolute right-5 top-6 text-slate-400 pointer-events-none" size={18} />
              </div>
              
              <div className="relative">
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder=" "
                  className="peer w-full bg-slate-50/50 border border-slate-200 rounded-2xl px-5 pt-7 pb-3 text-sm text-slate-900 focus:bg-white focus:border-[#1e3a5f] focus:ring-4 focus:ring-[#1e3a5f]/10 focus:outline-none transition-all resize-none shadow-sm" />
                <label htmlFor="message" className="absolute left-5 top-5 text-sm font-bold text-slate-400 transition-all duration-300 peer-focus:-translate-y-2 peer-focus:text-[10px] peer-focus:text-[#1e3a5f] peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-slate-500 peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-widest cursor-text">
                  Write your message here...
                </label>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 font-bold text-sm shadow-sm">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">✅</div>
                    Message sent successfully! We'll contact you soon.
                  </motion.div>
                ) : (
                  <motion.button key="btn" type="submit" 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-[#1e3a5f] to-[#2a4d75] text-white font-bold text-sm shadow-[0_10px_20px_rgba(30,58,95,0.2)] hover:shadow-[0_15px_30px_rgba(30,58,95,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6">
            <div className="mb-4">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Find Us on <span className="text-[#1e3a5f]">Map</span></h2>
              <p className="text-slate-600 text-lg font-medium">Visit our campus in Dantewada for a personal tour and guidance session.</p>
            </div>

            <div className="relative flex-1 min-h-[450px] rounded-[2rem] overflow-hidden border border-white shadow-[0_20px_50px_rgba(30,58,95,0.08)] bg-white group p-2">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                <iframe
                  title="APJ Institute Dantewada Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.0!2d81.35!3d18.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDantewada%2C+Chhattisgarh!5e0!3m2!1sen!2sin!4v1"
                  className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 bg-[#1e3a5f]/5 pointer-events-none transition-opacity duration-700 group-hover:opacity-0"></div>
                
                {/* Glass overlay label */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-xl border border-white rounded-2xl p-5 flex items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 border border-blue-100/50">
                    <MapPin size={28} className="text-[#1e3a5f]" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-extrabold text-base">APJ Institute Campus</p>
                    <p className="text-slate-500 text-sm font-medium mt-0.5">Sanjay Nagar, Near BSNL Exchange, Dantewada</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          4. STUDENT HELP / ADMISSION CTA
      ════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 lg:px-8 pb-20">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[3rem] bg-white border border-white shadow-[0_20px_60px_rgba(30,58,95,0.08)] group hover:shadow-[0_30px_70px_rgba(30,58,95,0.12)] transition-shadow duration-500">
          
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/80 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-100/80 transition-colors duration-700"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-10 items-center p-12 md:p-16 lg:p-20">
            <div>
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-20 h-20 bg-blue-50 rounded-[1.5rem] flex items-center justify-center mb-8 border border-blue-100 shadow-sm"
              >
                <GraduationCap size={40} className="text-[#1e3a5f]" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 leading-tight tracking-tight">Need Admission<br />Guidance?</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-lg">
                Our support team helps students choose the right healthcare and paramedical career path. Get personalized counseling and complete admission support.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 min-w-[200px]">
              <a href="tel:9243758191"
                className="px-8 py-5 rounded-2xl bg-[#1e3a5f] text-white font-bold text-base shadow-[0_10px_20px_rgba(30,58,95,0.2)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(30,58,95,0.3)] hover:bg-[#152a45] transition-all duration-300 flex items-center justify-center gap-3 group/btn">
                <PhoneCall size={20} className="group-hover/btn:scale-110 transition-transform" /> Call Now
              </a>
              <Link to="/admission"
                className="px-8 py-5 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-base hover:bg-slate-50 hover:border-slate-300 hover:text-[#1e3a5f] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group/link">
                Apply Online <ArrowRight size={20} className="group-hover/link:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          5. FAQ SECTION
      ════════════════════════════════════════════ */}
      <section className="mx-auto max-w-4xl px-4 lg:px-8 pb-32">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 bg-white shadow-sm mb-6">
            <HelpCircle size={18} className="text-[#1e3a5f]" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-700">Have Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight">Frequently Asked <span className="text-[#1e3a5f]">Questions</span></h2>
          <p className="text-slate-600 text-lg font-medium max-w-2xl mx-auto">Find quick answers to common queries about admissions, courses, and campus life.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={itemVariants}>
              <FaqItem faq={faq} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
