import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  Calendar, 
  Clock, 
  Filter, 
  Bell, 
  FileText,
  Bookmark
} from 'lucide-react';

export default function Notices() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Realistic Notices Data
  const noticesData = [
    {
      id: 1,
      title: 'APJ Dantewada Annual Examination Schedule - 2026',
      category: 'Examination',
      date: 'May 20, 2026',
      urgency: 'HIGH',
      description: 'The official dates and schedules for all undergraduate and postgraduate final year exams have been released. Exams commence from June 15, 2026.',
      fileSize: '1.2 MB',
      dept: 'Controller of Exams'
    },
    {
      id: 2,
      title: 'Revaluation Result Cycle - Semester IV (Regular & Backlog)',
      category: 'Results',
      date: 'May 18, 2026',
      urgency: 'HIGH',
      description: 'Results for revaluation of Semester IV exams are now online. Students can check their updated scorecards on the official portal.',
      fileSize: '840 KB',
      dept: 'Result Section'
    },
    {
      id: 3,
      title: 'Admission Checklist & Key Dates - Academic Session 2026-27',
      category: 'Admission',
      date: 'May 15, 2026',
      urgency: 'MEDIUM',
      description: 'Find details about admission criteria, mandatory registration steps, and important timelines for the upcoming session.',
      fileSize: '2.4 MB',
      dept: 'Admissions Office'
    },
    {
      id: 4,
      title: 'Scholarship Application Forms for SC/ST/OBC Students',
      category: 'General',
      date: 'May 12, 2026',
      urgency: 'MEDIUM',
      description: 'State-sponsored post-matric scholarship applications are open. Submit your verified documents before the portal closes on June 10.',
      fileSize: '950 KB',
      dept: 'Student Welfare'
    },
    {
      id: 5,
      title: 'Holiday Declaration on account of Summer Vacation',
      category: 'Academic',
      date: 'May 10, 2026',
      urgency: 'LOW',
      description: 'The institute will remain closed for summer vacation from May 25 to June 5, 2026. Regular classes will resume from June 8.',
      fileSize: '310 KB',
      dept: 'Administration'
    },
    {
      id: 6,
      title: 'Ph.D. Coursework Examination Dates - Dantewada Center',
      category: 'Examination',
      date: 'May 08, 2026',
      urgency: 'HIGH',
      description: 'All Ph.D. candidates registered at the Dantewada center are notified that coursework exam papers will be held between June 20 and June 24.',
      fileSize: '1.5 MB',
      dept: 'Research Cell'
    }
  ];

  const categories = ['All', 'Examination', 'Results', 'Admission', 'Academic', 'General'];

  // Filter Notices based on Category & Search Query
  const filteredNotices = useMemo(() => {
    return noticesData.filter((notice) => {
      const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
      const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            notice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            notice.dept.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Urgency badge styling helper
  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'HIGH':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'MEDIUM':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-blue-900/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-emerald-950/15 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/portal')}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition duration-300"
              aria-label="Go Back"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <p className="text-blue-400 font-semibold text-xs tracking-wider uppercase">
                Updates & Notifications
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-0.5">
                Notice Board
              </h1>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/50 border border-white/10 rounded-full py-3 pl-11 pr-5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition duration-300"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          </div>
        </div>

        {/* Categories / Filtering Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 notice-scrollbar">
          <div className="p-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-1.5 flex-nowrap shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition duration-300 shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Notices Count summary */}
        <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-6">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-blue-400" />
            <span>Showing {filteredNotices.length} notices</span>
          </div>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-blue-400 hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Notices Cards Grid */}
        {filteredNotices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNotices.map((notice) => (
              <div 
                key={notice.id}
                className="bg-slate-950/45 border border-white/5 rounded-3xl p-6 shadow-xl backdrop-blur-sm hover:border-blue-500/30 hover:bg-slate-950/70 transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Badges / Header details */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {notice.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded border text-[9px] font-extrabold tracking-widest ${getUrgencyBadge(notice.urgency)}`}>
                        {notice.urgency}
                      </span>
                      <Bookmark size={14} className="text-slate-600 hover:text-blue-400 cursor-pointer transition" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-white tracking-wide group-hover:text-blue-400 transition duration-300 leading-snug">
                    {notice.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mt-3.5 leading-relaxed">
                    {notice.description}
                  </p>
                </div>

                {/* Footer details of notice */}
                <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-slate-500 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-slate-600" />
                      <span>{notice.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-slate-600" />
                      <span>{notice.dept}</span>
                    </div>
                  </div>

                  {/* Simulated PDF Download button */}
                  <button 
                    onClick={() => alert(`📥 Downloading: ${notice.title} (${notice.fileSize})`)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 text-slate-300 hover:text-white transition duration-300 text-xs font-bold"
                  >
                    <Download size={14} />
                    <span>PDF ({notice.fileSize})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search / Filters state */
          <div className="bg-slate-950/20 border border-white/5 rounded-3xl p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto mt-12">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 mb-4">
              <Bell size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">No notices found</h3>
            <p className="text-slate-500 text-sm mt-2">
              Try adjusting your search criteria or select another filter category to view newer circulars.
            </p>
          </div>
        )}

        {/* Highlights / Academic Guidelines bottom card */}
        <div className="mt-16 bg-gradient-to-r from-blue-950/25 to-indigo-950/25 border border-blue-900/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Academic Circulars & Regulations</h3>
              <p className="text-slate-400 text-sm mt-1 leading-relaxed max-w-xl">
                Need details regarding university rules, code of conduct, or regular circulars? You can read and access the complete institution charter here.
              </p>
            </div>
          </div>
          <button 
            onClick={() => alert('📕 APJ Dantewada Student Charter & Regulations downloaded successfully!')}
            className="w-full md:w-auto shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-blue-950/30 transition duration-300 flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download Charter
          </button>
        </div>

      </div>
    </div>
  );
}
