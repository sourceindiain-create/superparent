import React, { useState } from 'react';
import { EDUCATION_SUBJECTS } from '../data/mockData';
import { ClassGrade, SyllabusBoard, EducationSubject } from '../types';
import { TUTOR_QUICK_AI_LINKS } from '../data/worldAiChatbotsData';
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
  MessageSquare
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
  Baby
};

export const EducationHub: React.FC<EducationHubProps> = ({ onAskAIAboutSubject }) => {
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
            State Board, CBSE, ICSE & International syllabus textbooks, Aglasem study materials, notes, video lessons, and instant AI doubt solving.
          </p>
        </div>
        <div className="absolute right-4 bottom-0 opacity-15 pointer-events-none hidden md:block">
          <BookOpen className="w-64 h-64 text-white" />
        </div>
      </div>

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
                onClick={() => handleOpenAglasemPortal('https://schools.aglasem.com/sample-papers/', 'Aglasem CBSE & State Board Sample Papers')}
                className="bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/15 transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Sample Question Papers</span>
              </button>

              <button
                onClick={() => handleOpenAglasemPortal('https://schools.aglasem.com/notes/', 'Aglasem Quick Revision Notes & Formulas')}
                className="bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/15 transition-colors flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Revision Notes & Mind Maps</span>
              </button>

              <button
                onClick={() => handleOpenAglasemPortal('https://schools.aglasem.com/mock-test/', 'Aglasem Mock Tests & Olympiads')}
                className="bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/15 transition-colors flex items-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>Online Mock Tests</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
            <button
              onClick={() => handleOpenAglasemPortal('https://schools.aglasem.com/', 'Aglasem Schools Main Portal')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-black px-5 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-orange-glow transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>Explore Aglasem Portal</span>
            </button>
            
            <a
              href="https://schools.aglasem.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center justify-center gap-2 border border-white/20 transition-all"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
            </a>
          </div>
        </div>
      </div>

      {/* AI TUTOR & HOMEWORK SOLUTIONS SUITE (Answers AI, ChatGPT, Perplexity, Google AI, All Solutions AI, Voice AI) */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-5 sm:p-6 text-white shadow-md border border-orange-400/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-white text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 text-orange-600" /> AI Tutor Menu
              </span>
              <span className="text-xs text-orange-100 font-semibold">
                Direct Solve Links & Voice Mode
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1">
              ⚡ Instant AI Solutions, Answers AI, ChatGPT & Voice Mentors
            </h3>
            <p className="text-xs text-orange-100 mt-0.5">
              1-Click solve homework questions, step-by-step math derivations, science formulas, voice tutoring & exam practice.
            </p>
          </div>
          <button
            onClick={() => onAskAIAboutSubject('General Homework & Solutions', 'All')}
            className="bg-slate-900 hover:bg-slate-800 text-amber-300 font-black px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 shrink-0 border border-amber-400/40 shadow-sm transition-all"
          >
            <Bot className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Open Super AI Chatbot</span>
          </button>
        </div>

        {/* Quick Launch Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {TUTOR_QUICK_AI_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/10 hover:bg-white/20 border border-white/20 hover:border-amber-300 rounded-2xl p-3 text-left transition-all transform hover:-translate-y-0.5 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-black bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-md">
                    {link.badge.split(' ')[0]} {link.badge.split(' ')[1] || ''}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-orange-200 group-hover:text-white" />
                </div>
                <div className="font-black text-xs text-white group-hover:text-amber-200 leading-tight">
                  {link.name}
                </div>
                <div className="text-[10px] text-orange-100 line-clamp-1 mt-0.5">
                  {link.subtitle}
                </div>
              </div>
              <div className="mt-2.5 text-[9px] font-bold text-amber-200 bg-black/20 group-hover:bg-black/30 px-2 py-1 rounded-lg text-center flex items-center justify-center gap-1">
                <span>Solve Now</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </div>
            </a>
          ))}
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
                <div className="grid grid-cols-3 gap-1.5">
                  <button 
                    onClick={() => handleOpenVideoLesson(sub)}
                    className="flex items-center justify-center gap-1 bg-orange-50 hover:bg-orange-100 text-orange-700 text-[11px] font-bold py-2 px-2 rounded-xl border border-orange-200 transition-colors"
                  >
                    <Video className="w-3.5 h-3.5 text-orange-600" />
                    <span>Watch Video</span>
                  </button>

                  <button 
                    onClick={() => handleDownloadPDF(sub)}
                    className="flex items-center justify-center gap-1 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-bold py-2 px-2 rounded-xl border border-slate-200 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-600" />
                    <span>E-Notes</span>
                  </button>

                  <button 
                    onClick={() => setActiveQuizSubject(sub)}
                    className="flex items-center justify-center gap-1 bg-orange-600 hover:bg-orange-700 text-white text-[11px] font-bold py-2 px-2 rounded-xl transition-colors shadow-2xs"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Quiz</span>
                  </button>
                </div>

                {/* Aglasem Direct Link Button */}
                <button
                  onClick={() => handleOpenAglasemPortal(sub.aglasemUrl || 'https://schools.aglasem.com/', `${sub.title} • Aglasem Solutions & Papers`)}
                  className="w-full flex items-center justify-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold py-2 px-3 rounded-xl text-xs transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-700" />
                  <span>Aglasem Solutions & Papers ({sub.grade})</span>
                  <ExternalLink className="w-3 h-3 text-amber-700 ml-auto" />
                </button>

                <button
                  onClick={() => onAskAIAboutSubject(sub.title, sub.grade)}
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
