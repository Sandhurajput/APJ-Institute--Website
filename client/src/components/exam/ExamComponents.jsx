import React, { useMemo, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  CalendarDays,
  ChevronDown,
  FileDown,
  Globe,
  Instagram,
  LayoutDashboard,
  Linkedin,
  Mail,
  Menu,
  MoonStar,
  Search,
  ShieldCheck,
  SunMedium,
  X,
  Youtube,
} from 'lucide-react';
import Logo from '../Logo';
import { useExamPortal } from '../../context/ExamPortalContext';

const portalNav = [
  { label: 'Home Dashboard', href: '/examination-dashboard' },
  { label: 'Results', href: '/examination-dashboard/results' },
  { label: 'Notices', href: '/examination-dashboard/notices' },
  { label: 'Forms', href: '/examination-dashboard/forms' },
  { label: 'Contact', href: '/examination-dashboard/contact' },
  { label: 'Admin Panel', href: '/examination-dashboard/admin-panel' },
];

const languages = ['English', 'Hindi', 'Bengali'];

function statusTone(type) {
  if (type === 'success') return 'border-emerald-400/30 bg-emerald-500/15 text-emerald-100';
  if (type === 'error') return 'border-rose-400/30 bg-rose-500/15 text-rose-100';
  if (type === 'warning') return 'border-amber-400/30 bg-amber-500/15 text-amber-100';
  return 'border-sky-400/30 bg-sky-500/15 text-sky-100';
}

