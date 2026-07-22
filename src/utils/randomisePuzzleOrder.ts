import type { Puzzle } from '@/src/types/puzzle';

/**
 * Returns a new, randomly shuffled copy of the given puzzle list.
 * Uses the Fisher-Yates algorithm. Does not mutate the input array.
 */
export function randomisePuzzleOrder(puzzles: Puzzle[]): Puzzle[] {
  const shuffled = [...puzzles];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
