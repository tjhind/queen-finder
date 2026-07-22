# Progress

## Roadmap Status

- [x] Phase 1 — Project setup
- [x] Phase 2 — Navigation
- [x] Phase 3 — Puzzle engine
- [ ] Phase 4 — Image interaction
- [ ] Phase 5 — Scoring
- [ ] Phase 6 — Animations
- [ ] Phase 7 — Persistence
- [ ] Phase 8 — Polish
- [ ] Phase 9 — Testing
- [ ] Phase 10 — Release preparation

## Completed Goals

### Goal 1 — Project Foundation

Established the Expo + TypeScript + Expo Router project foundation.

- Scaffolded an Expo (SDK 57) + TypeScript project using `expo-router`, NativeWind
  (Tailwind CSS v3), Expo Image, React Native Reanimated 4 (+ react-native-worklets),
  Expo Haptics, and AsyncStorage.
- Created the architecture folder structure: `assets/images`, `src/components`,
  `src/screens`, `src/hooks`, `src/utils`, `src/types`, `src/data`, `src/constants`,
  `src/theme`, `src/services`.
- Built reusable design tokens in `src/theme` (colours, typography, spacing, radius,
  shadows) and mirrored them into `tailwind.config.js` so NativeWind utility classes
  and JS theme tokens stay in sync.
- Configured Expo Router with a root `Stack` layout and placeholder routes for Home
  (`/`), Practice (`/practice`), and Results (`/results`).
- Built the Home screen (`src/screens/HomeScreen.tsx`) with the app title, an
  animated bee illustration, and a `PrimaryButton` (press-scale animation via
  Reanimated + haptic feedback) that navigates to the Practice placeholder.
- Generated 10 placeholder hive puzzle images (3 easy / 4 medium / 3 hard) into
  `assets/images/` using a procedural honeycomb + bee generator (ImageMagick MVG),
  varying bee density/clutter by difficulty. These are MVP placeholders per the PRD
  and are expected to be replaced with production photography later.
- Verified: `tsc --noEmit` passes with no errors, `expo-doctor` reports 20/20 checks
  passed, `expo export` succeeds for both iOS and Android bundles, and the app was
  launched in the iOS Simulator (via Expo Go) and visually confirmed to render the
  Home screen (title + animated bee) without crashing.

**Note:** No puzzle metadata (`src/data/queens.ts`, the `Puzzle` type) was created
yet — CURRENT_GOAL.md scoped Goal 1 to project setup only and explicitly excluded
gameplay implementation. That belongs to Phase 3 (Puzzle engine).

Navigation (Phase 2) is marked complete because Expo Router, the root `Stack`
layout, and the Home/Practice/Results placeholder routes were already required
and delivered as part of Goal 1's task list.

### Goal 2 — Puzzle Engine

Implemented the puzzle data model, dataset, and sequencing engine.

- Added the `Puzzle` type (`src/types/puzzle.ts`) matching the PRD's interface.
- Added `src/data/queens.ts` with all 10 puzzles (3 easy / 4 medium / 3 hard),
  each referencing its image via a static `require()` and carrying real
  normalized queen coordinates (recorded from the procedural generator) and a
  difficulty-scaled hit radius.
- Added `randomisePuzzleOrder()` (`src/utils`, pure Fisher-Yates shuffle) and
  `puzzleService` (`src/services`, `getPuzzles()` / `getPuzzleCount()`).
- Added `usePuzzleSession()` (`src/hooks`) to load a shuffled session sequence
  once and track progress through it.
- Home screen now displays the real puzzle count instead of nothing.
- Practice screen now loads the session, displays each puzzle's image with a
  `PracticeHeader` (score placeholder + "Puzzle X of N"), and a "Next Puzzle"
  action; completing the session navigates to Results.
- Results screen gained working "Play Again" / "Return Home" navigation.

**Bug found and fixed during verification:** `expo-image`'s `Image` is not a
React Native core component, so NativeWind does not automatically support
`className` on it. The image was rendering at zero size. Fixed by adding
`src/components/PuzzleImage.tsx`, which registers `cssInterop(Image,
{ className: 'style' })` and renders the **returned** wrapped component
(`cssInterop` returns a new component rather than mutating the original —
the first fix attempt missed this and still failed silently). Verified by
launching in the iOS Simulator and visually confirming the puzzle image
renders with the correct aspect ratio.

Scoring, tap-to-guess interaction, and persistence remain out of scope
(Phases 4/5/7) — the Practice screen's score is a static placeholder.
