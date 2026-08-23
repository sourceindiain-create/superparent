import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  Brain, 
  Bone, 
  Wind, 
  Utensils, 
  Eye, 
  Activity, 
  Sparkles, 
  Video, 
  Music, 
  FileText, 
  RefreshCw, 
  ExternalLink, 
  Globe, 
  Bot, 
  CheckCircle2, 
  Layers, 
  Compass, 
  Sliders, 
  Scissors, 
  Mic, 
  Volume2, 
  Play, 
  Pause,
  RotateCcw,
  BookOpen,
  Award,
  Zap,
  Bookmark,
  Landmark,
  TreePine,
  Dog,
  HeartHandshake,
  Search,
  Check,
  Copy,
  ChevronRight,
  SunMedium,
  Flower2,
  Atom,
  FlaskConical,
  Cpu
} from 'lucide-react';
import { MediaLinkModal } from './MediaLinkModal';

interface KidsLabProps {
  onAskAI?: (query: string) => void;
}

export type KidsExplorerTab = 
  | 'science-simulations'
  | 'spiritual-grandhas'
  | 'telugu-rhymes-slokas'
  | 'animals'
  | 'anatomy'
  | 'plants'
  | 'history-monuments'
  | 'ai-apps'
  | 'quiz';

export interface ScienceSimulationItem {
  id: string;
  title: string;
  teluguTitle: string;
  platform: 'PhET Interactive Simulations' | 'Javalab.org';
  platformLogo: string;
  badge: string;
  badgeColor: string;
  subject: 'Physics' | 'Chemistry' | 'Biology' | 'Earth & Space' | 'Math';
  icon: any;
  color: string;
  bgLight: string;
  borderColor: string;
  url: string;
  description: string;
  teluguDescription: string;
  interactiveControls: string[];
  audioNarration: string;
}

export interface AnimalItem {
  id: string;
  name: string;
  teluguName: string;
  scientificName: string;
  category: 'mammal' | 'marine' | 'reptile' | 'bird' | 'prehistoric';
  icon: string;
  sound: string;
  speed: string;
  lifespan: string;
  habitat: string;
  diet: string;
  funFact: string;
  teluguFact: string;
  model3DUrl: string;
  audioNarration: string;
}

export interface PlantItem {
  id: string;
  name: string;
  teluguName: string;
  partType: 'cell' | 'tree' | 'flower' | 'process';
  icon: string;
  lifespan: string;
  keyFeature: string;
  description: string;
  teluguDescription: string;
  model3DUrl: string;
  audioNarration: string;
}

export interface MonumentItem {
  id: string;
  name: string;
  teluguName: string;
  period: string;
  location: string;
  builder: string;
  significance: string;
  teluguSignificance: string;
  model3DUrl: string;
  audioNarration: string;
}

export interface SacredGrandhaItem {
  id: string;
  title: string;
  teluguTitle: string;
  tradition: 'vedic' | 'christian' | 'islamic' | 'folklore';
  categoryBadge: string;
  badgeColor: string;
  versesCount: string;
  summary: string;
  teluguSummary: string;
  moral: string;
  keyChapters: { name: string; teluguName: string; story: string }[];
  audioNarration: string;
  externalLink: string;
}

export interface RhymeSlokaItem {
  id: string;
  title: string;
  teluguTitle: string;
  type: 'sloka' | 'rhyme' | 'satakam';
  sanskritVerse?: string;
  teluguLyrics: string;
  englishMeaning: string;
  deityOrTheme: string;
  audioNarration: string;
}

export interface AppTool {
  id: string;
  title: string;
  teluguTitle: string;
  category: 'video' | 'audio' | 'pdf' | 'converter';
  icon: any;
  color: string;
  bgLight: string;
  badge: string;
  description: string;
  url: string;
  useCase: string;
}

