import React, { useState, useEffect } from 'react';
import { 
  UserRole, 
  NavTab, 
  UserAccount, 
  AppThemeId 
} from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { 
  Phone, 
  MapPin, 
  Sparkles, 
  Bot, 
  BookOpen, 
  Users, 
  Cpu, 
  ShoppingBag, 
  Trophy, 
  BarChart3, 
  Globe, 
  DollarSign, 
  Menu, 
  X, 
  GraduationCap, 
  HeartHandshake,
  ShieldCheck, 
  KeyRound, 
  CheckCheck, 
  Palette, 
  ChevronDown, 
  ChevronRight,
  Unlock, 
  Lock, 
  LogOut, 
  User,
  Video,
  Languages,
  HardDrive,
  Wifi,
  WifiOff,
  Flame,
  Search,
  Zap,
  Home,
  CheckCircle2
} from 'lucide-react';
import { APP_THEMES } from '../data/themes';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../data/translations';
import { FirebaseHealthCheck } from './FirebaseHealthCheck';

interface HeaderProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenAskAI: (initialPersona?: string) => void;
  currentUser: UserAccount;
  onLogout: () => void;
  currentTheme: AppThemeId;
  onSelectTheme: (theme: AppThemeId) => void;
  masterAccessGranted: boolean;
  onToggleMasterAccess: () => void;
}

interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  icon: any;
  items: {
    id: NavTab;
    label: string;
    description: string;
    icon: any;
    badge?: string;
    highlight?: boolean;
  }[];
}

