import { calculateScore } from '@/src/utils/calculateScore';

describe('calculateScore', () => {
  const radius = 0.05;

  it('awards Perfect for a guess at the queen', () => {
    expect(calculateScore(0, radius)).toEqual({ points: 100, label: 'Perfect' });
  });

  it('awards Perfect at exactly the radius boundary', () => {
    expect(calculateScore(radius, radius)).toEqual({ points: 100, label: 'Perfect' });
  });

  it('awards Excellent just past the Perfect boundary', () => {
    expect(calculateScore(radius * 1.5, radius)).toEqual({
      points: 80,
      label: 'Excellent',
    });
  });

  it('awards Excellent at exactly 2x radius', () => {
    expect(calculateScore(radius * 2, radius)).toEqual({
      points: 80,
      label: 'Excellent',
    });
  });

  it('awards Good between 2x and 4x radius', () => {
    expect(calculateScore(radius * 3, radius)).toEqual({ points: 60, label: 'Good' });
  });

  it('awards Close between 4x and 8x radius', () => {
    expect(calculateScore(radius * 6, radius)).toEqual({ points: 30, label: 'Close' });
  });

  it('awards Miss beyond 8x radius', () => {
    expect(calculateScore(radius * 10, radius)).toEqual({ points: 0, label: 'Miss' });
  });

  it('handles a zero radius: exact hit is Perfect, any distance is Miss', () => {
    expect(calculateScore(0, 0)).toEqual({ points: 100, label: 'Perfect' });
    expect(calculateScore(0.001, 0)).toEqual({ points: 0, label: 'Miss' });
  });
});
