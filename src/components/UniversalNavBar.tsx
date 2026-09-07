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

  const getTabLabel = (tab: NavTab) => {
    switch (tab) {
      case 'home': return t('navHome', 'Home Overview');
      case 'homework': return 'Students Homework (Google Lens, OCR, AI Solvers, Free Doctor & Holistic Development)';
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
      className="bg-white/95 backdrop-blur-md border-b sticky top-[89px] lg:top-[93px] z-30 shadow-xs transition-all"
      style={{ borderColor: theme.border }}
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
                ? 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs transform hover:-translate-x-0.5 cursor-pointer'
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
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 shadow-2xs transition-all cursor-pointer"
            title="Return to Home or reset view"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
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
              onClick={() => onSelectTheme('theosm-branding')}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-black transition-all flex items-center gap-1 cursor-pointer ${
                currentTheme === 'theosm-branding'
                  ? 'bg-[#021807] text-[#63C633] shadow-xs ring-1 ring-[#63C633]'
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

          {/* Quick Tutors Room Button */}
          <button
            onClick={() => setActiveTab('classroom')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black border transition-all cursor-pointer ${
              activeTab === 'classroom' || activeTab === 'tutors-room'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
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
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
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
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">100% Diagnostics</span>
          </button>
        </div>
      </div>
    </div>
  );
};
