import AsyncStorage from '@react-native-async-storage/async-storage';

const BEST_SCORE_KEY = 'queen-spotting-trainer:best-score';

/** Reads the persisted best score. Falls back to 0 on any storage error. */
export async function getBestScore(): Promise<number> {
  try {
    const value = await AsyncStorage.getItem(BEST_SCORE_KEY);
    const parsed = value ? Number(value) : 0;
    return Number.isFinite(parsed) ? parsed : 0;
  } catch {
    return 0;
  }
}

/**
 * Persists `score` as the new best only if it beats the stored value.
 * Returns the resulting best score either way. Storage failures leave the
 * best score unchanged rather than crashing the app.
 */
export async function saveBestScoreIfHigher(score: number): Promise<number> {
  const current = await getBestScore();

  if (score <= current) {
    return current;
  }

  try {
    await AsyncStorage.setItem(BEST_SCORE_KEY, String(score));
    return score;
  } catch {
    return current;
  }
}
