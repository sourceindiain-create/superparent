export interface WorldAIChatbot {
  id: string;
  name: string;
  provider: string;
  category: 'text' | 'voice' | 'image' | 'multimodal' | 'research' | 'solutions';
  badge: string;
  description: string;
  teluguDesc: string;
  hindiDesc: string;
  url: string;
  apiUrl?: string;
  pricing: string;
  features: string[];
  bestFor: string;
  samplePrompt: string;
  iconName: string;
  logoColor: string;
}

// Dedicated Quick-Launch AI Tutors & Solutions Engine List
export interface TutorQuickAI {
  id: string;
  name: string;
  subtitle: string;
  teluguName: string;
  badge: string;
  icon: string;
  url: string;
  category: 'answer' | 'reasoning' | 'math' | 'voice' | 'search';
  bgGradient: string;
  description: string;
}

export const TUTOR_QUICK_AI_LINKS: TutorQuickAI[] = [
  {
    id: 'answers-ai',
    name: 'Answers AI',
    subtitle: '#1 Instant Homework & Test Solver',
    teluguName: 'ఆన్సర్స్ AI (హోంవర్క్ & ఎగ్జామ్ సాల్వర్)',
    badge: '⚡ Top Homework AI',
    icon: 'Sparkles',
    url: 'https://answersai.com/',
    category: 'answer',
    bgGradient: 'from-amber-600 to-orange-700',
    description: 'Instant step-by-step answers for textbook questions, math problems, MCQs, and science homework.'
  },
  {
    id: 'chatgpt-tutor',
    name: 'ChatGPT (GPT-4o / o3)',
    subtitle: 'OpenAI Universal Tutor & Socratic Guide',
    teluguName: 'చాట్‌జిపిటి (సమగ్ర ట్యూటర్ & కోడర్)',
    badge: '💬 World #1 Chat',
    icon: 'Bot',
    url: 'https://chatgpt.com/',
    category: 'reasoning',
    bgGradient: 'from-emerald-600 to-teal-800',
    description: 'Step-by-step concept derivations, Socratic questioning, coding solutions, and homework guidance.'
  },
  {
    id: 'perplexity-tutor',
    name: 'Perplexity AI',
    subtitle: '100% Sourced Academic Answer Engine',
    teluguName: 'పర్ప్లెక్సిటీ AI (సోర్సెస్ & రిసెర్చ్)',
    badge: '🔍 Verified Citations',
    icon: 'Globe',
    url: 'https://www.perplexity.ai/',
    category: 'search',
    bgGradient: 'from-cyan-600 to-blue-800',
    description: 'Instant academic search with clickable source citations, zero hallucinations, and live web data.'
  },
  {
    id: 'google-ai-gemini',
    name: 'Google AI (Gemini)',
    subtitle: 'Live Search & Multi-Language Master',
    teluguName: 'గూగుల్ జెమిని AI (తెలుగు & లైవ్ సెర్చ్)',
    badge: '🌐 Google Grounding',
    icon: 'Zap',
    url: 'https://gemini.google.com/',
    category: 'reasoning',
    bgGradient: 'from-blue-600 to-indigo-800',
    description: 'Live Google search grounding, YouTube lesson summarizer, and multi-language Telugu/Hindi reasoning.'
  },
  {
    id: 'mathway-solver',
    name: 'Mathway & Wolfram (All Solutions AI)',
    subtitle: 'Algebra, Calculus & Physics Equation Solver',
    teluguName: 'మ్యాథ్‌వే & వోల్ఫ్రామ్ (గణిత పరిష్కారాలు)',
    badge: '📐 All Solutions AI',
    icon: 'Calculator',
    url: 'https://www.mathway.com/',
    category: 'math',
    bgGradient: 'from-purple-600 to-indigo-900',
    description: 'Instant symbolic algebra, geometry, calculus, chemistry balancing, and physics step solver.'
  },
  {
    id: 'voice-chhot-ai',
    name: 'Chhot / Voice AI (ElevenLabs & Voice Mode)',
    subtitle: 'Real-time Conversational Voice Tutor',
    teluguName: 'వాయిస్ AI (మాట్లాడుతూ నేర్చుకోండి)',
    badge: '🎙️ Voice AI Tutor',
    icon: 'Radio',
    url: 'https://elevenlabs.io/',
    category: 'voice',
    bgGradient: 'from-rose-600 to-red-800',
    description: 'Real-time speech-to-speech audio tutoring, story narration in Telugu/Hindi, and voice interactive learning.'
  }
];

