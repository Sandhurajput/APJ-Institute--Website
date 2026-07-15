import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Eye, MoreHorizontal } from 'lucide-react';
import { getAnnouncements, saveAnnouncements } from '../data/announcementsData';

export default function AdminAnnouncements() {
  const navigate = useNavigate();
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [announcementsList, setAnnouncementsList] = useState([]);

  useEffect(() => {
    setAnnouncementsList(getAnnouncements());
  }, []);


  

  const handleLoadOlder = () => {
    setLoadingOlder(true);
    setTimeout(() => {
      const olderNotices = [
        {
          id: Date.now() + 1,
          title: "Library closed for renovation",
          date: "May 10, 2026",
          audience: "All Students",
          views: 450,
          image: null,
          tag: "Administrative"
        },
        {
          id: Date.now() + 2,
          title: "Sports Meet Registration Open",
          date: "May 05, 2026",
          audience: "All Students",
          views: 920,
          image: null,
          tag: "Event"
        }
      ];
      setAnnouncementsList(prev => {
        const updatedList = [...prev, ...olderNotices];
        saveAnnouncements(updatedList);
        return updatedList;
      });
      setLoadingOlder(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-4 md:p-8 font-sans">
      <div className="w-full h-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/admin-dashboard')}
              className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Announcements Studio</h1>
              <p className="text-sm text-slate-500 font-medium mt-1">Create, manage and track notices across the institution</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left column removed: compose form was intentionally removed */}

          {/* Right Column - Active Feed (full width) */}
          <div className="lg:col-span-12 space-y-6">
            <h2 className="text-xl font-extrabold text-slate-800">Recent Broadcasts</h2>
            
            <div className="space-y-4">
              {announcementsList.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                      item.tag === 'Event' ? 'bg-amber-100 text-amber-700' :
                      item.tag === 'Placement' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-brand-100 text-brand-700'
                    }`}>
                      {item.tag}
                    </span>
                    <button onClick={() => alert(`Options for announcement ${item.id}`)} className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  {item.image && (
                    <div className="w-full h-32 rounded-xl overflow-hidden mb-3">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {item.date}</span>
                    <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {item.audience}</span>
                    <span className="flex items-center gap-1.5 ml-auto"><Eye className="w-4 h-4 text-brand-400" /> {item.views}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleLoadOlder}
              disabled={loadingOlder}
              className="w-full py-3 border-2 border-slate-200 border-dashed rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 hover:text-brand-600 hover:border-brand-200 transition-all disabled:opacity-50 disabled:cursor-wait"
            >
              {loadingOlder ? "Loading..." : "Load Older Announcements"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
