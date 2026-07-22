import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';

import { colors } from '@/src/theme';

const SIZE = 28;
const HALO_SIZE = 52;

type QueenMarkerProps = {
  x: number;
  y: number;
};

export function QueenMarker({ x, y }: QueenMarkerProps) {
  const haloOpacity = useSharedValue(0.5);

  useEffect(() => {
    haloOpacity.value = withRepeat(
      withSequence(
        withTiming(0.15, { duration: 700 }),
        withTiming(0.5, { duration: 700 }),
      ),
      -1,
      true,
    );
  }, [haloOpacity]);

  const haloStyle = useAnimatedStyle(() => ({
    opacity: haloOpacity.value,
  }));

  return (
    <Animated.View
      entering={ZoomIn.duration(250)}
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: x - HALO_SIZE / 2,
        top: y - HALO_SIZE / 2,
        width: HALO_SIZE,
        height: HALO_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: HALO_SIZE,
            height: HALO_SIZE,
            borderRadius: HALO_SIZE / 2,
            backgroundColor: colors.queen,
          },
          haloStyle,
        ]}
      />
      <Animated.View
        style={{
          width: SIZE,
          height: SIZE,
          borderRadius: SIZE / 2,
          backgroundColor: colors.queen,
          borderWidth: 3,
          borderColor: colors.surface,
        }}
      />
    </Animated.View>
  );
}
