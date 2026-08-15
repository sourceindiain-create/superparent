import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Star, 
  PlusCircle, 
  CheckCircle2, 
  Heart, 
  Sparkles, 
  Users, 
  Cpu, 
  BookOpen, 
  Award, 
  HandHeart, 
  MessageSquare, 
  Send,
  Share2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface TalentMarketItem {
  id: string;
  type: 'kid_handmade' | 'parent_skill' | 'knowledge_pack';
  title: string;
  teluguTitle: string;
  creatorName: string;
  creatorRole: string;
  creatorAge?: number;
  creatorCity: string;
  category: string;
  description: string;
  priceINR: number;
  starTokens: number;
  rating: number;
  reviewsCount: number;
  parentApproved: boolean;
  badge: string;
  imageUrl: string;
  materialsOrSkills: string[];
}

const TALENT_ITEMS: TalentMarketItem[] = [
  {
    id: 'kid-diy-1',
    type: 'kid_handmade',
    title: 'Smart Ultrasonic Obstacle Avoiding Robot Car',
    teluguTitle: 'స్మార్ట్ అల్ట్రాసోనిక్ రోబోట్ కారు (కిడ్స్ మేడ్)',
    creatorName: 'Arnav Sharma',
    creatorRole: 'Kid Innovator (Class 7)',
    creatorAge: 12,
    creatorCity: 'Visakhapatnam',
    category: 'DIY Robotics',
    description: 'Fully functional Arduino Uno obstacle-sensing robot car assembled by Arnav with custom 3D printed chassis.',
    priceINR: 450,
    starTokens: 90,
    rating: 4.9,
    reviewsCount: 38,
    parentApproved: true,
    badge: 'Kids Handmade Innovation',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Arduino Uno', 'HC-SR04 Sensor', 'L298N Motor Driver', 'Chassis']
  },
  {
    id: 'kid-craft-2',
    type: 'kid_handmade',
    title: 'Handmade Eco-Friendly Paper Mache Solar System & Planets',
    teluguTitle: 'పేపర్ మాచే సౌర కుటుంబం & గ్రహాల మోడల్',
    creatorName: 'Sahithi Reddy',
    creatorRole: 'Kid Artisan (Class 5)',
    creatorAge: 10,
    creatorCity: 'Bengaluru',
    category: 'Handmade Crafts',
    description: 'Recycled paper and non-toxic paint educational solar system desktop model with planetary distance facts.',
    priceINR: 280,
    starTokens: 55,
    rating: 4.8,
    reviewsCount: 29,
    parentApproved: true,
    badge: 'Eco-Artisan Champion',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Recycled Newsprint', 'Natural Dyes', 'Wooden Base']
  },
  {
    id: 'parent-skill-1',
    type: 'parent_skill',
    title: '1-on-1 Speed Vedic Maths & Mental Arithmetic Mentorship',
    teluguTitle: 'స్పీడ్ వేద గణితం వ్యక్తిగత శిక్షణ (తల్లిదండ్రుల నైపుణ్యం)',
    creatorName: 'Suresh Varma (Software Architect & Parent)',
    creatorRole: 'Super Parent Mentor',
    creatorCity: 'Hyderabad',
    category: 'Parent Skill Exchange',
    description: 'Offering weekend 45-minute live mentorship on Ekadhikena and Nikhilam mental calculations for Class 4-10 students.',
    priceINR: 0, // Skill Swap / Free for Gurukul members
    starTokens: 40,
    rating: 5.0,
    reviewsCount: 64,
    parentApproved: true,
    badge: 'Parent Knowledge Swap',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Vedic Sutras', 'Speed Calculation', 'Interactive Drills']
  },
  {
    id: 'parent-skill-2',
    type: 'parent_skill',
    title: 'Classical Carnatic Vocal & Shloka Chanting for Kids',
    teluguTitle: 'కర్ణాటక సంగీత గానం & శ్లోకాల ఉచ్చారణ శిక్షణ',
    creatorName: 'Smt. Gayatri Devi (Parent & Music Teacher)',
    creatorRole: 'Gurukul Parent Guru',
    creatorCity: 'Chennai / Online',
    category: 'Cultural Talent',
    description: 'Gentle foundational vocal training, sarali swaras, and Bhagavad Gita shloka prosody for young learners.',
    priceINR: 0,
    starTokens: 50,
    rating: 4.9,
    reviewsCount: 47,
    parentApproved: true,
    badge: 'Traditional Art Mentor',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Voice Culture', 'Shruti Alignment', 'Gita Chanting']
  },
  {
    id: 'kid-story-3',
    type: 'knowledge_pack',
    title: 'Illustrated Tenali Rama & AI Adventure Comic Book',
    teluguTitle: 'తెనాలి రామ & AI కామిక్ పుస్తకం (పిల్లల రచన)',
    creatorName: 'Rohan & Tanvi Gupta',
    creatorRole: 'Kid Authors (Class 6 & 8)',
    creatorAge: 13,
    creatorCity: 'Pune',
    category: 'Creative Writing',
    description: 'Hand-drawn and story-crafted 24-page comic book blending historical wit with futuristic coding adventures.',
    priceINR: 199,
    starTokens: 35,
    rating: 4.9,
    reviewsCount: 52,
    parentApproved: true,
    badge: 'Young Author Award',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Digital Color Print', 'Telugu & English Dual Script']
  },
  {
    id: 'kid-coding-4',
    type: 'kid_handmade',
    title: 'Python Space Invaders & Math Arcade Game (Scratch/Pygame)',
    teluguTitle: 'పైథాన్ స్పేస్ ఇన్వేడర్స్ గేమ్ (కిడ్ ప్రోగ్రామర్)',
    creatorName: 'Karthik Nambiar',
    creatorRole: 'Junior Game Dev (Class 8)',
    creatorAge: 13,
    creatorCity: 'Bengaluru',
    category: 'Coding & Games',
    description: 'Full open-source game code with step-by-step tutorial video teaching how to program score tracking and collision logic.',
    priceINR: 150,
    starTokens: 30,
    rating: 4.9,
    reviewsCount: 41,
    parentApproved: true,
    badge: 'Young Coder Creation',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    materialsOrSkills: ['Python 3', 'Pygame Code', 'Video Walkthrough']
  }
];

