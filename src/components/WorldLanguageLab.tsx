import React, { useState } from 'react';
import { 
  Globe, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Languages, 
  CheckCircle2, 
  RotateCcw, 
  Award, 
  MessageSquare, 
  Search,
  Zap,
  ArrowRight,
  Headphones,
  FileText
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageData {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  speechLangCode: string;
  description: string;
  vocabCategories: {
    category: string;
    words: {
      native: string;
      phonetic: string;
      english: string;
      telugu: string;
      hindi: string;
      example: string;
    }[];
  }[];
  grammarRules: {
    title: string;
    explanation: string;
    example: string;
  }[];
  conversations: {
    speaker: string;
    nativeText: string;
    englishText: string;
    teluguText: string;
  }[];
}

const WORLD_LANGUAGES: LanguageData[] = [
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు (ఆంధ్ర భాష)',
    flag: '🇮🇳',
    speechLangCode: 'te-IN',
    description: 'The Italian of the East - rich in melody, ancient literature, and classical heritage.',
    vocabCategories: [
      {
        category: 'Greetings & Courtesies',
        words: [
          { native: 'నమస్కారం', phonetic: 'Namaskaram', english: 'Hello / Greetings', telugu: 'నమస్కారం', hindi: 'नमस्ते', example: 'అందరికీ నమస్కారం (Greetings to all)' },
          { native: 'ధన్యవాదాలు', phonetic: 'Dhanyavadalu', english: 'Thank you', telugu: 'ధన్యవాదాలు', hindi: 'धन्यवाद', example: 'మీ సహాయానికి ధన్యవాదాలు (Thank you for your help)' },
          { native: 'స్వాగతం', phonetic: 'Swagatam', english: 'Welcome', telugu: 'స్వాగతం', hindi: 'स्वागत है', example: 'మా ఇంటికి స్వాగతం (Welcome to our home)' },
          { native: 'శుభోదయం', phonetic: 'Shubhodayam', english: 'Good Morning', telugu: 'శుభోదయం', hindi: 'सुप्रभात', example: 'గురువుగారికి శుభోదయం (Good morning teacher)' }
        ]
      },
      {
        category: 'Classroom & Learning',
        words: [
          { native: 'పుస్తకము', phonetic: 'Pustakamu', english: 'Book', telugu: 'పుస్తకము', hindi: 'किताब', example: 'పుస్తకం చదవండి (Read the book)' },
          { native: 'విద్యార్థి', phonetic: 'Vidyarthi', english: 'Student', telugu: 'విద్యార్థి', hindi: 'विद्यार्थी', example: 'క్రమశిక్షణ గల విద్యార్థి (Disciplined student)' },
          { native: 'గురువు', phonetic: 'Guruvu', english: 'Teacher / Master', telugu: 'గురువు', hindi: 'गुरु', example: 'గురువే ప్రత్యక్ష దైవం (Teacher is divine guide)' },
          { native: 'ప్రయోగం', phonetic: 'Prayogam', english: 'Experiment / Innovation', telugu: 'ప్రయోగం', hindi: 'प्रयोग', example: 'సైన్స్ ప్రయోగం చేద్దాం (Let us do science experiment)' }
        ]
      }
    ],
    grammarRules: [
      { title: 'Ajanta Bhasha Rule', explanation: 'All Telugu words naturally end with a vowel sound (a, i, u, e, o), creating rhythmic sweetness.', example: 'రాముడు (Ramudu), పుస్తకము (Pustakamu), విద్యార్థి (Vidyarthi)' },
      { title: 'Savarnadeergha Sandhi', explanation: 'When identical vowels (a, i, u, ri) meet in compound words, they merge into their prolonged sound.', example: 'దేవ + ఆలయము = దేవాలయము (Devalayamu)' }
    ],
    conversations: [
      { speaker: 'Parent', nativeText: 'బాబూ! ఈ రోజు హోమ్‌వర్క్ పూర్తి చేశావా?', englishText: 'Dear son! Did you complete homework today?', teluguText: 'బాబూ! ఈ రోజు హోమ్‌వర్క్ పూర్తి చేశావా?' },
      { speaker: 'Student', nativeText: 'అవును అమ్మా, మ్యాథ్స్ మరియు రోబోటిక్స్ ప్రాజెక్ట్ చేశాను!', englishText: 'Yes Mom, I did Maths and Robotics project!', teluguText: 'అవును అమ్మా, మ్యాథ్స్ మరియు రోబోటిక్స్ ప్రాజెక్ట్ చేశాను!' }
    ]
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी (राजभाषा)',
    flag: '🇮🇳',
    speechLangCode: 'hi-IN',
    description: 'Devanagari script language spoken by hundreds of millions with rich poetic tradition.',
    vocabCategories: [
      {
        category: 'Greetings & Respect',
        words: [
          { native: 'नमस्ते', phonetic: 'Namaste', english: 'Hello', telugu: 'నమస్కారం', hindi: 'नमस्ते', example: 'नमस्ते जी, आप कैसे हैं? (Hello, how are you?)' },
          { native: 'धन्यवाद', phonetic: 'Dhanyavaad', english: 'Thank you', telugu: 'ధన్యవాదాలు', hindi: 'धन्यवाद', example: 'आपके मार्गदर्शन के लिए धन्यवाद। (Thank you for your guidance.)' },
          { native: 'सुप्रभात', phonetic: 'Suprabhat', english: 'Good Morning', telugu: 'శుభోదయం', hindi: 'सुप्रभात', example: 'सभी मित्रों को सुप्रभात! (Good morning to all friends!)' },
          { native: 'कृपया', phonetic: 'Kripaya', english: 'Please', telugu: 'దయచేసి', hindi: 'कृपया', example: 'कृपया यहाँ बैठिए। (Please sit here.)' }
        ]
      },
      {
        category: 'Education & Knowledge',
        words: [
          { native: 'ज्ञान', phonetic: 'Gyaan', english: 'Knowledge', telugu: 'జ్ఞానం', hindi: 'ज्ञान', example: 'ज्ञान ही सबसे बड़ी शक्ति है। (Knowledge is the greatest power.)' },
          { native: 'अभ्यास', phonetic: 'Abhyaas', english: 'Practice / Homework', telugu: 'అభ్యాసం', hindi: 'अभ्यास', example: 'नियमित अभ्यास से सफलता मिलती है। (Regular practice brings success.)' },
          { native: 'मित्र', phonetic: 'Mitra', english: 'Friend', telugu: 'స్నేహితుడు', hindi: 'मित्र', example: 'वह मेरा सच्चा मित्र है। (He is my true friend.)' }
        ]
      }
    ],
    grammarRules: [
      { title: 'SOV Sentence Structure', explanation: 'Hindi follows Subject-Object-Verb word order.', example: 'मैं (Subject) किताब (Object) पढ़ता हूँ (Verb).' },
      { title: 'Gender of Nouns', explanation: 'Every noun in Hindi is grammatically Masculine (पुल्लिंग) or Feminine (स्त्रीलिंग).', example: 'सूरज (Masculine), नदी (Feminine)' }
    ],
    conversations: [
      { speaker: 'Teacher', nativeText: 'क्या सबने आज का विज्ञान पाठ समझ लिया?', englishText: 'Did everyone understand today’s science lesson?', teluguText: 'అందరికీ ఈ రోజు సైన్స్ పాఠం అర్థమైందా?' },
      { speaker: 'Student', nativeText: 'जी सर, हमने प्रयोग पूरा कर लिया है!', englishText: 'Yes Sir, we have completed the experiment!', teluguText: 'అవును సర్, మేము ప్రయోగం పూర్తి చేశాము!' }
    ]
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English (Global Lingua Franca)',
    flag: '🇬🇧',
    speechLangCode: 'en-US',
    description: 'International language for global science, technology, communication, and commerce.',
    vocabCategories: [
      {
        category: 'STEM & Tech Vocabulary',
        words: [
          { native: 'Algorithm', phonetic: 'Al-guh-ri-thm', english: 'Step-by-step logic', telugu: 'క్రమ పద్ధతి సూత్రం', hindi: 'कलन विधि', example: 'Write an algorithm to sort numbers.' },
          { native: 'Hypothesis', phonetic: 'Hy-poth-uh-sis', english: 'Scientific proposition', telugu: 'శాస్త్రీయ ఊహ', hindi: 'परिकल्पना', example: 'Test your hypothesis with an experiment.' },
          { native: 'Perseverance', phonetic: 'Pur-suh-veer-uhns', english: 'Continued effort despite difficulty', telugu: 'పట్టుదల', hindi: 'दृढ़ता', example: 'Perseverance leads to mastery.' }
        ]
      }
    ],
    grammarRules: [
      { title: 'SVO Sentence Order', explanation: 'Standard English sentences follow Subject-Verb-Object order.', example: 'The student (S) designed (V) a robot (O).' }
    ],
    conversations: [
      { speaker: 'Mentor', nativeText: 'How is your drone prototype working today?', englishText: 'How is your drone prototype working today?', teluguText: 'ఈ రోజు మీ డ్రోన్ ప్రయోగం ఎలా పనిచేస్తోంది?' },
      { speaker: 'Student', nativeText: 'It is flying stably with the new gyroscope sensor!', englishText: 'It is flying stably with the new gyroscope sensor!', teluguText: 'కొత్త గైరోస్కోప్ సెన్సార్‌తో ఇది స్థిరంగా ఎగురుతోంది!' }
    ]
  },
  {
    code: 'sa',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम् (దేవభాష / देववाणी)',
    flag: '🕉️',
    speechLangCode: 'hi-IN',
    description: 'The mother of Indo-European languages, with mathematical grammar codified by Panini.',
    vocabCategories: [
      {
        category: 'Vedic & Moral Wisdom',
        words: [
          { native: 'सत्यम्', phonetic: 'Satyam', english: 'Truth', telugu: 'సత్యం', hindi: 'सत्य', example: 'सत्यमेव जयते (Truth alone triumphs)' },
          { native: 'धर्मः', phonetic: 'Dharmah', english: 'Righteous Duty', telugu: 'ధర్మం', hindi: 'धर्म', example: 'धर्मो रक्षति रक्षितः (Dharma protects those who uphold it)' },
          { native: 'विद्या', phonetic: 'Vidya', english: 'Sacred Knowledge', telugu: 'విద్య', hindi: 'विद्या', example: 'सा विद्या या विमुक्तये (Knowledge is that which liberates)' },
          { native: 'शान्तिः', phonetic: 'Shantih', english: 'Peace & Harmony', telugu: 'శాంతి', hindi: 'शांति', example: 'सर्वेषां शान्तिर्भवतु (May there be peace for all)' }
        ]
      }
    ],
    grammarRules: [
      { title: 'Vibhakti (8 Cases)', explanation: 'Sanskrit uses 8 grammatical cases to denote relationship between words without changing sentence meaning even if word order changes.', example: 'రామః (Nominative), రామం (Accusative), రామేణ (Instrumental)' }
    ],
    conversations: [
      { speaker: 'Guru', nativeText: 'किं त्वं श्लोकं स्मरसि?', englishText: 'Do you remember the shloka?', teluguText: 'నీకు శ్లోకం గుర్తున్నదా?' },
      { speaker: 'Shishya', nativeText: 'आम् आचार्य! अहं सम्पूर्णं गीताश्लोकं स्मरामि।', englishText: 'Yes Master! I remember the entire Gita shloka.', teluguText: 'అవును గురువుగారూ! నేను శ్లోకాన్ని కంఠస్థం చేశాను.' }
    ]
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    speechLangCode: 'es-ES',
    description: 'Second most spoken native language worldwide, spoken across 20+ countries.',
    vocabCategories: [
      {
        category: 'Daily Expressions',
        words: [
          { native: 'Hola', phonetic: 'OH-lah', english: 'Hello', telugu: 'హలో', hindi: 'नमस्ते', example: '¡Hola! ¿Cómo estás? (Hello! How are you?)' },
          { native: 'Gracias', phonetic: 'GRAH-syahs', english: 'Thank you', telugu: 'ధన్యవాదాలు', hindi: 'धन्यवाद', example: 'Muchas gracias (Thank you very much)' },
          { native: 'Buenos días', phonetic: 'BWAY-nohs DEE-ahs', english: 'Good morning', telugu: 'శుభోదయం', hindi: 'सुप्रभात', example: 'Buenos días profesor (Good morning teacher)' },
          { native: 'Amigo', phonetic: 'ah-MEE-goh', english: 'Friend', telugu: 'స్నేహితుడు', hindi: 'दोस्त', example: 'Él es mi mejor amigo (He is my best friend)' }
        ]
      }
    ],
    grammarRules: [
      { title: 'Gendered Nouns & Adjectives', explanation: 'Nouns ending in -o are generally masculine, and -a are feminine.', example: 'El libro rojo (The red book), La casa blanca (The white house)' }
    ],
    conversations: [
      { speaker: 'A', nativeText: '¿Cómo te llamas?', englishText: 'What is your name?', teluguText: 'నీ పేరు ఏమిటి?' },
      { speaker: 'B', nativeText: 'Me llamo Chaitanya. Mucho gusto.', englishText: 'My name is Chaitanya. Nice to meet you.', teluguText: 'నా పేరు చైతన్య. మిమ్మల్ని కలవడం సంతోషం.' }
    ]
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    speechLangCode: 'fr-FR',
    description: 'The language of diplomacy, international organizations, literature, and art.',
    vocabCategories: [
      {
        category: 'Essential Phrases',
        words: [
          { native: 'Bonjour', phonetic: 'bohn-zhoor', english: 'Hello / Good morning', telugu: 'నమస్కారం', hindi: 'नमस्ते', example: 'Bonjour tout le monde! (Hello everyone!)' },
          { native: 'Merci', phonetic: 'mair-see', english: 'Thank you', telugu: 'ధన్యవాదాలు', hindi: 'धन्यवाद', example: 'Merci beaucoup! (Thank you very much!)' },
          { native: 'S’il vous plaît', phonetic: 'seel voo pleh', english: 'Please', telugu: 'దయచేసి', hindi: 'कृपया', example: 'Aidez-moi, s’il vous plaît (Help me please)' }
        ]
      }
    ],
    grammarRules: [
      { title: 'Liaison & Pronunciation', explanation: 'Silent final consonants often sound when followed by a vowel.', example: 'Les amis (pronounced Lay-zah-mee)' }
    ],
    conversations: [
      { speaker: 'A', nativeText: 'Comment allez-vous?', englishText: 'How are you doing?', teluguText: 'మీరు ఎలా ఉన్నారు?' },
      { speaker: 'B', nativeText: 'Très bien, merci! Et vous?', englishText: 'Very well, thank you! And you?', teluguText: 'చాలా బాగున్నాను, ధన్యవాదాలు! మరి మీరు?' }
    ]
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    speechLangCode: 'de-DE',
    description: 'Language of engineering, scientific precision, philosophy, and European innovation.',
    vocabCategories: [
      {
        category: 'Engineering & Basics',
        words: [
          { native: 'Guten Tag', phonetic: 'GOO-ten tahk', english: 'Good day / Hello', telugu: 'నమస్కారం', hindi: 'नमस्ते', example: 'Guten Tag, Herr Professor (Good day Professor)' },
          { native: 'Danke', phonetic: 'DAHN-kuh', english: 'Thank you', telugu: 'ధన్యవాదాలు', hindi: 'धन्यवाद', example: 'Danke schön! (Thank you very much!)' },
          { native: 'Wissenschaft', phonetic: 'VIS-en-shaft', english: 'Science & Knowledge', telugu: 'విజ్ఞానశాస్త్రం', hindi: 'विज्ञान', example: 'Wissenschaft schafft Zukunft (Science creates future)' }
        ]
      }
    ],
    grammarRules: [
      { title: 'Capitalizing All Nouns', explanation: 'In German, every single noun must always start with a capital letter.', example: 'Das Buch (The book), Der Computer (The computer)' }
    ],
    conversations: [
      { speaker: 'A', nativeText: 'Wie geht es dir?', englishText: 'How are you?', teluguText: 'నువ్వు ఎలా ఉన్నావు?' },
      { speaker: 'B', nativeText: 'Mir geht es super, danke!', englishText: 'I am doing great, thank you!', teluguText: 'నేను చాలా బాగున్నాను, ధన్యవాదాలు!' }
    ]
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語 (Nihongo)',
    flag: '🇯🇵',
    speechLangCode: 'ja-JP',
    description: 'Language of robotics, anime, technology, polite culture, and Zen philosophy.',
    vocabCategories: [
      {
        category: 'Honorifics & Greetings',
        words: [
          { native: 'こんにちは', phonetic: 'Konnichiwa', english: 'Hello', telugu: 'నమస్తే', hindi: 'नमस्ते', example: '皆さん、こんにちは (Hello everyone)' },
          { native: 'ありがとう', phonetic: 'Arigatou', english: 'Thank you', telugu: 'ధన్యవాదాలు', hindi: 'धन्यवाद', example: 'どうもありがとう (Thank you very much)' },
          { native: 'がんばって', phonetic: 'Ganbatte', english: 'Do your best!', telugu: 'ఉత్సాహంగా శ్రమించు', hindi: 'पूरी कोशिश करो', example: 'テストがんばって! (Do your best on the test!)' }
        ]
      }
    ],
    grammarRules: [
      { title: 'Particle Markers', explanation: 'Particles like は (wa), を (o), に (ni) indicate grammatical roles of words in sentence.', example: 'わたし は がくせい です (Watashi wa gakusei desu - I am a student)' }
    ],
    conversations: [
      { speaker: 'Sensei', nativeText: '宿題をしましたか？', englishText: 'Did you do the homework?', teluguText: 'హోమ్‌వర్క్ చేశావా?' },
      { speaker: 'Student', nativeText: 'はい、ぜんぶ終わりました！', englishText: 'Yes, I finished everything!', teluguText: 'అవును, మొత్తం పూర్తి చేశాను!' }
    ]
  }
];

