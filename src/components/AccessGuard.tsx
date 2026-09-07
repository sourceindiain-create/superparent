import React, { useState } from 'react';
import { NavTab, UserAccount, SubscriptionTier } from '../types';
import { 
  Lock, 
  Unlock, 
  Crown, 
  Sparkles, 
  ShieldAlert, 
  KeyRound, 
  ArrowRight, 
  Home, 
  CheckCircle2, 
  Zap, 
  Play, 
  Video, 
  Layers, 
  Users, 
  BookOpen, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export interface TabAccessRule {
  tab: NavTab;
  tabName: string;
  teluguName: string;
  requiredTier: SubscriptionTier;
  minRole: 'student' | 'parent' | 'admin';
  icon: string;
  description: string;
  features: string[];
  couponCode: string;
  couponPrice: number;
  regularPrice: number;
  previewVideoUrl?: string;
}

export const TAB_ACCESS_REGISTRY: Record<string, TabAccessRule> = {
  'education': {
    tab: 'education',
    tabName: 'Education Hub & Digital Textbooks',
    teluguName: 'విద్యా కేంద్రం & డిజిటల్ పాఠ్యపుస్తకాలు',
    requiredTier: 'kids',
    minRole: 'student',
    icon: '📚',
    description: 'CBSE, ICSE, NCERT & State Board lessons with interactive AI doubt clearing.',
    features: ['LKG to 10th Class Lessons', 'NCERT & State Board PDFs', 'Subject-wise Quizzes', 'AI Tutor Doubts'],
    couponCode: 'SUPER600',
    couponPrice: 600,
    regularPrice: 800
  },
  'sanskar': {
    tab: 'sanskar',
    tabName: 'Values, Sanskar & Bhagavad Gita',
    teluguName: 'విలువలు, సంస్కారాలు & భగవద్గీత',
    requiredTier: 'kids',
    minRole: 'student',
    icon: '🪔',
    description: 'All 700 Bhagavad Gita Shlokas with Sanskrit pronunciation, Telugu meaning and daily habits.',
    features: ['700 Gita Shlokas & Audio', 'Vedic Gurukul Library', 'Surya Namaskar & Yoga', 'Daily Sanskar Habit Tracker'],
    couponCode: 'SUPER600',
    couponPrice: 600,
    regularPrice: 800
  },
  'stories': {
    tab: 'stories',
    tabName: 'Moral Stories & Panchatantra',
    teluguName: 'నీతి కథలు & పంచతంత్రం',
    requiredTier: 'kids',
    minRole: 'student',
    icon: '📖',
    description: 'Interactive Panchatantra, Tenali Rama, and moral stories with audio narration.',
    features: ['Bilingual Telugu-English Audio', 'Moral Takeaways', 'AI Storyteller Generation', 'Illustrated Story Cards'],
    couponCode: 'SUPER600',
    couponPrice: 600,
    regularPrice: 800
  },
  'games': {
    tab: 'games',
    tabName: 'Cognitive Brain Games & Vedic Math',
    teluguName: 'మేధో వికాస ఆటలు & వేద గణితం',
    requiredTier: 'kids',
    minRole: 'student',
    icon: '🎮',
    description: 'Memory enhancers, speed math, logic puzzles and science trivia.',
    features: ['Vedic Speed Math Drills', 'Memory Matrix Challenge', 'Science Trivia Quizzes', 'Daily XP Leaderboard'],
    couponCode: 'SUPER600',
    couponPrice: 600,
    regularPrice: 800
  },
  'super-student': {
    tab: 'super-student',
    tabName: 'Super Student $200k+ Free Resources',
    teluguName: 'సూపర్ స్టూడెంట్ ఉచిత వనరుల నిధి',
    requiredTier: 'kids',
    minRole: 'student',
    icon: '🎁',
    description: '$200,000+ worth of free tools, IIT-JEE foundation kits, coding bootcamps and scholarships.',
    features: ['IIT-JEE Foundation Packs', 'Free Software Developer Packs', 'Global Olympiad Tests', 'College Scholarship Portals'],
    couponCode: 'SUPER600',
    couponPrice: 600,
    regularPrice: 800
  },
  'kids-lab': {
    tab: 'kids-lab',
    tabName: 'Kids Lab (3D Anatomy & AI Creative Studio)',
    teluguName: 'కిడ్స్ ల్యాబ్ (3D హ్యూమన్ అనాటమీ & ఏఐ ఎడిటింగ్)',
    requiredTier: 'kids',
    minRole: 'student',
    icon: '🧬',
    description: 'Explore 3D Human Body Anatomy with AnatomyZone and all-in-one media editing tools with 123apps.',
    features: ['3D Interactive Anatomy Models (AnatomyZone)', 'All Human Body Organ Systems', 'AI Video, Audio & PDF Suite (123apps)', 'Interactive Anatomy Detective Quiz'],
    couponCode: 'SUPER600',
    couponPrice: 600,
    regularPrice: 800
  },
  'practice-master': {
    tab: 'practice-master',
    tabName: 'Practice Master Zone (Global Portals, Research & Startup Hub)',
    teluguName: 'ప్రాక్టీస్ మాస్టర్ జోన్ (గ్లోబల్ పోర్టల్స్, బుక్స్ & రీసెర్చ్)',
    requiredTier: 'kids',
    minRole: 'student',
    icon: '🌐',
    description: 'All-in-one directory for 1st-10th CBSE/IB/State free portals, AnatomyZone, 123apps, IEEE research, global & Telugu digital libraries, startup incubators & spiritual wisdom.',
    features: ['1st-10th Free Syllabus Portals (Aglasem, NCERT, DIKSHA, Khan Academy)', '3D Anatomy & 123apps Creative Suite', 'Engineering & Research Papers (IEEE, arXiv, NPTEL, MIT OCW)', 'World Digital Library & Telugu Granthaalaya', 'Startup Incubators & MCA Company Registration', 'Complete Vedic & Spiritual Wisdom Libraries'],
    couponCode: 'SUPER600',
    couponPrice: 600,
    regularPrice: 800
  },
  'parenting': {
    tab: 'parenting',
    tabName: 'Parenting Master Hub & Psychology',
    teluguName: 'తల్లిదండ్రుల సమగ్ర వేదిక & మానసిక వికాసం',
    requiredTier: 'parent',
    minRole: 'parent',
    icon: '👨‍👩‍👧',
    description: 'Child psychology insights, positive discipline, doctor & nutritionist advisors and bonding activities.',
    features: ['Child Psychology Guidance', 'AI Pediatric Doctor & Nutritionist', 'Screen Time Balance Guides', 'Parent-Child Bonding Exercises'],
    couponCode: 'PARENT1000',
    couponPrice: 1000,
    regularPrice: 1200
  },
  'growth': {
    tab: 'growth',
    tabName: 'Child 360° Growth Radar & Analytics',
    teluguName: 'పిల్లల సమగ్ర ప్రగతి మ్యాప్ & విశ్లేషణ',
    requiredTier: 'parent',
    minRole: 'parent',
    icon: '📊',
    description: 'Real-time analytics across Academic, Moral, Cognitive, and Innovation milestones.',
    features: ['Subject Mastery Radar', 'Values & Sanskar Index', 'Verified Skill Badges', 'Printable Progress Certificate'],
    couponCode: 'PARENT1000',
    couponPrice: 1000,
    regularPrice: 1200
  },
  'marketplace': {
    tab: 'marketplace',
    tabName: 'Kids Talent & Project Marketplace',
    teluguName: 'పిల్లల నైపుణ్య & ప్రాజెక్ట్ మార్కెట్‌ప్లేస్',
    requiredTier: 'parent',
    minRole: 'parent',
    icon: '🛍️',
    description: 'Student-built crafts, robotics kits, and storybooks with parental approval workflow.',
    features: ['Student Project Sales', 'Parental Approval Gate', 'Safe Virtual Currency', 'Creative Entrepreneurship'],
    couponCode: 'PARENT1000',
    couponPrice: 1000,
    regularPrice: 1200
  },
  'classroom': {
    tab: 'classroom',
    tabName: 'Interactive Live Classrooms & Meet',
    teluguName: 'లైవ్ ఇంటరాక్టివ్ క్లాస్‌రూమ్‌లు & మీట్',
    requiredTier: 'super-parent',
    minRole: 'parent',
    icon: '🏫',
    description: 'Live interactive Zoom, Google Meet & YouTube classrooms with live quizzes and digital whiteboards.',
    features: ['HD Zoom & Meet Integration', 'Interactive Whiteboard Canvas', 'Live AI Doubt Clearing', 'Downloadable Class Notes'],
    couponCode: 'SUPER1500',
    couponPrice: 1500,
    regularPrice: 2000
  },
  'language-lab': {
    tab: 'language-lab',
    tabName: 'World Language & Sanskrit Lab',
    teluguName: 'ప్రపంచ భాషల ల్యాబ్ & సంస్కృత శిక్షణ',
    requiredTier: 'super-parent',
    minRole: 'parent',
    icon: '🌐',
    description: 'Master Sanskrit, Telugu, Hindi, English, German, French, and Japanese with native audio.',
    features: ['Interactive Pronunciation Scorer', 'Vedic Chanting Modules', 'Conversational AI Voice Bot', 'Grammar & Vocabulary Cards'],
    couponCode: 'SUPER1500',
    couponPrice: 1500,
    regularPrice: 2000
  },
  'innovation': {
    tab: 'innovation',
    tabName: 'Robotics, IoT & Drone DIY Lab',
    teluguName: 'రోబోటిక్స్, డ్రోన్స్ & ఇన్నోవేషన్ ల్యాబ్',
    requiredTier: 'super-parent',
    minRole: 'parent',
    icon: '🤖',
    description: 'Interactive circuit builders, 3D drone blueprints, Arduino simulators and robotics coding.',
    features: ['Interactive Falstad Circuit Simulator', '3D Drone & Robotics Blueprints', 'Arduino C++ & Python Codes', 'Tinkercad & PhET Real Labs'],
    couponCode: 'SUPER1500',
    couponPrice: 1500,
    regularPrice: 2000
  },
  'admin': {
    tab: 'admin',
    tabName: 'Admin Control Center & CMS',
    teluguName: 'అడ్మిన్ నియంత్రణ & నిర్వహణ వ్యవస్థ',
    requiredTier: 'admin',
    minRole: 'admin',
    icon: '🛡️',
    description: 'System master settings, audit logs, subscriber billing records, and automated test suites.',
    features: ['100% Master Access Override', 'Subscriber Payments CMS', 'Coupons Engine', 'Full-Stack Test Runner'],
    couponCode: 'ADMIN-ROOT',
    couponPrice: 0,
    regularPrice: 0
  }
};

export function checkTabAccess(
  tab: NavTab,
  user: UserAccount,
  masterAccessGranted: boolean
): { allowed: boolean; rule?: TabAccessRule; reason?: string } {
  // 1. Master Access Key or Super Admin is always 100% unlocked
  if (masterAccessGranted || user.hasFullAccess || user.role === 'admin') {
    return { allowed: true };
  }

  // 2. Open Public Tabs
  if (['home', 'homework', 'jiotv', 'gmail', 'pricing', 'contact', 'login', 'offline-hub', 'showcase'].includes(tab)) {
    return { allowed: true };
  }

  const rule = TAB_ACCESS_REGISTRY[tab];
  if (!rule) {
    return { allowed: true };
  }

  // Check Admin Tab
  if (rule.requiredTier === 'admin') {
    const isAdm = user.permissions?.canAccessAdminPortal ?? false;
    return {
      allowed: isAdm,
      rule,
      reason: 'This section requires System Administrator credentials.'
    };
  }

  // Check Super Parent Tier
  if (rule.requiredTier === 'super-parent') {
    const hasSuper = user.subscriptionTier === 'super-parent' || user.enrollmentStatus === 'Admin Superuser';
    return {
      allowed: hasSuper,
      rule,
      reason: 'This live lab requires Super Parent (100% All Access) tier.'
    };
  }

  // Check Parent Tier
  if (rule.requiredTier === 'parent') {
    const hasParent = user.role === 'parent' || user.subscriptionTier === 'parent' || user.subscriptionTier === 'super-parent';
    return {
      allowed: hasParent,
      rule,
      reason: 'This parental supervision hub requires Parent Mode or Super Parent tier.'
    };
  }

  // Check Kids Tier
  if (rule.requiredTier === 'kids') {
    const hasKids = user.subscriptionTier === 'kids' || user.subscriptionTier === 'parent' || user.subscriptionTier === 'super-parent' || user.role === 'student';
    return {
      allowed: hasKids,
      rule,
      reason: 'This learning hub requires Kids Mode or active Gurukul subscription.'
    };
  }

  return { allowed: true, rule };
}

interface AccessGuardProps {
  tab: NavTab;
  user: UserAccount;
  masterAccessGranted: boolean;
  onNavigateTab: (tab: NavTab) => void;
  onToggleMasterAccess: () => void;
  onOpenPreviewVideo?: (videoUrl: string, title: string) => void;
  children: React.ReactNode;
}

export const AccessGuard: React.FC<AccessGuardProps> = ({
  tab,
  user,
  masterAccessGranted,
  onNavigateTab,
  onToggleMasterAccess,
  onOpenPreviewVideo,
  children
}) => {
  const check = checkTabAccess(tab, user, masterAccessGranted);
  const [showDemoUnlocked, setShowDemoUnlocked] = useState(false);

  if (check.allowed || showDemoUnlocked) {
    return <>{children}</>;
  }

  const rule = check.rule || TAB_ACCESS_REGISTRY[tab] || {
    tab,
    tabName: 'Premium Hub',
    teluguName: 'ప్రీమియం విభాగం',
    requiredTier: 'parent',
    minRole: 'parent',
    icon: '🔒',
    description: 'This exclusive section requires an active Gurukul subscription.',
    features: ['Full Digital Access', 'Interactive Exercises', 'AI Expert Mentorship', 'Certified Progress Track'],
    couponCode: 'SUPER1500',
    couponPrice: 1500,
    regularPrice: 2000
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 animate-fade-in">
      <div className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-200 shadow-xl space-y-6 relative overflow-hidden text-center">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

        {/* Lock Icon & Badge */}
        <div className="space-y-3 relative z-10">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30 text-2xl">
            <Lock className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-black">
            <Crown className="w-3.5 h-3.5 text-orange-600" />
            <span>Tier Access Required • {rule.requiredTier.toUpperCase()} MODE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {rule.icon} {rule.tabName}
          </h2>
          <p className="text-sm font-bold text-orange-600">
            {rule.teluguName}
          </p>
          <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
            {rule.description}
          </p>
        </div>

        {/* Features Preview Box */}
        <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-left space-y-3 relative z-10">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-b border-slate-200 pb-2">
            <span>What's inside this Hub:</span>
            <span className="text-orange-600 font-mono">Unlock for ₹{rule.couponPrice} with coupon</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {rule.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Grid */}
        <div className="space-y-3 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Action 1: Instant Upgrade / Payment with Coupon */}
            <button
              onClick={() => onNavigateTab('login')}
              className="w-full py-3.5 px-4 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-black text-xs shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Unlock Now (₹{rule.couponPrice})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Action 2: Instant Master Access Demo Toggle */}
            <button
              onClick={() => {
                onToggleMasterAccess();
                setShowDemoUnlocked(true);
              }}
              className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs border border-slate-700 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>🔑 Test Master Key (Demo Bypass)</span>
            </button>
          </div>

          {/* Secondary Options */}
          <div className="flex items-center justify-center gap-4 pt-2 text-xs font-bold text-slate-500">
            <button
              onClick={() => onNavigateTab('home')}
              className="hover:text-orange-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Return to Home</span>
            </button>

            <span>•</span>

            <button
              onClick={() => onNavigateTab('pricing')}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              <span>View All Pricing Plans</span>
            </button>
          </div>
        </div>

        {/* Current State Info */}
        <div className="bg-orange-50/60 p-3 rounded-xl border border-orange-100 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Current Role: <strong className="text-slate-800 uppercase">{user.role}</strong></span>
          <span>Status: <strong className="text-orange-700">{user.enrollmentStatus}</strong></span>
          <span>Master Access: <strong className={masterAccessGranted ? "text-emerald-600" : "text-slate-600"}>{masterAccessGranted ? 'ENABLED' : 'DISABLED'}</strong></span>
        </div>

      </div>
    </div>
  );
};
