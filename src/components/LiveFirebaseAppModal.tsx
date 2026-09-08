import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  Flame, 
  Globe, 
  Share2, 
  Sparkles, 
  Database, 
  ShieldCheck, 
  Radio
} from 'lucide-react';
import { firebaseConfig } from '../lib/firebase';

interface LiveFirebaseAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveFirebaseAppModal: React.FC<LiveFirebaseAppModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const publicUrls = [
    {
      title: 'Direct Public Live Web URL',
      subtitle: 'Google Cloud Run Production (Instant Worldwide Access)',
      url: 'https://ais-pre-6h3ojl2oh67dewvc67wqfx-682266057961.asia-east1.run.app',
      badge: 'LIVE NOW',
      badgeColor: 'bg-emerald-600 text-white',
      isPrimary: true
    },
    {
      title: 'StoryTribe App (Visual Storytelling & Comic Studio)',
      subtitle: 'Connected Visual Story Studio • storytribeapp.com',
      url: 'https://storytribeapp.com',
      badge: 'STORYTRIBE APP',
      badgeColor: 'bg-purple-600 text-white',
      isPrimary: false
    },
    {
      title: 'Firebase Web App URL',
      subtitle: 'Google Firebase Hosting Domain',
      url: 'https://studio-6989353372-64cd3.web.app',
      badge: 'FIREBASE HOSTING',
      badgeColor: 'bg-amber-600 text-white',
      isPrimary: false
    },
    {
      title: 'Firebase App Alternative Domain',
      subtitle: 'Firebase App Default Subdomain',
      url: 'https://studio-6989353372-64cd3.firebaseapp.com',
      badge: 'FIREBASE DOMAIN',
      badgeColor: 'bg-orange-600 text-white',
      isPrimary: false
    },
    {
      title: 'Custom Repo Subdomain',
      subtitle: 'Target: superparent-studio',
      url: 'https://superparent-studio.web.app',
      badge: 'CUSTOM SITE',
      badgeColor: 'bg-teal-700 text-white',
      isPrimary: false
    },
    {
      title: 'Active Development URL',
      subtitle: 'Live dev container instance',
      url: 'https://ais-dev-6h3ojl2oh67dewvc67wqfx-682266057961.asia-east1.run.app',
      badge: 'DEV PREVIEW',
      badgeColor: 'bg-slate-700 text-white',
      isPrimary: false
    }
  ];

  const handleCopy = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-900 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-700/20">
              🌐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-950">
                  Live Public URLs &amp; Firebase App
                </h2>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Shareable links for parents, students, tutors &amp; partners
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Primary Callout */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/50 p-5 rounded-2xl border border-emerald-200">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Primary Live Public URL</span>
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                Online &amp; Instant Access
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-3">
              <div className="flex-1 bg-white border border-emerald-300 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-800 truncate select-all">
                {publicUrls[0].url}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(publicUrls[0].url, 0)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  {copiedIndex === 0 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedIndex === 0 ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <a
                  href={publicUrls[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center justify-center gap-1 transition-all"
                  title="Open live app in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* All Live URLs List */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-600" />
              <span>All Available Live Web Domains</span>
            </h3>

            <div className="space-y-2.5">
              {publicUrls.slice(1).map((item, idx) => {
                const actualIndex = idx + 1;
                return (
                  <div 
                    key={item.url}
                    className="p-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 bg-slate-50/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900 truncate">
                          {item.title}
                        </span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-600 truncate mt-1">
                        {item.url}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleCopy(item.url, actualIndex)}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                      >
                        {copiedIndex === actualIndex ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedIndex === actualIndex ? 'Copied' : 'Copy'}</span>
                      </button>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-all"
                        title={`Open ${item.url}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Firebase App & Firestore Configuration Card */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Connected Firebase App &amp; Firestore</span>
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Firebase Project ID</div>
                <div className="font-mono font-black text-slate-800 truncate mt-0.5">
                  {firebaseConfig.projectId}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Firestore Database ID</div>
                <div className="font-mono font-black text-slate-800 truncate mt-0.5" title={firebaseConfig.firestoreDatabaseId}>
                  {firebaseConfig.firestoreDatabaseId || 'default'}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Auth Domain</div>
                <div className="font-mono font-black text-slate-800 truncate mt-0.5">
                  {firebaseConfig.authDomain}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Web App ID</div>
                <div className="font-mono font-black text-slate-800 truncate mt-0.5">
                  {firebaseConfig.appId.substring(0, 22)}...
                </div>
              </div>
            </div>
          </div>

          {/* StoryTribe App Integration & Custom Domain Card */}
          <div className="p-4 rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-pink-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>StoryTribe Visual Storytelling Studio</span>
              </span>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-600 text-white">
                INTEGRATED APP
              </span>
            </div>

            <p className="text-xs text-purple-900/80 font-medium">
              Turn traditional Chandamama, Balamitra, and morals into animated storyboards, comic strips, and character dialogues with <strong>StoryTribe</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 bg-white p-3 rounded-xl border border-purple-200">
              <div className="font-mono text-xs font-black text-purple-900 truncate">
                https://storytribeapp.com
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy('https://storytribeapp.com', 99)}
                  className="px-3 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-black flex items-center gap-1 transition-all cursor-pointer"
                >
                  {copiedIndex === 99 ? <Check className="w-3.5 h-3.5 text-purple-700" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === 99 ? 'Copied' : 'Copy Domain'}</span>
                </button>
                <a
                  href="https://storytribeapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-black flex items-center gap-1 shadow-xs transition-all"
                >
                  <span>Launch Studio</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between rounded-b-3xl">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>Anyone with the link can access the live application directly</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
