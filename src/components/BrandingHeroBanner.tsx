import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  GraduationCap, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Users, 
  BookOpen, 
  Crown,
  Play
} from 'lucide-react';
import { ThemeConfig, NavTab } from '../types';

interface BrandingHeroBannerProps {
  theme: ThemeConfig;
  onNavigateTab: (tab: NavTab) => void;
  onOpenContact: () => void;
  onOpenAskAI: () => void;
}

export const BrandingHeroBanner: React.FC<BrandingHeroBannerProps> = ({
  theme,
  onNavigateTab,
  onOpenContact,
  onOpenAskAI
}) => {
  return (
    <div 
      id="theosm-branding-hero"
      className="w-full rounded-3xl bg-gradient-to-br from-[#FAFDF9] via-[#F0FDF4] to-[#ECFDF5] text-[#0F172A] border-2 border-[#A7F3D0] shadow-2xl shadow-emerald-950/5 overflow-hidden relative p-6 sm:p-10 mb-8"
    >
      {/* Dynamic branding background geometry from Nature & Ayurveda 2,3,4 */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-[#047857]/10 via-[#0D9488]/10 to-[#BE123C]/5 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#A7F3D0]/40 rounded-full blur-2xl pointer-events-none" />

      {/* Grid line overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#047857 1px, transparent 1px), linear-gradient(90deg, #047857 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Left Column: Brand Headline, Monogram & Identity */}
        <div className="lg:w-7/12 space-y-5">
          {/* Top Pill Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECFDF5] border border-[#047857]/30 text-[#047857] text-[10px] font-black tracking-widest uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#047857] animate-pulse" />
              <span>GURUKUL MASTER AI // 2026</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#A7F3D0] text-[#064E3B] text-[10px] font-bold shadow-xs">
              <ShieldCheck className="w-3 h-3 text-[#047857]" />
              <span>Full Master Access Unlocked</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFF1F2] border border-[#FECDD3] text-[#BE123C] text-[10px] font-black">
              <span>🌿 Nature &amp; Ayurveda Inspired</span>
            </span>
          </div>

          {/* Main Title */}
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#064E3B] tracking-tight leading-[1.08]">
              The Next-Gen <span className="text-[#047857] underline decoration-[#0D9488]/40 decoration-wavy">Gurukul LMS</span> &amp; <span className="text-[#BE123C]">EdTech Super Software</span>.
            </h1>
            <p className="text-xs sm:text-sm text-[#334155] mt-3 max-w-xl font-medium leading-relaxed">
              Unifying 4-Stage Pedagogy (interactive 3D visual mastery, live classroom combat), Vedic values, AI multi-experts, and global skill labs into one cohesive light daylight platform.
            </p>
          </div>

          {/* High-Contrast Action Buttons (Botanical Emerald, Pure White & Rose Magenta) */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigateTab('super-student')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#047857] to-[#0D9488] hover:from-[#065F46] hover:to-[#0f766e] text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-700/20 flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Launch Super Student Hub</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              className="px-5 py-3.5 rounded-2xl bg-white hover:bg-[#F0FDF4] text-[#047857] hover:text-[#064E3B] border-2 border-[#047857] font-black text-xs uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#047857]" />
              <span>Direct Contacts &amp; Reach</span>
            </button>

            <button
              type="button"
              onClick={onOpenAskAI}
              className="px-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#BE123C] to-[#E11D48] hover:from-[#9F1239] hover:to-[#BE123C] text-white font-black text-xs transition-all shadow-md shadow-rose-600/20 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Ask Super AI</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Brand Metrics & 4 Pillars Card */}
        <div className="lg:w-5/12 w-full">
          <div className="p-6 rounded-3xl bg-white/95 border-2 border-[#A7F3D0] backdrop-blur-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                {/* Monogram Badge */}
                <div className="w-8 h-8 rounded-xl bg-[#047857] text-white flex items-center justify-center font-black text-xs shadow-md shadow-emerald-700/30">
                  GKL
                </div>
                <div>
                  <span className="text-xs font-black text-[#064E3B] tracking-tight block">CORE BRAND PILLARS</span>
                  <span className="text-[10px] text-[#047857] font-bold">Gurukul Master AI System</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0]">
                ACTIVE
              </span>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div 
                onClick={() => onNavigateTab('education')}
                className="p-3 rounded-2xl bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#A7F3D0] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-[#047857]">01 // LEARN</span>
                  <ArrowRight className="w-3 h-3 text-[#047857] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <h4 className="text-xs font-bold text-[#064E3B]">4-Stage Pedagogy</h4>
                <p className="text-[10px] text-[#475569] mt-0.5">Learn • Practice • Revise • Test</p>
              </div>

              <div 
                onClick={() => onNavigateTab('sanskar')}
                className="p-3 rounded-2xl bg-[#FFF1F2] hover:bg-[#FFE4E6] border border-[#FECDD3] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-[#BE123C]">02 // VALUES</span>
                  <ArrowRight className="w-3 h-3 text-[#BE123C] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <h4 className="text-xs font-bold text-[#881337]">Vedic Gurukul</h4>
                <p className="text-[10px] text-[#64748B] mt-0.5">Sanskar • Stories • Culture</p>
              </div>

              <div 
                onClick={() => onNavigateTab('innovation')}
                className="p-3 rounded-2xl bg-[#F0FDFA] hover:bg-[#CCFBF1] border border-[#99F6E4] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-[#0D9488]">03 // SKILLS</span>
                  <ArrowRight className="w-3 h-3 text-[#0D9488] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <h4 className="text-xs font-bold text-[#134E4A]">Innovation Lab</h4>
                <p className="text-[10px] text-[#475569] mt-0.5">Coding • Robotics • AI Science</p>
              </div>

              <div 
                onClick={() => onNavigateTab('marketplace')}
                className="p-3 rounded-2xl bg-[#FFFBEB] hover:bg-[#FEF3C7] border border-[#FDE68A] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-[#D97706]">04 // MARKET</span>
                  <ArrowRight className="w-3 h-3 text-[#D97706] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <h4 className="text-xs font-bold text-[#78350F]">Kidpreneurs</h4>
                <p className="text-[10px] text-[#64748B] mt-0.5">Verified Student Creations</p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-2 border-t border-[#E2E8F0] grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-sm font-black text-[#047857] block">10,000+</span>
                <span className="text-[9px] uppercase font-bold text-[#64748B]">Active Learners</span>
              </div>
              <div>
                <span className="text-sm font-black text-[#0F172A] block">99.4%</span>
                <span className="text-[9px] uppercase font-bold text-[#64748B]">Retention Rate</span>
              </div>
              <div>
                <span className="text-sm font-black text-[#BE123C] block">LKG - 10th</span>
                <span className="text-[9px] uppercase font-bold text-[#64748B]">CBSE / ICSE / IB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