export const Marketplace: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTypeFilter, setActiveTypeFilter] = useState<'All' | 'kid_handmade' | 'parent_skill' | 'knowledge_pack'>('All');
  const [showListModal, setShowListModal] = useState(false);
  const [listSuccess, setListSuccess] = useState(false);
  const [selectedItemForConnect, setSelectedItemForConnect] = useState<TalentMarketItem | null>(null);
  const [connectMsgSent, setConnectMsgSent] = useState(false);

  const filteredItems = TALENT_ITEMS.filter(item => 
    activeTypeFilter === 'All' || item.type === activeTypeFilter
  );

  const handleListSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setListSuccess(true);
    setTimeout(() => {
      setListSuccess(false);
      setShowListModal(false);
    }, 2200);
  };

  const handleSendConnectRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setConnectMsgSent(true);
    setTimeout(() => {
      setConnectMsgSent(false);
      setSelectedItemForConnect(null);
    }, 2200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <ShoppingBag className="w-4 h-4 text-amber-200" />
            <span>Parent-Supervised • Kids Creations • Parents Skill Exchange • Knowledge Swap</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            🛍️ Kids Talent, Handmade Creations & Parent Skills Marketplace
          </h1>

          <p className="text-sm text-orange-50 font-medium leading-relaxed">
            {language === 'te'
              ? 'పిల్లలు తయారుచేసిన రోబోట్స్, చేతివృత్తులు, సైన్స్ ప్రాజెక్ట్‌లు, డ్రాయింగ్స్ మరియు తల్లిదండ్రుల విజ్ఞాన నైపుణ్యాల (వేద గణితం, సంగీతం, కోడింగ్) పరస్పర మార్పిడి వేదిక.'
              : language === 'hi'
              ? 'बच्चों द्वारा बनाए गए रोबोट, हस्तशिल्प, विज्ञान मॉडल, पुस्तकें और माता-पिता के कौशल (वैदिक गणित, संगीत, कोडिंग) का प्रामाणिक मंच।'
              : 'Showcase and exchange kids\' handmade creations (DIY electronics, crafts, storybooks, games) and parent skills (Vedic Maths, classical music, coding) under direct parent safety supervision.'
            }
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="bg-black/20 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              100% Parent Supervised & Approved
            </span>
            <span className="bg-black/20 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Earn Star Tokens or INR
            </span>
          </div>
        </div>
      </div>

      {/* Safety & Action Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Type Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveTypeFilter('All')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
              activeTypeFilter === 'All'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-orange-50'
            }`}
          >
            🌟 All Creations & Skills ({TALENT_ITEMS.length})
          </button>

          <button
            onClick={() => setActiveTypeFilter('kid_handmade')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTypeFilter === 'kid_handmade'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-orange-50'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Kids Handmade Things</span>
          </button>

          <button
            onClick={() => setActiveTypeFilter('parent_skill')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTypeFilter === 'parent_skill'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-orange-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Parent Skill Mentorship</span>
          </button>

          <button
            onClick={() => setActiveTypeFilter('knowledge_pack')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTypeFilter === 'knowledge_pack'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-orange-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Books & Knowledge</span>
          </button>
        </div>

        <button
          onClick={() => setShowListModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-black px-5 py-2.5 rounded-xl text-xs shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload Kids Creation or Parent Skill</span>
        </button>
      </div>

      {/* Talent Marketplace Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image Banner */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{item.badge}</span>
                </div>
                <div className="absolute top-3 right-3 bg-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs">
                  {item.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-orange-600">
                    By {item.creatorName} ({item.creatorRole})
                  </span>
                  <div className="flex items-center gap-1 text-xs font-black text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{item.rating} ({item.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="font-black text-slate-900 text-base leading-snug">
                  {language === 'te' ? item.teluguTitle : item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Materials / Skill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.materialsOrSkills.map((m, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {m}
                    </span>
                  ))}
                </div>

                {/* Pricing / Star Token Exchange */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    {item.priceINR > 0 ? (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-slate-900">₹{item.priceINR}</span>
                        <span className="text-[11px] font-bold text-orange-600">or {item.starTokens} ⭐ Stars</span>
                      </div>
                    ) : (
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        🤝 Free Community Skill Swap
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-bold text-slate-400">
                    📍 {item.creatorCity}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-5 pt-0 flex gap-2">
              <button
                onClick={() => setSelectedItemForConnect(item)}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-black py-2.5 rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{item.type === 'parent_skill' ? 'Request Mentorship' : 'Connect & Swap / Buy'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Connect / Swap Request Modal */}
      {selectedItemForConnect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <HandHeart className="w-5 h-5 text-orange-600" />
                <span>Connect & Request Swap</span>
              </h3>
              <button 
                onClick={() => setSelectedItemForConnect(null)} 
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {connectMsgSent ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-5 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-black text-base">Request Sent to {selectedItemForConnect.creatorName}!</h4>
                <p className="text-xs">
                  Your parent contact and Gurukul message have been notified. Check your messages soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendConnectRequest} className="space-y-3.5">
                <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200 text-xs space-y-1">
                  <div className="font-black text-orange-950">{selectedItemForConnect.title}</div>
                  <div className="text-orange-800">Offered by {selectedItemForConnect.creatorName} ({selectedItemForConnect.creatorCity})</div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Child's / Parent's Name:</label>
                  <input
                    required
                    type="text"
                    defaultValue="Rajesh Reddy (Parent of Chaitanya, Class 8)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Your Message / Swap Proposal:</label>
                  <textarea
                    required
                    rows={3}
                    defaultValue="Hi! We would love to collaborate or swap with our DIY Arduino project kit. Please let us know a convenient time."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-semibold">
                  🛡️ Safety Verified: Communication is conducted inside the verified Super Parent Gurukul network.
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-2.5 rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Collaboration Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* List Product / Upload Talent Modal */}
      {showListModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-orange-600" />
                <span>Upload Kids Creation or Parent Skill</span>
              </h3>
              <button 
                onClick={() => setShowListModal(false)} 
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {listSuccess ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-5 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-black text-base">Listing Request Submitted!</h4>
                <p className="text-xs">Your listing has been submitted for instant parent approval and is ready on marketplace.</p>
              </div>
            ) : (
              <form onSubmit={handleListSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Listing Type:</label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800">
                    <option value="kid_handmade">👦 Kid's Handmade Thing (Craft, Robot, Story)</option>
                    <option value="parent_skill">👨‍👩‍👧 Parent's Skill / Mentorship</option>
                    <option value="knowledge_pack">📚 Knowledge Guide / Notes Pack</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Title / Name of Item or Skill:</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Handmade Cardboard Hydraulic Crane"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Price (₹) or 0 for Swap:</label>
                    <input
                      required
                      type="number"
                      placeholder="e.g. 200 or 0"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Star Tokens (⭐):</label>
                    <input
                      type="number"
                      placeholder="e.g. 40"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Description & Materials Used:</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe how it was created or what will be taught..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                  />
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-semibold">
                  🛡️ Parent Supervision: Requires Parent Approval on Parent Login.
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-2.5 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Submit Listing for Parent Approval
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
