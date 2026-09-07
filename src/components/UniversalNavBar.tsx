import React from 'react';
import { NavTab, UserAccount, AppThemeId } from '../types';
import { 
  ArrowLeft, 
  RotateCcw, 
  Home, 
  ChevronRight, 
  ShieldCheck, 
  Palette, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Unlock,
  Wrench,
  CheckCheck,
  Video,
  Languages,
  HardDrive,
  GraduationCap
} from 'lucide-react';
import { APP_THEMES } from '../data/themes';
import { useLanguage } from '../context/LanguageContext';

interface UniversalNavBarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  tabHistory: NavTab[];
  onGoBack: () => void;
  currentUser: UserAccount;
  currentTheme: AppThemeId;
  onSelectTheme: (theme: AppThemeId) => void;
  onOpenAskAI: () => void;
  onToggleMasterAccess: () => void;
  masterAccessGranted: boolean;
  onOpenContact?: () => void;
}

export const UniversalNavBar: React.FC<UniversalNavBarProps> = ({
  activeTab,
  setActiveTab,
  tabHistory,
  onGoBack,
  currentUser,
  currentTheme,
  onSelectTheme,
  onOpenAskAI,
  onToggleMasterAccess,
  masterAccessGranted,
  onOpenContact
}) => {
  const { t, language } = useLanguage();
  const theme = APP_THEMES[currentTheme] || APP_THEMES['gurukul-amber'];
  const isDark = currentTheme === 'netflix-dark' || currentTheme === 'jiotv-crimson';

  const getTabLabel = (tab: NavTab) => {
    switch (tab) {
      case 'home': return t('navHome', 'Home Overview');
      case 'homework': return 'Students Homework (Google Lens, OCR, AI Solvers, Free Doctor & Holistic Development)';
      case 'jiotv': return 'JioTV Live Educational Channels & Doordarshan (24x7 Broadcasts)';
      case 'gmail': return 'Google Workspace Gmail Inbox & School Communications';
      case 'tutors-room': return t('navTutorsRoom', "Tutor's Room (All Links, Videos, Books, AI & Voice)");
      case 'super-student': return t('navSuperStudent', 'Super Student Hub ($200k+ Free Packs & AI)');
      case 'kids-lab': return t('navKidsLab', 'Kids Lab (3D Anatomy & AI Creative Studio)');
      case 'practice-master': return t('navPracticeMaster', 'Practice Master Zone (Global Portals & Research)');
      case 'classroom': return t('navClassroom', "Tutor's Room & Interactive Classroom (Links, Videos, Books, Voice AI)");
      case 'language-lab': return t('navLanguageLab', 'World Language Lab (Telugu, Hindi, English, Sanskrit)');
      case 'offline-hub': return t('navOfflineHub', 'Offline Learning Hub & Service Worker Cache');
      case 'education': return t('navEducation', 'Education Hub (LKG - Class 10)');
      case 'sanskar': return t('navSanskar', 'Values & Sanskar (భాగవద్గీత శ్లోకాలు)');
      case 'stories': return t('navStories', 'Stories & Audio Storytelling');
      case 'parenting': return t('navParenting', 'Parenting & Psychology Hub');
      case 'innovation': return t('navInnovation', 'Innovation Lab (Robotics & DIY)');
      case 'games': return t('navGames', 'Games & Educational Quizzes');
      case 'growth': return t('navGrowth', 'Child Growth Map & Portfolio');
      case 'marketplace': return t('navTalentMarketplace', 'Kids Talent & Parent Skills Marketplace');
      case 'showcase': return t('navShowcase', 'Young Innovators Showcase');
      case 'global': return t('navGlobal', 'Global Learning (Free Window)');
      case 'pricing': return t('navPricing', 'Plans & Fee (₹600 - ₹2,000)');
      case 'login': return t('login', 'Account & Authentication');
      case 'admin': return t('navAdmin', 'Super Admin Control Center');
      case 'testing': return t('navTesting', 'Website 100% Testing & Diagnostics');
      default: return tab;
    }
  };

  return (
    <div 
      className={`backdrop-blur-md border-b sticky top-0 z-30 shadow-xs transition-all ${
        isDark ? 'bg-[#141414]/95 text-white border-[#2A2A2A]' : 'bg-white/95 text-slate-800 border-slate-200/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Back, Return, Home buttons & Breadcrumbs */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Back Button */}
          <button
            onClick={onGoBack}
            disabled={tabHistory.length <= 1}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              tabHistory.length > 1
                ? isDark
                  ? 'bg-[#222222] hover:bg-[#2e2e2e] text-slate-200 border border-[#333333] shadow-2xs transform hover:-translate-x-0.5 cursor-pointer'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs transform hover:-translate-x-0.5 cursor-pointer'
                : isDark
                  ? 'bg-[#181818] text-slate-600 border border-[#262626] cursor-not-allowed'
                  : 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
            title="Go Back to previous view"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('back', 'Back')}</span>
          </button>

          {/* Return Button */}
          <button
            onClick={() => {
              if (activeTab !== 'home') {
                setActiveTab('home');
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border shadow-2xs transition-all cursor-pointer ${
              isDark ? 'bg-[#222222] hover:bg-[#2e2e2e] text-slate-200 border-[#333333]' : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
            }`}
            title="Return to Home or reset view"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
            <span>{t('return', 'Return')}</span>
          </button>

          {/* Home Button */}
          <button
            onClick={() => setActiveTab('home')}
            style={{
              backgroundColor: activeTab === 'home' ? theme.primary : undefined,
              color: activeTab === 'home' ? '#ffffff' : undefined
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'shadow-xs'
                : isDark
                  ? 'bg-[#222222] hover:bg-[#2e2e2e] text-slate-200 border border-[#333333]'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200'
            }`}
            title="Go to Home"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t('navHome', 'Home')}</span>
          </button>

          <span className="text-slate-200 hidden sm:inline">|</span>

          {/* Direct EdTech Theme Selector Chips */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSelectTheme('pure-white')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTheme === 'pure-white'
                  ? 'bg-amber-500 text-slate-950 shadow-xs ring-2 ring-amber-400 font-extrabold'
                  : isDark 
                    ? 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-600'
                    : 'bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 shadow-2xs'
              }`}
              title="Change Background to Pure White / Light Mode"
            >
              <span>☀️</span>
              <span className="hidden sm:inline">White Light</span>
            </button>

            <button
              onClick={() => onSelectTheme('netflix-dark')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTheme === 'netflix-dark'
                  ? 'bg-[#E50914] text-white shadow-xs ring-1 ring-red-400'
                  : isDark 
                    ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700'
                    : 'bg-red-50 hover:bg-red-100 text-red-950 border border-red-200'
              }`}
              title="Switch to Netflix Dark Cinema UI/UX"
            >
              <span>🎬</span>
              <span className="hidden sm:inline">Netflix</span>
            </button>

            <button
              onClick={() => onSelectTheme('jiotv-crimson')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTheme === 'jiotv-crimson'
                  ? 'bg-[#E50046] text-white shadow-xs ring-1 ring-pink-400'
                  : isDark
                    ? 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700'
                    : 'bg-pink-50 hover:bg-pink-100 text-pink-950 border border-pink-200'
              }`}
              title="Switch to JioTV Live Streaming UI/UX"
            >
              <span>📺</span>
              <span className="hidden sm:inline">JioTV</span>
            </button>

            <button
              onClick={() => onSelectTheme('theosm-branding')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTheme === 'theosm-branding'
                  ? 'bg-[#021807] text-[#63C633] shadow-xs ring-1 ring-[#63C633]'
                  : isDark
                    ? 'bg-neutral-900 hover:bg-neutral-800 text-emerald-400 border border-neutral-700'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-[#021807] border border-[#CBD6A3]'
              }`}
              title="Switch to theosm™ Neo-Lime Branding (Dribbble 27700505)"
            >
              <span>⚡</span>
              <span className="hidden sm:inline">THEOSM™</span>
            </button>

            <button
              onClick={() => onSelectTheme('byjus-purple')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTheme === 'byjus-purple'
                  ? 'bg-purple-700 text-white shadow-xs ring-1 ring-purple-400'
                  : isDark
                    ? 'bg-neutral-900 hover:bg-neutral-800 text-purple-300 border border-neutral-700'
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200'
              }`}
              title="Switch to Royal Violet & Gold Theme"
            >
              <span>🟣</span>
              <span className="hidden sm:inline">Visual 3D</span>
            </button>

            <button
              onClick={() => onSelectTheme('unacademy-green')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTheme === 'unacademy-green'
                  ? 'bg-emerald-600 text-white shadow-xs ring-1 ring-emerald-400'
                  : isDark
                    ? 'bg-neutral-900 hover:bg-neutral-800 text-emerald-300 border border-neutral-700'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200'
              }`}
              title="Switch to Emerald Live Prep Theme"
            >
              <span>🟢</span>
              <span className="hidden sm:inline">Top Educator</span>
            </button>

            <button
              onClick={() => onSelectTheme('gurukul-amber')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTheme === 'gurukul-amber'
                  ? 'bg-orange-600 text-white shadow-xs ring-1 ring-orange-400'
                  : isDark
                    ? 'bg-neutral-900 hover:bg-neutral-800 text-orange-300 border border-neutral-700'
                    : 'bg-orange-50 hover:bg-orange-100 text-orange-950 border border-orange-200'
              }`}
              title="Switch to Gurukul Saffron Amber Theme"
            >
              <span>🟠</span>
              <span className="hidden sm:inline">Gurukul</span>
            </button>
          </div>

          <span className="text-slate-200 hidden md:inline">|</span>

          {/* Dynamic Breadcrumbs */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <span 
              onClick={() => setActiveTab('home')}
              className="cursor-pointer hover:text-slate-900 text-slate-500"
            >
              Super Parent
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span 
              className="font-extrabold max-w-[280px] truncate px-2.5 py-0.5 rounded-lg border shadow-2xs text-xs"
              style={{ 
                backgroundColor: theme.badgeBg, 
                color: theme.badgeText, 
                borderColor: theme.border 
              }}
            >
              {getTabLabel(activeTab)}
            </span>
          </div>
        </div>

        {/* Right Side: Quick Action Links & Diagnostic Trigger */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Direct Contact Button */}
          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-[#021807] hover:bg-[#1B5F0E] text-[#63C633] border border-[#63C633]/40 shadow-xs transition-all cursor-pointer"
              title="Open Direct Brand Contacts (WhatsApp / Email)"
            >
              <span>📞</span>
              <span>Contacts</span>
            </button>
          )}

          {/* Direct powcoloring.com Quick Button */}
          <a
            href="https://powcoloring.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-xs transition-all cursor-pointer"
            title="Open powcoloring.com Free Coloring Pages Website"
          >
            <span>🎨</span>
            <span>powcoloring.com</span>
          </a>

          {/* Quick JioTV Live Button */}
          <button
            onClick={() => setActiveTab('jiotv')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black border transition-all cursor-pointer ${
              activeTab === 'jiotv'
                ? 'bg-[#E50046] text-white border-[#E50046] shadow-xs'
                : isDark
                  ? 'bg-neutral-900 text-pink-300 border-neutral-700 hover:bg-neutral-800'
                  : 'bg-pink-50 text-pink-900 border-pink-200 hover:bg-pink-100'
            }`}
          >
            <span>📺</span>
            <span className="hidden sm:inline">JioTV Live</span>
          </button>

          {/* Quick Gmail Button */}
          <button
            onClick={() => setActiveTab('gmail')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-black border transition-all cursor-pointer ${
              activeTab === 'gmail'
                ? 'bg-[#E50914] text-white border-[#E50914] shadow-xs'
                : isDark
                  ? 'bg-neutral-900 text-red-300 border-neutral-700 hover:bg-neutral-800'
                  : 'bg-red-50 text-red-900 border-red-200 hover:bg-red-100'
            }`}
          >
            <span>📧</span>
            <span className="hidden sm:inline">Gmail</span>
          </button>

          {/* Quick Tutors Room Button */}
          <button
            onClick={() => setActiveTab('classroom')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black border transition-all cursor-pointer ${
              activeTab === 'classroom' || activeTab === 'tutors-room'
                ? 'bg-white text-black border-white shadow-xs'
                : isDark
                  ? 'bg-neutral-900 text-neutral-200 border-neutral-700 hover:bg-neutral-800'
                  : 'bg-slate-50 text-slate-900 border-slate-200 hover:bg-slate-100 shadow-2xs'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" style={{ color: theme.primary }} />
            <span>🏛️ Tutor's Room</span>
          </button>

          {/* Quick Language Lab Button */}
          <button
            onClick={() => setActiveTab('language-lab')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              activeTab === 'language-lab'
                ? 'bg-white text-black border-white shadow-xs'
                : isDark
                  ? 'bg-neutral-900 text-neutral-200 border-neutral-700 hover:bg-neutral-800'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Languages className="w-3.5 h-3.5" style={{ color: theme.primary }} />
            <span className="hidden sm:inline">Language Lab</span>
          </button>

          {/* Diagnostics Button */}
          <button
            onClick={() => setActiveTab('testing')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              activeTab === 'testing'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : isDark
                  ? 'bg-neutral-900 text-emerald-400 border-neutral-700 hover:bg-neutral-800'
                  : 'bg-emerald-50 text-emerald-950 border-emerald-200 hover:bg-emerald-100'
            }`}
            title="Open Diagnostic Suite"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden md:inline">100% Diagnostics</span>
          </button>
        </div>
      </div>
    </div>
  );
};
