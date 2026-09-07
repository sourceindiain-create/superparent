export interface QuickWebLink {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  url: string;
  iconName: string;
  highlightColor: string;
  tags: string[];
}

export interface HolisticResource {
  id: string;
  title: string;
  subtitle: string;
  teluguTitle?: string;
  category: 'plantation' | 'spirituality' | 'sports' | 'culture' | 'iq_tests' | 'parenting' | 'health_psychology' | 'doctor_medicine';
  badge: string;
  description: string;
  externalUrl?: string;
  videoUrl?: string;
  bookTitle?: string;
  actionType: 'weblink' | 'video' | 'book' | 'interactive_check' | 'emergency';
  accentColor: string;
  recommendedFor: string;
}

// ==========================================================
// 1. GOOGLE LENS & AI HOMEWORK SOLVER PLATFORMS
// ==========================================================
export const GOOGLE_LENS_TOOLS: QuickWebLink[] = [
  {
    id: 'google-lens-official',
    name: 'Google Lens (Search Any Question)',
    category: 'Google Vision AI',
    badge: '⭐ #1 Visual Homework Lens',
    description: 'Instant OCR & visual recognition for printed textbooks, handwritten math equations, diagrams, and science questions using Google Search by Image.',
    url: 'https://lens.google.com/',
    iconName: 'Camera',
    highlightColor: '#4285F4',
    tags: ['Google Lens', 'OCR', 'Image Search', 'Math & Science']
  },
  {
    id: 'google-images-lens',
    name: 'Google Images Search by Image',
    category: 'Visual Search',
    badge: 'Lens Powered',
    description: 'Upload any homework screenshot, PDF export, or problem photo directly to reverse search answers, diagrams, and step-by-step school solutions.',
    url: 'https://images.google.com/',
    iconName: 'Image',
    highlightColor: '#34A853',
    tags: ['Reverse Image', 'Textbook Problems', 'Diagrams']
  },
  {
    id: 'google-lens-mobile-app',
    name: 'Google Lens Official Android & iOS App',
    category: 'Mobile Scanner',
    badge: 'Mobile App',
    description: 'Snap live photos of handwritten notebook problems on your smartphone with instant OCR text copy, translation to Telugu/Hindi, and homework solver mode.',
    url: 'https://lens.google/',
    iconName: 'Smartphone',
    highlightColor: '#EA4335',
    tags: ['Mobile OCR', 'Real-time Camera', 'Translation']
  }
];

