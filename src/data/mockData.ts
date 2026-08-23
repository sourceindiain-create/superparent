import { 
  AIExpertInfo, 
  EducationSubject, 
  GitaShloka, 
  StoryItem, 
  ParentingArticle, 
  BondingActivity,
  ParentingScenario,
  AgeMilestone,
  InnovationProject, 
  MarketplaceProduct, 
  StudentShowcaseItem, 
  GrowthData, 
  PricingPlan 
} from '../types';

export const COMPANY_INFO = {
  name: 'SUPER PARENT',
  tagline: 'Smart Parent • Happy Child • Bright Future',
  subTagline: 'All-in-One Gurukul for Children & Parents • LKG to 10th Class',
  missionLine: 'Education to Innovation • Sanskar to Skills • Parent to Future',
  phone1: '7981967919',
  phone2: '7989997015',
  email: 'support@superparentgurukul.com',
  website: 'www.superparentgurukul.com',
  headOffice: 'First Line, Ayyappa Nagar, Whitefield Road, Bengaluru - 560066, Karnataka, India',
  branch: 'Visakhapatnam, Andhra Pradesh',
  startingPrice: 600,
  maxPrice: 2000,
};

export const AI_EXPERTS: AIExpertInfo[] = [
  {
    id: 'general',
    name: 'SUPER AI Chatbot',
    teluguName: 'సూపర్ AI సహాయకుడు',
    icon: 'Bot',
    description: 'Ask any question on studies, projects, crafts, or parenting'
  },
  {
    id: 'tutor',
    name: 'AI Subject Tutor',
    teluguName: 'AI సబ్జెక్ట్ ట్యూటర్',
    icon: 'GraduationCap',
    description: 'Instant step-by-step doubt clearing for Maths, Physics, Telugu, Science & English'
  },
  {
    id: 'robotics',
    name: 'AI Robotics & Drone Mentor',
    teluguName: 'AI రోబోటిక్స్ & డ్రోన్ మెంటార్',
    icon: 'Cpu',
    description: 'Learn circuits, Arduino, drones, sensors & electronic DIY models safely'
  },
  {
    id: 'doctor',
    name: 'AI Health Guide (Doctor)',
    teluguName: 'AI హెల్త్ గైడ్ (డాక్టర్)',
    icon: 'HeartPulse',
    description: 'Child nutrition, health habits & wellness education',
    disclaimer: 'Educational guide only. Consult a qualified medical practitioner for diagnosis or emergencies.'
  },
  {
    id: 'psychologist',
    name: 'AI Child Psychologist',
    teluguName: 'AI చైల్డ్ సైకాలజిస్ట్',
    icon: 'Brain',
    description: 'Parent-child communication, focus improvement & emotional guidance',
    disclaimer: 'Educational support tool only. Consult a qualified specialist for professional therapy.'
  },
  {
    id: 'astrologer',
    name: 'AI Cultural Wisdom & Astrology',
    teluguName: 'AI సంస్కృతి & జ్యోతిష్య సలహాదారు',
    icon: 'Sparkles',
    description: 'Vedic wisdom, auspicious habits, birth stars & traditional values'
  },
  {
    id: 'craft',
    name: 'AI Craft & DIY Master',
    teluguName: 'AI క్రాఫ్ట్ & ఆర్ట్ మాస్టర్',
    icon: 'Palette',
    description: 'Origami, recycled crafts, clay modeling & creative art ideas'
  },
  {
    id: 'chef',
    name: 'AI Kids Chef & Nutritionist',
    teluguName: 'AI కిడ్స్ చెఫ్ & రెసిపీ మార్గదర్శి',
    icon: 'Utensils',
    description: 'Healthy snacks, fireless cooking & fun recipes with household ingredients'
  },
  {
    id: 'storytelling',
    name: 'AI Storyteller',
    teluguName: 'AI కథల రూపకర్త',
    icon: 'BookOpen',
    description: 'Custom moral stories tailored to your child’s age and interest'
  },
  {
    id: 'parenting',
    name: 'AI Parenting Guidance',
    teluguName: 'AI పేరెంటింగ్ గైడ్',
    icon: 'Users',
    description: 'Effective parenting strategies, discipline, screen-time balance & motivation'
  }
];

