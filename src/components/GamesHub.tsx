import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  Calculator, 
  BookOpen, 
  FlaskConical,
  Scissors,
  Puzzle,
  ExternalLink,
  Play,
  Grid,
  Zap,
  Volume2,
  Smile,
  ArrowRight,
  Brain,
  FileText,
  Search,
  Check,
  RefreshCw,
  Clock,
  Layers,
  Gamepad2,
  Tv
} from 'lucide-react';
import { SMALL_CRAFTS_DATA, CALCSOLVER_AND_PUZZLES_DATA, CraftItem, PuzzleToolItem } from '../data/craftsAndPuzzlesData';
import { MediaLinkModal } from './MediaLinkModal';

export const GamesHub: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<'games' | 'crafts' | 'puzzles' | 'calcsolver' | 'portals'>('games');
  
  // Game state
  const [activeGame, setActiveGame] = useState<'math' | 'memory' | 'gita' | 'science' | 'sliding'>('math');
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Memory Game State
  const MEMORY_CARDS = [
    { id: 1, icon: '🦁', name: 'Lion' },
    { id: 2, icon: '🐘', name: 'Elephant' },
    { id: 3, icon: '🦚', name: 'Peacock' },
    { id: 4, icon: '🐬', name: 'Dolphin' },
    { id: 5, icon: '🐯', name: 'Tiger' },
    { id: 6, icon: '🐒', name: 'Monkey' }
  ];
  const [cards, setCards] = useState<{ id: number; icon: string; name: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryMatches, setMemoryMatches] = useState(0);

  // Sliding Puzzle State (3x3 grid, 1-8 and 0 as blank)
  const [slidingGrid, setSlidingGrid] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 0, 8]);
  const [slidingMoves, setSlidingMoves] = useState(0);
  const [isSlidingWon, setIsSlidingWon] = useState(false);

  // Interactive CalcSolver State
  const [calcInput, setCalcInput] = useState('15 * 12 + 180 / 3');
  const [calcResult, setCalcResult] = useState<string | null>('240');
  const [calcSteps, setCalcSteps] = useState<string[]>([
    'Step 1: Multiplication: 15 × 12 = 180',
    'Step 2: Division: 180 ÷ 3 = 60',
    'Step 3: Addition: 180 + 60 = 240'
  ]);

  // Selected Craft Modal
  const [selectedCraft, setSelectedCraft] = useState<CraftItem | null>(null);

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

  const mathQuestions = [
    { q: 'What is 15 × 8?', options: ['120', '110', '130', '100'], correct: 0 },
    { q: 'If a triangle has angles 60° and 70°, what is the 3rd angle?', options: ['40°', '50°', '60°', '70°'], correct: 1 },
    { q: 'What is 3/4 of 100?', options: ['25', '50', '75', '80'], correct: 2 },
    { q: 'What is the square root of 144?', options: ['10', '11', '12', '14'], correct: 2 },
    { q: 'If a rectangle has length 8 cm and breadth 5 cm, what is its perimeter?', options: ['13 cm', '26 cm', '40 cm', '20 cm'], correct: 1 }
  ];

  const gitaQuestions = [
    { q: 'In Gita 2.47, what should we focus on?', options: ['Result / Marks', 'Sincere Duty / Effort', 'Worrying', 'Resting'], correct: 1 },
    { q: 'What is the key takeaway of self-discipline?', options: ['Mind is your friend when disciplined', 'Give up easily', 'Depend on luck', 'Blame others'], correct: 0 },
    { q: 'Who codifies truth and peace in shlokas?', options: ['Veda Vyasa', 'Warriors only', 'Gamblers', 'None'], correct: 0 }
  ];

  const scienceQuestions = [
    { q: 'Which gas do plants absorb during photosynthesis?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], correct: 1 },
    { q: 'Which sensor measures distance using sound waves?', options: ['IR Sensor', 'Ultrasonic Sensor', 'Light Sensor', 'Temperature Sensor'], correct: 1 },
    { q: 'What is the boiling point of pure water at sea level?', options: ['50°C', '80°C', '100°C', '120°C'], correct: 2 }
  ];

  const activeQuestions = activeGame === 'math' 
    ? mathQuestions 
    : activeGame === 'gita' 
      ? gitaQuestions 
      : scienceQuestions;

  // Initialize Memory Game
  const initMemoryGame = () => {
    const duplicated = [...MEMORY_CARDS, ...MEMORY_CARDS]
      .sort(() => Math.random() - 0.5)
      .map((item, idx) => ({
        ...item,
        uniqueKey: idx,
        isFlipped: false,
        isMatched: false
      }));
    setCards(duplicated);
    setFlippedIndices([]);
    setMemoryMoves(0);
    setMemoryMatches(0);
  };

  useEffect(() => {
    initMemoryGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].id === cards[secondIdx].id) {
        // Matched!
        setTimeout(() => {
          setCards(prev => {
            const updated = [...prev];
            updated[firstIdx].isMatched = true;
            updated[secondIdx].isMatched = true;
            return updated;
          });
          setFlippedIndices([]);
          setMemoryMatches(prev => {
            const next = prev + 1;
            if (next === MEMORY_CARDS.length) {
              setScore(s => s + 200);
            }
            return next;
          });
        }, 500);
      } else {
        // Not matched
        setTimeout(() => {
          setCards(prev => {
            const updated = [...prev];
            updated[firstIdx].isFlipped = false;
            updated[secondIdx].isFlipped = false;
            return updated;
          });
          setFlippedIndices([]);
        }, 900);
      }
    }
  };

  // Sliding puzzle handlers
  const handleSlidingTileClick = (index: number) => {
    const blankIndex = slidingGrid.indexOf(0);
    // Check if neighbor
    const validMoves = [
      blankIndex - 1 >= 0 && Math.floor((blankIndex - 1) / 3) === Math.floor(blankIndex / 3) ? blankIndex - 1 : -1,
      blankIndex + 1 < 9 && Math.floor((blankIndex + 1) / 3) === Math.floor(blankIndex / 3) ? blankIndex + 1 : -1,
      blankIndex - 3 >= 0 ? blankIndex - 3 : -1,
      blankIndex + 3 < 9 ? blankIndex + 3 : -1
    ];

    if (validMoves.includes(index)) {
      const newGrid = [...slidingGrid];
      newGrid[blankIndex] = slidingGrid[index];
      newGrid[index] = 0;
      setSlidingGrid(newGrid);
      setSlidingMoves(m => m + 1);

      // Check win condition [1,2,3,4,5,6,7,8,0]
      const isWon = newGrid.slice(0, 8).every((val, idx) => val === idx + 1);
      if (isWon) {
        setIsSlidingWon(true);
        setScore(s => s + 300);
      }
    }
  };

  const resetSlidingPuzzle = () => {
    setSlidingGrid([1, 2, 3, 4, 5, 6, 7, 0, 8].sort(() => Math.random() - 0.5));
    setSlidingMoves(0);
    setIsSlidingWon(false);
  };

  const handleAnswerSelect = (idx: number) => {
    setSelectedAnswer(idx);
    if (idx === activeQuestions[currentQuestionIndex].correct) {
      setScore(prev => prev + 50);
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < activeQuestions.length) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetGame = (gameType: 'math' | 'memory' | 'gita' | 'science' | 'sliding') => {
    setActiveGame(gameType);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    if (gameType === 'memory') {
      initMemoryGame();
    }
    if (gameType === 'sliding') {
      resetSlidingPuzzle();
    }
  };

  // Interactive CalcSolver calculation handler
  const handleSolveMath = (expr?: string) => {
    const targetExpr = expr || calcInput;
    try {
      // Safe arithmetic evaluator
      const sanitized = targetExpr.replace(/[^0-9+\-*/().^ %]/g, '');
      const evaluated = Function(`'use strict'; return (${sanitized.replace(/\^/g, '**')})`)();
      setCalcResult(String(evaluated));
      setCalcSteps([
        `Target Input Expression: ${targetExpr}`,
        `Parsed Operators & Precedence: Parentheses -> Exponents -> Mult/Div -> Add/Sub`,
        `Calculated Final Output Value = ${evaluated}`
      ]);
    } catch (e) {
      setCalcResult('Check Formula Syntax');
      setCalcSteps(['Please enter standard arithmetic or algebraic numbers (e.g. 25 * 4 + 10).']);
    }
  };

  const FREE_KIDS_PORTALS = [
    {
      title: 'PBS KIDS Educational Games (100+ Free)',
      url: 'https://pbskids.org/games',
      logo: 'https://pbskids.org/favicon.ico',
      category: 'Preschool & Primary',
      badge: '100% Free',
      description: 'Science, math, reading, and problem-solving games featuring Wild Kratts, Curious George, and Arthur.'
    },
    {
      title: 'ABCya! Kids Learning & Practice Games',
      url: 'https://www.abcya.com/',
      category: 'Pre-K to Grade 6',
      badge: 'Award-Winning',
      description: 'Grade-by-grade typing, math, word bingo, and puzzle games loved by millions of teachers.'
    },
    {
      title: 'Math Playground (Math Games + Logic Puzzles)',
      url: 'https://www.mathplayground.com/',
      category: 'Grades 1 to 6',
      badge: 'Math Fun',
      description: 'Action-packed math sprints, fraction games, logic tangrams, and problem-solving adventures.'
    },
    {
      title: 'PhET Interactive Simulations (Physics, Chemistry & Math)',
      url: 'https://phet.colorado.edu/en/simulations/browse',
      category: 'Class 3 to 10+',
      badge: 'STEM Simulations',
      description: 'Free interactive HTML5 simulations of circuits, sound waves, solar system, and fractions.'
    },
    {
      title: 'National Geographic Kids Games & Animal Quizzes',
      url: 'https://kids.nationalgeographic.com/games',
      category: 'Nature & Animals',
      badge: 'Explorer Club',
      description: 'Interactive quizzes, animal habitat explorer, space games, and personality discovery puzzles.'
    },
    {
      title: 'Starfall Learn to Read & Math Free',
      url: 'https://www.starfall.com/',
      category: 'Pre-K to Grade 3',
      badge: 'Phonics & Literacy',
      description: 'Interactive audiovisual phonics, early readers, and joyful sing-along math activities.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Kids Game Zone Free • DIY Crafts • Puzzles & CalcSolver</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            🎮 Kids Game Zone, Crafts & CalcSolver Studio
          </h2>
          <p className="text-sm text-orange-50 font-medium leading-relaxed">
            100% Free interactive educational games, DIY origami and small crafts with step-by-step videos, logic puzzle making, and step-by-step <strong>CalcSolver</strong> web engines for all school subjects.
          </p>
        </div>
      </div>

      {/* Main Hub Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setActiveMainTab('games')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
            activeMainTab === 'games'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>🎮 Free Games & Quizzes</span>
        </button>

        <button
          onClick={() => setActiveMainTab('crafts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
            activeMainTab === 'crafts'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
          }`}
        >
          <Scissors className="w-4 h-4" />
          <span>✂️ Small Crafts Making (Origami & DIY)</span>
        </button>

        <button
          onClick={() => setActiveMainTab('puzzles')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
            activeMainTab === 'puzzles'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
          }`}
        >
          <Puzzle className="w-4 h-4" />
          <span>🧩 Puzzle Making & Logic Games</span>
        </button>

        <button
          onClick={() => setActiveMainTab('calcsolver')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
            activeMainTab === 'calcsolver'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>🧮 CalcSolver (Web Solvers & Engine)</span>
        </button>

        <button
          onClick={() => setActiveMainTab('portals')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
            activeMainTab === 'portals'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-purple-50 border border-slate-200'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>🌐 Free Kid Portals & Video Links</span>
        </button>
      </div>

      {/* TAB 1: FREE GAMES & QUIZZES */}
      {activeMainTab === 'games' && (
        <div className="space-y-6">
          {/* Game Selector Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <button
              onClick={() => resetGame('math')}
              className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                activeGame === 'math'
                  ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <Calculator className="w-5 h-5" />
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-white/20">Class 1-10</span>
              </div>
              <h4 className="font-black text-xs">Math Sprint</h4>
              <p className={`text-[11px] ${activeGame === 'math' ? 'text-orange-100' : 'text-slate-500'}`}>Speed Math Challenge</p>
            </button>

            <button
              onClick={() => resetGame('memory')}
              className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                activeGame === 'memory'
                  ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <Brain className="w-5 h-5" />
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-white/20">Kids Fun</span>
              </div>
              <h4 className="font-black text-xs">Animal Memory Match</h4>
              <p className={`text-[11px] ${activeGame === 'memory' ? 'text-orange-100' : 'text-slate-500'}`}>Card Flip Matching</p>
            </button>

            <button
              onClick={() => resetGame('sliding')}
              className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                activeGame === 'sliding'
                  ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <Grid className="w-5 h-5" />
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-white/20">Logic</span>
              </div>
              <h4 className="font-black text-xs">Sliding Tile 1-8</h4>
              <p className={`text-[11px] ${activeGame === 'sliding' ? 'text-orange-100' : 'text-slate-500'}`}>Arrange in Order</p>
            </button>

            <button
              onClick={() => resetGame('gita')}
              className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                activeGame === 'gita'
                  ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <BookOpen className="w-5 h-5" />
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-white/20">Values</span>
              </div>
              <h4 className="font-black text-xs">Gita & Wisdom Quiz</h4>
              <p className={`text-[11px] ${activeGame === 'gita' ? 'text-orange-100' : 'text-slate-500'}`}>Character & Habits</p>
            </button>

            <button
              onClick={() => resetGame('science')}
              className={`p-3.5 rounded-2xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                activeGame === 'science'
                  ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-orange-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <FlaskConical className="w-5 h-5" />
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-white/20">Science</span>
              </div>
              <h4 className="font-black text-xs">Science Discovery</h4>
              <p className={`text-[11px] ${activeGame === 'science' ? 'text-orange-100' : 'text-slate-500'}`}>Nature & Experiments</p>
            </button>
          </div>

          {/* ACTIVE GAME CANVAS */}
          {activeGame === 'memory' ? (
            /* Memory Match Game */
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-black text-slate-900">Animal Memory Flip</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500">Moves: {memoryMoves}</span>
                  <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 font-black text-xs px-3 py-1 rounded-full border border-orange-200">
                    <Trophy className="w-4 h-4 text-orange-500" />
                    <span>Matches: {memoryMatches} / {MEMORY_CARDS.length}</span>
                  </div>
                  <button
                    onClick={initMemoryGame}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="Restart Game"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {memoryMatches === MEMORY_CARDS.length ? (
                <div className="text-center py-8 space-y-4">
                  <div className="text-6xl animate-bounce">🎉</div>
                  <h3 className="text-2xl font-black text-slate-900">Brilliant Memory! You Matched All Animals!</h3>
                  <p className="text-sm text-slate-600 font-bold">
                    Completed in {memoryMoves} moves. +200 Points added to your Child Growth Portfolio!
                  </p>
                  <button
                    onClick={initMemoryGame}
                    className="inline-flex items-center gap-2 bg-orange-600 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-xs hover:bg-orange-700 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Memory Match Again</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
                  {cards.map((card, idx) => {
                    const isRevealed = card.isFlipped || card.isMatched;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleCardClick(idx)}
                        className={`h-24 sm:h-28 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 transform ${
                          isRevealed
                            ? card.isMatched
                              ? 'bg-emerald-50 border-emerald-400 scale-95 opacity-80'
                              : 'bg-orange-50 border-orange-500 scale-100 shadow-sm'
                            : 'bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300 hover:border-orange-400 hover:scale-102 cursor-pointer shadow-xs'
                        }`}
                      >
                        {isRevealed ? (
                          <>
                            <span className="text-3xl sm:text-4xl">{card.icon}</span>
                            <span className="text-[10px] font-black text-slate-700 mt-1">{card.name}</span>
                          </>
                        ) : (
                          <span className="text-2xl text-slate-400 font-black">❓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : activeGame === 'sliding' ? (
            /* Sliding Number Puzzle */
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs max-w-md mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Grid className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-black text-slate-900">Sliding Tile 1 to 8 Puzzle</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Moves: {slidingMoves}</span>
                  <button
                    onClick={resetSlidingPuzzle}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {isSlidingWon ? (
                <div className="text-center py-6 space-y-3">
                  <Trophy className="w-12 h-12 text-amber-500 mx-auto animate-bounce" />
                  <h3 className="text-xl font-black text-slate-900">Puzzle Solved! Great Job!</h3>
                  <p className="text-xs text-slate-600">You organized numbers 1 through 8 in {slidingMoves} moves.</p>
                  <button
                    onClick={resetSlidingPuzzle}
                    className="bg-indigo-600 text-white font-black px-4 py-2 rounded-xl text-xs hover:bg-indigo-700"
                  >
                    Shuffle & Play Again
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2 bg-slate-100 p-3 rounded-2xl border border-slate-200">
                  {slidingGrid.map((val, idx) => {
                    const isBlank = val === 0;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSlidingTileClick(idx)}
                        disabled={isBlank}
                        className={`h-20 rounded-xl font-black text-xl transition-all ${
                          isBlank
                            ? 'bg-slate-200/50 border border-dashed border-slate-300'
                            : 'bg-white text-indigo-900 border-2 border-indigo-200 hover:border-indigo-500 shadow-xs active:scale-95 cursor-pointer'
                        }`}
                      >
                        {!isBlank ? val : ''}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Standard Quiz Game (Math, Gita, Science) */
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-500">
                  Question {currentQuestionIndex + 1} of {activeQuestions.length}
                </span>
                <div className="flex items-center gap-1.5 bg-orange-50 text-orange-700 font-black text-xs px-3 py-1 rounded-full border border-orange-200">
                  <Trophy className="w-4 h-4 text-orange-500" />
                  <span>Score: {score} Pts</span>
                </div>
              </div>

              {!showResult ? (
                <div className="space-y-4">
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    {activeQuestions[currentQuestionIndex].q}
                  </h3>

                  <div className="space-y-2.5">
                    {activeQuestions[currentQuestionIndex].options.map((opt, idx) => {
                      const isSelected = selectedAnswer === idx;
                      const isCorrect = idx === activeQuestions[currentQuestionIndex].correct;
                      return (
                        <button
                          key={idx}
                          disabled={selectedAnswer !== null}
                          onClick={() => handleAnswerSelect(idx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all ${
                            selectedAnswer !== null
                              ? isCorrect
                                ? 'bg-green-600 border-green-600 text-white'
                                : isSelected
                                  ? 'bg-red-600 border-red-600 text-white'
                                  : 'bg-slate-50 border-slate-200 text-slate-400'
                              : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-orange-50 hover:border-orange-300'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}. {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <Award className="w-16 h-16 text-orange-500 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-black text-slate-900">Game Completed!</h3>
                  <p className="text-sm font-bold text-slate-600">
                    You earned <span className="text-orange-600 font-black text-lg">{score} Points</span> for your Child Growth Portfolio!
                  </p>

                  <button
                    onClick={() => resetGame(activeGame)}
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SMALL CRAFTS MAKING (ORIGAMI & DIY) */}
      {activeMainTab === 'crafts' && (
        <div className="space-y-6">
          <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Scissors className="w-5 h-5 text-amber-600" />
                <span>Small Crafts Making & Science DIY Workshop</span>
              </h3>
              <p className="text-xs text-amber-900 font-medium">
                Step-by-step origami, recycled science toys, 3D greeting cards, and Newton color discs with video links.
              </p>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-xl border border-amber-200 text-xs font-black text-amber-900 shadow-2xs">
              ✂️ 5 Hands-on Projects
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SMALL_CRAFTS_DATA.map((craft) => (
              <div
                key={craft.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={craft.imageUrl}
                    alt={craft.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-black text-slate-900 border border-slate-200">
                    {craft.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-black">
                    ⏱️ {craft.timeRequired}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-black text-slate-900 text-base leading-snug">{craft.title}</h4>
                    <p className="text-xs text-amber-800 font-bold">{craft.teluguTitle}</p>
                    
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Materials:</span>
                      <ul className="text-xs text-slate-600 list-disc list-inside space-y-0.5">
                        {craft.materials.slice(0, 2).map((mat, i) => (
                          <li key={i} className="truncate">{mat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedCraft(craft)}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black py-2 px-3 rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>View Steps</span>
                    </button>

                    <button
                      onClick={() => setActiveMedia({
                        isOpen: true,
                        title: `${craft.title} - Video Tutorial`,
                        teluguTitle: craft.teluguTitle,
                        category: 'Craft Video Masterclass',
                        videoUrl: craft.videoUrl,
                        description: `Step-by-step video craft tutorial for ${craft.title}. ${craft.tips}`,
                        keyPoints: craft.steps
                      })}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                      title="Watch Video"
                    >
                      <Play className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CRAFT STEP-BY-STEP MODAL */}
          {selectedCraft && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-xs font-black text-amber-600 uppercase tracking-wider">{selectedCraft.category} • {selectedCraft.difficulty}</span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">{selectedCraft.title}</h3>
                    <p className="text-sm font-bold text-amber-800">{selectedCraft.teluguTitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCraft(null)}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                    <span>📦</span> Required Materials:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    {selectedCraft.materials.map((m, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                    <span>📝</span> Step-by-Step Instructions:
                  </h4>
                  <div className="space-y-2.5">
                    {selectedCraft.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-xs font-medium text-slate-800 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-1">
                  <h5 className="font-black text-xs text-emerald-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Scientific / Craft Principle & Tips:</span>
                  </h5>
                  <p className="text-xs text-emerald-800 font-medium">{selectedCraft.tips}</p>
                  <p className="text-xs text-emerald-900 font-bold">{selectedCraft.teluguTips}</p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => {
                      const craft = selectedCraft;
                      setSelectedCraft(null);
                      setActiveMedia({
                        isOpen: true,
                        title: `${craft.title} - Video Tutorial`,
                        teluguTitle: craft.teluguTitle,
                        category: 'Craft Video Masterclass',
                        videoUrl: craft.videoUrl,
                        description: `Step-by-step video craft tutorial for ${craft.title}. ${craft.tips}`,
                        keyPoints: craft.steps
                      });
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-black py-2.5 px-5 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch Video Tutorial</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PUZZLE MAKING & LOGIC GAMES */}
      {activeMainTab === 'puzzles' && (
        <div className="space-y-6">
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Puzzle className="w-5 h-5 text-emerald-600" />
                <span>Puzzle Making & Logic Solving Hub</span>
              </h3>
              <p className="text-xs text-emerald-900 font-medium">
                Word Search makers, 4x4 & 9x9 Sudoku generators, Tangrams, Rubik's cube 3D solvers, and Chess tactics.
              </p>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-black text-emerald-900 shadow-2xs">
              🧩 7+ Logic Portals
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CALCSOLVER_AND_PUZZLES_DATA.filter(p => p.category !== 'Math Solver').map((puzzle) => (
              <div
                key={puzzle.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {puzzle.badge}
                    </span>
                    <Puzzle className="w-5 h-5 text-emerald-600" />
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-base">{puzzle.title}</h4>
                    <p className="text-xs text-emerald-800 font-bold">{puzzle.teluguTitle}</p>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{puzzle.description}</p>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Features:</span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {puzzle.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setActiveMedia({
                      isOpen: true,
                      title: puzzle.title,
                      teluguTitle: puzzle.teluguTitle,
                      category: 'Online Interactive Puzzle',
                      webUrl: puzzle.url,
                      description: `${puzzle.description} ${puzzle.teluguDescription}`,
                      keyPoints: puzzle.features
                    })}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Launch Puzzle Solver</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CALCSOLVER MASTER PORTAL */}
      {activeMainTab === 'calcsolver' && (
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <span>CalcSolver • Step-by-Step Math & Puzzle Engines</span>
              </h3>
              <p className="text-xs text-blue-900 font-medium">
                Universal CalcSolver suite with step-by-step arithmetic, algebra equations, WolframAlpha, GeoGebra, and Mathway.
              </p>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-xl border border-blue-200 text-xs font-black text-blue-900 shadow-2xs">
              🧮 CalcSolver Online
            </div>
          </div>

          {/* Interactive Quick CalcSolver Engine */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                <h4 className="font-black text-slate-900 text-sm">Interactive Quick CalcSolver Sandbox</h4>
              </div>
              <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">Live Evaluator</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={calcInput}
                onChange={(e) => setCalcInput(e.target.value)}
                placeholder="Enter math expression (e.g. 15 * 12 + 180 / 3)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
              />
              <button
                onClick={() => handleSolveMath()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
              >
                <Zap className="w-4 h-4" />
                <span>Solve with CalcSolver</span>
              </button>
            </div>

            {/* Quick Math Presets */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-black text-slate-500 text-[11px]">Quick Samples:</span>
              {[
                '25 * 4 + 150 / 5',
                '144 ** 0.5 + 3 ** 3',
                '(100 - 35) * 8',
                '3.14159 * 7 * 7'
              ].map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCalcInput(sample);
                    handleSolveMath(sample);
                  }}
                  className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold border border-slate-200 transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>

            {/* Solver Results Card */}
            {calcResult && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-500 uppercase">Calculated Output:</span>
                  <span className="text-lg font-black text-blue-700 font-mono bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                    = {calcResult}
                  </span>
                </div>
                <div className="space-y-1 pt-1 border-t border-slate-200">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Derivation Steps:</span>
                  {calcSteps.map((step, idx) => (
                    <p key={idx} className="text-xs font-medium text-slate-700 font-mono">{step}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CalcSolver External Portals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CALCSOLVER_AND_PUZZLES_DATA.filter(p => p.category === 'Math Solver').map((solver) => (
              <div
                key={solver.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {solver.badge}
                    </span>
                    <Calculator className="w-5 h-5 text-blue-600" />
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-base">{solver.title}</h4>
                    <p className="text-xs text-blue-800 font-bold">{solver.teluguTitle}</p>
                  </div>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{solver.description}</p>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Features:</span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {solver.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-blue-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setActiveMedia({
                      isOpen: true,
                      title: solver.title,
                      teluguTitle: solver.teluguTitle,
                      category: 'Online Math & Science Solver',
                      webUrl: solver.url,
                      description: `${solver.description} ${solver.teluguDescription}`,
                      keyPoints: solver.features
                    })}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-black py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Open {solver.title.split(' ')[0]}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FREE KIDS PORTALS & VIDEO LINKS */}
      {activeMainTab === 'portals' && (
        <div className="space-y-6">
          <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Tv className="w-5 h-5 text-purple-600" />
                <span>Free Kids Educational Game Portals & Video Hub</span>
              </h3>
              <p className="text-xs text-purple-900 font-medium">
                Direct verified launchpads to PBS Kids, ABCya!, Math Playground, PhET, National Geographic Kids, and Starfall.
              </p>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-xl border border-purple-200 text-xs font-black text-purple-900 shadow-2xs">
              🌐 6 Certified Portals
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FREE_KIDS_PORTALS.map((portal, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                      {portal.badge}
                    </span>
                    <span className="text-xs font-black text-slate-400">{portal.category}</span>
                  </div>

                  <h4 className="font-black text-slate-900 text-base">{portal.title}</h4>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{portal.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => setActiveMedia({
                      isOpen: true,
                      title: portal.title,
                      category: 'Free Kids Learning Portal',
                      webUrl: portal.url,
                      description: portal.description,
                      keyPoints: [
                        'Interactive student exercises and quizzes',
                        'Child-safe learning games and activities',
                        'Aligned with primary school cognitive milestones'
                      ]
                    })}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-black py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Launch Free Games</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Media Link Modal */}
      <MediaLinkModal
        isOpen={activeMedia.isOpen}
        onClose={() => setActiveMedia({ ...activeMedia, isOpen: false })}
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