export const AI_SOLVER_PLATFORMS: QuickWebLink[] = [
  {
    id: 'wolfram-alpha',
    name: 'Wolfram|Alpha Computational Engine',
    category: 'Math & Science',
    badge: '🧮 Exact Symbolic Math',
    description: 'Calculates exact step-by-step calculus, integrals, algebra, matrix math, physics equations, chemistry reactions, and engineering plots.',
    url: 'https://www.wolframalpha.com/',
    iconName: 'Cpu',
    highlightColor: '#DD1100',
    tags: ['Step-by-step', 'Calculus', 'Physics', 'Chemistry']
  },
  {
    id: 'photomath-app',
    name: 'Photomath (Camera Math Solver)',
    category: 'Math OCR',
    badge: '📸 Top Math App',
    description: 'Scans printed and handwritten math equations with detailed animated step-by-step breakdown, graphing, and smart sub-steps.',
    url: 'https://photomath.com/',
    iconName: 'Zap',
    highlightColor: '#E60023',
    tags: ['Camera OCR', 'Arithmetic', 'Algebra', 'Graphs']
  },
  {
    id: 'symbolab-solver',
    name: 'Symbolab Step-by-Step Calculator',
    category: 'Advanced Math',
    badge: '📐 Geometry & Trig',
    description: 'Specialized solvers for trigonometry, polynomial factorization, differential equations, and geometry proofs with clear reasoning.',
    url: 'https://www.symbolab.com/',
    iconName: 'FileCode',
    highlightColor: '#00A86B',
    tags: ['Geometry', 'Trigonometry', 'Proofs']
  },
  {
    id: 'socratic-by-google',
    name: 'Socratic by Google',
    category: 'All Subjects',
    badge: '🎓 Google AI for Kids',
    description: 'AI learning app that pairs camera OCR questions with curated videos, Q&A explanations, and visual concept cards across all school grades.',
    url: 'https://socratic.org/',
    iconName: 'Bot',
    highlightColor: '#4285F4',
    tags: ['Biology', 'History', 'Physics', 'Visual Guides']
  },
  {
    id: 'microsoft-math',
    name: 'Microsoft Math Solver & OCR',
    category: 'Free Math Tool',
    badge: '⚡ 100% Free',
    description: 'Interactive equations solver with handwriting canvas, related video recommendations, and practice worksheets.',
    url: 'https://mathsolver.microsoft.com/',
    iconName: 'Sparkles',
    highlightColor: '#0078D4',
    tags: ['Handwriting', 'Practice Worksheets', 'Free']
  },
  {
    id: 'khanmigo-khanacademy',
    name: 'Khan Academy & Khanmigo AI Tutor',
    category: 'Socratic Tutor',
    badge: '🌟 World Standard',
    description: 'Socratic AI guidance that doesn\'t just give the final answer, but coaches students through hints, practice mastery, and grade-level curricula.',
    url: 'https://www.khanacademy.org/',
    iconName: 'GraduationCap',
    highlightColor: '#14BF96',
    tags: ['Class 1-12', 'Socratic Coaching', 'Mastery']
  },
  {
    id: 'google-gemini-edu',
    name: 'Google Gemini (Multimodal Vision & PDF)',
    category: 'Advanced AI',
    badge: '🧠 Multimodal 2.5/3',
    description: 'Ask complex questions with attached homework PDFs, notebook diagrams, and ask for explanations in English, Telugu (తెలుగు), or Hindi.',
    url: 'https://gemini.google.com/',
    iconName: 'Sparkles',
    highlightColor: '#1A73E8',
    tags: ['Multimodal', 'Telugu & Hindi', 'Diagram Analysis']
  },
  {
    id: 'deepseek-r1-math',
    name: 'DeepSeek R1 (Advanced Reasoning & Math)',
    category: 'Reasoning AI',
    badge: '🔬 Olympiad Reasoning',
    description: 'Open reasoning model renowned for competitive mathematics, Olympiad physics proofs, and rigorous logical derivations.',
    url: 'https://chat.deepseek.com/',
    iconName: 'Compass',
    highlightColor: '#4F46E5',
    tags: ['Olympiad Math', 'Chain of Thought', 'Coding']
  },
  {
    id: 'phet-simulations',
    name: 'PhET Interactive Science & Math Simulations',
    category: 'Simulations',
    badge: '🧪 Interactive Labs',
    description: 'Interactive physics, chemistry, biology, and math simulations from University of Colorado Boulder. Ideal for visualizing homework experiments.',
    url: 'https://phet.colorado.edu/',
    iconName: 'Play',
    highlightColor: '#EA580C',
    tags: ['Physics Lab', 'Molecules', 'Fractions', 'Circuits']
  }
];

// ==========================================================
// 2. SCHOOL & COLLEGE SOLUTIONS, BOOKS & VIDEOS
// ==========================================================
export const SCHOOL_COLLEGE_SOLUTIONS: QuickWebLink[] = [
  {
    id: 'ncert-solutions-official',
    name: 'NCERT Official Portal & Solutions (ePathshala)',
    category: 'CBSE & National',
    badge: '📚 Classes 1 to 12',
    description: 'Official textbooks, exemplar problems, and verified chapter exercise answers for CBSE and State Board students.',
    url: 'https://ncert.nic.in/textbook.php',
    iconName: 'BookOpen',
    highlightColor: '#059669',
    tags: ['NCERT', 'CBSE', 'Exemplar', 'Solutions']
  },
  {
    id: 'diksha-portal',
    name: 'DIKSHA - National Digital Platform for Teachers & Students',
    category: 'Govt of India',
    badge: '🇮🇳 30+ Languages',
    description: 'Official digital repository with QR-code textbook lessons, video explanations, interactive worksheets, and state board contents.',
    url: 'https://diksha.gov.in/',
    iconName: 'Globe',
    highlightColor: '#D97706',
    tags: ['State Boards', 'Telugu Content', 'Digital Textbooks']
  },
  {
    id: 'openstax-college',
    name: 'OpenStax (Peer-Reviewed Free College Textbooks)',
    category: 'Higher Ed & College',
    badge: '🎓 Free College Books',
    description: 'Free, peer-reviewed textbooks for University & College students: Calculus, University Physics, Chemistry, Biology, Microeconomics, Statistics.',
    url: 'https://openstax.org/',
    iconName: 'BookMarked',
    highlightColor: '#2563EB',
    tags: ['College Textbooks', 'Undergrad', 'Physics', 'Math']
  },
  {
    id: 'mit-opencourseware',
    name: 'MIT OpenCourseWare (Free College Lecture Notes & Exams)',
    category: 'Premier College',
    badge: '🏛️ MIT Global',
    description: 'Free lecture notes, solved homework assignments, syllabus, and exams directly from Massachusetts Institute of Technology.',
    url: 'https://ocw.mit.edu/',
    iconName: 'Award',
    highlightColor: '#B91C1C',
    tags: ['MIT', 'Computer Science', 'Advanced Engineering']
  },
  {
    id: 'nptel-swayam',
    name: 'NPTEL & SWAYAM (IITs & IISc Online Solutions)',
    category: 'Govt Higher Ed',
    badge: '🏆 IIT Free Portal',
    description: 'Free online courses, verified assignments, solutions, and video tutorials taught by professors from IIT Madras, IIT Bombay, and IISc.',
    url: 'https://swayam.gov.in/',
    iconName: 'GraduationCap',
    highlightColor: '#7C3AED',
    tags: ['Engineering', 'IITs', 'Assignment Solutions']
  },
  {
    id: 'ndli-digital-library',
    name: 'National Digital Library of India (NDLI - IIT Kharagpur)',
    category: 'Digital Books',
    badge: '📖 50M+ Books',
    description: 'Vast digital library covering primary school to research PhD theses, rare manuscripts, audiobooks, and competitive test papers.',
    url: 'https://ndl.iitkgp.ac.in/',
    iconName: 'Library',
    highlightColor: '#0284C7',
    tags: ['Library', 'Competitive Exams', 'Research Papers']
  },
  {
    id: 'open-library-internet-archive',
    name: 'Internet Archive & Open Library',
    category: 'Universal Library',
    badge: '🌐 Free Borrowing',
    description: 'Millions of borrowable books, historical educational documents, scientific references, and classic literature.',
    url: 'https://openlibrary.org/',
    iconName: 'Book',
    highlightColor: '#334155',
    tags: ['Classics', 'Encyclopedia', 'Reference Books']
  }
];

