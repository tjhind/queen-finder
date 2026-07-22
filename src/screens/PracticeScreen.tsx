import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PracticeHeader } from '@/src/components/PracticeHeader';
import { PrimaryButton } from '@/src/components/PrimaryButton';
import { PuzzleImage } from '@/src/components/PuzzleImage';
import { usePuzzleSession } from '@/src/hooks/usePuzzleSession';

export function PracticeScreen() {
  const router = useRouter();
  const { currentPuzzle, currentIndex, total, isComplete, goToNextPuzzle } =
    usePuzzleSession();

  useEffect(() => {
    if (isComplete) {
      router.replace('/results');
    }
  }, [isComplete, router]);

  if (!currentPuzzle) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <PracticeHeader score={0} currentIndex={currentIndex + 1} total={total} />

      <View className="flex-1 items-center justify-center px-lg">
        <PuzzleImage
          source={currentPuzzle.image}
          contentFit="contain"
          className="aspect-[4/3] w-full rounded-lg"
          accessibilityLabel={currentPuzzle.title ?? 'Hive puzzle image'}
        />
        {currentPuzzle.title ? (
          <Text className="mt-sm text-center text-sm text-text-secondary">
            {currentPuzzle.title}
          </Text>
        ) : null}
      </View>

      <View className="items-center px-lg py-lg">
        <PrimaryButton label="Next Puzzle" onPress={goToNextPuzzle} />
      </View>
    </SafeAreaView>
  );
}
