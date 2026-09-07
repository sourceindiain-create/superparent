export interface JioTVChannel {
  id: string;
  name: string;
  category: 'Education & Science' | 'Regional Telugu' | 'Kids & Animation' | 'Vedic & Sanskar' | 'Sports & Agility' | 'News & Knowledge';
  language: string;
  badge: 'LIVE' | '4K UHD' | 'HD' | 'EXCLUSIVE';
  logo: string;
  banner: string;
  streamUrl: string; // YouTube embed / live stream
  currentShow: {
    title: string;
    teluguTitle: string;
    episode: string;
    timeRange: string;
    progressPercent: number;
    description: string;
    gradeTarget: string;
  };
  upcomingShows: {
    title: string;
    time: string;
  }[];
}

export const JIOTV_CHANNELS: JioTVChannel[] = [
  {
    id: 'ch-gyan-darshan',
    name: 'DD Gyan Darshan (NCERT Live)',
    category: 'Education & Science',
    language: 'English / Hindi',
    badge: 'LIVE',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    streamUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1',
    currentShow: {
      title: 'Class 6–10 Advanced Mathematics & Robotics Principles',
      teluguTitle: 'మ్యాథ్స్ & రోబోటిక్స్ లైవ్ పాఠాలు',
      episode: 'Live Special Edition',
      timeRange: '07:00 PM - 08:30 PM',
      progressPercent: 65,
      description: 'Live interactive telecast featuring IIT professors solving algebraic systems, real-world quadratic models, and sensor integrations.',
      gradeTarget: 'Class 6 - 10'
    },
    upcomingShows: [
      { title: 'Physics: Electromagnetic Induction Demystified', time: '08:30 PM' },
      { title: 'Science Olympiad Mock Problem Solving', time: '09:15 PM' }
    ]
  },
  {
    id: 'ch-pm-evidya',
    name: 'PM eVIDYA One Class One Channel',
    category: 'Education & Science',
    language: 'National Multilingual',
    badge: '4K UHD',
    logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    streamUrl: 'https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=1',
    currentShow: {
      title: 'NCERT Masterclass: Plant Anatomy & Soil Bio-Cycles',
      teluguTitle: 'వృక్ష శాస్త్రం & జీవ చక్రాలు',
      episode: 'Season 2026 • Ep 42',
      timeRange: '07:30 PM - 08:45 PM',
      progressPercent: 40,
      description: 'Detailed microscopic 3D visual explanation of xylem, phloem, photosynthesis reactions, and organic school plantation methods.',
      gradeTarget: 'Class 4 - 8'
    },
    upcomingShows: [
      { title: 'Chemistry Lab: Chemical Bonds & Crystal Lattices', time: '08:45 PM' },
      { title: 'English Grammar & Spoken Phonetics', time: '09:30 PM' }
    ]
  },
  {
    id: 'ch-dd-yadagiri',
    name: 'DD Yadagiri Telugu Gurukul',
    category: 'Regional Telugu',
    language: 'Telugu',
    badge: 'LIVE',
    logo: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd8?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    streamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0',
    currentShow: {
      title: 'మన ఊరు - మన బడి: పదో తరగతి పరీక్షల ప్రత్యేక ప్రణాళిక',
      teluguTitle: '10వ తరగతి పబ్లిక్ పరీక్షల సిలబస్ & టిప్స్',
      episode: 'లైవ్ ఫోన్-ఇన్ కార్యక్రమం',
      timeRange: '06:30 PM - 08:00 PM',
      progressPercent: 80,
      description: 'రాష్ట్ర సిలబస్ అనుభవజ్ఞులైన ఉపాధ్యాయులచే తెలుగు మీడియం మరియు ఇంగ్లీష్ మీడియం విద్యార్థులకు ప్రత్యేక మార్గదర్శనం.',
      gradeTarget: 'Class 9 - 10'
    },
    upcomingShows: [
      { title: 'తెలుగు భాషా సౌందర్యం: పోతన భాగవతం పద్యాలు', time: '08:00 PM' },
      { title: 'సాంఘిక శాస్త్రం: భారతదేశ చరిత్ర & నదులు', time: '08:45 PM' }
    ]
  },
  {
    id: 'ch-discovery-kids',
    name: 'Discovery Science & Young Explorers',
    category: 'Education & Science',
    language: 'English / Hindi',
    badge: 'HD',
    logo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80',
    streamUrl: 'https://www.youtube.com/embed/7VnJ80y9m9A?autoplay=0',
    currentShow: {
      title: 'Drones, Rovers & Mars Colony Architecture',
      teluguTitle: 'డ్రోన్లు, రోవర్లు & అంతరిక్ష సాంకేతికత',
      episode: 'Mega Docuseries',
      timeRange: '07:15 PM - 08:15 PM',
      progressPercent: 55,
      description: 'How young engineering students built miniature rovers using solar cells, LiDAR sensors, and carbon-fiber frames.',
      gradeTarget: 'Class 5 - 10'
    },
    upcomingShows: [
      { title: 'Deep Ocean Mysteries & Submersible Robotics', time: '08:15 PM' },
      { title: 'Black Holes & The James Webb Space Telescope', time: '09:00 PM' }
    ]
  },
  {
    id: 'ch-sanskar-tv',
    name: 'Sanskar TV & Vedic Gurukul',
    category: 'Vedic & Sanskar',
    language: 'Sanskrit / Telugu / Hindi',
    badge: 'EXCLUSIVE',
    logo: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=sanskar',
    currentShow: {
      title: 'శ్రీమద్భగవద్గీత నిత్య పారాయణం & శ్లోకార్థాలు (Chapter 2 & 4)',
      teluguTitle: 'గీతా పద్యాల తాత్పర్యం & పిల్లల మానసిక స్థైర్యం',
      episode: 'సాయంకాల పూజ & ధ్యానం',
      timeRange: '06:00 PM - 07:45 PM',
      progressPercent: 90,
      description: 'గీతా ప్రెస్ గోరఖ్‌పూర్ ప్రామాణిక పద్ధతిలో పిల్లల చేత శ్లోకాలు పలికించి వాటి అర్థాలను సరళమైన కథల ద్వారా వివరించే ప్రసారం.',
      gradeTarget: 'All Ages / Family'
    },
    upcomingShows: [
      { title: 'శ్రీ విష్ణు సహస్రనామ స్తోత్రం & సంధ్యావందనం', time: '07:45 PM' },
      { title: 'రామాయణ బాలకాండ కథాగానం', time: '08:30 PM' }
    ]
  },
  {
    id: 'ch-khelo-india',
    name: 'Sports India & Khelo Fitness',
    category: 'Sports & Agility',
    language: 'English / Hindi',
    badge: 'LIVE',
    logo: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=200&q=80',
    banner: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
    streamUrl: 'https://www.youtube.com/embed/live_stream?channel=sports',
    currentShow: {
      title: 'Junior Khelo India Athletics & Reflex Training',
      teluguTitle: 'జూనియర్ క్రీడా పోటీలు & ఫిట్‌నెస్ ట్రైనింగ్',
      episode: 'National Youth Finals',
      timeRange: '06:00 PM - 08:30 PM',
      progressPercent: 75,
      description: 'Track, sprint mechanics, badminton footwork drills, and sports nutrition guidance for growing kids.',
      gradeTarget: 'Class 3 - 10'
    },
    upcomingShows: [
      { title: 'Yoga Asanas for Concentration & Memory Retention', time: '08:30 PM' },
      { title: 'Table Tennis & Reflex Speed Drills', time: '09:15 PM' }
    ]
  }
];

