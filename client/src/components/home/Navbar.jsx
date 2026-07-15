import { useState } from 'react';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Courses', href: '/courses' },
  { label: 'Admission', href: '/admission' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Facilities', href: '/facilities' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-50 border-b border-[#15305b]/10 bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_-20px_rgba(15,23,42,0.25)]"
    >
      <div id="top" className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#15305b]/10 bg-white p-1 shadow-soft">
              <Logo size="md" className="h-full w-full" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#15305b]">APJ Institute</p>
              <h1 className="text-lg font-bold leading-tight text-slate-900">Dantewada</h1>
            </div>
          </a>

          <nav className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#15305b]/5 hover:text-[#15305b]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Login Button */}
            <Link
              to="/portal"
              className="hidden md:inline-flex items-center gap-2 rounded-full border-2 border-[#15305b] px-5 py-2 text-sm font-semibold text-[#15305b] transition hover:bg-[#15305b]/5"
            >
              Login
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#15305b]/10 text-slate-700 transition hover:bg-[#15305b]/5 xl:hidden"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="pb-4 xl:hidden"
            >
              <div className="rounded-3xl border border-[#15305b]/10 bg-white p-3 shadow-soft">
                <div className="grid gap-1 sm:grid-cols-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-[#15305b]/5 hover:text-[#15305b]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="mt-3">
                  <button 
                    onClick={() => { navigate('/portal'); setIsOpen(false); }}
                    className="w-full rounded-2xl border-2 border-[#15305b] bg-white px-4 py-3 text-sm font-semibold text-[#15305b] hover:bg-[#15305b]/5 transition"
                  >
                    👤 Login
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}