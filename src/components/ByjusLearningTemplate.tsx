import React, { useState } from 'react';
import { 
  Sparkles, 
  Play, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight, 
  BookOpen, 
  Zap, 
  Trophy, 
  Star, 
  Clock, 
  Search, 
  Send, 
  Award, 
  Layers, 
  Lightbulb, 
  Flame, 
  Check, 
  Volume2, 
  ChevronRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { NavTab } from '../types';

interface ByjusLearningTemplateProps {
  studentName?: string;
  currentXP?: number;
  streakDays?: number;
  onNavigateTab: (tab: NavTab) => void;
  onOpenAskAI: (persona?: string, query?: string) => void;
  onEarnXP?: (points: number, reason?: string) => void;
}

export const ByjusLearningTemplate: React.FC<ByjusLearningTemplateProps> = ({
  studentName = 'Chaitanya Reddy',
  currentXP = 3450,
  streakDays = 14,
  onNavigateTab,
  onOpenAskAI,
  onEarnXP
}) => {
  // 4-Stage Cycle Tab: Learn, Practice, Revise, Test
  const [activeCycle, setActiveCycle] = useState<'learn' | 'practice' | 'revise' | 'test'>('learn');

  // Interactive 3D Concept Video Simulator State
  const [selectedConcept, setSelectedConcept] = useState<number>(0);
  const [isConceptPlaying, setIsConceptPlaying] = useState(false);
  const [sliderVal, setSliderVal] = useState(50);

  // Practice Question Ladder State
  const [ladderLevel, setLadderLevel] = useState<1 | 2 | 3>(1);
  const [selectedPracticeOption, setSelectedPracticeOption] = useState<number | null>(null);
  const [practiceAnswerChecked, setPracticeAnswerChecked] = useState(false);

  // Instant 60-Second AI Doubt Solver State
  const [doubtQuery, setDoubtQuery] = useState('');
  const [activeDoubtSolution, setActiveDoubtSolution] = useState<{
    question: string;
    answer: string;
    stepList: string[];
    conceptTag: string;
  } | null>(null);

  // Diagnostic Test State
  const [testScore, setTestScore] = useState<number | null>(null);
  const [testSelectedAnswers, setTestSelectedAnswers] = useState<Record<number, number>>({});

  const CONCEPTS = [
    {
      id: 0,
      title: 'Visual Proof: (a + b)² = a² + 2ab + b²',
      subject: 'Mathematics',
      grade: 'Class 8',
      duration: '4 mins 20s',
      analogy: 'Geometric Area of a Garden Plot',
      description: 'See why multiplying binomials corresponds to dividing a square into smaller sub-squares and rectangles with interactive visual geometry.',
      keyTakeaway: '(a+b)² is literally the total area of a large square divided into one a² square, one b² square, and two ab rectangles.',
      interactiveLabel: 'Adjust dimension "a" vs "b":',
      badge: 'Visual Geometry'
    },
    {
      id: 1,
      title: 'Newton’s 3rd Law: Action & Rocket Thrust',
      subject: 'Physics',
      grade: 'Class 8',
      duration: '5 mins 15s',
      analogy: 'ISRO Chandrayaan & Balloon Propulsion',
      description: 'Every action has an equal and opposite reaction. Explore how high-velocity gas expulsion downwards generates upward thrust.',
      keyTakeaway: 'Force exerted on exhaust gases (Action) = Force exerted on the rocket body (Reaction).',
      interactiveLabel: 'Exhaust Thrust Power (%):',
      badge: 'Spaceflight 3D'
    },
    {
      id: 2,
      title: 'Double Circulation in Human Heart 3D',
      subject: 'Biology',
      grade: 'Class 8',
      duration: '6 mins 00s',
      analogy: 'Two-Lane Expressway of Oxygenated Blood',
      description: 'Trace oxygen-rich blood through left atrium, left ventricle, aorta, and systemic capillaries in high-definition 3D cross-section.',
      keyTakeaway: 'Blood passes through the heart twice in one complete circuit (Pulmonary circuit + Systemic circuit).',
      interactiveLabel: 'Heart Beats Per Minute (BPM):',
      badge: '3D Anatomy'
    },
    {
      id: 3,
      title: 'Vedic Math: "Ekadhikena Purvena" Fast Squaring',
      subject: 'Vedic Math',
      grade: 'Class 8',
      duration: '3 mins 45s',
      analogy: 'Mental Lightning Calculator',
      description: 'Square any number ending in 5 in under 3 seconds: Multiply the tens digit by (tens digit + 1), then suffix 25! (e.g. 75² = 7×8 = 56 ➔ 5625).',
      keyTakeaway: 'For any number ending in 5: (N5)² = [N × (N + 1)] suffix 25.',
      interactiveLabel: 'Select number to square ending in 5:',
      badge: 'Mental Speed'
    }
  ];

  const LADDER_QUESTIONS = {
    1: {
      levelName: 'Level 1: Foundation Concepts',
      question: 'In the identity (a + b)² = a² + 2ab + b², if a = 3 and b = 4, what is the value of (a + b)²?',
      options: ['25', '49', '37', '54'],
      correctIndex: 1, // (3+4)^2 = 7^2 = 49
      explanation: '(3 + 4)² = 7² = 49. Using expansion: 3² + 2(3)(4) + 4² = 9 + 24 + 16 = 49.'
    },
    2: {
      levelName: 'Level 2: Real-World Application',
      question: 'A rocket engine expels 40 kg of exhaust gas backward every second at 500 m/s. What upward thrust force is exerted on the rocket?',
      options: ['10,000 N', '20,000 N', '2,000 N', '40,000 N'],
      correctIndex: 1, // F = v * (dm/dt) = 500 * 40 = 20,000 N
      explanation: 'Thrust Force F = (dm/dt) × v = 40 kg/s × 500 m/s = 20,000 N (Newton’s 3rd Law / Momentum principle).'
    },
    3: {
      levelName: 'Level 3: Olympiad & JEE Foundation',
      question: 'Calculate the square of 115 using the Vedic Sutra "Ekadhikena Purvena" without paper multiplication.',
      options: ['13,225', '12,125', '13,125', '14,225'],
      correctIndex: 0, // 11 * 12 = 132, suffix 25 -> 13225
      explanation: 'Take the prefix 11. Multiply by (11 + 1 = 12): 11 × 12 = 132. Suffix 25 ➔ 13,225! Done in 2 seconds.'
    }
  };

  const handleSelectPracticeOption = (idx: number) => {
    if (practiceAnswerChecked) return;
    setSelectedPracticeOption(idx);
  };

  const handleCheckPracticeAnswer = () => {
    setPracticeAnswerChecked(true);
    const q = LADDER_QUESTIONS[ladderLevel];
    if (selectedPracticeOption === q.correctIndex && onEarnXP) {
      onEarnXP(50, `Completed Visual 3D Practice Level ${ladderLevel}`);
    }
  };

  const handleNextLadder = () => {
    setSelectedPracticeOption(null);
    setPracticeAnswerChecked(false);
    if (ladderLevel === 1) setLadderLevel(2);
    else if (ladderLevel === 2) setLadderLevel(3);
    else setLadderLevel(1);
  };

  const handleAskPreloadedDoubt = (q: string) => {
    setDoubtQuery(q);
    if (q.includes('photosynthesis')) {
      setActiveDoubtSolution({
        question: 'How do stomata regulate gas exchange during photosynthesis?',
        answer: 'Stomata are microscopic pores guarded by specialized guard cells that open and close based on turgor pressure.',
        stepList: [
          '1. In daylight, guard cells take in potassium ions (K+) and water, becoming turgid and swelling outwards.',
          '2. The stomatal aperture opens, allowing Carbon Dioxide (CO₂) to enter the leaf mesophyll.',
          '3. Oxygen (O₂) generated during photolysis of water exits through the pore into the atmosphere.',
          '4. In drought or darkness, guard cells lose water, turn flaccid, and close the pore to prevent transpiration.'
        ],
        conceptTag: 'Biology • Class 8 NCERT Chapter 1'
      });
    } else if (q.includes('Bhagavad Gita')) {
      setActiveDoubtSolution({
        question: 'What is the true meaning of "Karmanye Vadhikaraste" (Gita Ch 2, Shloka 47)?',
        answer: 'Lord Krishna instructs Arjuna that one has complete sovereignty over their sincere effort (Karma), but not over the fruits (Phala).',
        stepList: [
          '1. Focus 100% of your energy and mind on the learning process, not worrying about the exam marks.',
          '2. Anxiety arises when the mind obsesses over the future outcome rather than the present task.',
          '3. Never succumb to inaction (Akarmanya); action performed with dedication leads to supreme excellence.'
        ],
        conceptTag: 'Sanskar & Philosophy • Vedic Wisdom'
      });
    } else {
      setActiveDoubtSolution({
        question: q,
        answer: 'Step-by-step diagnostic breakdown generated by AI Subject Mentor:',
        stepList: [
          '1. Identify given variables and core scientific theorem.',
          '2. Apply the primary formula or logical step with dimensional analysis.',
          '3. Simplify algebraic terms to arrive at verified solution.',
          '4. Recommended practice: 3 additional problems in Education Hub.'
        ],
        conceptTag: 'Verified Concept Solution'
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. VISUAL 3D SIGNATURE BANNER (ROYAL PURPLE & GOLD) */}
      <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-amber-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-purple-500/40">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-wide border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Visual 3D Learning Experience Active</span>
              <span className="bg-amber-400 text-purple-950 text-[10px] px-1.5 py-0.2 rounded font-black">Purple & Gold</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Concept Mastery & 3D Learning Journey 🚀
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 font-medium">
              Learn through visual animations, climb the adaptive practice ladder, resolve doubts in 60 seconds, and conquer diagnostic tests.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => setActiveCycle('learn')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCycle === 'learn'
                    ? 'bg-amber-400 text-purple-950 shadow-md font-black'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Play className="w-3.5 h-3.5 text-purple-900" />
                <span>1. Learn (3D Visual)</span>
              </button>

              <button
                onClick={() => setActiveCycle('practice')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCycle === 'practice'
                    ? 'bg-amber-400 text-purple-950 shadow-md font-black'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-purple-900" />
                <span>2. Practice Ladder</span>
              </button>

              <button
                onClick={() => setActiveCycle('revise')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCycle === 'revise'
                    ? 'bg-amber-400 text-purple-950 shadow-md font-black'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-purple-900" />
                <span>3. Revise Flashcards</span>
              </button>

              <button
                onClick={() => setActiveCycle('test')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeCycle === 'test'
                    ? 'bg-amber-400 text-purple-950 shadow-md font-black'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-purple-900" />
                <span>4. Speed Diagnostic</span>
              </button>
            </div>
          </div>

          {/* Gamified Byju's Badge & XP Meter */}
          <div className="bg-purple-950/60 backdrop-blur-md p-4 rounded-2xl border border-purple-400/30 text-center space-y-2 shrink-0 w-full sm:w-auto">
            <div className="flex items-center justify-center gap-1 text-amber-400 text-sm font-black">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <div className="text-2xl font-black text-white">{currentXP} XP</div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
              BYJU'S Gold Scholar
            </div>
            <div className="text-[11px] text-purple-200">
              🔥 {streakDays} Day Learning Streak
            </div>
          </div>
        </div>
      </div>

      {/* 2. 4-STAGE PEDAGOGY INTERACTIVE CONTAINER */}
      
      {/* ========================================================================= */}
      {/* STAGE 1: LEARN (VISUAL 3D CONCEPT VIDEO SIMULATOR) */}
      {/* ========================================================================= */}
      {activeCycle === 'learn' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Interactive Stage (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-purple-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 text-xs font-black uppercase">
                    {CONCEPTS[selectedConcept].subject}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-black">
                    {CONCEPTS[selectedConcept].badge}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-purple-600" />
                  <span>{CONCEPTS[selectedConcept].duration}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {CONCEPTS[selectedConcept].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {CONCEPTS[selectedConcept].description}
              </p>

              {/* Interactive Concept Simulator Canvas / Frame */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-6 text-white min-h-[260px] flex flex-col justify-between relative overflow-hidden border border-purple-500/30">
                <div className="flex items-center justify-between text-xs text-purple-200 font-mono">
                  <span>Interactive Simulator Engine</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Real-Time Model</span>
                  </span>
                </div>

                {/* Visual Graphic Representation */}
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-3">
                  {selectedConcept === 0 && (
                    <div className="flex items-center gap-2">
                      <div 
                        className="rounded-xl bg-purple-600/80 border-2 border-amber-400 flex items-center justify-center font-black transition-all"
                        style={{ width: `${Math.max(60, sliderVal)}px`, height: `${Math.max(60, sliderVal)}px` }}
                      >
                        a²
                      </div>
                      <div 
                        className="rounded-xl bg-indigo-600/80 border-2 border-amber-400 flex items-center justify-center font-black transition-all"
                        style={{ width: `${Math.max(40, 100 - sliderVal)}px`, height: `${Math.max(60, sliderVal)}px` }}
                      >
                        ab
                      </div>
                    </div>
                  )}

                  {selectedConcept === 1 && (
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-4xl animate-bounce">🚀</div>
                      <div 
                        className="h-3 bg-gradient-to-t from-amber-500 to-transparent rounded-full transition-all"
                        style={{ width: `${sliderVal * 1.5}px` }}
                      />
                      <span className="text-xs font-mono text-amber-300">
                        Upward Reaction = {(sliderVal * 250).toLocaleString()} Newtons
                      </span>
                    </div>
                  )}

                  {selectedConcept === 2 && (
                    <div className="flex items-center gap-4 text-center">
                      <div className="text-4xl animate-pulse">🫀</div>
                      <div className="text-left font-mono text-xs">
                        <div className="text-red-400">● Left Ventricle ➔ Aorta (Oxygenated)</div>
                        <div className="text-sky-400">● Right Atrium ➔ Pulmonary Artery (Deoxygenated)</div>
                        <div className="text-amber-300 font-bold mt-1">Pulse: {sliderVal + 40} BPM</div>
                      </div>
                    </div>
                  )}

                  {selectedConcept === 3 && (
                    <div className="font-mono text-center space-y-1">
                      <div className="text-2xl font-black text-amber-400">
                        {Math.floor(sliderVal / 10)}5² = ?
                      </div>
                      <div className="text-xs text-purple-200">
                        {Math.floor(sliderVal / 10)} × {Math.floor(sliderVal / 10) + 1} = {Math.floor(sliderVal / 10) * (Math.floor(sliderVal / 10) + 1)}
                        {' ➔ suffix 25 ➔ '}
                        <span className="text-emerald-400 font-black">
                          {Math.floor(sliderVal / 10) * (Math.floor(sliderVal / 10) + 1)}25
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Slider Interactive Control */}
                <div className="bg-black/40 backdrop-blur-md p-3 rounded-xl space-y-1.5 border border-white/10">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{CONCEPTS[selectedConcept].interactiveLabel}</span>
                    <span className="text-amber-400 font-mono">{sliderVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="90"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>

              {/* Key Takeaway Box */}
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-purple-950 uppercase tracking-wide">BYJU'S Visual Insight</h4>
                  <p className="text-xs text-purple-900 mt-0.5">{CONCEPTS[selectedConcept].keyTakeaway}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Concept Playlist Carousel */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-purple-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-extrabold text-sm text-slate-900">Concept Playlist</h3>
                <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                  4 Interactive Lessons
                </span>
              </div>

              <div className="space-y-2.5">
                {CONCEPTS.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedConcept(idx)}
                    className={`w-full p-3 rounded-2xl text-left transition-all border cursor-pointer flex items-center justify-between gap-2 ${
                      selectedConcept === idx
                        ? 'bg-purple-50 border-purple-400 shadow-xs ring-1 ring-purple-300'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-black uppercase text-purple-600">{c.subject}</span>
                        <span className="text-[9px] text-slate-400">• {c.duration}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 truncate">{c.title}</div>
                    </div>
                    {selectedConcept === idx ? (
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    ) : (
                      <Play className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => onNavigateTab('education')}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Browse All LKG-10 Lessons</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: PRACTICE LADDER (ADAPTIVE DIFFICULTY ENGINE) */}
      {/* ========================================================================= */}
      {activeCycle === 'practice' && (
        <div className="bg-white rounded-3xl p-6 border border-purple-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-black">
                  BYJU'S Adaptive Question Ladder
                </span>
                <span className="text-xs font-bold text-slate-500">Auto-calibrated to Class 8 CBSE / State</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                {LADDER_QUESTIONS[ladderLevel].levelName}
              </h3>
            </div>

            {/* Level Selector Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl">
              {([1, 2, 3] as (1 | 2 | 3)[]).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => { setLadderLevel(lvl); setSelectedPracticeOption(null); setPracticeAnswerChecked(false); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    ladderLevel === lvl
                      ? 'bg-purple-700 text-white shadow-xs font-black'
                      : 'text-slate-600 hover:bg-white/60'
                  }`}
                >
                  Level {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Question Card */}
          <div className="space-y-4">
            <div className="text-sm sm:text-base font-extrabold text-slate-900 leading-relaxed">
              {LADDER_QUESTIONS[ladderLevel].question}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LADDER_QUESTIONS[ladderLevel].options.map((opt, oIdx) => {
                const isSelected = selectedPracticeOption === oIdx;
                const isCorrect = oIdx === LADDER_QUESTIONS[ladderLevel].correctIndex;
                let cardStyle = 'bg-slate-50 hover:bg-purple-50/50 border-slate-200 text-slate-800';

                if (practiceAnswerChecked) {
                  if (isCorrect) {
                    cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-200';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-200';
                  }
                } else if (isSelected) {
                  cardStyle = 'bg-purple-100 border-purple-600 text-purple-950 font-black ring-2 ring-purple-300';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectPracticeOption(oIdx)}
                    className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${cardStyle}`}
                  >
                    <span>{opt}</span>
                    <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Check / Next Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                {practiceAnswerChecked 
                  ? selectedPracticeOption === LADDER_QUESTIONS[ladderLevel].correctIndex 
                    ? '🎉 Correct! +50 XP added to your Gurukul score.' 
                    : '💡 Review the visual explanation below.'
                  : 'Select an option and click Verify Answer'}
              </span>

              <div className="flex items-center gap-2">
                {!practiceAnswerChecked ? (
                  <button
                    onClick={handleCheckPracticeAnswer}
                    disabled={selectedPracticeOption === null}
                    className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                      selectedPracticeOption !== null
                        ? 'bg-purple-700 hover:bg-purple-800 text-white shadow-md cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Verify Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextLadder}
                    className="px-5 py-2 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next Level</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Explanation Drawer when checked */}
            {practiceAnswerChecked && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-1 text-xs">
                <span className="font-black text-amber-900 block uppercase">Step-by-Step Pedagogical Explanation:</span>
                <p className="text-amber-950">{LADDER_QUESTIONS[ladderLevel].explanation}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 3: REVISE (CONCEPT FLASHCARDS & MINDMAPS) */}
      {/* ========================================================================= */}
      {activeCycle === 'revise' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              subject: 'Mathematics',
              title: 'Algebraic Identities Vault',
              formula: '(a+b)² = a² + 2ab + b²\n(a-b)² = a² - 2ab + b²\n(a+b)(a-b) = a² - b²',
              trick: 'Geometric area division principle'
            },
            {
              subject: 'Physics',
              title: 'Newton’s Laws of Motion Cheat Sheet',
              formula: '1st: Inertia (∑F = 0)\n2nd: F = m × a\n3rd: F_action = -F_reaction',
              trick: 'Rocket thrust & momentum conservation'
            },
            {
              subject: 'Chemistry',
              title: 'Metals & Non-Metals Reaction Chart',
              formula: 'Metal + Oxygen ➔ Basic Oxide\nNon-Metal + Oxygen ➔ Acidic Oxide',
              trick: 'Litmus turns Blue with metal oxides'
            },
            {
              subject: 'Vedic Math',
              title: 'Nikhilam Navatashcaramam Dashatah',
              formula: 'All from 9 and the last from 10',
              trick: 'Instant subtraction from 100, 1000, 10,000'
            },
            {
              subject: 'Biology',
              title: 'Cell Organelles at a Glance',
              formula: 'Mitochondria = Powerhouse (ATP)\nRibosome = Protein Factory\nChloroplast = Solar Kitchen',
              trick: 'Plant cells have cell wall + chloroplasts'
            },
            {
              subject: 'Sanskar & Values',
              title: 'Bhagavad Gita Key Shlokas',
              formula: 'Chapter 2.47: Karmanye Vadhikaraste\nChapter 4.7: Yada Yada Hi Dharmasya',
              trick: 'Sincere effort over anxiety of results'
            }
          ].map((card, idx) => (
            <div key={idx} className="p-5 rounded-3xl bg-white border border-purple-200 shadow-xs space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-purple-100 text-purple-800 rounded">
                    {card.subject}
                  </span>
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 mt-2">{card.title}</h4>
                <pre className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-purple-950 whitespace-pre-wrap">
                  {card.formula}
                </pre>
              </div>
              <div className="text-[11px] font-bold text-amber-700 bg-amber-50 p-2 rounded-xl border border-amber-200">
                💡 {card.trick}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 4: TEST (SPEED DIAGNOSTIC MOCK) */}
      {/* ========================================================================= */}
      {activeCycle === 'test' && (
        <div className="bg-white rounded-3xl p-6 border border-purple-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 text-xs font-black">
                BYJU'S Diagnostic Speed Assessment
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">3-Minute Adaptive Chapter Mock</h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400">Class 8 Diagnostic</span>
              <div className="text-sm font-black text-purple-700">3 Questions • 150 Points</div>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                id: 1,
                q: '1. What is the reciprocal of -5/9?',
                opts: ['5/9', '-9/5', '9/5', '1'],
                correct: 1
              },
              {
                id: 2,
                q: '2. Which organelle is called the powerhouse of the cell?',
                opts: ['Nucleus', 'Mitochondria', 'Golgi Body', 'Vacuole'],
                correct: 1
              },
              {
                id: 3,
                q: '3. A force of 20 N acts on an area of 2 m². What is the resulting pressure?',
                opts: ['40 Pascal', '10 Pascal', '5 Pascal', '20 Pascal'],
                correct: 1
              }
            ].map(item => (
              <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs sm:text-sm font-bold text-slate-900">{item.q}</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {item.opts.map((opt, oIdx) => {
                    const isSelected = testSelectedAnswers[item.id] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => setTestSelectedAnswers(prev => ({ ...prev, [item.id]: oIdx }))}
                        className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-700 text-white border-purple-800 shadow-xs'
                            : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              {Object.keys(testSelectedAnswers).length} of 3 questions answered
            </span>
            <button
              onClick={() => {
                let correctCount = 0;
                if (testSelectedAnswers[1] === 1) correctCount++;
                if (testSelectedAnswers[2] === 1) correctCount++;
                if (testSelectedAnswers[3] === 1) correctCount++;
                setTestScore(correctCount);
                if (onEarnXP) onEarnXP(correctCount * 50, 'Completed Speed Diagnostic Test');
              }}
              disabled={Object.keys(testSelectedAnswers).length < 3}
              className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              Submit Diagnostic Test
            </button>
          </div>

          {testScore !== null && (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-emerald-950">Diagnostic Score: {testScore}/3 Correct!</h4>
                <p className="text-xs text-emerald-800">
                  {testScore === 3 ? '🌟 Outstanding mastery! You earned +150 Gurukul XP.' : 'Good attempt! Review Level 2 practice ladder.'}
                </p>
              </div>
              <button
                onClick={() => { setTestScore(null); setTestSelectedAnswers({}); }}
                className="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 text-xs font-bold"
              >
                Retake
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. BYJU'S 60-SECOND INSTANT AI DOUBT SOLVER WIDGET */}
      <div className="bg-white rounded-3xl p-6 border border-purple-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-purple-950 flex items-center justify-center font-black shadow-sm">
              <Zap className="w-5 h-5 fill-purple-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base">BYJU'S 60-Second Instant Doubt Solver</h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  24x7 AI Live
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Type any question in Science, Math, English or Telugu for instant verified derivation</p>
            </div>
          </div>
        </div>

        {/* Quick Sample Doubt Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-400">Popular Doubts:</span>
          {[
            'How do stomata regulate gas exchange during photosynthesis?',
            'What is the true meaning of "Karmanye Vadhikaraste"?',
            'How to find square root of 576 using prime factorization?'
          ].map((sample, sIdx) => (
            <button
              key={sIdx}
              onClick={() => handleAskPreloadedDoubt(sample)}
              className="px-2.5 py-1 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-[11px] font-bold border border-purple-200 transition-colors cursor-pointer truncate max-w-[280px]"
            >
              {sample}
            </button>
          ))}
        </div>

        {/* Doubt Input Box */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={doubtQuery}
              onChange={(e) => setDoubtQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && doubtQuery.trim()) {
                  handleAskPreloadedDoubt(doubtQuery);
                }
              }}
              placeholder="Ask any question (e.g. explain Pythagoras theorem in Telugu & English)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all"
            />
          </div>

          <button
            onClick={() => {
              if (doubtQuery.trim()) {
                handleAskPreloadedDoubt(doubtQuery);
              } else {
                onOpenAskAI('tutor', 'Explain quadratic equations with visual analogies.');
              }
            }}
            className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-black text-xs rounded-2xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>Solve in 60s</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Rendered Doubt Solution Card */}
        {activeDoubtSolution && (
          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-purple-200 text-purple-900 rounded-md">
                {activeDoubtSolution.conceptTag}
              </span>
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Verified Solution</span>
              </span>
            </div>

            <h4 className="font-extrabold text-sm text-purple-950">Q: {activeDoubtSolution.question}</h4>
            <p className="text-xs text-purple-900 font-medium">{activeDoubtSolution.answer}</p>

            <div className="space-y-1.5 pl-2 border-l-2 border-purple-400">
              {activeDoubtSolution.stepList.map((step, stIdx) => (
                <div key={stIdx} className="text-xs text-slate-800 font-mono">
                  {step}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] font-bold text-slate-500">Need more depth or voice explanation?</span>
              <button
                onClick={() => onOpenAskAI('tutor', activeDoubtSolution.question)}
                className="px-3 py-1.5 bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-purple-800 cursor-pointer"
              >
                Chat with Super AI Tutor
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
