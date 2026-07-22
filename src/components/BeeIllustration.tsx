import { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type BeeIllustrationProps = {
  size?: number;
};

export function BeeIllustration({ size = 96 }: BeeIllustrationProps) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1400 }),
        withTiming(0, { duration: 1400 }),
      ),
      -1,
      true,
    );
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle} accessibilityLabel="Bee illustration">
      <Text style={{ fontSize: size, lineHeight: size * 1.15 }}>🐝</Text>
    </Animated.View>
  );
}
