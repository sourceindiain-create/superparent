import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  Building2,
  Calendar,
  Zap,
  Check,
  Copy
} from 'lucide-react';
import { ThemeConfig } from '../types';

interface BrandingContactSectionProps {
  theme: ThemeConfig;
  userEmail?: string;
  onOpenModal?: () => void;
}

export const BrandingContactSection: React.FC<BrandingContactSectionProps> = ({
  theme,
  userEmail = 'emfi.ceo@gmail.com',
  onOpenModal
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [quickInquirySubmitted, setQuickInquirySubmitted] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneInput) {
      setQuickInquirySubmitted(true);
    }
  };

  return (
    <section 
      id="branding-contacts-station"
      className="w-full my-8 p-6 sm:p-10 rounded-3xl bg-[#021807] text-[#CBD6A3] border border-[#63C633]/30 shadow-2xl shadow-[#021807]/50 relative overflow-hidden"
    >
      {/* Background brand glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#63C633]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#B5D545]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Eyebrow & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#63C633]/20 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B5F0E]/80 border border-[#63C633]/50 text-[#63C633] text-[10px] font-black tracking-widest uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#63C633] animate-pulse" />
            <span>THEOSM™ DIRECT REACH & CONTACTS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Connect with Founders & Academic Gurus
          </h2>
          <p className="text-xs sm:text-sm text-[#CBD6A3]/80 mt-1 max-w-2xl font-medium">
            Personalized academic guidance, school deployment consultations, curriculum customization, and direct support.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenModal}
            className="px-5 py-2.5 rounded-2xl bg-[#63C633] hover:bg-[#B5D545] text-[#021807] font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#63C633]/25 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book 1-on-1 Consultation</span>
          </button>
        </div>
      </div>

      {/* Grid of 4 Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8 relative z-10">
        {/* Card 1: Direct Email */}
        <div className="p-5 rounded-2xl bg-[#021807]/90 border border-[#63C633]/25 hover:border-[#63C633]/70 transition-all group flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#63C633]/15 text-[#63C633] border border-[#63C633]/30 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase text-[#63C633] px-2 py-0.5 rounded bg-[#1B5F0E]/80">
                Official
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#CBD6A3]/60 block mb-1">
              Executive & Academic Email
            </span>
            <a 
              href={`mailto:${userEmail}`}
              className="text-sm font-bold text-white hover:text-[#63C633] transition-colors break-all"
            >
              {userEmail}
            </a>
            <p className="text-[11px] text-[#CBD6A3]/70 mt-1.5 leading-relaxed">
              Reach CEO & Academic Core for curriculum requests, institutional setup, and API access.
            </p>
          </div>
          <div className="pt-4 mt-3 border-t border-[#63C633]/15 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleCopy(userEmail, 'email-card')}
              className="text-[11px] font-bold text-[#CBD6A3] hover:text-[#63C633] flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copiedField === 'email-card' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#63C633]" />
                  <span className="text-[#63C633]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
            <a
              href={`mailto:${userEmail}`}
              className="text-[11px] font-black text-[#63C633] hover:underline flex items-center gap-0.5"
            >
              <span>Email</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Card 2: WhatsApp & Direct Phone */}
        <div className="p-5 rounded-2xl bg-[#021807]/90 border border-[#63C633]/25 hover:border-[#63C633]/70 transition-all group flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#63C633]/15 text-[#63C633] border border-[#63C633]/30 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase text-[#63C633] px-2 py-0.5 rounded bg-[#1B5F0E]/80">
                Instant
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#CBD6A3]/60 block mb-1">
              Direct WhatsApp & Phone
            </span>
            <a 
              href="https://wa.me/917981967919?text=Hi%20Super%20Parent%20Team!%20I%20need%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-white hover:text-[#63C633] transition-colors flex items-center gap-1.5"
            >
              <span>+91 7981967919</span>
              <ExternalLink className="w-3 h-3 text-[#63C633]" />
            </a>
            <p className="text-[11px] text-[#CBD6A3]/70 mt-1.5 leading-relaxed">
              Available 7 days/week for student doubt escalations, admissions, and parent advisory.
            </p>
          </div>
          <div className="pt-4 mt-3 border-t border-[#63C633]/15 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleCopy('+917981967919', 'phone-card')}
              className="text-[11px] font-bold text-[#CBD6A3] hover:text-[#63C633] flex items-center gap-1 transition-colors cursor-pointer"
            >
              {copiedField === 'phone-card' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#63C633]" />
                  <span className="text-[#63C633]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Phone</span>
                </>
              )}
            </button>
            <a
              href="https://wa.me/917981967919?text=Hi%20Super%20Parent%20Team!"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-black text-[#63C633] hover:underline flex items-center gap-0.5"
            >
              <span>WhatsApp</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Card 3: Innovation Lab & HQ */}
        <div className="p-5 rounded-2xl bg-[#021807]/90 border border-[#63C633]/25 hover:border-[#63C633]/70 transition-all group flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#B5D545]/15 text-[#B5D545] border border-[#B5D545]/30 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase text-[#B5D545] px-2 py-0.5 rounded bg-[#1B5F0E]/80">
                HQ Campus
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#CBD6A3]/60 block mb-1">
              Global Gurukul Innovation Hub
            </span>
            <p className="text-sm font-bold text-white">
              Hyderabad & Amaravati Tech Corridor
            </p>
            <p className="text-[11px] text-[#CBD6A3]/70 mt-1.5 leading-relaxed">
              Physical testing labs, Vedic sanskar research studios, and AI robotics evaluation center.
            </p>
          </div>
          <div className="pt-4 mt-3 border-t border-[#63C633]/15 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#CBD6A3]/80 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#B5D545]" />
              Telangana & AP, India
            </span>
            <span className="text-[10px] font-black text-[#63C633]">Open 9am-8pm</span>
          </div>
        </div>

        {/* Card 4: Guaranteed SLA & Support */}
        <div className="p-5 rounded-2xl bg-[#021807]/90 border border-[#63C633]/25 hover:border-[#63C633]/70 transition-all group flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#63C633]/15 text-[#63C633] border border-[#63C633]/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black uppercase text-[#63C633] px-2 py-0.5 rounded bg-[#1B5F0E]/80">
                &lt; 15 Mins
              </span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#CBD6A3]/60 block mb-1">
              SLA Commitment
            </span>
            <p className="text-sm font-bold text-white">
              Fast Track Academic Response
            </p>
            <p className="text-[11px] text-[#CBD6A3]/70 mt-1.5 leading-relaxed">
              Guaranteed turnaround by our master pedagogists and certified curriculum counselors.
            </p>
          </div>
          <div className="pt-4 mt-3 border-t border-[#63C633]/15 flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#63C633] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Active Now
            </span>
            <span className="text-[10px] font-black text-white px-2 py-0.5 rounded bg-[#1B5F0E]">100% Free</span>
          </div>
        </div>
      </div>

      {/* Quick 1-Click Callback Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#1B5F0E]/40 border border-[#63C633]/30 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#63C633] text-[#021807] flex items-center justify-center font-black shrink-0 shadow-md shadow-[#63C633]/20">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-white">Need an Instant Callback from an Academic Director?</h4>
            <p className="text-[11px] text-[#CBD6A3]/70">Enter phone number — our team calls you back within 15 minutes.</p>
          </div>
        </div>

        {quickInquirySubmitted ? (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#63C633] text-[#021807] font-black text-xs animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Callback Scheduled! We will call within 15 mins.</span>
          </div>
        ) : (
          <form onSubmit={handleQuickSubmit} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="tel"
              required
              placeholder="Enter your phone (+91)"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#021807] border border-[#63C633]/30 text-white placeholder-[#CBD6A3]/40 text-xs focus:outline-none focus:border-[#63C633] w-full sm:w-56"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#63C633] hover:bg-[#B5D545] text-[#021807] font-black text-xs uppercase tracking-wider shrink-0 transition-all cursor-pointer shadow-md shadow-[#63C633]/20"
            >
              Call Me
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