export interface NetflixContentItem {
  id: string;
  title: string;
  teluguTitle: string;
  category: string;
  badge?: string;
  rating: string;
  matchScore: number;
  duration: string;
  poster: string;
  banner: string;
  description: string;
  targetTab: string;
  tags: string[];
}

export const NETFLIX_TOP_10: NetflixContentItem[] = [
  {
    id: 'top-1',
    title: 'Google Lens & Multi-Modal Homework Solver',
    teluguTitle: 'గూగుల్ లెన్స్ & హోంవర్క్ OCR సాల్వర్',
    category: 'AI Tools & Solvers',
    badge: 'TOP 1',
    rating: 'U/A 7+',
    matchScore: 99,
    duration: 'Real-time AI',
    poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    description: 'Instant multi-modal homework solver: upload photos of handwritten maths problems, PDF worksheets, or dictate by voice.',
    targetTab: 'homework',
    tags: ['Google Lens', 'OCR', 'Step-by-step', 'Telugu Audio']
  },
  {
    id: 'top-2',
    title: '3D Human Anatomy & Interactive Bio-Lab',
    teluguTitle: '3D మానవ శరీరం & ఆర్గాన్ ల్యాబ్',
    category: 'Science 3D',
    badge: 'TOP 2',
    rating: 'All Ages',
    matchScore: 98,
    duration: 'Interactive 3D',
    poster: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    description: 'Rotate and dissect 3D heart, neural pathways, skull, and digestive systems with real-time anatomical guides.',
    targetTab: 'kids-lab',
    tags: ['AnatomyZone', '3D Bio', 'Medical Grade', 'Free']
  },
  {
    id: 'top-3',
    title: 'Bhagavad Gita 700 Shlokas with Telugu Audio',
    teluguTitle: '700 భగవద్గీత శ్లోకాలు & గానం',
    category: 'Sanskar & Vedic',
    badge: 'TOP 3',
    rating: 'Universal',
    matchScore: 97,
    duration: '700 Verses',
    poster: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1609743522653-52354461eb27?auto=format&fit=crop&w=1200&q=80',
    description: 'Master auspicious Sanskrit pronunciation, Telugu word-by-word meaning, and daily moral habits for students.',
    targetTab: 'sanskar',
    tags: ['Gita Press', 'Chanting', 'Sanskrit', 'Telugu']
  },
  {
    id: 'top-4',
    title: 'Super Student $200,000 Free DevPacks & 11 AI Courses',
    teluguTitle: 'సూపర్ స్టూడెంట్ ఉచిత డెవ్‌ప్యాక్స్ & 11 ఏఐ కోర్సులు',
    category: 'Tech & Career',
    badge: 'TOP 4',
    rating: 'Class 6–10',
    matchScore: 96,
    duration: '11 Certifications',
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    description: 'Free access to GitHub Student Developer Pack, JetBrains IDEs, Microsoft Azure student cloud credits, and Google AI certifications.',
    targetTab: 'super-student',
    tags: ['GitHub', 'Free Software', 'Cloud Credits', 'Certificates']
  },
  {
    id: 'top-5',
    title: 'Class 1–10 CBSE & State Board Digital Books',
    teluguTitle: 'CBSE & స్టేట్ బోర్డ్ డిజిటల్ పాఠ్యపుస్తకాలు',
    category: 'Academic Hub',
    badge: 'TOP 5',
    rating: 'LKG - 10th',
    matchScore: 95,
    duration: 'Full Syllabus',
    poster: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80',
    description: 'NCERT official textbooks, solution keys, practice question banks, and video explanations across all grades.',
    targetTab: 'education',
    tags: ['NCERT', 'CBSE', 'DIKSHA', 'State Board']
  },
  {
    id: 'top-6',
    title: 'Robotics, IoT Sensors & Arduino Drone Simulators',
    teluguTitle: 'రోబోటిక్స్ & సర్క్యూట్ సిమ్యులేటర్లు',
    category: 'Innovation',
    badge: 'TOP 6',
    rating: 'Class 5–10',
    matchScore: 94,
    duration: 'Tinkercad / Wokwi',
    poster: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    description: 'Build virtual circuits without physical hardware damage. Learn microcontrollers, servos, and soil sensors safely.',
    targetTab: 'innovation',
    tags: ['Tinkercad', 'Circuits', 'Robotics', 'DIY']
  },
  {
    id: 'top-7',
    title: 'World Language Lab: Telugu, English, Hindi, Sanskrit & Japanese',
    teluguTitle: 'ప్రపంచ భాషా ప్రయోగశాల & ఉచ్చారణ',
    category: 'Languages',
    badge: 'TOP 7',
    rating: 'All Ages',
    matchScore: 93,
    duration: '10 Languages',
    poster: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80',
    description: 'Speech recognition pronunciation scoring, conversational dialogues, and bilingual grammar games.',
    targetTab: 'language-lab',
    tags: ['Duolingo Style', 'Audio', 'Pronunciation', 'Telugu']
  },
  {
    id: 'top-8',
    title: 'Parenting Psychology & Screen-Time Balance Masterclass',
    teluguTitle: 'పేరెంటింగ్ సైకాలజీ & అనుబంధం',
    category: 'Parenting',
    badge: 'TOP 8',
    rating: 'For Parents',
    matchScore: 92,
    duration: 'Masterclasses',
    poster: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80',
    description: 'Expert frameworks from child psychologists on handling exam anxiety, sibling rivalry, and establishing digital curfew habits.',
    targetTab: 'parenting',
    tags: ['Psychology', 'Parent-Child', 'Screen Time', 'Harvard']
  },
  {
    id: 'top-9',
    title: 'Chandamama & Andhra Moral Stories Audiobooks',
    teluguTitle: 'చందమామ & నీతి కథలు ఆడియో',
    category: 'Stories',
    badge: 'TOP 9',
    rating: 'Kids / Family',
    matchScore: 91,
    duration: '50+ Stories',
    poster: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80',
    description: 'Enchanting Telugu bedtime stories, Tenali Ramakrishna wit, Panchatantra wisdom, and character-building adventures.',
    targetTab: 'stories',
    tags: ['Chandamama', 'Bedtime', 'Audiobook', 'Telugu']
  },
  {
    id: 'top-10',
    title: 'Cognitive Brain Games, IQ Puzzles & Math Arenas',
    teluguTitle: 'లాజికల్ గేమ్స్ & మెదడు క్విజ్',
    category: 'Brain Games',
    badge: 'TOP 10',
    rating: 'All Ages',
    matchScore: 90,
    duration: 'Unlimited Play',
    poster: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=600&q=80',
    banner: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=1200&q=80',
    description: 'Interactive Sudoku, speed mental arithmetic, pattern recognition, and Chess tactical challenges.',
    targetTab: 'games',
    tags: ['Chess', 'Sudoku', 'Speed Math', 'Badges']
  }
];
