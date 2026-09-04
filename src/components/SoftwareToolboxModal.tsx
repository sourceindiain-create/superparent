import React, { useState, useEffect } from 'react';
import { 
  X, 
  Timer, 
  Calculator, 
  FileText, 
  BookOpen, 
  Play, 
  Pause, 
  RotateCcw, 
  Copy, 
  Check, 
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { AppThemeId } from '../types';
import { APP_THEMES } from '../data/themes';

interface SoftwareToolboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: AppThemeId;
  currentGrade?: string;
  onSelectBoard?: (board: string) => void;
}

export const SoftwareToolboxModal: React.FC<SoftwareToolboxModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  currentGrade = 'Class 8',
  onSelectBoard
}) => {
  const [activeTool, setActiveTool] = useState<'timer' | 'calculator' | 'scratchpad' | 'board'>('timer');
  const theme = APP_THEMES[currentTheme] || APP_THEMES['gurukul-amber'];

  // 1. Pomodoro Timer State
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'study' | 'short-break' | 'long-break'>('study');
  const [completedSessions, setCompletedSessions] = useState(2);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      if (timerMode === 'study') {
        setCompletedSessions(prev => prev + 1);
        setTimerMode('short-break');
        setTimerSeconds(5 * 60);
      } else {
        setTimerMode('study');
        setTimerSeconds(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, timerMode]);

  const handleSetTimerMode = (mode: 'study' | 'short-break' | 'long-break') => {
    setTimerMode(mode);
    setIsTimerRunning(false);
    if (mode === 'study') setTimerSeconds(25 * 60);
    else if (mode === 'short-break') setTimerSeconds(5 * 60);
    else setTimerSeconds(15 * 60);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // 2. Calculator State
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcFormula, setCalcFormula] = useState('');

  const handleCalcButton = (val: string) => {
    if (val === 'C') {
      setCalcDisplay('0');
      setCalcFormula('');
    } else if (val === 'DEL') {
      setCalcDisplay(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (val === '=') {
      try {
        // Safe basic arithmetic evaluation
        const sanitized = calcDisplay.replace(/×/g, '*').replace(/÷/g, '/');
        // Validate expression contains only safe characters
        if (/^[0-9+\-*/.() ]+$/.test(sanitized)) {
          // eslint-disable-next-line no-eval
          const result = Function(`'use strict'; return (${sanitized})`)();
          setCalcFormula(calcDisplay + ' =');
          setCalcDisplay(String(Number(result.toFixed(6))));
        }
      } catch (err) {
        setCalcDisplay('Error');
      }
    } else if (['+', '-', '×', '÷'].includes(val)) {
      setCalcDisplay(prev => (prev === '0' ? '0' : prev + val));
    } else if (val === '√') {
      try {
        const num = parseFloat(calcDisplay);
        if (num >= 0) {
          setCalcFormula(`√(${calcDisplay})`);
          setCalcDisplay(String(Number(Math.sqrt(num).toFixed(6))));
        }
      } catch (e) {
        setCalcDisplay('Error');
      }
    } else if (val === 'x²') {
      try {
        const num = parseFloat(calcDisplay);
        setCalcFormula(`sqr(${calcDisplay})`);
        setCalcDisplay(String(Number((num * num).toFixed(6))));
      } catch (e) {
        setCalcDisplay('Error');
      }
    } else {
      setCalcDisplay(prev => (prev === '0' || prev === 'Error' ? val : prev + val));
    }
  };

  // 3. Scratchpad Notes State
  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem('sp_student_scratchpad') || 
      '• Rational Numbers: Properties of closure and commutativity\n• Light: Laws of reflection: ∠i = ∠r\n• Bhagavad Gita Chapter 2, Shloka 47: Karmanye Vadhikaraste\n• Robotics: Ultrasonic trigger pin 9, echo pin 10';
  });
  const [copiedNotes, setCopiedNotes] = useState(false);

  const handleSaveNotes = (text: string) => {
    setNotes(text);
    localStorage.setItem('sp_student_scratchpad', text);
  };

  const handleCopyNotes = () => {
    navigator.clipboard.writeText(notes);
    setCopiedNotes(true);
    setTimeout(() => setCopiedNotes(false), 2000);
  };

  // 4. Board & Syllabus State
  const [selectedBoard, setSelectedBoard] = useState('CBSE');
  const [selectedCurriculum, setSelectedCurriculum] = useState('CBSE Class 8 Integrated');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        style={{ borderColor: theme.border }}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black shadow-sm"
              style={{ background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})` }}
            >
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">EdTech Software Tools</h3>
                <span 
                  className="text-[10px] font-black px-2 py-0.5 rounded-md uppercase"
                  style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
                >
                  {theme.brandTag || 'Pro Suite'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Study Focus Timer, Calculator, Fast Scratchpad & Board Selector</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-1.5 p-2 bg-slate-100/70 border-b border-slate-200 overflow-x-auto no-scrollbar">
          {[
            { id: 'timer', label: 'Pomodoro Timer', icon: Timer },
            { id: 'calculator', label: 'Math Calculator', icon: Calculator },
            { id: 'scratchpad', label: 'Quick Scratchpad', icon: FileText },
            { id: 'board', label: 'Board & Syllabus', icon: BookOpen }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTool === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTool(tab.id as any)}
                style={{
                  backgroundColor: isActive ? theme.primary : undefined,
                  color: isActive ? '#ffffff' : undefined
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  isActive ? 'shadow-xs' : 'text-slate-600 hover:bg-white/80 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Tool Body */}
        <div className="p-5 overflow-y-auto flex-1">
          
          {/* 1. POMODORO TIMER */}
          {activeTool === 'timer' && (
            <div className="flex flex-col items-center justify-center py-4 space-y-6">
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
                <button
                  onClick={() => handleSetTimerMode('study')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    timerMode === 'study' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  📖 25m Focus
                </button>
                <button
                  onClick={() => handleSetTimerMode('short-break')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    timerMode === 'short-break' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  ☕ 5m Short Break
                </button>
                <button
                  onClick={() => handleSetTimerMode('long-break')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    timerMode === 'long-break' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  🧘 15m Deep Rest
                </button>
              </div>

              {/* Big Digital Clock */}
              <div 
                className="w-56 h-56 rounded-full border-4 flex flex-col items-center justify-center relative shadow-inner bg-slate-50"
                style={{ borderColor: theme.primary }}
              >
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-wider text-slate-900">
                  {formatTime(timerSeconds)}
                </span>
                <span className="text-xs font-black uppercase tracking-wider mt-2 text-slate-500">
                  {timerMode === 'study' ? 'Study Interval' : 'Resting Interval'}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 mt-1">
                  ⭐ {completedSessions} Intervals Completed
                </span>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  style={{ backgroundColor: theme.primary }}
                  className="px-6 py-2.5 rounded-2xl text-white font-black text-sm shadow-md flex items-center gap-2 hover:opacity-95 transition-all cursor-pointer active:scale-95"
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pause Timer' : 'Start Focus'}</span>
                </button>
                <button
                  onClick={() => handleSetTimerMode(timerMode)}
                  className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* 2. MATH CALCULATOR */}
          {activeTool === 'calculator' && (
            <div className="max-w-sm mx-auto space-y-4">
              <div className="p-4 bg-slate-900 rounded-2xl text-right space-y-1 shadow-inner">
                <div className="text-xs text-slate-400 font-mono min-h-[16px]">{calcFormula}</div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono truncate">{calcDisplay}</div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {['C', 'DEL', '√', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', 'x²', '='].map((btn, bIdx) => {
                  const isAction = ['C', 'DEL', '√', 'x²'].includes(btn);
                  const isOperator = ['÷', '×', '-', '+'].includes(btn);
                  const isEquals = btn === '=';
                  return (
                    <button
                      key={bIdx}
                      onClick={() => handleCalcButton(btn)}
                      style={{
                        backgroundColor: isEquals ? theme.primary : undefined,
                        color: isEquals ? '#ffffff' : undefined
                      }}
                      className={`h-12 rounded-xl text-sm font-black transition-all cursor-pointer active:scale-95 flex items-center justify-center ${
                        isEquals
                          ? 'shadow-md'
                          : isOperator
                            ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                            : isAction
                              ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                      }`}
                    >
                      {btn}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. STUDENT SCRATCHPAD */}
          {activeTool === 'scratchpad' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Student Study Scratchpad</h4>
                  <p className="text-xs text-slate-500">Auto-saved to your local device memory</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyNotes}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedNotes ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNotes ? 'Copied!' : 'Copy Notes'}</span>
                  </button>
                  <button
                    onClick={() => handleSaveNotes('')}
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors cursor-pointer"
                    title="Clear Notes"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <textarea
                value={notes}
                onChange={(e) => handleSaveNotes(e.target.value)}
                placeholder="Type your lecture notes, formulas, questions to ask tutors, or Bhagavad Gita reflections..."
                className="w-full h-64 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all resize-none"
                style={{ focusRing: theme.ring }}
              />
            </div>
          )}

          {/* 4. BOARD & SYLLABUS SELECTOR */}
          {activeTool === 'board' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Choose Educational Board & Curriculum</h4>
                <p className="text-xs text-slate-500">Dynamic syllabus aligned with NCERT, State Textbooks, and Olympiad modules</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'CBSE',
                    title: 'CBSE (NCERT Aligned)',
                    desc: 'Central Board syllabus with interactive science, mathematics and coding.',
                    tag: 'National Benchmark'
                  },
                  {
                    id: 'AP-State',
                    title: 'AP & TS State Board',
                    desc: 'SCERT bilingual Telugu & English textbooks, moral stories and exams.',
                    tag: 'Bilingual Telugu'
                  },
                  {
                    id: 'ICSE',
                    title: 'ICSE / CISCE',
                    desc: 'In-depth English literature, environmental science and advanced lab concepts.',
                    tag: 'Comprehensive'
                  },
                  {
                    id: 'Olympiad-IIT',
                    title: 'IIT-JEE & NEET Foundation',
                    desc: 'Conceptual speed math, NTSE, IMO, NSO, and logical reasoning drill.',
                    tag: 'Competitive Edge'
                  }
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedBoard(b.id);
                      if (onSelectBoard) onSelectBoard(b.id);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      selectedBoard === b.id
                        ? 'bg-slate-50 border-orange-500 ring-2 ring-orange-200'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">{b.title}</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                        {b.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{b.desc}</p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-bold text-slate-400">Current Grade: {currentGrade}</span>
                      {selectedBoard === b.id && (
                        <span className="text-xs font-black text-orange-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active Board</span>
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
