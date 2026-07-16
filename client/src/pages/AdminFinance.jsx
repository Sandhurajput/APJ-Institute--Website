import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, DollarSign, Activity, CreditCard, 
  Download, Filter, Search, TrendingUp, MoreVertical, CheckCircle, Clock, AlertCircle
} from 'lucide-react';
import bannerImg from '../institte.webp';

export default function AdminFinance() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [filterMode, setFilterMode] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [remindersSent, setRemindersSent] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const transactions = [
    { id: '#TRX-9821', student: 'Aarav Sharma', course: 'B.Tech CSE', amount: '₹45,000', date: '21 May 2026', type: 'Tuition Fee', status: 'Completed' },
    { id: '#TRX-9820', student: 'Priya Patel', course: 'BBA', amount: '₹22,500', date: '20 May 2026', type: 'Semester Fee', status: 'Pending' },
    { id: '#TRX-9819', student: 'Rohan Singh', course: 'B.Sc Physics', amount: '₹12,000', date: '19 May 2026', type: 'Hostel Fee', status: 'Completed' },
    { id: '#TRX-9818', student: 'Sneha Gupta', course: 'B.Tech IT', amount: '₹45,000', date: '18 May 2026', type: 'Tuition Fee', status: 'Failed' },
    { id: '#TRX-9817', student: 'Vikram Verma', course: 'MBA', amount: '₹60,000', date: '18 May 2026', type: 'Admission Fee', status: 'Completed' },
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = filterMode === 'All' || t.status === filterMode;
    const matchesSearch = t.student.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const displayedTransactions = showAllTransactions ? filteredTransactions : filteredTransactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-12 font-sans">
      {/* Hero Banner Header */}
      <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
        <img src={bannerImg} alt="Finance Banner" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-end w-full px-8 pb-10">
          <div className="flex items-end justify-between">
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/admin-dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-semibold border border-white/20"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </button>
              <div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight">Financial Overview</h1>
                <p className="text-slate-300 font-medium mt-2 max-w-xl">Manage institution revenue, track pending fees, and analyze financial health across all departments.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setFilterMode(prev => prev === 'All' ? 'Completed' : prev === 'Completed' ? 'Pending' : prev === 'Pending' ? 'Failed' : 'All')} className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md text-white text-sm font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                <Filter className="w-4 h-4" /> {filterMode !== 'All' ? `Filter: ${filterMode}` : 'Filter'}
              </button>
              <button onClick={() => alert('Report exporting...')} className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-bold rounded-xl shadow-lg hover:bg-brand-500 transition-all">
                <Download className="w-4 h-4" /> Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-8 -mt-8 relative z-10 space-y-8">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
             <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-brand-50 rounded-2xl text-brand-600 group-hover:scale-110 transition-transform">
                 <DollarSign className="w-6 h-6" />
               </div>
               <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                 <TrendingUp className="w-3 h-3" /> +12.5%
               </span>
             </div>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
             <h3 className="text-3xl font-black text-slate-900 mt-1">₹45.2M</h3>
           </div>
           
           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
             <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform">
                 <CreditCard className="w-6 h-6" />
               </div>
             </div>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Fees Collected</p>
             <h3 className="text-3xl font-black text-slate-900 mt-1">₹38.5M</h3>
             <p className="text-xs text-slate-500 font-medium mt-2">85% of target</p>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
             <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 group-hover:scale-110 transition-transform">
                 <Activity className="w-6 h-6" />
               </div>
             </div>
             <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pending Dues</p>
             <h3 className="text-3xl font-black text-slate-900 mt-1">₹6.7M</h3>
             <p className="text-xs text-rose-500 font-medium mt-2">From 142 students</p>
           </div>

           <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-3xl shadow-lg border border-slate-700 text-white flex flex-col justify-between relative overflow-hidden">
             <div className="absolute -right-6 -top-6 w-24 h-24 bg-brand-500/30 rounded-full blur-2xl"></div>
             <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Action</p>
                <h3 className="text-xl font-bold mt-2 leading-snug">Send Fee Reminders to all pending students</h3>
             </div>
             <button disabled={remindersSent} onClick={() => setRemindersSent(true)} className={`w-full py-2.5 text-white text-sm font-bold rounded-xl mt-4 transition-colors ${remindersSent ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-brand-500 hover:bg-brand-400'}`}>
               {remindersSent ? 'Reminders Sent ✓' : 'Send Reminders'}
             </button>
           </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Transactions Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-extrabold text-slate-800">Recent Transactions</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by ID or Name..." 
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-all"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Transaction ID</th>
                    <th className="py-4 px-6">Student Details</th>
                    <th className="py-4 px-6">Date & Type</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedTransactions.length === 0 ? (
                    <tr><td colSpan="6" className="py-8 text-center text-slate-500 text-sm font-bold">No transactions found</td></tr>
                  ) : displayedTransactions.map((trx, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs font-bold text-slate-600">{trx.id}</td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-800 text-sm">{trx.student}</p>
                        <p className="text-xs text-slate-500 font-medium">{trx.course}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-slate-700">{trx.date}</p>
                        <p className="text-xs text-slate-500">{trx.type}</p>
                      </td>
                      <td className="py-4 px-6 font-bold text-slate-900">{trx.amount}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          trx.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                          trx.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                          'bg-rose-50 text-rose-700'
                        }`}>
                          {trx.status === 'Completed' && <CheckCircle className="w-3 h-3" />}
                          {trx.status === 'Pending' && <Clock className="w-3 h-3" />}
                          {trx.status === 'Failed' && <AlertCircle className="w-3 h-3" />}
                          {trx.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button onClick={() => alert(`Options for transaction ${trx.id}`)} className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
              <button onClick={() => setShowAllTransactions(!showAllTransactions)} className="text-sm font-bold text-brand-600 hover:text-brand-800">
                {showAllTransactions ? 'Show Less' : 'View All Transactions'}
              </button>
            </div>
          </div>

          {/* Revenue Analytics Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-800 mb-6">Revenue Breakdown</h2>
              
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-700">Tuition Fees</span>
                    <span className="text-slate-900">65%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-brand-500 h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-700">Hostel & Mess</span>
                    <span className="text-slate-900">20%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-700">Transport</span>
                    <span className="text-slate-900">10%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-slate-700">Other (Fines, Events)</span>
                    <span className="text-slate-900">5%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-50 rounded-3xl border border-brand-100 p-6 shadow-sm">
              <h2 className="text-sm font-extrabold text-brand-900 mb-2">Need Financial Assistance?</h2>
              <p className="text-xs text-brand-700 mb-4">Contact our banking partners directly through the portal for institution loans and grants.</p>
              <button onClick={() => alert('Connecting to banking partners...')} className="w-full py-2 bg-white text-brand-700 border border-brand-200 text-sm font-bold rounded-xl shadow-sm hover:bg-brand-100 transition-colors">
                Contact Partners
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
