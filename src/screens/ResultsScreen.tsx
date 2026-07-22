import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/src/components/PrimaryButton';
import { ResultStat } from '@/src/components/ResultStat';
import { useBestScore } from '@/src/hooks/useBestScore';

export function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    score?: string;
    correct?: string;
    total?: string;
  }>();

  const score = Number(params.score ?? 0);
  const correct = Number(params.correct ?? 0);
  const total = Number(params.total ?? 0);
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const bestScore = useBestScore(score);

  const handlePlayAgain = () => {
    router.replace('/practice');
  };

  const handleReturnHome = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="flex-1 items-center justify-center px-lg">
        <Text className="text-center text-2xl font-bold text-text-primary">
          Results
        </Text>

        <View className="mt-lg w-full">
          <ResultStat label="Final Score" value={String(score)} />
          <ResultStat label="Accuracy" value={`${accuracy}%`} />
          <ResultStat label="Correct Answers" value={`${correct} / ${total}`} />
          <ResultStat
            label="Best Score"
            value={String(bestScore ?? score)}
          />
        </View>

        <View className="mt-2xl w-full items-center gap-md">
          <PrimaryButton label="Play Again" onPress={handlePlayAgain} />
          <PrimaryButton label="Return Home" onPress={handleReturnHome} />
        </View>
      </View>
    </SafeAreaView>
  );
}
