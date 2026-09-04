import React, { useState, useEffect } from 'react';
import { UserRole, NavTab, AIExpertPersona, AppThemeId } from '../types';
import { 
  Sparkles, 
  BookOpen, 
  Flame, 
  Trophy, 
  Bot, 
  Video, 
  Cpu, 
  Heart, 
  Scroll, 
  Compass, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Users, 
  Award, 
  Globe, 
  Star, 
  TrendingUp, 
  CreditCard, 
  Sliders, 
  FileCheck2, 
  Smile, 
  Crown,
  ShoppingBag,
  Layers,
  Check
} from 'lucide-react';
import { DailyReflectionZone } from './DailyReflectionZone';
import { ByjusLearningTemplate } from './ByjusLearningTemplate';
import { UnacademyLearningTemplate } from './UnacademyLearningTemplate';
import { SoftwareToolboxModal } from './SoftwareToolboxModal';
import { BrandingHeroBanner } from './BrandingHeroBanner';
import { BrandingContactSection } from './BrandingContactSection';
import { APP_THEMES } from '../data/themes';

interface DashboardHomeProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  setActiveTab: (tab: NavTab) => void;
  onOpenAskAI: (persona?: AIExpertPersona, prefilledQuery?: string) => void;
  onGenerateCertificate: () => void;
  studentName?: string;
  currentXP?: number;
  streakDays?: number;
  onEarnXP?: (points: number, reason?: string) => void;
  currentTheme?: AppThemeId;
  onSelectTheme?: (theme: AppThemeId) => void;
  onOpenContact?: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  role,
  setRole,
  setActiveTab,
  onOpenAskAI,
  onGenerateCertificate,
  studentName = 'Chaitanya Reddy',
  currentXP = 3450,
  streakDays = 14,
  onEarnXP,
  currentTheme = 'theosm-branding',
  onSelectTheme,
  onOpenContact
}) => {
  const [edTechView, setEdTechView] = useState<'byjus' | 'unacademy' | 'unified'>(() => {
    if (currentTheme === 'byjus-purple') return 'byjus';
    if (currentTheme === 'unacademy-green') return 'unacademy';
    return 'unified';
  });

  const [isToolboxOpen, setIsToolboxOpen] = useState(false);

  // Sync view when currentTheme changes from external selectors
  useEffect(() => {
    if (currentTheme === 'byjus-purple') {
      setEdTechView('byjus');
    } else if (currentTheme === 'unacademy-green') {
      setEdTechView('unacademy');
    }
  }, [currentTheme]);

  const WORKSPACE_TABS: { id: UserRole; label: string; icon: string; themeName: string }[] = [
    { id: 'student', label: 'Kids Workspace', icon: '👦', themeName: 'Amber' },
    { id: 'parent', label: 'Parents Workspace', icon: '👨‍👩‍👧', themeName: 'Royal Blue' },
    { id: 'admin', label: 'Admin Workspace', icon: '🛡️', themeName: 'Vedic Green' }
  ];

  // =========================================================================
  // 1. PARENT EXECUTIVE DASHBOARD (COMPLETE BLUE PALETTE)
  // =========================================================================
  if (role === 'parent') {
    return (
      <div className="space-y-6">
        
        {/* Parent Executive Blue Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-blue-500/30">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-wide border border-white/30">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
              <span>Parents Executive Portal Active</span>
              <span className="bg-blue-300 text-blue-950 text-[10px] px-1.5 py-0.2 rounded font-black">Royal Blue</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
              Namaste, Rajesh & Lakshmi Reddy! 👨‍👩‍👧
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium">
              Welcome to your dedicated Parent Workspace. Supervise Chaitanya's academic progress, review screen-free habits, approve marketplace projects, and consult the AI Child Psychologist.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => setActiveTab('growth')}
                className="px-4 py-2 bg-white text-blue-800 font-black text-xs rounded-xl shadow-md hover:bg-blue-50 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span>View Growth Analytics</span>
              </button>
              <button
                onClick={() => onOpenAskAI('parenting', 'How to balance screen-free family routine with exam preparation?')}
                className="px-4 py-2 bg-blue-950/50 hover:bg-blue-950/70 border border-white/20 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-blue-200" />
                <span>Consult Parenting AI</span>
              </button>
              <button
                onClick={() => setActiveTab('marketplace')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-blue-200" />
                <span>Project Approvals (1 Pending)</span>
              </button>
            </div>
          </div>

          {/* Workspace Role Switcher Pills (Kids -> Parents -> Admin) */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 space-y-2 shrink-0 w-full md:w-auto">
            <div className="text-[11px] font-bold text-blue-200 flex items-center justify-between">
              <span>Switch Workspace:</span>
            </div>
            <div className="flex items-center gap-1.5">
              {WORKSPACE_TABS.map(w => (
                <button
                  key={w.id}
                  onClick={() => {
                    setRole(w.id);
                    if (w.id === 'admin') setActiveTab('admin');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                    role === w.id
                      ? 'bg-white text-blue-900 shadow-md font-black'
                      : 'bg-black/20 text-white/80 hover:bg-black/30 hover:text-white'
                  }`}
                >
                  <span>{w.icon}</span>
                  <span>{w.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Parent Blue Stat Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Child Daily Study Focus',
              value: '2h 45m / day',
              subtext: 'Top 5% Gurukul consistency',
              icon: Clock,
              bg: 'bg-blue-50/80 border-blue-200',
              color: 'text-blue-600'
            },
            {
              label: 'Screen-Free Routine Score',
              value: '92% Balanced',
              subtext: 'Evening family bonding active',
              icon: Smile,
              bg: 'bg-indigo-50/80 border-indigo-200',
              color: 'text-indigo-600'
            },
            {
              label: 'Practice & Exam Accuracy',
              value: '94.2% Average',
              subtext: 'CBSE Class 8 + Vedic Math',
              icon: Award,
              bg: 'bg-sky-50/80 border-sky-200',
              color: 'text-sky-600'
            },
            {
              label: 'Super Parent Subscription',
              value: 'Super Family Active',
              subtext: '100% Unlimited Gurukul Access',
              icon: Crown,
              bg: 'bg-blue-50 border-blue-300',
              color: 'text-blue-700'
            }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={`p-4 rounded-2xl border ${stat.bg} shadow-xs space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{stat.label}</span>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">{stat.value}</div>
                <div className="text-[11px] font-bold text-slate-500">{stat.subtext}</div>
              </div>
            );
          })}
        </div>

        {/* 2-Column Section: Parent Guidance Tools & AI Child Psychology Assist */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Dedicated Parent Modules */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Quick Access to Parents Modules Grid */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">Parents Workspace Modules</h3>
                  <p className="text-xs text-slate-500 font-medium">Tools designed exclusively for child development & family harmony</p>
                </div>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  Parent Access
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    id: 'parenting',
                    name: 'Parenting Master Articles',
                    telugu: 'పేరెంటింగ్ ఆర్టికల్స్ & చైల్డ్ సైకాలజీ',
                    desc: 'Research-backed guides on screen-time, exam anxiety & emotional resilience.',
                    icon: Users,
                    color: 'text-blue-600',
                    bg: 'bg-blue-50/70 hover:bg-blue-100/70 border-blue-100'
                  },
                  {
                    id: 'growth',
                    name: 'Child Growth & Karma Map',
                    telugu: 'రిపోర్ట్ కార్డ్ & సామర్థ్య విశ్లేషణ',
                    desc: 'Weekly milestone tracking, subject mastery curves, and character report.',
                    icon: TrendingUp,
                    color: 'text-indigo-600',
                    bg: 'bg-indigo-50/70 hover:bg-indigo-100/70 border-indigo-100'
                  },
                  {
                    id: 'marketplace',
                    name: 'Talent Approvals & Projects',
                    telugu: 'ప్రాజెక్ట్ ఆమోదాలు & మార్కెట్‌ప్లేస్',
                    desc: 'Approve your child’s DIY robotics creations and shloka recordings before publishing.',
                    icon: FileCheck2,
                    color: 'text-sky-600',
                    bg: 'bg-sky-50/70 hover:bg-sky-100/70 border-sky-100'
                  },
                  {
                    id: 'pricing',
                    name: 'Plans & Fee Management',
                    telugu: 'ఫీజు ప్రణాళికలు & సబ్‌స్క్రిప్షన్',
                    desc: 'Manage family subscriptions (₹600 - ₹2000), invoices, and offline center passes.',
                    icon: CreditCard,
                    color: 'text-blue-700',
                    bg: 'bg-blue-50/70 hover:bg-blue-100/70 border-blue-100'
                  }
                ].map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => setActiveTab(mod.id as NavTab)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${mod.bg}`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className={`w-5 h-5 ${mod.color}`} />
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-900 leading-tight">{mod.name}</h4>
                        <p className="text-[11px] text-blue-700 font-bold">{mod.telugu}</p>
                        <p className="text-xs text-slate-500 font-medium mt-1 leading-snug">{mod.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pending Talent Marketplace Project Approval Alert */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">Pending Child Project Approval</h3>
                    <p className="text-[11px] text-slate-500">Chaitanya submitted a new DIY project for review</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-black text-[10px]">Action Required</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-black text-slate-900">Arduino Automatic Plant Watering System</h4>
                  <p className="text-[11px] text-slate-500">Robotics & IoT Lab • Submitted 3 hours ago</p>
                </div>
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Review & Approve
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: AI Child Psychologist & Guidance */}
          <div className="space-y-6">
            
            <div className="bg-gradient-to-b from-blue-50 to-indigo-50/50 rounded-3xl p-6 border border-blue-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Parenting AI Assistant</h3>
                  <p className="text-[11px] text-blue-700 font-medium">Child Psychology & Parenting Guidance</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    title: 'Digital Balance & Screen Time',
                    desc: 'How to replace excessive smartphone screen time with constructive hobbies.',
                    query: 'What are proven strategies to manage screen addiction for an 8th-grade student without conflict?'
                  },
                  {
                    title: 'Exam Anxiety & Encouragement',
                    desc: 'Promoting growth mindset without putting academic pressure on marks.',
                    query: 'How should parents encourage children before exams to reduce stress and boost natural confidence?'
                  },
                  {
                    title: 'Daily Family Reflection Routine',
                    desc: 'Questions to ask during dinner to build deep emotional connection.',
                    query: 'Give me 5 meaningful conversation starters for parents to ask their children at evening dinner.'
                  }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => onOpenAskAI('parenting', item.query)}
                    className="p-3 rounded-2xl bg-white border border-blue-100 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer space-y-1 group"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onOpenAskAI('parenting', '')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Bot className="w-3.5 h-3.5 text-blue-200" />
                <span>Ask Parenting AI Question</span>
              </button>
            </div>

            {/* Gurukul Value Verification Badge */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-slate-900 text-sm">Parent Family Shield</h3>
                <ShieldCheck className="w-4 h-4 text-blue-600" />
              </div>
              <div className="p-3 rounded-xl bg-blue-50 text-blue-900 text-xs font-medium space-y-1">
                <span className="font-bold block">Safe, Ad-Free Learning Vault</span>
                <p className="text-[11px] text-blue-700">All student interactions, AI queries, and videos are strictly moderated and child-safe.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // 2. ADMIN MASTER WORKSPACE (COMPLETE GREEN PALETTE)
  // =========================================================================
  if (role === 'admin') {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-500/30">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-wide border border-white/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
              <span>Admin Superuser Command Active</span>
              <span className="bg-emerald-300 text-emerald-950 text-[10px] px-1.5 py-0.2 rounded font-black">Vedic Green</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
              Master Admin Command Center 🛡️
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium">
              Complete oversight across all Kids Learning Modules, Parents Portals, Security Audits, and System Health Diagnostics.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => setActiveTab('admin')}
                className="px-4 py-2 bg-white text-emerald-800 font-black text-xs rounded-xl shadow-md hover:bg-emerald-50 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Open Admin Portal</span>
              </button>
              <button
                onClick={() => setActiveTab('testing')}
                className="px-4 py-2 bg-emerald-950/50 hover:bg-emerald-950/70 border border-white/20 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5 text-emerald-200" />
                <span>Run System Diagnostics</span>
              </button>
            </div>
          </div>

          {/* Workspace Role Switcher Pills (Kids -> Parents -> Admin) */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 space-y-2 shrink-0 w-full md:w-auto">
            <div className="text-[11px] font-bold text-emerald-200 flex items-center justify-between">
              <span>Switch Workspace:</span>
            </div>
            <div className="flex items-center gap-1.5">
              {WORKSPACE_TABS.map(w => (
                <button
                  key={w.id}
                  onClick={() => {
                    setRole(w.id);
                    if (w.id === 'admin') setActiveTab('admin');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                    role === w.id
                      ? 'bg-white text-emerald-900 shadow-md font-black'
                      : 'bg-black/20 text-white/80 hover:bg-black/30 hover:text-white'
                  }`}
                >
                  <span>{w.icon}</span>
                  <span>{w.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Quick Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Students', value: '1,420 Enrolled', subtext: '99.4% uptime', icon: Users, bg: 'bg-emerald-50 border-emerald-200', color: 'text-emerald-600' },
            { label: 'Parent Accounts', value: '1,280 Families', subtext: '96% engagement', icon: Heart, bg: 'bg-teal-50 border-teal-200', color: 'text-teal-600' },
            { label: 'Live Virtual Rooms', value: '12 Active Today', subtext: 'Zoom + Meet sync', icon: Video, bg: 'bg-emerald-50 border-emerald-200', color: 'text-emerald-600' },
            { label: 'System Security', value: '100% Protected', subtext: 'Zero vulnerabilities', icon: ShieldCheck, bg: 'bg-teal-50 border-teal-200', color: 'text-teal-600' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={`p-4 rounded-2xl border ${stat.bg} shadow-xs space-y-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">{stat.label}</span>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">{stat.value}</div>
                <div className="text-[11px] font-bold text-slate-500">{stat.subtext}</div>
              </div>
            );
          })}
        </div>

        {/* Admin Direct Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { tab: 'admin' as NavTab, title: 'Security & Access Logs', desc: 'Manage role assignments, permissions, and audit logs.', icon: ShieldCheck },
            { tab: 'testing' as NavTab, title: 'Health & Link Diagnostics', desc: 'Verify all 100+ course links, YouTube videos, and APIs.', icon: Sliders },
            { tab: 'education' as NavTab, title: 'Supervise Education Hub', desc: 'Audit CBSE, ICSE, and AP State Board syllabi from LKG to 10.', icon: BookOpen },
            { tab: 'parenting' as NavTab, title: 'Parent Guidance CMS', desc: 'Update parenting psychology research articles.', icon: Users },
            { tab: 'pricing' as NavTab, title: 'Fee & Plan Tier Configuration', desc: 'Monitor revenue streams and membership renewals.', icon: CreditCard },
            { tab: 'global' as NavTab, title: 'Global Gurukul Hubs', desc: 'Coordinate regional chapter timings across 6 time zones.', icon: Globe }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(item.tab)}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all text-left space-y-2 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 text-emerald-600" />
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </button>
            );
          })}
        </div>

      </div>
    );
  }

  // =========================================================================
  // 3. KIDS GURUKUL DASHBOARD (SAFFRON / AMBER PALETTE)
  // =========================================================================
  const upcomingClasses = [
    {
      id: 'cls-1',
      title: 'Live Vedic Math Speed Multiplications',
      instructor: 'Dr. Venkat Rao (IIT Madras Alum)',
      time: 'Today, 5:30 PM IST',
      platform: 'Interactive Zoom Room',
      category: 'Math Mastery',
      tag: 'Live in 2h',
      tab: 'classroom' as NavTab
    },
    {
      id: 'cls-2',
      title: 'Robotics: Obstacle Avoidance Sensor Wiring',
      instructor: 'Er. Sravani (Robotics Lead)',
      time: 'Tomorrow, 6:00 PM IST',
      platform: 'Virtual DIY Lab',
      category: 'Innovation',
      tag: 'Hands-on DIY',
      tab: 'innovation' as NavTab
    },
    {
      id: 'cls-3',
      title: 'Telugu Balamitra & Panchatantra Moral Session',
      instructor: 'Smt. Padmavathi (Gurukul Sanskrit/Telugu)',
      time: 'Sunday, 10:00 AM IST',
      platform: 'Cultural Story Room',
      category: 'Culture & Sanskar',
      tag: 'Bilingual',
      tab: 'stories' as NavTab
    }
  ];

  const quickStats = [
    {
      label: 'Learning Streak',
      value: `${streakDays} Days`,
      icon: Flame,
      color: 'text-amber-500',
      bg: 'bg-amber-50 border-amber-200',
      subtext: '🔥 100% active this week'
    },
    {
      label: 'Total Gurukul XP',
      value: `${currentXP} XP`,
      icon: Trophy,
      color: 'text-orange-500',
      bg: 'bg-orange-50 border-orange-200',
      subtext: 'Level 8 Scholar'
    },
    {
      label: 'Courses in Progress',
      value: '6 Modules',
      icon: BookOpen,
      color: 'text-blue-500',
      bg: 'bg-blue-50 border-blue-200',
      subtext: 'CBSE + Robotics + Vedic'
    },
    {
      label: 'Verified Certificates',
      value: '3 Earned',
      icon: Award,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 border-emerald-200',
      subtext: 'ISO & Gurukul Verified'
    }
  ];

  const aiShortcuts = [
    {
      persona: 'tutor' as AIExpertPersona,
      title: 'AI Subject Tutor',
      telugu: 'సబ్జెక్ట్ ట్యూటర్',
      icon: '📐',
      desc: 'Math, Physics, Chemistry, Coding & State/CBSE doubts',
      query: 'Explain quadratic equations with visual step-by-step logic.'
    },
    {
      persona: 'robotics' as AIExpertPersona,
      title: 'Robotics & DIY Mentor',
      telugu: 'రోబోటిక్స్ మెంటార్',
      icon: '🤖',
      desc: 'Arduino, ESP32, Drone motors & ultrasonic sensor circuits',
      query: 'How to build obstacle avoidance robot circuit with Arduino?'
    },
    {
      persona: 'storytelling' as AIExpertPersona,
      title: 'Telugu Moral Storyteller',
      telugu: 'కథలు & సంస్కృతి',
      icon: '📜',
      desc: 'Chandamama, Balamitra, Panchatantra & Gita shlokas',
      query: 'Tell me a moral story from Chandamama with life lessons in Telugu and English.'
    },
    {
      persona: 'science' as AIExpertPersona,
      title: 'Science Experiment Lab Mentor',
      telugu: 'సైన్స్ ప్రయోగాలు',
      icon: '🔬',
      desc: 'Hands-on kitchen science, Newton laws, chemistry experiments',
      query: 'What are safe kitchen science experiments I can do to understand atmospheric pressure?'
    }
  ];

  const themeObj = APP_THEMES[currentTheme || 'theosm-branding'] || APP_THEMES['theosm-branding'];

  return (
    <div className="space-y-6">
      
      {/* Flagship Dribbble Branding Hero Banner */}
      <BrandingHeroBanner
        theme={themeObj}
        onNavigateTab={setActiveTab}
        onOpenContact={onOpenContact || (() => {})}
        onOpenAskAI={() => onOpenAskAI('general', '')}
      />

      {/* Software Utility Dock Modal */}
      <SoftwareToolboxModal
        isOpen={isToolboxOpen}
        onClose={() => setIsToolboxOpen(false)}
        currentTheme={currentTheme}
      />

      {/* Professional EdTech Operating Bar (THEOSM • BYJU'S • Unacademy • Unified) */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-black text-slate-800 flex items-center gap-1 mr-1">
            <Layers className="w-4 h-4 text-[#021807]" />
            <span>EdTech Template:</span>
          </span>

          {/* THEOSM™ Mode Tab */}
          <button
            onClick={() => {
              setEdTechView('unified');
              if (onSelectTheme) onSelectTheme('theosm-branding');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTheme === 'theosm-branding'
                ? 'bg-[#021807] text-[#63C633] shadow-xs ring-2 ring-[#63C633]'
                : 'bg-emerald-50 hover:bg-emerald-100 text-[#021807] border border-[#CBD6A3]'
            }`}
          >
            <span>⚡</span>
            <span>THEOSM™ Neo-Lime</span>
          </button>

          {/* Visual 3D Mode Tab */}
          <button
            onClick={() => {
              setEdTechView('byjus');
              if (onSelectTheme) onSelectTheme('byjus-purple');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              edTechView === 'byjus' || currentTheme === 'byjus-purple'
                ? 'bg-purple-700 text-white shadow-xs ring-2 ring-purple-300'
                : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200'
            }`}
          >
            <span>🟣</span>
            <span>Visual 3D Learning</span>
          </button>

          {/* Top Educator Live Mode Tab */}
          <button
            onClick={() => {
              setEdTechView('unacademy');
              if (onSelectTheme) onSelectTheme('unacademy-green');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              edTechView === 'unacademy' || currentTheme === 'unacademy-green'
                ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200'
            }`}
          >
            <span>🟢</span>
            <span>Top Educator Live</span>
          </button>

          {/* Unified Gurukul Pro Tab */}
          <button
            onClick={() => {
              setEdTechView('unified');
              if (onSelectTheme) onSelectTheme('gurukul-amber');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              edTechView === 'unified' && currentTheme === 'gurukul-amber'
                ? 'bg-orange-600 text-white shadow-xs ring-2 ring-orange-300'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200'
            }`}
          >
            <span>🟠</span>
            <span>Unified Gurukul</span>
          </button>
        </div>

        {/* Right side toolbox button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsToolboxOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-amber-300" />
            <span>Software Tools (Timer, Calc, Notes)</span>
          </button>
        </div>
      </div>

      {/* Conditionally Render Dedicated BYJU'S Experience */}
      {edTechView === 'byjus' && (
        <ByjusLearningTemplate
          studentName={studentName}
          currentXP={currentXP}
          streakDays={streakDays}
          onNavigateTab={setActiveTab}
          onOpenAskAI={onOpenAskAI}
          onEarnXP={onEarnXP}
        />
      )}

      {/* Conditionally Render Dedicated Unacademy Experience */}
      {edTechView === 'unacademy' && (
        <UnacademyLearningTemplate
          studentName={studentName}
          currentXP={currentXP}
          streakDays={streakDays}
          onNavigateTab={setActiveTab}
          onOpenAskAI={onOpenAskAI}
          onEarnXP={onEarnXP}
        />
      )}

      {/* Unified Multi-EdTech Overview (when Unified is selected) */}
      {edTechView === 'unified' && (
        <>
          {/* Quick EdTech Jump Cards (Byju's 3D & Unacademy Live) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Byju's Card */}
            <div 
              onClick={() => {
                setEdTechView('byjus');
                if (onSelectTheme) onSelectTheme('byjus-purple');
              }}
              className="p-5 rounded-3xl bg-gradient-to-br from-purple-800 to-purple-950 text-white shadow-md border border-purple-500/30 flex items-center justify-between gap-4 cursor-pointer hover:scale-[1.01] transition-transform"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-400 text-purple-950 text-[10px] font-black uppercase">
                    Visual 3D Template
                  </span>
                  <span className="text-xs text-purple-200">Concept Mastery 3D</span>
                </div>
                <h3 className="text-base font-black">Visual Concept Animations & 60s Doubt Solver</h3>
                <p className="text-xs text-purple-200">Interactive 3D rocket physics, visual geometry proofs, and adaptive difficulty ladder.</p>
              </div>
              <ArrowRight className="w-6 h-6 text-amber-300 shrink-0" />
            </div>

            {/* Unacademy Card */}
            <div 
              onClick={() => {
                setEdTechView('unacademy');
                if (onSelectTheme) onSelectTheme('unacademy-green');
              }}
              className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white shadow-md border border-emerald-500/30 flex items-center justify-between gap-4 cursor-pointer hover:scale-[1.01] transition-transform"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-400 text-slate-950 text-[10px] font-black uppercase">
                    Live Classroom Template
                  </span>
                  <span className="text-xs text-emerald-300">Live Classroom & Combat</span>
                </div>
                <h3 className="text-base font-black">Interactive Live Classes & All India Combat Polls</h3>
                <p className="text-xs text-slate-300">Top IIT/AIIMS educators, live classroom chat, daily scholarship tests, and percentiles.</p>
              </div>
              <ArrowRight className="w-6 h-6 text-emerald-400 shrink-0" />
            </div>
          </div>

          {/* Workspace Banner (Amber / Saffron) */}
          <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-wide border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Kids Workspace Active</span>
            <span className="bg-amber-400 text-orange-950 text-[10px] px-1.5 py-0.2 rounded font-black">Saffron Amber</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
            Namaste, {studentName}! 👦🙏
          </h1>
          <p className="text-xs sm:text-sm text-orange-100 font-medium">
            Welcome to your Gurukul Learning Dashboard. Explore your LKG-10 courses, join live interactive classrooms, build robotics experiments, and practice Bhagavad Gita shlokas.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab('classroom')}
              className="px-4 py-2 bg-white text-orange-700 font-black text-xs rounded-xl shadow-md hover:bg-orange-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Join Live Classroom</span>
            </button>
            <button
              onClick={() => onOpenAskAI('general', 'What is on my study plan today?')}
              className="px-4 py-2 bg-orange-950/40 hover:bg-orange-950/60 border border-white/20 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-amber-300" />
              <span>Ask Super AI</span>
            </button>
            <button
              onClick={onGenerateCertificate}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Generate Certificate</span>
            </button>
          </div>
        </div>

        {/* Workspace Role Switcher Pills (Kids -> Parents -> Admin) */}
        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 space-y-2 shrink-0 w-full md:w-auto">
          <div className="text-[11px] font-bold text-orange-200 flex items-center justify-between">
            <span>Switch Workspace:</span>
          </div>
          <div className="flex items-center gap-1.5">
            {WORKSPACE_TABS.map(w => (
              <button
                key={w.id}
                onClick={() => {
                  setRole(w.id);
                  if (w.id === 'admin') setActiveTab('admin');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer ${
                  role === w.id
                    ? 'bg-white text-orange-900 shadow-md font-black'
                    : 'bg-black/20 text-white/80 hover:bg-black/30 hover:text-white'
                }`}
              >
                <span>{w.icon}</span>
                <span>{w.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border ${stat.bg} shadow-xs space-y-2`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">{stat.label}</span>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900">{stat.value}</div>
              <div className="text-[11px] font-bold text-slate-500">{stat.subtext}</div>
            </div>
          );
        })}
      </div>

      {/* Daily Reflection Interactive Zone */}
      <DailyReflectionZone
        studentName={studentName}
        onEarnXP={onEarnXP || (() => {})}
        onAskAI={(query) => onOpenAskAI('tutor', query)}
      />

      {/* 2-Column Main Section: Upcoming Live Classes & Super AI Quick Assist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Live Classroom Schedule & Core Software Modules */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Upcoming Live Classes Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Upcoming Live Gurukul Classes</h3>
                <p className="text-xs text-slate-500 font-medium">Bilingual classes (Telugu + English) with live chat & doubts</p>
              </div>
              <button
                onClick={() => setActiveTab('classroom')}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
              >
                <span>View All Rooms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-orange-50/50 border border-slate-200/80 hover:border-orange-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-black uppercase">
                        {cls.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
                        {cls.time}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        {cls.tag}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{cls.title}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{cls.instructor} • {cls.platform}</p>
                  </div>

                  <button
                    onClick={() => setActiveTab(cls.tab)}
                    className="px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    <span>Enter Room</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access to Kids Gurukul Modules Grid */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-base">Kids Gurukul Learning Modules</h3>
              <span className="text-xs text-slate-400 font-medium">100% Unlocked</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'education', name: 'Education Hub (LKG-10)', telugu: 'పాఠ్యాంశాలు', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50 hover:bg-blue-100/70 border-blue-100' },
                { id: 'practice-master', name: 'Practice Master', telugu: 'పరీక్షలు & క్విజ్', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50 hover:bg-amber-100/70 border-amber-100' },
                { id: 'kids-lab', name: 'Kids Lab Zone', telugu: 'సైన్స్ ప్రయోగాలు', icon: Cpu, color: 'text-purple-600', bg: 'bg-purple-50 hover:bg-purple-100/70 border-purple-100' },
                { id: 'stories', name: 'Stories & Culture', telugu: 'చందమామ & కథలు', icon: Scroll, color: 'text-orange-600', bg: 'bg-orange-50 hover:bg-orange-100/70 border-orange-100' },
                { id: 'sanskar', name: 'Values & Gita', telugu: 'సంస్కార & గీత', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50 hover:bg-rose-100/70 border-rose-100' },
                { id: 'innovation', name: 'Innovation Lab', telugu: 'రోబోటిక్స్ & డ్రోన్స్', icon: Compass, color: 'text-emerald-600', bg: 'bg-emerald-50 hover:bg-emerald-100/70 border-emerald-100' },
                { id: 'games', name: 'Brain Games', telugu: 'మెదడు ఆటలు', icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-50 hover:bg-indigo-100/70 border-indigo-100' },
                { id: 'showcase', name: 'Student Showcase', telugu: 'షోకేస్', icon: Award, color: 'text-cyan-600', bg: 'bg-cyan-50 hover:bg-cyan-100/70 border-cyan-100' },
                { id: 'marketplace', name: 'Kids Handmade & DIY', telugu: 'చేతివృత్తులు & రోబోట్స్', icon: ShoppingBag, color: 'text-amber-600', bg: 'bg-amber-50 hover:bg-amber-100/70 border-amber-100' },
                { id: 'offline-hub', name: 'PWA Offline Hub', telugu: 'ఆఫ్‌లైన్ డౌన్‌లోడ్', icon: Globe, color: 'text-teal-600', bg: 'bg-teal-50 hover:bg-teal-100/70 border-teal-100' }
              ].map((mod) => {
                const Icon = mod.icon;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveTab(mod.id as NavTab)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${mod.bg}`}
                  >
                    <Icon className={`w-5 h-5 ${mod.color}`} />
                    <div>
                      <h4 className="text-xs font-black text-slate-900 leading-tight">{mod.name}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">{mod.telugu}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Super AI Multi-Experts Quick Launch & Activity */}
        <div className="space-y-6">
          
          {/* Super AI Multi-Expert Launcher Card */}
          <div className="bg-gradient-to-b from-orange-50 to-amber-50/50 rounded-3xl p-6 border border-orange-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">Super AI Quick Assist</h3>
                  <p className="text-[11px] text-orange-700 font-medium">10 Dedicated Expert Personas</p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {aiShortcuts.map((aiItem, idx) => (
                <div
                  key={idx}
                  onClick={() => onOpenAskAI(aiItem.persona, aiItem.query)}
                  className="p-3 rounded-2xl bg-white border border-orange-100 hover:border-orange-400 hover:shadow-xs transition-all cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{aiItem.icon}</span>
                      <h4 className="text-xs font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                        {aiItem.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-orange-600 transition-colors" />
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight pl-7">{aiItem.desc}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenAskAI('general', '')}
              className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-amber-200" />
              <span>Launch Full Super AI Chat</span>
            </button>
          </div>

          {/* Recent Achievements Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 text-sm">Recent Achievements</h3>
              <Star className="w-4 h-4 text-amber-500" />
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">7-Day Consistency Streak</span>
                  <span className="text-[11px] text-emerald-700 font-medium">+200 XP Bonus Earned</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-100">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Bhagavad Gita Chapter 2 Complete</span>
                  <span className="text-[11px] text-blue-700 font-medium">All 72 Shlokas with Telugu meaning</span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-100">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Smart Irrigation Model Approved</span>
                  <span className="text-[11px] text-amber-700 font-medium">Published to Talent Marketplace</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      </>
      )}

      {/* Flagship Dribbble Branding Direct Contacts Station */}
      <BrandingContactSection
        theme={themeObj}
        onOpenModal={onOpenContact || (() => {})}
      />

    </div>
  );
};
