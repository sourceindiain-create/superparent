import React, { useState, useMemo } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  ExternalLink, 
  BookOpen, 
  Laptop, 
  Share2, 
  CheckCircle2, 
  Copy, 
  Search, 
  Filter, 
  Gift, 
  Award, 
  Cpu, 
  Zap, 
  Bot, 
  Compass, 
  Code2, 
  Users, 
  ShieldCheck, 
  ChevronRight, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  ArrowRight, 
  Clock, 
  FileText, 
  Globe2, 
  Eye, 
  Bookmark, 
  BrainCircuit, 
  Boxes, 
  BarChart3, 
  Network, 
  MessageSquareCode, 
  Palette, 
  CheckCircle,
  X,
  SlidersHorizontal,
  FolderCheck,
  Calculator,
  Flame,
  Lightbulb,
  Workflow
} from 'lucide-react';
import { DailyReflectionZone } from './DailyReflectionZone';

interface SuperStudentHubProps {
  onAskAI?: (prompt?: string) => void;
  onNavigateTab?: (tab: string) => void;
  onEarnXP?: (points: number, reason: string) => void;
  studentName?: string;
  currentXP?: number;
  streakDays?: number;
  initialSubTab?: 'ai-learning-path' | 'daily-reflection' | 'student-perks' | 'student-resources' | 'parent-guide' | 'software-architecture';
}

// Module Definition for Course Categorization
interface CourseModule {
  id: string;
  number: number;
  title: string;
  teluguTitle: string;
  description: string;
  tag: string;
  courses: CourseItem[];
}

interface CourseItem {
  id: string;
  number: number;
  moduleId: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  url: string;
  iconName: 'MessageSquareCode' | 'BrainCircuit' | 'Bot' | 'Code2' | 'Cpu' | 'Eye' | 'Globe2' | 'Network' | 'Boxes' | 'BarChart3' | 'Compass';
  provider: string;
  description: string;
  teluguDesc: string;
  topics: string[];
  forStudents: string;
  forParents: string;
}