export const TOP_EDUCATIONAL_VIDEOS: QuickWebLink[] = [
  {
    id: 'yt-3blue1brown',
    name: '3Blue1Brown (Visual Math & Essence of Calculus)',
    category: 'Math Visuals',
    badge: '🎬 Best Math Visualizer',
    description: 'Transforms difficult calculus, linear algebra, neural networks, and geometry into intuitive visual animations.',
    url: 'https://www.youtube.com/@3blue1brown',
    iconName: 'Play',
    highlightColor: '#7C3AED',
    tags: ['Calculus', 'Linear Algebra', 'Visual Intuition']
  },
  {
    id: 'yt-crashcourse',
    name: 'CrashCourse (Biology, History, Physics & Chemistry)',
    category: 'Full Curriculum',
    badge: '📽️ 15M+ Students',
    description: 'High-energy, beautifully animated 10-15 minute deep-dives into world history, biology, chemistry, and literature.',
    url: 'https://www.youtube.com/@crashcourse',
    iconName: 'Video',
    highlightColor: '#DC2626',
    tags: ['Biology', 'World History', 'Fast Learning']
  },
  {
    id: 'yt-veritasium',
    name: 'Veritasium (Deep Physics & Science Experiments)',
    category: 'Science Concepts',
    badge: '🔬 Mind-Blowing Science',
    description: 'Answering the world\'s most counter-intuitive science and engineering questions with breathtaking real-life experiments.',
    url: 'https://www.youtube.com/@veritasium',
    iconName: 'Radio',
    highlightColor: '#0284C7',
    tags: ['Physics Experiments', 'Critical Thinking', 'Quantum']
  },
  {
    id: 'yt-physicswallah',
    name: 'Physics Wallah (Foundation & Board Prep)',
    category: 'Board & Competitive',
    badge: '🎯 JEE / NEET / CBSE',
    description: 'Comprehensive physics, chemistry, and math video lectures breaking down textbook problems step-by-step for Indian curricula.',
    url: 'https://www.youtube.com/@PhysicsWallah',
    iconName: 'Tv',
    highlightColor: '#E11D48',
    tags: ['CBSE Solutions', 'Problem Solving', 'Exam Tips']
  }
];

