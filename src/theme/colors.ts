/**
 * Calm, nature-inspired colour palette for a premium educational puzzle game.
 * Honey/amber accents evoke the hive; deep greens ground the UI.
 */
export const colors = {
  background: '#FBF7EE',
  surface: '#FFFFFF',
  surfaceMuted: '#F3ECDA',

  primary: '#E8A93A',
  primaryDark: '#C9861F',
  primaryLight: '#F6C453',

  secondary: '#3C6E52',
  secondaryDark: '#2A4E3A',
  secondaryLight: '#5B8F6E',

  accent: '#2F5D9F',

  textPrimary: '#241A0D',
  textSecondary: '#6B5A3F',
  textInverse: '#FFFFFF',

  success: '#3C8A5E',
  warning: '#D98E2A',
  danger: '#C2483A',

  border: '#E4D8BE',
  overlay: 'rgba(36, 26, 13, 0.55)',

  marker: '#2F5D9F',
  queen: '#C2483A',
} as const;

export type ColorToken = keyof typeof colors;
