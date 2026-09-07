import React, { useState } from 'react';
import { UserRole, NavTab, UserAccount, AppThemeId, AIExpertPersona } from '../types';
import { 
  Home,
  GraduationCap, 
  Cpu, 
  Zap, 
  Video, 
  Languages, 
  BookOpen, 
  Heart, 
  Scroll, 
  Users, 
  Bot, 
  Compass, 
  Gamepad2, 
  TrendingUp, 
  ShoppingBag, 
  Award, 
  Globe, 
  CreditCard, 
  WifiOff, 
  ShieldCheck, 
  CheckCircle2, 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  Sparkles, 
  Bell, 
  Flame, 
  Trophy, 
  Palette, 
  Lock, 
  LogOut,
  Sliders,
  Maximize2,
  Minimize2,
  Crown,
  Phone
} from 'lucide-react';
import { APP_THEMES } from '../data/themes';

interface SoftwareShellProps {
  currentUser: UserAccount;
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenAskAI: (persona?: AIExpertPersona, prefilledQuery?: string) => void;
  onLogout: () => void;
  currentTheme: AppThemeId;
  onSelectTheme: (theme: AppThemeId) => void;
  masterAccessGranted: boolean;
  onToggleMasterAccess: () => void;
  onOpenContact?: () => void;
  children: React.ReactNode;
}

interface NavGroup {
  groupName: string;
  items: {
    tab: NavTab;
    label: string;
    teluguLabel: string;
    icon: React.ElementType;
    badge?: string;
    badgeColor?: string;
    roles?: UserRole[];
  }[];
}

