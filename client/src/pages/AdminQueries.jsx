import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Paperclip, Send, MoreVertical, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { getQueries, saveQueries, getReplies, saveReplies } from '../data/queriesData';

export default function AdminQueries() {
  const navigate = useNavigate();
  const [activeQuery, setActiveQuery] = useState(1);
  const [filterMode, setFilterMode] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState({});
  const fileInputRef = useRef(null);
  const [attachment, setAttachment] = useState(null);

  const [queriesList, setQueriesList] = useState([]);

  useEffect(() => {
    setQueriesList(getQueries());
    setReplies(getReplies());
  }, []);



  const filteredQueries = queriesList.filter(q => {
    const matchesFilter = filterMode === 'All' || q.status === filterMode.toLowerCase();
    const matchesSearch = q.student.toLowerCase().includes(searchQuery.toLowerCase()) || q.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeTicket = queriesList.find(q => q.id === activeQuery);

  const handleResolve = () => {
    setQueriesList(prev => {
      const updated = prev.map(q => q.id === activeQuery ? { ...q, status: 'resolved' } : q);
      saveQueries(updated);
      return updated;
    });
  };

  const handleSendReply = () => {
    if (!replyText.trim() && !attachment) return;
    const newReply = { 
      text: replyText, 
      time: "Just now", 
      admin: "Admin User",
      attachment: attachment ? attachment.name : null
    };
    setReplies(prev => {
      const updated = {
        ...prev,
        [activeQuery]: [...(prev[activeQuery] || []), newReply]
      };
      saveReplies(updated);
      return updated;
    });
    setReplyText('');
    setAttachment(null);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col h-screen overflow-hidden">
      {/* Top Bar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin-dashboard')}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">Student Support Desk</h1>
            <p className="text-xs text-slate-500 font-medium">Manage and resolve student queries</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
             <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
             <span className="text-xs font-bold text-slate-600">12 Online Admins</span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar - Ticket List */}
        <div className="w-full md:w-96 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-slate-100 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tickets or names..." 
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 focus:bg-white transition-colors"
                />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              <button onClick={() => setFilterMode('All')} className={`whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${filterMode === 'All' ? 'bg-brand-50 text-brand-700 border-brand-100' : 'hover:bg-slate-50 text-slate-600 border-slate-200'}`}>All</button>
              <button onClick={() => setFilterMode('Open')} className={`whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${filterMode === 'Open' ? 'bg-brand-50 text-brand-700 border-brand-100' : 'hover:bg-slate-50 text-slate-600 border-slate-200'}`}>Open</button>
              <button onClick={() => setFilterMode('Resolved')} className={`whitespace-nowrap px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${filterMode === 'Resolved' ? 'bg-brand-50 text-brand-700 border-brand-100' : 'hover:bg-slate-50 text-slate-600 border-slate-200'}`}>Resolved</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredQueries.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm font-bold">No tickets found.</div>
            ) : filteredQueries.map((q) => (
              <div 
                key={q.id}
                onClick={() => setActiveQuery(q.id)}
                className={`p-4 border-b border-slate-100 cursor-pointer transition-all ${
                  activeQuery === q.id ? 'bg-brand-50/50 border-l-4 border-l-brand-600' : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      q.id === 1 ? 'bg-brand-500' : q.id === 2 ? 'bg-pink-500' : 'bg-purple-500'
                    }`}>
                      {q.avatar}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-none">{q.student}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">{q.course}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">{q.time}</span>
                </div>
                <h5 className="text-xs font-bold text-slate-800 mb-1">{q.subject}</h5>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{q.preview}</p>
                
                <div className="flex items-center gap-2 mt-3">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 ${
                    q.status === 'open' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {q.status === 'open' ? <Clock className="w-2.5 h-2.5" /> : <CheckCircle className="w-2.5 h-2.5" />}
                    {q.status}
                  </span>
                  {q.priority === 'high' && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-700 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5" /> High Priority
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Area - Chat/Ticket View */}
        <div className="flex-1 flex flex-col bg-slate-50/50">
          
          {/* Chat Header */}
          <div className="p-6 bg-white border-b border-slate-200 flex justify-between items-start shadow-sm z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase tracking-wide">
                  {activeTicket?.status === 'open' ? 'Open Ticket' : 'Resolved Ticket'} #TCK-0{activeTicket?.id}
                </span>
                <span className="text-xs text-slate-400 font-medium">Created {activeTicket?.time}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{activeTicket?.subject}</h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => alert('Ticket assigned!')} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors">Assign</button>
              {activeTicket?.status === 'open' && (
                <button onClick={handleResolve} className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-xl shadow-md hover:bg-emerald-700 transition-colors flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Resolve
                </button>
              )}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Student Message */}
            <div className="flex gap-4 w-full">
              <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold flex-shrink-0">R</div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-slate-900 text-sm">Rahul Verma</span>
                  <span className="text-[10px] text-slate-400 font-medium">10:15 AM</span>
                </div>
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm text-sm text-slate-700 leading-relaxed">
                  <p>{activeTicket?.preview}</p>
                  
                  {/* Attachment Mock (only for first ticket as example) */}
                  {activeTicket?.id === 1 && (
                  <div className="mt-4 flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 w-fit">
                    <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center">
                       <Paperclip className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">bank_statement.pdf</p>
                      <p className="text-[10px] text-slate-500">1.2 MB</p>
                    </div>
                  </div>
                  )}
                </div>
              </div>
            </div>

            {/* System Auto Reply */}
            <div className="flex justify-center">
              <span className="px-3 py-1 bg-slate-200/50 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                System assigned ticket to Admin User
              </span>
            </div>

            {/* Admin Replies */}
            {(replies[activeQuery] || []).map((reply, idx) => (
              <div key={idx} className="flex gap-4 w-full justify-end">
                <div>
                  <div className="flex items-baseline gap-2 mb-1 justify-end">
                    <span className="text-[10px] text-slate-400 font-medium">{reply.time}</span>
                    <span className="font-bold text-slate-900 text-sm">{reply.admin}</span>
                  </div>
                  <div className="bg-brand-600 p-4 rounded-2xl rounded-tr-none shadow-sm text-sm text-white leading-relaxed">
                    {reply.text && <p>{reply.text}</p>}
                    {reply.attachment && (
                      <div className="mt-3 flex items-center gap-3 p-3 bg-brand-500 rounded-xl border border-brand-400 w-fit">
                        <div className="w-8 h-8 bg-brand-700 text-white rounded-lg flex items-center justify-center">
                           <Paperclip className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{reply.attachment}</p>
                          <p className="text-[10px] text-brand-100">Attachment</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {reply.admin[0]}
                </div>
              </div>
            ))}

          </div>

          {/* Reply Box */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all shadow-sm">
               <textarea 
                 rows="3" 
                 value={replyText}
                 onChange={(e) => setReplyText(e.target.value)}
                 onKeyDown={(e) => {
                   if(e.key === 'Enter' && !e.shiftKey) {
                     e.preventDefault();
                     handleSendReply();
                   }
                 }}
                 placeholder={`Type your reply to ${activeTicket?.student.split(' ')[0]}...`}
                 className="w-full bg-transparent p-3 outline-none text-sm resize-none text-slate-800"
               ></textarea>
               <div className="flex justify-between items-center px-2 pb-1">
                 <div className="flex gap-1 items-center">
                   <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                   <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors" title="Attach file">
                     <Paperclip className="w-4 h-4" />
                   </button>
                   {attachment && (
                     <div className="flex items-center gap-2 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                       <span className="text-xs font-bold text-brand-700 truncate max-w-[150px]">{attachment.name}</span>
                       <button onClick={() => setAttachment(null)} className="text-brand-400 hover:text-brand-600 font-bold">&times;</button>
                     </div>
                   )}
                 </div>
                 <button onClick={handleSendReply} className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 text-white text-sm font-bold rounded-xl hover:bg-brand-700 transition-colors">
                   Send Reply <Send className="w-4 h-4" />
                 </button>
               </div>
            </div>
            <p className="text-center text-[10px] text-slate-400 font-medium mt-3">Press Enter to send, Shift + Enter for new line.</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
