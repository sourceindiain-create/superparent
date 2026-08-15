import React, { useState } from 'react';
import { GITA_SHLOKAS } from '../data/mockData';
import { GitaShloka } from '../types';
import { 
  HeartHandshake, 
  Volume2, 
  VolumeX, 
  CheckCircle, 
  Star, 
  Sun, 
  Flame, 
  Sparkles, 
  BookOpen, 
  ShieldCheck,
  Flower2,
  Video,
  Image as ImageIcon,
  ExternalLink,
  Book,
  Smile
} from 'lucide-react';

export const SanskarHub: React.FC = () => {
  const [activeShloka, setActiveShloka] = useState<GitaShloka>(GITA_SHLOKAS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [gurukulSubTab, setGurukulSubTab] = useState<'shlokas' | 'gurukulam' | 'yoga' | 'rhymes' | 'visual_learning'>('shlokas');
  const [completedHabits, setCompletedHabits] = useState<Record<string, boolean>>({
    h1: true,
    h2: false,
    h3: true,
    h4: false
  });

  const dailyHabits = [
    { id: 'h1', title: 'పాదాభివందనం (Respect Elders)', points: 10 },
    { id: 'h2', title: 'నిత్య శ్లోక పఠనం (Recite 1 Gita Shloka)', points: 15 },
    { id: 'h3', title: 'సూర్య నమస్కారాలు (5 Surya Namaskars)', points: 15 },
    { id: 'h4', title: 'సత్యం వద, ధర్మం చర (Speak Truth Always)', points: 10 }
  ];

  const gurukulamResources = [
    {
      title: 'Free Digital Gurukulam Vedic Library',
      teluguTitle: 'ఉచిత డిజిటల్ గురుకులం విద్యా నిధి',
      category: 'Gurukulam Education',
      desc: 'Free Sanskrit alphabet, basic slokas, Panchatantra morals, and ancient Indian wisdom stories.',
      url: 'https://sanskritdocuments.org/',
      badge: 'Vedic Knowledge'
    },
    {
      title: 'NCERT Yoga for Kids Guide & Video Demos',
      teluguTitle: 'పిల్లల కోసం యోగాసనాలు & ప్రాణాయామం',
      category: 'Yoga for Kids',
      desc: 'Step-by-step illustrated yoga postures (Surya Namaskar, Vrikshasana, Pranayama) for memory.',
      url: 'https://ncert.nic.in/pdf/publication/otherpublications/tiykf1.pdf',
      badge: 'NCERT Official'
    },
    {
      title: 'Kids Sanskrit & Telugu Moral Rhymes & Audio',
      teluguTitle: 'పిల్లల పాటలు, శ్లోకాలు & వేమన పద్యాలు',
      category: 'Rhymes & Shlokas',
      desc: 'Listen and learn traditional kids rhymes, Vemana Padyalu, Sumati Satakam with music.',
      url: 'https://telugu.oneindia.com/',
      badge: 'Audio & Music'
    },
    {
      title: 'Visual Picture-based Subject Learning (Infographics)',
      teluguTitle: 'చిత్రాల ద్వారా సులువైన విద్యా బోధన',
      category: 'Image-Based Learning',
      desc: 'Diagrams, flashcards, and illustrated maps for Science, History, and Sanskrit vocabulary.',
      url: 'https://diksha.gov.in/',
      badge: 'Visual Memory'
    }
  ];

  const kidsRhymes = [
    {
      title: 'చేత వెన్నముద్ద చెంగల్వ పూదండ (Chetha Vennamudda)',
      type: 'Krishna Devotional Rhyme',
      meaning: 'Lord Krishna holding a ball of fresh butter and wearing a garland of blue water lilies.',
      audioText: 'చేత వెన్నముద్ద చెంగల్వ పూదండ తంగేటి జూడాలు తారహారము'
    },
    {
      title: 'ఉప్పు కప్పురంబు నొక్క పోలిక నుండు (Vemana Satakam)',
      type: 'Vemana Moral Verse',
      meaning: 'Salt and camphor look alike on the outside, but their true virtue is known by taste. Men of virtue are identified by their character.',
      audioText: 'ఉప్పు కప్పురంబు నొక్క పోలిక నుండు చూడ చూడ రుచులు జాడ వేరు పురుషులందు పుణ్య పురుషులు వేరయా విశ్వదాభిరామ వినుర వేమ'
    },
    {
      title: 'సరస్వతి నమస్తుభ్యం వరదే కామరూపిణి (Saraswati Vandana)',
      type: 'Sanskrit Vidyarambham Shloka',
      meaning: 'O Goddess Saraswati, bestower of boons, I begin my studies, grant me success.',
      audioText: 'సరస్వతి నమస్తుభ్యం వరదే కామరూపిణి విద్యారంభం కరిష్యామి సిద్ధిర్భవతు మే సదా'
    }
  ];

  const yogaPoses = [
    {
      title: '1. సూర్య నమస్కారాలు (Sun Salutation)',
      benefit: 'Boosts energy, height growth, and spinal flexibility for growing students.',
      reps: '5 Cycles Morning'
    },
    {
      title: '2. వృక్షాసనం (Tree Pose)',
      benefit: 'Improves balance, leg strength, and single-minded focus during study hours.',
      reps: ' Hold 30 seconds each leg'
    },
    {
      title: '3. భ్రమరీ ప్రాణాయామం (Bee Breathing)',
      benefit: 'Calms mind chatter, removes pre-exam anxiety, and enhances auditory memory.',
      reps: '10 Breaths Daily'
    }
  ];

  const handleSpeakShloka = (shlokaText: string) => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(shlokaText);
        utterance.rate = 0.85;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        setIsPlayingAudio(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert('Audio narration simulated!');
    }
  };

  const toggleHabit = (id: string) => {
    setCompletedHabits(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalPointsEarned = Object.entries(completedHabits).reduce((sum, [id, done]) => {
    if (!done) return sum;
    const h = dailyHabits.find(item => item.id === id);
    return sum + (h ? h.points : 0);
  }, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <HeartHandshake className="w-4 h-4 text-amber-200" />
            <span>ఉచిత గురుకులం • యోగా • చిన్న శ్లోకాలు & పద్యాలు</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            🕉️ Gurukulam, Values & Sanskrit Hub
          </h2>
          <p className="text-sm text-orange-50 font-medium">
            Ancient Indian values, Gita slokas, free Gurukulam learning, Yoga for kids, moral rhymes, and image-based easy subject learning.
          </p>
        </div>
      </div>

      {/* Gurukulam Sub-Menu Navigation Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setGurukulSubTab('shlokas')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              gurukulSubTab === 'shlokas'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>భగవద్గీత శ్లోకాలు (Gita Slokas)</span>
          </button>

          <button
            onClick={() => setGurukulSubTab('gurukulam')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              gurukulSubTab === 'gurukulam'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
            }`}
          >
            <Flower2 className="w-3.5 h-3.5" />
            <span>Free Gurukulam Resources</span>
          </button>

          <button
            onClick={() => setGurukulSubTab('yoga')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              gurukulSubTab === 'yoga'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            <span>Yoga for Kids (యోగా)</span>
          </button>

          <button
            onClick={() => setGurukulSubTab('rhymes')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              gurukulSubTab === 'rhymes'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Kids Rhymes & Shlokas (పాటలు)</span>
          </button>

          <button
            onClick={() => setGurukulSubTab('visual_learning')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              gurukulSubTab === 'visual_learning'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Image Easy Learning</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: GITA SHLOKAS & DAILY VALUES */}
      {gurukulSubTab === 'shlokas' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Gita Shloka Player */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <h3 className="font-black text-slate-900 text-lg">
                  భగవద్గీత శ్లోకాలు (Bhagavad Gita Shlokas)
                </h3>
              </div>
              <span className="bg-orange-50 text-orange-700 font-black text-xs px-3 py-1 rounded-full border border-orange-200">
                Chapter {activeShloka.chapter}, Verse {activeShloka.shlokaNum}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {GITA_SHLOKAS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveShloka(item);
                    if (isPlayingAudio) {
                      window.speechSynthesis.cancel();
                      setIsPlayingAudio(false);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeShloka.id === item.id
                      ? 'bg-orange-600 text-white shadow-xs font-black'
                      : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700 border border-slate-200'
                  }`}
                >
                  Verse {idx + 1}: Ch {item.chapter}.{item.shlokaNum}
                </button>
              ))}
            </div>

            <div className="bg-orange-50/40 p-6 rounded-2xl border border-orange-200/80 space-y-4 text-center">
              <div className="flex justify-center">
                <button
                  onClick={() => handleSpeakShloka(`${activeShloka.sanskrit}. ${activeShloka.teluguMeaning}`)}
                  className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black px-5 py-2.5 rounded-xl text-xs shadow-xs transition-all transform hover:scale-105"
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-4 h-4 animate-bounce" />
                      <span>Stop Audio Recitation</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Listen Shloka Recitation (ఆడియో పఠనం)</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-black text-orange-700 uppercase tracking-widest block">
                  సంస్కృత శ్లోకం (Sanskrit)
                </span>
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed px-2">
                  "{activeShloka.sanskrit}"
                </p>
              </div>

              <p className="text-xs text-orange-800 italic font-mono">
                {activeShloka.transliteration}
              </p>

              <div className="bg-white p-4 rounded-xl border border-orange-100 text-left space-y-1">
                <span className="text-[11px] font-black text-orange-700 uppercase tracking-wider block">
                  తెలుగు భావం (Telugu Meaning):
                </span>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  {activeShloka.teluguMeaning}
                </p>
              </div>

              <div className="bg-orange-100/80 p-3 rounded-xl text-left flex items-start gap-2.5 border border-orange-200">
                <Star className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-black text-orange-900 block">Student Life Reflection:</span>
                  <p className="text-xs text-orange-800 font-medium">{activeShloka.keyTakeaway}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Nitya Pooja Vidhanam & Daily Values Checklist */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Sun className="w-4 h-4 text-orange-500" />
                  <span>నైతిక అలవాట్లు (Daily Habits)</span>
                </h3>
                <span className="bg-orange-50 text-orange-700 font-black text-xs px-2.5 py-0.5 rounded-full border border-orange-200">
                  {totalPointsEarned} / 50 pts
                </span>
              </div>

              <div className="space-y-2">
                {dailyHabits.map((habit) => {
                  const isChecked = completedHabits[habit.id];
                  return (
                    <button
                      key={habit.id}
                      onClick={() => toggleHabit(habit.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold transition-all ${
                        isChecked
                          ? 'bg-orange-50 border-orange-300 text-orange-950 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 ${isChecked ? 'text-orange-600' : 'text-slate-300'}`} />
                        <span>{habit.title}</span>
                      </div>
                      <span className="text-[10px] text-orange-700 font-black">+{habit.points} pts</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-orange-50/50 rounded-3xl p-5 border border-orange-200 space-y-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-600" />
                <span>నిత్య పూజ విధానం (Nitya Pooja Guide)</span>
              </h3>

              <ol className="text-xs text-slate-800 space-y-2.5 list-decimal list-inside font-medium">
                <li className="bg-white p-2.5 rounded-xl border border-orange-100 shadow-2xs">
                  <strong className="text-orange-900">ఉదయాన్నే స్నానం & దీపారాధన:</strong> Light a lamp with parents in the morning.
                </li>
                <li className="bg-white p-2.5 rounded-xl border border-orange-100 shadow-2xs">
                  <strong className="text-orange-900">గాయత్రీ/సరస్వతీ శ్లోకం:</strong> Recite "సరస్వతి నమస్తుభ్యం వరదే కామరూపిణి".
                </li>
                <li className="bg-white p-2.5 rounded-xl border border-orange-100 shadow-2xs">
                  <strong className="text-orange-900">సూర్య నమస్కారం:</strong> Perform 5 counts of morning sun salutation for physical strength.
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: FREE GURUKULAM RESOURCES */}
      {gurukulSubTab === 'gurukulam' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {gurukulamResources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 hover:border-orange-300 p-5 shadow-xs hover:shadow-orange-card transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-orange-50 text-orange-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-orange-200">
                    {res.category}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
                    {res.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-black text-slate-900 text-base leading-snug">
                    {res.title}
                  </h3>
                  <p className="text-xs text-orange-600 font-black mt-0.5">
                    {res.teluguTitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                    {res.desc}
                  </p>
                </div>
              </div>

              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black py-2.5 rounded-xl text-xs shadow-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-white" />
                <span>Open Gurukulam Library</span>
              </a>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: YOGA FOR KIDS */}
      {gurukulSubTab === 'yoga' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
              <Smile className="w-5 h-5 text-orange-600" />
              <span>పిల్లల కోసం యోగాసనాలు & ప్రాణాయామం (Yoga for Kids)</span>
            </h3>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Daily morning yoga poses to improve physical posture, height growth, and focus during exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {yogaPoses.map((yoga, idx) => (
              <div key={idx} className="bg-orange-50/50 rounded-2xl p-5 border border-orange-200 space-y-3">
                <h4 className="font-black text-slate-900 text-base">
                  {yoga.title}
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {yoga.benefit}
                </p>
                <span className="inline-block bg-orange-100 text-orange-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-orange-200">
                  ⏱️ {yoga.reps}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: KIDS RHYMES & SHLOKAS */}
      {gurukulSubTab === 'rhymes' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-orange-600" />
              <span>పిల్లల పాటలు, పద్యాలు & ప్రార్థనా శ్లోకాలు</span>
            </h3>
          </div>

          <div className="space-y-4">
            {kidsRhymes.map((rhyme, idx) => (
              <div key={idx} className="bg-orange-50/40 p-4 rounded-2xl border border-orange-200 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-orange-200/60 pb-2">
                  <h4 className="font-black text-slate-900 text-sm">
                    {rhyme.title}
                  </h4>
                  <button
                    onClick={() => handleSpeakShloka(rhyme.audioText)}
                    className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white font-black px-3 py-1.5 rounded-xl text-xs shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen Audio Recitation</span>
                  </button>
                </div>

                <p className="text-xs font-bold text-slate-900 leading-relaxed bg-white p-3 rounded-xl border border-orange-100">
                  "{rhyme.audioText}"
                </p>

                <p className="text-xs text-slate-700">
                  <strong className="text-orange-900">భావం (Meaning):</strong> {rhyme.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 5: IMAGE-BASED EASY SUBJECT LEARNING */}
      {gurukulSubTab === 'visual_learning' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-orange-600" />
              <span>చిత్రాల ద్వారా సులువైన పాఠాల బోధన (Image-Based Subject Learning)</span>
            </h3>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              Visual flashcards for quick revision of Science, Social Studies, Maths shapes, and Indian culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-black text-slate-900 text-sm">
                1. Human Solar System & Planets Infographic
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Visual distance ordering of 8 planets around the Sun with Telugu names.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="font-black text-slate-900 text-sm">
                2. Plant Photosynthesis Diagram
              </h4>
              <p className="text-xs text-slate-600 font-medium">
                Chlorophyll, Sunlight, Carbon Dioxide, and Water absorption visual flowchart.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
