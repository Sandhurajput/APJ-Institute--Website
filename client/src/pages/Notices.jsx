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

function GovernmentPdfIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="4" y="3" width="12" height="18" rx="1" fill="#FFFFFF" stroke="#C62828" strokeWidth="1.5" />
      <path d="M16 3h3v4h-3z" fill="#C62828" />
      <path d="M8 8h8" stroke="#C62828" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12h8" stroke="#C62828" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 16h5" stroke="#C62828" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

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
        return 'bg-[#F8F9FA] text-[#0B3D91] border-[#D5DCE5]';
      case 'MEDIUM':
        return 'bg-[#F8F9FA] text-[#144E8C] border-[#D5DCE5]';
      default:
        return 'bg-[#F8F9FA] text-[#2E7D32] border-[#D5DCE5]';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-4 text-[#374151] sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-[6px] border border-[#D5DCE5] bg-[#0B3D91] px-6 py-5 text-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/portal')}
                className="rounded-[6px] border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
                aria-label="Go Back"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">
                  Updates & Notifications
                </p>
                <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">
                  Notice Board
                </h1>
              </div>
            </div>

            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-[6px] border border-white/20 bg-white py-3 pl-11 pr-5 text-sm text-[#374151] placeholder:text-[#6B7280] focus:outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
            </div>
          </div>
        </div>

        <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-4 notice-scrollbar">
          <div className="flex shrink-0 items-center gap-1.5 rounded-[6px] border border-[#D5DCE5] bg-white p-1 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-[6px] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                  selectedCategory === cat
                    ? 'bg-[#0B3D91] text-white'
                    : 'text-[#374151] hover:bg-[#F8F9FA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.25em] text-[#6B7280]">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[#0B3D91]" />
            <span>Showing {filteredNotices.length} notices</span>
          </div>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[#0B3D91] hover:underline"
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
                className="flex flex-col justify-between rounded-[6px] border border-[#D5DCE5] bg-[#FFFFFF] p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="rounded-[6px] border border-[#D5DCE5] bg-[#F8F9FA] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#0B3D91]">
                      {notice.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-[6px] border px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] ${getUrgencyBadge(notice.urgency)}`}>
                        {notice.urgency}
                      </span>
                      <Bookmark size={14} className="text-[#6B7280]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold leading-snug text-[#1F2937]">
                    {notice.title}
                  </h3>

                  <p className="mt-3.5 text-sm leading-relaxed text-[#6B7280]">
                    {notice.description}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#D5DCE5] pt-4">
                  <div className="flex items-center gap-4 text-xs font-semibold text-[#6B7280]">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-[#0B3D91]" />
                      <span>{notice.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-[#0B3D91]" />
                      <span>{notice.dept}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`📥 Downloading: ${notice.title} (${notice.fileSize})`)}
                    className="flex items-center gap-2 rounded-[6px] border border-[#C62828] bg-[#C62828] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#b11f1f]"
                  >
                    <GovernmentPdfIcon className="h-4 w-4" />
                    <span>PDF ({notice.fileSize})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search / Filters state */
          <div className="mx-auto mt-12 flex max-w-xl flex-col items-center justify-center rounded-[6px] border border-[#D5DCE5] bg-[#FFFFFF] p-12 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[6px] border border-[#D5DCE5] bg-[#F8F9FA] text-[#0B3D91]">
              <Bell size={24} />
            </div>
            <h3 className="text-lg font-semibold text-[#1F2937]">No notices found</h3>
            <p className="mt-2 text-sm text-[#6B7280]">
              Try adjusting your search criteria or select another filter category to view newer circulars.
            </p>
          </div>
        )}

        {/* Highlights / Academic Guidelines bottom card */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-[6px] border border-[#D5DCE5] bg-[#FFFFFF] p-6 md:flex-row md:p-8">
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-[6px] border border-[#D5DCE5] bg-[#F8F9FA] p-3 text-[#0B3D91]">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1F2937]">Academic Circulars & Regulations</h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#6B7280]">
                Need details regarding university rules, code of conduct, or regular circulars? You can read and access the complete institution charter here.
              </p>
            </div>
          </div>
          <button 
            onClick={() => alert('📕 APJ Dantewada Student Charter & Regulations downloaded successfully!')}
            className="flex w-full shrink-0 items-center justify-center gap-2 rounded-[6px] border border-[#C62828] bg-[#C62828] px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#b11f1f] md:w-auto"
          >
            <Download size={16} />
            Download Charter
          </button>
        </div>

      </div>
    </div>
  );
}
