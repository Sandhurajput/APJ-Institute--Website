import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FaFlask, FaEye, FaMicroscope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export default function PopupAnnouncement() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-slate-950/75 px-3 py-3 sm:px-4 sm:py-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="admission-popup-title"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.97, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 120, damping: 22 }}
            className="relative my-auto w-[95vw] max-w-[820px] max-h-[calc(100vh-48px)] overflow-hidden rounded-[12px] border border-[#D6DCE5] bg-white shadow-sm"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close admission popup"
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
            >
              <X size={16} />
            </button>

            <div className="flex h-full flex-col">
              <div className="overflow-hidden px-3 pb-3 pt-4 sm:px-4 sm:pt-5 max-[649px]:overflow-y-auto">
                <header className="space-y-2 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-[#F4F6F9]">
                      <Logo size="sm" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0F3D73]">APJ Institute Dantewada</p>
                      <p id="admission-popup-title" className="text-xl font-semibold leading-tight text-[#1F2937]">Admission Open 2026–27</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-700">Official admission notice for paramedical courses.</p>
                    <span className="inline-flex h-7 items-center rounded-full border border-[#1E5AA8] bg-[#F4F6F9] px-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0F3D73]">
                      Limited Seats Available
                    </span>
                  </div>
                </header>

                <section className="mt-3 space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-[#1F2937]">Courses Available</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { icon: FaFlask, label: 'BMLT', subtitle: '3 Years' },
                      { icon: FaFlask, label: 'DMLT', subtitle: '2 Years' },
                      { icon: FaEye, label: 'X-Ray', subtitle: '2 Years' },
                      { icon: FaMicroscope, label: 'Lab Technician', subtitle: 'Certificate' },
                    ].map((course, idx) => (
                      <div key={idx} className="rounded-xl border border-[#1E5AA8] bg-[#F4F6F9] p-2.5">
                        <div className="flex items-center gap-2 text-[#1F2937]">
                          <course.icon className="text-sm text-[#1E5AA8]" />
                          <p className="text-sm font-semibold">{course.label}</p>
                        </div>
                        <p className="mt-1.5 text-[11px] text-slate-600">{course.subtitle}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-[#D6DCE5] bg-[#F4F6F9] p-2.5">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 text-sm text-[#2E7D32]">✓</span>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2E7D32]">Eligibility</p>
                        <p className="mt-1 text-sm font-semibold text-[#1F2937]">12th Pass (Biology)</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#D6DCE5] bg-[#F4F6F9] p-2.5">
                    <p className="text-sm font-semibold text-[#1F2937]">Highlights</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {['Practical Training', 'Experienced Faculty', 'Modern Lab', 'Career Guidance'].map((item, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 rounded-full border border-[#1E5AA8] bg-white px-2.5 py-1 text-[11px] text-[#1F2937]">
                          <span className="text-sm text-[#2E7D32]">✓</span>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#D6DCE5] bg-[#F4F6F9] p-2.5">
                    <p className="text-sm font-semibold text-[#1F2937]">Why Join Us</p>
                    <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-slate-700">
                      {['Practical Training', 'Modern Labs', 'Placement Support', 'Experienced Faculty', 'Affordable Fees'].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-0.5 text-sm text-[#2E7D32]">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-[#D6DCE5] bg-[#F4F6F9] p-2.5">
                    <p className="text-sm font-semibold text-[#1F2937]">Contact Details</p>
                    <div className="mt-2 space-y-2 text-sm text-slate-700">
                      <div className="flex items-center gap-2">
                        <FaWhatsapp className="text-base text-[#0F3D73]" />
                        <span>9243758191, 9243758191</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="mt-0.5 text-base text-[#0F3D73]" />
                        <span>Sanjay Nagar, near New BSNL Exchange Office, Shani Mandir Road, Dantewada (C.G.)</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="border-t border-slate-200 bg-white px-3 py-3 sm:px-4">
                <div className="flex flex-row gap-2">
                  <a
                    href="https://wa.me/919243758191?text=Hi, I'm interested in admission for paramedical courses at APJ Institute Dantewada"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex min-w-0 flex-1 items-center justify-center rounded-xl bg-[#0F3D73] px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E5AA8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                  >
                    Apply / WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate('/contact');
                    }}
                    className="inline-flex min-w-0 flex-1 items-center justify-center rounded-xl border border-[#1E5AA8] bg-white px-3 py-2.5 text-sm font-semibold text-[#0F3D73] transition hover:bg-[#F4F6F9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                  >
                    Contact Us
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex min-w-0 flex-1 items-center justify-center rounded-xl border border-[#1E5AA8] bg-white px-3 py-2.5 text-sm font-semibold text-[#0F3D73] transition hover:bg-[#F4F6F9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
