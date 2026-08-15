import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Trophy, 
  Cpu, 
  Bot, 
  HeartHandshake, 
  ThumbsUp, 
  Star, 
  MessageSquare, 
  Share2, 
  CheckCircle2, 
  PlusCircle, 
  Clock, 
  Flame, 
  Award, 
  ArrowRight,
  Heart,
  Send,
  ShieldCheck,
  Zap,
  Bookmark
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { NavTab } from '../types';
import { db } from '../lib/firebase';
import { collection, onSnapshot, doc, setDoc, updateDoc } from 'firebase/firestore';

export interface ActivityFeedItem {
  id: string;
  type: 'milestone' | 'project' | 'ai_interaction' | 'sanskar';
  studentName: string;
  studentGrade: string;
  avatar: string;
  title: string;
  teluguTitle: string;
  description: string;
  teluguDescription: string;
  hub: NavTab;
  hubLabel: string;
  timestamp: string;
  artifactBadge?: string;
  xpEarned: number;
  likes: number;
  starsAwarded: number;
  blessings: number;
  comments: {
    author: string;
    role: string;
    text: string;
    time: string;
  }[];
  userLiked?: boolean;
  userBlessed?: boolean;
}

const INITIAL_ACTIVITIES: ActivityFeedItem[] = [
  {
    id: 'act-1',
    type: 'project',
    studentName: 'Chaitanya Reddy',
    studentGrade: 'Class 8',
    avatar: '👦',
    title: 'Assembled Arduino HC-SR04 Obstacle-Avoiding Robot Car',
    teluguTitle: 'ఆర్డునో అల్ట్రాసోనిక్ రోబోట్ కారును విజయవంతంగా అసెంబుల్ చేశాడు',
    description: 'Calibrated servo motor sweep angles and programmed automatic 90° reverse navigation in C++ with zero collision errors.',
    teluguDescription: 'సెర్వో మోటార్ మరియు సెన్సార్ కోడింగ్ పూర్తి చేసి రోబోట్ టెస్ట్ డ్రైవ్ విజయవంతం చేశాడు.',
    hub: 'innovation',
    hubLabel: 'Robotics & DIY Lab',
    timestamp: '18 minutes ago',
    artifactBadge: '🤖 Hardware Tested & Verified',
    xpEarned: 250,
    likes: 12,
    starsAwarded: 45,
    blessings: 6,
    comments: [
      { author: 'Rajesh Reddy (Father)', role: 'Parent', text: 'Proud of you son! The sensor alignment is very neat.', time: '10m ago' },
      { author: 'Smt. Lakshmi (Mother)', role: 'Parent', text: 'Excellent perseverance in wiring the L298N driver!', time: '5m ago' }
    ]
  },
  {
    id: 'act-2',
    type: 'ai_interaction',
    studentName: 'Chaitanya Reddy',
    studentGrade: 'Class 8',
    avatar: '👦',
    title: 'Completed 5-Step Chain-of-Thought Math Prompt with AI Super Mentor',
    teluguTitle: 'AI సూపర్‌మెంటార్‌తో 5-దశల సంక్లిష్ట గణిత విశ్లేషణ పూర్తి చేశాడు',
    description: 'Deconstructed quadratic equation factorization step-by-step using Socrates prompting method without directly asking for the final answer.',
    teluguDescription: 'గణిత సమీకరణాల పరిష్కార సూత్రాలను స్వయంగా విశ్లేషించి నేర్చుకున్నాడు.',
    hub: 'super-student',
    hubLabel: 'Super Student AI Hub',
    timestamp: '1 hour ago',
    artifactBadge: '🧠 Prompt Engineering Mastered',
    xpEarned: 180,
    likes: 8,
    starsAwarded: 20,
    blessings: 4,
    comments: [
      { author: 'Gurukul AI Mentor', role: 'AI Specialist', text: 'Remarkable reasoning discipline shown in step 4 factorization!', time: '45m ago' }
    ]
  },
  {
    id: 'act-3',
    type: 'sanskar',
    studentName: 'Sahithi Reddy',
    studentGrade: 'Class 5',
    avatar: '👧',
    title: 'Recited Bhagavad Gita Chapter 2 (Sthitaprajna Shlokas 54-58)',
    teluguTitle: 'భగవద్గీత రెండవ అధ్యాయం స్థితప్రజ్ఞ లక్షణాల శ్లోకాలు కంఠస్థం చేసింది',
    description: 'Flawless Sanskrit pronunciation with Telugu word-by-word meaning and daily self-discipline reflection journal entry.',
    teluguDescription: 'స్పష్టమైన శ్లోక ఉచ్చారణ మరియు ప్రతిపదార్థం సాధన పూర్తి చేసింది.',
    hub: 'sanskar',
    hubLabel: 'Values & Sanskar Hub',
    timestamp: '3 hours ago',
    artifactBadge: '🕉️ Classical Audio Verified',
    xpEarned: 300,
    likes: 24,
    starsAwarded: 80,
    blessings: 18,
    comments: [
      { author: 'Grandfather (Tirupati)', role: 'Family Elder', text: 'ఆశీస్సులు తల్లి! నీ ఉచ్చారణ చాలా మధురంగా ఉంది.', time: '2h ago' }
    ]
  },
  {
    id: 'act-4',
    type: 'milestone',
    studentName: 'Chaitanya Reddy',
    studentGrade: 'Class 8',
    avatar: '👦',
    title: 'Scored 100% in Speed Vedic Maths (Nikhilam Navatashcaramam Drills)',
    teluguTitle: 'స్పీడ్ వేద గణితం నిఖిలం సూత్రాల పరీక్షలో 100% స్కోర్ సాధించాడు',
    description: 'Calculated 15 complex 3-digit multiplication problems in under 90 seconds purely through mental arithmetic.',
    teluguDescription: 'కేవలం 90 సెకన్లలో 15 మానసిక గణనలను ఖచ్చితంగా పూర్తి చేశాడు.',
    hub: 'education',
    hubLabel: 'Education Hub',
    timestamp: '5 hours ago',
    artifactBadge: '⚡ Speed Calculation Record',
    xpEarned: 200,
    likes: 19,
    starsAwarded: 50,
    blessings: 9,
    comments: []
  },
  {
    id: 'act-5',
    type: 'project',
    studentName: 'Sahithi Reddy',
    studentGrade: 'Class 5',
    avatar: '👧',
    title: 'Handmade Eco-Friendly Paper Mache Solar System Model',
    teluguTitle: 'రీసైకిల్డ్ పేపర్‌తో సౌర కుటుంబం ప్రాజెక్ట్ తయారుచేసింది',
    description: 'Built orbital distance scaled planets using recycled newspaper pulp and natural dye painting.',
    teluguDescription: 'పర్యావరణ హితమైన పదార్థాలతో అందమైన సైన్స్ మోడల్ రూపొందించింది.',
    hub: 'marketplace',
    hubLabel: 'Talent Marketplace',
    timestamp: 'Yesterday',
    artifactBadge: '🎨 Eco-Artisan Showcase',
    xpEarned: 220,
    likes: 31,
    starsAwarded: 60,
    blessings: 14,
    comments: [
      { author: 'Rajesh Reddy (Father)', role: 'Parent', text: 'Listed on Gurukul Marketplace with Parent Approval!', time: 'Yesterday' }
    ]
  }
];

