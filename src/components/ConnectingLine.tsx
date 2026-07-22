import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors } from '@/src/theme';
import type { Point } from '@/src/utils/imageBounds';

const LINE_HEIGHT = 2;
const TARGET_OPACITY = 0.6;

type ConnectingLineProps = {
  from: Point;
  to: Point;
};

/**
 * A simple rotated-View line between two pixel points (no SVG dependency).
 * Animates its own opacity via a shared value rather than the `entering`
 * shorthand, since `entering` animations and a static `opacity` style on
 * the same view fight over the same property.
 */
export function ConnectingLine({ from, to }: ConnectingLineProps) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(TARGET_OPACITY, { duration: 220 });
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      accessible={false}
      style={[
        {
          position: 'absolute',
          left: from.x,
          top: from.y - LINE_HEIGHT / 2,
          width: length,
          height: LINE_HEIGHT,
          backgroundColor: colors.textSecondary,
          transformOrigin: 'left center',
          transform: [{ rotate: `${angle}deg` }],
        },
        animatedStyle,
      ]}
    />
  );
}
