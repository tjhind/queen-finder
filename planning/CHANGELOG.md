# Changelog

## Goal 1 — Project Foundation

### Added

- Expo (SDK 57) + TypeScript project scaffold with Expo Router, NativeWind
  (Tailwind CSS v3), Expo Image, React Native Reanimated 4, Expo Haptics, and
  AsyncStorage configured.
- Architecture-compliant folder structure under `src/` and `assets/images/`.
- Reusable theme tokens (`src/theme`) for colours, typography, spacing, radius,
  and shadows, wired into `tailwind.config.js`.
- Expo Router root layout with placeholder Home, Practice, and Results routes.
- Home screen with app title, animated bee illustration, and a "Start Practice"
  button that navigates to the Practice placeholder.
- Reusable `PrimaryButton` (Reanimated press animation + haptic feedback) and
  `BeeIllustration` components.
- 10 procedurally generated placeholder hive puzzle images (3 easy, 4 medium,
  3 hard) in `assets/images/`.

### Changed

- N/A (initial implementation).

### Fixed

- N/A (initial implementation).

## Goal 2 — Puzzle Engine

### Added

- `Puzzle` type (`src/types/puzzle.ts`) and puzzle dataset
  (`src/data/queens.ts`) describing all 10 local puzzles.
- `randomisePuzzleOrder()` utility and `puzzleService` for loading puzzles.
- `usePuzzleSession()` hook for shuffled session sequencing.
- `PracticeHeader` and `PuzzleImage` components.
- Working "Play Again" / "Return Home" navigation on the Results screen.

### Changed

- Home screen now displays the real puzzle count from the dataset.
- Practice screen now loads and displays real puzzles in a randomised
  sequence with progress, instead of static placeholder text.

### Fixed

- Puzzle images rendered at zero size because NativeWind's `className` isn't
  automatically supported on `expo-image`'s `Image`. Fixed via a `cssInterop`
  wrapper (`src/components/PuzzleImage.tsx`).
