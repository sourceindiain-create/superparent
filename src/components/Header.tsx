import React, { useState } from 'react';
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
  Unlock, 
  Lock, 
  LogOut, 
  User,
  Video,
  Languages,
  HardDrive,
  Wifi,
  WifiOff
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  React.useEffect(() => {
    const handleStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);
    return () => {
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  const navItems: { id: NavTab; label: string; icon: any; badge?: string }[] = [
    { id: 'home', label: t('navHome', 'Home'), icon: GraduationCap },
    { id: 'super-student', label: t('navSuperStudent', 'Super Student Hub'), icon: Sparkles, badge: '🎁 $200k+ Packs' },
    { id: 'classroom', label: t('navClassroom', 'Live Classroom & Rooms'), icon: Video, badge: '🔴 Zoom & Meet' },
    { id: 'language-lab', label: t('navLanguageLab', 'World Language Lab'), icon: Languages, badge: 'Audio Trainer' },
    { id: 'education', label: t('navEducation', 'Education Hub'), icon: BookOpen },
    { id: 'sanskar', label: t('navSanskar', 'Values & Sanskar'), icon: HeartHandshake, badge: 'భాగవద్గీత' },
    { id: 'stories', label: t('navStories', 'Moral Stories'), icon: BookOpen },
    { id: 'parenting', label: t('navParenting', 'Parenting Hub'), icon: Users },
    { id: 'innovation', label: t('navInnovation', 'Innovation Lab'), icon: Cpu, badge: 'Robotics' },
    { id: 'games', label: t('navGames', 'Games & Activities'), icon: Sparkles },
    { id: 'growth', label: t('navGrowth', 'Child Growth Map'), icon: BarChart3 },
    { id: 'marketplace', label: t('navTalentMarketplace', 'Talent & Skills Marketplace'), icon: ShoppingBag },
    { id: 'showcase', label: t('navShowcase', 'Student Showcase'), icon: Trophy },
    { id: 'offline-hub', label: t('navOfflineHub', 'Offline Cache'), icon: HardDrive, badge: 'PWA Ready' },
    { id: 'global', label: t('navGlobal', 'Global Learning'), icon: Globe },
    { id: 'pricing', label: t('navPricing', 'Plans & Fee'), icon: DollarSign, badge: '₹600+' },
    { id: 'admin', label: t('navAdmin', 'Admin Portal'), icon: ShieldCheck, badge: '100% Access' },
    { id: 'testing', label: t('navTesting', 'Diagnostic Testing'), icon: CheckCheck },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-clean border-b border-orange-100">
      {/* Top Banner Info Bar */}
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
            {/* Live Firebase Status Pill */}
            <div onClick={() => setActiveTab('admin')} className="cursor-pointer">
              <FirebaseHealthCheck isCompact={true} />
            </div>

            {/* Offline Cache Status Badge */}
            <button
              onClick={() => setActiveTab('offline-hub')}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border flex items-center gap-1 cursor-pointer transition-all ${
                isOnline 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30'
                  : 'bg-amber-500/30 text-amber-300 border-amber-400 animate-pulse'
              }`}
            >
              {isOnline ? <Wifi className="w-3 h-3 text-emerald-400" /> : <WifiOff className="w-3 h-3 text-amber-400" />}
              <span>{isOnline ? 'PWA Offline Ready' : 'Offline Mode Active'}</span>
            </button>

            {/* Language Switcher Buttons (Telugu, Hindi, English) */}
            <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-black transition-all ${
                  language === 'en' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-black transition-all ${
                  language === 'te' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                తెలుగు
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-black transition-all ${
                  language === 'hi' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>

            <button 
              onClick={() => setActiveTab('pricing')}
              className="text-orange-400 hover:text-orange-300 font-black underline transition-colors text-[11px]"
            >
              {t('plansStarting', 'Plans ₹600 - ₹2,000')}
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Header Actions */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveTab('home')}
        >
          <div 
            className="w-11 h-11 rounded-2xl p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500"
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
                {language === 'te' ? 'గురుకుల AI వ్యవస్థ' : language === 'hi' ? 'गुरुकुल एआई तंत्र' : 'Gurukul AI Ecosystem'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden md:block">
              {t('tagline', COMPANY_INFO.tagline)}
            </p>
          </div>
        </div>

        {/* Center Actions: Ask SUPER AI Highlight with Web Speech Voice Icon */}
        <div className="hidden xl:flex items-center gap-3">
          <button
            onClick={() => onOpenAskAI()}
            className="flex items-center gap-2.5 text-white font-black px-5 py-2.5 rounded-2xl shadow-md hover:shadow-orange-glow transition-all transform hover:-translate-y-0.5 text-xs bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 border border-orange-400/40 cursor-pointer"
          >
            <Bot className="w-4 h-4 text-amber-200 animate-pulse" />
            <span>🤖 {t('askSuperAI', 'ASK SUPER AI MENTOR')}</span>
            <span className="bg-white/20 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-lg font-bold text-white border border-white/20">
              🎙️ Voice • Vision
            </span>
          </button>
        </div>

        {/* Right Actions: Role Toggle, User Profile & Menu */}
        <div className="flex items-center gap-2.5">
          {/* Quick Role Switcher Buttons */}
          <div className="bg-slate-100/90 p-1 rounded-2xl hidden sm:flex items-center border border-slate-200 text-xs">
            <button
              onClick={() => setRole('student')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                role === 'student'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t('roleStudent', 'Student')}</span>
            </button>

            <button
              onClick={() => setRole('parent')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                role === 'parent'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t('roleParent', 'Parent')}</span>
            </button>

            <button
              onClick={() => {
                setRole('admin');
                setActiveTab('admin');
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                role === 'admin'
                  ? 'bg-orange-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('roleAdmin', 'Admin')}</span>
            </button>
          </div>

          {/* User Account / Profile Button */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-1.5 bg-white hover:bg-orange-50/50 border border-orange-200 hover:border-orange-400 px-3 py-1.5 rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <span className="text-base">{currentUser.avatar}</span>
              <span className="max-w-[100px] truncate text-slate-800 hidden md:inline">{currentUser.name.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 text-orange-600" />
            </button>

            {/* Dropdown Menu */}
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
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
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
                      setActiveTab('classroom');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-orange-50 rounded-xl text-left transition-colors cursor-pointer"
                  >
                    <Video className="w-4 h-4 text-blue-600" />
                    <span>Live Classrooms & Zoom</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('language-lab');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-orange-50 rounded-xl text-left transition-colors cursor-pointer"
                  >
                    <Languages className="w-4 h-4 text-orange-600" />
                    <span>World Language Lab</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('offline-hub');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-orange-50 rounded-xl text-left transition-colors cursor-pointer"
                  >
                    <HardDrive className="w-4 h-4 text-emerald-600" />
                    <span>Offline Cache & Downloads</span>
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
                      setActiveTab('testing');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-orange-50 rounded-xl text-left transition-colors cursor-pointer"
                  >
                    <CheckCheck className="w-4 h-4 text-emerald-600" />
                    <span>Website 100% Diagnostics</span>
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

          {/* Ask AI Button Mobile */}
          <button
            onClick={() => onOpenAskAI()}
            className="xl:hidden p-2 text-white rounded-2xl shadow-xs bg-orange-600 hover:bg-orange-700 cursor-pointer"
            title="Ask SUPER AI"
          >
            <Bot className="w-5 h-5" />
          </button>

          {/* Hamburger Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-orange-50 rounded-2xl cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Main Navigation Bar */}
      <div className="hidden lg:block bg-white border-t border-slate-100 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-1">
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ml-0.5 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[108px] bg-slate-950/70 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-80 bg-white h-full shadow-2xl p-5 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="font-black text-sm text-slate-900">Gurukul Navigation</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Language Selector */}
            <div className="bg-slate-50 p-3 rounded-2xl space-y-2 border border-slate-200">
              <span className="text-xs font-bold text-slate-600 block">Select Website Language:</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setLanguage('en')}
                  className={`py-1.5 rounded-xl text-xs font-black ${
                    language === 'en' ? 'bg-orange-600 text-white' : 'bg-white border text-slate-700'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('te')}
                  className={`py-1.5 rounded-xl text-xs font-black ${
                    language === 'te' ? 'bg-orange-600 text-white' : 'bg-white border text-slate-700'
                  }`}
                >
                  తెలుగు
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`py-1.5 rounded-xl text-xs font-black ${
                    language === 'hi' ? 'bg-orange-600 text-white' : 'bg-white border text-slate-700'
                  }`}
                >
                  हिन्दी
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                      isActive
                        ? 'bg-orange-600 text-white'
                        : 'text-slate-700 hover:bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-black">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
