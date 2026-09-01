import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Cpu, 
  Building2, 
  HeartHandshake, 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  Bot, 
  Layers, 
  FileText, 
  Video, 
  Heart, 
  Rocket, 
  Library, 
  CheckCircle2,
  FileCode,
  Award,
  Zap,
  Tag,
  Users
} from 'lucide-react';
import { MediaLinkModal } from './MediaLinkModal';

interface PracticeMasterZoneProps {
  onAskAI?: (query: string) => void;
}

export type MasterDomain = 'all' | 'academic' | 'libraries' | 'spiritual' | 'technical-startups';
export type PortalCategory = 
  | 'all'
  | 'school-syllabus'
  | 'kids-stem-creative'
  | 'engineering-research'
  | 'global-telugu-libraries'
  | 'startups-company'
  | 'spiritual-sanskar';

export type ResourceFormat = 'all' | 'portals' | 'textbooks' | 'books' | 'research' | 'startups' | 'audiobooks-spiritual';

export interface ResourceLinkItem {
  id: string;
  title: string;
  teluguTitle: string;
  domain: MasterDomain;
  category: PortalCategory;
  categoryLabel: string;
  format: ResourceFormat;
  targetAudience: string;
  badge: string;
  badgeColor: string;
  icon: any;
  iconColor: string;
  bgColor: string;
  url: string;
  description: string;
  teluguDescription: string;
  features: string[];
  suggestedPrompt: string;
}

