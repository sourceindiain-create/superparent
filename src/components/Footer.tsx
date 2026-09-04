import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { NavTab } from '../types';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Sparkles, 
  Bot, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  ArrowRight
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenAskAI: () => void;
  onOpenContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  setActiveTab, 
  onOpenAskAI, 
  onOpenContact 
}) => {
  const userEmail = 'emfi.ceo@gmail.com';
  const phone = '+91 7981967919';

  return (
    <footer 
      id="branding-footer"
      className="bg-[#021807] text-[#CBD6A3] pt-14 pb-10 border-t border-[#63C633]/30 mt-16 relative overflow-hidden"
    >
      {/* Background brand ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#63C633]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#B5D545]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 space-y-10 relative z-10">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info & theosm™ Tag */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#63C633] text-[#021807] font-black text-lg flex items-center justify-center shadow-lg shadow-[#63C633]/25">
                OSM
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                  SUPER <span className="text-[#63C633]">PARENT</span>
                </h3>
                <p className="text-[10px] text-[#63C633] font-black uppercase tracking-wider">
                  Theosm™ Branding &amp; Gurukul LMS
                </p>
              </div>
            </div>

            <p className="text-xs text-[#CBD6A3]/80 leading-relaxed font-medium">
              Family Learning Ecosystem uniting 4-Stage Pedagogy (interactive 3D visual mastery, live classroom combat), Vedic Sanskar, AI Multi-Experts, Robotics, and Kidpreneur Marketplace.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onOpenAskAI}
                className="flex items-center gap-2 bg-[#63C633] hover:bg-[#B5D545] text-[#021807] font-black px-4 py-2 rounded-xl text-xs shadow-md shadow-[#63C633]/20 transition-all cursor-pointer"
              >
                <Bot className="w-4 h-4 text-[#021807]" />
                <span>Ask Super AI Expert</span>
              </button>

              {onOpenContact && (
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="flex items-center gap-1.5 bg-[#021807] hover:bg-[#1B5F0E] text-[#63C633] border border-[#63C633]/40 font-bold px-3 py-2 rounded-xl text-xs transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Direct Reach</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Core Learning Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#63C633] uppercase tracking-widest flex items-center gap-1.5">
              <span>01 // GURUKUL HUBS</span>
            </h4>
            <ul className="text-xs text-[#CBD6A3]/90 space-y-2">
              <li>
                <button onClick={() => setActiveTab('super-student')} className="hover:text-[#63C633] transition-colors font-bold text-white flex items-center gap-1.5 cursor-pointer">
                  <span>⚡ Super Student Hub (Free AI &amp; Packs)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('classroom')} className="hover:text-[#63C633] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <span>🏛️ Tutor's Room &amp; Live Classroom</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('education')} className="hover:text-[#63C633] transition-colors cursor-pointer">
                  📚 Education Hub (State / CBSE / ICSE)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sanskar')} className="hover:text-[#63C633] transition-colors cursor-pointer">
                  🕉️ Values &amp; Sanskar (భాగవద్గీత శ్లోకాలు)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('innovation')} className="hover:text-[#63C633] transition-colors cursor-pointer">
                  🚁 Innovation Lab (Robotics &amp; AI Science)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('language-lab')} className="hover:text-[#63C633] transition-colors cursor-pointer">
                  🌐 World Language Lab (Telugu, Hindi, Sanskrit)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ecosystem & Testing */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-[#B5D545] uppercase tracking-widest">
              02 // ECOSYSTEM &amp; PORTAL
            </h4>
            <ul className="text-xs text-[#CBD6A3]/90 space-y-2">
              <li>
                <button onClick={() => setActiveTab('marketplace')} className="hover:text-[#63C633] transition-colors cursor-pointer">
                  🛒 Student Talent &amp; Skills Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('growth')} className="hover:text-[#63C633] transition-colors cursor-pointer">
                  📊 Child Growth Map &amp; Skill Badges
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pricing')} className="hover:text-[#63C633] transition-colors cursor-pointer">
                  💰 Fee Structure &amp; Master Access Plans
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-[#63C633] transition-colors text-white font-bold flex items-center gap-1 cursor-pointer">
                  <span>🛡️ Super Admin Control Center</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('testing')} className="hover:text-[#63C633] transition-colors text-[#63C633] font-bold flex items-center gap-1 cursor-pointer">
                  <span>🧪 100% System Diagnostics Suite</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Direct Contacts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-[#63C633] uppercase tracking-widest">
                03 // DIRECT CONTACTS
              </h4>
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-[#1B5F0E] text-[#63C633]">
                24/7 ACTIVE
              </span>
            </div>

            <div className="text-xs text-[#CBD6A3] space-y-2.5">
              {/* Email */}
              <div className="p-2.5 rounded-xl bg-[#021807] border border-[#63C633]/25">
                <span className="text-[10px] uppercase font-bold text-[#CBD6A3]/60 block mb-0.5">Executive Email</span>
                <a 
                  href={`mailto:${userEmail}`}
                  className="text-white font-bold hover:text-[#63C633] transition-colors break-all"
                >
                  {userEmail}
                </a>
              </div>

              {/* WhatsApp & Call */}
              <div className="p-2.5 rounded-xl bg-[#021807] border border-[#63C633]/25">
                <span className="text-[10px] uppercase font-bold text-[#CBD6A3]/60 block mb-0.5">Direct WhatsApp / Hotline</span>
                <a 
                  href="https://wa.me/917981967919?text=Hi%20Super%20Parent%20Team!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#63C633] font-bold hover:underline flex items-center gap-1.5"
                >
                  <span>{phone}</span>
                  <ExternalLink className="w-3 h-3 text-[#63C633]" />
                </a>
              </div>

              {/* HQ Campus */}
              <div className="flex items-start gap-2 pt-1 text-[11px] text-[#CBD6A3]/80">
                <MapPin className="w-3.5 h-3.5 text-[#B5D545] shrink-0 mt-0.5" />
                <span>HQ Campus: Hyderabad &amp; Amaravati Innovation Corridor, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Slogan, Domain & Copyright */}
        <div className="pt-6 border-t border-[#63C633]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#CBD6A3]/70 font-medium">
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-[#63C633] animate-ping" />
            <span>SUPER PARENT — Today's Learning, Tomorrow's Leading!</span>
            <span className="hidden md:inline bg-[#1B5F0E] text-[#63C633] px-2.5 py-0.5 rounded-full font-mono text-[11px] border border-[#63C633]/30">
              superparent.dev
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-[#CBD6A3]/60">Lalit for theosm™ Branding System</span>
            <span className="text-[#63C633] font-bold">100% Free Academic Access</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