export const GITA_SHLOKAS: GitaShloka[] = [
  {
    id: 'gita-1',
    chapter: 2,
    shlokaNum: 47,
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    transliteration: 'Karmaṇyevādhikārastē mā phalēṣu kadācana | Mā karmaphalahēturbhūrmā tē saṅgō’stvakarmaṇi ||',
    teluguMeaning: 'నీకు కర్మ చేయడంలోనే అధికారముంది, ఫలితముపై ఎప్పుడూ లేదు. నీవు కర్మఫలానికి కారణం కాకూడదు, అలాగని కర్మలు చేయడం మానకూడదు.',
    englishMeaning: 'You have a right to perform your prescribed duties, but you are never entitled to the fruits of your actions.',
    keyTakeaway: 'Focus on sincere effort in your studies and projects without worrying excessively about marks.'
  },
  {
    id: 'gita-2',
    chapter: 4,
    shlokaNum: 7,
    sanskrit: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
    transliteration: 'Yadā yadā hi dharmasya glānirbhavati bhārata | Abhyutthānamadharmasya tadātmānaṁ sṛjāmyaham ||',
    teluguMeaning: 'ఎప్పుడైతే ధర్మానికి హాని కలిగి అధర్మం పెరుగుతుందో, అప్పుడు నన్ను నేను అవతరింపజేసుకుంటాను.',
    englishMeaning: 'Whenever there is a decline in righteousness and an increase in unrighteousness, I manifest Myself.',
    keyTakeaway: 'Good habits, honesty and truthfulness always triumph over unfair practices.'
  },
  {
    id: 'gita-3',
    chapter: 6,
    shlokaNum: 5,
    sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बंधुरात्मैव रिपुरात्मनः॥',
    transliteration: 'Uddharēdātmanātmānaṁ nātmānamavasādayēt | Ātmaiva hyātmanō bandhurātmaiva ripurātmanaḥ ||',
    teluguMeaning: 'తనను తాను ఉద్ధరించుకోవాలి గానీ కృంగిపోకూడదు. తన మనసే తనకి బంధువు, అదే తనకి శత్రువు.',
    englishMeaning: 'Elevate yourself through the power of your mind, and do not degrade yourself. The mind is your best friend and worst enemy.',
    keyTakeaway: 'Self-discipline and positive thinking make a student strong and focused.'
  }
];

export const EDUCATION_SUBJECTS: EducationSubject[] = [
  {
    id: 'sub-1',
    title: 'Mathematics & Logical Thinking',
    grade: 'Class 5',
    board: 'CBSE',
    icon: 'Calculator',
    chaptersCount: 14,
    topics: ['Fractions & Decimals', 'Geometry Shapes & Angles', 'Perimeter & Area', 'Data Handling', 'Speed & Distance'],
    pdfUrl: 'https://ncert.nic.in/textbook.php',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    aglasemUrl: 'https://schools.aglasem.com/ncert-solutions-class-5-maths/',
    quizAvailable: true
  },
  {
    id: 'sub-2',
    title: 'Science & Nature Explorations (EVS)',
    grade: 'Class 5',
    board: 'CBSE',
    icon: 'FlaskConical',
    chaptersCount: 22,
    topics: ['Plants & Seeds', 'Human Digestive System', 'States of Matter', 'Simple Machines', 'Our Universe & Water'],
    pdfUrl: 'https://ncert.nic.in/textbook.php',
    aglasemUrl: 'https://schools.aglasem.com/ncert-solutions-class-5-evs/',
    quizAvailable: true
  },
  {
    id: 'sub-3',
    title: 'Telugu Language & Literature (తెలుగు బాష)',
    grade: 'Class 5',
    board: 'State Board',
    icon: 'BookOpen',
    chaptersCount: 8,
    topics: ['దేశభక్తి గేయాలు', 'నీతి పద్యాలు (వేమన, సుమతీ)', 'కథలు & వ్యాకరణము', 'సంస్కృతి విశేషాలు'],
    aglasemUrl: 'https://schools.aglasem.com/ap-board-scert-books/',
    quizAvailable: true
  },
  {
    id: 'sub-4',
    title: 'Coding Basics & Scratch Animation',
    grade: 'Class 6',
    board: 'CBSE',
    icon: 'Code',
    chaptersCount: 6,
    topics: ['Algorithms', 'Scratch Blocks & Sprites', 'Looping & Logic', 'Creating First Game'],
    aglasemUrl: 'https://schools.aglasem.com/cbse-computer-science/',
    quizAvailable: true
  },
  {
    id: 'sub-5',
    title: 'Physics & Experimental Electricity',
    grade: 'Class 8',
    board: 'CBSE',
    icon: 'Zap',
    chaptersCount: 14,
    topics: ['Electric Currents & Circuits', 'Light Reflection & Refraction', 'Force & Motion', 'Sound Waves'],
    aglasemUrl: 'https://schools.aglasem.com/ncert-solutions-class-8-science/',
    quizAvailable: true
  },
  {
    id: 'sub-6',
    title: 'Class 10 Board Exam Mathematics & Sample Papers',
    grade: 'Class 10',
    board: 'CBSE',
    icon: 'Calculator',
    chaptersCount: 15,
    topics: ['Real Numbers', 'Polynomials & Quadratic Equations', 'Triangles & Trigonometry', 'Surface Areas & Volumes', 'Statistics & Probability'],
    aglasemUrl: 'https://schools.aglasem.com/ncert-solutions-class-10-maths/',
    quizAvailable: true
  },
  {
    id: 'sub-7',
    title: 'Class 10 Science (Physics, Chemistry & Biology)',
    grade: 'Class 10',
    board: 'CBSE',
    icon: 'FlaskConical',
    chaptersCount: 16,
    topics: ['Chemical Reactions & Equations', 'Acids, Bases & Salts', 'Life Processes & Control', 'Light & Electricity', 'Magnetic Effects & Heredity'],
    aglasemUrl: 'https://schools.aglasem.com/ncert-solutions-class-10-science/',
    quizAvailable: true
  },
  {
    id: 'sub-8',
    title: 'Early Childhood Foundational English & Phonics',
    grade: 'LKG',
    board: 'CBSE',
    icon: 'Baby',
    chaptersCount: 6,
    topics: ['Alphabet Sounds', 'Rhymes & Songs', 'Color Recognition', 'Basic Shapes & Animals'],
    aglasemUrl: 'https://schools.aglasem.com/',
    quizAvailable: true
  }
];

