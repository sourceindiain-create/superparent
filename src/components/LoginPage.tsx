import React, { useState, useRef } from 'react';
import { UserRole, UserAccount, NavTab, AppThemeId } from '../types';
import { 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  KeyRound, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Unlock, 
  Bot, 
  Award,
  Zap,
  ArrowLeft,
  Home,
  Check,
  Globe,
  ExternalLink,
  BookOpen,
  Video,
  Palette,
  Layers,
  FileText,
  Play,
  RotateCcw,
  Compass,
  Smile,
  Gamepad2,
  Wrench,
  Search,
  Filter
} from 'lucide-react';
import { APP_THEMES } from '../data/themes';
import { MediaLinkModal, MediaModalProps } from './MediaLinkModal';

interface LoginPageProps {
  currentUser: UserAccount;
  onLogin: (user: UserAccount) => void;
  setActiveTab: (tab: NavTab) => void;
  currentTheme: AppThemeId;
  masterAccessGranted: boolean;
  onToggleMasterAccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentUser,
  onLogin,
  setActiveTab,
  currentTheme,
  masterAccessGranted,
  onToggleMasterAccess
}) => {
  const theme = APP_THEMES[currentTheme] || APP_THEMES['gurukul-amber'];

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [emailInput, setEmailInput] = useState('student@superparent.in');
  const [passwordInput, setPasswordInput] = useState('student123');
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string | null>(null);

  // Children All Ages Menu State
  const [kidsCategory, setKidsCategory] = useState<'all' | 'elearning' | 'create' | 'books' | 'videos' | 'canvas'>('all');
  const [kidsSearch, setKidsSearch] = useState('');
  const [activeMediaModal, setActiveMediaModal] = useState<MediaModalProps>({
    isOpen: false,
    onClose: () => {},
    title: ''
  });

  // Mini In-Page Quick Canvas State for "Create Things"
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#ea580c');
  const [brushSize, setBrushSize] = useState(5);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
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

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = image;
    a.download = `my-creation-${Date.now()}.png`;
    a.click();
  };

  // 1-Click Instant Guest Access Handler for Kids Practice Mode
  const handleInstantKidsGuestAccess = (destinationTab: NavTab, label: string) => {
    const guestKidUser: UserAccount = {
      id: 'guest-kid-' + Date.now(),
      email: 'kid.free@superparent.in',
      name: 'Young Learner (Free Practice Mode)',
      role: 'student',
      avatar: '🌟',
      grade: 'Class 5',
      enrollmentStatus: 'Active',
      hasFullAccess: true,
      xpPoints: 1200,
      streakDays: 1,
      permissions: {
        canAccessAllCourses: true,
        canAccessAllPerks: true,
        canApproveMarketplace: true,
        canManageUsers: false,
        canGenerateCertificates: true,
        canAccessAdminPortal: false,
        canRunDiagnostics: true
      }
    };
    onLogin(guestKidUser);
    setLoginSuccessMessage(`✨ Entering ${label} in Free Practice Mode!`);
    setTimeout(() => {
      setActiveTab(destinationTab);
    }, 400);
  };

  // Comprehensive Children All Ages E-Learning, Books, Videos & Create Dataset
  const CHILDREN_ALL_RESOURCES = [
    {
      id: 'e-learning-for-kids',
      title: 'e-Learning for Kids - Free Digital Curriculum',
      category: 'elearning',
      categoryLabel: 'E-Learning Portal',
      badge: 'Ages 5-12 • 800+ Lessons',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      webUrl: 'https://www.e-learningforkids.org',
      icon: Globe,
      iconColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      description: 'Free, fun digital education for children worldwide aged 5 to 12. Offers 800+ interactive courses in mathematics, science, environmental inquiry, health, and computer skills with zero cost.',
      features: [
        'Global curriculum for Math (counting, fractions, geometry, multiplication)',
        'Engaging Science & Environmental units (earth, space, biology, weather)',
        'Child-friendly game-based interactive checkpoints & certificates'
      ],
      ageRange: 'Ages 5 - 12 (All Classes)'
    },
    {
      id: 'kiddo-worksheets',
      title: 'kiddoworksheets.com - Visual Learning Printables',
      category: 'elearning',
      categoryLabel: 'Visual Worksheets',
      badge: 'Visual Treat • Tracing & Letters',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      webUrl: 'https://www.kiddoworksheets.com',
      icon: FileText,
      iconColor: 'text-rose-600',
      bgColor: 'bg-rose-50',
      description: 'Kiddo worksheets are a visual treat that will help teach your kids number and letter recognition, basic scientific principles, and tracing to improve fine motor skills and handwriting.',
      features: [
        'Pencil control & fine motor skill tracing worksheets',
        'Visual number and alphabet recognition with colorful illustrations',
        'Basic science diagrams, animal habitats, and primary math printables'
      ],
      ageRange: 'Pre-K, LKG, UKG & Primary Classes'
    },
    {
      id: 'hand2mind',
      title: 'hand2mind - Manipulative-Based Learning Resources',
      category: 'elearning',
      categoryLabel: 'Hands-On STEM',
      badge: 'PreK through Grade 12',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      webUrl: 'https://www.hand2mind.com',
      icon: Layers,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      description: 'Visit hand2mind (formerly ETA Cuisenaire) and explore manipulative based educational resources for PreK through grade 12 teachers, students, and parents to build real conceptual depth.',
      features: [
        'Hands-on math manipulatives: Cuisenaire rods, Base Ten blocks, and Fraction tiles',
        'STEM & Science discovery experiment kits and sensory learning sets',
        'Multisensory literacy & phonics tools for all developmental stages'
      ],
      ageRange: 'PreK to Grade 12 (All Grades)'
    },
    {
      id: 'pbs-kids',
      title: 'PBS KIDS - Educational Games, Shows & Videos',
      category: 'elearning',
      categoryLabel: 'Kids Video & Games',
      badge: '100% Free • Certified Safe',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      webUrl: 'https://pbskids.org',
      icon: Play,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'Educational games and videos from Daniel Tiger’s Neighborhood, Wild Kratts, Curious George, Arthur, and other beloved PBS KIDS shows to build science, literacy, and social skills.',
      features: [
        '100+ Free educational games covering animals, engineering, and reading',
        'Safe, ad-free streaming videos and full animated educational episodes',
        'Curriculum-aligned tracks promoting creative problem solving'
      ],
      ageRange: 'Ages 3 - 10 (Preschool to Grade 5)'
    },
    {
      id: 'create-things-studio',
      title: 'Kids "Create Things" Innovation & Invention Studio',
      category: 'create',
      categoryLabel: 'Practice & Creation Mode',
      badge: 'Free Interactive Sandbox',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      icon: Palette,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      targetTab: 'kids-lab' as NavTab,
      description: 'Interactive sandbox mode where kids can design 3D science models, draw digital art, build DIY paper origami and robotic circuits, and generate creative stories with AI mentors.',
      features: [
        'Digital Art & Canvas creation with instant PNG download',
        '3D Interactive Science Anatomy, Solar System, and Physics machines',
        'DIY toy building, cardboard hydraulics, and origami step-by-step'
      ],
      ageRange: 'All Ages (Kids & Teens)'
    },
    {
      id: 'scratch-mit',
      title: 'Scratch Creative Coding Studio (MIT)',
      category: 'create',
      categoryLabel: 'Interactive Coding',
      badge: 'Free Block Coding & Games',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
      webUrl: 'https://scratch.mit.edu',
      icon: Wrench,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Create stories, games, and animations. Share with others around the world. Designed by MIT Media Lab for kids of all ages to learn logical thinking and computational creativity.',
      features: [
        'Drag-and-drop block coding for animated sprites and sound effects',
        'Build custom arcade games, interactive greeting cards, and music mixers',
        'Child-safe global creative coding community'
      ],
      ageRange: 'Ages 6 - 16'
    },
    {
      id: 'code-org',
      title: 'Code.org - Learn Computer Science with Puzzles',
      category: 'create',
      categoryLabel: 'Coding Adventures',
      badge: 'Hour of Code • Free For All',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      webUrl: 'https://code.org',
      icon: Bot,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Interactive computer science adventures featuring Minecraft, Star Wars, Frozen, and AI for Oceans. Learn programming logic through fun self-paced coding puzzles.',
      features: [
        'Hour of Code game-based coding challenges',
        'App Lab & Game Lab to build mobile web apps',
        'AI & Machine Learning ethics and fundamentals for young innovators'
      ],
      ageRange: 'Kindergarten to Grade 12'
    },
    {
      id: 'storyweaver-pratham',
      title: 'StoryWeaver (Pratham Books) - 50,000+ Free Storybooks',
      category: 'books',
      categoryLabel: 'Free E-Book Library',
      badge: '50,000+ Books • 300+ Languages',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
      webUrl: 'https://storyweaver.org.in',
      icon: BookOpen,
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      description: 'StoryWeaver is India’s largest open-access digital repository of multilingual children’s storybooks created by Pratham Books. Read free in Telugu, Hindi, English, Sanskrit, and 300+ world languages.',
      features: [
        'Filter storybooks by reading level (Emergent, Early, Independent, Advanced)',
        'Rich cultural folklore, science stories, adventure, and moral tales',
        'Downloadable PDFs and audio-read-along stories for bedtime and classroom'
      ],
      ageRange: 'Ages 3 - 14 (All Reading Levels)'
    },
    {
      id: 'oxford-owl-books',
      title: 'Oxford Owl - Free Children’s E-Book Library',
      category: 'books',
      categoryLabel: 'Leveled E-Books',
      badge: 'Free Oxford Reading Tree',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      webUrl: 'https://home.oxfordowl.co.uk/reading/free-ebooks/',
      icon: BookOpen,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Free tablet-friendly e-book library from Oxford University Press to help children develop reading skills at home. Includes Biff, Chip and Kipper stories and phonics guides.',
      features: [
        'Leveled phonics e-books for ages 3–11 with interactive activities',
        'Audio narration option to support pronunciation and comprehension',
        'Parent reading tips and comprehension check questions'
      ],
      ageRange: 'Ages 3 - 11'
    },
    {
      id: 'icdl-library',
      title: 'International Children’s Digital Library (ICDL)',
      category: 'books',
      categoryLabel: 'World E-Library',
      badge: 'Global Multicultural Stories',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      webUrl: 'http://en.childrenslibrary.org',
      icon: Globe,
      iconColor: 'text-sky-600',
      bgColor: 'bg-sky-50',
      description: 'A global library of outstanding children’s books digitized to promote tolerance and cultural understanding across over 60 countries and 50 languages.',
      features: [
        'Explore historical and cultural picture books from Asia, Europe, and Americas',
        'Full-color high-resolution scanned illustrated pages',
        'Completely free public educational access'
      ],
      ageRange: 'Ages 4 - 15'
    },
    {
      id: 'scishow-kids-videos',
      title: 'SciShow Kids - Science E-Videos & Discoveries',
      category: 'videos',
      categoryLabel: 'Science E-Videos',
      badge: 'Curious Kids Questions',
      badgeColor: 'bg-red-100 text-red-800 border-red-300',
      webUrl: 'https://www.youtube.com/@scishowkids',
      videoUrl: 'https://www.youtube.com/watch?v=kLfl6QfQn6Y',
      icon: Video,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'SciShow Kids explains that curious "Why?" about dinosaurs, volcanoes, planets, animal powers, and human body secrets in lively, 5-minute animated videos hosted by Jessi and Squeaks.',
      features: [
        'Answers to common questions: "Why do we sneeze?", "How do seeds grow?"',
        'Simple kitchen science experiments kids can do with parents',
        'Engaging colorful animations and scientific vocabulary'
      ],
      ageRange: 'Ages 4 - 11'
    },
    {
      id: 'nasa-space-place',
      title: 'NASA Space Place - Solar System & Cosmos Videos',
      category: 'videos',
      categoryLabel: 'Space & Astronomy',
      badge: 'Official NASA for Kids',
      badgeColor: 'bg-slate-900 text-amber-300 border-slate-700',
      webUrl: 'https://spaceplace.nasa.gov',
      icon: Sparkles,
      iconColor: 'text-amber-400',
      bgColor: 'bg-slate-900 text-white',
      description: 'Explore the universe with NASA Space Place. Watch real telescope animations of black holes, Mars rovers, Jupiter’s storms, and earth satellite views created specifically for kids.',
      features: [
        'Interactive 3D solar system models & lunar phases',
        'NASA astronaut video clips and rocket launch explainers',
        'Craft projects: make your own paper spacecraft and sun dial'
      ],
      ageRange: 'Ages 6 - 16'
    },
    {
      id: 'wild-kratts-nature',
      title: 'Wild Kratts - Creature Power Animal Explorations',
      category: 'videos',
      categoryLabel: 'Nature & Wildlife',
      badge: 'PBS KIDS Creature Powers',
      badgeColor: 'bg-lime-100 text-lime-800 border-lime-300',
      webUrl: 'https://pbskids.org/wildkratts/videos',
      icon: Video,
      iconColor: 'text-lime-600',
      bgColor: 'bg-lime-50',
      description: 'Join Chris and Martin Kratt as they travel the world to meet incredible wild animals, learning biology and ecology through entertaining creature adventures.',
      features: [
        'Deep dives into cheetah speed, eagle vision, and ocean blue whales',
        'Habitats preservation and ecosystem food chains',
        'Free full video clips and creature power quizzes'
      ],
      ageRange: 'Ages 4 - 12'
    }
  ];

  const filteredChildrenResources = CHILDREN_ALL_RESOURCES.filter(r => {
    const matchesCat = kidsCategory === 'all' || r.category === kidsCategory;
    const matchesSearch = kidsSearch === '' || 
      r.title.toLowerCase().includes(kidsSearch.toLowerCase()) ||
      r.description.toLowerCase().includes(kidsSearch.toLowerCase()) ||
      r.badge.toLowerCase().includes(kidsSearch.toLowerCase()) ||
      r.categoryLabel.toLowerCase().includes(kidsSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Preset Fast-Demo Accounts
  const demoAccounts: {
    role: UserRole;
    label: string;
    email: string;
    name: string;
    icon: any;
    desc: string;
    accessBadge: string;
    gradeText: string;
  }[] = [
    {
      role: 'student',
      label: 'Student Account',
      email: 'student@superparent.in',
      name: 'Chaitanya Reddy',
      icon: GraduationCap,
      desc: 'Access 11 AI courses, $200k+ developer tool packs, quizzes, science models, and earn certificates.',
      accessBadge: '100% Free Student Learning Access',
      gradeText: 'Class 8 • CBSE Curriculum'
    },
    {
      role: 'parent',
      label: 'Parent Account',
      email: 'parent@superparent.in',
      name: 'Rajesh & Lakshmi Reddy',
      icon: Users,
      desc: 'Monitor child growth map, approve marketplace creations, view psychology guides, and manage subscription.',
      accessBadge: 'Full Parental Supervision Access',
      gradeText: 'Class 8 Student Guardian'
    },
    {
      role: 'admin',
      label: 'Super Admin Portal',
      email: 'admin@superparent.in',
      name: 'Super Admin (EMFI Lead)',
      icon: ShieldCheck,
      desc: 'Master 100% permission control, feature testing suite, approve student inventions, user audit logs.',
      accessBadge: '100% Master Key Superuser',
      gradeText: 'System Administrator'
    }
  ];

  const handleSelectDemoAccount = (acc: typeof demoAccounts[0]) => {
    setSelectedRole(acc.role);
    setEmailInput(acc.email);
    setPasswordInput(acc.role === 'admin' ? 'admin123' : `${acc.role}123`);
  };

  const handleExecuteLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      let loggedUser: UserAccount;
      if (selectedRole === 'admin') {
        loggedUser = {
          id: 'user-admin-1',
          email: emailInput,
          name: 'Super Admin (EMFI Lead)',
          role: 'admin',
          avatar: '🛡️',
          grade: 'Class 10',
          phone: '+91 7981967919',
          enrollmentStatus: 'Admin Superuser',
          hasFullAccess: true,
          xpPoints: 99999,
          streakDays: 100,
          permissions: {
            canAccessAllCourses: true,
            canAccessAllPerks: true,
            canApproveMarketplace: true,
            canManageUsers: true,
            canGenerateCertificates: true,
            canAccessAdminPortal: true,
            canRunDiagnostics: true
          }
        };
      } else if (selectedRole === 'parent') {
        loggedUser = {
          id: 'user-parent-1',
          email: emailInput,
          name: 'Rajesh & Lakshmi Reddy',
          role: 'parent',
          avatar: '👨‍👩‍👧',
          grade: 'Class 8',
          phone: '+91 7989997015',
          enrollmentStatus: 'Premium Gurukul Family',
          hasFullAccess: masterAccessGranted,
          xpPoints: 4800,
          streakDays: 21,
          permissions: {
            canAccessAllCourses: true,
            canAccessAllPerks: true,
            canApproveMarketplace: true,
            canManageUsers: false,
            canGenerateCertificates: true,
            canAccessAdminPortal: false,
            canRunDiagnostics: true
          }
        };
      } else {
        loggedUser = {
          id: 'user-student-1',
          email: emailInput,
          name: 'Chaitanya Reddy',
          role: 'student',
          avatar: '👦',
          grade: 'Class 8',
          phone: '+91 7981967919',
          enrollmentStatus: 'Premium Gurukul',
          hasFullAccess: masterAccessGranted,
          xpPoints: 3450,
          streakDays: 14,
          permissions: {
            canAccessAllCourses: true,
            canAccessAllPerks: true,
            canApproveMarketplace: false,
            canManageUsers: false,
            canGenerateCertificates: true,
            canAccessAdminPortal: false,
            canRunDiagnostics: true
          }
        };
      }

      onLogin(loggedUser);
      setIsLoading(false);
      setLoginSuccessMessage(`Successfully logged in as ${loggedUser.name} (${loggedUser.role.toUpperCase()})`);

      setTimeout(() => {
        if (loggedUser.role === 'admin') {
          setActiveTab('admin');
        } else {
          setActiveTab('home');
        }
      }, 800);
    }, 400);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Return & Back Navigation Buttons */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-300 shadow-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-orange-600" />
            <span>Return to Home</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Current Session:</span>
          <span className="bg-slate-100 text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full border border-slate-300">
            {currentUser.name} ({currentUser.role.toUpperCase()})
          </span>
        </div>
      </div>

      {/* Main Login Header Hero */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-clean-md relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 text-xs font-extrabold px-4 py-1.5 rounded-full border border-orange-200">
              <KeyRound className="w-4 h-4 text-orange-600" />
              <span>GURUKUL SECURE AUTHENTICATION & ACCESS PORTAL</span>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-black px-3.5 py-1.5 rounded-full border border-emerald-300 shadow-2xs">
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>Live Domain: superparent.dev</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Log in to SUPER PARENT Gurukul
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            Choose your role to enter as <strong className="text-slate-900">Student</strong>, <strong className="text-slate-900">Parent</strong>, or <strong className="text-slate-900">Super Admin</strong> with full 100% access across all hubs, AI mentors, courses, and management tools.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 NEW: CHILDREN ALL-AGE FREE PRACTICE MODE & E-LEARNING STATION */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-rose-500/10 border-2 border-amber-300 rounded-3xl p-5 sm:p-8 shadow-md relative overflow-hidden space-y-6">
        {/* Glow Header Accent */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-amber-200/80">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Children & Kids All-Age Free Learning Station</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Free Practice Mode & Kids Activity Hub</span>
              <span className="text-xl">🎨🚀📚</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-medium max-w-2xl">
              100% Free Access for all ages: Explore <strong>e-Learning for Kids</strong>, <strong>kiddo worksheets</strong>, <strong>hand2mind</strong>, <strong>PBS KIDS</strong>, <strong>free e-books & stories</strong>, <strong>curiosity e-videos</strong>, and our <strong>"Create Things" Innovation Studio</strong> with no login barriers!
            </p>
          </div>

          {/* Quick 1-Click Free Guest Access Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleInstantKidsGuestAccess('kids-lab', 'Kids 3D & AI Creative Lab')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-black shadow-xs hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>🎨 Free Create Mode</span>
            </button>
            <button
              onClick={() => handleInstantKidsGuestAccess('practice-master', 'Practice Master Zone')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black shadow-xs hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>🌟 Free Practice Master</span>
            </button>
            <button
              onClick={() => handleInstantKidsGuestAccess('stories', 'Moral Stories & E-Books')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-black shadow-xs hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>📖 Free E-Books Hub</span>
            </button>
          </div>
        </div>

        {/* Category Navigation Pills & Real-Time Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: '🌟 All Kids Hubs', count: CHILDREN_ALL_RESOURCES.length },
              { id: 'elearning', label: '🌐 E-Learning & Portals', count: CHILDREN_ALL_RESOURCES.filter(r => r.category === 'elearning').length },
              { id: 'create', label: '🛠️ Create Things & Coding', count: CHILDREN_ALL_RESOURCES.filter(r => r.category === 'create').length },
              { id: 'books', label: '📚 Free E-Books & Libraries', count: CHILDREN_ALL_RESOURCES.filter(r => r.category === 'books').length },
              { id: 'videos', label: '🎬 Educational E-Videos', count: CHILDREN_ALL_RESOURCES.filter(r => r.category === 'videos').length },
              { id: 'canvas', label: '🎨 Quick Doodle Studio', count: 1 }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setKidsCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  kidsCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  kidsCategory === cat.id ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={kidsSearch}
              onChange={(e) => setKidsSearch(e.target.value)}
              placeholder="Search kids links, books, videos..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-amber-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* VIEW 1: LIVE QUICK DOODLE & DRAWING CANVAS (IF CANVAS TAB SELECTED) */}
        {kidsCategory === 'canvas' ? (
          <div className="bg-white border border-amber-200 rounded-2xl p-4 sm:p-6 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-orange-600" />
                  <span>Kids Free Practice Mode: Quick Doodle & Creative Canvas</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Draw, sketch ideas, practice handwriting, and download your artwork for free!
                </p>
              </div>

              {/* Canvas Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  {['#ea580c', '#2563eb', '#16a34a', '#dc2626', '#9333ea', '#0f172a'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setBrushColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-6 h-6 rounded-lg transition-transform ${brushColor === c ? 'scale-110 ring-2 ring-slate-800' : 'opacity-80'}`}
                      title={c}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-xl text-xs font-bold text-slate-700">
                  <span>Size:</span>
                  <input
                    type="range"
                    min="2"
                    max="24"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-16 accent-orange-600 cursor-pointer"
                  />
                  <span className="text-[11px] font-mono">{brushSize}px</span>
                </div>

                <button
                  onClick={clearCanvas}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Clear</span>
                </button>

                <button
                  onClick={downloadDrawing}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs transition-all"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save PNG</span>
                </button>

                <button
                  onClick={() => handleInstantKidsGuestAccess('kids-lab', 'Full Kids 3D & AI Creative Studio')}
                  className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Full Studio →</span>
                </button>
              </div>
            </div>

            {/* Drawing Canvas Area */}
            <div className="w-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl overflow-hidden flex justify-center items-center relative touch-none">
              <canvas
                ref={canvasRef}
                width={800}
                height={340}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="bg-white cursor-crosshair max-w-full h-auto rounded-xl shadow-xs"
              />
            </div>
          </div>
        ) : (
          /* VIEW 2: CARDS GRID FOR ALL CHILDREN RESOURCES, BOOKS, VIDEOS & CREATE TOOLS */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChildrenResources.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200/90 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2.5">
                    {/* Top Row: Category & Badges */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {item.categoryLabel}
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>

                    {/* Title and Icon */}
                    <div className="flex items-start gap-3 pt-1">
                      <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center shrink-0 border border-slate-100 shadow-2xs`}>
                        <Icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-sm group-hover:text-orange-600 transition-colors leading-snug">
                          {item.title}
                        </h4>
                        <span className="text-[11px] font-bold text-slate-400">
                          {item.ageRange}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Feature Points */}
                    <div className="bg-slate-50 rounded-xl p-2.5 space-y-1 text-[11px] text-slate-700">
                      {item.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold text-xs leading-none">✓</span>
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Interactive Modal Details or Direct External Launch */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    {item.targetTab ? (
                      <button
                        onClick={() => handleInstantKidsGuestAccess(item.targetTab!, item.title)}
                        className="flex-1 py-2 px-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                      >
                        <Palette className="w-3.5 h-3.5" />
                        <span>Launch Create Studio</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => setActiveMediaModal({
                            isOpen: true,
                            onClose: () => setActiveMediaModal(prev => ({ ...prev, isOpen: false })),
                            title: item.title,
                            category: item.categoryLabel,
                            webUrl: item.webUrl,
                            videoUrl: item.videoUrl,
                            description: item.description,
                            keyPoints: item.features
                          })}
                          className="flex-1 py-2 px-3 bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                          <span>Explore & Notes</span>
                        </button>

                        {item.webUrl && (
                          <a
                            href={item.webUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 flex items-center justify-center transition-all cursor-pointer"
                            title="Open in new window"
                          >
                            <ExternalLink className="w-4 h-4 text-slate-600" />
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fast 1-Click Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {demoAccounts.map((acc) => {
          const Icon = acc.icon;
          const isSelected = selectedRole === acc.role;
          return (
            <div
              key={acc.role}
              onClick={() => handleSelectDemoAccount(acc)}
              className={`cursor-pointer rounded-2xl p-6 border-2 transition-all relative ${
                isSelected
                  ? 'bg-orange-50/50 border-orange-500 shadow-orange-glow ring-2 ring-orange-500/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-clean'
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-orange-600" />
              </div>

              <span className="text-[11px] font-bold text-orange-700 uppercase tracking-wider block mb-1">
                {acc.accessBadge}
              </span>

              <h3 className="text-lg font-black text-slate-900 mb-1">
                {acc.label}
              </h3>

              <div className="text-xs font-semibold text-slate-500 mb-3">
                {acc.gradeText}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {acc.desc}
              </p>

              <div className="bg-slate-100 p-2 rounded-lg text-[11px] font-mono text-slate-700 flex items-center justify-between">
                <span>{acc.email}</span>
                <span className="text-slate-400 font-bold">1-Click Pick</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Login Form Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-clean-md max-w-xl mx-auto">
        <form onSubmit={handleExecuteLogin} className="space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Credentials Authentication
              </h2>
              <p className="text-xs text-slate-500">
                Selected Role: <strong className="text-orange-600 uppercase">{selectedRole}</strong>
              </p>
            </div>

            <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Access Ready</span>
            </span>
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-orange-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none transition-colors"
              placeholder="e.g. student@superparent.in"
            />
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 focus:border-orange-500 focus:bg-white rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none transition-colors"
              placeholder="Enter password"
            />
          </div>

          {/* Master 100% Access Checkbox */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Unlock className="w-4 h-4 text-amber-600" />
              <div>
                <div className="text-xs font-bold text-amber-900">Grant 100% Full Access Master Key</div>
                <div className="text-[11px] text-amber-700">Unlocks all 11 AI courses, $200k+ perks & admin tools</div>
              </div>
            </div>
            <button
              type="button"
              onClick={onToggleMasterAccess}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                masterAccessGranted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {masterAccessGranted ? 'ENABLED (100%)' : 'DISABLED'}
            </button>
          </div>

          {loginSuccessMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{loginSuccessMessage}</span>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-3 px-6 rounded-xl shadow-orange-glow hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            {isLoading ? (
              <span>Authenticating Credentials...</span>
            ) : (
              <>
                <span>Sign In as {selectedRole.toUpperCase()}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Role Feature Comparison Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-clean-md">
        <h3 className="text-lg font-black text-slate-900 mb-4">
          🔐 Gurukul Access Level Permissions Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200">
                <th className="p-3 rounded-l-lg">Feature / Module</th>
                <th className="p-3">👦 Student Role</th>
                <th className="p-3">👨‍👩‍👧 Parent Role</th>
                <th className="p-3 rounded-r-lg">🛡️ Super Admin Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-semibold">
              <tr>
                <td className="p-3 font-bold text-slate-900">11 AI & Prompt Engineering Masterclass</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Full Access (100%)</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Full Access (100%)</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Full Access (100%)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">$200k+ Free Student Developer Packs</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Eligible (GitHub/Notion/Canva)</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Savings Guide & Setup</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Manage & Add Packs</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Ask SUPER AI (10 Multi-Experts)</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Voice, Vision & Code</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Psychology & Health Mentors</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Prompt Tuning & Testing</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Marketplace Creation & Buying</td>
                <td className="p-3 text-slate-700">Submit Creation (Needs Parent OK)</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Approve & Buy</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Global Master Approval</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">Admin Control Center & Audit Logs</td>
                <td className="p-3 text-slate-400">❌ Restricted</td>
                <td className="p-3 text-slate-400">❌ Restricted</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Full Superuser Admin</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900">100% Comprehensive Website Test Suite</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Available</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Available</td>
                <td className="p-3 text-emerald-600 font-bold">✅ Live Diagnostic Runner</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Live Domain Banner: superparent.dev */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-700/50 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-emerald-500/30">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Configured Public Domain</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>https://superparent.dev</span>
              <span className="text-sm font-normal text-emerald-400 font-mono">🔒 HTTPS Active</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl">
              Official custom web domain for <strong>SUPER PARENT</strong>. Live across global CDNs with encrypted SSL security.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://ais-pre-6h3ojl2oh67dewvc67wqfx-682266057961.asia-east1.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 transition-all shadow-xs"
            >
              <span>Visit Live Web App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-indigo-800/60 text-xs">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-indigo-300 font-bold block text-[11px]">Primary Cloud Run</span>
            <span className="text-slate-200 font-mono text-[11px] truncate block">ais-pre-6h3ojl2oh67dewvc...</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-indigo-300 font-bold block text-[11px]">Firebase Web Domain</span>
            <span className="text-slate-200 font-mono text-[11px] truncate block">studio-6989353372-64cd3.web.app</span>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <span className="text-indigo-300 font-bold block text-[11px]">Custom Domain Target</span>
            <span className="text-emerald-400 font-bold text-[11px] block">superparent.dev</span>
          </div>
        </div>
      </div>

      {/* Interactive Media and Web Modal */}
      <MediaLinkModal {...activeMediaModal} />
    </div>
  );
};
