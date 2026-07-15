import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, ChevronDown, ArrowRight } from 'lucide-react';

/* ─── FAQ Data ─── */
const faqs = [
  { q: "How can I apply for admission?", a: "You can apply online through our website or visit the campus directly. Fill the enquiry form above and our admission team will guide you through the complete registration process." },
  { q: "What courses are available at APJ Institute?", a: "We offer BMLT (3 Years), DMLT (2 Years), X-Ray / Radiography Technician (2 Years), OT Technician (2 Years), B.Sc. Nursing (4 Years), and Hospital Assistant Certification (6 Months)." },
  { q: "Is hostel facility available?", a: "Yes, we provide safe and comfortable separate hostel facilities for boys and girls with mess, Wi-Fi, and 24/7 security." },
  { q: "How to contact the administration office?", a: "You can call us at +91 92437 58191 / +91 93076 16474, email apjinstituteparamedicaldantewa@gmail.com, or visit us at Sanjay Nagar, near BSNL Exchange Office, Dantewada (C.G.)." },
  { q: "What is the fee structure?", a: "Fee varies by course. BMLT starts at ₹45,000/year. Contact our admission office for the complete fee breakdown and available scholarship options." },
];

/* ─── Accordion Item Component ─── */
function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-slate-200 py-5 transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className={`text-lg font-sans font-bold transition-colors duration-300 ${isOpen ? 'text-[#1e3a5f]' : 'text-slate-800 group-hover:text-[#1e3a5f]'}`}>
          {faq.q}
        </span>
        <ChevronDown 
          size={18} 
          className={`text-slate-400 shrink-0 transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#1e3a5f]' : 'group-hover:text-[#1e3a5f]'}`} 
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm font-light leading-relaxed text-slate-600 pr-6">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="bg-[#f8fafc] text-slate-900 overflow-x-hidden selection:bg-[#1e3a5f]/10">
      
      {/* ════════════════════════════════════════════
          1. GET IN TOUCH SECTION
      ════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1e3a5f]">
              CONTACT
            </p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-sans font-black text-[#0f172a] tracking-tight leading-[1.1]">
              Get in Touch
            </h2>
            <p className="mt-6 text-base text-slate-600 leading-relaxed font-light">
              Have questions about our paramedical and nursing programs? Get in touch with the admissions team at APJ Institute. We are here to help guide you through your career path in healthcare.
            </p>

            {/* Minimalist Details */}
            <div className="mt-10 space-y-6">
              
              <div className="flex items-start gap-4 py-4 border-t border-slate-200">
                <MapPin className="text-[#1e3a5f] w-5 h-5 shrink-0 mt-0.5 stroke-[1.5]" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1e3a5f] mb-1">
                    Our Campus
                  </h3>
                  <p className="text-base font-light text-slate-700">
                    Sanjay Nagar, near BSNL Exchange Office, Dantewada, Chhattisgarh 494449
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-4 border-t border-slate-200">
                <Phone className="text-[#1e3a5f] w-5 h-5 shrink-0 mt-0.5 stroke-[1.5]" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1e3a5f] mb-1">
                    Call Us
                  </h3>
                  <p className="text-base font-light text-slate-700">
                    +91 92437 58191 / +91 93076 16474
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-4 border-t border-b border-slate-200">
                <Mail className="text-[#1e3a5f] w-5 h-5 shrink-0 mt-0.5 stroke-[1.5]" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1e3a5f] mb-1">
                    Email Address
                  </h3>
                  <p className="text-base font-light text-slate-700">
                    apjinstituteparamedicaldantewa@gmail.com
                  </p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop" 
              alt="APJ Paramedical Lab and Institute Learning Center" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
          </motion.div>

        </div>
      </div>

      {/* ════════════════════════════════════════════
          2. SEND US A MESSAGE SECTION
      ════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Form Box (High Contrast Dark Navy Background) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.8 }}
            className="bg-[#0f172a] text-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl flex flex-col justify-between"
          >
            <form onSubmit={handleSubmit} className="space-y-8 my-auto">
              <h3 className="text-2xl font-sans font-black mb-6 tracking-tight text-white">
                Send a Quick Query
              </h3>
              
              <div className="relative">
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Your Name"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/40 focus:border-white focus:outline-none transition animate-none" 
                />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="Your Email"
                    className="w-full border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/40 focus:border-white focus:outline-none transition animate-none" 
                  />
                </div>
                <div className="relative">
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    placeholder="Your Phone"
                    className="w-full border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/40 focus:border-white focus:outline-none transition animate-none" 
                  />
                </div>
              </div>
              
              <div className="relative">
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  rows={4} 
                  placeholder="Your Message"
                  className="w-full border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/40 focus:border-white focus:outline-none resize-none transition animate-none" 
                />
              </div>

              <div className="pt-4">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div 
                      key="success" 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }}
                      className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-sm font-semibold text-center"
                    >
                      ✓ Inquiry sent successfully! We'll reply shortly.
                    </motion.div>
                  ) : (
                    <motion.button 
                      key="btn" 
                      type="submit" 
                      whileHover={{ scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                      className="rounded-full bg-white text-[#0f172a] px-10 py-3.5 text-sm font-bold hover:bg-slate-100 transition shadow-lg flex items-center justify-center gap-2"
                    >
                      Send Message <Send size={14} className="stroke-[2.5]" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>

          {/* Right Column: Office Hours / Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, amount: 0.2 }} 
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col justify-center py-6"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1e3a5f]">
              CONTACT
            </p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-sans font-black text-[#0f172a] tracking-tight leading-[1.1]">
              Send Us a Message
            </h2>
            <p className="mt-6 text-base text-slate-600 leading-relaxed font-light">
              We welcome prospective students, parents, and healthcare partners to write to us. Whether you need information about course syllabus details, batch timings, campus enrollment, or fee plans, send us your message and our counselor will assist you.
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-sans font-bold text-slate-900 mb-3">
                Opening Hours
              </h3>
              <div className="space-y-1 text-sm font-light text-slate-600">
                <p>Monday - Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-8 flex gap-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a 
                  key={social} 
                  href={`https://${social}.com`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] transition-all duration-300"
                >
                  <span className="capitalize text-xs font-semibold tracking-wider">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ════════════════════════════════════════════
          3. GOOGLE MAP SECTION (FULL WIDTH)
      ════════════════════════════════════════════ */}
      <div className="relative w-full h-[450px] bg-slate-100 overflow-hidden shadow-inner border-t border-b border-slate-200/60">
        <iframe
          title="APJ Institute Dantewada Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.0!2d81.35!3d18.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sDantewada%2C+Chhattisgarh!5e0!3m2!1sen!2sin!4v1"
          className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute inset-0 bg-[#0f172a]/5 pointer-events-none" />
        
        {/* Floating "Open in Maps" badge */}
        <div className="absolute top-8 left-8 z-10">
          <a 
            href="https://maps.google.com/?q=APJ+Institute+Dantewada" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white/95 backdrop-blur px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-xl border border-slate-200/50 hover:bg-[#0f172a] hover:text-white transition-colors duration-300"
          >
            Open in Maps
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          4. FAQ SECTION (GRID ACCORDION)
      ════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          
          {/* Left Header Info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#1e3a5f]">
              FAQS
            </p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-sans font-black text-[#0f172a] tracking-tight leading-[1.1]">
              Frequently Asked Questions
            </h2>
            <p className="mt-6 text-base text-slate-600 leading-relaxed font-light">
              Find quick answers to common queries about our courses, paramedical diplomas, campus amenities, admission fees, and hostel bookings.
            </p>
          </motion.div>

          {/* Right Accordion Items */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 border-t border-slate-200"
          >
            {faqs.map((faq, i) => (
              <FaqItem 
                key={i} 
                faq={faq} 
                isOpen={openFaq === i} 
                onToggle={() => setOpenFaq(openFaq === i ? null : i)} 
              />
            ))}
          </motion.div>

        </div>
      </section>

    </section>
  );
}