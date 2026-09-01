import React, { useState } from 'react';
import { EDUCATION_SUBJECTS } from '../data/mockData';
import { ClassGrade, SyllabusBoard, EducationSubject } from '../types';
import { TUTOR_QUICK_AI_LINKS } from '../data/worldAiChatbotsData';
import { GRADE_LESSONS_DATA, GradeLessonInfo } from '../data/gradeLessonsData';
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
  ArrowRight,
  Video,
  ExternalLink,
  FileText,
  Globe,
  Award,
  Layers,
  Bot,
  Mic,
  MessageSquare,
  Cpu,
  Puzzle,
  Gamepad2,
  Check
} from 'lucide-react';
import { MediaLinkModal } from './MediaLinkModal';

interface EducationHubProps {
  onAskAIAboutSubject: (subjectName: string, grade?: string) => void;
}

const ICON_COMPONENTS: Record<string, any> = {
  Calculator,
  FlaskConical,
  BookOpen,
  Code,
  Zap,
  Baby,
  GraduationCap,
  Sparkles,
  Layers,
  Award
};

export const EducationHub: React.FC<EducationHubProps> = ({ onAskAIAboutSubject }) => {
  const [activeViewMode, setActiveViewMode] = useState<'grade-directory' | 'all-subjects'>('grade-directory');
  const [selectedGradeTab, setSelectedGradeTab] = useState<string>('ukg');
  const [activeSubjectTabIdx, setActiveSubjectTabIdx] = useState<number>(0);
  const [activeSubjectSection, setActiveSubjectSection] = useState<'lessons' | 'exercises' | 'weblinks' | 'videos' | 'books' | 'games'>('lessons');

  // Interactive Grade Exercise State
  const [selectedExerciseAnswers, setSelectedExerciseAnswers] = useState<Record<string, number>>({});
  const [showExerciseExplanation, setShowExerciseExplanation] = useState<Record<string, boolean>>({});

  // All subjects filter state
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedBoard, setSelectedBoard] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuizSubject, setActiveQuizSubject] = useState<EducationSubject | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  // Media modal state
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

  const grades = ['All', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const boards = ['All', 'CBSE', 'State Board', 'ICSE', 'International'];

  const filteredSubjects = EDUCATION_SUBJECTS.filter((item) => {
    const matchesGrade = selectedGrade === 'All' || item.grade === selectedGrade;
    const matchesBoard = selectedBoard === 'All' || item.board === selectedBoard;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGrade && matchesBoard && matchesSearch;
  });

  const currentGradeData = GRADE_LESSONS_DATA.find(g => g.gradeId === selectedGradeTab) || GRADE_LESSONS_DATA[0];
  const currentSubject = currentGradeData.subjects[activeSubjectTabIdx] || currentGradeData.subjects[0];

  const handleOpenAglasemPortal = (url: string = 'https://schools.aglasem.com/', title: string = 'Aglasem Schools & NCERT Solutions Portal') => {
    setActiveMedia({
      isOpen: true,
      title: title,
      teluguTitle: 'అగ్లాసెమ్ ఎడ్యుకేషన్ పోర్టల్ & స్టడీ మెటీరియల్',
      category: 'Official Educational Partner Resource • Aglasem',
      webUrl: url,
      description: 'Aglasem is India’s premier education portal providing verified NCERT Solutions, CBSE & State Board Sample Papers, Chapter Notes, Question Banks, and Exam Updates for Classes LKG to 10th.',
      keyPoints: [
        'Complete Chapter-wise NCERT Textbook Solutions',
        'CBSE & State Board Model Question Papers & Marking Scheme',
        'Concise Revision Notes, Formulas & Mind Maps',
        'School Admission, Olympiad, and Scholarship Guides'
      ]
    });
  };

  const handleOpenVideoLesson = (sub: EducationSubject) => {
    setActiveMedia({
      isOpen: true,
      title: `${sub.title} - Video Lecture & Concept Breakdown`,
      teluguTitle: `${sub.grade} • ${sub.board} సిలబస్ వీడియో తరగతి`,
      category: `${sub.board} ${sub.grade} Video Masterclass`,
      videoUrl: sub.videoUrl || 'https://www.youtube.com/watch?v=live-demo-math8',
      webUrl: sub.aglasemUrl || 'https://schools.aglasem.com/',
      description: `Complete syllabus coverage for ${sub.title} (${sub.grade}, ${sub.board}). Covers core conceptual derivations, problem sets, and practical applications.`,
      keyPoints: sub.topics.map(t => `Detailed lesson & formula review on: ${t}`)
    });
  };

  const handleDownloadPDF = (sub: EducationSubject) => {
    setActiveMedia({
      isOpen: true,
      title: `${sub.title} Official Study Notes & E-Book`,
      teluguTitle: `${sub.grade} డిజిటల్ నోట్స్ & రివిజన్ పిడిఎఫ్`,
      category: 'NCERT / State Board Textbook',
      webUrl: sub.aglasemUrl || 'https://schools.aglasem.com/',
      description: `High-resolution printable chapter summaries, Aglasem textbook solutions, and practice exercises for ${sub.title}.`,
      keyPoints: [
        'Complete formula sheet and mind maps',
        'NCERT & Aglasem exemplar problems with step-by-step solutions',
        'Important board examination recurring questions',
        'Interactive AI doubt solving prompts'
      ]
    });
  };

  const handleExerciseSelect = (qIdx: number, optIdx: number) => {
    const key = `${selectedGradeTab}-${activeSubjectTabIdx}-${qIdx}`;
    setSelectedExerciseAnswers(prev => ({ ...prev, [key]: optIdx }));
    setShowExerciseExplanation(prev => ({ ...prev, [key]: true }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <GraduationCap className="w-4 h-4 text-amber-200" />
            <span>Grade-by-Grade Master Hub • UKG to 10th Class</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            📚 Easy Lessons, Exercises, Weblinks, Videos & Games
          </h2>
          <p className="text-sm text-orange-50 font-medium leading-relaxed">
            Grade-specific curriculum for <strong>UKG, 1st, 2nd, 3rd, 4th, 5th, and 6th to 10th Class</strong> with easy chapter notes, practice quizzes, free digital textbooks, video masterclasses, educational games, and <strong>CalcSolver</strong>.
          </p>
        </div>
        <div className="absolute right-4 bottom-0 opacity-15 pointer-events-none hidden md:block">
          <BookOpen className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Top View Toggle: Grade Directory vs All Subjects */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveViewMode('grade-directory')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeViewMode === 'grade-directory'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            🏛️ Grade-by-Grade Directory (UKG to 10th)
          </button>

          <button
            onClick={() => setActiveViewMode('all-subjects')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              activeViewMode === 'all-subjects'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            🔍 All Board Textbooks & Search
          </button>
        </div>

        {/* Quick CalcSolver Button */}
        <button
          onClick={() => setActiveMedia({
            isOpen: true,
            title: 'CalcSolver Universal Problem Solver',
            teluguTitle: 'క్యాల్క్‌సాల్వర్ గణిత సాధకం',
            category: 'Universal Math Solver',
            webUrl: 'https://www.wolframalpha.com/',
            description: 'Solve arithmetic, algebra equations, trigonometry, fractions, and scientific graphs step-by-step.',
            keyPoints: [
              'Step-by-step algebraic equation solver',
              'Graphing functions and geometry visualizer',
              'Fraction and decimal conversions',
              'Class 1 to 10 math homework assistant'
            ]
          })}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 transition-all cursor-pointer shadow-2xs"
        >
          <Calculator className="w-4 h-4 text-blue-600" />
          <span>🧮 Launch CalcSolver</span>
        </button>
      </div>

      {/* VIEW MODE 1: GRADE-BY-GRADE MASTER DIRECTORY */}
      {activeViewMode === 'grade-directory' && (
        <div className="space-y-6">
          {/* Top Kids Practice & Learning Portals Launchpad */}
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 rounded-3xl p-4 sm:p-5 border border-amber-200/80 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🌟</span>
                <div>
                  <h4 className="font-black text-slate-900 text-sm sm:text-base">Kids All Classes Practice & Visual Learning Portals</h4>
                  <p className="text-xs text-slate-600 font-medium">Instant interactive access to Kiddo Worksheets, hand2mind, and PBS KIDS for all grades.</p>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                Verified Global EdTech
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* Portal 1: Kiddo Worksheets */}
              <button
                onClick={() => setActiveMedia({
                  isOpen: true,
                  title: 'kiddoworksheets - Visual Treat Worksheets',
                  teluguTitle: 'కిడ్డో వర్క్‌షీట్స్ - సంఖ్యలు, అక్షరాల ట్రేసింగ్ & మోటార్ స్కిల్స్',
                  category: 'Visual Learning & Printable Sheets',
                  webUrl: 'https://www.kiddoworksheets.com',
                  description: 'Kiddo worksheets are a visual treat that will help teach your kids number and letter recognition, basic scientific principles, and tracing to improve fine motor skills.',
                  keyPoints: [
                    'Number & letter recognition with engaging visual illustrations',
                    'Fine motor skills tracing worksheets for early handwriting',
                    'Basic scientific principles, animal charts, and primary math printables'
                  ]
                })}
                className="bg-white p-3.5 rounded-2xl border border-rose-200 hover:border-rose-400 hover:shadow-xs transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                    Printable Worksheets
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div>
                  <h5 className="font-black text-slate-900 text-xs sm:text-sm">kiddoworksheets.com</h5>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    Letter & number tracing, basic science, and fine motor skills.
                  </p>
                </div>
              </button>

              {/* Portal 2: hand2mind */}
              <button
                onClick={() => setActiveMedia({
                  isOpen: true,
                  title: 'hand2mind - Manipulative-Based Educational Resources',
                  teluguTitle: 'హ్యాండ్‌2మైండ్ - హ్యాండ్స్-ఆన్ STEM & మ్యాథ్స్ మానిప్యులేటివ్స్',
                  category: 'Hands-On STEM & Math Kits',
                  webUrl: 'https://www.hand2mind.com',
                  description: 'Visit hand2mind - formerly ETA Cuisenaire - and browse our selection of manipulative based educational resources for PreK through grade 12 teachers and kids.',
                  keyPoints: [
                    'Hands-on math manipulatives: Cuisenaire rods, Base Ten blocks, Fraction tiles',
                    'STEM & Science investigation kits for experiential classroom learning',
                    'Literacy & Phonics multisensory tools for PreK through Grade 12'
                  ]
                })}
                className="bg-white p-3.5 rounded-2xl border border-amber-200 hover:border-amber-400 hover:shadow-xs transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                    PreK to Grade 12
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div>
                  <h5 className="font-black text-slate-900 text-xs sm:text-sm">hand2mind.com</h5>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    Manipulative based educational resources, Cuisenaire rods & STEM kits.
                  </p>
                </div>
              </button>

              {/* Portal 3: PBS KIDS */}
              <button
                onClick={() => setActiveMedia({
                  isOpen: true,
                  title: 'PBS KIDS - Educational Games & Shows',
                  teluguTitle: 'పిబిఎస్ కిడ్స్ - ఎడ్యుకేషనల్ గేమ్స్, సైన్స్ & రీడింగ్ షోలు',
                  category: 'Kids Video & Game Portal',
                  webUrl: 'https://pbskids.org',
                  description: 'Educational games and videos from Daniel Tiger’s Neighborhood, Wild Kratts, Curious George, and other beloved PBS KIDS shows!',
                  keyPoints: [
                    '100+ Free interactive learning games covering nature, math, and literacy',
                    'Child-safe, ad-free streaming videos and full episodes',
                    'Curriculum-designed tracks supporting cognitive development'
                  ]
                })}
                className="bg-white p-3.5 rounded-2xl border border-emerald-200 hover:border-emerald-400 hover:shadow-xs transition-all text-left flex flex-col justify-between space-y-2 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    100% Free Games
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div>
                  <h5 className="font-black text-slate-900 text-xs sm:text-sm">pbskids.org</h5>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-2 leading-relaxed">
                    Educational games and videos from Daniel Tiger, Wild Kratts & Arthur.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Grade Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {GRADE_LESSONS_DATA.map((g) => (
              <button
                key={g.gradeId}
                onClick={() => {
                  setSelectedGradeTab(g.gradeId);
                  setActiveSubjectTabIdx(0);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                  selectedGradeTab === g.gradeId
                    ? `bg-gradient-to-r ${g.color} text-white shadow-xs`
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <span>{g.gradeName.split(' ')[0]}</span>
                <span className="text-[10px] font-bold opacity-80">({g.ageRange.split(' ')[0]})</span>
              </button>
            ))}
          </div>

          {/* Active Grade Hero Card */}
          <div className={`${currentGradeData.bgLight} rounded-3xl p-6 border ${currentGradeData.borderColor} shadow-xs space-y-4`}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-slate-900 border border-slate-200 shadow-2xs">
                    {currentGradeData.badge}
                  </span>
                  <span className="text-xs font-bold text-slate-600">Age: {currentGradeData.ageRange}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentGradeData.gradeName}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  {currentGradeData.teluguGradeName} — {currentGradeData.description}
                </p>
              </div>

              {/* Subject Tabs */}
              <div className="flex items-center gap-1.5 flex-wrap bg-white/80 backdrop-blur-xs p-1.5 rounded-2xl border border-slate-200 shadow-2xs">
                {currentGradeData.subjects.map((sub, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSubjectTabIdx(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      activeSubjectTabIdx === idx
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {sub.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Inner Nav (Lessons, Exercises, Web Links, Video Links, Books, Games) */}
            <div className="pt-2 border-t border-slate-200/80">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <button
                  onClick={() => setActiveSubjectSection('lessons')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    activeSubjectSection === 'lessons'
                      ? 'bg-orange-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>📖 Easy Lessons & Key Points</span>
                </button>

                <button
                  onClick={() => setActiveSubjectSection('exercises')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    activeSubjectSection === 'exercises'
                      ? 'bg-orange-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>✍️ Practice Exercises ({currentSubject.exercises.length})</span>
                </button>

                <button
                  onClick={() => setActiveSubjectSection('weblinks')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    activeSubjectSection === 'weblinks'
                      ? 'bg-orange-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>🌐 Verified Web Links ({currentSubject.webLinks.length})</span>
                </button>

                <button
                  onClick={() => setActiveSubjectSection('videos')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    activeSubjectSection === 'videos'
                      ? 'bg-orange-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>🎬 Video Lectures ({currentSubject.videoLinks.length})</span>
                </button>

                <button
                  onClick={() => setActiveSubjectSection('books')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    activeSubjectSection === 'books'
                      ? 'bg-orange-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>📚 E-Books & Worksheets ({currentSubject.books.length})</span>
                </button>

                <button
                  onClick={() => setActiveSubjectSection('games')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                    activeSubjectSection === 'games'
                      ? 'bg-orange-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>🎮 Learning Games ({currentSubject.games.length})</span>
                </button>
              </div>
            </div>
          </div>

          {/* ACTIVE SUBJECT CONTENT AREA */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            {/* Header of Active Subject */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 flex-wrap gap-3">
              <div>
                <h4 className="text-xl font-black text-slate-900">{currentSubject.name}</h4>
                <p className="text-xs font-bold text-orange-700">{currentSubject.teluguName} • {currentSubject.summary}</p>
              </div>

              <button
                onClick={() => onAskAIAboutSubject(currentSubject.name, currentGradeData.gradeName)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-black py-2 px-4 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Bot className="w-4 h-4 text-amber-400" />
                <span>Ask AI Subject Tutor</span>
              </button>
            </div>

            {/* 1. EASY LESSONS */}
            {activeSubjectSection === 'lessons' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h5 className="font-black text-sm text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <span>Core Lesson Key Takeaways & Simple Explanations:</span>
                  </h5>
                  <div className="space-y-3">
                    {currentSubject.easyLessonKeyPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-orange-50/50 p-3.5 rounded-2xl border border-orange-100">
                        <span className="w-6 h-6 rounded-full bg-orange-600 text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h5 className="font-black text-xs text-slate-500 uppercase tracking-wider">Covered Topics in Syllabus:</h5>
                  <div className="flex flex-wrap gap-2">
                    {currentSubject.coreTopics.map((topic, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                        ✓ {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. PRACTICE EXERCISES */}
            {activeSubjectSection === 'exercises' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {currentSubject.exercises.map((ex, qIdx) => {
                    const key = `${selectedGradeTab}-${activeSubjectTabIdx}-${qIdx}`;
                    const selectedOpt = selectedExerciseAnswers[key];
                    const isAnswered = selectedOpt !== undefined;
                    const isCorrect = selectedOpt === ex.correctAnswer;

                    return (
                      <div key={qIdx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-black text-sm text-slate-900 leading-snug">
                            Q{qIdx + 1}. {ex.question}
                          </h5>
                          <span className="text-[10px] font-black text-orange-700 bg-orange-100 px-2 py-0.5 rounded-md">
                            Practice Quiz
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {ex.options.map((opt, optIdx) => {
                            const isThisSelected = selectedOpt === optIdx;
                            const isThisCorrect = optIdx === ex.correctAnswer;

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleExerciseSelect(qIdx, optIdx)}
                                className={`text-left p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                  isAnswered
                                    ? isThisCorrect
                                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                                      : isThisSelected
                                        ? 'bg-red-600 text-white border-red-600'
                                        : 'bg-white border-slate-200 text-slate-400 opacity-60'
                                    : 'bg-white border-slate-200 text-slate-800 hover:bg-orange-50 hover:border-orange-300'
                                }`}
                              >
                                {String.fromCharCode(65 + optIdx)}. {opt}
                              </button>
                            );
                          })}
                        </div>

                        {showExerciseExplanation[key] && (
                          <div className={`p-3.5 rounded-xl border text-xs font-medium space-y-1 ${
                            isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'
                          }`}>
                            <div className="flex items-center gap-1.5 font-black">
                              {isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <HelpCircle className="w-4 h-4 text-amber-600" />}
                              <span>{isCorrect ? 'Correct Answer! +50 Pts' : 'Review Explanation:'}</span>
                            </div>
                            <p>{ex.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. VERIFIED WEB LINKS */}
            {activeSubjectSection === 'weblinks' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSubject.webLinks.map((link, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                          {link.badge}
                        </span>
                        <Globe className="w-4 h-4 text-blue-600" />
                      </div>
                      <h5 className="font-black text-slate-900 text-sm">{link.title}</h5>
                      <p className="text-xs text-slate-600 font-medium">{link.desc}</p>
                    </div>

                    <button
                      onClick={() => setActiveMedia({
                        isOpen: true,
                        title: link.title,
                        category: 'Verified Web Learning Portal',
                        webUrl: link.url,
                        description: link.desc,
                        keyPoints: [
                          'Interactive student exercises and tests',
                          'Aligned with official syllabus curriculum',
                          'Direct step-by-step guides and solutions'
                        ]
                      })}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Open Website</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 4. VIDEO LECTURES */}
            {activeSubjectSection === 'videos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSubject.videoLinks.map((vid, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-800 px-2 py-0.5 rounded-md">
                          ⏱️ {vid.duration}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{vid.channel}</span>
                      </div>
                      <h5 className="font-black text-slate-900 text-sm leading-snug">{vid.title}</h5>
                    </div>

                    <button
                      onClick={() => setActiveMedia({
                        isOpen: true,
                        title: vid.title,
                        category: `${vid.channel} • Video Masterclass`,
                        videoUrl: vid.url,
                        description: `Comprehensive video lecture for ${currentSubject.name} (${currentGradeData.gradeName}).`,
                        keyPoints: currentSubject.easyLessonKeyPoints
                      })}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <PlayCircle className="w-4 h-4 fill-current" />
                      <span>Watch Video Lecture</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 5. DIGITAL BOOKS & E-LIBRARY */}
            {activeSubjectSection === 'books' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSubject.books.map((book, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                          {book.type}
                        </span>
                        <FileText className="w-4 h-4 text-emerald-600" />
                      </div>
                      <h5 className="font-black text-slate-900 text-sm">{book.title}</h5>
                      <p className="text-xs text-slate-500 font-bold">Author / Publisher: {book.author}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveMedia({
                          isOpen: true,
                          title: book.title,
                          category: `${book.type} Digital E-Book`,
                          webUrl: book.previewUrl,
                          description: `Free official e-textbook and practice reader for ${book.title}.`,
                          keyPoints: currentSubject.easyLessonKeyPoints
                        })}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read Book Online</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 6. LEARNING GAMES */}
            {activeSubjectSection === 'games' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSubject.games.map((game, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                          {game.type}
                        </span>
                        <Gamepad2 className="w-4 h-4 text-amber-600" />
                      </div>
                      <h5 className="font-black text-slate-900 text-sm">{game.title}</h5>
                      <p className="text-xs text-slate-600 font-medium">{game.description}</p>
                    </div>

                    <button
                      onClick={() => setActiveMedia({
                        isOpen: true,
                        title: game.title,
                        category: `${game.type} Interactive Game`,
                        webUrl: game.url,
                        description: game.description,
                        keyPoints: [
                          'Gamified learning aligned with syllabus',
                          'Immediate cognitive feedback',
                          '100% free and student friendly'
                        ]
                      })}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      <PlayCircle className="w-4 h-4 fill-current" />
                      <span>Play Educational Game</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: ALL SUBJECTS & SEARCH FILTER */}
      {activeViewMode === 'all-subjects' && (
        <div className="space-y-6">
          {/* Featured Aglasem Education Portal Section */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white border border-slate-700 shadow-lg relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-orange-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Official Educational Portal
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    ✓ Free NCERT Solutions & Sample Papers
                  </span>
                </div>
                
                <h3 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2 text-white">
                  <span>📖 Aglasem Education Hub</span>
                  <span className="text-xs bg-white/10 text-slate-300 px-2 py-0.5 rounded-md font-mono font-normal">
                    schools.aglasem.com
                  </span>
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Access comprehensive chapter-by-chapter NCERT Solutions, CBSE & State Board Question Banks, revision notes, sample papers, syllabus guides, and mock tests directly through Aglasem.
                </p>

                {/* Quick Links Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => handleOpenAglasemPortal('https://schools.aglasem.com/ncert/', 'Aglasem NCERT Solutions & Textbooks')}
                    className="bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/15 transition-colors flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                    <span>NCERT Solutions</span>
                  </button>

                  <button
                    onClick={() => handleOpenAglasemPortal('https://schools.aglasem.com/cbse-sample-papers/', 'Aglasem CBSE Sample Papers & Marking Scheme')}
                    className="bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/15 transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>CBSE Sample Papers</span>
                  </button>

                  <button
                    onClick={() => handleOpenAglasemPortal('https://schools.aglasem.com/notes/', 'Aglasem Chapter Revision Notes & Mind Maps')}
                    className="bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/15 transition-colors flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>Quick Revision Notes</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => handleOpenAglasemPortal('https://schools.aglasem.com/', 'Aglasem Schools & NCERT Solutions Portal')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xs sm:text-sm py-3 px-5 rounded-2xl shadow-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Launch Aglasem Portal</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search subject, topics, formulas (e.g. Fractions, Electricity, Telugu, Acids)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 font-medium"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="px-3 py-2 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                >
                  {grades.map((g) => (
                    <option key={g} value={g}>{g === 'All' ? 'All Classes (LKG-10)' : g}</option>
                  ))}
                </select>

                <select
                  value={selectedBoard}
                  onChange={(e) => setSelectedBoard(e.target.value)}
                  className="px-3 py-2 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-orange-500"
                >
                  {boards.map((b) => (
                    <option key={b} value={b}>{b === 'All' ? 'All Boards' : b}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Subject Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSubjects.map((sub) => {
              const IconComp = ICON_COMPONENTS[sub.icon] || BookOpen;

              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="p-2.5 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {sub.grade}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                          {sub.board}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-black text-slate-900 text-base leading-snug">{sub.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{sub.chaptersCount} Chapters • Free Study Pack</p>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Key Syllabus Topics:</span>
                      <ul className="text-xs text-slate-600 space-y-1">
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
                    <div className="grid grid-cols-3 gap-1.5">
                      <button 
                        onClick={() => handleOpenVideoLesson(sub)}
                        className="flex items-center justify-center gap-1 bg-orange-50 hover:bg-orange-100 text-orange-700 text-[11px] font-bold py-2 px-2 rounded-xl border border-orange-200 transition-colors cursor-pointer"
                      >
                        <Video className="w-3.5 h-3.5 text-orange-600" />
                        <span>Video</span>
                      </button>

                      <button 
                        onClick={() => handleDownloadPDF(sub)}
                        className="flex items-center justify-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-bold py-2 px-2 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-slate-600" />
                        <span>E-Notes</span>
                      </button>

                      <button 
                        onClick={() => setActiveQuizSubject(sub)}
                        className="flex items-center justify-center gap-1 bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-bold py-2 px-2 rounded-xl transition-colors shadow-2xs cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Quiz</span>
                      </button>
                    </div>

                    {/* Aglasem Direct Link Button */}
                    <button
                      onClick={() => handleOpenAglasemPortal(sub.aglasemUrl || 'https://schools.aglasem.com/', `${sub.title} • Aglasem Solutions & Papers`)}
                      className="w-full flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold py-2 px-3 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      <Globe className="w-3.5 h-3.5 text-amber-700" />
                      <span>Aglasem Solutions ({sub.grade})</span>
                      <ExternalLink className="w-3 h-3 text-amber-700 ml-auto" />
                    </button>

                    <button
                      onClick={() => onAskAIAboutSubject(sub.title, sub.grade)}
                      className="w-full flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-black py-2.5 px-3 rounded-xl text-xs shadow-2xs transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ask AI Tutor Doubts</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Media Link Modal for Video Lessons & Notes & Aglasem Links */}
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
                className="text-slate-400 hover:text-slate-700 font-bold p-1 rounded-lg cursor-pointer"
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
                    className={`w-full text-left p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
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
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-black py-3 rounded-2xl text-xs transition-colors shadow-xs cursor-pointer"
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