export const WORLD_AI_CHATBOTS: WorldAIChatbot[] = [
  // ===================== ALL SOLUTIONS & HOMEWORK AI =====================
  {
    id: 'answers-ai-app',
    name: 'Answers AI (Homework Solver)',
    provider: 'Answers AI',
    category: 'solutions',
    badge: '#1 Homework & Test Solver',
    description: 'Specialized AI homework solver that analyzes uploaded questions, screenshots, and textbook problem sets to give instant step-by-step solutions.',
    teluguDesc: 'ఆన్సర్స్ AI - హోంవర్క్ ప్రశ్నలు మరియు పుస్తకాల్లోని లెక్కలకు తక్షణ స్టెప్ బై స్టెప్ సమాధానాలు అందిస్తుంది.',
    hindiDesc: 'आंसर्स एआई - होमवर्क और परीक्षा प्रश्नों के त्वरित और सटीक चरण-दर-चरण समाधान।',
    url: 'https://answersai.com/',
    apiUrl: 'https://answersai.com/',
    pricing: 'Free & Plus',
    features: ['Instant Screenshot/Photo Solver', 'Step-by-step Math & Science Explanations', 'Practice Quiz Generator', 'Chrome Extension Available'],
    bestFor: 'Daily school homework, difficult math equations, test revision',
    samplePrompt: 'Solve this textbook question step-by-step: A car travels 150 km in 3 hours. Calculate average speed and acceleration.',
    iconName: 'Sparkles',
    logoColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'photomath-ai',
    name: 'Photomath (Camera Math Solver)',
    provider: 'Google / Photomath',
    category: 'solutions',
    badge: 'Camera Snap to Solve',
    description: 'Snap a picture of handwritten or printed math equations to get animated, step-by-step visual solution breakdowns and graphing calculator plots.',
    teluguDesc: 'ఫోటోమ్యాథ్ - చేతిరాత లేదా ప్రింటెడ్ లెక్కల ఫోటో తీస్తే చాలు, పూర్తి పరిష్కారం వెంటనే లభిస్తుంది.',
    hindiDesc: 'फोटोमैथ - गणित के किसी भी प्रश्न का फोटो खींचकर तुरंत विस्तृत हल प्राप्त करें।',
    url: 'https://photomath.com/',
    pricing: '100% Free Open Source',
    features: ['Handwriting Recognition', 'Animated Step Solutions', 'Interactive Graphing Plots', 'Multiple Solving Methods'],
    bestFor: 'Algebra, Quadratic equations, Trigonometry, Fractions',
    samplePrompt: 'Solve 3x^2 - 12x + 9 = 0 using quadratic formula and factoring methods.',
    iconName: 'Calculator',
    logoColor: 'from-red-600 to-rose-700'
  },
  {
    id: 'mathway-chegg',
    name: 'Mathway (Universal Math & Chemistry)',
    provider: 'Chegg',
    category: 'solutions',
    badge: 'Universal Equation Engine',
    description: 'Comprehensive math solver covering Basic Math, Pre-Algebra, Algebra, Trigonometry, Precalculus, Calculus, Statistics, Finite Math, and Chemistry.',
    teluguDesc: 'మ్యాథ్‌వే - బేసిక్ మ్యాథ్స్ నుండి కాలిక్యులస్ మరియు కెమిస్ట్రీ ఈక్వేషన్స్ వరకు అన్నీ పరిష్కరిస్తుంది.',
    hindiDesc: 'मैथवे - बुनियादी गणित से लेकर उच्च स्तर के कैलकुलस और रसायन विज्ञान तक का समाधान।',
    url: 'https://www.mathway.com/',
    pricing: 'Free & Pro',
    features: ['All Math Domains Covered', 'Chemistry Balancing Equations', 'Graphing & Geometry Tools', 'Step Derivations'],
    bestFor: 'Class 6 to 12 Math, Chemistry equation balancing, Physics unit conversions',
    samplePrompt: 'Balance the chemical equation: Fe + H2O -> Fe3O4 + H2 and state the reaction type.',
    iconName: 'Calculator',
    logoColor: 'from-blue-700 to-indigo-900'
  },
  {
    id: 'wolfram-alpha',
    name: 'Wolfram|Alpha (Computational Intelligence)',
    provider: 'Wolfram Research',
    category: 'solutions',
    badge: 'Exact Computational Truth',
    description: 'World-renowned computational knowledge engine providing exact symbolic derivations, physics formulas, chemical properties, and astronomy calculations.',
    teluguDesc: 'వోల్ఫ్రామ్ ఆల్ఫా - శాస్త్రీయ లెక్కలు, భౌతిక శాస్త్ర సూత్రాలు మరియు ఖచ్చితమైన సమాచార ఇంజిన్.',
    hindiDesc: 'वोल्फ्राम अल्फा - वैज्ञानिक गणनाओं, भौतिकी सूत्रों और सटीक डेटा का विश्व प्रसिद्ध इंजन।',
    url: 'https://www.wolframalpha.com/',
    apiUrl: 'https://products.wolframalpha.com/api/',
    pricing: 'Free & Pro',
    features: ['Exact Symbolic Computation', 'Physics & Chemistry Constants', 'Step-by-step Solutions', 'Data Visualizations'],
    bestFor: 'Physics derivations, Olympiad science questions, astronomy data',
    samplePrompt: 'Calculate gravitational force between Earth and Moon with exact formulas and SI units.',
    iconName: 'BrainCircuit',
    logoColor: 'from-orange-700 to-red-900'
  },
  {
    id: 'symbolab-solver',
    name: 'Symbolab (Step-by-Step Calculator)',
    provider: 'Symbolab',
    category: 'solutions',
    badge: 'Step-by-step Math Solver',
    description: 'Interactive step-by-step math solver with extensive cheat sheets, practice problems, graphing calculators, and geometry proofs.',
    teluguDesc: 'సింబోల్యాబ్ - స్టెప్-బై-స్టెప్ మ్యాథ్స్ కాలిక్యులేటర్, గ్రాఫ్‌లు మరియు ప్రాక్టీస్ సమస్యలు.',
    hindiDesc: 'सिम्बोलाब - विस्तृत चरणों के साथ गणित के सवालों का हल और ग्राफिंग टूल।',
    url: 'https://www.symbolab.com/',
    pricing: 'Free & Pro',
    features: ['Cheat Sheets & Formulas', 'Geometry Step Proofs', 'Interactive Graphing', 'Practice Worksheets'],
    bestFor: 'High school math, geometry theorems, calculus practice',
    samplePrompt: 'Find derivative of f(x) = sin(2x) * cos(3x) with chain rule steps.',
    iconName: 'Calculator',
    logoColor: 'from-red-600 to-amber-700'
  },
  {
    id: 'socratic-google',
    name: 'Socratic by Google AI',
    provider: 'Google',
    category: 'solutions',
    badge: 'Visual AI Learning App',
    description: 'Google AI app that helps students understand homework problems using visual explainers, verified web resources, and animated YouTube lessons.',
    teluguDesc: 'సొక్రటిక్ బై గూగుల్ - వీడియోలు, బొమ్మలు మరియు విశ్లేషణలతో హోంవర్క్ సులభంగా అర్థం చేసుకోవడానికి సహాయపడుతుంది.',
    hindiDesc: 'सोक्रेटिक बाय गूगल - दृश्य व्याख्याओं और वीडियो के साथ होमवर्क समझाने वाला टूल।',
    url: 'https://socratic.org/',
    pricing: '100% Free Open Source',
    features: ['Visual Explanations', 'Voice & Camera Query', 'Verified Educational Resources', 'Zero Ads'],
    bestFor: 'Science diagrams, History timelines, Literature questions',
    samplePrompt: 'Explain how tectonic plates cause earthquakes with a diagram explanation.',
    iconName: 'Sparkles',
    logoColor: 'from-blue-500 to-teal-600'
  },
  {
    id: 'khanmigo-khan',
    name: 'Khanmigo (Khan Academy AI Tutor)',
    provider: 'Khan Academy',
    category: 'solutions',
    badge: 'Socratic 1-on-1 AI Tutor',
    description: 'AI-powered personal tutor built on Khan Academy that guides students step-by-step without simply giving away the final answer, encouraging deep learning.',
    teluguDesc: 'ఖాన్మిగో - సమాధానం నేరుగా చెప్పకుండా, పిల్లలు స్వయంగా ఆలోచించి పరిష్కరించేలా గైడ్ చేసే AI ట్యూటర్.',
    hindiDesc: 'खानमीगो - सुकराती पद्धति से छात्रों को स्वयं समाधान खोजने के लिए प्रेरित करने वाला एआई शिक्षक।',
    url: 'https://www.khanacademy.org/khanmigo',
    pricing: 'Free Tier Available',
    features: ['Socratic Guidance (No Direct Cheating)', 'Class LKG-12 Aligned', 'Coding & Math Hints', 'Story & Writing Coach'],
    bestFor: 'Building deep conceptual understanding, independent thinking',
    samplePrompt: 'Guide me on how to divide 3/4 by 2/3 without telling me the answer right away.',
    iconName: 'GraduationCap',
    logoColor: 'from-emerald-600 to-green-800'
  },

  // ===================== TEXT & REASONING CHATBOTS =====================
  {
    id: 'chatgpt-openai',
    name: 'ChatGPT (GPT-4o & o3)',
    provider: 'OpenAI',
    category: 'text',
    badge: 'World #1 AI Chat',
    description: 'World famous conversational AI with advanced reasoning, coding, writing, homework problem solving, and voice interactions.',
    teluguDesc: 'ప్రపంచ ప్రసిద్ధ AI చాట్‌బాట్ - హోంవర్క్, కోడింగ్, గణితం మరియు సైన్స్ సమస్యలను వివరంగా పరిష్కరిస్తుంది.',
    hindiDesc: 'दुनिया का सबसे लोकप्रिय एआई चैटबॉट - होमवर्क, कोडिंग, गणित और विज्ञान के सटीक समाधान के लिए।',
    url: 'https://chatgpt.com/',
    apiUrl: 'https://platform.openai.com/docs/api-reference',
    pricing: 'Free & Plus',
    features: ['Reasoning & Math Problem Solving', 'Voice Mode & Vision', 'Python Code Interpreter', 'File & PDF Analysis'],
    bestFor: 'Homework, Essays, Step-by-step Math, Coding & Creative writing',
    samplePrompt: 'Solve this Class 8 quadratic equation step-by-step with real-life explanation and Telugu summary.',
    iconName: 'Bot',
    logoColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'google-gemini',
    name: 'Google Gemini (Gemini 2.5 / 3.7 Flash)',
    provider: 'Google DeepMind',
    category: 'multimodal',
    badge: 'Live Google Search Grounding',
    description: 'Real-time search-grounded multimodal AI with live web information, YouTube video analysis, Google Workspace integration, and instant Telugu/Hindi translation.',
    teluguDesc: 'గూగుల్ జెమిని - లైవ్ సెర్చ్, యూట్యూబ్ వీడియోల విశ్లేషణ, అన్ని భాషల్లో ఖచ్చితమైన సమాధానాలు.',
    hindiDesc: 'गूगल जेमिनी - लाइव वेब सर्च, यूट्यूब वीडियो विश्लेषण और बहुभाषी समाधान।',
    url: 'https://gemini.google.com/',
    apiUrl: 'https://ai.google.dev/docs',
    pricing: 'Free & Advanced',
    features: ['Live Google Search Grounding', '1 Million Token Context', 'YouTube & Maps Grounding', 'Multi-Language Mastery'],
    bestFor: 'Real-time facts, Telugu/Hindi research, YouTube study summarization',
    samplePrompt: 'Explain Newton laws of motion with daily Indian cricket examples in Telugu and English.',
    iconName: 'Sparkles',
    logoColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'claude-anthropic',
    name: 'Claude 3.7 Sonnet & Opus',
    provider: 'Anthropic',
    category: 'text',
    badge: 'Best Nuanced Writing & Coding',
    description: 'Premier AI for thoughtful, deep nuanced writing, safe student tutoring, long book summarization, and pristine coding artifacts.',
    teluguDesc: 'క్లాడ్ AI - లోతైన విశ్లేషణ, సుదీర్ఘ పుస్తకాల సారాంశం మరియు సురక్షితమైన స్టూడెంట్ ట్యూటరింగ్.',
    hindiDesc: 'क्लॉड एआई - गहन विश्लेषण, लंबी किताबों का सारांश और सुरक्षित कोडिंग मार्गदर्शन।',
    url: 'https://claude.ai/',
    apiUrl: 'https://docs.anthropic.com/en/api/getting-started',
    pricing: 'Free & Pro',
    features: ['Artifacts Interactive Canvas', '200k Context Window', 'Nuanced Literary Writing', 'Deep Step Reasoning'],
    bestFor: 'High school essays, literature analysis, coding apps & algorithms',
    samplePrompt: 'Write a comprehensive study guide on Photosynthesis and Cellular Respiration with contrast tables.',
    iconName: 'BrainCircuit',
    logoColor: 'from-amber-600 to-orange-700'
  },
  {
    id: 'perplexity-ai',
    name: 'Perplexity AI',
    provider: 'Perplexity',
    category: 'research',
    badge: '100% Sourced Academic Search',
    description: 'Conversational answer engine with direct academic citations, web citations, research paper links, and zero hallucinations.',
    teluguDesc: 'పర్ప్లెక్సిటీ AI - ప్రతి సమాధానానికి ఖచ్చితమైన సోర్స్ లింక్స్ మరియు రిసెర్చ్ పేపర్స్ అందిస్తుంది.',
    hindiDesc: 'पर्पलेक्सिटी एआई - हर उत्तर के लिए सटीक शैक्षणिक संदर्भ और शोध पत्र लिंक।',
    url: 'https://www.perplexity.ai/',
    apiUrl: 'https://docs.perplexity.ai/',
    pricing: 'Free & Pro',
    features: ['Direct URL & Academic Citations', 'Pro Search Deep Reasoning', 'File & Video Search', 'Clean Fact Verification'],
    bestFor: 'School science projects, Olympiad questions, academic research',
    samplePrompt: 'What are the top 5 renewable energy innovations in India in 2026? Provide authentic sources.',
    iconName: 'Globe2',
    logoColor: 'from-cyan-600 to-blue-800'
  },
  {
    id: 'deepseek-ai',
    name: 'DeepSeek (V3 & R1 Reasoning)',
    provider: 'DeepSeek',
    category: 'text',
    badge: 'Open-Weights Math & Logic Champion',
    description: 'High-speed reasoning model specialized in Olympiad mathematics, deep algorithmic coding, and STEM logical derivation.',
    teluguDesc: 'డీప్‌సీక్ AI - గణితం, ఒలింపియాడ్ ప్రాబ్లమ్స్ మరియు హై-లెవల్ లాజిక్ సాల్వింగ్‌లో అద్భుత వేగం.',
    hindiDesc: 'डीपसीक एआई - ओलंपियाड गणित और जटिल लॉजिक समस्याओं के लिए अत्यंत शक्तिशाली।',
    url: 'https://chat.deepseek.com/',
    apiUrl: 'https://api-docs.deepseek.com/',
    pricing: '100% Free Open Source',
    features: ['Chain-of-Thought Visible Steps', 'High Math Benchmarks', 'Fast Code Generation', 'Open Architecture'],
    bestFor: 'IIT-JEE/NEET foundation math problems, competitive programming',
    samplePrompt: 'Derive the quadratic formula step-by-step from completing the square method with proofs.',
    iconName: 'Cpu',
    logoColor: 'from-blue-700 to-indigo-900'
  },
  {
    id: 'microsoft-copilot',
    name: 'Microsoft Copilot',
    provider: 'Microsoft & OpenAI',
    category: 'multimodal',
    badge: 'Free GPT-4o + DALL-E 3',
    description: 'Integrated workspace assistant with free GPT-4 access, DALL-E image generation, web browsing, and Microsoft 365 study aids.',
    teluguDesc: 'మైక్రోసాఫ్ట్ కోపైలట్ - ఉచిత GPT-4 మరియు DALL-E 3 తో బొమ్మలు మరియు నోట్స్ తయారుచేయవచ్చు.',
    hindiDesc: 'माइक्रोसॉफ्ट कोपायलट - मुफ्त जीपीटी-4 और इमेज जनरेशन का संपूर्ण समाधान।',
    url: 'https://copilot.microsoft.com/',
    apiUrl: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/',
    pricing: 'Free & Pro',
    features: ['Built-in DALL-E 3 Generator', 'Bing Web Grounding', 'Creative / Precise Modes', 'Office & PDF Integration'],
    bestFor: 'PowerPoint presentations, science posters, revision notes',
    samplePrompt: 'Create a revision summary chart of Human Circulatory System with key definitions.',
    iconName: 'Compass',
    logoColor: 'from-sky-600 to-blue-700'
  },
  {
    id: 'grok-xai',
    name: 'Grok 3',
    provider: 'xAI',
    category: 'text',
    badge: 'Real-time News & DeepSearch',
    description: 'Fast, witty conversational AI with live real-time trend feeds, DeepSearch verification, and mathematical derivation.',
    teluguDesc: 'గ్రోక్ 3 - తాజా ప్రపంచ వార్తలు, రియల్-టైమ్ సమాచారం మరియు వేగవంతమైన సైన్స్ సమాధానాలు.',
    hindiDesc: 'ग्रॉक 3 - नवीनतम वैश्विक समाचार और वास्तविक समय विज्ञान उत्तर।',
    url: 'https://x.ai/',
    apiUrl: 'https://docs.x.ai/',
    pricing: 'Free Tier Available',
    features: ['Real-time News & Social Grounding', 'Fun Mode & Normal Mode', 'DeepSearch Logic Engine', 'Math Problem Solver'],
    bestFor: 'Current affairs, space exploration updates, astrophysics concepts',
    samplePrompt: 'Explain how ISRO Chandrayaan mission worked in simple terms for a class 7 student.',
    iconName: 'Zap',
    logoColor: 'from-slate-800 to-black'
  },
  {
    id: 'mistral-chat',
    name: 'Mistral Le Chat (Large 2)',
    provider: 'Mistral AI',
    category: 'text',
    badge: 'European Open Sovereign AI',
    description: 'Ultra-fast, efficient open-weight language model with exceptional multilingual reasoning and code synthesis.',
    teluguDesc: 'మిస్ట్రాల్ లే చాట్ - యూరోపియన్ సూపర్ ఫాస్ట్ AI, బహుభాషా ప్రావీణ్యం మరియు కోడింగ్ సహాయం.',
    hindiDesc: 'मिस्ट्रल ले चैट - तीव्र गति और उच्च कोटि का बहुभाषी समाधान।',
    url: 'https://chat.mistral.ai/',
    apiUrl: 'https://docs.mistral.ai/',
    pricing: '100% Free Open Source',
    features: ['Ultra-fast Token Generation', 'Coding & Syntax Mastery', 'Web Search Grounding', 'Document Analysis'],
    bestFor: 'Python programming, multilingual translations, logic puzzles',
    samplePrompt: 'Write a Python program to simulate a Vedic solar clock with comments.',
    iconName: 'Code2',
    logoColor: 'from-orange-600 to-amber-700'
  },
  {
    id: 'poe-quora',
    name: 'Poe AI (Multi-Bot Hub)',
    provider: 'Quora',
    category: 'multimodal',
    badge: 'All AI Models in 1 Place',
    description: 'All-in-one hub providing instant access to Claude, GPT-4o, Llama 3, Gemini, FLUX, and custom bots created by teachers worldwide.',
    teluguDesc: 'పో AI - అన్ని ప్రపంచ AI బాట్‌లు (ChatGPT, Claude, Llama) ఒకే చోట అందుబాటులో ఉంటాయి.',
    hindiDesc: 'पो एआई - दुनिया के सभी प्रमुख एआई मॉडल एक ही प्लेटफॉर्म पर।',
    url: 'https://poe.com/',
    apiUrl: 'https://creator.poe.com/docs',
    pricing: 'Free & Subscription',
    features: ['Access 50+ AI Models in 1 App', 'Custom Bot Builder', 'Direct Model Comparison', 'Fast Switching'],
    bestFor: 'Comparing answers across ChatGPT, Claude, and Gemini simultaneously',
    samplePrompt: 'Compare how different physics theories explain gravitational waves.',
    iconName: 'Boxes',
    logoColor: 'from-purple-600 to-indigo-800'
  },

  // ===================== VOICE & AUDIO AI CHATBOTS =====================
  {
    id: 'elevenlabs-voice',
    name: 'ElevenLabs Voice AI',
    provider: 'ElevenLabs',
    category: 'voice',
    badge: 'World #1 Realistic Speech AI',
    description: 'Most human-like text-to-speech voice generator supporting 29+ languages including Telugu, Hindi, and Indian English accents.',
    teluguDesc: 'ఎలెవెన్‌ల్యాబ్స్ - ప్రపంచంలో అత్యంత సహజమైన మానవ గొంతుతో పాఠాలు, కథలు చదివి వినిపిస్తుంది.',
    hindiDesc: 'इलेवनलैब्स - सबसे स्वाभाविक और स्पष्ट बहुभाषी वॉयस जनरेटर।',
    url: 'https://elevenlabs.io/',
    apiUrl: 'https://elevenlabs.io/docs/api-reference',
    pricing: 'Free Tier Available',
    features: ['Telugu & Hindi Voice Dubbing', 'Emotion & Tone Tuning', 'Sound Effects Generator', 'Audiobook Creator'],
    bestFor: 'Listening to textbook chapters as audiobooks, Telugu moral stories narration',
    samplePrompt: 'Convert this Sanskrit shloka with Telugu explanation into inspiring storytelling voice.',
    iconName: 'Radio',
    logoColor: 'from-emerald-700 to-teal-900'
  },
  {
    id: 'suno-ai-music',
    name: 'Suno AI (Songs & Rhymes)',
    provider: 'Suno',
    category: 'voice',
    badge: 'Full Song & Rhyme Creator',
    description: 'Generate full songs with vocals, music, and lyrics in any language. Perfect for creating educational rhymes and Sanskrit shlokas melodies.',
    teluguDesc: 'సునో AI - సైన్స్ సూత్రాలు, పద్యాలు మరియు శ్లోకాలను శ్రావ్యమైన పాటలుగా మార్చుతుంది.',
    hindiDesc: 'सुनो एआई - शैक्षणिक कविताओं और संगीत रचनाओं के लिए सर्वश्रेष्ठ।',
    url: 'https://suno.com/',
    pricing: 'Free Tier (50 credits/day)',
    features: ['Generates Vocals + Instruments', 'Supports Telugu, Hindi & English Lyrics', 'Educational Rhyme Generator', 'Audio Download'],
    bestFor: 'Turning multiplication tables and science facts into catchy songs for kids',
    samplePrompt: 'Create an energetic catchy kids song about the 8 planets in our solar system with upbeat tempo.',
    iconName: 'Sparkles',
    logoColor: 'from-pink-600 to-rose-700'
  },
  {
    id: 'speechify-ai',
    name: 'Speechify (AI Reader & Tutor)',
    provider: 'Speechify',
    category: 'voice',
    badge: 'Best Audio Study Reader',
    description: 'Read aloud textbooks, PDFs, and web articles at up to 4x speed with celebrity voices (Snoop Dogg, Gwyneth Paltrow, AI tutors).',
    teluguDesc: 'స్పీచిఫై - పాఠ్యపుస్తకాలు, పిడిఎఫ్ ఫైల్స్ స్పష్టంగా వినడానికి ఉత్తమ ఆడియో రీడర్.',
    hindiDesc: 'स्पीचीफाई - किताबों और पीडीएफ को बोलकर सुनाने वाला टूल।',
    url: 'https://speechify.com/',
    pricing: 'Free Tier Available',
    features: ['Listen to PDFs & Notes', 'Instant Speed Control (1x - 4x)', 'Camera Book Scanner to Audio', 'Multi-Language Voices'],
    bestFor: 'Students with reading fatigue or ADHD, listening to history/science chapters',
    samplePrompt: 'Read this NCERT Class 9 Biology chapter on Cell Structure aloud.',
    iconName: 'BookOpen',
    logoColor: 'from-blue-600 to-cyan-700'
  },
  {
    id: 'murf-ai',
    name: 'Murf AI (Studio Voiceovers)',
    provider: 'Murf',
    category: 'voice',
    badge: 'Studio Voiceover Generator',
    description: 'Professional AI voice generator for educational presentations, robotics tutorials, and e-learning video voiceovers.',
    teluguDesc: 'మర్ఫ్ AI - ప్రెజెంటేషన్స్ మరియు ప్రాజెక్ట్ వీడియోల కోసం ప్రొఫెషనల్ వాయిస్ ఓవర్లు.',
    hindiDesc: 'मर्फ एआई - प्रोजेक्ट और वीडियो प्रस्तुति के लिए पेशेवर आवाज।',
    url: 'https://murf.ai/',
    pricing: 'Free Trial',
    features: ['120+ Teacher & Kid Voices', 'Pitch & Speed Modulation', 'Background Music Mixing', 'Sync with Slides'],
    bestFor: 'Science exhibition project voice narration, video presentations',
    samplePrompt: 'Create a clear teacher voiceover explaining how a hydraulic crane operates.',
    iconName: 'Bot',
    logoColor: 'from-amber-600 to-orange-800'
  },

  // ===================== IMAGE & VISION AI GENERATORS =====================
  {
    id: 'midjourney-ai',
    name: 'Midjourney v6',
    provider: 'Midjourney',
    category: 'image',
    badge: 'World #1 Photorealistic Art',
    description: 'Industry benchmark for breathtaking photorealistic art, science illustrations, anatomical 3D renders, and historical visual recreations.',
    teluguDesc: 'మిడ్‌జర్నీ - సైన్స్ డయాగ్రమ్స్, 3D రోబోట్ మోడల్స్ మరియు అద్భుతమైన ఆర్ట్ సృష్టిస్తుంది.',
    hindiDesc: 'मिडजर्नी - विज्ञान चित्र, 3डी मॉडल और उत्कृष्ट कलाकृति निर्माण।',
    url: 'https://www.midjourney.com/',
    pricing: 'Subscription',
    features: ['Ultra-photorealism 8K', '3D Anatomy & Sci-Fi Render', 'Style Consistency', 'Upscaling & Panning'],
    bestFor: 'Visualizing historical events, creating book illustrations, 3D robotics visuals',
    samplePrompt: 'A detailed 3D exploded diagram of a Mars Rover with solar panels and sensor arms, cinematic lighting.',
    iconName: 'Palette',
    logoColor: 'from-violet-600 to-purple-900'
  },
  {
    id: 'bing-dalle3',
    name: 'DALL-E 3 (Microsoft Image Creator)',
    provider: 'OpenAI / Microsoft',
    category: 'image',
    badge: '100% Free DALL-E 3 Daily',
    description: 'Create hyper-accurate images directly from text prompts with precise understanding of complex instructions and text within images.',
    teluguDesc: 'డాల్-ఇ 3 - మీరు రాసిన పదాల ఆధారంగా ఉచితంగా అద్భుతమైన బొమ్మలు, చార్టులు తయారుచేస్తుంది.',
    hindiDesc: 'डाल-ई 3 - शब्दों से तुरंत उच्च गुणवत्ता वाले चित्र और चार्ट बनाएं।',
    url: 'https://www.bing.com/create',
    pricing: '100% Free Open Source',
    features: ['Accurate Text on Images', '100 Free Boosts Daily', 'Cartoon, 3D, Sketch Styles', 'High Resolution Download'],
    bestFor: 'Science diagram posters, school project cover pages, creative drawing inspiration',
    samplePrompt: 'A vibrant watercolor illustration of Ancient Nalanda University library with students studying astronomy.',
    iconName: 'Palette',
    logoColor: 'from-teal-600 to-emerald-800'
  },
  {
    id: 'leonardo-ai',
    name: 'Leonardo AI',
    provider: 'Leonardo Interactive',
    category: 'image',
    badge: 'Daily Free 150 Tokens',
    description: 'Leading creative AI suite with Realtime Canvas, Motion Animation, 3D Texture Generation, and custom educational illustration models.',
    teluguDesc: 'లియోనార్డో AI - రోజువారీ 150 ఉచిత టోకెన్లు, రియల్‌టైమ్ డ్రాయింగ్ మరియు యానిమేషన్స్.',
    hindiDesc: 'लियोनार्डो एआई - लाइव कैनवास और एआई पेंटिंग टूल।',
    url: 'https://leonardo.ai/',
    pricing: 'Free Daily Tokens',
    features: ['Realtime Generative Canvas', 'AI Motion Video Creator', '150 Free Tokens Everyday', 'Transparent PNG Generation'],
    bestFor: 'Game asset design, character creation, poster making',
    samplePrompt: 'An isometric 3D game asset of a solar-powered DIY farm with irrigation pumps.',
    iconName: 'Layers',
    logoColor: 'from-purple-700 to-pink-700'
  },
  {
    id: 'ideogram-ai',
    name: 'Ideogram AI 2.0',
    provider: 'Ideogram',
    category: 'image',
    badge: 'Best Typographic & Text AI',
    description: 'Master of rendering flawless English and multilingual text, quotes, badges, posters, and educational infographics inside images.',
    teluguDesc: 'ఐడియోగ్రామ్ AI - పోస్టర్లు, కోట్స్ మరియు పాఠ్య చార్టులపై అక్షరాలు స్పష్టంగా ముద్రించడానికి ఉత్తమమైనది.',
    hindiDesc: 'आइडियोग्राम एआई - पोस्टर और इन्फोग्राफिक्स पर सटीक टेक्स्ट लिखने के लिए।',
    url: 'https://ideogram.ai/',
    pricing: 'Free Daily Tier',
    features: ['Flawless Text Rendering', 'Typography Poster Creator', 'T-Shirt & Sticker Design', 'Color Palette Control'],
    bestFor: 'School exhibition posters, science quotes, certificates design',
    samplePrompt: 'A futuristic science poster with bold glowing text "FUTURE ROBOTICS GURUKUL 2026" with circuits background.',
    iconName: 'FileText',
    logoColor: 'from-amber-600 to-rose-700'
  },
  {
    id: 'canva-magic',
    name: 'Canva Magic Studio',
    provider: 'Canva',
    category: 'image',
    badge: 'All-in-One Design AI',
    description: 'AI design assistant for auto-generating school presentations, worksheets, math flashcards, mind maps, and social posters.',
    teluguDesc: 'కాన్వా మ్యాజిక్ - ప్రెజెంటేషన్లు, వర్క్‌షీట్స్ మరియు మైండ్‌మ్యాప్‌లను క్షణాల్లో తయారుచేయవచ్చు.',
    hindiDesc: 'कैनवा मैजिक - स्कूल प्रोजेक्ट और वर्कशीट के लिए संपूर्ण डिज़ाइन टूल।',
    url: 'https://www.canva.com/magic-home/',
    pricing: 'Free & Pro',
    features: ['Magic Presentation Generator', 'Instant Math Worksheet Creator', 'AI Photo Eraser & Extender', 'Ready School Templates'],
    bestFor: 'Classroom PPTs, flashcards, project printables',
    samplePrompt: 'Generate a 6-slide presentation on Indian Renewable Energy with diagrams and quiz questions.',
    iconName: 'Sparkles',
    logoColor: 'from-blue-500 to-purple-600'
  },
  {
    id: 'krea-ai',
    name: 'Krea AI (Real-time Canvas)',
    provider: 'Krea',
    category: 'image',
    badge: 'Live Realtime Drawing AI',
    description: 'Draw rough stick figures or sketches on left and watch AI transform it into photorealistic 3D art on right in real-time as you move the mouse.',
    teluguDesc: 'క్రియా AI - మీరు వేసిన చిన్న గీతలను రియల్‌టైమ్‌లో అద్భుతమైన 3D పెయింటింగ్‌గా మారుస్తుంది.',
    hindiDesc: 'क्रिया एआई - रियल-टाइम स्केच टू इमेज पेंटिंग टूल।',
    url: 'https://www.krea.ai/',
    pricing: 'Free Tier Available',
    features: ['Instant Real-time Gen Canvas', 'Screen-to-Image AI Mirroring', 'AI Image Enhancer (4K)', 'Video Pattern Morpher'],
    bestFor: 'Kids learning drawing, transforming sketches into robotic art',
    samplePrompt: 'A simple geometric circle and triangle sketch turned into a shiny brass robotic rover.',
    iconName: 'Palette',
    logoColor: 'from-emerald-600 to-cyan-700'
  }
];

