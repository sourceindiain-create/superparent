import { 
  StorySeries, 
  CultureVideoItem, 
  FreeBookResource, 
  DasubhashithamResource 
} from '../types';

export const STORY_SERIES_COLLECTION: StorySeries[] = [
  // ==========================================
  // 1. CHANDAMAMA KATHALU (చందమామ కథలు)
  // ==========================================
  {
    id: 'series-chandamama-betal',
    title: 'Vikram & Betal Stories (Chandamama Classic)',
    teluguTitle: 'చందమామ విక్రమార్క-బేతాళ కథలు',
    category: 'chandamama',
    badge: '🌙 Chandamama Legendary',
    authorOrSource: 'Chandamama Magazine Archives • B.V. Reddy & Kodavatiganti',
    totalChapters: 5,
    ageGroup: 'All Ages • Class 2 to 10',
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e37276?auto=format&fit=crop&w=800&q=80',
    description: 'The world-famous philosophical riddle stories where King Vikramaditya carries the corpse of Betala who poses deep moral dilemmas.',
    teluguDescription: 'ప్రతి కథ చివర బేతాళుడు విక్రమార్కుడిని అడిగే ధర్మసందేహం, విక్రమార్కుడి సరైన న్యాయతీర్పు - అద్భుతమైన చందమామ సంప్రదాయ కథలు.',
    externalArchiveLink: 'https://archive.org/details/chandamama-telugu',
    externalAudioLink: 'https://dasubhashitham.com/',
    featuredVideoUrl: 'https://www.youtube.com/results?search_query=chandamama+betala+kathalu+telugu',
    chapters: [
      {
        id: 'betal-ch-1',
        chapterNumber: 1,
        title: 'The Princess\'s Swayamvara & The Three Suitors',
        teluguTitle: 'రాకుమారి స్వయంవరం & ముగ్గురు యువకులు',
        duration: '6 mins',
        englishContent: 'King Vikramaditya climbed the ancient peepal tree, took down the corpse onto his shoulder, and walked silently through the cemetery. Betala inside the corpse spoke: "O King! To relieve the exhaustion of this dark night, listen to this story of Princess Chandralekha of Avanti." Three suitors arrived at the royal court: one possessed unmatched Vedic wisdom, the second had superhuman bravery in warfare, and the third was a master of divine healing arts. When the princess fell gravely ill, the wise man discovered the herbal cure, the warrior fought the mountain monster to obtain the herb, and the physician administered the medicine saving her life. Betala asked: "Tell me, Vikram, to whom should the princess be married? If you know the truth and keep silent, your head will burst into a thousand pieces!" Vikram replied: "The warrior risked his life as a duty, the wise man gave knowledge freely, but the physician acted as a father granting new life. Hence, the warrior who fought with courage is the true protector husband." As soon as Vikram broke his silence, Betala laughed and flew back to the tree.',
        teluguContent: 'విక్రమార్కుడు చెట్టుపై నుంచి శవాన్ని దించి భుజంపై వేసుకుని మౌనంగా నడుస్తుండగా బేతాళుడు కథ ప్రారంభించాడు: అవంతి రాకుమారి చంద్రలేఖ వివాహం కోసం ముగ్గురు యువకులు వచ్చారు. ఒకరు సకల శాస్త్ర కోవిదుడు, మరొకరు అజేయ వీరుడు, మూడవవారు ధన్వంతరి వంటి వైద్యుడు. రాకుమారికి విషజ్వరం వచ్చినప్పుడు, పండితుడు ఔషధం ఎక్కడుందో చెప్పాడు; వీరుడు కొండ రాక్షసుడిని సంహరించి ఔషధ మూలిక తెచ్చాడు; వైద్యుడు ప్రాణం పోశాడు. బేతాళుడు ప్రశ్నించాడు: "రాజా! రాకుమారిని ఎవరికి ఇచ్చి పెళ్లి చేయాలి? తెలిసి సమాధానం చెప్పకపోతే నీ తల పగిలిపోతుంది!" విక్రమార్కుడు బదులిచ్చాడు: "వైద్యుడు ప్రాణదాత కాబట్టి తండ్రి సమానుడు, పండితుడు మార్గదర్శి కాబట్టి గురువు సమానుడు; ప్రాణాలకు తెగించి పోరాడిన వీరుడే అసలైన భర్త కాదగినవాడు." సమాధానం వినగానే బేతాళుడు మళ్లీ చెట్టుపైకి ఎగిరిపోయాడు.',
        moralEnglish: 'True courage and selfless willingness to risk one’s life for another is the ultimate virtue of leadership and partnership.',
        moralTelugu: 'స్వార్థం లేకుండా ప్రాణాలను సైతం లెక్కచేయక కర్తవ్యాన్ని నిర్వహించే సాహసమే అసలైన ధర్మం.',
        videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoTitle: 'Betala Kathalu Episode 1 - Chandamama Animated',
        tags: ['Chandamama', 'Betal', 'Moral Dilemma', 'Telugu Classic']
      },
      {
        id: 'betal-ch-2',
        chapterNumber: 2,
        title: 'The Three Delicate Sons & The King\'s Test',
        teluguTitle: 'ముగ్గురు సుకుమార యువకులు & రాజు పరీక్ష',
        duration: '5 mins',
        englishContent: 'Betala began the second tale: King Dharmasena had three sons who were exceedingly sensitive. The eldest could not sleep if even a single hair was underneath seven layers of silk mattresses. The second could detect the smell of smoke from ten miles away and faint. The third would get burns on his skin if moonlight touched him during a full moon night. The king tested all three to see who was truly noble and genuine versus merely pampered and spoiled. Betala asked Vikram: "Who among the three was truly the most delicate and refined?" Vikram calmly answered: "The third son who received blisters from cool moonlight, because bodily reaction cannot be faked, whereas complaints about mattresses and smells can be exaggerated by arrogance." Having answered correctly, Betala flew back to the treetop.',
        teluguContent: 'బేతాళుడు రెండవ కథ చెప్పాడు: ధర్మసేనుడి ముగ్గురు కుమారులు విపరీతమైన సుకుమారులు. మొదటివాడు ఏడు పరుపుల కింద ఒక చిన్న వెంట్రుక ఉన్నా నిద్రపోలేడు; రెండవవాడు పది మైళ్ళ దూరం నుంచి పొగ వాసన చూసి స్పృహ తప్పుతాడు; మూడవవాడు పౌర్ణమి వెన్నెల తగిలితే శరీరంపై బొబ్బలు వస్తాయి. వీరిలో ఎవరు నిజమైన సుకుమారుడు అని బేతాళుడు అడిగాడు. విక్రమార్కుడు చెప్పాడు: "వెన్నెలకు బొబ్బలు రావడం అనేది సహజ శరీర లక్షణం, దాన్ని ఎవరూ నటించలేరు. కాబట్టి మూడవవాడే అసలైన సుకుమారుడు."',
        moralEnglish: 'Authentic qualities reveal themselves naturally through undeniable truth rather than spoken boasts.',
        moralTelugu: 'నిజమైన గుణాలు చేతలలో, సహజ ప్రవర్తనలో కనిపిస్తాయి కానీ ఆడంబర మాటల్లో కాదు.',
        videoEmbedUrl: '',
        videoTitle: 'Chandamama Betal Chapter 2',
        tags: ['Chandamama', 'Vikramaditya', 'Wit']
      },
      {
        id: 'betal-ch-3',
        chapterNumber: 3,
        title: 'The Generous Thief and the Honest King',
        teluguTitle: 'దాతృత్వ దొంగ & న్యాయవర్తనుడైన రాజు',
        duration: '7 mins',
        englishContent: 'In the kingdom of Kashi, a thief stole from corrupt hoarders and distributed grains to starving drought victims. When arrested, the king was amazed by his records showing every rupee spent on orphans. Betala asked whether the thief should be executed as a lawbreaker or honored as a philanthropist. Vikram answered: "Law must be upheld, but justice must consider intent. The king should punish the hoarders, pardon the thief, and appoint him as the charity overseer where his courage and heart serve society lawfully."',
        teluguContent: 'కాశీ నగరంలో ఒక దొంగ అవినీతిపరుల ధనాన్ని దొంగిలించి కరువులో ఉన్న పేదలకు, అనాథలకు పంచిపెట్టేవాడు. అతడిని పట్టుకున్నప్పుడు లెక్కలన్నీ చూపించాడు. ఇతడు నేరస్థుడా లేక దాతా? అని బేతాళుడు ప్రశ్నించాడు. విక్రమార్కుడు తీర్పునిచ్చాడు: "చట్టం ప్రకారం దొంగతనం నేరమే అయినా, అతడి సంకల్పం ప్రజాహితం. కాబట్టి దురాశపరులైన వ్యాపారులను శిక్షించి, ఈ యువకుడిని ధర్మశాల పర్యవేక్షకుడిగా నియమించి సద్వినియోగం చేసుకోవాలి."',
        moralEnglish: 'Justice is not merely blind rule-following; it understands the soul of morality and transforms individuals.',
        moralTelugu: 'న్యాయం అంటే కేవలం శిక్షించడం మాత్రమే కాదు, మనిషిలోని మంచిని గుర్తించి సరైన మార్గంలో నడిపించడం.',
        tags: ['Chandamama', 'Justice', 'Compassion']
      },
      {
        id: 'betal-ch-4',
        chapterNumber: 4,
        title: 'The Four Friends and the Created Lion',
        teluguTitle: 'నలుగురు మిత్రులు & ప్రాణం పోసిన సింహం',
        duration: '6 mins',
        englishContent: 'Four scholars walked through a jungle. Three were masters of esoteric book knowledge, while the fourth had only practical common sense. Finding a pile of bones, the first friend reassembled the skeleton, the second added flesh and blood, and the third began chanting a mantra to breathe life into it. The sensible fourth friend warned: "Stop! It is a wild lion; if you revive it, it will devour us all!" The scholars mocked him for lacking bookish power. The fourth friend quickly climbed a tall banyan tree. The lion roared to life and attacked the three boastful scholars, while the practical friend survived and returned safely home.',
        teluguContent: 'నలుగురు మిత్రులు అడవిలో వెళ్తుండగా ఎముకల కుప్ప కనిపించింది. ముగ్గురు మిత్రులు శాస్త్రజ్ఞానంతో అహంకరించి ఎముకలను అమర్చి, మాంసం రక్తం పోసి, ప్రాణం పోయడానికి సిద్ధపడ్డారు. నాలుగో మిత్రుడు లౌక్యజ్ఞానం కలవాడు: "మిత్రులారా! అది సింహం, దానికి ప్రాణం పోస్తే మనల్నే చంపుతుంది!" అని వారించాడు. వారు ఎగతాళి చేయగా అతడు చెట్టు ఎక్కాడు. సింహం బ్రతికి ఆ ముగ్గురినీ చంపేసింది. వివేకం ఉన్న నాలుగోవాడు ప్రాణాలతో బయటపడ్డాడు.',
        moralEnglish: 'Bookish theoretical knowledge without practical common sense and safety foresight leads to disaster.',
        moralTelugu: 'లౌక్యజ్ఞానం మరియు వివేకం లేని పుస్తక పాండిత్యం ప్రమాదకరం.',
        tags: ['Panchatantra', 'Chandamama', 'Wisdom']
      },
      {
        id: 'betal-ch-5',
        chapterNumber: 5,
        title: 'The Loyal Commander’s Ultimate Vow',
        teluguTitle: 'సేనాపతి స్వామిభక్తి & నిస్వార్థ త్యాగం',
        duration: '8 mins',
        englishContent: 'A brave commander discovered a plot against his benevolent king. To foil the enemy spy without causing civil panic, the commander took the blame upon himself temporarily, saved the king’s life during the coronation, and proved his loyalty with concrete evidence. Betala asked why true loyalty never asks for self-glorification. Vikram gave his crowning answer about selfless service (Nishkama Karma).',
        teluguContent: 'సేనాపతి తన ప్రాణాలను పణంగా పెట్టి దేశద్రోహుల కుట్రను భగ్నం చేశాడు. రాజాస్థానంలో నిందలు మోసినా చివరకు రాజు ప్రాణాలను కాపాడి దేశాన్ని కాపాడాడు. నిస్వార్థ దేశభక్తికి ఈ కథ నిదర్శనం.',
        moralEnglish: 'True loyalty and patriotism shine brightest during adversity without the need for personal credit.',
        moralTelugu: 'నిజమైన దేశభక్తి మరియు స్వామిభక్తి ఆపద సమయంలోనే బయటపడుతుంది.',
        tags: ['Chandamama', 'Loyalty', 'Courage']
      }
    ]
  },

  // ==========================================
  // 2. OLD BALAMITRA (బాలమిత్ర కథలు)
  // ==========================================
  {
    id: 'series-old-balamitra',
    title: 'Old Balamitra Classic Stories & Riddles',
    teluguTitle: 'పాత బాలమిత్ర కథలు, నీతులు & పొడుపు కథలు',
    category: 'balamitra',
    badge: '👦 Vintage Balamitra',
    authorOrSource: 'Balamitra Children’s Magazine • Classic 1960s-1990s Tales',
    totalChapters: 4,
    ageGroup: 'LKG to Class 8',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    description: 'Heartwarming moral fables, grandfather tales, tricky brain riddles (Podupu Kathalu), and humorous life lessons from the beloved golden era of Balamitra.',
    teluguDescription: 'మన పూర్వీకులు చదివిన అద్భుతమైన బాలమిత్ర కథలు - తాతగారి చెక్క గిన్నె, అబద్ధాల గొర్రెల కాపరి, తెలివైన జంతువులు మరియు విజ్ఞాన పొడుపు కథలు.',
    externalArchiveLink: 'https://archive.org/search.php?query=balamitra+telugu',
    externalAudioLink: 'https://dasubhashitham.com/',
    featuredVideoUrl: 'https://www.youtube.com/results?search_query=balamitra+telugu+stories+moral',
    chapters: [
      {
        id: 'balamitra-ch-1',
        chapterNumber: 1,
        title: 'The Grandfather’s Wooden Bowl (Respect for Elders)',
        teluguTitle: 'తాతగారి చెక్క గిన్నె కథ (పెద్దల పట్ల గౌరవం)',
        duration: '5 mins',
        englishContent: 'In a quiet village lived an old grandfather whose hands shook due to age. While eating, he occasionally dropped porcelain plates. His son and daughter-in-law became irritated and bought him an inexpensive wooden bowl, making him sit in a corner away from the dining table. The grandfather ate silently with tears in his eyes. One afternoon, the son saw his 6-year-old boy carving a piece of wood with small tools. The father asked fondly: "What are you making, my son?" The boy looked up innocently with large eyes and said: "Father, I am making a wooden bowl for you and mother, so that when you grow old and your hands shake, I can serve you food in this!" The words struck the parents like thunder. Weeping with remorse, they immediately took the grandfather’s hands, apologized with folded palms, and gave him the place of highest honor at the dining table forever.',
        teluguContent: 'ఒక ఊరిలో వృద్ధుడైన తాతగారు తన కొడుకు, కోడలు, మనవడితో కలిసి ఉండేవారు. వృద్ధాప్యం వల్ల ఆయన చేతులు వణికేవి. భోజనం చేసేటప్పుడు పింగాణీ పళ్లెం జారి పగిలిపోవడంతో కోడలు విసుక్కుని, ఆయనకు ఒక చిన్న చెక్క గిన్నె ఇచ్చి మూలన కూర్చోబెట్టింది. తాతగారు కన్నీళ్లతో మౌనంగా తినేవారు. ఒకరోజు 6 ఏళ్ల మనవడు చెక్క ముక్కను చెక్కుతుండటం చూసి తండ్రి: "ఏం చేస్తున్నావు నాయనా?" అని అడిగాడు. ఆ బాలుడు అమాయకంగా: "నాన్నా! మీరు, అమ్మా ముసలివాళ్ళయ్యాక మీ చేతులు వణుకుతాయి కదా, అప్పుడు మీకు అన్నం పెట్టడానికి చెక్క గిన్నె తయారు చేస్తున్నాను!" అన్నాడు. ఆ మాటతో తల్లిదండ్రుల కళ్లు తెరుచుకున్నాయి. పశ్చాత్తాపంతో తాతగారి కాళ్లకు నమస్కరించి ఆయనకు అత్యున్నత గౌరవం ఇచ్చారు.',
        moralEnglish: 'Children learn how to treat parents by watching how their parents treat grandparents. Respect and honor your elders.',
        moralTelugu: 'తల్లిదండ్రులను గౌరవించడం ఇంట్లోనే మొదలవుతుంది. మనం పెద్దలను ఎలా చూస్తే మన పిల్లలు మనల్ని అలాగే చూస్తారు.',
        videoEmbedUrl: '',
        videoTitle: 'Balamitra Classic - Thatha Chekka Ginne',
        tags: ['Balamitra', 'Sanskar', 'Values', 'Family Love']
      },
      {
        id: 'balamitra-ch-2',
        chapterNumber: 2,
        title: 'The Six Blind Men and the Elephant (Perspective)',
        teluguTitle: 'ఏనుగును తడిమిన ఆరుగురు అంధులు (దృష్టికోణం)',
        duration: '5 mins',
        englishContent: 'Six blind men visited the royal palace where an elephant stood. The first touched the broad side and declared: "The elephant is like a giant wall!" The second touched the sharp tusk and said: "No, it is like a spear!" The third held the trunk and argued: "It is like a thick serpent." The fourth touched the leg and claimed: "It is like a tree pillar." The fifth touched the large ear and said: "It is like a hand fan." The sixth pulled the tail and shouted: "You are all wrong, it is like a rope!" They began quarreling violently until a wise traveler smiled and said: "Each of you touched only a single part. Put all your truths together, and you will see the whole magnificent elephant!"',
        teluguContent: 'ఆరుగురు అంధులు రాజప్రాసాదానికి వెళ్లి ఏనుగును తాకారు. ఒకడు కడుపు తాకి "ఏనుగు గోడ లాంటిది" అన్నాడు; రెండవవాడు దంతాన్ని తాకి "ఈటె లాంటిది" అన్నాడు; మూడవవాడు తొండాన్ని పట్టుకుని "పాము లాంటిది" అన్నాడు; నాల్గవవాడు కాలును తాకి "చెట్టు స్తంభం లాంటిది" అన్నాడు; ఐదవవాడు చెవిని పట్టుకుని "విసనకర్ర లాంటిది" అన్నాడు; ఆరవవాడు తోకను తాకి "తాడు లాంటిది" అన్నాడు. అందరూ వాదించుకుంటుండగా వివేకవంతుడు వచ్చి: "మీరందరూ ఒక్కో భాగాన్ని మాత్రమే చూశారు. అందరి అభిప్రాయాలను కలిపి చూస్తేనే సంపూర్ణ ఏనుగు స్వరూపం తెలుస్తుంది" అని సర్దిచెప్పాడు.',
        moralEnglish: 'Do not fight over partial truths. Listen to differing viewpoints to understand the complete reality.',
        moralTelugu: 'విభిన్న దృక్కోణాలను గౌరవించాలి. అసంపూర్ణ జ్ఞానంతో ఇతరులతో గొడవపడకూడదు.',
        tags: ['Balamitra', 'Perspective', 'Philosophy']
      },
      {
        id: 'balamitra-ch-3',
        chapterNumber: 3,
        title: 'The Shepherd Boy & the Wolf (The Cost of Lies)',
        teluguTitle: 'అబద్ధాల గొర్రెల కాపరి & తోడేలు పరీక్ష',
        duration: '4 mins',
        englishContent: 'A mischievous shepherd boy bored on the hilltop cried out: "Wolf! Wolf! Save my sheep!" Villagers ran up with sticks, only to find the boy laughing at their frantic concern. He repeated the prank the next week. But on the third week, a pack of hungry wolves actually attacked the flock. The boy screamed frantically for help, but the villagers assumed it was another cruel joke and ignored his cries. The wolves scattered his flock.',
        teluguContent: 'ఒక గొర్రెల కాపరి బాలుడు సరదా కోసం "తోడేలు వచ్చింది... కాపాడండి!" అని అరిచాడు. గ్రామస్తులు పనులన్నీ వదిలి పరిగెత్తుకు వచ్చారు. వాడు నవ్వుతూ ఎగతాళి చేశాడు. రెండుసార్లు అలాగే చేశాడు. మూడవసారి నిజంగానే తోడేలు వచ్చింది. బాలుడు గట్టిగా కేకలు వేసినా గ్రామస్తులు మళ్లీ మోసం చేస్తున్నాడనుకుని రాలేదు. తోడేలు గొర్రెలను ఎత్తుకుపోయింది.',
        moralEnglish: 'A liar will not be believed even when he speaks the truth. Honesty builds trust.',
        moralTelugu: 'నిత్యం అబద్ధాలు ఆడేవారిని నిజం చెప్పినా ఎవరూ నమ్మరు. నిజాయితీయే రక్ష.',
        tags: ['Balamitra', 'Honesty', 'Childhood Fable']
      },
      {
        id: 'balamitra-ch-4',
        chapterNumber: 4,
        title: 'Balamitra Classic Riddles & Brain Sharpener (పొడుపు కథలు)',
        teluguTitle: 'బాలమిత్ర నిత్యజీవిత పొడుపు కథలు',
        duration: '4 mins',
        englishContent: 'Riddle 1: "I have teeth but cannot eat. What am I?" -> A Comb (దువ్వెన). Riddle 2: "I cry when my head is struck and give light to everyone. What am I?" -> A Matchstick (అగ్గిపుల్ల). Riddle 3: "Green house, white gate, black people inside. What am I?" -> Watermelon (పుచ్చకాయ). Riddle 4: "I go up and down but never move. What am I?" -> A Staircase (మెట్లు).',
        teluguContent: 'పొడుపు కథ 1: "పళ్ళు ఉంటాయి కానీ కొరకలేదు? - దువ్వెన". పొడుపు కథ 2: "తల గీస్తే వెలుగుతుంది, ప్రాణమిచ్చి దారి చూపుతుంది? - అగ్గిపుల్ల". పొడుపు కథ 3: "పచ్చటి ఇల్లు, తెల్లటి గడప, నల్లటి మనుషులు? - పుచ్చకాయ". పొడుపు కథ 4: "పైకి కిందికి వెళ్తుంది కానీ కదలదు? - మెట్లు".',
        moralEnglish: 'Riddles stimulate lateral thinking, memory, linguistic creativity, and cognitive agility.',
        moralTelugu: 'పొడుపు కథలు మెదడుకు పదును పెడతాయి మరియు ఆలోచనా శక్తిని విస్తృతం చేస్తాయి.',
        tags: ['Balamitra', 'Riddles', 'Brain Teaser']
      }
    ]
  },

  // ==========================================
  // 3. ANDHRA PRADESH CULTURE & HERITAGE (సంస్కృతి & కళలు)
  // ==========================================
  {
    id: 'series-andhra-culture',
    title: 'Andhra Pradesh Culture, Heritage & Folk Arts',
    teluguTitle: 'ఆంధ్రప్రదేశ్ సంస్కృతి, కళారూపాలు & వైభవం',
    category: 'andhra-culture',
    badge: '🦚 Andhra Heritage',
    authorOrSource: 'AP Department of Culture & Gurukul Heritage Archive',
    totalChapters: 6,
    ageGroup: 'All Ages • Students & Parents',
    coverImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    description: 'Explore the glorious traditions of Kuchipudi classical dance, Tholu Bommalata leather shadow puppetry, Burrakatha folk ballads, Kondapalli toy craft, Lepakshi temple mysteries, and Sankranti festivities.',
    teluguDescription: 'కూచిపూడి నృత్యం, తోలుబొమ్మలాట, బుర్రకథ, కలంకారి చిత్రాలు, లేపాక్షి శిల్పకళ, కొండపల్లి బొమ్మలు మరియు తెలుగు వారి సంక్రాంతి వైభవం.',
    externalArchiveLink: 'https://telugutourism.gov.in/',
    externalAudioLink: 'https://dasubhashitham.com/',
    featuredVideoUrl: 'https://www.youtube.com/results?search_query=andhra+pradesh+culture+folk+arts+kuchipudi',
    chapters: [
      {
        id: 'ap-cult-1',
        chapterNumber: 1,
        title: 'Kuchipudi: Andhra’s Divine Classical Dance Heritage',
        teluguTitle: 'కూచిపూడి నృత్యం: ఆంధ్రుల దివ్య నాట్య సంప్రదాయం',
        duration: '7 mins',
        englishContent: 'Originating in the village of Kuchipudi in Krishna district of Andhra Pradesh, Kuchipudi is one of the eight major Indian classical dances. Formulated by the saint Siddhendra Yogi in the 14th-15th century, it uniquely blends fast rhythmic footwork, expressive Natya (acting), soulful Carnatic music, and the iconic Tarangam—where the dancer balances gracefully on the rim of a brass plate while holding a pot of water on the head! Kuchipudi portrays timeless episodes of Bhama Kalapam and Krishna Leela.',
        teluguContent: 'ఆంధ్రప్రదేశ్ కృష్ణా జిల్లా కూచిపూడి గ్రామంలో జన్మించిన కూచిపూడి నృత్యం భారతదేశపు అత్యుత్తమ శాస్త్రీయ నృత్యాలలో ఒకటి. 14-15వ శతాబ్దంలో సిద్ధేంద్ర యోగి దీనిని శాస్త్రీయంగా తీర్చిదిద్దారు. నాట్యం, అభినయం, తాళం, భావంల సమ్మేళనంతో పాటు ఇత్తడి పళ్లెం అంచుపై నిలబడి నర్తించే "తరంగం" ఈ నృత్యానికి ప్రధాన ఆకర్షణ. భామాకలాపం, గొల్లకలాపం వంటి యక్షగానాలు కూచిపూడి ద్వారా విశ్వవిఖ్యాతి చెందాయి.',
        moralEnglish: 'Classical arts discipline both the mind and body, preserving centuries of spiritual culture and rhythmic elegance.',
        moralTelugu: 'శాస్త్రీయ లలిత కళలు ఏకాగ్రతను, సంస్కృతిని, శారీరక చురుకుదనాన్ని పెంపొందిస్తాయి.',
        videoEmbedUrl: 'https://www.youtube.com/embed/kuchipudi_sample',
        videoTitle: 'Kuchipudi Classical Dance Demonstration & Tarangam',
        tags: ['Kuchipudi', 'Classical Dance', 'Krishna District', 'Andhra Culture']
      },
      {
        id: 'ap-cult-2',
        chapterNumber: 2,
        title: 'Tholu Bommalata: Ancient Leather Shadow Puppetry of Andhra',
        teluguTitle: 'తోలుబొమ్మలాట: ఆంధ్రుల ప్రాచీన నీడ నాటక కళ',
        duration: '6 mins',
        englishContent: 'Tholu Bommalata (literally "play of leather dolls") is an ancient puppetry art of Rayalaseema and coastal Andhra. Master artisans craft articulated puppets from cured deer and goat hide, painting them with vibrant natural vegetable dyes. Behind a translucent white screen illuminated by oil lamps, master puppeteers manipulate the shadow puppets with sticks while singing epics from Ramayana and Mahabharata accompanied by cymbals, harmonium, and Mridangam.',
        teluguContent: 'తోలుబొమ్మలాట ఆంధ్రుల అతి ప్రాచీన జానపద కళారూపం. మేక, జింక చర్మాలను శుద్ధి చేసి సహజ రంగులతో రామాయణ, మహాభారత పాత్రల బొమ్మలను చెక్కుతారు. తెల్లటి పరదా వెనుక దీపపు వెలుగులో ఈ బొమ్మలను కర్రలతో ఆడిస్తూ తాళం, మృదంగ నాదాలతో గానం చేస్తారు. నిమల్లకుంట, మాచర్ల ప్రాంతాలలో ఈ కళ ఇప్పటికీ సజీవంగా ఉంది.',
        moralEnglish: 'Folk storytelling is an eco-friendly living theatre that transmitted moral epics to rural communities for millenniums.',
        moralTelugu: 'ప్రాచీన జానపద కళలు తరతరాల కథలను, సంస్కారాన్ని సమాజానికి చేరువ చేసే సజీవ మాధ్యమాలు.',
        videoEmbedUrl: 'https://www.youtube.com/embed/tholu_bommalata',
        videoTitle: 'Tholu Bommalata Puppetry Documentary',
        tags: ['Tholu Bommalata', 'Folk Art', 'Nimmalakunta', 'Shadow Puppetry']
      },
      {
        id: 'ap-cult-3',
        chapterNumber: 3,
        title: 'Burrakatha & Harikatha: The Roar of Andhra Ballad Storytelling',
        teluguTitle: 'బుర్రకథ & హరికథ: జానపద కథాగాన వైభవం',
        duration: '6 mins',
        englishContent: 'Burrakatha is the dynamic trio performance of Andhra storytelling: the Kathakudu (main teller holding Tambura and Andelu), flanked by the Rajkiya Hasyagadu (political humorist) and the Audience Voice. Together, they narrate patriotic tales of Alluri Sitarama Raju, Rani Rudrama Devi, and Bobbili Yuddham. Harikatha, championed by pioneers like Adibhatla Narayana Dasu, blends classical music, slokas, and witty commentary to narrate divine stories.',
        teluguContent: 'బుర్రకథ తెలుగు నాట ప్రజలను చైతన్యవంతం చేసిన జానపద కళారూపం. తంబుర, అందెలు ధరించిన కథకుడు మధ్యలో ఉండగా, అటు ఇటు హాస్యగాడు, వంతగాడు ఉంటారు. అల్లూరి సీతారామరాజు, బొబ్బిలి యుద్ధం, పల్నాటి వీరచరిత్రలను అద్భుతంగా గానం చేస్తారు. ఆదిభట్ల నారాయణదాసు గారు హరికథా పితామహుడిగా ఖ్యాతి పొందారు.',
        moralEnglish: 'Inspiring ballads awaken patriotism, civic consciousness, and historical pride in youth.',
        moralTelugu: 'వీరగాథలు యువతలో దేశభక్తిని, సమాజం పట్ల బాధ్యతను రగిలిస్తాయి.',
        videoEmbedUrl: '',
        videoTitle: 'Burrakatha Performance Video',
        tags: ['Burrakatha', 'Harikatha', 'Folk Ballad', 'Alluri Sitarama Raju']
      },
      {
        id: 'ap-cult-4',
        chapterNumber: 4,
        title: 'Kondapalli & Etikoppaka Eco-Friendly Toy Craft',
        teluguTitle: 'కొండపల్లి & ఏటికొప్పాక చెక్క బొమ్మల కళ',
        duration: '5 mins',
        englishContent: 'Crafted from soft Tella Poniki wood, Kondapalli toys near Vijayawada depict the famous Ambari Elephant, Dasavatara sets, and rural village life. In Etikoppaka (Visakhapatnam district), artisans use Ankudu wood and non-toxic lacquer extracted from natural seeds and roots to create safe, glossy wooden toys cherished worldwide with Geographical Indication (GI) status.',
        teluguContent: 'విజయవాడ సమీపంలోని కొండపల్లి గ్రామంలో తెల్ల పొనికి చెక్కతో అంబారీ ఏనుగు, దసరా బొమ్మలు తయారు చేస్తారు. విశాఖపట్నం జిల్లా ఏటికొప్పాకలో అంకుడు చెక్కతో సహజ లక్క రంగులు ఉపయోగించి పిల్లలకు హానిచేయని అందమైన లక్క బొమ్మలు చేస్తారు. వీటికి భౌగోళిక గుర్తింపు (GI Tag) లభించింది.',
        moralEnglish: 'Handmade eco-friendly crafts preserve indigenous biodiversity, child health, and local artisan livelihoods.',
        moralTelugu: 'ప్రకృతి సిద్ధమైన చెక్క బొమ్మలు పర్యావరణానికి మేలు చేస్తాయి, మన చేతివృత్తులను కాపాడతాయి.',
        videoEmbedUrl: '',
        videoTitle: 'Kondapalli & Etikoppaka Wooden Toy Making',
        tags: ['Kondapalli', 'Etikoppaka', 'GI Tag', 'Handicraft']
      },
      {
        id: 'ap-cult-5',
        chapterNumber: 5,
        title: 'Kalamkari: The Ancient Hand-Painted Textile Art of Srikalahasti',
        teluguTitle: 'శ్రీకాళహస్తి & మచిలీపట్నం కలంకారి చిత్రకళ',
        duration: '5 mins',
        englishContent: 'Kalamkari (meaning "art made with a bamboo pen") originated over 3000 years ago. Using tamarind twig charcoal for sketching, bamboo pens (Kalam), and natural dyes extracted from madder root, pomegranate rind, and indigo, artisans illustrate temple panels depicting Ramayana, Krishna Leela, and Tree of Life motifs.',
        teluguContent: 'వెదురు కలంతో సహజ రంగులతో వస్త్రాలపై చిత్రించే అద్భుత కళ కలంకారి. శ్రీకాళహస్తిలో చేతితో గీసే కలంకారి పద్ధతి, మచిలీపట్నంలో చెక్క దిమ్మెల అద్దకం ప్రసిద్ధి. దానిమ్మ తొక్క, నీలిమందు వంటి సహజ పదార్థాలతో ఈ రంగులను తయారు చేస్తారు.',
        moralEnglish: 'Nature provides every color needed for art; sustainable craftsmanship endures for centuries.',
        moralTelugu: 'ప్రకృతి ప్రసాదించిన సహజ రంగులతో సృష్టించే కళ ఎప్పటికీ నిలిచి ఉంటుంది.',
        tags: ['Kalamkari', 'Srikalahasti', 'Machilipatnam', 'Textile Art']
      },
      {
        id: 'ap-cult-6',
        chapterNumber: 6,
        title: 'Lepakshi & Grand Festivals of Andhra (Sankranti Haridasu)',
        teluguTitle: 'లేపాక్షి శిల్పకళారహస్యం & సంక్రాంతి హరిదాసులు',
        duration: '7 mins',
        englishContent: 'Built during the Vijayanagara Empire, the Veerabhadra Temple in Lepakshi (Anantapur) is world-famous for its Hanging Pillar that does not touch the ground, and the monolithic Nandi bull carved out of a single granite rock. During Sankranti, Andhra villages come alive with Haridasu singing "Harilo Ranga Hari" with copper pots on their heads, decorated Gangireddu bull dancers, and intricate Muggu rangolis.',
        teluguContent: 'విజయనగర రాజుల కాలంలో నిర్మితమైన లేపాక్షి వీరభద్రాలయం (అనంతపురం) నేలను తాకని "వేలాడే స్తంభం", ఏకశిలా నంది విగ్రహానికి ప్రపంచ ప్రసిద్ధి. సంక్రాంతి పండుగ వేళ తలపై అక్షయపాత్రతో "హరిలో రంగ హరి" అంటూ వచ్చే హరిదాసులు, గంగిరెద్దుల విన్యాసాలు, గొబ్బెమ్మలు తెలుగు సంస్కృతికి ప్రతీకలు.',
        moralEnglish: 'Festivals unite agricultural gratitude, family bonding, and architectural brilliance in harmony.',
        moralTelugu: 'పండుగలు వ్యవసాయ శ్రమను, ప్రకృతి పట్ల కృతజ్ఞతను, కుటుంబ అనుబంధాలను ఏకం చేస్తాయి.',
        tags: ['Lepakshi', 'Sankranti', 'Haridasu', 'Heritage']
      }
    ]
  },

  // ==========================================
  // 4. PANCHATANTRA (పంచతంత్రం కథలు)
  // ==========================================
  {
    id: 'series-panchatantra-classics',
    title: 'Panchatantra Wisdom Tales (Full Chapters)',
    teluguTitle: 'విష్ణుశర్మ పంచతంత్రం నీతికథల సంపుటి',
    category: 'panchatantra',
    badge: '🦁 Ancient Panchatantra',
    authorOrSource: 'Pandit Vishnu Sharma • Classical Sanskrit & Telugu Fables',
    totalChapters: 3,
    ageGroup: 'LKG to Class 10',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    description: 'The world’s oldest moral governance stories taught by Pandit Vishnu Sharma to young princes through five strategic books: Mitra Bhedam, Mitra Labham, and Sandhi-Vigraham.',
    teluguDescription: 'మిత్రభేదం, మిత్రలాభం, సంధి-విగ్రహం - పిల్లలలో నాయకత్వ లక్షణాలు, స్నేహం మరియు వివేకాన్ని పెంచే ప్రాచీన పంచతంత్ర కథలు.',
    externalArchiveLink: 'https://archive.org/search.php?query=panchatantra+telugu',
    externalAudioLink: 'https://dasubhashitham.com/',
    chapters: [
      {
        id: 'panch-ch-1',
        chapterNumber: 1,
        title: 'The Lion and the Clever Rabbit at the Well',
        teluguTitle: 'మదమెక్కిన సింహం & తెలివైన కుందేలు',
        duration: '5 mins',
        englishContent: 'A ferocious lion named Bhasuraka killed animals mercilessly in the forest. The animals negotiated to send one animal daily for his meal. When it was the little rabbit’s turn, he walked very slowly and arrived late. The enraged lion roared: "Why are you late, tiny creature?" The rabbit bowed and whispered: "Your Majesty, on my way, another gigantic lion claiming to be the true king stopped me and challenged your rule!" Furious, the lion demanded to be led to the rival. The rabbit brought him to a deep water well and pointed inside. Seeing his own reflection roaring back and hearing the echo, the foolish lion leaped into the well and drowned. The small rabbit saved the entire forest.',
        teluguContent: 'భాసురకము అనే క్రూర సింహం అడవిలోని జంతువులను విచక్షణారహితంగా చంపేస్తుండగా, జంతువులన్నీ కలిసి రోజుకొకరు స్వయంగా ఆహారంగా వస్తామని ఒప్పందం చేసుకున్నాయి. ఒకరోజు తెలివైన చిన్న కుందేలు వంతు వచ్చింది. అది నెమ్మదిగా నడుస్తూ ఆలస్యంగా వెళ్ళింది. సింహం కోపంతో గర్జించగా, కుందేలు వినయంగా: "రాజా! దారిలో నన్ను మరొక పెద్ద సింహం ఆపి, తనే అసలైన అడవికి రాజని గర్జించింది" అని చెప్పింది. ఆగ్రహించిన సింహం ఆ శత్రువును చూపించమంది. కుందేలు దానిని ఒక లోతైన బావి వద్దకు తీసుకెళ్ళింది. బావి నీటిలో తన ప్రతిబింబాన్ని చూసి శత్రువనుకుని గర్జించి బావిలోకి దూకి చనిపోయింది. చిన్న కుందేలు తన తెలివితో అడవి జంతువులందరినీ కాపాడింది.',
        moralEnglish: 'Intelligence and calm strategy overcome raw brute strength every single time.',
        moralTelugu: 'శరీర బలం కంటే ఆలోచనా బలం మరియు ఉపాయం ఎంతో గొప్పది.',
        tags: ['Panchatantra', 'Intelligence', 'Bravery']
      },
      {
        id: 'panch-ch-2',
        chapterNumber: 2,
        title: 'Four True Friends: Deer, Crow, Mouse & Tortoise (Mitra Labham)',
        teluguTitle: 'మిత్రలాభం: నలుగురు మిత్రుల అద్భుత ఐక్యమత్యం',
        duration: '6 mins',
        englishContent: 'In a peaceful forest lived four unlikely friends: a deer (Chitrangada), a crow (Laghupatanaka), a mouse (Hiranyaka), and a tortoise (Mantharaka). When the deer was trapped in a hunter’s strong net, the crow flew to inform the others. The mouse quickly gnawed the ropes with sharp teeth. When the hunter returned, the crow cawed an alert, the deer bounded away, the mouse hid in a hole, and the slow tortoise was caught in the hunter’s bag. To save the tortoise, the deer pretended to be dead near the river, and the crow sat on its eye. The greedy hunter dropped his bag and walked towards the deer. Instantly, the mouse cut the bag freeing the tortoise into the water, while the deer and crow sprang away! All four friends rejoiced in safety.',
        teluguContent: 'ఒక అడవిలో జింక (చిత్రాంగుడు), కాకి (లఘుపతనకుడు), ఎలుక (హిరణ్యకుడు), తాబేలు (మంథరకుడు) అనే నలుగురు ప్రాణస్నేహితులు ఉండేవారు. జింక వేటగాడి వలలో చిక్కుకున్నప్పుడు ఎలుక తన పళ్ళతో వలను కొరికి కాపాడింది. కానీ నెమ్మదిగా ఉండే తాబేలు వేటగాడి చేతికి చిక్కింది. తాబేలును కాపాడటానికి జింక చనిపోయినట్లు నది ఒడ్డున పడుకోగా, కాకి దాని కన్ను పొడుస్తున్నట్లు నటించింది. వేటగాడు ఆశతో తాబేలు సంచిని కిందపడేసి జింక వైపు నడవగానే, ఎలుక సంచిని కొరికి తాబేలును నీటిలోకి పంపింది; జింక, కాకి తుర్రున ఎగిరిపోయాయి. నలుగురు మిత్రులు ఐక్యతతో విజయం సాధించారు.',
        moralEnglish: 'Unity among faithful friends of diverse talents can defeat any formidable adversity.',
        moralTelugu: 'ఐకమత్యమే మహాబలం. నిస్వార్థ స్నేహితులు ఆపదలో ఒకరికొకరు తోడుగా నిలుస్తారు.',
        tags: ['Panchatantra', 'Mitra Labham', 'Friendship', 'Unity']
      },
      {
        id: 'panch-ch-3',
        chapterNumber: 3,
        title: 'The Monkey and the Crocodile’s Heart',
        teluguTitle: 'కోతి మరియు మొసలి కథ (విశ్వాసఘాతుకం)',
        duration: '5 mins',
        englishContent: 'A monkey named Raktamukha lived on a sweet jamun tree beside a river. He became friends with a crocodile named Karalamukha, gifting him juicy fruits daily. The crocodile’s wife grew greedy and demanded to eat the monkey’s sweet heart. The crocodile reluctantly invited the monkey for dinner on his back. In the middle of the river, he confessed the truth. Thinking quickly, the clever monkey smiled: "Oh friend, why didn’t you tell me earlier? I keep my delicate heart safe in a hollow of the jamun tree! Take me back quickly so I can fetch it." The foolish crocodile swam back, and the monkey leaped onto the tall branches, laughing: "Does anyone keep their heart on a tree? Your betrayal has ended our friendship!"',
        teluguContent: 'నదీ తీరంలోని నేరేడు చెట్టుపై ఉన్న కోతి నదిలోని మొసలికి రోజూ తియ్యని పండ్లను ఇచ్చి స్నేహం చేసింది. మొసలి భార్య ఆ పండ్లు తినే కోతి గుండె ఎంత మధురంగా ఉంటుందో అని ఆశపడి, దాని గుండె కావాలని పట్టుబట్టింది. మొసలి కోతిని వీపుపై ఎక్కించుకుని నది మధ్యలోకి వెళ్ళాక నిజాన్ని చెప్పింది. కోతి సమయస్ఫూర్తితో: "మిత్రమా! నా గుండెను చెట్టు తొర్రలో భద్రంగా దాచాను, తిరిగి తీసుకెళ్తే తెచ్చిస్తాను" అంది. మొసలి ఒడ్డుకు తీసుకెళ్లగానే కోతి చెట్టెక్కి "గుండెను ఎవరైనా చెట్టుపై దాచుకుంటారా? నీ ద్రోహంతో మన స్నేహం ముగిసింది" అని హెచ్చరించింది.',
        moralEnglish: 'Presence of mind and quick wit can rescue you from the deadliest traps of deceit.',
        moralTelugu: 'సమయస్ఫూర్తితో ఆలోచిస్తే ఎంతటి ఆపద నుంచైనా సురక్షితంగా బయటపడవచ్చు.',
        tags: ['Panchatantra', 'Presence of Mind', 'Wit']
      }
    ]
  },

  // ==========================================
  // 5. TENALI RAMA (తెనాలి రామకృష్ణ కథలు)
  // ==========================================
  {
    id: 'series-tenali-rama',
    title: 'Tenali Ramakrishna Wit & Humor Classics',
    teluguTitle: 'వికటకవి తెనాలి రామకృష్ణ హాస్య కథలు',
    category: 'tenali-rama',
    badge: '👑 Royal Court Wit',
    authorOrSource: 'Sri Krishnadevaraya Court Chronicles • Tenali Stories',
    totalChapters: 3,
    ageGroup: 'Class 1 to 10',
    coverImage: 'https://images.unsplash.com/photo-1509021436468-d510300e5720?auto=format&fit=crop&w=800&q=80',
    description: 'Delight in the sharp wit, court parables, logic puzzles, and laughter of Tenali Ramalinga in the grand Vijayanagara Empire of Sri Krishnadevaraya.',
    teluguDescription: 'శ్రీకృష్ణదేవరాయల ఆస్థానంలో తెనాలి రామకృష్ణుడి చమత్కారాలు, దొంగలతో తోట తవ్వించిన విధం మరియు పచ్చిగడ్డి గుర్రం కథ.',
    externalArchiveLink: 'https://archive.org/search.php?query=tenali+rama+telugu',
    externalAudioLink: 'https://dasubhashitham.com/',
    chapters: [
      {
        id: 'tenali-ch-1',
        chapterNumber: 1,
        title: 'Tenali Rama and the Thieves in the Garden',
        teluguTitle: 'దొంగలతో తోట తవ్వించిన తెనాలి రామకృష్ణుడు',
        duration: '5 mins',
        englishContent: 'Two clever thieves hid in Tenali Rama’s backyard garden at night, waiting to break into his house. Tenali noticed their shadows and loudly told his wife: "Dear, robbers are roaming the town. Let us put all our gold jewels and silver coins into this heavy iron trunk and hide it at the bottom of our deep well!" With his wife’s help, Tenali dragged a heavy wooden trunk filled with rocks and tossed it into the well with a loud splash. The excited thieves spent the entire night hauling bucket after bucket of water to empty the well. The water flowed directly into Tenali’s vegetable plants and mango trees. At sunrise, exhausted and soaked, the thieves finally pulled up the trunk only to find stones! Tenali came out smiling with folded hands: "Thank you, good sirs! My garden is fully watered, and you saved my gardener three days of labor!" The thieves fled in shame.',
        teluguContent: 'తెనాలి రామకృష్ణుడి పెరటి తోటలో రాత్రివేళ ఇద్దరు దొంగలు దాక్కున్నారు. రామకృష్ణుడు వారిని గమనించి భార్యతో గట్టిగా: "ఊళ్లో దొంగల భయం ఎక్కువైంది, మన బంగారు నగలు, వెండి నాణేలను ఈ పెట్టెలో పెట్టి పెరటి బావిలో దాచేద్దాం" అని చెప్పాడు. రాళ్లు నింపిన బరువైన పెట్టెను బావిలో పడేశాడు. ఆ పెట్టెను తీయడానికి దొంగలు రాత్రంతా బావిలోని నీటిని తోడి పోశారు. ఆ నీరంతా రామకృష్ణుడి కూరగాయల పాదులకు, తోటకు పారింది. తెల్లవారేసరికి దొంగలు పెట్టె తీసి చూడగా రాళ్లు కనిపించాయి! రామకృష్ణుడు బయటకు వచ్చి: "అయ్యా! నా తోట మొత్తానికి నీరు పారించి నా పని సులువు చేసినందుకు ధన్యవాదాలు" అనగానే దొంగలు సిగ్గుతో పారిపోయారు.',
        moralEnglish: 'Turn a threatening situation to your productive advantage through humor, calm awareness, and tactical intellect.',
        moralTelugu: 'ఆపద వచ్చినప్పుడు కంగారు పడకుండా సమయస్ఫూర్తితో సమస్యను తనకు అనుకూలంగా మార్చుకోవాలి.',
        tags: ['Tenali Rama', 'Humor', 'Wit', 'Clever Strategy']
      },
      {
        id: 'tenali-ch-2',
        chapterNumber: 2,
        title: 'The Strange Horse That Ate No Green Grass',
        teluguTitle: 'పచ్చిగడ్డి తినని విచిత్రమైన గుర్రం కథ',
        duration: '5 mins',
        englishContent: 'An arrogant royal horse breeder challenged King Krishnadevaraya that nobody could train horses better than him. Tenali took a spirited young horse and kept it in a tiny dark stall with only a tiny slit for food. He fed the horse delicious oats through the slit, but whenever fresh green grass appeared, he poked it through the slit. When the day of inspection arrived, the breeder’s horses were restless, but Tenali’s horse behaved with total discipline. When the king placed green grass before Tenali’s horse, the horse refused to touch it and waited patiently for the royal command! Tenali demonstrated that disciplined training relies on habit formation rather than excessive indulgence.',
        teluguContent: 'రాజాస్థానంలో గుర్రాల శిక్షణపై పోటీ జరిగింది. తెనాలి రామకృష్ణుడు ఒక గుర్రాన్ని తెచ్చి క్రమశిక్షణతో తగినంత ఆహారంతో శిక్షణ ఇచ్చాడు. రాజుగారి సమక్షంలో పరీక్ష పెట్టినప్పుడు రామకృష్ణుడి గుర్రం చూపిన క్రమశిక్షణ చూసి రాయలవారు ఆనందించి బహుమతులు ప్రదానం చేశారు.',
        moralEnglish: 'True excellence in skill and habit comes from measured discipline and patience.',
        moralTelugu: 'క్రమశిక్షణ మరియు ఓర్పుతో కూడిన సాధన ఎల్లప్పుడూ ఘన విజయాన్ని అందిస్తుంది.',
        tags: ['Tenali Rama', 'Discipline', 'Krishnadevaraya']
      },
      {
        id: 'tenali-ch-3',
        chapterNumber: 3,
        title: 'Painting the Invisible Horse in the Royal Court',
        teluguTitle: 'కంటికి కనిపించని గుర్రం చిత్రం',
        duration: '5 mins',
        englishContent: 'A famous royal artist showed the King a painting of a warrior on horseback and won praise. The King boasted that any painting can be imagined. Tenali Rama accepted a wager to bring a masterpiece in one month. On the appointed day, Tenali brought a blank canvas with only a horse’s tail painted on the far edge. The court laughed. Tenali calmly explained: "Your Majesty, this is the finest stallion in the world. He was so fast that he galloped past the frame in a split second, and only his tail is captured!" The King burst into laughter, admired Tenali’s wit, and rewarded him handsomely.',
        teluguContent: 'ఒక చిత్రకారుడి గర్వాన్ని అణచడానికి తెనాలి రామకృష్ణుడు ఒక నెల రోజుల తర్వాత ఒక తెల్ల కాన్వాస్ అంచున కేవలం గుర్రపు తోకను మాత్రమే గీసి తెచ్చాడు. "రాజా! ఇది ప్రపంచంలోనే అత్యంత వేగవంతమైన గుర్రం, ఇది ఎంత వేగంగా పరుగెత్తిందంటే కేవలం తోక మాత్రమే ఫ్రేమ్‌లో మిగిలింది" అని చమత్కరించాడు. రాయలవారు రామకృష్ణుడి హాస్యానికి మెచ్చి సత్కరించారు.',
        moralEnglish: 'Humor and satire are delightful artistic tools to dispel arrogance and lighten the burdens of society.',
        moralTelugu: 'హాస్యం మరియు వ్యంగ్యం అహంకారాన్ని పటాపంచలు చేసి ఆనందాన్ని నింపుతాయి.',
        tags: ['Tenali Rama', 'Court Art', 'Humor']
      }
    ]
  }
];

