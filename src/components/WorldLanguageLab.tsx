import React, { useState } from 'react';
import { 
  Globe, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Languages, 
  CheckCircle2, 
  RotateCcw, 
  Award, 
  MessageSquare, 
  Search,
  Zap,
  ArrowRight,
  Headphones,
  FileText,
  Play,
  ExternalLink,
  HelpCircle,
  Video,
  Layers,
  Bot,
  Gamepad2,
  Check,
  Calculator
} from 'lucide-react';
import { WORLD_LANGUAGES_DATA, WorldLanguageResource } from '../data/worldLanguagesData';
import { MediaLinkModal } from './MediaLinkModal';

export const WorldLanguageLab: React.FC = () => {
  const [selectedLangCode, setSelectedLangCode] = useState<string>('te');
  const [activeTab, setActiveTab] = useState<'alphabets' | 'vocab' | 'grammar' | 'exercises' | 'weblinks' | 'videos' | 'books'>('alphabets');
  const [searchWord, setSearchWord] = useState('');
  
  // Exercise state
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, number>>({});
  const [exerciseFeedback, setExerciseFeedback] = useState<Record<string, boolean>>({});

  // Media Modal state
  const [activeMedia, setActiveMedia] = useState<{
    isOpen: boolean;
    title: string;
    teluguTitle?: string;
    category?: string;
    videoUrl?: string;
    webUrl?: string;
    description?: string;
    keyPoints?: string[];
  }>({
    isOpen: false,
    title: ''
  });

  const currentLang = WORLD_LANGUAGES_DATA.find(l => l.code === selectedLangCode) || WORLD_LANGUAGES_DATA[0];

  const playSpeech = (text: string, langCode: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleExerciseSelect = (qIdx: number, optIdx: number) => {
    const key = `${selectedLangCode}-${qIdx}`;
    setExerciseAnswers(prev => ({ ...prev, [key]: optIdx }));
    setExerciseFeedback(prev => ({ ...prev, [key]: true }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 rounded-3xl p-6 sm:p-8 text-white shadow-indigo-glow relative overflow-hidden border border-indigo-400/40">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <Globe className="w-4 h-4 text-amber-200" />
            <span>Polyglot Language Academy • Telugu, Hindi, US English, Japanese & German</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            🌍 World Language Practice & Cultural Academy
          </h2>
          <p className="text-sm text-indigo-100 font-medium leading-relaxed">
            Master native scripts, conversational phrases, grammar rules, verified web links, video tutorials, e-books, and audio pronunciation across <strong>Telugu, Hindi, US English, Japanese (Japan), and German (Germany)</strong>.
          </p>
        </div>
        <div className="absolute right-4 bottom-0 opacity-15 pointer-events-none hidden md:block">
          <Languages className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Language Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {WORLD_LANGUAGES_DATA.map((lang) => {
          const isSelected = selectedLangCode === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => {
                setSelectedLangCode(lang.code);
                setSearchWord('');
              }}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md scale-102'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <span className="text-xl">{lang.flag}</span>
              <div className="text-left">
                <div className="leading-none">{lang.name}</div>
                <div className={`text-[10px] font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-400'} mt-0.5`}>
                  {lang.nativeName.split(' ')[0]}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Language Hero Details */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-3xl p-6 text-white border border-indigo-900 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentLang.flag}</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">{currentLang.name} ({currentLang.nativeName})</h3>
            </div>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium">{currentLang.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => playSpeech(`Welcome to ${currentLang.name} language learning room in Super Parent Studio!`, currentLang.speechLangCode)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black py-2.5 px-4 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4" />
              <span>Native Audio Test</span>
            </button>
          </div>
        </div>

        {/* Inner Section Navigation */}
        <div className="pt-3 border-t border-white/15 flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('alphabets')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'alphabets'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <span>🔤 Alphabets & Script</span>
          </button>

          <button
            onClick={() => setActiveTab('vocab')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'vocab'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <span>🗣️ Vocabulary & Phrases</span>
          </button>

          <button
            onClick={() => setActiveTab('grammar')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'grammar'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <span>📖 Grammar Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'exercises'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <span>✍️ Practice Exercises ({currentLang.practiceExercises.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('weblinks')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'weblinks'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <span>🌐 Web Portals ({currentLang.webLinks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <span>🎬 Video Lessons ({currentLang.videoLinks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('books')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'books'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'bg-white/10 text-slate-200 hover:bg-white/20'
            }`}
          >
            <span>📚 E-Books ({currentLang.books.length})</span>
          </button>
        </div>
      </div>

      {/* CONTENT TAB 1: ALPHABETS & SCRIPT */}
      {activeTab === 'alphabets' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 flex-wrap gap-2">
              <div>
                <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-indigo-600" />
                  <span>{currentLang.alphabetInfo.title}</span>
                </h4>
                <p className="text-xs text-slate-500 font-medium">{currentLang.alphabetInfo.vowelsConsonants}</p>
              </div>
              <span className="text-xs font-bold text-slate-500">Click any letter to hear audio</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {currentLang.alphabetInfo.sampleLetters.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => playSpeech(`${item.char}. ${item.meaning || ''}`, currentLang.speechLangCode)}
                  className="bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all cursor-pointer text-center group"
                >
                  <span className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.char}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{item.phonetic}</span>
                  {item.meaning && (
                    <span className="text-[10px] font-medium text-indigo-700 truncate w-full">{item.meaning}</span>
                  )}
                  <Volume2 className="w-3.5 h-3.5 text-indigo-400 group-hover:text-indigo-600 mt-1" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENT TAB 2: VOCABULARY & DAILY PHRASES */}
      {activeTab === 'vocab' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h4 className="text-base font-black text-slate-900">Essential Vocabulary & Daily Phrases</h4>
                <p className="text-xs text-slate-500 font-medium">Multilingual breakdown with Telugu, Hindi, and English equivalents</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search vocabulary..."
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLang.vocabCategories.flatMap(cat => cat.words)
                .filter(w => !searchWord || w.native.toLowerCase().includes(searchWord.toLowerCase()) || w.english.toLowerCase().includes(searchWord.toLowerCase()) || w.telugu.includes(searchWord))
                .map((word, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-start justify-between gap-3 hover:border-indigo-300 transition-all"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-slate-900">{word.native}</span>
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                          /{word.phonetic}/
                        </span>
                      </div>

                      <p className="text-xs font-black text-slate-800">{word.english}</p>
                      <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                        <span>🇮🇳 Telugu: <strong className="text-slate-700">{word.telugu}</strong></span>
                        <span>🇮🇳 Hindi: <strong className="text-slate-700">{word.hindi}</strong></span>
                      </div>
                      <p className="text-[11px] text-indigo-900 bg-indigo-50/50 p-2 rounded-lg font-medium mt-1">
                        💡 {word.example}
                      </p>
                    </div>

                    <button
                      onClick={() => playSpeech(`${word.native}. ${word.example}`, currentLang.speechLangCode)}
                      className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer shrink-0 shadow-2xs"
                      title="Speak Native Audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENT TAB 3: GRAMMAR RULES */}
      {activeTab === 'grammar' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentLang.grammarRules.map((rule, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black flex items-center justify-center">
                  {idx + 1}
                </span>
                <h4 className="font-black text-slate-900 text-base">{rule.title}</h4>
              </div>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">{rule.explanation}</p>
              
              <div className="bg-indigo-50 rounded-2xl p-3 border border-indigo-100 space-y-1">
                <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider">Example Usage:</span>
                <p className="text-xs font-mono font-bold text-indigo-950">{rule.example}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CONTENT TAB 4: PRACTICE EXERCISES */}
      {activeTab === 'exercises' && (
        <div className="space-y-4">
          {currentLang.practiceExercises.map((ex, qIdx) => {
            const key = `${selectedLangCode}-${qIdx}`;
            const selectedOpt = exerciseAnswers[key];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === ex.correctAnswer;

            return (
              <div key={qIdx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h5 className="font-black text-base text-slate-900 leading-snug">
                      Q{qIdx + 1}. {ex.question}
                    </h5>
                    <p className="text-xs font-bold text-indigo-800">{ex.teluguPrompt}</p>
                  </div>
                  <button
                    onClick={() => playSpeech(ex.question, currentLang.speechLangCode)}
                    className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ex.options.map((opt, optIdx) => {
                    const isThisSelected = selectedOpt === optIdx;
                    const isThisCorrect = optIdx === ex.correctAnswer;

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleExerciseSelect(qIdx, optIdx)}
                        className={`text-left p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          isAnswered
                            ? isThisCorrect
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                              : isThisSelected
                                ? 'bg-red-600 text-white border-red-600'
                                : 'bg-white border-slate-200 text-slate-400 opacity-60'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50 hover:border-indigo-300'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}. {opt}
                      </button>
                    );
                  })}
                </div>

                {exerciseFeedback[key] && (
                  <div className={`p-3.5 rounded-xl border text-xs font-medium space-y-1 ${
                    isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    <div className="flex items-center gap-1.5 font-black">
                      {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <HelpCircle className="w-4 h-4 text-amber-600" />}
                      <span>{isCorrect ? 'Splendid! Correct Answer (+50 Points)' : 'Learning Note:'}</span>
                    </div>
                    <p>{ex.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* CONTENT TAB 5: WEB PORTALS */}
      {activeTab === 'weblinks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentLang.webLinks.map((link, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-200">
                    {link.badge}
                  </span>
                  <Globe className="w-4 h-4 text-indigo-600" />
                </div>
                <h5 className="font-black text-slate-900 text-base">{link.title}</h5>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{link.description}</p>
              </div>

              <button
                onClick={() => setActiveMedia({
                  isOpen: true,
                  title: link.title,
                  category: `${currentLang.name} Web Learning Resource`,
                  webUrl: link.url,
                  description: link.description,
                  keyPoints: [
                    'Interactive language exercises and pronunciation',
                    'Direct access to official certified learning guides',
                    'Curated for young learners and advanced students'
                  ]
                })}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <span>Launch {link.title.split(' ')[0]} Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CONTENT TAB 6: VIDEO LESSONS */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentLang.videoLinks.map((vid, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-red-50 text-red-700 px-2 py-0.5 rounded-md border border-red-200">
                    ⏱️ {vid.duration}
                  </span>
                  <span className="text-xs font-bold text-slate-500">{vid.channel}</span>
                </div>
                <h5 className="font-black text-slate-900 text-base leading-snug">{vid.title}</h5>
              </div>

              <button
                onClick={() => setActiveMedia({
                  isOpen: true,
                  title: vid.title,
                  category: `${vid.channel} • Video Masterclass`,
                  videoUrl: vid.url,
                  description: `Comprehensive video tutorial for learning ${currentLang.name} spoken expressions and grammar.`,
                  keyPoints: currentLang.grammarRules.map(r => r.title)
                })}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Watch Native Video Lecture</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* CONTENT TAB 7: E-BOOKS */}
      {activeTab === 'books' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentLang.books.map((book, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                    {book.type}
                  </span>
                  <FileText className="w-4 h-4 text-emerald-600" />
                </div>
                <h5 className="font-black text-slate-900 text-base">{book.title}</h5>
                <p className="text-xs text-slate-500 font-bold">Publisher: {book.author}</p>
              </div>

              <button
                onClick={() => setActiveMedia({
                  isOpen: true,
                  title: book.title,
                  category: `${book.type} Digital E-Book`,
                  webUrl: book.previewUrl,
                  description: `Free digital language reader and practice textbook for ${book.title}.`,
                  keyPoints: [
                    'Graded readers from beginner to intermediate',
                    'Interactive storyboards and dialogues',
                    'Free download and online study access'
                  ]
                })}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read E-Book Online</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Media Link Modal */}
      <MediaLinkModal
        isOpen={activeMedia.isOpen}
        onClose={() => setActiveMedia(prev => ({ ...prev, isOpen: false }))}
        title={activeMedia.title}
        teluguTitle={activeMedia.teluguTitle}
        category={activeMedia.category}
        videoUrl={activeMedia.videoUrl}
        webUrl={activeMedia.webUrl}
        description={activeMedia.description}
        keyPoints={activeMedia.keyPoints}
      />
    </div>
  );
};