export const MORAL_STORIES: StoryItem[] = [
  {
    id: 'story-1',
    title: 'The Intelligent Crow & Water Jar',
    teluguTitle: 'తెలివైన కాకి కథ',
    category: 'Panchatantra',
    ageGroup: 'LKG to 3rd',
    summary: 'A thirsty crow uses pebbles to raise the water level in a pitcher, demonstrating problem solving.',
    content: 'Once upon a time in a sunny forest, a black crow was very thirsty. He flew around looking for water and found a pitcher with a little water at the bottom...',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    audioDuration: '3 min',
    moral: 'Where there is a will, there is a way. Patience and creativity solve big problems.'
  },
  {
    id: 'story-2',
    title: 'Tenali Rama & the Golden Mangoes',
    teluguTitle: 'తెనాలి రామకృష్ణ - బంగారు మామిడిపండ్లు',
    category: 'Moral',
    ageGroup: 'Class 3 to 8',
    summary: 'Tenali Rama uses wit and humor to teach the royal court a lesson about true charity and fairness.',
    content: 'King Krishnadevaraya’s mother wished to eat mangoes before passing away. Greedy priests demanded golden mangoes...',
    imageUrl: 'https://images.unsplash.com/photo-1509021436468-d510300e5720?auto=format&fit=crop&w=600&q=80',
    audioDuration: '5 min',
    moral: 'Wisdom exposes greed and protects fairness in society.'
  },
  {
    id: 'story-3',
    title: 'Young Swami Vivekananda & the Monkeys',
    teluguTitle: 'స్వామి వివేకానంద - భయం వెనుక రహస్యం',
    category: 'Moral',
    ageGroup: 'Class 4 to 10',
    summary: 'When chased by aggressive monkeys in Varanasi, young Narendranath turns around and faces them bravely.',
    content: 'Young Narendra was walking near a temple in Varanasi when a troop of monkeys began screeching and chasing him. He ran at first, but an old monk yelled: "Face the beasts!" Narendra stopped, turned around, and stared boldly into the monkeys’ eyes. The monkeys backed off and fled...',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    audioDuration: '4 min',
    moral: 'Face your fears and difficulties head-on instead of running away from them.'
  }
];

