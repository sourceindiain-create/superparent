export type UserRole = 'parent' | 'student' | 'admin';

export type AppThemeId = 'gurukul-amber' | 'emerald-vedic' | 'royal-indigo';

export interface ThemeConfig {
  id: AppThemeId;
  name: string;
  teluguName: string;
  description?: string;
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
  palette?: string[];
}

export type SubscriptionTier = 'free' | 'kids' | 'parent' | 'super-parent' | 'admin';

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  grade?: ClassGrade;
  phone?: string;
  linkedStudentId?: string;
  subscriptionTier?: SubscriptionTier;
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
  | 'tutors-room'
  | 'kids-lab'
  | 'practice-master'
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
  aglasemUrl?: string;
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

export interface StoryChapter {
  id: string;
  chapterNumber: number;
  title: string;
  teluguTitle: string;
  duration: string;
  englishContent: string;
  teluguContent: string;
  moralEnglish: string;
  moralTelugu: string;
  videoEmbedUrl?: string;
  videoTitle?: string;
  audioSimulatedUrl?: string;
  tags?: string[];
}

export interface StorySeries {
  id: string;
  title: string;
  teluguTitle: string;
  category: 'chandamama' | 'balamitra' | 'andhra-culture' | 'panchatantra' | 'tenali-rama' | 'jataka-moral';
  badge: string;
  description: string;
  teluguDescription: string;
  coverImage: string;
  authorOrSource: string;
  totalChapters: number;
  ageGroup: string;
  chapters: StoryChapter[];
  externalArchiveLink?: string;
  externalAudioLink?: string;
  featuredVideoUrl?: string;
}

export interface CultureVideoItem {
  id: string;
  title: string;
  teluguTitle: string;
  category: 'Dance & Arts' | 'Folk Storytelling' | 'Handicrafts & Heritage' | 'Festivals & Rituals' | 'Historical Monuments';
  districtOrRegion: string;
  duration: string;
  thumbnailUrl: string;
  youtubeIdOrEmbed: string;
  description: string;
  teluguDescription: string;
  culturalSignificance: string;
}

export interface FreeBookResource {
  id: string;
  title: string;
  teluguTitle: string;
  category: 'Chandamama Archives' | 'Balamitra Classic' | 'National Book Trust' | 'Moral Storybooks' | 'Telugu Literature';
  author: string;
  totalPages: number;
  language: 'Telugu' | 'English' | 'Bilingual (Telugu & English)';
  coverImage: string;
  description: string;
  readOnlineUrl: string;
  downloadPdfUrl?: string;
  isFreePublicDomain: boolean;
  sampleChaptersPreview?: { chapterTitle: string; content: string }[];
}

export interface DasubhashithamResource {
  id: string;
  title: string;
  teluguTitle: string;
  category: 'Children Classic' | 'Audiobook Series' | 'Telugu Mahakavyalu' | 'Novels & Short Stories' | 'Devotional & Cultural';
  authorOrNarrator: string;
  durationOrEpisodes: string;
  thumbnailUrl: string;
  description: string;
  teluguDescription: string;
  directWebUrl: string;
  dasubhashithamAppUrl: string;
  recommendedFor: string;
}

export interface StoryItem {
  id: string;
  title: string;
  teluguTitle: string;
  category: 'Panchatantra' | 'Moral' | 'Mythological' | 'Culture' | 'Science' | 'Chandamama' | 'Balamitra';
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

export type ReflectionCategory = 
  | 'Science & Nature'
  | 'Mathematics & Logic'
  | 'Coding, AI & Robotics'
  | 'Values & Sanskar'
  | 'Language & Arts'
  | 'Life Skills & Health'
  | 'General Wisdom';

export type ReflectionMood = 
  | '🚀 Excited'
  | '💡 Inspired'
  | '🧠 Curious'
  | '🌟 Proud'
  | '🧘 Peaceful';

export interface DailyReflection {
  id: string;
  date: string; // YYYY-MM-DD
  timestamp: string;
  learnedText: string;
  subjectCategory: ReflectionCategory;
  mood?: ReflectionMood;
  keyTakeaway?: string;
  xpEarned: number;
  streakBonus: boolean;
  aiFeedback?: {
    cheer: string;
    teluguCheer?: string;
    thoughtPrompt?: string;
  };
}
