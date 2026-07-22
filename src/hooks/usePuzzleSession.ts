import { useCallback, useMemo, useState } from 'react';

import { getPuzzles } from '@/src/services/puzzleService';
import type { Puzzle } from '@/src/types/puzzle';
import { randomisePuzzleOrder } from '@/src/utils/randomisePuzzleOrder';

export interface PuzzleSession {
  currentPuzzle: Puzzle | undefined;
  currentIndex: number;
  total: number;
  isComplete: boolean;
  goToNextPuzzle: () => void;
}

/**
 * Loads the puzzle dataset once, shuffles it into a session sequence, and
 * tracks progress through that sequence.
 */
export function usePuzzleSession(): PuzzleSession {
  const sequence = useMemo(() => randomisePuzzleOrder(getPuzzles()), []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isComplete = currentIndex >= sequence.length;

  const goToNextPuzzle = useCallback(() => {
    setCurrentIndex((index) => index + 1);
  }, []);

  return {
    currentPuzzle: sequence[currentIndex],
    currentIndex,
    total: sequence.length,
    isComplete,
    goToNextPuzzle,
  };
}
