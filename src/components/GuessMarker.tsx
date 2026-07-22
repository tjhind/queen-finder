import Animated, { ZoomIn } from 'react-native-reanimated';

import { colors } from '@/src/theme';

const SIZE = 24;

type GuessMarkerProps = {
  x: number;
  y: number;
};

export function GuessMarker({ x, y }: GuessMarkerProps) {
  return (
    <Animated.View
      entering={ZoomIn.duration(180)}
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: x - SIZE / 2,
        top: y - SIZE / 2,
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: colors.marker,
        borderWidth: 3,
        borderColor: colors.surface,
      }}
    />
  );
}
