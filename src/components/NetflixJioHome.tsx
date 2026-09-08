import React, { useState } from 'react';
import { NavTab, UserRole, AIExpertPersona, AppThemeId } from '../types';
import { 
  Play, 
  Info, 
  Plus, 
  Check, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Tv, 
  Film, 
  BookOpen, 
  Cpu, 
  HeartHandshake, 
  Users, 
  BarChart3, 
  ShoppingBag, 
  Trophy, 
  Globe, 
  Mail, 
  Camera, 
  Stethoscope, 
  ChevronRight, 
  ChevronLeft,
  Flame,
  Radio,
  Clock,
  Eye,
  Star
} from 'lucide-react';

interface NetflixJioHomeProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  setActiveTab: (tab: NavTab) => void;
  onOpenAskAI: (persona?: AIExpertPersona) => void;
  onGenerateCertificate: () => void;
  currentTheme: AppThemeId;
  setCurrentTheme: (theme: AppThemeId) => void;
}

interface ContentCard {
  id: string;
  title: string;
  teluguTitle: string;
  category: string;
  targetTab: NavTab;
  rating: string;
  matchScore: number;
  duration: string;
  badge?: string;
  tags: string[];
  description: string;
  gradient: string;
  icon: any;
  episodesCount?: number;
}

export const NetflixJioHome: React.FC<NetflixJioHomeProps> = ({
  role,
  setRole,
  setActiveTab,
  onOpenAskAI,
  onGenerateCertificate,
  currentTheme,
  setCurrentTheme
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ContentCard | null>(null);
  const [myList, setMyList] = useState<string[]>(['hw-ai', '3d-anatomy', 'gita-slokas']);
  const [activeLiveChannel, setActiveLiveChannel] = useState<string>('ch-101');
  const [showLiveStreamModal, setShowLiveStreamModal] = useState(false);

  const toggleMyList = (id: string) => {
    setMyList(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isNetflix = currentTheme === 'netflix-dark';

  // Live TV Channels (Jio TV OTT Format)
  const liveChannels = [
    {
      id: 'ch-101',
      number: '101',
      name: 'Super Gurukul Live TV',
      teluguName: 'భాగవద్గీత శ్లోకాలు & వేద గణితం',
      program: 'Daily Gita Sankhya Yoga Chanting & English Meaning',
      viewers: '18.4k',
      category: 'Spiritual & Sanskar',
      tab: 'sanskar' as NavTab,
      color: 'from-amber-600 to-red-700'
    },
    {
      id: 'ch-102',
      number: '102',
      name: 'STEM & Robotics 24/7',
      teluguName: 'రోబోటిక్స్ & ఎలక్ట్రానిక్స్ ల్యాబ్',
      program: 'Building Autonomous Obstacle Avoiding Arduino Robot',
      viewers: '14.2k',
      category: 'Innovation Lab',
      tab: 'innovation' as NavTab,
      color: 'from-cyan-600 to-blue-800'
    },
    {
      id: 'ch-103',
      number: '103',
      name: 'Homework AI & Lens Studio',
      teluguName: 'గూగుల్ లెన్స్ & కెమెరా స్కానర్',
      program: 'NCERT Class 8 & 10 Mathematics Live Solutions',
      viewers: '25.8k',
      category: 'Homework & Solvers',
      tab: 'homework' as NavTab,
      color: 'from-red-600 to-rose-800'
    },
    {
      id: 'ch-104',
      number: '104',
      name: 'Junior Cinema & Audio Tales',
      teluguName: 'నీతి కథలు & యానిమేషన్ థియేటర్',
      program: 'Tenali Ramakrishna & Panchatantra Moral Adventures',
      viewers: '9.6k',
      category: 'Stories Hub',
      tab: 'stories' as NavTab,
      color: 'from-purple-600 to-indigo-900'
    },
    {
      id: 'ch-105',
      number: '105',
      name: 'Kids 3D Anatomy Lab',
      teluguName: '3D మానవ శరీరం & అవయవాలు',
      program: 'Interactive 3D Heart, Brain & Lungs Simulation',
      viewers: '12.1k',
      category: 'Kids Lab',
      tab: 'kids-lab' as NavTab,
      color: 'from-emerald-600 to-teal-800'
    },
    {
      id: 'ch-106',
      number: '106',
      name: 'Parenting & Child Psychology',
      teluguName: 'తల్లిదండ్రుల మార్గదర్శకత్వం',
      program: 'Harvard Serve & Return: Building Emotional Resilience',
      viewers: '8.3k',
      category: 'Parenting Hub',
      tab: 'parenting' as NavTab,
      color: 'from-blue-600 to-slate-900'
    }
  ];

  // Featured Hero Content
  const heroContent = {
    title: 'SUPER PARENT: THE COMPLETE GURUKUL',
    teluguTitle: 'స్మార్ట్ పేరెంట్ • ఆనందమయ పిల్లలు • ఉజ్వల భవిష్యత్తు',
    tagline: 'TOP 10 IN INDIA • #1 IN FAMILY EDUCATION & AI',
    matchScore: 99,
    rating: 'U/A 7+',
    quality: '4K ULTRA HD • 5.1 AUDIO',
    description: 'The revolutionary digital Gurukul bridging ancient Indian sanskar with next-generation artificial intelligence, Google Lens homework solvers, 3D anatomical labs, interactive classrooms, and live family telemedicine.',
    targetTab: 'homework' as NavTab
  };

  // Trending Now Content Rail
  const trendingItems: ContentCard[] = [
    {
      id: 'hw-ai',
      title: 'Students Homework & Google Lens',
      teluguTitle: 'గూగుల్ లెన్స్ & OCR కెమెరా సాల్వర్',
      category: 'AI Tool',
      targetTab: 'homework',
      rating: 'U/A',
      matchScore: 99,
      duration: 'Live Solver',
      badge: 'NEW • 6-Step Solution',
      tags: ['Google Lens', 'OCR', 'Telugu Summary', 'Doctor OPD'],
      description: 'Snap any homework question via Camera, PDF, Word or Voice to get instant step-by-step verified derivations and Telugu summaries.',
      gradient: 'from-red-600 to-amber-700',
      icon: Camera,
      episodesCount: 10
    },
    {
      id: 'gmail-hub',
      title: 'Gmail School & Teacher Mailbox',
      teluguTitle: 'అధికారిక గూగుల్ జీమెయిల్ పోర్టల్',
      category: 'Workspace',
      targetTab: 'gmail',
      rating: 'All Ages',
      matchScore: 98,
      duration: 'Official API',
      badge: 'GOOGLE WORKSPACE',
      tags: ['Live Mail', 'Leave Notes', 'CBSE Updates'],
      description: 'Access and compose official emails directly with teachers, doctors, and schools with user-confirmed dispatch.',
      gradient: 'from-red-700 to-rose-900',
      icon: Mail,
      episodesCount: 1
    },
    {
      id: '3d-anatomy',
      title: 'Kids Lab & 3D AnatomyZone',
      teluguTitle: '3D అనాటమీ & మల్టీమీడియా ఎడిటింగ్',
      category: 'Science & Bio',
      targetTab: 'kids-lab',
      rating: 'U/A 7+',
      matchScore: 97,
      duration: 'Interactive 3D',
      badge: 'ANATOMYZONE 3D',
      tags: ['Interactive Body', '123apps', 'Kid Audio'],
      description: 'Explore human skeletal, muscular, and circulatory systems in rotatable 3D with audio narration.',
      gradient: 'from-blue-600 to-cyan-900',
      icon: Sparkles,
      episodesCount: 8
    },
    {
      id: 'super-student',
      title: 'Super Student $200k DevPacks',
      teluguTitle: 'ఉచిత ఏఐ కోర్సులు & గిట్‌హబ్ ప్యాక్',
      category: 'Engineering',
      targetTab: 'super-student',
      rating: 'Students',
      matchScore: 99,
      duration: '11 AI Courses',
      badge: '$200,000+ FREE',
      tags: ['GitHub Pack', 'AWS Credits', 'AI Certs'],
      description: 'Unlock enterprise developer tools, cloud hosting vouchers, and free global AI certifications.',
      gradient: 'from-purple-600 to-violet-900',
      icon: Cpu,
      episodesCount: 11
    },
    {
      id: 'practice-master',
      title: 'Practice Master Zone',
      teluguTitle: 'గ్లోబల్ రీసెర్చ్ & పోర్టల్స్',
      category: 'Global Portals',
      targetTab: 'practice-master',
      rating: 'U/A',
      matchScore: 96,
      duration: 'All-In-One',
      badge: '50+ PORTALS',
      tags: ['NCERT', 'MIT OCW', 'Research Papers'],
      description: 'One-click unified launchpad to the world’s most prestigious open knowledge archives.',
      gradient: 'from-emerald-600 to-teal-900',
      icon: Globe,
      episodesCount: 50
    }
  ];

  // Top 10 Today Row (Numbered 1-10)
  const topTenItems: ContentCard[] = [
    {
      id: 'top-1',
      title: 'Bhagavad Gita Slokas & Sanskar',
      teluguTitle: 'భాగవద్గీత శ్లోకాలు, పూజ & నిత్య ప్రార్థన',
      category: 'Culture & Sanskar',
      targetTab: 'sanskar',
      rating: 'All Ages',
      matchScore: 100,
      duration: '18 Chapters',
      badge: '#1 TOP PICK',
      tags: ['Gita Slokas', 'Audio Chanting', 'Telugu Tatparyam'],
      description: 'Sacred Sanskrit verses chanted with pristine cadence, lyrical Telugu meaning, and practical moral values.',
      gradient: 'from-amber-600 to-red-800',
      icon: HeartHandshake,
      episodesCount: 18
    },
    {
      id: 'top-2',
      title: 'CBSE & State Board Education Hub',
      teluguTitle: 'సెలబస్, సైన్స్ & మేథమెటిక్స్',
      category: 'Academic Core',
      targetTab: 'education',
      rating: 'LKG to 10th',
      matchScore: 99,
      duration: 'Classes 1 - 10',
      badge: '#2 TOP PICK',
      tags: ['NCERT Math', 'Physics', 'Telugu Lessons'],
      description: 'Class-wise structured interactive textbook chapters, quizzes, and animated concept explainers.',
      gradient: 'from-blue-700 to-indigo-950',
      icon: BookOpen,
      episodesCount: 10
    },
    {
      id: 'top-3',
      title: 'Moral Audio Theatre & Stories',
      teluguTitle: 'పంచతంత్రం, తెనాలి రామకృష్ణ కథలు',
      category: 'Audio Drama',
      targetTab: 'stories',
      rating: 'Kids',
      matchScore: 98,
      duration: '45 Audio Ep',
      badge: '#3 TOP PICK',
      tags: ['Bedtime Stories', 'Audio Drama', 'Moral Values'],
      description: 'Rich narrated audio stories fostering character, wit, kindness, and devotion in growing minds.',
      gradient: 'from-rose-600 to-purple-900',
      icon: BookOpen,
      episodesCount: 45
    },
    {
      id: 'top-4',
      title: 'Robotics & Electronic Circuits Lab',
      teluguTitle: 'ఆర్డుయినో, టింకర్‌క్యాడ్ & సెన్సార్లు',
      category: 'Maker Lab',
      targetTab: 'innovation',
      rating: 'U/A 7+',
      matchScore: 97,
      duration: '12 Projects',
      badge: '#4 TOP PICK',
      tags: ['Tinkercad', 'IoT', 'Hardware Kits'],
      description: 'Virtual and hands-on robotics workshops, wiring schematics, and sensor code playgrounds.',
      gradient: 'from-cyan-700 to-slate-900',
      icon: Cpu,
      episodesCount: 12
    },
    {
      id: 'top-5',
      title: 'Child Growth & Skill Analytics',
      teluguTitle: 'ప్రోగ్రెస్ రిపోర్ట్ & మైలురాళ్ళు',
      category: 'Growth Map',
      targetTab: 'growth',
      rating: 'Parents',
      matchScore: 96,
      duration: 'Live Dashboard',
      badge: '#5 TOP PICK',
      tags: ['XP Points', 'Streak', 'IQ Tracker'],
      description: 'Multi-dimensional progress charts tracking cognitive, emotional, cultural, and STEM growth.',
      gradient: 'from-emerald-700 to-green-950',
      icon: BarChart3,
      episodesCount: 4
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in text-white pb-12">
      {/* Top OTT Brand Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#181818]/90 p-3.5 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isNetflix ? 'bg-red-600 animate-pulse' : 'bg-pink-600 animate-pulse'}`} />
          <span className="text-xs font-black tracking-wider uppercase text-slate-300">
            Streaming Layout:
          </span>
          <span className={`text-xs font-black px-2.5 py-1 rounded-md ${
            isNetflix ? 'bg-[#047857] text-white' : 'bg-[#BE123C] text-white'
          }`}>
            {isNetflix ? '🎬 CINEMA DARK STUDIO' : '📺 LIVE BROADCASTS'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTheme('netflix-dark')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              isNetflix 
                ? 'bg-[#047857] text-white shadow-lg shadow-emerald-950/40 ring-2 ring-white/20' 
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Cinema Dark
          </button>
          <button
            onClick={() => setCurrentTheme('jiotv-crimson')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              !isNetflix 
                ? 'bg-[#BE123C] text-white shadow-lg shadow-rose-950/40 ring-2 ring-white/20' 
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            Rose Live TV
          </button>
        </div>
      </div>

      {/* Netflix / JioTV Hero Billboard Banner */}
      <div className="relative rounded-3xl overflow-hidden min-h-[460px] sm:min-h-[520px] flex items-end border border-white/10 shadow-2xl bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{
          backgroundImage: 'radial-gradient(circle at 75% 30%, rgba(229, 9, 20, 0.35) 0%, rgba(20, 20, 20, 0.95) 75%), linear-gradient(135deg, #180508 0%, #141414 60%, #080D1A 100%)'
        }}>
          {/* Subtle Decorative Particle Elements */}
          <div className="absolute top-10 right-12 opacity-20 hidden lg:block">
            <Film className="w-80 h-80 text-red-600" />
          </div>
        </div>

        {/* Hero Vignette Gradients (Classic Netflix Billboard Edge) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-full sm:w-2/3 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent pointer-events-none" />

        {/* Hero Content Information */}
        <div className="relative z-10 p-6 sm:p-12 max-w-3xl space-y-4">
          {/* Top Pill Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-red-600 text-white font-black text-[11px] px-2.5 py-0.5 rounded tracking-wider uppercase flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-white" />
              <span>{heroContent.tagline}</span>
            </span>
            <span className="bg-white/10 backdrop-blur-md text-slate-300 font-mono text-[10px] px-2 py-0.5 rounded border border-white/20 font-bold">
              {heroContent.rating}
            </span>
            <span className="bg-white/10 backdrop-blur-md text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded border border-white/20">
              {heroContent.matchScore}% Match
            </span>
            <span className="bg-white/10 backdrop-blur-md text-slate-300 font-mono text-[10px] px-2 py-0.5 rounded border border-white/20">
              {heroContent.quality}
            </span>
          </div>

          {/* Big Cinematic Display Title */}
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md">
              SUPER PARENT
            </h1>
            <p className="text-sm sm:text-base font-bold text-red-400 mt-1">
              {heroContent.teluguTitle}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed line-clamp-3">
            {heroContent.description}
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('homework')}
              className="px-6 py-3 bg-white hover:bg-slate-200 text-black font-black text-xs sm:text-sm rounded-xl shadow-xl flex items-center gap-2.5 transition-all transform hover:scale-105 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Launch Homework AI & Lens</span>
            </button>

            <button
              onClick={() => setActiveTab('gmail')}
              className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-xl shadow-red-900/30 flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>School Gmail</span>
            </button>

            <button
              onClick={() => setShowLiveStreamModal(true)}
              className="px-5 py-3 bg-black/60 hover:bg-black/80 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer"
            >
              <Tv className="w-4 h-4 text-red-500" />
              <span>Watch Live Channels</span>
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? 'Unmute preview' : 'Mute preview'}
              className="p-3 bg-black/40 hover:bg-black/60 text-slate-300 hover:text-white rounded-full border border-white/20 backdrop-blur-md transition-all cursor-pointer ml-auto"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* JioTV Live Channels Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              <span>Jio TV Live Classrooms & Gurukul Channels</span>
              <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-black uppercase">
                ON AIR NOW
              </span>
            </h2>
          </div>
          <button 
            onClick={() => setShowLiveStreamModal(true)}
            className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
          >
            <span>View All Channels</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Live Channel Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {liveChannels.map(channel => (
            <div
              key={channel.id}
              onClick={() => {
                setActiveLiveChannel(channel.id);
                setActiveTab(channel.tab);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group bg-gradient-to-r ${channel.color} bg-opacity-20 border-white/10 hover:border-red-500/60 hover:scale-[1.02] shadow-lg`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-black bg-black/60 px-2 py-0.5 rounded border border-white/20 text-amber-300">
                  CH {channel.number}
                </span>
                <div className="flex items-center gap-1.5 bg-red-600/80 px-2 py-0.5 rounded-full text-[10px] font-black text-white">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>LIVE • {channel.viewers}</span>
                </div>
              </div>

              <div className="font-black text-sm text-white group-hover:text-red-200 transition-colors">
                {channel.name}
              </div>
              <div className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                {channel.teluguName}
              </div>

              <div className="mt-2 text-xs text-slate-200 bg-black/40 p-2 rounded-xl border border-white/5 line-clamp-1 flex items-center gap-1.5">
                <Play className="w-3 h-3 text-red-400 shrink-0" />
                <span>{channel.program}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Netflix Rail 1: Trending Now in Education & AI */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
            <span>Trending Now in Education & AI</span>
            <span className="text-xs text-slate-400 font-normal">| 65,000+ Students</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {trendingItems.map(item => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative bg-[#181818] rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/80 transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-950/40"
              >
                {/* Poster Artwork Header */}
                <div className={`h-36 bg-gradient-to-br ${item.gradient} p-3.5 flex flex-col justify-between relative`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-md border border-white/10">
                      {item.badge || item.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMyList(item.id);
                      }}
                      className="p-1 rounded-full bg-black/50 hover:bg-black text-white"
                    >
                      {myList.includes(item.id) ? <Check className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-center">
                    <ItemIcon className="w-12 h-12 text-white/90 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-white/90 font-bold">
                    <span className="text-emerald-300">{item.matchScore}% Match</span>
                    <span className="font-mono bg-black/40 px-1.5 py-0.2 rounded">{item.duration}</span>
                  </div>
                </div>

                {/* Card Meta Content */}
                <div className="p-3 space-y-1.5 bg-[#181818]">
                  <div className="font-black text-xs sm:text-sm text-white line-clamp-1 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">
                    {item.teluguTitle}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTab(item.targetTab);
                      }}
                      className="w-full py-1.5 bg-white/10 hover:bg-red-600 text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1 transition-all"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Open Hub</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Netflix Rail 2: Top 10 Learning Series in India (Numbered 1-10) */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
            <span>Top 10 Learning Masterclasses Today in India</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {topTenItems.map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative bg-[#181818] rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/80 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Big Stylized Netflix Number + Poster */}
                <div className="relative h-40 bg-[#121212] overflow-hidden flex items-center">
                  <span className="absolute left-[-10px] bottom-[-20px] text-8xl font-black text-slate-800/80 group-hover:text-red-950/80 transition-colors select-none font-serif tracking-tighter">
                    {idx + 1}
                  </span>

                  <div className={`ml-16 mr-3 w-full h-32 rounded-xl bg-gradient-to-br ${item.gradient} p-3 flex flex-col justify-between shadow-lg relative z-10`}>
                    <div className="text-[9px] font-black uppercase text-amber-200">
                      {item.badge}
                    </div>
                    <ItemIcon className="w-8 h-8 text-white self-center" />
                    <div className="text-[10px] font-bold text-white/90 truncate">
                      {item.duration}
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#181818] space-y-1">
                  <div className="font-black text-xs text-white line-clamp-1 group-hover:text-red-400">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">
                    {item.teluguTitle}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab(item.targetTab);
                    }}
                    className="w-full mt-2 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white font-bold text-[10px] rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Start Masterclass</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Netflix Detail Sheet Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#181818] border border-white/20 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-fade-in space-y-0">
            {/* Modal Hero Video Artwork */}
            <div className={`h-56 bg-gradient-to-br ${selectedItem.gradient} p-6 flex flex-col justify-between relative`}>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center font-bold text-sm absolute top-4 right-4 z-10"
              >
                ✕
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-black/60 text-amber-300 border border-white/10">
                  {selectedItem.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white pt-2 leading-tight">
                  {selectedItem.title}
                </h3>
                <div className="text-xs text-slate-200 font-bold">
                  {selectedItem.teluguTitle}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => {
                    const tab = selectedItem.targetTab;
                    setSelectedItem(null);
                    setActiveTab(tab);
                  }}
                  className="px-6 py-2.5 bg-white text-black hover:bg-slate-200 font-black text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  <span>Open & Learn Now</span>
                </button>

                <button
                  onClick={() => toggleMyList(selectedItem.id)}
                  className="p-2.5 rounded-xl bg-black/50 hover:bg-black text-white border border-white/20"
                >
                  {myList.includes(selectedItem.id) ? <Check className="w-4 h-4 text-emerald-400" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Modal Body Details */}
            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-bold">{selectedItem.matchScore}% Match</span>
                <span>{selectedItem.duration}</span>
                <span className="border border-slate-700 px-1.5 rounded">{selectedItem.rating}</span>
                <span className="text-red-400 font-bold">HD • Audio In Telugu & English</span>
              </div>

              <p className="text-slate-200 leading-relaxed text-sm">
                {selectedItem.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {selectedItem.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10 text-[11px] text-slate-300 font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* JioTV Live Stream Dialog Modal */}
      {showLiveStreamModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121624] border border-[#2A3558] rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl animate-fade-in text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                <h3 className="text-base font-black">Jio TV Live Interactive Broadcast</h3>
              </div>
              <button
                onClick={() => setShowLiveStreamModal(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video bg-black rounded-2xl border border-white/10 flex flex-col items-center justify-center p-6 text-center space-y-3 relative overflow-hidden">
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-600 px-2 py-0.5 rounded text-[10px] font-black">
                <Radio className="w-3 h-3 animate-spin" />
                <span>CH 101 • SUPER GURUKUL LIVE</span>
              </div>
              <Tv className="w-16 h-16 text-pink-500 animate-pulse" />
              <div className="text-sm font-bold">Class 8 & 10 Vedic Mathematics & Gita Slokas Live Session</div>
              <div className="text-xs text-slate-400">18,400 Parents and Students Watching Nationwide</div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-slate-400">Audio available in Telugu & English</span>
              <button
                onClick={() => {
                  setShowLiveStreamModal(false);
                  setActiveTab('sanskar');
                }}
                className="px-4 py-2 bg-[#E50046] hover:bg-[#C2003B] font-black text-xs rounded-xl shadow-md cursor-pointer"
              >
                Open Full Screen Gurukul
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