export const PARENTING_ARTICLES: ParentingArticle[] = [
  {
    id: 'p-1',
    title: '5 Golden Rules of Parent-Child Communication (తల్లిదండ్రులు - పిల్లల అనుబంధం)',
    category: 'Communication',
    readTime: '4 min read',
    summary: 'How to listen without interrupting and encourage your child to express feelings openly.',
    keyTakeaways: [
      'Practice active listening for at least 15 minutes daily without gadgets.',
      'Acknowledge emotions before giving advice or reprimands.',
      'Use "We" language rather than blaming commands.'
    ],
    fullText: 'Effective parent-child communication is built on trust, consistency, and active empathy. When children know they can talk to their parents without immediate judgment, they share their worries, dreams, and school experiences freely. Establish a daily 15-minute gadget-free check-in after dinner.'
  },
  {
    id: 'p-2',
    title: 'Managing Screen Time & Building Real World Curiosity',
    category: 'Digital Balance',
    readTime: '5 min read',
    summary: 'Transform passive screen consumption into active hands-on creation and innovation.',
    keyTakeaways: [
      'Set clear non-negotiable screen-free zones (dining table & bedroom).',
      'Replace video gaming hours with hands-on DIY robotics or art kits.',
      'Participate in joint family learning activities.'
    ],
    fullText: 'Screen addiction can be gently curbed by offering far more engaging real-world projects. Instead of banning devices abruptly, convert passive screen time into constructive learning — such as coding Scratch games, assembling circuit projects, or drawing stories together.'
  },
  {
    id: 'p-3',
    title: 'Nurturing Moral Values (సంస్కారం) in Modern Times',
    category: 'Psychological',
    readTime: '6 min read',
    summary: 'Integrating daily morning rituals, gratitude habits, and respect for elders into children’s routine.',
    keyTakeaways: [
      'Recite 1 Gita Shloka together every morning.',
      'Encourage daily acts of kindness at school and home.',
      'Model calm behavior during stressful situations.'
    ],
    fullText: 'Values are caught, not just taught. Children naturally emulate what they observe at home. Practicing simple traditional virtues like bowing to elders, sharing meals, reciting Gita shlokas, and helping neighbors instills humility and moral resilience in growing kids.'
  },
  {
    id: 'p-4',
    title: 'Overcoming Exam Stress & Building Growth Mindset (పరీక్షల భయం పోగొట్టే విధానం)',
    category: 'Education',
    readTime: '5 min read',
    summary: 'Help your child view exams as learning opportunities rather than fear-driven benchmarks.',
    keyTakeaways: [
      'Praise effort, strategy, and perseverance rather than raw marks.',
      'Maintain steady sleep cycles and nutritious food during revision weeks.',
      'Break large textbook chapters into bite-sized daily chunks.'
    ],
    fullText: 'Exam anxiety often stems from fear of parental disappointment or social comparison. Reassure your child that grades measure current understanding, not their intrinsic self-worth or intelligence. Encourage systematic study routines with short rest intervals.'
  },
  {
    id: 'p-5',
    title: 'Healthy Habits, Nutrition & Sleep Science for Kids (పిల్లల ఆరోగ్యం & నిద్ర)',
    category: 'Health & Habits',
    readTime: '4 min read',
    summary: 'Optimizing physical growth, brain alertness, and immunity through traditional diet and sleep discipline.',
    keyTakeaways: [
      'Ensure 8-10 hours of uninterrupted sleep for brain memory consolidation.',
      'Include nuts, greens, and traditional home-cooked meals.',
      'Incorporate 30 minutes of outdoor play or yoga every evening.'
    ],
    fullText: 'A balanced diet rich in traditional millets, fresh fruits, ghee, and green vegetables provides continuous stamina for young minds. Adequate sleep boosts focus during school hours and improves emotional stability.'
  }
];

