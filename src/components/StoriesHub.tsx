import React, { useState, useEffect } from 'react';
import { MORAL_STORIES } from '../data/mockData';
import { 
  STORY_SERIES_COLLECTION, 
  CULTURE_VIDEOS_LIST, 
  FREE_BOOKS_COLLECTION, 
  DASUBHASHITHAM_SHOWCASE 
} from '../data/storyLibraryData';
import { 
  StoryItem, 
  StorySeries, 
  StoryChapter, 
  CultureVideoItem, 
  FreeBookResource, 
  DasubhashithamResource 
} from '../types';
import { 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Upload, 
  Sparkles, 
  Heart, 
  Clock, 
  Filter, 
  CheckCircle2,
  Gamepad2,
  HelpCircle,
  Scissors,
  Video,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  ExternalLink,
  Download,
  Share2,
  Headphones,
  Compass,
  Bookmark,
  Search,
  Layers,
  ChevronRight,
  ChevronLeft,
  Tv,
  Globe,
  Radio,
  FileText,
  Flame,
  Award,
  Zap,
  Info
} from 'lucide-react';

interface StoriesHubProps {
  onAskAISTory?: () => void;
}

export const StoriesHub: React.FC<StoriesHubProps> = ({ onAskAISTory }) => {
  // Main Navigation Sub-tabs
  const [activeTab, setActiveTab] = useState<
    'story-series' | 'ap-culture-videos' | 'audiobooks-player' | 'free-books-library' | 'dasubhashitham' | 'kids_zone'
  >('story-series');

  // Series & Chapter Selection State
  const [selectedSeriesCategory, setSelectedSeriesCategory] = useState<string>('all');
  const [activeSeries, setActiveSeries] = useState<StorySeries | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<StoryChapter | null>(null);
  const [languageMode, setLanguageMode] = useState<'bilingual' | 'telugu' | 'english'>('bilingual');

  // Audio Player State (Global speech synthesizer & simulated player)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [activeAudioChapterId, setActiveAudioChapterId] = useState<string | null>(null);

  // Video Player Modal State
  const [selectedVideo, setSelectedVideo] = useState<CultureVideoItem | null>(null);

  // Book Reader Modal State
  const [selectedBookForPreview, setSelectedBookForPreview] = useState<FreeBookResource | null>(null);

  // Upload Story Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [storyUploadedSuccess, setStoryUploadedSuccess] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Kids Zone Quiz State
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // Picture Quizzes Data
  const pictureQuizzes = [
    {
      question: 'ఈ పక్షి పేరేమిటి? (Which bird is national bird of India?)',
      imageUrl: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=80',
      options: ['1. నెమలి (Peacock)', '2. పిచ్చుక (Sparrow)', '3. కోకిల (Cuckoo)', '4. హంస (Swan)'],
      correct: 0,
      explanation: 'నెమలి భారతదేశ జాతీయ పక్షి (Peacock is the national bird of India).'
    },
    {
      question: 'ఆంధ్రుల ప్రాచీన తోలుబొమ్మలాట కళ ఏ జిల్లాలో ప్రసిద్ధి? (Which district is famous for Tholu Bommalata?)',
      imageUrl: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=600&q=80',
      options: ['1. అనంతపురం (నిమల్లకుంట)', '2. శ్రీకాకుళం', '3. కడప', '4. గుంటూరు'],
      correct: 0,
      explanation: 'అనంతపురం జిల్లా నిమల్లకుంట గ్రామం తోలుబొమ్మలాట తయారీ మరియు ప్రదర్శనలకు ప్రపంచ ప్రసిద్ధి.'
    },
    {
      question: 'సూర్యునికి అత్యంత సమీపంలో ఉన్న గ్రహం ఏది? (Closest planet to Sun?)',
      imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=600&q=80',
      options: ['1. అంగారకుడు (Mars)', '2. బుధుడు (Mercury)', '3. శుక్రుడు (Venus)', '4. గురుడు (Jupiter)'],
      correct: 1,
      explanation: 'బుధుడు (Mercury) సూర్యునికి అత్యంత సమీపంలో ఉన్న గ్రహం.'
    }
  ];

  // DIY Crafts
  const diyCrafts = [
    {
      title: '1. Recycled Paper Origami Bird & Aeroplane',
      teluguTitle: 'కాగితపు పక్షి మరియు విమానం తయారీ',
      time: '10 mins',
      difficulty: 'Easy',
      desc: 'Step-by-step DIY guide using old newspapers or craft sheets.',
      url: 'https://www.origami-fun.com/'
    },
    {
      title: '2. Kondapalli Style Clay & Paper Doll Model',
      teluguTitle: 'మట్టితో కొండపల్లి తరహా చిన్న బొమ్మల తయారీ',
      time: '20 mins',
      difficulty: 'Medium',
      desc: 'Create eco-friendly miniature figures using natural clay and organic colors.',
      url: 'https://www.youtube.com/results?search_query=clay+doll+making+kids+craft'
    },
    {
      title: '3. Hand-painted Festival Diya & Greeting Cards',
      teluguTitle: 'పండుగ దీపాల అలంకరణ & గ్రీటింగ్ కార్డులు',
      time: '15 mins',
      difficulty: 'Easy',
      desc: 'Eco-friendly clay lamps decoration for traditional celebrations.',
      url: 'https://www.instructables.com/craft/'
    }
  ];

  // Speech Narration Logic
  const handlePlayAudioNarration = (chapter: StoryChapter, rate: number = 1.0) => {
    if (!('speechSynthesis' in window)) {
      alert('Audio speech playback not supported in this browser.');
      return;
    }

    if (isPlayingAudio && activeAudioChapterId === chapter.id) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Decide which text to narrate based on language preference
    const textToSpeak = languageMode === 'telugu'
      ? `${chapter.teluguTitle}. ${chapter.teluguContent}. నీతి: ${chapter.moralTelugu}`
      : `${chapter.title}. ${chapter.englishContent}. Moral lesson: ${chapter.moralEnglish}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Try finding a suitable voice if available
    const voices = window.speechSynthesis.getVoices();
    if (languageMode === 'telugu') {
      const telVoice = voices.find(v => v.lang.includes('te') || v.name.toLowerCase().includes('telugu') || v.lang.includes('hi'));
      if (telVoice) utterance.voice = telVoice;
    }

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setActiveAudioChapterId(chapter.id);
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Filter Story Series
  const filteredSeries = STORY_SERIES_COLLECTION.filter(series => {
    const matchesCategory = selectedSeriesCategory === 'all' || series.category === selectedSeriesCategory;
    const matchesSearch = searchQuery === '' || 
      series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      series.teluguTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      series.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStoryUploadedSuccess(true);
    setTimeout(() => {
      setStoryUploadedSuccess(false);
      setShowUploadModal(false);
    }, 2000);
  };

  const handleAnswerQuiz = (optionIdx: number) => {
    setSelectedAnswer(optionIdx);
    if (optionIdx === pictureQuizzes[activeQuizIndex].correct) {
      setQuizScore(prev => prev + 10);
    }
  };

  // Switch to next or previous chapter
  const handleNavigateChapter = (direction: 'next' | 'prev') => {
    if (!activeSeries || !selectedChapter) return;
    const currentIndex = activeSeries.chapters.findIndex(c => c.id === selectedChapter.id);
    if (direction === 'next' && currentIndex < activeSeries.chapters.length - 1) {
      const nextCh = activeSeries.chapters[currentIndex + 1];
      setSelectedChapter(nextCh);
      if (isPlayingAudio) handlePlayAudioNarration(nextCh, playbackRate);
    } else if (direction === 'prev' && currentIndex > 0) {
      const prevCh = activeSeries.chapters[currentIndex - 1];
      setSelectedChapter(prevCh);
      if (isPlayingAudio) handlePlayAudioNarration(prevCh, playbackRate);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex flex-wrap items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>చందమామ కథలు • పాత బాలమిత్ర • ఆంధ్ర సంస్కృతి & కళలు • దాసుభాషితం ఆడియోలు</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            📖 Stories, Audiobooks & Andhra Culture Hub
          </h1>

          <p className="text-sm text-orange-50 font-medium leading-relaxed">
            Immerse in timeless Chandamama Betal riddles, vintage Balamitra morals, Panchatantra classics, Andhra Pradesh folk art videos (Kuchipudi, Tholu Bommalata, Harikatha), free e-book archives, and authentic Telugu audiobooks on <strong>Dasubhashitham</strong>.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => {
                setActiveTab('story-series');
                setSelectedSeriesCategory('chandamama');
              }}
              className="bg-white hover:bg-orange-50 text-orange-800 text-xs font-black px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>🌙 చందమామ కథలు (All Chapters)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('story-series');
                setSelectedSeriesCategory('balamitra');
              }}
              className="bg-amber-100 hover:bg-white text-amber-900 text-xs font-black px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>👦 పాత బాలమిత్ర నీతులు</span>
            </button>

            <button
              onClick={() => setActiveTab('ap-culture-videos')}
              className="bg-orange-950/40 hover:bg-orange-950/60 text-white border border-white/30 text-xs font-black px-4 py-2 rounded-xl backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Tv className="w-3.5 h-3.5 text-amber-300" />
              <span>🦚 ఆంధ్రప్రదేశ్ సంస్కృతి వీడియోలు</span>
            </button>

            <button
              onClick={() => setActiveTab('dasubhashitham')}
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer border border-emerald-300/40"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-200" />
              <span>🎙️ దాసుభాషితం (Dasubhashitham)</span>
            </button>
          </div>
        </div>

        {/* Decorative Badge */}
        <div className="hidden md:block absolute -bottom-6 -right-6 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Main Sub-Navigation Bar */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTab('story-series')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'story-series'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📚 Story Chapters & Episodes</span>
          </button>

          <button
            onClick={() => setActiveTab('ap-culture-videos')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'ap-culture-videos'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>🦚 AP Culture & Heritage Videos</span>
          </button>

          <button
            onClick={() => setActiveTab('audiobooks-player')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'audiobooks-player'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
            }`}
          >
            <Headphones className="w-4 h-4" />
            <span>🎧 Free Audiobooks Player</span>
          </button>

          <button
            onClick={() => setActiveTab('free-books-library')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'free-books-library'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>📖 Free Books & Archives</span>
          </button>

          <button
            onClick={() => setActiveTab('dasubhashitham')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'dasubhashitham'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-600" />
            <span>🎙️ Dasubhashitham (దాసుభాషితం)</span>
          </button>

          <button
            onClick={() => setActiveTab('kids_zone')}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'kids_zone'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>🧩 Kids Zone (Quiz • DIY)</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {onAskAISTory && (
            <button
              onClick={onAskAISTory}
              className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Storyteller</span>
            </button>
          )}

          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-orange-400" />
            <span>Submit Story</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: STORY SERIES WITH CHAPTERS & EPISODES (CHANDAMAMA, BALAMITRA ETC) */}
      {/* ========================================================================= */}
      {activeTab === 'story-series' && (
        <div className="space-y-6">
          {/* Category Filter Pills & Search */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter Collection:
              </span>

              {[
                { id: 'all', label: 'All Series (అన్నీ)' },
                { id: 'chandamama', label: '🌙 Chandamama (చందమామ)' },
                { id: 'balamitra', label: '👦 Old Balamitra (బాలమిత్ర)' },
                { id: 'andhra-culture', label: '🦚 Andhra Culture (సంస్కృతి)' },
                { id: 'panchatantra', label: '🦁 Panchatantra (పంచతంత్రం)' },
                { id: 'tenali-rama', label: '👑 Tenali Rama (తెనాలి రామ)' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedSeriesCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSeriesCategory === cat.id
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search stories, chapters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Series Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSeries.map((series) => (
              <div
                key={series.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Cover Image & Badges */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={series.coverImage}
                      alt={series.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-black px-3 py-1 rounded-full border border-amber-300/30">
                      {series.badge}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-black px-2.5 py-1 rounded-xl shadow-xs flex items-center gap-1 border border-slate-200">
                      <Layers className="w-3.5 h-3.5 text-orange-600" />
                      <span>{series.chapters.length} Chapters</span>
                    </div>
                  </div>

                  {/* Series Info */}
                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">
                        {series.authorOrSource}
                      </span>
                      <h3 className="font-black text-slate-900 text-lg leading-snug">
                        {series.title}
                      </h3>
                      <p className="text-xs font-bold text-amber-700 mt-0.5">
                        {series.teluguTitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {series.description}
                    </p>

                    {/* Quick Chapter Preview List */}
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5">
                      <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                        <span>Chapters & Episodes</span>
                        <span className="text-orange-600">{series.chapters.length} Available</span>
                      </div>
                      <div className="space-y-1">
                        {series.chapters.slice(0, 3).map((ch, idx) => (
                          <div 
                            key={ch.id} 
                            onClick={() => {
                              setActiveSeries(series);
                              setSelectedChapter(ch);
                            }}
                            className="text-xs font-bold text-slate-800 hover:text-orange-600 flex items-center justify-between cursor-pointer p-1 rounded hover:bg-white transition-colors"
                          >
                            <span className="truncate pr-2">
                              {idx + 1}. {ch.title}
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">{ch.duration}</span>
                          </div>
                        ))}
                        {series.chapters.length > 3 && (
                          <div className="text-[10px] font-extrabold text-orange-600 text-center pt-0.5">
                            +{series.chapters.length - 3} More Chapters
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setActiveSeries(series);
                      setSelectedChapter(series.chapters[0]);
                    }}
                    className="flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-black py-2.5 px-3 rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Chapters</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('audiobooks-player');
                      setActiveSeries(series);
                      setSelectedChapter(series.chapters[0]);
                      handlePlayAudioNarration(series.chapters[0]);
                    }}
                    className="flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-black py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    <Headphones className="w-3.5 h-3.5 text-amber-600" />
                    <span>Play Audio 🎧</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: ANDHRA PRADESH CULTURE & HERITAGE VIDEOS */}
      {/* ========================================================================= */}
      {activeTab === 'ap-culture-videos' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-amber-400/30">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-white/20 px-2.5 py-0.5 rounded-full text-white uppercase tracking-wider">
                  Heritage & Performing Arts
                </span>
                <span className="text-xs font-bold text-amber-200">6 Cultural Masterpieces</span>
              </div>
              <h3 className="text-xl font-black text-white">
                🦚 Andhra Pradesh Classical, Folk & Architectural Video Guides
              </h3>
              <p className="text-xs text-orange-100 font-medium max-w-2xl">
                Explore the divine classical dance of Kuchipudi, Rayalaseema’s ancient Tholu Bommalata shadow puppetry, Burrakatha patriotic ballads, Kondapalli wooden toys, and Lepakshi temple mysteries.
              </p>
            </div>

            <a
              href="https://www.youtube.com/results?search_query=andhra+pradesh+culture+heritage+kuchipudi+tholu+bommalata"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-orange-50 text-orange-800 text-xs font-black px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Tv className="w-4 h-4 text-orange-600" />
              <span>Explore YouTube Channel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CULTURE_VIDEOS_LIST.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Video Thumbnail */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-center justify-center">
                      <button
                        onClick={() => setSelectedVideo(video)}
                        className="w-12 h-12 rounded-full bg-orange-600/90 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 cursor-pointer"
                      >
                        <Play className="w-5 h-5 ml-0.5 fill-white" />
                      </button>
                    </div>

                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300/30">
                      {video.category}
                    </div>

                    <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-orange-400" />
                      <span>{video.duration}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider block">
                        📍 {video.districtOrRegion}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                        {video.title}
                      </h4>
                      <p className="text-xs font-bold text-amber-700 mt-0.5">
                        {video.teluguTitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {video.description}
                    </p>

                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/60 text-xs space-y-1">
                      <span className="font-extrabold text-amber-900 block flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>Cultural Significance:</span>
                      </span>
                      <p className="text-amber-800 font-medium text-[11px] leading-relaxed">
                        {video.culturalSignificance}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedVideo(video)}
                    className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black py-2.5 px-4 rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Watch Culture Video</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: FREE AUDIOBOOKS & CHAPTER PLAYER ENGINE */}
      {/* ========================================================================= */}
      {activeTab === 'audiobooks-player' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Interactive Chapter Player Console */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-xl">
                  🎧
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">
                    Free Audiobooks & Chapter Narrator
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Listen to complete chapter-by-chapter audiobooks with bilingual narration and speed control.
                  </p>
                </div>
              </div>

              {/* Language Switcher for Audio */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {(['bilingual', 'telugu', 'english'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguageMode(lang)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                      languageMode === lang ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lang === 'bilingual' ? 'Dual (ద్విభాష)' : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Currently Playing Card */}
            {selectedChapter ? (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 p-5 rounded-2xl border border-amber-200/80 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-orange-600 uppercase tracking-wider bg-orange-100/80 px-2 py-0.5 rounded-full">
                      Chapter {selectedChapter.chapterNumber} • {activeSeries?.title || 'Story Audio'}
                    </span>
                    <h4 className="font-black text-slate-900 text-base sm:text-lg">
                      {selectedChapter.title}
                    </h4>
                    <p className="text-xs font-bold text-amber-800">
                      {selectedChapter.teluguTitle}
                    </p>
                  </div>

                  <span className="text-xs font-extrabold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    ⏱️ {selectedChapter.duration}
                  </span>
                </div>

                {/* Player Controls */}
                <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleNavigateChapter('prev')}
                        className="p-2 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                        title="Previous Chapter"
                      >
                        <SkipBack className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handlePlayAudioNarration(selectedChapter, playbackRate)}
                        className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-black rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                      >
                        {isPlayingAudio && activeAudioChapterId === selectedChapter.id ? (
                          <>
                            <Pause className="w-4 h-4 fill-white" />
                            <span>Pause Narration</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 fill-white" />
                            <span>Play Chapter Audio</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleNavigateChapter('next')}
                        className="p-2 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                        title="Next Chapter"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Speed Controls */}
                    <div className="flex items-center gap-1 text-xs">
                      <span className="text-slate-400 font-bold text-[10px] mr-1">Speed:</span>
                      {[0.8, 1.0, 1.25].map(rate => (
                        <button
                          key={rate}
                          onClick={() => {
                            setPlaybackRate(rate);
                            if (isPlayingAudio) handlePlayAudioNarration(selectedChapter, rate);
                          }}
                          className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer ${
                            playbackRate === rate ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Audio Status Wave */}
                  {isPlayingAudio && (
                    <div className="flex items-center gap-2 text-xs font-bold text-orange-600 animate-pulse bg-orange-50 p-2 rounded-lg">
                      <Volume2 className="w-4 h-4" />
                      <span>Speaking now ({languageMode.toUpperCase()})... Listen attentively.</span>
                    </div>
                  )}
                </div>

                {/* Read Along Text preview */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700 max-h-48 overflow-y-auto leading-relaxed">
                  <div className="font-black text-slate-900 text-xs flex items-center justify-between border-b pb-1">
                    <span>📖 Read-Along Narration Text</span>
                    <span className="text-[10px] text-orange-600 font-bold">{languageMode.toUpperCase()}</span>
                  </div>
                  <p className="font-serif">
                    {languageMode === 'telugu' ? selectedChapter.teluguContent : selectedChapter.englishContent}
                  </p>
                </div>

                {/* Moral Box */}
                <div className="bg-amber-100/70 p-3.5 rounded-xl border border-amber-300 text-xs text-amber-950 font-medium space-y-1">
                  <strong className="text-amber-900 block font-black">💡 Moral of this Chapter:</strong>
                  <p>{languageMode === 'telugu' ? selectedChapter.moralTelugu : selectedChapter.moralEnglish}</p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <Headphones className="w-10 h-10 text-slate-400 mx-auto" />
                <h4 className="font-bold text-slate-800 text-sm">Select any series or chapter to begin listening</h4>
                <p className="text-xs text-slate-500">Pick from Chandamama Betal, Balamitra morals, or Panchatantra stories from the playlist on the right.</p>
              </div>
            )}
          </div>

          {/* Right Column: Audio Series & Chapter Playlist */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-600" />
                  <span>Audiobook Series Playlist</span>
                </h3>
                <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                  All Free
                </span>
              </div>

              <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                {STORY_SERIES_COLLECTION.map((series) => (
                  <div 
                    key={series.id}
                    className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-slate-900 text-xs truncate max-w-[180px]">
                        {series.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-500">
                        {series.chapters.length} Chs
                      </span>
                    </div>

                    {/* Chapters List */}
                    <div className="space-y-1 pl-1">
                      {series.chapters.map((ch) => {
                        const isCurrent = selectedChapter?.id === ch.id;
                        return (
                          <button
                            key={ch.id}
                            onClick={() => {
                              setActiveSeries(series);
                              setSelectedChapter(ch);
                              handlePlayAudioNarration(ch, playbackRate);
                            }}
                            className={`w-full text-left p-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                              isCurrent
                                ? 'bg-orange-600 text-white shadow-xs'
                                : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200/80'
                            }`}
                          >
                            <span className="truncate pr-2">
                              {ch.chapterNumber}. {ch.title}
                            </span>
                            <span className={`text-[10px] shrink-0 ${isCurrent ? 'text-white' : 'text-slate-400'}`}>
                              {ch.duration}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: FREE BOOKS & DIGITAL ARCHIVES (CHANDAMAMA 1947-2008, NBT, BALAMITRA) */}
      {/* ========================================================================= */}
      {activeTab === 'free-books-library' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-sm border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Public Domain Archives
                </span>
                <span className="text-xs text-slate-300 font-bold">100% Free Public Access</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                📖 Free Children's Books, Chandamama Archives & NBT E-Books
              </h3>
              <p className="text-xs text-slate-300 font-medium max-w-2xl">
                Browse historic digitized editions of Chandamama (1947 to 2008 archives), vintage Balamitra storybooks, National Book Trust (NBT) moral readers, and illustrated Telugu children's literature.
              </p>
            </div>

            <a
              href="https://archive.org/details/chandamama-telugu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-3 rounded-2xl shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Explore Archive.org Collection</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FREE_BOOKS_COLLECTION.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300/30">
                      {book.category}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/90 text-slate-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <FileText className="w-3 h-3 text-orange-500" />
                      <span>{book.language}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block">
                        Author / Publisher: {book.author}
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base leading-snug">
                        {book.title}
                      </h4>
                      <p className="text-xs font-bold text-orange-600 mt-0.5">
                        {book.teluguTitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {book.description}
                    </p>

                    {book.sampleChaptersPreview && (
                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                        <span className="font-bold text-slate-700 block">📚 Highlight Chapters:</span>
                        {book.sampleChaptersPreview.map((sc, i) => (
                          <div key={i} className="text-[11px] text-slate-600 font-medium truncate">
                            • {sc.chapterTitle}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <a
                    href={book.readOnlineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-black py-2.5 px-3 rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Free 🌐</span>
                  </a>

                  {book.downloadPdfUrl ? (
                    <a
                      href={book.downloadPdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-black py-2.5 px-3 rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-amber-300" />
                      <span>Archive Link</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => setSelectedBookForPreview(book)}
                      className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      <span>Preview</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 5: DASUBHASHITHAM (దాసుభాషితం) TELUGU AUDIOBOOKS & WEBLINK */}
      {/* ========================================================================= */}
      {activeTab === 'dasubhashitham' && (
        <div className="space-y-6">
          {/* Dasubhashitham Hero Spotlight Card */}
          <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-emerald-500/40 relative overflow-hidden">
            <div className="relative z-10 space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-200 border border-emerald-400/40 px-3.5 py-1 rounded-full text-xs font-black">
                <Radio className="w-3.5 h-3.5 text-emerald-300" />
                <span>ప్రముఖ తెలుగు ఆడియో పుస్తకాల వేదిక • Official Partner Showcase</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                🎙️ {DASUBHASHITHAM_SHOWCASE.platformName}
              </h2>

              <p className="text-sm text-emerald-100 font-medium leading-relaxed">
                {DASUBHASHITHAM_SHOWCASE.teluguDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={DASUBHASHITHAM_SHOWCASE.officialWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-emerald-50 text-emerald-900 font-black text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Globe className="w-4 h-4 text-emerald-700" />
                  <span>Open Dasubhashitham Official Website ➔</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                </a>

                <a
                  href={DASUBHASHITHAM_SHOWCASE.androidPlayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-950/70 hover:bg-emerald-950 text-white border border-emerald-400/40 font-bold text-xs px-4 py-3 rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Google Play App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={DASUBHASHITHAM_SHOWCASE.appleAppStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-950/70 hover:bg-emerald-950 text-white border border-emerald-400/40 font-bold text-xs px-4 py-3 rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Apple App Store</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
              <Radio className="w-64 h-64 text-white" />
            </div>
          </div>

          {/* Featured Audiobooks on Dasubhashitham */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                <Headphones className="w-5 h-5 text-emerald-600" />
                <span>Featured Telugu Audio Collections on Dasubhashitham</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Direct Web Links
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DASUBHASHITHAM_SHOWCASE.featuredAudios.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h4 className="font-black text-slate-900 text-base mt-1.5">
                          {item.title}
                        </h4>
                        <p className="text-xs font-bold text-emerald-800">
                          {item.teluguTitle}
                        </p>
                      </div>

                      <span className="text-[11px] font-extrabold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl shrink-0">
                        {item.durationOrEpisodes}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200 text-xs text-emerald-950 font-medium space-y-1">
                      <strong className="text-emerald-900 block">🎯 Recommended Audience:</strong>
                      <p>{item.recommendedFor}</p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={item.directWebUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Listen on Dasubhashitham ➔</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 6: KIDS ZONE (IMAGE QUIZZES, GK & DIY CRAFTS) */}
      {/* ========================================================================= */}
      {activeTab === 'kids_zone' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Interactive Picture Quiz */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-orange-500" />
                <h3 className="font-black text-slate-900 text-lg">
                  చిత్రకథ క్విజ్ & GK (Picture Quiz)
                </h3>
              </div>
              <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-3 py-1 rounded-full">
                Score: {quizScore} pts
              </span>
            </div>

            {/* Quiz Question Card */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="h-48 rounded-xl overflow-hidden bg-slate-200 relative">
                <img
                  src={pictureQuizzes[activeQuizIndex].imageUrl}
                  alt="Quiz visual"
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="font-extrabold text-slate-900 text-base">
                {pictureQuizzes[activeQuizIndex].question}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pictureQuizzes[activeQuizIndex].options.map((opt, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === pictureQuizzes[activeQuizIndex].correct;
                  let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-orange-50';

                  if (selectedAnswer !== null) {
                    if (isCorrect) btnStyle = 'bg-green-500 text-white border-green-600 font-bold';
                    else if (isSelected) btnStyle = 'bg-red-500 text-white border-red-600';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswerQuiz(idx)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer !== null && (
                <div className="bg-amber-100 p-3 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-2">
                  <p className="font-bold">
                    💡 వివరాలు: {pictureQuizzes[activeQuizIndex].explanation}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedAnswer(null);
                      setActiveQuizIndex((prev) => (prev + 1) % pictureQuizzes.length);
                    }}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-1.5 rounded-lg text-xs cursor-pointer"
                  >
                    Next Question ➔
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: DIY Crafts & Life Arts */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 space-y-4 shadow-xs">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b pb-2">
                <Scissors className="w-4 h-4 text-orange-500" />
                <span>DIY Small Items & Craft Videos (హస్తకళలు)</span>
              </h3>

              <div className="space-y-3">
                {diyCrafts.map((craft, idx) => (
                  <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-orange-100 text-orange-900 font-bold px-2 py-0.5 rounded-full">
                        {craft.difficulty}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">⏱️ {craft.time}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs">{craft.title}</h4>
                    <p className="text-xs text-orange-600 font-bold">{craft.teluguTitle}</p>
                    <p className="text-[11px] text-slate-600">{craft.desc}</p>

                    <a
                      href={craft.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:underline pt-1"
                    >
                      <span>Watch DIY Video Guide</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHAPTER & STORY READER MODAL */}
      {/* ========================================================================= */}
      {activeSeries && selectedChapter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-orange-200 space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider block">
                  {activeSeries.badge} • Chapter {selectedChapter.chapterNumber} of {activeSeries.chapters.length}
                </span>
                <h3 className="font-black text-slate-900 text-xl">
                  {selectedChapter.title}
                </h3>
                <p className="text-sm font-bold text-amber-700 mt-0.5">
                  {selectedChapter.teluguTitle}
                </p>
              </div>

              <button
                onClick={() => {
                  handleStopAudio();
                  setActiveSeries(null);
                  setSelectedChapter(null);
                }}
                className="text-slate-400 hover:text-slate-600 font-black p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Language Toggle & Audio Bar */}
            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-900">Language:</span>
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-amber-200">
                  <button
                    onClick={() => setLanguageMode('bilingual')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      languageMode === 'bilingual' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-700'
                    }`}
                  >
                    Bilingual (ద్విభాష)
                  </button>
                  <button
                    onClick={() => setLanguageMode('telugu')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      languageMode === 'telugu' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-700'
                    }`}
                  >
                    తెలుగు
                  </button>
                  <button
                    onClick={() => setLanguageMode('english')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      languageMode === 'english' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-700'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Play Audio Narration Button */}
              <button
                onClick={() => handlePlayAudioNarration(selectedChapter, playbackRate)}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black px-4 py-2 rounded-xl text-xs shadow-xs transition-all cursor-pointer"
              >
                {isPlayingAudio && activeAudioChapterId === selectedChapter.id ? (
                  <>
                    <VolumeX className="w-4 h-4 animate-pulse" />
                    <span>Pause Audio Narration</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    <span>Listen Chapter Audio 🎧</span>
                  </>
                )}
              </button>
            </div>

            {/* Main Content Body */}
            <div className="space-y-4">
              {/* Telugu Content */}
              {(languageMode === 'bilingual' || languageMode === 'telugu') && (
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-xs font-black text-amber-800 flex items-center justify-between border-b pb-1">
                    <span>📖 తెలుగు కథా విభాగం (Telugu Text)</span>
                  </div>
                  <p className="text-sm font-serif text-slate-800 leading-relaxed whitespace-pre-line">
                    {selectedChapter.teluguContent}
                  </p>
                </div>
              )}

              {/* English Content */}
              {(languageMode === 'bilingual' || languageMode === 'english') && (
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-xs font-black text-slate-800 flex items-center justify-between border-b pb-1">
                    <span>📖 English Narrative Text</span>
                  </div>
                  <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                    {selectedChapter.englishContent}
                  </p>
                </div>
              )}

              {/* Moral Box */}
              <div className="bg-amber-100 p-4 rounded-2xl border border-amber-300 text-xs text-amber-950 space-y-1.5">
                <strong className="text-amber-900 text-sm block font-black">✨ Moral Lesson (కథ నీతి):</strong>
                <p className="font-bold">{selectedChapter.moralTelugu}</p>
                <p className="text-slate-700">{selectedChapter.moralEnglish}</p>
              </div>
            </div>

            {/* Chapter Navigation Footer */}
            <div className="flex items-center justify-between border-t pt-4">
              <button
                onClick={() => handleNavigateChapter('prev')}
                disabled={activeSeries.chapters.findIndex(c => c.id === selectedChapter.id) === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Chapter</span>
              </button>

              <span className="text-xs font-bold text-slate-500">
                Chapter {selectedChapter.chapterNumber} of {activeSeries.chapters.length}
              </span>

              <button
                onClick={() => handleNavigateChapter('next')}
                disabled={activeSeries.chapters.findIndex(c => c.id === selectedChapter.id) === activeSeries.chapters.length - 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CULTURE VIDEO MODAL */}
      {/* ========================================================================= */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-orange-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider block">
                  {selectedVideo.category} • 📍 {selectedVideo.districtOrRegion}
                </span>
                <h3 className="font-black text-slate-900 text-lg sm:text-xl">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs font-bold text-amber-700 mt-0.5">
                  {selectedVideo.teluguTitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedVideo(null)}
                className="text-slate-400 hover:text-slate-600 font-black p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Video Player Embed / Watch Link */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center shadow-inner">
              <img
                src={selectedVideo.thumbnailUrl}
                alt={selectedVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <a
                  href={selectedVideo.youtubeIdOrEmbed}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 cursor-pointer"
                >
                  <Play className="w-7 h-7 ml-1 fill-white" />
                </a>
                <span className="text-xs font-black text-white bg-slate-900/90 px-3 py-1 rounded-full border border-white/20">
                  Click to Watch High-Definition Video on YouTube
                </span>
              </div>
            </div>

            {/* Video Descriptions */}
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <p className="font-medium">{selectedVideo.description}</p>
              <p className="font-serif text-amber-900 font-bold bg-amber-50 p-3 rounded-xl border border-amber-200">
                {selectedVideo.teluguDescription}
              </p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-bold">🏛️ Cultural & Historical Value:</strong>
                <p>{selectedVideo.culturalSignificance}</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedVideo(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Close Video Player
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* UPLOAD STORY MODAL */}
      {/* ========================================================================= */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-200 space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Upload className="w-5 h-5 text-orange-500" />
                <span>Upload Your Story (పిల్లల కథలు)</span>
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            {storyUploadedSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
                <h4 className="font-bold text-base">Story Submitted Successfully!</h4>
                <p className="text-xs">Your story will appear in the Student Showcase after parent approval.</p>
              </div>
            ) : (
              <form onSubmit={handleStorySubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Story Title (శీర్షిక):</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. My Magical Drone Adventure / నా చిన్న సాహసం"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Written Content / Moral (కథ & నీతి):</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your story in Telugu or English here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                  🔒 Safe Gurukul Guarantee: Story will require Parent Approval before public display.
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors cursor-pointer"
                >
                  Submit Story for Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
