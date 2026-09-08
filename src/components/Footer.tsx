import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { NavTab, AppThemeId } from '../types';
import { APP_THEMES } from '../data/themes';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Sparkles, 
  Bot, 
  Tv,
  Film,
  Camera,
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  ArrowRight,
  Flame,
  Award,
  BookOpen,
  GraduationCap
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenAskAI: () => void;
  onOpenContact?: () => void;
  currentTheme?: AppThemeId;
}

export const Footer: React.FC<FooterProps> = ({ 
  setActiveTab, 
  onOpenAskAI, 
  onOpenContact,
  currentTheme = 'botanical-light'
}) => {
  const userEmail = 'emfi.ceo@gmail.com';
  const phone = '+91 7981967919';
  const isDark = currentTheme === 'netflix-dark' || currentTheme === 'jiotv-crimson';
  const theme = APP_THEMES[currentTheme] || APP_THEMES['botanical-light'];

  return (
    <footer 
      id="branding-footer"
      className={`pt-14 pb-10 border-t mt-16 relative overflow-hidden transition-colors ${
        isDark 
          ? 'bg-[#0E0E0E] text-slate-300 border-[#2A2A2A]' 
          : 'bg-[#FAFDF9] text-[#0F172A] border-[#A7F3D0]'
      }`}
    >
      {/* Background ambient glows */}
      <div 
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: isDark ? (currentTheme === 'jiotv-crimson' ? '#BE123C' : '#047857') : '#A7F3D0' }}
      />
      <div 
        className="absolute bottom-0 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-10"
        style={{ backgroundColor: isDark ? '#FFA500' : '#BE123C' }}
      />

      <div className="max-w-7xl mx-auto px-4 space-y-10 relative z-10">
        {/* International Streaming Certifications Header Bar */}
        <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
          isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-white border-[#A7F3D0] shadow-xs'
        }`}>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="bg-[#047857] text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wider shadow">
                MASTER AI NATURE
              </span>
              <span className="bg-[#BE123C] text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wider shadow">
                LIVE BROADCASTS 24x7
              </span>
              <span className="bg-[#0A84FF] text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wider shadow">
                GOOGLE WORKSPACE
              </span>
            </div>
            <span className={`text-xs font-semibold ${isDark ? 'text-neutral-300' : 'text-[#064E3B]'}`}>
              Official Indian EdTech &amp; Digital Gurukul Master Interface
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-black text-emerald-400">100% Free Public Academic License</span>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info & Streaming Tag */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl text-white font-black text-lg flex items-center justify-center shadow-lg"
                style={{ 
                  background: isDark 
                    ? 'linear-gradient(135deg, #E50914, #B20710)' 
                    : 'linear-gradient(135deg, #63C633, #021807)' 
                }}
              >
                SP
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
                  SUPER <span style={{ color: isDark ? '#E50914' : '#63C633' }}>PARENT</span>
                </h3>
                <p className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                  Streaming EdTech &amp; Gurukul LMS
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              India's first Netflix &amp; JioTV style smart kids software uniting Google Lens homework OCR, 3D interactive anatomy labs, 700 Bhagavad Gita shlokas with Telugu audio, Doordarshan live channels, and Google Workspace school communications.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onOpenAskAI}
                className="flex items-center gap-2 bg-[#E50914] hover:bg-[#B20710] text-white font-black px-4 py-2 rounded-xl text-xs shadow-md transition-all cursor-pointer"
              >
                <Bot className="w-4 h-4 text-white" />
                <span>Ask Super AI Expert</span>
              </button>

              {onOpenContact && (
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 font-bold px-3 py-2 rounded-xl text-xs transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Direct Reach</span>
                </button>
              )}
            </div>
          </div>

          {/* Col 2: Streaming & Broadcast Rails */}
          <div className="space-y-3">
            <h4 
              className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5"
              style={{ color: isDark ? '#E50914' : '#63C633' }}
            >
              <Tv className="w-4 h-4" />
              <span>01 // STREAMING &amp; LIVE CHANNELS</span>
            </h4>
            <ul className="text-xs text-neutral-400 space-y-2.5">
              <li>
                <button onClick={() => setActiveTab('jiotv')} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BE123C] group-hover:scale-125 transition-transform" />
                  <span className="font-bold text-neutral-200">Live Educational Broadcasts (24x7)</span>
                  <span className="text-[9px] bg-[#BE123C] text-white px-1 rounded font-black">LIVE</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#047857] group-hover:scale-125 transition-transform" />
                  <span>Master AI Learning Billboard</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('homework')} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer group">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
                  <span className="font-bold text-white">Google Lens OCR Homework</span>
                  <span className="text-[9px] bg-amber-500 text-black px-1 rounded font-black">AI</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gmail')} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer group">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 group-hover:scale-125 transition-transform" />
                  <span>Official Gmail School Portal</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('classroom')} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer group">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:scale-125 transition-transform" />
                  <span>Tutor's Room (Voice AI &amp; Videos)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Kids Gurukul Academic Hubs */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>02 // ACADEMIC HUBS</span>
            </h4>
            <ul className="text-xs text-neutral-400 space-y-2.5">
              <li>
                <button onClick={() => setActiveTab('super-student')} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
                  <span>⚡ Super Student Hub ($200k+ Free Packs)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('kids-lab')} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
                  <span>🧬 3D Human Anatomy &amp; Solar Labs</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sanskar')} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
                  <span>🕉️ Bhagavad Gita 700 Shlokas (Telugu)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('language-lab')} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
                  <span>🌐 World Languages (Telugu, Hindi, Sanskrit)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('practice-master')} className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
                  <span>🏆 Practice Master Zone &amp; Research Portals</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Direct Contacts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 
                className="text-xs font-black uppercase tracking-widest"
                style={{ color: isDark ? '#E50914' : '#63C633' }}
              >
                03 // DIRECT REACH
              </h4>
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-950 text-emerald-400 border border-emerald-800">
                24/7 ACTIVE
              </span>
            </div>

            <div className="text-xs space-y-2.5">
              {/* Email */}
              <div className={`p-2.5 rounded-xl border ${
                isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#021807] border-[#63C633]/25'
              }`}>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">Executive Email</span>
                <a 
                  href={`mailto:${userEmail}`}
                  className="text-white font-bold hover:text-red-400 transition-colors break-all"
                >
                  {userEmail}
                </a>
              </div>

              {/* WhatsApp & Call */}
              <div className={`p-2.5 rounded-xl border ${
                isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#021807] border-[#63C633]/25'
              }`}>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block mb-0.5">WhatsApp / Helpline</span>
                <a 
                  href="https://wa.me/917981967919?text=Hi%20Super%20Parent%20Team!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1.5"
                >
                  <span>{phone}</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </div>

              {/* Campus */}
              <div className="flex items-start gap-2 pt-1 text-[11px] text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>HQ: Hyderabad &amp; Amaravati Innovation Corridor, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Slogan, Domain & Copyright */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-medium ${
          isDark ? 'border-[#2A2A2A]' : 'border-[#63C633]/20'
        }`}>
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
            <span>SUPER PARENT — Smart Parent • Happy Child • Bright Future!</span>
            <span className="hidden md:inline bg-neutral-900 text-neutral-300 px-2.5 py-0.5 rounded-full font-mono text-[11px] border border-neutral-700">
              superparent.dev
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-neutral-500">JioTV &amp; Netflix Kids Software Engine</span>
            <span className="text-emerald-400 font-bold">100% Free Academic Access</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

