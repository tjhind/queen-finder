import { queens } from '@/src/data/queens';
import type { Puzzle } from '@/src/types/puzzle';

/** Returns every puzzle available in the local dataset. */
export function getPuzzles(): Puzzle[] {
  return queens;
}

/** Returns the number of puzzles available in the local dataset. */
export function getPuzzleCount(): number {
  return queens.length;
}
