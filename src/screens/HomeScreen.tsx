import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BeeIllustration } from '@/src/components/BeeIllustration';
import { PrimaryButton } from '@/src/components/PrimaryButton';
import { getBestScore } from '@/src/services/bestScoreService';
import { getPuzzleCount } from '@/src/services/puzzleService';

export function HomeScreen() {
  const router = useRouter();
  const puzzleCount = getPuzzleCount();
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    getBestScore().then((value) => {
      if (!cancelled) {
        setBestScore(value);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleStartPractice = () => {
    router.push('/practice');
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="flex-1 items-center justify-center px-lg">
        <BeeIllustration size={96} />

        <Text className="mt-md text-center text-4xl font-bold text-text-primary">
          Queen Spotting{'\n'}Trainer
        </Text>

        <Text className="mt-sm text-center text-base text-text-secondary">
          Sharpen your eye. Find the queen in every hive.
        </Text>

        <View className="mt-2xl">
          <PrimaryButton label="Start Practice" onPress={handleStartPractice} />
        </View>

        <Text className="mt-md text-center text-sm text-text-secondary">
          {puzzleCount} puzzles available
        </Text>
        {bestScore !== null && bestScore > 0 ? (
          <Text className="mt-xs text-center text-sm text-text-secondary">
            Best score: {bestScore}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
}