// Curated Multi-Language Study Solutions & Free Notes/Books Vault
export interface LanguageSolutionVaultItem {
  id: string;
  subject: string;
  grade: string;
  title: string;
  teluguTitle: string;
  hindiTitle: string;
  languagesAvailable: string[];
  notesDocUrl: string;
  videoPlaylistUrl: string;
  ncertBookUrl: string;
  practiceQuizUrl: string;
  keyConcepts: string[];
  teluguSummary: string;
}

export const MULTI_LANGUAGE_SOLUTIONS_VAULT: LanguageSolutionVaultItem[] = [
  {
    id: 'math-algebra-fractions',
    subject: 'Mathematics',
    grade: 'Class 6 - 10',
    title: 'Algebra, Geometry, Trigonometry & Fractions Master Vault',
    teluguTitle: 'బీజగణితం, జ్యామితి & భిన్నాలు - సమగ్ర నోట్స్ & వీడియోలు',
    hindiTitle: 'बीजगणित, ज्यामिति और त्रिकोणमिति संपूर्ण समाधान',
    languagesAvailable: ['English', 'Telugu (తెలుగు)', 'Hindi (हिन्दी)', 'Tamil', 'Kannada', 'Sanskrit'],
    notesDocUrl: 'https://epathshala.nic.in/',
    videoPlaylistUrl: 'https://in.khanacademy.org/math',
    ncertBookUrl: 'https://ncert.nic.in/textbook.php',
    practiceQuizUrl: 'https://phet.colorado.edu/en/simulations/fraction-matcher',
    keyConcepts: ['BODMAS Rules', 'Quadratic Equations (ax²+bx+c=0)', 'Pythagoras Theorem', 'Trigonometric Ratios (sin/cos/tan)', 'Vedic Math Sutras for 5-sec mental math'],
    teluguSummary: 'వేదిక్ మ్యాథ్స్ సులభ సూత్రాలు, బీజగణిత సమీకరణాలు మరియు పిజ్జా స్లైస్ ఉదాహరణలతో భిన్నాల సమగ్ర వివరణ.'
  },
  {
    id: 'physics-mechanics-electricity',
    subject: 'Science & Physics',
    grade: 'Class 6 - 10',
    title: 'Newton Laws, Electricity, Optics & Circuit Blueprint Lab',
    teluguTitle: 'న్యూటన్ నియమాలు, విద్యుత్ & కాంతి - ప్రాక్టికల్ గైడ్',
    hindiTitle: 'न्यूटन के नियम, विद्युत धारा एवं प्रकाशिकी नोट्स',
    languagesAvailable: ['English', 'Telugu (తెలుగు)', 'Hindi (हिन्दी)', 'Tamil', 'Sanskrit'],
    notesDocUrl: 'https://diksha.gov.in/',
    videoPlaylistUrl: 'https://www.youtube.com/results?search_query=ncert+class+10+physics+experiment',
    ncertBookUrl: 'https://ncert.nic.in/textbook.php',
    practiceQuizUrl: 'https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc',
    keyConcepts: ['Newton 3 Laws of Motion', 'Ohm’s Law (V=IR)', 'Series vs Parallel Resistance', 'Refraction & Lenses', 'Electromagnetic Induction'],
    teluguSummary: 'ఫాల్‌స్టాడ్ మరియు ఫెట్ సిమ్యులేటర్లతో లైవ్ ఎలక్ట్రిక్ కరెంట్ ప్రవాహం మరియు న్యూటన్ సూత్రాల ప్రాక్టికల్ డెమో.'
  },
  {
    id: 'coding-python-robotics',
    subject: 'Computer Science & AI',
    grade: 'Class 4 - 10',
    title: 'Python Coding, Arduino DIY Robotics & Scratch Game Dev',
    teluguTitle: 'పైథాన్ కోడింగ్, ఆర్డునో రోబోటిక్స్ & స్క్రాచ్ గేమ్స్',
    hindiTitle: 'पायथन कोडिंग, अरडुइनो रोबोटिक्स एवं गेम डेवलपमेंट',
    languagesAvailable: ['English', 'Telugu (తెలుగు)', 'Hindi (हिन्दी)'],
    notesDocUrl: 'https://replit.com/',
    videoPlaylistUrl: 'https://scratch.mit.edu/',
    ncertBookUrl: 'https://www.tinkercad.com/circuits',
    practiceQuizUrl: 'https://code.org/',
    keyConcepts: ['Python Variables, Loops & Functions', 'Arduino Ultrasonic Sensors & Motors', 'Scratch Block-based Logic', 'HTML5 & CSS Web Building'],
    teluguSummary: 'పిల్లలు సులభంగా స్వయంగా గేమ్స్ మరియు అడ్డంకులను తప్పించుకునే రోబోట్స్ తయారుచేసే కోడ్ నోట్స్.'
  },
  {
    id: 'sanskar-vedic-values',
    subject: 'Heritage & Sanskar',
    grade: 'LKG - Class 10',
    title: 'Bhagavad Gita Shlokas, Panchatantra Stories & Moral Leadership',
    teluguTitle: 'భగవద్గీత శ్లోకాలు, పంచతంత్ర కథలు & వ్యక్తిత్వ వికాసం',
    hindiTitle: 'भगवद्गीता श्लोक, पंचतंत्र कहानियां एवं नैतिक मूल्य',
    languagesAvailable: ['Sanskrit', 'Telugu (తెలుగు)', 'Hindi (हिन्दी)', 'English'],
    notesDocUrl: 'https://ndl.iitkgp.ac.in/',
    videoPlaylistUrl: 'https://swayam.gov.in/',
    ncertBookUrl: 'https://epathshala.nic.in/',
    practiceQuizUrl: 'https://diksha.gov.in/',
    keyConcepts: ['Karmanye Vadhikaraste Meaning', 'Dharmo Rakshati Rakshitah', 'Panchatantra 5 Friendship Principles', 'Swami Vivekananda Youth Inspiration'],
    teluguSummary: 'ప్రతిరోజు పిల్లలలో శ్రద్ధ, సమయపాలన మరియు ధైర్యాన్ని పెంచే శ్లోకాలు మరియు సరళమైన తెలుగు తాత్పర్యాలు.'
  }
];
