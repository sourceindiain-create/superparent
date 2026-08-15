import React, { useState } from 'react';
import { 
  Globe, 
  ExternalLink, 
  BookOpen, 
  Code, 
  Sparkles, 
  Compass, 
  Award,
  Languages,
  Mic,
  Video,
  Book,
  GraduationCap
} from 'lucide-react';

export const GlobalLearning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lang_lab' | 'global_portals'>('lang_lab');
  const [languageMode, setLanguageMode] = useState<'telugu_to_english' | 'hindi_to_english' | 'world_langs'>('telugu_to_english');

  const globalResources = [
    {
      title: 'Khan Academy Kids & Youth',
      category: 'Maths & Science',
      description: '100% Free interactive courses and videos for foundational learning and STEM practice.',
      url: 'https://www.khanacademy.org',
      badge: 'Free Global Partner'
    },
    {
      title: 'MIT Scratch Block Coding Lab',
      category: 'Coding & AI Basics',
      description: 'Visual drag-and-drop programming language created by MIT for youth game development.',
      url: 'https://scratch.mit.edu',
      badge: 'Interactive Coding'
    },
    {
      title: 'NASA Kids’ Club',
      category: 'Space & Robotics',
      description: 'Explore space missions, planetary physics, and astronaut games directly from NASA.',
      url: 'https://www.nasa.gov/kidsclub',
      badge: 'Space Exploration'
    },
    {
      title: 'Code.org Computer Science Studio',
      category: 'Computer Science',
      description: 'Learn logic, artificial intelligence concepts, and web fundamentals with interactive tutorials.',
      url: 'https://code.org',
      badge: 'Global CS Standard'
    },
    {
      title: 'National Geographic Kids',
      category: 'Geography & Animals',
      description: 'Engaging wildlife documentaries, science experiments, and global geography maps.',
      url: 'https://kids.nationalgeographic.com',
      badge: 'Nature & Science'
    },
    {
      title: 'Project Gutenberg Children’s Books',
      category: 'Literature Library',
      description: 'Over 60,000 free digital classic children’s eBooks and global folklore.',
      url: 'https://www.gutenberg.org',
      badge: 'Open E-Books'
    }
  ];

  const languageLabResources = [
    {
      title: 'BBC Learning English - English for Kids & Youth',
      teluguTitle: 'బిబిసి ఇంగ్లీష్ మాట్లాడే నేర్చుకునే ఉచిత వేదిక',
      type: 'Speaking & Fluency',
      desc: 'Free pronunciation, daily vocabulary, phrasal verbs, and listening audio podcasts.',
      url: 'https://www.bbc.co.uk/learningenglish/',
      badge: 'Gold Standard'
    },
    {
      title: 'Duolingo Free Language Practice (Telugu/Hindi Supported)',
      teluguTitle: 'డుయోలింగో ఉచిత భాషా శిక్షణ (తెలుగు & హిందీ)',
      type: 'Game-based Learning',
      desc: 'Bite-sized fun lessons to learn Spoken English, French, German, Spanish, and Japanese.',
      url: 'https://www.duolingo.com/',
      badge: 'Interactive Games'
    },
    {
      title: 'British Council English Kids & Teens',
      teluguTitle: 'బ్రిటిష్ కౌన్సిల్ ఉచిత ఇంగ్లీష్ కోర్సులు',
      desc: 'Interactive grammar games, video stories, songs, and speaking exercises tailored for students.',
      url: 'https://learnenglishkids.britishcouncil.org/',
      badge: 'British Council'
    },
    {
      title: 'NCERT English Pronunciation & Phonics Portal',
      teluguTitle: 'ఎన్‌సిఇఆర్‌టి ఫోనిక్స్ & స్ప్రింగ్ ఫొనెటిక్స్',
      desc: 'Dedicated phonics and English fluency audio guides for Indian school students.',
      url: 'https://ciet.ncert.gov.in/',
      badge: 'Indian Curriculum'
    },
    {
      title: 'OpenTalk Spoken English Practice Hub',
      teluguTitle: 'ఇంగ్లీష్ కమ్యూనికేషన్ స్కిల్స్ సాధన',
      desc: 'Practice real voice conversations, debate topics, and public speaking confidence.',
      url: 'https://www.oxfordonlineenglish.com/free-english-lessons',
      badge: 'Speaking Skills'
    },
    {
      title: 'Storyweaver Multilingual Children Storybooks',
      teluguTitle: 'కథల ద్వారా ఇంగ్లీష్, హిందీ & ప్రపంచ భాషలు',
      desc: 'Over 50,000 free illustrated storybooks in Telugu, Hindi, English, and 300+ world languages.',
      url: 'https://storyweaver.org.in/',
      badge: 'Multilingual Books'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/30">
            <Globe className="w-4 h-4 text-amber-200" />
            <span>తెలుగు • हिन्दी • English • Global Languages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
            🗣️ Kids Language Improvement & Global Learning Hub
          </h2>
          <p className="text-sm text-orange-100">
            Communication skills, Spoken English for Telugu & Hindi medium students, worldwide language learning, books, videos & world portals.
          </p>
        </div>
      </div>

      {/* Primary Tab Switcher */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2">
        <button
          onClick={() => setActiveTab('lang_lab')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'lang_lab'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span>Kids Language Improvement Lab (తెలుగు / हिन्दी / English)</span>
        </button>

        <button
          onClick={() => setActiveTab('global_portals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'global_portals'
              ? 'bg-orange-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Global Free Educational Portals</span>
        </button>
      </div>

      {/* VIEW 1: LANGUAGE IMPROVEMENT LAB */}
      {activeTab === 'lang_lab' && (
        <div className="space-y-6">
          {/* Target Filter Mode */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Communication & Fluency Focus:</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setLanguageMode('telugu_to_english')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  languageMode === 'telugu_to_english'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-amber-900 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                తెలుగు విద్యార్థుల కోసం (Telugu to Spoken English)
              </button>

              <button
                onClick={() => setLanguageMode('hindi_to_english')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  languageMode === 'hindi_to_english'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-amber-900 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                हिन्दी छात्रों के लिए (Hindi to Spoken English)
              </button>

              <button
                onClick={() => setLanguageMode('world_langs')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  languageMode === 'world_langs'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-amber-900 hover:bg-amber-100 border border-amber-200'
                }`}
              >
                ప్రపంచ భాషలు (French/Spanish/German)
              </button>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languageLabResources.map((res, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-orange-100 text-orange-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-orange-200">
                      {res.type || 'Language Lab'}
                    </span>
                    <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                      {res.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                      {res.title}
                    </h3>
                    {res.teluguTitle && (
                      <p className="text-xs text-orange-600 font-bold mt-1">
                        {res.teluguTitle}
                      </p>
                    )}
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {res.desc}
                    </p>
                  </div>
                </div>

                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-xs transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                  <span>Start Free Learning Course</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: GLOBAL PORTALS */}
      {activeTab === 'global_portals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {globalResources.map((res, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-orange-100 text-orange-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-orange-200">
                    {res.category}
                  </span>
                  <span className="bg-amber-50 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                    {res.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {res.description}
                  </p>
                </div>
              </div>

              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs shadow-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                <span>Explore Free Portal</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