// ==========================================================
// 3. HOLISTIC DEVELOPMENT PORTALS (PLANTATION, SPIRITUALITY,
//    SPORTS, CULTURE, IQ, PARENTING, HEALTH & FREE DOCTORS)
// ==========================================================
export const HOLISTIC_DEVELOPMENT_RESOURCES: HolisticResource[] = [
  // --- A. PLANTATION & ECO-ACTION ---
  {
    id: 'plant-tree-campaign',
    title: 'UNEP Plant for the Planet & Eco-Schools',
    subtitle: 'Global Youth Tree Planting Action Plan',
    teluguTitle: 'వృక్షో రక్షతి రక్షితః - పిల్లల మొక్కల పెంపకం ఉద్యమం',
    category: 'plantation',
    badge: '🌱 Eco Warrior',
    description: 'Step-by-step youth guide for adopting a tree, tracking growth, organic compost making, and school terrace gardens.',
    externalUrl: 'https://www.unep.org/explore-topics/ecosystems-and-biodiversity/what-we-do/tree-planting',
    videoUrl: 'https://www.youtube.com/results?search_query=seed+ball+making+and+tree+plantation+for+students',
    bookTitle: 'The Man Who Planted Trees & Green Guide for Kids',
    actionType: 'weblink',
    accentColor: '#16A34A',
    recommendedFor: 'All Students (LKG - Class 10)'
  },
  {
    id: 'seed-ball-making',
    title: 'Seed Ball Making & Native Reforestation Guide',
    subtitle: 'Make Clay Seed Balls for Forests & Roadways',
    teluguTitle: 'సీడ్ బాల్స్ (విత్తన బంతులు) తయారీ విధానం',
    category: 'plantation',
    badge: '🌿 Hands-On DIY',
    description: 'Interactive DIY guide: Mix clay, soil, compost, and native neem/peepal seeds to cast seed balls before monsoon rains.',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+make+seed+balls+diy+kids',
    actionType: 'video',
    accentColor: '#15803D',
    recommendedFor: 'School Science Clubs & Families'
  },
  {
    id: 'sankalp-taru',
    title: 'SankalpTaru & Project GreenHands India',
    subtitle: 'Geo-Tagged Tree Plantation in India',
    teluguTitle: 'భారతదేశంలో డిజిటల్ వృక్షారోపణ ప్రాజెక్ట్',
    category: 'plantation',
    badge: '🌳 Community Drive',
    description: 'Plant a tree in rural India on your child\'s birthday with GPS tracking, photograph updates, and farmer support.',
    externalUrl: 'https://sankalptaru.org/',
    actionType: 'weblink',
    accentColor: '#059669',
    recommendedFor: 'Parents & Student Birthday Milestones'
  },

  // --- B. SPIRITUALITY & VEDIC WISDOM ---
  {
    id: 'gita-youth-guide',
    title: 'Bhagavad Gita for Youth & Dynamic Living',
    subtitle: '700 Shlokas with Practical Life Applications',
    teluguTitle: 'యువత కోసం భగవద్గీత - స్వామి చిన్మయానంద వివరణ',
    category: 'spirituality',
    badge: '🕉️ Mind Mastery',
    description: 'Chinmaya Yuva Kendra (CHYK) and Ramakrishna Mission practical audio discourses on emotional resilience, focus, and dharma.',
    externalUrl: 'https://www.chinmayamission.com/what-we-do/youth/',
    videoUrl: 'https://www.youtube.com/results?search_query=bhagavad+gita+for+students+daily+focus',
    bookTitle: 'Gita for Children by Roopa Pai & Vivekachudamani',
    actionType: 'weblink',
    accentColor: '#D97706',
    recommendedFor: 'Classes 5 to 10 & College'
  },
  {
    id: 'vedic-dhyana-pranayama',
    title: 'Daily 10-Minute Dhyana & Pranayama for Focus',
    subtitle: 'Nadi Shodhana, Bhramari & Mindfulness Audio',
    teluguTitle: 'పరీక్షల ఏకాగ్రత కోసం ప్రాణాయామం & ధ్యానం',
    category: 'spirituality',
    badge: '🧘 Daily Calm',
    description: 'Audio guided breathing cycles to calm racing thoughts before exams, improve memory retention, and cultivate mental stillness.',
    videoUrl: 'https://www.youtube.com/results?search_query=pranayama+for+students+memory+and+concentration',
    actionType: 'video',
    accentColor: '#B45309',
    recommendedFor: 'Exam Prep & Morning Routine'
  },
  {
    id: 'vedabase-heritage',
    title: 'Vedabase & Indian Heritage Online Library',
    subtitle: 'Sacred Sanskrit Verses with English/Telugu Meaning',
    teluguTitle: 'సంస్కృత శ్లోకాలు మరియు ప్రతిపదార్థాలు',
    category: 'spirituality',
    badge: '📜 Sacred Texts',
    description: 'Authentic word-for-word Sanskrit transliteration, word breakdown, and moral teachings from Upanishads, Gita, and Ramayana.',
    externalUrl: 'https://vedabase.io/',
    actionType: 'weblink',
    accentColor: '#C2410C',
    recommendedFor: 'Moral Science & Sanskrit Learners'
  },

  // --- C. SPORTS TRAININGS & PHYSICAL FITNESS ---
  {
    id: 'khelo-india-portal',
    title: 'Khelo India Official Portal & Fitness Assessments',
    subtitle: 'Govt. of India National Youth Sports Program',
    teluguTitle: 'ఖేలో ఇండియా - జాతీయ క్రీడా శిక్షణ & స్కాలర్‌షిప్‌లు',
    category: 'sports',
    badge: '🏅 Khelo India',
    description: 'Fitness assessment protocols for school children, talent identification tests, district centers, and sports scholarships.',
    externalUrl: 'https://kheloindia.gov.in/',
    videoUrl: 'https://www.youtube.com/results?search_query=khelo+india+fitness+drills+for+school+children',
    actionType: 'weblink',
    accentColor: '#EA580C',
    recommendedFor: 'Ages 6 to 18'
  },
  {
    id: 'olympic-youth-drills',
    title: 'Olympic Youth Speed, Agility & Stamina Drills',
    subtitle: 'Athletics, Football, Cricket & Badminton Fundamentals',
    teluguTitle: 'క్రీడాకారుల వేగం మరియు శరీర దారుఢ్య శిక్షణ',
    category: 'sports',
    badge: '⚽ Agility & Drills',
    description: 'Ladder drills, cone shuttle runs, sprint mechanics, core strength, and injury prevention exercises for young athletes.',
    videoUrl: 'https://www.youtube.com/results?search_query=speed+and+agility+drills+for+kids+sports',
    actionType: 'video',
    accentColor: '#E11D48',
    recommendedFor: 'Sports Teams & PE Classes'
  },
  {
    id: 'student-yoga-fitness',
    title: 'Surya Namaskar & Asanas for Growing Children',
    subtitle: '12 Surya Namaskar Postures for Posture & Height',
    teluguTitle: 'సూర్య నమస్కారాలు & పిల్లల శారీరక ఎదుగుదల యోగాసనాలు',
    category: 'sports',
    badge: '🤸 Flexibility',
    description: 'Detailed step-by-step posture guide to prevent desk slouching, enhance spine flexibility, and strengthen leg muscles.',
    videoUrl: 'https://www.youtube.com/results?search_query=surya+namaskar+step+by+step+for+kids',
    actionType: 'video',
    accentColor: '#0284C7',
    recommendedFor: 'Daily Morning PE Routine'
  },

  // --- D. CULTURE & HERITAGE TRAININGS ---
  {
    id: 'spic-macay-portal',
    title: 'SPIC MACAY (Classical Music, Dance & Folk Arts)',
    subtitle: 'Promoting Indian Classical Heritage in Schools',
    teluguTitle: 'స్పిక్ మాకే - భారతీయ శాస్త్రీయ సంగీతం, నృత్యం & సంస్కృతి',
    category: 'culture',
    badge: '🎭 Heritage Arts',
    description: 'Workshops and live masterclasses from top classical masters: Carnatic, Hindustani, Kuchipudi, Bharatanatyam, and rural handicrafts.',
    externalUrl: 'https://spicmacay.org/',
    videoUrl: 'https://www.youtube.com/results?search_query=spic+macay+masterclass+indian+classical+music',
    actionType: 'weblink',
    accentColor: '#9333EA',
    recommendedFor: 'Art, Music & Dance Enthusiasts'
  },
  {
    id: 'ccrt-india',
    title: 'Centre for Cultural Resources & Training (CCRT India)',
    subtitle: 'Govt. of India Cultural Talent Search Scholarship',
    teluguTitle: 'భారత ప్రభుత్వ సాంస్కృతిక శిక్షణా కేంద్రం',
    category: 'culture',
    badge: '🏛️ Govt Scholarships',
    description: 'Cultural talent search scholarships (CTSS) for youth aged 10-14 in traditional puppetry, painting, folk drama, and vocal arts.',
    externalUrl: 'http://ccrtindia.gov.in/',
    actionType: 'weblink',
    accentColor: '#7E22CE',
    recommendedFor: 'Students aged 10 to 14'
  },
  {
    id: 'telugu-folk-and-crafts',
    title: 'Andhra & Telangana Folk Arts & Handicrafts (Kondapalli / Pochampally)',
    subtitle: 'Traditional Woodcraft, Kalamkari & Weaving Masterclasses',
    teluguTitle: 'కొండపల్లి బొమ్మలు & పోచంపల్లి సాంప్రదాయ కళలు',
    category: 'culture',
    badge: '🎨 Folk Heritage',
    description: 'Documentaries and interactive crafts lessons exploring how eco-friendly vegetable dyes, wooden toys, and handlooms are made.',
    videoUrl: 'https://www.youtube.com/results?search_query=kondapalli+toys+making+documentary',
    actionType: 'video',
    accentColor: '#A855F7',
    recommendedFor: 'Visual Arts & History Classes'
  },

  // --- E. IQ LEVEL CHECK & APTITUDE WEBSITES ---
  {
    id: 'mensa-practice-test',
    title: 'Mensa International Practice IQ Test',
    subtitle: 'Standardized Pattern Recognition & Spatial Logic',
    teluguTitle: 'మెన్సా అంతర్జాతీయ ప్రాక్టీస్ IQ పరీక్ష',
    category: 'iq_tests',
    badge: '🧠 High IQ Society',
    description: '30-question culture-fair matrix puzzle test assessing logical reasoning, sequence completion, and visual deduction.',
    externalUrl: 'https://www.mensa.org/workout',
    actionType: 'weblink',
    accentColor: '#2563EB',
    recommendedFor: 'Students Class 6 & Above'
  },
  {
    id: 'cambridge-brain-sciences',
    title: 'Cambridge Brain Sciences (Memory & Reasoning Test)',
    subtitle: 'Scientific Cognitive Assessment Battery',
    teluguTitle: 'కేంబ్రిడ్జ్ మెదడు పనితీరు మరియు జ్ఞాపకశక్తి పరీక్ష',
    category: 'iq_tests',
    badge: '📊 Cognitive Science',
    description: 'Measures working memory span, cognitive flexibility, mental rotation, and focus with scientifically validated games.',
    externalUrl: 'https://www.cambridgecognition.com/',
    actionType: 'weblink',
    accentColor: '#1D4ED8',
    recommendedFor: 'Aptitude Benchmarking'
  },
  {
    id: 'sof-olympiad-aptitude',
    title: 'Science Olympiad Foundation (SOF) Mock Aptitude Tests',
    subtitle: 'IMO, NSO & NCO Logical Reasoning Questions',
    teluguTitle: 'ఒలింపియాడ్ లాజికల్ రీజనింగ్ మాక్ టెస్టులు',
    category: 'iq_tests',
    badge: '🏆 Olympiad Prep',
    description: 'Download previous question papers and practice interactive logical reasoning questions curated for national math & science olympiads.',
    externalUrl: 'https://sofworld.org/',
    actionType: 'weblink',
    accentColor: '#3B82F6',
    recommendedFor: 'Classes 1 to 10 Olympiad Aspirants'
  },

  // --- F. PARENT-CHILD RELATIONS & FAMILY HARMONY ---
  {
    id: 'harvard-child-development',
    title: 'Harvard Center on the Developing Child (Serve & Return)',
    subtitle: 'Brain Architecture & Positive Parent Interaction',
    teluguTitle: 'హార్వర్డ్ పిల్లల మానసిక వికాస పరిశోధన - పేరెంటింగ్ గైడ్',
    category: 'parenting',
    badge: '🔬 Evidence-Based',
    description: '5 essential steps of "Serve and Return" interaction that build neural connections, improve language, and prevent behavioral outbursts.',
    externalUrl: 'https://developingchild.harvard.edu/resources/how-to-5-steps-for-brain-building-serve-and-return/',
    videoUrl: 'https://www.youtube.com/results?search_query=serve+and+return+parenting+harvard',
    bookTitle: 'The Whole-Brain Child by Dr. Dan Siegel',
    actionType: 'weblink',
    accentColor: '#E11D48',
    recommendedFor: 'Parents with Kids of All Ages'
  },
  {
    id: 'active-listening-teens',
    title: 'Active Listening & De-escalating Teenage Conflict',
    subtitle: 'Bridge the Communication Gap Between Parents and Teens',
    teluguTitle: 'టీనేజ్ పిల్లలతో సంభాషణ మరియు స్నేహపూర్వక బంధం',
    category: 'parenting',
    badge: '❤️ Empathy Guide',
    description: 'Practical communication rules: replace interrogation with curiosity, validate emotions before offering advice, and establish device-free dinner hours.',
    videoUrl: 'https://www.youtube.com/results?search_query=how+to+communicate+with+teenage+child+without+yelling',
    actionType: 'video',
    accentColor: '#BE123C',
    recommendedFor: 'Parents with Teens (Classes 6-10)'
  },
  {
    id: 'unicef-positive-parenting',
    title: 'UNICEF Positive Parenting Portal & Emotional Security',
    subtitle: 'Building Warmth, Consistency and Self-Esteem',
    teluguTitle: 'యునిసెఫ్ పాజిటివ్ పేరెంటింగ్ సలహాలు',
    category: 'parenting',
    badge: '🌐 Global Standard',
    description: 'Managing sibling rivalry, praising effort instead of grades, and fostering resilience without emotional punishment.',
    externalUrl: 'https://www.unicef.org/parenting/',
    actionType: 'weblink',
    accentColor: '#9F1239',
    recommendedFor: 'All Parents'
  },

  // --- G. HEALTH & PSYCHOLOGY / MENTAL WELLNESS CHECKUPS ---
  {
    id: 'tele-manas-helpline',
    title: 'Tele-MANAS (Govt. of India 24x7 Mental Health Helpline)',
    subtitle: 'Toll-Free 14416 / 1800-891-4416 - Free Counselor Support',
    teluguTitle: 'టెలి-మానస్: 14416 ఉచిత మానసిక ఆరోగ్య కౌన్సిలర్ హెల్ప్‌లైన్',
    category: 'health_psychology',
    badge: '🚨 24x7 Govt Helpline',
    description: 'Immediate, confidential tele-counseling in Telugu, Hindi, English, and all regional languages for students facing exam stress, anxiety, or depression.',
    externalUrl: 'https://telemanas.mohfw.gov.in/',
    actionType: 'emergency',
    accentColor: '#DC2626',
    recommendedFor: 'Students & Parents in Need of Immediate Guidance'
  },
  {
    id: 'who-adolescent-health',
    title: 'WHO Adolescent Mental Health & Wellness Framework',
    subtitle: 'World Health Organization Youth Guidelines',
    teluguTitle: 'ప్రపంచ ఆరోగ్య సంస్థ (WHO) కౌమార దశ ఆరోగ్య మార్గదర్శకాలు',
    category: 'health_psychology',
    badge: '🏥 Global Guidelines',
    description: 'Guidance on sleep hygiene (8-9 hours for growing brains), screen time limits, peer pressure coping mechanisms, and balanced nutrition.',
    externalUrl: 'https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health',
    actionType: 'weblink',
    accentColor: '#0891B2',
    recommendedFor: 'Adolescents (Ages 10-19)'
  },
  {
    id: 'student-stress-screener',
    title: 'Interactive Student Exam Anxiety & Stress Screener',
    subtitle: 'Self-Check 6 Simple Behavioral Indicators',
    teluguTitle: 'విద్యార్థుల పరీక్షల ఒత్తిడి మరియు భయం స్వీయ పరీక్ష',
    category: 'health_psychology',
    badge: '📝 Interactive Screener',
    description: 'A confidential, supportive self-assessment questionnaire to identify early signs of academic burnout with actionable coping strategies.',
    actionType: 'interactive_check',
    accentColor: '#0284C7',
    recommendedFor: 'Before Midterms & Board Exams'
  },

  // --- H. ONLINE FREE DOCTOR SUPPORT & MEDICINE LINKS ---
  {
    id: 'esanjeevani-opd',
    title: 'eSanjeevani (Govt. of India National Free Telemedicine OPD)',
    subtitle: 'Free Video Consultations with Certified Govt. Doctors',
    teluguTitle: 'ఈ-సంజీవని: భారత ప్రభుత్వ ఉచిత ఆన్‌లైన్ డాక్టర్ సంప్రదింపులు',
    category: 'doctor_medicine',
    badge: '🩺 100% Free Govt Doctors',
    description: 'Ministry of Health & Family Welfare free national telemedicine service. Consult qualified MBBS/specialist doctors via secure video call and get valid digital prescriptions.',
    externalUrl: 'https://esanjeevani.mohfw.gov.in/',
    actionType: 'emergency',
    accentColor: '#16A34A',
    recommendedFor: 'All Families & General Pediatric Consults'
  },
  {
    id: 'pm-jan-aushadhi',
    title: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)',
    subtitle: 'Search Affordable Generic Medicines & Store Locator',
    teluguTitle: 'ప్రధానమంత్రి జన ఔషధి - సరసమైన ధరల్లో జనరిక్ మందులు',
    category: 'doctor_medicine',
    badge: '💊 50-90% Cheaper Meds',
    description: 'Locate over 10,000+ Jan Aushadhi Kendras across India. Compare generic medicine pricing against expensive branded alternatives with identical chemical compositions.',
    externalUrl: 'https://janaushadhi.gov.in/',
    actionType: 'weblink',
    accentColor: '#059669',
    recommendedFor: 'Affordable Prescriptions & Health Budgeting'
  },
  {
    id: 'tata-1mg-medicine-guide',
    title: 'Tata 1mg Comprehensive Medicine Guide & Interaction Checker',
    subtitle: 'Verify Chemical Salt, Dosage, Side-Effects & Safety Warnings',
    teluguTitle: 'టాటా 1mg ఔషధాల వివరాలు, మోతాదు మరియు దుష్ప్రభావాల పరిశీలన',
    category: 'doctor_medicine',
    badge: '🔍 Medicine Verification',
    description: 'Search any prescribed medicine brand name to check its active salt formula, recommended pediatric dosage, contraindications, and food interactions.',
    externalUrl: 'https://www.1mg.com/drugs',
    actionType: 'weblink',
    accentColor: '#EA580C',
    recommendedFor: 'Parents Verifying Prescriptions & Safety'
  },
  {
    id: 'nhp-national-helpline',
    title: 'National Health Portal (NHP) & 104 / 108 Emergency Directory',
    subtitle: 'Toll-Free 104 Medical Advice & 108 Ambulance Network',
    teluguTitle: 'జాతీయ ఆరోగ్య పోర్టల్ మరియు 104 / 108 అత్యవసర సేవలు',
    category: 'doctor_medicine',
    badge: '🚑 Emergency 108 / 104',
    description: 'Instant directory of state blood banks, 24x7 casualty hospitals, primary health centers (PHC), and immediate poison/snakebite first-aid protocols.',
    externalUrl: 'https://www.nhp.gov.in/',
    actionType: 'emergency',
    accentColor: '#DC2626',
    recommendedFor: 'Family Emergency Preparedness'
  },
  {
    id: 'who-essential-medicines',
    title: 'WHO Model List of Essential Medicines (Children & Adults)',
    subtitle: 'World Health Organization Standards for Safe Medications',
    teluguTitle: 'ప్రపంచ ఆరోగ్య సంస్థ ముఖ్యమైన ఔషధాల ప్రామాణిక జాబితా',
    category: 'doctor_medicine',
    badge: '📋 WHO Standard',
    description: 'Official global standard list of the safest, most effective medicines needed in a basic health system, specifically indexed for pediatric care.',
    externalUrl: 'https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines/essential-medicines-lists',
    actionType: 'weblink',
    accentColor: '#0284C7',
    recommendedFor: 'Scientific & Evidence-Based Medication Reference'
  },
  {
    id: 'red-cross-first-aid',
    title: 'Red Cross First-Aid, CPR & Emergency Home Treatment Guide',
    subtitle: 'Step-by-Step Treatment for Cuts, Burns, Choking & Fractures',
    teluguTitle: 'రెడ్ క్రాస్ ప్రథమ చికిత్స (First-Aid) మరియు అత్యవసర మార్గదర్శకాలు',
    category: 'doctor_medicine',
    badge: '🩹 First-Aid Guide',
    description: 'Clear visual instructions on performing child CPR, treating fever convulsions, choking relief (Heimlich maneuver), and dressing sports sprains.',
    externalUrl: 'https://www.redcross.org/take-a-class/first-aid',
    videoUrl: 'https://www.youtube.com/results?search_query=red+cross+first+aid+for+children+and+parents',
    actionType: 'weblink',
    accentColor: '#B91C1C',
    recommendedFor: 'Every Household & School Staff'
  }
];

