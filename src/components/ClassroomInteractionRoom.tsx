import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  Users, 
  BookOpen, 
  Sparkles, 
  MessageSquare, 
  Send, 
  Mic, 
  MicOff, 
  Hand, 
  Download, 
  ExternalLink, 
  Tv, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Search, 
  PenTool, 
  RotateCcw, 
  Layers, 
  GraduationCap,
  Globe,
  Share2,
  Award,
  Zap,
  Bookmark
} from 'lucide-react';
import { SyllabusBoard, ClassGrade } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface LiveSession {
  id: string;
  title: string;
  teluguTitle: string;
  subject: string;
  grade: ClassGrade;
  board: SyllabusBoard;
  teacher: string;
  timeSlot: string;
  status: 'live' | 'upcoming' | 'recorded';
  zoomLink: string;
  googleClassroomCode: string;
  meetLink: string;
  youtubeLiveUrl: string;
  attendeesCount: number;
  topicsCovered: string[];
}

interface BoardResource {
  id: string;
  board: SyllabusBoard;
  title: string;
  teluguTitle: string;
  officialPortal: string;
  freeWebsites: { name: string; url: string; badge: string; desc: string }[];
  notesAndEbooks: { title: string; type: string; url: string; size: string }[];
  keyHighlights: string[];
}

const LIVE_SESSIONS: LiveSession[] = [
  {
    id: 'live-math-8',
    title: 'Class 8 Speed Mathematics & Linear Equations',
    teluguTitle: '8వ తరగతి మ్యాథ్స్ - సరళ సమీకరణాలు & వేగవంతమైన లెక్కలు',
    subject: 'Mathematics',
    grade: 'Class 8',
    board: 'CBSE',
    teacher: 'Prof. K. V. Raman (Gold Medalist)',
    timeSlot: 'Live Now (10:00 AM - 11:30 AM)',
    status: 'live',
    zoomLink: 'https://zoom.us/j/free-super-parent-math8',
    googleClassroomCode: 'sp-math8-cbse',
    meetLink: 'https://meet.google.com/sp-gurukul-math8',
    youtubeLiveUrl: 'https://www.youtube.com/watch?v=live-demo-math8',
    attendeesCount: 248,
    topicsCovered: ['Solving equations with variables on both sides', 'Practical application word problems', 'Vedic shortcut methods']
  },
  {
    id: 'live-phy-10',
    title: 'Class 10 Physics: Light Reflection & Refraction Simulator',
    teluguTitle: '10వ తరగతి ఫిజిక్స్: కాంతి పరావర్తనం & వక్రీభవనం',
    subject: 'Physics',
    grade: 'Class 10',
    board: 'ICSE',
    teacher: 'Dr. Ananya Sen (Ex-IIT Mentor)',
    timeSlot: 'Live Now (11:00 AM - 12:30 PM)',
    status: 'live',
    zoomLink: 'https://zoom.us/j/free-super-parent-phy10',
    googleClassroomCode: 'sp-phy10-icse',
    meetLink: 'https://meet.google.com/sp-gurukul-phy10',
    youtubeLiveUrl: 'https://www.youtube.com/watch?v=live-demo-phy10',
    attendeesCount: 312,
    topicsCovered: ['Ray diagrams for concave & convex mirrors', 'Lens formula & magnification', 'Board numericals']
  },
  {
    id: 'live-ib-chem',
    title: 'IB MYP / DP: Stoichiometry & Chemical Bonding Mastery',
    teluguTitle: 'IB అంతర్జాతీయ కెమిస్ట్రీ & రసాయన బంధాలు',
    subject: 'Chemistry',
    grade: 'Class 9',
    board: 'IB',
    teacher: 'Sarah Jenkins (IB World School Certified)',
    timeSlot: 'Today 02:00 PM - 03:30 PM',
    status: 'upcoming',
    zoomLink: 'https://zoom.us/j/free-super-parent-ibchem',
    googleClassroomCode: 'sp-ib-chem9',
    meetLink: 'https://meet.google.com/sp-gurukul-ibchem',
    youtubeLiveUrl: 'https://www.youtube.com/watch?v=live-demo-ibchem',
    attendeesCount: 180,
    topicsCovered: ['Mole concept calculations', 'Lewis dot structures', 'Electronegativity trends']
  },
  {
    id: 'live-cambridge-bio',
    title: 'Cambridge IGCSE Biology: Human Physiology & Genetics',
    teluguTitle: 'కేంబ్రిడ్జ్ IGCSE బయాలజీ - జన్యుశాస్త్రం & మానవ శరీరం',
    subject: 'Biology',
    grade: 'Class 10',
    board: 'Cambridge',
    teacher: 'Dr. Richard Alpert (Cambridge Fellow)',
    timeSlot: 'Today 04:00 PM - 05:30 PM',
    status: 'upcoming',
    zoomLink: 'https://zoom.us/j/free-super-parent-igcsebio',
    googleClassroomCode: 'sp-cambridge-bio10',
    meetLink: 'https://meet.google.com/sp-gurukul-cambridgebio',
    youtubeLiveUrl: 'https://www.youtube.com/watch?v=live-demo-cambridgebio',
    attendeesCount: 195,
    topicsCovered: ['Punnett squares & Mendelian inheritance', 'Cell division meiosis vs mitosis', 'Past paper questions']
  },
  {
    id: 'live-state-telugu',
    title: 'State Board (AP & TS): Telugu Sahityam & Grammatical Mastery',
    teluguTitle: 'స్టేట్ బోర్డ్ (AP & TS): తెలుగు వ్యాకరణం, సంధులు & సమాసాలు',
    subject: 'Telugu',
    grade: 'Class 7',
    board: 'State Board',
    teacher: 'Vidwan S. Srinivasulu',
    timeSlot: 'Today 06:00 PM - 07:15 PM',
    status: 'upcoming',
    zoomLink: 'https://zoom.us/j/free-super-parent-state7',
    googleClassroomCode: 'sp-state-tel7',
    meetLink: 'https://meet.google.com/sp-gurukul-statetel7',
    youtubeLiveUrl: 'https://www.youtube.com/watch?v=live-demo-statetel7',
    attendeesCount: 380,
    topicsCovered: ['సవర్ణదీర్ఘ సంధి & గుణ సంధి సూత్రాలు', 'శతక పద్యాలు & భావాలు', 'పరీక్షా పత్రాల విశ్లేషణ']
  }
];