export const BONDING_ACTIVITIES: BondingActivity[] = [
  {
    id: 'bond-1',
    title: '15-Minute Daily Gadget-Free Circle',
    teluguTitle: '15 నిమిషాల ఫోన్ లేని సరదా సంభాషణ',
    category: 'Daily Connection',
    duration: '15 Mins / Day',
    description: 'Sit together after dinner with zero phones or TV. Ask 3 open-ended questions about their day.',
    steps: [
      'Put all phones on silent in another room.',
      'Ask: "What was the happiest moment of your day?"',
      'Ask: "Did anything feel tough today?"',
      'Share one funny or inspiring story from your own day.'
    ],
    points: 25
  },
  {
    id: 'bond-2',
    title: 'Weekend DIY Cardboard & Robotics Project',
    teluguTitle: 'వారాంతపు డో బాయ్ రోబోట్ రోవర్ ప్రాజెక్ట్',
    category: 'Weekend Project',
    duration: '1-2 Hours',
    description: 'Build a simple cardboard solar buggy, paper cup lamp, or basic sensor model together as a team.',
    steps: [
      'Select a beginner project from the Innovation Lab.',
      'Assign responsibilities: Child leads design/wiring, Parent handles safe cutting.',
      'Test the project together and take a photo for the Student Showcase gallery!'
    ],
    points: 50
  },
  {
    id: 'bond-3',
    title: 'Bedtime Heart-to-Heart Reflection Cards',
    teluguTitle: 'పడకముందు ఆత్మీయ మాటల ప్రతిబింబం',
    category: 'Bedtime Heart-to-Heart',
    duration: '10 Mins',
    description: 'Calm night routine to clear worries, express mutual appreciation, and sleep peacefully.',
    steps: [
      'Say one specific thing you appreciated about your child today.',
      'Encourage your child to share one thing they were grateful for.',
      'Chant a quiet soothing shloka or bedtime prayer together.'
    ],
    points: 20
  },
  {
    id: 'bond-4',
    title: 'Sunday Nature & Heritage Trail',
    teluguTitle: 'ఆదివారం ప్రకృతి & హెరిటేజ్ నడక',
    category: 'Outdoor Exploration',
    duration: '1 Hour',
    description: 'Take a park walk or visit a local historic temple/garden. Identify plants, birds, and architectural patterns.',
    steps: [
      'Collect 3 unique leaves or stones for an art album.',
      'Discuss how trees and nature stay patient and resilient.',
      'Enjoy a homemade healthy snack together.'
    ],
    points: 40
  }
];

export const PARENTING_SCENARIOS: ParentingScenario[] = [
  {
    id: 'scen-1',
    situation: 'Child loses a game or quiz and throws a tantrum.',
    teluguSituation: 'ఆటలో లేదా క్విజ్ లో ఓడిపోతే పిల్లలు కోపపడటం.',
    traditionalMistake: 'Yelling "Stop crying! It is just a silly game, don’t be weak!"',
    positiveApproach: 'Validate feelings first: "I see you feel disappointed because you worked so hard. It is okay to feel sad. Winning takes practice, and I am proud of your effort!"',
    psychologyInsight: 'Teaches emotional regulation and builds resilience against failure.'
  },
  {
    id: 'scen-2',
    situation: 'Child refuses to stop watching YouTube / gaming when asked.',
    teluguSituation: 'యూట్యూబ్ లేదా గేమింగ్ ఆపడానికి నిరాకరించడం.',
    traditionalMistake: 'Snatching the phone forcefully and shouting threats or punishments.',
    positiveApproach: 'Give a 5-minute pre-warning: "In 5 minutes, screen time ends and we start our robotics build." Use a physical visual timer, then thank them when they transition smoothly.',
    psychologyInsight: 'Respects child autonomy while enforcing firm, consistent boundaries.'
  },
  {
    id: 'scen-3',
    situation: 'Child hides a low test score or report card.',
    teluguSituation: 'తక్కువ మార్కులు వచ్చినప్పుడు రిపోర్ట్ కార్డు దాచడం.',
    traditionalMistake: 'Scolding severely and comparing with neighbors’ or relatives’ children.',
    positiveApproach: 'Stay calm: "Thank you for showing this to me. Marks show where we need more practice. Let us sit together with the AI Tutor and fix these mistakes together."',
    psychologyInsight: 'Eliminates fear of judgment and encourages problem-solving honesty.'
  }
];

