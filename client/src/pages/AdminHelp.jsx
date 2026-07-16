import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, FileText, LifeBuoy, Search, Mail, Phone, ChevronDown, Video } from 'lucide-react';
import helpBanner from '../institte.webp';

export default function AdminHelp() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [sending, setSending] = useState(false);

  const faqs = [
    {
      q: "How do I add a new student manually?",
      a: "Navigate to the Admissions tab from the dashboard sidebar. Click on the '+ Add Student' button in the top right corner. Fill out the comprehensive form including personal details, academic history, and initial fee payment, then click 'Save Record'."
    },
    {
      q: "Can I export financial reports for a specific time period?",
      a: "Yes, go to the Fees & Finance page. Click the 'Filter' button to set your desired date range (e.g., Last 30 Days, Q1 2026). Then click the 'Export Report' button to download a formatted CSV or PDF file containing the filtered data."
    },
    {
      q: "How do I reset a staff member's password?",
      a: "Currently, staff password resets require Super Admin privileges. Go to Settings > Team Members, locate the staff account, click the options menu (three dots), and select 'Send Password Reset Link'."
    },
    {
      q: "What file types are supported for announcements?",
      a: "When posting an announcement, you can attach images (JPEG, PNG, WEBP - max 5MB) and documents (PDF, DOCX - max 10MB). Inline images via the rich text editor are also supported."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setMessageSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16 font-sans">
      
      {/* Help Hero Section */}
      <div className="relative h-80 w-full bg-brand-900 overflow-hidden">
        <div className="absolute inset-0 bg-brand-900 opacity-90"></div>
        <img src={helpBanner} alt="Help Center" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-900/90"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full px-8 text-center pt-10">
          <button 
            onClick={() => navigate('/admin-dashboard')}
            className="absolute top-8 left-8 flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md text-white rounded-lg hover:bg-white/20 transition-colors text-sm font-semibold border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 drop-shadow-md">
            How can we help you today?
          </h1>
          <p className="text-brand-200 text-lg mb-8 max-w-2xl">Search for guides, tutorials, and answers to common questions about managing the APJ Institute portal.</p>
          
          <div className="relative w-full lg:w-3/4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics, or keywords..." 
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl text-base shadow-xl outline-none focus:ring-4 focus:ring-brand-500/30 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-brand-600 text-white font-bold text-sm rounded-xl hover:bg-brand-700 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-8 -mt-10 relative z-10 space-y-12">
        
        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
               <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all">
                  <FileText className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">User Guides</h3>
               <p className="text-sm text-slate-500 leading-relaxed">Step-by-step documentation on how to use every feature in the admin panel.</p>
               <div onClick={() => alert('Opening User Guides...')} className="mt-4 text-brand-600 text-sm font-bold flex items-center gap-1 group-hover:underline">
                 Browse Guides &rarr;
               </div>
           </div>
           
           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
               <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <Video className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">Video Tutorials</h3>
               <p className="text-sm text-slate-500 leading-relaxed">Watch quick 2-minute videos demonstrating common administrative workflows.</p>
               <div onClick={() => alert('Opening Video Tutorials...')} className="mt-4 text-emerald-600 text-sm font-bold flex items-center gap-1 group-hover:underline">
                 Watch Videos &rarr;
               </div>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group">
               <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all">
                  <LifeBuoy className="w-7 h-7" />
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">Direct Support</h3>
               <p className="text-sm text-slate-500 leading-relaxed">Facing a critical issue? Open a priority ticket with our technical engineering team.</p>
               <div onClick={() => alert('Connecting to Tech Team...')} className="mt-4 text-rose-600 text-sm font-bold flex items-center gap-1 group-hover:underline">
                 Contact Tech Team &rarr;
               </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* FAQ Accordion */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-brand-600" /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
                {filteredFaqs.length === 0 ? (
                  <p className="text-slate-500 text-sm font-medium">No results found for "{searchQuery}".</p>
                ) : filteredFaqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === idx ? 'border-brand-200 bg-brand-50/30' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                  >
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                    >
                      <span className="font-bold text-slate-800">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-brand-600' : ''}`} />
                    </button>
                    <div 
                      className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Contact Support Form */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-full -z-10"></div>
             <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Still need help?</h2>
             <p className="text-sm text-slate-500 mb-8">Send us a message and our support team will get back to you within 24 hours.</p>
             {messageSent ? (
               <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                 <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                   <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                 </div>
                 <h3 className="text-xl font-bold text-slate-800">Message Sent!</h3>
                 <p className="text-sm text-slate-500">Our engineering team has received your request. We'll be in touch soon.</p>
                 <button onClick={() => setMessageSent(false)} className="mt-4 text-sm font-bold text-brand-600 hover:underline">Send another message</button>
               </div>
             ) : (
             <form onSubmit={handleSendMessage} className="space-y-5">
               <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5 block">Your Name</label>
                  <input required type="text" defaultValue="Admin User" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 transition-all" />
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5 block">Email Address</label>
                  <input required type="email" defaultValue="admin@apjinstitute.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 transition-all" />
               </div>
               <div>
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1.5 block">Describe the issue</label>
                  <textarea required rows="4" placeholder="How can we help you?" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-brand-500 transition-all resize-none"></textarea>
               </div>
               <button disabled={sending} type="submit" className="w-full py-3.5 bg-brand-600 text-white font-bold rounded-xl shadow-lg shadow-brand-200 hover:bg-brand-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-wait">
                 {sending ? 'Sending...' : <><Mail className="w-4 h-4" /> Send Message</>}
               </button>
             </form>
             )}
             
             <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <Phone className="w-4 h-4 text-brand-500" /> +91 98765 43210
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <Mail className="w-4 h-4 text-brand-500" /> support@apjinstitute.com
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
