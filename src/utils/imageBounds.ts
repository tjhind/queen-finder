export type Size = { width: number; height: number };
export type Point = { x: number; y: number };

export type ImageBounds = {
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
};

/**
 * Computes the pixel bounds of an image rendered with `contentFit="contain"`
 * inside a container, accounting for letterboxing when the image's aspect
 * ratio does not match the container's.
 */
export function computeContainedImageBounds(
  container: Size,
  image: Size,
): ImageBounds {
  if (container.width <= 0 || container.height <= 0 || image.width <= 0 || image.height <= 0) {
    return { offsetX: 0, offsetY: 0, width: container.width, height: container.height };
  }

  const containerAspect = container.width / container.height;
  const imageAspect = image.width / image.height;

  if (imageAspect > containerAspect) {
    const width = container.width;
    const height = width / imageAspect;
    return { offsetX: 0, offsetY: (container.height - height) / 2, width, height };
  }

  const height = container.height;
  const width = height * imageAspect;
  return { offsetX: (container.width - width) / 2, offsetY: 0, width, height };
}

/**
 * Converts a tap position (in container-local pixels) into normalized
 * (0-1) image coordinates, given the image's rendered bounds. Returns null
 * when the tap falls outside the rendered image (i.e. in letterbox padding).
 */
export function normaliseCoordinates(tap: Point, bounds: ImageBounds): Point | null {
  const localX = tap.x - bounds.offsetX;
  const localY = tap.y - bounds.offsetY;

  if (localX < 0 || localX > bounds.width || localY < 0 || localY > bounds.height) {
    return null;
  }

  return { x: localX / bounds.width, y: localY / bounds.height };
}

/**
 * Converts normalized (0-1) image coordinates into container-local pixels,
 * given the image's rendered bounds. Inverse of `normaliseCoordinates`.
 */
export function getPixelPosition(point: Point, bounds: ImageBounds): Point {
  return {
    x: bounds.offsetX + point.x * bounds.width,
    y: bounds.offsetY + point.y * bounds.height,
  };
}
