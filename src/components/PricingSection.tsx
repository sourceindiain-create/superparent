import React, { useState } from 'react';
import { PRICING_PLANS, COMPANY_INFO } from '../data/mockData';
import { PricingPlan } from '../types';
import { 
  Check, 
  Award, 
  Sparkles, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  HelpCircle, 
  CheckCircle2 
} from 'lucide-react';

interface PricingSectionProps {
  onGenerateCertificate: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onGenerateCertificate }) => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [selectedMode, setSelectedMode] = useState<string>('Online');
  const [enrollSuccess, setEnrollSuccess] = useState(false);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollSuccess(true);
    setTimeout(() => {
      setEnrollSuccess(false);
      setSelectedPlan(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden text-center max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/30">
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>Affordable Gurukul Access for Every Family</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight">
          Flexible Fee Plans (₹600 – ₹2,000)
        </h2>
        <p className="text-sm text-orange-100 max-w-2xl mx-auto">
          All plans include Verified Certificate + Live Instructor Support across 100% Online, Home Learning & Offline Centre Support modes.
        </p>

        {/* Learning Mode Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          <span className="bg-white/20 backdrop-blur-md text-amber-100 text-xs font-bold px-3 py-1 rounded-full border border-white/30">
            ✓ 100% Online (Learn Anywhere)
          </span>
          <span className="bg-white/20 backdrop-blur-md text-amber-100 text-xs font-bold px-3 py-1 rounded-full border border-white/30">
            ✓ Home Learning Kits
          </span>
          <span className="bg-white/20 backdrop-blur-md text-amber-100 text-xs font-bold px-3 py-1 rounded-full border border-white/30">
            ✓ Offline Centre Support
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-3xl border p-6 flex flex-col justify-between space-y-6 relative transition-all ${
              plan.popular
                ? 'border-2 border-orange-500 shadow-xl scale-105 z-10'
                : 'border-slate-200 shadow-xs hover:shadow-md'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                Most Popular
              </div>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-xs font-extrabold text-orange-600 block">{plan.duration}</span>
                <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
              </div>

              <div className="flex items-baseline gap-1 border-b border-slate-100 pb-3">
                <span className="text-3xl font-black text-slate-900">₹{plan.priceINR}</span>
                <span className="text-xs text-slate-400 font-medium">/ total fee</span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Included Features:</span>
                <ul className="text-xs text-slate-700 space-y-2">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedPlan(plan)}
                className={`w-full font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md ${
                  plan.popular
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                Enroll Now (₹{plan.priceINR})
              </button>

              <div className="text-[10px] text-center text-slate-500 font-medium">
                ✓ Certificate Included • No Hidden Charges
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enroll Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">Gurukul Admission</span>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  Enroll in {selectedPlan.name} (₹{selectedPlan.priceINR})
                </h3>
              </div>
              <button onClick={() => setSelectedPlan(null)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            {enrollSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
                <h4 className="font-bold text-base">Admission Registration Complete!</h4>
                <p className="text-xs">Our Bengaluru / Visakhapatnam team will contact you at your phone number shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleEnrollSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Parent's Full Name:</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Ramesh Reddy"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Student's Name & Class:</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Chaitanya Reddy (Class 6)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (WhatsApp):</label>
                  <input
                    required
                    type="tel"
                    placeholder="7981967919"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Learning Mode:</label>
                  <select 
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-orange-500 font-medium"
                  >
                    <option>100% Online Learning</option>
                    <option>Home Learning + DIY Kit</option>
                    <option>Offline Centre Support (Bengaluru / Visakhapatnam)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors"
                >
                  Confirm Enrollment Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