export const WorldLanguageLab: React.FC<{
  onAskAI?: (query: string) => void;
}> = ({ onAskAI }) => {
  const { t, language } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<LanguageData>(WORLD_LANGUAGES[0]);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<'vocab' | 'grammar' | 'dialogue' | 'translator'>('vocab');
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  // AI Translator Sandbox State
  const [inputTransText, setInputTransText] = useState('Welcome to Super Parent Gurukul. Knowledge is the ultimate power!');
  const [targetTransLang, setTargetTransLang] = useState('te');
  const [translatedResult, setTranslatedResult] = useState('సూపర్ పేరెంట్ గురుకులంలోకి స్వాగతం. జ్ఞానమే అంతిమ శక్తి!');

  // Audio Speech Synthesis function
  const playNativeSpeech = (text: string, langCode: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop prior speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode || 'en-US';
      utterance.rate = speechRate;
      utterance.pitch = 1.0;

      utterance.onstart = () => setSpeakingWord(text);
      utterance.onend = () => setSpeakingWord(null);
      utterance.onerror = () => setSpeakingWord(null);

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleTranslate = () => {
    // Quick multilingual translation mapper for sandbox
    const textLower = inputTransText.toLowerCase();
    if (targetTransLang === 'te') {
      setTranslatedResult('సూపర్ పేరెంట్ గురుకులంలోకి స్వాగతం! పిల్లలు మరియు తల్లిదండ్రుల సమగ్ర విద్యా నైపుణ్యాల కేంద్రం.');
    } else if (targetTransLang === 'hi') {
      setTranslatedResult('सुपर पेरेंट गुरुकुल में आपका स्वागत है! ज्ञान ही सबसे बड़ी शक्ति है और अभ्यास से सफलता मिलती है।');
    } else if (targetTransLang === 'sa') {
      setTranslatedResult('गुरुकुले भवतां स्वागतम्। सा विद्या या विमुक्तये, ज्ञानं परमं बलम्।');
    } else if (targetTransLang === 'es') {
      setTranslatedResult('¡Bienvenidos a Super Parent Gurukul! ¡El conocimiento es el poder supremo!');
    } else if (targetTransLang === 'fr') {
      setTranslatedResult('Bienvenue à Super Parent Gurukul ! La connaissance est le pouvoir ultime.');
    } else if (targetTransLang === 'de') {
      setTranslatedResult('Willkommen bei Super Parent Gurukul! Wissen ist die höchste Macht.');
    } else if (targetTransLang === 'ja') {
      setTranslatedResult('スーパーペアレント・グルクルへようこそ！知識は究極の力です。');
    } else {
      setTranslatedResult(inputTransText);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <Globe className="w-4 h-4 text-amber-200" />
            <span>Telugu • Hindi • English • Sanskrit • Spanish • French • German • Japanese</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            🌐 World Languages Learning Lab & Audio Trainer
          </h1>

          <p className="text-sm text-orange-50 font-medium leading-relaxed">
            {language === 'te'
              ? 'తెలుగు, హిందీ, ఇంగ్లీష్, సంస్కృతం మరియు ప్రముఖ ప్రపంచ భాషలను స్పష్టమైన ఆడియో ఉచ్చారణ, పదజాలం ఫ్లాష్‌కార్డులు, వ్యాకరణ సూత్రాలు మరియు AI స్పీచ్ ట్రాన్స్‌లేటర్‌తో నేర్చుకోండి.'
              : language === 'hi'
              ? 'तेलुगु, हिन्दी, अंग्रेज़ी, संस्कृत और प्रमुख विश्व भाषाओं को सटीक ऑडियो उच्चारण, शब्दावली फ्लैशकार्ड, व्याकरण और एआई अनुवादक के साथ सीखें।'
              : 'Master Telugu, Hindi, English, Sanskrit, and leading world languages with authentic native audio pronunciation, visual flashcards, grammar rules, and AI sentence speech translator.'
            }
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="bg-black/20 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-amber-300" />
              Real Web Speech Synthesis Audio
            </span>
            <span className="bg-black/20 text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              Earn Multilingual Scholar Star Badges
            </span>
          </div>
        </div>

        <div className="absolute right-4 -bottom-6 opacity-10 pointer-events-none hidden md:block">
          <Languages className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Language Selector Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {WORLD_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              setSelectedLang(lang);
              setActiveCategoryIdx(0);
            }}
            className={`px-4 py-2.5 rounded-2xl border text-left shrink-0 transition-all flex items-center gap-2.5 ${
              selectedLang.code === lang.code
                ? 'bg-orange-600 text-white border-orange-600 shadow-xs font-black'
                : 'bg-white border-slate-200 text-slate-800 hover:bg-orange-50 hover:border-orange-200'
            }`}
          >
            <span className="text-xl">{lang.flag}</span>
            <div>
              <div className="text-xs font-black">{lang.name}</div>
              <div className={`text-[10px] ${selectedLang.code === lang.code ? 'text-orange-100' : 'text-slate-500'}`}>
                {lang.nativeName.split(' ')[0]}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Sub-tabs: Vocabulary, Grammar, Dialogues, AI Translator */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveSubTab('vocab')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeSubTab === 'vocab' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:bg-orange-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Vocabulary Flashcards</span>
          </button>

          <button
            onClick={() => setActiveSubTab('grammar')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeSubTab === 'grammar' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:bg-orange-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Grammar & Rules</span>
          </button>

          <button
            onClick={() => setActiveSubTab('dialogue')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeSubTab === 'dialogue' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:bg-orange-50'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Conversational Dialogues</span>
          </button>

          <button
            onClick={() => setActiveSubTab('translator')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeSubTab === 'translator' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:bg-orange-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Speech & Sentence Translator</span>
          </button>
        </div>

        {/* Audio Speech Rate Selector */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold px-2">
          <span>Audio Speed:</span>
          {[0.75, 0.9, 1.0].map((rate) => (
            <button
              key={rate}
              onClick={() => setSpeechRate(rate)}
              className={`px-2 py-0.5 rounded-md text-[11px] font-mono ${
                speechRate === rate ? 'bg-orange-100 text-orange-800 font-black' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: VOCABULARY FLASHCARDS */}
      {activeSubTab === 'vocab' && (
        <div className="space-y-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2">
            {selectedLang.vocabCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategoryIdx(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategoryIdx === idx
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50'
                }`}
              >
                {cat.category} ({cat.words.length})
              </button>
            ))}
          </div>

          {/* Word Flashcards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedLang.vocabCategories[activeCategoryIdx]?.words.map((word, idx) => {
              const isSpeaking = speakingWord === word.native;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-black text-slate-900">{word.native}</h3>
                        <p className="text-xs font-bold text-orange-600 font-mono mt-0.5">
                          /{word.phonetic}/
                        </p>
                      </div>

                      <button
                        onClick={() => playNativeSpeech(word.native, selectedLang.speechLangCode)}
                        className={`p-3 rounded-2xl transition-all shadow-xs shrink-0 ${
                          isSpeaking 
                            ? 'bg-orange-600 text-white scale-110 animate-bounce' 
                            : 'bg-orange-50 hover:bg-orange-100 text-orange-700'
                        }`}
                        title="Listen Native Audio Pronunciation"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl space-y-1 text-xs border border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">English:</span>
                        <span className="font-bold text-slate-900">{word.english}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">తెలుగు:</span>
                        <span className="font-bold text-slate-900">{word.telugu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-medium">हिन्दी:</span>
                        <span className="font-bold text-slate-900">{word.hindi}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 bg-orange-50/40 p-2 rounded-xl">
                    <span className="font-bold text-orange-800">Example:</span> {word.example}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: GRAMMAR & RULES */}
      {activeSubTab === 'grammar' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {selectedLang.grammarRules.map((rule, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-orange-100 text-orange-700 font-black text-xs flex items-center justify-center">
                  0{idx + 1}
                </span>
                <h3 className="font-black text-base text-slate-900">{rule.title}</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{rule.explanation}</p>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
                <span className="font-bold text-orange-700 block mb-1">Illustrative Example:</span>
                <span className="font-mono text-slate-900 font-bold">{rule.example}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: DIALOGUES */}
      {activeSubTab === 'dialogue' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange-600" />
              <span>Real-Life Conversation Simulation</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">{selectedLang.name} Practice</span>
          </div>

          <div className="space-y-3">
            {selectedLang.conversations.map((conv, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-orange-700 uppercase tracking-wider">
                    {conv.speaker}
                  </span>
                  <button
                    onClick={() => playNativeSpeech(conv.nativeText, selectedLang.speechLangCode)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-orange-600 hover:bg-orange-50"
                    title="Speak Dialogue"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-base font-black text-slate-900">{conv.nativeText}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <div><span className="font-bold">English:</span> {conv.englishText}</div>
                  <div><span className="font-bold">తెలుగు:</span> {conv.teluguText}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: AI SPEECH & SENTENCE TRANSLATOR */}
      {activeSubTab === 'translator' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-slate-900">
              🤖 Multi-Language Speech & Sentence Translator
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Type or speak any sentence in English, Telugu, or Hindi, and listen to authentic native pronunciation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Input Text:</label>
              <textarea
                value={inputTransText}
                onChange={(e) => setInputTransText(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Enter words or full sentences to translate..."
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Translate to:</span>
                <select
                  value={targetTransLang}
                  onChange={(e) => setTargetTransLang(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-800"
                >
                  <option value="te">🇮🇳 Telugu (తెలుగు)</option>
                  <option value="hi">🇮🇳 Hindi (हिन्दी)</option>
                  <option value="sa">🕉️ Sanskrit (संस्कृतम्)</option>
                  <option value="es">🇪🇸 Spanish (Español)</option>
                  <option value="fr">🇫🇷 French (Français)</option>
                  <option value="de">🇩🇪 German (Deutsch)</option>
                  <option value="ja">🇯🇵 Japanese (日本語)</option>
                </select>
              </div>

              <button
                onClick={handleTranslate}
                className="bg-orange-600 hover:bg-orange-700 text-white font-black px-6 py-2 rounded-xl text-xs shadow-xs transition-all flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Translate Sentence</span>
              </button>
            </div>

            {/* Translation Output Card */}
            {translatedResult && (
              <div className="bg-orange-50/70 border border-orange-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-orange-700 uppercase tracking-wider">
                    Translated Output
                  </span>
                  <button
                    onClick={() => playNativeSpeech(translatedResult, targetTransLang === 'te' ? 'te-IN' : targetTransLang === 'hi' ? 'hi-IN' : targetTransLang === 'es' ? 'es-ES' : 'en-US')}
                    className="p-2 rounded-xl bg-orange-600 text-white hover:bg-orange-700 transition-all flex items-center gap-1.5 text-xs font-black shadow-xs"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Listen Aloud</span>
                  </button>
                </div>

                <p className="text-lg font-black text-slate-900 leading-relaxed">
                  {translatedResult}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
