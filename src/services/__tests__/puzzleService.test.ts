import { getPuzzleCount, getPuzzles } from '@/src/services/puzzleService';

describe('puzzleService', () => {
  it('returns 10 puzzles', () => {
    expect(getPuzzleCount()).toBe(10);
    expect(getPuzzles()).toHaveLength(10);
  });

  it('every puzzle has valid required metadata', () => {
    for (const puzzle of getPuzzles()) {
      expect(typeof puzzle.id).toBe('string');
      expect(puzzle.id.length).toBeGreaterThan(0);
      expect(puzzle.image).toBeTruthy();

      expect(puzzle.queen.x).toBeGreaterThanOrEqual(0);
      expect(puzzle.queen.x).toBeLessThanOrEqual(1);
      expect(puzzle.queen.y).toBeGreaterThanOrEqual(0);
      expect(puzzle.queen.y).toBeLessThanOrEqual(1);
      expect(puzzle.queen.radius).toBeGreaterThan(0);
    }
  });

  it('has unique puzzle ids', () => {
    const ids = getPuzzles().map((puzzle) => puzzle.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has 3 easy, 4 medium, and 3 hard puzzles per the PRD', () => {
    const counts = getPuzzles().reduce<Record<string, number>>((acc, puzzle) => {
      const key = puzzle.difficulty ?? 'unknown';
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});

    expect(counts.easy).toBe(3);
    expect(counts.medium).toBe(4);
    expect(counts.hard).toBe(3);
  });
});
