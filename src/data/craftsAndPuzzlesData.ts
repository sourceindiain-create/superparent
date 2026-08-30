export interface CraftItem {
  id: string;
  title: string;
  teluguTitle: string;
  category: 'Origami' | 'Paper Craft' | 'Science Toy' | 'Clay Modeling' | 'Greeting Card' | 'Recycled Art';
  difficulty: 'Easy' | 'Medium' | 'Fun Kids';
  timeRequired: string;
  materials: string[];
  steps: string[];
  tips: string;
  teluguTips: string;
  videoUrl: string;
  imageUrl: string;
}

export interface PuzzleToolItem {
  id: string;
  title: string;
  teluguTitle: string;
  category: 'Math Solver' | 'Sudoku & Logic' | 'Crossword & Word' | 'Rubik & 3D' | 'Chess & Strategy';
  badge: string;
  url: string;
  description: string;
  teluguDescription: string;
  features: string[];
}

export const SMALL_CRAFTS_DATA: CraftItem[] = [
  {
    id: 'craft-1',
    title: 'Origami Jumping Frog (Water/Paper)',
    teluguTitle: 'ఎగిరే ఒరిగామి కప్ప తయారీ',
    category: 'Origami',
    difficulty: 'Easy',
    timeRequired: '5 - 8 mins',
    materials: ['Square green origami paper (15x15 cm)', 'Black sketch pen for eyes'],
    steps: [
      'Take a square piece of paper and fold it in half vertically and horizontally to make creases.',
      'Fold the top corners diagonally down to create an "X" crease, then collapse into a waterbomb triangle base.',
      'Fold the front flaps upward to create the front legs.',
      'Fold the bottom edges inwards into the center, then fold the bottom upward into a zig-zag spring fold.',
      'Draw two cute eyes on top. Press gently on the back spring and watch the frog jump high!'
    ],
    tips: 'Use crisp craft paper. The tighter the spring fold at the back, the higher the frog jumps!',
    teluguTips: 'వెనుక భాగంలో స్ప్రింగ్ మడతను గట్టిగా వేస్తే కప్ప మరింత ఎత్తుకు ఎగురుతుంది.',
    videoUrl: 'https://www.youtube.com/watch?v=1b-jOQf9T1Q',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'craft-2',
    title: 'DIY Science: Balloon Rocket & Jet Thrust',
    teluguTitle: 'బెలూన్ జెట్ రాకెట్ సైన్స్ ప్రయోగం',
    category: 'Science Toy',
    difficulty: 'Easy',
    timeRequired: '10 mins',
    materials: ['Long piece of string (5-10 meters)', 'Drinking straw', 'Adhesive tape', 'Latex balloon'],
    steps: [
      'Thread the string through the straw and tie the two ends tightly across two chairs or door handles.',
      'Inflate the balloon fully without tying a knot; hold the neck tightly with your fingers or a clothes peg.',
      'Tape the inflated balloon securely to the straw while holding the string taut.',
      'Release the neck of the balloon and observe Newton’s 3rd Law of Motion (Action & Reaction) as the balloon zooms across the room!'
    ],
    tips: 'Demonstrates Newton’s 3rd Law: for every action (escaping air rushing backward), there is an equal and opposite reaction (rocket propelled forward).',
    teluguTips: 'న్యూటన్ 3వ గమన నియమం ప్రకారం వాయువు వెనుకకు రాగా, రాకెట్ ముందుకు వేగంగా దూసుకుపోతుంది.',
    videoUrl: 'https://www.youtube.com/watch?v=qD92p2U0Yq8',
    imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'craft-3',
    title: 'Cardboard Periscope (Mirror Optics)',
    teluguTitle: 'కార్డ్‌బోర్డ్ పెరిస్కోప్ (దర్పణాల కాంతి ప్రయోగం)',
    category: 'Science Toy',
    difficulty: 'Medium',
    timeRequired: '20 mins',
    materials: ['Long cardboard box / empty milk carton', 'Two small flat mirrors (same size)', 'Scissors / cutter', 'Tape and ruler'],
    steps: [
      'Cut two viewing holes on opposite sides at the top and bottom of the long rectangular box.',
      'Slot the two flat mirrors at exact 45-degree angles parallel to each other inside the top and bottom of the tube.',
      'Tape the mirrors firmly so they reflect light from the top aperture down to the bottom viewport.',
      'Look into the bottom aperture to see around corners or above walls like a submarine periscope!'
    ],
    tips: 'Light enters the top mirror, reflects 90 degrees downward, strikes the second 45° mirror, and enters the viewer’s eye (Law of Reflection).',
    teluguTips: 'కాంతి ప్రతిబింబ సూత్రం ద్వారా 45 డిగ్రీల కోణంలో ఉన్న అద్దాల నుండి కాంతి మన కంటిని చేరుతుంది.',
    videoUrl: 'https://www.youtube.com/watch?v=F0f545P-X3w',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'craft-4',
    title: 'Pop-Up 3D Greeting Card for Parents & Teachers',
    teluguTitle: '3D పాప్-అప్ గ్రీటింగ్ కార్డ్ తయారీ',
    category: 'Greeting Card',
    difficulty: 'Easy',
    timeRequired: '15 mins',
    materials: ['Color cardstock paper (A4)', 'Glitter pens & markers', 'Glue stick', 'Scissors', 'Stickers'],
    steps: [
      'Fold the cardstock paper in half horizontally.',
      'Make two parallel 3 cm cuts along the center fold to create a pop-up tab, and push the tab inward.',
      'Cut out a heart, flower bouquet, or diya from colored paper and glue it to the front face of the inward pop-up tab.',
      'Write a heartfelt message inside: "Thank you Mom & Dad / Guruji for your love and wisdom!".',
      'When the recipient opens the card, the 3D flower pops up dramatically!'
    ],
    tips: 'Make sure not to glue the folding hinge of the pop-up tab so it opens smoothly.',
    teluguTips: 'పాప్-అప్ మడత అంటుకోకుండా జాగ్రత్త పడితే కార్డు తెరవగానే అందంగా ముందుకు వస్తుంది.',
    videoUrl: 'https://www.youtube.com/watch?v=kYlY8GZkP6g',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'craft-5',
    title: 'Newton\'s Color Disc (White Light Spectrum)',
    teluguTitle: 'న్యూటన్ వర్ణ చక్రం (ఏడు రంగుల తెలుపు కాంతి)',
    category: 'Science Toy',
    difficulty: 'Easy',
    timeRequired: '10 mins',
    materials: ['Thick cardboard circle (10 cm diameter)', 'VIBGYOR color pencils / sketch pens', 'String or spinning pencil spindle'],
    steps: [
      'Divide the cardboard circle into 7 equal wedge sectors like pizza slices.',
      'Color the 7 sectors in exact order of rainbow: Violet, Indigo, Blue, Green, Yellow, Orange, Red (VIBGYOR).',
      'Make two small holes in the center and thread a 1-meter loop of string through them.',
      'Wind the string tightly by twisting it and pull outward to spin the disc at ultra-high speed.',
      'Notice that the 7 individual colors blend together due to persistence of vision to appear white!'
    ],
    tips: 'Proves Sir Isaac Newton’s discovery that white sunlight is composed of all 7 spectral rainbow colors.',
    teluguTips: 'చక్రం వేగంగా తిరిగినప్పుడు మన కంటి దృష్టి స్థిరత వల్ల ఏడు రంగులు కలిసి తెలుపు రంగుగా కనిపిస్తాయి.',
    videoUrl: 'https://www.youtube.com/watch?v=nCg-l9q4b1Y',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80'
  }
];

