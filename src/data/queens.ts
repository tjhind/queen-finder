import type { Puzzle } from '@/src/types/puzzle';

/**
 * Local puzzle dataset. Adding a puzzle only requires:
 *  1. Add the image to assets/images/
 *  2. Add its metadata below
 * No application logic should need to change.
 */
export const queens: Puzzle[] = [
  {
    id: 'puzzle-01',
    image: require('@/assets/images/puzzle-01.png'),
    title: 'Frame Corner',
    difficulty: 'easy',
    queen: { x: 0.2514, y: 0.318, radius: 0.05 },
  },
  {
    id: 'puzzle-02',
    image: require('@/assets/images/puzzle-02.png'),
    title: 'Sunlit Comb',
    difficulty: 'easy',
    queen: { x: 0.7816, y: 0.2375, radius: 0.05 },
  },
  {
    id: 'puzzle-03',
    image: require('@/assets/images/puzzle-03.png'),
    title: 'Quiet Corner',
    difficulty: 'easy',
    queen: { x: 0.3573, y: 0.218, radius: 0.05 },
  },
  {
    id: 'puzzle-04',
    image: require('@/assets/images/puzzle-04.png'),
    title: 'Busy Cluster',
    difficulty: 'medium',
    queen: { x: 0.3774, y: 0.6046, radius: 0.042 },
  },
  {
    id: 'puzzle-05',
    image: require('@/assets/images/puzzle-05.png'),
    title: 'Crowded Frame',
    difficulty: 'medium',
    queen: { x: 0.608, y: 0.6586, radius: 0.042 },
  },
  {
    id: 'puzzle-06',
    image: require('@/assets/images/puzzle-06.png'),
    title: 'Working Comb',
    difficulty: 'medium',
    queen: { x: 0.5969, y: 0.6342, radius: 0.042 },
  },
  {
    id: 'puzzle-07',
    image: require('@/assets/images/puzzle-07.png'),
    title: 'Mid-Hive Bustle',
    difficulty: 'medium',
    queen: { x: 0.4792, y: 0.2958, radius: 0.042 },
  },
  {
    id: 'puzzle-08',
    image: require('@/assets/images/puzzle-08.png'),
    title: 'Dense Gathering',
    difficulty: 'hard',
    queen: { x: 0.5258, y: 0.2214, radius: 0.035 },
  },
  {
    id: 'puzzle-09',
    image: require('@/assets/images/puzzle-09.png'),
    title: 'Deep Cluster',
    difficulty: 'hard',
    queen: { x: 0.8562, y: 0.8082, radius: 0.035 },
  },
  {
    id: 'puzzle-10',
    image: require('@/assets/images/puzzle-10.png'),
    title: 'Full Frame',
    difficulty: 'hard',
    queen: { x: 0.5898, y: 0.5719, radius: 0.035 },
  },
];
