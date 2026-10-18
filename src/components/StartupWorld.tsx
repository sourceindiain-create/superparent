import React, { useState } from 'react';
import { 
  Rocket, 
  Building2, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  ShieldCheck, 
  Globe, 
  Users, 
  Award, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  Calculator, 
  Bot, 
  Copy, 
  Check, 
  Briefcase, 
  Lightbulb, 
  Compass, 
  BarChart3,
  Scale,
  Landmark,
  Target
} from 'lucide-react';
import { AppThemeId } from '../types';
import { APP_THEMES } from '../data/themes';

interface StartupWorldProps {
  onAskAI?: (query: string) => void;
  currentTheme?: AppThemeId;
}

type StartupSubTab = 'roadmap' | 'india-global' | 'incubators' | 'funding-grants' | 'tools-calculator';

export const StartupWorld: React.FC<StartupWorldProps> = ({ onAskAI, currentTheme = 'gurukul-amber' }) => {
  const [activeTab, setActiveTab] = useState<StartupSubTab>('roadmap');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive Calculator State
  const [monthlyBurn, setMonthlyBurn] = useState<number>(150000); // ₹1.5L / mo
  const [currentCash, setCurrentCash] = useState<number>(3000000); // ₹30L
  const [annualRevenue, setAnnualRevenue] = useState<number>(1200000); // ₹12L
  const [revenueMultiple, setRevenueMultiple] = useState<number>(15);

  // Lean Canvas State
  const [canvasProblem, setCanvasProblem] = useState('');
  const [canvasSolution, setCanvasSolution] = useState('');
  const [canvasCustomer, setCanvasCustomer] = useState('');
  const [canvasRevenue, setCanvasRevenue] = useState('');

  const theme = APP_THEMES[currentTheme] || APP_THEMES['gurukul-amber'];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Runway & Valuation calculations
  const runwayMonths = monthlyBurn > 0 ? (currentCash / monthlyBurn).toFixed(1) : '∞';
  const estimatedValuationInLakhs = ((annualRevenue * revenueMultiple) / 100000).toFixed(1);

  // Idea to Company 6 Master Stages
  const ROADMAP_STAGES = [
    {
      stage: 'Stage 01',
      title: 'Idea Validation & Problem-Solution Fit',
      teluguTitle: 'ఐడియా ధృవీకరణ & సమస్య-పరిష్కార అధ్యయనం',
      badge: 'FOUNDATION',
      badgeColor: 'bg-indigo-600 text-white',
      duration: 'Weeks 1 - 4',
      description: 'Validate customer pain points before writing code or manufacturing hardware. Conduct 30+ problem interviews and compute TAM/SAM/SOM.',
      checklist: [
        'Define the core high-friction problem in 1 concise sentence',
        'Identify exact ICP (Ideal Customer Profile) & buyer persona',
        'Interview 30+ potential customers with open-ended inquiries',
        'Construct a 1-page Lean Canvas & Competitor Matrix',
        'Compute Total Addressable Market (TAM in ₹ or $)'
      ],
      deliverable: 'Validated Lean Canvas & Customer Interview Insights'
    },
    {
      stage: 'Stage 02',
      title: 'Rapid Prototyping & MVP Scoping',
      teluguTitle: 'కనిష్ట ఆచరణీయ ఉత్పత్తి (MVP) రూపకల్పన',
      badge: 'BUILD & PROTOTYPE',
      badgeColor: 'bg-emerald-600 text-white',
      duration: 'Weeks 5 - 10',
      description: 'Build the simplest functional prototype that solves the primary customer pain point using low-code, 3D printing, or off-the-shelf electronics.',
      checklist: [
        'Strip non-essential features; focus exclusively on the core hook',
        'Build wireframes & interactive Figma click-through model',
        'Develop alpha prototype (React/Node.js or PCB breadboard test)',
        'Deploy landing page with waitlist sign-up to test willingness to pay',
        'Onboard first 10 beta test users and measure retention weekly'
      ],
      deliverable: 'Working Alpha / MVP with 10 Active Daily Beta Testers'
    },
    {
      stage: 'Stage 03',
      title: 'Company Incorporation & Legal Protection (India & Global)',
      teluguTitle: 'కంపెనీ నమోదు & చట్టపరమైన పేటెంట్లు',
      badge: 'LEGAL & IP',
      badgeColor: 'bg-blue-600 text-white',
      duration: 'Weeks 11 - 14',
      description: 'Incorporate as a Private Limited Company with MCA in India or Delaware C-Corp for global venture capital. Register DPIIT Startup India.',
      checklist: [
        'Reserve company name via SPICe+ on MCA Portal (India)',
        'Obtain Director Identification Numbers (DIN) & Digital Signatures (DSC)',
        'Draft Founders Agreement with 4-year vesting schedule and 1-year cliff',
        'Apply for DPIIT Startup India Recognition for Section 80-IAC tax holiday',
        'File Provisional Patent (Form 1 & Form 2) with Indian Patent Office',
        'Register GST, MSME Udyam, Professional Tax & Open Current Account'
      ],
      deliverable: 'Certificate of Incorporation (CIN), PAN, GST, DPIIT Certificate'
    },
    {
      stage: 'Stage 04',
      title: 'Winning Pitch Deck & Financial Modeling',
      teluguTitle: 'పిచ్ డెక్ & ఆర్థిక ప్రణాళిక',
      badge: 'STORYTELLING',
      badgeColor: 'bg-purple-600 text-white',
      duration: 'Weeks 15 - 18',
      description: 'Craft a compelling 10-slide pitch deck tailored for angel investors and top incubators following the legendary Sequoia / YC framework.',
      checklist: [
        'Slide 1: Problem & Customer Pain (Emotional hook)',
        'Slide 2: Solution & Product Demo (Magic moment)',
        'Slide 3: Market Size & Opportunity (TAM / SAM / SOM)',
        'Slide 4: Business Model & Pricing (Unit economics)',
        'Slide 5: Traction & Key Metrics (MoM growth %)',
        'Slide 6: Defensible Moat & IP (Patents, proprietary tech)',
        'Slide 7: Go-To-Market (GTM) & Distribution Channels',
        'Slide 8: Financial Projections & 24-Month Runway',
        'Slide 9: Team & Superpowers (Why you are the winning team)',
        'Slide 10: The Ask (Fundraising amount & milestones)'
      ],
      deliverable: '10-Slide Pitch Deck (PDF) & 3-Year 3-Statement Financial Model'
    },
    {
      stage: 'Stage 05',
      title: 'Fundraising, Government Grants & Angel Networks',
      teluguTitle: 'ప్రభుత్వ గ్రాంట్లు & ఏంజెల్ నెట్‌వర్క్‌లు',
      badge: 'FUNDRAISING',
      badgeColor: 'bg-amber-600 text-white font-bold',
      duration: 'Weeks 19 - 26',
      description: 'Secure non-dilutive government grants (up to ₹50 Lakhs) before raising seed capital from angels and venture capital firms.',
      checklist: [
        'Apply for Startup India Seed Fund Scheme (SISFS up to ₹50L via incubators)',
        'Apply for NIDHI PRAYAS (₹10 Lakhs hardware prototype grant)',
        'Submit applications to Y Combinator, Techstars & T-Hub',
        'Build targeted list of 50 relevant angel investors on LetsVenture & AngelList',
        'Execute rolling angel syndicates using SAFE or iSAFE agreements',
        'Complete due diligence and receive capital in escrow'
      ],
      deliverable: 'Term Sheet Signed & Seed Funding Received in Bank Account'
    },
    {
      stage: 'Stage 06',
      title: 'Scale, Product-Led Growth & Global Expansion',
      teluguTitle: 'స్కేలింగ్ & ప్రపంచ మార్కెట్ విస్తరణ',
      badge: 'HYPER-GROWTH',
      badgeColor: 'bg-rose-600 text-white',
      duration: 'Month 7 Onwards',
      description: 'Systematize customer acquisition funnels, hire key executives, maintain healthy LTV/CAC ratio, and prepare for Series A institutional funding.',
      checklist: [
        'Establish repeatable sales motion (Inbound content + Outbound B2B)',
        'Achieve LTV / CAC ratio > 3:1 and net revenue retention > 110%',
        'Hire Head of Engineering and Growth Marketer with ESOP pool',
        'Setup international sales subsidiary or Delaware flip if expanding to US',
        'Prepare Series A data room (audited books, cap table, metrics)'
      ],
      deliverable: 'Scale to ₹10 Crore ARR with International Operations'
    }
  ];

  // Top Incubators & Accelerators
  const INCUBATORS_LIST = [
    {
      name: 'Startup India Portal & Hub',
      badge: 'GOVT OF INDIA',
      badgeColor: 'bg-emerald-700 text-white',
      url: 'https://www.startupindia.gov.in',
      location: 'New Delhi / Nationwide',
      benefits: 'DPIIT Recognition, 3-year tax exemptions, fast-tracked patent examination (80% rebate), and government procurement tender eligibility.',
      programs: ['Startup India Seed Fund', 'National Startup Awards', 'MAARG Mentorship']
    },
    {
      name: 'Y Combinator (YC)',
      badge: 'WORLD #1 ACCELERATOR',
      badgeColor: 'bg-amber-600 text-white font-black',
      url: 'https://www.ycombinator.com',
      location: 'Silicon Valley / Remote',
      benefits: '$500,000 standard investment ($125k for 7% + $375k uncapped MFN SAFE), unrivaled alumni network (Airbnb, Stripe, Razorpay, Zepto), and Demo Day.',
      programs: ['YC Batch (Winter / Summer)', 'Startup School (Free Curriculum)', 'Work at a Startup']
    },
    {
      name: 'T-Hub (Hyderabad, India)',
      badge: 'INDIA LARGEST INCUBATOR',
      badgeColor: 'bg-cyan-700 text-white',
      url: 'https://t-hub.co',
      location: 'Hyderabad, Telangana',
      benefits: 'World’s largest innovation campus (585,000 sq ft), corporate venture partnerships, access to Telangana innovation fund, and international soft-landing.',
      programs: ['Lab32 Acceleration', 'T-Angel Seed Fund', 'T-Fund Equity Co-investment']
    },
    {
      name: 'Techstars Global Accelerator',
      badge: 'WORLDWIDE NETWORK',
      badgeColor: 'bg-emerald-600 text-white',
      url: 'https://www.techstars.com',
      location: 'Bangalore, Singapore, London, USA',
      benefits: '$120,000 funding, hands-on mentorship from 100+ industry mentors, lifetime access to global investor network.',
      programs: ['Techstars India', 'Techstars Space', 'Techstars Sustainability']
    },
    {
      name: 'NSRCEL (IIM Bangalore)',
      badge: 'ACADEMIC PREMIER',
      badgeColor: 'bg-indigo-700 text-white',
      url: 'https://www.nsrcel.org',
      location: 'Bengaluru, Karnataka',
      benefits: 'Mentorship from premier IIM Bangalore faculty, government grant disbursement (DST NIDHI, MeitY TIDE 2.0), and seed funding rounds.',
      programs: ['Launchpad', 'Nidhi Prayas Grant', 'Women Startup Program']
    },
    {
      name: 'IIT Madras Research Park & Incubation Cell',
      badge: 'DEEP TECH & HARDWARE',
      badgeColor: 'bg-purple-700 text-white',
      url: 'https://incubation.iitm.ac.in',
      location: 'Chennai, Tamil Nadu',
      benefits: 'World-class deep-tech labs, prototyping fabrication facilities, hardware testing chambers, and direct defense & space partnerships (Agnikul, Ather Energy alumni).',
      programs: ['IITM Incubation Cell', 'Biotech Incubation', 'Cybersecurity Hub']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white border-b border-amber-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.15),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-400/30 mb-3">
                <Rocket className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>STARTUP WORLD • స్టార్టప్ ప్రపంచం • IDEA TO COMPANY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
                Startup World: Idea to Company Development
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
                Step-by-step master engine to take any technology or hardware idea from zero to a registered, funded, and scaling enterprise: Indian & global incorporation, DPIIT tax exemptions, winning pitch decks, incubator applications, and financial runway modeling.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <a
                href="https://www.startupindia.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Landmark className="w-4 h-4" />
                <span>Startup India Portal</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                onClick={() => onAskAI?.('Act as an experienced startup mentor: Evaluate my idea and tell me the step-by-step plan to incorporate and raise seed funding in India.')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm transition-all cursor-pointer"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                <span>Ask AI Startup Coach</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-6 scrollbar-none border-t border-slate-800/80 mt-6">
            {[
              { id: 'roadmap', label: '🚀 Idea to Company 6 Stages', count: 'Step-by-Step', icon: Compass },
              { id: 'india-global', label: '🇮🇳 India & Global Incorporation', count: 'MCA & Patents', icon: Landmark },
              { id: 'incubators', label: '🏛️ Incubators & YC Hubs', count: 'YC & T-Hub', icon: Building2 },
              { id: 'funding-grants', label: '💰 Government Grants & VC', count: 'SISFS & BIRAC', icon: DollarSign },
              { id: 'tools-calculator', label: '🧮 Runway & Valuation Calculator', count: 'Interactive', icon: Calculator }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as StartupSubTab)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                      : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border border-slate-700/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold ${
                    isActive ? 'bg-amber-500/40 text-slate-950 font-black' : 'bg-slate-700 text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ========================================================================= */}
        {/* TAB 1: IDEA TO COMPANY ROADMAP (6 STAGES)                                 */}
        {/* ========================================================================= */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Idea to Company: The 6-Stage Execution Blueprint
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Follow this verified timeline to launch and scale a sustainable, high-growth startup venture.
                </p>
              </div>

              <button
                onClick={() => onAskAI?.('Give me a step-by-step checklist to validate an educational hardware startup.')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-xs"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Generate Custom Checklist</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ROADMAP_STAGES.map((s, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${s.badgeColor}`}>
                        {s.stage} • {s.badge}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">⏱️ {s.duration}</span>
                    </div>

                    <h3 className="font-black text-slate-900 text-lg">{s.title}</h3>
                    <p className="text-[11px] text-amber-800 font-medium">{s.teluguTitle}</p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{s.description}</p>

                    {/* Checklist */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider mb-2">Key Checklist Items:</h4>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {s.checklist.map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 bg-slate-50 -mx-6 -mb-6 p-4 rounded-b-2xl">
                    <span className="text-[10px] font-black text-slate-500 uppercase">Core Deliverable:</span>
                    <p className="text-xs font-bold text-slate-800 mt-0.5">{s.deliverable}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: INDIA & GLOBAL INCORPORATION, TAX & PATENTS                        */}
        {/* ========================================================================= */}
        {activeTab === 'india-global' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-400/40 mb-3">
                <Scale className="w-3.5 h-3.5" />
                <span>LEGAL, TAXATION & INTELLECTUAL PROPERTY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">Company Incorporation & Patent Registration</h2>
              <p className="text-slate-300 text-sm max-w-3xl leading-relaxed mt-2">
                Detailed comparison and guide for Private Limited Company in India (Ministry of Corporate Affairs) vs Delaware C-Corp (USA), DPIIT Startup India Tax Holidays, and Indian Patent Office filing.
              </p>
            </div>

            {/* India Pvt Ltd vs Delaware C-Corp Table */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm overflow-x-auto">
              <h3 className="text-lg font-black text-slate-900 mb-4">Structure Comparison: India Pvt Ltd vs USA Delaware C-Corp</h3>
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 uppercase font-black text-[11px]">
                    <th className="p-3 border border-slate-200">Feature</th>
                    <th className="p-3 border border-slate-200 bg-amber-50 text-amber-950">India Private Limited (Pvt Ltd)</th>
                    <th className="p-3 border border-slate-200 bg-indigo-50 text-indigo-950">Delaware C-Corp (USA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-bold border border-slate-200">Best Suited For</td>
                    <td className="p-3 border border-slate-200">Domestic Indian revenue, Indian grants, Indian customers, local hiring</td>
                    <td className="p-3 border border-slate-200">Global VC funding (Y Combinator, US investors), international SaaS</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-slate-200">Governing Authority</td>
                    <td className="p-3 border border-slate-200">Ministry of Corporate Affairs (MCA) - SPICe+ Portal</td>
                    <td className="p-3 border border-slate-200">Delaware Division of Corporations (Stripe Atlas / Clerky)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-slate-200">Tax Holiday Benefits</td>
                    <td className="p-3 border border-slate-200">Section 80-IAC: 100% Tax Exemption for 3 consecutive years out of 10</td>
                    <td className="p-3 border border-slate-200">QSBS (Qualified Small Business Stock) capital gains exemption up to $10M</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-slate-200">Patent Fee Rebate</td>
                    <td className="p-3 border border-slate-200">80% government fee rebate for DPIIT startups on Indian patent filings</td>
                    <td className="p-3 border border-slate-200">USPTO Micro-Entity discounts (60-80% fee reductions)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold border border-slate-200">Setup Cost & Time</td>
                    <td className="p-3 border border-slate-200">₹7,000 - ₹15,000 (Takes 5-7 working days via SPICe+)</td>
                    <td className="p-3 border border-slate-200">$500 via Stripe Atlas (Takes 2-3 business days)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Patent & IP Filing Step-by-Step */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-black text-slate-900 mb-2">How to File a Patent for Your Drone, Robot or Software</h3>
              <p className="text-xs text-slate-500 mb-6">Protect your intellectual property with priority date locking</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded uppercase">Step 1</span>
                  <h4 className="font-extrabold text-sm text-slate-900 mt-2">Prior Art Search & Patentability</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Search Google Patents, InPASS (Indian Patent Office), and Espacenet to ensure your hardware mechanism or algorithm has novel inventive step.
                  </p>
                  <a
                    href="https://ipindia.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
                  >
                    <span>Indian Patent Office (InPASS)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded uppercase">Step 2</span>
                  <h4 className="font-extrabold text-sm text-slate-900 mt-2">File Provisional Specification (Form 2)</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Secure an official priority date immediately with Form 1 and Form 2. Gives you 12 months to build the working prototype and file complete specification.
                  </p>
                  <span className="text-[11px] text-amber-800 font-semibold block mt-3">⚡ Official Govt Fee: ₹1,600 (Startup rebate)</span>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">Step 3</span>
                  <h4 className="font-extrabold text-sm text-slate-900 mt-2">Expedited Examination (Form 18A)</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Startups registered with DPIIT can request expedited examination under Rule 24C, getting patent granted in 12-18 months instead of 4-5 years!
                  </p>
                  <span className="text-[11px] text-emerald-800 font-semibold block mt-3">⚡ Fast-track approval for startups</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: TOP INCUBATORS & ACCELERATORS                                      */}
        {/* ========================================================================= */}
        {activeTab === 'incubators' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Premier Incubators & Accelerators (India & Global)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Access seed investment, mentor networks, government labs, and demo days.
                </p>
              </div>

              <a
                href="https://www.ycombinator.com/apply"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-xs"
              >
                <span>Apply to Y Combinator</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INCUBATORS_LIST.map((inc, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${inc.badgeColor}`}>
                        {inc.badge}
                      </span>
                    </div>

                    <h3 className="font-black text-slate-900 text-lg">{inc.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">📍 {inc.location}</p>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">{inc.benefits}</p>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-black text-slate-700 uppercase">Key Programs:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {inc.programs.map((p, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium">
                            ✓ {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={inc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                    >
                      <span>Visit Incubator Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => onAskAI?.(`Help me prepare my application for ${inc.name}`)}
                      className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold cursor-pointer"
                    >
                      Tips
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: GOVERNMENT GRANTS & VC NETWORKS                                    */}
        {/* ========================================================================= */}
        {activeTab === 'funding-grants' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 mb-3">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>CAPITAL STACK • NON-DILUTIVE & EQUITY VENTURE CAPITAL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">Startup Grants, Angels & Venture Capital</h2>
              <p className="text-slate-300 text-sm max-w-3xl leading-relaxed mt-2">
                Learn how to stack non-dilutive government grants (keeping 100% founder equity) before raising institutional seed rounds from top venture capital networks.
              </p>
            </div>

            {/* Indian Non-Dilutive Grant Programs */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-900">
                Top Non-Dilutive Government Grants in India (Zero Equity Dilution)
              </h3>

              {[
                {
                  scheme: 'Startup India Seed Fund Scheme (SISFS)',
                  grantAmount: 'Up to ₹20 Lakhs (Grant) + ₹50 Lakhs (Debt/CCD)',
                  ministry: 'DPIIT, Ministry of Commerce & Industry',
                  url: 'https://seedfund.startupindia.gov.in',
                  focus: 'Proof of concept, prototype development, product trials, market entry for early-stage startups.',
                  criteria: 'Incorporated under 2 years, DPIIT recognized, business idea must have high market potential.'
                },
                {
                  scheme: 'NIDHI PRAYAS (Department of Science & Technology)',
                  grantAmount: 'Up to ₹10 Lakhs (100% Grant)',
                  ministry: 'DST, Government of India',
                  url: 'https://nidhi-prayas.org',
                  focus: 'Translating innovative technology ideas into functional hardware prototypes.',
                  criteria: 'Individual innovators or early-stage hardware startups working with PRAYAS incubation centers.'
                },
                {
                  scheme: 'MeitY TIDE 2.0 & SAMRIDH Scheme',
                  grantAmount: '₹4 Lakhs (EIR) to ₹40 Lakhs (Seed Funding)',
                  ministry: 'Ministry of Electronics & Information Technology',
                  url: 'https://meity.gov.in',
                  focus: 'ICT, AI, IoT, Robotics, Drone and electronics startups leveraging emerging technologies.',
                  criteria: 'Indian tech startups affiliated with MeitY TIDE 2.0 academic incubation hubs.'
                },
                {
                  scheme: 'BIRAC BIG (Biotechnology & Medical Hardware)',
                  grantAmount: 'Up to ₹50 Lakhs (100% Grant)',
                  ministry: 'Department of Biotechnology (DBT)',
                  url: 'https://birac.nic.in/big.php',
                  focus: 'Bio-robotics, assistive medical devices, surgical automation, agricultural bio-tech.',
                  criteria: 'Indian registered startup or individual entrepreneur working on proof-of-concept.'
                }
              ].map((grant, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        💰 {grant.grantAmount}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">• {grant.ministry}</span>
                    </div>
                    <h4 className="font-extrabold text-slate-900 text-base">{grant.scheme}</h4>
                    <p className="text-xs text-slate-600 max-w-2xl">{grant.focus}</p>
                    <p className="text-xs text-slate-700 pt-1"><strong>Eligibility:</strong> {grant.criteria}</p>
                  </div>

                  <a
                    href={grant.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-all shrink-0 cursor-pointer"
                  >
                    <span>Apply on Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>

            {/* Angel & Venture Capital Directory */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mt-8">
              <h3 className="text-lg font-black text-slate-900 mb-2">Top Angel Networks & Venture Capital Funds</h3>
              <p className="text-xs text-slate-500 mb-6">Connect with active investors backing Indian & global startups</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Indian Angel Network (IAN)', url: 'https://www.indianangelnetwork.com', desc: 'India’s largest angel syndicate' },
                  { name: 'LetsVenture', url: 'https://letsventure.com', desc: 'Online startup fundraising platform' },
                  { name: 'AngelList India', url: 'https://www.angellist.com', desc: 'Rolling funds & syndicate rounds' },
                  { name: 'Sequoia Surge', url: 'https://www.surgeahead.com', desc: 'Early-stage rapid scaling fund' },
                  { name: 'Blume Ventures', url: 'https://blume.vc', desc: 'Leading Indian tech venture capital' },
                  { name: 'Kalaari Capital', url: 'https://www.kalaari.com', desc: 'Early-stage technology investments' },
                  { name: 'Accel India', url: 'https://www.accel.com', desc: 'Global venture backer of Flipkart, Swiggy' },
                  { name: 'Elevation Capital', url: 'https://elevationcapital.com', desc: 'Early-stage venture partners' }
                ].map((inv, i) => (
                  <a
                    key={i}
                    href={inv.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-xs transition-all block group cursor-pointer"
                  >
                    <p className="font-extrabold text-xs text-slate-900 group-hover:text-amber-600 transition-colors">{inv.name}</p>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">{inv.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: RUNWAY, VALUATION & LEAN CANVAS GENERATOR                          */}
        {/* ========================================================================= */}
        {activeTab === 'tools-calculator' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Financial Runway & Valuation Estimator */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                      🧮 FINANCIAL ENGINE
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-xl">Startup Runway & Valuation Calculator</h3>
                  <p className="text-xs text-slate-500 mt-1">Estimate how many months of cash remain and estimated valuation multiple.</p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>Current Bank Balance (Cash in Escrow)</span>
                        <span className="font-mono font-bold">₹{(currentCash / 100000).toFixed(1)} Lakhs</span>
                      </div>
                      <input
                        type="range"
                        min="500000"
                        max="20000000"
                        step="500000"
                        value={currentCash}
                        onChange={e => setCurrentCash(Number(e.target.value))}
                        className="w-full accent-amber-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>Monthly Net Burn Rate (Salaries, Server, Rent)</span>
                        <span className="font-mono font-bold">₹{(monthlyBurn / 1000).toFixed(0)}k / month</span>
                      </div>
                      <input
                        type="range"
                        min="50000"
                        max="1000000"
                        step="25000"
                        value={monthlyBurn}
                        onChange={e => setMonthlyBurn(Number(e.target.value))}
                        className="w-full accent-rose-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>Current Annual Recurring Revenue (ARR)</span>
                        <span className="font-mono font-bold">₹{(annualRevenue / 100000).toFixed(1)} Lakhs / year</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="10000000"
                        step="200000"
                        value={annualRevenue}
                        onChange={e => setAnnualRevenue(Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>Tech Sector Valuation Multiple</span>
                        <span className="font-mono font-bold">{revenueMultiple}x ARR</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="30"
                        value={revenueMultiple}
                        onChange={e => setRevenueMultiple(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Results Card */}
                <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 bg-slate-50 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 rounded-b-2xl">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] font-black text-slate-500 uppercase">Available Runway:</span>
                    <div className="text-2xl font-black text-rose-600 mt-1">{runwayMonths} Months</div>
                    <span className="text-[11px] text-slate-500">
                      {parseFloat(runwayMonths) < 6 ? '⚠️ Danger: Raise capital now' : '✅ Healthy buffer for growth'}
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-[10px] font-black text-slate-500 uppercase">Est. Pre-Money Valuation:</span>
                    <div className="text-2xl font-black text-emerald-700 mt-1">₹{estimatedValuationInLakhs} L</div>
                    <span className="text-[11px] text-slate-500">Based on {revenueMultiple}x ARR multiple</span>
                  </div>
                </div>
              </div>

              {/* 1-Page Lean Canvas Generator */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-900">
                      📝 LEAN CANVAS GENERATOR
                    </span>
                  </div>
                  <h3 className="font-black text-slate-900 text-xl">1-Page Startup Canvas Generator</h3>
                  <p className="text-xs text-slate-500 mt-1">Fill out the key building blocks to generate a ready-to-pitch startup memo.</p>

                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">1. Customer Problem (Pain Point):</label>
                      <input
                        type="text"
                        placeholder="e.g., Drone builders waste 3 weeks hand-soldering custom flight controller wirings."
                        value={canvasProblem}
                        onChange={e => setCanvasProblem(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">2. Unique Solution (Value Hook):</label>
                      <input
                        type="text"
                        placeholder="e.g., Modular plug-and-play flight controller with instant web configurator."
                        value={canvasSolution}
                        onChange={e => setCanvasSolution(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">3. Target Customer Segment:</label>
                      <input
                        type="text"
                        placeholder="e.g., Agricultural drone startups, hobbyist FPV racers, engineering college labs."
                        value={canvasCustomer}
                        onChange={e => setCanvasCustomer(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">4. Revenue Model & Pricing:</label>
                      <input
                        type="text"
                        placeholder="e.g., ₹4,999 per hardware kit + ₹499/mo cloud telemetry subscription."
                        value={canvasRevenue}
                        onChange={e => setCanvasRevenue(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      const promptText = `Review my startup Lean Canvas:\nProblem: ${canvasProblem || 'Hardware assembly is too slow'}\nSolution: ${canvasSolution || 'Modular PCB controllers'}\nCustomer: ${canvasCustomer || 'Robotics engineers and students'}\nRevenue: ${canvasRevenue || 'Hardware sales + SaaS subscription'}\n\nPlease evaluate my value proposition, suggest improvements, and list 3 potential investor objections.`;
                      onAskAI?.(promptText);
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs shadow-xs transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Evaluate Canvas with AI</span>
                  </button>

                  <button
                    onClick={() => {
                      setCanvasProblem('Engineering students struggle to find affordable hands-on robotics kits with step-by-step schematics.');
                      setCanvasSolution('Kids World Gurukul modular robotics lab with Blueprint.io integration and real-time simulators.');
                      setCanvasCustomer('K-12 schools, parents, engineering colleges, young innovators.');
                      setCanvasRevenue('Annual subscription of ₹600 to ₹2,000 + hardware kit marketplace sales.');
                    }}
                    className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    Load Sample
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
