import type { Point } from '@/src/utils/imageBounds';

/** Euclidean distance between two normalized (0-1) points. */
export function calculateDistance(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
