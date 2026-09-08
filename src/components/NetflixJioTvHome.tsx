import React, { useState } from 'react';
import { NavTab, UserRole, AIExpertPersona } from '../types';
import { NETFLIX_TOP_10, NetflixContentItem, JIOTV_CHANNELS } from '../data/jiotvData';
import { 
  Play, 
  Info, 
  Plus, 
  Check, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Tv, 
  Mail, 
  Camera, 
  Heart, 
  Share2, 
  Star, 
  Clock, 
  GraduationCap, 
  Users, 
  Cpu, 
  BookOpen, 
  ShieldCheck, 
  Flame,
  ArrowRight,
  ExternalLink,
  X
} from 'lucide-react';

interface NetflixJioTvHomeProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  setActiveTab: (tab: NavTab) => void;
  onOpenAskAI: (persona?: AIExpertPersona, query?: string) => void;
  onGenerateCertificate: () => void;
}

export const NetflixJioTvHome: React.FC<NetflixJioTvHomeProps> = ({
  role,
  setRole,
  setActiveTab,
  onOpenAskAI,
  onGenerateCertificate
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [myList, setMyList] = useState<string[]>(['top-1', 'top-3']);
  const [selectedItem, setSelectedItem] = useState<NetflixContentItem | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const heroItem = NETFLIX_TOP_10[0]; // Google Lens & Multi-Modal Solver as premier billboard

  const toggleMyList = (id: string) => {
    setMyList(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleStartItem = (item: NetflixContentItem) => {
    setActiveTab(item.targetTab as NavTab);
  };

  return (
    <div className="bg-[#141414] text-white min-h-screen space-y-10 pb-16 font-sans select-none animate-fade-in -mt-4 -mx-4 sm:-mx-6 lg:-mx-8">
      {/* ========================================================================= */}
      {/* 1. NETFLIX BILLBOARD (HERO BANNER) */}
      {/* ========================================================================= */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[500px] max-h-[720px] overflow-hidden">
        {/* Background Poster Artwork */}
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1920&q=85"
          alt="Super Parent Gurukul"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
        />

        {/* Cinematic Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/70 to-transparent w-full lg:w-2/3" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />

        {/* Left Hero Content Info */}
        <div className="absolute bottom-12 sm:bottom-16 left-6 sm:left-12 lg:left-16 z-20 max-w-2xl space-y-4 sm:space-y-6">
          {/* Top Series Pill */}
          <div className="flex items-center gap-2">
            <span className="bg-[#E50914] text-white text-[11px] font-black tracking-widest px-2.5 py-1 rounded uppercase shadow-md shadow-red-950">
              GURUKUL ORIGINAL
            </span>
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>#1 in Education Today</span>
            </span>
          </div>

          {/* Hero Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-2xl leading-tight">
            SUPER PARENT
            <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-300 mt-1">
              Smart Parent • Happy Child • Bright Future
            </span>
          </h1>

          {/* Netflix Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-neutral-300 font-semibold">
            <span className="text-emerald-400 font-black">99% Match</span>
            <span className="border border-neutral-600 px-1.5 py-0.5 rounded text-[10px] text-neutral-300">U/A 7+</span>
            <span className="text-neutral-400">Season 2026</span>
            <span className="border border-neutral-600 px-1.5 py-0.5 rounded text-[10px] text-neutral-300">4K Ultra HD</span>
            <span className="border border-neutral-600 px-1.5 py-0.5 rounded text-[10px] text-neutral-300">Telugu & English</span>
          </div>

          {/* Hero Synopsis */}
          <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed line-clamp-3 max-w-xl drop-shadow">
            India's most complete digital Gurukul: instant Google Lens & multi-modal OCR homework derivations, interactive 3D human anatomy labs, 700 Bhagavad Gita shlokas with Telugu audio, live Doordarshan channels, and official Google Workspace Gmail integration.
          </p>

          {/* Iconic Netflix Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('homework')}
              className="flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-extrabold px-6 py-3 rounded-md text-sm shadow-xl transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>Scan Homework (Lens)</span>
            </button>

            <button
              onClick={() => setActiveTab('jiotv')}
              className="flex items-center gap-2 bg-[#BE123C] hover:bg-[#9f1239] text-white font-bold px-5 py-3 rounded-md text-sm shadow-lg transition-all cursor-pointer"
            >
              <Tv className="w-5 h-5" />
              <span>Watch Live TV</span>
            </button>

            <button
              onClick={() => setActiveTab('gmail')}
              className="flex items-center gap-2 bg-neutral-800/80 hover:bg-neutral-700/80 text-white font-bold px-5 py-3 rounded-md text-sm backdrop-blur-md border border-neutral-600 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-red-400" />
              <span>Gmail Inbox</span>
            </button>

            <button
              onClick={() => setSelectedItem(heroItem)}
              className="flex items-center gap-2 bg-neutral-600/70 hover:bg-neutral-600/90 text-white font-bold px-4 py-3 rounded-md text-sm backdrop-blur-md transition-all cursor-pointer"
            >
              <Info className="w-5 h-5" />
              <span>More Info</span>
            </button>
          </div>
        </div>

        {/* Right Edge: Volume Toggle & Age Rating Badge */}
        <div className="absolute bottom-16 right-0 z-20 flex items-center gap-3 pr-6 sm:pr-12">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-full border border-neutral-600 bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
            title={isMuted ? 'Unmute preview' : 'Mute preview'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <div className="bg-neutral-900/80 border-l-4 border-neutral-300 text-neutral-300 text-xs font-bold px-3 py-1 backdrop-blur-md">
            U/A 7+
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. NETFLIX HORIZONTAL SCROLLING RAILS */}
      {/* ========================================================================= */}
      <div className="space-y-10 px-6 sm:px-12 lg:px-16 -mt-8 relative z-30">
        
        {/* Quick Mode Profile Banner */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-black p-4 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-amber-600 flex items-center justify-center font-black text-white text-sm shadow-md">
              SP
            </div>
            <div>
              <div className="text-xs font-bold text-neutral-200">
                Viewing as: <span className="text-[#E50914] font-black uppercase">{role === 'student' ? '👦 Chaitanya (Class 6)' : '👨‍👩‍👧 Parent Master Mode'}</span>
              </div>
              <p className="text-[11px] text-neutral-400">Personalized Netflix & JioTV learning feed calibrated for CBSE & State syllabus.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setRole(role === 'student' ? 'parent' : 'student')}
              className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold px-4 py-2 rounded-xl border border-neutral-700 transition-all cursor-pointer"
            >
              Switch to {role === 'student' ? 'Parent' : 'Student'} Profile
            </button>
            <button
              onClick={onGenerateCertificate}
              className="text-xs bg-[#E50914] hover:bg-[#b20710] text-white font-bold px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer"
            >
              Digital Gurukul Certificate
            </button>
          </div>
        </div>

        {/* RAIL 1: 🔥 TOP 10 IN SUPER PARENT TODAY (Iconic Netflix Top 10 styling) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Top 10 in Education & Gurukul Today</span>
            </h2>
          </div>

          {/* Horizontal Scroller */}
          <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-2 scrollbar-none snap-x">
            {NETFLIX_TOP_10.map((item, index) => {
              const rank = index + 1;
              const isSaved = myList.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="flex items-center shrink-0 group cursor-pointer snap-start transition-transform duration-300 hover:scale-105"
                >
                  {/* Big Number Typography behind/beside card */}
                  <div className="text-[80px] sm:text-[110px] font-black text-neutral-700 group-hover:text-[#E50914] transition-colors leading-none tracking-tighter w-14 sm:w-20 text-right select-none pr-1">
                    {rank}
                  </div>

                  {/* Poster Card */}
                  <div className="w-40 sm:w-52 aspect-[2/3] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 relative shadow-2xl group-hover:border-neutral-500 transition-all">
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                    {/* Card Badges */}
                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      <span className="bg-[#E50914] text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                        TOP 10
                      </span>
                    </div>

                    {/* Bottom Details on Poster */}
                    <div className="absolute bottom-2 left-2 right-2 space-y-1">
                      <div className="text-[10px] text-emerald-400 font-bold">{item.matchScore}% Match</div>
                      <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                        {item.title}
                      </h4>
                      <div className="text-[10px] text-neutral-400 line-clamp-1">{item.teluguTitle}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RAIL 2: 📺 LIVE BROADCAST CHANNELS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#BE123C] animate-ping" />
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Live Educational Broadcast Channels &amp; Doordarshan
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('jiotv')}
              className="text-xs text-[#BE123C] hover:underline font-bold flex items-center gap-1"
            >
              <span>Explore All Channels</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {JIOTV_CHANNELS.slice(0, 3).map((channel) => (
              <div
                key={channel.id}
                onClick={() => setActiveTab('jiotv')}
                className="bg-[#181818] hover:bg-neutral-800 rounded-2xl border border-neutral-800 p-4 space-y-3 cursor-pointer transition-all hover:scale-[1.02] shadow-xl group"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                  <img
                    src={channel.banner}
                    alt={channel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-[#E50046] text-white text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 shadow">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>LIVE</span>
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-[#E50046] text-white flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-white" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="font-bold text-neutral-200">{channel.name}</span>
                    <span>{channel.currentShow.timeRange}</span>
                  </div>
                  <h4 className="text-sm font-black text-white mt-1 line-clamp-1">{channel.currentShow.title}</h4>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {channel.currentShow.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RAIL 3: ⚡ CONTINUE LEARNING & PROGRESS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Continue Learning for Chaitanya (Class 6)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Mathematics: Quadratic Roots & Factorization',
                progress: 75,
                timeLeft: '15 min left',
                tab: 'education',
                img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=500&q=80'
              },
              {
                title: 'Bhagavad Gita: Chapter 2 Shloka 47 Recitation',
                progress: 90,
                timeLeft: '5 min left',
                tab: 'sanskar',
                img: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&w=500&q=80'
              },
              {
                title: '3D Anatomy: Cardiovascular & Heart Dissection',
                progress: 40,
                timeLeft: '25 min left',
                tab: 'kids-lab',
                img: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=500&q=80'
              },
              {
                title: 'Robotics: Soil Moisture Alarm Circuit on Arduino',
                progress: 60,
                timeLeft: '20 min left',
                tab: 'innovation',
                img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&q=80'
              }
            ].map((course, idx) => (
              <div
                key={idx}
                onClick={() => setActiveTab(course.tab as NavTab)}
                className="bg-[#181818] hover:bg-neutral-800 rounded-2xl border border-neutral-800 overflow-hidden cursor-pointer transition-all hover:scale-[1.03] shadow-lg group"
              >
                <div className="relative aspect-video">
                  <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 fill-black ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="text-xs font-bold text-white line-clamp-1">{course.title}</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-neutral-400">
                      <span>{course.progress}% Watched</span>
                      <span>{course.timeLeft}</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#E50914] h-full rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RAIL 4: 📸 STUDENTS HOMEWORK & GOOGLE LENS OCR HUB */}
        <div className="bg-gradient-to-r from-red-950/40 via-neutral-900 to-black p-6 sm:p-8 rounded-3xl border border-red-900/40 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-[#E50914] text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                AI Vision + Voice + OCR
              </div>
              <h3 className="text-2xl font-black text-white">
                Instant Homework & Multi-Modal Problem Solver
              </h3>
              <p className="text-xs text-neutral-400 max-w-xl">
                Scan photos of handwritten math problems, PDF worksheets, or dictate questions by voice. Powered by Google Lens integration and Gemini step-by-step reasoning.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('homework')}
                className="flex items-center gap-2 bg-white text-black font-extrabold px-6 py-3 rounded-md text-xs shadow-xl hover:bg-neutral-200 transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#E50914]" />
                <span>Launch OCR Scanner</span>
              </button>
            </div>
          </div>
        </div>

        {/* RAIL 5: 📧 GOOGLE WORKSPACE GMAIL QUICK PEEK */}
        <div className="bg-[#181818] p-6 sm:p-8 rounded-3xl border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center font-bold border border-red-500/30">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">Google Gmail Integration</h3>
                <p className="text-xs text-neutral-400">Read school circulars, send leave requests, and track assignment alerts.</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('gmail')}
              className="flex items-center gap-2 text-xs text-[#E50914] hover:underline font-bold"
            >
              <span>Open Full Mailbox</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. NETFLIX QUICK DETAIL MODAL (WHEN ANY CARD IS CLICKED) */}
      {/* ========================================================================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-[#181818] rounded-3xl border border-neutral-700 w-full max-w-3xl overflow-hidden shadow-2xl space-y-0">
            {/* Modal Hero Banner */}
            <div className="relative aspect-video w-full bg-black max-h-[320px]">
              <img
                src={selectedItem.banner}
                alt={selectedItem.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/60" />

              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="bg-[#E50914] text-white text-[10px] font-black px-2 py-0.5 rounded">
                  {selectedItem.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedItem.title}</h2>
                <div className="text-xs text-neutral-400">{selectedItem.teluguTitle}</div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs font-bold text-neutral-300">
                  <span className="text-emerald-400 font-black">{selectedItem.matchScore}% Match</span>
                  <span className="border border-neutral-600 px-1.5 py-0.5 rounded text-[10px]">{selectedItem.rating}</span>
                  <span className="text-neutral-400">{selectedItem.duration}</span>
                  <span className="border border-neutral-600 px-1.5 py-0.5 rounded text-[10px]">HD / 4K</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      handleStartItem(selectedItem);
                      setSelectedItem(null);
                    }}
                    className="flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-extrabold px-6 py-2.5 rounded-md text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-black" />
                    <span>Start Module</span>
                  </button>

                  <button
                    onClick={() => toggleMyList(selectedItem.id)}
                    className="p-2.5 rounded-md border border-neutral-600 bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
                    title={myList.includes(selectedItem.id) ? 'Remove from My List' : 'Add to My List'}
                  >
                    {myList.includes(selectedItem.id) ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                {selectedItem.description}
              </p>

              <div className="pt-2 border-t border-neutral-800 flex flex-wrap items-center gap-2">
                <span className="text-xs text-neutral-500 font-bold">Tags:</span>
                {selectedItem.tags.map((tag, idx) => (
                  <span key={idx} className="text-[11px] bg-neutral-900 border border-neutral-800 text-neutral-300 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
