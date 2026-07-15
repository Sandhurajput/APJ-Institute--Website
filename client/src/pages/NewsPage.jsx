import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Search,
  MoonStar,
  SunMedium,
  ArrowRight,
  BadgeAlert,
  BellRing,
  Clock3,
  MapPin,
  Filter,
  Newspaper,
  Sparkles,
} from 'lucide-react';
import {
  importantAnnouncements,
  latestNews,
  newsCategories,
  newsTicker,
  noticeBoardItems,
  upcomingEvents,
  todaySummary,
} from '../data/newsData';

function SectionHeading({ eyebrow, title, description, dark = false }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-xs font-bold uppercase tracking-[0.35em] ${dark ? 'text-sky-200' : 'text-blue-700'}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-black tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-slate-900'}`}>{title}</h2>
      <p className={`mt-4 text-base leading-7 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{description}</p>
    </div>
  );
}

function StatPill({ label, value, dark = false }) {
  return (
    <div className={`rounded-2xl border px-4 py-3 ${dark ? 'border-white/10 bg-white/5 text-white' : 'border-white bg-white/80 text-slate-900 shadow-soft'}`}>
      <p className={`text-[11px] font-bold uppercase tracking-[0.3em] ${dark ? 'text-sky-200/80' : 'text-blue-600'}`}>{label}</p>
      <p className="mt-1 text-xl font-black">{value}</p>
    </div>
  );
}

function NewsCard({ item, expanded, onToggle, dark = false }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className={`group relative overflow-hidden rounded-[28px] border p-5 sm:p-6 ${dark ? 'border-white/10 bg-white/5 text-white' : 'border-white/80 bg-white/90 text-slate-900 shadow-soft'}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`} />
      <div className="flex items-start justify-between gap-4">
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${dark ? 'bg-white/10 text-sky-100' : 'bg-blue-50 text-blue-700'}`}>
          <Sparkles size={12} />
          {item.category}
        </div>
        <div className={`inline-flex items-center gap-2 text-sm ${dark ? 'text-slate-300' : 'text-slate-500'}`}>
          <CalendarDays size={16} />
          {item.date}
        </div>
      </div>

      <h3 className="mt-5 text-xl font-black leading-snug sm:text-2xl">{item.title}</h3>
      <p className={`mt-3 text-sm leading-7 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{item.summary}</p>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className={`mt-4 rounded-2xl border px-4 py-4 text-sm leading-7 ${dark ? 'border-white/10 bg-white/5 text-slate-200' : 'border-slate-100 bg-slate-50 text-slate-700'}`}>
              {item.details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className={`text-xs font-semibold uppercase tracking-[0.25em] ${dark ? 'text-slate-300' : 'text-slate-500'}`}>Date & Category</span>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
        >
          Read More
          <ArrowRight size={16} />
        </button>
        <button
          type="button"
          onClick={() => {
            if ('speechSynthesis' in window) {
              const utter = new SpeechSynthesisUtterance(item.summary || item.title);
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(utter);
            }
          }}
          className="ml-2 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold text-slate-700 bg-white/90 hover:bg-slate-50"
        >
          🔊 Listen
        </button>
      </div>
    </motion.article>
  );
}

export default function NewsPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedId, setExpandedId] = useState('news-1');
  const [isDark, setIsDark] = useState(false);
  const [activeTickerId, setActiveTickerId] = useState('ticker-1');

  const tickerSectionMap = {
    'ticker-1': { category: 'Admissions', targetId: 'latest-news', openId: 'news-1' },
    'ticker-2': { category: 'All', targetId: 'important-announcements' },
    'ticker-3': { category: 'All', targetId: 'important-announcements' },
    'ticker-4': { category: 'All', targetId: 'upcoming-events', openId: 'news-2' },
    'ticker-5': { category: 'All', targetId: 'notice-board' },
  };

  const handleTickerClick = (item) => {
    const target = tickerSectionMap[item.id];
    setActiveTickerId(item.id);
    if (target?.category) {
      setActiveCategory(target.category);
    }

    // auto-open mapped news card if provided
    if (target?.openId) setExpandedId(target.openId);

    requestAnimationFrame(() => {
      document.getElementById(target?.targetId || item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const filteredNews = useMemo(() => {
    return latestNews.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const haystack = `${item.title} ${item.summary} ${item.details} ${item.category}`.toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const containerClass = isDark
    ? 'dark bg-slate-950 text-white'
    : 'bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_34%),linear-gradient(180deg,#f8fbff_0%,#ffffff_38%,#eff6ff_100%)] text-slate-900';

  return (
    <div className={containerClass}>
      <div className={`sticky top-[76px] z-40 border-y ${isDark ? 'border-white/10 bg-slate-950/95' : 'border-blue-100 bg-white/95'} backdrop-blur-xl`}>
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
          <div className="ticker-shell overflow-hidden rounded-3xl border border-dashed border-blue-200/50 px-4 py-3">
            <div className="ticker-track flex min-w-max items-center gap-8 whitespace-nowrap text-sm font-semibold text-blue-700">
              {[...newsTicker, ...newsTicker].map((item, index) => (
                <motion.button
                  key={`${item.id}-${index}`}
                  type="button"
                  onClick={() => handleTickerClick(item)}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 transition ${activeTickerId === item.id ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'border-blue-200/40 bg-white/70 text-blue-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800'}`}
                >
                  <Sparkles size={14} />
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="overflow-x-hidden">
        {/* Emergency / Live Bulletin Banner - shows critical items if present */}
        {importantAnnouncements.some(a => a.severity === 'high') && (
          <div className="fixed left-0 right-0 top-16 z-50 bg-gradient-to-r from-red-600 to-rose-500 text-white py-3 shadow-lg">
            <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
              <div className="flex items-center gap-4"> 
                <span className="font-black">🚨 Emergency</span>
                <span className="opacity-90">{importantAnnouncements.find(a => a.severity === 'high').title}</span>
              </div>
              <div>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">View</button>
              </div>
            </div>
          </div>
        )}
        <section id="hero" className="relative isolate overflow-hidden border-b border-white/10 scroll-mt-32">
          <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.16),_transparent_30%)]' : 'bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.12),_transparent_30%)]'}`} />
          <div className={`absolute inset-0 ${isDark ? 'bg-slate-950/70' : 'bg-white/45'} backdrop-blur-[1px]`} />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] ${isDark ? 'border-white/10 bg-white/5 text-sky-100' : 'border-white bg-white/85 text-blue-700 shadow-soft'}`}>
                  <BellRing size={14} />
                  News & Announcements
                </span>
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] ${isDark ? 'border-white/10 bg-white/5 text-slate-200' : 'border-white bg-white/85 text-slate-600 shadow-soft'}`}>
                  <BadgeAlert size={14} />
                  Nursing Institute Updates
                </span>
              </div>

              <div>
                <h1 className={`max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Stay updated with APJ Nursing Institute news, alerts, and upcoming campus activity.
                </h1>
                <p className={`mt-6 max-w-2xl text-base leading-8 sm:text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  A modern announcement hub for admissions, workshops, exams, events, and notice board updates with smart search and category filtering.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <StatPill label="Latest updates" value="06+" dark={isDark} />
                <StatPill label="Live notices" value="24/7" dark={isDark} />
                <StatPill label="Categories" value="07" dark={isDark} />
              </div>

              <div className={`rounded-[32px] border p-4 shadow-soft ${isDark ? 'border-white/10 bg-white/5 backdrop-blur-xl' : 'border-white/90 bg-white/85 backdrop-blur-xl'}`}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${isDark ? 'bg-white/5 text-slate-100' : 'bg-slate-50 text-slate-700'}`}>
                    <Search size={18} className="text-blue-600" />
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search news, announcements, events..."
                      className={`w-full bg-transparent text-sm outline-none placeholder:opacity-70 ${isDark ? 'placeholder:text-slate-400' : 'placeholder:text-slate-400'}`}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDark((value) => !value)}
                    className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${isDark ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700'}`}
                  >
                    {isDark ? <SunMedium size={18} /> : <MoonStar size={18} />}
                    {isDark ? 'Light Theme' : 'Dark Theme'}
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {newsCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? 'bg-gradient-to-r from-blue-700 to-sky-500 text-white shadow-lg' : isDark ? 'bg-white/5 text-slate-200 hover:bg-white/10' : 'bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700'}`}
                    >
                      <Filter size={14} />
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className={`rounded-[32px] border p-5 shadow-soft ${isDark ? 'border-white/10 bg-white/5 text-white' : 'border-white bg-white/90 text-slate-900'}`}>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-gradient-to-br from-blue-700 to-sky-500 p-5 text-white shadow-soft">
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">Announcement Box</p>
                    <p className="mt-4 text-2xl font-black leading-snug">Mid-term exams will begin from 5 June.</p>
                    <p className="mt-3 text-sm leading-7 text-white/85">Students should review schedules, prepare ID cards, and monitor the notice board for any room changes.</p>
                  </div>
                  <div className={`rounded-3xl border p-5 ${isDark ? 'border-white/10 bg-slate-900/70' : 'border-slate-100 bg-slate-50'}`}>
                    <div className="flex items-center gap-3 text-blue-700">
                      <Newspaper size={20} />
                      <p className="text-sm font-bold uppercase tracking-[0.3em]">Quick Updates</p>
                    </div>
                    <ul className={`mt-4 space-y-3 text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      <li>• Admissions documents are being verified daily.</li>
                      <li>• Workshop attendance is open for all batches.</li>
                      <li>• Notice board PDFs can be checked from admin desk.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`border-t ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-white/70 bg-white/60'}`}>
            <div className={`mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'} lg:px-8`}>
              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-blue-600" />
                Updated today at 9:00 AM
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-600" />
                APJ Institute, Dantewada
              </div>
            </div>
          </div>
        </section>

        <section id="latest-news" className={`mx-auto max-w-7xl px-4 py-16 lg:px-8 scroll-mt-32 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <SectionHeading
            eyebrow="Latest News"
            title="Campus news cards with smart search, date and category filters"
            description="Browse the latest institute updates and expand any card for more detail using the Read More button."
            dark={isDark}
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredNews.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                expanded={expandedId === item.id}
                onToggle={() => setExpandedId((current) => (current === item.id ? '' : item.id))}
                dark={isDark}
              />
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className={`mt-10 rounded-[28px] border px-6 py-10 text-center ${isDark ? 'border-white/10 bg-white/5 text-slate-200' : 'border-slate-100 bg-white text-slate-600 shadow-soft'}`}>
              No news items matched your search or category filter.
            </div>
          )}
        </section>

        <section id="important-announcements" className={`mx-auto max-w-7xl px-4 pb-16 lg:px-8 scroll-mt-32 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div id="upcoming-events" className="scroll-mt-32">
              <SectionHeading
                eyebrow="Important Announcements"
                title="Alerts that need immediate attention"
                description="A focused announcement area for deadlines, rule changes, and high-priority student notices."
                dark={isDark}
              />

              <div className="mt-8 space-y-4">
                {importantAnnouncements.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ x: 4 }}
                    className={`rounded-[24px] border p-5 ${isDark ? 'border-white/10 bg-white/5' : 'border-white bg-white/90 shadow-soft'}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-black">{item.title}</h3>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-white ${item.severity === 'high' ? 'bg-red-500' : item.severity === 'medium' ? 'bg-amber-500' : 'bg-sky-500'}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className={`mt-2 text-sm font-semibold ${isDark ? 'text-sky-100' : 'text-blue-700'}`}>{item.meta}</p>
                    <p className={`mt-3 text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.note}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading
                eyebrow="Upcoming Events"
                title="Event cards with time, date, and location"
                description="Keep students and staff informed about what is coming next on the academic calendar."
                dark={isDark}
              />

              <div className="mt-8 grid gap-4">
                {upcomingEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ scale: 1.01 }}
                    className={`grid gap-4 rounded-[26px] border p-5 sm:grid-cols-[96px_1fr] ${isDark ? 'border-white/10 bg-white/5' : 'border-white bg-white/90 shadow-soft'}`}
                  >
                    <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-blue-700 to-sky-500 px-4 py-5 text-center text-white">
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">{event.badge}</p>
                      <p className="mt-2 text-2xl font-black">{event.date}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-black">{event.title}</h3>
                      <div className={`mt-3 flex flex-wrap gap-4 text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        <span className="inline-flex items-center gap-2"><Clock3 size={16} className="text-blue-600" />{event.time}</span>
                        <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-blue-600" />{event.location}</span>
                      </div>
                      <Link
                        to="/contact"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:gap-3"
                      >
                        Register / Enquire
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Today summary + Timeline */}
        <section className={`mx-auto max-w-7xl px-4 py-12 lg:px-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className={`rounded-2xl p-6 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gradient-to-br from-blue-700 to-sky-500 text-white'}`}>
              <h4 className="text-xs font-bold uppercase">Today at APJ Institute</h4>
              <p className="mt-3 text-2xl font-black">Highlights</p>
              <div className="mt-4 space-y-3">
                {todaySummary?.highlights?.map((h) => (
                  <div key={h.label} className="flex items-center justify-between">
                    <div className="text-sm font-semibold">{h.label}</div>
                    <div className="text-xl font-black">{h.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`lg:col-span-2 rounded-2xl p-6 ${isDark ? 'bg-white/5 border border-white/10' : 'bg-white/90 border-slate-100 shadow-soft'}`}>
              <h4 className="text-xs font-bold uppercase text-slate-500">Timeline</h4>
              <div className="mt-6 space-y-6">
                {latestNews.map((n) => (
                  <div key={n.id} className="flex items-start gap-4">
                    <div className="mt-1 h-10 w-10 flex-shrink-0 rounded-full bg-blue-50 text-blue-700 grid place-items-center font-bold">{n.date.split(' ')[0]}</div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h5 className="font-black">{n.title}</h5>
                        <span className="text-sm text-slate-400">{n.category}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{n.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="notice-board" className={`mx-auto max-w-7xl px-4 pb-20 lg:px-8 scroll-mt-32 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <SectionHeading
            eyebrow="Notice Board"
            title="A clean board for urgent circulars and student notices"
            description="Scroll through the latest notice board items with clear priority labels and concise status text."
            dark={isDark}
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className={`rounded-[30px] border p-4 ${isDark ? 'border-white/10 bg-white/5' : 'border-white bg-white/90 shadow-soft'}`}>
              <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1 notice-scrollbar">
                {noticeBoardItems.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-[22px] border px-4 py-4 ${isDark ? 'border-white/10 bg-slate-950/40' : 'border-slate-100 bg-slate-50'}`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-base font-bold">{item.heading}</h3>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-blue-700 dark:bg-white/10 dark:text-sky-100">
                        {item.priority}
                      </span>
                    </div>
                    <p className={`mt-2 text-sm leading-7 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{item.subtext}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className={`rounded-[30px] border p-6 ${isDark ? 'border-white/10 bg-gradient-to-br from-slate-900 to-slate-950' : 'border-white bg-gradient-to-br from-blue-700 to-sky-500 text-white shadow-soft'}`}>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/75">Notice Summary</p>
                <h3 className="mt-3 text-3xl font-black">Everything students need in one place</h3>
                <p className="mt-4 text-sm leading-7 text-white/85">
                  Admissions, exam alerts, practical training notices, and event updates can all live in one polished announcement page.
                </p>
              </div>

              {/* Suggested Layout card removed as requested */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
