import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CalendarDays,
  Search,
  Moon,
  Sun,
  ArrowRight,
  BadgeAlert,
  BellRing,
  Clock3,
  MapPin,
  Filter,
  Newspaper,
  Volume2,
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
      <p className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${dark ? 'text-slate-300' : 'text-[#0B3D91]'}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-[#1F2937]'}`}>{title}</h2>
      <p className={`mt-4 text-base leading-7 ${dark ? 'text-slate-300' : 'text-[#374151]'}`}>{description}</p>
    </div>
  );
}

function StatPill({ label, value, dark = false }) {
  return (
    <div className={`rounded-[6px] border px-4 py-3 ${dark ? 'border-[#D6DCE5] bg-white text-[#0B3D91]' : 'border-[#D6DCE5] bg-white text-[#0B3D91] shadow-[0_1px_2px_rgba(15,23,42,0.04)]'}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0B3D91]">{label}</p>
      <p className="mt-1 text-xl font-semibold text-[#1F2937]">{value}</p>
    </div>
  );
}

function NewsCard({ item, expanded, onToggle, dark = false }) {
  return (
    <article
      className="group relative overflow-hidden rounded-[6px] border border-[#D6DCE5] border-l-4 border-l-[#0B3D91] bg-white text-[#1F2937] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:bg-[#F8F9FA]"
    >
      <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
        <div className="inline-flex items-center gap-2 rounded-[4px] border border-[#D6DCE5] bg-[#F8F9FA] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0B3D91]">
          {item.category}
        </div>
        <div className="inline-flex items-center gap-2 text-sm text-[#6B7280]">
          <CalendarDays size={16} className="text-[#0B3D91]" />
          {item.date}
        </div>
      </div>

      <h3 className="px-5 text-xl font-semibold leading-snug text-[#1F2937] sm:text-2xl">{item.title}</h3>
      <p className="mt-3 px-5 text-sm leading-7 text-[#374151]">{item.summary}</p>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="mt-4 rounded-[6px] border border-[#D6DCE5] bg-[#F8F9FA] px-4 py-4 text-sm leading-7 text-[#374151]">
              {item.details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 px-5 pb-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#6B7280]">Date & Category</span>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-2 rounded-[6px] border border-[#0B3D91] bg-white px-4 py-2 text-sm font-semibold text-[#0B3D91] transition hover:bg-[#F8F9FA]"
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
          className="ml-2 inline-flex items-center gap-2 rounded-[6px] border border-[#D6DCE5] bg-white px-3 py-2 text-sm font-semibold text-[#374151] hover:bg-[#F8F9FA]"
        >
          <Volume2 size={16} className="text-[#0B3D91]" />
          Listen
        </button>
      </div>
    </article>
  );
}

function NewsPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTickerId, setActiveTickerId] = useState('ticker-1');
  const [expandedId, setExpandedId] = useState('');
  const [isDark, setIsDark] = useState(false);

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

  const containerClass = isDark ? 'dark bg-[#0F172A] text-white' : 'bg-[#F8F9FA] text-[#374151]';

  return (
    <div className={containerClass}>
      <div className="sticky top-[76px] z-40 border-y border-[#D6DCE5] bg-[#0B3D91]">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white">
            {[...newsTicker, ...newsTicker].map((item, index) => (
              <button
                key={`${item.id}-${index}`}
                type="button"
                onClick={() => handleTickerClick(item)}
                className={`inline-flex items-center gap-2 rounded-[4px] border px-3 py-2 text-sm transition ${activeTickerId === item.id ? 'border-white/30 bg-white text-[#0B3D91]' : 'border-white/20 bg-transparent text-white hover:bg-white/10'}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="overflow-x-hidden">
        {/* Emergency / Live Bulletin Banner - shows critical items if present */}
        {importantAnnouncements.some(a => a.severity === 'high') && (
          <div className="fixed left-0 right-0 top-16 z-50 bg-[#C62828] text-white py-3 shadow-sm">
            <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold">Emergency</span>
                <span className="opacity-90">{importantAnnouncements.find(a => a.severity === 'high').title}</span>
              </div>
              <div>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="rounded-[8px] border border-white/20 bg-white/10 px-3 py-1 text-sm font-semibold">View</button>
              </div>
            </div>
          </div>
        )}
        <section id="hero" className="overflow-hidden border-b border-[#D6DCE5] bg-[#F8F9FA] scroll-mt-32">
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-[4px] border border-[#D6DCE5] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0B3D91]">
                  <BellRing size={14} className="text-[#0B3D91]" />
                  News & Announcements
                </span>
                <span className="inline-flex items-center gap-2 rounded-[4px] border border-[#D6DCE5] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0B3D91]">
                  <BadgeAlert size={14} className="text-[#0B3D91]" />
                  Nursing Institute Updates
                </span>
              </div>

              <div>
                <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-[#1F2937]">
                  Stay updated with APJ Nursing Institute news, alerts, and upcoming campus activity.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#374151] sm:text-lg">
                  A modern announcement hub for admissions, workshops, exams, events, and notice board updates with smart search and category filtering.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <StatPill label="Latest updates" value="06+" dark={isDark} />
                <StatPill label="Live notices" value="24/7" dark={isDark} />
                <StatPill label="Categories" value="07" dark={isDark} />
              </div>

              <div className="rounded-[6px] border border-[#D6DCE5] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-3 rounded-[6px] border border-[#D6DCE5] bg-[#F8F9FA] px-4 py-3">
                    <Search size={18} className="text-[#0B3D91]" />
                    <input
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search news, announcements, events..."
                      className="w-full bg-transparent text-sm text-[#1F2937] outline-none placeholder:text-[#6B7280]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDark((value) => !value)}
                    className={`inline-flex items-center justify-center gap-2 rounded-[6px] border px-4 py-3 text-sm font-semibold transition ${isDark ? 'border-[#D6DCE5] bg-white text-[#0B3D91] hover:bg-[#F8F9FA]' : 'border-[#D6DCE5] bg-white text-[#0B3D91] hover:bg-[#F8F9FA]'}`}
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    {isDark ? 'Light Theme' : 'Dark Theme'}
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {newsCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`inline-flex items-center gap-2 rounded-[4px] border px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? 'border-[#0B3D91] bg-[#0B3D91] text-white' : 'border-[#D6DCE5] bg-[#F8F9FA] text-[#0B3D91] hover:bg-[#F2F4F7]'}`}
                    >
                      <Filter size={14} />
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[6px] border border-[#D6DCE5] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[6px] border border-[#D6DCE5] bg-[#F8F9FA] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0B3D91]">Announcement Box</p>
                    <p className="mt-4 text-2xl font-semibold leading-snug text-[#1F2937]">Mid-term exams will begin from 5 June.</p>
                    <p className="mt-3 text-sm leading-7 text-[#374151]">Students should review schedules, prepare ID cards, and monitor the notice board for any room changes.</p>
                  </div>
                  <div className="rounded-[6px] border border-[#D6DCE5] bg-white p-5">
                    <div className="flex items-center gap-3 text-[#0B3D91]">
                      <Newspaper size={20} />
                      <p className="text-sm font-semibold uppercase tracking-[0.3em]">Quick Updates</p>
                    </div>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[#374151]">
                      <li>• Admissions documents are being verified daily.</li>
                      <li>• Workshop attendance is open for all batches.</li>
                      <li>• Notice board PDFs can be checked from admin desk.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`border-t ${isDark ? 'border-white/10 bg-slate-950/60' : 'border-[#D6DCE5] bg-white'}`}>
            <div className={`mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-sm font-medium ${isDark ? 'text-slate-300' : 'text-[#374151]'} lg:px-8`}>
              <div className="flex items-center gap-2">
                <Clock3 size={16} className="text-[#0B3D91]" />
                Updated today at 9:00 AM
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#0B3D91]" />
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
            <div className={`mt-10 rounded-[12px] border border-[#D6DCE5] bg-white px-6 py-10 text-center text-[#6B7280] shadow-sm`}>
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
                  <div
                    key={item.id}
                    className="rounded-[6px] border border-[#D6DCE5] border-l-4 border-l-[#0B3D91] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-[#1F2937]">{item.title}</h3>
                      <span className="rounded-[4px] border border-[#D6DCE5] bg-[#F8F9FA] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0B3D91]">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-[#0B3D91]">{item.meta}</p>
                    <p className="mt-3 text-sm leading-7 text-[#374151]">{item.note}</p>
                  </div>
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
                  <div
                    key={event.id}
                    className="grid gap-4 rounded-[6px] border border-[#D6DCE5] bg-white p-5 sm:grid-cols-[96px_1fr] shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex flex-col items-center justify-center rounded-[6px] border border-[#D6DCE5] bg-[#F8F9FA] px-4 py-5 text-center text-[#0B3D91]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0B3D91]">{event.badge}</p>
                      <p className="mt-2 text-2xl font-semibold">{event.date}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#1F2937]">{event.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-[#6B7280]">
                        <span className="inline-flex items-center gap-2"><Clock3 size={16} className="text-[#0B3D91]" />{event.time}</span>
                        <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-[#0B3D91]" />{event.location}</span>
                      </div>
                      <Link
                        to="/contact"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0B3D91] transition hover:text-[#144E8C]"
                      >
                        Register / Enquire
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Today summary + Timeline */}
        <section className={`mx-auto max-w-7xl px-4 py-12 lg:px-8 ${isDark ? 'text-white' : 'text-[#1F2937]'}`}>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-[6px] border border-[#D6DCE5] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0B3D91]">Today at APJ Institute</h4>
              <p className="mt-3 text-2xl font-semibold text-[#1F2937]">Highlights</p>
              <div className="mt-4 space-y-3">
                {todaySummary?.highlights?.map((h) => (
                  <div key={h.label} className="flex items-center justify-between text-sm text-[#374151]">
                    <div className="font-semibold text-[#1F2937]">{h.label}</div>
                    <div className="text-xl font-semibold text-[#0B3D91]">{h.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 rounded-[6px] border border-[#D6DCE5] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#6B7280]">Timeline</h4>
              <div className="mt-6 space-y-6">
                {latestNews.map((n) => (
                  <div key={n.id} className="flex items-start gap-4">
                    <div className="mt-1 grid h-10 w-10 flex-shrink-0 place-items-center rounded-[6px] border border-[#D6DCE5] bg-[#F8F9FA] font-semibold text-[#0B3D91]">{n.date.split(' ')[0]}</div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h5 className="font-semibold text-[#1F2937]">{n.title}</h5>
                        <span className="text-sm text-[#6B7280]">{n.category}</span>
                      </div>
                      <p className="mt-2 text-sm text-[#374151]">{n.summary}</p>
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
            <div className="rounded-[6px] border border-[#D6DCE5] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1 notice-scrollbar">
                {noticeBoardItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[6px] border border-[#D6DCE5] bg-[#F8F9FA] px-4 py-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-[#1F2937]">{item.heading}</h3>
                      <span className="rounded-[4px] border border-[#D6DCE5] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#0B3D91]">
                        {item.priority}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-[#374151]">{item.subtext}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-[6px] border border-[#D6DCE5] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#6B7280]">Notice Summary</p>
                <h3 className="mt-3 text-3xl font-semibold text-[#1F2937]">Everything students need in one place</h3>
                <p className="mt-4 text-sm leading-7 text-[#374151]">
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

export default NewsPage;
