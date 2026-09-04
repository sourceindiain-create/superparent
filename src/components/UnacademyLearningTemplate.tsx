import React, { useState, useEffect } from 'react';
import { 
  Video, 
  Users, 
  Trophy, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  Star, 
  Radio, 
  Hand, 
  Send, 
  ChevronRight, 
  Share2, 
  Flame, 
  BookOpen, 
  HelpCircle,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Check
} from 'lucide-react';
import { NavTab } from '../types';

interface UnacademyLearningTemplateProps {
  studentName?: string;
  currentXP?: number;
  streakDays?: number;
  onNavigateTab: (tab: NavTab) => void;
  onOpenAskAI: (persona?: string, query?: string) => void;
  onEarnXP?: (points: number, reason?: string) => void;
}

export const UnacademyLearningTemplate: React.FC<UnacademyLearningTemplateProps> = ({
  studentName = 'Chaitanya Reddy',
  currentXP = 3450,
  streakDays = 14,
  onNavigateTab,
  onOpenAskAI,
  onEarnXP
}) => {
  // Live Class View State
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [liveChatMessages, setLiveChatMessages] = useState<Array<{ sender: string; text: string; role?: string; isTeacher?: boolean }>>([
    { sender: 'Dr. Venkat Rao (IIT-M)', text: 'Namaste students! Today we are mastering the visual Cartesian plane shortcuts.', isTeacher: true },
    { sender: 'Aarav (Hyderabad)', text: 'Sir, how does the distance formula relate to Pythagoras theorem?' },
    { sender: 'Dr. Venkat Rao (IIT-M)', text: 'Excellent question Aarav! Distance d = √((x2-x1)² + (y2-y1)²) is direct hypotenuse!', isTeacher: true },
    { sender: 'Priya (Vijayawada)', text: 'The Vedic shortcut for squaring made the coordinate calculation so fast!' }
  ]);
  const [userChatMessage, setUserChatMessage] = useState('');
  const [liveViewers, setLiveViewers] = useState(1248);

  // Periodic simulated live viewer fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Unacademy Combat Live Poll MCQ State
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [isPollSubmitted, setIsPollSubmitted] = useState(false);
  const [pollTimer, setPollTimer] = useState(30);

  useEffect(() => {
    let timer: any = null;
    if (!isPollSubmitted && pollTimer > 0) {
      timer = setInterval(() => setPollTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isPollSubmitted, pollTimer]);

  const handleSendLiveChat = () => {
    if (!userChatMessage.trim()) return;
    setLiveChatMessages(prev => [
      ...prev,
      { sender: studentName, text: userChatMessage.trim() }
    ]);
    setUserChatMessage('');

    // Simulated educator acknowledgment
    setTimeout(() => {
      setLiveChatMessages(prev => [
        ...prev,
        { 
          sender: 'Dr. Venkat Rao (IIT-M)', 
          text: `Great thought, ${studentName}! Note down this key formula in your Gurukul scratchpad.`, 
          isTeacher: true 
        }
      ]);
    }, 2500);
  };

  const handleSelectPollOption = (idx: number) => {
    if (isPollSubmitted) return;
    setSelectedPollOption(idx);
    setIsPollSubmitted(true);
    if (idx === 1 && onEarnXP) {
      onEarnXP(60, 'Won Top Educator Combat Daily MCQ Poll');
    }
  };

  // Top Educators Following State
  const [followedEducators, setFollowedEducators] = useState<Record<string, boolean>>({
    'edu-1': true,
    'edu-2': false,
    'edu-3': true,
    'edu-4': false
  });

  const toggleFollowEducator = (id: string) => {
    setFollowedEducators(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const EDUCATORS = [
    {
      id: 'edu-1',
      name: 'Dr. Venkat Rao',
      title: 'IIT Madras Alum • 14+ Yrs Teaching',
      subject: 'Mathematics & Vedic Math',
      avatar: '👨‍🏫',
      rating: '4.98 ★',
      watchMins: '4.2M mins',
      followers: '14.8k',
      badge: 'Master Educator'
    },
    {
      id: 'edu-2',
      name: 'Er. Sravani Varma',
      title: 'Robotics Lead & Hardware Engineer',
      subject: 'Robotics & Drone DIY',
      avatar: '👩‍💻',
      rating: '4.95 ★',
      watchMins: '2.1M mins',
      followers: '9.4k',
      badge: 'Innovation Guru'
    },
    {
      id: 'edu-3',
      name: 'Smt. Padmavathi Devi',
      title: 'Gold Medalist • Sanskrit & Telugu',
      subject: 'Bhagavad Gita & Moral Epics',
      avatar: '👩‍🏫',
      rating: '4.99 ★',
      watchMins: '3.8M mins',
      followers: '18.2k',
      badge: 'Sanskar Mentor'
    },
    {
      id: 'edu-4',
      name: 'Dr. Rajesh Kumar',
      title: 'AIIMS Alum • Clinical Researcher',
      subject: 'Biology & 3D Anatomy',
      avatar: '👨‍🔬',
      rating: '4.94 ★',
      watchMins: '1.9M mins',
      followers: '8.1k',
      badge: 'Life Sciences'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. UNACADEMY SIGNATURE BANNER (CYBER EMERALD & MIDNIGHT NAVY) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-emerald-500/30">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-wide border border-emerald-400/30 text-emerald-300">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Top Educator & Live Prep Template</span>
              <span className="bg-emerald-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded font-black">Cyber Emerald</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Live Classroom Broadcast & Combat Prep ⚡
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Join live interactive classrooms with India’s top Gurukul faculty, vote in real-time polls, and compete in All India Combat test series.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={() => onNavigateTab('classroom')}
                className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Video className="w-3.5 h-3.5 text-slate-950" />
                <span>Join Live Classroom</span>
              </button>
              <button
                onClick={() => onNavigateTab('practice-master')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                <span>All India Combat Tests</span>
              </button>
            </div>
          </div>

          {/* Unacademy Live Stats Card */}
          <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/30 text-center space-y-2 shrink-0 w-full sm:w-auto">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                {liveViewers} Live Scholars
              </span>
            </div>
            <div className="text-2xl font-black text-white">Rank #4 State</div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Class 8 CBSE / AP Board
            </div>
            <div className="text-[11px] text-emerald-300 font-bold">
              ⭐ 98.4th Percentile
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE CLASSROOM STREAM STAGE & REAL-TIME CHAT SIMULATION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2-Cols: Live Interactive Broadcast Monitor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 text-xs font-black uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                  <span>LIVE BROADCAST</span>
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-black">
                  CBSE Class 8 Math
                </span>
              </div>
              <div className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span>{liveViewers} attending</span>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                Coordinate Geometry & Speed Distance Formulas
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Educator: <strong className="text-slate-800">Dr. Venkat Rao (IIT Madras Alum)</strong> • Live Video + Digital Whiteboard
              </p>
            </div>

            {/* Simulated Live Broadcast Stage Video Player Frame */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 text-white min-h-[260px] flex flex-col justify-between border border-emerald-500/30 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[11px] border border-emerald-500/30">
                    1080p 60fps HD Stream
                  </span>
                  <span className="text-slate-400">Zoom / WebRTC Room #GK-842</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsHandRaised(!isHandRaised)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      isHandRaised 
                        ? 'bg-amber-400 text-slate-950 shadow-md font-black' 
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <Hand className="w-3.5 h-3.5" />
                    <span>{isHandRaised ? 'Hand Raised ✋' : 'Raise Hand'}</span>
                  </button>
                </div>
              </div>

              {/* Center Blackboard Content */}
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  Cartesian Plane Distance Theorem
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white">
                  d = √[(x₂ - x₁)² + (y₂ - y₁)²]
                </div>
                <p className="text-xs text-slate-300 max-w-md">
                  "Remember students: (x₂ - x₁) is base length Δx, and (y₂ - y₁) is altitude Δy. The hypotenuse is pure Pythagoras theorem!"
                </p>
              </div>

              {/* Bottom Stream Action Bar */}
              <div className="bg-black/50 backdrop-blur-md p-3 rounded-xl flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigateTab('classroom')}
                    className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Enter Full Virtual Room
                  </button>
                  <button
                    onClick={() => onOpenAskAI('tutor', 'Explain the coordinate distance formula with step by step examples.')}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Ask AI Doubt
                  </button>
                </div>

                <span className="text-[11px] text-emerald-400 font-mono">
                  Live Chat Synchronized
                </span>
              </div>
            </div>

            {/* Class Schedule Quick Links */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-700">Next Upcoming Live Class:</span>
                <div className="text-xs font-extrabold text-slate-900 mt-0.5">
                  Today 7:00 PM IST: Robotics Ultrasonic Sensor Coding with Er. Sravani
                </div>
              </div>
              <button
                onClick={() => onNavigateTab('innovation')}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:border-emerald-500 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Set Reminder
              </button>
            </div>
          </div>
        </div>

        {/* Right 1-Col: Live Chat Feed */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3 flex flex-col h-[480px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-extrabold text-sm text-slate-900">Live Classroom Chat</h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400">Strictly Moderated</span>
            </div>

            {/* Chat Message Scrollable Container */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
              {liveChatMessages.map((msg, mIdx) => (
                <div 
                  key={mIdx} 
                  className={`p-2.5 rounded-xl text-xs space-y-0.5 ${
                    msg.isTeacher 
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium' 
                      : 'bg-slate-50 border border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-black ${msg.isTeacher ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {msg.sender}
                    </span>
                    {msg.isTeacher && (
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.2 bg-emerald-200 text-emerald-900 rounded">
                        Faculty
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] leading-relaxed">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Live Chat Input Bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5">
              <input
                type="text"
                value={userChatMessage}
                onChange={(e) => setUserChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendLiveChat()}
                placeholder="Ask faculty or contribute to discussion..."
                className="flex-1 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={handleSendLiveChat}
                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors cursor-pointer"
                title="Send Chat Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 3. UNACADEMY COMBAT & ALL INDIA DAILY MCQ POLL WIDGET */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-sm">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base">Top Educator Combat: Live Poll Challenge</h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Daily Scholarship
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">12,400+ students participating across AP, Telangana & CBSE India</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Live Timer:</span>
            <span className="px-3 py-1 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs font-black">
              {pollTimer > 0 ? `00:${pollTimer.toString().padStart(2, '0')}` : 'Time Up!'}
            </span>
          </div>
        </div>

        {/* Combat Poll MCQ Question */}
        <div className="space-y-3">
          <div className="text-xs font-black uppercase text-emerald-600">Question of the Day • Class 8 Physics</div>
          <p className="text-sm sm:text-base font-extrabold text-slate-900">
            A satellite is orbiting Earth at a constant speed in a circular orbit. What is the work done by gravitational force on the satellite in one complete revolution?
          </p>

          {/* Options with Live Polling Percentages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { text: 'Positive work equal to kinetic energy', pct: 14 },
              { text: 'Zero (Work = Force × displacement × cos(90°))', pct: 68, isCorrect: true },
              { text: 'Negative work due to gravitational resistance', pct: 11 },
              { text: 'Infinite work over infinite time', pct: 7 }
            ].map((opt, oIdx) => {
              const isSelected = selectedPollOption === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectPollOption(oIdx)}
                  disabled={isPollSubmitted}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between space-y-1.5 cursor-pointer ${
                    isPollSubmitted
                      ? opt.isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                        : isSelected
                          ? 'bg-rose-50 border-rose-400 text-rose-950'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      : isSelected
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-300'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold z-10">
                    <span>{opt.text}</span>
                    <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs shrink-0 ml-2">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                  </div>

                  {/* Polling Distribution Bar when submitted */}
                  {isPollSubmitted && (
                    <div className="space-y-1 pt-1 z-10">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="font-bold text-slate-500">Student Votes</span>
                        <span className="font-black text-emerald-700">{opt.pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${opt.isCorrect ? 'bg-emerald-600' : 'bg-slate-400'}`}
                          style={{ width: `${opt.pct}%` }}
                        />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {isPollSubmitted && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
              <span className="font-black text-emerald-950 uppercase block">Pedagogical Solution Breakdown:</span>
              <p className="text-emerald-900">
                Work W = F · d · cos(θ). The gravitational force acts towards the center of Earth (radial), while the instantaneous displacement is tangential. Since θ = 90° and cos(90°) = 0, work done is identically <strong>Zero Joules</strong>!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4. TOP MASTER EDUCATORS CAROUSEL */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Top Gurukul Faculty & Master Mentors</h3>
            <p className="text-xs text-slate-500 font-medium">Follow expert educators to receive live class notifications & exclusive study notes</p>
          </div>
          <button
            onClick={() => onNavigateTab('classroom')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <span>View All Faculty</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EDUCATORS.map((edu) => {
            const isFollowing = followedEducators[edu.id];
            return (
              <div 
                key={edu.id} 
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 hover:shadow-sm transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl p-2 rounded-xl bg-white shadow-2xs border border-slate-200">
                      {edu.avatar}
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {edu.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{edu.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{edu.title}</p>
                    <span className="text-xs font-bold text-emerald-700 block mt-1">{edu.subject}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span>{edu.rating}</span>
                    <span>{edu.watchMins}</span>
                  </div>

                  <button
                    onClick={() => toggleFollowEducator(edu.id)}
                    className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      isFollowing
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-black'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                    }`}
                  >
                    {isFollowing ? <Check className="w-3.5 h-3.5" /> : null}
                    <span>{isFollowing ? 'Following' : 'Follow Educator'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
