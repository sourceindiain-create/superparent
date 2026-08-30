export interface GradeLessonInfo {
  gradeId: string;
  gradeName: string;
  teluguGradeName: string;
  ageRange: string;
  badge: string;
  color: string;
  bgLight: string;
  borderColor: string;
  icon: string;
  description: string;
  teluguDescription: string;
  subjects: {
    name: string;
    teluguName: string;
    icon: string;
    summary: string;
    coreTopics: string[];
    easyLessonKeyPoints: string[];
    exercises: {
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }[];
    webLinks: {
      title: string;
      url: string;
      badge: string;
      desc: string;
    }[];
    videoLinks: {
      title: string;
      url: string;
      embedId?: string;
      duration: string;
      channel: string;
    }[];
    books: {
      title: string;
      author: string;
      downloadUrl: string;
      previewUrl: string;
      type: 'NCERT' | 'State Board' | 'StoryWeaver' | 'Activity Book';
    }[];
    games: {
      title: string;
      type: string;
      url: string;
      description: string;
    }[];
  }[];
}

export const GRADE_LESSONS_DATA: GradeLessonInfo[] = [
  {
    gradeId: 'ukg',
    gradeName: 'UKG (Upper Kindergarten)',
    teluguGradeName: 'యు.కె.జి (ఎర్లీ చైల్డ్‌హుడ్)',
    ageRange: '4 - 5.5 Years',
    badge: 'Foundational Stage',
    color: 'from-pink-500 to-rose-600',
    bgLight: 'bg-pink-50',
    borderColor: 'border-pink-200',
    icon: 'Baby',
    description: 'Foundational phonics, alphabet sounds, numbers 1 to 50, colors, basic shapes, animal names, and fun moral rhymes.',
    teluguDescription: 'అక్షరాల శబ్దాలు, 1 నుండి 50 అంకెలు, రంగులు, ఆకారాలు, జంతువుల పేర్లు మరియు సరదా బాలల గేయాలు.',
    subjects: [
      {
        name: 'English & Phonics',
        teluguName: 'ఇంగ్లీష్ & ఫోనిక్స్',
        icon: 'BookOpen',
        summary: 'Alphabet tracing (A-Z, a-z), CVC words (cat, dog, sun), sight words & rhyming sounds.',
        coreTopics: ['Letter Sounds (A-Z)', '3-Letter CVC Words', 'Sight Words (the, is, and)', 'Rhyme Recognition'],
        easyLessonKeyPoints: [
          'Every letter makes a special sound: A says /æ/ as in Apple, B says /b/ as in Ball.',
          'Combining letters makes words: C + A + T = CAT, D + O + G = DOG.',
          'Rhyming words end with the same sound: Hat - Cat - Bat - Mat.'
        ],
        exercises: [
          {
            question: 'Which word rhymes with "CAT"?',
            options: ['DOG', 'BAT', 'SUN', 'PEN'],
            correctAnswer: 1,
            explanation: 'BAT rhymes with CAT because both end with the "-at" sound.'
          },
          {
            question: 'What is the starting sound of the word "SUN"?',
            options: ['/s/', '/m/', '/b/', '/t/'],
            correctAnswer: 0,
            explanation: 'SUN starts with the letter S and makes the /s/ sound.'
          }
        ],
        webLinks: [
          { title: 'Starfall Early Phonics Free', url: 'https://www.starfall.com/h/ltr-classic/', badge: 'Interactive', desc: 'Step-by-step interactive phonics and early reading games.' },
          { title: 'ABCya! Kindergarten Games', url: 'https://www.abcya.com/grades/k', badge: 'Games', desc: 'Free educational learning games for letters and words.' },
          { title: 'Oxford Owl Free Early Phonics', url: 'https://home.oxfordowl.co.uk/reading/reading-schemes-oxford-levels/read-write-inc-phonics-guide/', badge: 'Phonics Guide', desc: 'Parent guide and printable phonics sheets.' }
        ],
        videoLinks: [
          { title: 'Jolly Phonics Letter Sounds (A to Z Songs)', url: 'https://www.youtube.com/watch?v=BELlZKpi1Zs', duration: '15 min', channel: 'Phonics Club' },
          { title: 'Preschool CVC 3-Letter Words Reading', url: 'https://www.youtube.com/watch?v=36Ibmt326uI', duration: '10 min', channel: 'Kids Academy' }
        ],
        books: [
          { title: 'NCERT Early Childhood Phonics & Stories', author: 'NCERT', downloadUrl: 'https://ncert.nic.in/textbook.php', previewUrl: 'https://ncert.nic.in/', type: 'NCERT' },
          { title: 'StoryWeaver Level 1 Picture Books (50+ Free)', author: 'Pratham Books', downloadUrl: 'https://storyweaver.org.in/', previewUrl: 'https://storyweaver.org.in/', type: 'StoryWeaver' }
        ],
        games: [
          { title: 'Alphabet Bubble Pop', type: 'Letter Match', url: 'https://www.abcya.com/games/alphabet_bubble', description: 'Pop the bubble with the requested alphabet sound.' },
          { title: 'CVC Word Speller', type: 'Word Builder', url: 'https://www.starfall.com/h/ltr-sv-a/', description: 'Drag letter blocks to make words like Cat, Bag, and Map.' }
        ]
      },
      {
        name: 'Maths & Number Fun',
        teluguName: 'మ్యాథ్స్ & సంఖ్యలు',
        icon: 'Calculator',
        summary: 'Numbers 1 to 50, counting objects, big/small comparisons, basic 2D shapes & patterns.',
        coreTopics: ['Numbers 1 to 50', 'Count & Match', 'Shapes (Circle, Square, Triangle)', 'Before & After Numbers'],
        easyLessonKeyPoints: [
          'Counting: 1 (One sun), 2 (Two eyes), 3 (Three wheels on an auto-rickshaw).',
          'Shapes: Circle is round like a coin, Square has 4 equal sides, Triangle has 3 corners.',
          'Comparison: An elephant is BIG, an ant is SMALL.'
        ],
        exercises: [
          {
            question: 'How many sides does a TRIANGLE have?',
            options: ['2', '3', '4', '5'],
            correctAnswer: 1,
            explanation: 'A triangle always has 3 straight sides and 3 corners.'
          },
          {
            question: 'Which number comes right AFTER 9?',
            options: ['8', '10', '11', '7'],
            correctAnswer: 1,
            explanation: 'Counting: 8, 9, 10! 10 comes right after 9.'
          }
        ],
        webLinks: [
          { title: 'PBS Kids Math Games', url: 'https://pbskids.org/games/math', badge: 'PBS Kids', desc: 'Counting, sorting, and pattern games for preschoolers.' },
          { title: 'Math Playground Kindergarten', url: 'https://www.mathplayground.com/grade_k_games.html', badge: 'Math Games', desc: 'Interactive number recognition and fun addition games.' }
        ],
        videoLinks: [
          { title: 'Numberblocks 1 to 10 Counting Adventure', url: 'https://www.youtube.com/watch?v=680w9oE5W0g', duration: '20 min', channel: 'Numberblocks Official' },
          { title: 'Learn 2D Shapes with Fun Songs', url: 'https://www.youtube.com/watch?v=OEbRDtCAFdU', duration: '8 min', channel: 'Kids Learning Tube' }
        ],
        books: [
          { title: 'Joyful Mathematics - Foundational Class', author: 'NCERT', downloadUrl: 'https://ncert.nic.in/textbook.php', previewUrl: 'https://ncert.nic.in/', type: 'NCERT' }
        ],
        games: [
          { title: 'Number Monster Counting', type: 'Math Game', url: 'https://www.abcya.com/games/counting_fish', description: 'Feed the correct number of fish to the cute sea monster.' }
        ]
      },
      {
        name: 'Telugu Balala Padalu (తెలుగు అక్షరాలు & గేయాలు)',
        teluguName: 'తెలుగు అక్షరాలు & సరదా పాటలు',
        icon: 'Sparkles',
        summary: 'అచ్చులు (అ నుండి అః), సరళ పదాలు, చిట్టి చిలకమ్మ గేయాలు & నీతి కథలు.',
        coreTopics: ['అచ్చులు (అ, ఆ, ఇ, ఈ...)', 'చిట్టి చిలకమ్మ గేయాలు', 'రంగులు - పండ్లు - పూలు', 'అమ్మ, ఆవు, ఇల్లు పదాలు'],
        easyLessonKeyPoints: [
          'అ - అమ్మ (Loving Mother), ఆ - ఆవు (Sacred Cow), ఇ - ఇల్లు (Home).',
          'గేయం: "చిట్టి చిలకమ్మ, అమ్మ కొట్టిందా? తోటకు వెళ్ళావా? పండు తెచ్చావా?".',
          'తెలుగు తియ్యనైన భాష - మాట్లాడడం మన సంస్కృతి.'
        ],
        exercises: [
          {
            question: '"అమ్మ" అనే పదం ఏ అక్షరంతో మొదలవుతుంది?',
            options: ['ఆ', 'అ', 'ఇ', 'ఉ'],
            correctAnswer: 1,
            explanation: '"అమ్మ" పదం "అ" తో మొదలవుతుంది.'
          }
        ],
        webLinks: [
          { title: 'AP SCERT Foundational Telugu E-Books', url: 'https://apsert.gov.in/', badge: 'AP SCERT', desc: 'Official preschool & foundational Telugu picture books.' }
        ],
        videoLinks: [
          { title: 'Chitti Chilakamma & Telugu Rhymes in HD', url: 'https://www.youtube.com/watch?v=9XgNn8M-K3E', duration: '12 min', channel: 'Infobells Telugu' }
        ],
        books: [
          { title: 'బాలల తెలుగు చిత్ర కథలు', author: 'SCERT Telugu', downloadUrl: 'https://storyweaver.org.in/', previewUrl: 'https://storyweaver.org.in/', type: 'State Board' }
        ],
        games: [
          { title: 'Telugu Akshara Matching Game', type: 'Language Game', url: 'https://www.learningtelugu.org/', description: 'Match Telugu vowels with their corresponding pictures.' }
        ]
      }
    ]
  },
  {
    gradeId: 'class-1',
    gradeName: '1st Class (Grade 1)',
    teluguGradeName: '1వ తరగతి',
    ageRange: '5.5 - 6.5 Years',
    badge: 'Primary Level 1',
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    icon: 'GraduationCap',
    description: 'Single-digit addition & subtraction, word sentences, our family & environment (EVS), Telugu hallulu, Hindi varnamala basics.',
    teluguDescription: 'కూడికలు & తీసివేతలు, వాక్యాలు రాయడం, మన కుటుంబం & పరిసరాల విజ్ఞానం (EVS), హల్లులు.',
    subjects: [
      {
        name: 'Mathematics (Mridang / Joyful Math)',
        teluguName: 'గణితము (కూడికలు & తీసివేతలు)',
        icon: 'Calculator',
        summary: 'Numbers 1-100, single digit addition/subtraction, measurement with handspans, money coins.',
        coreTopics: ['Numbers up to 100', 'Addition (+)', 'Subtraction (-)', 'Spatial Reasoning (Top/Bottom)', 'Indian Coins & Notes'],
        easyLessonKeyPoints: [
          'Addition means PUTTING TOGETHER: 3 apples + 2 apples = 5 apples.',
          'Subtraction means TAKING AWAY: 5 balloons - 2 popped = 3 balloons left.',
          'Place Value: In 25, 2 is in Tens place (20) and 5 is in Ones place (5).'
        ],
        exercises: [
          {
            question: 'What is 7 + 5?',
            options: ['11', '12', '13', '14'],
            correctAnswer: 1,
            explanation: '7 + 5 = 12.'
          },
          {
            question: 'If Ravi had 9 pencils and gave 3 to his sister, how many are left?',
            options: ['5', '6', '7', '8'],
            correctAnswer: 1,
            explanation: '9 - 3 = 6 pencils left.'
          }
        ],
        webLinks: [
          { title: 'NCERT Class 1 Joyful Mathematics', url: 'https://ncert.nic.in/textbook.php?aemh1=0-13', badge: 'Official NCERT', desc: 'Full official NCERT Class 1 textbook with interactive chapters.' },
          { title: 'Aglasem NCERT Class 1 Maths Solutions', url: 'https://schools.aglasem.com/ncert-solutions-class-1-maths/', badge: 'Aglasem', desc: 'Chapter-by-chapter exercises with explanations and printable sheets.' }
        ],
        videoLinks: [
          { title: 'Class 1 Maths Addition and Subtraction Animation', url: 'https://www.youtube.com/watch?v=wXhXbO5QO2M', duration: '18 min', channel: 'Magnet Brains' },
          { title: 'PM eVIDYA Class 1 Mathematics TV Broadcast', url: 'https://www.youtube.com/watch?v=pm-evidya-class1', duration: '25 min', channel: 'NCERT Official PM eVIDYA' }
        ],
        books: [
          { title: 'Joyful Mathematics - Class 1', author: 'NCERT', downloadUrl: 'https://ncert.nic.in/textbook.php', previewUrl: 'https://ncert.nic.in/', type: 'NCERT' }
        ],
        games: [
          { title: 'Math Speed Addition Bingo', type: 'Speed Math', url: 'https://www.mathplayground.com/addition_blocks.html', description: 'Combine number blocks to reach the target sum.' }
        ]
      },
      {
        name: 'Environmental Studies & Science (EVS)',
        teluguName: 'పరిసరాల విజ్ఞానం (EVS)',
        icon: 'FlaskConical',
        summary: 'My body parts & senses, keeping clean, healthy food habits, animals & plants around us.',
        coreTopics: ['5 Sense Organs', 'Healthy Habits & Cleanliness', 'Plant Parts (Root, Stem, Leaf)', 'Domestic & Wild Animals'],
        easyLessonKeyPoints: [
          '5 Senses: Eyes see, Ears hear, Nose smells, Tongue tastes, Skin feels.',
          'Plants need Sunlight, Air, Water, and Soil to grow.',
          'Always wash hands before eating to keep germs away.'
        ],
        exercises: [
          {
            question: 'Which sense organ helps us taste sweet and sour food?',
            options: ['Nose', 'Tongue', 'Skin', 'Ear'],
            correctAnswer: 1,
            explanation: 'The tongue has taste buds that detect sweet, salty, sour, and bitter tastes.'
          }
        ],
        webLinks: [
          { title: 'Aglasem Class 1 EVS Practice Sheets', url: 'https://schools.aglasem.com/cbse-class-1-evs/', badge: 'Aglasem', desc: 'Worksheets on animals, plants, and body parts.' }
        ],
        videoLinks: [
          { title: 'Our 5 Senses Explained for Kids', url: 'https://www.youtube.com/watch?v=q1xNuU7gaAQ', duration: '12 min', channel: 'SciShow Kids' }
        ],
        books: [
          { title: 'Looking Around & Nature - Class 1', author: 'NCERT / CBSE', downloadUrl: 'https://ncert.nic.in/', previewUrl: 'https://ncert.nic.in/', type: 'NCERT' }
        ],
        games: [
          { title: 'Animal Habitat Sorter Game', type: 'Science Game', url: 'https://pbskids.org/wildkratts/games/creature-powers', description: 'Place wild animals in jungle, water, and desert habitats.' }
        ]
      }
    ]
  },
  {
    gradeId: 'class-2',
    gradeName: '2nd Class (Grade 2)',
    teluguGradeName: '2వ తరగతి',
    ageRange: '6.5 - 7.5 Years',
    badge: 'Primary Level 2',
    color: 'from-cyan-500 to-teal-600',
    bgLight: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    icon: 'Sparkles',
    description: 'Multiplication tables 2 to 10 basics, 2-digit borrowing/carrying, English grammar (Nouns, Verbs), water cycle, moral stories & craft.',
    teluguDescription: 'గుణకారాల ఎక్కాలు (2 నుండి 10), ఇంగ్లీష్ వ్యాకరణం (నామవాచకాలు), నీటి చక్రం, కథలు.',
    subjects: [
      {
        name: 'Mathematics (Joyful Math 2)',
        teluguName: 'గణితము (ఎక్కాలు & కూడికలు)',
        icon: 'Calculator',
        summary: '2-digit addition with regrouping, multiplication as repeated addition, clocks & reading time, calendar days.',
        coreTopics: ['Multiplication Tables (2 to 10)', '2-Digit Addition with Carry', 'Reading Clock Time (Half-past, O\'clock)', 'Shapes & Weights'],
        easyLessonKeyPoints: [
          'Multiplication is REPEATED ADDITION: 3 × 4 means adding 3 four times (3 + 3 + 3 + 3 = 12).',
          'Clock: The short hand tells the HOUR, the long hand tells the MINUTES. 1 hour = 60 minutes.',
          '1 Kilogram (kg) = 1000 Grams (g).'
        ],
        exercises: [
          {
            question: 'What is 4 × 6?',
            options: ['20', '24', '28', '18'],
            correctAnswer: 1,
            explanation: '4 × 6 = 24.'
          },
          {
            question: 'If the short clock hand is at 3 and long hand is at 12, what time is it?',
            options: ['12:15', '3:00', '3:30', '6:15'],
            correctAnswer: 1,
            explanation: 'When the long hand points to 12, it is exactly on the hour: 3:00.'
          }
        ],
        webLinks: [
          { title: 'Aglasem NCERT Class 2 Maths Solutions', url: 'https://schools.aglasem.com/ncert-solutions-class-2-maths/', badge: 'Aglasem', desc: 'Step-by-step solutions for class 2 math exercises.' },
          { title: 'Khan Academy Early Math', url: 'https://www.khanacademy.org/math/early-math', badge: 'Khan Academy', desc: 'Free interactive practice lessons with hints and video walkthroughs.' }
        ],
        videoLinks: [
          { title: 'Multiplication Tables 2 to 10 Super Fast Song', url: 'https://www.youtube.com/watch?v=e7rYbk9PNuM', duration: '14 min', channel: 'Math Songs' }
        ],
        books: [
          { title: 'Joyful Mathematics - Class 2', author: 'NCERT', downloadUrl: 'https://ncert.nic.in/textbook.php', previewUrl: 'https://ncert.nic.in/', type: 'NCERT' }
        ],
        games: [
          { title: 'Times Table Speed Racer', type: 'Math Game', url: 'https://www.mathplayground.com/multiplication01.html', description: 'Race cars by answering multiplication tables correctly.' }
        ]
      }
    ]
  },
  {
    gradeId: 'class-3',
    gradeName: '3rd Class (Grade 3)',
    teluguGradeName: '3వ తరగతి',
    ageRange: '7.5 - 8.5 Years',
    badge: 'Primary Level 3',
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    icon: 'Layers',
    description: 'Fractions introduction (1/2, 1/4), 3-digit multiplication, division basics, plant life cycles, community helpers & Telugu shatakam.',
    teluguDescription: 'భిన్నాలు (1/2, 1/4), భాగహారాలు, మొక్కల జీవిత చక్రం, సమాజ సేవకులు, వేమన శతకాలు.',
    subjects: [
      {
        name: 'Mathematics (Math Magic 3)',
        teluguName: 'గణితము (భిన్నాలు & భాగహారాలు)',
        icon: 'Calculator',
        summary: '3-digit operations, division sharing, fraction visual models (half, quarter), perimeter of squares & rectangles.',
        coreTopics: ['Division as Equal Sharing', 'Fractions (1/2, 1/3, 1/4)', 'Weight & Capacity (Liters & Milliliters)', 'Patterns & Symmetry'],
        easyLessonKeyPoints: [
          'Division: Sharing 12 chocolates among 3 friends = 12 ÷ 3 = 4 chocolates each.',
          'Fractions: 1/2 means one part out of two equal parts.',
          '1 Liter = 1000 Milliliters (ml).'
        ],
        exercises: [
          {
            question: 'What is 36 ÷ 6?',
            options: ['5', '6', '7', '8'],
            correctAnswer: 1,
            explanation: '6 × 6 = 36, so 36 ÷ 6 = 6.'
          },
          {
            question: 'What is half of 50?',
            options: ['20', '25', '30', '15'],
            correctAnswer: 1,
            explanation: '50 ÷ 2 = 25.'
          }
        ],
        webLinks: [
          { title: 'NCERT Class 3 Math Magic', url: 'https://ncert.nic.in/textbook.php?cemh1=0-14', badge: 'Official NCERT', desc: 'Official math magic interactive textbook.' },
          { title: 'Aglasem Class 3 NCERT Solutions', url: 'https://schools.aglasem.com/ncert-solutions-class-3-maths/', badge: 'Aglasem', desc: 'Solved exercises for all chapters.' }
        ],
        videoLinks: [
          { title: 'Introduction to Fractions with Pizza Slices', url: 'https://www.youtube.com/watch?v=CA9XLJpQp3c', duration: '11 min', channel: 'Math Antics' }
        ],
        books: [
          { title: 'Math-Magic Textbook Class 3', author: 'NCERT', downloadUrl: 'https://ncert.nic.in/textbook.php', previewUrl: 'https://ncert.nic.in/', type: 'NCERT' }
        ],
        games: [
          { title: 'Fraction Pizza Chef Game', type: 'Math Puzzle', url: 'https://www.mathplayground.com/fractions_fraction_matcher.html', description: 'Serve customers pizzas matching required fractions.' }
        ]
      }
    ]
  },
  {
    gradeId: 'class-4',
    gradeName: '4th Class (Grade 4)',
    teluguGradeName: '4వ తరగతి',
    ageRange: '8.5 - 9.5 Years',
    badge: 'Intermediate Primary',
    color: 'from-emerald-500 to-green-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    icon: 'FlaskConical',
    description: 'Long division, factor trees, area & perimeter formulas, solar system, states of India, English paragraph writing.',
    teluguDescription: 'దీర్ఘ భాగహారాలు, కారణాంకాలు, వైశాల్యం & చుట్టుకొలత, సౌరకుటుంబం, భారతదేశ రాష్ట్రాలు.',
    subjects: [
      {
        name: 'Science & Environmental Studies',
        teluguName: 'సైన్స్ & పరిసరాలు (EVS)',
        icon: 'FlaskConical',
        summary: 'Solar system planets, adaptations of animals, water purification, air pressure experiments.',
        coreTopics: ['8 Planets of Solar System', 'States of Matter (Solid, Liquid, Gas)', 'Digestive & Respiratory Organs', 'Sources of Water'],
        easyLessonKeyPoints: [
          'Planets in order from Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.',
          'Solids have fixed shape, Liquids take the container shape, Gases spread freely.',
          'Plants make food through Photosynthesis using Carbon Dioxide + Water + Sunlight.'
        ],
        exercises: [
          {
            question: 'Which is the largest planet in our solar system?',
            options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
            correctAnswer: 2,
            explanation: 'Jupiter is the largest planet in the solar system, more massive than all other planets combined.'
          }
        ],
        webLinks: [
          { title: 'Aglasem NCERT Class 4 EVS & Science', url: 'https://schools.aglasem.com/ncert-solutions-class-4-evs/', badge: 'Aglasem', desc: 'Chapter summaries and verified solutions.' },
          { title: 'NASA Space Place for Kids', url: 'https://spaceplace.nasa.gov/', badge: 'NASA', desc: 'Interactive 3D exploration of planets, stars, and rovers.' }
        ],
        videoLinks: [
          { title: 'Solar System Tour 4K Animation for Grade 4', url: 'https://www.youtube.com/watch?v=libKVRa01L8', duration: '16 min', channel: 'National Geographic Kids' }
        ],
        books: [
          { title: 'Looking Around Class 4 EVS', author: 'NCERT', downloadUrl: 'https://ncert.nic.in/textbook.php', previewUrl: 'https://ncert.nic.in/', type: 'NCERT' }
        ],
        games: [
          { title: 'Planet Orbit Simulator Game', type: 'Space Game', url: 'https://spaceplace.nasa.gov/solar-system-explorer/en/', description: 'Pilot a spacecraft across planets in the solar system.' }
        ]
      }
    ]
  },
  {
    gradeId: 'class-5',
    gradeName: '5th Class (Grade 5)',
    teluguGradeName: '5వ తరగతి',
    ageRange: '9.5 - 10.5 Years',
    badge: 'Upper Primary Capstone',
    color: 'from-purple-500 to-violet-600',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    icon: 'Award',
    description: 'Decimals, LCM & HCF, simple fractions, speed & distance, force & energy, world geography, English comprehension & creative essays.',
    teluguDescription: 'దశాంశాలు, క.సా.గు & గ.సా.భా, వేగం & దూరం, బలం & శక్తి, ప్రపంచ భౌగోళికం.',
    subjects: [
      {
        name: 'Mathematics (Math Magic 5)',
        teluguName: 'గణితము (దశాంశాలు & LCM/HCF)',
        icon: 'Calculator',
        summary: 'Factors & Multiples, LCM and HCF, Decimals addition/subtraction, Angles (Right, Acute, Obtuse), Area of rectangles.',
        coreTopics: ['LCM & HCF Finding', 'Decimals & Money Conversions', 'Types of Angles', 'Perimeter & Area Formulas'],
        easyLessonKeyPoints: [
          'HCF (Highest Common Factor) is the largest number that divides into all given numbers.',
          'LCM (Lowest Common Multiple) is the smallest number that is a multiple of both numbers.',
          'Angles: Acute (< 90°), Right Angle (= 90°), Obtuse (> 90° and < 180°).'
        ],
        exercises: [
          {
            question: 'What is the HCF of 12 and 18?',
            options: ['3', '6', '12', '36'],
            correctAnswer: 1,
            explanation: 'Factors of 12 are 1, 2, 3, 4, 6, 12. Factors of 18 are 1, 2, 3, 6, 9, 18. Highest Common Factor is 6.'
          },
          {
            question: 'What is an angle of 90 degrees called?',
            options: ['Acute Angle', 'Right Angle', 'Obtuse Angle', 'Straight Angle'],
            correctAnswer: 1,
            explanation: 'An exact 90-degree angle is known as a Right Angle.'
          }
        ],
        webLinks: [
          { title: 'Aglasem NCERT Class 5 Maths Solutions', url: 'https://schools.aglasem.com/ncert-solutions-class-5-maths/', badge: 'Aglasem', desc: 'Complete solved chapters and sample mock tests.' },
          { title: 'CalcSolver Math Equation Solver', url: 'https://www.wolframalpha.com/', badge: 'CalcSolver', desc: 'Step-by-step arithmetic and geometry calculation solver.' }
        ],
        videoLinks: [
          { title: 'LCM & HCF Explained in 10 Minutes with Tricks', url: 'https://www.youtube.com/watch?v=jFX5_g3jVBs', duration: '12 min', channel: 'Khan Academy India' }
        ],
        books: [
          { title: 'Math-Magic Textbook Class 5', author: 'NCERT', downloadUrl: 'https://ncert.nic.in/textbook.php', previewUrl: 'https://ncert.nic.in/', type: 'NCERT' }
        ],
        games: [
          { title: 'Angle Shoot Geometry Game', type: 'Math Game', url: 'https://www.mathplayground.com/alienangles.html', description: 'Estimate and shoot lasers at exact angles to hit target satellites.' }
        ]
      }
    ]
  },
  {
    gradeId: 'class-6-10',
    gradeName: '6th to 10th Class (High School)',
    teluguGradeName: '6 నుండి 10వ తరగతి (హైస్కూల్)',
    ageRange: '11 - 16 Years',
    badge: 'Middle & High School',
    color: 'from-blue-600 via-indigo-600 to-purple-700',
    bgLight: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    icon: 'GraduationCap',
    description: 'Algebraic equations, trigonometry, physics (electricity, optics), chemistry (periodic table, reactions), biology (cells, genetics), board exam prep & coding.',
    teluguDescription: 'బీజగణితం, త్రికోణమితి, భౌతికశాస్త్రం (విద్యుత్, కాంతి), రసాయనశాస్త్రం, జీవశాస్త్రం, 10వ తరగతి బోర్డు పరీక్షల మోడల్ పేపర్లు.',
    subjects: [
      {
        name: 'Mathematics (Class 6 - 10 Mastery)',
        teluguName: 'గణితము (బీజగణితం & త్రికోణమితి)',
        icon: 'Calculator',
        summary: 'Linear Equations, Quadratic Formulas, Triangles (Pythagoras Theorem), Trigonometry identities, Statistics & Probability.',
        coreTopics: ['Algebra & Quadratic Equations', 'Trigonometry (sin, cos, tan)', 'Coordinate Geometry', 'Surface Areas & Volumes', 'Probability'],
        easyLessonKeyPoints: [
          'Pythagoras Theorem: In a right-angled triangle, a² + b² = c² (Hypotenuse² = Base² + Perpendicular²).',
          'Quadratic Formula for ax² + bx + c = 0: x = (-b ± √(b² - 4ac)) / 2a.',
          'Trigonometry ratios: sin θ = Opposite / Hypotenuse, cos θ = Adjacent / Hypotenuse, tan θ = Opposite / Adjacent.'
        ],
        exercises: [
          {
            question: 'In a right triangle with base 3 cm and height 4 cm, what is the hypotenuse?',
            options: ['5 cm', '6 cm', '7 cm', '8 cm'],
            correctAnswer: 0,
            explanation: 'Using Pythagoras theorem: 3² + 4² = 9 + 16 = 25. √25 = 5 cm.'
          },
          {
            question: 'What is the value of sin 30°?',
            options: ['0', '1/2', '1/√2', '1'],
            correctAnswer: 1,
            explanation: 'sin 30° = 1/2 (or 0.5).'
          }
        ],
        webLinks: [
          { title: 'Aglasem NCERT Class 10 Maths Complete Solutions', url: 'https://schools.aglasem.com/ncert-solutions-class-10-maths/', badge: 'Board Exam Portal', desc: 'Chapter-wise solved exercises, theorem proofs, and previous 10-year question papers.' },
          { title: 'WolframAlpha Computational Intelligence', url: 'https://www.wolframalpha.com/', badge: 'CalcSolver', desc: 'Compute step-by-step solutions for equations, integrals, and matrices.' },
          { title: 'GeoGebra 3D Graphing Calculator', url: 'https://www.geogebra.org/calculator', badge: 'Interactive Graphing', desc: 'Interactive geometry constructions, 3D plots, and dynamic algebraic sliders.' }
        ],
        videoLinks: [
          { title: 'Complete Class 10 Trigonometry One-Shot Revision', url: 'https://www.youtube.com/watch?v=trig-oneshot-cbse', duration: '45 min', channel: 'Vedantu Class 9 & 10' },
          { title: 'Quadratic Equations Speed Tricks & Derivations', url: 'https://www.youtube.com/watch?v=quad-math-khan', duration: '20 min', channel: 'Khan Academy India' }
        ],
        books: [
          { title: 'NCERT Class 10 Mathematics Standard Textbook', author: 'NCERT', downloadUrl: 'https://ncert.nic.in/textbook.php', previewUrl: 'https://ncert.nic.in/', type: 'NCERT' },
          { title: 'Class 10 CBSE 10-Year Solved Sample Papers', author: 'Aglasem Experts', downloadUrl: 'https://schools.aglasem.com/cbse-sample-papers-class-10/', previewUrl: 'https://schools.aglasem.com/', type: 'NCERT' }
        ],
        games: [
          { title: 'Algebra Balance Equation Scales', type: 'Algebra Game', url: 'https://www.mathplayground.com/AlgebraEquations.html', description: 'Solve algebraic equations visually by balancing weights on two scales.' }
        ]
      },
      {
        name: 'Science (Physics, Chemistry & Biology)',
        teluguName: 'సైన్స్ (ఫిజిక్స్, కెమిస్ట్రీ, బయాలజీ)',
        icon: 'FlaskConical',
        summary: 'Ohm’s Law, Light Optics (Ray Diagrams), Chemical Reactions & Periodic Table, DNA & Heredity, Human Nervous System.',
        coreTopics: ['Electricity (V = IR & Circuits)', 'Optics (Concave & Convex Mirrors)', 'Chemical Equations & pH scale', 'Genetics & Mendel Laws'],
        easyLessonKeyPoints: [
          'Ohm’s Law: Voltage (V) = Current (I) × Resistance (R). Current is measured in Amperes (A).',
          'pH Scale: pH < 7 is Acidic (Lemon juice), pH = 7 is Neutral (Pure water), pH > 7 is Basic (Baking soda).',
          'Law of Conservation of Mass: Mass cannot be created or destroyed in a chemical reaction.'
        ],
        exercises: [
          {
            question: 'What is the SI unit of electric current?',
            options: ['Volt', 'Ampere', 'Ohm', 'Watt'],
            correctAnswer: 1,
            explanation: 'Electric current is measured in Amperes (A).'
          },
          {
            question: 'What is the pH value of pure distilled water?',
            options: ['0', '5', '7', '14'],
            correctAnswer: 2,
            explanation: 'Pure neutral water has a pH of 7 at 25°C.'
          }
        ],
        webLinks: [
          { title: 'PhET Interactive Science Simulations (Free)', url: 'https://phet.colorado.edu/en/simulations/browse', badge: 'PhET Colorado', desc: 'Free interactive HTML5 physics, chemistry, and biology labs.' },
          { title: 'Aglasem NCERT Class 10 Science Solutions', url: 'https://schools.aglasem.com/ncert-solutions-class-10-science/', badge: 'Aglasem', desc: 'Chapter-wise reactions, diagrams, and revision notes.' }
        ],
        videoLinks: [
          { title: 'Ray Diagrams for Spherical Mirrors Made Super Easy', url: 'https://www.youtube.com/watch?v=optics-physics-ncert', duration: '30 min', channel: 'Physics Wallah' },
          { title: 'Balancing Chemical Equations in 5 Seconds', url: 'https://www.youtube.com/watch?v=chem-reactions-fast', duration: '15 min', channel: 'Khan Academy' }
        ],
        books: [
          { title: 'NCERT Class 10 Science Official E-Book', author: 'NCERT', downloadUrl: 'https://ncert.nic.in/textbook.php', previewUrl: 'https://ncert.nic.in/', type: 'NCERT' }
        ],
        games: [
          { title: 'PhET Circuit Construction Simulator', type: 'Physics Simulator', url: 'https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html', description: 'Build interactive series and parallel circuits with batteries, lightbulbs, and switches.' }
        ]
      }
    ]
  }
];
