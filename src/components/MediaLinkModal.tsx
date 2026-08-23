import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  ExternalLink, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Download, 
  Share2, 
  Check, 
  Sparkles, 
  Maximize2,
  Tv,
  Globe,
  BookOpen,
  HelpCircle,
  Clock,
  Award
} from 'lucide-react';

export interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  teluguTitle?: string;
  category?: string;
  videoUrl?: string;
  webUrl?: string;
  audioText?: string;
  description?: string;
  notesContent?: string;
  keyPoints?: string[];
}

export const MediaLinkModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  title,
  teluguTitle,
  category = 'Interactive Learning Resource',
  videoUrl,
  webUrl,
  audioText,
  description,
  notesContent,
  keyPoints = []
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'media' | 'notes' | 'weblink'>('media');

  if (!isOpen) return null;

  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToSpeak = audioText || `${title}. ${teluguTitle || ''}. ${description || ''}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = playbackSpeed;
      utterance.lang = /[\u0C00-\u0C7F]/.test(textToSpeak) ? 'te-IN' : 'en-IN';
      
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleCopy = () => {
    const link = webUrl || videoUrl || window.location.href;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between border-b border-slate-700">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="bg-orange-500/20 text-orange-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-orange-400/30">
                {category}
              </span>
              {webUrl && (
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Live Resource
                </span>
              )}
            </div>
            <h3 className="font-black text-base sm:text-lg text-white leading-tight">
              {title}
            </h3>
            {teluguTitle && (
              <p className="text-xs text-orange-200 font-bold">
                {teluguTitle}
              </p>
            )}
          </div>

          <button
            onClick={() => {
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('media')}
            className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'media'
                ? 'border-orange-600 text-orange-600 font-black'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>Interactive Video / Audio Player</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'notes'
                ? 'border-orange-600 text-orange-600 font-black'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Key Notes & Summary</span>
          </button>

          {webUrl && (
            <button
              onClick={() => setActiveTab('weblink')}
              className={`pb-2 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'weblink'
                  ? 'border-orange-600 text-orange-600 font-black'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Direct Web Portal</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-grow space-y-4">
          {activeTab === 'media' && (
            <div className="space-y-4">
              {/* Video Simulated / Player Frame */}
              <div className="relative rounded-2xl bg-slate-950 aspect-video overflow-hidden border border-slate-800 flex items-center justify-center shadow-inner group">
                {videoUrl && videoUrl.includes('youtube.com') ? (
                  <iframe
                    src={videoUrl.replace('watch?v=', 'embed/')}
                    title={title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="p-6 text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-orange-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-orange-600/40 animate-pulse">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                    <div className="text-white space-y-1">
                      <p className="font-black text-sm text-amber-200">
                        {title}
                      </p>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        {description || 'HD Multimedia Lesson with Voice Pronunciation & Vedic Chanting audio playback.'}
                      </p>
                    </div>
                  </div>
                )}

                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white border border-white/20 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Interactive Audio/Video Ready</span>
                </div>
              </div>

              {/* Audio Synthesizer / Chanting Controller */}
              <div className="bg-orange-50/70 p-4 rounded-2xl border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleSpeech}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shadow-md transition-all cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    }`}
                  >
                    {isPlayingAudio ? <Pause className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                  <div>
                    <span className="text-xs font-black text-slate-900 block">
                      {isPlayingAudio ? 'Speaking / Chanting Now...' : 'Play Native Voice Audio'}
                    </span>
                    <span className="text-[11px] text-slate-600">
                      Telugu & English natural voice synthesis
                    </span>
                  </div>
                </div>

                {/* Speed selector */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-slate-600">Speed:</span>
                  {[0.75, 1.0, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setPlaybackSpeed(speed)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        playbackSpeed === speed
                          ? 'bg-orange-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-orange-50'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Transliteration or Description Box */}
              {audioText && (
                <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider block">
                    📜 Audio Script / Shloka Verse:
                  </span>
                  <p className="text-sm font-medium text-amber-100 leading-relaxed">
                    {audioText}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span>Summary & Key Learning Objectives</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {description || notesContent || 'This chapter provides fundamental knowledge, practical step-by-step guidance, and real-world applications.'}
                </p>

                {keyPoints.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-black text-orange-700 uppercase tracking-wider block">
                      Key Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {keyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'weblink' && webUrl && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-950 space-y-2">
                <h4 className="font-black text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span>Verified Educational Portal</span>
                </h4>
                <p className="text-xs text-emerald-800">
                  Target Link: <code className="bg-white/80 px-2 py-0.5 rounded font-mono text-emerald-900">{webUrl}</code>
                </p>
                <a
                  href={webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all mt-2"
                >
                  <span>Open in Secure New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold py-2 px-3 rounded-xl transition-colors cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Resource'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {webUrl && (
              <a
                href={webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Launch Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => {
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                onClose();
              }}
              className="flex-1 sm:flex-none py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
