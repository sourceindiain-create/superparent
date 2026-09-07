import { ThemeConfig, AppThemeId } from '../types';

export const APP_THEMES: Record<AppThemeId, ThemeConfig> = {
  'pure-white': {
    id: 'pure-white',
    name: 'Pure White & Crystal Light',
    teluguName: 'స్వచ్ఛమైన తెలుపు లైట్ థీమ్',
    description: 'Crisp, ultra-clean pure white background (#FFFFFF), high-contrast text, sunny amber accents & bright daylight readability',
    brandTag: 'WHITE LIGHT',
    primary: '#EA580C', // Vibrant daylight orange
    primaryHover: '#C2410C',
    primaryLight: '#FFF7ED',
    accent: '#0284C7', // Sky Blue
    bgMain: '#FFFFFF', // Pure clean white
    cardBg: '#F8FAFC', // Slate 50 clean card
    border: '#E2E8F0', // Crisp light border
    textPrimary: '#0F172A', // Deep slate obsidian
    textMuted: '#64748B', // Neutral gray
    ring: '#EA580C',
    badgeBg: '#FFF7ED',
    badgeText: '#C2410C',
    gradientFrom: '#EA580C',
    gradientTo: '#F59E0B',
    palette: ['#FFFFFF', '#EA580C', '#0284C7', '#F8FAFC']
  },
  'netflix-dark': {
    id: 'netflix-dark',
    name: 'Netflix Cinematic Dark',
    teluguName: 'నెట్‌ఫ్లిక్స్ సినిమాటిక్ డార్క్',
    description: 'Iconic Netflix crimson red, deep cinematic carbon black (#141414), studio vignettes & high-contrast movie cards',
    brandTag: 'NETFLIX™',
    primary: '#E50914', // Iconic Netflix Red
    primaryHover: '#B20710', // Dark Crimson Red
    primaryLight: '#2D0B0E', // Translucent red wine tint
    accent: '#FFA500', // Gold/Amber highlight
    bgMain: '#141414', // Cinematic Netflix background
    cardBg: '#181818', // Netflix dark card
    border: '#2A2A2A', // Subtle dark border
    textPrimary: '#FFFFFF', // High contrast white
    textMuted: '#A3A3A3', // Crisp neutral gray
    ring: '#E50914',
    badgeBg: '#E50914',
    badgeText: '#FFFFFF',
    gradientFrom: '#E50914',
    gradientTo: '#141414',
    palette: ['#141414', '#E50914', '#FFFFFF', '#1F1F1F']
  },
  'jiotv-crimson': {
    id: 'jiotv-crimson',
    name: 'Jio TV Live & Entertainment',
    teluguName: 'జియో టీవీ లైవ్ ఎంటర్‌టైన్‌మెంట్',
    description: 'Vibrant JioTV magenta-crimson (#E50046), deep midnight space (#0B0E17), live TV channels & streaming rails',
    brandTag: 'JioTV™',
    primary: '#E50046', // Iconic JioTV Crimson Pink
    primaryHover: '#C2003B',
    primaryLight: '#2B0D1A',
    accent: '#0A84FF', // Jio Digital Blue
    bgMain: '#0B0E17', // Midnight Navy-Black
    cardBg: '#121624',
    border: '#23293D',
    textPrimary: '#FFFFFF',
    textMuted: '#94A3B8',
    ring: '#E50046',
    badgeBg: '#E50046',
    badgeText: '#FFFFFF',
    gradientFrom: '#E50046',
    gradientTo: '#0A2885',
    palette: ['#0B0E17', '#E50046', '#0A84FF', '#121624']
  },
  'theosm-branding': {
    id: 'theosm-branding',
    name: 'theosm™ Neo-Lime Branding',
    teluguName: 'దోస్మ్ నియో-లైమ్ బ్రాండింగ్',
    description: 'High-contrast Dribbble 27700505 Branding System: #021807 obsidian, #63C633 electric lime, #B5D545 chartreuse & #CBD6A3 pistachio',
    brandTag: 'THEOSM™',
    primary: '#63C633', // Electric Neo-Lime (Dribbble 27700505)
    primaryHover: '#2FA212', // Kelly Green
    primaryLight: '#EDF8E5', // Soft Pistachio Tint
    accent: '#B5D545', // Chartreuse Pear Accent
    bgMain: '#F8FAF4', // Clean Studio Mint-White
    cardBg: '#FFFFFF',
    border: '#CBD6A3', // Pale Pistachio Sage Border
    textPrimary: '#021807', // Obsidian Black-Green
    textMuted: '#1B5F0E', // Deep Forest Tone
    ring: '#63C633',
    badgeBg: '#021807',
    badgeText: '#63C633',
    gradientFrom: '#021807',
    gradientTo: '#1B5F0E',
    palette: ['#021807', '#63C633', '#B5D545', '#CBD6A3']
  },
  'byjus-purple': {
    id: 'byjus-purple',
    name: "Visual 3D Learning",
    teluguName: 'విజువల్ 3D లెర్నింగ్',
    description: "Iconic royal violet purple, radiant gold & clean lavender cards for concept mastery",
    brandTag: "Visual 3D",
    primary: '#7E22CE', // Violet/Purple 700
    primaryHover: '#6B21A8', // Purple 800
    primaryLight: '#F3E8FF', // Purple 100
    accent: '#F59E0B', // Amber 500 Gold
    bgMain: '#FAF5FF', // Purple 50 / Lavender tint
    cardBg: '#FFFFFF',
    border: '#E9D5FF',
    textPrimary: '#3B0764',
    textMuted: '#6B21A8',
    ring: '#9333EA',
    badgeBg: '#F3E8FF',
    badgeText: '#6B21A8',
    gradientFrom: '#7E22CE',
    gradientTo: '#9333EA',
    palette: ['#7E22CE', '#F59E0B', '#F3E8FF'] // 3 Color Triad
  },
  'unacademy-green': {
    id: 'unacademy-green',
    name: 'Top Educator Live',
    teluguName: 'టాప్ ఎడ్యుకేటర్ లైవ్',
    description: 'Signature electric emerald, deep space navy & clean slate for live interactive classes',
    brandTag: 'Top Educator',
    primary: '#08BD80', // Iconic Unacademy Emerald
    primaryHover: '#059669', // Emerald 700
    primaryLight: '#D1FAE5', // Emerald 100
    accent: '#0284C7', // Sky 600
    bgMain: '#F8FAFC', // Slate 50
    cardBg: '#FFFFFF',
    border: '#CBD5E1',
    textPrimary: '#0F172A',
    textMuted: '#334155',
    ring: '#08BD80',
    badgeBg: '#ECFDF5',
    badgeText: '#065F46',
    gradientFrom: '#08BD80',
    gradientTo: '#0F172A',
    palette: ['#08BD80', '#0F172A', '#D1FAE5'] // 3 Color Triad
  },
  'gurukul-amber': {
    id: 'gurukul-amber',
    name: 'Kids Saffron Amber',
    teluguName: 'పిల్లల గురుకుల కేసరి',
    description: 'Vibrant saffron, auspicious amber gold & warm ivory for Kids Workspace',
    brandTag: 'Gurukul',
    primary: '#EA580C', // Orange 600
    primaryHover: '#C2410C', // Orange 700
    primaryLight: '#FFEDD5', // Orange 100
    accent: '#F59E0B', // Amber 500
    bgMain: '#FFFDF9', // Warm Ivory Slate
    cardBg: '#FFFFFF',
    border: '#FED7AA',
    textPrimary: '#431407',
    textMuted: '#78350F',
    ring: '#F97316',
    badgeBg: '#FFF7ED',
    badgeText: '#C2410C',
    gradientFrom: '#EA580C',
    gradientTo: '#D97706',
    palette: ['#EA580C', '#F59E0B', '#FFF7ED'] // 3 Color Triad
  },
  'royal-indigo': {
    id: 'royal-indigo',
    name: 'Parents Royal Blue',
    teluguName: 'తల్లిదండ్రుల రాయల్ బ్లూ',
    description: 'Complete executive azure blue, sky accents & navy for Parents Workspace',
    brandTag: 'Parents Blue',
    primary: '#2563EB', // Blue 600
    primaryHover: '#1D4ED8', // Blue 700
    primaryLight: '#DBEAFE', // Blue 100
    accent: '#0284C7', // Sky 600
    bgMain: '#F0F7FF', // Light Azure Slate
    cardBg: '#FFFFFF',
    border: '#BFDBFE',
    textPrimary: '#1E3A8A',
    textMuted: '#1E40AF',
    ring: '#3B82F6',
    badgeBg: '#EFF6FF',
    badgeText: '#1D4ED8',
    gradientFrom: '#2563EB',
    gradientTo: '#0284C7',
    palette: ['#2563EB', '#0284C7', '#DBEAFE'] // 3 Color Triad
  },
  'emerald-vedic': {
    id: 'emerald-vedic',
    name: 'Admin Vedic Green',
    teluguName: 'అడ్మిన్ మరకత పచ్చ',
    description: 'Serene emerald green, cyber mint & jade for Admin Workspace',
    brandTag: 'Admin Master',
    primary: '#059669', // Emerald 600
    primaryHover: '#047857', // Emerald 700
    primaryLight: '#D1FAE5', // Emerald 100
    accent: '#0D9488', // Teal 600
    bgMain: '#F0FDF4', // Emerald 50
    cardBg: '#FFFFFF',
    border: '#A7F3D0',
    textPrimary: '#064E3B',
    textMuted: '#065F46',
    ring: '#10B981',
    badgeBg: '#ECFDF5',
    badgeText: '#047857',
    gradientFrom: '#059669',
    gradientTo: '#0D9488',
    palette: ['#059669', '#10B981', '#ECFDF5'] // 3 Color Triad
  }
};