export const SoftwareShell: React.FC<SoftwareShellProps> = ({
  currentUser,
  role,
  setRole,
  activeTab,
  setActiveTab,
  onOpenAskAI,
  onLogout,
  currentTheme,
  onSelectTheme,
  masterAccessGranted,
  onToggleMasterAccess,
  onOpenContact,
  children
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);

  const theme = APP_THEMES[currentTheme] || APP_THEMES['gurukul-amber'];

  // Role-specific navigation groupings for strict categorization
  const getNavGroups = (): NavGroup[] => {
    if (role === 'student') {
      return [
        {
          groupName: 'Kids Learning & Practice',
          items: [
            { tab: 'home', label: 'Kids Gurukul Dashboard', teluguLabel: 'ప్రధాన డాష్‌బోర్డ్', icon: Home },
            { tab: 'homework', label: 'Students Homework & OCR', teluguLabel: 'హోంవర్క్ & OCR సాల్వర్', icon: Sparkles, badge: 'Lens & AI', badgeColor: 'bg-emerald-100 text-emerald-800' },
            { tab: 'education', label: 'Education Hub (LKG-10)', teluguLabel: 'పాఠ్యాంశాలు', icon: BookOpen, badge: 'All Boards' },
            { tab: 'practice-master', label: 'Practice Master Zone', teluguLabel: 'పరీక్షలు & క్విజ్', icon: Zap, badge: 'AI Tutor' },
            { tab: 'classroom', label: 'Live Virtual Classroom', teluguLabel: 'లైవ్ క్లాస్‌రూమ్', icon: Video, badge: 'Zoom/Meet', badgeColor: 'bg-blue-100 text-blue-800' },
            { tab: 'language-lab', label: 'World Language Lab', teluguLabel: 'భాషా ప్రయోగశాల', icon: Languages },
            { tab: 'kids-lab', label: 'Kids Science & Math Lab', teluguLabel: 'కిడ్స్ సైన్స్ ల్యాబ్', icon: Cpu }
          ]
        },
        {
          groupName: 'Culture, Sanskar & Tech',
          items: [
            { tab: 'sanskar', label: 'Values & Bhagavad Gita', teluguLabel: 'సంస్కార & గీత', icon: Heart, badge: '700 Shlokas' },
            { tab: 'stories', label: 'Stories & AP Culture', teluguLabel: 'చందమామ & కథలు', icon: Scroll, badge: 'Audiobooks' },
            { tab: 'innovation', label: 'Robotics & Drone Lab', teluguLabel: 'రోబోటిక్స్ ల్యాబ్', icon: Compass, badge: 'Simulators' },
            { tab: 'games', label: 'Cognitive Brain Games', teluguLabel: 'మెదడు ఆటలు', icon: Gamepad2 },
            { tab: 'showcase', label: 'Student Talent Showcase', teluguLabel: 'షోకేస్', icon: Award },
            { tab: 'offline-hub', label: 'Offline PWA Vault', teluguLabel: 'ఆఫ్‌లైన్ డౌన్‌లోడ్', icon: WifiOff }
          ]
        }
      ];
    }

    if (role === 'parent') {
      return [
        {
          groupName: 'Parenting & Child Guidance',
          items: [
            { tab: 'home', label: 'Parents Executive Dashboard', teluguLabel: 'పేరెంట్ డాష్‌బోర్డ్', icon: Home },
            { tab: 'homework', label: 'Students Homework & OCR', teluguLabel: 'హోంవర్క్ & డాక్టర్ సపోర్ట్', icon: Sparkles, badge: 'Lens & Doctor', badgeColor: 'bg-emerald-100 text-emerald-800' },
            { tab: 'parenting', label: 'Parenting Master Articles', teluguLabel: 'పేరెంటింగ్ హబ్', icon: Users, badge: 'Psychology' }
          ]
        },
        {
          groupName: 'Family Growth & Ecosystem',
          items: [
            { tab: 'growth', label: 'Child Growth & Karma Map', teluguLabel: 'రిపోర్ట్ కార్డ్', icon: TrendingUp },
            { tab: 'marketplace', label: 'Talent Approvals & Projects', teluguLabel: 'ప్రాజెక్ట్ ఆమోదాలు', icon: ShoppingBag },
            { tab: 'global', label: 'Global Gurukul Hubs', teluguLabel: 'గ్లోబల్ హబ్స్', icon: Globe },
            { tab: 'pricing', label: 'Plans & Fee Management', teluguLabel: 'ఫీజులు & ప్రణాళికలు', icon: CreditCard, badge: 'Active' }
          ]
        }
      ];
    }

    // Admin Workspace: Full access to everything
    return [
      {
        groupName: 'Admin Master Command',
        items: [
          { tab: 'admin', label: 'Admin Security Portal', teluguLabel: 'అడ్మిన్ పోర్టల్', icon: ShieldCheck, badge: 'Master', badgeColor: 'bg-rose-100 text-rose-800' },
          { tab: 'testing', label: 'System Health Diagnostics', teluguLabel: 'సిస్టమ్ టెస్టింగ్', icon: Sliders }
        ]
      },
      {
        groupName: 'Kids Modules (Supervision)',
        items: [
          { tab: 'homework', label: 'Students Homework AI & OCR', teluguLabel: 'హోంవర్క్ & OCR సాల్వర్', icon: Sparkles, badge: 'Lens & AI' },
          { tab: 'education', label: 'Education Hub', teluguLabel: 'పాఠ్యాంశాలు', icon: BookOpen },
          { tab: 'practice-master', label: 'Practice Master Zone', teluguLabel: 'పరీక్షలు & క్విజ్', icon: Zap },
          { tab: 'classroom', label: 'Live Virtual Classroom', teluguLabel: 'లైవ్ క్లాస్‌రూమ్', icon: Video },
          { tab: 'language-lab', label: 'World Language Lab', teluguLabel: 'భాషా ప్రయోగశాల', icon: Languages },
          { tab: 'kids-lab', label: 'Kids Science & Math Lab', teluguLabel: 'కిడ్స్ ల్యాబ్', icon: Cpu },
          { tab: 'sanskar', label: 'Values & Bhagavad Gita', teluguLabel: 'సంస్కార & గీత', icon: Heart },
          { tab: 'stories', label: 'Stories & AP Culture', teluguLabel: 'చందమామ కథలు', icon: Scroll },
          { tab: 'innovation', label: 'Robotics & Drone Lab', teluguLabel: 'రోబోటిక్స్', icon: Compass },
          { tab: 'games', label: 'Cognitive Brain Games', teluguLabel: 'బ్రెయిన్ గేమ్స్', icon: Gamepad2 },
          { tab: 'showcase', label: 'Student Showcase', teluguLabel: 'షోకేస్', icon: Award },
          { tab: 'offline-hub', label: 'Offline PWA Vault', teluguLabel: 'ఆఫ్‌లైన్ హబ్', icon: WifiOff }
        ]
      },
      {
        groupName: 'Parents & Ecosystem Modules',
        items: [
          { tab: 'parenting', label: 'Parenting Master Hub', teluguLabel: 'పేరెంటింగ్ హబ్', icon: Users },
          { tab: 'growth', label: 'Growth & Karma Map', teluguLabel: 'రిపోర్ట్ కార్డ్', icon: TrendingUp },
          { tab: 'marketplace', label: 'Talent Marketplace', teluguLabel: 'మార్కెట్‌ప్లేస్', icon: ShoppingBag },
          { tab: 'global', label: 'Global Gurukul Hubs', teluguLabel: 'గ్లోబల్ హబ్స్', icon: Globe },
          { tab: 'pricing', label: 'Plans & Payment Ledger', teluguLabel: 'ఫీజు ప్రణాళికలు', icon: CreditCard }
        ]
      }
    ];
  };

  const NAV_GROUPS = getNavGroups();

  // Filter navigation items if searching
  const filteredGroups = NAV_GROUPS.map(group => ({
    ...group,
    items: group.items.filter(item => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.label.toLowerCase().includes(q) ||
        item.teluguLabel.toLowerCase().includes(q) ||
        item.tab.toLowerCase().includes(q)
      );
    })
  })).filter(group => group.items.length > 0);

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Workspace switching with automatic theme assignment:
  // 1. Kids Workspace -> Amber/Saffron
  // 2. Parents Workspace -> Complete Royal Blue
  // 3. Admin Workspace -> Complete Vedic Green
  const handleWorkspaceSelect = (newRole: UserRole) => {
    setRole(newRole);
    setIsWorkspaceMenuOpen(false);
    if (newRole === 'student') {
      onSelectTheme('gurukul-amber');
      setActiveTab('home');
    } else if (newRole === 'parent') {
      onSelectTheme('royal-indigo'); // Complete Blue
      setActiveTab('home');
    } else if (newRole === 'admin') {
      onSelectTheme('emerald-vedic'); // Complete Green
      setActiveTab('admin');
    }
  };

  return (
    <div 
      className="min-h-screen flex text-slate-900 font-sans transition-colors duration-300 antialiased"
      style={{ backgroundColor: theme.bgMain }}
    >
      
      {/* ========================================================================= */}
      {/* 1. DESKTOP & TABLET LEFT SIDEBAR */}
      {/* ========================================================================= */}
      <aside 
        className={`hidden md:flex flex-col border-r border-slate-200/80 bg-white shadow-xs z-30 transition-all duration-300 sticky top-0 h-screen shrink-0 ${
          isSidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Brand Header & Workspace Switcher */}
        <div className="p-4 border-b border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            {!isSidebarCollapsed ? (
              <div 
                onClick={() => handleSelectTab('home')}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div 
                  className="w-10 h-10 rounded-2xl text-white flex items-center justify-center font-black shadow-md ring-2 ring-white group-hover:scale-105 transition-transform"
                  style={{ background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})` }}
                >
                  <Crown className="w-5 h-5 text-amber-100" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-sm text-slate-900 tracking-tight">SUPER PARENT</span>
                    <span 
                      className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded"
                      style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
                    >
                      {theme.brandTag || 'Pro'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold leading-tight">All-in-One EdTech LMS</p>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => handleSelectTab('home')}
                className="w-10 h-10 mx-auto rounded-2xl text-white flex items-center justify-center font-black shadow-md cursor-pointer"
                style={{ background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})` }}
              >
                <Crown className="w-5 h-5 text-amber-100" />
              </div>
            )}

            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Active Workspace Selector Dropdown */}
          {!isSidebarCollapsed && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
                className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-300 text-left transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {role === 'parent' ? '👨‍👩‍👧' : role === 'student' ? '👦' : '🛡️'}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Workspace</span>
                    <span className="text-xs font-black text-slate-900 capitalize">{role} Workspace</span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {isWorkspaceMenuOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl p-1.5 z-50 space-y-1 animate-fade-in">
                  {[
                    { id: 'student', label: 'Kids Workspace', icon: '👦', desc: 'Lessons, practice, labs & shlokas' },
                    { id: 'parent', label: 'Parents Workspace', icon: '👨‍👩‍👧', desc: 'Child growth, guidance & fees (Blue)' },
                    { id: 'admin', label: 'Admin Workspace', icon: '🛡️', desc: 'Master security, users & logs (Green)' }
                  ].map(w => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => handleWorkspaceSelect(w.id as UserRole)}
                      className={`w-full p-2.5 rounded-xl text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                        role === w.id 
                          ? role === 'parent' 
                            ? 'bg-blue-50 text-blue-950 font-black border border-blue-200' 
                            : role === 'admin'
                              ? 'bg-emerald-50 text-emerald-950 font-black border border-emerald-200'
                              : 'bg-orange-50 text-orange-950 font-black border border-orange-200'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="text-xl">{w.icon}</span>
                      <div>
                        <div className="text-xs font-bold">{w.label}</div>
                        <div className="text-[10px] text-slate-400">{w.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Search Bar */}
        {!isSidebarCollapsed && (
          <div className="px-4 pt-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules (⌘K)..."
                className="w-full pl-8 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        )}

        {/* Sidebar Nav Items List (Scrollable) */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
          {filteredGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  {group.groupName}
                </div>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.tab;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => handleSelectTab(item.tab)}
                      style={{
                        backgroundColor: isActive ? theme.primary : undefined,
                        boxShadow: isActive ? `0 4px 12px ${theme.primary}40` : undefined
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all cursor-pointer relative group ${
                        isActive
                          ? 'text-white font-black'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold'
                      }`}
                      title={isSidebarCollapsed ? item.label : undefined}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      
                      {!isSidebarCollapsed && (
                        <div className="flex-1 min-w-0 flex items-center justify-between">
                          <span className="text-xs truncate">{item.label}</span>
                          {item.badge && (
                            <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-md ${
                              isActive ? 'bg-white/20 text-white' : (item.badgeColor || 'bg-slate-200 text-slate-700')
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* EdTech & Workspace Themes Selector in Sidebar */}
        {!isSidebarCollapsed ? (
          <div className="p-3 border-t border-slate-100 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                <Palette className="w-3 h-3 text-purple-600" />
                <span>EdTech & Workspace Themes</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 capitalize">{currentTheme.replace('-', ' ')}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.values(APP_THEMES).map(t => {
                const isSelected = currentTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTheme(t.id)}
                    style={{
                      borderColor: isSelected ? t.primary : undefined,
                      boxShadow: isSelected ? `0 0 0 1px ${t.primary}` : undefined
                    }}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white shadow-xs'
                        : 'bg-white/80 hover:bg-white border-slate-200'
                    }`}
                    title={`${t.name} (${t.teluguName}) - ${t.description}`}
                  >
                    <div className="flex -space-x-1 items-center">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.primary }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.accent }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.primaryLight }} />
                    </div>
                    <span className="text-[9px] font-black text-slate-800 truncate w-full text-center">
                      {t.brandTag || t.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-2 border-t border-slate-100 flex flex-col items-center gap-1">
            <button
              onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 cursor-pointer"
              title="Change 3-Color Theme"
            >
              <Palette className="w-4 h-4 text-orange-600" />
            </button>
          </div>
        )}

        {/* User Card & Logout Bottom Anchor */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70 space-y-2">
          {!isSidebarCollapsed ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-2xl">{currentUser.avatar}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-black text-slate-900 truncate">{currentUser.name}</div>
                    <div className="text-[10px] font-bold text-emerald-600 truncate">{currentUser.enrollmentStatus}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="text-slate-400 hover:text-rose-600 p-1.5 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {onOpenContact && (
                <button
                  type="button"
                  onClick={onOpenContact}
                  className="w-full py-2 px-3 rounded-xl bg-[#021807] hover:bg-[#1B5F0E] text-[#63C633] border border-[#63C633]/40 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  title="Direct Contacts & Advisory"
                >
                  <Phone className="w-3.5 h-3.5 text-[#63C633]" />
                  <span>Reach Founder & Contacts</span>
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={onLogout}
              className="w-full py-2 flex justify-center text-slate-400 hover:text-rose-600 cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MOBILE SIDEBAR DRAWER & BACKDROP */}
      {/* ========================================================================= */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" 
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full flex flex-col z-10 shadow-2xl p-4 space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold">
                  <Crown className="w-4 h-4 text-amber-200" />
                </div>
                <div>
                  <span className="font-black text-sm text-slate-900">SUPER PARENT</span>
                  <span className="text-[9px] font-black uppercase ml-1 px-1 bg-orange-100 text-orange-800 rounded">SaaS</span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Workspace Selector */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-2xl">
              {([
                { id: 'student', label: 'Kids', icon: '👦' },
                { id: 'parent', label: 'Parents', icon: '👨‍👩‍👧' },
                { id: 'admin', label: 'Admin', icon: '🛡️' }
              ] as { id: UserRole; label: string; icon: string }[]).map(w => (
                <button
                  key={w.id}
                  onClick={() => handleWorkspaceSelect(w.id)}
                  style={{
                    backgroundColor: role === w.id ? theme.primary : undefined,
                    color: role === w.id ? '#ffffff' : undefined
                  }}
                  className={`py-1.5 text-xs font-black rounded-xl capitalize transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    role === w.id ? 'shadow-xs font-black' : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  <span>{w.icon}</span>
                  <span>{w.label}</span>
                </button>
              ))}
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-4 flex-1">
              {NAV_GROUPS.map((group, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[10px] font-black uppercase text-slate-400 px-2">{group.groupName}</div>
                  <div className="space-y-0.5">
                    {group.items.map(item => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.tab;
                      return (
                        <button
                          key={item.tab}
                          onClick={() => handleSelectTab(item.tab)}
                          style={{
                            backgroundColor: isActive ? theme.primary : undefined,
                            color: isActive ? '#ffffff' : undefined
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                            isActive ? 'font-black shadow-xs' : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="flex-1 truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={onLogout}
                className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-700 font-black text-xs flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN APP VIEW CONTAINER (TOP NAVBAR + CONTENT) */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Software Status Header */}
        <header className="h-16 border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-20 px-4 flex items-center justify-between gap-4">
          
          {/* Mobile Menu Toggle & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Current Section:</span>
              <span className="text-xs font-black text-slate-900 capitalize px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                {activeTab.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Center / Right Control Panel Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Streak Counter Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black shadow-xs">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{currentUser.streakDays || 14}d Streak</span>
            </div>

            {/* Gurukul XP Points */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-900 text-xs font-black shadow-xs">
              <Trophy className="w-3.5 h-3.5 text-orange-500" />
              <span>{currentUser.xpPoints || 3450} XP</span>
            </div>

            {/* Super AI Quick Action Button */}
            <button
              onClick={() => onOpenAskAI('general', '')}
              style={{
                background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`
              }}
              className="px-3.5 py-1.5 text-white font-black text-xs rounded-full shadow-md flex items-center gap-1.5 transition-all cursor-pointer active:scale-98 hover:brightness-110"
            >
              <Bot className="w-3.5 h-3.5 text-amber-200" />
              <span className="hidden sm:inline">Super AI</span>
              <Sparkles className="w-3 h-3 text-amber-200" />
            </button>

            {/* Direct Contacts Action Button */}
            {onOpenContact && (
              <button
                type="button"
                onClick={onOpenContact}
                className="px-3.5 py-1.5 bg-[#021807] hover:bg-[#1B5F0E] text-[#63C633] border border-[#63C633]/40 font-black text-xs rounded-full shadow-xs flex items-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                title="Direct Reach & Contacts (Email / WhatsApp)"
              >
                <Phone className="w-3.5 h-3.5 text-[#63C633]" />
                <span className="hidden sm:inline">Contacts</span>
              </button>
            )}

            {/* 3 Colors Themes Menu & Quick Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black transition-all border border-slate-200 shadow-xs cursor-pointer"
                title="Choose Color Theme"
              >
                <div className="flex -space-x-1 items-center">
                  <span className="w-3.5 h-3.5 rounded-full border border-white shadow-xs" style={{ backgroundColor: theme.primary }} />
                  <span className="w-3.5 h-3.5 rounded-full border border-white shadow-xs" style={{ backgroundColor: theme.accent }} />
                  <span className="w-3.5 h-3.5 rounded-full border border-white shadow-xs" style={{ backgroundColor: theme.primaryLight }} />
                </div>
                <span className="hidden md:inline text-[11px] font-extrabold">{theme.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isThemeMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-3xl shadow-2xl p-3 z-50 space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                      <Palette className="w-4 h-4 text-purple-600" />
                      <span>EdTech Software Themes</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">Interactive & Live Themes</span>
                  </div>

                  <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
                    {Object.values(APP_THEMES).map(t => {
                      const isSelected = currentTheme === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => { onSelectTheme(t.id); setIsThemeMenuOpen(false); }}
                          style={{
                            borderColor: isSelected ? t.primary : undefined,
                            boxShadow: isSelected ? `0 0 0 1px ${t.primary}` : undefined
                          }}
                          className={`w-full p-2.5 rounded-2xl text-left transition-all border cursor-pointer flex flex-col gap-1.5 ${
                            isSelected 
                              ? 'bg-slate-50 shadow-xs' 
                              : 'bg-white hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {/* 3 Color Triad Swatches */}
                              <div className="flex -space-x-1.5 items-center">
                                <span className="w-4 h-4 rounded-full border-2 border-white shadow-xs" style={{ backgroundColor: t.primary }} title="Primary" />
                                <span className="w-4 h-4 rounded-full border-2 border-white shadow-xs" style={{ backgroundColor: t.accent }} title="Accent" />
                                <span className="w-4 h-4 rounded-full border-2 border-white shadow-xs" style={{ backgroundColor: t.primaryLight }} title="Light Tone" />
                              </div>
                              <span className="text-xs font-black text-slate-900">{t.name}</span>
                            </div>
                            {isSelected && <CheckCircle2 className="w-4 h-4" style={{ color: t.primary }} />}
                          </div>

                          <div className="flex items-center justify-between text-[10px] pl-7">
                            <span className="font-bold text-slate-500">{t.teluguName}</span>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-black" style={{ backgroundColor: t.badgeBg, color: t.badgeText }}>
                              {t.brandTag || 'Theme'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Master Access Badge */}
            {masterAccessGranted && (
              <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black">
                <Crown className="w-3 h-3 text-emerald-600" />
                <span>100% Master Access</span>
              </div>
            )}
          </div>
        </header>

        {/* Content Children */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
          {children}
        </main>
      </div>

    </div>
  );
};
