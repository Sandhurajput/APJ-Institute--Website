import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/home/Navbar';
import Footer from '../components/home/Footer';

// Import all 25 new real campus images
import new1 from '../new1.jpeg';
import new2 from '../new2.jpeg';
import new3 from '../new3.jpeg';
import new4 from '../new4.png';
import new5 from '../new5.jpeg';
import new6 from '../new6.jpeg';
import new7 from '../new7.jpeg';
import new8 from '../new8.jpeg';
import new9 from '../new9.jpeg';
import new10 from '../new10.jpeg';
import new11 from '../new11.jpeg';
import new12 from '../new12.jpeg';
import new13 from '../new13.jpeg';
import new14 from '../new14.jpeg';
import new15 from '../new15.jpeg';
import new16 from '../new16.jpeg';
import new16_png from '../new16.png';
import new17 from '../new17.jpeg';
import new18 from '../new18.jpeg';
import new19 from '../new19.jpeg';
import new20 from '../new20.jpeg';
import new21 from '../new21.jpeg';
import new22 from '../new22.png';
import new24 from '../new24.jpeg';
import new25 from '../new25.jpeg';
import ghar from '../ghar.jpeg';
import ss from '../ss.jpeg';
import sss from '../sss.jpeg';

export default function CinematicGallery() {
  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 font-sans selection:bg-[#1e3a5f]/10 selection:text-[#1e3a5f] overflow-x-hidden">


      {/* Main Gallery Section */}
      <section className="relative overflow-hidden w-full p-0 m-0 pb-24">
        
        {/* Visual Concept Widescreen Header Block (Navy Blue Theme) */}
        <div className="flex flex-col items-center justify-center text-center pt-24 pb-16 relative z-10 px-4 bg-[#f8fafc]">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[#1e3a5f] text-6xl sm:text-7xl lg:text-9xl font-light tracking-[0.25em] leading-none select-none uppercase"
          >
            VISUAL
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-6 bg-[#1e3a5f]/10 px-6 py-2 rounded-md shadow-sm border border-[#1e3a5f]/20"
          >
            <span className="text-[#1e3a5f] text-xs sm:text-sm font-sans tracking-[0.15em] font-bold block">
              APJ GALLERY CONCEPT
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 font-sans tracking-wide"
          >
            Explore our state-of-the-art laboratory setups, modern campus classrooms, and vibrant student activities. Take a virtual walkthrough of our clinical learning environment.
          </motion.p>
        </div>

        {/* Four Floating Stories Circles Row (Navy Blue Theme) */}
        <div className="w-full flex justify-center bg-[#f8fafc] pb-20 relative z-10 px-4">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 max-w-5xl">
            {/* Circle 1: Split Vertical (B&W portrait / Navy Blue text block) */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-[#1e3a5f]/20 shadow-lg flex relative cursor-pointer"
            >
              <div className="w-1/2 h-full bg-[#f8fafc] overflow-hidden">
                <img src={new1} className="w-full h-full object-cover object-top grayscale brightness-90 contrast-125" alt="Stories 1" />
              </div>
              <div className="w-1/2 h-full bg-[#1e3a5f] flex flex-col justify-center px-1.5 text-left select-none">
                <span className="text-[7.5px] sm:text-[9px] text-[#93c5fd] font-black font-sans leading-none tracking-widest uppercase">
                  CAMPUS
                </span>
                <span className="text-[7.5px] sm:text-[9px] text-[#93c5fd] font-black font-sans leading-none tracking-widest uppercase mt-0.5">
                  LIFE
                </span>
              </div>
            </motion.div>

            {/* Circle 2: Portrait with navy backdrop */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-[#1e3a5f]/20 shadow-lg relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#1e3a5f]/40 mix-blend-multiply z-10" />
              <img src={new2} className="w-full h-full object-cover object-top contrast-110 brightness-95" alt="Stories 2" />
            </motion.div>

            {/* Circle 3: Solid Navy Circle with "REVIEWS" */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-2 border-[#1e3a5f]/20 shadow-lg bg-[#1e3a5f] flex items-center justify-center select-none cursor-pointer"
            >
              <span className="text-[#93c5fd] text-[10px] sm:text-[11px] lg:text-xs font-black font-sans tracking-[0.18em] uppercase">
                REVIEWS
              </span>
            </motion.div>

            {/* Circle 4: Quilted Navy Texture with "APJ INST." */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-[#1e3a5f]/20 shadow-lg relative flex items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#1e3a5f]/85 mix-blend-multiply z-0" />
              <img src={new3} className="absolute w-full h-full object-cover scale-150 grayscale blur-[1px] opacity-75" alt="Stories 4" />
              <span className="relative z-10 text-[#93c5fd] text-[10px] sm:text-[11px] lg:text-xs font-serif font-bold tracking-[0.25em] uppercase">
                APJ INST.
              </span>
            </motion.div>
          </div>
        </div>

        {/* 100% Filled Edge-to-Edge Grid Collage Sections */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 p-0 m-0 border-t border-l border-slate-200/60 relative z-10 bg-white">
          
          {/* GRID 1: Campus Life (new5 to new11) */}
          
          {/* Card 1: APJ INST Typography Block */}
          <div className="bg-white p-8 sm:p-12 relative overflow-hidden border-r border-b border-slate-200/60 flex flex-col justify-center items-center h-[380px] hover:bg-slate-50 transition duration-300">
            <div className="text-center select-none">
              <h3 className="font-serif text-[#1e3a5f] text-5xl sm:text-6xl font-light tracking-[0.2em] uppercase leading-none">
                APJ
              </h3>
              <h3 className="font-serif text-[#1e3a5f] text-4xl sm:text-5xl font-light tracking-[0.12em] uppercase leading-none mt-3">
                INST.
              </h3>
              <div className="h-[1px] w-12 bg-slate-300 mx-auto my-6" />
              <p className="text-[9.5px] sm:text-[10.5px] text-slate-500 font-sans tracking-[0.1em] font-bold uppercase">
                Education with Purpose
              </p>
            </div>
          </div>

          {/* Card 2: High-Contrast Student Portrait */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group cursor-pointer">
            <div className="absolute inset-0 bg-[#1e3a5f]/15 mix-blend-multiply z-10 group-hover:bg-transparent transition duration-500" />
            <img src={new5} className="w-full h-full object-cover object-top grayscale brightness-90 contrast-125 transition duration-700 group-hover:scale-105" alt="Grid 1 Card 2" />
          </div>

          {/* Card 3: Navy Blue "CAMPUS LIFE" Vertical Showcase */}
          <div className="bg-[#1e3a5f] p-6 sm:p-8 relative overflow-hidden border-r border-b border-slate-200/60 flex h-[380px] justify-between items-center hover:bg-[#152a45] transition duration-300">
            <div className="h-full flex items-center select-none pt-8">
              <span className="font-serif italic text-white text-2xl sm:text-3xl tracking-[0.05em] block transform -rotate-90 origin-left whitespace-nowrap opacity-90 uppercase">
                CAMPUS LIFE
              </span>
            </div>
            <div className="w-[58%] h-[85%] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
              <div className="absolute inset-0 bg-[#1e3a5f]/20 mix-blend-color z-10" />
              <img src={new6} className="w-full h-full object-cover object-top contrast-110 brightness-95" alt="Grid 1 Card 3" />
            </div>
          </div>

          {/* Card 4: Manifesto Overlay */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group flex flex-col justify-end p-6 cursor-pointer">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <img src={new7} className="w-full h-full object-cover object-top contrast-115 brightness-90 group-hover:scale-105 transition duration-700" alt="Grid 1 Card 4" />
            </div>
            <div className="relative z-20 select-none max-w-xs">
              <p className="text-[10px] sm:text-[11px] text-white font-sans font-black uppercase tracking-[0.15em] leading-relaxed text-left drop-shadow-sm">
                Empowering clinical safety, nursing values, and medical care excellence
              </p>
            </div>
          </div>

          {/* Card 5: Navy Blue Logo Block with background */}
          <div className="bg-[#1e3a5f] p-8 relative overflow-hidden border-r border-b border-slate-200/60 flex flex-col justify-center items-center h-[380px] hover:bg-[#152a45] transition duration-300 select-none">
            <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-cover bg-center" style={{ backgroundImage: `url(${new8})` }} />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/95 via-[#15305b]/98 to-black/90 z-0" />
            <h4 className="relative z-10 font-serif text-white text-3xl sm:text-4xl font-light tracking-[0.15em] uppercase">
              APJ INSTITUTE
            </h4>
          </div>

          {/* Card 6: Philosophy & Image Layout */}
          <div className="bg-white p-6 sm:p-8 relative overflow-hidden border-r border-b border-slate-200/60 flex h-[380px] justify-between items-center hover:bg-slate-50 transition duration-300">
            <div className="w-[50%] flex flex-col justify-between h-[85%] py-2 text-left">
              <p className="text-[9.5px] sm:text-[10.5px] text-slate-500 font-sans leading-relaxed text-justify tracking-wide font-medium">
                Providing comprehensive healthcare credentials, nursing diagnostics facilities, and bedside training programs to form expert clinical specialists.
              </p>
              <span className="font-serif italic text-[#1e3a5f] text-[11px] sm:text-xs font-black tracking-widest mt-4 uppercase block">
                APJ INSTITUTE
              </span>
            </div>
            <div className="w-[45%] h-[80%] rounded-2xl overflow-hidden border border-slate-100 shadow-md">
              <img src={new9} className="w-full h-full object-cover contrast-110 brightness-95" alt="Grid 1 Card 6" />
            </div>
          </div>

          {/* Card 7: High-Contrast Close-up Portrait */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group cursor-pointer">
            <div className="absolute inset-0 bg-[#1e3a5f]/15 mix-blend-multiply z-10 group-hover:bg-transparent transition duration-500" />
            <img src={new10} className="w-full h-full object-cover object-top grayscale brightness-90 contrast-125 transition duration-700 group-hover:scale-105" alt="Grid 1 Card 7" />
          </div>

          {/* Card 8: APJ Campuses Showcase */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group flex flex-col justify-between p-6 sm:p-8 cursor-pointer">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 z-10" />
              <img src={new11} className="w-full h-full object-cover object-top contrast-115 brightness-90 group-hover:scale-105 transition duration-700" alt="Grid 1 Card 8" />
            </div>
            <div className="relative z-20 text-left select-none">
              <h4 className="font-serif text-white text-3xl sm:text-4xl font-light leading-none tracking-wide">
                APJ
              </h4>
              <h4 className="font-serif text-white text-3xl sm:text-4xl font-light leading-none tracking-wide mt-1">
                Campuses
              </h4>
            </div>
          </div>

          {/* Card 9: Solid Navy Manifesto */}
          <div className="bg-[#1e3a5f] p-8 sm:p-10 relative overflow-hidden border-r border-b border-slate-200/60 flex flex-col justify-center items-left text-left h-[380px] hover:bg-[#152a45] transition duration-300 select-none">
            <h4 className="font-serif text-[#93c5fd] text-2xl sm:text-3xl font-light tracking-[0.15em] uppercase leading-none mb-6">
              APJ INSTITUTE
            </h4>
            <p className="text-[10px] sm:text-[11px] text-blue-100/80 font-sans leading-relaxed tracking-wider text-justify">
              Developing compassionate paramedical experts and pioneering future healthcare champions through exceptional learning systems.
            </p>
          </div>

          {/* GRID 2: Academic Excellence (new12 to new18) */}
          
          {/* Card 10: APJ INST Typography Block */}
          <div className="bg-white p-8 sm:p-12 relative overflow-hidden border-r border-b border-slate-200/60 flex flex-col justify-center items-center h-[380px] hover:bg-slate-50 transition duration-300">
            <div className="text-center select-none">
              <h3 className="font-serif text-[#1e3a5f] text-5xl sm:text-6xl font-light tracking-[0.2em] uppercase leading-none">
                STATE
              </h3>
              <h3 className="font-serif text-[#1e3a5f] text-4xl sm:text-5xl font-light tracking-[0.12em] uppercase leading-none mt-3">
                LABS
              </h3>
              <div className="h-[1px] w-12 bg-slate-300 mx-auto my-6" />
              <p className="text-[9.5px] sm:text-[10.5px] text-slate-500 font-sans tracking-[0.1em] font-bold uppercase">
                Hands-on Clinical Skill
              </p>
            </div>
          </div>

          {/* Card 11: High-Contrast Student Portrait */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group cursor-pointer">
            <div className="absolute inset-0 bg-[#1e3a5f]/15 mix-blend-multiply z-10 group-hover:bg-transparent transition duration-500" />
            <img src={new12} className="w-full h-full object-cover object-top grayscale brightness-90 contrast-125 transition duration-700 group-hover:scale-105" alt="Grid 2 Card 2" />
          </div>

          {/* Card 12: Navy Blue "EXCELLENCE" Vertical Showcase */}
          <div className="bg-[#1e3a5f] p-6 sm:p-8 relative overflow-hidden border-r border-b border-slate-200/60 flex h-[380px] justify-between items-center hover:bg-[#152a45] transition duration-300">
            <div className="h-full flex items-center select-none pt-8">
              <span className="font-serif italic text-white text-2xl sm:text-3xl tracking-[0.05em] block transform -rotate-90 origin-left whitespace-nowrap opacity-90 uppercase">
                EXCELLENCE
              </span>
            </div>
            <div className="w-[58%] h-[85%] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
              <div className="absolute inset-0 bg-[#1e3a5f]/20 mix-blend-color z-10" />
              <img src={new13} className="w-full h-full object-cover object-top contrast-110 brightness-95" alt="Grid 2 Card 3" />
            </div>
          </div>

          {/* Card 13: Manifesto Overlay */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group flex flex-col justify-end p-6 cursor-pointer">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <img src={new14} className="w-full h-full object-cover object-top contrast-115 brightness-90 group-hover:scale-105 transition duration-700" alt="Grid 2 Card 4" />
            </div>
            <div className="relative z-20 select-none max-w-xs">
              <p className="text-[10px] sm:text-[11px] text-white font-sans font-black uppercase tracking-[0.15em] leading-relaxed text-left drop-shadow-sm">
                Modern laboratory diagnostics, PCR testing, and clinical compounding pathways
              </p>
            </div>
          </div>

          {/* Card 14: Navy Blue Logo Block with background */}
          <div className="bg-[#1e3a5f] p-8 relative overflow-hidden border-r border-b border-slate-200/60 flex flex-col justify-center items-center h-[380px] hover:bg-[#152a45] transition duration-300 select-none">
            <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-cover bg-center" style={{ backgroundImage: `url(${new15})` }} />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/95 via-[#15305b]/98 to-black/90 z-0" />
            <h4 className="relative z-10 font-serif text-white text-3xl sm:text-4xl font-light tracking-[0.15em] uppercase">
              PIONEERING CARE
            </h4>
          </div>

          {/* Card 15: Philosophy & Image Layout */}
          <div className="bg-white p-6 sm:p-8 relative overflow-hidden border-r border-b border-slate-200/60 flex h-[380px] justify-between items-center hover:bg-slate-50 transition duration-300">
            <div className="w-[50%] flex flex-col justify-between h-[85%] py-2 text-left">
              <p className="text-[9.5px] sm:text-[10.5px] text-slate-500 font-sans leading-relaxed text-justify tracking-wide font-medium">
                Experience industry-ready practical coaching and personalized mentorship in active hospital clinics.
              </p>
              <span className="font-serif italic text-[#1e3a5f] text-[11px] sm:text-xs font-black tracking-widest mt-4 uppercase block">
                APJ INSTITUTE
              </span>
            </div>
            <div className="w-[45%] h-[80%] rounded-2xl overflow-hidden border border-slate-100 shadow-md">
              <img src={new16} className="w-full h-full object-cover contrast-110 brightness-95" alt="Grid 2 Card 6" />
            </div>
          </div>

          {/* Card 16: High-Contrast Close-up Portrait */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group cursor-pointer">
            <div className="absolute inset-0 bg-[#1e3a5f]/15 mix-blend-multiply z-10 group-hover:bg-transparent transition duration-500" />
            <img src={new16_png} className="w-full h-full object-cover object-top grayscale brightness-90 contrast-125 transition duration-700 group-hover:scale-105" alt="Grid 2 Card 7" />
          </div>

          {/* Card 17: APJ Campuses Showcase */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group flex flex-col justify-between p-6 sm:p-8 cursor-pointer">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 z-10" />
              <img src={new17} className="w-full h-full object-cover object-top contrast-115 brightness-90 group-hover:scale-105 transition duration-700" alt="Grid 2 Card 8" />
            </div>
            <div className="relative z-20 text-left select-none">
              <h4 className="font-serif text-white text-3xl sm:text-4xl font-light leading-none tracking-wide">
                STUDENT
              </h4>
              <h4 className="font-serif text-white text-3xl sm:text-4xl font-light leading-none tracking-wide mt-1">
                SUCCESS
              </h4>
            </div>
          </div>

          {/* Card 18: Solid Navy Manifesto */}
          <div className="bg-[#1e3a5f] p-8 sm:p-10 relative overflow-hidden border-r border-b border-slate-200/60 flex flex-col justify-center items-left text-left h-[380px] hover:bg-[#152a45] transition duration-300 select-none">
            <h4 className="font-serif text-[#93c5fd] text-2xl sm:text-3xl font-light tracking-[0.15em] uppercase leading-none mb-6">
              APJ INSTITUTE
            </h4>
            <p className="text-[10px] sm:text-[11px] text-blue-100/80 font-sans leading-relaxed tracking-wider text-justify">
              Nurturing clinical compassion and academic commitment in paramedical sciences.
            </p>
          </div>

          {/* GRID 3: Alumni & Placement (new18 to new25) */}
          
          {/* Card 19: APJ INST Typography Block */}
          <div className="bg-white p-8 sm:p-12 relative overflow-hidden border-r border-b border-slate-200/60 flex flex-col justify-center items-center h-[380px] hover:bg-slate-50 transition duration-300">
            <div className="text-center select-none">
              <h3 className="font-serif text-[#1e3a5f] text-5xl sm:text-6xl font-light tracking-[0.2em] uppercase leading-none">
                GLOBAL
              </h3>
              <h3 className="font-serif text-[#1e3a5f] text-4xl sm:text-5xl font-light tracking-[0.12em] uppercase leading-none mt-3">
                ALUMNI
              </h3>
              <div className="h-[1px] w-12 bg-slate-300 mx-auto my-6" />
              <p className="text-[9.5px] sm:text-[10.5px] text-slate-500 font-sans tracking-[0.1em] font-bold uppercase">
                Leading Care Worldwide
              </p>
            </div>
          </div>

          {/* Card 20: High-Contrast Student Portrait */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group cursor-pointer">
            <div className="absolute inset-0 bg-[#1e3a5f]/15 mix-blend-multiply z-10 group-hover:bg-transparent transition duration-500" />
            <img src={new18} className="w-full h-full object-cover object-top grayscale brightness-90 contrast-125 transition duration-700 group-hover:scale-105" alt="Grid 3 Card 2" />
          </div>

          {/* Card 21: Navy Blue "SUCCESS" Vertical Showcase */}
          <div className="bg-[#1e3a5f] p-6 sm:p-8 relative overflow-hidden border-r border-b border-slate-200/60 flex h-[380px] justify-between items-center hover:bg-[#152a45] transition duration-300">
            <div className="h-full flex items-center select-none pt-8">
              <span className="font-serif italic text-white text-2xl sm:text-3xl tracking-[0.05em] block transform -rotate-90 origin-left whitespace-nowrap opacity-90 uppercase">
                SUCCESS
              </span>
            </div>
            <div className="w-[58%] h-[85%] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
              <div className="absolute inset-0 bg-[#1e3a5f]/20 mix-blend-color z-10" />
              <img src={new19} className="w-full h-full object-cover object-top contrast-110 brightness-95" alt="Grid 3 Card 3" />
            </div>
          </div>

          {/* Card 22: Manifesto Overlay */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group flex flex-col justify-end p-6 cursor-pointer">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <img src={new20} className="w-full h-full object-cover object-top contrast-115 brightness-90 group-hover:scale-105 transition duration-700" alt="Grid 3 Card 4" />
            </div>
            <div className="relative z-20 select-none max-w-xs">
              <p className="text-[10px] sm:text-[11px] text-white font-sans font-black uppercase tracking-[0.15em] leading-relaxed text-left drop-shadow-sm">
                Direct placement linkages with leading hospitals and diagnostic networks
              </p>
            </div>
          </div>

          {/* Card 23: Navy Blue Logo Block with background */}
          <div className="bg-[#1e3a5f] p-8 relative overflow-hidden border-r border-b border-slate-200/60 flex flex-col justify-center items-center h-[380px] hover:bg-[#152a45] transition duration-300 select-none">
            <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-cover bg-center" style={{ backgroundImage: `url(${new21})` }} />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/95 via-[#15305b]/98 to-black/90 z-0" />
            <h4 className="relative z-10 font-serif text-white text-3xl sm:text-4xl font-light tracking-[0.15em] uppercase">
              LEADERSHIP
            </h4>
          </div>

          {/* Card 24: Philosophy & Image Layout */}
          <div className="bg-white p-6 sm:p-8 relative overflow-hidden border-r border-b border-slate-200/60 flex h-[380px] justify-between items-center hover:bg-slate-50 transition duration-300">
            <div className="w-[50%] flex flex-col justify-between h-[85%] py-2 text-left">
              <p className="text-[9.5px] sm:text-[10.5px] text-slate-500 font-sans leading-relaxed text-justify tracking-wide font-medium">
                Empowering students with career-oriented training and job-ready healthcare skills for immediate integration.
              </p>
              <span className="font-serif italic text-[#1e3a5f] text-[11px] sm:text-xs font-black tracking-widest mt-4 uppercase block">
                APJ INSTITUTE
              </span>
            </div>
            <div className="w-[45%] h-[80%] rounded-2xl overflow-hidden border border-slate-100 shadow-md">
              <img src={new22} className="w-full h-full object-cover contrast-110 brightness-95" alt="Grid 3 Card 6" />
            </div>
          </div>

          {/* Card 25: High-Contrast Close-up Portrait */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group cursor-pointer">
            <div className="absolute inset-0 bg-[#1e3a5f]/15 mix-blend-multiply z-10 group-hover:bg-transparent transition duration-500" />
            <img src={new24} className="w-full h-full object-cover object-top grayscale brightness-90 contrast-125 transition duration-700 group-hover:scale-105" alt="Grid 3 Card 7" />
          </div>

          {/* Card 26: APJ Campuses Showcase */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group flex flex-col justify-between p-6 sm:p-8 cursor-pointer">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 z-10" />
              <img src={new25} className="w-full h-full object-cover object-top contrast-115 brightness-90 group-hover:scale-105 transition duration-700" alt="Grid 3 Card 8" />
            </div>
            <div className="relative z-20 text-left select-none">
              <h4 className="font-serif text-white text-3xl sm:text-4xl font-light leading-none tracking-wide">
                CAMPUS
              </h4>
              <h4 className="font-serif text-white text-3xl sm:text-4xl font-light leading-none tracking-wide mt-1">
                TOUR
              </h4>
            </div>
          </div>

          {/* Card 27: Solid Navy Manifesto */}
          <div className="bg-[#1e3a5f] p-8 sm:p-10 relative overflow-hidden border-r border-b border-slate-200/60 flex flex-col justify-center items-left text-left h-[380px] hover:bg-[#152a45] transition duration-300 select-none">
            <h4 className="font-serif text-[#93c5fd] text-2xl sm:text-3xl font-light tracking-[0.15em] uppercase leading-none mb-6">
              APJ INSTITUTE
            </h4>
            <p className="text-[10px] sm:text-[11px] text-blue-100/80 font-sans leading-relaxed tracking-wider text-justify">
              Guiding scholars towards a brighter professional medical career and creating medical leaders.
            </p>
          </div>

          {/* Card 28: Campus Building Showcase (ghar) */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group flex flex-col justify-between p-6 sm:p-8 cursor-pointer">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 z-10" />
              <img src={ghar} className="w-full h-full object-cover object-center contrast-110 brightness-90 group-hover:scale-105 transition duration-700" alt="Grid 3 Card 9" />
            </div>
            <div className="relative z-20 text-left select-none">
              <h4 className="font-serif text-white text-3xl sm:text-4xl font-light leading-none tracking-wide">
                MAIN
              </h4>
              <h4 className="font-serif text-white text-3xl sm:text-4xl font-light leading-none tracking-wide mt-1">
                CAMPUS
              </h4>
            </div>
          </div>

          {/* Card 29: Philosophy & Image Layout (ss) */}
          <div className="bg-white p-6 sm:p-8 relative overflow-hidden border-r border-b border-slate-200/60 flex h-[380px] justify-between items-center hover:bg-slate-50 transition duration-300">
            <div className="w-[50%] flex flex-col justify-between h-[85%] py-2 text-left">
              <p className="text-[9.5px] sm:text-[10.5px] text-slate-500 font-sans leading-relaxed text-justify tracking-wide font-medium">
                Modern medical machinery and practice gear ensuring that all paramedical scholars gain real-time diagnostics familiarity.
              </p>
              <span className="font-serif italic text-[#1e3a5f] text-[11px] sm:text-xs font-black tracking-widest mt-4 uppercase block">
                APJ INSTITUTE
              </span>
            </div>
            <div className="w-[45%] h-[80%] rounded-2xl overflow-hidden border border-slate-100 shadow-md">
              <img src={ss} className="w-full h-full object-cover contrast-110 brightness-95" alt="Grid 3 Card 10" />
            </div>
          </div>

          {/* Card 30: High-Contrast Close-up Portrait (sss) */}
          <div className="bg-white relative overflow-hidden border-r border-b border-slate-200/60 h-[380px] group cursor-pointer">
            <div className="absolute inset-0 bg-[#1e3a5f]/15 mix-blend-multiply z-10 group-hover:bg-transparent transition duration-500" />
            <img src={sss} className="w-full h-full object-cover object-center grayscale brightness-90 contrast-125 transition duration-700 group-hover:scale-105" alt="Grid 3 Card 11" />
          </div>

        </div>

      </section>

    </div>
  );
}
