import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PracticeHeader } from '@/src/components/PracticeHeader';
import { PrimaryButton } from '@/src/components/PrimaryButton';
import { PuzzleStage } from '@/src/components/PuzzleStage';
import { usePuzzleSession } from '@/src/hooks/usePuzzleSession';
import type { Point } from '@/src/utils/imageBounds';

export function PracticeScreen() {
  const router = useRouter();
  const { currentPuzzle, currentIndex, total, isComplete, goToNextPuzzle } =
    usePuzzleSession();

  const [guess, setGuess] = useState<Point | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setGuess(null);
    setSubmitted(false);
  }, [currentPuzzle?.id]);

  useEffect(() => {
    if (isComplete) {
      router.replace('/results');
    }
  }, [isComplete, router]);

  if (!currentPuzzle) {
    return null;
  }

  const handlePrimaryPress = () => {
    if (submitted) {
      goToNextPuzzle();
    } else {
      setSubmitted(true);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <PracticeHeader score={0} currentIndex={currentIndex + 1} total={total} />

      <View className="flex-1 items-center justify-center px-lg">
        <PuzzleStage
          puzzle={currentPuzzle}
          guess={guess}
          revealed={submitted}
          interactive={!submitted}
          onGuess={setGuess}
        />
        {currentPuzzle.title ? (
          <Text className="mt-sm text-center text-sm text-text-secondary">
            {currentPuzzle.title}
          </Text>
        ) : null}
      </View>

      <View className="items-center px-lg py-lg">
        <PrimaryButton
          label={submitted ? 'Next Puzzle' : 'Submit Guess'}
          disabled={!submitted && !guess}
          onPress={handlePrimaryPress}
        />
      </View>
    </SafeAreaView>
  );
}
