import React, { useState } from 'react';
import { MORAL_STORIES } from '../data/mockData';
import { StoryItem } from '../types';
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
  Lightbulb,
  ExternalLink,
  Award
} from 'lucide-react';

interface StoriesHubProps {
  onAskAISTory: () => void;
}

export const StoriesHub: React.FC<StoriesHubProps> = ({ onAskAISTory }) => {
  const [activeTab, setActiveTab] = useState<'stories' | 'kids_zone'>('stories');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeStory, setActiveStory] = useState<StoryItem | null>(null);
  const [isNarrating, setIsNarrating] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [storyUploadedSuccess, setStoryUploadedSuccess] = useState(false);

  // Kids Zone Quiz State
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const categories = ['All', 'Panchatantra', 'Moral', 'Mythological', 'Culture'];

  const pictureQuizzes = [
    {
      question: 'ఈ పక్షి పేరేమిటి? (Which bird is national bird of India?)',
      imageUrl: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=80',
      options: ['1. నెమలి (Peacock)', '2. పిచ్చుక (Sparrow)', '3. కోకిల (Cuckoo)', '4. హంస (Swan)'],
      correct: 0,
      explanation: 'నెమలి భారతదేశ జాతీయ పక్షి (Peacock is the national bird of India).'
    },
    {
      question: 'సూర్యునికి అత్యంత సమీపంలో ఉన్న గ్రహం ఏది? (Closest planet to Sun?)',
      imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=600&q=80',
      options: ['1. అంగారకుడు (Mars)', '2. బుధుడు (Mercury)', '3. శుక్రుడు (Venus)', '4. గురుడు (Jupiter)'],
      correct: 1,
      explanation: 'బుధుడు (Mercury) సూర్యునికి అత్యంత సమీపంలో ఉన్న గ్రహం.'
    },
    {
      question: 'చెట్లు గాలిలోకి విడుదల చేసే ప్రాణవాయువు ఏది? (Gas released by trees during photosynthesis?)',
      imageUrl: 'https://images.unsplash.com/photo-1511497584788-8767611136f6?auto=format&fit=crop&w=600&q=80',
      options: ['1. ఆక్సిజన్ (Oxygen)', '2. కార్బన్ డయాక్సైడ్', '3. నైట్రోజన్', '4. హైడ్రోజన్'],
      correct: 0,
      explanation: 'చెట్లు మన శ్వాస కోసం ఆక్సిజన్ (Oxygen) వాయువును అందిస్తాయి.'
    }
  ];

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
      title: '2. Plastic Bottle Pen Stand & Mini Planter',
      teluguTitle: 'ప్లాస్టిక్ బాటిల్ పెన్ స్టాండ్',
      time: '15 mins',
      difficulty: 'Medium',
      desc: 'Transform waste water bottles into beautiful desk plant pots.',
      url: 'https://www.instructables.com/craft/'
    },
    {
      title: '3. Hand-painted Festival Diya & Clay Lamp',
      teluguTitle: 'మట్టి ప్రమిదల రంగుల అలంకరణ',
      time: '20 mins',
      difficulty: 'Easy',
      desc: 'Eco-friendly clay lamps decoration for traditional celebrations.',
      url: 'https://www.youtube.com'
    }
  ];

  const filteredStories = MORAL_STORIES.filter(s => 
    selectedCategory === 'All' || s.category === selectedCategory
  );

  const handleNarrateStory = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isNarrating) {
        window.speechSynthesis.cancel();
        setIsNarrating(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.onend = () => setIsNarrating(false);
        utterance.onerror = () => setIsNarrating(false);
        setIsNarrating(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert('Audio story narration active!');
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <BookOpen className="w-4 h-4 text-amber-200" />
            <span>చిన్న కథలు • చిత్రకథలు • GK Quizzes • DIY Craft</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            📖 Stories & Kids Zone Hub
          </h2>
          <p className="text-sm text-orange-50 font-medium">
            Captivating Panchatantra moral audio stories, image picture quizzes, general knowledge puzzles, and DIY item preparation videos.
          </p>
        </div>
      </div>

      {/* Main Tab Switcher */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'stories'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Moral Audio Stories & Picture Books</span>
          </button>

          <button
            onClick={() => setActiveTab('kids_zone')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all ${
              activeTab === 'kids_zone'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Kids Zone (Quiz • GK • DIY Crafts)</span>
          </button>
        </div>

        {activeTab === 'stories' && (
          <div className="flex items-center gap-2">
            <button
              onClick={onAskAISTory}
              className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate AI Story</span>
            </button>

            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-xs"
            >
              <Upload className="w-3.5 h-3.5 text-orange-400" />
              <span>Upload My Story</span>
            </button>
          </div>
        )}
      </div>

      {/* VIEW 1: STORIES & PICTURE BOOKS */}
      {activeTab === 'stories' && (
        <div className="space-y-6">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300/30">
                      {story.category} • {story.ageGroup}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-orange-500" />
                      <span>{story.audioDuration}</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                      {story.title}
                    </h3>
                    <p className="text-xs font-bold text-orange-600">
                      {story.teluguTitle}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {story.summary}
                    </p>

                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200/60 text-xs space-y-1">
                      <span className="font-bold text-amber-900 block">💡 Moral (నీతి):</span>
                      <p className="text-amber-800 font-medium">{story.moral}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => setActiveStory(story)}
                    className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-xs"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read & Listen Full Story</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: KIDS ZONE (IMAGE QUIZZES, GK & DIY CRAFTS) */}
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
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-1.5 rounded-lg text-xs"
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

      {/* Reader Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-orange-200 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">
                  {activeStory.category} Story
                </span>
                <h3 className="font-black text-slate-900 text-xl">
                  {activeStory.title} ({activeStory.teluguTitle})
                </h3>
              </div>
              <button
                onClick={() => {
                  if (isNarrating) window.speechSynthesis.cancel();
                  setIsNarrating(false);
                  setActiveStory(null);
                }}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleNarrateStory(`${activeStory.title}. ${activeStory.content}. Moral: ${activeStory.moral}`)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all"
              >
                {isNarrating ? <VolumeX className="w-4 h-4 animate-bounce" /> : <Volume2 className="w-4 h-4" />}
                <span>{isNarrating ? 'Pause Audio Narration' : 'Listen Audio Story'}</span>
              </button>

              <div className="prose prose-slate prose-sm text-slate-800 leading-relaxed font-sans text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {activeStory.content}
              </div>

              <div className="bg-amber-100 p-4 rounded-2xl border border-amber-300 text-xs text-amber-950 font-medium space-y-1">
                <strong className="text-amber-900 text-sm block">✨ Moral Lesson:</strong>
                <p>{activeStory.moral}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Story Modal */}
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
                  <label className="text-xs font-bold text-slate-700 block mb-1">Story Title:</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. My Magical Drone Adventure"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Written Content / Moral:</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your story here..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                  🔒 Safe Gurukul Guarantee: Story will require Parent Approval before public display.
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-colors"
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
