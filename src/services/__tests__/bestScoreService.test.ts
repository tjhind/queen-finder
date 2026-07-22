jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getBestScore, saveBestScoreIfHigher } from '@/src/services/bestScoreService';

describe('bestScoreService', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('defaults to 0 when nothing is stored', async () => {
    expect(await getBestScore()).toBe(0);
  });

  it('persists a new best score', async () => {
    expect(await saveBestScoreIfHigher(500)).toBe(500);
    expect(await getBestScore()).toBe(500);
  });

  it('does not overwrite a higher stored best', async () => {
    await saveBestScoreIfHigher(500);
    expect(await saveBestScoreIfHigher(300)).toBe(500);
    expect(await getBestScore()).toBe(500);
  });

  it('updates when a strictly higher score is saved', async () => {
    await saveBestScoreIfHigher(500);
    expect(await saveBestScoreIfHigher(650)).toBe(650);
    expect(await getBestScore()).toBe(650);
  });
});