const BOARD_RESOURCES: BoardResource[] = [
  {
    id: 'board-cbse',
    board: 'CBSE',
    title: 'CBSE (Central Board of Secondary Education)',
    teluguTitle: 'CBSE కేంద్ర బోర్డ్ ఉచిత రిసోర్సెస్ & ఈ-బుక్స్',
    officialPortal: 'https://www.cbse.gov.in/',
    keyHighlights: ['NCERT Official E-Textbooks', 'Diksha Portal Interactive Learning', 'CBSE Academic Sample Papers & Marking Schemes'],
    freeWebsites: [
      { name: 'NCERT Official Portal', url: 'https://ncert.nic.in/textbook.php', badge: 'Official Books', desc: 'Free official digital textbooks for Class 1 to 12 in English, Hindi & Urdu.' },
      { name: 'DIKSHA National Portal', url: 'https://diksha.gov.in/', badge: 'Govt Portal', desc: 'Interactive lessons, QR code worksheets, and video animations for CBSE.' },
      { name: 'Khan Academy India (CBSE)', url: 'https://www.khanacademy.org/', badge: 'Free Courses', desc: 'Aligned with NCERT syllabus with practice exercises and video explanations.' },
      { name: 'Swayam Prabha PM eVIDYA Channels', url: 'https://www.swayamprabha.gov.in/', badge: '24x7 Live TV', desc: 'Free 24x7 educational telecast for grades 1 to 12 on DTH and YouTube.' }
    ],
    notesAndEbooks: [
      { title: 'Class 10 Science Comprehensive Formula & Revision Notes', type: 'PDF Notes', url: '#', size: '4.2 MB' },
      { title: 'Class 8-10 Mathematics Chapter-wise Solved Question Bank', type: 'PDF E-Book', url: '#', size: '6.8 MB' },
      { title: 'Class 9 Social Science Quick Summary & Mind Maps', type: 'Mind Maps', url: '#', size: '3.1 MB' }
    ]
  },
  {
    id: 'board-icse',
    board: 'ICSE',
    title: 'ICSE / ISC (Council for the Indian School Certificate Examinations)',
    teluguTitle: 'ICSE / ISC బోర్డ్ మెటీరియల్స్ & గత ప్రశ్నపత్రాలు',
    officialPortal: 'https://cisce.org/',
    keyHighlights: ['CISCE Syllabus & Regulations', 'Selina Concise Solutions', 'Comprehensive English Literature & Science Guides'],
    freeWebsites: [
      { name: 'CISCE Official Website', url: 'https://cisce.org/', badge: 'Official', desc: 'Direct access to specimen papers, syllabus, and circulars.' },
      { name: 'ResPaper ICSE Hub', url: 'https://www.respaper.com/icse/', badge: 'Past Papers', desc: '10+ years of solved ICSE Board question papers and model answers.' },
      { name: 'ICSE Help & Notes Guide', url: 'https://icsehelp.com/', badge: 'Revision Hub', desc: 'Chapter-wise revision notes, Selina Solutions, and tips.' },
      { name: 'TopperLearning Free ICSE Corner', url: 'https://www.topperlearning.com/icse-class-10', badge: 'Study Material', desc: 'Free revision summaries, videos, and sample tests.' }
    ],
    notesAndEbooks: [
      { title: 'ICSE Class 10 Physics & Chemistry Selina Simplified Notes', type: 'PDF Notes', url: '#', size: '5.4 MB' },
      { title: 'ICSE Merchant of Venice / Julius Caesar Character Guides', type: 'Literature Guide', url: '#', size: '2.9 MB' },
      { title: 'ICSE Commercial Studies & Geography Map Practice Book', type: 'Worksheet PDF', url: '#', size: '4.0 MB' }
    ]
  },
  {
    id: 'board-state',
    board: 'State Board',
    title: 'State Boards (AP, Telangana, Maharashtra, TN & Karnataka)',
    teluguTitle: 'స్టేట్ బోర్డ్ (ఆంధ్రప్రదేశ్, తెలంగాణ, మహారాష్ట్ర) ఈ-బుక్స్',
    officialPortal: 'https://scert.ap.gov.in/',
    keyHighlights: ['AP SCERT E-Pragyna & Mana Badi', 'TS SCERT Digital Textbooks', 'Bilingual Telugu & English Media Materials'],
    freeWebsites: [
      { name: 'AP SCERT & E-Pragyna Portal', url: 'https://scert.ap.gov.in/', badge: 'AP Govt', desc: 'Official SCERT Andhra Pradesh syllabus, workbooks, and teacher resources.' },
      { name: 'Telangana SCERT Digital Books', url: 'https://scert.telangana.gov.in/', badge: 'TS Govt', desc: 'Complete Class 1 to 10 Telangana state board digital textbooks.' },
      { name: 'Mana TV / T-SAT Vidya Channels', url: 'https://tsat.tv/', badge: 'Live Telecast', desc: 'Free daily video lectures for all state board subjects and competitive exams.' },
      { name: 'Maharashtra e-Balbharati', url: 'https://ebalbharati.in/', badge: 'State Books', desc: 'Free textbook repository for Maharashtra SSC State Board in 8 languages.' }
    ],
    notesAndEbooks: [
      { title: 'AP & TS State Board Class 10 All Subjects 100-Day Study Plan', type: 'PDF Guide', url: '#', size: '3.8 MB' },
      { title: 'Class 8-10 Telugu & Hindi Vyakaranam Comprehensive Notes', type: 'Grammar Book', url: '#', size: '4.6 MB' },
      { title: 'Physical Science & Biological Science Lab Activity Manual', type: 'Lab Manual', url: '#', size: '5.2 MB' }
    ]
  },
  {
    id: 'board-ib',
    board: 'IB',
    title: 'IB (International Baccalaureate - PYP, MYP & DP)',
    teluguTitle: 'ఇంటర్నేషనల్ బాకలారియాట్ (IB) గైడ్లు & క్వశ్చన్ బ్యాంక్స్',
    officialPortal: 'https://www.ibo.org/',
    keyHighlights: ['Inquiry-Based Learning Frameworks', 'Internal Assessment (IA) Guidance', 'Global Critical Thinking Tasks'],
    freeWebsites: [
      { name: 'IBO Official Global Portal', url: 'https://www.ibo.org/', badge: 'Official', desc: 'Official curriculum guidelines, IB learner profile, and assessment rubrics.' },
      { name: 'Revision Village Free Resources', url: 'https://www.revisionvillage.com/', badge: 'Maths & Science', desc: 'Top-ranked IB Mathematics and Science question banks and past exam solutions.' },
      { name: 'IB Documents Repository', url: 'https://ibdocuments.com/', badge: 'Past Papers', desc: 'Comprehensive past examination papers and mark schemes for MYP and DP.' },
      { name: 'Khan Academy Global Standards', url: 'https://www.khanacademy.org/', badge: 'Interactive', desc: 'Concept mastery modules aligned with IB conceptual frameworks.' }
    ],
    notesAndEbooks: [
      { title: 'IB MYP Criteria-Based Science Investigation Handbook', type: 'PDF Guide', url: '#', size: '6.1 MB' },
      { title: 'IB DP Extended Essay (EE) & Theory of Knowledge (TOK) Starter Pack', type: 'Exemplar Guide', url: '#', size: '3.4 MB' },
      { title: 'IB Mathematics Analysis & Approaches Formula Booklet Solved', type: 'Formula Book', url: '#', size: '2.7 MB' }
    ]
  },
  {
    id: 'board-cambridge',
    board: 'Cambridge',
    title: 'Cambridge Assessment International (IGCSE, O & A Levels)',
    teluguTitle: 'కేంబ్రిడ్జ్ ఇంటర్నేషనల్ (IGCSE & A-Levels) రిసోర్సెస్',
    officialPortal: 'https://www.cambridgeinternational.org/',
    keyHighlights: ['Cambridge Learner Portals', 'Past Exam Series Mark Schemes', 'Practical Science Endorsement Guides'],
    freeWebsites: [
      { name: 'Cambridge International Official', url: 'https://www.cambridgeinternational.org/', badge: 'Official', desc: 'Syllabus specifications, learner guides, and sample candidate responses.' },
      { name: 'PapaCambridge Revision Hub', url: 'https://papacambridge.com/', badge: 'Past Papers', desc: 'Complete archives of past papers, marking schemes, and notes for all subjects.' },
      { name: 'Save My Exams (Free Revision Notes)', url: 'https://www.savemyexams.co.uk/', badge: 'Topic Notes', desc: 'Visual summaries, topic questions, and model answers for IGCSE.' },
      { name: 'ZNotes Community Learning', url: 'https://znotes.org/', badge: 'Concise Notes', desc: 'High-yield student notes reviewed by Cambridge top scorers.' }
    ],
    notesAndEbooks: [
      { title: 'Cambridge IGCSE Physics 0625 Classified Past Questions with Answers', type: 'Question Bank', url: '#', size: '7.5 MB' },
      { title: 'IGCSE Extended Mathematics Core Formulae and Worked Examples', type: 'PDF Book', url: '#', size: '4.8 MB' },
      { title: 'Cambridge Global Perspectives & English as First Language Pack', type: 'Essay Guide', url: '#', size: '3.3 MB' }
    ]
  }
];

