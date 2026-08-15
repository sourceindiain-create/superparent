export type UserRole = 'parent' | 'student' | 'admin';

export type AppThemeId = 'gurukul-amber' | 'emerald-vedic' | 'royal-indigo' | 'cyber-crimson' | 'ocean-teal';

export interface ThemeConfig {
  id: AppThemeId;
  name: string;
  teluguName: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  accent: string;
  bgMain: string;
  cardBg: string;
  border: string;
  textPrimary: string;
  textMuted: string;
  ring: string;
  badgeBg: string;
  badgeText: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  grade?: ClassGrade;
  phone?: string;
  linkedStudentId?: string;
  enrollmentStatus: 'Active' | 'Premium Gurukul' | 'Premium Gurukul Family' | 'Admin Superuser';
  hasFullAccess: boolean; // 100% access master toggle
  xpPoints: number;
  streakDays: number;
  permissions: {
    canAccessAllCourses: boolean;
    canAccessAllPerks: boolean;
    canApproveMarketplace: boolean;
    canManageUsers: boolean;
    canGenerateCertificates: boolean;
    canAccessAdminPortal: boolean;
    canRunDiagnostics: boolean;
  };
}

export type ClassGrade = 
  | 'LKG' | 'UKG' 
  | 'Class 1' | 'Class 2' | 'Class 3' | 'Class 4' | 'Class 5'
  | 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10';

export type SyllabusBoard = 'CBSE' | 'State Board' | 'ICSE' | 'International' | 'IB' | 'Cambridge';

export type NavTab = 
  | 'home'
  | 'super-student'
  | 'classroom'
  | 'language-lab'
  | 'education'
  | 'sanskar'
  | 'stories'
  | 'parenting'
  | 'ai-lab'
  | 'innovation'
  | 'games'
  | 'growth'
  | 'talent-marketplace'
  | 'marketplace'
  | 'showcase'
  | 'global'
  | 'pricing'
  | 'offline-hub'
  | 'contact'
  | 'login'
  | 'admin'
  | 'testing';

export interface SystemTestCheck {
  id: string;
  category: 'API & Server' | 'Navigation & Tabs' | 'AI Multi-Experts' | 'Features & Storage' | 'Access & Security';
  title: string;
  description: string;
  status: 'passed' | 'testing' | 'pending' | 'failed';
  latencyMs?: number;
  details?: string;
  testActionTab?: NavTab;
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  category: 'Access' | 'Auth' | 'Marketplace' | 'Showcase' | 'System' | 'AI';
  details: string;
}

export type AIExpertPersona = 
  | 'general'
  | 'tutor'
  | 'robotics'
  | 'doctor'
  | 'psychologist'
  | 'astrologer'
  | 'craft'
  | 'chef'
  | 'storytelling'
  | 'parenting';

export interface AIExpertInfo {
  id: AIExpertPersona;
  name: string;
  teluguName: string;
  icon: string;
  description: string;
  disclaimer?: string;
}

export interface EducationSubject {
  id: string;
  title: string;
  grade: ClassGrade;
  board: SyllabusBoard;
  icon: string;
  chaptersCount: number;
  topics: string[];
  pdfUrl?: string;
  videoUrl?: string;
  quizAvailable: boolean;
}

export interface GitaShloka {
  id: string;
  chapter: number;
  shlokaNum: number;
  sanskrit: string;
  transliteration: string;
  teluguMeaning: string;
  englishMeaning: string;
  audioSimulatedUrl?: string;
  keyTakeaway: string;
}

export interface StoryItem {
  id: string;
  title: string;
  teluguTitle: string;
  category: 'Panchatantra' | 'Moral' | 'Mythological' | 'Culture' | 'Science';
  ageGroup: string;
  summary: string;
  content: string;
  imageUrl: string;
  audioDuration: string;
  moral: string;
}

export interface ParentingArticle {
  id: string;
  title: string;
  category: 'Communication' | 'Psychological' | 'Education' | 'Health & Habits' | 'Digital Balance';
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  fullText: string;
}

export interface BondingActivity {
  id: string;
  title: string;
  teluguTitle: string;
  category: 'Daily Connection' | 'Weekend Project' | 'Bedtime Heart-to-Heart' | 'Outdoor Exploration';
  duration: string;
  description: string;
  steps: string[];
  points: number;
}

export interface ParentingScenario {
  id: string;
  situation: string;
  teluguSituation: string;
  traditionalMistake: string;
  positiveApproach: string;
  psychologyInsight: string;
}

export interface AgeMilestone {
  ageGroup: string;
  teluguAgeGroup: string;
  emotionalSocial: string[];
  cognitiveLearning: string[];
  parentFocusTips: string[];
}

export interface InnovationProject {
  id: string;
  title: string;
  category: 'Robotics' | 'Drone' | 'Electronics & Circuit' | 'Coding' | '3D Design' | 'DIY Craft';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  componentsNeeded: string[];
  safetyInstructions: string[];
  stepByStepGuide: { stepNumber: number; title: string; detail: string }[];
  diagramDescription: string;
  imageUrl: string;
  codeSnippet?: string;
}

export interface MarketplaceProduct {
  id: string;
  title: string;
  creatorName: string;
  creatorAge: number;
  creatorCity: string;
  parentApproved: boolean;
  category: 'Crafts' | 'DIY Kits' | 'Robotics Models' | 'Storybooks' | 'Artworks';
  priceINR: number;
  originalPriceINR: number;
  rating: number;
  imageUrl: string;
  description: string;
  stock: number;
}

export interface StudentShowcaseItem {
  id: string;
  title: string;
  studentName: string;
  grade: ClassGrade;
  city: string;
  category: 'Best Robot' | 'Best Drone Project' | 'Best Circuit' | 'Best Story' | 'Best Drawing' | 'Best Coding Project' | 'Best Science Model' | 'Best Cultural Activity';
  imageUrl: string;
  description: string;
  likes: number;
  badge: string;
  approvedByParent: boolean;
  createdAt: string;
}

export interface GrowthData {
  studentName: string;
  grade: ClassGrade;
  idNumber: string;
  overallScore: number;
  subjectProgress: { subject: string; score: number }[];
  skillsProgress: { skill: string; score: number }[];
  valuesScore: number;
  projectsCompleted: number;
  certificatesEarned: number;
  storiesReadCount: number;
  recentActivities: { id: string; title: string; date: string; type: string; points: number }[];
}

export interface PricingPlan {
  id: string;
  name: string;
  duration: string;
  priceINR: number;
  popular?: boolean;
  features: string[];
  modes: string[];
  hasCertificate: boolean;
  hasInstructorSupport: boolean;
  hasMentorSupport: boolean;
}

export interface CertificateItem {
  id: string;
  studentName: string;
  courseTitle: string;
  issueDate: string;
  certificateCode: string;
  grade: string;
}