export function ExamNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const { theme, toggleTheme, session, logout } = useExamPortal();
  const navigate = useNavigate();
  const location = useLocation();

  const primaryCtas = useMemo(
    () => [
      { label: 'Student Login', href: '/examination-dashboard/student-login' },
      { label: 'Student Signup', href: '/examination-dashboard/student-signup' },
      { label: 'Admin Login', href: '/examination-dashboard/admin-login' },
      { label: 'Teacher Login', href: '/examination-dashboard/teacher-login' },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <Link to="/examination-dashboard" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-soft">
            <Logo size="sm" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-sky-300">APJ Institute Raipur</p>
            <h1 className="text-base font-bold text-white sm:text-lg">Examination Department</h1>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {portalNav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive || location.pathname === item.href ? 'bg-white/12 text-white' : 'text-slate-300 hover:bg-white/8 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setLanguageOpen((value) => !value)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
            >
              <Globe size={16} />
              {language}
              <ChevronDown size={16} />
            </button>
            {languageOpen && (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-slate-950/40">
                {languages.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setLanguage(item);
                      setLanguageOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/10"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </button>

          {session ? (
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/examination-dashboard');
              }}
              className="hidden rounded-full border border-rose-400/30 bg-rose-500/15 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/25 lg:inline-flex"
            >
              Sign out
            </button>
          ) : (
            <Link
              to="/examination-dashboard/admin-login"
              className="hidden rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:scale-[1.02] lg:inline-flex"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10 xl:hidden"
            aria-label="Open menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border-t border-white/10 bg-slate-950/95 xl:hidden"
          >
            <div className="mx-auto max-w-7xl px-4 py-4 lg:px-6">
              <div className="grid gap-2 sm:grid-cols-2">
                {portalNav.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {primaryCtas.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-sky-400/20 bg-sky-500/10 px-4 py-3 text-center text-sm font-semibold text-sky-100 transition hover:bg-sky-500/20"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200"
                >
                  {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
                </button>
                <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <ShieldCheck size={12} /> JWT ready
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                    <Bell size={12} /> Notifications
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function ExamFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/95 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.15fr_0.85fr_0.8fr] lg:px-6">
        <div>
          <h3 className="text-xl font-bold text-white">APJ Institute Raipur</h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
            Modern examination dashboard for results, notices, forms, and student services. Designed for a professional university-style experience.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Quick Links</p>
          <div className="mt-4 grid gap-2 text-sm">
            {portalNav.map((item) => (
              <Link key={item.href} to={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Connect</p>
          <div className="mt-4 flex gap-3">
            {[
              { icon: <Instagram size={18} />, label: 'Instagram' },
              { icon: <Youtube size={18} />, label: 'YouTube' },
              { icon: <Linkedin size={18} />, label: 'LinkedIn' },
              { icon: <Mail size={18} />, label: 'Email' },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-400">Examination department, APJ Institute Raipur.</p>
        </div>
      </div>
    </footer>
  );
}

export function ToastStack() {
  const { toasts, removeToast } = useExamPortal();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[80] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6 sm:w-96">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            className={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-2xl shadow-slate-950/30 backdrop-blur-xl ${statusTone(toast.type)}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}</p>
                <p className="mt-1 text-sm leading-6">{toast.message}</p>
              </div>
              <button type="button" onClick={() => removeToast(toast.id)} className="text-xs font-semibold opacity-70 transition hover:opacity-100">
                Close
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function PageShell({ title, subtitle, children, action }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/6 p-5 shadow-soft backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/30 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">APJ Examination Portal</p>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">{subtitle}</p>
        </div>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function GlassCard({ children, className = '' }) {
  return <div className={`rounded-[1.75rem] border border-white/10 bg-white/7 shadow-soft backdrop-blur-2xl ${className}`}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">{eyebrow}</p>
        <h3 className="mt-2 text-2xl font-bold text-white">{title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function DashboardCard({ icon: Icon, title, description, gradient, href }) {
  const content = (
    <motion.div whileHover={{ y: -6, scale: 1.01 }} whileTap={{ scale: 0.98 }} className={`group relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br ${gradient} p-[1px] shadow-soft`}>
      <div className="flex h-full min-h-[170px] flex-col justify-between rounded-[1.75rem] bg-slate-950/80 p-5 text-white backdrop-blur-xl transition duration-300 group-hover:bg-slate-900/90">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-black/10">
            <Icon size={28} />
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">Open</span>
        </div>
        <div>
          <h4 className="text-xl font-black">{title}</h4>
          <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
        </div>
      </div>
    </motion.div>
  );

  if (href) return <Link to={href}>{content}</Link>;
  return content;
}

export function LoadingGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="h-[170px] animate-pulse rounded-[1.8rem] border border-white/10 bg-white/7" />
      ))}
    </div>
  );
}

export function NoticeBoardSection({ items }) {
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    const needle = search.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((item) => [item.title, item.category, item.pdf].join(' ').toLowerCase().includes(needle));
  }, [items, search]);

  return (
    <GlassCard className="p-5 sm:p-6">
      <SectionHeading
        eyebrow="Notice Board"
        title="Scrollable notices with search"
        description="Recent exam notices, circulars, and department updates are listed here."
        action={
          <div className="relative w-full max-w-md">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search notices..."
              className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-400 focus:border-sky-400"
            />
          </div>
        }
      />

      <div className="notice-scrollbar mt-5 max-h-[420px] space-y-3 overflow-y-auto pr-2">
        {filteredItems.map((item) => (
          <article key={item.id} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-sky-500/15 text-sky-200">
              <FileDown size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-semibold text-white">{item.title}</h4>
                {item.important && <span className="rounded-full bg-rose-500/15 px-2.5 py-1 text-[11px] font-semibold text-rose-100">Important</span>}
              </div>
              <p className="mt-1 text-sm text-slate-300">{item.category} · {item.date}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">PDF: {item.pdf}</p>
            </div>
          </article>
        ))}
      </div>
    </GlassCard>
  );
}

export function FormsSection({ forms, onDownload }) {
  return (
    <GlassCard className="p-5 sm:p-6">
      <SectionHeading
        eyebrow="Forms"
        title="Examination, admission and scholarship forms"
        description="Download the latest forms and submit within the active window."
      />

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {forms.map((item) => (
          <article key={item.id} className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-slate-950/55 p-5">
            <div>
              <span className="inline-flex rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-100">{item.type}</span>
              <h4 className="mt-4 text-xl font-bold text-white">{item.name}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
            </div>
            <button
              type="button"
              onClick={() => onDownload(item)}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]"
            >
              <FileDown size={16} />
              Download PDF
            </button>
          </article>
        ))}
      </div>
    </GlassCard>
  );
}

export function ImportantDatesTable({ rows }) {
  return (
    <GlassCard className="p-5 sm:p-6">
      <SectionHeading
        eyebrow="Important Dates"
        title="Academic calendar and exam schedule"
        description="Use the scrollable table to track submission, admit card, theory and practical dates."
      />

      <div className="notice-scrollbar mt-5 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm text-slate-200">
          <thead className="text-xs uppercase tracking-[0.24em] text-slate-400">
            <tr>
              <th className="px-4 py-2">Academic Year</th>
              <th className="px-4 py-2">Event</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="rounded-2xl bg-white/5">
                <td className="px-4 py-4 font-semibold text-white">{row.academicYear}</td>
                <td className="px-4 py-4">{row.event}</td>
                <td className="px-4 py-4">{row.startDate}</td>
                <td className="px-4 py-4">{row.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

export function ResultSearchPanel({ rows }) {
  const [query, setQuery] = useState('');

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) => [row.roll, row.name, row.course, row.semester, row.status].join(' ').toLowerCase().includes(needle));
  }, [rows, query]);

  return (
    <GlassCard className="p-5 sm:p-6">
      <SectionHeading
        eyebrow="Results"
        title="Search results by roll number or name"
        description="Students can quickly locate result records using roll number, course or semester."
        action={
          <div className="relative w-full max-w-md">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search results..."
              className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-400 focus:border-sky-400"
            />
          </div>
        }
      />

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        {filteredRows.map((row) => (
          <div key={row.id} className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-300">{row.roll}</p>
                <h4 className="mt-2 text-xl font-bold text-white">{row.name}</h4>
                <p className="mt-1 text-sm text-slate-300">{row.course} · {row.semester}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${row.status === 'Passed' ? 'bg-emerald-500/15 text-emerald-100' : 'bg-amber-500/15 text-amber-100'}`}>
                {row.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Marks</p>
                <p className="mt-1 text-2xl font-black text-white">{row.marks}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Semester</p>
                <p className="mt-1 text-2xl font-black text-white">{row.semester}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
