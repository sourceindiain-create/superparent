import React, { useState } from 'react';
import { EDUCATION_SUBJECTS } from '../data/mockData';
import { ClassGrade, SyllabusBoard, EducationSubject } from '../types';
import { 
  BookOpen, 
  Search, 
  Download, 
  PlayCircle, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  GraduationCap, 
  Calculator, 
  FlaskConical, 
  Code, 
  Zap, 
  Baby, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface EducationHubProps {
  onAskAIAboutSubject: (subjectName: string) => void;
}

const ICON_COMPONENTS: Record<string, any> = {
  Calculator,
  FlaskConical,
  BookOpen,
  Code,
  Zap,
  Baby
};

export const EducationHub: React.FC<EducationHubProps> = ({ onAskAIAboutSubject }) => {
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedBoard, setSelectedBoard] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuizSubject, setActiveQuizSubject] = useState<EducationSubject | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const grades = ['All', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const boards = ['All', 'CBSE', 'State Board', 'ICSE', 'International'];

  const filteredSubjects = EDUCATION_SUBJECTS.filter((item) => {
    const matchesGrade = selectedGrade === 'All' || item.grade === selectedGrade;
    const matchesBoard = selectedBoard === 'All' || item.board === selectedBoard;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGrade && matchesBoard && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <GraduationCap className="w-4 h-4 text-amber-200" />
            <span>Syllabus Hub • LKG to 10th Class</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            📚 Education Hub & Digital Textbooks
          </h2>
          <p className="text-sm text-orange-50 font-medium">
            State Board, CBSE, ICSE & International syllabus textbooks, notes, video lessons, and instant AI doubt solving.
          </p>
        </div>
        <div className="absolute right-4 bottom-0 opacity-15 pointer-events-none hidden md:block">
          <BookOpen className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Filter Bar in Clean White & Orange */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subject, chapter or topic..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none"
            />
          </div>

          {/* Board Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap mr-1">Board:</span>
            {boards.map((board) => (
              <button
                key={board}
                onClick={() => setSelectedBoard(board)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedBoard === board
                    ? 'bg-orange-600 text-white shadow-xs font-black'
                    : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
                }`}
              >
                {board}
              </button>
            ))}
          </div>
        </div>

        {/* Grade Selector Pills */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-xs font-black text-slate-600 uppercase tracking-wider block mb-2">
            Select Class / Grade:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {grades.map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedGrade === grade
                    ? 'bg-orange-600 text-white shadow-xs font-black'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-orange-50 hover:text-orange-700'
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subjects Grid in Crisp White Software Cards with Orange Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((sub) => {
          const IconComp = ICON_COMPONENTS[sub.icon] || BookOpen;
          return (
            <div
              key={sub.id}
              className="bg-white rounded-3xl border border-slate-200 hover:border-orange-400 p-5 shadow-xs hover:shadow-orange-card transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold border border-orange-200 shadow-2xs">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      {sub.grade}
                    </span>
                    <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {sub.board}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-black text-slate-900 text-base leading-snug">
                    {sub.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mt-1">
                    {sub.chaptersCount} Chapters • Free Learning Resources
                  </p>
                </div>

                <div className="bg-orange-50/50 p-3 rounded-2xl border border-orange-100 space-y-1.5">
                  <span className="text-[10px] font-black text-orange-700 uppercase tracking-wider block">
                    Key Topics Covered:
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1">
                    {sub.topics.map((t, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span>
                        <span className="truncate">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => alert(`Downloading ${sub.title} study notes PDF...`)}
                    className="flex items-center justify-center gap-1.5 bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-700 text-xs font-bold py-2 px-3 rounded-xl border border-slate-200 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-orange-600" />
                    <span>Download PDF</span>
                  </button>

                  <button 
                    onClick={() => setActiveQuizSubject(sub)}
                    className="flex items-center justify-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors shadow-2xs"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Practice Quiz</span>
                  </button>
                </div>

                <button
                  onClick={() => onAskAIAboutSubject(sub.title)}
                  className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-black py-2.5 px-3 rounded-xl text-xs shadow-2xs transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ask AI Tutor Doubts ({sub.title})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Practice Quiz Modal */}
      {activeQuizSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-200 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-orange-600" />
                <span>{activeQuizSubject.title} Quiz</span>
              </h3>
              <button 
                onClick={() => {
                  setActiveQuizSubject(null);
                  setQuizAnswer(null);
                  setQuizSubmitted(false);
                }}
                className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-800">
                Sample Question: Which topic is fundamental to {activeQuizSubject.title}?
              </p>

              <div className="space-y-2">
                {activeQuizSubject.topics.slice(0, 3).map((topic, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuizAnswer(idx)}
                    className={`w-full text-left p-3 rounded-2xl border text-xs font-semibold transition-all ${
                      quizAnswer === idx
                        ? 'bg-orange-600 text-white border-orange-600 font-bold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-orange-50'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}. {topic}
                  </button>
                ))}
              </div>

              {!quizSubmitted ? (
                <button
                  disabled={quizAnswer === null}
                  onClick={() => setQuizSubmitted(true)}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-black py-3 rounded-2xl text-xs transition-colors shadow-xs"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="bg-orange-50 border border-orange-200 text-slate-800 p-3.5 rounded-2xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-black text-orange-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Great effort! +20 Points added to your Child Growth Map!</span>
                  </div>
                  <p className="text-slate-600">Keep practicing daily to earn digital Gurukul certificates.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
