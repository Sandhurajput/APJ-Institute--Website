import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  BookOpen, 
  DollarSign, 
  Megaphone, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  CreditCard, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  HelpCircle, 
  Menu, 
  X, 
  Lock, 
  Activity,
  Users,
  Compass,
  MessageSquare
} from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New Query: Issue with fee portal payment failure', time: 'Just now', read: false },
    { id: 2, text: 'New admission form submitted by Sneha Rao', time: '5m ago', read: false },
    { id: 3, text: 'New Query: Request for Bonafide Certificate', time: '1h ago', read: false },
  ]);
  const navigate = useNavigate();

  // Load user data
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-600 font-semibold animate-pulse">Initializing Portal...</p>
        </div>
      </div>
    );
  }

  // Sidebar Menu Items
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true, path: '/admin-dashboard' },
    { name: 'Admissions', icon: UserPlus, active: false, path: '/admission' },
    { name: 'Courses', icon: BookOpen, active: false, path: '/admin/courses' },
    { name: 'Fees & Finance', icon: DollarSign, active: false, path: '/admin/finance' },
    { name: 'Announcements', icon: Megaphone, active: false, path: '/admin/announcements' },
    { name: 'Student Queries', icon: MessageSquare, active: false, path: '/admin/queries' },
    { name: 'Settings', icon: Settings, active: false, path: '/admin/settings' },
    { name: 'Help & FAQ', icon: HelpCircle, active: false, path: '/admin/help' },
  ];

  // Mock Data for Bar Chart (Money Statistics)
  const monthlyStats = [
    { month: 'Jan', income: 45, expense: 25 },
    { month: 'Feb', income: 55, expense: 35 },
    { month: 'Mar', income: 40, expense: 20 },
    { month: 'Apr', income: 65, expense: 45 },
    { month: 'May', income: 75, expense: 50 },
    { month: 'Jun', income: 90, expense: 60 },
    { month: 'Jul', income: 85, expense: 55 },
    { month: 'Aug', income: 70, expense: 40 },
    { month: 'Sep', income: 60, expense: 35 },
    { month: 'Oct', income: 75, expense: 45 },
    { month: 'Nov', income: 80, expense: 50 },
    { month: 'Dec', income: 95, expense: 65 },
  ];

  // Mock Transactions Table
  const transactions = [
    { name: 'Semester Fee - Rahul', type: 'Tuition Fee', date: '2026-05-20', amount: '$700.00', status: 'Success' },
    { name: 'Library AC Install', type: 'Maintenance', date: '2026-05-19', amount: '$2,400.00', status: 'Failed' },
    { name: 'Server Hosting (AWS)', type: 'IT Ops', date: '2026-05-18', amount: '$150.00', status: 'Success' },
    { name: 'Hostel Fee - Amit', type: 'Accommodation', date: '2026-05-18', amount: '$450.00', status: 'Pending' },
    { name: 'Stationery & Books', type: 'Supplies', date: '2026-05-17', amount: '$312.45', status: 'Success' },
  ];

  // Mock Activities Timeline
  const activities = [
    { text: 'Resolved student query regarding fee payment', time: '10 mins ago', type: 'success' },
    { text: 'Approved admission file of Sneha Rao', time: '1 hour ago', type: 'info' },
    { text: 'Posted notice: Summer Internship 2026', time: '3 hours ago', type: 'alert' },
    { text: 'Added new Course: Advanced React & Tailwind', time: 'Yesterday', type: 'info' },
    { text: 'Received new Query: Placement drive registration', time: 'Yesterday', type: 'alert' },
  ];

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 overflow-hidden font-sans antialiased">
      
      {/* 1. Left Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 h-full p-6 justify-between flex-shrink-0">
        <div className="space-y-8">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md shadow-brand-200">
              <span className="text-white font-extrabold text-sm tracking-wide">APJ</span>
            </div>
            <div>
              <h1 className="text-md font-bold text-slate-900 tracking-tight">APJ Panel</h1>
              <p className="text-xs text-slate-400 font-medium">Dantewada Portal</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-3 px-2">MAIN MENU</p>
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  item.active 
                    ? 'bg-brand-50 text-brand-600' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <item.icon className={`w-5 h-5 ${item.active ? 'text-brand-600' : 'text-slate-400'}`} />
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Upgrade Card & Profile */}
        <div className="space-y-6">
          {/* Mock Upgrade banner */}
          <div className="relative p-5 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl text-white overflow-hidden shadow-lg shadow-brand-100 group">
            <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
            <p className="text-[10px] font-bold tracking-wider text-brand-100 uppercase mb-1">APJ PRO</p>
            <h4 className="text-xs font-bold leading-snug mb-3">Upgrade your panel to manage multiple branches</h4>
            <button onClick={() => setShowUpgradeModal(true)} className="w-full py-2 bg-white text-brand-700 text-xs font-extrabold rounded-lg shadow hover:bg-brand-50 transition-colors">
              Upgrade Now
            </button>
          </div>

          {/* User profile section */}
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-200 to-violet-200 flex items-center justify-center text-brand-700 font-extrabold text-sm flex-shrink-0">
                {user.fullName ? user.fullName[0].toUpperCase() : 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate leading-none">{user.fullName || 'Admin User'}</p>
                <p className="text-[10px] text-slate-400 font-medium truncate mt-1">{user.email || 'admin@apjinstitute.com'}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Drawer Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="relative flex flex-col w-64 bg-white h-full p-6 justify-between z-10 animate-slide-in">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-extrabold text-xs">APJ</span>
                  </div>
                  <div>
                    <h1 className="text-sm font-bold text-slate-900">APJ Panel</h1>
                    <p className="text-[10px] text-slate-400">Dantewada</p>
                  </div>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      item.active 
                        ? 'bg-brand-50 text-brand-600' 
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs">
                    {user.fullName ? user.fullName[0].toUpperCase() : 'A'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate leading-none">{user.fullName || 'Admin User'}</p>
                    <p className="text-[9px] text-slate-400 truncate mt-0.5">{user.email}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="p-1 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-red-500">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* 3. Main Dashboard Workspace */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Header Row */}
        <header className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Hey {user.fullName ? user.fullName.split(' ')[0] : 'Admin'}, Welcome back! 🏫
              </h2>
              <p className="text-xs text-slate-400 font-medium">Control dashboard for APJ Institute</p>
            </div>
          </div>

          {/* Search, Notifications */}
          <div className="flex items-center gap-3">
            {/* Styled Search Bar */}
            <div className={`hidden md:flex items-center gap-2 bg-white border rounded-xl px-3 py-2 transition-all duration-200 ${
              searchFocused ? 'border-brand-500 ring-2 ring-brand-100 w-64' : 'border-slate-200 w-52'
            }`}>
              <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search portal..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="bg-transparent outline-none text-xs text-slate-700 placeholder-slate-400 w-full"
              />
              <span className="text-[10px] font-bold text-slate-300 border border-slate-200 px-1.5 py-0.5 rounded-md bg-slate-50">⌘K</span>
            </div>

            {/* Notification bell */}
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm group">
                <Bell className="w-5 h-5 text-slate-500 group-hover:scale-105 transition-transform" />
                {notifications.some(n => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-600 rounded-full ring-2 ring-white"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-extrabold text-slate-800">Notifications</h3>
                    <button onClick={() => setNotifications(n => n.map(x => ({...x, read: true})))} className="text-[10px] font-bold text-brand-600 hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? {...x, read: true} : x))} className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${!n.read ? 'bg-brand-50/30' : ''}`}>
                        <div className="flex justify-between items-start gap-4">
                          <p className={`text-xs ${!n.read ? 'font-bold text-slate-900' : 'font-medium text-slate-600'}`}>{n.text}</p>
                          {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-brand-600 flex-shrink-0 mt-1.5"></span>}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 font-semibold">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Premium Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mt-6">
          
          {/* Left Three-Quarters Section */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* Top Stat row: Smart card + three stat cards */}
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Premium Gradient Smart Card */}
              <div className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white rounded-3xl p-6 shadow-xl w-full lg:w-96 overflow-hidden flex flex-col justify-between h-56 hover:shadow-2xl transition-all duration-300 flex-shrink-0 group">
                {/* Visual Glassmorphism circles */}
                <div className="absolute right-4 top-4 w-28 h-28 bg-white/10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute -left-6 -bottom-6 w-36 h-36 bg-white/5 rounded-full blur-2xl"></div>

                <div className="flex justify-between items-start z-10">
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold tracking-wider text-brand-200 uppercase">APJ TRUST & OPERATIONAL FUND</p>
                    <h3 className="text-xl font-extrabold tracking-tight">₹1,20,560.00</h3>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/15">
                    <Compass className="w-4 h-4 text-brand-200 animate-spin-slow" />
                  </div>
                </div>

                <div className="z-10">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-4 h-3 bg-gradient-to-r from-amber-300 to-yellow-500 rounded-sm"></span>
                    <span className="text-[8px] text-brand-200 font-mono tracking-widest uppercase">NFC ACTIVE</span>
                  </div>
                  <p className="text-sm font-mono tracking-[0.2em] font-semibold text-white/90">2243 9830 6500 9982</p>
                </div>

                <div className="flex justify-between items-end border-t border-white/10 pt-4 z-10">
                  <div>
                    <p className="text-[8px] text-brand-300 font-semibold tracking-wider uppercase">TRUST MANAGER</p>
                    <p className="text-xs font-bold truncate tracking-tight">{user.fullName || 'APJ Admin'}</p>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[8px] text-brand-300 font-semibold tracking-wider uppercase">EXP</p>
                      <p className="text-xs font-mono font-bold">04/28</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-brand-300 font-semibold tracking-wider uppercase">CVV</p>
                      <p className="text-xs font-mono font-bold">064</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Three Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
                {/* Stat 1: Total Fees Collected */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      +$500 <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">FEES COLLECTED</p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">$10,000</h3>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">26% increase this month</p>
                  </div>
                </div>

                {/* Stat 2: Operational Expenses */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-rose-50 rounded-2xl text-rose-600">
                      <Activity className="w-6 h-6" />
                    </div>
                    <span className="flex items-center gap-0.5 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                      -$2,400 <ArrowDownRight className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">TOTAL PAYOUTS</p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">$6,000</h3>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">Salaries & supplies cost</p>
                  </div>
                </div>

                {/* Stat 3: Total Development Savings */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-brand-50 rounded-2xl text-brand-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <span className="flex items-center gap-0.5 text-xs font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                      +$5,000 <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-xs text-slate-400 font-semibold tracking-wide uppercase">RESTORATIVE FUND</p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">$30,000</h3>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">Campus extension savings</p>
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
                    <button onClick={() => navigate('/admission')} className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-2xl hover:bg-brand-50/50 hover:border-brand-100 group transition-all duration-200">
                      <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                        <Plus className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 group-hover:text-brand-700">Add Student</span>
                    </button>
                    <button onClick={() => navigate('/admin/finance')} className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-2xl hover:bg-emerald-50/50 hover:border-emerald-100 group transition-all duration-200">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 group-hover:text-emerald-700">Collect Fee</span>
                    </button>
                    <button onClick={() => navigate('/admin/courses')} className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-2xl hover:bg-violet-50/50 hover:border-violet-100 group transition-all duration-200">
                      <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 group-hover:text-violet-700">Add Course</span>
                    </button>
                    <button onClick={() => navigate('/admin/announcements')} className="flex flex-col items-center justify-center p-3 border border-slate-100 rounded-2xl hover:bg-amber-50/50 hover:border-amber-100 group transition-all duration-200">
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                        <Megaphone className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 group-hover:text-amber-700">Post Notice</span>
                    </button>
                  </div>
                </div>

                {/* 2. Enrollment Capacity Tracker */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-2.5">
                    <h4 className="text-xs font-bold text-slate-700">Admission Target</h4>
                    <span className="text-[10px] font-bold text-slate-400">Batch 2026</span>
                  </div>
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-2xl font-black text-slate-900">80%</span>
                    <span className="text-xs text-slate-400 font-bold">160 / 200 Students</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-500 to-brand-600 h-full rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
                  </div>
                </div>

                {/* 3. Infrastructure Saving Projects */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm space-y-4">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase px-1">CAMPUS GOALS</h3>
                    <span onClick={() => alert('Create new campus goal...')} className="text-[10px] text-brand-600 font-bold hover:underline cursor-pointer">+ New Plan</span>
                  </div>

                  {/* Project 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700">🖥️ Computer Lab Update</span>
                      <span className="text-slate-900">$700 / $1,000</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-500 h-full rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>

                  {/* Project 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700">📚 Library Renovation</span>
                      <span className="text-slate-900">$4,300 / $6,000</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-600 h-full rounded-full" style={{ width: '71.6%' }}></div>
                    </div>
                  </div>

                  {/* Project 3 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-700">⚽ New Sports Ground</span>
                      <span className="text-slate-900">$5,000 / $8,000</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-700 h-full rounded-full" style={{ width: '62.5%' }}></div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Money statistics and transaction table column (2/3) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Custom Monthly Finance Bar Chart */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-md font-extrabold text-slate-800">Operational Money Statistics</h3>
                      <p className="text-xs text-slate-400 font-medium">Income & Expense tracker</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-brand-600 rounded-full"></span>
                        <span className="text-slate-500">Income</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-brand-300 rounded-full"></span>
                        <span className="text-slate-500">Expense</span>
                      </div>
                    </div>
                  </div>

                  {/* HTML/CSS Bar Chart Grid */}
                  <div className="flex items-end justify-between h-40 pt-4 px-2 border-b border-slate-100">
                    {monthlyStats.map((item) => (
                      <div key={item.month} className="flex flex-col items-center flex-1 group relative">
                        {/* Hover Tooltip tooltip */}
                        <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-[10px] font-bold py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap shadow-lg">
                          Inc: ${item.income * 100} / Exp: ${item.expense * 100}
                        </div>

                        {/* Visual Bar Columns */}
                        <div className="flex items-end gap-1 w-full justify-center">
                          {/* Income Column */}
                          <div 
                            className="w-2 sm:w-3 bg-brand-600 rounded-t-sm group-hover:bg-brand-700 transition-colors" 
                            style={{ height: `${item.income * 1.2}px` }}
                          ></div>
                          {/* Expense Column */}
                          <div 
                            className="w-2 sm:w-3 bg-brand-300 rounded-t-sm group-hover:bg-brand-400 transition-colors" 
                            style={{ height: `${item.expense * 1.2}px` }}
                          ></div>
                        </div>

                        {/* Label */}
                        <span className="text-[10px] font-bold text-slate-400 mt-2">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Recent Transactions Table */}
                <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-md font-extrabold text-slate-800">Recent Transactions</h3>
                      <p className="text-xs text-slate-400 font-medium">Institution fee collections & payments</p>
                    </div>
                    <button onClick={() => alert('Loading full transaction history...')} className="text-xs text-brand-600 font-bold hover:underline">View All</button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-[10px] font-extrabold text-slate-400 tracking-wider uppercase">
                          <th className="pb-3 px-1">Name</th>
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
                                t.status === 'Success' 
                                  ? 'bg-emerald-50 text-emerald-600'
                                  : t.status === 'Pending'
                                  ? 'bg-amber-50 text-amber-600'
                                  : 'bg-rose-50 text-rose-600'
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
            
            {/* 1. Visual SVG Donut Chart Widget (Department Enrollments) */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
              <h3 className="text-md font-extrabold text-slate-800">Enrollment Stats</h3>
              <p className="text-xs text-slate-400 font-medium mb-6">Distributing total 2,750 students</p>

              {/* SVG Donut implementation */}
              <div className="relative flex items-center justify-center h-44 mb-6">
                <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="11" />
                  
                  {/* Science segment (60%) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4f46e5" strokeWidth="11" 
                    strokeDasharray="251.2" strokeDashoffset="100.48" />
                  
                  {/* Commerce segment (15%) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#38bdf8" strokeWidth="11" 
                    strokeDasharray="251.2" strokeDashoffset="213.52" />
                  
                  {/* Arts segment (12%) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#c084fc" strokeWidth="11" 
                    strokeDasharray="251.2" strokeDashoffset="243.66" />
                  
                  {/* Other segment (13%) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f472b6" strokeWidth="11" 
                    strokeDasharray="251.2" strokeDashoffset="210.48" />
                </svg>

                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900">2,750</span>
                  <span className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase">STUDENTS</span>
                </div>
              </div>

              {/* Legends with Custom Percentage distribution */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-brand-600 rounded-full"></span>
                    <span className="text-slate-600">Computer Science</span>
                  </div>
                  <span className="text-slate-900">60%</span>
                </div>

                <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-sky-400 rounded-full"></span>
                    <span className="text-slate-600">Sciences & Bio</span>
                  </div>
                  <span className="text-slate-900">15%</span>
                </div>

                <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-purple-400 rounded-full"></span>
                    <span className="text-slate-600">Commerce</span>
                  </div>
                  <span className="text-slate-900">12%</span>
                </div>

                <div className="flex justify-between items-center text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-pink-400 rounded-full"></span>
                    <span className="text-slate-600">Other Arts</span>
                  </div>
                  <span className="text-slate-900">13%</span>
                </div>
              </div>
            </div>

            {/* 2. Recent System Activity Timeline Widget */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
              <h3 className="text-md font-extrabold text-slate-800">Recent Activity Log</h3>
              <p className="text-xs text-slate-400 font-medium mb-5">Admin operation audits</p>

              <div className="relative border-l border-slate-100 pl-4 ml-1 space-y-5">
                {activities.map((a, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline bullet indicator color indicator */}
                    <span className={`absolute -left-[20.5px] top-1 w-2.5 h-2.5 rounded-full ring-4 ring-white ${
                      a.type === 'success' 
                        ? 'bg-emerald-500'
                        : a.type === 'alert'
                        ? 'bg-rose-500'
                        : 'bg-brand-500'
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

        {/* Dynamic Mobile Animation Helper CSS styles in place */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
          }
          .animate-slide-in {
            animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-spin-slow {
            animation: spin 8s linear infinite;
          }
        `}} />

      </main>

      {/* Upgrade Modal Overlay */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setShowUpgradeModal(false)} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl flex items-center justify-center mb-6">
              <Activity className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Upgrade to APJ PRO</h2>
            <p className="text-slate-500 text-sm mb-6">Unlock multi-branch management, advanced analytics, and priority 24/7 technical support.</p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> Unlimited student capacity
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> Financial automation API
              </div>
            </div>
            <button onClick={() => { setShowUpgradeModal(false); alert('Redirecting to payment gateway...'); }} className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl shadow-lg transition-colors">
              Proceed to Payment
            </button>
          </div>
        </div>
      )}


    </div>
  );
}
