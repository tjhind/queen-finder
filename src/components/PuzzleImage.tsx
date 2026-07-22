import { Image, type ImageProps } from 'expo-image';
import { cssInterop } from 'nativewind';

// expo-image is not a React Native core component, so NativeWind does not
// wire up `className` support for it automatically. cssInterop() returns a
// *new* wrapped component (it does not mutate `Image`), so that return
// value is what must be rendered below.
const StyledImage = cssInterop(Image, { className: 'style' });

export type PuzzleImageProps = ImageProps & { className?: string };

export function PuzzleImage(props: PuzzleImageProps) {
  return <StyledImage {...props} />;
}
