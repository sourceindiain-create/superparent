import React, { useState, useEffect } from 'react';
import { UserRole, NavTab, AIExpertPersona, UserAccount, AppThemeId } from './types';
import { SoftwareShell } from './components/SoftwareShell';
import { DashboardHome } from './components/DashboardHome';
import { Header } from './components/Header';
import { UniversalNavBar } from './components/UniversalNavBar';
import { HomeOverview } from './components/HomeOverview';
import { AskSuperAIModal } from './components/AskSuperAIModal';
import { EducationHub } from './components/EducationHub';
import { SanskarHub } from './components/SanskarHub';
import { StoriesHub } from './components/StoriesHub';
import { ParentingHub } from './components/ParentingHub';
import { InnovationLab } from './components/InnovationLab';
import { GamesHub } from './components/GamesHub';
import { GrowthMap } from './components/GrowthMap';
import { Marketplace } from './components/Marketplace';
import { Showcase } from './components/Showcase';
import { GlobalLearning } from './components/GlobalLearning';
import { PricingSection } from './components/PricingSection';
import { SuperStudentHub } from './components/SuperStudentHub';
import { KidsLab } from './components/KidsLab';
import { PracticeMasterZone } from './components/PracticeMasterZone';
import { CertificateModal } from './components/CertificateModal';
import { LoginPage } from './components/LoginPage';
import { SaaSAccessPortal } from './components/SaaSAccessPortal';
import { AdminPortal } from './components/AdminPortal';
import { TestingSuiteView } from './components/TestingSuiteView';
import { ClassroomInteractionRoom } from './components/ClassroomInteractionRoom';
import { WorldLanguageLab } from './components/WorldLanguageLab';
import { OfflineHub } from './components/OfflineHub';
import { Footer } from './components/Footer';
import { AccessGuard } from './components/AccessGuard';
import { MediaLinkModal, MediaModalProps } from './components/MediaLinkModal';
import { APP_THEMES } from './data/themes';

const DEFAULT_STUDENT_USER: UserAccount = {
  id: 'user-student-1',
  email: 'student@superparent.in',
  name: 'Chaitanya Reddy',
  role: 'student',
  avatar: '👦',
  grade: 'Class 8',
  phone: '+91 7981967919',
  subscriptionTier: 'kids',
  enrollmentStatus: 'Premium Gurukul',
  hasFullAccess: true,
  xpPoints: 3450,
  streakDays: 14,
  permissions: {
    canAccessAllCourses: true,
    canAccessAllPerks: true,
    canApproveMarketplace: false,
    canManageUsers: false,
    canGenerateCertificates: true,
    canAccessAdminPortal: false,
    canRunDiagnostics: true
  }
};

const DEFAULT_PARENT_USER: UserAccount = {
  id: 'user-parent-1',
  email: 'parent@superparent.in',
  name: 'Rajesh & Lakshmi Reddy',
  role: 'parent',
  avatar: '👨‍👩‍👧',
  grade: 'Class 8',
  phone: '+91 7989997015',
  subscriptionTier: 'super-parent',
  enrollmentStatus: 'Premium Gurukul Family',
  hasFullAccess: true,
  xpPoints: 4800,
  streakDays: 21,
  permissions: {
    canAccessAllCourses: true,
    canAccessAllPerks: true,
    canApproveMarketplace: true,
    canManageUsers: false,
    canGenerateCertificates: true,
    canAccessAdminPortal: true,
    canRunDiagnostics: true
  }
};

const DEFAULT_ADMIN_USER: UserAccount = {
  id: 'user-admin-1',
  email: 'admin@superparent.in',
  name: 'Super Admin (EMFI Lead)',
  role: 'admin',
  avatar: '🛡️',
  phone: '+91 7981967919',
  subscriptionTier: 'admin',
  enrollmentStatus: 'Admin Superuser',
  hasFullAccess: true,
  xpPoints: 99999,
  streakDays: 100,
  permissions: {
    canAccessAllCourses: true,
    canAccessAllPerks: true,
    canApproveMarketplace: true,
    canManageUsers: true,
    canGenerateCertificates: true,
    canAccessAdminPortal: true,
    canRunDiagnostics: true
  }
};

