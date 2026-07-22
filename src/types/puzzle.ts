import type { ImageSourcePropType } from 'react-native';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Puzzle {
  id: string;
  image: ImageSourcePropType;
  queen: {
    x: number;
    y: number;
    radius: number;
  };
  title?: string;
  difficulty?: Difficulty;
}
