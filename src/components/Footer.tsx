import React from 'react';
import { COMPANY_INFO } from '../data/mockData';
import { NavTab } from '../types';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Heart, 
  Sparkles, 
  Bot
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenAskAI: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenAskAI }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                SP
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  SUPER <span className="text-orange-400">PARENT</span>
                </h3>
                <p className="text-[11px] text-orange-400 font-medium">
                  {COMPANY_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {COMPANY_INFO.subTagline}. A complete Family Learning Ecosystem bringing together Education, Values, Stories, AI Multi-Experts, Robotics Skills, and Marketplace.
            </p>

            <button
              onClick={onOpenAskAI}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-orange-glow transition-all"
            >
              <Bot className="w-4 h-4 text-white" />
              <span>Ask SUPER AI Multi-Expert</span>
            </button>
          </div>

          {/* Col 2: Core Hubs */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-orange-400 uppercase tracking-wider">
              Gurukul Hubs
            </h4>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>
                <button onClick={() => setActiveTab('super-student')} className="hover:text-orange-400 transition-colors font-bold text-orange-400 flex items-center gap-1.5">
                  <span>🎓 Super Student Hub ($200k+ Free Packs & AI)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('education')} className="hover:text-orange-400 transition-colors">
                  📚 Education Hub (State / CBSE / ICSE)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sanskar')} className="hover:text-orange-400 transition-colors">
                  🕉️ Values & Sanskar (భాగవద్గీత శ్లోకాలు)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('stories')} className="hover:text-orange-400 transition-colors">
                  📖 Stories & Audio Storytelling
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('parenting')} className="hover:text-orange-400 transition-colors">
                  👨‍👩‍👧 Parenting & Psychological Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('innovation')} className="hover:text-orange-400 transition-colors">
                  🚁 Innovation Lab (Robotics & Circuits)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Ecosystem Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-orange-400 uppercase tracking-wider">
              Ecosystem & Pricing
            </h4>
            <ul className="text-xs text-slate-300 space-y-2">
              <li>
                <button onClick={() => setActiveTab('growth')} className="hover:text-orange-400 transition-colors">
                  📊 Child Growth Map & Progress
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('marketplace')} className="hover:text-orange-400 transition-colors">
                  🛒 Student Marketplace (Parent Approved)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('showcase')} className="hover:text-orange-400 transition-colors">
                  🏆 Young Innovators Gallery
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pricing')} className="hover:text-orange-400 transition-colors font-bold text-orange-400">
                  💰 Fee Plans (Starting ₹600 - ₹2,000)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('global')} className="hover:text-orange-400 transition-colors">
                  🌎 Global Learning Free Window
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-orange-400 transition-colors font-bold text-slate-200 flex items-center gap-1">
                  <span>🛡️ Super Admin Portal (100% Access)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('testing')} className="hover:text-orange-400 transition-colors text-emerald-400 font-bold flex items-center gap-1">
                  <span>🧪 100% Website Diagnostics & Tests</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('login')} className="hover:text-orange-400 transition-colors">
                  🔑 Role Login & Account Switcher
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office Addresses */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-orange-400 uppercase tracking-wider">
              Contact & Head Office
            </h4>

            <div className="text-xs text-slate-300 space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-orange-300 font-bold block">Head Office (Bengaluru):</strong>
                  <span>{COMPANY_INFO.headOffice}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-orange-300 font-bold block">Branch Office:</strong>
                  <span>{COMPANY_INFO.branch}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <div className="font-bold text-orange-300">
                  <a href={`tel:${COMPANY_INFO.phone1}`} className="hover:underline">{COMPANY_INFO.phone1}</a> / 
                  <a href={`tel:${COMPANY_INFO.phone2}`} className="hover:underline ml-1">{COMPANY_INFO.phone2}</a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-slate-300">{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Slogan & Copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-bold text-orange-400">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>SUPER PARENT — Today's Learning, Tomorrow's Leading!</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>Join the Movement. Build a Better Future.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
