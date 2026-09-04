import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Copy,
  Check
} from 'lucide-react';
import { ThemeConfig } from '../types';

interface BrandingContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeConfig;
  userEmail?: string;
}

export const BrandingContactModal: React.FC<BrandingContactModalProps> = ({
  isOpen,
  onClose,
  theme,
  userEmail = 'emfi.ceo@gmail.com'
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: userEmail,
    studentGrade: 'Class 8',
    interest: 'Gurukul All-in-One LMS',
    message: ''
  });

  if (!isOpen) return null;

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 1000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="branding-contact-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#021807] text-[#CBD6A3] rounded-3xl border border-[#63C633]/30 shadow-2xl shadow-[#021807]/90 overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
      >
        {/* Decorative branding elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#63C633]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B5D545]/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#021807]/80 hover:bg-[#1B5F0E] text-[#CBD6A3] hover:text-white border border-[#63C633]/30 flex items-center justify-center transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Direct Connect & Brand Credentials */}
        <div className="md:w-5/12 p-6 sm:p-8 bg-gradient-to-b from-[#021807] to-[#1B5F0E]/40 border-b md:border-b-0 md:border-r border-[#63C633]/20 flex flex-col justify-between relative">
          <div>
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B5F0E]/70 border border-[#63C633]/40 text-[#63C633] text-[10px] font-black tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-[#63C633] animate-pulse" />
              <span>THEOSM™ BRAND DIRECT REACH</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-2">
              Let's Build the Future of Learning.
            </h2>
            <p className="text-xs text-[#CBD6A3]/80 leading-relaxed mb-6 font-medium">
              Direct line to the founders and executive academic counseling team for Gurukul, school partnerships, and student acceleration.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              {/* Email */}
              <div className="p-3.5 rounded-2xl bg-[#021807]/90 border border-[#63C633]/25 hover:border-[#63C633]/60 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#63C633]/15 text-[#63C633] flex items-center justify-center border border-[#63C633]/30 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#CBD6A3]/60 tracking-wider block">Executive Email</span>
                    <a 
                      href={`mailto:${userEmail}`}
                      className="text-xs sm:text-sm font-bold text-white hover:text-[#63C633] transition-colors"
                    >
                      {userEmail}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(userEmail, 'email')}
                  className="p-1.5 rounded-lg hover:bg-[#1B5F0E] text-[#CBD6A3] hover:text-[#63C633] transition-colors"
                  title="Copy email"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-[#63C633]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone / WhatsApp */}
              <div className="p-3.5 rounded-2xl bg-[#021807]/90 border border-[#63C633]/25 hover:border-[#63C633]/60 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#63C633]/15 text-[#63C633] flex items-center justify-center border border-[#63C633]/30 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#CBD6A3]/60 tracking-wider block">Direct WhatsApp / Call</span>
                    <a 
                      href="https://wa.me/917981967919?text=Hi%20Super%20Parent%20Team!%20I%20would%20like%20to%20know%20more%20about%20the%20platform." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-white hover:text-[#63C633] transition-colors flex items-center gap-1.5"
                    >
                      <span>+91 7981967919</span>
                      <ExternalLink className="w-3 h-3 text-[#63C633]" />
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('+917981967919', 'phone')}
                  className="p-1.5 rounded-lg hover:bg-[#1B5F0E] text-[#CBD6A3] hover:text-[#63C633] transition-colors"
                  title="Copy phone"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-[#63C633]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Headquarters */}
              <div className="p-3.5 rounded-2xl bg-[#021807]/90 border border-[#63C633]/25 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#B5D545]/15 text-[#B5D545] flex items-center justify-center border border-[#B5D545]/30 shrink-0 mt-0.5">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black text-[#CBD6A3]/60 tracking-wider block">HQ & Innovation Lab</span>
                  <p className="text-xs text-white font-medium">
                    Super Parent Gurukul Campus, Financial District & Amaravati Tech Hub, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom SLA Pill */}
          <div className="mt-6 pt-4 border-t border-[#63C633]/20 flex items-center justify-between text-[11px] text-[#CBD6A3]/70 font-semibold">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#63C633]" />
              Guaranteed Response: &lt; 15 mins
            </span>
            <span className="flex items-center gap-1 text-[#63C633]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Desk
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Consultation & Request Form */}
        <div className="md:w-7/12 p-6 sm:p-8 bg-[#021807]/95 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#63C633]">Direct Inquiry</span>
                <h3 className="text-lg sm:text-xl font-black text-white">Schedule 1-on-1 Consultation</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-[#63C633] text-[#021807]">
                FREE ADVISORY
              </span>
            </div>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#1B5F0E]/40 border border-[#63C633] text-center space-y-3 animate-fade-in my-6">
                <div className="w-12 h-12 rounded-full bg-[#63C633] text-[#021807] flex items-center justify-center mx-auto shadow-lg shadow-[#63C633]/30">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-black text-white">Inquiry Received & Logged</h4>
                <p className="text-xs text-[#CBD6A3] max-w-sm mx-auto">
                  Our academic director has been notified at <strong className="text-white">{userEmail}</strong> and will reach back within 15 minutes.
                </p>
                <div className="pt-2">
                  <a
                    href="https://wa.me/917981967919?text=Hello!%20I%20just%20submitted%20an%20inquiry%20on%20Super%20Parent%20platform."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#63C633] text-[#021807] font-black text-xs hover:bg-[#B5D545] transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Chat on WhatsApp Now
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-[#CBD6A3]/70 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Srikant Verma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#021807] border border-[#63C633]/30 text-white placeholder-[#CBD6A3]/40 text-xs focus:outline-none focus:border-[#63C633] focus:ring-1 focus:ring-[#63C633]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-[#CBD6A3]/70 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#021807] border border-[#63C633]/30 text-white placeholder-[#CBD6A3]/40 text-xs focus:outline-none focus:border-[#63C633] focus:ring-1 focus:ring-[#63C633]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-[#CBD6A3]/70 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#021807] border border-[#63C633]/30 text-white placeholder-[#CBD6A3]/40 text-xs focus:outline-none focus:border-[#63C633] focus:ring-1 focus:ring-[#63C633]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-[#CBD6A3]/70 mb-1">
                      Student Grade / Category
                    </label>
                    <select
                      value={formData.studentGrade}
                      onChange={(e) => setFormData({ ...formData, studentGrade: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#021807] border border-[#63C633]/30 text-white text-xs focus:outline-none focus:border-[#63C633] focus:ring-1 focus:ring-[#63C633]"
                    >
                      <option value="LKG - UKG">LKG - UKG (Foundational Early Years)</option>
                      <option value="Class 1 - 5">Class 1 - 5 (Primary Gurukul)</option>
                      <option value="Class 6 - 8">Class 6 - 8 (Middle Science & Math)</option>
                      <option value="Class 9 - 10">Class 9 - 10 (Board Excellence & Olympiad)</option>
                      <option value="Parent / Educator">Parent / Institutional Partner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-[#CBD6A3]/70 mb-1">
                    Primary Area of Interest
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      'Full Gurukul LMS',
                      'Super AI Tutor',
                      'Visual 3D Labs',
                      'Live Classroom Combat',
                      'Vedic Sanskar',
                      'School Licensing'
                    ].map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, interest: opt })}
                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-all text-left truncate ${
                          formData.interest === opt
                            ? 'bg-[#63C633] text-[#021807] border-[#63C633] font-black'
                            : 'bg-[#021807] text-[#CBD6A3] border-[#63C633]/25 hover:border-[#63C633]'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-[#CBD6A3]/70 mb-1">
                    Message or Specific Learning Goals
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about the student's current curriculum, goals, or topics needing attention..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#021807] border border-[#63C633]/30 text-white placeholder-[#CBD6A3]/40 text-xs focus:outline-none focus:border-[#63C633] focus:ring-1 focus:ring-[#63C633] resize-none"
                  />
                </div>

                {/* Submit button adhering strictly to Dribbble Branding #63C633 style */}
                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-3 px-5 rounded-2xl bg-[#63C633] hover:bg-[#B5D545] text-[#021807] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#63C633]/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit & Request Instant Callback</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="text-[10px] text-center text-[#CBD6A3]/50 mt-4">
            Zero spam promise • AES-256 encrypted academic records • Direct contact with founder desk
          </p>
        </div>
      </div>
    </div>
  );
};
