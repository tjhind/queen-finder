import { useEffect, useMemo, useState } from 'react';
import type { GestureResponderEvent, LayoutChangeEvent } from 'react-native';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ConnectingLine } from '@/src/components/ConnectingLine';
import { GuessMarker } from '@/src/components/GuessMarker';
import { PuzzleImage } from '@/src/components/PuzzleImage';
import { QueenMarker } from '@/src/components/QueenMarker';
import type { Puzzle } from '@/src/types/puzzle';
import {
  computeContainedImageBounds,
  getPixelPosition,
  normaliseCoordinates,
  type Point,
  type Size,
} from '@/src/utils/imageBounds';

type PuzzleStageProps = {
  puzzle: Puzzle;
  guess: Point | null;
  revealed: boolean;
  interactive: boolean;
  onGuess: (point: Point) => void;
};

export function PuzzleStage({
  puzzle,
  guess,
  revealed,
  interactive,
  onGuess,
}: PuzzleStageProps) {
  const [containerSize, setContainerSize] = useState<Size | null>(null);
  const [imageSize, setImageSize] = useState<Size | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageSize(null);
    setImageError(false);
  }, [puzzle.id]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  };

  const bounds = useMemo(
    () =>
      containerSize && imageSize
        ? computeContainedImageBounds(containerSize, imageSize)
        : null,
    [containerSize, imageSize],
  );

  const handlePress = (event: GestureResponderEvent) => {
    if (!interactive || !bounds) {
      return;
    }

    const { locationX, locationY } = event.nativeEvent;
    const point = normaliseCoordinates({ x: locationX, y: locationY }, bounds);

    if (point) {
      onGuess(point);
    }
  };

  const guessPixel = useMemo(
    () => (guess && bounds ? getPixelPosition(guess, bounds) : null),
    [guess, bounds],
  );
  const queenPixel = useMemo(
    () => (bounds ? getPixelPosition(puzzle.queen, bounds) : null),
    [bounds, puzzle.queen],
  );

  const accessibilityLabel = puzzle.title
    ? `${puzzle.title}. ${guess ? 'Guess placed. ' : ''}Tap to place your guess.`
    : 'Hive puzzle image';

  return (
    <View
      onLayout={handleLayout}
      className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-muted"
    >
      {imageError ? (
        <View className="flex-1 items-center justify-center px-lg">
          <Text className="text-center text-sm text-text-secondary">
            This puzzle image couldn&apos;t be loaded.
          </Text>
        </View>
      ) : (
        <Pressable
          onPress={handlePress}
          disabled={!interactive}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{ disabled: !interactive }}
          className="flex-1"
        >
          <Animated.View
            key={puzzle.id}
            entering={FadeIn.duration(200)}
            style={{ flex: 1 }}
          >
            <PuzzleImage
              source={puzzle.image}
              contentFit="contain"
              className="h-full w-full"
              onLoad={(event) =>
                setImageSize({
                  width: event.source.width,
                  height: event.source.height,
                })
              }
              onError={() => setImageError(true)}
            />
          </Animated.View>
        </Pressable>
      )}

      {revealed && guessPixel && queenPixel ? (
        <ConnectingLine from={guessPixel} to={queenPixel} />
      ) : null}
      {guessPixel ? <GuessMarker x={guessPixel.x} y={guessPixel.y} /> : null}
      {revealed && queenPixel ? (
        <QueenMarker x={queenPixel.x} y={queenPixel.y} />
      ) : null}
    </View>
  );
}
