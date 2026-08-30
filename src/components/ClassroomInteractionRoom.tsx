import React, { useState, useRef, useEffect, useMemo } from 'react';
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
  Bookmark,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Bot,
  Code2,
  Cpu,
  Calculator,
  Library,
  Compass,
  FileText,
  Boxes,
  HeartHandshake,
  Check,
  Copy,
  Radio,
  Sliders,
  HelpCircle,
  FolderOpen
} from 'lucide-react';
import { SyllabusBoard, ClassGrade } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { TUTOR_QUICK_AI_LINKS, WORLD_AI_CHATBOTS } from '../data/worldAiChatbotsData';

// Types
export type TutorsRoomTab = 
  | 'all-in-one' 
  | 'weblinks' 
  | 'videos' 
  | 'books' 
  | 'ai-solvers' 
  | 'voice-chatbot' 
  | 'live-classes';

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

interface WebLinkResource {
  id: string;
  name: string;
  teluguName: string;
  category: 'Engineering & STEM' | 'Curriculum & Boards' | 'Coding & IDEs' | 'Math & Science Tools' | 'Research & Libraries' | 'Free Education';
  desc: string;
  teluguDesc: string;
  url: string;
  badge: string;
  iconName: string;
  isFeatured?: boolean;
}

interface VideoResource {
  id: string;
  title: string;
  teluguTitle: string;
  channel: string;
  category: 'Live Broadcasts' | 'IIT NPTEL & Tech' | 'Math & Science' | 'Language & Sanskrit' | 'Animation & Kids';
  embedUrl: string;
  duration: string;
  badge: string;
  description: string;
}

interface BookResource {
  id: string;
  title: string;
  teluguTitle: string;
  grade: string;
  board: string;
  subject: string;
  format: 'PDF E-Book' | 'Interactive Portal' | 'Audio Book' | 'Notes';
  size: string;
  readUrl: string;
  downloadUrl: string;
  badge: string;
  description: string;
}

// 1. Live Class Sessions Data
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

