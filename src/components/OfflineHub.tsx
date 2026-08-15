import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Download, 
  CheckCircle2, 
  HardDrive, 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  Layers, 
  Clock, 
  FileText,
  Cpu,
  HeartHandshake
} from 'lucide-react';
import { 
  OFFLINE_COURSE_LIBRARY, 
  getOfflineCacheStats, 
  syncOfflineContentNow,
  OfflineCacheStats 
} from '../utils/offlineStorage';
import { useLanguage } from '../context/LanguageContext';

export const OfflineHub: React.FC = () => {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState<OfflineCacheStats>(getOfflineCacheStats());
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(OFFLINE_COURSE_LIBRARY[0]);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState('');

  useEffect(() => {
    const handleOnlineStatus = () => setStats(getOfflineCacheStats());
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const handleSyncAll = async () => {
    setIsSyncing(true);
    setSyncSuccessMsg('');
    const result = await syncOfflineContentNow();
    setStats(getOfflineCacheStats());
    setIsSyncing(false);
    setSyncSuccessMsg(`✅ Successfully cached ${result.count} complete course modules and prompt handbooks to your device storage!`);
    setTimeout(() => setSyncSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <HardDrive className="w-4 h-4 text-amber-200" />
            <span>Service Worker PWA Offline Engine • 100% Zero-Internet Learning</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            📴 Offline Learning Library & Service Worker Cache
          </h1>

          <p className="text-sm text-orange-50 font-medium leading-relaxed">
            {language === 'te'
              ? 'ఇంటర్నెట్ కనెక్షన్ లేకపోయినా విద్యార్థులు తమ అన్ని కోర్సులు, AI ప్రాంప్ట్ హ్యాండ్‌బుక్, వేద గణిత సూత్రాలు మరియు భగవద్గీత పాఠాలను నేరుగా చదువుకోవచ్చు.'
              : language === 'hi'
              ? 'बिना इंटरनेट कनेक्शन के भी छात्र अपने सभी कोर्स, एआई प्रॉम्प्ट हैंडबुक, वैदिक गणित सूत्र और भगवद्गीता पाठ आसानी से पढ़ सकते हैं।'
              : 'Access your critical courses, AI prompting guide, Vedic Maths formulas, robotics wiring diagrams, and moral stories anytime, anywhere without an active internet connection.'
            }
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 ${
              stats.isOnline ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30' : 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
            }`}>
              {stats.isOnline ? <Wifi className="w-3.5 h-3.5 text-emerald-300" /> : <WifiOff className="w-3.5 h-3.5 text-amber-300" />}
              <span>{stats.isOnline ? 'Live Network Connected' : 'Offline Mode Active'}</span>
            </div>

            <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="bg-white hover:bg-orange-50 text-orange-700 font-black px-4 py-1.5 rounded-full text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing to Cache...' : 'Download / Cache All Content Now'}</span>
            </button>
          </div>
        </div>
      </div>

      {syncSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl text-xs font-black flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{syncSuccessMsg}</span>
        </div>
      )}

      {/* Storage & Cache Status Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-xs font-bold">Cached Courses</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.totalCachedCourses} Modules</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-0.5">100% Ready Offline</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-xs font-bold">AI Prompts Stored</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.totalCachedPrompts} Prompts</div>
          <div className="text-[11px] text-orange-600 font-bold mt-0.5">Chain-of-Thought Ready</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-xs font-bold">Gita Shlokas & Moral Audio</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.totalCachedShlokas} Shlokas</div>
          <div className="text-[11px] text-amber-600 font-bold mt-0.5">Telugu & English</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-slate-500 text-xs font-bold">Local Device Storage</div>
          <div className="text-2xl font-black text-slate-900 mt-1">{stats.cacheStorageEstimateMB} MB</div>
          <div className="text-[11px] text-slate-500 font-bold mt-0.5">Fast Instant Load</div>
        </div>
      </div>

      {/* Main Content Viewer: Offline Modules on Left, Interactive Lesson Reader on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Module List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-orange-600" />
            <span>Available Offline Course Packs</span>
          </h3>

          <div className="space-y-2.5">
            {OFFLINE_COURSE_LIBRARY.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedLesson(item)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  selectedLesson.id === item.id
                    ? 'bg-orange-50 border-orange-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-orange-300'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-black text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <span className="font-bold text-slate-500">{item.sizeKB} KB • {item.grade}</span>
                </div>

                <h4 className="font-black text-xs text-slate-900 line-clamp-1 mt-1">
                  {language === 'te' ? item.teluguTitle : language === 'hi' ? item.hindiTitle : item.title}
                </h4>

                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                  <span>{item.lessons.length} Offline Lessons</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Cached
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Reader (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2 text-xs font-black text-orange-600 mb-1">
                <span>{selectedLesson.category}</span>
                <span>•</span>
                <span>{selectedLesson.grade}</span>
              </div>
              <h2 className="text-xl font-black text-slate-900">
                {language === 'te' ? selectedLesson.teluguTitle : language === 'hi' ? selectedLesson.hindiTitle : selectedLesson.title}
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-1 leading-relaxed">
                {selectedLesson.content}
              </p>
            </div>

            {/* Offline Lesson Syllabus Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                Full Offline Curriculum Lessons:
              </h4>

              <div className="space-y-2">
                {selectedLesson.lessons.map((les, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 font-black text-[11px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-800">{les}</span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Offline Ready
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Offline AI Prompt Helper */}
            <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <h4 className="text-xs font-black text-orange-950">
                  Offline Learning Exercise
                </h4>
              </div>
              <p className="text-xs text-orange-900 leading-relaxed">
                Practice decomposing complex mathematical and scientific questions using the pre-cached rulebook without needing active WiFi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
