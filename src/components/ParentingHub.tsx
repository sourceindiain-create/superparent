import React, { useState } from 'react';
import { 
  PARENTING_ARTICLES, 
  BONDING_ACTIVITIES, 
  PARENTING_SCENARIOS, 
  AGE_MILESTONES 
} from '../data/mockData';
import { ParentingArticle, BondingActivity, AIExpertPersona, NavTab } from '../types';
import { 
  Users, 
  Brain, 
  Heart, 
  Sparkles, 
  AlertTriangle, 
  CheckSquare, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  HeartHandshake, 
  Compass, 
  Target, 
  MessageCircle, 
  BarChart2, 
  Phone, 
  ChevronRight, 
  Plus, 
  Award, 
  CheckCircle2, 
  Flame, 
  Lightbulb, 
  HelpCircle,
  FileText
} from 'lucide-react';

interface ParentingHubProps {
  onAskAIParenting: (persona?: AIExpertPersona, query?: string) => void;
  onNavigateTab?: (tab: NavTab) => void;
}

export const ParentingHub: React.FC<ParentingHubProps> = ({ 
  onAskAIParenting,
  onNavigateTab 
}) => {
  // Main Sub-Tab Navigation
  const [activeSubTab, setActiveSubTab] = useState<'knowledge' | 'bonding' | 'activities' | 'scenarios' | 'milestones'>('knowledge');
  
  // Knowledge Base State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<ParentingArticle | null>(null);

  // Bonding Activities State
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({
    'bond-1': true,
    'bond-3': true
  });
  const [bondingPoints, setBondingPoints] = useState<number>(45);

  // Family Goals State
  const [familyGoals, setFamilyGoals] = useState([
    { id: 'fg1', text: 'Daily 15-minute gadget-free family talk after dinner', completed: true },
    { id: 'fg2', text: 'Weekly hands-on DIY robotics or craft project together', completed: true },
    { id: 'fg3', text: 'Encourage effort and learning instead of comparing marks with peers', completed: false },
    { id: 'fg4', text: 'Nighttime gratitude reflection and bedtime prayer before sleep', completed: false }
  ]);
  const [newGoalInput, setNewGoalInput] = useState('');
  const [showAddGoal, setShowAddGoal] = useState(false);

  // Parent-Child Mini Quiz State
  const [quizAnswered, setQuizAnswered] = useState<Record<number, string>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Random Daily Prompt State
  const dailyPrompts = [
    'Ask your child: "If you had a superpower today, what would you use it for?"',
    'Share one story from your childhood when you made a mistake and learned from it.',
    'Build a tower together using books or cups and see how high it can go!',
    'Ask your child: "What made you feel proud of yourself this week?"',
    'Cook a fireless healthy snack or fruit chat together in 10 minutes.'
  ];
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);

  const toggleGoal = (id: string) => {
    setFamilyGoals(prev =>
      prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g)
    );
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalInput.trim()) return;
    setFamilyGoals(prev => [
      ...prev,
      { id: `fg-${Date.now()}`, text: newGoalInput.trim(), completed: false }
    ]);
    setNewGoalInput('');
    setShowAddGoal(false);
  };

  const toggleActivityComplete = (activity: BondingActivity) => {
    setCompletedActivities(prev => {
      const isComp = !prev[activity.id];
      if (isComp) {
        setBondingPoints(pts => pts + activity.points);
      } else {
        setBondingPoints(pts => Math.max(0, pts - activity.points));
      }
      return { ...prev, [activity.id]: isComp };
    });
  };

  const categories = ['All', 'Communication', 'Digital Balance', 'Psychological', 'Health & Habits', 'Education'];

  const filteredArticles = selectedCategory === 'All'
    ? PARENTING_ARTICLES
    : PARENTING_ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-6" id="parenting-hub-root">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 rounded-3xl p-6 sm:p-8 text-white shadow-orange-glow relative overflow-hidden border border-orange-400/40">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black border border-white/30 text-white">
            <Users className="w-4 h-4 text-amber-200" />
            <span>Parenting Education • Bonding • Psychology • Activities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            👨‍👩‍👧 Super Parent Hub (తల్లిదండ్రుల మార్గదర్శి)
          </h2>
          <p className="text-sm text-orange-50 leading-relaxed font-medium">
            Building strong parent-child communication, emotional resilience, screen-time balance, and positive discipline for LKG to 10th Class students.
          </p>

          <div className="pt-2 flex items-center gap-3 flex-wrap text-xs">
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20 font-bold flex items-center gap-1.5 text-white">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Family Bonding Score: <strong>{bondingPoints} Pts</strong></span>
            </span>
            <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20 font-bold flex items-center gap-1.5 text-white">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>Active Goals: <strong>{familyGoals.filter(g => g.completed).length}/{familyGoals.length} Done</strong></span>
            </span>
          </div>
        </div>
      </div>

      {/* Super Student Perks & AI Master Courses Banner for Parents */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 text-slate-900 shadow-sm border border-orange-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-orange-200">
              Free Perks & Courses For Your Child
            </span>
            <span className="text-xs text-slate-500 font-semibold">GitHub • Notion • Canva • Google AI</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            🎓 Get Free Student Developer Pack & 11 Prompt Engineering Courses
          </h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            Empower your child with $200k+ in free tech tools (GitHub Pro, Canva, Notion Plus, Google AI) and 11 specialized Prompt Engineering masterclasses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab && onNavigateTab('super-student')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-black text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>👨‍👩‍👧 Parent Guide & Claims</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab('super-student')}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs px-4 py-2.5 rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>🎓 Student 11 AI Courses</span>
            <ChevronRight className="w-4 h-4 text-orange-600" />
          </button>
        </div>
      </div>

      {/* Safety & Medical Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-950">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold text-amber-900 block">Gurukul Psychological & Educational Notice:</strong>
          <p className="leading-relaxed text-amber-800">
            All parenting insights, bonding activities, and AI guidance are designed for positive developmental support. For clinical medical conditions or therapy, please consult qualified medical practitioners or child psychologists.
          </p>
        </div>
      </div>

      {/* Main Sub-Navigation Bar Links */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          <button
            id="tab-parent-knowledge"
            onClick={() => setActiveSubTab('knowledge')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSubTab === 'knowledge'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Parents Knowledge (జ్ఞానం)</span>
          </button>

          <button
            id="tab-parent-bonding"
            onClick={() => setActiveSubTab('bonding')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSubTab === 'bonding'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Parent-Child Bonding (అనుబంధాలు)</span>
          </button>

          <button
            id="tab-parent-activities"
            onClick={() => setActiveSubTab('activities')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSubTab === 'activities'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Activities & Goals (కార్యకలాపాలు)</span>
          </button>

          <button
            id="tab-parent-scenarios"
            onClick={() => setActiveSubTab('scenarios')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSubTab === 'scenarios'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>Communication & Roleplays</span>
          </button>

          <button
            id="tab-parent-milestones"
            onClick={() => setActiveSubTab('milestones')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
              activeSubTab === 'milestones'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-orange-50'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Developmental Milestones</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {/* 1. KNOWLEDGE BASE TAB */}
      {activeSubTab === 'knowledge' && (
        <div className="space-y-6">
          {/* Filter Pills & AI Trigger */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-slate-500 mr-1">Filter Topic:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => onAskAIParenting('psychologist', 'Explain effective ways to manage child screen time and study focus')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-black px-4 py-2 rounded-xl text-xs shadow-xs transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Ask AI Child Psychologist</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Articles List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <span>Parent Knowledge & Education Articles ({filteredArticles.length})</span>
              </h3>

              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-orange-50 text-orange-800 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-orange-200">
                        {article.category}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-500" />
                        {article.readTime}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-black text-slate-900 text-base leading-snug">
                        {article.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                        {article.summary}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-black text-orange-700 uppercase tracking-wider block">
                        Key Action Points:
                      </span>
                      <ul className="text-xs text-slate-700 space-y-1">
                        {article.keyTakeaways.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0 mt-1.5"></span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => setActiveArticle(article)}
                      className="text-xs font-black text-orange-600 hover:text-orange-700 hover:underline pt-1 inline-block"
                    >
                      Read Full Parenting Guide →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar: AI Prompt Launcher & Quick Topics */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
                <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-orange-500" />
                  <span>Quick AI Parenting Consultations</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Click any topic below to consult our AI Child Psychologist for instant, practical solutions:
                </p>

                <div className="space-y-2">
                  {[
                    { label: '📱 How to handle Youtube & Mobile addiction?', query: 'How can I gently stop my child from YouTube addiction without shouting?' },
                    { label: '📚 Child dislikes studying or feels lazy', query: 'My child avoids doing homework and gets easily distracted. What daily routines help?' },
                    { label: '🥗 Picky eating & healthy meal habits', query: 'How can I encourage my child to eat traditional healthy vegetables and millets?' },
                    { label: '😡 Dealing with temper tantrums & anger', query: 'How should I respond when my child throws anger tantrums during game losses?' },
                    { label: '🌟 Building self-confidence & stage courage', query: 'What daily habits help build speech confidence and stage courage in children?' }
                  ].map((topic, idx) => (
                    <button
                      key={idx}
                      onClick={() => onAskAIParenting('psychologist', topic.query)}
                      className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-orange-50 border border-slate-200 text-xs font-bold text-slate-800 transition-all flex items-center justify-between group"
                    >
                      <span>{topic.label}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Link to Growth Map */}
              <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-3xl p-5 space-y-3 shadow-sm">
                <h4 className="font-black text-sm flex items-center gap-2 text-white">
                  <BarChart2 className="w-4 h-4 text-amber-200" />
                  <span>Parent Tracking Dashboard</span>
                </h4>
                <p className="text-xs text-orange-50">
                  Track your child's academic marks, robotics projects, sanskar score, and badges in one digital portfolio.
                </p>
                {onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab('growth')}
                    className="w-full py-2 bg-white text-orange-700 font-black text-xs rounded-xl hover:bg-orange-50 transition-colors shadow-xs"
                  >
                    Open Child Growth Map →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PARENT-CHILD BONDING TAB */}
      {activeSubTab === 'bonding' && (
        <div className="space-y-6">
          {/* Daily 15-Min Connection Generator Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-orange-400 animate-pulse" />
                <div>
                  <h3 className="font-black text-base sm:text-lg text-white">
                    Daily 15-Minute Connection Prompt (ఈనాటి ఆత్మీయ ప్రశ్న)
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    Spend 15 gadget-free minutes tonight exploring this question together.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentPromptIdx((prev) => (prev + 1) % dailyPrompts.length)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Shuffle Prompt</span>
              </button>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center space-y-2">
              <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest block">
                Tonight's Conversation Card:
              </span>
              <p className="text-base sm:text-lg font-black text-white italic">
                "{dailyPrompts[currentPromptIdx]}"
              </p>
            </div>
          </div>

          {/* Bonding Activities List */}
          <div className="space-y-4">
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-orange-600" />
              <span>Parent-Child Bonding Rituals & Weekend Projects</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BONDING_ACTIVITIES.map((activity) => {
                const isCompleted = !!completedActivities[activity.id];
                return (
                  <div
                    key={activity.id}
                    className={`rounded-3xl p-5 border transition-all space-y-4 ${
                      isCompleted
                        ? 'bg-orange-50/60 border-orange-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-orange-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                        {activity.category}
                      </span>
                      <span className="text-xs font-black text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                        +{activity.points} Pts
                      </span>
                    </div>

                    <div>
                      <h4 className="font-black text-slate-900 text-base">
                        {activity.title}
                      </h4>
                      <p className="text-xs text-orange-600 font-bold mt-0.5">
                        {activity.teluguTitle} • {activity.duration}
                      </p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                        {activity.description}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-800">
                      <span className="font-black text-orange-700 text-[10px] uppercase block">How to Execute:</span>
                      <ul className="space-y-1 font-medium">
                        {activity.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-orange-600 font-black shrink-0">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => toggleActivityComplete(activity)}
                      className={`w-full py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all ${
                        isCompleted
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-100 hover:bg-orange-50 hover:text-orange-700 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isCompleted ? '✓ Completed! (+Points Claimed)' : 'Mark Activity Completed'}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. ACTIVITIES & GOALS TAB */}
      {activeSubTab === 'activities' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monthly Family Goals Tracker */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-orange-600" />
                    <span>Monthly Family Goals Tracker (ఈ నెల లక్ష్యాలు)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Small commitments that strengthen parent-child trust and daily character habits.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddGoal(!showAddGoal)}
                  className="bg-orange-600 text-white px-3 py-1.5 rounded-xl text-xs font-black hover:bg-orange-700 transition-colors flex items-center gap-1 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Goal</span>
                </button>
              </div>

              {/* Add Custom Goal Form */}
              {showAddGoal && (
                <form onSubmit={handleAddGoal} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex gap-2">
                  <input
                    type="text"
                    value={newGoalInput}
                    onChange={(e) => setNewGoalInput(e.target.value)}
                    placeholder="Enter custom family goal (e.g. Sunday morning 20-min yoga together)"
                    className="flex-1 bg-white px-3 py-1.5 text-xs rounded-xl border border-slate-200 outline-none text-slate-800 focus:border-orange-500"
                  />
                  <button type="submit" className="bg-orange-600 text-white font-black text-xs px-4 py-1.5 rounded-xl shadow-xs">
                    Save
                  </button>
                </form>
              )}

              {/* Goals List */}
              <div className="space-y-2.5">
                {familyGoals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-start gap-3 ${
                      goal.completed
                        ? 'bg-orange-50/70 border-orange-300 text-orange-950 font-black'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => {}}
                      className="mt-0.5 accent-orange-600 rounded"
                    />
                    <span className="leading-snug flex-1">{goal.text}</span>
                    {goal.completed && (
                      <span className="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full font-bold">
                        Achieved!
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Parent-Child Reflex Quiz Mini-Widget */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-orange-500" />
                <span>Parent-Child Connection Quiz</span>
              </h3>
              <p className="text-xs text-slate-600">
                How well do you know your child's daily preferences and learning interests?
              </p>

              <div className="space-y-3">
                {[
                  { id: 1, q: '1. What is your child’s favorite subject or DIY craft activity right now?' },
                  { id: 2, q: '2. What school topic caused them the most worry this week?' },
                  { id: 3, q: '3. What is their dream robotics model or story book?' }
                ].map((item) => (
                  <div key={item.id} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                    <p className="font-bold text-slate-800">{item.q}</p>
                    <input
                      type="text"
                      placeholder="Discuss with your child and note answer..."
                      className="w-full bg-white p-2 rounded-xl text-xs border border-slate-200 text-slate-800 focus:border-orange-500 outline-none"
                    />
                  </div>
                ))}

                <button
                  onClick={() => alert('Great effort! Sharing open conversations builds lifelong emotional trust with your child.')}
                  className="w-full py-2 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-xl shadow-xs transition-colors"
                >
                  Complete Conversation Check
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. COMMUNICATION & SCENARIOS TAB */}
      {activeSubTab === 'scenarios' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-orange-600" />
              <span>Positive Psychology Roleplay Scenarios (సంభాషణల శైలి)</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Compare common reactive responses with positive parenting approaches derived from child psychology:
            </p>

            <div className="space-y-4">
              {PARENTING_SCENARIOS.map((scenario) => (
                <div
                  key={scenario.id}
                  className="bg-slate-50 rounded-3xl border border-slate-200 p-5 space-y-3"
                >
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="font-black text-slate-900 text-sm sm:text-base">
                      Scenario: {scenario.situation}
                    </h4>
                    <p className="text-xs text-orange-600 font-bold mt-0.5">
                      {scenario.teluguSituation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Mistake */}
                    <div className="bg-red-50 p-3.5 rounded-2xl border border-red-200 space-y-1">
                      <span className="font-black text-red-700 uppercase text-[10px] block">
                        ❌ Traditional Reactive Reaction:
                      </span>
                      <p className="text-red-950 font-medium">{scenario.traditionalMistake}</p>
                    </div>

                    {/* Positive */}
                    <div className="bg-green-50 p-3.5 rounded-2xl border border-green-200 space-y-1">
                      <span className="font-black text-green-700 uppercase text-[10px] block">
                        ✅ Positive Psychology Approach:
                      </span>
                      <p className="text-green-950 font-bold">{scenario.positiveApproach}</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs text-slate-700">
                    <strong className="text-orange-700">Psychology Insight:</strong> {scenario.psychologyInsight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. DEVELOPMENTAL MILESTONES TAB */}
      {activeSubTab === 'milestones' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-black text-slate-900 text-lg flex items-center gap-2">
              <Compass className="w-5 h-5 text-orange-600" />
              <span>Child Developmental Milestones Guide (LKG to 10th Class)</span>
            </h3>
            <p className="text-xs text-slate-600">
              Understanding your child's age-specific emotional, social, and cognitive growth stages:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AGE_MILESTONES.map((milestone, idx) => (
                <div key={idx} className="bg-slate-50 rounded-3xl border border-slate-200 p-5 space-y-3">
                  <div className="border-b border-slate-200 pb-2">
                    <span className="bg-orange-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      Age Stage {idx + 1}
                    </span>
                    <h4 className="font-black text-slate-900 text-base mt-1">
                      {milestone.ageGroup}
                    </h4>
                    <p className="text-xs text-orange-600 font-bold">{milestone.teluguAgeGroup}</p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-800">
                    <div>
                      <span className="font-bold text-orange-700 block">Emotional & Social Benchmarks:</span>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5 mt-0.5">
                        {milestone.emotionalSocial.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-bold text-orange-700 block">Cognitive & Learning Capacity:</span>
                      <ul className="list-disc list-inside text-slate-600 space-y-0.5 mt-0.5">
                        {milestone.cognitiveLearning.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white p-2.5 rounded-2xl border border-slate-200 mt-2">
                      <span className="font-black text-slate-900 block">Parent Focus Advice:</span>
                      <ul className="text-slate-700 space-y-0.5 mt-0.5">
                        {milestone.parentFocusTips.map((item, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-orange-500 font-bold">★</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Mentor Helpline & Direct Action Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 space-y-3 border border-slate-800 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center text-white font-black text-xl shrink-0">
              📞
            </div>
            <div>
              <h4 className="font-black text-sm text-white">
                Need Direct Academic or Psychological Guidance?
              </h4>
              <p className="text-xs text-slate-400">
                Speak directly with Gurukul mentors or book 1-on-1 parenting counseling.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <a
              href="tel:7981967919"
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>Bengaluru: 7981967919</span>
            </a>
            <a
              href="tel:7989997015"
              className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>Visakhapatnam: 7989997015</span>
            </a>
            <button
              onClick={() => onAskAIParenting('psychologist', 'Please give me a complete parenting guide routine for my child grade')}
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI Parenting Expert</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-orange-200 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-black text-slate-900 text-lg">
                {activeArticle.title}
              </h3>
              <button onClick={() => setActiveArticle(null)} className="text-slate-400 hover:text-slate-600 font-bold text-lg">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
              <span className="inline-block bg-orange-50 text-orange-800 font-bold px-3 py-1 rounded-full border border-orange-200">
                Category: {activeArticle.category} • {activeArticle.readTime}
              </span>
              <p className="font-bold text-orange-700 text-sm">{activeArticle.summary}</p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-black text-slate-900 block">Key Action Points:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {activeArticle.keyTakeaways.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
              <p className="text-slate-800 pt-2 font-medium">{activeArticle.fullText}</p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveArticle(null)}
                className="bg-orange-600 hover:bg-orange-700 text-white font-black px-5 py-2 rounded-xl text-xs shadow-xs"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
