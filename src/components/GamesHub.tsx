import React, { useState } from 'react';
import { 
  Sparkles, 
  Trophy, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  Award, 
  Calculator, 
  BookOpen, 
  FlaskConical 
} from 'lucide-react';

export const GamesHub: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'math' | 'gita' | 'science'>('math');
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const mathQuestions = [
    { q: 'What is 15 × 8?', options: ['120', '110', '130', '100'], correct: 0 },
    { q: 'If a triangle has angles 60° and 70°, what is the 3rd angle?', options: ['40°', '50°', '60°', '70°'], correct: 1 },
    { q: 'What is 3/4 of 100?', options: ['25', '50', '75', '80'], correct: 2 }
  ];

  const gitaQuestions = [
    { q: 'In Gita 2.47, what should we focus on?', options: ['Result / Marks', 'Sincere Duty / Effort', 'Worrying', 'Resting'], correct: 1 },
    { q: 'What is the key takeaway of self-discipline?', options: ['Mind is your friend when disciplined', 'Give up easily', 'Depend on luck', 'Blame others'], correct: 0 }
  ];

  const scienceQuestions = [
    { q: 'Which gas do plants absorb during photosynthesis?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], correct: 1 },
    { q: 'Which sensor measures distance using sound waves?', options: ['IR Sensor', 'Ultrasonic Sensor', 'Light Sensor', 'Temperature Sensor'], correct: 1 }
  ];

  const activeQuestions = activeGame === 'math' 
    ? mathQuestions 
    : activeGame === 'gita' 
      ? gitaQuestions 
      : scienceQuestions;

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

  const resetGame = (gameType: 'math' | 'gita' | 'science') => {
    setActiveGame(gameType);
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Educational Games & Competitions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            🎮 Games & Activity Arena
          </h2>
          <p className="text-sm text-orange-50 font-medium">
            Fun educational games, math sprints, cultural quizzes, and problem-solving challenges to earn star badges.
          </p>
        </div>
      </div>

      {/* Game Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => resetGame('math')}
          className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
            activeGame === 'math'
              ? 'bg-orange-600 text-white border-orange-600 shadow-xs font-bold'
              : 'bg-white border-slate-200 text-slate-800 hover:bg-orange-50 hover:border-orange-200'
          }`}
        >
          <div className={`p-2.5 rounded-xl ${activeGame === 'math' ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600'}`}>
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-sm">Math Sprint Challenge</h3>
            <p className={`text-xs ${activeGame === 'math' ? 'text-orange-100' : 'text-slate-500'}`}>Class 1 to 10 Speed Math</p>
          </div>
        </button>

        <button
          onClick={() => resetGame('gita')}
          className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
            activeGame === 'gita'
              ? 'bg-orange-600 text-white border-orange-600 shadow-xs font-bold'
              : 'bg-white border-slate-200 text-slate-800 hover:bg-orange-50 hover:border-orange-200'
          }`}
        >
          <div className={`p-2.5 rounded-xl ${activeGame === 'gita' ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600'}`}>
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-sm">Gita & Cultural Quiz</h3>
            <p className={`text-xs ${activeGame === 'gita' ? 'text-orange-100' : 'text-slate-500'}`}>Values & Wisdom Questions</p>
          </div>
        </button>

        <button
          onClick={() => resetGame('science')}
          className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
            activeGame === 'science'
              ? 'bg-orange-600 text-white border-orange-600 shadow-xs font-bold'
              : 'bg-white border-slate-200 text-slate-800 hover:bg-orange-50 hover:border-orange-200'
          }`}
        >
          <div className={`p-2.5 rounded-xl ${activeGame === 'science' ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600'}`}>
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-sm">Science & Robotics Trivia</h3>
            <p className={`text-xs ${activeGame === 'science' ? 'text-orange-100' : 'text-slate-500'}`}>Circuits & Nature Trivia</p>
          </div>
        </button>
      </div>

      {/* Game Play Card */}
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
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
