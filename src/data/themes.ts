import { ThemeConfig, AppThemeId } from '../types';

export const APP_THEMES: Record<AppThemeId, ThemeConfig> = {
  'gurukul-amber': {
    id: 'gurukul-amber',
    name: 'Gurukul Royal Indigo & Amber',
    teluguName: 'గురుకుల రాయల్ అంబర్ & కేసరి',
    primary: '#EA580C', // Orange 600
    primaryHover: '#C2410C', // Orange 700
    primaryLight: '#FFEDD5', // Orange 100
    accent: '#F59E0B', // Amber 500
    bgMain: '#F8FAFC', // Slate 50
    cardBg: '#FFFFFF',
    border: '#E2E8F0',
    textPrimary: '#0F172A',
    textMuted: '#64748B',
    ring: '#F97316',
    badgeBg: '#FFF7ED',
    badgeText: '#C2410C',
    gradientFrom: '#EA580C',
    gradientTo: '#D97706',
  },
  'emerald-vedic': {
    id: 'emerald-vedic',
    name: 'Emerald Vedic & Temple Gold',
    teluguName: 'మరకత వేద పచ్చ & స్వర్ణ కాంతి',
    primary: '#059669', // Emerald 600
    primaryHover: '#047857', // Emerald 700
    primaryLight: '#D1FAE5', // Emerald 100
    accent: '#D97706', // Amber 600
    bgMain: '#F0FDF4', // Emerald 50
    cardBg: '#FFFFFF',
    border: '#CBD5E1',
    textPrimary: '#064E3B',
    textMuted: '#475569',
    ring: '#10B981',
    badgeBg: '#ECFDF5',
    badgeText: '#047857',
    gradientFrom: '#059669',
    gradientTo: '#0D9488',
  },
  'royal-indigo': {
    id: 'royal-indigo',
    name: 'Royal Amethyst & Coral Rose',
    teluguName: 'రాజసం ఇండిగో & గులాబీ వర్ణం',
    primary: '#6366F1', // Indigo 500
    primaryHover: '#4F46E5', // Indigo 600
    primaryLight: '#EEF2FF', // Indigo 100
    accent: '#EC4899', // Pink 500
    bgMain: '#F8FAFC',
    cardBg: '#FFFFFF',
    border: '#E2E8F0',
    textPrimary: '#1E1B4B',
    textMuted: '#64748B',
    ring: '#6366F1',
    badgeBg: '#F5F3FF',
    badgeText: '#6D28D9',
    gradientFrom: '#4F46E5',
    gradientTo: '#9333EA',
  },
  'cyber-crimson': {
    id: 'cyber-crimson',
    name: 'Cyber Slate & Crimson Red',
    teluguName: 'సైబర్ స్లేట్ & రక్త వర్ణం',
    primary: '#DC2626', // Red 600
    primaryHover: '#B91C1C', // Red 700
    primaryLight: '#FEE2E2', // Red 100
    accent: '#F97316', // Orange 500
    bgMain: '#F8FAFC',
    cardBg: '#FFFFFF',
    border: '#E2E8F0',
    textPrimary: '#0F172A',
    textMuted: '#64748B',
    ring: '#EF4444',
    badgeBg: '#FEF2F2',
    badgeText: '#B91C1C',
    gradientFrom: '#DC2626',
    gradientTo: '#EA580C',
  },
  'ocean-teal': {
    id: 'ocean-teal',
    name: 'Ocean Azure & Electric Teal',
    teluguName: 'సముద్ర నీలి & ఎలక్ట్రిక్ టీల్',
    primary: '#0284C7', // Sky 600
    primaryHover: '#0369A1', // Sky 700
    primaryLight: '#E0F2FE', // Sky 100
    accent: '#0D9488', // Teal 600
    bgMain: '#F0F9FF',
    cardBg: '#FFFFFF',
    border: '#CBD5E1',
    textPrimary: '#0C4A6E',
    textMuted: '#475569',
    ring: '#0EA5E9',
    badgeBg: '#F0FDFA',
    badgeText: '#0F766E',
    gradientFrom: '#0284C7',
    gradientTo: '#0D9488',
  }
};