export const AGE_MILESTONES: AgeMilestone[] = [
  {
    ageGroup: 'Early Years (3 - 5 Years / LKG - UKG)',
    teluguAgeGroup: 'తొలి సంవత్సరాలు (LKG - UKG)',
    emotionalSocial: [
      'Learns to share toys and take turns with peers.',
      'Begins expressing basic emotions (happy, sad, excited) with words.',
      'Seeks comfort from parents during unfamiliar situations.'
    ],
    cognitiveLearning: [
      'Recognizes shapes, colors, phonics, and basic numbers.',
      'Listens attentively to short moral audio stories and rhymes.',
      'Enjoys finger painting, clay modeling, and building blocks.'
    ],
    parentFocusTips: [
      'Read 1 picture storybook every night before sleep.',
      'Avoid screen exposure before bedtime.',
      'Encourage free creative play and physical movement.'
    ]
  },
  {
    ageGroup: 'Primary Years (6 - 9 Years / Class 1 - 4)',
    teluguAgeGroup: 'ప్రాథమిక విద్యా దశ (1 - 4వ తరగతి)',
    emotionalSocial: [
      'Develops friendships and empathy for classmates.',
      'Understands basic rules, honesty, and fairness.',
      'Wants independence in dressing and organizing school bag.'
    ],
    cognitiveLearning: [
      'Grasps addition, subtraction, basic reading, and science observations.',
      'Enjoys simple hands-on circuit DIY kits and art crafts.',
      'Memorizes short Gita shlokas and moral proverbs.'
    ],
    parentFocusTips: [
      'Praise effort rather than perfection or raw marks.',
      'Establish a regular 30-minute study routine.',
      'Involve child in simple household chores (setting dinner table).'
    ]
  },
  {
    ageGroup: 'Middle School Years (10 - 13 Years / Class 5 - 8)',
    teluguAgeGroup: 'మాధ్యమిక విద్యా దశ (5 - 8వ తరగతి)',
    emotionalSocial: [
      'Navigates peer pressure and identity formation.',
      'Requires open, non-judgmental parental communication.',
      'Enjoys team activities, competitions, and robotics clubs.'
    ],
    cognitiveLearning: [
      'Grasps abstract logic, fractions, coding algorithms, and physics principles.',
      'Capable of assembling complex Arduino microcontrollers and drones.',
      'Analyzes deeper moral dilemmas in stories.'
    ],
    parentFocusTips: [
      'Maintain daily 15-minute gadget-free heart-to-heart talk.',
      'Support interest in robotics, coding, or arts.',
      'Discuss digital safety, internet privacy, and healthy boundaries.'
    ]
  },
  {
    ageGroup: 'High School Years (14 - 15 Years / Class 9 - 10)',
    teluguAgeGroup: 'ఉన్నత పాఠశాల దశ (9 - 10వ తరగతి)',
    emotionalSocial: [
      'Prepares for board exams while managing academic expectations.',
      'Seeks respect as a mature young adult.',
      'Forms career goals and personal aspirations.'
    ],
    cognitiveLearning: [
      'Solves advanced math, physics numericals, and complex programming logic.',
      'Leads innovation projects, science exhibitions, and community mentorship.',
      'Internalizes core philosophy and ethical decision making.'
    ],
    parentFocusTips: [
      'Be a supportive listener rather than a micromanaging dictator.',
      'Provide calm study environment without high-pressure comparisons.',
      'Encourage regular physical exercise, balanced sleep, and positive routines.'
    ]
  }
];

