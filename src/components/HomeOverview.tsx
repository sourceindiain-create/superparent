import React from 'react';
import { UserRole, NavTab, AIExpertPersona } from '../types';
import { COMPANY_INFO, AI_EXPERTS } from '../data/mockData';
import { FamilyActivityFeed } from './FamilyActivityFeed';
import { 
  Bot, 
  BookOpen, 
  HeartHandshake, 
  Users, 
  Cpu, 
  Sparkles, 
  BarChart3, 
  ShoppingBag, 
  Trophy, 
  Globe, 
  DollarSign, 
  GraduationCap, 
  Award, 
  ArrowRight, 
  Mic, 
  ImageIcon,
  CheckCircle2,
  Zap
} from 'lucide-react';

interface HomeOverviewProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  setActiveTab: (tab: NavTab) => void;
  onOpenAskAI: (persona?: AIExpertPersona) => void;
  onGenerateCertificate: () => void;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  role,
  setRole,
  setActiveTab,
  onOpenAskAI,
  onGenerateCertificate
}) => {
  const hubTiles: { id: NavTab; label: string; teluguLabel: string; icon: any; badge?: string }[] = [
    { id: 'practice-master', label: 'Practice Master Zone', teluguLabel: 'గ్లోబల్ పోర్టల్స్, రీసెర్చ్ & స్టార్టప్స్', icon: Globe, badge: '🌐 All-in-One' },
    { id: 'super-student', label: 'Super Student Hub', teluguLabel: 'ఉచిత డెవ్‌ప్యాక్స్ & 11 ఏఐ కోర్సులు', icon: Sparkles, badge: '🎁 $200k+ Free' },
    { id: 'kids-lab', label: 'Kids Lab (3D Anatomy & AI)', teluguLabel: '3D అనాటమీ & 123apps ఎడిటింగ్', icon: Sparkles, badge: '🧬 AnatomyZone + AI' },
    { id: 'education', label: 'Education Hub', teluguLabel: 'సెలబస్ & సబ్జెక్ట్స్', icon: BookOpen },
    { id: 'sanskar', label: 'Values & Sanskar', teluguLabel: 'భాగవద్గీత & పూజ', icon: HeartHandshake, badge: 'గీత పద్యాలు' },
    { id: 'stories', label: 'Stories Hub', teluguLabel: 'నీతి కథలు & ఆడియో', icon: BookOpen },
    { id: 'parenting', label: 'Parenting Hub', teluguLabel: 'సైకాలజీ & అనుబంధం', icon: Users },
    { id: 'innovation', label: 'Innovation Lab', teluguLabel: 'రోబోటిక్స్ & సర్క్యూట్స్', icon: Cpu, badge: 'Robotics' },
    { id: 'games', label: 'Games & Arena', teluguLabel: 'క్విజ్ & పోటీలు', icon: Sparkles },
    { id: 'growth', label: 'Child Growth Map', teluguLabel: 'ప్రోగ్రెస్ రిపోర్ట్', icon: BarChart3 },
    { id: 'marketplace', label: 'Student Marketplace', teluguLabel: 'కిడ్స్ క్రాఫ్ట్స్ & కిట్స్', icon: ShoppingBag },
    { id: 'showcase', label: 'Student Showcase', teluguLabel: 'యువ ఇన్నోవేటర్లు', icon: Trophy },
    { id: 'global', label: 'Global Learning', teluguLabel: 'వరల్డ్ ఓపెన్ బుక్స్', icon: Globe },
    { id: 'pricing', label: 'Plans & Fee', teluguLabel: '₹600 - ₹2,000', icon: DollarSign, badge: 'సర్టిఫికేట్' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Executive Hero Banner in White & Orange Software Design */}
      <div className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 rounded-3xl p-6 sm:p-10 text-white shadow-orange-glow relative overflow-hidden space-y-6 border border-orange-400/50">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/30 text-white shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
            <span>Complete Family Learning Ecosystem • LKG to 10th Class</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            SUPER PARENT
            <span className="block text-amber-100 text-xl sm:text-3xl font-bold mt-1">
              Smart Parent • Happy Child • Bright Future
            </span>
          </h1>

          <p className="text-sm sm:text-base text-orange-50 font-medium leading-relaxed max-w-2xl">
            {COMPANY_INFO.missionLine}. An all-in-one digital Gurukul connecting parents and children through education, Bhagavad Gita slokas, audio stories, AI multi-experts, robotics labs, and student marketplaces.
          </p>

          {/* Quick Login Role Toggles */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setRole('parent')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs shadow-md transition-all ${
                role === 'parent'
                  ? 'bg-white text-orange-700 ring-2 ring-white font-black'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>👨‍👩‍👧 Parent Login Mode</span>
            </button>

            <button
              onClick={() => setRole('student')}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs shadow-md transition-all ${
                role === 'student'
                  ? 'bg-slate-900 text-white font-black ring-2 ring-white'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>👦 Student Login Mode</span>
            </button>

            <button
              onClick={onGenerateCertificate}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-black px-5 py-3 rounded-2xl text-xs border border-orange-400/40 shadow-md transition-all"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>View Gurukul Certificate</span>
            </button>
          </div>
        </div>

        {/* Decorative background bot */}
        <div className="absolute right-[-40px] bottom-[-40px] opacity-15 pointer-events-none hidden lg:block">
          <Bot className="w-96 h-96 text-white" />
        </div>
      </div>

      {/* Hero "ASK SUPER AI" Primary Card in Crisp White & Orange */}
      <div 
        onClick={() => onOpenAskAI()}
        className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-300 hover:border-orange-500 shadow-orange-card cursor-pointer transition-all group relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform border border-orange-200">
              <Bot className="w-9 h-9 text-orange-600 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-orange-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow-2xs">
                  Central AI Hub
                </span>
                <span className="text-xs text-orange-600 font-bold">24x7 Multi-Expert</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 group-hover:text-orange-600 transition-colors">
                🤖 ASK SUPER AI (సూపర్ AI)
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                Ask about circuit building, math problems, robotics, healthy recipes, stories, or parenting guidance in English & Telugu.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-700 bg-orange-50/80 px-3.5 py-2.5 rounded-2xl border border-orange-200 font-semibold">
              <Mic className="w-4 h-4 text-orange-600" />
              <ImageIcon className="w-4 h-4 text-amber-600" />
              <span>Voice • Vision • Diagram</span>
            </div>

            <span className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black text-xs px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 transition-all">
              <span>Open AI Window</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>

      {/* Super Student Free Perks & 11 AI Courses Highlight Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-orange-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-md">
            🎁
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-orange-200">
                NEW 2026 PERKS
              </span>
              <span className="text-xs text-slate-600 font-bold">GitHub Developer Pack • Notion • Canva • Google AI</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              🎓 Super Student Menu: Free Student Packs & 11 AI Master Courses
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
              Claim $200k+ in free student coding tools plus 11 verified Prompt Engineering and ChatGPT mastery masterclasses.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('super-student')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-2xl shadow-xs transition-all transform hover:scale-105 flex items-center gap-1.5 shrink-0"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>11 AI Courses Path</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('super-student')}
            className="bg-white hover:bg-orange-50 text-orange-700 border border-orange-300 font-bold text-xs px-4 py-2.5 rounded-2xl shadow-xs transition-all transform hover:scale-105 flex items-center gap-1.5 shrink-0"
          >
            <span>👨‍👩‍👧 Parent Savings Guide</span>
            <ArrowRight className="w-4 h-4 text-orange-600" />
          </button>
        </div>
      </div>

      {/* 10 Main Ecosystem Hub Tiles Grid in Pristine White with Orange Accents */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-600" />
            <span>Choose Your Need (10 Core Gurukul Hubs)</span>
          </h2>
          <span className="text-xs text-slate-500 font-bold hidden sm:block">LKG to 10th Class & Parents</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {hubTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <div
                key={tile.id}
                onClick={() => setActiveTab(tile.id)}
                className="bg-white rounded-3xl border border-slate-200 hover:border-orange-400 p-4 shadow-xs hover:shadow-orange-card transition-all cursor-pointer group flex flex-col justify-between space-y-3 relative overflow-hidden"
              >
                {tile.badge && (
                  <span className="absolute top-3 right-3 bg-orange-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                    {tile.badge}
                  </span>
                )}

                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 group-hover:bg-orange-600 group-hover:text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-all">
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="font-black text-slate-900 text-sm group-hover:text-orange-600 transition-colors">
                    {tile.label}
                  </h3>
                  <p className="text-[11px] text-orange-700 font-semibold mt-0.5">
                    {tile.teluguLabel}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 group-hover:text-orange-600 font-bold">
                  <span>Explore Hub</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Family Activity Feed Component */}
      <FamilyActivityFeed 
        onNavigateTab={setActiveTab}
        onOpenAskAI={() => onOpenAskAI()}
      />

      {/* AI Multi-Expert Persona Cards Row */}
      <div className="bg-white rounded-3xl p-6 border border-orange-200 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest block">SUPER AI Suite</span>
            <h3 className="text-lg font-black text-slate-900">Dedicated AI Multi-Expert Specialists</h3>
          </div>
          <button
            onClick={() => onOpenAskAI()}
            className="text-xs font-black text-orange-600 hover:text-orange-700 flex items-center gap-1"
          >
            <span>View All Experts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {AI_EXPERTS.slice(1, 6).map((exp) => (
            <button
              key={exp.id}
              onClick={() => onOpenAskAI(exp.id)}
              className="bg-orange-50/50 hover:bg-orange-50 p-3 rounded-2xl border border-orange-100 hover:border-orange-300 text-left space-y-1 transition-all group shadow-2xs"
            >
              <div className="text-orange-700 font-black text-xs truncate group-hover:text-orange-600 transition-colors">
                {exp.name.replace('AI ', '')}
              </div>
              <div className="text-[10px] text-slate-600 font-medium truncate">{exp.teluguName}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Summary & Contact Banner */}
      <div className="bg-gradient-to-r from-orange-50 via-white to-orange-50 border border-orange-200 rounded-3xl p-6 space-y-4 text-slate-900 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% TRANSPARENT PRICING
              </span>
              <span className="text-xs text-orange-700 font-bold">Online + Home Learning + Offline Support</span>
            </div>
            <h3 className="font-black text-base text-slate-900 mt-1">
              Course Fee: ₹600 – ₹2,000 | ISO Certified Gurukul Curriculum
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              All plans include Verified Certificate + Instructor Mentorship. Contact: {COMPANY_INFO.phone1} / {COMPANY_INFO.phone2}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('pricing')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-black text-xs px-6 py-3.5 rounded-2xl shadow-md shrink-0 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>View Fee Plans & Enroll</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

