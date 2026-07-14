import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/events', label: 'Events' },
  { to: '/notifications', label: 'Notices' },
];

export default function MainNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-blue-100/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold text-white">
            APJ
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-blue-700">APJ Institute Raipur</p>
            <p className="text-xs text-slate-500">Medical & Allied Health Programs</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-blue-700' : 'text-slate-600 hover:text-blue-700'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/examination-dashboard"
            className="rounded-lg border border-violet-200 px-3 py-2 text-sm font-medium text-violet-700 hover:bg-violet-50"
          >
            Examination Dashboard
          </Link>
        </div>

        <button
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm lg:hidden"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="border-t border-blue-100 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? 'text-blue-700' : 'text-slate-700'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/examination-dashboard" className="text-sm text-violet-700" onClick={() => setOpen(false)}>
              Examination Dashboard
            </Link>
          </div>
        </div>
      )}
      </header>
      {/* spacer to prevent content being hidden under fixed navbar */}
      <div className="h-20" aria-hidden="true" />
    </>
  );
}
