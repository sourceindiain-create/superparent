import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Flame, 
  Award, 
  CheckCircle2, 
  Calendar, 
  BookOpen, 
  BrainCircuit, 
  Bot, 
  Volume2, 
  VolumeX, 
  Send, 
  Plus, 
  Filter, 
  Share2, 
  Trash2, 
  Download, 
  Smile, 
  Zap, 
  Lightbulb, 
  Clock, 
  GraduationCap, 
  HeartHandshake, 
  Compass, 
  Tag, 
  Check 
} from 'lucide-react';
import { DailyReflection, ReflectionCategory, ReflectionMood } from '../types';

interface DailyReflectionZoneProps {
  studentName?: string;
  currentXP?: number;
  streakDays?: number;
  onEarnXP?: (points: number, reason: string) => void;
  onAskAI?: (prompt: string) => void;
}

const CATEGORY_OPTIONS: { id: ReflectionCategory; label: string; teluguLabel: string; icon: string; color: string; bg: string; border: string }[] = [
  { id: 'Science & Nature', label: 'Science & Nature', teluguLabel: 'సైన్స్ & ప్రకృతి', icon: '🧬', color: 'text-cyan-700', bg: 'bg-cyan-50', border: 'border-cyan-200' },
  { id: 'Mathematics & Logic', label: 'Math & Logic', teluguLabel: 'గణితం & లాజిక్', icon: '📐', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  { id: 'Coding, AI & Robotics', label: 'Coding, AI & Robotics', teluguLabel: 'కోడింగ్ & ఏఐ', icon: '💻', color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' },
  { id: 'Values & Sanskar', label: 'Values & Sanskar', teluguLabel: 'సంస్కారం & విలువల కథలు', icon: '🕉️', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  { id: 'Language & Arts', label: 'Language & Arts', teluguLabel: 'భాష & కళలు', icon: '🎨', color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' },
  { id: 'Life Skills & Health', label: 'Life Skills & Health', teluguLabel: 'ఆరోగ్యం & జీవన నైపుణ్యాలు', icon: '🏃', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { id: 'General Wisdom', label: 'General Wisdom', teluguLabel: 'సాధారణ విజ్ఞానం', icon: '💡', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' },
];

const MOOD_OPTIONS: ReflectionMood[] = [
  '🚀 Excited',
  '💡 Inspired',
  '🧠 Curious',
  '🌟 Proud',
  '🧘 Peaceful'
];

const PROMPT_STARTERS = [
  { text: "Today I learned why the sky is blue due to Rayleigh scattering of sunlight in the atmosphere.", category: 'Science & Nature' as ReflectionCategory },
  { text: "Today I understood how to solve quadratic equations by completing the square.", category: 'Mathematics & Logic' as ReflectionCategory },
  { text: "Today I discovered how AI models use tokenization to process sentences and predict next words.", category: 'Coding, AI & Robotics' as ReflectionCategory },
  { text: "Today I memorized Bhagavad Gita Chapter 2 Sloka 47 about performing duty without attachment to fruit.", category: 'Values & Sanskar' as ReflectionCategory },
  { text: "Today I practiced writing 5 new Telugu vocabulary words and their sentence meanings.", category: 'Language & Arts' as ReflectionCategory },
  { text: "Today I learned the 20-20-20 rule for eye health during computer and book study sessions.", category: 'Life Skills & Health' as ReflectionCategory },
];

const INITIAL_SAMPLE_REFLECTIONS: DailyReflection[] = [
  {
    id: 'refl-1',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    timestamp: 'Yesterday at 7:30 PM',
    learnedText: 'Learned about Newton\'s 3rd Law of Motion: Every action has an equal and opposite reaction, and tested it in the PhET Projectile Simulator!',
    subjectCategory: 'Science & Nature',
    mood: '💡 Inspired',
    keyTakeaway: 'This principle explains rocket propulsion in ISRO Chandrayaan launches.',
    xpEarned: 100,
    streakBonus: true,
    aiFeedback: {
      cheer: 'Brilliant conceptual connection! Newton\'s Third Law is the cornerstone of aerospace engineering.',
      teluguCheer: 'అద్భుతమైన ఆలోచన! ప్రతి చర్యకు సమాన మరియు వ్యతిరేక ప్రతిచర్య ఉంటుంది అనే సూత్రం రాకెట్ ప్రయోగాలలో ప్రాథమికమైనది.',
      thoughtPrompt: 'Can you think of another sports example where this law is applied in daily life?'
    }
  },
  {
    id: 'refl-2',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    timestamp: 'Yesterday at 8:15 PM',
    learnedText: 'Understood how binary search algorithm cuts the search space in half with O(log n) efficiency compared to linear search.',
    subjectCategory: 'Coding, AI & Robotics',
    mood: '🚀 Excited',
    keyTakeaway: 'Like searching a word in a dictionary by opening the middle page repeatedly.',
    xpEarned: 100,
    streakBonus: true,
    aiFeedback: {
      cheer: 'Super analytical thinking! Binary search is one of the most elegant algorithmic concepts in computer science.',
      teluguCheer: 'బైనరీ సెర్చ్ నిఘంటువులో పదాన్ని వెతికే విధానం లాంటిదని చాలా చక్కగా పోల్చారు.',
      thoughtPrompt: 'What requirement must a list fulfill before binary search can work?'
    }
  }
];

export const DailyReflectionZone: React.FC<DailyReflectionZoneProps> = ({
  studentName = 'Chaitanya Reddy',
  currentXP = 3450,
  streakDays = 14,
  onEarnXP,
  onAskAI
}) => {
  // Form State
  const [learnedText, setLearnedText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ReflectionCategory>('Science & Nature');
  const [selectedMood, setSelectedMood] = useState<ReflectionMood>('💡 Inspired');
  const [keyTakeaway, setKeyTakeaway] = useState('');
  
  // Stored Reflections
  const [reflections, setReflections] = useState<DailyReflection[]>(() => {
    try {
      const saved = localStorage.getItem('super_student_daily_reflections');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SAMPLE_REFLECTIONS;
  });

  // UI state
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [earnedXPAmount, setEarnedXPAmount] = useState(0);
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  const todayDateStr = new Date().toISOString().split('T')[0];
  const hasReflectedToday = reflections.some(r => r.date === todayDateStr);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('super_student_daily_reflections', JSON.stringify(reflections));
    } catch (e) {
      console.error(e);
    }
  }, [reflections]);

  // Voice narration helper
  const handleNarrate = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;
    if (activeSpeechId === id) {
      window.speechSynthesis.cancel();
      setActiveSpeechId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setActiveSpeechId(null);
    utterance.onerror = () => setActiveSpeechId(null);
    setActiveSpeechId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Voice Speech-to-Text input
  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can type your reflection.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListeningVoice(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setLearnedText(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsListeningVoice(false);
      };

      recognition.onerror = () => {
        setIsListeningVoice(false);
      };

      recognition.onend = () => {
        setIsListeningVoice(false);
      };
    } catch {
      setIsListeningVoice(false);
    }
  };

  // Submit Reflection
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnedText.trim()) return;

    setIsSubmitting(true);

    // Calculate XP Points:
    // Base reflection = +50 XP
    // Takeaway added = +25 XP bonus
    // Streak reward = +25 XP bonus
    const baseXP = 50;
    const takeawayBonus = keyTakeaway.trim().length > 5 ? 25 : 0;
    const streakBonus = 25;
    const totalXP = baseXP + takeawayBonus + streakBonus;

    // AI Feedback synthesis based on category
    let aiCheer = 'Fantastic dedication to learning! Consistent daily reflection solidifies long-term memory.';
    let aiTeluguCheer = 'నిరంతర సాధన జ్ఞానాన్ని పెంపొందిస్తుంది! ప్రతిరోజూ ఒక కొత్త విషయాన్ని నెమరువేసుకోవడం ఎంతో ఉత్తమం.';
    let aiThoughtPrompt = 'How can you explain this concept simply to a younger sibling or friend?';

    if (selectedCategory === 'Science & Nature') {
      aiCheer = 'Magnificent scientific inquiry! Observing the laws of nature builds sharp problem-solving capabilities.';
      aiTeluguCheer = 'శాస్త్రీయ ఆలోచన మరియు పరిశీలన మీలో సరికొత్త పరిశోధక గుణాన్ని పెంచుతుంది.';
      aiThoughtPrompt = 'What real-world experiment or invention relies on this principle?';
    } else if (selectedCategory === 'Coding, AI & Robotics') {
      aiCheer = 'Outstanding technical growth! Coding and AI fundamentals prepare you to become a creator rather than just a consumer of technology.';
      aiTeluguCheer = 'టెక్నాలజీ మరియు కోడింగ్ జ్ఞానం మిమ్మల్ని సరికొత్త ఆవిష్కర్తగా తీర్చిదిద్దుతుంది.';
      aiThoughtPrompt = 'How could you turn this logic into an automated tool or game?';
    } else if (selectedCategory === 'Mathematics & Logic') {
      aiCheer = 'Superb mathematical reasoning! Every problem solved trains cognitive agility and precision.';
      aiTeluguCheer = 'గణిత సూత్రాలు మరియు లాజిక్ ఆలోచనా విధానాన్ని మరింత వేగవంతం చేస్తాయి.';
      aiThoughtPrompt = 'Can you formulate an alternate method to solve the same problem?';
    } else if (selectedCategory === 'Values & Sanskar') {
      aiCheer = 'Noble character building! Sanskrit slokas and moral values build a strong inner foundation for lifelong success.';
      aiTeluguCheer = 'సంస్కారవంతమైన జ్ఞానం మరియు నైతిక విలువలు మీ వ్యక్తిత్వాన్ని ఉన్నతంగా నిలబెడతాయి.';
      aiThoughtPrompt = 'How will you practice this positive value in your home and school today?';
    }

    const newReflection: DailyReflection = {
      id: `refl-${Date.now()}`,
      date: todayDateStr,
      timestamp: `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      learnedText: learnedText.trim(),
      subjectCategory: selectedCategory,
      mood: selectedMood,
      keyTakeaway: keyTakeaway.trim() || undefined,
      xpEarned: totalXP,
      streakBonus: true,
      aiFeedback: {
        cheer: aiCheer,
        teluguCheer: aiTeluguCheer,
        thoughtPrompt: aiThoughtPrompt
      }
    };

    setTimeout(() => {
      setReflections(prev => [newReflection, ...prev]);
      setEarnedXPAmount(totalXP);
      setShowCelebration(true);
      setIsSubmitting(false);

      // Trigger XP reward upward
      if (onEarnXP) {
        onEarnXP(totalXP, `Daily Reflection (${selectedCategory})`);
      }

      // Voice praise
      handleNarrate(`Congratulations ${studentName}! You earned ${totalXP} XP points for logging your daily reflection on ${selectedCategory}. ${aiCheer}`, newReflection.id);

      // Reset fields
      setLearnedText('');
      setKeyTakeaway('');

      setTimeout(() => {
        setShowCelebration(false);
      }, 5000);
    }, 400);
  };

  // Copy shareable summary
  const handleShareReflection = (ref: DailyReflection) => {
    const text = `🌟 [Super Student Daily Reflection]\n📅 Date: ${ref.date}\n📚 Category: ${ref.subjectCategory}\n💡 What I Learned Today: "${ref.learnedText}"\n${ref.keyTakeaway ? `🔑 Takeaway: ${ref.keyTakeaway}\n` : ''}⚡ XP Earned: +${ref.xpEarned} XP\n🔥 Daily Learning Streak Active!\nShared via SUPER PARENT Gurukul Ecosystem`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShareId(ref.id);
      setTimeout(() => setCopiedShareId(null), 2500);
    }
  };

  // Filtered list
  const filteredReflections = reflections.filter(r => {
    if (filterCategory === 'all') return true;
    return r.subjectCategory === filterCategory;
  });

  const totalReflectionsCount = reflections.length;
  const totalXPEarnedFromReflections = reflections.reduce((acc, curr) => acc + curr.xpEarned, 0);

  // Dynamic calculated XP preview in form
  const previewXP = 50 + (keyTakeaway.trim().length > 5 ? 25 : 0) + 25;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* CELEBRATION MODAL OVERLAY */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl border-4 border-amber-400 space-y-5 animate-scale-up relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg transform rotate-3 animate-bounce">
              <Zap className="w-10 h-10 text-amber-100 fill-amber-100" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-orange-600 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
                Daily Reflection Master
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 pt-2">
                +{earnedXPAmount} XP Points Earned!
              </h3>
              <p className="text-sm font-semibold text-slate-600">
                Outstanding job, <span className="text-orange-600 font-bold">{studentName}</span>! Your daily learning reflection has been added to your Gurukul journal.
              </p>
            </div>

            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 flex items-center justify-around text-xs font-bold text-slate-800">
              <div className="text-center">
                <span className="text-slate-500 block text-[10px] uppercase">Base XP</span>
                <span className="text-base font-black text-amber-700">+50 XP</span>
              </div>
              <div className="h-6 w-px bg-amber-200" />
              <div className="text-center">
                <span className="text-slate-500 block text-[10px] uppercase">Deep Thought</span>
                <span className="text-base font-black text-emerald-700">+25 XP</span>
              </div>
              <div className="h-6 w-px bg-amber-200" />
              <div className="text-center">
                <span className="text-slate-500 block text-[10px] uppercase">Streak Bonus</span>
                <span className="text-base font-black text-orange-700">+25 XP</span>
              </div>
            </div>

            <button
              onClick={() => setShowCelebration(false)}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black text-sm py-3.5 px-6 rounded-2xl shadow-md cursor-pointer transition-all"
            >
              Continue Learning 🚀
            </button>
          </div>
        </div>
      )}

      {/* TOP HERO BANNER: DAILY REFLECTION & XP BOOSTER */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black border border-white/30 text-white shadow-2xs">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Student Dashboard • Daily Learning Habit Booster</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              📝 Daily Reflection & XP Points Journal
              <span className="block text-amber-100 text-base sm:text-xl font-bold mt-1">
                రోజూ ఒక కొత్త విషయాన్ని రికార్డ్ చేయండి • XP పాయింట్లు సంపాదించండి
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-orange-50 font-medium leading-relaxed">
              Log one new concept, scientific law, math insight, moral sloka, or coding skill you learned today. Earn up to <strong>+100 XP points daily</strong> and build an unbeatable learning streak!
            </p>
          </div>

          {/* XP & Streak Stat Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-3.5 text-center shadow-xs">
              <div className="flex items-center justify-center gap-1 text-amber-200 text-xs font-bold uppercase">
                <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Streak</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {streakDays} Days
              </div>
              <div className="text-[10px] text-amber-100 font-semibold mt-0.5">🔥 Active Habit</div>
            </div>

            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-3.5 text-center shadow-xs">
              <div className="flex items-center justify-center gap-1 text-amber-200 text-xs font-bold uppercase">
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Refl. XP</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                +{totalXPEarnedFromReflections}
              </div>
              <div className="text-[10px] text-amber-100 font-semibold mt-0.5">⚡ Total Earned</div>
            </div>

            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-3.5 text-center shadow-xs col-span-2 sm:col-span-1">
              <div className="flex items-center justify-center gap-1 text-amber-200 text-xs font-bold uppercase">
                <BookOpen className="w-4 h-4 text-amber-200" />
                <span>Entries</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {totalReflectionsCount}
              </div>
              <div className="text-[10px] text-amber-100 font-semibold mt-0.5">📖 Reflections</div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN TWO COLUMN GRID: REFLECTION FORM + JOURNAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: DAILY REFLECTION LOGGING FORM (5 Cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-orange-200 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-black">
                  ✍️
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Log Today's Reflection
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    {hasReflectedToday ? '✅ You logged one today! Add another to earn extra XP.' : 'What is one thing you learned today?'}
                  </p>
                </div>
              </div>

              {/* Dynamic XP Preview Pill */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>+{previewXP} XP</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Category Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
                  <span>1. Subject / Category (విభాగం):</span>
                  <span className="text-[11px] text-orange-600 font-extrabold">{selectedCategory}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`p-2 rounded-xl text-left border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        selectedCategory === cat.id
                          ? `${cat.bg} ${cat.border} ${cat.color} ring-2 ring-orange-400 font-black shadow-xs`
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-sm">{cat.icon}</span>
                      <span className="truncate text-[11px]">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Main Learned Text Area */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    2. One Thing I Learned Today (ఈరోజు నేను నేర్చుకున్నది):
                  </label>
                  
                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border flex items-center gap-1 transition-all cursor-pointer ${
                      isListeningVoice
                        ? 'bg-red-500 text-white border-red-600 animate-pulse'
                        : 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
                    }`}
                    title="Speak using voice microphone"
                  >
                    <span>🎙️</span>
                    <span>{isListeningVoice ? 'Listening...' : 'Voice Input'}</span>
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    rows={4}
                    required
                    value={learnedText}
                    onChange={(e) => setLearnedText(e.target.value)}
                    placeholder="e.g. Today I learned about how refraction bends light through a prism to create 7 rainbow colors (VIBGYOR)..."
                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-orange-500 rounded-2xl p-3.5 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all leading-relaxed"
                  />
                  <div className="text-[10px] text-slate-400 text-right pr-2">
                    {learnedText.length} characters
                  </div>
                </div>

                {/* Quick Inspiration Starters */}
                <div className="pt-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3 text-amber-500" />
                    <span>Quick Inspiration Ideas:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {PROMPT_STARTERS.slice(0, 3).map((prompt, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setLearnedText(prompt.text);
                          setSelectedCategory(prompt.category);
                        }}
                        className="text-[10px] bg-slate-100 hover:bg-orange-50 hover:text-orange-800 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 text-left transition-all cursor-pointer truncate max-w-full"
                      >
                        💡 {prompt.text.slice(0, 48)}...
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Mood & Sentiment Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  3. How did learning this make you feel? (అనుభూతి):
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {MOOD_OPTIONS.map((mood) => (
                    <button
                      type="button"
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selectedMood === mood
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Optional Key Takeaway / Application (+25 XP Bonus) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>4. Key Takeaway or Practical Application (ఐచ్ఛికం):</span>
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    +25 XP Bonus
                  </span>
                </label>
                <input
                  type="text"
                  value={keyTakeaway}
                  onChange={(e) => setKeyTakeaway(e.target.value)}
                  placeholder="e.g. How will you use or apply this knowledge?"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-xl p-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !learnedText.trim()}
                className="w-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-black text-sm py-3.5 px-4 rounded-2xl shadow-orange-glow flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Logging & Granting XP...' : `Log Reflection & Claim +${previewXP} XP`}</span>
              </button>
            </form>
          </div>

          {/* Daily Streak Weekly Progress Mini-Widget */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
                <h4 className="font-black text-sm text-white">Daily Learning Habit Tracker</h4>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                {streakDays} Day Streak 🔥
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 pt-1 text-center">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className="space-y-1">
                  <div className="text-[10px] text-slate-400 font-bold">{day}</div>
                  <div className={`w-8 h-8 mx-auto rounded-xl flex items-center justify-center text-xs font-black ${
                    idx <= 4 || hasReflectedToday
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-white/10 text-slate-400'
                  }`}>
                    {idx <= 4 || hasReflectedToday ? '✓' : '•'}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-300 font-medium pt-1 leading-relaxed">
              Reflect every day before 9:00 PM to protect your streak and earn the Gurukul Weekly Scholar Certificate badge!
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: REFLECTION JOURNAL TIMELINE & AI FEEDBACK (7 Cols) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header & Filter Controls */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-orange-600" />
                <span>My Reflection Journal ({filteredReflections.length})</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Your personal timeline of daily breakthroughs and AI mentor wisdom
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-400">Filter:</span>
              <button
                onClick={() => setFilterCategory('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {CATEGORY_OPTIONS.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filterCategory === cat.id
                      ? `${cat.bg} ${cat.color} ${cat.border} border font-black`
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="mr-1">{cat.icon}</span>
                  <span>{cat.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reflections List */}
          <div className="space-y-4">
            {filteredReflections.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
                <div className="text-4xl">📝</div>
                <h4 className="font-black text-slate-800 text-base">No reflections in this category yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Log your first reflection for today using the form on the left to earn +50 to +100 XP points!
                </p>
              </div>
            ) : (
              filteredReflections.map((ref) => {
                const catConfig = CATEGORY_OPTIONS.find(c => c.id === ref.subjectCategory) || CATEGORY_OPTIONS[0];
                return (
                  <div
                    key={ref.id}
                    className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-4 relative overflow-hidden"
                  >
                    {/* Top Metadata Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black px-3 py-1 rounded-full border ${catConfig.bg} ${catConfig.color} ${catConfig.border} flex items-center gap-1.5`}>
                          <span>{catConfig.icon}</span>
                          <span>{ref.subjectCategory}</span>
                        </span>

                        {ref.mood && (
                          <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                            {ref.mood}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-600 fill-amber-600" />
                          <span>+{ref.xpEarned} XP</span>
                        </span>

                        <span className="text-xs text-slate-400 font-medium">
                          {ref.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Learned Insight */}
                    <div>
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
                        What I Learned:
                      </div>
                      <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
                        "{ref.learnedText}"
                      </p>
                    </div>

                    {/* Takeaway if provided */}
                    {ref.keyTakeaway && (
                      <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100 text-xs text-emerald-950 font-medium flex items-start gap-2">
                        <span className="text-sm">🔑</span>
                        <div>
                          <strong className="text-emerald-800 font-bold">Practical Takeaway: </strong>
                          <span>{ref.keyTakeaway}</span>
                        </div>
                      </div>
                    )}

                    {/* AI Gurukul Mentor Feedback Card */}
                    {ref.aiFeedback && (
                      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50/50 p-4 rounded-2xl border border-orange-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-black text-orange-900">
                            <Bot className="w-4 h-4 text-orange-600" />
                            <span>AI Gurukul Mentor Spark</span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleNarrate(`${ref.aiFeedback?.cheer}. ${ref.aiFeedback?.thoughtPrompt}`, ref.id)}
                              className="text-xs font-bold text-orange-800 hover:text-orange-950 bg-white/80 hover:bg-white px-2 py-1 rounded-lg border border-orange-200 flex items-center gap-1 cursor-pointer"
                              title="Listen to AI cheer"
                            >
                              {activeSpeechId === ref.id ? (
                                <>
                                  <VolumeX className="w-3 h-3 text-red-600" />
                                  <span className="text-[10px]">Stop Audio</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-3 h-3 text-orange-600" />
                                  <span className="text-[10px]">Listen Audio</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-slate-800 font-medium leading-relaxed">
                          {ref.aiFeedback.cheer}
                        </p>

                        {ref.aiFeedback.teluguCheer && (
                          <p className="text-xs text-orange-950 font-semibold italic">
                            "{ref.aiFeedback.teluguCheer}"
                          </p>
                        )}

                        {ref.aiFeedback.thoughtPrompt && (
                          <div className="text-[11px] text-amber-900 font-bold bg-white/70 p-2 rounded-xl border border-amber-200 flex items-center gap-1.5">
                            <Compass className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span><strong>Ponder this:</strong> {ref.aiFeedback.thoughtPrompt}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Bottom Action Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleShareReflection(ref)}
                          className="text-slate-500 hover:text-orange-600 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>{copiedShareId === ref.id ? 'Copied to Clipboard!' : 'Share Reflection'}</span>
                        </button>
                      </div>

                      {onAskAI && (
                        <button
                          onClick={() => onAskAI(`I just learned about: "${ref.learnedText}". Can you provide 3 deeper real-world examples, advanced applications, and a fun quiz question about this concept?`)}
                          className="text-orange-700 hover:text-orange-900 font-black flex items-center gap-1 cursor-pointer bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-xl border border-orange-200 transition-all"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                          <span>Explore Deeper with AI</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