export const INNOVATION_PROJECTS: InnovationProject[] = [
  {
    id: 'proj-1',
    title: 'Smart Obstacle Avoiding Robot (స్మార్ట్ రోబోట్)',
    category: 'Robotics',
    difficulty: 'Intermediate',
    estimatedTime: '2 Hours',
    componentsNeeded: [
      'Arduino Uno microcontroller',
      'Ultrasonic Distance Sensor (HC-SR04)',
      'L298N Motor Driver Module',
      '2x DC Gear Motors + Wheels',
      '9V Battery & Chassis Kit',
      'Jumper Wires'
    ],
    safetyInstructions: [
      'Always disconnect battery when rewiring the breadboard.',
      'Adult supervision required while operating motor drivers.',
      'Keep small screws away from younger toddlers.'
    ],
    stepByStepGuide: [
      { stepNumber: 1, title: 'Assemble Chassis', detail: 'Mount the two DC motors and caster wheel on the plastic robot base.' },
      { stepNumber: 2, title: 'Connect Ultrasonic Sensor', detail: 'Attach HC-SR04 sensor to the front bumper. Connect Trig to Pin 9, Echo to Pin 8.' },
      { stepNumber: 3, title: 'Wire Motor Driver', detail: 'Connect motor outputs to L298N driver and digital pins 4,5,6,7 to Arduino.' },
      { stepNumber: 4, title: 'Upload Code', detail: 'Load the obstacle avoidance logic using Arduino IDE or Block Coding.' }
    ],
    diagramDescription: 'Ultrasonic sensor sends sound pulses -> Arduino measures obstacle distance -> Motor driver turns left/right if distance < 20cm.',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    codeSnippet: `void loop() {
  int dist = getDistance();
  if (dist < 20) {
    turnRight();
    delay(500);
  } else {
    moveForward();
  }
}`
  },
  {
    id: 'proj-2',
    title: 'Automatic Plant Watering & Soil Moisture Alarm',
    category: 'Electronics & Circuit',
    difficulty: 'Beginner',
    estimatedTime: '45 Mins',
    componentsNeeded: [
      'Soil Moisture Sensor probe',
      '5V Relay Module',
      'Mini 5V Submersible Water Pump',
      '5V Power Adapter / Battery',
      'Small Water Tub & Tubing'
    ],
    safetyInstructions: [
      'Do not submerge power wiring inside water.',
      'Ensure dry hands while plugging in power adapter.'
    ],
    stepByStepGuide: [
      { stepNumber: 1, title: 'Insert Probe', detail: 'Place moisture sensor probe into soil pot.' },
      { stepNumber: 2, title: 'Wire Relay', detail: 'Connect sensor digital output to relay control pin.' },
      { stepNumber: 3, title: 'Connect Pump', detail: 'Wire pump through relay switch terminals.' }
    ],
    diagramDescription: 'Soil probe reads dryness -> Signal triggers Relay -> Pump pumps water until soil becomes moist.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'proj-3',
    title: 'Mini Solar Buggy Quad',
    category: 'Drone',
    difficulty: 'Beginner',
    estimatedTime: '1 Hour',
    componentsNeeded: [
      '5V Mini Solar Panel',
      'Coreless High RPM Motor',
      'Propeller blade',
      'Lightweight Balsa Wood Chassis',
      '4 Wheels & Axles'
    ],
    safetyInstructions: [
      'Spinning propeller can pinch fingers; keep clear while testing in direct sunlight.'
    ],
    stepByStepGuide: [
      { stepNumber: 1, title: 'Fix Motor & Axles', detail: 'Glue motor to rear axle of balsa frame.' },
      { stepNumber: 2, title: 'Solder Solar Panel', detail: 'Connect solar panel terminals directly to motor leads.' },
      { stepNumber: 3, title: 'Test Sunlight', detail: 'Take buggy under bright sunlight to watch it zoom forward!' }
    ],
    diagramDescription: 'Sunlight hits solar cell -> Generates clean DC power -> Drives high-speed propeller motor.',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80'
  }
];

export const MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    id: 'mk-1',
    title: 'Handcrafted Wooden Solar Car Kit',
    creatorName: 'Arjun K.',
    creatorAge: 11,
    creatorCity: 'Visakhapatnam',
    parentApproved: true,
    category: 'DIY Kits',
    priceINR: 350,
    originalPriceINR: 500,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    description: 'Pre-cut wooden chassis, 5V solar panel, motor, gears and easy Telugu & English guide.',
    stock: 12
  },
  {
    id: 'mk-2',
    title: 'Illustrated Panchatantra Comic Book (Hand Drawn)',
    creatorName: 'Sravya P.',
    creatorAge: 10,
    creatorCity: 'Bengaluru',
    parentApproved: true,
    category: 'Storybooks',
    priceINR: 200,
    originalPriceINR: 300,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    description: 'Beautiful hand-illustrated moral stories created by Sravya with Telugu-English translations.',
    stock: 25
  },
  {
    id: 'mk-3',
    title: 'Custom LED Desk Lamp & Pencil Holder',
    creatorName: 'Nikhil V.',
    creatorAge: 13,
    creatorCity: 'Hyderabad',
    parentApproved: true,
    category: 'Crafts',
    priceINR: 450,
    originalPriceINR: 650,
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    description: 'Recycled wooden desk organizer fitted with soft USB-powered LED light strip.',
    stock: 8
  }
];

export const SHOWCASE_ITEMS: StudentShowcaseItem[] = [
  {
    id: 'sc-1',
    title: 'Autonomous Obstacle Avoiding Rover',
    studentName: 'Ananya Sharma',
    grade: 'Class 7',
    city: 'Bengaluru',
    category: 'Best Robot',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    description: 'Built using Arduino Uno and ultrasonic sensors to navigate around room furniture safely.',
    likes: 142,
    badge: 'Gold Innovator',
    approvedByParent: true,
    createdAt: '2026-08-01'
  },
  {
    id: 'sc-2',
    title: 'Mini Solar Drone Quadcopter Prototype',
    studentName: 'Rohit Verma',
    grade: 'Class 9',
    city: 'Visakhapatnam',
    category: 'Best Drone Project',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
    description: 'Ultra-light carbon fiber mini drone powered by top solar panel assisting battery efficiency.',
    likes: 189,
    badge: 'Young Scientist Award',
    approvedByParent: true,
    createdAt: '2026-08-05'
  },
  {
    id: 'sc-3',
    title: 'Illustrated Story of Bhagavad Gita for Kids',
    studentName: 'Meenakshi Reddy',
    grade: 'Class 5',
    city: 'Vijayawada',
    category: 'Best Story',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    description: 'Written and illustrated 10 Gita shlokas with child-friendly real life analogies.',
    likes: 210,
    badge: 'Sanskar Cultural Icon',
    approvedByParent: true,
    createdAt: '2026-08-10'
  }
];