export const FamilyActivityFeed: React.FC<{
  onNavigateTab?: (tab: NavTab) => void;
  onOpenAskAI?: () => void;
}> = ({ onNavigateTab, onOpenAskAI }) => {
  const { t, language } = useLanguage();
  const [activities, setActivities] = useState<ActivityFeedItem[]>(INITIAL_ACTIVITIES);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'milestone' | 'project' | 'ai_interaction' | 'sanskar'>('all');
  const [showLogModal, setShowLogModal] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [isFirebaseSynced, setIsFirebaseSynced] = useState(true);
  
  // Real-time Firestore sync listener
  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, 'family_activities'), (snapshot) => {
        if (!snapshot.empty) {
          const remoteItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ActivityFeedItem));
          // Merge with initial if needed
          setActivities(prev => {
            const map = new Map<string, ActivityFeedItem>();
            INITIAL_ACTIVITIES.forEach(a => map.set(a.id, a));
            remoteItems.forEach(a => map.set(a.id, a));
            return Array.from(map.values()).sort((a, b) => b.id.localeCompare(a.id));
          });
          setIsFirebaseSynced(true);
        }
      }, (err) => {
        console.warn('Firestore real-time offline fallback mode:', err);
        setIsFirebaseSynced(false);
      });
      return () => unsub();
    } catch (e) {
      console.warn('Firebase init fallback:', e);
      setIsFirebaseSynced(false);
    }
  }, []);

  // New accomplishment form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState<'milestone' | 'project' | 'ai_interaction' | 'sanskar'>('project');
  const [newHub, setNewHub] = useState<NavTab>('innovation');
  const [newStudent, setNewStudent] = useState('Chaitanya Reddy (Class 8)');

  const filteredActivities = activities.filter(act => 
    selectedFilter === 'all' || act.type === selectedFilter
  );

  const handleLike = async (id: string) => {
    let updatedLikes = 0;
    let isLiked = false;
    setActivities(prev => prev.map(item => {
      if (item.id === id) {
        const liked = !item.userLiked;
        isLiked = liked;
        updatedLikes = liked ? item.likes + 1 : item.likes - 1;
        return {
          ...item,
          likes: updatedLikes,
          userLiked: liked
        };
      }
      return item;
    }));

    try {
      await updateDoc(doc(db, 'family_activities', id), {
        likes: updatedLikes
      });
    } catch (e) {
      // offline silent fallback
    }
  };

  const handleBlessing = async (id: string) => {
    let updatedBlessings = 0;
    let updatedStars = 0;
    setActivities(prev => prev.map(item => {
      if (item.id === id) {
        const blessed = !item.userBlessed;
        updatedBlessings = blessed ? item.blessings + 1 : item.blessings - 1;
        updatedStars = blessed ? item.starsAwarded + 10 : item.starsAwarded;
        return {
          ...item,
          blessings: updatedBlessings,
          starsAwarded: updatedStars,
          userBlessed: blessed
        };
      }
      return item;
    }));

    try {
      await updateDoc(doc(db, 'family_activities', id), {
        blessings: updatedBlessings,
        starsAwarded: updatedStars
      });
    } catch (e) {
      // offline silent fallback
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!commentInput.trim()) return;
    const newComment = {
      author: 'Rajesh Reddy (Super Parent)',
      role: 'Parent',
      text: commentInput.trim(),
      time: 'Just now'
    };

    let updatedComments: any[] = [];
    setActivities(prev => prev.map(item => {
      if (item.id === postId) {
        updatedComments = [...item.comments, newComment];
        return {
          ...item,
          comments: updatedComments
        };
      }
      return item;
    }));

    try {
      await updateDoc(doc(db, 'family_activities', postId), {
        comments: updatedComments
      });
    } catch (e) {
      // offline silent fallback
    }

    setCommentInput('');
    setActiveCommentPostId(null);
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPost: ActivityFeedItem = {
      id: `act-${Date.now()}`,
      type: newType,
      studentName: newStudent.split(' ')[0] + ' ' + (newStudent.split(' ')[1] || ''),
      studentGrade: newStudent.includes('8') ? 'Class 8' : 'Class 5',
      avatar: newStudent.includes('Sahithi') ? '👧' : '👦',
      title: newTitle,
      teluguTitle: newTitle,
      description: newDescription || 'Completed exciting hands-on milestone in Super Parent Gurukul!',
      teluguDescription: newDescription || 'గురుకుల అభ్యాసంలో కొత్త మైలురాయి సాధించారు.',
      hub: newHub,
      hubLabel: newHub === 'innovation' ? 'Robotics & DIY Lab' : newHub === 'sanskar' ? 'Values & Sanskar' : newHub === 'super-student' ? 'Super Student Hub' : 'Education Hub',
      timestamp: 'Just now',
      artifactBadge: '✨ Parent-Verified Milestone',
      xpEarned: 200,
      likes: 1,
      starsAwarded: 25,
      blessings: 1,
      comments: [
        {
          author: 'Super Parent Gurukul',
          role: 'System',
          text: 'Milestone verified and updated to child growth portfolio map!',
          time: 'Just now'
        }
      ]
    };

    setActivities([newPost, ...activities]);
    setNewTitle('');
    setNewDescription('');
    setShowLogModal(false);

    try {
      await setDoc(doc(db, 'family_activities', newPost.id), newPost);
    } catch (e) {
      console.warn('Saved locally, offline queued for Firebase');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-orange-200 shadow-sm space-y-6">
      {/* Header with Title and Share Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-orange-200 uppercase tracking-wide">
              Family Learning Hub
            </span>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
              <span>Active Family Streak: 21 Days</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <span>👨‍👩‍👧 Family Learning Activity Feed</span>
          </h2>

          <p className="text-xs text-slate-600 font-medium">
            {language === 'te'
              ? 'తల్లిదండ్రులు మరియు విద్యార్థుల నిజ-సమయ అభ్యాస పురోగతి, రోబోటిక్స్ ప్రాజెక్ట్‌లు, AI చర్చలు మరియు శ్లోకాల సాధన రికార్డు.'
              : language === 'hi'
              ? 'माता-पिता और छात्रों की वास्तविक समय की सीखने की प्रगति, रोबोटिक्स प्रोजेक्ट्स, एआई वार्तालाप और श्लोक अभ्यास।'
              : 'Live stream of your family\'s recent milestones, completed robotics projects, AI prompting breakthroughs, and cultural achievements.'
            }
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-black text-xs px-5 py-2.5 rounded-2xl shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Log Learning Milestone</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
            selectedFilter === 'all'
              ? 'bg-orange-600 text-white shadow-2xs font-black'
              : 'bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
          }`}
        >
          🌟 All Family Milestones ({activities.length})
        </button>

        <button
          onClick={() => setSelectedFilter('project')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            selectedFilter === 'project'
              ? 'bg-orange-600 text-white shadow-2xs font-black'
              : 'bg-slate-50 text-slate-700 hover:bg-orange-50'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>DIY Projects & Circuits</span>
        </button>

        <button
          onClick={() => setSelectedFilter('ai_interaction')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            selectedFilter === 'ai_interaction'
              ? 'bg-orange-600 text-white shadow-2xs font-black'
              : 'bg-slate-50 text-slate-700 hover:bg-orange-50'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>AI Multi-Expert Prompts</span>
        </button>

        <button
          onClick={() => setSelectedFilter('sanskar')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            selectedFilter === 'sanskar'
              ? 'bg-orange-600 text-white shadow-2xs font-black'
              : 'bg-slate-50 text-slate-700 hover:bg-orange-50'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Gita Shlokas & Values</span>
        </button>

        <button
          onClick={() => setSelectedFilter('milestone')}
          className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            selectedFilter === 'milestone'
              ? 'bg-orange-600 text-white shadow-2xs font-black'
              : 'bg-slate-50 text-slate-700 hover:bg-orange-50'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Tests & Certificates</span>
        </button>
      </div>

      {/* Feed Cards List */}
      <div className="space-y-4">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="p-5 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-orange-300 transition-all space-y-3.5"
          >
            {/* Author Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-2xs">
                  {act.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-slate-900">{act.studentName}</span>
                    <span className="text-[10px] font-bold text-orange-700 bg-orange-100/80 px-2 py-0.5 rounded-full">
                      {act.studentGrade}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {act.timestamp}
                    </span>
                    <span>•</span>
                    <button
                      onClick={() => onNavigateTab && onNavigateTab(act.hub)}
                      className="text-orange-600 hover:underline font-bold"
                    >
                      {act.hubLabel}
                    </button>
                  </div>
                </div>
              </div>

              {/* XP Badge */}
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1 rounded-xl text-xs font-black shadow-2xs shrink-0">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>+{act.xpEarned} XP</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="space-y-1.5 pl-0 sm:pl-14">
              <h3 className="font-black text-slate-900 text-base leading-snug">
                {language === 'te' ? act.teluguTitle : act.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'te' ? act.teluguDescription : act.description}
              </p>

              {act.artifactBadge && (
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{act.artifactBadge}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Interaction Buttons (Like, Blessing, Comment) */}
            <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLike(act.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    act.userLiked 
                      ? 'bg-orange-600 text-white shadow-2xs' 
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-orange-50'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>High Five ({act.likes})</span>
                </button>

                <button
                  onClick={() => handleBlessing(act.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    act.userBlessed
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${act.userBlessed ? 'fill-white' : 'text-amber-600'}`} />
                  <span>Blessing & Stars ({act.blessings})</span>
                </button>

                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === act.id ? null : act.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold bg-white text-slate-700 border border-slate-200 hover:bg-orange-50 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                  <span>Comment ({act.comments.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{act.starsAwarded} Family Stars</span>
                </span>
              </div>
            </div>

            {/* Comments Thread */}
            {act.comments.length > 0 && (
              <div className="pl-0 sm:pl-14 space-y-2 pt-2 border-t border-slate-200/50">
                {act.comments.map((cmt, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-2xl border border-slate-200 text-xs space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-900">{cmt.author}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{cmt.time}</span>
                    </div>
                    <p className="text-slate-600 font-medium">{cmt.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment Input */}
            {activeCommentPostId === act.id && (
              <div className="pl-0 sm:pl-14 flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment(act.id)}
                  placeholder="Write parent words of encouragement or feedback..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                />
                <button
                  onClick={() => handleAddComment(act.id)}
                  className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-xl transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Log Milestone Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-orange-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <span>Log New Learning Milestone</span>
              </h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Child / Student:</label>
                <select
                  value={newStudent}
                  onChange={(e) => setNewStudent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                >
                  <option value="Chaitanya Reddy (Class 8)">👦 Chaitanya Reddy (Class 8)</option>
                  <option value="Sahithi Reddy (Class 5)">👧 Sahithi Reddy (Class 5)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Milestone Category:</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                  >
                    <option value="project">🤖 DIY Project / Circuit</option>
                    <option value="ai_interaction">💬 AI Prompt Interaction</option>
                    <option value="sanskar">🕉️ Bhagavad Gita / Sanskar</option>
                    <option value="milestone">🏆 Academic Test Score</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Associated Hub:</label>
                  <select
                    value={newHub}
                    onChange={(e) => setNewHub(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-bold text-slate-800"
                  >
                    <option value="innovation">Robotics Lab</option>
                    <option value="super-student">Super Student AI</option>
                    <option value="sanskar">Values & Sanskar</option>
                    <option value="education">Education Hub</option>
                    <option value="marketplace">Talent Marketplace</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Milestone Title:</label>
                <input
                  required
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Mastered Vedic Square Roots in 30 Seconds"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Details & Key Learnings:</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe what steps were taken and the outcome..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                />
              </div>

              <div className="bg-orange-50 p-3 rounded-xl border border-orange-200 text-[11px] text-orange-950 font-medium">
                🛡️ Verified Log: Automatically updates child growth radar charts and awards +200 XP to the student account.
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-2.5 rounded-xl text-xs shadow-xs transition-colors cursor-pointer"
              >
                Publish Milestone to Family Feed
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