// ==========================================
// 6. ANDHRA PRADESH CULTURE VIDEOS
// ==========================================
export const CULTURE_VIDEOS_LIST: CultureVideoItem[] = [
  {
    id: 'vid-kuchipudi-mastery',
    title: 'Kuchipudi Classical Dance: Siddhendra Yogi Tradition',
    teluguTitle: 'కూచిపూడి నృత్యం: తాళ లయ విన్యాసం & తరంగం',
    category: 'Dance & Arts',
    districtOrRegion: 'Krishna District (కూచిపూడి గ్రామం)',
    duration: '12 mins',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    youtubeIdOrEmbed: 'https://www.youtube.com/results?search_query=kuchipudi+dance+performance+andhra',
    description: 'Witness the grace of Kuchipudi dance movements, mudras, Bhavas, and the breathtaking brass plate Tarangam balancing act.',
    teluguDescription: 'కూచిపూడి నృత్య ముద్రలు, అభినయం, భావం మరియు ఇత్తడి పళ్లెంపై నర్తించే దివ్య తరంగ నృత్య ప్రదర్శన.',
    culturalSignificance: 'Formulated in the 14th century, it represents Andhra’s UNESCO-recognized classical performing art heritage.'
  },
  {
    id: 'vid-tholu-bommalata',
    title: 'Tholu Bommalata: Leather Shadow Puppetry of Rayalaseema',
    teluguTitle: 'తోలుబొమ్మలాట: రామాయణ పద్యాలు & నీడ నాటకం',
    category: 'Folk Storytelling',
    districtOrRegion: 'Anantapur / Nimmalakunta (నిమల్లకుంట)',
    duration: '10 mins',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=600&q=80',
    youtubeIdOrEmbed: 'https://www.youtube.com/results?search_query=tholu+bommalata+andhra+pradesh+documentary',
    description: 'Fascinating documentary on how master artisans cure goat hide, paint natural dyes, and bring Ramayana characters to life behind the screen.',
    teluguDescription: 'చర్మంపై రంగులు అద్దడం నుంచి తెర వెనుక రామాయణ మహాభారత పాత్రలను ఆడించే తోలుబొమ్మలాట కళాకారుల జీవన విధానం.',
    culturalSignificance: 'One of the oldest shadow puppet traditions in human history with vibrant natural coloring techniques.'
  },
  {
    id: 'vid-kondapalli-craft',
    title: 'Kondapalli & Etikoppaka Wooden Toy Making Art',
    teluguTitle: 'కొండపల్లి & ఏటికొప్పాక చెక్క బొమ్మల తయారీ',
    category: 'Handicrafts & Heritage',
    districtOrRegion: 'NTR / Visakhapatnam Districts (కొండపల్లి & ఏటికొప్పాక)',
    duration: '8 mins',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=600&q=80',
    youtubeIdOrEmbed: 'https://www.youtube.com/results?search_query=kondapalli+toys+making+documentary',
    description: 'Explore the delicate wood carving of Tella Poniki wood and the organic vegetable lacquer spinning of Etikoppaka GI toys.',
    teluguDescription: 'తెల్ల పొనికి చెక్కతో కొండపల్లి బొమ్మలు మరియు సహజ లక్క రంగులతో ఏటికొప్పాక బొమ్మలు తయారు చేసే ప్రక్రియ.',
    culturalSignificance: '400+ years old royal handicraft tradition with global Geographical Indication (GI) status.'
  },
  {
    id: 'vid-lepakshi-temple',
    title: 'Lepakshi Temple Architecture & Hanging Pillar Mystery',
    teluguTitle: 'లేపాక్షి వీరభద్రాలయం: వేలాడే స్తంభం & ఏకశిలా నంది',
    category: 'Historical Monuments',
    districtOrRegion: 'Sri Sathya Sai District (లేపాక్షి)',
    duration: '14 mins',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=600&q=80',
    youtubeIdOrEmbed: 'https://www.youtube.com/results?search_query=lepakshi+temple+hanging+pillar+mystery',
    description: 'High definition architectural tour of the 16th century Vijayanagara marvel featuring the floating pillar and monolithic Nandi.',
    teluguDescription: 'నేలను తాకకుండా గాల్లో వేలాడే అద్భుత స్తంభం, ఏకశిలా నంది మరియు రామాయణ జటాయువు చరిత్ర కలిగిన లేపాక్షి క్షేత్రం.',
    culturalSignificance: 'Pinnacle of South Indian Vijayanagara rock architecture and world-famous fresco paintings.'
  },
  {
    id: 'vid-sankranti-celebrations',
    title: 'Andhra Sankranti: Haridasu Songs, Gangireddu & Bhogi',
    teluguTitle: 'ఆంధ్రుల పెద్ద పండుగ సంక్రాంతి: హరిదాసులు & గంగిరెద్దులు',
    category: 'Festivals & Rituals',
    districtOrRegion: 'Godavari & Coastal Andhra (గోదావరి జిల్లాలు)',
    duration: '11 mins',
    thumbnailUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=600&q=80',
    youtubeIdOrEmbed: 'https://www.youtube.com/results?search_query=sankranti+haridasu+andhra+pradesh+culture',
    description: 'Immerse in the harvest festive cheer: Bhogi mantalu, Haridasu singing, Gangireddu folk dance, and colorful muggulu rangolis.',
    teluguDescription: 'భోగి మంటలు, హరిదాసుల కీర్తనలు, గంగిరెద్దుల సన్నాయి నాదాలు, గొబ్బెమ్మలు మరియు కోడిపందాలు - తెలుగు వారి సంక్రాంతి శోభ.',
    culturalSignificance: 'The greatest harvest festival connecting agriculture, gratitude to Sun God and cattle, and traditional arts.'
  }
];

