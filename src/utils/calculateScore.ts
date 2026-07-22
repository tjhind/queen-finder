export type ScoreLabel = 'Perfect' | 'Excellent' | 'Good' | 'Close' | 'Miss';

export type ScoreResult = {
  points: number;
  label: ScoreLabel;
};

/**
 * Maps a guess's distance from the queen (both in normalized 0-1 space) to
 * a point value and result label, per the PRD scoring table. Thresholds are
 * expressed as multiples of the puzzle's `queen.radius` so scoring stays
 * fair across puzzles of different difficulty.
 */
export function calculateScore(distance: number, radius: number): ScoreResult {
  if (radius <= 0) {
    return distance <= 0 ? { points: 100, label: 'Perfect' } : { points: 0, label: 'Miss' };
  }

  const ratio = distance / radius;

  if (ratio <= 1) return { points: 100, label: 'Perfect' };
  if (ratio <= 2) return { points: 80, label: 'Excellent' };
  if (ratio <= 4) return { points: 60, label: 'Good' };
  if (ratio <= 8) return { points: 30, label: 'Close' };
  return { points: 0, label: 'Miss' };
}
