import Animated, { FadeIn } from 'react-native-reanimated';

import { colors } from '@/src/theme';
import type { Point } from '@/src/utils/imageBounds';

const LINE_HEIGHT = 2;

type ConnectingLineProps = {
  from: Point;
  to: Point;
};

/** A simple rotated-View line between two pixel points (no SVG dependency). */
export function ConnectingLine({ from, to }: ConnectingLineProps) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: from.x,
        top: from.y - LINE_HEIGHT / 2,
        width: length,
        height: LINE_HEIGHT,
        backgroundColor: colors.textSecondary,
        opacity: 0.6,
        transformOrigin: 'left center',
        transform: [{ rotate: `${angle}deg` }],
      }}
    />
  );
}
