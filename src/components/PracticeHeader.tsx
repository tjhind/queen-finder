import { Text, View } from 'react-native';

import { AnimatedScore } from '@/src/components/AnimatedScore';

type PracticeHeaderProps = {
  score: number;
  currentIndex: number;
  total: number;
};

export function PracticeHeader({ score, currentIndex, total }: PracticeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-lg py-sm">
      <View className="flex-row items-center">
        <Text className="text-base font-semibold text-text-primary">Score: </Text>
        <AnimatedScore
          value={score}
          className="text-base font-semibold text-text-primary"
        />
      </View>
      <Text className="text-base text-text-secondary">
        Puzzle {currentIndex} of {total}
      </Text>
    </View>
  );
}
