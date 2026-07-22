import type { ViewStyle } from 'react-native';

export const shadows: Record<'sm' | 'md' | 'lg', ViewStyle> = {
  sm: {
    shadowColor: '#241A0D',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#241A0D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#241A0D',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
};

export type ShadowToken = keyof typeof shadows;