// ==========================================
// 7. FREE BOOKS & E-BOOKS REPOSITORY
// ==========================================
export const FREE_BOOKS_COLLECTION: FreeBookResource[] = [
  {
    id: 'book-chandamama-archive',
    title: 'Chandamama Telugu Vintage Magazine (1947-2008 Archive)',
    teluguTitle: 'చందమామ తెలుగు మాసపత్రికల సంపూర్ణ డిజిటల్ ఆర్కైవ్',
    category: 'Chandamama Archives',
    author: 'Edited by Kodavatiganti Kutumbarao & B.V. Reddy',
    totalPages: 64,
    language: 'Telugu',
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e37276?auto=format&fit=crop&w=600&q=80',
    description: 'Complete high-resolution scanned digital library of Chandamama issues with original color illustrations, moral stories, mythological tales, and serialized sagas.',
    readOnlineUrl: 'https://archive.org/details/chandamama-telugu',
    downloadPdfUrl: 'https://archive.org/search.php?query=chandamama+telugu',
    isFreePublicDomain: true,
    sampleChaptersPreview: [
      { chapterTitle: 'చందమామ - విక్రమార్క బేతాళ ప్రశ్న', content: 'ప్రతి సంచికలోనూ ప్రచురితమైన బేతాళ కథలు పిల్లలలో తార్కిక ఆలోచనను రేకెత్తిస్తాయి.' },
      { chapterTitle: 'చందమామ - గుణవంతుడు & మాయా మంత్రాలు', content: 'సాహస కథలు, రాకుమారుల ప్రయాణాలు మరియు నీతి కథలు.' }
    ]
  },
  {
    id: 'book-balamitra-classics',
    title: 'Old Balamitra Storybook Collection (బాలమిత్ర సంకలనం)',
    teluguTitle: 'పాత బాలమిత్ర పిల్లల కథల రత్నాలు',
    category: 'Balamitra Classic',
    author: 'Balamitra Editorial Board',
    totalPages: 96,
    language: 'Telugu',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    description: 'A timeless treasure of bedtime stories, witty animal parables, moral fables, and mind-sharpening riddles (Podupu Kathalu) loved by generations of Telugu families.',
    readOnlineUrl: 'https://archive.org/search.php?query=balamitra+telugu',
    downloadPdfUrl: 'https://archive.org/details/balamitra-stories',
    isFreePublicDomain: true,
    sampleChaptersPreview: [
      { chapterTitle: 'బాలమిత్ర - నీతి కథలు', content: 'నిజాయితీ, కష్టపడే తత్వం, గురుభక్తి మరియు తల్లిదండ్రుల పట్ల ప్రేమను బోధించే కథలు.' },
      { chapterTitle: 'బాలమిత్ర - పొడుపు కథల సంపుటి', content: 'వందలాది తెలుగు పొడుపు కథలు మరియు సమాధానాలు.' }
    ]
  },
  {
    id: 'book-panchatantra-bilingual',
    title: 'Panchatantra Illustrated Illustrated Treasury (Bilingual)',
    teluguTitle: 'పంచతంత్రం సచిత్ర కథలు (తెలుగు & ఇంగ్లీష్)',
    category: 'Moral Storybooks',
    author: 'Pandit Vishnu Sharma / National Book Trust Collection',
    totalPages: 120,
    language: 'Bilingual (Telugu & English)',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    description: 'Illustrated bilingual editions with side-by-side English and Telugu text, teaching diplomacy, friendship, problem-solving, and leadership.',
    readOnlineUrl: 'https://archive.org/search.php?query=panchatantra+telugu+english',
    downloadPdfUrl: 'https://archive.org/details/panchatantra-bilingual',
    isFreePublicDomain: true
  },
  {
    id: 'book-nbt-children-classics',
    title: 'National Book Trust (NBT) Telugu Children’s Classics',
    teluguTitle: 'ఎన్.బి.టి (NBT) తెలుగు బాల సాహిత్య పుస్తకాలు',
    category: 'National Book Trust',
    author: 'National Book Trust India (NBT)',
    totalPages: 80,
    language: 'Telugu',
    coverImage: 'https://images.unsplash.com/photo-1509021436468-d510300e5720?auto=format&fit=crop&w=600&q=80',
    description: 'Government of India National Book Trust children’s publications featuring science fiction, nature explorations, Indian freedom fighters, and moral parables.',
    readOnlineUrl: 'https://www.nbtindia.gov.in/',
    downloadPdfUrl: 'https://archive.org/details/nbt-children-telugu',
    isFreePublicDomain: true
  },
  {
    id: 'book-telugu-veera-kathalu',
    title: 'Tales of Andhra Heroes & Heroines (తెలుగు వీరగాథలు)',
    teluguTitle: 'ఆంధ్ర వీరుల చరిత్రలు: అల్లూరి, రుద్రమదేవి, నాయకురాలు నాగమ్మ',
    category: 'Telugu Literature',
    author: 'AP Sahitya Akademi Archives',
    totalPages: 140,
    language: 'Telugu',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    description: 'Gripping historical biographies of Alluri Sitarama Raju, Rani Rudrama Devi, Krishnadevaraya, and Amaravathi legends written for students.',
    readOnlineUrl: 'https://archive.org/search.php?query=telugu+charitra+kathalu',
    isFreePublicDomain: true
  }
];

