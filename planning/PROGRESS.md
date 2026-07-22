# Progress

## Roadmap Status

- [x] Phase 1 — Project setup
- [x] Phase 2 — Navigation
- [ ] Phase 3 — Puzzle engine
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