export const Header: React.FC<HeaderProps> = ({
  role,
  setRole,
  activeTab,
  setActiveTab,
  onOpenAskAI,
  currentUser,
  onLogout,
  currentTheme,
  onSelectTheme,
  masterAccessGranted,
  onToggleMasterAccess
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setHamburgerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Categorized Mega Menu Structure for Hamburger Drawer
  const menuCategories: MenuCategory[] = [
    {
      id: 'academics',
      title: '🎓 Academics & Global Learning',
      subtitle: 'KG to Class 12, syllabus notes, video labs & global modules',
      icon: GraduationCap,
      items: [
        {
          id: 'practice-master',
          label: t('navPracticeMaster', 'Practice Master Zone'),
          description: '🌐 All-in-One Global Portals: CBSE, IB, Aglasem, IEEE, Research, Libraries & Startups',
          icon: Globe,
          badge: 'Master Hub',
          highlight: true
        },
        {
          id: 'super-student',
          label: t('navSuperStudent', 'Super Student Hub'),
          description: '🎁 $200k+ Free Resources, IIT-JEE, NEET & Olympiad materials',
          icon: Sparkles,
          badge: '$200k+ Pack'
        },
        {
          id: 'education',
          label: t('navEducation', 'Education Hub'),
          description: 'CBSE, ICSE, NCERT, State Boards & Interactive 3D Lessons',
          icon: BookOpen
        },
        {
          id: 'classroom',
          label: t('navClassroom', 'Live Classroom & Rooms'),
          description: 'Interactive Zoom & Google Meet rooms with whiteboards',
          icon: Video,
          badge: 'Live Rooms'
        },
        {
          id: 'language-lab',
          label: t('navLanguageLab', 'World Language Lab'),
          description: 'Native audio trainer for Telugu, Hindi, Sanskrit, German & French',
          icon: Languages,
          badge: 'Audio Lab'
        },
        {
          id: 'stories',
          label: t('navStories', 'Moral Stories & Wisdom'),
          description: 'Character-building animated tales from Indian folklore & Panchatantra',
          icon: BookOpen
        },
        {
          id: 'global',
          label: t('navGlobal', 'Global Learning Hub'),
          description: 'International curriculum with Harvard & Oxford open-course styles',
          icon: Globe
        }
      ]
    },
    {
      id: 'culture',
      title: '🕉️ Values, Sanskar & Heritage',
      subtitle: 'Ancient Indian wisdom, Bhagavad Gita, Slokas & moral grounding',
      icon: HeartHandshake,
      items: [
        {
          id: 'sanskar',
          label: t('navSanskar', 'Values & Sanskar'),
          description: 'All 700 Bhagavad Gita slokas with audio, Gayatri Mantra & Stotrams',
          icon: HeartHandshake,
          badge: 'భాగవద్గీత'
        }
      ]
    },
    {
      id: 'innovation',
      title: '🔬 STEM, Kids Lab & Creative Studio',
      subtitle: '3D Anatomy, AI editing suite, robotics, coding & student marketplace',
      icon: Cpu,
      items: [
        {
          id: 'kids-lab',
          label: t('navKidsLab', 'Kids Lab (3D Anatomy & AI Editing)'),
          description: '🧬 3D Human Body on AnatomyZone & 🎨 123apps All AI Video/Audio/PDF tools',
          icon: Sparkles,
          badge: 'AnatomyZone + 123apps',
          highlight: true
        },
        {
          id: 'innovation',
          label: t('navInnovation', 'Innovation Lab'),
          description: 'Robotics kits, IoT sensors, Python & Arduino DIY simulators',
          icon: Cpu,
          badge: 'Robotics'
        },
        {
          id: 'games',
          label: t('navGames', 'Educational Games & Math Puzzles'),
          description: 'Cognitive memory, Vedic speed math & logic adventure quests',
          icon: Sparkles
        },
        {
          id: 'marketplace',
          label: t('navTalentMarketplace', 'Talent & Skills Marketplace'),
          description: 'Parent-approved student store for handmade crafts & tech projects',
          icon: ShoppingBag,
          badge: 'Verified Shop'
        },
        {
          id: 'showcase',
          label: t('navShowcase', 'Student Showcase'),
          description: 'Wall of Fame celebrating student awards, arts & achievements',
          icon: Trophy
        }
      ]
    },
    {
      id: 'parenting',
      title: '👨‍👩‍👧 Parenting & Child Analytics',
      subtitle: 'Expert parenting tools, developmental tracking & milestones',
      icon: Users,
      items: [
        {
          id: 'parenting',
          label: t('navParenting', 'Parenting Master Hub'),
          description: 'Child psychology, positive discipline, nutrition & screen-time advice',
          icon: Users
        },
        {
          id: 'growth',
          label: t('navGrowth', 'Child Growth Map'),
          description: 'Interactive radar charts for cognitive, physical & emotional progress',
          icon: BarChart3
        }
      ]
    },
    {
      id: 'system',
      title: '⚙️ Offline Access & System Tools',
      subtitle: 'PWA downloads, pricing, admin controls & diagnostics',
      icon: ShieldCheck,
      items: [
        {
          id: 'offline-hub',
          label: t('navOfflineHub', 'Offline Cache & PWA'),
          description: '100% offline lesson storage, downloaded audio & cache manager',
          icon: HardDrive,
          badge: 'PWA Ready'
        },
        {
          id: 'pricing',
          label: t('navPricing', 'Plans, Fee & Scholarships'),
          description: 'Transparent plans starting ₹600 with merit fee waivers',
          icon: DollarSign,
          badge: '₹600+'
        },
        {
          id: 'admin',
          label: t('navAdmin', 'Admin Portal'),
          description: 'Full system telemetry, user management & 100% master access toggle',
          icon: ShieldCheck,
          badge: '100% Access'
        },
        {
          id: 'testing',
          label: t('navTesting', 'Diagnostic Testing Suite'),
          description: 'Automated 100% system health checks & framework benchmarks',
          icon: CheckCheck
        }
      ]
    }
  ];

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    setHamburgerOpen(false);
  };

  // Filter items if searching in hamburger menu
  const filteredCategories = menuCategories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.label.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(menuSearch.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-clean border-b border-orange-100">
        {/* Top Info Strip */}
        <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                {t('officeLocation', 'HO: Whitefield, Bengaluru | Branch: Visakhapatnam')}
              </span>
              <span className="hidden md:inline text-slate-600">|</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <a href={`tel:${COMPANY_INFO.phone1}`} className="hover:text-orange-300 font-semibold underline underline-offset-2">{COMPANY_INFO.phone1}</a> / 
                <a href={`tel:${COMPANY_INFO.phone2}`} className="hover:text-orange-300 font-semibold underline underline-offset-2">{COMPANY_INFO.phone2}</a>
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              {/* Compact Firebase Status */}
              <div onClick={() => setActiveTab('admin')} className="cursor-pointer" title="Firebase Status">
                <FirebaseHealthCheck isCompact={true} />
              </div>

              {/* Language Switcher */}
              <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                    language === 'en' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('te')}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                    language === 'te' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  తెలుగు
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                    language === 'hi' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  हिन्दी
                </button>
              </div>

              {/* Pricing link */}
              <button 
                onClick={() => setActiveTab('pricing')}
                className="text-orange-400 hover:text-orange-300 font-black underline transition-colors text-[11px] cursor-pointer"
              >
                {t('plansStarting', 'Plans ₹600 - ₹2,000')}
              </button>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          {/* Left: Brand Logo & Tagline */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <div 
              className="w-11 h-11 rounded-2xl p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 shrink-0"
            >
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-black text-xl text-orange-600 shadow-inner">
                SP
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-900 flex items-center gap-1">
                  SUPER <span className="text-orange-600">PARENT</span>
                </h1>
                <span className="bg-orange-50 text-orange-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-orange-200 shadow-2xs hidden sm:inline">
                  {language === 'te' ? 'గురుకుల AI వ్యవస్థ' : language === 'hi' ? 'गुरुकुल एआई तंत्र' : 'Gurukul AI'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden md:block">
                {t('tagline', COMPANY_INFO.tagline)}
              </p>
            </div>
          </div>

          {/* Center: Primary Quick Navigation Pills (Clean & Compact, No Scrollbars) */}
          <div className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5 text-orange-600" />
              <span>{t('navHome', 'Home')}</span>
            </button>

            <button
              onClick={() => setActiveTab('practice-master')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'practice-master'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-emerald-600'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span>Practice Master</span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                Portals & R&D
              </span>
            </button>

            <button
              onClick={() => setActiveTab('super-student')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'super-student'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-orange-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Super Student Hub</span>
              <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                $200k+
              </span>
            </button>

            <button
              onClick={() => setActiveTab('kids-lab')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'kids-lab'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-rose-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Kids Lab</span>
              <span className="bg-rose-100 text-rose-800 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                3D Body & AI
              </span>
            </button>

            <button
              onClick={() => setActiveTab('classroom')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'classroom'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-blue-600" />
              <span>Live Classrooms</span>
            </button>

            <button
              onClick={() => setActiveTab('sanskar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === 'sanskar'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
              <span>Sanskar & Gita</span>
            </button>

            <button
              onClick={() => onOpenAskAI()}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-orange-600 to-amber-500 shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
              <span>Ask AI Mentor</span>
            </button>
          </div>

          {/* Right: Quick Role Switcher, Profile & PRIMARY HAMBURGER BUTTON */}
          <div className="flex items-center gap-2">
            {/* Quick Role Switcher */}
            <div className="bg-slate-100 p-1 rounded-2xl hidden md:flex items-center border border-slate-200 text-xs">
              <button
                onClick={() => setRole('student')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  role === 'student'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>

              <button
                onClick={() => setRole('parent')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  role === 'parent'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Parent</span>
              </button>

              <button
                onClick={() => {
                  setRole('admin');
                  setActiveTab('admin');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                  role === 'admin'
                    ? 'bg-orange-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 bg-white hover:bg-orange-50/50 border border-orange-200 px-2.5 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <span className="text-base">{currentUser.avatar}</span>
                <span className="max-w-[80px] truncate text-slate-800 hidden xl:inline">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-orange-600" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-orange-100 rounded-3xl shadow-xl p-3 z-50 animate-fade-in space-y-2">
                  <div className="p-3 bg-orange-50/70 rounded-2xl border border-orange-100">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{currentUser.avatar}</span>
                      <div className="overflow-hidden">
                        <div className="text-xs font-black text-slate-900 truncate">{currentUser.name}</div>
                        <div className="text-[10px] text-slate-500 truncate">{currentUser.email}</div>
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-[11px] pt-2 border-t border-orange-200/60">
                      <span className="font-black text-orange-600 uppercase">{currentUser.role}</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-200">
                        100% Full Access
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab('login');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-orange-50 rounded-xl text-left transition-colors cursor-pointer"
                    >
                      <KeyRound className="w-4 h-4 text-orange-600" />
                      <span>Switch Role / Login Page</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-orange-50 rounded-xl text-left transition-colors cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-orange-700" />
                      <span>Admin Control Center</span>
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl text-left border-t border-slate-100 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 🔥 PRIMARY HAMBURGER MENU BUTTON (Houses all Submenus & Categories) */}
            <button
              onClick={() => setHamburgerOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-black text-xs shadow-md transition-all cursor-pointer group"
              aria-label="Open Full Navigation Menu"
            >
              <Menu className="w-4 h-4 text-orange-400 group-hover:text-white transition-colors" />
              <span className="tracking-wide">MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* 🚀 FULL-FEATURED HAMBURGER MEGA DRAWER */}
      {hamburgerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setHamburgerOpen(false)}
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col">
              
              {/* Drawer Top Header */}
              <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-black text-lg text-white shadow-md">
                    SP
                  </div>
                  <div>
                    <h2 className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                      SUPER PARENT GURUKUL
                    </h2>
                    <p className="text-xs text-orange-300 font-medium">
                      All Hubs, Tools & Learning Categories
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setHamburgerOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar inside Hamburger Drawer */}
              <div className="p-4 bg-orange-50/70 border-b border-orange-100">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search any hub, subject, sloka, or tool..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-orange-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  {menuSearch && (
                    <button
                      onClick={() => setMenuSearch('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable Categories List (No cluttered horizontal bars) */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                
                {/* AI Assistant Quick Banner */}
                <div 
                  onClick={() => {
                    onOpenAskAI();
                    setHamburgerOpen(false);
                  }}
                  className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white p-4 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl">
                      🤖
                    </div>
                    <div>
                      <div className="text-sm font-black flex items-center gap-1.5">
                        Ask SUPER AI Mentor
                        <span className="bg-white/30 text-[9px] uppercase px-2 py-0.5 rounded-full font-black">
                          Voice • Vision
                        </span>
                      </div>
                      <div className="text-xs text-orange-100 font-medium">
                        Instant homework help, sloka meanings & advice
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Filtered Hub Categories */}
                {filteredCategories.map((category) => (
                  <div key={category.id} className="space-y-2.5">
                    <div className="border-b border-slate-100 pb-1.5 flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                        {category.title}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {category.items.length} hubs
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                      {category.items.map((item) => {
                        const Icon = item.icon;
                        const isCurrentActive = activeTab === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleNavigate(item.id)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                              isCurrentActive
                                ? 'bg-orange-50/90 border-orange-300 ring-1 ring-orange-400 shadow-xs'
                                : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-orange-200'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                                isCurrentActive 
                                  ? 'bg-orange-600 text-white shadow-xs' 
                                  : 'bg-slate-100 text-slate-700'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs font-black ${
                                    isCurrentActive ? 'text-orange-950' : 'text-slate-900'
                                  }`}>
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className="text-[9px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-black">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            
                            {isCurrentActive ? (
                              <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-2.5" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-2.5" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700">
                    <Palette className="w-3.5 h-3.5 text-orange-600" />
                    <span>Theme:</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {(Object.keys(APP_THEMES) as AppThemeId[]).slice(0, 4).map((thId) => (
                      <button
                        key={thId}
                        onClick={() => onSelectTheme(thId)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                          currentTheme === thId ? 'scale-110 border-slate-900 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: APP_THEMES[thId].primary }}
                        title={APP_THEMES[thId].name}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-200">
                  <span>Super Parent Ecosystem v3.0</span>
                  <button 
                    onClick={() => {
                      setActiveTab('admin');
                      setHamburgerOpen(false);
                    }}
                    className="text-orange-600 hover:text-orange-700 font-bold underline cursor-pointer"
                  >
                    Admin Access (100%)
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
