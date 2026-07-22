import { useEffect, useState } from 'react';

import { saveBestScoreIfHigher } from '@/src/services/bestScoreService';

/**
 * Persists `score` as the new best (if it beats the stored value) and
 * returns the resulting best score. Returns `null` until the async
 * storage read/write resolves.
 */
export function useBestScore(score: number): number | null {
  const [bestScore, setBestScore] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    saveBestScoreIfHigher(score).then((best) => {
      if (!cancelled) {
        setBestScore(best);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [score]);

  return bestScore;
}
