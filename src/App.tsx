import React, { useState, useEffect } from 'react';
import { UserRole, NavTab, AIExpertPersona, UserAccount, AppThemeId } from './types';
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
import { CertificateModal } from './components/CertificateModal';
import { LoginPage } from './components/LoginPage';
import { AdminPortal } from './components/AdminPortal';
import { TestingSuiteView } from './components/TestingSuiteView';
import { ClassroomInteractionRoom } from './components/ClassroomInteractionRoom';
import { WorldLanguageLab } from './components/WorldLanguageLab';
import { OfflineHub } from './components/OfflineHub';
import { Footer } from './components/Footer';
import { APP_THEMES } from './data/themes';

const DEFAULT_USER: UserAccount = {
  id: 'user-parent-1',
  email: 'parent@superparent.in',
  name: 'Rajesh & Lakshmi Reddy',
  role: 'parent',
  avatar: '👨‍👩‍👧',
  grade: 'Class 8',
  phone: '+91 7989997015',
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

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount>(DEFAULT_USER);
  const [role, setRole] = useState<UserRole>('parent');
  const [activeTab, setActiveTabState] = useState<NavTab>('home');
  const [tabHistory, setTabHistory] = useState<NavTab[]>(['home']);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [selectedAIPersona, setSelectedAIPersona] = useState<AIExpertPersona>('general');
  const [initialAIQuery, setInitialAIQuery] = useState('');
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [masterAccessGranted, setMasterAccessGranted] = useState<boolean>(true);

  // Theme system state
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
      setCurrentUser({
        id: 'user-student-1',
        email: 'student@superparent.in',
        name: 'Chaitanya Reddy',
        role: 'student',
        avatar: '👦',
        grade: 'Class 8',
        phone: '+91 7981967919',
        enrollmentStatus: 'Premium Gurukul',
        hasFullAccess: masterAccessGranted,
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
      });
    } else if (newRole === 'parent') {
      setCurrentUser(DEFAULT_USER);
    } else if (newRole === 'admin') {
      setCurrentUser({
        id: 'user-admin-1',
        email: 'admin@superparent.in',
        name: 'Super Admin (EMFI Lead)',
        role: 'admin',
        avatar: '🛡️',
        grade: 'Class 10',
        phone: '+91 7981967919',
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
      });
    }
  };

  const handleOpenAskAI = (persona: AIExpertPersona = 'general', prefilledQuery: string = '') => {
    setSelectedAIPersona(persona);
    setInitialAIQuery(prefilledQuery);
    setIsAskAIOpen(true);
  };

  const handleToggleMasterAccess = () => {
    const newState = !masterAccessGranted;
    setMasterAccessGranted(newState);
    setCurrentUser(prev => ({ ...prev, hasFullAccess: newState }));
  };

  const themeConfig = APP_THEMES[currentTheme] || APP_THEMES['gurukul-amber'];

  return (
    <div 
      className="min-h-screen text-slate-900 font-sans flex flex-col transition-colors duration-300"
      style={{ backgroundColor: themeConfig.bgMain }}
    >
      {/* Header Bar */}
      <Header
        role={role}
        setRole={handleRoleChange}
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        onOpenAskAI={() => handleOpenAskAI()}
        currentUser={currentUser}
        onLogout={() => {
          handleRoleChange('student');
          handleNavigateTab('login');
        }}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
        masterAccessGranted={masterAccessGranted}
        onToggleMasterAccess={handleToggleMasterAccess}
      />

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

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'home' && (
          <HomeOverview
            role={role}
            setRole={handleRoleChange}
            setActiveTab={handleNavigateTab}
            onOpenAskAI={(persona) => handleOpenAskAI(persona)}
            onGenerateCertificate={() => setIsCertModalOpen(true)}
          />
        )}

        {activeTab === 'super-student' && (
          <SuperStudentHub 
            onAskAI={(query) => handleOpenAskAI('tutor', query)}
            onNavigateTab={(tab) => handleNavigateTab(tab as NavTab)}
          />
        )}

        {activeTab === 'classroom' && (
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
          <GrowthMap onGenerateCertificate={() => setIsCertModalOpen(true)} />
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
          <PricingSection onGenerateCertificate={() => setIsCertModalOpen(true)} />
        )}

        {activeTab === 'login' && (
          <LoginPage
            currentUser={currentUser}
            onLogin={(user) => {
              setCurrentUser(user);
              setRole(user.role);
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
      </main>

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
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        studentName={currentUser.name}
      />
    </div>
  );
}
