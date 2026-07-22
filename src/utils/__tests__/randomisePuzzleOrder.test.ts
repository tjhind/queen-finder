import { randomisePuzzleOrder } from '@/src/utils/randomisePuzzleOrder';
import type { Puzzle } from '@/src/types/puzzle';

function makePuzzles(count: number): Puzzle[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `puzzle-${index}`,
    image: index,
    queen: { x: 0.5, y: 0.5, radius: 0.05 },
  }));
}

describe('randomisePuzzleOrder', () => {
  it('returns a new array containing all the same elements', () => {
    const puzzles = makePuzzles(10);
    const shuffled = randomisePuzzleOrder(puzzles);

    expect(shuffled).not.toBe(puzzles);
    expect(shuffled).toHaveLength(puzzles.length);
    expect([...shuffled].sort((a, b) => a.id.localeCompare(b.id))).toEqual(
      [...puzzles].sort((a, b) => a.id.localeCompare(b.id)),
    );
  });

  it('does not mutate the input array', () => {
    const puzzles = makePuzzles(10);
    const original = [...puzzles];

    randomisePuzzleOrder(puzzles);

    expect(puzzles).toEqual(original);
  });

  it('handles empty and single-element arrays', () => {
    expect(randomisePuzzleOrder([])).toEqual([]);

    const single = makePuzzles(1);
    expect(randomisePuzzleOrder(single)).toEqual(single);
  });
});
