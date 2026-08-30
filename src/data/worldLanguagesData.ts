export interface WorldLanguageResource {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  speechLangCode: string;
  country: string;
  description: string;
  teluguDescription: string;
  alphabetInfo: {
    title: string;
    script: string;
    vowelsConsonants: string;
    sampleLetters: { char: string; phonetic: string; meaning?: string }[];
  };
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
  practiceExercises: {
    question: string;
    teluguPrompt: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  webLinks: {
    title: string;
    url: string;
    badge: string;
    description: string;
  }[];
  videoLinks: {
    title: string;
    url: string;
    duration: string;
    channel: string;
  }[];
  books: {
    title: string;
    author: string;
    downloadUrl: string;
    previewUrl: string;
    type: 'Grammar' | 'Story' | 'Reader' | 'Official';
  }[];
}

export const WORLD_LANGUAGES_DATA: WorldLanguageResource[] = [
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు (ఆంధ్ర & తెలంగాణ భాష)',
    flag: '🇮🇳',
    speechLangCode: 'te-IN',
    country: 'India (Andhra Pradesh & Telangana)',
    description: 'The Italian of the East - world-famous for its melodious vowel-ending words (Ajanta Bhasha), classical literature, and moral shatakas.',
    teluguDescription: 'తేనె వంటి తియ్యనైన భాష, అజంత భాష, వేమన-సుమతీ శతకాల నీతి రత్నాలు.',
    alphabetInfo: {
      title: 'వర్ణమాల (అచ్చులు, హల్లులు, ఉభయాక్షరాలు)',
      script: 'తెలుగు లిపి (56 అక్షరాలు)',
      vowelsConsonants: '16 అచ్చులు (అ-అః), 37 హల్లులు (క-ఱ), 3 ఉభయాక్షరాలు (సున్నా, విసర్గ, అరసున్నా)',
      sampleLetters: [
        { char: 'అ', phonetic: 'A', meaning: 'అమ్మ (Mother)' },
        { char: 'ఆ', phonetic: 'Aa', meaning: 'ఆవు (Cow)' },
        { char: 'ఇ', phonetic: 'I', meaning: 'ఇల్లు (House)' },
        { char: 'ఈ', phonetic: 'Ee', meaning: 'ఈగ (Fly)' },
        { char: 'క', phonetic: 'Ka', meaning: 'కలము (Pen)' },
        { char: 'గ', phonetic: 'Ga', meaning: 'గడప (Threshold)' },
        { char: 'చ', phonetic: 'Cha', meaning: 'చదువు (Education)' },
        { char: 'త', phonetic: 'Ta', meaning: 'తల్లి (Mother)' }
      ]
    },
    vocabCategories: [
      {
        category: 'Greetings & Courtesies (మర్యాదపూర్వక సంభాషణ)',
        words: [
          { native: 'నమస్కారం', phonetic: 'Namaskaram', english: 'Hello / Greetings', telugu: 'నమస్కారం', hindi: 'नमस्ते', example: 'గురువుగారికి నా నమస్కారాలు (My humble greetings to teacher)' },
          { native: 'ధన్యవాదాలు', phonetic: 'Dhanyavadalu', english: 'Thank you', telugu: 'ధన్యవాదాలు', hindi: 'धन्यवाद', example: 'మీ సహాయానికి ధన్యవాదాలు (Thank you for your assistance)' },
          { native: 'స్వాగతం', phonetic: 'Swagatam', english: 'Welcome', telugu: 'స్వాగతం', hindi: 'स्वागत है', example: 'మా గృహమునకు స్వాగతం (Welcome to our home)' },
          { native: 'శుభోదయం', phonetic: 'Shubhodayam', english: 'Good Morning', telugu: 'శుభోదయం', hindi: 'सुप्रभात', example: 'అందరికీ శుభోదయం (Good morning to all)' }
        ]
      },
      {
        category: 'Education & Wisdom (విద్య & జ్ఞానం)',
        words: [
          { native: 'పుస్తకము', phonetic: 'Pustakamu', english: 'Book', telugu: 'పుస్తకము', hindi: 'किताब', example: 'రోజూ ఒక మంచి పుస్తకం చదవండి (Read a good book daily)' },
          { native: 'విద్యార్థి', phonetic: 'Vidyarthi', english: 'Student / Learner', telugu: 'విద్యార్థి', hindi: 'विद्यार्थी', example: 'క్రమశిక్షణ గల విద్యార్థి విజయం సాధిస్తాడు (A disciplined student achieves success)' },
          { native: 'ప్రజ్ఞ', phonetic: 'Prajna', english: 'Sharp Intellect', telugu: 'ప్రజ్ఞ', hindi: 'प्रज्ञा', example: 'ప్రజ్ఞతో సమస్యలను పరిష్కరించవచ్చు (Problems can be solved with sharp intellect)' }
        ]
      }
    ],
    grammarRules: [
      { title: 'అజంత భాష సూత్రం (Ajanta Bhasha Rule)', explanation: 'All native Telugu words naturally end with a vowel sound (a, i, u, e, o), creating rhythmic sweetness like Italian.', example: 'రాముడు (Ramudu), విద్యాలయము (Vidyalayamu)' },
      { title: 'సవర్ణదీర్ఘ సంధి (Savarnadeergha Sandhi)', explanation: 'When identical vowels (a, i, u, ri) meet in compound words, they merge into their prolonged sound.', example: 'రామ + అనుజుడు = రామానుజుడు (Ramanujudu)' }
    ],
    conversations: [
      { speaker: 'Parent', nativeText: 'బాబూ! ఈ రోజు హోమ్‌వర్క్ మరియు ప్రాజెక్ట్ పూర్తి చేశావా?', englishText: 'Dear child! Did you complete homework and project today?', teluguText: 'బాబూ! ఈ రోజు హోమ్‌వర్క్ మరియు ప్రాజెక్ట్ పూర్తి చేశావా?' },
      { speaker: 'Student', nativeText: 'అవును అమ్మా, మ్యాథ్స్ ప్రాబ్లమ్స్ అన్నీ సరిగ్గా చేశాను!', englishText: 'Yes Mom, I solved all math problems correctly!', teluguText: 'అవును అమ్మా, మ్యాథ్స్ ప్రాబ్లమ్స్ అన్నీ సరిగ్గా చేశాను!' }
    ],
    practiceExercises: [
      {
        question: 'తెలుగును "ఇటాలియన్ ఆఫ్ ది ఈస్ట్" అని ఎందుకు అంటారు?',
        teluguPrompt: 'Telugu is called Italian of the East because:',
        options: ['అన్ని పదాలు అచ్చుతో ముగుస్తాయి (Ajanta Bhasha)', 'ఇది విదేశీ భాష', 'ఇందులో 10 అక్షరాలు మాత్రమే ఉన్నాయి', 'ఏదీ కాదు'],
        correctAnswer: 0,
        explanation: 'తెలుగు భాషలోని పదాలన్నీ అచ్చుతో ముగియడం వల్ల సంగీత లయ కలిగి ఉంటుంది.'
      },
      {
        question: '"రామ + ఆలయము" కలిపితే ఏ సంధి పదం ఏర్పడుతుంది?',
        teluguPrompt: 'What compound word is formed by Rama + Alayamu?',
        options: ['రామలయం', 'రామాలయము (సవర్ణదీర్ఘ సంధి)', 'రామగుడి', 'రామమందిరం'],
        correctAnswer: 1,
        explanation: 'అ + ఆ = ఆ (దీర్ఘం) రావడం సవర్ణదీర్ఘ సంధి సూత్రం.'
      }
    ],
    webLinks: [
      { title: 'AP SCERT Official Telugu Textbooks Portal', url: 'https://apsert.gov.in/', badge: 'AP SCERT', description: 'Free digital Telugu textbooks from Class 1 to 10 with audio and teacher guides.' },
      { title: 'Telugu Academy Official Portal', url: 'https://teluguacademy.net/', badge: 'Telugu Academy', description: 'Official dictionaries, vyakaranam handbooks, and classical Telugu texts.' },
      { title: 'StoryWeaver Telugu Children Stories (500+ Free)', url: 'https://storyweaver.org.in/search?language=Telugu', badge: 'StoryWeaver', description: 'Illustrated children\'s moral stories in Telugu with multi-level reading tracks.' }
    ],
    videoLinks: [
      { title: 'Telugu Varnamala (అ నుండి ఱ) Pronunciation Masterclass', url: 'https://www.youtube.com/watch?v=telugu-varnamala-hd', duration: '20 min', channel: 'T-SAT Vidya Educational TV' },
      { title: 'Vemana & Sumathi Shataka Padyalu with Meaning', url: 'https://www.youtube.com/watch?v=vemana-padyalu-moral', duration: '25 min', channel: 'Bhakti TV & Gurukul' }
    ],
    books: [
      { title: 'సుమతీ & వేమన శతక రత్నావళి', author: 'బద్దెన & వేమన కవులు', downloadUrl: 'https://storyweaver.org.in/', previewUrl: 'https://storyweaver.org.in/', type: 'Story' },
      { title: 'ఆంధ్ర భాషా వ్యాకరణం (Class 1 to 10)', author: 'తెలుగు అకాడమీ', downloadUrl: 'https://apsert.gov.in/', previewUrl: 'https://apsert.gov.in/', type: 'Grammar' }
    ]
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी (राजभाषा)',
    flag: '🇮🇳',
    speechLangCode: 'hi-IN',
    country: 'India',
    description: 'Devanagari script language spoken by hundreds of millions, with profound poetic traditions and national reach.',
    teluguDescription: 'భారత అధికారిక భాష, దేవనాగరి లిపి, పంచతంత్ర కథలు & హిందీ వ్యాకరణం.',
    alphabetInfo: {
      title: 'वर्णमाला (स्वर और व्यंजन)',
      script: 'देवनागरी लिपि (Devanagari Script)',
      vowelsConsonants: '11 स्वर (अ-औ), 33 व्यंजन (क-ह), 4 संयुक्त व्यंजन (क्ष, त्र, ज्ञ, श्र)',
      sampleLetters: [
        { char: 'अ', phonetic: 'A', meaning: 'अनार (Pomegranate)' },
        { char: 'आ', phonetic: 'Aa', meaning: 'आम (Mango)' },
        { char: 'इ', phonetic: 'I', meaning: 'इमली (Tamarind)' },
        { char: 'ई', phonetic: 'Ee', meaning: 'ईख (Sugarcane)' },
        { char: 'क', phonetic: 'Ka', meaning: 'कमल (Lotus)' },
        { char: 'ख', phonetic: 'Kha', meaning: 'खरगोश (Rabbit)' }
      ]
    },
    vocabCategories: [
      {
        category: 'Greetings & Etiquette (अभिवादन और शिष्टाचार)',
        words: [
          { native: 'नमस्ते', phonetic: 'Namaste', english: 'Hello / Greetings', telugu: 'నమస్కారం', hindi: 'नमस्ते', example: 'नमस्ते जी, आप कैसे हैं? (Hello, how are you?)' },
          { native: 'धन्यवाद', phonetic: 'Dhanyavaad', english: 'Thank you', telugu: 'ధన్యవాదాలు', hindi: 'धन्यवाद', example: 'आपके सहयोग के लिए धन्यवाद। (Thank you for your help.)' },
          { native: 'सुप्रभात', phonetic: 'Suprabhat', english: 'Good Morning', telugu: 'శుభోదయం', hindi: 'सुप्रभात', example: 'सभी को सुप्रभात! (Good morning everyone!)' },
          { native: 'कृपया', phonetic: 'Kripaya', english: 'Please', telugu: 'దయచేసి', hindi: 'कृपया', example: 'कृपया ध्यान दीजिए। (Please pay attention.)' }
        ]
      }
    ],
    grammarRules: [
      { title: 'SOV Sentence Structure', explanation: 'Hindi follows Subject-Object-Verb word order.', example: 'मैं (Subject) पुस्तक (Object) पढ़ता हूँ (Verb).' },
      { title: 'Gender of Nouns (लिंग)', explanation: 'All Hindi nouns are either Masculine (पुल्लिंग) or Feminine (स्त्रीलिंग).', example: 'सूरज (Masculine), नदी (Feminine)' }
    ],
    conversations: [
      { speaker: 'Teacher', nativeText: 'क्या सबने आज का अभ्यास पूरा कर लिया?', englishText: 'Did everyone complete today’s exercise?', teluguText: 'అందరూ ఈ రోజు హోమ్‌వర్క్ చేశారా?' },
      { speaker: 'Student', nativeText: 'जी हाँ गुरुजी, हमने सारा काम पूरा कर लिया है!', englishText: 'Yes Teacher, we finished all the work!', teluguText: 'అవును గురువుగారూ, మొత్తం పూర్తి చేశాము!' }
    ],
    practiceExercises: [
      {
        question: 'हिन्दी वाक्य में क्रिया (Verb) कहाँ आती है?',
        teluguPrompt: 'Where does the verb appear in a Hindi sentence?',
        options: ['वाक्य के अंत में (At the end - SOV)', 'शुरुआत में', 'बीच में', 'कहीं भी नहीं'],
        correctAnswer: 0,
        explanation: 'Hindi follows Subject-Object-Verb (SOV) structure, so verb comes at the end.'
      },
      {
        question: '"किताब" शब्द का लिंग क्या है?',
        teluguPrompt: 'What is the grammatical gender of the word "Kitab" in Hindi?',
        options: ['स्त्रीलिंग (Feminine)', 'पुल्लिंग (Masculine)', 'नपुंसकलिंग', 'उभयलिंग'],
        correctAnswer: 0,
        explanation: 'किताब पढ़ी जाती है - यह स्त्रीलिंग शब्द है।'
      }
    ],
    webLinks: [
      { title: 'Central Hindi Directorate (केंद्रीय हिंदी निदेशालय)', url: 'http://hindinideshalaya.nic.in/', badge: 'Govt Portal', description: 'Official dictionaries, Hindi learning software, and self-study courses.' },
      { title: 'NCERT Hindi Textbooks (Rimjhim & Vasant)', url: 'https://ncert.nic.in/textbook.php', badge: 'Official NCERT', description: 'Free Class 1 to 10 NCERT Hindi textbooks with chapter audios.' }
    ],
    videoLinks: [
      { title: 'Hindi Varnamala Swar & Vyanjan with Animation', url: 'https://www.youtube.com/watch?v=hindi-varnamala-kids', duration: '18 min', channel: 'Infobells Hindi' },
      { title: 'Hindi Vyakaran Masterclass (Sangya, Sarvanam, Kriya)', url: 'https://www.youtube.com/watch?v=hindi-grammar-oneshot', duration: '30 min', channel: 'Magnet Brains Hindi' }
    ],
    books: [
      { title: 'रिमझिम (Rimjhim Hindi Series Class 1-5)', author: 'NCERT', downloadUrl: 'https://ncert.nic.in/textbook.php', previewUrl: 'https://ncert.nic.in/', type: 'Official' }
    ]
  },
  {
    code: 'en-us',
    name: 'US English',
    nativeName: 'English (United States & Phonics)',
    flag: '🇺🇸',
    speechLangCode: 'en-US',
    country: 'United States of America',
    description: 'American English phonics, rhyming patterns, spelling bee vocabulary, idioms, and global scientific/technological communication.',
    teluguDescription: 'అమెరికన్ ఇంగ్లీష్ ఫోనిక్స్, స్పెల్లింగ్ బీ వర్డ్స్, గ్రామర్ & గ్లోబల్ కమ్యూనికేషన్.',
    alphabetInfo: {
      title: 'English Latin Alphabet (26 Letters)',
      script: 'Latin Script (A-Z, a-z)',
      vowelsConsonants: '5 Vowels (A, E, I, O, U), 21 Consonants (B, C, D...)',
      sampleLetters: [
        { char: 'A', phonetic: 'Short /æ/ or Long /eɪ/', meaning: 'Apple, Astronaut' },
        { char: 'B', phonetic: '/b/', meaning: 'Bicycle, Brilliant' },
        { char: 'C', phonetic: 'Hard /k/ or Soft /s/', meaning: 'Cat, Circle' },
        { char: 'D', phonetic: '/d/', meaning: 'Discovery, Dolphin' }
      ]
    },
    vocabCategories: [
      {
        category: 'Spelling Bee & High-Frequency Words',
        words: [
          { native: 'Perseverance', phonetic: 'pur-suh-VEER-uhns', english: 'Continued steady effort', telugu: 'నిరంతర పట్టుదల', hindi: 'दृढ़ता', example: 'Perseverance guarantees mastery.' },
          { native: 'Innovation', phonetic: 'in-uh-VAY-shuhn', english: 'Creating something new and useful', telugu: 'నూతన ఆవిష్కరణ', hindi: 'नवाचार', example: 'Creativity fuels technological innovation.' },
          { native: 'Empirical', phonetic: 'em-PEER-i-kuhl', english: 'Based on observation or experiment', telugu: 'ప్రయోగాత్మక సాక్ష్యం', hindi: 'प्रायोगिक', example: 'Scientific conclusions require empirical data.' }
        ]
      },
      {
        category: 'Common American Idioms',
        words: [
          { native: 'Piece of cake', phonetic: 'peess uhv kayk', english: 'Very easy to do', telugu: 'చాలా సులభం', hindi: 'बहुत आसान काम', example: 'This math puzzle was a piece of cake!' },
          { native: 'Hit the books', phonetic: 'hit thuh buhks', english: 'Start studying with focus', telugu: 'బాగా చదువుకోవడం', hindi: 'पढ़ाई शुरू करना', example: 'Time to hit the books for tomorrow\'s test.' }
        ]
      }
    ],
    grammarRules: [
      { title: 'Subject-Verb Agreement', explanation: 'Singular subjects take singular verbs (ends in -s in present tense); plural subjects take plural verbs.', example: 'The scientist discovers (Singular) vs The scientists discover (Plural).' },
      { title: 'Active vs. Passive Voice', explanation: 'Active voice emphasizes the doer of the action, making sentences clear and strong.', example: 'Active: Galileo observed Jupiter\'s moons.' }
    ],
    conversations: [
      { speaker: 'Teacher', nativeText: 'Who can explain the significance of the scientific method?', englishText: 'Who can explain the significance of the scientific method?', teluguText: 'శాస్త్రీయ పద్ధతి యొక్క ప్రాముఖ్యతను ఎవరు వివరిస్తారు?' },
      { speaker: 'Student', nativeText: 'It ensures our conclusions are backed by repeatable experimental evidence.', englishText: 'It ensures our conclusions are backed by repeatable experimental evidence.', teluguText: 'ప్రయోగాల ద్వారా నిజమైన రుజువులు దొరికేలా ఇది చేస్తుంది.' }
    ],
    practiceExercises: [
      {
        question: 'Choose the correct form: "Neither the teacher nor the students ____ present."',
        teluguPrompt: 'Select correct verb agreement:',
        options: ['were', 'was', 'is', 'be'],
        correctAnswer: 0,
        explanation: 'When subjects are joined by "neither...nor", the verb agrees with the closer subject ("students" is plural -> were).'
      },
      {
        question: 'What does the idiom "Hit the nail on the head" mean?',
        teluguPrompt: 'Idiom meaning test:',
        options: ['To describe exactly what is causing a situation', 'To injure one\'s finger with a hammer', 'To build a wooden shelf', 'To give up easily'],
        correctAnswer: 0,
        explanation: '"Hit the nail on the head" means finding the exact correct answer or truth.'
      }
    ],
    webLinks: [
      { title: 'Scripps National Spelling Bee Practice Hub', url: 'https://spellingbee.com/', badge: 'Spelling Bee', description: 'Official word club, pronunciation guides, and roots study tools.' },
      { title: 'Khan Academy Grammar & English Reading', url: 'https://www.khanacademy.org/humanities/grammar', badge: 'Khan Academy', description: 'Comprehensive grammar, punctuation, and parts of speech lessons.' },
      { title: 'PBS Kids US Reading Games', url: 'https://pbskids.org/games/reading', badge: 'PBS Kids', description: 'Fun phonics and story reading adventures for kids.' }
    ],
    videoLinks: [
      { title: 'American English Phonics & Pronunciation (IPA Secrets)', url: 'https://www.youtube.com/watch?v=us-english-phonics', duration: '22 min', channel: 'Rachel\'s English' },
      { title: 'Top 100 Spelling Bee Words Mastered with Etymology', url: 'https://www.youtube.com/watch?v=spelling-bee-top100', duration: '35 min', channel: 'Oxford English Club' }
    ],
    books: [
      { title: 'The Elements of Style (Classic English Composition)', author: 'William Strunk Jr.', downloadUrl: 'https://www.gutenberg.org/ebooks/37134', previewUrl: 'https://www.gutenberg.org/', type: 'Grammar' }
    ]
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語 (Nihongo - Japan)',
    flag: '🇯🇵',
    speechLangCode: 'ja-JP',
    country: 'Japan',
    description: 'Language of robotics, high technology, anime, polite etiquette, and Zen culture. Written with Hiragana, Katakana, and Kanji.',
    teluguDescription: 'రోబోటిక్స్, అనిమే, టెక్నాలజీ దేశం జపాన్ భాష - హిరగాన, కటకాన మరియు కంజీ లిపి.',
    alphabetInfo: {
      title: 'Japanese Writing Systems (3 Scripts)',
      script: 'Hiragana (ひらがな), Katakana (カタカナ), Kanji (漢字)',
      vowelsConsonants: '46 basic Hiragana syllabary characters, 46 Katakana characters, 2,136 Joyo Kanji',
      sampleLetters: [
        { char: 'あ', phonetic: 'A', meaning: 'Hiragana "A"' },
        { char: 'い', phonetic: 'I', meaning: 'Hiragana "I"' },
        { char: 'う', phonetic: 'U', meaning: 'Hiragana "U"' },
        { char: 'え', phonetic: 'E', meaning: 'Hiragana "E"' },
        { char: 'お', phonetic: 'O', meaning: 'Hiragana "O"' },
        { char: '日', phonetic: 'Nichi / Hi', meaning: 'Sun / Day (Kanji)' },
        { char: '本', phonetic: 'Hon', meaning: 'Book / Origin (Kanji)' },
        { char: '学', phonetic: 'Gaku', meaning: 'Study / Learn (Kanji)' }
      ]
    },
    vocabCategories: [
      {
        category: 'Daily Greetings & Etiquette (あいさつ)',
        words: [
          { native: 'こんにちは', phonetic: 'Konnichiwa', english: 'Hello / Good Afternoon', telugu: 'నమస్తే', hindi: 'नमस्ते', example: '皆さん、こんにちは！ (Hello everyone!)' },
          { native: 'ありがとうございます', phonetic: 'Arigatou Gozaimasu', english: 'Thank you very much (Polite)', telugu: 'చాలా ధన్యవాదాలు', hindi: 'बहुत बहुत धन्यवाद', example: 'ご親切にありがとうございます。 (Thank you for your kindness.)' },
          { native: 'おはようございます', phonetic: 'Ohayou Gozaimasu', english: 'Good Morning (Polite)', telugu: 'శుభోదయం', hindi: 'सुप्रभात', example: '先生、おはようございます！ (Good morning teacher!)' },
          { native: 'がんばってください', phonetic: 'Ganbatte kudasai', english: 'Please do your best / Good luck!', telugu: 'ఉత్సాహంగా శ్రమించండి', hindi: 'पूरी लगन से काम करें', example: '試験がんばってください！ (Good luck on your exam!)' }
        ]
      },
      {
        category: 'Science, Anime & Tech Terms',
        words: [
          { native: 'ロボット', phonetic: 'Robotto', english: 'Robot', telugu: 'రోబోట్', hindi: 'रोबोट', example: '日本のロボット技術 (Japan\'s robotics technology)' },
          { native: '科学', phonetic: 'Kagaku', english: 'Science', telugu: 'సైన్స్ / విజ్ఞానం', hindi: 'विज्ञान', example: '科学の実験 (Science experiment)' },
          { native: '未来', phonetic: 'Mirai', english: 'Future', telugu: 'భవిష్యత్తు', hindi: 'भविष्य', example: '明るい未来 (Bright future)' }
        ]
      }
    ],
    grammarRules: [
      { title: 'Particle Markers (助詞)', explanation: 'Particles like は (wa - topic), を (o - object), に (ni - destination/time) show word roles.', example: 'わたし は がくせい です (Watashi wa gakusei desu - I am a student).' },
      { title: 'SOV Sentence Order', explanation: 'The verb always goes at the very end of the Japanese sentence.', example: 'ほん を よみます (Hon o yomimasu - I read a book).' }
    ],
    conversations: [
      { speaker: 'Sensei', nativeText: '宿題は終わりましたか？ (Shukudai wa owarimashita ka?)', englishText: 'Did you finish the homework?', teluguText: 'హోమ్‌వర్క్ పూర్తి చేశావా?' },
      { speaker: 'Student', nativeText: 'はい、ぜんぶ終わりました！ (Hai, zenbu owarimashita!)', englishText: 'Yes, I finished everything!', teluguText: 'అవును, మొత్తం పూర్తి చేశాను!' }
    ],
    practiceExercises: [
      {
        question: 'Which Japanese script is primarily used for foreign loan words like "Robotto" and "Konpyuutaa"?',
        teluguPrompt: 'విదేశీ పదాల కోసం ఏ జపనీస్ లిపి వాడతారు?',
        options: ['Katakana (カタカナ)', 'Hiragana (ひらがな)', 'Kanji (漢字)', 'Romaji'],
        correctAnswer: 0,
        explanation: 'Katakana is the angular script specialized for foreign borrowed terms, scientific names, and onomatopoeia.'
      },
      {
        question: 'What does "Arigatou Gozaimasu" mean?',
        teluguPrompt: '"అరిగాతో గొజైమాసు" అర్థం ఏమిటి?',
        options: ['Thank you very much (Polite)', 'Good morning', 'Excuse me', 'Goodbye'],
        correctAnswer: 0,
        explanation: 'Arigatou Gozaimasu is the standard polite Japanese phrase for expressing deep gratitude.'
      }
    ],
    webLinks: [
      { title: 'NHK WORLD-JAPAN Easy Japanese Course (Free)', url: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/', badge: 'Official NHK', description: 'Free Japanese audio lessons with manga illustrations and audio dialogues.' },
      { title: 'Tofugu Ultimate Hiragana & Katakana Guides', url: 'https://www.tofugu.com/japanese/learn-hiragana/', badge: 'Tofugu', description: 'World-renowned mnemonic memory guide to master Japanese alphabets in 1 day.' },
      { title: 'Duolingo Japanese Online', url: 'https://www.duolingo.com/course/ja/en/Learn-Japanese', badge: 'Duolingo', description: 'Gamified bite-sized Japanese practice lessons.' }
    ],
    videoLinks: [
      { title: 'Learn ALL Hiragana in 1 Hour (How to Read & Write)', url: 'https://www.youtube.com/watch?v=6p9Il_j0zjc', duration: '60 min', channel: 'JapanesePod101' },
      { title: 'NHK Easy Japanese Animated Conversations Series', url: 'https://www.youtube.com/watch?v=nhk-japanese-conversation', duration: '15 min', channel: 'NHK World Japan' }
    ],
    books: [
      { title: 'Genki I: An Integrated Course in Elementary Japanese', author: 'The Japan Times', downloadUrl: 'https://www3.nhk.or.jp/nhkworld/en/learnjapanese/', previewUrl: 'https://www3.nhk.or.jp/', type: 'Official' }
    ]
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch (Germany & Central Europe)',
    flag: '🇩🇪',
    speechLangCode: 'de-DE',
    country: 'Germany, Austria & Switzerland',
    description: 'Language of engineering excellence, automotive innovation, philosophy, and European scientific universities.',
    teluguDescription: 'ఇంజనీరింగ్, సైన్స్, ఆటోమొబైల్ ఆవిష్కరణల దేశం జర్మనీ భాష.',
    alphabetInfo: {
      title: 'German Alphabet (Das deutsche Alphabet)',
      script: 'Latin Script with Umlauts (Ä, Ö, Ü, ß)',
      vowelsConsonants: '26 Standard Latin letters + 3 Umlauts (Ä, Ö, Ü) + 1 Eszett (ß)',
      sampleLetters: [
        { char: 'A', phonetic: 'Ah', meaning: 'Apfel (Apple)' },
        { char: 'B', phonetic: 'Bay', meaning: 'Buch (Book)' },
        { char: 'C', phonetic: 'Tsay', meaning: 'Computer' },
        { char: 'Ä', phonetic: 'Air', meaning: 'Ärzte (Doctors)' },
        { char: 'Ö', phonetic: 'Eu', meaning: 'Öl (Oil)' },
        { char: 'Ü', phonetic: 'Uee', meaning: 'Übung (Exercise)' },
        { char: 'ß', phonetic: 'Double S', meaning: 'Straße (Street)' }
      ]
    },
    vocabCategories: [
      {
        category: 'Greetings & Basics (Begrüßungen)',
        words: [
          { native: 'Guten Tag', phonetic: 'GOO-ten tahk', english: 'Good day / Hello', telugu: 'శుభదినం / నమస్కారం', hindi: 'नमस्ते', example: 'Guten Tag, Herr Müller! (Good day Mr. Müller!)' },
          { native: 'Danke schön', phonetic: 'DAHN-kuh shern', english: 'Thank you very much', telugu: 'చాలా ధన్యవాదాలు', hindi: 'बहुत धन्यवाद', example: 'Vielen Dank für Ihre Hilfe! (Many thanks for your help!)' },
          { native: 'Guten Morgen', phonetic: 'GOO-ten MOR-gen', english: 'Good morning', telugu: 'శుభోదయం', hindi: 'सुप्रभात', example: 'Guten Morgen allerseits! (Good morning everyone!)' },
          { native: 'Auf Wiedersehen', phonetic: 'owf VEE-der-zay-en', english: 'Goodbye (Formal)', telugu: 'మళ్ళీ కలుద్దాం', hindi: 'फिर मिलेंगे', example: 'Auf Wiedersehen und schönen Tag! (Goodbye and have a nice day!)' }
        ]
      },
      {
        category: 'Engineering & Sciences (Wissenschaft & Technik)',
        words: [
          { native: 'Wissenschaft', phonetic: 'VIS-en-shaft', english: 'Science & Research', telugu: 'విజ్ఞానశాస్త్రం', hindi: 'विज्ञान', example: 'Wissenschaft treibt Innovation an. (Science drives innovation.)' },
          { native: 'Ingenieur', phonetic: 'in-zhe-NYUR', english: 'Engineer', telugu: 'ఇంజనీర్', hindi: 'इंजीनियर', example: 'Der Ingenieur baut eine Brücke. (The engineer builds a bridge.)' },
          { native: 'Erfindung', phonetic: 'er-FIN-dung', english: 'Invention', telugu: 'ఆవిష్కరణ', hindi: 'आविष्कार', example: 'Eine großartige Erfindung! (A magnificent invention!)' }
        ]
      }
    ],
    grammarRules: [
      { title: 'Capitalization of All Nouns (Großschreibung)', explanation: 'In German, EVERY single noun is ALWAYS capitalized, regardless of where it appears in a sentence.', example: 'Das Buch (The book), Der Computer (The computer), Die Schule (The school).' },
      { title: 'Three Genders of Nouns (Der, Die, Das)', explanation: 'Masculine = Der (Der Mann), Feminine = Die (Die Frau), Neuter = Das (Das Kind).', example: 'Der Tisch (The table - masc), Die Sonne (The sun - fem), Das Auto (The car - neuter).' }
    ],
    conversations: [
      { speaker: 'Professor', nativeText: 'Wie läuft dein Wissenschaftsprojekt? (How is your science project going?)', englishText: 'How is your science project going?', teluguText: 'నీ సైన్స్ ప్రాజెక్ట్ ఎలా సాగుతోంది?' },
      { speaker: 'Student', nativeText: 'Es läuft hervorragend, danke! (It is going excellently, thank you!)', englishText: 'It is going excellently, thank you!', teluguText: 'చాలా అద్భుతంగా సాగుతోంది, ధన్యవాదాలు!' }
    ],
    practiceExercises: [
      {
        question: 'In German grammar, what is the golden rule regarding all nouns (Substantive)?',
        teluguPrompt: 'జర్మన్ వ్యాకరణంలో నామవాచకాల ముఖ్య నియమం ఏమిటి?',
        options: ['All nouns are ALWAYS capitalized with a capital first letter', 'All nouns end with -e', 'Nouns have no gender', 'Nouns only appear at the end'],
        correctAnswer: 0,
        explanation: 'Every German noun is capitalized (e.g. das Buch, der Computer, das Auto).'
      },
      {
        question: 'Which definite article is used for masculine nouns in the nominative case?',
        teluguPrompt: 'పుల్లింగ నామవాచకాలకు ఏ ఆర్టికల్ వాడతారు?',
        options: ['Der', 'Die', 'Das', 'Den'],
        correctAnswer: 0,
        explanation: '"Der" is masculine (e.g. Der Mann, Der Tisch), "Die" is feminine, "Das" is neuter.'
      }
    ],
    webLinks: [
      { title: 'Deutsche Welle (DW) Deutsch Lernen Portal (Free)', url: 'https://learngerman.dw.com/', badge: 'Official DW', description: 'Free comprehensive German courses from A1 to C1 with telenovelas, video exercises, and audio trainer.' },
      { title: 'Goethe-Institut German Learning & Exams Hub', url: 'https://www.goethe.de/en/spr/ueb.html', badge: 'Goethe-Institut', description: 'Free exercises, games, apps, and podcasts for learning German from Germany\'s cultural institute.' },
      { title: 'Vokabeln.de German Vocabulary Trainer', url: 'https://www.vokabeln.de/', badge: 'Vocabulary', description: 'Interactive flashcards and pronunciation practice.' }
    ],
    videoLinks: [
      { title: 'German Alphabet (Das Alphabet) & Sounds Mastered in 10 Mins', url: 'https://www.youtube.com/watch?v=german-alphabet-hd', duration: '12 min', channel: 'Easy German' },
      { title: 'Nicos Weg A1 - Complete German Beginner Full Movie Course', url: 'https://www.youtube.com/watch?v=4-eDoThe6qo', duration: '100 min', channel: 'DW Deutsch Lernen' }
    ],
    books: [
      { title: 'Schritte International & DW A1 Study Workbook', author: 'Goethe & DW', downloadUrl: 'https://learngerman.dw.com/', previewUrl: 'https://learngerman.dw.com/', type: 'Official' }
    ]
  }
];
