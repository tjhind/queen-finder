import {
  computeContainedImageBounds,
  getPixelPosition,
  normaliseCoordinates,
} from '@/src/utils/imageBounds';

describe('computeContainedImageBounds', () => {
  it('has no letterboxing when the aspect ratios match', () => {
    const bounds = computeContainedImageBounds(
      { width: 400, height: 300 },
      { width: 1200, height: 900 },
    );

    expect(bounds).toEqual({ offsetX: 0, offsetY: 0, width: 400, height: 300 });
  });

  it('letterboxes vertically when the image is wider than the container', () => {
    const bounds = computeContainedImageBounds(
      { width: 400, height: 400 },
      { width: 1200, height: 900 },
    );

    expect(bounds.width).toBe(400);
    expect(bounds.height).toBeCloseTo(300);
    expect(bounds.offsetX).toBe(0);
    expect(bounds.offsetY).toBeCloseTo(50);
  });

  it('letterboxes horizontally when the image is taller than the container', () => {
    const bounds = computeContainedImageBounds(
      { width: 400, height: 400 },
      { width: 900, height: 1200 },
    );

    expect(bounds.height).toBe(400);
    expect(bounds.width).toBeCloseTo(300);
    expect(bounds.offsetY).toBe(0);
    expect(bounds.offsetX).toBeCloseTo(50);
  });
});

describe('normaliseCoordinates', () => {
  const bounds = computeContainedImageBounds(
    { width: 400, height: 400 },
    { width: 1200, height: 900 },
  ); // vertical letterbox, offsetY 50, image is 400x300

  it('maps a tap inside the image to normalized coordinates', () => {
    const point = normaliseCoordinates({ x: 200, y: 200 }, bounds);
    expect(point).toEqual({ x: 0.5, y: 0.5 });
  });

  it('returns null for a tap in the top letterbox padding', () => {
    expect(normaliseCoordinates({ x: 200, y: 10 }, bounds)).toBeNull();
  });

  it('returns null for a tap in the bottom letterbox padding', () => {
    expect(normaliseCoordinates({ x: 200, y: 390 }, bounds)).toBeNull();
  });

  it('treats the exact edges of the image as inside', () => {
    expect(normaliseCoordinates({ x: 0, y: 50 }, bounds)).toEqual({ x: 0, y: 0 });
    expect(normaliseCoordinates({ x: 400, y: 350 }, bounds)).toEqual({ x: 1, y: 1 });
  });
});

describe('getPixelPosition', () => {
  it('is the inverse of normaliseCoordinates', () => {
    const bounds = computeContainedImageBounds(
      { width: 350, height: 262.5 },
      { width: 1200, height: 900 },
    );
    const original = { x: 0.5258, y: 0.2214 };

    const pixel = getPixelPosition(original, bounds);
    const roundTripped = normaliseCoordinates(pixel, bounds);

    expect(roundTripped?.x).toBeCloseTo(original.x);
    expect(roundTripped?.y).toBeCloseTo(original.y);
  });
});