export const KidsLab: React.FC<KidsLabProps> = ({ onAskAI }) => {
  const [activeTab, setActiveTab] = useState<KidsExplorerTab>('spiritual-grandhas');
  const [selectedOrgan, setSelectedOrgan] = useState<string>('heart');
  const [selectedAnimal, setSelectedAnimal] = useState<string>('tiger');
  const [selectedGrandha, setSelectedGrandha] = useState<string>('ramayanam');
  const [selectedRhyme, setSelectedRhyme] = useState<string>('sloka-shuklam');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Audio Speech Synthesis State
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [currentAudioText, setCurrentAudioText] = useState<string>('');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Quiz State
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Science Simulations State
  const [selectedSimPlatform, setSelectedSimPlatform] = useState<'all' | 'PhET Interactive Simulations' | 'Javalab.org'>('all');
  const [selectedSimSubject, setSelectedSimSubject] = useState<'all' | 'Physics' | 'Chemistry' | 'Biology' | 'Earth & Space' | 'Math'>('all');

  // Modal State
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

  // Audio Playback Function (TTS)
  const handlePlayAudio = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isPlayingAudio && currentAudioText === text) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = playbackSpeed;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    window.speechSynthesis.speak(utterance);
    setCurrentAudioText(text);
    setIsPlayingAudio(true);
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  // --- 1. ORGAN & ANATOMY DATA ---
  const organList = [
    {
      id: 'heart',
      name: 'Human Heart (గుండె)',
      teluguName: 'మానవ హృదయం - రక్తాభిసరణ వ్యవస్థ',
      system: 'Cardiovascular System',
      icon: Heart,
      color: 'text-rose-600',
      bgLight: 'bg-rose-50',
      borderColor: 'border-rose-200',
      funFact: 'Your heart beats around 100,000 times a day and pumps 7,500 liters of blood!',
      description: 'The heart is a muscular organ about the size of a fist. It pumps oxygen-rich blood through arteries to every cell in the human body.',
      anatomyZoneUrl: 'https://anatomyzone.com/3d/cardiovascular-system/',
      keyFunctions: ['Pumps oxygenated blood to all organs', 'Receives deoxygenated blood through vena cava', 'Four chambers: Left/Right Atria & Ventricles', 'Contains mitral, tricuspid & aortic valves']
    },
    {
      id: 'brain',
      name: 'Human Brain (మెదడు)',
      teluguName: 'మానవ మెదడు - నాడీ వ్యవస్థ',
      system: 'Nervous System',
      icon: Brain,
      color: 'text-purple-600',
      bgLight: 'bg-purple-50',
      borderColor: 'border-purple-200',
      funFact: 'The human brain has 86 billion neurons and generates about 20 watts of electrical power!',
      description: 'The control center of the central nervous system. It processes thoughts, memories, emotions, movements, and subconscious reflexes.',
      anatomyZoneUrl: 'https://anatomyzone.com/3d/nervous-system/',
      keyFunctions: ['Controls memory, speech and conscious thoughts', 'Cerebellum coordinates voluntary muscle movements', 'Brainstem controls breathing, heart rate and sleep', 'Processes all sensory signals from eyes, ears, nose & skin']
    },
    {
      id: 'skeleton',
      name: 'Skeletal System (అస్థిపంజరం)',
      teluguName: 'మానవ ఎముకల వ్యవస్థ (206 ఎముకలు)',
      system: 'Musculoskeletal System',
      icon: Bone,
      color: 'text-amber-600',
      bgLight: 'bg-amber-50',
      borderColor: 'border-amber-200',
      funFact: 'Babies are born with ~300 bones, which fuse together into 206 bones in adulthood!',
      description: 'The structural framework of the body providing support, organ protection, mineral storage, and blood cell creation in bone marrow.',
      anatomyZoneUrl: 'https://anatomyzone.com/3d/skeletal-system/',
      keyFunctions: ['Skull protects brain, Rib cage protects heart & lungs', 'Femur (thigh bone) is the strongest & longest bone', 'Produces red & white blood cells in bone marrow', 'Enables body locomotion together with muscles & joints']
    },
    {
      id: 'lungs',
      name: 'Lungs & Respiration (ఊపిరితిత్తులు)',
      teluguName: 'శ్వాసకోశ వ్యవస్థ & ఆక్సిజన్ సరఫరా',
      system: 'Respiratory System',
      icon: Wind,
      color: 'text-sky-600',
      bgLight: 'bg-sky-50',
      borderColor: 'border-sky-200',
      funFact: 'Your lungs contain 300-500 million alveoli, spreading out to the size of a tennis court!',
      description: 'A pair of spongy, air-filled organs located on either side of the chest that take in oxygen and exhale carbon dioxide waste.',
      anatomyZoneUrl: 'https://anatomyzone.com/3d/respiratory-system/',
      keyFunctions: ['Absorbs pure oxygen into bloodstream', 'Excretes carbon dioxide gas produced by cells', 'Diaphragm muscle drives inhalation and exhalation', 'Mucus and cilia filter airborne dust and bacteria']
    }
  ];

  // --- 2. 3D ANIMALS & WILDLIFE DATA ---
  const animalList: AnimalItem[] = [
    {
      id: 'tiger',
      name: 'Royal Bengal Tiger',
      teluguName: 'రాయల్ బెంగాల్ పులి (జాతీయ జంతువు)',
      scientificName: 'Panthera tigris tigris',
      category: 'mammal',
      icon: '🐅',
      sound: 'Roarrr! (గర్జన)',
      speed: '65 km/h',
      lifespan: '10 - 15 Years',
      habitat: 'Mangroves, Dense Forests & Grasslands (Sundarbans)',
      diet: 'Carnivore (Deer, Wild Boar, Gaur)',
      funFact: 'No two tigers have the exact same stripe pattern — tiger stripes are as unique as human fingerprints!',
      teluguFact: 'పులి చారలు ప్రతి ఒక్కరికీ వేర్వేరుగా ఉంటాయి. మానవ వేలిముద్రల వలె ఏ రెండు పులుల చారలు ఒకేలా ఉండవు.',
      model3DUrl: 'https://sketchfab.com/models/tiger-3d',
      audioNarration: 'The Royal Bengal Tiger is the national animal of India. Tigers are solitary apex predators and extraordinary swimmers.'
    },
    {
      id: 'elephant',
      name: 'Asian Elephant',
      teluguName: 'ఆసియా ఏనుగు (గజరాజు)',
      scientificName: 'Elephas maximus',
      category: 'mammal',
      icon: '🐘',
      sound: 'Trumpet! (ఘీంకారం)',
      speed: '40 km/h',
      lifespan: '60 - 70 Years',
      habitat: 'Tropical Rainforests & Grasslands of India & SE Asia',
      diet: 'Herbivore (Grasses, Leaves, Bamboo, Bark, Fruits)',
      funFact: 'An elephant trunk contains over 40,000 individual muscles and can lift up to 350 kg!',
      teluguFact: 'ఏనుగు తొండంలో 40,000 కంటే ఎక్కువ కండరాలు ఉంటాయి. ఇది చిన్న సూది నుండి పెద్ద చెట్టు మొద్దుల వరకు ఎత్తగలదు.',
      model3DUrl: 'https://sketchfab.com/models/elephant-3d',
      audioNarration: 'The Asian Elephant is the largest land mammal in Asia. Elephants possess deep memory, complex emotions, and close family bonds.'
    },
    {
      id: 'dolphin',
      name: 'Bottlenose Dolphin',
      teluguName: 'డాల్ఫిన్ (సముద్ర స్నేహితుడు)',
      scientificName: 'Tursiops truncatus',
      category: 'marine',
      icon: '🐬',
      sound: 'Clicks & Whistles! (ఈలలు & శబ్దాలు)',
      speed: '35 km/h',
      lifespan: '40 - 50 Years',
      habitat: 'Warm Tropical Oceans & Coastal Waters',
      diet: 'Fish, Squid, and Crustaceans',
      funFact: 'Dolphins sleep with one eye open and half their brain awake to stay alert for predators and remember to breathe!',
      teluguFact: 'డాల్ఫిన్లు నిద్రపోయేటప్పుడు ఒక కన్ను తెరిచి ఉంచుతాయి, మెదడులో సగం మాత్రమే నిద్రిస్తుంది.',
      model3DUrl: 'https://sketchfab.com/models/dolphin-3d',
      audioNarration: 'Dolphins are highly intelligent marine mammals known for their playful behavior, echolocation navigation, and empathy.'
    },
    {
      id: 'trex',
      name: 'Tyrannosaurus Rex (T-Rex)',
      teluguName: 'డైనోసార్ - టి-రెక్స్ (పురాతన రాక్షసి బల్లి)',
      scientificName: 'Tyrannosaurus rex',
      category: 'prehistoric',
      icon: '🦖',
      sound: 'Thunderous Roar! (భయంకర గర్జన)',
      speed: '27 km/h',
      lifespan: '28 - 30 Years (66M Years ago)',
      habitat: 'Prehistoric North America River Valleys',
      diet: 'Carnivore (Triceratops, Hadrosaurs)',
      funFact: 'T-Rex had the strongest bite force of any terrestrial animal in Earth history — over 12,000 pounds per square inch!',
      teluguFact: 'టి-రెక్స్ దవడల బలం భూమి చరిత్రలోనే అత్యంత శక్తివంతమైనది. దీని ఒక్కో పన్ను 12 అంగుళాల పొడవుండేది.',
      model3DUrl: 'https://sketchfab.com/models/trex-3d',
      audioNarration: 'Tyrannosaurus Rex was a giant bipedal carnivorous dinosaur that lived during the late Cretaceous period 66 million years ago.'
    }
  ];

  // --- 3. 3D PLANTS & BOTANY DATA ---
  const plantList: PlantItem[] = [
    {
      id: 'photosynthesis',
      name: 'Photosynthesis & Chloroplast',
      teluguName: 'కిరణజన్య సంయోగక్రియ & హరితరేణువు',
      partType: 'process',
      icon: '🌿',
      lifespan: 'Continuous Biological Engine',
      keyFeature: 'Converts Sunlight + CO2 + Water into Glucose & Oxygen',
      description: 'Photosynthesis is the process by which green plants produce their own food using sunlight captured by chlorophyll in leaves.',
      teluguDescription: 'మొక్కలు సూర్యకాంతి, నీరు మరియు కార్బన్ డయాక్సైడ్ ఉపయోగించి ఆహారాన్ని తయారుచేసే ప్రక్రియ.',
      model3DUrl: 'https://sketchfab.com/models/plant-cell-3d',
      audioNarration: 'Photosynthesis powers almost all life on Earth by converting sunlight, carbon dioxide, and water into oxygen and glucose.'
    },
    {
      id: 'flower-anatomy',
      name: 'Parts of a Flower (పువ్వు నిర్మాణం)',
      teluguName: 'పుష్పం భాగాలు - పరాగ సంపర్కం',
      partType: 'flower',
      icon: '🌸',
      lifespan: 'Seasonal Blooming',
      keyFeature: 'Petals, Sepals, Stamen (Anther+Filament), Pistil (Stigma+Style+Ovary)',
      description: 'Flowers are the reproductive organs of flowering plants. Pollinators like bees transfer pollen to fertilize seeds.',
      teluguDescription: 'ఆకర్షక పత్రాలు, రక్షక పత్రాలు, కేసరావళి మరియు అండకోశం పుష్పంలోని ముఖ్య భాగాలు.',
      model3DUrl: 'https://sketchfab.com/models/flower-anatomy-3d',
      audioNarration: 'A flower consists of four main whorls: sepals, petals, stamens for pollen, and carpels containing the ovary.'
    },
    {
      id: 'banyan-tree',
      name: 'Sacred Banyan Tree (మర్రి చెట్టు)',
      teluguName: 'వటవృక్షం - జాతీయ వృక్షం (మర్రి చెట్టు)',
      partType: 'tree',
      icon: '🌳',
      lifespan: '500+ Years',
      keyFeature: 'Aerial Prop Roots extending into massive canopy',
      description: 'The National Tree of India (Ficus benghalensis), famous for its aerial roots that grow downwards into the ground to form new trunks.',
      teluguDescription: 'ఊడలతో విస్తరించే పవిత్ర వటవృక్షం. భారతదేశ జాతీయ వృక్షం.',
      model3DUrl: 'https://sketchfab.com/models/banyan-tree-3d',
      audioNarration: 'The Banyan Tree is the national tree of India, symbolizing eternal life due to its ever-expanding aerial prop roots.'
    }
  ];

  // --- 4. 3D MONUMENTS & HISTORY DATA ---
  const monumentList: MonumentItem[] = [
    {
      id: 'taj-mahal',
      name: 'Taj Mahal, Agra',
      teluguName: 'తాజ్ మహల్ (ప్రపంచ వింతలలో ఒకటి)',
      period: '1632 - 1653 CE (Mughal Era)',
      location: 'Agra, Uttar Pradesh, India',
      builder: 'Emperor Shah Jahan',
      significance: 'UNESCO World Heritage Site made of pure white Makrana marble with intricate floral pietra dura inlay work.',
      teluguSignificance: 'తెల్లని పాలరాతితో నిర్మించిన అద్భుత కట్టడం మరియు ప్రపంచ వారసత్వ సంపద.',
      model3DUrl: 'https://sketchfab.com/models/taj-mahal-3d',
      audioNarration: 'The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in Agra, commissioned by Shah Jahan.'
    },
    {
      id: 'hampi',
      name: 'Hampi Stone Chariot (Vijayanagara Empire)',
      teluguName: 'హంపి రాతి రథం (విజయనగర సామ్రాజ్యం)',
      period: '14th - 16th Century CE (Sri Krishna Devaraya)',
      location: 'Vijayanagara, Karnataka, India',
      builder: 'King Krishnadevaraya',
      significance: 'Architectural wonder dedicated to Garuda at Vittala Temple, featured on the Indian ₹50 banknote.',
      teluguSignificance: 'హంపిలోని విజయనగర చక్రవర్తుల శిల్పకళా వైభవం మరియు అద్భుత రాతి రథం.',
      model3DUrl: 'https://sketchfab.com/models/hampi-chariot-3d',
      audioNarration: 'The Stone Chariot in Hampi is a magnificent shrine carved to resemble a processional chariot dedicated to Garuda.'
    },
    {
      id: 'pyramids',
      name: 'Great Pyramids of Giza',
      teluguName: 'గిజా పిరమిడ్లు (పురాతన ఈజిప్ట్ వింత)',
      period: 'c. 2580 - 2560 BCE (Old Kingdom of Egypt)',
      location: 'Giza Plateau, Egypt',
      builder: 'Pharaoh Khufu',
      significance: 'Oldest and only surviving wonder of the Ancient World, constructed with over 2.3 million massive stone blocks.',
      teluguSignificance: '4,500 సంవత్సరాల క్రితం ఈజిప్టు ఫారోలు నిర్మించిన అద్భుత రాతి పిరమిడ్లు.',
      model3DUrl: 'https://sketchfab.com/models/giza-pyramids-3d',
      audioNarration: 'The Great Pyramid of Giza is the oldest of the Seven Wonders of the Ancient World, standing over 4,500 years.'
    }
  ];

  // --- 5. SACRED GRANDHAS, SCRIPTURES & MULTI-FAITH STORIES ---
  const grandhasList: SacredGrandhaItem[] = [
    {
      id: 'ramayanam',
      title: 'Bala Ramayanam (బాల రామాయణం)',
      teluguTitle: 'సంక్షేప బాల రామాయణం (6 కాండల కథలు & నీతులు)',
      tradition: 'vedic',
      categoryBadge: 'Vedic Epic',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      versesCount: '24,000 Slokas (6 Kandas)',
      summary: 'The life journey of Sri Rama exemplifying truth (Satyam), righteousness (Dharma), filial duty, loyalty, and bravery.',
      teluguSummary: 'ధర్మానికి ప్రతీకైన శ్రీరాముని పవిత్ర చరిత్ర, అయోధ్య నుండి లంక వరకు సాగిన విజయగాథ.',
      moral: 'Dharma Protects Those Who Protect It (ధర్మో రక్షతి రక్షితః). Truth and integrity always conquer evil.',
      keyChapters: [
        { name: '1. Bala Kanda', teluguName: 'బాలకాండ', story: 'Birth of Rama, sage Vishwamitra guidance, defeating Tataka, and breaking Shiva Dhanuss to marry Sita.' },
        { name: '2. Ayodhya Kanda', teluguName: 'అయోధ్యకాండ', story: 'Rama respectful acceptance of 14 years exile to fulfill his father promise without any bitterness.' },
        { name: '3. Aranya Kanda', teluguName: 'అరణ్యకాండ', story: 'Forest life, meeting sage Agastya, golden deer chase, and Ravana abduction of Sita.' },
        { name: '4. Kishkindha Kanda', teluguName: 'కిష్కింధకాండ', story: 'Friendship with Sugriva and devotion of Hanuman leading the search for Sita.' },
        { name: '5. Sundara Kanda', teluguName: 'సుందరకాండ', story: 'Hanuman heroic leap across the ocean to Lanka, meeting Mother Sita, and giving her Rama ring.' },
        { name: '6. Yuddha Kanda', teluguName: 'యుద్ధకాండ', story: 'Building the Rama Setu bridge, defeating Ravana, and returning to Ayodhya for coronation.' }
      ],
      audioNarration: 'Bala Ramayanam tells the immortal story of Prince Rama of Ayodhya, who embodied perfect character, truthfulness, and duty.',
      externalLink: 'https://www.valmikiramayan.net/'
    },
    {
      id: 'bhagavatham',
      title: 'Bala Bhagavatham (బాల భాగవతం)',
      teluguTitle: 'శ్రీకృష్ణ లీలలు, ప్రహ్లాద చరిత్ర & గజేంద్ర మోక్షం',
      tradition: 'vedic',
      categoryBadge: 'Krishna Leelas',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      versesCount: '18,000 Slokas (12 Skandhas)',
      summary: 'Sweet stories of Little Krishna in Gokula, dancing on serpent Kaliya, lifting Govardhana mountain, and devotion of Bhakta Prahlada.',
      teluguSummary: 'గోకులంలో చిన్ని కృష్ణుని వెన్నదొంగ లీలలు, పూతన సంహారం, కాళీయ మర్దనం మరియు గోవర్ధన గిరిధారి కథలు.',
      moral: 'Pure devotion, love, and courage remove all fear from the heart.',
      keyChapters: [
        { name: '1. Little Butter Thief (నవనీత చోరుడు)', teluguName: 'చిన్ని కృష్ణుని వెన్న దొంగతనం', story: 'Krishna steals butter to share with playful monkeys and shows the universe inside His mouth to mother Yashoda.' },
        { name: '2. Kaliya Mardhanam (కాళీయ మర్దనం)', teluguName: 'కాళీయ సర్పంపై నాట్యం', story: 'Krishna leaps into the Yamuna river to tame the venomous serpent Kaliya and restore pure waters.' },
        { name: '3. Govardhana Dharana (గోవర్ధన పర్వతం)', teluguName: 'గోవర్ధన గిరిని ఎత్తిన లీల', story: 'Krishna lifts the giant Govardhana hill on his little finger to shield all villagers and cows from rain.' },
        { name: '4. Bhakta Prahlada (భక్త ప్రహ్లాదుడు)', teluguName: 'నారసింహ అవతారం & ప్రహ్లాద భక్తి', story: 'Young Prahlada unwavering faith in Lord Narayana leads to Lord Narasimha manifestation.' }
      ],
      audioNarration: 'Bala Bhagavatham brings joy to children through the playful leelas of child Krishna and inspiring stories of young devotees.',
      externalLink: 'https://vedabase.io/en/library/sb/'
    },
    {
      id: 'gita-kids',
      title: 'Bal Bhagavad Gita (చిన్నారి భగవద్గీత)',
      teluguTitle: 'భగవద్గీత ముఖ్య శ్లోకాలు & విద్యార్థుల మనోశక్తి',
      tradition: 'vedic',
      categoryBadge: 'Mind & Duty',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      versesCount: '700 Verses (18 Chapters)',
      summary: 'Timeless guidance given by Lord Krishna to Arjuna on the battlefield of Kurukshetra on controlling the mind and performing duty without fear.',
      teluguSummary: 'కర్మయోగాన్ని, ఏకాగ్రతను మరియు మనస్సును అదుపులో ఉంచుకునే మార్గాన్ని తెలిపే దివ్య గీతామృతం.',
      moral: 'Focus on sincere effort and duty (Karma); do not be paralyzed by anxiety about results.',
      keyChapters: [
        { name: '1. Karmanye Vadhikaraste (కర్మణ్యేవాధికారస్తే)', teluguName: 'చాప్టర్ 2 - శ్లోకం 47', story: 'You have a right to perform your prescribed duty, but never to the fruits of action. Give your best effort every day.' },
        { name: '2. Mind Control like Wind (అసంశయం మహాబాహో)', teluguName: 'చాప్టర్ 6 - శ్లోకం 35', story: 'The restless mind can be mastered through regular practice (Abhyasa) and self-discipline (Vairagya).' },
        { name: '3. Universal Friendship (సర్వభూతహితే రతాః)', teluguName: 'చాప్టర్ 12 - శ్లోకం 4', story: 'A true student sees the divine in all living creatures and harms none.' }
      ],
      audioNarration: 'The Bhagavad Gita teaches students to stay calm, focused, and confident during exams, sports, and life challenges.',
      externalLink: 'https://holy-bhagavad-gita.org/'
    },
    {
      id: 'bible-kids',
      title: 'Holy Bible Stories for Kids (బైబిల్ కథలు)',
      teluguTitle: 'నోవా నావ, దావీదు-గొల్యాతు & దయగల సమరియుడు',
      tradition: 'christian',
      categoryBadge: 'Biblical Wisdom',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      versesCount: 'Old & New Testament Stories',
      summary: 'Inspiring moral parables including the creation, Noah Ark, young David defeating giant Goliath, and Jesus parables of love and forgiveness.',
      teluguSummary: 'సృష్టి ఆరంభం, నోవా నావ, చిన్నారి దావీదు విశ్వాసం మరియు దయతో కూడిన పరహిత జీవనం.',
      moral: 'Faith in God overcomes giants of fear. Treat your neighbors with kindness and forgiveness.',
      keyChapters: [
        { name: '1. Noah Ark (నోవా నావ)', teluguName: 'జలప్రళయం & రక్షణ నావ', story: 'Noah obeys God instructions to build a giant ark to save pairs of all animals during the great flood.' },
        { name: '2. David and Goliath (దావీదు & గొల్యాతు)', teluguName: 'చిన్నారి దావీదు విశ్వాస విజయం', story: 'Young shepherd boy David defeats giant warrior Goliath with just a sling, smooth stones, and faith in God.' },
        { name: '3. The Good Samaritan (దయగల సమరియుడు)', teluguName: 'ఆపదలో ఉన్నవారికి సాయం', story: 'A traveler stops to bandage wounds and help a stranger when others walked past.' }
      ],
      audioNarration: 'Children Bible stories illustrate how courage, kindness, and faith help everyday people do extraordinary good in the world.',
      externalLink: 'https://www.biblegateway.com/'
    },
    {
      id: 'quran-kids',
      title: 'Holy Quran Stories for Kids (ఖురాన్ కథలు)',
      teluguTitle: 'ప్రవక్తల కథలు, తల్లిదండ్రులపై గౌరవం & సత్యవాక్కు',
      tradition: 'islamic',
      categoryBadge: 'Quranic Morals',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      versesCount: '114 Surahs Moral Lessons',
      summary: 'Timeless parables of Prophet Ibrahim, gratitude in Surah Al-Fatiha, caring for parents, sharing food with the needy, and speaking truth.',
      teluguSummary: 'ప్రవక్తల సత్యనిష్ఠ, తల్లిదండ్రులను గౌరవించడం, పేదవారికి దానం చేయడం మరియు శాంతి మార్గం.',
      moral: 'Kindness (Ihsan), honesty in speech, and helping the poor are the highest virtues.',
      keyChapters: [
        { name: '1. Surah Al-Fatiha (సూరా అల్-ఫాతిహా)', teluguName: 'ప్రారంభ సూరా & ప్రార్థన', story: 'Opening chapter praising God as the most Gracious, most Merciful, asking for guidance on the straight path.' },
        { name: '2. Prophet Ibrahim Compassion', teluguName: 'ఇబ్రాహీమ్ సత్యనిష్ఠ', story: 'Prophet Ibrahim reflection on the sun, moon, and stars to discover the one Creator of all universe.' },
        { name: '3. Respect for Parents (తల్లిదండ్రులను సేవించడం)', teluguName: 'తల్లిదండ్రుల పట్ల దయ', story: 'Teaching that Paradise lies at the feet of mothers and one must speak to parents with tenderness.' }
      ],
      audioNarration: 'Stories from the Holy Quran encourage children to cultivate humility, truthfulness, and generous charity toward all beings.',
      externalLink: 'https://quran.com/'
    }
  ];

  // --- 6. TELUGU RHYMES & SLOKAS WITH AUDIO ---
  const rhymesAndSlokas: RhymeSlokaItem[] = [
    {
      id: 'sloka-shuklam',
      title: 'Ganesha Prayer: Shuklaambaradharam',
      teluguTitle: 'శుక్లాంబరధరం విష్ణుం (శ్రీ గణపతి ప్రార్థన)',
      type: 'sloka',
      sanskritVerse: 'శుక్లాంబరధరం విష్ణుం శశివర్ణం చతుర్భుజమ్ |\nప్రసన్నవదనం ధ్యాయేత్ సర్వవిఘ్నోపశాంతయే ||',
      teluguLyrics: 'తెల్లని వస్త్రములు ధరించినవాడు, చంద్రుని వంటి వర్ణము కలవాడు, నాలుగు చేతులు గలవాడు, ప్రసన్నమైన ముఖము గల గణపతిని అన్ని విఘ్నములు తొలగిపోవుటకై ధ్యానిస్తున్నాను.',
      englishMeaning: 'We meditate on Lord Ganesha, who wears white garments, is radiant like the full moon, possesses four arms and a pleasant countenance, for the removal of all obstacles.',
      deityOrTheme: 'Lord Ganesha (విఘ్నేశ్వరుడు)',
      audioNarration: 'Shuklaambaradharam Vishnum Shashi Varnam Chatur Bhujam, Prasanna Vadanam Dhyaayeth Sarva Vighnopa Shaantaye.'
    },
    {
      id: 'sloka-saraswathi',
      title: 'Saraswathi Vidya Mantra',
      teluguTitle: 'సరస్వతి నమస్తుభ్యం (విద్యా ప్రార్థన)',
      type: 'sloka',
      sanskritVerse: 'సరస్వతి నమస్తుభ్యం వరదే కామరూపిణి |\nవిద్యారంభం కరిష్యామి సిద్ధిర్భవతు మే సదా ||',
      teluguLyrics: 'వరములను ఇచ్చే ఓ సరస్వతీ దేవీ! నీకు నమస్కారము. నేను చదువు ప్రారంభిస్తున్నాను. నాకు ఎల్లప్పుడూ సకల విద్యా సిద్ధి కలుగుగాక!',
      englishMeaning: 'Salutations to Goddess Saraswathi, the giver of boons and embodiment of wisdom. As I begin my studies, may I always achieve success and clarity.',
      deityOrTheme: 'Goddess Saraswathi (చదువుల తల్లి)',
      audioNarration: 'Saraswathi Namasthubhyam Varade Kaama Roopini, Vidyaarambham Karishyaami Siddhir Bhavathu Me Sadaa.'
    },
    {
      id: 'rhyme-chandamama',
      title: 'Chandamama Raave (చందమామ రావే)',
      teluguTitle: 'చందమామ రావే జాబిల్లి రావే (తెలుగు బాలగేయం)',
      type: 'rhyme',
      teluguLyrics: 'చందమామ రావే.. జాబిల్లి రావే..\nకొండెక్కి రావే.. గోగుపూలు తేవే..\nబండెక్కి రావే.. బంతిపూలు తేవే..\nతేరుపై రావే.. తేనెపట్టు తేవే..\nమా పాపకు ముద్దులు పెట్టి పోవే!',
      englishMeaning: 'Come, O Moon! Come, little shining moon! Come climbing over the hills bringing gogu flowers! Ride in the chariot bringing sweet honeycomb and kiss our lovely child!',
      deityOrTheme: 'Traditional Telugu Lullaby & Rhyme',
      audioNarration: 'Chandamama raave, Jaabilli raave, Kondekki raave, Gogu poolu theve, Bandekki raave, Banthi poolu theve, Maa paapaku muddhulu petti pove!'
    },
    {
      id: 'satakam-vemana',
      title: 'Vemana Satakam: Uppu Kappurambu',
      teluguTitle: 'ఉప్పు కప్పురంబు నొక్క పోలిక నుండు (వేమన పద్యం)',
      type: 'satakam',
      teluguLyrics: 'ఉప్పు కప్పురంబు నొక్క పోలిక నుండు\nచూడ జూడ రుచుల జాడ వేరు\nపురుషులందు పుణ్యపురుషులు వేరయా\nవిశ్వదాభిరామ వినురవేమ!',
      englishMeaning: 'Salt and camphor look identical from outside, but when tasted, their nature is completely different. Similarly, among all human beings, noble and virtuous persons stand distinctly apart.',
      deityOrTheme: 'Moral Satakam by Yogi Vemana',
      audioNarration: 'Uppu kappurambu nokka polika nundu, Chuda jooda ruchula jaada veru, Purushulandu punya purushulu veraya, Vishwadaabhiraama vinuravema!'
    }
  ];

  // --- 7. 123APPS MEDIA CREATIVE TOOLS ---
  const appTools: AppTool[] = [
    {
      id: 'video-editor',
      title: 'Online Video Editor',
      teluguTitle: 'ఆన్‌లైన్ వీడియో ఎడిటర్',
      category: 'video',
      icon: Video,
      color: 'text-indigo-600',
      bgLight: 'bg-indigo-50',
      badge: 'Browser Based',
      description: 'Crop, add text, transitions, background music, and export school video presentations directly in browser.',
      url: 'https://online-video-cutter.com/',
      useCase: 'Best for science fair video projects and school speech recordings'
    },
    {
      id: 'vocal-remover',
      title: 'AI Vocal Remover & Karaoke',
      teluguTitle: 'ఏఐ వాయిస్ రిమూవర్ & కచేరీ ట్రాక్',
      category: 'audio',
      icon: Music,
      color: 'text-rose-600',
      bgLight: 'bg-rose-50',
      badge: 'AI Powered',
      description: 'Separate vocal singer tracks from instrumental music. Create instant karaoke tracks for Telugu rhymes and annual day performances.',
      url: 'https://vocalremover.org/',
      useCase: 'Create custom background music for singing poems and school drama'
    },
    {
      id: 'screen-recorder',
      title: 'Online Screen & Webcam Recorder',
      teluguTitle: 'స్క్రీన్ & వెబ్‌క్యామ్ రికార్డర్',
      category: 'video',
      icon: Mic,
      color: 'text-purple-600',
      bgLight: 'bg-purple-50',
      badge: 'No Install Needed',
      description: 'Record your computer screen along with voice and facecam to create coding tutorials and project presentations.',
      url: 'https://record-screen.online-video-cutter.com/',
      useCase: 'Record Scratch coding games and Math solving steps to submit to teachers'
    },
    {
      id: 'pdf-tools',
      title: 'All-in-One PDF Tool Suite',
      teluguTitle: 'పీడీఎఫ్ ఎడిటర్ & మెర్జ్ టూల్స్',
      category: 'pdf',
      icon: FileText,
      color: 'text-emerald-600',
      bgLight: 'bg-emerald-50',
      badge: 'Full Suite',
      description: 'Merge NCERT PDF notes, split chapters, compress textbook PDFs, and add annotations/signatures easily.',
      url: 'https://pdf.online/',
      useCase: 'Organize homework worksheets, combine notes, and highlight key formulas'
    }
  ];

  // --- 8. PHET & JAVALAB INTERACTIVE SCIENCE SIMULATIONS DATA ---
  const scienceSimulationsList: ScienceSimulationItem[] = [
    // --- PhET Interactive Simulations (University of Colorado) ---
    {
      id: 'phet-circuits',
      title: 'Circuit Construction Kit: DC (వర్చువల్ ఎలక్ట్రిక్ సర్క్యూట్)',
      teluguTitle: 'డీసీ ఎలక్ట్రికల్ సర్క్యూట్ నిర్మాణం & ఓమ్ నియమం',
      platform: 'PhET Interactive Simulations',
      platformLogo: 'PhET',
      badge: 'Interactive DC Circuits',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      subject: 'Physics',
      icon: Zap,
      color: 'text-cyan-600',
      bgLight: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      url: 'https://phet.colorado.edu/en/simulations/circuit-construction-kit-dc',
      description: 'Build virtual electrical circuits with batteries, light bulbs, resistors, switches, voltmeters, and ammeters. Observe real electron flow vs conventional current in real-time.',
      teluguDescription: 'బ్యాటరీలు, బల్బులు, రెసిస్టర్లు మరియు స్విచ్‌లతో కంప్యూటర్‌లో నేరుగా విద్యుత్ వలయాలను తయారు చేసి పరీక్షించే వర్చువల్ ల్యాబ్.',
      interactiveControls: ['Ohm\'s Law (V = IR)', 'Series & Parallel Connections', 'Ammeter & Voltmeter Probes', 'Short Circuit & Fire Safety Testing'],
      audioNarration: 'Circuit Construction Kit DC allows students to build real electrical circuits with batteries, lightbulbs, and switches while watching real electrons flow.'
    },
    {
      id: 'phet-build-atom',
      title: 'Build an Atom & Atomic Isotopes (పరమాణు నిర్మాణం)',
      teluguTitle: 'ప్రోటాన్లు, న్యూట్రాన్లు & ఎలక్ట్రాన్లతో పరమాణువు నిర్మాణం',
      platform: 'PhET Interactive Simulations',
      platformLogo: 'PhET',
      badge: 'Atomic Structure & Orbitals',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      subject: 'Chemistry',
      icon: Atom,
      color: 'text-indigo-600',
      bgLight: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      url: 'https://phet.colorado.edu/en/simulations/build-an-atom',
      description: 'Drag protons, neutrons, and electrons to build atoms and ions from scratch. See atomic mass, element name on the periodic table, and net charge update dynamically.',
      teluguDescription: 'ప్రోటాన్లు, న్యూట్రాన్లు, ఎలక్ట్రాన్లను లాగి పరమాణువును నిర్మించండి. ఆవర్తన పట్టికలో మూలకం పేరు, ద్రవ్యరాశి మరియు ఆవేశాన్ని గమనించండి.',
      interactiveControls: ['Bohr Orbital Model', 'Mass Number & Net Charge Gauge', 'Periodic Table Element Highlighter', 'Stable vs Radioactive Isotope Checker'],
      audioNarration: 'Build an Atom allows you to build custom chemical elements by adding protons, neutrons, and electrons to observe atomic stability and ionic charges.'
    },
    {
      id: 'phet-gravity-orbits',
      title: 'Gravity and Planetary Orbits (గురుత్వాకర్షణ & కక్ష్యలు)',
      teluguTitle: 'సూర్యుడు, భూమి, చంద్రుడు మరియు ఉపగ్రహాల గురుత్వాకర్షణ',
      platform: 'PhET Interactive Simulations',
      platformLogo: 'PhET',
      badge: 'Kepler & Newton Gravitation',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      subject: 'Earth & Space',
      icon: Globe,
      color: 'text-blue-600',
      bgLight: 'bg-blue-50',
      borderColor: 'border-blue-200',
      url: 'https://phet.colorado.edu/en/simulations/gravity-and-orbits',
      description: 'Simulate gravitational interactions between the Sun, Earth, Moon, and space satellites. Adjust mass, orbit radius, velocity vectors, and gravity force scales.',
      teluguDescription: 'సూర్యుడు, భూమి, చంద్రుడు మధ్య పనిచేసే గురుత్వాకర్షణ బలాన్ని, వాటి తిరిగే కక్ష్యలను 3D తరహాలో పరిశీలించే శాస్త్రీయ సిమ్యులేషన్.',
      interactiveControls: ['Adjust Planet & Sun Masses', 'Toggle Gravity On/Off', 'Velocity Vectors & Gravity Tracing Grid', 'Lunar Phases & Satellite Orbital Velocity'],
      audioNarration: 'Gravity and Orbits lets students experiment with celestial mechanics, changing the mass of the Sun or Earth to see orbital trajectories evolve.'
    },
    {
      id: 'phet-projectile',
      title: 'Projectile Motion & Trajectory Cannon (ప్రక్షేపక గమనం)',
      teluguTitle: 'ఫిరంగి గుండు ప్రక్షేపక గమనం & కోణాల పరీక్ష',
      platform: 'PhET Interactive Simulations',
      platformLogo: 'PhET',
      badge: 'Kinematics & Ballistics',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      subject: 'Physics',
      icon: Compass,
      color: 'text-amber-600',
      bgLight: 'bg-amber-50',
      borderColor: 'border-amber-200',
      url: 'https://phet.colorado.edu/en/simulations/projectile-motion',
      description: 'Blast cannonballs, pumpkins, and cars at various launch angles, initial speeds, mass, and air resistance to discover the parabola path and maximum range.',
      teluguDescription: 'ఫిరంగితో బంతులను వివిధ కోణాల్లో కాల్చి ఎత్తు, వేగం, దూరం మరియు గాలి నిరోధకతను కొలిచే గతిశాస్త్ర ప్రయోగం.',
      interactiveControls: ['Launch Angle & Initial Speed Sliders', 'Air Resistance & Drag Coefficient', 'Altitude, Time & Range Measuring Tape', 'Custom Projectile Mass & Diameter Selection'],
      audioNarration: 'Projectile Motion demonstrates how launch angle, gravitational acceleration, and initial speed govern the flight path of any thrown object.'
    },
    {
      id: 'phet-chemical-equations',
      title: 'Balancing Chemical Equations (రసాయన సమీకరణాలు)',
      teluguTitle: 'రసాయన సమీకరణాల తుల్యం & ద్రవ్యనిత్యత్వ నియమం',
      platform: 'PhET Interactive Simulations',
      platformLogo: 'PhET',
      badge: 'Conservation of Mass',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      subject: 'Chemistry',
      icon: FlaskConical,
      color: 'text-emerald-600',
      bgLight: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      url: 'https://phet.colorado.edu/en/simulations/balancing-chemical-equations',
      description: 'Master chemical reactions (Ammonia synthesis, Water splitting, Methane combustion) with visual molecule balance scales enforcing the law of conservation of mass.',
      teluguDescription: 'నీటి ఉత్పత్తి, అమ్మోనియా తయారీ సమీకరణాలను అణువుల త్రాసులతో సమతుల్యం చేసే సరదా గేమిఫైడ్ కెమిస్ట్రీ ల్యాబ్.',
      interactiveControls: ['Visual Molecule Balance Scales', 'Synthesis, Decomposition & Combustion Labs', 'Timed Chemical Game Challenges (Levels 1-3)', 'Instant Reactant vs Product Atom Counting'],
      audioNarration: 'Balancing Chemical Equations helps students master stoichiometric coefficients by seeing individual atoms balance on visual scale beams.'
    },

    // --- Javalab.org Interactive Science Simulations ---
    {
      id: 'javalab-light-refraction',
      title: 'Light Refraction & Snell\'s Law (కాంతి వక్రీభవనం)',
      teluguTitle: 'స్నెల్ నియమం, పట్టకం మరియు కాంతి వక్రీభవన గుణకం',
      platform: 'Javalab.org',
      platformLogo: 'Javalab',
      badge: 'Optics & Snell Law',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      subject: 'Physics',
      icon: Eye,
      color: 'text-purple-600',
      bgLight: 'bg-purple-50',
      borderColor: 'border-purple-200',
      url: 'https://javalab.org/en/refraction_en/',
      description: 'Explore light traveling through air, water, glass, and diamonds. Calculate Snell\'s Law (n₁ sin θ₁ = n₂ sin θ₂) and witness Total Internal Reflection and Critical Angles interactively.',
      teluguDescription: 'గాలి, నీరు, గాజు మరియు వజ్రంలో కాంతి ప్రయాణించే తీరు, సంపూర్ణ అంతర్గత పరావర్తనం మరియు స్నెల్ నియమాన్ని ప్రత్యక్షంగా చూడండి.',
      interactiveControls: ['Interactive Incident Angle Protractor', 'Custom Medium Refractive Index (n₁ & n₂)', 'Total Internal Reflection & Critical Angle', 'Prism Light Dispersion into 7 Colors (VIBGYOR)'],
      audioNarration: 'Light Refraction on Javalab lets you change refractive indexes across media and observe how light bends according to Snell\'s Law.'
    },
    {
      id: 'javalab-pendulum',
      title: 'Simple Pendulum & Energy Conservation (సాధారణ లోలకం)',
      teluguTitle: 'లోలకం డోలనాలు, ఆవర్తన కాలం & గతిజ-స్థితిజ శక్తులు',
      platform: 'Javalab.org',
      platformLogo: 'Javalab',
      badge: 'Harmonic Motion & Energy',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      subject: 'Physics',
      icon: Activity,
      color: 'text-rose-600',
      bgLight: 'bg-rose-50',
      borderColor: 'border-rose-200',
      url: 'https://javalab.org/en/simple_pendulum_en/',
      description: 'Analyze Simple Harmonic Motion (SHM). Alter pendulum string length, bob mass, gravity, and release angle while live kinetic and potential energy bar graphs fluctuate.',
      teluguDescription: 'లోలకం పొడవు, బరువు మరియు కోణాన్ని మారుస్తూ డోలన కాలం (T = 2π√(L/g)) మరియు శక్తి పరివర్తనను కొలవండి.',
      interactiveControls: ['Live String Length & Bob Mass Sliders', 'Real-Time Kinetic vs Potential Energy Bars', 'Planetary Gravity Switch (Earth, Moon, Jupiter)', 'Time Period (T) Stroboscope & Oscilloscope Graph'],
      audioNarration: 'The Simple Pendulum simulation illustrates conservation of mechanical energy as potential energy transforms continuously into kinetic energy.'
    },
    {
      id: 'javalab-lorentz-force',
      title: 'Lorentz Force & Magnetic Deflection (లారెంజ్ బలం)',
      teluguTitle: 'అయస్కాంత క్షేత్రంలో ఆవేశ కణాల గమనం (F = qvB)',
      platform: 'Javalab.org',
      platformLogo: 'Javalab',
      badge: 'Electromagnetism & Force',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      subject: 'Physics',
      icon: Cpu,
      color: 'text-amber-600',
      bgLight: 'bg-amber-50',
      borderColor: 'border-amber-200',
      url: 'https://javalab.org/en/lorentz_force_en/',
      description: 'Observe how charged electrons and protons deflect inside uniform magnetic fields following Fleming\'s Left Hand Rule and Lorentz Force (F = q(E + v × B)).',
      teluguDescription: 'అయస్కాంత క్షేత్రంలో ఎలక్ట్రాన్లు మరియు ప్రోటాన్లు వృత్తాకార మార్గంలో తిరిగే తీరును, ఫ్లెమింగ్ ఎడమచేతి నియమాన్ని పరీక్షించండి.',
      interactiveControls: ['Magnetic Field Intensity (B) & Direction', 'Charge Particle Velocity (v) & Polarity (q)', 'Fleming Left Hand Vector Display', 'Circular Path Radius & Cyclotron Frequency'],
      audioNarration: 'Lorentz Force simulation demonstrates how perpendicular magnetic fields exert forces on moving charges, bending their trajectory into circles.'
    },
    {
      id: 'javalab-solar-system',
      title: 'Solar System & Planetary Orbits (సౌర కుటుంబం 3D)',
      teluguTitle: 'గ్రహాల భ్రమణం, పరిభ్రమణం & సూర్యుడి చుట్టూ కక్ష్యలు',
      platform: 'Javalab.org',
      platformLogo: 'Javalab',
      badge: 'Astronomy & Heliocentric Orbits',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      subject: 'Earth & Space',
      icon: Globe,
      color: 'text-sky-600',
      bgLight: 'bg-sky-50',
      borderColor: 'border-sky-200',
      url: 'https://javalab.org/en/solar_system_en/',
      description: 'Interactive heliocentric simulator displaying Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune orbiting the Sun with real relative velocities and distances.',
      teluguDescription: 'సూర్యుని చుట్టూ 8 గ్రహాలు తిరిగే కక్ష్యలు, వాటి భ్రమణ వేగాలు మరియు దూరాలను పరిశీలించే అంతరిక్ష వేదిక.',
      interactiveControls: ['Speed Up/Slow Down Solar Clock', 'Zoom & Rotate 3D Orbital Plane', 'Planet Comparison Data (Radius, Gravity, Mass)', 'Moon Orbit & Lunar Phases Synchronizer'],
      audioNarration: 'Explore our Solar System on Javalab to witness the 8 planets orbiting the Sun in synchrony with Kepler\'s laws of planetary motion.'
    },
    {
      id: 'javalab-generator',
      title: 'AC / DC Generator & Faraday Induction (విద్యుత్ జనరేటర్)',
      teluguTitle: 'ఫెరడే విద్యుదయస్కాంత ప్రేరణ & ఏసీ/డీసీ విద్యుత్ ఉత్పత్తి',
      platform: 'Javalab.org',
      platformLogo: 'Javalab',
      badge: 'Electromagnetic Induction',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      subject: 'Physics',
      icon: Zap,
      color: 'text-teal-600',
      bgLight: 'bg-teal-50',
      borderColor: 'border-teal-200',
      url: 'https://javalab.org/en/generator_en/',
      description: 'Rotate a copper coil inside permanent magnets to generate alternating and direct currents through Faraday\'s Law of Induction and Lenz\'s Law.',
      teluguDescription: 'అయస్కాంతాల మధ్య తీగ చుట్టను తిప్పి ఫెరడే నియమం ప్రకారం ఏసీ లేదా డీసీ విద్యుత్‌ను ఉత్పత్తి చేసే ప్రయోగం.',
      interactiveControls: ['Coil Rotation Speed (RPM) Controller', 'Toggle Split-Ring Commutator (DC) vs Slip Rings (AC)', 'Magnetic Flux & Induced EMF Waveform Graph', 'Bulb Brightness & Output Voltmeter Display'],
      audioNarration: 'Learn how power plants generate electricity using electromagnetic induction by spinning coils inside magnetic fields.'
    },
    {
      id: 'javalab-heat-conduction',
      title: 'Thermal Conduction & Molecular Kinetic Theory (ఉష్ణ ప్రసరణ)',
      teluguTitle: 'ఉష్ణ వాహకత్వం, అణువుల గతిజ శక్తి & విస్తరణ',
      platform: 'Javalab.org',
      platformLogo: 'Javalab',
      badge: 'Thermodynamics & Heat',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      subject: 'Chemistry',
      icon: Sparkles,
      color: 'text-orange-600',
      bgLight: 'bg-orange-50',
      borderColor: 'border-orange-200',
      url: 'https://javalab.org/en/thermal_conduction_en/',
      description: 'Observe heat transfer through solids as vibrating lattice molecules collide and propagate thermal energy along copper, iron, glass, and wood rods.',
      teluguDescription: 'రాగి, ఇనుము, గాజు కడ్డీలలో ఉష్ణ శక్తి అణువుల కంపనాల ద్వారా ఒక చోటు నుండి మరొక చోటుకు ఎలా ప్రసరిస్తుందో చూడండి.',
      interactiveControls: ['Material Selector: Copper, Iron, Glass, Wood', 'Temperature Source Controls (Hot vs Cold Reservoir)', 'Molecular Vibration Speed Heatmap', 'Thermal Conductivity (k) Comparison Graph'],
      audioNarration: 'Thermal conduction shows how molecular collisions transfer heat through various materials based on their thermal conductivity.'
    }
  ];

  // --- 9. DETECTIVE QUIZ DATA ---
  const quizQuestions = [
    {
      question: 'Which organ pumps blood continuously through the human body?',
      teluguQuestion: 'మానవ శరీరంలో రక్తాన్ని నిరంతరం పంప్ చేసే అవయవం ఏది?',
      options: ['Lungs (ఊపిరితిత్తులు)', 'Heart (గుండె)', 'Kidneys (మూత్రపిండాలు)', 'Stomach (జీర్ణాశయం)'],
      correctIndex: 1,
      explanation: 'The heart pumps around 7,500 liters of oxygenated blood every single day!'
    },
    {
      question: 'In the Ramayana, which Kanda describes Hanuman jumping across the ocean to Lanka?',
      teluguQuestion: 'రామాయణంలో హనుమంతుడు సముద్రాన్ని లంఘించిన ఘట్టం ఏ కాండలో ఉంది?',
      options: ['Bala Kanda (బాలకాండ)', 'Ayodhya Kanda (అయోధ్యకాండ)', 'Sundara Kanda (సుందరకాండ)', 'Aranya Kanda (అరణ్యకాండ)'],
      correctIndex: 2,
      explanation: 'Sundara Kanda celebrates Hanuman heroic ocean leap, meeting Mother Sita, and giving her Rama ring.'
    },
    {
      question: 'Which is the National Animal of India with unique stripe patterns?',
      teluguQuestion: 'భారతదేశ జాతీయ జంతువు ఏది?',
      options: ['Asian Lion (సింహం)', 'Royal Bengal Tiger (రాయల్ బెంగాల్ పులి)', 'Indian Elephant (ఏనుగు)', 'Snow Leopard (చిరుత)'],
      correctIndex: 1,
      explanation: 'The Royal Bengal Tiger is India national animal; no two tigers have the same stripe patterns!'
    }
  ];

  const currentGrandha = grandhasList.find(g => g.id === selectedGrandha) || grandhasList[0];
  const currentAnimal = animalList.find(a => a.id === selectedAnimal) || animalList[0];
  const currentRhyme = rhymesAndSlokas.find(r => r.id === selectedRhyme) || rhymesAndSlokas[0];
  const currentOrgan = organList.find(o => o.id === selectedOrgan) || organList[0];

  const handleOpen3DModel = (title: string, url: string, desc: string) => {
    setActiveMedia({
      isOpen: true,
      title: `3D View: ${title}`,
      webUrl: url,
      description: desc,
      keyPoints: ['Interactive 3D rotation & zoom', 'Realistic anatomy and texture rendering', 'Bilingual discovery points']
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Hero Banner in Rich Rose / Purple / Indigo Gradient */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950 via-purple-950 to-slate-900 p-6 sm:p-10 text-white shadow-2xl border border-rose-800/80">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-rose-500 text-slate-950 text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kids Discovery & 3D Learning Zone</span>
            </span>
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-rose-200 text-xs font-semibold px-3 py-1 rounded-full">
              🐾 3D Animals • 🌿 Plants • 🏛️ History • 🕉️ Grandhas & Bible/Quran • 🎵 Telugu Slokas • 🎨 123apps
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            🧬 Kids Interactive 3D Lab & Sacred Grandhas
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Explore <strong>3D Human Body Anatomy (AnatomyZone)</strong>, <strong>3D Wildlife Animals & Plants</strong>, <strong>World Wonders & History</strong>, <strong>Bal Ramayanam, Bhagavatham, Bhagavad Gita, Holy Bible & Quran stories with audio narration</strong>, and <strong>123apps AI Creative Studio</strong>!
          </p>

          {/* Quick Category Action Pill Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => setActiveTab('science-simulations')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer ${
                activeTab === 'science-simulations' ? 'bg-cyan-500 text-slate-950 shadow-md ring-2 ring-white/50' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>🔬 PhET & Javalab Science Simulations</span>
            </button>

            <button
              onClick={() => setActiveTab('spiritual-grandhas')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer ${
                activeTab === 'spiritual-grandhas' ? 'bg-orange-500 text-white shadow-md' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Sacred Grandhas & Audiobooks</span>
            </button>

            <button
              onClick={() => setActiveTab('telugu-rhymes-slokas')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer ${
                activeTab === 'telugu-rhymes-slokas' ? 'bg-rose-500 text-white shadow-md' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Telugu Slokas & Rhymes</span>
            </button>

            <button
              onClick={() => setActiveTab('animals')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer ${
                activeTab === 'animals' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Dog className="w-3.5 h-3.5" />
              <span>3D Animals & Wildlife</span>
            </button>

            <button
              onClick={() => setActiveTab('anatomy')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer ${
                activeTab === 'anatomy' ? 'bg-rose-600 text-white shadow-md' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>3D Human Anatomy</span>
            </button>

            <button
              onClick={() => setActiveTab('history-monuments')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer ${
                activeTab === 'history-monuments' ? 'bg-blue-500 text-white shadow-md' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>3D History & Monuments</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-apps')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-transform hover:scale-102 cursor-pointer ${
                activeTab === 'ai-apps' ? 'bg-indigo-500 text-white shadow-md' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>123apps AI Studio</span>
            </button>
          </div>
        </div>

        {/* Decorative Floating Watermark */}
        <div className="absolute right-4 bottom-2 opacity-10 pointer-events-none hidden lg:block text-9xl font-mono">
          🧬 🦚 🐾
        </div>
      </div>

      {/* Global Audio Narration Player Bar (Active whenever audio is playing) */}
      <div className="bg-white rounded-2xl p-4 border border-rose-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
            {isPlayingAudio ? <Volume2 className="w-5 h-5 animate-pulse" /> : <BookOpen className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-xs font-black text-slate-900">
              Interactive Kids Audio Storyteller & Science Voice Guide
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {isPlayingAudio ? '🔊 Now narrating in clear English/Telugu...' : 'Click "Listen to Concept / Story" on any card below to play voice narration.'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPlayingAudio && (
            <button
              onClick={handleStopAudio}
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Stop Voice</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
            <span className="text-[10px] px-1 text-slate-400">Speed:</span>
            {[0.75, 1.0, 1.25].map((speed) => (
              <button
                key={speed}
                onClick={() => setPlaybackSpeed(speed)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-black cursor-pointer ${
                  playbackSpeed === speed ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- TAB 0: PHET & JAVALAB INTERACTIVE SCIENCE SIMULATIONS --- */}
      {activeTab === 'science-simulations' && (
        <div className="space-y-8 animate-fade-in">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <FlaskConical className="w-6 h-6 text-cyan-600" />
                <span>2 Interesting Websites for Science Students (ఇంటరాక్టివ్ సైన్స్ ల్యాబ్)</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium pt-0.5">
                Explore <strong>PhET Interactive Simulations</strong> and <strong>Javalab.org</strong> with over 600+ real-time experiments in Physics, Chemistry, Biology, Circuits & Astronomy.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-cyan-100 text-cyan-800 text-xs font-black px-3 py-1 rounded-full border border-cyan-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>600+ Science Models</span>
              </span>
            </div>
          </div>

          {/* TWO FEATURED HERO WEBSITES MATCHING SCREENSHOTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. PhET Interactive Simulations Card */}
            <div className="bg-gradient-to-br from-cyan-50 via-white to-sky-50 rounded-3xl p-6 sm:p-7 border-2 border-cyan-300 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="bg-white px-4 py-2 rounded-2xl border border-cyan-200 shadow-xs inline-block">
                    <div className="text-3xl sm:text-4xl font-black text-cyan-600 tracking-tight flex items-center">
                      <span>Ph</span>
                      <span className="text-amber-500">E</span>
                      <span className="text-cyan-600">T</span>
                    </div>
                    <div className="text-[9px] font-black tracking-widest text-slate-800 uppercase">
                      INTERACTIVE SIMULATIONS
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-cyan-600 text-white shadow-xs">
                    CU Boulder • Nobel Lab
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    PhET Interactive Simulations
                  </h3>
                  <div className="text-xs font-bold text-cyan-700">
                    ఫెట్ ఇంటరాక్టివ్ సైన్స్ & మ్యాథ్స్ సిమ్యులేషన్స్ (కొలరాడో యూనివర్సిటీ)
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Award-winning game-like interactive simulations created by Nobel Laureate Carl Wieman. Learn science by doing experiments with electric circuits, atoms, gravity, and chemical reactions.
                </p>

                <div className="bg-white/90 rounded-2xl p-3.5 border border-cyan-200 text-xs space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>Popular PhET Virtual Labs:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-700">
                    <div>⚡ Circuit Construction Kit (DC)</div>
                    <div>⚛️ Build an Atom & Isotopes</div>
                    <div>🪐 Gravity and Planetary Orbits</div>
                    <div>🎯 Projectile Motion Cannon</div>
                    <div>🧪 Balancing Chemical Equations</div>
                    <div>🛹 Energy Skate Park & Kinetic Law</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-cyan-100">
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://phet.colorado.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Visit PhET Colorado Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="https://phet.colorado.edu/en/simulations/browse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-cyan-50 text-cyan-900 border border-cyan-300 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Browse All Sims</span>
                    <Compass className="w-3.5 h-3.5 text-cyan-600" />
                  </a>
                </div>

                <button
                  onClick={() => handlePlayAudio('PhET Interactive Simulations from University of Colorado Boulder provides free interactive simulations for science and math. Students can construct electric circuits, build atoms, test gravity, and balance chemical equations.')}
                  className="w-full bg-cyan-100/70 hover:bg-cyan-100 text-cyan-900 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-cyan-700" />
                  <span>Listen to PhET Overview (Audio)</span>
                </button>
              </div>
            </div>

            {/* 2. Javalab.org Interactive Simulations Card */}
            <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-3xl p-6 sm:p-7 border-2 border-indigo-300 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="bg-white px-4 py-2 rounded-2xl border border-indigo-200 shadow-xs inline-block">
                    <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                      <span>Javalab</span>
                      <span className="text-indigo-600">.org</span>
                    </div>
                    <div className="text-[10px] font-bold text-slate-500">
                      Interactive Science Simulations
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-indigo-600 text-white shadow-xs">
                    600+ Physics & Science Models
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    Javalab.org Science Simulations
                  </h3>
                  <div className="text-xs font-bold text-indigo-700 flex items-center gap-1.5">
                    <span>జావా ల్యాబ్ - ఇంటరాక్టివ్ సైన్స్ & ఫిజిక్స్ సిమ్యులేషన్స్</span>
                    <span className="text-[10px] text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">(Javalab.org ✔️)</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Premier interactive laboratory for science students. Features dynamic HTML5 models with live sliders for Classical Mechanics, Light Refraction, Lorentz Force, Electromagnetism, Earth Science & Astronomy.
                </p>

                <div className="bg-white/90 rounded-2xl p-3.5 border border-indigo-200 text-xs space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Atom className="w-4 h-4 text-indigo-600" />
                    <span>Popular Javalab Interactive Topics:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-700">
                    <div>👁️ Light Refraction & Snell\'s Law</div>
                    <div>⚙️ Simple Pendulum & Kinetic Energy</div>
                    <div>🧲 Lorentz Force & Magnetic Field</div>
                    <div>🌌 Solar System & Kepler\'s Orbits</div>
                    <div>⚡ AC / DC Generator & Faraday Induction</div>
                    <div>🔥 Thermal Conduction in Solids</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-indigo-100">
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://javalab.org/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Visit Javalab.org Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="https://javalab.org/en/category/physics_en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-indigo-50 text-indigo-900 border border-indigo-300 font-bold text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Physics Labs</span>
                    <Compass className="w-3.5 h-3.5 text-indigo-600" />
                  </a>
                </div>

                <button
                  onClick={() => handlePlayAudio('Javalab dot org is a top website for science students with over 600 interactive simulations. It covers mechanics, optics, electromagnetism, thermodynamics, earth science and astronomy with real-time parameter controls.')}
                  className="w-full bg-indigo-100/70 hover:bg-indigo-100 text-indigo-900 text-xs font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Listen to Javalab Overview (Audio)</span>
                </button>
              </div>
            </div>
          </div>

          {/* SIMULATION FILTER CONTROLS */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Platform Selector Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Platform:</span>
                {(['all', 'PhET Interactive Simulations', 'Javalab.org'] as const).map((platform) => (
                  <button
                    key={platform}
                    onClick={() => setSelectedSimPlatform(platform)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black cursor-pointer transition-all ${
                      selectedSimPlatform === platform
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {platform === 'all' ? 'All Platforms (PhET + Javalab)' : platform}
                  </button>
                ))}
              </div>

              {/* Subject Filter */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500">Subject:</span>
                {(['all', 'Physics', 'Chemistry', 'Earth & Space'] as const).map((subj) => (
                  <button
                    key={subj}
                    onClick={() => setSelectedSimSubject(subj)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      selectedSimSubject === subj
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {subj}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SIMULATION EXPERIMENT CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {scienceSimulationsList
              .filter(sim => selectedSimPlatform === 'all' || sim.platform === selectedSimPlatform)
              .filter(sim => selectedSimSubject === 'all' || sim.subject === selectedSimSubject)
              .map((sim) => {
                const Icon = sim.icon;
                return (
                  <div
                    key={sim.id}
                    className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${sim.bgLight} ${sim.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${sim.badgeColor}`}>
                            {sim.platformLogo}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {sim.subject}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-black text-slate-900 text-base leading-snug">
                          {sim.title}
                        </h4>
                        <div className={`text-xs font-bold ${sim.color} pt-0.5`}>
                          {sim.teluguTitle}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {sim.description}
                      </p>

                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-[11px] space-y-1">
                        <div className="font-bold text-slate-700 flex items-center gap-1">
                          <Sliders className="w-3 h-3 text-slate-500" />
                          <span>Interactive Parameter Controls:</span>
                        </div>
                        <ul className="list-disc list-inside text-slate-600 space-y-0.5 pl-1">
                          {sim.interactiveControls.map((ctrl, idx) => (
                            <li key={idx}>{ctrl}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <a
                          href={sim.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Launch Simulation</span>
                          <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        </a>

                        <button
                          onClick={() => setActiveMedia({
                            isOpen: true,
                            title: sim.title,
                            teluguTitle: sim.teluguTitle,
                            webUrl: sim.url,
                            category: `${sim.platform} (${sim.subject})`,
                            description: sim.description,
                            keyPoints: sim.interactiveControls
                          })}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"
                          title="Preview in app"
                        >
                          <span>In-App View</span>
                        </button>
                      </div>

                      <button
                        onClick={() => handlePlayAudio(`${sim.title}. ${sim.description}. Key Controls: ${sim.interactiveControls.join(', ')}`)}
                        className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold py-1.5 px-3 rounded-xl text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3 text-slate-500" />
                        <span>Listen to Experiment Concept</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* --- TAB 1: SACRED GRANDHAS & MULTI-FAITH SCRIPTURES --- */}
      {activeTab === 'spiritual-grandhas' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-orange-600" />
                <span>Sacred Grandhas & Moral Storybooks for Kids (బాల పురాణాలు & కథలు)</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium pt-0.5">
                Bal Ramayanam, Bal Bhagavatham, Bhagavad Gita for Kids, Holy Bible stories, and Holy Quran parables with audio narration.
              </p>
            </div>
          </div>

          {/* Grandha Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {grandhasList.map((g) => {
              const isSelected = selectedGrandha === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setSelectedGrandha(g.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-orange-600 text-white shadow-md border-orange-600 scale-[1.02]'
                      : 'bg-white border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 text-slate-800'
                  }`}
                >
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full inline-block ${
                    isSelected ? 'bg-white/20 text-white' : g.badgeColor
                  }`}>
                    {g.categoryBadge}
                  </span>
                  <div>
                    <div className="font-black text-xs leading-snug">
                      {g.title}
                    </div>
                    <div className={`text-[10px] font-medium pt-0.5 truncate ${isSelected ? 'text-white/80' : 'text-slate-500'}`}>
                      {g.teluguTitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Grandha Viewer */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${currentGrandha.badgeColor}`}>
                    {currentGrandha.categoryBadge}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    📜 {currentGrandha.versesCount}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentGrandha.title}
                </h3>
                <div className="text-sm font-bold text-orange-700">
                  {currentGrandha.teluguTitle}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pt-1">
                  {currentGrandha.summary}
                </p>
                <div className="text-xs text-slate-500 italic pt-0.5">
                  {currentGrandha.teluguSummary}
                </div>
              </div>

              {/* Action Buttons for Selected Grandha */}
              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <button
                  onClick={() => handlePlayAudio(`${currentGrandha.title}. ${currentGrandha.summary}. Key Moral: ${currentGrandha.moral}`)}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>Listen to Audio Story</span>
                </button>

                <a
                  href={currentGrandha.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-2.5 rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Open Full Scripture</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Moral Box */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-black uppercase text-amber-900">
                  Key Life Moral for Children (పిల్లలకి ముఖ్యమైన సందేశం):
                </div>
                <div className="text-xs sm:text-sm font-bold text-amber-950 pt-0.5">
                  &quot;{currentGrandha.moral}&quot;
                </div>
              </div>
            </div>

            {/* Key Story Chapters Grid */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                Story Chapters & Key Episodes (ప్రధాన ఘట్టాలు):
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentGrandha.keyChapters.map((chap, cIdx) => (
                  <div key={cIdx} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 flex flex-col justify-between">
                    <div>
                      <div className="font-black text-slate-900 text-xs">
                        {chap.name}
                      </div>
                      <div className="text-[11px] font-bold text-orange-600 pb-1">
                        {chap.teluguName}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {chap.story}
                      </p>
                    </div>
                    <button
                      onClick={() => handlePlayAudio(`${chap.name}. ${chap.story}`)}
                      className="mt-2 text-[11px] font-bold text-orange-700 hover:text-orange-900 flex items-center gap-1 cursor-pointer pt-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen to this episode</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: TELUGU RHYMES & DAILY SLOKAS --- */}
      {activeTab === 'telugu-rhymes-slokas' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <Music className="w-5 h-5 text-rose-600" />
                <span>Telugu Rhymes, Slokas & Sataka Padyalu (తెలుగు బాలగేయాలు & శ్లోకాలు)</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium pt-0.5">
                Authentic Sanskrit & Telugu slokas with audio playback, word meanings, and Vemana/Sumati moral poems.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rhymesAndSlokas.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                      {item.type.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      🕉️ {item.deityOrTheme}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 text-base">
                      {item.title}
                    </h3>
                    <div className="text-xs font-bold text-rose-700">
                      {item.teluguTitle}
                    </div>
                  </div>

                  {/* Sanskrit / Telugu Verse Card */}
                  <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-100 space-y-2">
                    {item.sanskritVerse && (
                      <div className="font-mono text-xs sm:text-sm font-bold text-rose-950 whitespace-pre-line leading-relaxed">
                        {item.sanskritVerse}
                      </div>
                    )}
                    <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-medium">
                      {item.teluguLyrics}
                    </div>
                  </div>

                  {/* English Meaning */}
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-800">English Meaning: </span>
                    {item.englishMeaning}
                  </div>
                </div>

                {/* Audio Listen Button */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handlePlayAudio(item.audioNarration)}
                    className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Sing & Listen Audio (వినండి)</span>
                  </button>
                  {onAskAI && (
                    <button
                      onClick={() => onAskAI(`Explain the word-by-word meaning and moral significance of ${item.title} for kids`)}
                      className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
                      title="Ask AI about this verse"
                    >
                      <Bot className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 3: 3D ANIMALS & WILDLIFE WORLD --- */}
      {activeTab === 'animals' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <Dog className="w-5 h-5 text-amber-600" />
                <span>3D Animals & Wildlife Explorer (వన్యప్రాణుల ప్రపంచం)</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium pt-0.5">
                Interactive 3D animal models with real sounds, habitats, speed, lifespans and audio voiceovers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {animalList.map((animal) => (
              <div
                key={animal.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-4xl text-center py-2 bg-amber-50 rounded-2xl">
                    {animal.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">
                      {animal.name}
                    </h3>
                    <div className="text-xs font-bold text-amber-700">
                      {animal.teluguName}
                    </div>
                    <div className="text-[10px] text-slate-400 italic">
                      {animal.scientificName}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div><strong>⚡ Speed:</strong> {animal.speed}</div>
                    <div><strong>⏳ Lifespan:</strong> {animal.lifespan}</div>
                    <div className="col-span-2"><strong>🌿 Diet:</strong> {animal.diet}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    💡 <strong>Fun Fact:</strong> {animal.funFact}
                  </p>
                  <div className="text-[11px] text-slate-500 italic">
                    {animal.teluguFact}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handlePlayAudio(animal.audioNarration)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Hear Animal Fact</span>
                  </button>

                  <button
                    onClick={() => handleOpen3DModel(animal.name, animal.model3DUrl, animal.funFact)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Launch 3D View</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 4: 3D HUMAN ANATOMY (ANATOMYZONE) --- */}
      {activeTab === 'anatomy' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                <span>3D Human Body Anatomy Explorer (AnatomyZone.com)</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium pt-0.5">
                Explore Heart, Brain, Lungs and Skeletal systems in 3D interactive models with vital organ functions.
              </p>
            </div>

            <a
              href="https://anatomyzone.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Visit AnatomyZone.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {organList.map((organ) => {
              const Icon = organ.icon;
              return (
                <div
                  key={organ.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${organ.bgLight} ${organ.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-base">
                        {organ.name}
                      </h3>
                      <div className="text-xs font-bold text-rose-600">
                        {organ.teluguName}
                      </div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 pt-0.5">
                        {organ.system}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {organ.description}
                    </p>

                    <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100 text-[11px] text-rose-950">
                      💡 <strong>Did You Know:</strong> {organ.funFact}
                    </div>

                    <ul className="space-y-1 text-[11px] text-slate-700">
                      {organ.keyFunctions.slice(0, 2).map((fn, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          <span>{fn}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handlePlayAudio(`${organ.name}. ${organ.description}. Fun fact: ${organ.funFact}`)}
                      className="w-full bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Audio Explanation</span>
                    </button>

                    <a
                      href={organ.anatomyZoneUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>3D Model on AnatomyZone</span>
                      <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* --- TAB 5: 3D HISTORY & MONUMENTS --- */}
      {activeTab === 'history-monuments' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-blue-600" />
                <span>3D History & World Monuments (చారిత్రక కట్టడాలు)</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium pt-0.5">
                Explore Taj Mahal, Hampi Stone Chariot, and Egyptian Pyramids in interactive 3D with historical narratives.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {monumentList.map((monument) => (
              <div
                key={monument.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
                    🏛️
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 text-base">
                      {monument.name}
                    </h3>
                    <div className="text-xs font-bold text-blue-700">
                      {monument.teluguName}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                    <div><strong>📍 Location:</strong> {monument.location}</div>
                    <div><strong>👑 Builder:</strong> {monument.builder}</div>
                    <div><strong>⏳ Period:</strong> {monument.period}</div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {monument.significance}
                  </p>
                  <div className="text-[11px] text-slate-500 italic">
                    {monument.teluguSignificance}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handlePlayAudio(monument.audioNarration)}
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen to History Story</span>
                  </button>

                  <button
                    onClick={() => handleOpen3DModel(monument.name, monument.model3DUrl, monument.significance)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Launch 3D Monument</span>
                    <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 6: 123APPS AI CREATIVE SUITE --- */}
      {activeTab === 'ai-apps' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <Video className="w-5 h-5 text-indigo-600" />
                <span>123apps.com All-in-One AI Media Suite (ఏఐ ఎడిటింగ్ టూల్స్)</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium pt-0.5">
                Free browser-based tools: Online Video Editor, AI Vocal Remover, Screen Recorder & PDF tools.
              </p>
            </div>

            <a
              href="https://123apps.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Visit 123apps.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {appTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${tool.bgLight} ${tool.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {tool.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-black text-slate-900 text-base">
                        {tool.title}
                      </h3>
                      <div className="text-xs font-bold text-indigo-600">
                        {tool.teluguTitle}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {tool.description}
                    </p>

                    <div className="bg-indigo-50 p-2.5 rounded-xl border border-indigo-100 text-[11px] text-indigo-950 font-medium">
                      🎯 <strong>Best For:</strong> {tool.useCase}
                    </div>
                  </div>

                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Launch Web Tool</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
