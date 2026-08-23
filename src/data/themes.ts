import { ThemeConfig, AppThemeId } from '../types';

export const APP_THEMES: Record<AppThemeId, ThemeConfig> = {
  'gurukul-amber': {
    id: 'gurukul-amber',
    name: 'Kids Saffron Amber',
    teluguName: 'పిల్లల గురుకుల కేసరి',
    description: 'Vibrant saffron, auspicious amber gold & warm ivory for Kids Workspace',
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

