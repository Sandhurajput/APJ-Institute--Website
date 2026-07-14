import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, GraduationCap, MessageSquare, Bell, 
  Settings, LogOut, Search, Menu, X, Plus, Clock, CheckCircle, 
  AlertCircle, Send, Star, Activity, Calendar, DollarSign, FileText, 
  Phone, Mail, Lock, User, Download, FileUp, Compass, ArrowUpRight, ArrowDownRight, Megaphone, Sliders, Heart, MessageCircle, UserPlus, ArrowRight
} from 'lucide-react';
import { getCourses } from '../data/coursesData';
import { getAnnouncements } from '../data/announcementsData';
import { getQueries, saveQueries, getReplies } from '../data/queriesData';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeAlertFilter, setActiveAlertFilter] = useState('All Alerts');
  
  // Data State
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [queries, setQueries] = useState([]);
  const [replies, setReplies] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Form States
  const [newQuerySubject, setNewQuerySubject] = useState('');
  const [newQueryText, setNewQueryText] = useState('');
  const [queryFiles, setQueryFiles] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedCourseForReview, setSelectedCourseForReview] = useState(null);

  // Settings State
  const [profileData, setProfileData] = useState({ fullName: '', email: '', phone: '+91 98765 43210', avatar: '' });
  const fileInputRef = useRef(null);

  // Dashboard specific Data mappings mimicking Admin Layout
  const monthlyStats = [
    { month: 'Jan', income: 85, expense: 75 },
    { month: 'Feb', income: 90, expense: 80 },
    { month: 'Mar', income: 75, expense: 85 },
    { month: 'Apr', income: 95, expense: 90 },
    { month: 'May', income: 88, expense: 82 },
    { month: 'Jun', income: 92, expense: 88 },
    { month: 'Jul', income: 85, expense: 80 },
    { month: 'Aug', income: 90, expense: 85 },
    { month: 'Sep', income: 88, expense: 82 },
    { month: 'Oct', income: 92, expense: 88 },
    { month: 'Nov', income: 95, expense: 90 },
    { month: 'Dec', income: 88, expense: 85 },
  ];

  const transactions = [
    { name: 'Semester 3 Fee', type: 'Tuition', date: '2026-05-20', amount: '$700.00', status: 'Success' },
    { name: 'Library Fine', type: 'Penalty', date: '2026-05-19', amount: '$15.00', status: 'Failed' },
    { name: 'Hostel Rent', type: 'Accommodation', date: '2026-05-18', amount: '$450.00', status: 'Pending' },
    { name: 'Sports Club', type: 'Activity', date: '2026-05-17', amount: '$50.00', status: 'Success' },
    { name: 'Exam Registration', type: 'Academics', date: '2026-05-10', amount: '$120.00', status: 'Success' },
  ];

  const activities = [
    { text: 'Submitted assignment for Data Structures', time: '10 mins ago', type: 'success' },
    { text: 'Paid Semester 3 Tuition Fee', time: '1 hour ago', type: 'info' },
    { text: 'Registered for Summer Internship Drive', time: '3 hours ago', type: 'alert' },
    { text: 'Enrolled in Advanced React Course', time: 'Yesterday', type: 'info' },
    { text: 'Raised query regarding library access', time: 'Yesterday', type: 'alert' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDataStr = localStorage.getItem('user');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    let parsedUser = { fullName: 'APJ User', email: 'user@apjinstitute.com', role: 'user' };
    if (userDataStr) {
      const storedUser = JSON.parse(userDataStr);
      parsedUser = {
        fullName: storedUser.fullName || storedUser.name || 'APJ User',
        email: storedUser.email || 'user@apjinstitute.com',
        phone: storedUser.phone || '+91 98765 43210',
        avatar: storedUser.avatar || '',
        role: storedUser.role || 'user',
      };

      if (parsedUser.fullName === 'APJ Admin' || parsedUser.fullName === 'Admin User') {
        parsedUser.fullName = 'APJ User';
      }
    }

    setUser(parsedUser);
    setProfileData(parsedUser);

    setCourses(getCourses());
    setAnnouncements(getAnnouncements());
    setQueries(getQueries());
    setReplies(getReplies());
    
    const savedEnrolled = localStorage.getItem('apj_enrolled');
    if (savedEnrolled) {
      setEnrolledCourses(JSON.parse(savedEnrolled));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  const handleEnroll = (course) => {
    if (enrolledCourses.find(c => c.id === course.id)) {
      alert("You are already enrolled in this course.");
      return;
    }
    const updated = [...enrolledCourses, course];
    setEnrolledCourses(updated);
    localStorage.setItem('apj_enrolled', JSON.stringify(updated));
    alert(`Successfully enrolled in ${course.title}!`);
  };

  const handleSubmitQuery = (e) => {
    e.preventDefault();
    if (!newQuerySubject || !newQueryText) return;

    const newQuery = {
      id: queries.length ? Math.max(...queries.map(q => q.id)) + 1 : 1,
      student: user?.fullName || "Student",
      course: enrolledCourses.length > 0 ? enrolledCourses[0].title : "General",
      subject: newQuerySubject,
      preview: newQueryText,
      time: "Just now",
      status: "open",
      priority: "normal",
      avatar: user?.fullName ? user.fullName[0].toUpperCase() : "S"
    };

    const updated = [newQuery, ...queries];
    setQueries(updated);
    saveQueries(updated);
    setNewQuerySubject('');
    setNewQueryText('');
    setQueryFiles([]);
    alert("Query submitted to Administration successfully!");
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify({ ...user, ...profileData }));
    setUser({ ...user, ...profileData });
    alert("Profile settings updated successfully!");
  };

  const handleDiscardSettings = () => {
    if (user) {
      setProfileData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '+91 98765 43210',
        avatar: user.avatar || ''
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'All Courses', icon: BookOpen },
    { name: 'My Courses', icon: GraduationCap },
    { name: 'My Queries', icon: MessageSquare },
    { name: 'Notifications', icon: Bell },
    { name: 'Settings', icon: Settings },
  ];

  if (!user) return null;

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 overflow-hidden font-sans antialiased">
      
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-full p-6 justify-between flex-shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md shadow-brand-200">
              <span className="text-white font-extrabold text-sm tracking-wide">APJ</span>
            </div>
            <div>
              <h1 className="text-md font-bold text-slate-900 tracking-tight">Student Portal</h1>
              <p className="text-xs text-slate-400 font-medium">APJ Institute</p>
            </div>
          </div>

          <nav className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-3 px-2">MAIN MENU</p>
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === item.name 
                    ? 'bg-brand-50 text-brand-600' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <item.icon className={`w-5 h-5 ${activeTab === item.name ? 'text-brand-600' : 'text-slate-400'}`} />
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          <div className="relative p-5 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl text-white overflow-hidden shadow-lg shadow-brand-100 group">
            <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
            <p className="text-[10px] font-bold tracking-wider text-brand-100 uppercase mb-1">APJ ALUMNI</p>
            <h4 className="text-xs font-bold leading-snug mb-3">Join the alumni network to connect with seniors</h4>
            <button className="w-full py-2 bg-white text-brand-700 text-xs font-extrabold rounded-lg shadow hover:bg-brand-50 transition-colors">
              Join Network
            </button>
          </div>

          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2.5 min-w-0">
              {user.avatar ? (
                <img src={user.avatar} alt="Profile" className="w-9 h-9 rounded-xl object-cover flex-shrink-0 shadow-sm" />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-200 to-violet-200 flex items-center justify-center text-brand-700 font-extrabold text-sm flex-shrink-0">
                  {user.fullName ? user.fullName[0].toUpperCase() : 'S'}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate leading-none">{user.fullName || 'APJ User'}</p>
                <p className="text-[10px] text-slate-400 font-medium truncate mt-1">{user.email || 'user@apjinstitute.com'}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Header */}
        <header className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Hey {user.fullName?.split(' ')[0] || 'Student'}, Welcome back! 🎓</h2>
              <p className="text-xs text-slate-400 font-medium">Control dashboard for APJ Institute</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 w-52 focus-within:border-brand-500 transition-colors">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search portal..." className="bg-transparent outline-none text-xs text-slate-700 w-full" />
            </div>
            <button onClick={() => setActiveTab('Notifications')} className="relative p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-600 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {/* --- DASHBOARD TAB (EXACT ADMIN LAYOUT REPLICA) --- */}
        {activeTab === 'Dashboard' && (
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            
            {/* Left Three-Quarters Section */}
            <div className="xl:col-span-3 space-y-6">
              
              {/* Top Stat row: Smart card + three stat cards */}
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Premium Gradient Smart Card */}
                <div className="relative bg-gradient-to-br from-brand-700 via-brand-800 to-indigo-900 text-white rounded-3xl p-6 shadow-xl w-full lg:w-96 overflow-hidden flex flex-col justify-between h-56 hover:shadow-2xl transition-all duration-300 flex-shrink-0 group">
                  <div className="absolute right-4 top-4 w-28 h-28 bg-white/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="absolute -left-6 -bottom-6 w-36 h-36 bg-white/5 rounded-full blur-2xl"></div>

                  <div className="flex justify-between items-start z-10">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold tracking-wider text-brand-200 uppercase">STUDENT IDENTITY CARD</p>
                      <h3 className="text-xl font-extrabold tracking-tight">APJ-26-8902</h3>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/15">
                      <Compass className="w-4 h-4 text-brand-200 animate-spin-slow" />
                    </div>
                  </div>

                  <div className="z-10">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-4 h-3 bg-gradient-to-r from-amber-300 to-yellow-500 rounded-sm"></span>
                      <span className="text-[8px] text-brand-200 font-mono tracking-widest uppercase">RFID ACTIVE</span>
                    </div>
                    <p className="text-sm font-mono tracking-[0.2em] font-semibold text-white/90">B.TECH COMPUTER SCIENCE</p>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/10 pt-4 z-10">
                    <div>
                      <p className="text-[8px] text-brand-300 font-semibold tracking-wider uppercase">STUDENT NAME</p>
                      <p className="text-xs font-bold truncate tracking-tight">{user.fullName || 'Student Name'}</p>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <p className="text-[8px] text-brand-300 font-semibold tracking-wider uppercase">SEM</p>
                        <p className="text-xs font-mono font-bold">03/08</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-brand-300 font-semibold tracking-wider uppercase">BATCH</p>
                        <p className="text-xs font-mono font-bold">2026</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Three Stat Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
                  {/* Stat 1 */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        +5.2% <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">TOTAL ATTENDANCE</p>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">86.5%</h3>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium">Above minimum requirement</p>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-rose-50 rounded-2xl text-rose-600">
                        <DollarSign className="w-6 h-6" />
                      </div>
                      <span className="flex items-center gap-0.5 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                        -$15.00 <ArrowDownRight className="w-3 h-3" />
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">FEE DUES</p>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">$15.00</h3>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium">Pending library fines</p>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-brand-50 rounded-2xl text-brand-600">
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <span className="flex items-center gap-0.5 text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                        +8 Cr <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">CREDITS EARNED</p>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">42 / 160</h3>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium">Track degree requirements</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second row layout: Left Actions Column + Right Visual Charts Column */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Actions, capacity, and savings trackers column (1/3) */}
                <div className="lg:col-span-1 space-y-6">
                  
                  {/* 1. Quick Actions Widget */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm">
                    <h3 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase mb-4 px-1">QUICK ACTIONS</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-2xl hover:bg-brand-50/50 hover:border-brand-100 group transition-all duration-200">
                        <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform"><Download className="w-5 h-5" /></div>
                        <span className="text-[10px] font-bold text-slate-600 group-hover:text-brand-700">Get ID Card</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-2xl hover:bg-emerald-50/50 hover:border-emerald-100 group transition-all duration-200">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform"><DollarSign className="w-4 h-4" /></div>
                        <span className="text-[10px] font-bold text-slate-600 group-hover:text-emerald-700">Pay Fees</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-2xl hover:bg-violet-50/50 hover:border-violet-100 group transition-all duration-200">
                        <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform"><BookOpen className="w-4 h-4" /></div>
                        <span className="text-[10px] font-bold text-slate-600 group-hover:text-violet-700">Library Book</span>
                      </button>
                      <button onClick={() => setActiveTab('My Queries')} className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-2xl hover:bg-amber-50/50 hover:border-amber-100 group transition-all duration-200">
                        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform"><MessageSquare className="w-4 h-4" /></div>
                        <span className="text-[10px] font-bold text-slate-600 group-hover:text-amber-700">Submit Query</span>
                      </button>
                    </div>
                  </div>

                  {/* 2. Enrollment Capacity Tracker -> Semester Goal */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm">
                    <div className="flex justify-between items-center mb-2.5">
                      <h4 className="text-xs font-bold text-slate-700">Semester SGPA Target</h4>
                      <span className="text-[10px] font-bold text-slate-400">Current Sem</span>
                    </div>
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-2xl font-black text-slate-900">8.5</span>
                      <span className="text-xs text-slate-400 font-bold">Projected</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-brand-500 to-brand-600 h-full rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  {/* 3. Infrastructure Saving -> Upcoming Deadlines */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm space-y-4">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase px-1">UPCOMING DEADLINES</h3>
                      <span className="text-[10px] text-brand-600 font-bold hover:underline cursor-pointer">View All</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">📝 Data Structures Assignment</span>
                        <span className="text-slate-900">2 Days</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">📚 Mid-term Exams</span>
                        <span className="text-slate-900">14 Days</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-brand-600 h-full rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">💰 Semester 4 Fee</span>
                        <span className="text-slate-900">30 Days</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Money statistics and transaction table column (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* 1. Custom Monthly Finance Bar Chart -> Semester Performance Chart */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-md font-extrabold text-slate-800">Academic Performance Tracker</h3>
                        <p className="text-xs text-slate-400 font-medium">Monthly attendance vs Grades</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-semibold">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 bg-brand-600 rounded-full"></span>
                          <span className="text-slate-500">Attendance</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 bg-brand-300 rounded-full"></span>
                          <span className="text-slate-500">Grades</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-end justify-between h-40 pt-4 px-2 border-b border-slate-100">
                      {monthlyStats.map((item) => (
                        <div key={item.month} className="flex flex-col items-center flex-1 group relative">
                          <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-[10px] font-bold py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap shadow-lg">
                            Att: {item.income}% / Grade: {item.expense}%
                          </div>
                          <div className="flex items-end gap-1 w-full justify-center">
                            <div className="w-2 sm:w-3 bg-brand-600 rounded-t-sm group-hover:bg-brand-700 transition-colors" style={{ height: `${item.income * 1.2}px` }}></div>
                            <div className="w-2 sm:w-3 bg-brand-300 rounded-t-sm group-hover:bg-brand-400 transition-colors" style={{ height: `${item.expense * 1.2}px` }}></div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 mt-2">{item.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Recent Transactions Table -> Fee Payment History */}
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-md font-extrabold text-slate-800">Fee Payment History</h3>
                        <p className="text-xs text-slate-400 font-medium">Record of institution collections & payments</p>
                      </div>
                      <button className="text-xs text-brand-600 font-bold hover:underline">View All</button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
                            <th className="pb-3 px-1">Invoice Name</th>
                            <th className="pb-3 px-1">Category</th>
                            <th className="pb-3 px-1">Date</th>
                            <th className="pb-3 px-1">Amount</th>
                            <th className="pb-3 px-1 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-xs font-semibold">
                          {transactions.map((t, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                              <td className="py-3 px-1 text-slate-800 font-bold">{t.name}</td>
                              <td className="py-3 px-1 text-slate-400 font-medium">{t.type}</td>
                              <td className="py-3 px-1 text-slate-400 font-medium">{t.date}</td>
                              <td className="py-3 px-1 text-slate-900 font-bold">{t.amount}</td>
                              <td className="py-3 px-1 text-right">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                  t.status === 'Success' ? 'bg-emerald-50 text-emerald-600' : t.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                                }`}>
                                  {t.status === 'Success' && <CheckCircle className="w-2.5 h-2.5" />}
                                  {t.status === 'Pending' && <Clock className="w-2.5 h-2.5" />}
                                  {t.status === 'Failed' && <AlertCircle className="w-2.5 h-2.5" />}
                                  {t.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Right Column Layout - Visual Stats Donut + System logs */}
            <div className="xl:col-span-1 space-y-6">
              
              {/* 1. Visual SVG Donut Chart Widget (Degree Progress) */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <h3 className="text-md font-extrabold text-slate-800">Syllabus Completion</h3>
                <p className="text-xs text-slate-400 font-medium mb-6">Distributing total 160 credits</p>

                <div className="relative flex items-center justify-center h-44 mb-6">
                  <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="11" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4f46e5" strokeWidth="11" strokeDasharray="251.2" strokeDashoffset="100.48" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#38bdf8" strokeWidth="11" strokeDasharray="251.2" strokeDashoffset="213.52" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#c084fc" strokeWidth="11" strokeDasharray="251.2" strokeDashoffset="243.66" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f472b6" strokeWidth="11" strokeDasharray="251.2" strokeDashoffset="210.48" />
                  </svg>

                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-slate-900">160</span>
                    <span className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase">CREDITS</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></span><span className="text-slate-600">Core Subjects</span>
                    </div>
                    <span className="text-slate-900">60%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-sky-400 rounded-full"></span><span className="text-slate-600">Electives</span>
                    </div>
                    <span className="text-slate-900">15%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-purple-400 rounded-full"></span><span className="text-slate-600">Practical Labs</span>
                    </div>
                    <span className="text-slate-900">12%</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-pink-400 rounded-full"></span><span className="text-slate-600">Projects</span>
                    </div>
                    <span className="text-slate-900">13%</span>
                  </div>
                </div>
              </div>

              {/* 2. Recent System Activity Timeline Widget */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <h3 className="text-md font-extrabold text-slate-800">Recent Activity Log</h3>
                <p className="text-xs text-slate-400 font-medium mb-5">Your portal operation audits</p>

                <div className="relative border-l border-slate-100 pl-4 ml-1 space-y-5">
                  {activities.map((a, idx) => (
                    <div key={idx} className="relative group">
                      <span className={`absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                        a.type === 'success' ? 'bg-emerald-500' : a.type === 'alert' ? 'bg-rose-500' : 'bg-brand-500'
                      }`}></span>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-700 leading-snug group-hover:text-brand-600 transition-colors">
                          {a.text}
                        </p>
                        <span className="text-[10px] text-slate-400 font-medium">{a.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* --- ALL COURSES TAB --- */}
        {activeTab === 'All Courses' && (
          <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header / Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Course Catalog</h2>
                <p className="text-sm font-semibold text-slate-500 mt-1">Discover new skills and expand your knowledge</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold shadow-md">All Programs</button>
                <button className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-full text-xs font-bold transition-colors border border-slate-200">Engineering</button>
                <button className="px-4 py-2 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-full text-xs font-bold transition-colors border border-slate-200">Management</button>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {courses.map(course => (
                <div key={course.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full hover:-translate-y-1">
                  
                  {/* Premium Image Header */}
                  <div className="h-48 w-full overflow-hidden relative p-4">
                    <img src={course.image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80'} alt={course.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    
                    {/* Top Badges */}
                    <div className="relative z-10 flex justify-between items-start">
                      <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                        {course.category}
                      </span>
                      <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-rose-500 hover:border-rose-500 border border-white/30 transition-all">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Bottom Info overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex justify-between items-end">
                      <div className="flex -space-x-2">
                        {[1,2,3].map((i) => (
                           <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-200 overflow-hidden">
                              <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="student" className="w-full h-full object-cover"/>
                           </div>
                        ))}
                        <div className="w-6 h-6 rounded-full border-2 border-slate-900 bg-brand-500 flex items-center justify-center text-[8px] font-bold text-white">+1.2k</div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400 bg-slate-900/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="text-[10px] font-bold text-white">4.8</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-black text-slate-900 text-xl mb-3 leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">{course.title}</h3>
                    <p className="text-sm font-medium text-slate-500 line-clamp-2 mb-6 flex-1">{course.description}</p>
                    
                    {/* Meta Info */}
                    <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] text-slate-400 uppercase tracking-wider">Duration</span>
                         <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-500" /> {course.duration}</div>
                      </div>
                      <div className="w-px h-8 bg-slate-200"></div>
                      <div className="flex flex-col gap-1">
                         <span className="text-[10px] text-slate-400 uppercase tracking-wider">Course Fee</span>
                         <div className="flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-emerald-500" /> {course.fees}</div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-3 mt-auto">
                      <button onClick={() => handleEnroll(course)} className="flex-1 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2">
                        Enroll Now <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <button onClick={() => { setSelectedCourseForReview(course); setReviewModalOpen(true); }} className="w-12 h-12 flex-shrink-0 border border-slate-200 hover:border-amber-300 hover:bg-amber-50 text-slate-600 font-bold rounded-xl transition-all flex items-center justify-center group/btn shadow-sm" title="Rate Course">
                        <Star className="w-5 h-5 text-amber-400 group-hover/btn:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- MY COURSES TAB --- */}
        {activeTab === 'My Courses' && (
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-900 to-slate-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-brand-500/20 text-brand-300 text-[10px] font-black uppercase tracking-widest rounded-full mb-3 border border-brand-500/30">Your Learning Path</span>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">My Courses</h2>
                  <p className="text-brand-100/80 font-medium max-w-lg text-sm">Track your academic progress, access study materials, and join your virtual classrooms from one central hub.</p>
                </div>
                <div className="flex items-center gap-6 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10">
                  <div className="text-center">
                    <p className="text-3xl font-black">{enrolledCourses.length}</p>
                    <p className="text-[10px] text-brand-200 uppercase tracking-wider font-bold mt-1">Active</p>
                  </div>
                  <div className="w-px h-10 bg-white/20"></div>
                  <div className="text-center">
                    <p className="text-3xl font-black">2</p>
                    <p className="text-[10px] text-brand-200 uppercase tracking-wider font-bold mt-1">Completed</p>
                  </div>
                </div>
              </div>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="bg-white p-16 rounded-3xl border border-slate-200 text-center max-w-2xl mx-auto mt-10 shadow-sm">
                <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-500 shadow-inner">
                  <Compass className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Your Journey Awaits</h3>
                <p className="text-sm font-medium text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">You haven't enrolled in any courses yet. Browse our comprehensive catalog to start building your future.</p>
                <button onClick={() => setActiveTab('All Courses')} className="px-8 py-4 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-brand-600 shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 mx-auto">
                  Explore Catalog <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {enrolledCourses.map((course, idx) => {
                  const progress = Math.floor(Math.random() * 60) + 10; // Mock progress
                  return (
                  <div key={idx} className="bg-white border border-slate-200 hover:border-brand-300 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col sm:flex-row gap-6 relative overflow-hidden">
                    {/* Decorative abstract shape */}
                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-50 rounded-full blur-3xl opacity-50 pointer-events-none group-hover:bg-brand-100 transition-colors"></div>
                    
                    {/* Progress Donut (Left) */}
                    <div className="relative w-28 h-28 flex-shrink-0 mx-auto sm:mx-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="#f1f5f9" strokeWidth="8" />
                        <circle cx="50" cy="50" r="45" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * progress) / 100} className="text-brand-500 transition-all duration-1000 ease-out" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-full m-2 shadow-inner">
                        <span className="text-xl font-black text-slate-900">{progress}%</span>
                      </div>
                    </div>

                    {/* Course Details (Right) */}
                    <div className="flex-1 flex flex-col relative z-10">
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[9px] font-black rounded-lg uppercase tracking-wider shadow-sm">Active Enrolment</span>
                        <button className="text-slate-400 hover:text-brand-600 transition-colors">
                          <Activity className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <h3 className="font-black text-slate-900 text-xl mb-1 leading-tight group-hover:text-brand-600 transition-colors">{course.title}</h3>
                      <p className="text-xs font-bold text-slate-400 mb-5">{course.duration} • Online/Campus</p>
                      
                      <div className="mt-auto flex items-center justify-between gap-4">
                        <div className="flex -space-x-2">
                           <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://i.pravatar.cc/100?img=33" alt="inst" className="w-full h-full object-cover"/></div>
                           <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden"><img src="https://i.pravatar.cc/100?img=47" alt="inst" className="w-full h-full object-cover"/></div>
                        </div>
                        <button className="flex-1 py-3 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 text-slate-700 hover:text-brand-700 text-xs font-black rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group/btn">
                          Go to Portal <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            )}
          </div>
        )}

        {/* --- MY QUERIES TAB --- */}
        {activeTab === 'My Queries' && (
          <div className="space-y-6 max-w-7xl mx-auto w-full">
            {/* Upper Two Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button className="flex items-center justify-between p-6 bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-3xl shadow-lg shadow-brand-500/30 hover:-translate-y-1 transition-transform group text-left">
                <div>
                  <h3 className="text-xl font-black mb-1">Submit New Ticket</h3>
                  <p className="text-sm text-brand-100 font-medium">Get help from the administration instantly</p>
                </div>
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
              </button>
              
              <button className="flex items-center justify-between p-6 bg-white border border-slate-200 text-slate-800 rounded-3xl shadow-sm hover:shadow-md hover:border-brand-300 hover:-translate-y-1 transition-all group text-left">
                <div>
                  <h3 className="text-xl font-black mb-1">Knowledge Base</h3>
                  <p className="text-sm text-slate-500 font-medium">Browse FAQs and self-help articles</p>
                </div>
                <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-brand-50 transition-colors shadow-sm">
                  <BookOpen className="w-7 h-7 text-brand-600" />
                </div>
              </button>
            </div>

            {/* Dense Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form & Info */}
              <div className="lg:col-span-4 space-y-6">
                
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">
                      <Send className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-800 leading-tight">Need Help?</h3>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Create a Support Ticket</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmitQuery} className="space-y-5">
                    <div className="space-y-1.5 relative group">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-1">Issue Subject</label>
                      <input required value={newQuerySubject} onChange={(e)=>setNewQuerySubject(e.target.value)} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold outline-none focus:border-brand-500 focus:bg-white focus:ring-4 ring-brand-500/10 transition-all shadow-inner" placeholder="E.g., Payment failed..." />
                    </div>
                    <div className="space-y-1.5 relative group">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-1">Detailed Description</label>
                      <textarea required value={newQueryText} onChange={(e)=>setNewQueryText(e.target.value)} rows="6" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold outline-none focus:border-brand-500 focus:bg-white focus:ring-4 ring-brand-500/10 transition-all resize-none shadow-inner" placeholder="Describe your problem in detail..."></textarea>
                    </div>
                    <div className="space-y-1.5 relative group">
                      <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider ml-1">Attach Files</label>
                      <div className="flex flex-col gap-2">
                        <label className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 border-dashed rounded-xl cursor-pointer hover:bg-brand-50 hover:border-brand-300 transition-all shadow-inner w-full text-slate-500 hover:text-brand-600">
                          <FileUp className="w-4 h-4" />
                          <span className="text-xs font-semibold">Select files or drag & drop</span>
                          <input type="file" className="hidden" multiple onChange={(e) => {
                            if (e.target.files) {
                              setQueryFiles(prev => [...prev, ...Array.from(e.target.files)]);
                            }
                          }} />
                        </label>
                        {queryFiles.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {queryFiles.map((f, i) => (
                              <span key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-brand-50 text-brand-700 text-[10px] font-bold rounded-lg border border-brand-100">
                                <FileText className="w-3 h-3" />
                                <span className="max-w-[120px] truncate">{f.name}</span>
                                <button type="button" onClick={() => setQueryFiles(queryFiles.filter((_, idx) => idx !== i))} className="hover:bg-brand-100 p-0.5 rounded-full transition-colors ml-1"><X className="w-3 h-3" /></button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl text-sm shadow-lg shadow-brand-500/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5">
                      Submit Ticket
                    </button>
                  </form>
                </div>

                {/* Support Guidelines Card to fill space */}
                <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 shadow-inner">
                  <h4 className="text-xs font-black text-slate-800 mb-5 uppercase tracking-wider flex items-center gap-2"><AlertCircle className="w-4 h-4 text-brand-600"/> Support Guidelines</h4>
                  <ul className="space-y-4 text-xs font-bold text-slate-600">
                    <li className="flex gap-3 items-start"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> <span>Response time is usually within 2-4 working hours.</span></li>
                    <li className="flex gap-3 items-start"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> <span>Provide exact transaction IDs if querying about fees.</span></li>
                    <li className="flex gap-3 items-start"><CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" /> <span>Keep the description concise and to the point.</span></li>
                  </ul>
                  <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-4">
                    <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Emergency Hotline</p>
                      <p className="text-sm font-black text-slate-800">+91 1800-APJ-HELP</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Dense History View */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h3 className="text-lg font-black text-slate-800 tracking-tight">Your Ticket History</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Total Tickets:</span>
                    <span className="w-6 h-6 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center text-xs font-bold">{queries.filter(q => q.student === user.fullName || q.student === "Rahul Verma").length}</span>
                  </div>
                </div>
                
                <div className="space-y-5">
                  {queries.filter(q => q.student === user.fullName || q.student === "Rahul Verma").map(q => (
                    <div key={q.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all group overflow-hidden relative">
                      {/* Active line indicator */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${q.status === 'open' ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
                      
                      <div className="pl-2">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-sm border ${q.status === 'open' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                              {q.status === 'open' ? <Clock className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                              {q.status}
                            </span>
                            <span className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-slate-500 tracking-wider">#TCK-0{q.id}</span>
                          </div>
                          <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{q.time}</span>
                        </div>
                        
                        <h4 className="font-black text-slate-900 text-xl mb-2 leading-tight group-hover:text-brand-600 transition-colors">{q.subject}</h4>
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 relative">
                           {/* Little speech bubble tail */}
                           <div className="absolute -top-2 left-6 w-4 h-4 bg-slate-50 border-t border-l border-slate-100 rotate-45"></div>
                           <p className="text-sm font-semibold text-slate-600 leading-relaxed relative z-10">{q.preview}</p>
                        </div>
                        
                        {replies[q.id] && replies[q.id].length > 0 && (
                          <div className="mt-6 pt-6 border-t border-slate-100">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><MessageSquare className="w-3.5 h-3.5" /> Official Responses</h5>
                            <div className="space-y-4">
                              {replies[q.id].map((reply, idx) => (
                                <div key={idx} className="flex gap-4">
                                  <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-800 text-white rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 shadow-md">
                                    APJ
                                  </div>
                                  <div className="flex-1 bg-brand-50 rounded-2xl rounded-tl-none p-5 relative border border-brand-100/50">
                                     <div className="flex items-center justify-between mb-2">
                                       <span className="text-xs font-black text-brand-800">Administration Support</span>
                                       <span className="text-[10px] font-bold text-brand-400/80">{reply.time}</span>
                                     </div>
                                     <p className="text-sm font-semibold text-brand-900/80 leading-relaxed">{reply.text}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* --- NOTIFICATIONS TAB --- */}
        {activeTab === 'Notifications' && (
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Panel: Overview & Filters */}
            <div className="lg:col-span-4 space-y-6">
               <div className="bg-gradient-to-br from-brand-900 to-slate-900 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl">
                 <div className="absolute right-0 top-0 w-48 h-48 bg-brand-500/20 rounded-full blur-3xl"></div>
                 <div className="relative z-10">
                   <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/20">
                     <Bell className="w-6 h-6 text-brand-100" />
                   </div>
                   <h2 className="text-3xl font-black mb-1">Updates</h2>
                   <p className="text-brand-200/80 text-sm font-medium mb-8">Your campus broadcast center</p>
                   
                   <div className="flex items-end gap-3 mb-2">
                     <span className="text-6xl font-black leading-none text-white">3</span>
                     <span className="text-sm font-bold text-brand-300 uppercase tracking-widest mb-1">Unread</span>
                   </div>
                   <p className="text-xs text-brand-200/60 font-semibold mb-8">Out of 12 total notifications this week.</p>
                   
                   <button className="w-full py-3.5 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-brand-50 transition-colors shadow-lg">
                     Mark all as read
                   </button>
                 </div>
               </div>

               <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                 <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-4">Filters</h3>
                 <div className="flex flex-col gap-2">
                    <button onClick={() => setActiveAlertFilter('All Alerts')} className={`flex items-center justify-between p-3 rounded-xl font-bold text-sm transition-colors border ${activeAlertFilter === 'All Alerts' ? 'bg-brand-50 text-brand-700 border-brand-100' : 'hover:bg-slate-50 text-slate-600 border-transparent hover:border-slate-100'}`}>
                      <span>All Alerts</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full shadow-sm ${activeAlertFilter === 'All Alerts' ? 'bg-white text-brand-600' : 'bg-slate-100 text-slate-500'}`}>12</span>
                    </button>
                    <button onClick={() => setActiveAlertFilter('Academics')} className={`flex items-center justify-between p-3 rounded-xl font-bold text-sm transition-colors border ${activeAlertFilter === 'Academics' ? 'bg-brand-50 text-brand-700 border-brand-100' : 'hover:bg-slate-50 text-slate-600 border-transparent hover:border-slate-100'}`}>
                      <span>Academics</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full shadow-sm ${activeAlertFilter === 'Academics' ? 'bg-white text-brand-600' : 'bg-slate-100 text-slate-500'}`}>5</span>
                    </button>
                    <button onClick={() => setActiveAlertFilter('Administration')} className={`flex items-center justify-between p-3 rounded-xl font-bold text-sm transition-colors border ${activeAlertFilter === 'Administration' ? 'bg-brand-50 text-brand-700 border-brand-100' : 'hover:bg-slate-50 text-slate-600 border-transparent hover:border-slate-100'}`}>
                      <span>Administration</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full shadow-sm ${activeAlertFilter === 'Administration' ? 'bg-white text-brand-600' : 'bg-slate-100 text-slate-500'}`}>4</span>
                    </button>
                    <button onClick={() => setActiveAlertFilter('Events')} className={`flex items-center justify-between p-3 rounded-xl font-bold text-sm transition-colors border ${activeAlertFilter === 'Events' ? 'bg-brand-50 text-brand-700 border-brand-100' : 'hover:bg-slate-50 text-slate-600 border-transparent hover:border-slate-100'}`}>
                      <span>Events</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full shadow-sm ${activeAlertFilter === 'Events' ? 'bg-white text-brand-600' : 'bg-slate-100 text-slate-500'}`}>3</span>
                    </button>
                  </div>
               </div>
            </div>

            {/* Right Panel: Feed */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="flex items-center justify-between bg-white px-6 py-4 rounded-full border border-slate-200 shadow-sm">
                <span className="text-sm font-bold text-slate-600">Showing <strong className="text-slate-900">{activeAlertFilter}</strong></span>
                <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                  <Sliders className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Alert 1 */}
                {(activeAlertFilter === 'All Alerts' || activeAlertFilter === 'Academics') && (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500"></div>
                    <div className="flex items-start justify-between mb-4 pl-2">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
                            <FileText className="w-5 h-5" />
                         </div>
                         <span className="px-2.5 py-1 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-wider rounded-lg border border-rose-100 shadow-sm">New</span>
                      </div>
                      <time className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">10 mins ago</time>
                    </div>
                    <div className="pl-2">
                       <h3 className="font-black text-slate-800 text-base mb-2 leading-tight">New Assignment Uploaded</h3>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed">Prof. Sharma has uploaded "Data Structures Assignment 3". Deadline is in 48 hours.</p>
                    </div>
                  </div>
                )}

                {/* Alert 2 */}
                {(activeAlertFilter === 'All Alerts' || activeAlertFilter === 'Administration') && (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                    <div className="flex items-start justify-between mb-4 pl-2">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                            <DollarSign className="w-5 h-5" />
                         </div>
                         <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-wider rounded-lg border border-emerald-100 shadow-sm">Administration</span>
                      </div>
                      <time className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">2 hours ago</time>
                    </div>
                    <div className="pl-2">
                       <h3 className="font-black text-slate-800 text-base mb-2 leading-tight">Fee Receipt Generated</h3>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed">Your semester fee payment was successful. The receipt is now available.</p>
                       <button className="mt-4 flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg w-fit transition-colors">
                         <Download className="w-3.5 h-3.5" /> Download PDF
                       </button>
                    </div>
                  </div>
                )}

                {/* Alert 3 */}
                {(activeAlertFilter === 'All Alerts' || activeAlertFilter === 'Events') && (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
                    <div className="flex items-start justify-between mb-4 pl-2">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shadow-inner">
                            <Calendar className="w-5 h-5" />
                         </div>
                         <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-wider rounded-lg border border-amber-100 shadow-sm">Event</span>
                      </div>
                      <time className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">Yesterday</time>
                    </div>
                    <div className="pl-2">
                       <h3 className="font-black text-slate-800 text-base mb-2 leading-tight">Tech Fest 2026 Registration</h3>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed">Registrations for the upcoming Tech Fest are closing soon. Apply now!</p>
                    </div>
                  </div>
                )}

                {/* Alert 4 */}
                {(activeAlertFilter === 'All Alerts') && (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-400"></div>
                    <div className="flex items-start justify-between mb-4 pl-2">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center shadow-inner">
                            <Activity className="w-5 h-5" />
                         </div>
                         <span className="px-2.5 py-1 bg-white text-slate-600 text-[10px] font-black uppercase tracking-wider rounded-lg border border-slate-200 shadow-sm">System</span>
                      </div>
                      <time className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2 py-1 rounded-md">3 Days Ago</time>
                    </div>
                    <div className="pl-2">
                       <h3 className="font-black text-slate-700 text-base mb-2 leading-tight">Portal Maintenance</h3>
                       <p className="text-sm text-slate-500 font-medium leading-relaxed">Scheduled maintenance completed successfully.</p>
                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* --- SETTINGS TAB --- */}
        {activeTab === 'Settings' && (
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 sm:p-10 border-b border-slate-100 flex flex-col sm:flex-row gap-6 items-center">
                <div className="relative group">
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-brand-100 to-indigo-100 border-4 border-white shadow-lg flex items-center justify-center text-brand-600 font-extrabold text-3xl overflow-hidden">
                      {profileData.fullName ? profileData.fullName[0].toUpperCase() : 'S'}
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                  <button onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-brand-700 transition-colors">
                    <FileUp className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-black text-slate-900">{profileData.fullName || 'Student Name'}</h2>
                  <p className="text-slate-500 font-medium mb-3">{profileData.email}</p>
                  <span className="px-3 py-1 bg-brand-50 text-brand-700 text-xs font-bold rounded-full border border-brand-100">B.Tech Student • ID: APJ-26-8902</span>
                </div>
              </div>

              <div className="p-6 sm:p-10">
                <form onSubmit={handleSaveSettings} className="space-y-8">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-wider mb-5">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="text" value={profileData.fullName} onChange={e=>setProfileData({...profileData, fullName: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-brand-500 focus:bg-white transition-all" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="email" value={profileData.email} onChange={e=>setProfileData({...profileData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-brand-500 focus:bg-white transition-all" />
                        </div>
                      </div>
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-bold text-slate-600">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="text" value={profileData.phone} onChange={e=>setProfileData({...profileData, phone: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-brand-500 focus:bg-white transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="pt-6 border-t border-slate-100">
                    <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-wider mb-5">Security</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-brand-500 focus:bg-white transition-all" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">Confirm Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-brand-500 focus:bg-white transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="pt-6 border-t border-slate-100">
                     <h3 className="text-sm font-extrabold text-slate-400 uppercase tracking-wider mb-5">Preferences</h3>
                     <div className="space-y-3">
                       <label className="flex items-center gap-3 cursor-pointer">
                         <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500" />
                         <div>
                           <p className="text-sm font-bold text-slate-800">Email Notifications</p>
                           <p className="text-[10px] text-slate-400 font-medium">Receive alerts for new announcements and query replies</p>
                         </div>
                       </label>
                       <label className="flex items-center gap-3 cursor-pointer">
                         <input type="checkbox" className="w-5 h-5 rounded text-brand-600 focus:ring-brand-500" />
                         <div>
                           <p className="text-sm font-bold text-slate-800">SMS Alerts</p>
                           <p className="text-[10px] text-slate-400 font-medium">Receive text messages for fee dues and urgent notices</p>
                         </div>
                       </label>
                     </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100 flex justify-end gap-3">
                    <button type="button" onClick={handleDiscardSettings} className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Discard</button>
                    <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md transition-colors">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Review Modal Popup */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setReviewModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">Rate this Course</h3>
            <p className="text-sm font-semibold text-slate-500 mb-6">{selectedCourseForReview?.title}</p>
            
            <div className="flex justify-center gap-2 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className={`w-8 h-8 cursor-pointer hover:scale-110 transition-transform ${star <= 4 ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
              ))}
            </div>
            
            <div className="space-y-1.5 mb-6">
              <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Leave a review (Optional)</label>
              <textarea rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium outline-none focus:border-amber-400 focus:bg-white transition-all resize-none" placeholder="What did you like about this course?"></textarea>
            </div>
            
            <button onClick={() => { alert('Thank you! Your review has been submitted.'); setReviewModalOpen(false); }} className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 shadow-md transition-all hover:-translate-y-0.5">
              Submit Feedback
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Keyframes for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}} />

    </div>
  );
}
