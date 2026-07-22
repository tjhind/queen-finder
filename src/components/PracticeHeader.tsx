import { Text, View } from 'react-native';

type PracticeHeaderProps = {
  score: number;
  currentIndex: number;
  total: number;
};

export function PracticeHeader({ score, currentIndex, total }: PracticeHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-lg py-sm">
      <Text className="text-base font-semibold text-text-primary">
        Score: {score}
      </Text>
      <Text className="text-base text-text-secondary">
        Puzzle {currentIndex} of {total}
      </Text>
    </View>
  );
}