export const CALCSOLVER_AND_PUZZLES_DATA: PuzzleToolItem[] = [
  {
    id: 'solver-1',
    title: 'CalcSolver & Step-by-Step Math Engine',
    teluguTitle: 'క్యాల్క్‌సాల్వర్ - దశలవారీ గణిత పరిష్కరిణి',
    category: 'Math Solver',
    badge: 'Universal CalcSolver',
    url: 'https://www.wolframalpha.com/',
    description: 'Solve arithmetic, fractions, algebraic equations, polynomial roots, integrals, and geometry proofs step-by-step.',
    teluguDescription: 'కూడికలు, భిన్నాలు, బీజగణిత సమీకరణాలు మరియు త్రికోణమితి లెక్కలను దశలవారీగా పరిష్కరించుకోండి.',
    features: ['Step-by-step working derivations', 'Interactive equation grapher', 'Fraction & percentage calculator', 'Chemistry formula balancer']
  },
  {
    id: 'solver-2',
    title: 'Mathway by Chegg (Instant Problem Solver)',
    teluguTitle: 'మ్యాథ్‌వే - తక్షణ లెక్కల పరిష్కారం',
    category: 'Math Solver',
    badge: 'Mobile & Web',
    url: 'https://www.mathway.com/',
    description: 'Point-and-click solver for Basic Math, Pre-Algebra, Algebra, Trigonometry, and Calculus problems.',
    teluguDescription: 'ప్రాథమిక గణితం నుండి కలన గణితం వరకు అన్ని ప్రశ్నలకు తక్షణ సమాధానాలు పొందండి.',
    features: ['Photo & text question input', 'Detailed steps for students', 'Graphing visualization', 'Trigonometric unit circle']
  },
  {
    id: 'solver-3',
    title: 'GeoGebra Suite (Dynamic Geometry & Graphing)',
    teluguTitle: 'జియోజీబ్రా - ఇంటరాక్టివ్ జామెట్రీ & గ్రాఫ్‌లు',
    category: 'Math Solver',
    badge: '3D Geometry',
    url: 'https://www.geogebra.org/calculator',
    description: 'Interactive geometry constructions, 3D shapes, slider-controlled functions, and conic section plots.',
    teluguDescription: '3D ఆకారాలు, త్రిభుజాల కొలతలు మరియు గ్రాఫ్‌లను కంప్యూటర్‌లో కదిలిస్తూ నేర్చుకోండి.',
    features: ['3D surface visualization', 'Compass & ruler constructions', 'Calculus tangent line slopes', 'Free classroom worksheets']
  },
  {
    id: 'solver-4',
    title: 'Sudoku & KenKen Puzzle Generator & Solver',
    teluguTitle: 'సుడోకు & కెన్‌కెన్ పజిల్ సాల్వర్',
    category: 'Sudoku & Logic',
    badge: 'Logic Master',
    url: 'https://sudoku.com/',
    description: 'Interactive 4x4 for kids, 6x6, and 9x9 daily Sudoku grids with hint generator, mistake highlighter, and solver engine.',
    teluguDescription: 'పిల్లల కోసం 4x4 సుడోకు మరియు పెద్దల కోసం 9x9 లాజిక్ పజిల్స్.',
    features: ['Auto-hint and solution verification', 'Kid-friendly 4x4 mode', 'Daily brain workouts', 'Printable PDF sheets']
  },
  {
    id: 'solver-5',
    title: 'Rubik\'s Cube 3D Virtual Solver & Guide (CFOP/Layer-by-Layer)',
    teluguTitle: 'రూబిక్స్ క్యూబ్ 3D సాల్వర్ & ట్రిక్స్',
    category: 'Rubik & 3D',
    badge: '3D Puzzle',
    url: 'https://rubiks-cu.be/',
    description: 'Interactive 3D Rubik\'s cube simulator with algorithmic solver that takes any scrambled state and produces optimal move solution.',
    teluguDescription: 'మీ రూబిక్స్ క్యూబ్ రంగులను ఇచ్చి అతి తక్కువ మూవ్స్‌లో పూర్తి చేసే సూత్రాలు నేర్చుకోండి.',
    features: ['Interactive 3D cube rotation', 'Step-by-step move animations (R, U, R\', U\')', 'Timer for speedcubing', 'Beginner CFOP method guide']
  },
  {
    id: 'solver-6',
    title: 'Lichess & Chess.com Puzzle Tactics Trainer',
    teluguTitle: 'చెస్ టాక్టిక్స్ & ఎత్తుల సాధన',
    category: 'Chess & Strategy',
    badge: 'Strategy',
    url: 'https://lichess.org/training',
    description: 'Free unlimited chess tactical puzzles: Mate-in-1, Mate-in-2, fork attacks, pins, and opening traps to sharpen critical thinking.',
    teluguDescription: 'మెదడుకి పదును పెట్టే ఉచిత చెస్ పజిల్స్ మరియు వ్యూహాల సాధన.',
    features: ['Adaptive difficulty rating', 'Grandmaster analysis engine', 'Theme-based puzzles (Fork, Skewer, Pin)', 'Completely free without ads']
  },
  {
    id: 'solver-7',
    title: 'Word Search & Crossword Puzzle Maker',
    teluguTitle: 'క్రాస్‌వర్డ్ & వర్డ్ సెర్చ్ పజిల్ మేకర్',
    category: 'Crossword & Word',
    badge: 'Vocabulary',
    url: 'https://thewordsearch.com/',
    description: 'Interactive and printable word search puzzles for vocabulary building in English, science terms, and geography.',
    teluguDescription: 'పదాలను వెతికే సరదా పజిల్స్ మరియు వొకాబులరీ బిల్డర్.',
    features: ['Theme puzzles: Animals, Solar System, Periodic Table', 'Custom word list generator', 'Instant printable sheets', 'Timer challenge']
  }
];