export const PracticeMasterZone: React.FC<PracticeMasterZoneProps> = ({ onAskAI }) => {
  const [activeDomain, setActiveDomain] = useState<MasterDomain>('all');
  const [activeCategory, setActiveCategory] = useState<PortalCategory>('all');
  const [activeFormat, setActiveFormat] = useState<ResourceFormat>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // In-App Preview Modal State
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

  const resourceList: ResourceLinkItem[] = [
    // --- 1. ACADEMIC & SCHOOL SYLLABUS (1st - 10th Class: CBSE, IB, State Boards, International) ---
    {
      id: 'aglasem-schools',
      title: 'Aglasem Schools & NCERT Solutions',
      teluguTitle: 'అగ్లాసెమ్ స్కూల్స్ పోర్టల్ (1-12వ తరగతి స్టడీ మెటీరియల్)',
      domain: 'academic',
      category: 'school-syllabus',
      categoryLabel: 'School Syllabus (1st-10th)',
      format: 'portals',
      targetAudience: '1st - 12th Class Students (CBSE & State Boards)',
      badge: 'Free NCERT & Papers',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: BookOpen,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      url: 'https://schools.aglasem.com/',
      description: 'Complete NCERT chapter-wise solutions, CBSE sample question papers, revision notes, syllabus blueprints, and online mock tests.',
      teluguDescription: 'ఎన్‌సీఈఆర్‌టీ చాప్టర్ వారీ సమాధానాలు, సీబీఎస్‌ఈ మోడల్ పేపర్లు మరియు ఉచిత నోట్స్.',
      features: [
        'NCERT Solutions for Class 1 to 12 in Math, Science, Social & English',
        'Official Sample Papers with step-by-step marking schemes',
        'Quick Revision Notes & Formula Mind Maps',
        'Free Olympiad & Competitive Mock Practice Tests'
      ],
      suggestedPrompt: 'Explain how to use Aglasem NCERT solutions and sample papers for 10th board preparation'
    },
    {
      id: 'ncert-official',
      title: 'NCERT Official Digital Textbooks Portal',
      teluguTitle: 'ఎన్‌సీఈఆర్‌టీ అధికారిక డిజిటల్ పాఠ్యపుస్తకాలు',
      domain: 'academic',
      category: 'school-syllabus',
      categoryLabel: 'School Syllabus (1st-10th)',
      format: 'textbooks',
      targetAudience: 'Class 1 to 12 Students & Teachers',
      badge: 'Govt Official Textbooks',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: GraduationCap,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      url: 'https://ncert.nic.in/',
      description: 'Official repository of all NCERT textbooks in PDF format for classes 1 to 12 in English, Hindi, Urdu, and Sanskrit.',
      teluguDescription: '1 నుండి 12వ తరగతి వరకు అన్ని ఎన్‌సీఈఆర్‌టీ పాఠ్యపుస్తకాల అధికారిక ఉచిత పీడీఎఫ్‌లు.',
      features: [
        'Complete original textbooks for all subjects (English & Hindi Medium)',
        'Exemplar Problems with advanced thinking questions',
        'Teacher manual guides and laboratory experiment handbooks'
      ],
      suggestedPrompt: 'What are the main advantages of solving NCERT Exemplar problems for CBSE exams?'
    },
    {
      id: 'diksha-portal',
      title: 'DIKSHA - National Digital Platform for Teachers & Students',
      teluguTitle: 'దీక్ష (DIKSHA) - జాతీయ డిజిటల్ విద్యా వేదిక',
      domain: 'academic',
      category: 'school-syllabus',
      categoryLabel: 'School Syllabus (1st-10th)',
      format: 'portals',
      targetAudience: 'CBSE, AP SCERT, Telangana SCERT & All State Boards',
      badge: 'National Platform',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Layers,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      url: 'https://diksha.gov.in/',
      description: 'One Nation One Digital Platform containing state-aligned QR code energized textbooks, interactive 3D simulations, and video classes.',
      teluguDescription: 'కేంద్ర & రాష్ట్ర బోర్డుల క్యూఆర్ కోడ్ వీడియో పాఠాలు, ఇంటరాక్టివ్ వర్క్‌షీట్లు.',
      features: [
        'Interactive QR-code textbook lessons in Telugu, Hindi, English & regional languages',
        'Competency-based learning assessments and worksheets',
        'Official AP & Telangana State Board curriculum mapped digital content'
      ],
      suggestedPrompt: 'How can AP and Telangana state board students utilize the DIKSHA portal for exam revision?'
    },
    {
      id: 'khan-academy',
      title: 'Khan Academy Free Personalized Learning',
      teluguTitle: 'ఖాన్ అకాడమీ - ఉచిత ప్రపంచ స్థాయి విద్య',
      domain: 'academic',
      category: 'school-syllabus',
      categoryLabel: 'School Syllabus (1st-10th)',
      format: 'portals',
      targetAudience: 'KG to High School & Early College',
      badge: '100% Free Forever',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      icon: Video,
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      url: 'https://www.khanacademy.org/',
      description: 'World-renowned interactive video lessons, adaptive math mastery drills, biology, chemistry, computing, and world history.',
      teluguDescription: 'గణితం, సైన్స్ మరియు కంప్యూటర్ ప్రోగ్రామింగ్ కోసం ప్రపంచ ప్రఖ్యాత ఉచిత వీడియోలు.',
      features: [
        'Gamified mastery system with instant feedback on math & physics problems',
        'CBSE aligned math curriculum with step-by-step video solutions',
        'Computer programming courses (JavaScript, HTML/CSS, SQL)'
      ],
      suggestedPrompt: 'Show me a recommended learning schedule on Khan Academy for mastering algebra and geometry'
    },
    {
      id: 'cbse-academic',
      title: 'CBSE Academic & Curriculum Portal',
      teluguTitle: 'సీబీఎస్‌ఈ అధికారిక అకడమిక్ పోర్టల్',
      domain: 'academic',
      category: 'school-syllabus',
      categoryLabel: 'School Syllabus (1st-10th)',
      format: 'portals',
      targetAudience: 'CBSE Class 9, 10, 11 & 12',
      badge: 'Official CBSE',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: FileText,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      url: 'https://cbseacademic.nic.in/',
      description: 'CBSE official syllabus, question banks, sample question papers, assessment schemes, and competency-focused question materials.',
      teluguDescription: 'సీబీఎస్‌ఈ తాజా సెలబస్, ప్రశ్నపత్రాలు మరియు మోడల్ మూల్యాంకన విధానాలు.',
      features: [
        'Official Annual Curriculum & Marking Scheme',
        'CBSE Practice Question Banks & Case-based Study Questions',
        'Skill Education training modules for artificial intelligence and coding'
      ],
      suggestedPrompt: 'What is the format of competency-based case study questions in CBSE Class 10 board exams?'
    },
    {
      id: 'ap-ts-scert',
      title: 'AP & Telangana State SCERT Textbooks Portal',
      teluguTitle: 'ఆంధ్రప్రదేశ్ & తెలంగాణ ఎస్సీఈఆర్‌టీ పాఠ్యపుస్తకాలు',
      domain: 'academic',
      category: 'school-syllabus',
      categoryLabel: 'School Syllabus (1st-10th)',
      format: 'textbooks',
      targetAudience: 'AP & Telangana State Syllabus 1st to 10th Class',
      badge: 'AP & TS State Boards',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: BookOpen,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      url: 'https://scert.ap.gov.in/',
      description: 'Official textbooks, workbooks, and teacher handbooks for Andhra Pradesh and Telangana state board syllabus in Telugu & English medium.',
      teluguDescription: 'ఏపీ & తెలంగాణ ప్రభుత్వ పాఠశాలల పాఠ్యపుస్తకాలు, వర్క్‌బుక్స్ మరియు అభ్యాస దీపికలు.',
      features: [
        'Free PDF downloads of 1st to 10th Class Telugu & English medium books',
        'State SSC Public Examination model papers and blueprint',
        'Bilingual textbooks with clear Telugu explanations'
      ],
      suggestedPrompt: 'Provide key tips for scoring 10/10 GPA in AP/TS SSC 10th board exams'
    },
    {
      id: 'ib-resources',
      title: 'IB (International Baccalaureate) Free Resources',
      teluguTitle: 'ఐబీ ఇంటర్నేషనల్ బాకలారియాట్ ఉచిత రిసోర్సెస్',
      domain: 'academic',
      category: 'school-syllabus',
      categoryLabel: 'School Syllabus (1st-10th)',
      format: 'textbooks',
      targetAudience: 'International & IB PYP, MYP & DP Students',
      badge: 'International IB',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: Globe,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      url: 'https://ibresources.org/',
      description: 'Open-access guides, past question papers, subject revision guides, and theory of knowledge (TOK) study notes for IB curricula.',
      teluguDescription: 'అంతర్జాతీయ ఐబీ పాఠశాలల విద్యార్థులకు సిలబస్ గైడ్‌లు & స్టడీ నోట్స్.',
      features: [
        'IB MYP and DP subject revision guides',
        'Extended Essay (EE) and Internal Assessment (IA) exemplars',
        'Past exam practice questions with examiner commentaries'
      ],
      suggestedPrompt: 'Explain how the IB curriculum differs from CBSE and how to excel in inquiry-based learning'
    },
    {
      id: 'openstax-books',
      title: 'OpenStax Free Peer-Reviewed Textbooks (Rice University)',
      teluguTitle: 'ఓపెన్‌స్టాక్స్ - రైస్ యూనివర్సిటీ ఉచిత ప్రామాణిక పుస్తకాలు',
      domain: 'academic',
      category: 'school-syllabus',
      categoryLabel: 'School Syllabus (1st-10th)',
      format: 'textbooks',
      targetAudience: 'High School, AP & Foundation Students',
      badge: 'Open Access Textbooks',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      icon: BookOpen,
      iconColor: 'text-sky-600',
      bgColor: 'bg-sky-50',
      url: 'https://openstax.org/',
      description: '100% free, peer-reviewed textbooks for Physics, Chemistry, Biology, Calculus, Statistics, and Economics created by Rice University.',
      teluguDescription: 'ప్రపంచ స్థాయి ప్రొఫెసర్లు రచించిన ఉచిత సైన్స్ & మ్యాథ్స్ పాఠ్యపుస్తకాలు.',
      features: [
        'High-resolution PDF and interactive web reader format',
        'End-of-chapter practice problem sets with detailed solutions',
        'Used by top international schools and universities worldwide'
      ],
      suggestedPrompt: 'Suggest the best OpenStax books for Physics and Calculus foundations'
    },

    // --- 2. KIDS & CREATIVE LABS (AnatomyZone, 123apps, PhET) ---
    {
      id: 'anatomyzone',
      title: 'AnatomyZone 3D Human Body Anatomy',
      teluguTitle: 'అనాటమీ జోన్ 3D మానవ శరీర శాస్త్రం & ట్యుటోరియల్స్',
      domain: 'academic',
      category: 'kids-stem-creative',
      categoryLabel: 'Kids & Creative Labs',
      format: 'portals',
      targetAudience: 'Kids, Biology Students & Medical Aspirants',
      badge: '3D Human Anatomy',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: Heart,
      iconColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      url: 'https://anatomyzone.com/',
      description: 'Premier interactive 3D human anatomy platform featuring 3D virtual dissection, organ tutorials, muscle origins/insertions, and vascular circuits.',
      teluguDescription: 'మానవ శరీర భాగాలు, గుండె, మెదడు, ఎముకలు 3Dలో తిలకించి నేర్చుకునే అద్భుత వేదిక.',
      features: [
        '3D Interactive models of Heart, Brain, Lungs, Skeleton & Muscles',
        'Engaging medical-grade 3D video tutorials explained simply',
        'Clinical correlation notes and anatomy flashcards'
      ],
      suggestedPrompt: 'Explain the internal circulation of blood through the 4 heart chambers using 3D anatomical terms'
    },
    {
      id: '123apps-suite',
      title: '123apps All-in-One AI & Media Creative Suite',
      teluguTitle: '123apps ఉచిత ఆన్‌లైన్ ఏఐ & మీడియా ఎడిటింగ్ టూల్స్',
      domain: 'technical-startups',
      category: 'kids-stem-creative',
      categoryLabel: 'Kids & Creative Labs',
      format: 'portals',
      targetAudience: 'Kids, Content Creators & Students',
      badge: 'Free Web AI Tools',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      icon: Video,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      url: 'https://123apps.com/',
      description: 'Web-based creative suite featuring online video editor, AI vocal remover, audio cutter, screen/webcam recorder, PDF editor, and media converters.',
      teluguDescription: 'వీడియో ఎడిటింగ్, వాయిస్ రికార్డర్, కచేరీ ఆడియో కట్టర్ మరియు పీడీఎఫ్ ఎడిటర్.',
      features: [
        'No software download needed — runs 100% inside web browser',
        'AI Vocal Remover to extract background tracks for rhymes and drama',
        'Screen Recorder for coding demos and school project presentations',
        'Full PDF Suite: Merge, Split, Annotate and Sign documents'
      ],
      suggestedPrompt: 'How can a student use 123apps tools to edit science project videos and record voiceovers?'
    },
    {
      id: 'phet-simulations',
      title: 'PhET Interactive Science & Math Simulations (CU Boulder)',
      teluguTitle: 'PhET ఇంటరాక్టివ్ సైన్స్ & మ్యాథ్స్ సిమ్యులేషన్స్',
      domain: 'academic',
      category: 'kids-stem-creative',
      categoryLabel: 'Kids & Creative Labs',
      format: 'portals',
      targetAudience: 'School Students, STEM Enthusiasts & Teachers',
      badge: 'Interactive Lab',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      icon: Sparkles,
      iconColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      url: 'https://phet.colorado.edu/',
      description: 'Award-winning interactive physics, chemistry, biology, and math simulations developed by Nobel Laureate Carl Wieman at University of Colorado.',
      teluguDescription: 'భౌతిక, రసాయన మరియు జీవశాస్త్ర ప్రయోగాలు కంప్యూటర్‌లో స్వయంగా చేసే వర్చువల్ ల్యాబ్.',
      features: [
        'Explore electric circuits, projectile motion, atomic structures, and gravity visually',
        'Game-based interactive challenges with real-time sliders and meters',
        'Available in multiple Indian languages including Telugu & Hindi'
      ],
      suggestedPrompt: 'Which PhET simulations are best for understanding Ohm law and electric circuits?'
    },
    {
      id: 'pbs-kids-portal',
      title: 'PBS KIDS - Educational Games & Videos',
      teluguTitle: 'పిబిఎస్ కిడ్స్ - ఎడ్యుకేషనల్ గేమ్స్, సైన్స్ & రీడింగ్ వీడియోలు',
      domain: 'academic',
      category: 'kids-stem-creative',
      categoryLabel: 'Kids & Creative Labs',
      format: 'portals',
      targetAudience: 'Preschool to Primary (All Ages), Kids & Teachers',
      badge: '100% Free Games & Shows',
      badgeColor: 'bg-lime-100 text-lime-800 border-lime-200',
      icon: Sparkles,
      iconColor: 'text-lime-600',
      bgColor: 'bg-lime-50',
      url: 'https://pbskids.org',
      description: 'Educational games and videos from Daniel Tiger’s Neighborhood, Wild Kratts, Curious George, Arthur, and other beloved PBS KIDS shows!',
      teluguDescription: 'వైల్డ్ క్రాట్స్, డేనియల్ టైగర్ మరియు క్యూరియస్ జార్జ్ యానిమేటెడ్ పాత్రలతో సైన్స్, మ్యాథ్స్ మరియు రీడింగ్ గేమ్స్.',
      features: [
        '100+ Free interactive learning games covering nature, math, and literacy',
        'Child-safe, ad-free streaming videos and full episodes',
        'Curriculum-designed tracks supporting cognitive development'
      ],
      suggestedPrompt: 'What are the top educational games and STEM activities available on pbskids.org for elementary children?'
    },
    {
      id: 'kiddo-worksheets',
      title: 'Kiddo Worksheets - Visual Learning & Printables',
      teluguTitle: 'కిడ్డో వర్క్‌షీట్స్ - నంబర్లు, లెటర్స్ & ఫైన్ మోటార్ స్కిల్స్',
      domain: 'academic',
      category: 'kids-stem-creative',
      categoryLabel: 'Kids & Creative Labs',
      format: 'portals',
      targetAudience: 'Pre-K, Kindergarten & Primary Class Students',
      badge: 'Visual Treat Worksheets',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: FileText,
      iconColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      url: 'https://www.kiddoworksheets.com',
      description: 'Kiddo worksheets are a visual treat that will help teach your kids number and letter recognition, basic scientific principles, and tracing to improve fine motor skills.',
      teluguDescription: 'పిల్లల కోసం ఆకర్షణీయమైన రంగుల వర్క్‌షీట్లు - అక్షరాల ట్రేసింగ్, సంఖ్యల గుర్తింపు, సైన్స్ మరియు చేతిరాత సాధన.',
      features: [
        'Number & letter recognition with engaging visual illustrations and coloring',
        'Fine motor skills tracing worksheets for early handwriting and pencil grip',
        'Basic scientific principles, animal habits, patterns, and primary math printables'
      ],
      suggestedPrompt: 'How can visual tracing worksheets from kiddoworksheets.com improve fine motor skills and handwriting in early learners?'
    },
    {
      id: 'hand2mind-learning',
      title: 'hand2mind - Manipulative-Based Educational Resources',
      teluguTitle: 'హ్యాండ్‌2మైండ్ - హ్యాండ్స్-ఆన్ లెర్నింగ్ & సైన్స్/మ్యాథ్స్ మానిప్యులేటివ్స్',
      domain: 'academic',
      category: 'kids-stem-creative',
      categoryLabel: 'Kids & Creative Labs',
      format: 'portals',
      targetAudience: 'PreK through Grade 12 Teachers, Students & Parents',
      badge: 'PreK to Grade 12 Hands-On',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Layers,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      url: 'https://www.hand2mind.com',
      description: 'Visit hand2mind - formerly ETA Cuisenaire - and browse our selection of manipulative based educational resources for PreK through grade 12 teachers and kids.',
      teluguDescription: 'పిల్లలు వస్తువులను చేతులతో తాకుతూ గణితం, సైన్స్ మరియు STEM ప్రయోగాలు నేర్చుకునే హ్యాండ్స్-ఆన్ విద్యా వనరుల పోర్టల్.',
      features: [
        'Hands-on math manipulatives: Cuisenaire rods, Base Ten blocks, Fraction tiles & Number lines',
        'STEM & Science investigation kits for experiential classroom and home learning',
        'Literacy & Phonics multisensory tools for PreK through Grade 12'
      ],
      suggestedPrompt: 'How can hand2mind math manipulatives like Cuisenaire rods help elementary students understand fractions and place value?'
    },
    {
      id: 'javalab-simulations',
      title: 'Javalab.org - Interactive Science Simulations',
      teluguTitle: 'జావా ల్యాబ్ (Javalab.org) - ఇంటరాక్టివ్ సైన్స్ & ఫిజిక్స్ సిమ్యులేషన్స్',
      domain: 'academic',
      category: 'kids-stem-creative',
      categoryLabel: 'Kids & Creative Labs',
      format: 'portals',
      targetAudience: 'Science Students (Class 6-12), STEM Learners & Teachers',
      badge: 'Top Science Simulation Site',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: Cpu,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      url: 'https://javalab.org/en/',
      description: 'Popular interactive science portal featuring 600+ HTML5 simulations covering Mechanics, Waves, Optics, Electromagnetism, Thermodynamics, Chemistry, Earth Science, and Astronomy.',
      teluguDescription: 'ఫిజిక్స్, కెమిస్ట్రీ, ఎలక్ట్రిసిటీ మరియు ఖగోళ శాస్త్ర ప్రయోగాలను కంప్యూటర్‌లో కదిలే యానిమేషన్లతో స్వయంగా పరీక్షించే ఉచిత సైన్స్ పోర్టల్.',
      features: [
        '600+ Interactive HTML5 science models with real-time parameter sliders',
        'Classical Mechanics, Light Refraction, Pendulum & Wave motion simulations',
        'Electromagnetism, Lorentz Force, AC/DC generator visual experiments',
        'Earth & Space Science: Solar System orbits, Lunar phases & Seasons'
      ],
      suggestedPrompt: 'What are the top Javalab simulations for learning light refraction, pendulum motion, and electric induction?'
    },

    // --- 3. TECHNICAL & RESEARCH (IEEE, arXiv, NPTEL, MIT, Skill-Lync) ---
    {
      id: 'skill-lync-resources',
      title: 'Skill-Lync Technical Learning Resources & Engineering Lab',
      teluguTitle: 'స్కిల్-లింక్ లెర్నింగ్ రిసోర్సెస్ & ఇంజనీరింగ్ ప్రాజెక్ట్స్',
      domain: 'technical-startups',
      category: 'engineering-research',
      categoryLabel: 'Engineering & Research',
      format: 'portals',
      targetAudience: 'Engineering Students, Tech Enthusiasts & High School Innovators',
      badge: 'Free Tech Resources',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: Cpu,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      url: 'https://resources.skill-lync.com/',
      description: 'Comprehensive engineering learning repository featuring free technical blogs, project blueprints, simulation guides (CFD, FEA, CAD, MATLAB), EV technology, and software development roadmaps.',
      teluguDescription: 'మెకానికల్, ఈవీ, ఎలక్ట్రికల్, కంప్యూటర్ సైన్స్ ప్రాజెక్ట్‌లు మరియు టెక్నికల్ గైడ్‌ల సమగ్ర పోర్టల్.',
      features: [
        'Free Technical Guides & Engineering Career Roadmaps',
        'Project Blueprints across EV, Automotive, Robotics & Software',
        'MATLAB, Python, CAD, CFD & Embedded Systems Learning Notes',
        'Industry Webinars, Expert Whitepapers & Case Studies'
      ],
      suggestedPrompt: 'Explore engineering project ideas and skill development roadmaps on resources.skill-lync.com'
    },
    {
      id: 'ieee-xplore',
      title: 'IEEE Xplore Digital Library & IEEE Open',
      teluguTitle: 'ఐఈఈఈ ఎక్స్‌ప్లోర్ డిజిటల్ లైబ్రరీ & రీసెర్చ్ పేపర్స్',
      domain: 'technical-startups',
      category: 'engineering-research',
      categoryLabel: 'Engineering & Research',
      format: 'research',
      targetAudience: 'Engineering, Computer Science & AI Researchers',
      badge: 'IEEE Research Papers',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Cpu,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      url: 'https://ieeexplore.ieee.org/',
      description: 'World highest-cited scientific research database in electrical engineering, computer science, robotics, IoT, telecom, and artificial intelligence.',
      teluguDescription: 'ప్రపంచ ప్రఖ్యాత ఇంజనీరింగ్, ఏఐ మరియు కంప్యూటర్ సైన్స్ పరిశోధనా పత్రాల భాండాగారం.',
      features: [
        'Over 5+ million research papers, IEEE transactions & conference proceedings',
        'IEEE Open Access publications freely downloadable worldwide',
        'Global technology standards and patent citations'
      ],
      suggestedPrompt: 'How should an engineering student start writing their first IEEE conference paper?'
    },
    {
      id: 'arxiv-org',
      title: 'arXiv.org Open Research Repository (Cornell University)',
      teluguTitle: 'ఆర్కైవ్.ఆర్గ్ (arXiv) - కార్నెల్ యూనివర్సిటీ ఓపెన్ రీసెర్చ్',
      domain: 'technical-startups',
      category: 'engineering-research',
      categoryLabel: 'Engineering & Research',
      format: 'research',
      targetAudience: 'AI/ML Researchers, Physicists, Mathematicians & CS Students',
      badge: '2.4M+ Open Preprints',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: FileCode,
      iconColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      url: 'https://arxiv.org/',
      description: 'The world premier open-access archive for 2.4+ million scholarly articles in Machine Learning, Computer Science, Quantum Physics, and Mathematics.',
      teluguDescription: 'ఆర్టిఫిషియల్ ఇంటెలిజెన్స్, క్వాంటమ్ కంప్యూటింగ్ తాజా పరిశోధనల ఉచిత పత్రాలు.',
      features: [
        'Instant open access to cutting-edge AI (LLMs, Transformers, Diffusion models) papers',
        'Search papers by subject: cs.AI, cs.LG, cs.CV, math, physics',
        'Free full-text PDF downloads without any subscription paywalls'
      ],
      suggestedPrompt: 'Find the most influential foundational arXiv research papers on Transformer neural networks and Generative AI'
    },
    {
      id: 'nptel-swayam',
      title: 'NPTEL & SWAYAM (IITs & IISc Online Courses)',
      teluguTitle: 'ఎన్‌పీటీఈఎల్ & స్వయం - ఐఐటీ ప్రొఫెసర్ల వీడియో కోర్సులు',
      domain: 'academic',
      category: 'engineering-research',
      categoryLabel: 'Engineering & Research',
      format: 'portals',
      targetAudience: 'Engineering, Science & Postgraduate Students',
      badge: 'IIT & IISc Courses',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: GraduationCap,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      url: 'https://nptel.ac.in/',
      description: 'Initiative by 7 Indian Institutes of Technology (IIT Bombay, Delhi, Madras, Kharagpur, Kanpur, Roorkee, Guwahati) and IISc Bangalore offering 3000+ free college-level courses.',
      teluguDescription: 'ఐఐటీ మరియు ఐఐఎస్సీ ప్రొఫెసర్లు అందించే సమగ్ర ఇంజనీరింగ్ వీడియో ఉపన్యాసాలు.',
      features: [
        'High-definition video lectures across Mechanical, CS, Electrical, Civil & Biotech',
        'Downloadable lecture notes, assignments, and solution keys',
        'Recognized certificates with proctored exams for university credit transfer'
      ],
      suggestedPrompt: 'Which NPTEL courses are best for Data Structures, Algorithms, and Machine Learning?'
    },
    {
      id: 'mit-ocw',
      title: 'MIT OpenCourseWare (Massachusetts Institute of Technology)',
      teluguTitle: 'ఎంఐటీ ఓపెన్‌కోర్స్‌వేర్ - ప్రపంచ ప్రఖ్యాత ఎంఐటీ మెటీరియల్',
      domain: 'academic',
      category: 'engineering-research',
      categoryLabel: 'Engineering & Research',
      format: 'portals',
      targetAudience: 'Engineers, Scientists & Lifelong Learners',
      badge: 'MIT Official Courses',
      badgeColor: 'bg-red-100 text-red-800 border-red-200',
      icon: Globe,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      url: 'https://ocw.mit.edu/',
      description: 'Free and open publication of material from thousands of MIT undergraduate and graduate courses including lecture videos, syllabus notes, and exam papers.',
      teluguDescription: 'ఎంఐటీ యూనివర్సిటీ అసలైన క్లాస్‌రూమ్ వీడియోలు, సిలబస్ మరియు పరీక్షా పేపర్లు.',
      features: [
        'Legendary courses like Gilbert Strang Linear Algebra and Walter Lewin Physics',
        'Complete assignments with problem sets and solution keys',
        'Self-paced learning tracks for Computer Science, Robotics & Aeronautics'
      ],
      suggestedPrompt: 'Guide me through MIT 6.0001 Introduction to Computer Science and Programming in Python'
    },
    {
      id: 'google-scholar',
      title: 'Google Scholar Academic Search Engine',
      teluguTitle: 'గూగుల్ స్కాలర్ - ప్రపంచ పరిశోధనా పత్రాల శోధన',
      domain: 'technical-startups',
      category: 'engineering-research',
      categoryLabel: 'Engineering & Research',
      format: 'research',
      targetAudience: 'University Students, Ph.D. Scholars & Researchers',
      badge: 'Global Citation Index',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Search,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      url: 'https://scholar.google.com/',
      description: 'Freely accessible web search engine that indexes the full text or metadata of scholarly literature across an array of publishing formats and disciplines.',
      teluguDescription: 'ప్రపంచవ్యాప్తంగా ప్రచురితమైన అన్ని రీసెర్చ్ పేపర్లు, థీసిస్‌లు మరియు పేటెంట్లు వెతికే వేదిక.',
      features: [
        'Search across articles, theses, books, abstracts from academic publishers and professional societies',
        'Automatic citation export (BibTeX, APA, MLA) and citation count tracking',
        'Direct links to free legal open-access PDF versions'
      ],
      suggestedPrompt: 'How to use Google Scholar filters and Boolean search operators for a comprehensive literature review?'
    },

    // --- 4. GLOBAL & TELUGU FREE LIBRARIES ---
    {
      id: 'internet-archive',
      title: 'Internet Archive & Open Library',
      teluguTitle: 'ఇంటర్నెట్ ఆర్కైవ్ & ఓపెన్ లైబ్రరీ (38+ మిలియన్ పుస్తకాలు)',
      domain: 'libraries',
      category: 'global-telugu-libraries',
      categoryLabel: 'Global & Telugu Libraries',
      format: 'books',
      targetAudience: 'All Readers, Researchers & Book Lovers',
      badge: '38M+ Free Books',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
      icon: Library,
      iconColor: 'text-slate-700',
      bgColor: 'bg-slate-50',
      url: 'https://archive.org/',
      description: 'Non-profit library of millions of free books, movies, software, music, websites, and historical artifacts with digital lending library.',
      teluguDescription: 'ప్రపంచంలోని కోట్లాది ఉచిత పుస్తకాలు, చారిత్రక రికార్డులు మరియు సాఫ్ట్‌వేర్ నిధి.',
      features: [
        'Borrow millions of modern and classic books instantly online',
        'Access rare out-of-print historical manuscripts and audio recordings',
        'Searchable full-text OCR reader with adjustable font sizes and audiobook narration'
      ],
      suggestedPrompt: 'How to find rare Indian historical books and manuscripts on Internet Archive?'
    },
    {
      id: 'ndli-portal',
      title: 'National Digital Library of India (NDLI - IIT Kharagpur)',
      teluguTitle: 'భారత జాతీయ డిజిటల్ లైబ్రరీ (ఎన్‌డీఎల్‌ఐ - ఐఐటీ ఖరగ్‌పూర్)',
      domain: 'libraries',
      category: 'global-telugu-libraries',
      categoryLabel: 'Global & Telugu Libraries',
      format: 'books',
      targetAudience: 'Indian Students, Researchers & General Public',
      badge: '50M+ Indian Resources',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: BookOpen,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      url: 'https://ndl.iitkgp.ac.in/',
      description: 'Virtual repository of learning resources with single-window search facility developed by IIT Kharagpur under Ministry of Education, Govt of India.',
      teluguDescription: 'భారత ప్రభుత్వ విద్యా మంత్రిత్వ శాఖ ఆధ్వర్యంలో 5 కోట్ల పుస్తకాలు & వ్యాసాల వేదిక.',
      features: [
        'Over 50+ million learning items across school, college and research domains',
        'Multilingual support for English, Telugu, Hindi, Tamil, Bengali & Sanskrit',
        'Free access to theses, question papers, audiobooks and monographs'
      ],
      suggestedPrompt: 'How can school and college students register and use NDLI for exam preparations?'
    },
    {
      id: 'telugu-wikisource',
      title: 'Telugu Wikisource (తెలుగు వికీసోర్స్)',
      teluguTitle: 'తెలుగు వికీసోర్స్ - సమగ్ర ఉచిత తెలుగు గ్రంథాలయం',
      domain: 'libraries',
      category: 'global-telugu-libraries',
      categoryLabel: 'Global & Telugu Libraries',
      format: 'books',
      targetAudience: 'Telugu Readers, Students & Literature Enthusiasts',
      badge: 'Telugu Digital Heritage',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Library,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      url: 'https://te.wikisource.org/',
      description: 'Open-source community digital library containing thousands of digitized classical Telugu books, prabandhams, satakams, puranas, and historical novels.',
      teluguDescription: 'శతకాలు, కావ్యాలు, ప్రబంధాలు, నవలలు మరియు ప్రాచీన తెలుగు రచనల డిజిటల్ భాండాగారం.',
      features: [
        'Complete Sumati Satakam, Vemana Satakam, Dasarathi Satakam with meanings',
        'Pothana Bhagavatam, Andhra Mahabharatam, and Sri Krishna Devaraya works',
        '100% free text readable on any phone or computer'
      ],
      suggestedPrompt: 'List top 5 classical Telugu satakams with moral teachings for children from Telugu Wikisource'
    },
    {
      id: 'ttd-ebooks',
      title: 'TTD Religious & Vedic Publications (తిరుమల తిరుపతి దేవస్థానం)',
      teluguTitle: 'తిరుమల తిరుపతి దేవస్థానం ఉచిత ఈ-బుక్స్ గ్రంథాలయం',
      domain: 'libraries',
      category: 'global-telugu-libraries',
      categoryLabel: 'Global & Telugu Libraries',
      format: 'books',
      targetAudience: 'Spiritual Seekers, Devotees & Sanskrit Learners',
      badge: 'TTD Sacred Books',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: HeartHandshake,
      iconColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      url: 'https://ebooks.tirumala.org/',
      description: 'Official digital publications by Tirumala Tirupati Devasthanams featuring complete Vedas, Upanishads, Saptagiri magazines, Stotrams, and temple history.',
      teluguDescription: 'వేదాలు, ఉపనిషత్తులు, సప్తగిరి మాసపత్రిక మరియు స్తోత్రాల ఉచిత డౌన్‌లోడ్.',
      features: [
        'Rigveda, Yajurveda, Samaveda and Atharvaveda with Telugu commentary',
        'Monthly Saptagiri magazine archives in Telugu, English, Hindi, Tamil & Kannada',
        'Stotras, Annamacharya Kirtanalu, and Purana pravachanam books'
      ],
      suggestedPrompt: 'Explain the spiritual significance and history of Lord Venkateswara from TTD publications'
    },
    {
      id: 'project-gutenberg',
      title: 'Project Gutenberg (70,000+ Free Classic eBooks)',
      teluguTitle: 'ప్రాజెక్ట్ గుటెన్‌బర్గ్ - 70,000 పైగా ఉచిత క్లాసిక్ పుస్తకాలు',
      domain: 'libraries',
      category: 'global-telugu-libraries',
      categoryLabel: 'Global & Telugu Libraries',
      format: 'books',
      targetAudience: 'Literature Students, Novel Readers & English Learners',
      badge: '70k+ Classic eBooks',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: BookOpen,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      url: 'https://www.gutenberg.org/',
      description: 'Oldest digital library containing over 70,000 free eBooks of world classic literature whose copyright has expired (Shakespeare, Mark Twain, Tolstoy).',
      teluguDescription: 'ప్రపంచ ప్రసిద్ధ రచయితల క్లాసిక్ నవలలు మరియు నాటకాల ఉచిత పీడీఎఫ్‌లు.',
      features: [
        'Download in EPUB, Kindle MOBI, plain text, and online HTML format',
        'Masterpieces of world philosophy, adventure stories, and poetry',
        'No fees, no registration required'
      ],
      suggestedPrompt: 'Suggest 5 timeless classic novels from Project Gutenberg for improving English vocabulary and reading fluency'
    },

    // --- 5. STARTUPS & COMPANY BUILDING (Easy Startup to Company) ---
    {
      id: 'startup-india',
      title: 'Startup India Portal (Govt of India Official Hub)',
      teluguTitle: 'స్టార్టప్ ఇండియా - భారత ప్రభుత్వ అధికారిక స్టార్టప్ పోర్టల్',
      domain: 'technical-startups',
      category: 'startups-company',
      categoryLabel: 'Startups & Company Building',
      format: 'startups',
      targetAudience: 'Entrepreneurs, Innovators & Student Founders',
      badge: 'Govt Startup Schemes',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: Rocket,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      url: 'https://www.startupindia.gov.in/',
      description: 'Flagship initiative of Govt of India offering DPIIT recognition, 3-year income tax exemptions, ₹10,000 Cr Fund of Funds, and fast-track patent facilitation.',
      teluguDescription: 'స్టార్టప్ గుర్తింపు, ప్రభుత్వ నిధులు, పన్ను రాయితీలు మరియు పేటెంట్ సదుపాయాలు.',
      features: [
        'DPIIT Startup Recognition certificate with fast-track processing',
        'Access to Startup India Seed Fund Scheme (SISFS) grants & soft loans',
        'Free learning modules on entrepreneurship, business planning and pitch decks',
        'Government e-Marketplace (GeM) preferential public procurement'
      ],
      suggestedPrompt: 'Explain step-by-step how a student or founder can get DPIIT startup recognition in India'
    },
    {
      id: 'mca-company-reg',
      title: 'MCA Portal - Easy Company Incorporation (SPICe+ Form)',
      teluguTitle: 'ఎంసీఏ పోర్టల్ - కంపెనీ రిజిస్ట్రేషన్ (SPICe+ ఫారం)',
      domain: 'technical-startups',
      category: 'startups-company',
      categoryLabel: 'Startups & Company Building',
      format: 'startups',
      targetAudience: 'Startup Founders, Directors & Business Builders',
      badge: 'Single Window Incorporation',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Building2,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      url: 'https://www.mca.gov.in/',
      description: 'Ministry of Corporate Affairs single-window portal to register a Private Limited Company, LLP, or One Person Company (OPC) with PAN, TAN, DIN & GST in 24 hours.',
      teluguDescription: 'ప్రైవేట్ లిమిటెడ్ కంపెనీ, ఎల్‌ఎల్‌పీ రిజిస్ట్రేషన్ మరియు కార్పొరేట్ చట్టాల పోర్టల్.',
      features: [
        'SPICe+ Integrated Web Form for Name Reservation & Incorporation in one go',
        'Automated issuance of PAN, TAN, EPFO, ESIC, Professional Tax & Bank Account',
        'Check Director Identification Number (DIN) and MCA master data'
      ],
      suggestedPrompt: 'What are the documents and steps required to register a Private Limited Company using the MCA SPICe+ form?'
    },
    {
      id: 'yc-startup-school',
      title: 'Y Combinator Startup School & Founder Library',
      teluguTitle: 'వై కాంబినేటర్ స్టార్టప్ స్కూల్ - ప్రపంచ ప్రఖ్యాత యాక్సిలరేటర్',
      domain: 'technical-startups',
      category: 'startups-company',
      categoryLabel: 'Startups & Company Building',
      format: 'startups',
      targetAudience: 'Tech Founders, Product Builders & Early Innovators',
      badge: 'Top Startup Accelerator',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Rocket,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      url: 'https://www.startupschool.org/',
      description: 'Free online course and founder community by Y Combinator (the accelerator behind Airbnb, Stripe, Coinbase, Dropbox) teaching how to build billion-dollar startups.',
      teluguDescription: 'స్టార్టప్ ఆలోచన నుండి ప్రాడక్ట్-మార్కెట్ ఫిట్ మరియు ఫండింగ్ సాధించే మార్గదర్శకం.',
      features: [
        'Curriculum taught by Sam Altman, Paul Graham, and top unicorn founders',
        'Weekly founder co-working tracks and peer accountability groups',
        'Free founder deals ($100k+ in AWS, Google Cloud, Stripe, and Notion credits)'
      ],
      suggestedPrompt: 'Summarize Paul Graham key startup principles on how to get startup ideas and talk to users'
    },
    {
      id: 'product-hunt',
      title: 'Product Hunt (Global Tech & AI Launchpad)',
      teluguTitle: 'ప్రాడక్ట్ హంట్ - ప్రపంచ తాజా టెక్నాలజీ & ఏఐ ఉత్పత్తుల వేదిక',
      domain: 'technical-startups',
      category: 'startups-company',
      categoryLabel: 'Startups & Company Building',
      format: 'portals',
      targetAudience: 'Product Creators, Makers & Early Adopters',
      badge: 'Global Launchpad',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: Zap,
      iconColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      url: 'https://www.producthunt.com/',
      description: 'The place where daily new tech products, mobile apps, SaaS tools, and AI software are launched, upvoted, and reviewed by global tech enthusiasts.',
      teluguDescription: 'ప్రతిరోజూ ప్రపంచంలో విడుదలయ్యే సరికొత్త యాప్‌లు, ఏఐ టూల్స్ తెలుసుకునే వేదిక.',
      features: [
        'Launch your software to 100,000+ early adopters worldwide for free',
        'Discover trending generative AI tools, productivity suites and developer libraries',
        'Direct feedback from top tech investors and makers'
      ],
      suggestedPrompt: 'What is the recommended checklist for launching a product successfully on Product Hunt?'
    },
    {
      id: 'indie-hackers',
      title: 'Indie Hackers (Bootstrapped Startups Community)',
      teluguTitle: 'ఇండీ హ్యాకర్స్ - స్వయంకృషి స్టార్టప్ వ్యాపార సంఘం',
      domain: 'technical-startups',
      category: 'startups-company',
      categoryLabel: 'Startups & Company Building',
      format: 'startups',
      targetAudience: 'Solo Founders, Indie Developers & Micro-SaaS Builders',
      badge: 'Bootstrapped Founders',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      icon: Building2,
      iconColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      url: 'https://www.indiehackers.com/',
      description: 'Community of solo entrepreneurs and indie software developers sharing real verified monthly revenue, growth strategies, and case studies.',
      teluguDescription: 'సొంతంగా చిన్న సాఫ్ట్‌వేర్ వ్యాపారాలు నిర్మించి లాభాలు గడించే విధానాలు.',
      features: [
        'Transparent revenue breakdowns and pricing strategy discussions',
        'Ask questions to experienced founders and find co-founders',
        'Podcasts detailing how bootstrapped developers went from $0 to $50k/month'
      ],
      suggestedPrompt: 'How can a developer build and monetize a Micro-SaaS application as a solo founder?'
    },

    // --- 6. SPIRITUAL, SANSKAR & WISDOM LINKS ---
    {
      id: 'vedabase-gita',
      title: 'Vedabase.io - Bhagavad Gita As It Is & Vedic Texts',
      teluguTitle: 'వేదబేస్ - శ్రీమద్ భగవద్గీత యథాతథం & సంస్కృత శ్లోకాలు',
      domain: 'spiritual',
      category: 'spiritual-sanskar',
      categoryLabel: 'Spiritual & Sanskar',
      format: 'audiobooks-spiritual',
      targetAudience: 'Spiritual Seekers, Students & Philosophy Learners',
      badge: 'Original Sanskrit & Purport',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: HeartHandshake,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      url: 'https://vedabase.io/',
      description: 'Comprehensive digital portal of Bhagavad Gita As It Is, Srimad Bhagavatam, and Chaitanya Charitamrita with original Sanskrit Devanagari, word-for-word meanings and purports.',
      teluguDescription: 'భగవద్గీత 700 శ్లోకాలు, సంస్కృత పదాల అర్థాలు మరియు సమగ్ర తాత్పర్యాలు.',
      features: [
        'Complete 18 Chapters with word-by-word Sanskrit analysis',
        'Audio pronunciation of every sloka',
        'Searchable database across all Vedic literatures'
      ],
      suggestedPrompt: 'Explain Chapter 2 Verse 47 (Karmanye Vadhikaraste) of Bhagavad Gita with practical life application for students'
    },
    {
      id: 'valmiki-ramayan',
      title: 'Srimad Valmiki Ramayana Online Repository',
      teluguTitle: 'శ్రీమద్ వాల్మీకి రామాయణం - సమగ్ర సంస్కృత కాండలు',
      domain: 'spiritual',
      category: 'spiritual-sanskar',
      categoryLabel: 'Spiritual & Sanskar',
      format: 'audiobooks-spiritual',
      targetAudience: 'Heritage Enthusiasts & Moral Values Learners',
      badge: 'Complete 6 Kandas',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: BookOpen,
      iconColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      url: 'https://www.valmikiramayan.net/',
      description: 'Complete Sanskrit verses of Srimad Valmiki Ramayana across all 6 Kandas (Bala, Ayodhya, Aranya, Kishkindha, Sundara, and Yuddha Kanda) with English prose and word analysis.',
      teluguDescription: 'వాల్మీకి రామాయణం సంస్కృత శ్లోకాలు, సుందరకాండ మరియు తాత్పర్యాలు.',
      features: [
        'Original Slokas with Roman transliteration and poetic translations',
        'Detailed Sundara Kanda reading chapter-by-chapter',
        'Character analysis of Sri Rama, Sita Devi, Lakshmana, and Hanuman'
      ],
      suggestedPrompt: 'What are the main leadership and character qualities of Lord Rama described in Ayodhya Kanda?'
    },
    {
      id: 'holy-gita-mukundananda',
      title: 'Holy Bhagavad Gita Online (Swami Mukundananda Commentary)',
      teluguTitle: 'హోలీ భగవద్గీత - స్వామి ముకుందానంద వివరణ',
      domain: 'spiritual',
      category: 'spiritual-sanskar',
      categoryLabel: 'Spiritual & Sanskar',
      format: 'audiobooks-spiritual',
      targetAudience: 'Modern Youth, Students & Mind Management Seekers',
      badge: 'Mind Control & Peace',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: HeartHandshake,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      url: 'https://www.holy-bhagavad-gita.org/',
      description: 'Modern, highly accessible online commentary on Bhagavad Gita focusing on mind management, conquering anxiety, mental resilience, and spiritual wisdom for modern life.',
      teluguDescription: 'మనస్సు ప్రశాంతత, ఏకాగ్రత మరియు ఒత్తిడి నివారణకు భగవద్గీత మార్గం.',
      features: [
        'Easy chapter navigation with verse-by-verse audio and insightful commentary',
        'Daily Gita quote notifications and meditation guides',
        'Practical answers to modern dilemmas on duty, purpose and meditation'
      ],
      suggestedPrompt: 'How does the Bhagavad Gita teach students to control a restless mind and improve focus?'
    },
    {
      id: 'ramakrishna-mission',
      title: 'Belur Math & Ramakrishna Mission Archives',
      teluguTitle: 'బేలూరు మఠం & రామకృష్ణ మిషన్ - స్వామి వివేకానంద ప్రసంగాలు',
      domain: 'spiritual',
      category: 'spiritual-sanskar',
      categoryLabel: 'Spiritual & Sanskar',
      format: 'audiobooks-spiritual',
      targetAudience: 'Youth, Students & Character Builders',
      badge: 'Swami Vivekananda Works',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Award,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      url: 'https://belurmath.org/',
      description: 'Official digital repository of the teachings of Sri Ramakrishna Paramahamsa, Sri Sarada Devi, and the Complete Works of Swami Vivekananda on youth empowerment and Vedanta.',
      teluguDescription: 'స్వామి వివేకానంద యువతకు అందించిన సందేశాలు, రాజయోగం, కర్మయోగం గ్రంథాలు.',
      features: [
        'Complete Works of Swami Vivekananda (9 Volumes) free to read',
        'Lectures on Raja Yoga, Karma Yoga, Jnana Yoga, and Bhakti Yoga',
        'Inspiring quotes for character building, patriotism and fearlessness'
      ],
      suggestedPrompt: 'Summarize Swami Vivekananda message to the youth on self-confidence and building great character'
    },
    {
      id: 'mahabharatam-telugu-english',
      title: 'Mahabharatam & Gita Press Archives (Telugu & English)',
      teluguTitle: 'ఆంధ్ర మహాభారతం & గీతా ప్రెస్ ఆర్కైవ్స్ (తెలుగు & ఇంగ్లీష్)',
      domain: 'spiritual',
      category: 'spiritual-sanskar',
      categoryLabel: 'Spiritual & Sanskar',
      format: 'audiobooks-spiritual',
      targetAudience: 'Epic Learners, Students & Philosophy Seekers',
      badge: 'Complete 18 Parvas',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: BookOpen,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      url: 'https://gitapress.org/',
      description: 'Complete 18 Parvas of Mahabharatam by Kavitrayam (Nannaya, Tikkana, Yerrapragada) with full character arcs, Vidura Neeti, and Yaksha Prashna moral lessons in Telugu and English.',
      teluguDescription: 'కవిత్రయ మహాభారతం 18 పర్వాలు, విదుర నీతి మరియు యక్ష ప్రశ్నల సమగ్ర సంపుటి.',
      features: [
        'Complete 18 Parvas in Telugu script with lucid word-by-word summaries',
        'Vidura Neeti and Sanatsujatiya character building discourses',
        'English translation by K.M. Ganguli with searchable index'
      ],
      suggestedPrompt: 'What are the main moral life lessons taught in the Yaksha Prashna dialogue of Mahabharatam?'
    },
    {
      id: 'bible-gateway-audio',
      title: 'Holy Bible Audio & Text Portal (Telugu & English)',
      teluguTitle: 'పరిశుద్ధ బైబిల్ - తెలుగు & ఇంగ్లీష్ ఆడియో బుక్స్',
      domain: 'spiritual',
      category: 'spiritual-sanskar',
      categoryLabel: 'Spiritual & Sanskar',
      format: 'audiobooks-spiritual',
      targetAudience: 'Faith Seekers, Students & Global Literature Readers',
      badge: 'Telugu & English Audio',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: HeartHandshake,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      url: 'https://www.biblegateway.com/',
      description: 'Comprehensive digital portal of Holy Bible with complete Old and New Testament translations in Telugu (తెలుగు పరిశుద్ధ గ్రంథం) and English with dramatized audio narration.',
      teluguDescription: 'తెలుగు & ఇంగ్లీష్ పరిశుద్ధ బైబిల్ ఆడియో పాఠాలు, సామెతలు మరియు ఉపమానాలు.',
      features: [
        'Complete Old & New Testaments in Telugu font with verse search',
        'Dramatized audio playback with high-definition voice actors',
        'Inspiring parables of Jesus, Psalms, and Proverbs for children'
      ],
      suggestedPrompt: 'Summarize the parable of the Good Samaritan and its universal message of selfless love'
    },
    {
      id: 'quran-com-portal',
      title: 'Quran.com - Holy Quran with Telugu & English Audio Recitation',
      teluguTitle: 'దివ్య ఖురాన్ - తెలుగు & ఇంగ్లీష్ అనువాదం మరియు తిలావత్ ఆడియో',
      domain: 'spiritual',
      category: 'spiritual-sanskar',
      categoryLabel: 'Spiritual & Sanskar',
      format: 'audiobooks-spiritual',
      targetAudience: 'Islamic Scholars, Students & Interfaith Learners',
      badge: '114 Surahs with Audio',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: BookOpen,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      url: 'https://quran.com/',
      description: 'Official global Quran portal featuring 114 Surahs in original Arabic, clear Telugu translations (తెలుగు దివ్య ఖురాన్), word-by-word meanings, and beautiful audio recitations by world renowned Qaris.',
      teluguDescription: '114 సూరాలు, తెలుగు అనువాదం, అరబిక్ ఉచ్చారణ మరియు స్పష్టమైన ఆడియో పఠనం.',
      features: [
        'Word-by-word audio playback with Arabic script and Telugu meaning',
        'Multiple reciter voices with synchronized verse highlighting',
        'Tafseer commentaries explaining historical context and virtues'
      ],
      suggestedPrompt: 'Explain the universal moral teachings of kindness, honesty, and charity in the Holy Quran'
    },

    // --- 7. KIDS 3D NATURE, HISTORY & CULTURE DISCOVERY ---
    {
      id: 'sketchfab-3d-wildlife',
      title: 'Sketchfab 3D Nature, Wildlife & Culture Virtual Models',
      teluguTitle: 'స్కెచ్‌ఫ్యాబ్ 3D వన్యప్రాణులు, మొక్కలు & చారిత్రక నమూనాలు',
      domain: 'academic',
      category: 'kids-stem-creative',
      categoryLabel: 'Kids & Creative Labs',
      format: 'portals',
      targetAudience: 'Kids, Nature Enthusiasts & 3D Explorers',
      badge: 'Interactive 3D Views',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: Sparkles,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      url: 'https://sketchfab.com/features/3d-viewer',
      description: 'Massive online 3D viewer library for interactive 360-degree inspection of wild animals (tigers, elephants, dinosaurs), plant cells, flowers, and world historical monuments (Taj Mahal, Pyramids).',
      teluguDescription: 'జంతువులు, మొక్కలు మరియు ప్రపంచ చారిత్రక కట్టడాలను 3Dలో తిప్పి చూసే అంతర్జాతీయ వేదిక.',
      features: [
        'Realistic 3D zoom, lighting, wireframe, and animation controls',
        'Explore microscopic plant photosynthesis, flower anatomy and dinosaur bones',
        'Virtual museum tours of world heritage monuments'
      ],
      suggestedPrompt: 'How can teachers use 3D interactive models to explain biology and world history to elementary students?'
    }
  ];

  // Master Domains Definition
  const masterDomains: { id: MasterDomain; title: string; teluguTitle: string; icon: any; color: string; bgActive: string; count: number }[] = [
    {
      id: 'all',
      title: 'All Domains (సమగ్ర హబ్)',
      teluguTitle: 'అన్ని విభాగాలు',
      icon: Globe,
      color: 'text-slate-900',
      bgActive: 'bg-slate-900 text-white',
      count: resourceList.length
    },
    {
      id: 'academic',
      title: 'Academic & Syllabus (1st-10th)',
      teluguTitle: 'పాఠశాల సిలబస్ & అనాటమీ',
      icon: GraduationCap,
      color: 'text-orange-600',
      bgActive: 'bg-orange-600 text-white',
      count: resourceList.filter(r => r.domain === 'academic').length
    },
    {
      id: 'libraries',
      title: 'World & Telugu Libraries',
      teluguTitle: 'ప్రపంచ & తెలుగు గ్రంథాలయాలు',
      icon: Library,
      color: 'text-emerald-600',
      bgActive: 'bg-emerald-600 text-white',
      count: resourceList.filter(r => r.domain === 'libraries').length
    },
    {
      id: 'spiritual',
      title: 'Spiritual, Gita & Heritage',
      teluguTitle: 'భగవద్గీత, రామాయణం & సంస్కృతి',
      icon: HeartHandshake,
      color: 'text-rose-600',
      bgActive: 'bg-rose-600 text-white',
      count: resourceList.filter(r => r.domain === 'spiritual').length
    },
    {
      id: 'technical-startups',
      title: 'IEEE, Research & Startups (MCA)',
      teluguTitle: 'పరిశోధనలు & స్టార్టప్ ఇంక్యుబేషన్',
      icon: Rocket,
      color: 'text-blue-600',
      bgActive: 'bg-blue-600 text-white',
      count: resourceList.filter(r => r.domain === 'technical-startups').length
    }
  ];

  // Resource Formats Filter Definition
  const formatFilters: { id: ResourceFormat; label: string; count: number }[] = [
    { id: 'all', label: 'All Formats', count: resourceList.length },
    { id: 'portals', label: '🌐 Interactive Portals', count: resourceList.filter(r => r.format === 'portals').length },
    { id: 'textbooks', label: '📖 School Textbooks', count: resourceList.filter(r => r.format === 'textbooks').length },
    { id: 'books', label: '📚 Digital Libraries & eBooks', count: resourceList.filter(r => r.format === 'books').length },
    { id: 'research', label: '🔬 Research & IEEE', count: resourceList.filter(r => r.format === 'research').length },
    { id: 'startups', label: '🚀 Startups & Incubation', count: resourceList.filter(r => r.format === 'startups').length },
    { id: 'audiobooks-spiritual', label: '🕉️ Sacred Scriptures & Audio', count: resourceList.filter(r => r.format === 'audiobooks-spiritual').length },
  ];

  const filteredResources = useMemo(() => {
    return resourceList.filter(item => {
      const matchesDomain = activeDomain === 'all' || item.domain === activeDomain;
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesFormat = activeFormat === 'all' || item.format === activeFormat;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        item.title.toLowerCase().includes(q) ||
        item.teluguTitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.url.toLowerCase().includes(q) ||
        item.targetAudience.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q)
      );
      return matchesDomain && matchesCategory && matchesFormat && matchesSearch;
    });
  }, [resourceList, activeDomain, activeCategory, activeFormat, searchQuery]);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenPreview = (item: ResourceLinkItem) => {
    setActiveMedia({
      isOpen: true,
      title: item.title,
      teluguTitle: item.teluguTitle,
      category: `${item.categoryLabel} • ${item.url.replace(/^https?:\/\//, '')}`,
      webUrl: item.url,
      description: item.description,
      keyPoints: item.features
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Executive Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 p-6 sm:p-10 text-white shadow-2xl border border-emerald-800/80">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Globe className="w-3.5 h-3.5" />
              <span>Practice Master Zone</span>
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full">
              🎓 Academic • 📚 Digital Libraries • 🕉️ Spiritual Wisdom • 🚀 Startups & Research
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            🌐 Global Practice Master Zone
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Discover verified global resources across <strong>Academic Portals (Aglasem, NCERT, CBSE, IB)</strong>, <strong>3D Anatomy (AnatomyZone)</strong>, <strong>AI Creative Suite (123apps)</strong>, <strong>Research Archives (IEEE, arXiv, NPTEL)</strong>, <strong>World & Telugu Libraries (NDLI, Wikisource, TTD)</strong>, <strong>Startups (Govt Schemes & MCA)</strong>, and <strong>Sacred Scriptures</strong>.
          </p>

          {/* Quick Direct Launchers */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <a
              href="https://schools.aglasem.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-500 text-white font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-102"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Aglasem Schools</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <a
              href="https://anatomyzone.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rose-600 hover:bg-rose-500 text-white font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-102"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>AnatomyZone 3D</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <a
              href="https://123apps.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-102"
            >
              <Video className="w-3.5 h-3.5" />
              <span>123apps AI Suite</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <a
              href="https://ieeexplore.ieee.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-102"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>IEEE Xplore</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            <a
              href="https://www.startupindia.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-transform hover:scale-102"
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Startup India</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-4 bottom-2 opacity-10 pointer-events-none hidden lg:block text-9xl font-mono">
          🌐 🚀 🧬
        </div>
      </div>

      {/* 1. DOMAIN FILTER SWITCHER (Academic, Libraries, Spiritual, Technical & Startups) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>Select Focus Domain (త్వరిత విభాగాల ఎంపిక):</span>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {filteredResources.length} of {resourceList.length} Portals
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {masterDomains.map((dom) => {
            const Icon = dom.icon;
            const isSelected = activeDomain === dom.id;

            return (
              <button
                key={dom.id}
                onClick={() => {
                  setActiveDomain(dom.id);
                  setActiveCategory('all');
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 relative ${
                  isSelected
                    ? `${dom.bgActive} shadow-md border-transparent scale-[1.02]`
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 ' + dom.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {dom.count} Links
                  </span>
                </div>
                <div>
                  <div className="font-black text-xs leading-snug">
                    {dom.title}
                  </div>
                  <div className={`text-[10px] font-semibold ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                    {dom.teluguTitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SEARCH & FORMAT FILTERS BAR */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keywords: CBSE, Aglasem, IEEE, 123apps, Telugu Wikisource, Startup India, Gita, MCAs..."
            className="w-full pl-12 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* Format Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 shrink-0 pr-1">
            <Tag className="w-3.5 h-3.5" />
            <span>Format:</span>
          </div>
          {formatFilters.map((fmt) => {
            const isFmtActive = activeFormat === fmt.id;
            return (
              <button
                key={fmt.id}
                onClick={() => setActiveFormat(fmt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  isFmtActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{fmt.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isFmtActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {fmt.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Info & AI Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="text-xs font-bold text-slate-600">
          Showing <span className="text-slate-900 font-black">{filteredResources.length}</span> Verified Portals in <span className="text-emerald-700 font-black uppercase">{activeDomain}</span> domain
        </div>

        {onAskAI && (
          <button
            onClick={() => onAskAI('Provide a structured master guide on how students and researchers can use CBSE portals, IEEE, 123apps, AnatomyZone, and Startup India together')}
            className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ask AI Master Counselor</span>
          </button>
        )}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((item) => {
          const Icon = item.icon;
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
            >
              <div className="space-y-3.5">
                {/* Header Tag and Icon */}
                <div className="flex items-center justify-between gap-2">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${item.bgColor} ${item.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                {/* Title & Target Audience */}
                <div>
                  <h3 className="font-black text-slate-900 text-base leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-slate-500 pt-0.5">
                    {item.teluguTitle}
                  </div>
                  <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-md inline-block mt-1">
                    🎯 {item.targetAudience}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* Key Features Bullets */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Key Free Offerings:
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-700">
                    {item.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="space-y-2 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenPreview(item)}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <span>Inspect Hub</span>
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  </button>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 transition-colors flex items-center justify-center cursor-pointer"
                    title="Open in new window"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleCopyLink(item.url, item.id)}
                    className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-200 transition-colors flex items-center justify-center cursor-pointer"
                    title="Copy direct website link"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {onAskAI && (
                  <button
                    onClick={() => onAskAI(item.suggestedPrompt)}
                    className="w-full text-[11px] font-bold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50 py-1.5 px-2 rounded-lg transition-colors flex items-center justify-center gap-1 text-center cursor-pointer"
                  >
                    <Bot className="w-3 h-3 text-emerald-600" />
                    <span className="truncate">Ask AI: &quot;{item.suggestedPrompt.slice(0, 45)}...&quot;</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Global In-App Media Link & Web Resource Modal */}
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
    </div>
  );
};