// ==========================================
// 8. DASUBHASHITHAM WEBLINK & AUDIOBOOK SHOWCASE
// ==========================================
export const DASUBHASHITHAM_SHOWCASE = {
  platformName: 'Dasubhashitham (దాసుభాషితం)',
  tagline: 'The Ultimate Telugu Audiobooks, Stories & Literary Platform',
  teluguTagline: 'తెలుగు ఆడియో పుస్తకాల అమృత భాండాగారం • చందమామ కథలు & మహాకావ్యాలు',
  officialWebsiteUrl: 'https://dasubhashitham.com/',
  androidPlayStoreUrl: 'https://play.google.com/store/apps/details?id=com.dasubhashitham',
  appleAppStoreUrl: 'https://apps.apple.com/app/dasubhashitham/id1439221192',
  description: 'Dasubhashitham is the premier digital streaming platform for classical Telugu audiobooks, historical novels, short stories, Telugu Mahakavyalu (Mahabharatam, Ramayanam, Bhagavatam), and children’s literature narrated by celebrated Telugu voice artists.',
  teluguDescription: 'దాసుభాషితం (Dasubhashitham) - తెలుగు భాషాభిమానులు, విద్యార్థులు, తల్లిదండ్రుల కోసం రూపొందించబడిన ప్రముఖ ఆడియో పుస్తకాల వేదిక. చందమామ కథలు, కన్యాశుల్కం, బారిష్టర్ పార్వతీశం, వేయి పడగలు, అమరావతి కథలు మరియు మహాకావ్యాలు మధురమైన గళాలలో ఉచితంగా వినవచ్చు.',
  featuredAudios: [
    {
      id: 'dasu-1',
      title: 'Chandamama Telugu Audio Stories (దాసుభాషితం చందమామ కథలు)',
      teluguTitle: 'చందమామ బేతాళ & నీతికథల ఆడియో సీరీస్',
      category: 'Children Classic',
      authorOrNarrator: 'Professional Telugu Voice Theatre',
      durationOrEpisodes: '50+ Audio Episodes',
      thumbnailUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e37276?auto=format&fit=crop&w=600&q=80',
      description: 'High-quality studio recordings of original Chandamama stories with ambient background music and sound effects.',
      teluguDescription: 'అసలైన చందమామ కథలు సంగీత నాటకీయతతో పిల్లల కోసం ప్రత్యేకంగా రికార్డ్ చేయబడిన ఆడియో కథలు.',
      directWebUrl: 'https://dasubhashitham.com/',
      dasubhashithamAppUrl: 'https://play.google.com/store/apps/details?id=com.dasubhashitham',
      recommendedFor: 'LKG to 10th Class Students & Bedtime Listening'
    },
    {
      id: 'dasu-2',
      title: 'Barrister Parvateesam (బారిష్టర్ పార్వతీశం హాస్య నవల)',
      teluguTitle: 'మొక్కపాటి నరసింహశాస్త్రి గారి అమర హాస్య కావ్యం',
      category: 'Novels & Short Stories',
      authorOrNarrator: 'Mokkapati Narasimha Sastry • Audio Novel',
      durationOrEpisodes: '24 Audio Chapters',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509021436468-d510300e5720?auto=format&fit=crop&w=600&q=80',
      description: 'The hilarious adventures of young Parvateesam traveling from Narsapuram to London, presenting innocent wit and timeless humor.',
      teluguDescription: 'నరసాపురం నుంచి లండన్ ప్రయాణించిన పార్వతీశం అమాయకపు చేష్టలు మరియు స్వచ్ఛమైన తెలుగు హాస్యం.',
      directWebUrl: 'https://dasubhashitham.com/',
      dasubhashithamAppUrl: 'https://play.google.com/store/apps/details?id=com.dasubhashitham',
      recommendedFor: 'Whole Family & Telugu Literature Lovers'
    },
    {
      id: 'dasu-3',
      title: 'Amaravathi Kathalu by Satyam Sankaramanchi',
      teluguTitle: 'సత్యం శంకరమంచి అమరావతి కథలు (సాహిత్య అకాడమీ పురస్కారం)',
      category: 'Novels & Short Stories',
      authorOrNarrator: 'Satyam Sankaramanchi • Sahitya Akademi Winner',
      durationOrEpisodes: '100 Short Audio Episodes',
      thumbnailUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
      description: 'The golden classic of Krishna riverbank life, heritage, human values, and compassion in the sacred soil of Amaravathi.',
      teluguDescription: 'కృష్ణా తీరపు అమరావతి పల్లె జీవితాలు, మానవతా విలువలు మరియు భక్తి భావాలతో నిండిన అమర కథలు.',
      directWebUrl: 'https://dasubhashitham.com/',
      dasubhashithamAppUrl: 'https://play.google.com/store/apps/details?id=com.dasubhashitham',
      recommendedFor: 'Students & Parents for Moral & Cultural Depth'
    },
    {
      id: 'dasu-4',
      title: 'Pothana Bhagavatam & Mahabharata Katha Sravanam',
      teluguTitle: 'పోతన భాగవత కథలు & నన్నయ-తిక్కన-ఎర్రన మహాభారతం',
      category: 'Telugu Mahakavyalu',
      authorOrNarrator: 'Eminent Telugu Scholars & Pandits',
      durationOrEpisodes: 'Complete Audio Pravachanalu',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      description: 'Devotional, poetic audio discourses explaining Pothana padyalu, Prahlada Charitra, Gajendra Moksham, and Bhagavad Gita.',
      teluguDescription: 'ప్రహ్లాద చరిత్ర, గజేంద్ర మోక్షం, రుక్మిణీ కళ్యాణం వంటి భక్తి కథలు మరియు మధురమైన పద్యాల తాత్పర్యాలు.',
      directWebUrl: 'https://dasubhashitham.com/',
      dasubhashithamAppUrl: 'https://play.google.com/store/apps/details?id=com.dasubhashitham',
      recommendedFor: 'Daily Morning & Evening Family Listening'
    }
  ]
};
