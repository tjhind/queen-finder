import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type AnimatedScoreProps = {
  value: number;
  className?: string;
};

/** Displays a number that smoothly counts up/down when `value` changes. */
export function AnimatedScore({ value, className }: AnimatedScoreProps) {
  const animatedValue = useSharedValue(value);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    animatedValue.value = withTiming(value, { duration: 400 });
  }, [value, animatedValue]);

  useAnimatedReaction(
    () => Math.round(animatedValue.value),
    (current, previous) => {
      if (current !== previous) {
        runOnJS(setDisplayValue)(current);
      }
    },
  );

  return <Text className={className}>{displayValue}</Text>;
}
