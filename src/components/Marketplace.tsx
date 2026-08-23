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
  Share2,
  Video,
  Play,
  ExternalLink,
  Code,
  Wrench,
  Layers,
  FileText,
  Copy,
  Check,
  Zap,
  Globe,
  Scissors,
  Box,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  KIDS_HANDMADE_ITEMS, 
  EnrichedTalentMarketItem, 
  FreeWebLinkItem 
} from '../data/kidsHandmadeCreationsData';

export const Marketplace: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTypeFilter, setActiveTypeFilter] = useState<'All' | 'kid_handmade' | 'parent_skill' | 'knowledge_pack'>('All');
  const [activeCraftSubFilter, setActiveCraftSubFilter] = useState<string>('All');
  const [showListModal, setShowListModal] = useState(false);
  const [listSuccess, setListSuccess] = useState(false);
  const [selectedItemForConnect, setSelectedItemForConnect] = useState<EnrichedTalentMarketItem | null>(null);
  const [connectMsgSent, setConnectMsgSent] = useState(false);

  // Detail / Video / Weblink / DIY Guide Modal State
  const [selectedDetailItem, setSelectedDetailItem] = useState<EnrichedTalentMarketItem | null>(null);
  const [modalTab, setModalTab] = useState<'video' | 'weblinks' | 'guide' | 'connect'>('video');
  const [codeCopied, setCodeCopied] = useState(false);

  // Filter items
  const filteredItems = KIDS_HANDMADE_ITEMS.filter(item => {
    const matchesType = activeTypeFilter === 'All' || item.type === activeTypeFilter;
    const matchesSub = activeCraftSubFilter === 'All' || item.craftSubCategory === activeCraftSubFilter;
    return matchesType && matchesSub;
  });

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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const openItemDetail = (item: EnrichedTalentMarketItem, tab: 'video' | 'weblinks' | 'guide' | 'connect' = 'video') => {
    setSelectedDetailItem(item);
    setModalTab(tab);
  };

  const kidsHandmadeCount = KIDS_HANDMADE_ITEMS.filter(i => i.type === 'kid_handmade').length;
  const parentSkillCount = KIDS_HANDMADE_ITEMS.filter(i => i.type === 'parent_skill').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <ShoppingBag className="w-4 h-4 text-amber-200" />
            <span>Parent-Supervised • Kids Handmade DIY • Free Weblinks & Videos • Parent Skills</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            🛍️ Kids Handmade Creations, DIY Robotics & Free Skills Vault
          </h1>

          <p className="text-sm text-orange-50 font-medium leading-relaxed">
            {language === 'te'
              ? 'పిల్లలు తయారుచేసిన రోబోట్స్, హ్యాండ్‌మేడ్ క్రాఫ్ట్స్, సైన్స్ మోడల్స్, పైథాన్ గేమ్స్, ఉచిత వెబ్‌లింక్‌లు (Tinkercad, PhET, Falstad, Scratch) మరియు ఉచిత DIY వీడియో ట్యుటోరియల్స్ వేదిక.'
              : language === 'hi'
              ? 'बच्चों द्वारा बनाए गए रोबोट, हस्तशिल्प, विज्ञान मॉडल, मुफ्त वेबलिंक्स (Tinkercad, PhET, Scratch) और DIY वीडियो ट्यूटोरियल्स का संपूर्ण मंच।'
              : 'Explore kids\' handmade innovations, DIY robotic creation videos, cardboard & paper crafts, free interactive simulators (Tinkercad, Falstad, PhET, Scratch), and parent mentorship.'
            }
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="bg-black/20 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              100% Parent Supervised & Verified
            </span>
            <span className="bg-black/20 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-amber-300" />
              Free DIY Making Videos & Step Guides
            </span>
            <span className="bg-black/20 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-300" />
              Free Web Links & 3D Simulators
            </span>
          </div>
        </div>
      </div>

      {/* Free Kids DIY Resource Highlights & Quick Simulators Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 rounded-3xl p-5 border border-amber-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Free Kids DIY Simulator & Making Web Links
              </h3>
              <p className="text-[11px] text-slate-600 font-medium">
                Direct interactive access for circuit building, 3D robotics modeling, physics animations & game coding
              </p>
            </div>
          </div>
          <span className="bg-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-2xs">
            Free Open Tools
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
          {[
            { label: 'Tinkercad 3D & Circuits', url: 'https://www.tinkercad.com/circuits', icon: Box, desc: '3D Arduino & Wiring Sim', badge: '3D Circuits' },
            { label: 'PhET Science Labs', url: 'https://phet.colorado.edu/', icon: Zap, desc: 'Physics & Chemistry', badge: 'Simulations' },
            { label: 'Falstad Circuit Flow', url: 'https://www.falstad.com/circuit/', icon: Cpu, desc: 'Live Animated Current', badge: 'Live Voltage' },
            { label: 'MIT Scratch 3.0', url: 'https://scratch.mit.edu/', icon: Code, desc: 'Drag-and-Drop Games', badge: 'Block Code' },
            { label: 'GeoGebra 3D Math', url: 'https://www.geogebra.org/3d', icon: Compass, desc: 'Sacred Vedic Shapes', badge: '3D Geometry' },
            { label: 'Replit Python Lab', url: 'https://replit.com/', icon: Globe, desc: 'Browser Code IDE', badge: 'Free Python' }
          ].map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <a
                key={idx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-2xl bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 transition-all flex flex-col justify-between space-y-1 shadow-2xs group"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-4 h-4 text-orange-600 group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    {tool.badge}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 group-hover:text-orange-600 transition-colors truncate">
                    {tool.label}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate">{tool.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-orange-600 pt-0.5">
                  <span>Open Tool</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Main Filter & Action Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Primary Type Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            <button
              onClick={() => {
                setActiveTypeFilter('All');
                setActiveCraftSubFilter('All');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                activeTypeFilter === 'All'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
              }`}
            >
              🌟 All Creations & Skills ({KIDS_HANDMADE_ITEMS.length})
            </button>

            {/* Kids Handmade Things Button */}
            <button
              onClick={() => {
                setActiveTypeFilter('kid_handmade');
                setActiveCraftSubFilter('All');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTypeFilter === 'kid_handmade'
                  ? 'bg-orange-600 text-white shadow-xs ring-2 ring-orange-400/40'
                  : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>👦 Kids Handmade Things & DIY ({kidsHandmadeCount})</span>
            </button>

            <button
              onClick={() => {
                setActiveTypeFilter('parent_skill');
                setActiveCraftSubFilter('All');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                activeTypeFilter === 'parent_skill'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>👨‍👩‍👧 Parent Skill Mentorship ({parentSkillCount})</span>
            </button>
          </div>

          {/* Upload Button */}
          <button
            onClick={() => setShowListModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white font-black px-5 py-2.5 rounded-xl text-xs shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload Kids Handmade DIY / Skill</span>
          </button>
        </div>

        {/* Subcategory Secondary Pills for Kids Handmade */}
        {activeTypeFilter === 'kid_handmade' && (
          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">DIY Categories:</span>
            {[
              { id: 'All', label: 'All Handmade' },
              { id: 'robotics_diy', label: '🤖 DIY Robotics & Electronics' },
              { id: 'craft_making', label: '✂️ Crafting & Making' },
              { id: 'electronics', label: '⚡ Solar & Sensors' },
              { id: 'game_coding', label: '💻 Python & Scratch Games' }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveCraftSubFilter(sub.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCraftSubFilter === sub.id
                    ? 'bg-amber-600 text-white shadow-2xs font-black'
                    : 'bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-800'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Talent Marketplace Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Image Banner with Video Play Overlay Badge */}
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Parent verified badge */}
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{item.badge}</span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3 bg-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs">
                  {item.category}
                </div>

                {/* Play Video Overlay Button on Image */}
                {item.videoUrl && (
                  <button
                    onClick={() => openItemDetail(item, 'video')}
                    className="absolute bottom-3 right-3 bg-black/80 hover:bg-orange-600 text-white text-[11px] font-black px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md cursor-pointer border border-white/20"
                  >
                    <Play className="w-3.5 h-3.5 fill-white text-white" />
                    <span>Watch DIY Video ({item.videoDuration})</span>
                  </button>
                )}
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

                {/* Free Weblinks preview tags on card */}
                {item.freeWebLinks && item.freeWebLinks.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      <Globe className="w-3 h-3 text-orange-500" />
                      <span>Free Web Links & Tools:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.freeWebLinks.map((link, lIdx) => (
                        <a
                          key={lIdx}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 bg-orange-50 hover:bg-orange-100 text-orange-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-orange-200 transition-colors"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-orange-600" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Materials / Skills Used */}
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
                        🤝 Free Skill Mentorship / Swap
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-bold text-slate-400">
                    📍 {item.creatorCity}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="p-5 pt-0 grid grid-cols-2 gap-2">
              <button
                onClick={() => openItemDetail(item, 'video')}
                className="bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold py-2.5 rounded-xl text-xs border border-amber-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5 text-amber-600" />
                <span>Watch Video & DIY</span>
              </button>

              <button
                onClick={() => setSelectedItemForConnect(item)}
                className="bg-orange-600 hover:bg-orange-700 text-white font-black py-2.5 rounded-xl text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{item.type === 'parent_skill' ? 'Request Mentorship' : 'Connect / Swap'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comprehensive DIY Project, Video & Free Weblinks Modal */}
      {selectedDetailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-orange-200 flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between border-b border-slate-700 shrink-0">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-orange-500/20 text-orange-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-orange-400/30">
                    {selectedDetailItem.category}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-400/30">
                    {selectedDetailItem.badge}
                  </span>
                </div>
                <h3 className="font-black text-base sm:text-lg text-white leading-tight">
                  {selectedDetailItem.title}
                </h3>
                <p className="text-xs text-slate-300">
                  By {selectedDetailItem.creatorName} ({selectedDetailItem.creatorRole}) • {selectedDetailItem.creatorCity}
                </p>
              </div>

              <button
                onClick={() => setSelectedDetailItem(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Tab Controls */}
            <div className="bg-slate-100 p-2 sm:px-5 flex items-center gap-2 border-b border-slate-200 overflow-x-auto shrink-0">
              <button
                onClick={() => setModalTab('video')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  modalTab === 'video'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>DIY Making Video ({selectedDetailItem.videoDuration})</span>
              </button>

              <button
                onClick={() => setModalTab('weblinks')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  modalTab === 'weblinks'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Free Web Links & Simulators ({selectedDetailItem.freeWebLinks?.length || 0})</span>
              </button>

              <button
                onClick={() => setModalTab('guide')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  modalTab === 'guide'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Step-by-Step Guide & Code</span>
              </button>

              <button
                onClick={() => setModalTab('connect')}
                className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                  modalTab === 'connect'
                    ? 'bg-white text-orange-600 shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Connect & Swap</span>
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
              
              {/* TAB 1: DIY VIDEO TUTORIAL */}
              {modalTab === 'video' && (
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-h-[380px] w-full shadow-lg border border-slate-800">
                    <iframe
                      src={selectedDetailItem.videoUrl}
                      title={selectedDetailItem.videoTitle}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{selectedDetailItem.videoTitle}</h4>
                      <p className="text-xs text-orange-800 font-medium">
                        Complete making video tutorial by kid maker {selectedDetailItem.creatorName} ({selectedDetailItem.creatorRole}).
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setModalTab('guide')}
                        className="px-4 py-2 bg-orange-600 text-white text-xs font-black rounded-xl hover:bg-orange-700 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Wrench className="w-3.5 h-3.5" />
                        <span>View Making Steps</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FREE WEBLINKS & SIMULATORS */}
              {modalTab === 'weblinks' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      Free Web Links, Circuit Simulators & Code Blueprints
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      All links are 100% free, browser-accessible, and child-safe. Click any tool below to launch in a new tab:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedDetailItem.freeWebLinks?.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-2xl bg-white hover:bg-orange-50/50 border border-slate-200 hover:border-orange-300 transition-all flex items-start justify-between gap-3 shadow-xs group"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-2 py-0.5 rounded">
                              {link.badge}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase">{link.type}</span>
                          </div>
                          <h5 className="font-black text-xs text-slate-900 group-hover:text-orange-600 transition-colors">
                            {link.label}
                          </h5>
                          <p className="text-[11px] text-slate-500 font-mono break-all">{link.url}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-orange-600 shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                    <span className="font-bold block">💡 Pro Maker Tip:</span>
                    <p>
                      You can simulate the circuit logic in Tinkercad or Falstad before soldering or plugging real jumper wires on breadboards.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: STEP-BY-STEP MAKING GUIDE & CODE */}
              {modalTab === 'guide' && (
                <div className="space-y-4">
                  {/* Meta Specs Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <span className="text-slate-400 block font-bold text-[10px]">Estimated Build Time</span>
                      <span className="font-black text-slate-900">{selectedDetailItem.diyMakingGuide.timeNeeded}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <span className="text-slate-400 block font-bold text-[10px]">Difficulty Level</span>
                      <span className="font-black text-orange-600">{selectedDetailItem.diyMakingGuide.difficulty}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs col-span-2 sm:col-span-1">
                      <span className="text-slate-400 block font-bold text-[10px]">Parent Verification</span>
                      <span className="font-black text-emerald-600">🛡️ 100% Supervised</span>
                    </div>
                  </div>

                  {/* Materials Needed */}
                  <div className="space-y-2">
                    <h5 className="font-black text-xs text-slate-800 uppercase tracking-wider">Required Materials & Components:</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDetailItem.materialsOrSkills.map((m, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-200">
                          ✓ {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Numbered Steps */}
                  <div className="space-y-2.5">
                    <h5 className="font-black text-xs text-slate-800 uppercase tracking-wider">Step-by-Step Instructions:</h5>
                    <div className="space-y-2">
                      {selectedDetailItem.diyMakingGuide.stepByStep.map((step) => (
                        <div key={step.step} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                            {step.step}
                          </div>
                          <div className="space-y-0.5">
                            <h6 className="font-black text-xs text-slate-900">{step.title}</h6>
                            <p className="text-xs text-slate-600 leading-relaxed">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Safety Instructions */}
                  {selectedDetailItem.diyMakingGuide.safetyTips && (
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                      <h5 className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-amber-600" />
                        <span>Safety Guidelines:</span>
                      </h5>
                      <ul className="text-xs text-amber-800 space-y-1 list-disc pl-5">
                        {selectedDetailItem.diyMakingGuide.safetyTips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Copyable Code Snippet if applicable */}
                  {selectedDetailItem.diyMakingGuide.codeSnippet && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h5 className="font-black text-xs text-slate-800 uppercase tracking-wider">
                          Arduino / Python Code Snippet:
                        </h5>
                        <button
                          onClick={() => handleCopyCode(selectedDetailItem.diyMakingGuide.codeSnippet!)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {codeCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 rounded-2xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto border border-slate-800 leading-relaxed">
                        {selectedDetailItem.diyMakingGuide.codeSnippet}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: CONNECT & SWAP */}
              {modalTab === 'connect' && (
                <div className="space-y-4">
                  {connectMsgSent ? (
                    <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-6 rounded-2xl text-center space-y-2">
                      <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                      <h4 className="font-black text-base">Request Sent to {selectedDetailItem.creatorName}!</h4>
                      <p className="text-xs">
                        Your parent message and swap proposal have been notified inside the Super Parent Gurukul network.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSendConnectRequest} className="space-y-3.5">
                      <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200 space-y-1">
                        <h4 className="font-black text-xs text-orange-950">{selectedDetailItem.title}</h4>
                        <p className="text-xs text-orange-800">
                          Offered by {selectedDetailItem.creatorName} ({selectedDetailItem.creatorRole}) • {selectedDetailItem.creatorCity}
                        </p>
                        <div className="pt-1 text-xs font-black text-orange-900">
                          {selectedDetailItem.priceINR > 0 
                            ? `Exchange Value: ₹${selectedDetailItem.priceINR} or ${selectedDetailItem.starTokens} ⭐ Stars`
                            : '🤝 Free Knowledge / Skill Mentorship Swap'}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Your Parent / Student Name:</label>
                        <input
                          required
                          type="text"
                          defaultValue="Rajesh Reddy (Parent of Chaitanya, Class 8)"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Your Message or Swap Proposal:</label>
                        <textarea
                          required
                          rows={3}
                          defaultValue={`Hi ${selectedDetailItem.creatorName}! We love your ${selectedDetailItem.title} DIY project. We would love to collaborate or swap with our DIY kits.`}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                        />
                      </div>

                      <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-semibold">
                        🛡️ 100% Parent Supervised: All messages are routed through verified parent accounts.
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
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">
                  {selectedDetailItem.priceINR > 0 ? `₹${selectedDetailItem.priceINR} / ${selectedDetailItem.starTokens} Stars` : 'Free Swap'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedDetailItem(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => setModalTab('connect')}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <HandHeart className="w-3.5 h-3.5" />
                  <span>Connect with Maker</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Connect / Swap Request Direct Modal */}
      {selectedItemForConnect && !selectedDetailItem && (
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
                <span>Upload Kids Handmade DIY or Parent Skill</span>
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
                <p className="text-xs">Your DIY project & free links have been submitted for instant parent approval.</p>
              </div>
            ) : (
              <form onSubmit={handleListSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Listing Type:</label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800">
                    <option value="kid_handmade">👦 Kid's Handmade Thing (Robotics, Craft, Code)</option>
                    <option value="parent_skill">👨‍👩‍👧 Parent's Skill / Mentorship</option>
                    <option value="knowledge_pack">📚 Knowledge Guide / Notes Pack</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Title / Name of DIY Item:</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Handmade Cardboard Hydraulic Crane"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">DIY Video / YouTube Link:</label>
                  <input
                    type="url"
                    placeholder="e.g. https://www.youtube.com/watch?v=..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Free Weblinks / Tinkercad / GitHub / Scratch:</label>
                  <input
                    type="url"
                    placeholder="e.g. https://www.tinkercad.com/things/..."
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
                  Submit DIY Listing for Parent Approval
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
