import { ThemeConfig, AppThemeId } from '../types';

export const APP_THEMES: Record<AppThemeId, ThemeConfig> = {
  'botanical-light': {
    id: 'botanical-light',
    name: 'Master AI & Nature Botanical Light',
    teluguName: 'మాస్టర్ AI నేచర్ బొటానికల్ లైట్',
    description: 'Luminous pure daylight white (#FAFDF9), botanical forest emerald (#047857), personal care rose ribbons (#BE123C), ocean teal & turmeric gold',
    brandTag: 'MASTER AI NATURE',
    primary: '#047857', // Botanical Forest Emerald Green (from Deltas images)
    primaryHover: '#065F46',
    primaryLight: '#ECFDF5',
    accent: '#BE123C', // Radiant Hibiscus Rose / Beauty Care Ribbon
    bgMain: '#FAFDF9', // Pure luminous botanical daylight ivory
    cardBg: '#FFFFFF', // Crisp pure white cards
    border: '#E2E8F0', // Clean subtle border
    textPrimary: '#0F172A', // Deep obsidian readability
    textMuted: '#475569', // Slate 600
    ring: '#047857',
    badgeBg: '#ECFDF5',
    badgeText: '#047857',
    gradientFrom: '#047857',
    gradientTo: '#0D9488',
    palette: ['#FAFDF9', '#047857', '#BE123C', '#0D9488', '#D97706']
  },
  'pure-white': {
    id: 'pure-white',
    name: 'Pure White & Crystal Light',
    teluguName: 'స్వచ్ఛమైన తెలుపు లైట్ థీమ్',
    description: 'Crisp, ultra-clean pure white background (#FFFFFF), high-contrast text, botanical emerald & sunny amber accents',
    brandTag: 'WHITE LIGHT',
    primary: '#047857', // Botanical emerald
    primaryHover: '#065F46',
    primaryLight: '#ECFDF5',
    accent: '#0284C7', // Sky Blue
    bgMain: '#FFFFFF', // Pure clean white
    cardBg: '#FFFFFF', // Clean white card
    border: '#E2E8F0', // Crisp light border
    textPrimary: '#0F172A', // Deep slate obsidian
    textMuted: '#475569', // Neutral gray
    ring: '#047857',
    badgeBg: '#ECFDF5',
    badgeText: '#047857',
    gradientFrom: '#047857',
    gradientTo: '#0D9488',
    palette: ['#FFFFFF', '#047857', '#0284C7', '#F8FAFC']
  },
  'theosm-branding': {
    id: 'theosm-branding',
    name: 'Master Light Neo-Emerald',
    teluguName: 'మాస్టర్ లైట్ నియో-మరకత పచ్చ',
    description: 'Crisp light background (#F8FAF6), botanical deep forest green (#047857), neo-lime accents (#10B981) & pure white cards',
    brandTag: 'MASTER LIGHT',
    primary: '#047857', // Forest Emerald Green
    primaryHover: '#065F46', // Kelly Green
    primaryLight: '#ECFDF5', // Soft Mint Tint
    accent: '#10B981', // Vibrant Neo-Emerald
    bgMain: '#F8FAF6', // Clean Master AI Daylight Ivory-Mint
    cardBg: '#FFFFFF',
    border: '#A7F3D0', // Pale Mint Sage Border
    textPrimary: '#064E3B', // Obsidian Deep Forest
    textMuted: '#047857', // Botanical Forest Tone
    ring: '#047857',
    badgeBg: '#ECFDF5',
    badgeText: '#047857',
    gradientFrom: '#047857',
    gradientTo: '#0D9488',
    palette: ['#F8FAF6', '#047857', '#10B981', '#FFFFFF']
  },
  'netflix-dark': {
    id: 'netflix-dark',
    name: 'Master Cinema Dark Studio',
    teluguName: 'మాస్టర్ సినిమా డార్క్ స్టూడియో',
    description: 'Deep cinematic carbon black (#121417), studio vignettes & high-contrast focus cards',
    brandTag: 'CINEMA DARK',
    primary: '#047857', // Botanical Emerald
    primaryHover: '#065F46',
    primaryLight: '#1C2E25',
    accent: '#F59E0B', // Gold/Amber highlight
    bgMain: '#101413', // Deep slate botanical background
    cardBg: '#181F1D', // Studio dark card
    border: '#273631', // Subtle dark border
    textPrimary: '#FFFFFF', // High contrast white
    textMuted: '#A3B3AB', // Crisp neutral gray
    ring: '#047857',
    badgeBg: '#047857',
    badgeText: '#FFFFFF',
    gradientFrom: '#047857',
    gradientTo: '#101413',
    palette: ['#101413', '#047857', '#FFFFFF', '#181F1D']
  },
  'jiotv-crimson': {
    id: 'jiotv-crimson',
    name: 'Rose Hibiscus & Live Broadcasts',
    teluguName: 'గులాబీ హైబిస్కస్ & లైవ్ ప్రసారాలు',
    description: 'Radiant rose-magenta (#BE123C), botanical foliage, 24x7 educational broadcasts & interactive live channels',
    brandTag: 'WELLNESS & LIVE',
    primary: '#BE123C', // Radiant Rose Magenta (from Deltas personal care)
    primaryHover: '#9F1239',
    primaryLight: '#FFF1F2',
    accent: '#047857', // Botanical Emerald Accent
    bgMain: '#FFF9F9', // Soft Rose Light Background
    cardBg: '#FFFFFF',
    border: '#FECDD3',
    textPrimary: '#1E293B',
    textMuted: '#64748B',
    ring: '#BE123C',
    badgeBg: '#FFE4E6',
    badgeText: '#BE123C',
    gradientFrom: '#BE123C',
    gradientTo: '#047857',
    palette: ['#FFF9F9', '#BE123C', '#047857', '#FFFFFF']
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