const KIDS_ALLOWED_TABS: NavTab[] = [
  'home', 'super-student', 'tutors-room', 'education', 'practice-master', 'classroom', 
  'language-lab', 'kids-lab', 'sanskar', 'stories', 'innovation', 'games', 'showcase', 'offline-hub'
];

const PARENT_ALLOWED_TABS: NavTab[] = [
  'home', 'tutors-room', 'classroom', 'parenting', 'growth', 'marketplace', 'global', 'pricing'
];

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount>(DEFAULT_STUDENT_USER);
  const [role, setRole] = useState<UserRole>('student');
  const [activeTab, setActiveTabState] = useState<NavTab>('home');
  const [tabHistory, setTabHistory] = useState<NavTab[]>(['home']);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [selectedAIPersona, setSelectedAIPersona] = useState<AIExpertPersona>('general');
  const [initialAIQuery, setInitialAIQuery] = useState('');
  const [initialAITab, setInitialAITab] = useState<'expert' | 'all_chatbots' | 'language_vault' | 'master_app' | 'digital_library'>('expert');
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [masterAccessGranted, setMasterAccessGranted] = useState<boolean>(true);

  // Global Media & Video Modal State
  const [mediaModalState, setMediaModalState] = useState<{
    isOpen: boolean;
    title: string;
    teluguTitle?: string;
    category?: string;
    videoUrl?: string;
    webUrl?: string;
    audioText?: string;
    description?: string;
    notesContent?: string;
    keyPoints?: string[];
  }>({
    isOpen: false,
    title: ''
  });

  // Theme system state: Saffron Amber for Kids, Complete Royal Blue for Parents, Vedic Green for Admin
  const [currentTheme, setCurrentTheme] = useState<AppThemeId>('gurukul-amber');

  // Navigate with history stack tracking
  const handleNavigateTab = (newTab: NavTab) => {
    if (newTab !== activeTab) {
      setTabHistory(prev => [...prev, newTab]);
      setActiveTabState(newTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Back button functionality
  const handleGoBack = () => {
    if (tabHistory.length > 1) {
      const newHistory = [...tabHistory];
      newHistory.pop(); // Remove current
      const previousTab = newHistory[newHistory.length - 1];
      setTabHistory(newHistory);
      setActiveTabState(previousTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'student') {
      setCurrentUser(DEFAULT_STUDENT_USER);
      setCurrentTheme('gurukul-amber');
      if (!KIDS_ALLOWED_TABS.includes(activeTab)) {
        setActiveTabState('home');
      }
    } else if (newRole === 'parent') {
      setCurrentUser(DEFAULT_PARENT_USER);
      // COMPLETE BLUE THEME FOR PARENTS WORKSPACE
      setCurrentTheme('royal-indigo');
      if (!PARENT_ALLOWED_TABS.includes(activeTab)) {
        setActiveTabState('home');
      }
    } else if (newRole === 'admin') {
      setCurrentUser(DEFAULT_ADMIN_USER);
      // COMPLETE GREEN THEME FOR ADMIN WORKSPACE
      setCurrentTheme('emerald-vedic');
      setActiveTabState('admin');
    }
  };

  const handleOpenAskAI = (
    persona: AIExpertPersona = 'general',
    prefilledQuery: string = '',
    targetTab: 'expert' | 'all_chatbots' | 'language_vault' | 'master_app' | 'digital_library' = 'expert'
  ) => {
    setSelectedAIPersona(persona);
    setInitialAIQuery(prefilledQuery);
    setInitialAITab(targetTab);
    setIsAskAIOpen(true);
  };

  const handleOpenMedia = (media: Partial<MediaModalProps>) => {
    setMediaModalState({
      isOpen: true,
      title: media.title || 'Interactive Educational Resource',
      teluguTitle: media.teluguTitle,
      category: media.category,
      videoUrl: media.videoUrl,
      webUrl: media.webUrl,
      audioText: media.audioText,
      description: media.description,
      notesContent: media.notesContent,
      keyPoints: media.keyPoints
    });
  };

  const handleToggleMasterAccess = () => {
    const newState = !masterAccessGranted;
    setMasterAccessGranted(newState);
    setCurrentUser(prev => ({ ...prev, hasFullAccess: newState }));
  };

  const handleEarnXP = (points: number, _reason?: string) => {
    setCurrentUser(prev => ({
      ...prev,
      xpPoints: (prev.xpPoints || 0) + points
    }));
  };

  const [layoutMode, setLayoutMode] = useState<'sidebar' | 'top-nav'>('sidebar');

  return (
    <SoftwareShell
      currentUser={currentUser}
      role={role}
      setRole={handleRoleChange}
      activeTab={activeTab}
      setActiveTab={handleNavigateTab}
      onOpenAskAI={(persona, query) => handleOpenAskAI(persona, query)}
      onLogout={() => {
        handleRoleChange('student');
        handleNavigateTab('login');
      }}
      currentTheme={currentTheme}
      onSelectTheme={setCurrentTheme}
      masterAccessGranted={masterAccessGranted}
      onToggleMasterAccess={handleToggleMasterAccess}
    >
      {/* Universal Navigation Controls (Back, Return, Home & Breadcrumbs) */}
      <UniversalNavBar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        tabHistory={tabHistory}
        onGoBack={handleGoBack}
        currentUser={currentUser}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        onOpenAskAI={() => handleOpenAskAI()}
        onToggleMasterAccess={handleToggleMasterAccess}
        masterAccessGranted={masterAccessGranted}
      />

      {/* Main Content Area Protected by Higher-Order Access Guard */}
      <div className="w-full">
        <AccessGuard
          tab={activeTab}
          user={currentUser}
          masterAccessGranted={masterAccessGranted}
          onNavigateTab={handleNavigateTab}
          onToggleMasterAccess={handleToggleMasterAccess}
          onOpenPreviewVideo={(url, title) => handleOpenMedia({ videoUrl: url, title })}
        >
          {activeTab === 'home' && (
            <DashboardHome
              role={role}
              setRole={handleRoleChange}
              setActiveTab={handleNavigateTab}
              onOpenAskAI={(persona, query) => handleOpenAskAI(persona, query)}
              onGenerateCertificate={() => setIsCertModalOpen(true)}
              studentName={currentUser.name}
              currentXP={currentUser.xpPoints}
              streakDays={currentUser.streakDays}
              onEarnXP={handleEarnXP}
            />
          )}

          {activeTab === 'super-student' && (
            <SuperStudentHub 
              studentName={currentUser.name}
              currentXP={currentUser.xpPoints}
              streakDays={currentUser.streakDays}
              onEarnXP={handleEarnXP}
              onAskAI={(query) => handleOpenAskAI('tutor', query)}
              onNavigateTab={(tab) => handleNavigateTab(tab as NavTab)}
            />
          )}

          {activeTab === 'kids-lab' && (
            <KidsLab
              onAskAI={(query) => handleOpenAskAI('tutor', query)}
            />
          )}

          {activeTab === 'practice-master' && (
            <PracticeMasterZone
              onAskAI={(query) => handleOpenAskAI('tutor', query)}
            />
          )}

          {(activeTab === 'classroom' || activeTab === 'tutors-room') && (
            <ClassroomInteractionRoom
              onAskAI={(query) => handleOpenAskAI('tutor', query)}
            />
          )}

          {activeTab === 'language-lab' && (
            <WorldLanguageLab
              onAskAI={(query) => handleOpenAskAI('tutor', query)}
            />
          )}

          {activeTab === 'offline-hub' && (
            <OfflineHub />
          )}

          {activeTab === 'education' && (
            <EducationHub onAskAITutor={(sub, grade) => handleOpenAskAI('tutor', `Explain ${sub} for ${grade}`)} />
          )}

          {activeTab === 'sanskar' && (
            <SanskarHub />
          )}

          {activeTab === 'stories' && (
            <StoriesHub onAskAISTory={() => handleOpenAskAI('storytelling', 'Tell me a Panchatantra story with a moral in Telugu and English')} />
          )}

          {activeTab === 'parenting' && (
            <ParentingHub 
              onAskAIParenting={(persona, query) => handleOpenAskAI(persona || 'psychologist', query || 'How can I build better emotional bonding and reduce screen addiction?')}
              onNavigateTab={(tab) => handleNavigateTab(tab)}
            />
          )}

          {activeTab === 'innovation' && (
            <InnovationLab onAskAIRobotics={(proj) => handleOpenAskAI('robotics', `How to build circuit for ${proj || 'obstacle avoidance robot'}?`)} />
          )}

          {activeTab === 'games' && (
            <GamesHub />
          )}

          {activeTab === 'growth' && (
            <GrowthMap 
              studentName={currentUser.name}
              currentXP={currentUser.xpPoints}
              streakDays={currentUser.streakDays}
              onEarnXP={handleEarnXP}
              onAskAI={(query) => handleOpenAskAI('tutor', query)}
              onGenerateCertificate={() => setIsCertModalOpen(true)} 
            />
          )}

          {activeTab === 'marketplace' && (
            <Marketplace />
          )}

          {activeTab === 'showcase' && (
            <Showcase />
          )}

          {activeTab === 'global' && (
            <GlobalLearning />
          )}

          {activeTab === 'pricing' && (
            <PricingSection 
              onGenerateCertificate={() => setIsCertModalOpen(true)} 
              onNavigateTab={handleNavigateTab}
            />
          )}

          {activeTab === 'login' && (
            <SaaSAccessPortal
              currentUser={currentUser}
              onLoginSuccess={(user, targetTab) => {
                setCurrentUser(user);
                setRole(user.role);
                handleNavigateTab(targetTab || (user.role === 'admin' ? 'admin' : 'home'));
              }}
              setActiveTab={handleNavigateTab}
              currentTheme={currentTheme}
              masterAccessGranted={masterAccessGranted}
              onToggleMasterAccess={handleToggleMasterAccess}
            />
          )}

          {activeTab === 'admin' && (
            <AdminPortal
              currentUser={currentUser}
              setActiveTab={handleNavigateTab}
              masterAccessGranted={masterAccessGranted}
              onToggleMasterAccess={handleToggleMasterAccess}
              currentTheme={currentTheme}
              onSelectTheme={setCurrentTheme}
            />
          )}

          {activeTab === 'testing' && (
            <TestingSuiteView
              setActiveTab={handleNavigateTab}
              onOpenAskAI={handleOpenAskAI}
              onGenerateCertificate={() => setIsCertModalOpen(true)}
              masterAccessGranted={masterAccessGranted}
              onToggleMasterAccess={handleToggleMasterAccess}
              currentTheme={currentTheme}
            />
          )}
        </AccessGuard>
      </div>

      {/* Footer */}
      <Footer
        setActiveTab={handleNavigateTab}
        onOpenAskAI={() => handleOpenAskAI()}
      />

      {/* AI Modal */}
      <AskSuperAIModal
        isOpen={isAskAIOpen}
        onClose={() => setIsAskAIOpen(false)}
        initialPersona={selectedAIPersona}
        initialQuery={initialAIQuery}
        initialTab={initialAITab}
      />

      {/* Universal Media & Video Link Player Modal */}
      <MediaLinkModal
        isOpen={mediaModalState.isOpen}
        onClose={() => setMediaModalState(prev => ({ ...prev, isOpen: false }))}
        title={mediaModalState.title}
        teluguTitle={mediaModalState.teluguTitle}
        category={mediaModalState.category}
        videoUrl={mediaModalState.videoUrl}
        webUrl={mediaModalState.webUrl}
        audioText={mediaModalState.audioText}
        description={mediaModalState.description}
        notesContent={mediaModalState.notesContent}
        keyPoints={mediaModalState.keyPoints}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        studentName={currentUser.name}
      />
    </SoftwareShell>
  );
}
