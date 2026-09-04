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
      className="w-full rounded-3xl bg-[#021807] text-[#CBD6A3] border border-[#63C633]/30 shadow-2xl shadow-[#021807]/60 overflow-hidden relative p-6 sm:p-10 mb-8"
    >
      {/* Dynamic branding background geometry from Dribbble #27700505 */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-[#63C633]/15 via-[#B5D545]/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#1B5F0E]/30 rounded-full blur-2xl pointer-events-none" />

      {/* Grid line overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#63C633 1px, transparent 1px), linear-gradient(90deg, #63C633 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        {/* Left Column: Brand Headline, Monogram & Identity */}
        <div className="lg:w-7/12 space-y-5">
          {/* Top Pill Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B5F0E]/80 border border-[#63C633]/50 text-[#63C633] text-[10px] font-black tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#63C633] animate-pulse" />
              <span>THEOSM™ BRANDING SYSTEM // 2026</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#021807] border border-[#CBD6A3]/30 text-[#CBD6A3] text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3 text-[#63C633]" />
              <span>Full Master Access Unlocked</span>
            </span>
          </div>

          {/* Main Title */}
          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.08]">
              The Next-Gen <span className="text-[#63C633]">Gurukul LMS</span> &amp; EdTech Super Software.
            </h1>
            <p className="text-xs sm:text-sm text-[#CBD6A3]/85 mt-3 max-w-xl font-medium leading-relaxed">
              Unifying 4-Stage Pedagogy (interactive 3D visual mastery, live classroom combat), Vedic values, AI multi-experts, and global skill labs into one cohesive platform.
            </p>
          </div>

          {/* High-Contrast Neo-Lime Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigateTab('super-student')}
              className="px-6 py-3.5 rounded-2xl bg-[#63C633] hover:bg-[#B5D545] text-[#021807] font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#63C633]/25 flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Zap className="w-4 h-4 text-[#021807]" />
              <span>Launch Super Student Hub</span>
              <ArrowRight className="w-4 h-4 text-[#021807]" />
            </button>

            <button
              type="button"
              onClick={onOpenContact}
              className="px-5 py-3.5 rounded-2xl bg-[#021807] hover:bg-[#1B5F0E] text-[#CBD6A3] hover:text-white border border-[#63C633]/40 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-[#63C633]" />
              <span>Direct Contacts &amp; Reach</span>
            </button>

            <button
              type="button"
              onClick={onOpenAskAI}
              className="px-4 py-3.5 rounded-2xl bg-[#1B5F0E]/50 hover:bg-[#1B5F0E] text-[#63C633] border border-[#63C633]/30 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Super AI</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Brand Metrics & 4 Pillars Card */}
        <div className="lg:w-5/12 w-full">
          <div className="p-6 rounded-3xl bg-[#021807]/90 border border-[#63C633]/30 backdrop-blur-md shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#63C633]/20">
              <div className="flex items-center gap-2">
                {/* Monogram Badge */}
                <div className="w-8 h-8 rounded-xl bg-[#63C633] text-[#021807] flex items-center justify-center font-black text-xs shadow-md shadow-[#63C633]/30">
                  OSM
                </div>
                <div>
                  <span className="text-xs font-black text-white tracking-tight block">CORE BRAND PILLARS</span>
                  <span className="text-[10px] text-[#CBD6A3]/70 font-semibold">Lalit for theosm™ System</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#63C633]/20 text-[#63C633] border border-[#63C633]/30">
                ACTIVE
              </span>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div 
                onClick={() => onNavigateTab('education')}
                className="p-3 rounded-2xl bg-[#1B5F0E]/30 hover:bg-[#1B5F0E]/60 border border-[#63C633]/25 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-[#63C633]">01 // LEARN</span>
                  <ArrowRight className="w-3 h-3 text-[#CBD6A3] group-hover:text-[#63C633] transition-colors" />
                </div>
                <h4 className="text-xs font-bold text-white">4-Stage Pedagogy</h4>
                <p className="text-[10px] text-[#CBD6A3]/70 mt-0.5">Learn • Practice • Revise • Test</p>
              </div>

              <div 
                onClick={() => onNavigateTab('sanskar')}
                className="p-3 rounded-2xl bg-[#1B5F0E]/30 hover:bg-[#1B5F0E]/60 border border-[#63C633]/25 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-[#B5D545]">02 // VALUES</span>
                  <ArrowRight className="w-3 h-3 text-[#CBD6A3] group-hover:text-[#B5D545] transition-colors" />
                </div>
                <h4 className="text-xs font-bold text-white">Vedic Gurukul</h4>
                <p className="text-[10px] text-[#CBD6A3]/70 mt-0.5">Sanskar • Stories • Culture</p>
              </div>

              <div 
                onClick={() => onNavigateTab('innovation')}
                className="p-3 rounded-2xl bg-[#1B5F0E]/30 hover:bg-[#1B5F0E]/60 border border-[#63C633]/25 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-[#63C633]">03 // SKILLS</span>
                  <ArrowRight className="w-3 h-3 text-[#CBD6A3] group-hover:text-[#63C633] transition-colors" />
                </div>
                <h4 className="text-xs font-bold text-white">Innovation Lab</h4>
                <p className="text-[10px] text-[#CBD6A3]/70 mt-0.5">Coding • Robotics • AI Science</p>
              </div>

              <div 
                onClick={() => onNavigateTab('marketplace')}
                className="p-3 rounded-2xl bg-[#1B5F0E]/30 hover:bg-[#1B5F0E]/60 border border-[#63C633]/25 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black text-[#B5D545]">04 // MARKET</span>
                  <ArrowRight className="w-3 h-3 text-[#CBD6A3] group-hover:text-[#B5D545] transition-colors" />
                </div>
                <h4 className="text-xs font-bold text-white">Kidpreneurs</h4>
                <p className="text-[10px] text-[#CBD6A3]/70 mt-0.5">Verified Student Creations</p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-2 border-t border-[#63C633]/20 grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-sm font-black text-[#63C633] block">10,000+</span>
                <span className="text-[9px] uppercase font-bold text-[#CBD6A3]/60">Active Learners</span>
              </div>
              <div>
                <span className="text-sm font-black text-white block">99.4%</span>
                <span className="text-[9px] uppercase font-bold text-[#CBD6A3]/60">Retention Rate</span>
              </div>
              <div>
                <span className="text-sm font-black text-[#B5D545] block">LKG - 10th</span>
                <span className="text-[9px] uppercase font-bold text-[#CBD6A3]/60">CBSE / ICSE / IB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