// 2. Comprehensive All Web Links Data
const ALL_WEB_LINKS: WebLinkResource[] = [
  {
    id: 'link-skill-lync',
    name: 'Skill-Lync Learning Resources',
    teluguName: 'స్కిల్-లింక్ ఇంజనీరింగ్ రిసోర్సెస్',
    category: 'Engineering & STEM',
    desc: 'Engineering project blueprints, EV technology, CFD/FEA simulation roadmaps, Python/MATLAB notes, and expert webinars.',
    teluguDesc: 'ఉచిత ఇంజనీరింగ్ ప్రాజెక్ట్ బ్లూప్రింట్లు, EV టెక్నాలజీ, సిమ్యులేషన్ గైడ్లు మరియు టెక్ కెరీర్ రోడ్‌మ్యాప్స్.',
    url: 'https://resources.skill-lync.com/',
    badge: '🌟 Top Engineering Corner',
    iconName: 'Cpu',
    isFeatured: true
  },
  {
    id: 'link-ncert-portal',
    name: 'NCERT Official Portal',
    teluguName: 'NCERT అధికారిక పోర్టల్',
    category: 'Curriculum & Boards',
    desc: 'National Council of Educational Research and Training official textbooks, exemplar problems & audio lessons.',
    teluguDesc: 'క్లాస్ 1 నుండి 12 వరకు అన్ని సబ్జెక్టుల ఉచిత అధికారిక పాఠ్యపుస్తకాలు.',
    url: 'https://ncert.nic.in/textbook.php',
    badge: 'Govt Official',
    iconName: 'BookOpen',
    isFeatured: true
  },
  {
    id: 'link-diksha',
    name: 'DIKSHA National Education Platform',
    teluguName: 'దీక్ష (DIKSHA) జాతీయ విద్యా వేదిక',
    category: 'Curriculum & Boards',
    desc: 'Ministry of Education interactive digital learning platform with QR worksheets, lesson videos & state board contents in 30+ languages.',
    teluguDesc: 'భారత ప్రభుత్వ అధికారిక డిజిటల్ లెర్నింగ్ పోర్టల్ - 30+ భాషల్లో వీడియోలు & వర్క్‌షీట్‌లు.',
    url: 'https://diksha.gov.in/',
    badge: 'National Portal',
    iconName: 'GraduationCap',
    isFeatured: true
  },
  {
    id: 'link-khan-academy',
    name: 'Khan Academy Free Education',
    teluguName: 'ఖాన్ అకాడమీ (100% ఉచిత అభ్యాసం)',
    category: 'Free Education',
    desc: 'World-class free education for anyone, anywhere. Aligned with NCERT, Math, Science, AP courses and computing.',
    teluguDesc: 'గణితం, భౌతిక శాస్త్రం, కంప్యూటింగ్ లలో ప్రపంచ స్థాయి ఉచిత వీడియోలు మరియు సాధన పరీక్షలు.',
    url: 'https://www.khanacademy.org/',
    badge: '100% Free World Class',
    iconName: 'Sparkles',
    isFeatured: true
  },
  {
    id: 'link-swayam-nptel',
    name: 'NPTEL & SWAYAM (IIT & IISc)',
    teluguName: 'NPTEL & స్వయం (IIT / IISc ప్రొఫెసర్లు)',
    category: 'Engineering & STEM',
    desc: '3,000+ free college and advanced engineering courses taught by premier IIT & IISc faculty with verified certifications.',
    teluguDesc: 'IIT & IISc ప్రొఫెసర్ల ద్వారా 3000+ ఇంజనీరింగ్, సైన్స్ మరియు టెక్నాలజీ ఉచిత కోర్సులు.',
    url: 'https://nptel.ac.in/',
    badge: 'IIT / IISc Free',
    iconName: 'Cpu',
    isFeatured: true
  },
  {
    id: 'link-mit-ocw',
    name: 'MIT OpenCourseWare',
    teluguName: 'MIT ఓపెన్ కోర్స్‌వేర్',
    category: 'Free Education',
    desc: 'Complete digital publication of virtually all MIT course content. Unrestricted access to world-class university materials.',
    teluguDesc: 'MIT యూనివర్సిటీ ప్రొఫెసర్ల పూర్తి లెక్చర్ నోట్స్, అసైన్‌మెంట్లు మరియు వీడియోలు.',
    url: 'https://ocw.mit.edu/',
    badge: 'MIT Official',
    iconName: 'Globe',
    isFeatured: true
  },
  {
    id: 'link-javalab',
    name: 'Javalab HTML5 Science Simulators',
    teluguName: 'జావాలాబ్ సైన్స్ సిమ్యులేటర్లు',
    category: 'Math & Science Tools',
    desc: '600+ interactive HTML5 physics, chemistry, biology, earth science, and electronics simulations in real-time.',
    teluguDesc: '600+ ఇంటరాక్టివ్ సైన్స్ & ఫిజిక్స్ లైవ్ సిమ్యులేటర్లు (ల్యాబ్ అవసరం లేకుండా).',
    url: 'https://javalab.org/en/',
    badge: 'Interactive Lab',
    iconName: 'Compass'
  },
  {
    id: 'link-wolfram-alpha',
    name: 'WolframAlpha Computational Engine',
    teluguName: 'వోల్ఫ్రామ్ ఆల్ఫా గణన ఇంజిన్',
    category: 'Math & Science Tools',
    desc: 'Compute expert-level answers using Wolfram breakthrough algorithms, knowledgebase and AI for mathematics and science.',
    teluguDesc: 'గణిత సమీకరణాలు, రసాయన బంధాలు, భౌతిక సూత్రాలకు తక్షణ స్టెప్-బై-స్టెప్ సొల్యూషన్స్.',
    url: 'https://www.wolframalpha.com/',
    badge: 'Math Engine',
    iconName: 'Calculator'
  },
  {
    id: 'link-code-sandboxes',
    name: 'GitHub Student Developer Pack',
    teluguName: 'గిట్‌హబ్ స్టూడెంట్ ప్యాక్ ($200,000+ విలువ)',
    category: 'Coding & IDEs',
    desc: 'Over $200k in free developer tools, cloud credits (AWS, Azure, DigitalOcean), JetBrains IDEs, and GitHub Copilot.',
    teluguDesc: 'విద్యార్థుల కోసం ఉచిత క్లౌడ్ క్రెడిట్స్, డెవలపర్ టూల్స్ మరియు కోపైలట్ సదుపాయం.',
    url: 'https://education.github.com/pack',
    badge: '$200k+ Free Value',
    iconName: 'Code2'
  },
  {
    id: 'link-aglasem',
    name: 'Aglasem Schools & Mock Tests',
    teluguName: 'అగ్లాసెమ్ స్కూల్స్ & మాక్ టెస్ట్స్',
    category: 'Curriculum & Boards',
    desc: 'Class 1 to 12 syllabus, previous 10-year question papers, model question banks, and competitive exam entrance resources.',
    teluguDesc: '10 సంవత్సరాల సాల్వ్డ్ క్వశ్చన్ పేపర్లు, మోడల్ టెస్టులు మరియు స్టడీ మెటీరియల్స్.',
    url: 'https://schools.aglasem.com/',
    badge: 'Question Banks',
    iconName: 'FileText'
  },
  {
    id: 'link-ieee-xplore',
    name: 'IEEE Xplore & IEEE Open Access',
    teluguName: 'IEEE ఎక్స్‌ప్లోర్ డిజిటల్ లైబ్రరీ',
    category: 'Research & Libraries',
    desc: 'Over 5 million technical articles, research papers, and IEEE standards in computer science and electrical engineering.',
    teluguDesc: 'ప్రపంచ ప్రఖ్యాత పరిశోధనా పత్రాలు, జర్నల్స్ మరియు ఇంజనీరింగ్ రీసెర్చ్ పేపర్లు.',
    url: 'https://ieeexplore.ieee.org/Xplore/home.jsp',
    badge: 'Research Standard',
    iconName: 'Library'
  },
  {
    id: 'link-storyweaver',
    name: 'StoryWeaver Pratham Books (800+ Languages)',
    teluguName: 'స్టోరీవీవర్ (ప్రథమ్ బుక్స్)',
    category: 'Free Education',
    desc: 'Free openly licensed multilingual storybooks for children in Telugu, Hindi, English, and hundreds of world dialects.',
    teluguDesc: 'పిల్లల కోసం వేల కొద్దీ రంగురంగుల కథల పుస్తకాలు తెలుగు, హిందీ మరియు ఇంగ్లీషులో.',
    url: 'https://storyweaver.org.in/',
    badge: 'Kids Library',
    iconName: 'BookOpen'
  }
];