export const SuperStudentHub: React.FC<SuperStudentHubProps> = ({ 
  onAskAI,
  onNavigateTab,
  onEarnXP,
  studentName = 'Chaitanya Reddy',
  currentXP = 3450,
  streakDays = 14,
  initialSubTab = 'ai-learning-path'
}) => {
  // Main Sub Tabs
  const [activeSubTab, setActiveSubTab] = useState<
    'ai-learning-path' | 'daily-reflection' | 'student-perks' | 'student-resources' | 'parent-guide' | 'software-architecture'
  >(initialSubTab);

  // Audience Mode Toggle (Student View vs Parent View)
  const [audienceMode, setAudienceMode] = useState<'student' | 'parent'>('student');

  // Real-time Universal Global Search
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [selectedQuickTag, setSelectedQuickTag] = useState<string>('all');

  // Filters
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('all');

  // Copy Feedback State
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Interactive Prompt Simulator Sandbox State
  const [selectedPromptCategory, setSelectedPromptCategory] = useState<'math' | 'physics' | 'coding' | 'telugu'>('math');
  const [customPromptInput, setCustomPromptInput] = useState('Explain Newton’s Third Law of Motion with 3 real-world sports examples and step-by-step mathematical reasoning.');

  // Completed & Bookmarked tracking with local persistence
  const [completedCourses, setCompletedCourses] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('super_student_completed_courses');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [bookmarkedItems, setBookmarkedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('super_student_bookmarks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const toggleCompleteCourse = (id: string) => {
    setCompletedCourses(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('super_student_completed_courses', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedItems(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('super_student_bookmarks', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedLink(id);
      setTimeout(() => setCopiedLink(null), 2500);
    }
  };

  const shareAllPerks = () => {
    const textToShare = `🎓 SUPER PARENT & SUPER STUDENT: $200,000+ Free Developer Tools & 11 AI Master Courses! 🚀\n\n💻 GitHub Student Developer Pack: https://education.github.com/pack\n📚 Notion Education Plus: https://www.notion.com/students\n🎨 Canva Education: https://www.canva.com/education/students\n🤖 Google AI Student Offer (Gemini): https://gemini.google/students\n⚡ Aura.ai: https://aura.ai\n\n🌟 11 AI & PROMPT ENGINEERING MASTER COURSES:\n1. Intro to Prompt Engineering: https://lnkd.in/dvh3enSM\n2. Advanced Prompt Engineering: https://lnkd.in/dhybVC8C\n3. ChatGPT 101 Guide: https://lnkd.in/dA9CEdCF\n4. ChatGPT Projects: https://lnkd.in/dRykR8dR\n5. ChatGPT & Reasoning: https://lnkd.in/d-tVy2v5\n6. Multimodality Explained: https://lnkd.in/d4uQGqZS\n7. ChatGPT Search: https://lnkd.in/dEB3C6Mq\n8. OpenAI, LLMs & ChatGPT: https://lnkd.in/dBjsEvj3\n9. Introduction to GPTs: https://lnkd.in/diG_F35j\n10. ChatGPT Data Analysis: https://lnkd.in/drRn5Ptq\n11. Deep Research: https://lnkd.in/dupmJGTS\n\nShared via SUPER PARENT Gurukul AI Platform!`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setCopiedLink('all_perks');
      setTimeout(() => setCopiedLink(null), 3000);
    }
  };

  // 4 Structured Progressive Modules for Course Categorization
  const courseModules: CourseModule[] = useMemo(() => [
    {
      id: 'module-1',
      number: 1,
      title: 'Foundations & Prompt Crafting',
      teluguTitle: 'ప్రాథమిక ప్రాంప్ట్ ఇంజనీరింగ్ & బేసిక్స్',
      description: 'Master the core mechanics of LLM communication, context delimiters, homework tutoring, and verified academic research.',
      tag: 'Stage 1 • Core Foundations',
      courses: [
        {
          id: 'course-1',
          number: 1,
          moduleId: 'module-1',
          title: 'Introduction to Prompt Engineering',
          category: 'Prompt Foundations',
          level: 'Beginner',
          duration: '45 mins',
          url: 'https://lnkd.in/dvh3enSM',
          iconName: 'MessageSquareCode',
          provider: 'AI Academy / LinkedIn Learning',
          description: 'Master the fundamentals of prompting LLMs. Learn role framing, clear delimiters, context priming, and zero-shot vs few-shot prompt formulation.',
          teluguDesc: 'ఏఐ మోడల్స్‌తో మాట్లాడటం, సరైన ఆదేశాలు (Prompts) ఇవ్వడం నేర్చుకోండి.',
          topics: ['System Prompts', 'Zero-shot vs Few-shot', 'Context Delimiters', 'Avoiding Hallucinations'],
          forStudents: 'Use this to make AI summarize textbook chapters and give clear explanations.',
          forParents: 'Teaches children how to ask precise educational questions without relying on guesswork.'
        },
        {
          id: 'course-3',
          number: 3,
          moduleId: 'module-1',
          title: 'ChatGPT 101: A Guide to Your AI Superassistant',
          category: 'Everyday Productivity',
          level: 'Beginner',
          duration: '1 hour',
          url: 'https://lnkd.in/dA9CEdCF',
          iconName: 'Bot',
          provider: 'OpenAI / Community',
          description: 'Complete hands-on starter kit to turn ChatGPT into your personalized 24/7 tutor, daily homework planner, writing coach, and study partner.',
          teluguDesc: 'చాట్‌జిపిటిని వ్యక్తిగత ట్యూటర్‌గా మరియు రోజువారీ హోంవర్క్ పార్టనర్‌గా మార్చండి.',
          topics: ['Study Timetable Planner', 'Homework Tutor Mode', 'Essay Drafting & Proofreading', 'Custom Instructions'],
          forStudents: 'Your always-available personal study buddy for exam preparation.',
          forParents: 'Saves thousands of rupees on private tuition fees with safe, guided AI tutoring.'
        },
        {
          id: 'course-7',
          number: 7,
          moduleId: 'module-1',
          title: 'ChatGPT Search & Grounded Research',
          category: 'Fact-Checked Search',
          level: 'Beginner',
          duration: '40 mins',
          url: 'https://lnkd.in/dEB3C6Mq',
          iconName: 'Globe2',
          provider: 'Search & Grounding Lab',
          description: 'Utilize live web browsing, authoritative citations, academic source verification, current affairs research, and competitive exam GK aggregation.',
          teluguDesc: 'లైవ్ వెబ్ శోధన, ప్రామాణిక గ్రంథాల రిఫరెన్సులు మరియు రీసెర్చ్.',
          topics: ['Source Verification', 'Citation Fact-checking', 'Live Search Grounding', 'Filtering Misinformation'],
          forStudents: 'Gather verified research papers, historical facts, and current affairs in seconds.',
          forParents: 'Protects children from fake news and unverified web sources through verified citations.'
        }
      ]
    },
    {
      id: 'module-2',
      number: 2,
      title: 'Applied Engineering & Builder Tools',
      teluguTitle: 'ప్రాక్టికల్ ప్రాజెక్ట్‌లు & అప్లికేషన్ల నిర్మాణం',
      description: 'Build interactive student tools, custom subject assistants, science fair bots, and run automated data analysis on spreadsheets.',
      tag: 'Stage 2 • Builder Track',
      courses: [
        {
          id: 'course-4',
          number: 4,
          moduleId: 'module-2',
          title: 'ChatGPT Projects: Build Real-World AI Apps',
          category: 'Applied Projects',
          level: 'Intermediate',
          duration: '2 hours',
          url: 'https://lnkd.in/dRykR8dR',
          iconName: 'Code2',
          provider: 'Hands-on Lab',
          description: 'Build real student tools: automatic flashcard makers, quiz generators, language translators, interactive storytelling engines, and study trackers.',
          teluguDesc: 'రియల్ ప్రాజెక్ట్‌లు, క్విజ్ జెనరేటర్లు మరియు టూల్స్ తయారు చేయండి.',
          topics: ['Interactive Quiz Bots', 'Flashcard Maker', 'Document Analyzers', 'Code Assistants'],
          forStudents: 'Create science fair projects, school club bots, and portfolio applications.',
          forParents: 'Builds a strong portfolio of practical software and STEM achievements for college applications.'
        },
        {
          id: 'course-9',
          number: 9,
          moduleId: 'module-2',
          title: 'Introduction to GPTs & Custom Assistants',
          category: 'Custom AI Agents',
          level: 'Intermediate',
          duration: '1 hour',
          url: 'https://lnkd.in/diG_F35j',
          iconName: 'Boxes',
          provider: 'GPT Builder Academy',
          description: 'Create your own specialized AI assistants without coding. Add custom knowledge files (school textbooks), API actions, and share with your classmates.',
          teluguDesc: 'కోడింగ్ లేకుండా మీ స్వంత స్కూల్ ఏఐ అసిస్టెంట్‌ని తయారు చేయండి.',
          topics: ['Custom GPT Builder', 'Knowledge Base Attachment', 'Action Schema', 'Publishing & Sharing'],
          forStudents: 'Build a custom Telugu/Sanskrit tutor, Math homework bot, or quiz engine.',
          forParents: 'Enables parents and children to build tailor-made subject assistants for school syllabus.'
        },
        {
          id: 'course-10',
          number: 10,
          moduleId: 'module-2',
          title: 'ChatGPT for Data Analysis & Visual Math',
          category: 'Data & Statistics',
          level: 'Intermediate',
          duration: '1.5 hours',
          url: 'https://lnkd.in/drRn5Ptq',
          iconName: 'BarChart3',
          provider: 'Data Science Track',
          description: 'Upload Excel sheets, CSVs, and survey data to generate instant statistical charts, bar graphs, regressions, and clean visualizations using Code Interpreter.',
          teluguDesc: 'ఎక్సెల్ డేటా అనాలిసిస్, చార్టులు మరియు మ్యాథ్స్ గ్రాఫ్‌లు తయారు చేయండి.',
          topics: ['Code Interpreter', 'Excel & CSV Analysis', 'Plotting Graphs', 'Automated Statistical Summaries'],
          forStudents: 'Analyze science experiment results and build beautiful interactive charts.',
          forParents: 'Essential skills for high school, college projects, and finance management.'
        }
      ]
    },
    {
      id: 'module-3',
      number: 3,
      title: 'Deep Logic, Reasoning & Multimodality',
      teluguTitle: 'డీప్ రీజనింగ్ & మల్టీమోడల్ విజన్ ఏఐ',
      description: 'Harness advanced Chain-of-Thought heuristics, visual math diagram extraction, and next-generation reasoning for STEM Olympiads.',
      tag: 'Stage 3 • Advanced STEM',
      courses: [
        {
          id: 'course-2',
          number: 2,
          moduleId: 'module-3',
          title: 'Advanced Prompt Engineering & Chain-of-Thought',
          category: 'Logic & Reasoning',
          level: 'Advanced',
          duration: '1.5 hours',
          url: 'https://lnkd.in/dhybVC8C',
          iconName: 'BrainCircuit',
          provider: 'AI Masterclass',
          description: 'Techniques for complex problem solving: Chain-of-Thought (CoT), Tree-of-Thoughts, ReAct framework, structured JSON outputs, and programmatic prompt chaining.',
          teluguDesc: 'గణితం, సైన్స్ సమస్యల పరిష్కారానికి అడ్వాన్స్‌డ్ ప్రాంప్ట్ టెక్నిక్స్.',
          topics: ['Chain-of-Thought (CoT)', 'ReAct Pattern', 'Structured JSON Output', 'Prompt Optimization'],
          forStudents: 'Crucial for breaking down Olympiad math, physics proofs, and competitive coding.',
          forParents: 'Fosters structured logical thinking and step-by-step analytical reasoning.'
        },
        {
          id: 'course-5',
          number: 5,
          moduleId: 'module-3',
          title: 'ChatGPT & Deep Reasoning Models',
          category: 'Reasoning Models',
          level: 'Advanced',
          duration: '1 hour',
          url: 'https://lnkd.in/d-tVy2v5',
          iconName: 'Cpu',
          provider: 'Reasoning AI Lab',
          description: 'Deep dive into next-gen reasoning models (o1/o3 series). Learn how chain-of-thought internal monologue works for olympiad math, competitive coding, and physics proofing.',
          teluguDesc: 'గణితం, ఫిజిక్స్ మరియు కాంపిటీటివ్ కోడింగ్ కోసం డీప్ రీజనింగ్ మోడల్స్.',
          topics: ['Reasoning Monologue', 'Olympiad Math Solutions', 'Formal Logic Proofs', 'Verification Methods'],
          forStudents: 'Master JEE/NEET physics, chemistry mechanisms, and advanced algebra proofs.',
          forParents: 'Equips students with high-level conceptual understanding for competitive entrance tests.'
        },
        {
          id: 'course-6',
          number: 6,
          moduleId: 'module-3',
          title: 'Multimodality Explained: Vision & Voice',
          category: 'Vision & Audio AI',
          level: 'Intermediate',
          duration: '1 hour',
          url: 'https://lnkd.in/d4uQGqZS',
          iconName: 'Eye',
          provider: 'Vision & Audio AI',
          description: 'Understand how AI perceives images, diagrams, audio recordings, and video streams. Learn image-based diagnosis, visual mathematics, and live voice interactions.',
          teluguDesc: 'చిత్రాలు, రేఖాచిత్రాలు, వాయిస్ మరియు వీడియో ద్వారా ఏఐ ఎలా పనిచేస్తుంది.',
          topics: ['Visual Prompting', 'Diagram Extraction', 'Audio Analysis', 'Multimodal LLM Architecture'],
          forStudents: 'Snap photos of math problems or chemistry formulas and get guided explanations.',
          forParents: 'Enables interactive multi-sensory learning for children of all ages and learning styles.'
        }
      ]
    },
    {
      id: 'module-4',
      number: 4,
      title: 'Architectures & Autonomous Deep Research',
      teluguTitle: 'ట్రాన్స్‌ఫార్మర్స్ & అటానమస్ రీసెర్చ్ ఏజెంట్స్',
      description: 'Understand neural transformer architectures, vector embeddings, and unleash autonomous multi-agent deep research synthesis.',
      tag: 'Stage 4 • AI Mastery',
      courses: [
        {
          id: 'course-8',
          number: 8,
          moduleId: 'module-4',
          title: 'OpenAI, LLMs & Neural Architectures',
          category: 'Deep Tech Systems',
          level: 'Intermediate',
          duration: '1.5 hours',
          url: 'https://lnkd.in/dBjsEvj3',
          iconName: 'Network',
          provider: 'AI Engineering Track',
          description: 'Demystify neural networks, transformer architecture, tokenization, embeddings, vector databases, and RLHF (Reinforcement Learning with Human Feedback).',
          teluguDesc: 'ట్రాన్స్‌ఫార్మర్ ఆర్కిటెక్చర్, టోకనైజేషన్ మరియు వెక్టర్ నమూనాలు.',
          topics: ['Transformers', 'Tokenization', 'Vector Embeddings', 'Model Fine-tuning'],
          forStudents: 'Understand how the underlying AI brains actually work under the hood.',
          forParents: 'Prepares kids for future-proof careers in Computer Science and Machine Learning.'
        },
        {
          id: 'course-11',
          number: 11,
          moduleId: 'module-4',
          title: 'Deep Research & Autonomous Multi-Agent Synthesis',
          category: 'Autonomous Agents',
          level: 'Advanced',
          duration: '1.2 hours',
          url: 'https://lnkd.in/dupmJGTS',
          iconName: 'Compass',
          provider: 'AI Research Institute',
          description: 'Harness autonomous AI research agents that search hundreds of web sources, read whitepapers, synthesize findings, and write 15-page comprehensive research reports.',
          teluguDesc: 'వందలాది వెబ్‌సైట్‌లు & రీసెర్చ్ పేపర్ల నుండి పూర్తి డాక్యుమెంటేషన్ తయారు చేసే డీప్ రీసెర్చ్ ఏఐ.',
          topics: ['Autonomous Query Expansion', 'Synthesis Across 100+ Papers', 'Comprehensive Report Writing', 'Methodology Synthesis'],
          forStudents: 'Complete comprehensive term papers, thesis proposals, and debate preparation.',
          forParents: 'Accelerates college preparation and academic publication capabilities.'
        }
      ]
    }
  ], []);

  // 5 Student Free Developer & Productivity Packs
  const studentPerks = useMemo(() => [
    {
      id: 'perk-github',
      title: 'GitHub Student Developer Pack',
      category: 'Developer Ecosystem',
      badge: 'Worth $200k+ Free',
      url: 'https://education.github.com/pack',
      icon: 'Laptop',
      provider: 'GitHub Education',
      annualValueINR: '₹1,65,000',
      tagline: 'The world’s best professional developer tools, 100% free for students while in school.',
      teluguTagline: 'విద్యార్థులకు GitHub Pro, ఉచిత క్లౌడ్ సర్వర్లు, డొమైన్ & కోడింగ్ టూల్స్.',
      features: [
        'Free GitHub Pro subscription while enrolled in school or college',
        'Free custom domain name for 1 year (.me from Namecheap)',
        'Microsoft Azure & AWS free cloud student credits ($100+ each)',
        'JetBrains all-product IDE licenses, Termius, Canva Pro access',
        'GitHub Copilot AI coding assistant eligibility'
      ],
      studentBenefit: 'Everything needed to build real web apps, mobile apps, and host live websites without spending a rupee.',
      parentBenefit: 'Saves over ₹1,50,000+ in annual software licenses and server costs for your child.',
      howToClaim: 'Sign in with your student school/college email (.edu, .ac.in) or upload a photo of your school ID card.'
    },
    {
      id: 'perk-notion',
      title: 'Notion Education Plus',
      category: 'Productivity & Notes',
      badge: '100% Free Plus Plan',
      url: 'https://www.notion.com/students',
      icon: 'FileText',
      provider: 'Notion',
      annualValueINR: '₹12,000',
      tagline: 'All-in-one connected digital workspace for note-taking, project management, and study schedules.',
      teluguTagline: 'డిజిటల్ నోట్స్, పరీక్ష టైమ్‌టేబుల్ మరియు ప్రాజెక్ట్ ప్లానర్.',
      features: [
        'Unlimited pages, blocks, and guest collaborators',
        'Unlimited file uploads (up to 5GB per file)',
        'Version history up to 30 days',
        'Pre-built student class notes & revision templates',
        'Sync across Phone, Tablet, Laptop, and Web'
      ],
      studentBenefit: 'Keep all your subject notes, revision flashcards, exam timetables, and project links in one clean workspace.',
      parentBenefit: 'Helps parents view their child’s daily study schedules, assignment trackers, and homework progress.',
      howToClaim: 'Sign up with your school email address or apply for the Student Plus Plan inside workspace settings.'
    },
    {
      id: 'perk-canva',
      title: 'Canva Education for Students',
      category: 'Design & Visual Arts',
      badge: 'Free Premium Design',
      url: 'https://www.canva.com/education/students',
      icon: 'Palette',
      provider: 'Canva',
      annualValueINR: '₹8,500',
      tagline: 'Create professional school presentations, science posters, infographics, and project videos.',
      teluguTagline: 'స్కూల్ ప్రాజెక్ట్స్, పోస్టర్లు మరియు వీడియో ప్రెజెంటేషన్లు సులభంగా తయారు చేయండి.',
      features: [
        '100M+ premium stock photos, graphics, and video clips',
        '10,000+ educational templates for charts, maps & slides',
        'One-click background remover and Magic AI image tools',
        'Real-time collaborative teamwork for school group projects',
        'Export high-resolution PDF and PPT presentations'
      ],
      studentBenefit: 'Score A+ marks on school presentations, science posters, and club announcements with pro design templates.',
      parentBenefit: 'No need to hire graphic designers for school projects; children learn visual storytelling independently.',
      howToClaim: 'Log in with Google Education account or request teacher invitation / school ID verification.'
    },
    {
      id: 'perk-google-ai',
      title: 'Google AI Student Offer (Gemini)',
      category: 'AI Study Assistant',
      badge: 'Google AI Ecosystem',
      url: 'https://gemini.google/students',
      icon: 'Bot',
      provider: 'Google Gemini',
      annualValueINR: '₹19,500',
      tagline: 'Supercharge homework, complex math problem solving, research synthesis, and creative coding.',
      teluguTagline: 'హోంవర్క్ సహాయం, గణిత పరిష్కారాలు, పరిశోధన మరియు కోడింగ్ గైడ్.',
      features: [
        'Advanced Gemini AI reasoning with large multimodal context',
        'Upload textbook photos or diagram equations for instant step-by-step solutions',
        'Summarize 50+ page PDFs, research papers, and lecture transcripts',
        'Interactive mock quiz generator and flashcard maker',
        'Seamless integration with Google Docs, Drive, and YouTube'
      ],
      studentBenefit: 'Get instant 24/7 doubt clearance for tough mathematics, science formulas, and Telugu literature.',
      parentBenefit: 'Gives parents a trusted, Google-verified AI learning partner for their child with strict safety guardrails.',
      howToClaim: 'Access with standard Google student account or personal Google login.'
    },
    {
      id: 'perk-aura-ai',
      title: 'Aura.ai Student Innovation Engine',
      category: 'AI Creative Suite',
      badge: 'Creative & Learning AI',
      url: 'https://aura.ai',
      icon: 'Zap',
      provider: 'Aura AI',
      annualValueINR: '₹14,000',
      tagline: 'Next-generation AI assistant for conceptualizing school science models, art, and smart project outlines.',
      teluguTagline: 'నూతన ప్రాజెక్ట్ ఐడియాలు, ఆర్ట్ మరియు సైన్స్ ప్రయోగాల సృష్టికి స్మార్ట్ ఏఐ.',
      features: [
        'Smart interactive brainstorming for school science fairs and hackathons',
        'Generative diagram synthesis and workflow visualizations',
        'Custom student study plan generation based on weak subjects',
        'Multi-lingual explanation for complex scientific laws and formulas'
      ],
      studentBenefit: 'Brainstorm unique working models for robotics, physics experiments, and software hackathons.',
      parentBenefit: 'Nurtures creative innovation and critical problem-solving in children from early school years.',
      howToClaim: 'Visit portal, click student sign up, and start exploring free features.'
    }
  ], []);

  // Categorized Student Resources Directory
  const studentResources = useMemo(() => [
    {
      id: 'res-code',
      category: 'Code & Cloud Sandboxes',
      icon: 'Code2',
      tagline: 'Zero-install development environments running directly inside modern browsers.',
      items: [
        { name: 'VS Code Web (vscode.dev)', desc: 'Run Visual Studio Code directly in your browser without installing anything.', url: 'https://vscode.dev', badge: 'Cloud IDE' },
        { name: 'Replit Student', desc: 'Collaborative cloud coding in Python, JavaScript, C++, and HTML with instant live hosting.', url: 'https://replit.com', badge: 'Multi-Language' },
        { name: 'GitHub Codespaces', desc: '60 free hours per month of cloud developer virtual machines for every student.', url: 'https://github.com/features/codespaces', badge: 'Cloud VM' },
        { name: 'StackBlitz', desc: 'Instant fullstack web development environment running on WebAssembly.', url: 'https://stackblitz.com', badge: 'Web Engine' }
      ]
    },
    {
      id: 'res-math',
      category: 'Math, Science & Interactive Simulators',
      icon: 'BrainCircuit',
      tagline: 'Dynamic visual calculators and physics simulators for deep conceptual clarity.',
      items: [
        { name: 'Desmos Graphing Calculator', desc: 'Interactive 2D & 3D graphing calculator for algebra, calculus, and physics simulations.', url: 'https://www.desmos.com/calculator', badge: 'Interactive Math' },
        { name: 'GeoGebra Suite', desc: 'Dynamic mathematics for geometry, algebra, 3D solids, and probability distributions.', url: 'https://www.geogebra.org', badge: 'Geometry & 3D' },
        { name: 'PhET Interactive Simulations', desc: 'Free interactive physics, chemistry, biology, and earth science simulations from Univ of Colorado.', url: 'https://phet.colorado.edu', badge: 'Science Labs' },
        { name: 'Wolfram Alpha Student', desc: 'Computational knowledge engine providing step-by-step math, physics, and chemistry solutions.', url: 'https://www.wolframalpha.com', badge: 'Step-by-Step' }
      ]
    },
    {
      id: 'res-research',
      category: 'Academic Research & Technical Writing',
      icon: 'BookOpen',
      tagline: 'Tools for literature reviews, LaTeX authoring, and thesis presentation.',
      items: [
        { name: 'Google Scholar', desc: 'Search millions of peer-reviewed articles, academic theses, and verified research papers.', url: 'https://scholar.google.com', badge: 'Academic Search' },
        { name: 'Connected Papers', desc: 'Visual graphs of academic papers to explore related scientific citations and literature.', url: 'https://www.connectedpapers.com', badge: 'Visual Research' },
        { name: 'Overleaf LaTeX Editor', desc: 'Collaborative cloud LaTeX editor for writing professional scientific reports and math papers.', url: 'https://www.overleaf.com', badge: 'Scientific Papers' },
        { name: 'Grammarly for Education', desc: 'Real-time grammar, tone, and clarity assistance for student essays and college SOPs.', url: 'https://www.grammarly.com/edu', badge: 'Writing Coach' }
      ]
    },
    {
      id: 'res-competitions',
      category: 'Hackathons, Competitions & Fellowships',
      icon: 'Award',
      tagline: 'Global arenas to showcase student inventions, win prizes, and build portfolios.',
      items: [
        { name: 'Devpost Student Hackathons', desc: 'Join global and regional student hackathons, win cash prizes, and build your developer portfolio.', url: 'https://devpost.com/hackathons', badge: 'Hackathons' },
        { name: 'Kaggle Student Competitions', desc: 'Compete in data science and machine learning competitions with free GPU access.', url: 'https://www.kaggle.com/competitions', badge: 'AI & Data' },
        { name: 'Major League Hacking (MLH)', desc: 'Official student hackathon league with workshops, mentorship, and free swags.', url: 'https://mlh.io', badge: 'Student League' },
        { name: 'Imagine Cup (Microsoft)', desc: 'Global student technology competition for creating AI solutions that tackle world challenges.', url: 'https://imaginecup.microsoft.com', badge: '$100k Prize' }
      ]
    }
  ], []);

  // Flattened all courses
  const allCourses = useMemo(() => {
    return courseModules.flatMap(m => m.courses);
  }, [courseModules]);

  // Universal Real-Time Search Match Matrix across Courses, Perks, and Resources
  const searchResults = useMemo(() => {
    if (!globalSearchQuery.trim()) return null;
    const q = globalSearchQuery.toLowerCase().trim();

    const matchingCourses = allCourses.filter(c => 
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.teluguDesc.toLowerCase().includes(q) ||
      c.topics.some(t => t.toLowerCase().includes(q))
    );

    const matchingPerks = studentPerks.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.teluguTagline.toLowerCase().includes(q) ||
      p.features.some(f => f.toLowerCase().includes(q))
    );

    const matchingResources = studentResources.flatMap(cat => 
      cat.items.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        cat.category.toLowerCase().includes(q)
      ).map(item => ({ ...item, parentCategory: cat.category }))
    );

    const totalCount = matchingCourses.length + matchingPerks.length + matchingResources.length;

    return {
      query: globalSearchQuery,
      totalCount,
      matchingCourses,
      matchingPerks,
      matchingResources
    };
  }, [globalSearchQuery, allCourses, studentPerks, studentResources]);

  // Filtered courses based on module filter, level, and quick tag
  const filteredModules = useMemo(() => {
    return courseModules
      .filter(module => {
        if (selectedModuleFilter !== 'all' && module.id !== selectedModuleFilter) {
          return false;
        }
        return true;
      })
      .map(module => {
        const matchingCourses = module.courses.filter(course => {
          // Level filter
          if (selectedLevelFilter !== 'all' && course.level.toLowerCase() !== selectedLevelFilter.toLowerCase()) {
            return false;
          }
          // Quick tag filter
          if (selectedQuickTag !== 'all') {
            const tagLower = selectedQuickTag.toLowerCase();
            const matchesTag = 
              course.category.toLowerCase().includes(tagLower) ||
              course.title.toLowerCase().includes(tagLower) ||
              course.topics.some(t => t.toLowerCase().includes(tagLower));
            if (!matchesTag) return false;
          }
          // Global Search filter when not in full search overview
          if (globalSearchQuery.trim()) {
            const q = globalSearchQuery.toLowerCase().trim();
            return (
              course.title.toLowerCase().includes(q) ||
              course.category.toLowerCase().includes(q) ||
              course.description.toLowerCase().includes(q) ||
              course.teluguDesc.toLowerCase().includes(q) ||
              course.topics.some(t => t.toLowerCase().includes(q))
            );
          }
          return true;
        });

        return {
          ...module,
          courses: matchingCourses
        };
      })
      .filter(module => module.courses.length > 0);
  }, [courseModules, selectedModuleFilter, selectedLevelFilter, selectedQuickTag, globalSearchQuery]);

  // Dynamic Lucide icon mapper
  const renderCourseIcon = (iconName: string, className: string = "w-5 h-5") => {
    switch (iconName) {
      case 'MessageSquareCode':
        return <MessageSquareCode className={className} />;
      case 'BrainCircuit':
        return <BrainCircuit className={className} />;
      case 'Bot':
        return <Bot className={className} />;
      case 'Code2':
        return <Code2 className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Eye':
        return <Eye className={className} />;
      case 'Globe2':
        return <Globe2 className={className} />;
      case 'Network':
        return <Network className={className} />;
      case 'Boxes':
        return <Boxes className={className} />;
      case 'BarChart3':
        return <BarChart3 className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const renderPerkIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop className={className} />;
      case 'FileText':
        return <FileText className={className} />;
      case 'Palette':
        return <Palette className={className} />;
      case 'Bot':
        return <Bot className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      default:
        return <Gift className={className} />;
    }
  };

  // Completion calculation
  const completedCount = Object.values(completedCourses).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / allCourses.length) * 100);

  // Sample prompt generator handler
  const handleSelectPromptTemplate = (category: 'math' | 'physics' | 'coding' | 'telugu') => {
    setSelectedPromptCategory(category);
    switch (category) {
      case 'math':
        setCustomPromptInput("Solve step-by-step with Chain-of-Thought: Find the roots of 2x^2 + 5x - 12 = 0 and explain the discriminant rule intuitively.");
        break;
      case 'physics':
        setCustomPromptInput("Explain electromagnetic induction and Faraday's Law with a real-world electric generator experiment analogy.");
        break;
      case 'coding':
        setCustomPromptInput("Write a clean Python script using Pygame or Tkinter to simulate projectile motion with live sliders for velocity and angle.");
        break;
      case 'telugu':
        setCustomPromptInput("భారతీయ అంతరిక్ష పరిశోధనా సంస్థ (ISRO) సాధించిన ఘనతలు మరియు చంద్రయాన్ ప్రాముఖ్యతపై 250 పదాల వ్యాసం రాయండి.");
        break;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ========================================================================= */}
      {/* 1. TOP REAL-TIME SEARCH BAR & INTERNATIONAL HERO APPARATUS */}
      {/* ========================================================================= */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-clean-md relative overflow-hidden">
        {/* Subtle International Orange Glow Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header Metadata Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-black px-3.5 py-1 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>SUPER STUDENT HUB</span>
              </span>
              <span className="bg-orange-50 border border-orange-200 text-orange-700 text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                <Gift className="w-3.5 h-3.5 text-orange-600" />
                <span>$200,000+ FREE TOOLS & 11 CERTIFIED COURSES</span>
              </span>
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                Verified Global 2026 Curriculum
              </span>
            </div>

            {/* Quick Action Share & AI Mentor Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={shareAllPerks}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs border border-slate-200 transition-all transform hover:-translate-y-0.5"
              >
                <Share2 className="w-4 h-4 text-orange-600" />
                <span>{copiedLink === 'all_perks' ? '✅ Copied All 16 Links!' : 'Share Links'}</span>
              </button>

              <button
                onClick={() => onAskAI && onAskAI("Act as an AI Masterclass Mentor. Guide me on how to begin with Introduction to Prompt Engineering, claim the GitHub Student Pack, and build my first AI project step by step.")}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold px-4.5 py-2.5 rounded-xl text-xs shadow-orange-glow transition-all transform hover:-translate-y-0.5"
              >
                <Bot className="w-4 h-4 text-white" />
                <span>Ask AI Mentor</span>
              </button>
            </div>
          </div>

          {/* Title & Taglines */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              🎓 Super Student Hub: Free Packs & AI Masterclass
            </h1>
            <p className="text-sm sm:text-base font-semibold text-slate-600 mt-1">
              విద్యార్థులకు ఉచిత డెవలపర్ టూల్స్, సాఫ్ట్‌వేర్ ప్యాక్స్ & 11 సర్టిఫైడ్ ప్రాంప్ట్ ఇంజనీరింగ్ కోర్సులు
            </p>
          </div>

          {/* ========================================================================= */}
          {/* REAL-TIME UNIVERSAL SEARCH ENGINE (TOP PLACEMENT) */}
          {/* ========================================================================= */}
          <div className="bg-slate-50 border-2 border-orange-200 focus-within:border-orange-500 rounded-2xl p-2 sm:p-2.5 shadow-clean transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                placeholder="Real-time Search across 11 AI courses, $200k+ student perks, math simulators, coding IDEs, & parent guides..."
                className="w-full bg-transparent border-none text-sm sm:text-base font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {globalSearchQuery && (
                <button
                  onClick={() => setGlobalSearchQuery('')}
                  className="p-1.5 hover:bg-slate-200 text-slate-500 rounded-lg transition-colors"
                  title="Clear search"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Instant Search Query Suggestions */}
            <div className="mt-2.5 pt-2.5 border-t border-slate-200/80 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3 h-3 text-orange-600" /> Quick Filters:
              </span>
              {[
                { label: 'All', val: 'all' },
                { label: 'Prompt Engineering', val: 'Prompt' },
                { label: 'GitHub Pack ($200k+)', val: 'GitHub' },
                { label: 'Reasoning (o1/o3)', val: 'Reasoning' },
                { label: 'Custom GPTs', val: 'GPT' },
                { label: 'Data Analysis', val: 'Data' },
                { label: 'Multimodal Vision', val: 'Vision' },
                { label: 'Deep Research', val: 'Deep Research' },
                { label: 'Math Simulators', val: 'Math' },
                { label: 'Parent Guides', val: 'Parent' }
              ].map((item) => (
                <button
                  key={item.val}
                  onClick={() => {
                    setSelectedQuickTag(item.val);
                    if (item.val !== 'all') {
                      setGlobalSearchQuery(item.val);
                    } else {
                      setGlobalSearchQuery('');
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    (selectedQuickTag === item.val || (item.val !== 'all' && globalSearchQuery === item.val))
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub Navigation Bar with 5 Defined Modules */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => {
                  setActiveSubTab('ai-learning-path');
                  setAudienceMode('student');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  activeSubTab === 'ai-learning-path'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>🚀 AI Learning Path (11 Courses)</span>
              </button>

              <button
                onClick={() => {
                  setActiveSubTab('daily-reflection');
                  setAudienceMode('student');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  activeSubTab === 'daily-reflection'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>📝 Daily Reflection (+100 XP)</span>
              </button>

              <button
                onClick={() => {
                  setActiveSubTab('student-perks');
                  setAudienceMode('student');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  activeSubTab === 'student-perks'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Gift className="w-3.5 h-3.5" />
                <span>💻 Student Free Packs ($200k+)</span>
              </button>

              <button
                onClick={() => {
                  setActiveSubTab('student-resources');
                  setAudienceMode('student');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  activeSubTab === 'student-resources'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>📚 Student Resources & Sandboxes</span>
              </button>

              <button
                onClick={() => {
                  setActiveSubTab('parent-guide');
                  setAudienceMode('parent');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  activeSubTab === 'parent-guide'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-orange-400" />
                <span>👨‍👩‍👧 Parent Guide & Savings</span>
              </button>

              <button
                onClick={() => {
                  setActiveSubTab('software-architecture');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                  activeSubTab === 'software-architecture'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-orange-400" />
                <span>⚡ App Tech & Architecture</span>
              </button>
            </div>

            {/* Audience View Toggle: Student View vs Parent View */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 shrink-0">
              <button
                onClick={() => setAudienceMode('student')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  audienceMode === 'student'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student View</span>
              </button>
              <button
                onClick={() => {
                  setAudienceMode('parent');
                  if (activeSubTab !== 'parent-guide') {
                    setActiveSubTab('parent-guide');
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  audienceMode === 'parent'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Parent View</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* REAL-TIME SEARCH RESULTS OVERVIEW DRAWER (When active query matches) */}
      {/* ========================================================================= */}
      {searchResults && (
        <div className="bg-white border-2 border-orange-300 rounded-3xl p-6 shadow-clean-lg space-y-5 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
              <h3 className="text-base font-black text-slate-900">
                Live Search Results for "<span className="text-orange-600">{searchResults.query}</span>"
              </h3>
              <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {searchResults.totalCount} matches found
              </span>
            </div>
            <button
              onClick={() => setGlobalSearchQuery('')}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold underline"
            >
              Clear Live Results
            </button>
          </div>

          {searchResults.totalCount === 0 ? (
            <div className="text-center py-8 text-slate-500 space-y-2">
              <Search className="w-10 h-10 mx-auto text-slate-300" />
              <p className="font-semibold text-sm">No items found matching "{searchResults.query}"</p>
              <p className="text-xs">Try searching for keywords like "Prompt", "GitHub", "Math", "Reasoning", or "GPTs".</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Matching Courses */}
              <div className="space-y-2">
                <div className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Courses ({searchResults.matchingCourses.length})</span>
                  <BrainCircuit className="w-3.5 h-3.5 text-orange-600" />
                </div>
                <div className="space-y-1.5">
                  {searchResults.matchingCourses.slice(0, 4).map(course => (
                    <a
                      key={course.id}
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 transition-all text-xs"
                    >
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>{course.number}. {course.title}</span>
                        <ExternalLink className="w-3 h-3 text-orange-600 shrink-0 ml-1" />
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{course.category} • {course.duration}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Matching Perks */}
              <div className="space-y-2">
                <div className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Student Perks ({searchResults.matchingPerks.length})</span>
                  <Gift className="w-3.5 h-3.5 text-orange-600" />
                </div>
                <div className="space-y-1.5">
                  {searchResults.matchingPerks.map(perk => (
                    <a
                      key={perk.id}
                      href={perk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 transition-all text-xs"
                    >
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>{perk.title}</span>
                        <ExternalLink className="w-3 h-3 text-orange-600 shrink-0 ml-1" />
                      </div>
                      <p className="text-[11px] text-orange-700 font-semibold line-clamp-1 mt-0.5">{perk.badge} • {perk.category}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Matching Tech Tools */}
              <div className="space-y-2">
                <div className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Sandboxes & Tools ({searchResults.matchingResources.length})</span>
                  <Code2 className="w-3.5 h-3.5 text-orange-600" />
                </div>
                <div className="space-y-1.5">
                  {searchResults.matchingResources.slice(0, 4).map((tool, idx) => (
                    <a
                      key={idx}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2.5 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 transition-all text-xs"
                    >
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>{tool.name}</span>
                        <ExternalLink className="w-3 h-3 text-orange-600 shrink-0 ml-1" />
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{tool.badge} • {tool.parentCategory}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB: DAILY REFLECTION & XP JOURNAL */}
      {/* ========================================================================= */}
      {activeSubTab === 'daily-reflection' && (
        <DailyReflectionZone
          studentName={studentName}
          currentXP={currentXP}
          streakDays={streakDays}
          onEarnXP={onEarnXP}
          onAskAI={onAskAI}
        />
      )}

      {/* ========================================================================= */}
      {/* TAB 1: AI LEARNING PATH (11 COURSES) */}
      {/* ========================================================================= */}
      {activeSubTab === 'ai-learning-path' && (
        <div className="space-y-6">
          {/* Daily Reflection Callout Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 text-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-amber-300/40">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-amber-200 flex items-center justify-center font-black text-xl shrink-0 border border-white/30">
                ✍️
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black bg-white/20 px-2.5 py-0.5 rounded-full text-white uppercase tracking-wider">
                    Daily Habit Booster
                  </span>
                  <span className="text-xs font-extrabold text-amber-100 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-amber-200" />
                    <span>+100 XP Available Today</span>
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white mt-0.5">
                  Log One Thing You Learned Today & Boost Your XP
                </h4>
                <p className="text-xs text-orange-50 font-medium">
                  Reflect on today's AI lesson, scientific concept, or coding logic to earn XP points and keep your streak alive.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveSubTab('daily-reflection');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="bg-white hover:bg-orange-50 text-orange-800 font-black text-xs px-5 py-3 rounded-2xl shadow-sm transition-all shrink-0 cursor-pointer flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>Open Daily Reflection 📝</span>
            </button>
          </div>

          {/* Progress Analytics Card & Stage Visual Stepper */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-clean space-y-6">
            {/* Top Stat Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-md">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-black text-slate-900 text-base sm:text-lg">
                        AI & Prompt Engineering Master Curriculum
                      </h3>
                      <span className="bg-orange-100 text-orange-800 text-xs font-black px-2.5 py-0.5 rounded-full">
                        {completedCount} of {allCourses.length} Completed ({progressPercent}%)
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Structured 4-Stage Progressive Pipeline • From Prompt Basics to Autonomous Multi-Agent Architectures
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                  <div 
                    className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 h-full transition-all duration-500 rounded-full" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Quick Summary Pill Box */}
              <div className="lg:col-span-4 bg-orange-50/70 border border-orange-200/80 rounded-2xl p-3.5 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-orange-800 uppercase tracking-wider block">Curriculum Status</span>
                  <span className="text-sm font-black text-slate-900">{completedCount === allCourses.length ? '🏆 Master Certified!' : `${allCourses.length - completedCount} Lessons Pending`}</span>
                </div>
                <button
                  onClick={() => onAskAI && onAskAI("Test my Prompt Engineering knowledge with a 3-question interactive quiz!")}
                  className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all"
                >
                  Take AI Quiz
                </button>
              </div>
            </div>

            {/* VISUAL 4-STAGE PIPELINE STEPPER */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-3">
              {courseModules.map((m) => {
                const moduleCompleted = m.courses.every(c => completedCourses[c.id]);
                const moduleCount = m.courses.filter(c => completedCourses[c.id]).length;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModuleFilter(selectedModuleFilter === m.id ? 'all' : m.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedModuleFilter === m.id
                        ? 'bg-orange-600 border-orange-600 text-white shadow-md'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-extrabold mb-1">
                      <span className={selectedModuleFilter === m.id ? 'text-orange-200' : 'text-orange-600'}>
                        Stage {m.number}
                      </span>
                      <span>{moduleCount}/{m.courses.length}</span>
                    </div>
                    <div className="font-bold text-xs line-clamp-1">{m.title}</div>
                    <div className={`text-[10px] mt-0.5 line-clamp-1 ${selectedModuleFilter === m.id ? 'text-orange-100' : 'text-slate-500'}`}>
                      {m.courses.length} Master Courses
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* INTERACTIVE PROMPT SANDBOX SIMULATOR */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-clean-lg border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black shrink-0 shadow-md">
                  <Workflow className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-base text-white flex items-center gap-2">
                    <span>Interactive AI Prompt Engineering Lab</span>
                    <span className="bg-orange-500/30 text-orange-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-500/40">
                      Live Sandbox
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Practice Chain-of-Thought (CoT), Few-Shot priming, and homework tutoring prompts.
                  </p>
                </div>
              </div>

              {/* Template Category Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'math', label: '📐 Math (CoT)' },
                  { id: 'physics', label: '⚡ Physics' },
                  { id: 'coding', label: '💻 Python Sim' },
                  { id: 'telugu', label: '🇮🇳 Telugu Essay' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectPromptTemplate(item.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      selectedPromptCategory === item.id
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input & Launch Action */}
            <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                value={customPromptInput}
                onChange={(e) => setCustomPromptInput(e.target.value)}
                className="w-full bg-transparent border-none text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none px-2"
                placeholder="Type or customize your prompt..."
              />
              <button
                onClick={() => onAskAI && onAskAI(customPromptInput)}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-orange-glow transition-all shrink-0 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>Test in AI Mentor</span>
              </button>
            </div>
          </div>

          {/* Filter Bar for Modules and Levels */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5 text-orange-600" /> Filter Stage:
              </span>
              <button
                onClick={() => setSelectedModuleFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                  selectedModuleFilter === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All 4 Stages
              </button>
              {courseModules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModuleFilter(m.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                    selectedModuleFilter === m.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Stage {m.number}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-500 mr-1">Level:</span>
              {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevelFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    selectedLevelFilter.toLowerCase() === lvl.toLowerCase()
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl === 'all' ? 'All' : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Categorized Modules Grid */}
          <div className="space-y-8">
            {filteredModules.map((module) => (
              <div key={module.id} className="space-y-4">
                {/* Module Section Header */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-600 text-white text-xs font-black px-2.5 py-0.5 rounded-lg">
                        STAGE {module.number}
                      </span>
                      <h3 className="font-black text-slate-900 text-base sm:text-lg">
                        {module.title}
                      </h3>
                    </div>
                    <p className="text-xs text-orange-700 font-semibold">
                      {module.teluguTitle}
                    </p>
                    <p className="text-xs text-slate-600">
                      {module.description}
                    </p>
                  </div>

                  <span className="text-xs font-extrabold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl self-start md:self-auto border border-slate-200">
                    {module.courses.length} Certified Courses
                  </span>
                </div>

                {/* 3-Column Responsive Course Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {module.courses.map((course) => {
                    const isCompleted = !!completedCourses[course.id];
                    const isBookmarked = !!bookmarkedItems[course.id];

                    return (
                      <div
                        key={course.id}
                        className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-clean hover:shadow-clean-md ${
                          isCompleted 
                            ? 'border-emerald-300 ring-1 ring-emerald-200' 
                            : 'border-slate-200 hover:border-orange-300'
                        }`}
                      >
                        <div className="p-5 space-y-4">
                          {/* Top Row: Course Number, Category, Level, Bookmark */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="w-7 h-7 rounded-lg bg-orange-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                                #{course.number}
                              </span>
                              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                                {course.category}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                                course.level === 'Beginner'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : course.level === 'Intermediate'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}>
                                {course.level}
                              </span>

                              <button
                                onClick={() => toggleBookmark(course.id)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  isBookmarked ? 'bg-orange-100 text-orange-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                                }`}
                                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Course'}
                              >
                                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-orange-600 text-orange-600' : ''}`} />
                              </button>
                            </div>
                          </div>

                          {/* Course Title & Icon */}
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                              {renderCourseIcon(course.iconName, "w-5 h-5")}
                            </div>
                            <div>
                              <h4 className="font-black text-slate-900 text-sm leading-snug">
                                {course.title}
                              </h4>
                              <span className="text-[11px] text-slate-500 font-medium">
                                Provider: {course.provider}
                              </span>
                            </div>
                          </div>

                          {/* Telugu Subtitle */}
                          <div className="bg-orange-50/60 p-2.5 rounded-xl border border-orange-100">
                            <p className="text-[11px] text-orange-950 font-semibold leading-relaxed">
                              {course.teluguDesc}
                            </p>
                          </div>

                          {/* English Description */}
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {course.description}
                          </p>

                          {/* Key Topics Covered Chips */}
                          <div className="space-y-1.5 pt-1">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                              Key Topics & Skills:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {course.topics.map((topic, idx) => (
                                <span
                                  key={idx}
                                  className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-200"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Audience Tailored Insights (Student vs Parent) */}
                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px] space-y-1">
                            {audienceMode === 'student' ? (
                              <div className="flex items-start gap-1.5">
                                <GraduationCap className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                                <p className="text-slate-700 font-medium">
                                  <strong className="text-slate-900">Student ROI:</strong> {course.forStudents}
                                </p>
                              </div>
                            ) : (
                              <div className="flex items-start gap-1.5">
                                <Users className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                                <p className="text-slate-700 font-medium">
                                  <strong className="text-slate-900">Parent ROI:</strong> {course.forParents}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Bottom Actions Bar */}
                        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-orange-600" />
                              {course.duration}
                            </span>
                            <button
                              onClick={() => toggleCompleteCourse(course.id)}
                              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                                isCompleted
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => copyToClipboard(course.url, course.id)}
                              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                              title="Copy Course Link"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            <a
                              href={course.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-all"
                            >
                              <span>Open Course</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: STUDENT FREE PACKS ($200K+ VALUE) */}
      {/* ========================================================================= */}
      {activeSubTab === 'student-perks' && (
        <div className="space-y-6">
          {/* Perks Header Banner with ROI Visualization */}
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-3xl p-6 sm:p-8 shadow-orange-glow space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <span className="bg-white/20 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Verified Global Student Benefit
                </span>
                <h3 className="text-xl sm:text-3xl font-black mt-2">
                  5 Essential Student Free Developer & AI Packs
                </h3>
                <p className="text-xs sm:text-sm text-orange-100 mt-1 max-w-2xl">
                  విద్యార్థులకు ఉచితంగా లభించే అద్భుతమైన సాఫ్ట్‌వేర్ ప్యాకేజీలు — GitHub Pro, Notion Plus, Canva Pro, Gemini AI & Aura.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center shrink-0">
                <span className="text-[11px] font-bold text-orange-200 uppercase tracking-wider block">Estimated Annual Value</span>
                <span className="text-2xl font-black text-white">₹2,19,000+</span>
                <span className="text-[10px] text-orange-100 block">100% Free with Student Verification</span>
              </div>
            </div>
          </div>

          {/* Perks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {studentPerks.map((perk) => (
              <div
                key={perk.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-clean hover:shadow-clean-md transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  {/* Perk Top Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 shadow-xs">
                        {renderPerkIcon(perk.icon)}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-base sm:text-lg">
                          {perk.title}
                        </h4>
                        <span className="text-xs font-bold text-orange-700">
                          {perk.provider} • {perk.category}
                        </span>
                      </div>
                    </div>

                    <span className="bg-orange-100 text-orange-800 text-xs font-black px-2.5 py-1 rounded-xl">
                      {perk.badge}
                    </span>
                  </div>

                  {/* Telugu & English Taglines */}
                  <p className="text-xs text-slate-600 font-medium">
                    {perk.tagline}
                  </p>
                  <div className="bg-orange-50/60 p-2.5 rounded-xl border border-orange-100">
                    <p className="text-[11px] text-orange-950 font-semibold">
                      {perk.teluguTagline}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2">
                    <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                      What's Included Free:
                    </span>
                    <ul className="space-y-1.5">
                      {perk.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefit Matrix */}
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <p className="text-slate-700">
                        <strong className="text-slate-900">For Student:</strong> {perk.studentBenefit}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                      <p className="text-slate-700">
                        <strong className="text-slate-900">Parent Savings:</strong> {perk.parentBenefit}
                      </p>
                    </div>
                  </div>

                  {/* How to claim pill */}
                  <div className="text-[11px] text-slate-500 bg-slate-100 p-2 rounded-xl border border-slate-200">
                    <strong className="text-slate-800">How to Claim:</strong> {perk.howToClaim}
                  </div>
                </div>

                {/* Claim Button */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    Annual Value: {perk.annualValueINR}
                  </span>

                  <a
                    href={perk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all"
                  >
                    <span>Claim Free Pack</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: STUDENT TECH & ACADEMIC RESOURCES */}
      {/* ========================================================================= */}
      {activeSubTab === 'student-resources' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-clean space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span>Curated Student Developer, STEM & Academic Sandboxes</span>
            </h3>
            <p className="text-xs text-slate-600">
              గణితం, సైన్స్ సిమ్యులేటర్లు, క్లౌడ్ కోడింగ్ IDEs, మరియు అంతర్జాతీయ పోటీల డైరెక్టరీ.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {studentResources.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-clean space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0">
                    {renderCourseIcon(cat.icon, "w-5 h-5")}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">
                      {cat.category}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {cat.tagline}
                    </p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-slate-900 text-xs">
                            {item.name}
                          </h5>
                          <span className="text-[9px] font-black bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600">
                          {item.desc}
                        </p>
                      </div>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white border border-slate-200 text-orange-600 hover:bg-orange-600 hover:text-white transition-colors shrink-0 shadow-xs"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: PARENT GUIDE & FINANCIAL ROI BREAKDOWN */}
      {/* ========================================================================= */}
      {activeSubTab === 'parent-guide' && (
        <div className="space-y-6">
          {/* Parent ROI Savings Summary Matrix */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-clean-lg space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="bg-orange-500/30 text-orange-300 text-xs font-black px-3 py-1 rounded-full border border-orange-500/40 uppercase tracking-wider">
                  Parent Academic & Financial Guide
                </span>
                <h3 className="text-xl sm:text-3xl font-black mt-2 text-white">
                  Parent Savings: ₹2,19,000+ Annual Software Value
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  తల్లిదండ్రులకు మార్గదర్శి: విద్యార్థి ఐడీ కార్డు ద్వారా అంతర్జాతీయ సాఫ్ట్‌వేర్ ప్యాక్‌లను సురక్షితంగా క్లెయిమ్ చేయడం ఎలా?
                </p>
              </div>

              <button
                onClick={() => onAskAI && onAskAI("Explain to a parent step-by-step how to safely supervise their child's AI learning journey and verify student discounts for GitHub and Notion.")}
                className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-orange-glow transition-all shrink-0"
              >
                Ask Parent AI Consultant
              </button>
            </div>

            {/* Savings Breakdown Chart Visualizer */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              {[
                { name: 'GitHub Pro + Clouds', saving: '₹1,65,000/yr', tag: 'Dev Tools' },
                { name: 'Google Gemini Pro', saving: '₹19,500/yr', tag: 'AI Tutor' },
                { name: 'Aura AI Engine', saving: '₹14,000/yr', tag: 'Creative AI' },
                { name: 'Notion Plus Plan', saving: '₹12,000/yr', tag: 'Notes/Study' },
                { name: 'Canva Pro Edu', saving: '₹8,500/yr', tag: 'Design/PPT' },
              ].map((b, idx) => (
                <div key={idx} className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700 text-center space-y-1">
                  <span className="text-[10px] font-bold text-orange-400 block">{b.tag}</span>
                  <div className="font-bold text-xs text-white line-clamp-1">{b.name}</div>
                  <span className="text-sm font-black text-emerald-400 block">{b.saving}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Step Parent Verification Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Collect Student ID Card',
                telugu: 'స్కూల్ లేదా కాలేజీ ఐడీ కార్డు సిద్ధం చేసుకోండి',
                desc: 'A clear photo of your child’s school ID card (with current academic year) or institutional .edu / .ac.in email address.'
              },
              {
                step: '02',
                title: 'Claim GitHub Student Pack',
                telugu: 'GitHub ఎడ్యుకేషన్ పోర్టల్‌లో అప్లై చేయండి',
                desc: 'Visit education.github.com/pack and upload the school ID. Verification is completed usually within 24 to 48 hours.'
              },
              {
                step: '03',
                title: 'Activate Notion & Canva Edu',
                telugu: 'నోట్స్ మరియు డిజైన్ ప్యాక్‌లను యాక్టివేట్ చేయండి',
                desc: 'Sign in to Notion with the student email to unlock unlimited pages and apply for Canva Education student licensing.'
              },
              {
                step: '04',
                title: 'Start 11 AI Master Courses',
                telugu: 'రోజుకు 30 నిమిషాలు ఏఐ కోర్సులు ప్రాక్టీస్ చేయించండి',
                desc: 'Encourage 30 minutes daily practice with our verified 11 courses starting with Prompt Foundations and Chatbot building.'
              }
            ].map((stepItem, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-clean space-y-2">
                <span className="text-2xl font-black text-orange-600 block">{stepItem.step}</span>
                <h4 className="font-black text-slate-900 text-sm">{stepItem.title}</h4>
                <p className="text-[11px] text-orange-800 font-semibold">{stepItem.telugu}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{stepItem.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: SOFTWARE ARCHITECTURE & TECH SPECS */}
      {/* ========================================================================= */}
      {activeSubTab === 'software-architecture' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-clean space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black shrink-0">
              <Cpu className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Super Student Hub: International Technical Framework
              </h3>
              <p className="text-xs text-slate-500">
                Component hierarchy, real-time search indexing, state persistence & security boundaries.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <h4 className="font-black text-slate-900 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-orange-600" />
                <span>Real-Time Search Engine</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Client-side fuzzy multi-attribute search across 11 courses, 5 student packs, 16 resource tools, and topic matrices with instant reactive matching.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <h4 className="font-black text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Local State Persistence</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Bookmarks and lesson completions are saved reactively in `localStorage` under `super_student_completed_courses` with zero data loss.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <h4 className="font-black text-slate-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-orange-600" />
                <span>AI Sandbox Dispatcher</span>
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Connects directly to the server-side Gemini AI model with system-prompted academic safety filters and Chain-of-Thought heuristics.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