export const INITIAL_GROWTH_DATA: GrowthData = {
  studentName: 'Chaitanya Reddy',
  grade: 'Class 6',
  idNumber: 'SP-GURUKUL-2026-889',
  overallScore: 88,
  subjectProgress: [
    { subject: 'Mathematics', score: 85 },
    { subject: 'Science', score: 92 },
    { subject: 'Telugu & Sanskar', score: 95 },
    { subject: 'Coding & Robotics', score: 80 },
    { subject: 'English & Stories', score: 88 }
  ],
  skillsProgress: [
    { skill: 'Logical Problem Solving', score: 86 },
    { skill: 'Robotics & Hardware', score: 82 },
    { skill: 'Cultural & Moral Values', score: 96 },
    { skill: 'Creativity & DIY Craft', score: 90 },
    { skill: 'Parent-Child Bonding', score: 92 }
  ],
  valuesScore: 96,
  projectsCompleted: 7,
  certificatesEarned: 3,
  storiesReadCount: 18,
  recentActivities: [
    { id: 'act-1', title: 'Completed Bhagavad Gita Chapter 2 Shloka 47 Recitation', date: 'Yesterday', type: 'Sanskar', points: 50 },
    { id: 'act-2', title: 'Assembled Soil Moisture Sensor Alarm Circuit', date: '2 days ago', type: 'Innovation', points: 100 },
    { id: 'act-3', title: 'Scored 9/10 in Class 6 Maths Fractions Quiz', date: '4 days ago', type: 'Education', points: 80 },
    { id: 'act-4', title: 'Read "Young Swami Vivekananda & Monkeys" Story', date: '5 days ago', type: 'Stories', points: 30 }
  ]
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    duration: '1 Month',
    priceINR: 600,
    features: [
      'Full Access to Education Hub (LKG - 10th)',
      'Bhagavad Gita Shlokas & Nitya Pooja Guide',
      'Stories & Picture Books Library',
      'Basic Ask SUPER AI Assistance',
      'Verified Digital Course Certificate'
    ],
    modes: ['100% Online', 'Home Learning'],
    hasCertificate: true,
    hasInstructorSupport: true,
    hasMentorSupport: false
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    duration: '3 Months',
    priceINR: 1200,
    popular: true,
    features: [
      'All Basic Plan Features Included',
      'Unlimited Ask SUPER AI Multi-Experts',
      'Robotics & Circuit Project Lab Guides',
      'Child Growth Map & Parent Dashboard',
      'Live Instructor Doubt Clearing Sessions',
      'Official Certificate + Student Portfolio'
    ],
    modes: ['Online', 'Home Learning', 'Offline Centre Support'],
    hasCertificate: true,
    hasInstructorSupport: true,
    hasMentorSupport: true
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    duration: '6 Months',
    priceINR: 1600,
    features: [
      'All Standard Features Included',
      'Student Marketplace Selling Authorization',
      'Featured Entry in Young Innovators Gallery',
      'Parent Counseling & Psychological Guidance',
      '1-on-1 Project Mentoring Sessions',
      'Physical Certificate & Reward Kit Shipped Home'
    ],
    modes: ['Online', 'Home Learning', 'Offline Centre Support'],
    hasCertificate: true,
    hasInstructorSupport: true,
    hasMentorSupport: true
  },
  {
    id: 'ultimate',
    name: 'Ultimate Plan',
    duration: '12 Months (Full Academic Year)',
    priceINR: 2000,
    features: [
      'Complete Gurukul Access for Whole Family',
      'VIP Priority AI Multi-Expert Responses',
      'Personal Academic & Innovation Mentor',
      'Unlimited Certificate Issuance',
      'Free Admission to Annual Innovation Competitions',
      'Direct Offline Centre Visit & Hardware Testing Access'
    ],
    modes: ['Online', 'Home Learning', 'Offline Centre Support'],
    hasCertificate: true,
    hasInstructorSupport: true,
    hasMentorSupport: true
  }
];