// 3. Comprehensive Video Lectures & Video Links Data
const ALL_VIDEOS: VideoResource[] = [
  {
    id: 'vid-swayam-prabha',
    title: 'PM eVIDYA / Swayam Prabha 24x7 Educational TV',
    teluguTitle: 'పీఎం ఈ-విద్య / స్వయం ప్రభ 24x7 విద్యా ప్రసారాలు',
    channel: 'Ministry of Education GoI',
    category: 'Live Broadcasts',
    embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UCv2_K4jV3r4j_example',
    duration: '24x7 Live Stream',
    badge: '🔴 24x7 Live Broadcast',
    description: '24x7 live DTH channel broadcasts covering Classes 1 to 12 NCERT curriculum and teacher explanations.'
  },
  {
    id: 'vid-nptel-python',
    title: 'IIT Madras: Python for Data Science & Engineering',
    teluguTitle: 'IIT మద్రాస్: ఇంజనీరింగ్ & డేటా సైన్స్ కోసం పైథాన్',
    channel: 'NPTEL-IIT Madras',
    category: 'IIT NPTEL & Tech',
    embedUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    duration: '12 Lectures Series',
    badge: 'IIT Certified Series',
    description: 'Comprehensive introduction to Python programming, data structures, algorithms, and computational modeling by IIT professors.'
  },
  {
    id: 'vid-khan-calculus',
    title: 'Khan Academy: Essence of Calculus & Visual Derivatives',
    teluguTitle: 'ఖాన్ అకాడమీ: కాలిక్యులస్ & విజువల్ డెరివేటివ్స్',
    channel: 'Khan Academy & 3Blue1Brown',
    category: 'Math & Science',
    embedUrl: 'https://www.youtube.com/embed/WUvTyaaNkzM',
    duration: '22:15 mins',
    badge: 'Visual Math Mastery',
    description: 'Intuitive geometric and visual breakdown of differentiation, integration, limits, and real-world calculus applications.'
  },
  {
    id: 'vid-tsat-telugu',
    title: 'T-SAT / Mana TV: 10th Class Physical Science & Telugu Vyakaranam',
    teluguTitle: 'T-SAT మానా టీవీ: 10వ తరగతి ఫిజికల్ సైన్స్ & తెలుగు వ్యాకరణం',
    channel: 'T-SAT Network Vidya',
    category: 'Language & Sanskrit',
    embedUrl: 'https://www.youtube.com/embed/live_tsat_stream',
    duration: '45:00 mins',
    badge: 'State Board Special',
    description: 'High scoring tips, Telugu sandhulu, samasalu, and state board physical science practical concepts explained in clear Telugu.'
  },
  {
    id: 'vid-gita-slokas',
    title: 'Bhagavad Gita All Chapter Slokas with Meaning & Chanting',
    teluguTitle: 'శ్రీమద్భగవద్గీత శ్లోకాలు, ప్రతిపదార్థం & తాత్పర్యం',
    channel: 'Gurukul Vedic Heritage',
    category: 'Language & Sanskrit',
    embedUrl: 'https://www.youtube.com/embed/gita_sloka_mastery',
    duration: '60:00 mins',
    badge: 'Vedic Wisdom',
    description: 'Proper Sanskrit pronunciation with word-by-word Telugu and English explanation for mental focus and character building.'
  },
  {
    id: 'vid-ted-ed-science',
    title: 'TED-Ed: Mysteries of Human Brain, Quantum Mechanics & Black Holes',
    teluguTitle: 'TED-Ed: మానవ మెదడు, క్వాంటం ఫిజిక్స్ & బ్లాక్ హోల్స్ రహస్యాలు',
    channel: 'TED-Ed Official',
    category: 'Animation & Kids',
    embedUrl: 'https://www.youtube.com/embed/9B_sQhT8-Y8',
    duration: '08:45 mins',
    badge: 'Award Winning Animation',
    description: 'Visually rich animated science masterclasses answering the most intriguing questions about nature and the universe.'
  }
];

// 4. Comprehensive All Digital Books Data
const ALL_DIGITAL_BOOKS: BookResource[] = [
  {
    id: 'book-ncert-math-10',
    title: 'NCERT Class 10 Mathematics Complete Textbook',
    teluguTitle: 'NCERT 10వ తరగతి గణితం పూర్తి పాఠ్యపుస్తకం',
    grade: 'Class 10',
    board: 'CBSE & National',
    subject: 'Mathematics',
    format: 'PDF E-Book',
    size: '12.4 MB',
    readUrl: 'https://ncert.nic.in/textbook.php',
    downloadUrl: 'https://ncert.nic.in/textbook.php',
    badge: 'Official NCERT',
    description: 'Complete official NCERT Mathematics textbook with all 15 chapters including Trigonometry, Polynomials, and Statistics.'
  },
  {
    id: 'book-ncert-sci-10',
    title: 'NCERT Class 10 Science (Physics, Chemistry, Biology)',
    teluguTitle: 'NCERT 10వ తరగతి సైన్స్ (ఫిజిక్స్, కెమిస్ట్రీ, బయాలజీ)',
    grade: 'Class 10',
    board: 'CBSE & National',
    subject: 'Science',
    format: 'PDF E-Book',
    size: '18.1 MB',
    readUrl: 'https://ncert.nic.in/textbook.php',
    downloadUrl: 'https://ncert.nic.in/textbook.php',
    badge: 'Official NCERT',
    description: 'Comprehensive textbook with color diagrams, activities, laboratory investigations, and chapter-end review questions.'
  },
  {
    id: 'book-scert-ap-ts',
    title: 'AP & Telangana SCERT Class 1 to 10 Textbooks (Telugu & English)',
    teluguTitle: 'AP & తెలంగాణ SCERT 1 నుండి 10 తరగతుల డిజిటల్ పాఠ్యపుస్తకాలు',
    grade: 'Class 1-10',
    board: 'State Board (AP/TS)',
    subject: 'All Subjects',
    format: 'PDF E-Book',
    size: 'Full Repository',
    readUrl: 'https://scert.ap.gov.in/',
    downloadUrl: 'https://scert.telangana.gov.in/',
    badge: 'State Govt Books',
    description: 'Free official state board textbooks for Telugu medium, English medium, Maths, Physical Science, Social and Languages.'
  },
  {
    id: 'book-openstax-physics',
    title: 'OpenStax University Physics & AP Physics (Peer-Reviewed)',
    teluguTitle: 'ఓపెన్‌స్టాక్స్ యూనివర్సిటీ ఫిజిక్స్ (రైస్ యూనివర్సిటీ)',
    grade: 'Class 9-12 & College',
    board: 'Global / AP / IB',
    subject: 'Physics',
    format: 'Interactive Portal',
    size: 'Free Online & PDF',
    readUrl: 'https://openstax.org/subjects/science',
    downloadUrl: 'https://openstax.org/details/books/university-physics-volume-1',
    badge: 'OpenStax Rice Univ',
    description: 'Peer-reviewed, 100% free open college textbook used by Harvard, MIT, and Stanford with rich simulation links.'
  },
  {
    id: 'book-gutenberg-classics',
    title: 'Project Gutenberg Digital Library (70,000+ Free E-Books)',
    teluguTitle: 'ప్రాజెక్ట్ గుటెన్‌బర్గ్ (70,000+ ఉచిత క్లాసిక్ పుస్తకాలు)',
    grade: 'All Ages',
    board: 'International',
    subject: 'World Literature & Science',
    format: 'PDF E-Book',
    size: '70k+ Books',
    readUrl: 'https://www.gutenberg.org/',
    downloadUrl: 'https://www.gutenberg.org/',
    badge: 'World Heritage Library',
    description: 'Free public domain archive of world literature, Shakespeare, Mark Twain, Arthur Conan Doyle, and foundational science.'
  },
  {
    id: 'book-vedic-maths',
    title: 'Vedic Mathematics Speed Calculation Secrets & Sutras',
    teluguTitle: 'వేద గణితం: వేగవంతమైన లెక్కల సూత్రాలు & ట్రిక్స్',
    grade: 'Class 4-12',
    board: 'Gurukul Special',
    subject: 'Vedic Mathematics',
    format: 'PDF E-Book',
    size: '8.6 MB',
    readUrl: '#',
    downloadUrl: '#',
    badge: 'Gurukul Exclusive',
    description: '16 core Vedic sutras for instant 3-second multiplications, square roots, division shortcuts, and algebra mental math.'
  }
];