export const ClassroomInteractionRoom: React.FC<{
  onAskAI?: (query: string) => void;
}> = ({ onAskAI }) => {
  const { t, language } = useLanguage();
  const [activeBoard, setActiveBoard] = useState<SyllabusBoard | 'All'>('All');
  const [selectedSession, setSelectedSession] = useState<LiveSession>(LIVE_SESSIONS[0]);
  const [isWhiteboardActive, setIsWhiteboardActive] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; role: 'student' | 'teacher' | 'ai'; text: string; time: string }>>([
    { sender: 'Prof. K. V. Raman', role: 'teacher', text: 'Welcome students and parents to today\'s Speed Maths Live Session! Please open Chapter 3 exercises.', time: '10:02 AM' },
    { sender: 'Chaitanya Reddy (Class 8)', role: 'student', text: 'Good morning Sir! Ready with Vedic formula notebook.', time: '10:04 AM' },
    { sender: 'AI Subject Assistant', role: 'ai', text: '💡 Quick Tip: Today\'s class notes will be automatically saved to your Offline Cache for revision without internet!', time: '10:05 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [copiedLink, setCopiedLink] = useState('');

  // Canvas Whiteboard Reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#ea580c');

  const filteredSessions = LIVE_SESSIONS.filter(s => activeBoard === 'All' || s.board === activeBoard);
  const currentBoardResource = BOARD_RESOURCES.find(r => r.board === (activeBoard === 'All' ? 'CBSE' : activeBoard)) || BOARD_RESOURCES[0];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      sender: 'You (Student/Parent)',
      role: 'student' as const,
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    const userQuery = inputMsg.trim();
    setInputMsg('');

    // Simulate instant teacher/AI response
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'Prof. K. V. Raman (Live Teacher)',
          role: 'teacher',
          text: `Great question regarding "${userQuery.slice(0, 30)}..."! Let's solve this on the interactive whiteboard right now.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLink(label);
      setTimeout(() => setCopiedLink(''), 2500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <Video className="w-4 h-4 text-amber-200" />
            <span>Free Live Online Classes • Zoom • Google Classroom • All Boards</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            🏫 Live Online Classrooms & Interactive Learning Room
          </h1>

          <p className="text-sm text-orange-50 font-medium leading-relaxed">
            {language === 'te' 
              ? 'ఉచిత ఆన్‌లైన్ లైవ్ తరగతులు, జూమ్ రూమ్‌లు, గూగుల్ క్లాస్‌రూమ్, నోట్స్, ఈ-బుక్స్ మరియు CBSE, ICSE, స్టేట్ బోర్డ్, IB, కేంబ్రిడ్జ్ సిలబస్ కోసం ప్రత్యక్ష సందేహాల నివృత్తి రూమ్.'
              : language === 'hi'
              ? 'मुफ़्त ऑनलाइन लाइव कक्षाएं, ज़ूम रूम, गूगल क्लासरूम, नोट्स, ई-बुक्स और सीबीएसई, आईसीएसई, स्टेट बोर्ड, आईबी, कैम्ब्रिज सिलेबस के लिए लाइव इंटरैक्शन रूम।'
              : 'Direct links for free online classrooms (Zoom, Google Classroom, Meet, YouTube Live), comprehensive multi-board syllabus (CBSE, ICSE, State Boards, IB, Cambridge), downloadable notes, and interactive teacher-student Q&A room.'
            }
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="bg-black/20 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              100% Free Access for All Students & Parents
            </span>
            <span className="bg-black/20 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-emerald-300" />
              Works with Offline Cache
            </span>
          </div>
        </div>

        <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none hidden md:block">
          <GraduationCap className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Board Selector Tabs */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
          {(['All', 'CBSE', 'ICSE', 'State Board', 'IB', 'Cambridge'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setActiveBoard(b)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                activeBoard === b
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-orange-50 hover:text-orange-700'
              }`}
            >
              {b === 'All' ? '🌟 All Boards' : b}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 bg-orange-50/60 px-3 py-2 rounded-xl border border-orange-200">
          <Globe className="w-4 h-4 text-orange-600" />
          <span>Curriculum: NCERT, CISCE, SCERT, IBO, Cambridge</span>
        </div>
      </div>

      {/* Main Grid: Interactive Live Class Room + Free Online Direct Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 Cols): Virtual Interactive Classroom & Video / Chat */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Live Session Monitor */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-red-100 text-red-700 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                    {selectedSession.status === 'live' ? 'LIVE NOW' : 'UPCOMING'}
                  </span>
                  <span className="bg-orange-100 text-orange-800 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                    {selectedSession.board} • {selectedSession.grade}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  {language === 'te' ? selectedSession.teluguTitle : selectedSession.title}
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  {selectedSession.teacher} • <Clock className="w-3.5 h-3.5 inline mr-1" />{selectedSession.timeSlot}
                </p>
              </div>

              {/* Direct Room Links */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={selectedSession.zoomLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black px-3.5 py-2 rounded-xl text-xs shadow-xs transition-all"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Zoom</span>
                </a>
                <a
                  href={`https://classroom.google.com/u/0/h`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-3.5 py-2 rounded-xl text-xs shadow-xs transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Google Classroom</span>
                </a>
              </div>
            </div>

            {/* Simulated Live Stream / Interactive Stage */}
            <div className="bg-slate-950 rounded-2xl p-4 text-white relative overflow-hidden min-h-[220px] flex flex-col justify-between border border-slate-800">
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div>
                  <span className="text-xs font-bold text-slate-300">
                    Live Broadcast • {selectedSession.attendeesCount} Students & Parents Connected
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs">
                  <Tv className="w-3.5 h-3.5 text-orange-400" />
                  <span className="font-mono text-orange-300">1080p HD Ultra-Low Latency</span>
                </div>
              </div>

              <div className="my-auto text-center space-y-2 py-4 z-10">
                <div className="w-14 h-14 bg-orange-600/90 text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg font-black text-xl">
                  {selectedSession.subject.slice(0, 2).toUpperCase()}
                </div>
                <h4 className="font-black text-base text-white">
                  {selectedSession.title}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Interactive Class in Progress with Live Whiteboard & Instant Doubt Solver. Click below to participate!
                </p>
              </div>

              {/* In-Room Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 z-10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isMicOn ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {isMicOn ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                    <span>{isMicOn ? 'Mic Unmuted' : 'Mic Muted'}</span>
                  </button>

                  <button
                    onClick={() => setHandRaised(!handRaised)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      handRaised ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Hand className="w-3.5 h-3.5" />
                    <span>{handRaised ? '✋ Hand Raised!' : 'Raise Hand'}</span>
                  </button>

                  <button
                    onClick={() => setIsWhiteboardActive(!isWhiteboardActive)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isWhiteboardActive ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <PenTool className="w-3.5 h-3.5" />
                    <span>{isWhiteboardActive ? 'Hide Board' : 'Live Whiteboard'}</span>
                  </button>
                </div>

                <div className="text-[11px] font-mono text-slate-400">
                  Class Code: <span className="text-orange-400 font-bold">{selectedSession.googleClassroomCode}</span>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/40 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Interactive Scratchpad / Whiteboard */}
            {isWhiteboardActive && (
              <div className="bg-slate-50 border-2 border-dashed border-orange-300 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PenTool className="w-4 h-4 text-orange-600" />
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      Interactive Math & Science Scratchpad
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {['#ea580c', '#2563eb', '#16a34a', '#000000'].map((c) => (
                        <button
                          key={c}
                          onClick={() => setDrawColor(c)}
                          className={`w-5 h-5 rounded-full border-2 transition-transform ${
                            drawColor === c ? 'scale-125 border-slate-900' : 'border-white'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={clearCanvas}
                      className="px-2.5 py-1 text-[11px] font-bold bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-100 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>

                <canvas
                  ref={canvasRef}
                  width={600}
                  height={180}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="w-full h-44 bg-white rounded-xl border border-slate-300 shadow-inner cursor-crosshair touch-none"
                />
                <p className="text-[11px] text-slate-500 italic text-center">
                  ✏️ Draw calculations, chemical bonds, geometry figures, or Telugu letters directly with your mouse or touch screen.
                </p>
              </div>
            )}

            {/* Live Interactive Doubt Q&A Chat */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-orange-600" />
                  <span>Live Student & Parent Q&A Chatroom</span>
                </h4>
                <span className="text-[11px] text-slate-500 font-bold">
                  {chatMessages.length} Messages Exchanged
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3 max-h-48 overflow-y-auto space-y-2 border border-slate-200 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`p-2.5 rounded-xl ${
                      msg.role === 'teacher' 
                        ? 'bg-amber-50 border border-amber-200 text-amber-950 font-medium'
                        : msg.role === 'ai'
                        ? 'bg-orange-50 border border-orange-200 text-orange-950'
                        : 'bg-white border border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                      <span className="font-black text-slate-900 flex items-center gap-1">
                        {msg.role === 'teacher' && '👨‍🏫'}
                        {msg.role === 'ai' && '🤖'}
                        {msg.role === 'student' && '👦'}
                        {msg.sender}
                      </span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Type your question or doubt for the live teacher..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask</span>
                </button>
              </form>
            </div>

          </div>

          {/* Today's Full Schedule Grid */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span>Today’s Multi-Board Live Classroom Schedule</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                    selectedSession.id === session.id
                      ? 'bg-orange-50 border-orange-500 shadow-xs'
                      : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-black text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-md">
                      {session.board}
                    </span>
                    <span className="font-bold text-slate-500">{session.grade}</span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1 mt-1">
                    {session.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{session.teacher}</p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/70 text-[10px]">
                    <span className="font-medium text-slate-600">{session.timeSlot}</span>
                    <span className="text-orange-600 font-bold underline">
                      {selectedSession.id === session.id ? 'Selected' : 'Switch Room →'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (5 Cols): Free Websites, Live Weblinks, E-Books & Notes */}
        <div className="lg:col-span-5 space-y-6">

          {/* Free Official Web Portals & Live Websites */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-orange-600" />
                <span>{currentBoardResource.board} Free Websites & Portals</span>
              </h3>
              <a
                href={currentBoardResource.officialPortal}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-black text-orange-600 hover:underline flex items-center gap-1"
              >
                <span>Official Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-3">
              {currentBoardResource.freeWebsites.map((site, idx) => (
                <div key={idx} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1.5 hover:border-orange-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-xs text-slate-900">{site.name}</h4>
                    <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-2 py-0.5 rounded-md">
                      {site.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{site.desc}</p>
                  <div className="pt-1">
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 hover:text-orange-700 underline underline-offset-2"
                    >
                      <span>Open Free Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Downloadable Academic Notes & Chapter E-Books */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Download className="w-5 h-5 text-orange-600" />
              <span>Free Revision Notes & E-Books</span>
            </h3>

            <div className="space-y-3">
              {currentBoardResource.notesAndEbooks.map((item, idx) => (
                <div key={idx} className="bg-orange-50/50 p-3.5 rounded-2xl border border-orange-200 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider block">
                      {item.type} • {item.size}
                    </span>
                    <h4 className="font-black text-xs text-slate-900 leading-snug">{item.title}</h4>
                  </div>

                  <button
                    onClick={() => alert(`Downloading ${item.title} for offline access! Stored in browser cache.`)}
                    className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white shadow-xs transition-colors shrink-0"
                    title="Download Note"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Instant Quick Meeting Rooms Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-5 border border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              1-Click Meeting Hub Access
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Launch instant parent-teacher study huddles, peer group discussions, or one-on-one doubt clearing:
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="https://zoom.us/start/videomeeting"
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-2.5 rounded-xl text-center text-xs font-bold text-white transition-colors"
              >
                Instant Zoom Room
              </a>
              <a
                href="https://meet.google.com/new"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 p-2.5 rounded-xl text-center text-xs font-bold text-white transition-colors"
              >
                Google Meet Live
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
