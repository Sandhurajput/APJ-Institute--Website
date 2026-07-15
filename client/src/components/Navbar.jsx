import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setActiveDropdown(null);
  };

  const handleDropdownToggle = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    {
      label: 'About',
      href: '/about',
      submenu: [
        { label: 'Our Story', href: '/about/story' },
        { label: 'Leadership', href: '/about/leadership' },
        { label: 'Departments', href: '/about/departments' },
      ],
    },
    {
      label: 'Academics',
      href: '/academics',
      submenu: [
        { label: 'Programs', href: '/academics/programs' },
        { label: 'Admissions', href: '/academics/admissions' },
        { label: 'Faculty', href: '/academics/faculty' },
      ],
    },
    { label: 'Events', href: '/events' },
    { label: 'News', href: '/news' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border-b border-slate-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="bg-slate-50 p-1.5 rounded-2xl group-hover:bg-brand-50 transition-colors duration-300">
               <Logo size="md" />
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xl font-black text-slate-900 tracking-tight leading-none group-hover:text-brand-600 transition-colors duration-300">
                APJ Institute
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">Dantewada</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.submenu && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className="px-4 py-2.5 rounded-full text-sm font-bold text-slate-600 hover:text-brand-600 hover:bg-brand-50/50 transition-all duration-300 flex items-center gap-1.5"
                >
                  {link.label}
                  {link.submenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                </Link>

                {/* Desktop Dropdown with framer motion style AnimatePresence */}
                {link.submenu && (
                  <div className="absolute left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="w-56 bg-white border border-slate-100 rounded-3xl shadow-xl p-2 relative">
                      {/* Little triangle arrow pointing up */}
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-slate-100 rotate-45"></div>
                      
                      {link.submenu.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          className="block px-4 py-3 text-sm font-bold text-slate-600 hover:bg-brand-50 hover:text-brand-600 rounded-2xl transition-colors duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section - Search & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            {/* Search Bar - Desktop */}
            <div className="hidden xl:flex items-center bg-slate-50 border border-slate-200/60 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-300 transition-all duration-300 shadow-inner group">
              <Search size={16} className="text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm font-semibold text-slate-700 placeholder-slate-400 w-32 focus:w-48 transition-all duration-300 ml-2"
              />
            </div>

            {/* CTA Button - Desktop */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-full font-bold text-sm shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 transition-all duration-300 border border-brand-500/50"
            >
              Admission Open <ArrowRight size={16} />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-expanded="false"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {/* Mobile Search */}
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 mb-4 focus-within:ring-2 focus-within:ring-brand-500/20">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none text-sm font-semibold text-slate-700 placeholder-slate-400 flex-1 ml-3"
                />
              </div>

              {/* Mobile Menu Items */}
              {navLinks.map((link) => (
                <div key={link.label} className="bg-slate-50/50 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => {
                      if (link.submenu) {
                        handleDropdownToggle(link.label);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                    className="w-full text-left px-5 py-4 text-base font-bold text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors flex items-center justify-between"
                  >
                    <Link to={link.href} onClick={() => !link.submenu && setIsOpen(false)} className="flex-1">
                      {link.label}
                    </Link>
                    {link.submenu && (
                      <ChevronDown
                        size={18}
                        className={`transform transition-transform duration-300 ${
                          activeDropdown === link.label ? 'rotate-180 text-brand-600' : 'text-slate-400'
                        }`}
                      />
                    )}
                  </button>

                  {/* Mobile Dropdown */}
                  <AnimatePresence>
                    {link.submenu && activeDropdown === link.label && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-slate-100/50 px-2 pb-2"
                      >
                        {link.submenu.map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-5 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:text-brand-600 hover:shadow-sm transition-all duration-200 my-1"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              
              {/* Mobile CTA */}
              <button
                className="w-full mt-6 py-4 bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-2xl font-bold shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2"
              >
                Admission Open <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
