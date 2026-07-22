import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PracticeHeader } from '@/src/components/PracticeHeader';
import { PrimaryButton } from '@/src/components/PrimaryButton';
import { PuzzleStage } from '@/src/components/PuzzleStage';
import { usePuzzleSession } from '@/src/hooks/usePuzzleSession';
import { calculateDistance } from '@/src/utils/calculateDistance';
import { calculateScore, type ScoreResult } from '@/src/utils/calculateScore';
import type { Point } from '@/src/utils/imageBounds';

export function PracticeScreen() {
  const router = useRouter();
  const { currentPuzzle, currentIndex, total, isComplete, goToNextPuzzle } =
    usePuzzleSession();

  const [guess, setGuess] = useState<Point | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<ScoreResult | null>(null);

  const [sessionScore, setSessionScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    setGuess(null);
    setSubmitted(false);
    setResult(null);
  }, [currentPuzzle?.id]);

  useEffect(() => {
    if (isComplete) {
      router.replace({
        pathname: '/results',
        params: {
          score: String(sessionScore),
          correct: String(correctCount),
          total: String(total),
        },
      });
    }
  }, [isComplete, router, sessionScore, correctCount, total]);

  if (!currentPuzzle) {
    return null;
  }

  const handlePrimaryPress = () => {
    if (submitted) {
      goToNextPuzzle();
      return;
    }

    if (!guess) {
      return;
    }

    const distance = calculateDistance(guess, currentPuzzle.queen);
    const scoreResult = calculateScore(distance, currentPuzzle.queen.radius);

    setResult(scoreResult);
    setSessionScore((score) => score + scoreResult.points);
    if (scoreResult.points > 0) {
      setCorrectCount((count) => count + 1);
    }
    setSubmitted(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <PracticeHeader
        score={sessionScore}
        currentIndex={currentIndex + 1}
        total={total}
      />

      <View className="flex-1 items-center justify-center px-lg">
        <PuzzleStage
          puzzle={currentPuzzle}
          guess={guess}
          revealed={submitted}
          interactive={!submitted}
          onGuess={setGuess}
        />
        {result ? (
          <Text className="mt-sm text-center text-lg font-semibold text-text-primary">
            {result.label}
            {result.points > 0 ? ` +${result.points}` : ''}
          </Text>
        ) : currentPuzzle.title ? (
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
