import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  User, 
  ShieldCheck, 
  CalendarRange, 
  LayoutGrid, 
  ArrowRight, 
  ArrowLeft,
  FileText, 
  Image as ImageIcon,
  BookOpen
} from 'lucide-react';

export default function PortalDashboard() {
  const navigate = useNavigate();

  // Stats Data
  const stats = [
    { label: 'ACTIVE STUDENTS', value: '1,240+', glowClass: 'from-blue-500 to-indigo-600' },
    { label: 'DEPARTMENTS', value: '12', glowClass: 'from-sky-400 to-blue-500' },
    { label: 'EXAM NOTICES', value: '48', glowClass: 'from-fuchsia-500 to-purple-600' },
    { label: 'RESULT CYCLES', value: '4/Year', glowClass: 'from-pink-500 to-rose-500' }
  ];

  // Quick Access Roles
  const roles = [
    {
      title: 'Admin Login',
      sub: 'OPEN PORTAL',
      path: '/admin-login',
      gradient: 'from-purple-600 to-fuchsia-500',
      icon: ShieldCheck
    }
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-center items-center px-4 py-12 md:py-20 relative overflow-hidden font-sans">
      {/* Background ambient glowing details */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full bg-emerald-950/10 blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANEL - Portal Details & Stats */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full py-2">
          
          <div>
            {/* Back Button */}
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition duration-300 mb-6 group text-sm font-semibold bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 hover:border-white/20"
            >
              <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition duration-300" />
              Back to Homepage
            </button>

            {/* Tagline */}
            <div className="flex items-center gap-2 text-[#38bdf8] font-semibold text-xs tracking-[0.25em] uppercase mb-4 animate-pulse">
              <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />
              University Examination Portal
            </div>

            {/* Main Header */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              APJ Institute Dantewada <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400">
                Examination Dashboard
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-400 mt-6 text-base md:text-lg leading-relaxed max-w-xl">
              A modern, responsive examination portal with login cards, notices, forms, results, and admin-ready management sections built for a polished university experience.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8 max-w-2xl">
              {stats.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-2xl hover:border-blue-500/40 hover:bg-white/10 transition duration-300 relative overflow-hidden group"
                >
                  <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-1">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight group-hover:scale-105 transition duration-300 origin-left">
                    {stat.value}
                  </h3>
                  {/* Bottom Glow Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.glowClass}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <button 
              onClick={() => navigate('/notices')}
              className="bg-white text-slate-900 font-bold px-6 py-3 rounded-full hover:bg-slate-200 transition duration-300 flex items-center gap-2 shadow-lg shadow-white/5 hover:shadow-white/15"
            >
              View Results
              <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/notices')}
              className="border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 hover:border-white/40 transition duration-300 flex items-center gap-2"
            >
              <FileText size={18} />
              Download Forms
            </button>
            <button 
              onClick={() => navigate('/gallery')}
              className="border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 hover:border-white/40 transition duration-300 flex items-center gap-2"
            >
              <ImageIcon size={18} />
              Manage Gallery
            </button>
          </div>

        </div>

        {/* RIGHT PANEL - Quick Access Entries */}
        <div className="lg:col-span-5 bg-slate-950/40 border border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          {/* Subtle top decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Panel Headers */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[#38bdf8] font-bold text-xs tracking-widest uppercase">
                Quick Access
              </p>
              <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
                Role-based entry points
              </h2>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[#38bdf8]">
              <LayoutGrid size={20} />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {roles.map((role, idx) => {
              const Icon = role.icon;
              return (
                <div
                  key={idx}
                  onClick={() => navigate(role.path)}
                  className={`bg-gradient-to-br ${role.gradient} rounded-3xl p-5 shadow-lg flex flex-col justify-between h-36 cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl transition duration-300 relative group overflow-hidden`}
                >
                  {/* Subtle inner card decoration glow */}
                  <div className="absolute top-[-20%] right-[-20%] w-16 h-16 rounded-full bg-white/10 group-hover:scale-150 transition duration-500" />
                  
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <Icon size={20} />
                  </div>

                  {/* Text Details */}
                  <div>
                    <h3 className="text-white font-extrabold text-base leading-tight tracking-wide">
                      {role.title}
                    </h3>
                    <p className="text-white/80 text-[10px] font-bold tracking-widest uppercase mt-0.5">
                      {role.sub}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Notices Card (Spans both columns) */}
            <div
              onClick={() => navigate('/notices')}
              className="col-span-2 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-3xl p-5 shadow-lg flex flex-col justify-between h-36 cursor-pointer transform hover:-translate-y-1 hover:shadow-2xl transition duration-300 relative group overflow-hidden"
            >
              {/* Subtle inner card decoration glow */}
              <div className="absolute top-[-20%] right-[-10%] w-24 h-24 rounded-full bg-white/10 group-hover:scale-120 transition duration-500" />
              
              {/* Icon */}
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                <CalendarRange size={20} />
              </div>

              {/* Text Details */}
              <div>
                <h3 className="text-white font-extrabold text-lg leading-tight tracking-wide">
                  Notices
                </h3>
                <p className="text-white/80 text-[10px] font-bold tracking-widest uppercase mt-0.5">
                  OPEN PORTAL
                </p>
              </div>
            </div>
          </div>

          {/* Highlights bottom info */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Admin-ready highlights
            </h4>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Dynamic notices, downloadable forms, result search, date management, and role-based access are built into the portal structure.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