export const ClassroomInteractionRoom: React.FC<{
  onAskAI?: (query: string) => void;
  defaultSubTab?: TutorsRoomTab;
}> = ({ onAskAI, defaultSubTab = 'all-in-one' }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TutorsRoomTab>(defaultSubTab);
  
  // Board & Live Session State
  const [activeBoard, setActiveBoard] = useState<SyllabusBoard | 'All'>('All');
  const [selectedSession, setSelectedSession] = useState<LiveSession>(LIVE_SESSIONS[0]);
  const [handRaised, setHandRaised] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [copiedLink, setCopiedLink] = useState('');
  
  // Interactive Chat in Classroom
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; role: 'student' | 'teacher' | 'ai'; text: string; time: string }>>([
    { sender: 'Prof. K. V. Raman', role: 'teacher', text: 'Welcome students and parents to the Tutor\'s Room! All web links, videos, books, and Voice AI chatbot are ready below.', time: '10:02 AM' },
    { sender: 'Chaitanya Reddy (Class 8)', role: 'student', text: 'Good morning Sir! Looking up Skill-Lync engineering blueprints and NCERT books.', time: '10:04 AM' },
    { sender: 'SuperParent AI Voice Tutor', role: 'ai', text: '🎙️ Voice AI Tutor is active! Click the microphone in the Voice Chatbot tab to ask any question out loud.', time: '10:05 AM' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  // Canvas Whiteboard Reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#ea580c');

  // Search & Filter States for WebLinks, Videos, Books
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWebCategory, setSelectedWebCategory] = useState<string>('All');
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>('All');
  const [selectedBookSubject, setSelectedBookSubject] = useState<string>('All');

  // Active Embedded Video Player State
  const [activePlayingVideo, setActivePlayingVideo] = useState<VideoResource>(ALL_VIDEOS[0]);
  const [isVideoPlayingModalOpen, setIsVideoPlayingModalOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // VOICE AI CHATBOT STATE & CONTROLS (Live Speech Recognition & Speech Synthesis)
  // ---------------------------------------------------------------------------
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceSpeechSpeed, setVoiceSpeechSpeed] = useState<number>(1.0);
  const [voiceLanguage, setVoiceLanguage] = useState<'en-US' | 'te-IN' | 'hi-IN'>('en-US');
  const [voiceChatHistory, setVoiceChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    { sender: 'ai', text: 'నమస్కారం! I am your AI Voice Tutor. Speak into the microphone or pick a question below, and I will explain step-by-step with natural audio voice playback!', time: '10:00 AM' }
  ]);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition on Mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = voiceLanguage;

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setVoiceTranscript(transcript);
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setSpeechRecognitionSupported(false);
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [voiceLanguage]);

  // Start / Stop Microphone Voice Listening
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. You can type your query in the box below.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setVoiceTranscript('');
      try {
        recognitionRef.current.lang = voiceLanguage;
        recognitionRef.current.start();
      } catch (err) {
        console.error('Error starting speech recognition:', err);
      }
    }
  };

  // Speak AI Answer with Speech Synthesis
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Stop any ongoing speech
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = voiceSpeechSpeed;
    utterance.lang = voiceLanguage;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Submit Voice / Text Question to Voice AI Tutor
  const handleVoiceSubmit = (queryText?: string) => {
    const textToSend = queryText || voiceTranscript;
    if (!textToSend.trim()) return;

    const userMessage = {
      sender: 'user' as const,
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setVoiceChatHistory(prev => [...prev, userMessage]);
    setVoiceTranscript('');

    // Generate intelligent tutor answer
    setTimeout(() => {
      let aiResponse = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('skill-lync') || lower.includes('skill lync') || lower.includes('engineering')) {
        aiResponse = `Skill-Lync Learning Resources (resources.skill-lync.com) provides free project blueprints in Electric Vehicles, CFD, MATLAB, Python, and Automotive Engineering. You can access their complete whitepapers and guides in the All Web Links tab!`;
      } else if (lower.includes('ncert') || lower.includes('book') || lower.includes('syllabus')) {
        aiResponse = `All NCERT Class 1 to 12 textbooks, AP/TS SCERT books, and OpenStax university texts are readily available in our Digital Books tab with 1-click read and download links!`;
      } else if (lower.includes('gravity') || lower.includes('light') || lower.includes('physics')) {
        aiResponse = `In physics, gravity is the fundamental force of attraction between masses (F = G * m1 * m2 / r²). For light, reflection follows the law that angle of incidence equals angle of reflection. You can test this interactively in our Javalab simulator!`;
      } else if (lower.includes('math') || lower.includes('algebra') || lower.includes('calculus')) {
        aiResponse = `For speed math, remember the Vedic Sutra 'Ekadhikena Purvena' for squaring numbers ending in 5. For calculus, the derivative measures the instantaneous rate of change of a function.`;
      } else if (lower.includes('telugu') || lower.includes('తెలుగు')) {
        aiResponse = `తెలుగు వ్యాకరణంలో సంధులు రెండు రకాలు: సంస్కృత సంధులు (సవర్ణదీర్ఘ, గుణ, వృద్ధి, యణాదేశ) మరియు తెలుగు సంధులు (ఉత్వ, ఇత్వ, అత్వ, గసడదవాదేశ సంధి). మన వీడియో సెక్షన్‌లో పూర్తి లెక్చర్లు అందుబాటులో ఉన్నాయి.`;
      } else {
        aiResponse = `That is a great question on "${textToSend.slice(0, 40)}"! In our Gurukul Tutor's Room, we connect concept theory with practical diagrams, verified web sources, and step-by-step reasoning. Let's delve deeper into this concept together.`;
      }

      const aiMsg = {
        sender: 'ai' as const,
        text: aiResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setVoiceChatHistory(prev => [...prev, aiMsg]);
      speakText(aiResponse);
    }, 600);
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

  // Filtered Web Links
  const filteredWebLinks = useMemo(() => {
    return ALL_WEB_LINKS.filter(link => {
      const matchCategory = selectedWebCategory === 'All' || link.category === selectedWebCategory;
      const matchSearch = !searchQuery || 
        link.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        link.teluguName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.url.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedWebCategory, searchQuery]);

  // Filtered Videos
  const filteredVideos = useMemo(() => {
    return ALL_VIDEOS.filter(vid => {
      const matchCategory = selectedVideoCategory === 'All' || vid.category === selectedVideoCategory;
      const matchSearch = !searchQuery || 
        vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vid.teluguTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vid.channel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedVideoCategory, searchQuery]);

  // Filtered Books
  const filteredBooks = useMemo(() => {
    return ALL_DIGITAL_BOOKS.filter(book => {
      const matchSubject = selectedBookSubject === 'All' || book.subject.includes(selectedBookSubject);
      const matchSearch = !searchQuery || 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.teluguTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.grade.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubject && matchSearch;
    });
  }, [selectedBookSubject, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* 🌟 1. HERO BANNER: The Ultimate All-in-One Tutor's Room */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
              <GraduationCap className="w-4 h-4 text-amber-200" />
              <span>All-in-One Tutor's Room • ట్యూటర్స్ రూమ్</span>
            </span>
            <span className="bg-black/25 text-amber-200 text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              All Links • Videos • Books • AI Solvers • Voice AI Chatbot
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            🏛️ Tutor's Room: Master Resource Hub & Interactive Voice AI
          </h1>

          <p className="text-xs sm:text-sm text-orange-50 font-medium leading-relaxed max-w-3xl">
            {language === 'te' 
              ? 'అన్ని విద్యా వెబ్‌సైట్ లింక్‌లు (Skill-Lync, NCERT, Khan Academy), వీడియో లెక్చర్లు, డిజిటల్ ఈ-బుక్స్, ప్రముఖ AI సాల్వర్లు, మరియు లైవ్ వాయిస్ AI చాట్‌బాట్ ఒకే చోట!'
              : 'The single master room containing all curated educational web links (Skill-Lync, NCERT, MIT, SWAYAM), live video masterclasses, complete digital textbook libraries, AI homework solvers, and an interactive real-time Voice AI tutor.'
            }
          </p>

          {/* Quick Metrics / Highlights */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              onClick={() => setActiveTab('weblinks')}
              className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-300" />
              <span>50+ Web Portals</span>
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Video className="w-3.5 h-3.5 text-red-300" />
              <span>Video Masterclasses</span>
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span>Digital E-Books Library</span>
            </button>
            <button
              onClick={() => setActiveTab('ai-solvers')}
              className="bg-white/15 hover:bg-white/25 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-300" />
              <span>AI Solvers (Gemini, ChatGPT)</span>
            </button>
            <button
              onClick={() => setActiveTab('voice-chatbot')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-4 py-1.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer animate-pulse"
            >
              <Mic className="w-3.5 h-3.5 text-slate-950" />
              <span>🎙️ Voice AI Chatbot</span>
            </button>
          </div>
        </div>

        <div className="absolute right-4 -bottom-8 opacity-10 pointer-events-none hidden md:block">
          <GraduationCap className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* 🧭 2. MASTER TUTOR'S ROOM NAVIGATION TABS */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-2xs sticky top-[138px] z-20 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-max">
          {[
            { id: 'all-in-one', label: '🌟 All-in-One Master Room', telugu: 'మొత్తం రూమ్', icon: Layers },
            { id: 'weblinks', label: '🌐 All Web Links (Skill-Lync & Portals)', telugu: 'వెబ్‌సైట్ లింక్స్', icon: Globe },
            { id: 'videos', label: '🎬 Video Links & Player', telugu: 'వీడియో లెక్చర్లు', icon: Video },
            { id: 'books', label: '📚 Digital Books & Syllabus', telugu: 'ఈ-బుక్స్ లైబ్రరీ', icon: BookOpen },
            { id: 'ai-solvers', label: '🧠 AI Solvers (Gemini, Mathway)', telugu: 'AI సాల్వర్స్', icon: Bot },
            { id: 'voice-chatbot', label: '🎙️ Live Voice AI Chatbot', telugu: 'వాయిస్ AI చాట్‌బాట్', icon: Mic, highlight: true },
            { id: 'live-classes', label: '🏫 Live Classes & Whiteboard', telugu: 'లైవ్ తరగతులు', icon: Tv }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TutorsRoomTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  isActive
                    ? tab.highlight 
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs'
                      : 'bg-orange-600 text-white shadow-xs'
                    : tab.highlight
                    ? 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100'
                    : 'text-slate-700 hover:bg-orange-50 hover:text-orange-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.highlight ? 'text-amber-700' : 'text-orange-600'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 TAB 1: ALL-IN-ONE MASTER OVERVIEW                                      */}
      {/* ========================================================================= */}
      {activeTab === 'all-in-one' && (
        <div className="space-y-6">
          
          {/* Spotlight Row: Featured Engineering & Live Voice Assistant */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Box: Skill-Lync Engineering & Free Tech Resources */}
            <div className="lg:col-span-7 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 text-white border border-slate-800 shadow-clean-lg space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Featured Partner
                  </span>
                  <span className="text-emerald-300 text-xs font-bold">
                    ✓ Verified Engineering Repository
                  </span>
                </div>
                <span className="text-xs font-mono text-orange-400 bg-white/10 px-2 py-0.5 rounded">
                  resources.skill-lync.com
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>🚀 Skill-Lync Learning Resources</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Free engineering project blueprints, EV technology guides, MATLAB & Python coding tutorials, CFD/FEA simulation roadmaps, and technical whitepapers.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['⚡ EV Technology', '💻 Python & MATLAB', '🚗 Automotive & CFD', '🤖 Robotics & IoT', '🛠️ Free Blueprints'].map((item, idx) => (
                  <span key={idx} className="bg-white/10 text-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10">
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://resources.skill-lync.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Open resources.skill-lync.com</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => {
                    setActiveTab('voice-chatbot');
                    handleVoiceSubmit('Tell me about engineering projects on resources.skill-lync.com');
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-2"
                >
                  <Mic className="w-3.5 h-3.5 text-orange-400" />
                  <span>Ask Voice AI About Skill-Lync</span>
                </button>
              </div>
            </div>

            {/* Right Box: Live Voice AI Chatbot Quick Trigger */}
            <div className="lg:col-span-5 bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 rounded-3xl p-6 text-white shadow-clean-lg space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    Interactive Audio AI
                  </span>
                  <span className="text-white text-xs font-bold flex items-center gap-1">
                    <Radio className="w-3.5 h-3.5 text-white animate-pulse" /> Live Speech Engine
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  🎙️ Real-time Voice AI Tutor
                </h3>
                <p className="text-xs text-orange-50 leading-relaxed">
                  Speak naturally into your microphone in English, Telugu, or Hindi. The AI will speak back with step-by-step explanations!
                </p>
              </div>

              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-orange-100">
                  <span>Voice Status:</span>
                  <span className="text-emerald-200">● Mic Ready (Browser Speech)</span>
                </div>
                <p className="text-xs text-white/90 italic">
                  "Try asking: 'Explain photosynthesis in Telugu' or 'How do I solve quadratic equations?'"
                </p>
              </div>

              <button
                onClick={() => setActiveTab('voice-chatbot')}
                className="w-full bg-white hover:bg-orange-50 text-orange-900 font-black text-xs sm:text-sm py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mic className="w-4 h-4 text-orange-600" />
                <span>Launch Interactive Voice Chatbot</span>
              </button>
            </div>
          </div>

          {/* Quick Hub Grid: 4 Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pillar 1: Web Links */}
            <div 
              onClick={() => setActiveTab('weblinks')}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-orange-300 hover:shadow-clean transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">All Web Links Hub</h4>
                <p className="text-xs text-slate-500 mt-0.5">Skill-Lync, NCERT, Khan Academy, Diksha, SWAYAM, MIT OCW.</p>
              </div>
              <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                Explore All Links →
              </span>
            </div>

            {/* Pillar 2: Video Player */}
            <div 
              onClick={() => setActiveTab('videos')}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-orange-300 hover:shadow-clean transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">Video Masterclasses</h4>
                <p className="text-xs text-slate-500 mt-0.5">NPTEL IIT lectures, Swayam Prabha, 3D Science, Telugu Sahityam.</p>
              </div>
              <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                Watch Videos →
              </span>
            </div>

            {/* Pillar 3: Digital Books */}
            <div 
              onClick={() => setActiveTab('books')}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-orange-300 hover:shadow-clean transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">Digital Books & E-Library</h4>
                <p className="text-xs text-slate-500 mt-0.5">NCERT Class 1-12, SCERT AP/TS, OpenStax, Project Gutenberg.</p>
              </div>
              <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                Read & Download E-Books →
              </span>
            </div>

            {/* Pillar 4: AI Solvers */}
            <div 
              onClick={() => setActiveTab('ai-solvers')}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-orange-300 hover:shadow-clean transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">All AI Solvers Suite</h4>
                <p className="text-xs text-slate-500 mt-0.5">Gemini 2.5/3.7, Answers AI, ChatGPT-4o, Mathway, Perplexity.</p>
              </div>
              <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                Launch AI Solvers →
              </span>
            </div>
          </div>

          {/* Quick Live Class Broadcast Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Live Classroom Schedule & Zoom Rooms
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('live-classes')}
                className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
              >
                <span>Enter Live Classroom</span> →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {LIVE_SESSIONS.slice(0, 2).map((session) => (
                <div key={session.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-red-100 text-red-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                        {session.status.toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        {session.board} • {session.grade}
                      </span>
                    </div>
                    <h4 className="font-black text-slate-900 text-sm mt-1">
                      {language === 'te' ? session.teluguTitle : session.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Teacher: {session.teacher} • {session.timeSlot}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={session.zoomLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1 shadow-2xs"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Zoom</span>
                    </a>
                    <button
                      onClick={() => {
                        setSelectedSession(session);
                        setActiveTab('live-classes');
                      }}
                      className="bg-white hover:bg-orange-50 text-slate-800 border border-slate-200 font-bold text-xs px-3.5 py-1.5 rounded-xl"
                    >
                      Interactive Room
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🌐 TAB 2: ALL WEB LINKS                                                   */}
      {/* ========================================================================= */}
      {activeTab === 'weblinks' && (
        <div className="space-y-6">
          
          {/* Filter and Search Bar */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-2xl">
              {['All', 'Engineering & STEM', 'Curriculum & Boards', 'Coding & IDEs', 'Math & Science Tools', 'Research & Libraries', 'Free Education'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedWebCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedWebCategory === cat
                      ? 'bg-orange-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search web portals, engineering, NCERT..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Web Links Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredWebLinks.map((link) => (
              <div 
                key={link.id}
                className={`bg-white rounded-3xl p-5 border transition-all flex flex-col justify-between space-y-4 hover:shadow-clean ${
                  link.isFeatured ? 'border-orange-300 ring-2 ring-orange-500/10' : 'border-slate-200'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      link.isFeatured ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {link.badge}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {link.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-base">
                      {link.name}
                    </h4>
                    <p className="text-xs font-bold text-orange-700 mt-0.5">
                      {link.teluguName}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {link.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-slate-400 truncate max-w-[150px]">
                    {link.url.replace('https://', '')}
                  </span>

                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow-2xs transition-all flex items-center gap-1.5"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🎬 TAB 3: ALL VIDEO LINKS & VIDEO PLAYER                                  */}
      {/* ========================================================================= */}
      {activeTab === 'videos' && (
        <div className="space-y-6">
          
          {/* Active Featured Video Player Display */}
          <div className="bg-slate-950 rounded-3xl p-6 text-white border border-slate-800 shadow-clean-lg space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  {activePlayingVideo.badge}
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white mt-1">
                  {activePlayingVideo.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Channel: {activePlayingVideo.channel} • Duration: {activePlayingVideo.duration}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(activePlayingVideo.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Open in YouTube App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded Responsive Video Frame */}
            <div className="aspect-video w-full rounded-2xl bg-black overflow-hidden border border-slate-800 relative flex items-center justify-center">
              <iframe
                src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(activePlayingVideo.title)}`}
                title={activePlayingVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activePlayingVideo.description}
            </p>
          </div>

          {/* Video Lecture Playlist Library */}
          <div className="space-y-4">
            <h4 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Video className="w-5 h-5 text-orange-600" />
              <span>Full Video Masterclasses & Lecture Archive</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVideos.map((video) => (
                <div 
                  key={video.id}
                  onClick={() => {
                    setActivePlayingVideo(video);
                    window.scrollTo({ top: 180, behavior: 'smooth' });
                  }}
                  className={`bg-white rounded-3xl p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-3 hover:shadow-clean ${
                    activePlayingVideo.id === video.id ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="bg-red-100 text-red-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                        {video.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {video.duration}
                      </span>
                    </div>

                    <h5 className="font-black text-slate-900 text-sm line-clamp-2">
                      {video.title}
                    </h5>
                    <p className="text-xs font-bold text-orange-700 line-clamp-1">
                      {video.teluguTitle}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {video.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      {video.channel}
                    </span>
                    <button className="bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-black px-3 py-1.5 rounded-xl flex items-center gap-1">
                      <Play className="w-3 h-3 fill-current" />
                      <span>Play Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📚 TAB 4: ALL DIGITAL BOOKS & E-LIBRARY                                   */}
      {/* ========================================================================= */}
      {activeTab === 'books' && (
        <div className="space-y-6">
          
          {/* Books Header & Filter */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['All', 'Mathematics', 'Science', 'Physics', 'Telugu', 'Literature'].map((subj) => (
                <button
                  key={subj}
                  onClick={() => setSelectedBookSubject(subj)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedBookSubject === subj
                      ? 'bg-orange-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  {subj === 'All' ? '📚 All E-Books' : subj}
                </button>
              ))}
            </div>

            <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Free Official & Open Access Textbooks</span>
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBooks.map((book) => (
              <div 
                key={book.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs hover:shadow-clean transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      {book.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {book.format} • {book.size}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-base">
                      {book.title}
                    </h4>
                    <p className="text-xs font-bold text-orange-700 mt-0.5">
                      {book.teluguTitle}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {book.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                    <span>{book.board}</span>
                    <span>•</span>
                    <span>{book.grade}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={book.readUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Online</span>
                  </a>

                  <a
                    href={book.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow-2xs transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🧠 TAB 5: ALL AI SOLVERS & CHATBOTS                                       */}
      {/* ========================================================================= */}
      {activeTab === 'ai-solvers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Bot className="w-6 h-6 text-orange-600" />
              <span>Universal AI Solver & Chatbot Suite (Instant Launch)</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Direct access to the world's most powerful AI reasoning engines, homework solvers, and multi-language mathematical tutors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TUTOR_QUICK_AI_LINKS.map((ai) => (
              <div 
                key={ai.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-2xs hover:shadow-clean transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      {ai.badge}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      {ai.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 text-lg">
                      {ai.name}
                    </h4>
                    <p className="text-xs font-bold text-orange-700 mt-0.5">
                      {ai.teluguName}
                    </p>
                    <p className="text-xs text-slate-500 font-semibold mt-1">
                      {ai.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {ai.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      if (ai.id === 'voice-chhot-ai') {
                        setActiveTab('voice-chatbot');
                      } else if (onAskAI) {
                        onAskAI(`Help me solve with ${ai.name}`);
                      }
                    }}
                    className="bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold px-3 py-2 rounded-xl transition-all"
                  >
                    Quick Ask
                  </button>

                  <a
                    href={ai.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow-2xs transition-all flex items-center gap-1.5"
                  >
                    <span>Launch {ai.name.split(' ')[0]}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🎙️ TAB 6: LIVE VOICE AI CHATBOT ROOM                                      */}
      {/* ========================================================================= */}
      {activeTab === 'voice-chatbot' && (
        <div className="space-y-6">
          
          {/* Main Voice AI Interactive Stage */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-clean-lg space-y-6">
            
            {/* Top Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    🎙️ SuperParent Voice AI Tutor
                  </h3>
                  <p className="text-xs text-orange-300 font-medium">
                    Conversational Speech-to-Speech Tutor • మాట్లాడండి & వినండి
                  </p>
                </div>
              </div>

              {/* Language & Voice Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={voiceLanguage}
                  onChange={(e) => setVoiceLanguage(e.target.value as any)}
                  className="bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 focus:outline-none"
                >
                  <option value="en-US">🇺🇸 English Voice</option>
                  <option value="te-IN">🇮🇳 తెలుగు (Telugu Voice)</option>
                  <option value="hi-IN">🇮🇳 हिन्दी (Hindi Voice)</option>
                </select>

                <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-bold">
                  <span>Speed:</span>
                  <button 
                    onClick={() => setVoiceSpeechSpeed(s => s === 1.0 ? 1.25 : s === 1.25 ? 0.85 : 1.0)}
                    className="text-orange-400 hover:underline"
                  >
                    {voiceSpeechSpeed}x
                  </button>
                </div>

                {isSpeaking && (
                  <button
                    onClick={stopSpeaking}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1"
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Stop Audio</span>
                  </button>
                )}
              </div>
            </div>

            {/* Central Animated Audio Visualizer & Mic Button */}
            <div className="py-6 flex flex-col items-center justify-center space-y-4 text-center">
              
              {/* Pulsing Mic Button */}
              <button
                onClick={toggleListening}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl cursor-pointer ${
                  isListening
                    ? 'bg-red-600 ring-8 ring-red-500/30 scale-110 animate-pulse'
                    : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:scale-105 shadow-orange-glow'
                }`}
              >
                {isListening ? (
                  <Mic className="w-10 h-10 text-white animate-bounce" />
                ) : (
                  <Mic className="w-10 h-10 text-white" />
                )}
              </button>

              <div>
                <p className="text-sm font-bold text-white">
                  {isListening ? '🔴 Listening to your voice... Speak now!' : 'Click the Microphone to Speak'}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {speechRecognitionSupported ? 'Real-time browser speech recognition active' : 'Speech recognition fallback active'}
                </p>
              </div>

              {/* Real-time Voice Transcript Display */}
              {voiceTranscript && (
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-orange-500/40 max-w-xl w-full text-left space-y-2">
                  <span className="text-[10px] font-black uppercase text-orange-400">
                    Recognized Voice:
                  </span>
                  <p className="text-sm text-white font-medium">
                    "{voiceTranscript}"
                  </p>
                  <button
                    onClick={() => handleVoiceSubmit()}
                    className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-1.5 rounded-xl shadow-xs flex items-center gap-1 mt-2"
                  >
                    <span>Submit Query</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Suggested Voice Prompts */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-400">
                ⚡ Or click a sample question to ask the Voice AI:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'What are the best engineering resources on resources.skill-lync.com?',
                  'Explain Newton\'s third law with everyday examples in Telugu',
                  'How do I calculate compound interest with Vedic math shortcuts?',
                  'Tell me the summary of Class 10 NCERT Science Chapter 1',
                  'Explain photosynthesis and chemical equation step by step'
                ].map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleVoiceSubmit(prompt)}
                    className="bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium px-3 py-1.5 rounded-xl border border-white/10 text-left transition-all"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Chat Conversation Log */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="text-sm font-black text-slate-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-400" />
                <span>Voice Conversation Transcript</span>
              </h4>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {voiceChatHistory.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl text-xs sm:text-sm ${
                      msg.sender === 'user'
                        ? 'bg-orange-600 text-white ml-auto max-w-[85%]'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 mr-auto max-w-[90%]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-[11px] opacity-80">
                        {msg.sender === 'user' ? '👤 You (Voice Question)' : '🎙️ AI Voice Tutor'}
                      </span>
                      <span className="text-[10px] opacity-60 font-mono">{msg.time}</span>
                    </div>
                    <p className="leading-relaxed">{msg.text}</p>
                    
                    {msg.sender === 'ai' && (
                      <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2">
                        <button
                          onClick={() => speakText(msg.text)}
                          className="text-[11px] font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Replay Audio Voice</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🏫 TAB 7: LIVE CLASSES & WHITEBOARD ROOM                                  */}
      {/* ========================================================================= */}
      {activeTab === 'live-classes' && (
        <div className="space-y-6">
          
          {/* Main Virtual Classroom Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 Columns: Live Stage & Interactive Whiteboard */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Active Session Card */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-5">
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

                  {/* Join Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={selectedSession.zoomLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-black px-3.5 py-2 rounded-xl text-xs shadow-2xs flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Join Zoom</span>
                    </a>
                    <a
                      href="https://classroom.google.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-3.5 py-2 rounded-xl text-xs shadow-2xs flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Google Classroom</span>
                    </a>
                  </div>
                </div>

                {/* Interactive Whiteboard Canvas */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <PenTool className="w-4 h-4 text-orange-600" />
                      <span>Interactive Live Whiteboard (Canvas)</span>
                    </span>

                    <div className="flex items-center gap-2">
                      {['#ea580c', '#2563eb', '#16a34a', '#000000'].map((col) => (
                        <button
                          key={col}
                          onClick={() => setDrawColor(col)}
                          style={{ backgroundColor: col }}
                          className={`w-5 h-5 rounded-full border-2 ${drawColor === col ? 'border-orange-500 scale-110' : 'border-white'}`}
                        />
                      ))}
                      <button
                        onClick={clearCanvas}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Clear</span>
                      </button>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden bg-slate-50 relative h-64">
                    <canvas
                      ref={canvasRef}
                      width={640}
                      height={256}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      className="w-full h-full cursor-crosshair bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Live In-Class Chat & Instant Q&A */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-orange-600" />
                    <h4 className="font-black text-slate-900 text-sm">Live Class Discussion</h4>
                  </div>
                  <button
                    onClick={() => setHandRaised(!handRaised)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                      handRaised ? 'bg-amber-500 text-white animate-bounce' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Hand className="w-3.5 h-3.5" />
                    <span>{handRaised ? 'Hand Raised ✋' : 'Raise Hand'}</span>
                  </button>
                </div>

                <div className="space-y-3 mt-3 max-h-[360px] overflow-y-auto pr-1">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1 border border-slate-100">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                        <span className={msg.role === 'teacher' ? 'text-orange-700 font-black' : msg.role === 'ai' ? 'text-emerald-700 font-black' : 'text-blue-700 font-black'}>
                          {msg.sender}
                        </span>
                        <span>{msg.time}</span>
                      </div>
                      <p className="text-slate-800">{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input Form */}
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!inputMsg.trim()) return;
                const newMsg = {
                  sender: 'You (Student/Parent)',
                  role: 'student' as const,
                  text: inputMsg.trim(),
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setChatMessages(prev => [...prev, newMsg]);
                setInputMsg('');
              }} className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Type a doubt for the teacher or AI..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-xl shadow-2xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
