export type SupportedLanguage = 'en' | 'te' | 'hi';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    te: string;
    hi: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Brand & Header
  appName: {
    en: 'SUPER PARENT',
    te: 'సూపర్ పేరెంట్',
    hi: 'सुपर पेरेंट'
  },
  tagline: {
    en: 'Smart Parent • Happy Child • Bright Future',
    te: 'స్మార్ట్ పేరెంట్ • ఆనందకరమైన పిల్లలు • ఉజ్వల భవిష్యత్తు',
    hi: 'स्मार्ट पेरेंट • खुशहाल बच्चे • उज्ज्वल भविष्य'
  },
  subTagline: {
    en: 'All-in-One Gurukul for Children & Parents • LKG to 10th Class',
    te: 'పిల్లలు మరియు తల్లిదండ్రుల కోసం సమగ్ర గురుకులం • ఎల్‌కేజీ నుండి 10వ తరగతి వరకు',
    hi: 'बच्चों और माता-पिता के लिए ऑल-इन-वन गुरुकुल • एलकेजी से 10वीं कक्षा'
  },
  officeLocation: {
    en: 'HO: Whitefield, Bengaluru | Branch: Visakhapatnam',
    te: 'ప్రధాన కార్యాలయం: వైట్‌ఫీల్డ్, బెంగళూరు | శాఖ: విశాఖపట్నం',
    hi: 'मुख्यालय: व्हाइटफील्ड, बेंगलुरु | शाखा: विशाखापट्टनम'
  },
  isoCertified: {
    en: 'ISO Certified • International Curriculum',
    te: 'ISO సర్టిఫైడ్ • అంతర్జాతీయ పాఠ్యప్రణాళిక',
    hi: 'आईएसओ प्रमाणित • अंतर्राष्ट्रीय पाठ्यक्रम'
  },
  plansStarting: {
    en: 'Plans ₹600 - ₹2,000',
    te: 'ప్లాన్లు ₹600 - ₹2,000',
    hi: 'प्लान्स ₹600 - ₹2,000'
  },

  // Navigation Items
  navHome: {
    en: 'Home',
    te: 'హోమ్',
    hi: 'होम'
  },
  navSuperStudent: {
    en: 'Super Student',
    te: 'సూపర్ స్టూడెంట్',
    hi: 'सुपर स्टूडेंट'
  },
  navKidsLab: {
    en: 'Kids Lab & 3D Anatomy',
    te: 'కిడ్స్ ల్యాబ్ & 3D అనాటమీ',
    hi: 'किड्स लैब और 3D एनाटॉमी'
  },
  navPracticeMaster: {
    en: 'Practice Master Zone',
    te: 'ప్రాక్టీస్ మాస్టర్ జోన్',
    hi: 'प्रैक्टिस मास्टर जोन'
  },
  navClassroom: {
    en: 'Classroom & Interaction Room',
    te: 'ఆన్‌లైన్ క్లాస్‌రూమ్ & ఇంటరాక్షన్ రూమ్',
    hi: 'ऑनलाइन क्लासरूम और इंटरैक्शन रूम'
  },
  navEducation: {
    en: 'Education Hub',
    te: 'విద్యా కేంద్రం',
    hi: 'शिक्षा केंद्र'
  },
  navSanskar: {
    en: 'Values & Sanskar',
    te: 'సంస్కారాలు & భగవద్గీత',
    hi: 'संस्कार और मूल्य'
  },
  navStories: {
    en: 'Moral Stories',
    te: 'నీతి కథలు',
    hi: 'नैतिक कहानियाँ'
  },
  navParenting: {
    en: 'Parenting Hub',
    te: 'పేరెంటింగ్ హబ్',
    hi: 'पेरेंटिंग हब'
  },
  navInnovation: {
    en: 'Innovation Lab',
    te: 'ఇన్నోవేషన్ ల్యాబ్',
    hi: 'इनोवेशन लैब'
  },
  navGames: {
    en: 'Games & Activities',
    te: 'ఆటలు & యాక్టివిటీస్',
    hi: 'खेल और गतिविधियाँ'
  },
  navGrowth: {
    en: 'Child Growth Map',
    te: 'పిల్లల ప్రగతి మ్యాప్',
    hi: 'बाल विकास प्रगति मैप'
  },
  navTalentMarketplace: {
    en: 'Talent & Skills Marketplace',
    te: 'ప్రతిభ & నైపుణ్యాల మార్కెట్‌ప్లేస్',
    hi: 'प्रतिभा और कौशल बाज़ार'
  },
  navMarketplace: {
    en: 'Marketplace',
    te: 'మార్కెట్‌ప్లేస్',
    hi: 'मार्केटप्लेस'
  },
  navShowcase: {
    en: 'Student Showcase',
    te: 'స్టూడెంట్ షోకేస్',
    hi: 'स्टूडेंट शोकेस'
  },
  navLanguageLab: {
    en: 'World Language Lab',
    te: 'ప్రపంచ భాషా ప్రయోగశాల',
    hi: 'विश्व भाषा प्रयोगशाला'
  },
  navGlobal: {
    en: 'Global Learning',
    te: 'గ్లోబల్ లెర్నింగ్',
    hi: 'ग्लोबल लर्निंग'
  },
  navPricing: {
    en: 'Plans & Fee',
    te: 'ఫీజు & ప్లాన్లు',
    hi: 'प्लान्स और शुल्क'
  },
  navOfflineHub: {
    en: 'Offline Library & Cache',
    te: 'ఆఫ్‌లైన్ లైబ్రరీ & కాష్',
    hi: 'ऑफ़लाइन लाइब्रेरी और कैश'
  },
  navAdmin: {
    en: 'Admin Portal',
    te: 'అడ్మిన్ పోర్టల్',
    hi: 'एडमिन पोर्टल'
  },
  navTesting: {
    en: 'Diagnostic Testing',
    te: 'సిస్టమ్ టెస్టింగ్',
    hi: 'सिस्टम टेस्टिंग'
  },
  navLogin: {
    en: 'Login / Switch Role',
    te: 'లాగిన్ / రోల్ మార్చండి',
    hi: 'लॉगिन / भूमिका बदलें'
  },

  // Common Action Buttons & Labels
  askSuperAI: {
    en: 'Ask Super AI',
    te: 'సూపర్ AI ని అడగండి',
    hi: 'सुपर AI से पूछें'
  },
  generateCertificate: {
    en: 'Generate Gurukul Certificate',
    te: 'గురుకుల సర్టిఫికేట్ పొందండి',
    hi: 'गुरुकुल प्रमाणपत्र प्राप्त करें'
  },
  exploreCourses: {
    en: 'Explore Free Courses',
    te: 'ఉచిత కోర్సులను చూడండి',
    hi: 'मुफ़्त पाठ्यक्रम देखें'
  },
  joinLiveClass: {
    en: 'Join Live Classroom',
    te: 'లైవ్ క్లాస్‌రూమ్‌లో చేరండి',
    hi: 'लाइव क्लासरूम में जुड़ें'
  },
  zoomClassroom: {
    en: 'Zoom Meeting Room',
    te: 'జూమ్ మీటింగ్ రూమ్',
    hi: 'ज़ूम मीटिंग रूम'
  },
  googleClassroom: {
    en: 'Google Classroom',
    te: 'గూగుల్ క్లాస్‌రూమ్',
    hi: 'गूगल क्लासरूम'
  },
  fullAccessKey: {
    en: '100% Master Access',
    te: '100% మాస్టర్ యాక్సెస్',
    hi: '100% मास्टर एक्सेस'
  },
  offlineReady: {
    en: 'Offline Ready (Cached)',
    te: 'ఆఫ్‌లైన్ సిద్ధం (కాష్ చేయబడింది)',
    hi: 'ऑफ़लाइन तैयार (कैश्ड)'
  },
  syncCacheNow: {
    en: 'Sync & Cache Content',
    te: 'కంటెంట్‌ను డౌన్‌లోడ్/కాష్ చేయండి',
    hi: 'कंटेंट डाउनलोड/कैश करें'
  },
  selectLanguage: {
    en: 'Language / భాష / भाषा',
    te: 'భాష ఎంచుకోండి',
    hi: 'भाषा चुनें'
  },
  roleStudent: {
    en: 'Student',
    te: 'విద్యార్థి',
    hi: 'विद्यार्थी'
  },
  roleParent: {
    en: 'Parent',
    te: 'తల్లిదండ్రులు',
    hi: 'अभिभावक'
  },
  roleAdmin: {
    en: 'Admin',
    te: 'అడ్మిన్',
    hi: 'एडमिन'
  },
  goBack: {
    en: 'Go Back',
    te: 'వెనక్కి వెళ్ళండి',
    hi: 'पीछे जाएँ'
  },
  homeReturn: {
    en: 'Return to Home',
    te: 'హోమ్‌కు తిరిగి వెళ్ళండి',
    hi: 'होम पर वापस जाएँ'
  },
  filterByBoard: {
    en: 'Filter by Syllabus Board',
    te: 'సిలబస్ బోర్డ్ వారీగా ఫిల్టర్ చేయండి',
    hi: 'बोर्ड के अनुसार फ़िल्टर करें'
  },
  freeWebsitesAndNotes: {
    en: 'Free Official Websites, E-Books & Revision Notes',
    te: 'ఉచిత అధికారిక వెబ్‌సైట్లు, ఈ-బుక్స్ & రివిజన్ నోట్స్',
    hi: 'मुफ़्त आधिकारिक वेबसाइटें, ई-बुक्स और रिविज़न नोट्स'
  }
};

export function getTranslation(key: string, lang: SupportedLanguage = 'en'): string {
  if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
    return TRANSLATIONS[key][lang];
  }
  if (TRANSLATIONS[key] && TRANSLATIONS[key]['en']) {
    return TRANSLATIONS[key]['en'];
  }
  return key;
}
