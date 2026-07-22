import { calculateDistance } from '@/src/utils/calculateDistance';

describe('calculateDistance', () => {
  it('returns 0 for identical points', () => {
    expect(calculateDistance({ x: 0.5, y: 0.5 }, { x: 0.5, y: 0.5 })).toBe(0);
  });

  it('computes a known 3-4-5 triangle distance', () => {
    expect(calculateDistance({ x: 0, y: 0 }, { x: 0.3, y: 0.4 })).toBeCloseTo(0.5);
  });

  it('is symmetric', () => {
    const a = { x: 0.2, y: 0.7 };
    const b = { x: 0.9, y: 0.1 };
    expect(calculateDistance(a, b)).toBeCloseTo(calculateDistance(b, a));
  });
});