// Interactive Student Anxiety / Stress Screener Questions
export interface ScreenerQuestion {
  id: number;
  question: string;
  teluguQuestion: string;
  options: {
    label: string;
    points: number;
  }[];
}

export const STUDENT_STRESS_SCREENER_QUESTIONS: ScreenerQuestion[] = [
  {
    id: 1,
    question: 'How often do you feel overwhelmed or anxious about homework deadlines and upcoming tests?',
    teluguQuestion: 'హోంవర్క్ గడువులు మరియు రాబోయే పరీక్షల గురించి మీరు ఎంత తరచుగా ఆందోళన చెందుతారు?',
    options: [
      { label: 'Rarely / Never', points: 0 },
      { label: 'Sometimes (1-2 days a week)', points: 1 },
      { label: 'Often (3-4 days a week)', points: 2 },
      { label: 'Almost every day', points: 3 }
    ]
  },
  {
    id: 2,
    question: 'Do you experience difficulty falling asleep or waking up tired thinking about school?',
    teluguQuestion: 'పాఠశాల విషయాల గురించి ఆలోచిస్తూ నిద్ర పట్టకపోవడం లేదా అలసటగా మేల్కొనడం జరుగుతుందా?',
    options: [
      { label: 'Rarely / Sound sleep', points: 0 },
      { label: 'Occasionally before big exams', points: 1 },
      { label: 'Frequently', points: 2 },
      { label: 'Severe sleep trouble', points: 3 }
    ]
  },
  {
    id: 3,
    question: 'Can you concentrate comfortably on solving a challenging problem for 25-30 minutes without panic?',
    teluguQuestion: 'కఠినమైన లెక్కలు లేదా ప్రశ్నలను కంగారు పడకుండా 25-30 నిమిషాలు ఏకాగ్రతతో చేయగలరా?',
    options: [
      { label: 'Yes, easily and calm', points: 0 },
      { label: 'Mostly yes, with occasional restlessness', points: 1 },
      { label: 'Hard to focus, easily distracted', points: 2 },
      { label: 'Feel extreme frustration and give up', points: 3 }
    ]
  },
  {
    id: 4,
    question: 'Do you feel comfortable discussing difficult academic subjects or mistakes openly with your parents or teachers?',
    teluguQuestion: 'కష్టమైన అంశాలు లేదా పరీక్షలలో తప్పుల గురించి మీ తల్లిదండ్రులు లేదా ఉపాధ్యాయులతో నిర్భయంగా మాట్లాడగలరా?',
    options: [
      { label: 'Yes, complete open trust', points: 0 },
      { label: 'Usually yes', points: 1 },
      { label: 'Sometimes afraid of scolding', points: 2 },
      { label: 'No, feel fearful or hide marks', points: 3 }
    ]
  }
];
