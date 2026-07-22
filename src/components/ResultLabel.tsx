import Animated, { FadeInDown } from 'react-native-reanimated';

import { colors, fontSize, fontWeight, spacing } from '@/src/theme';
import type { ScoreResult } from '@/src/utils/calculateScore';

type ResultLabelProps = {
  result: ScoreResult;
};

export function ResultLabel({ result }: ResultLabelProps) {
  return (
    <Animated.Text
      entering={FadeInDown.duration(220)}
      style={{
        marginTop: spacing.sm,
        textAlign: 'center',
        fontSize: fontSize.lg,
        fontWeight: fontWeight.semibold,
        color: colors.textPrimary,
      }}
    >
      {result.label}
      {result.points > 0 ? ` +${result.points}` : ''}
    </Animated.Text>
  );
}
