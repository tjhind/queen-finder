# Progress

## Roadmap Status

- [x] Phase 1 — Project setup
- [x] Phase 2 — Navigation
- [x] Phase 3 — Puzzle engine
- [x] Phase 4 — Image interaction
- [x] Phase 5 — Scoring
- [x] Phase 6 — Animations
- [x] Phase 7 — Persistence
- [x] Phase 8 — Polish
- [x] Phase 9 — Testing
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

### Goal 3 — Image Interaction

Implemented tap-to-guess interaction with correct coordinate mapping.

- Added `src/utils/imageBounds.ts` (`computeContainedImageBounds`,
  `normaliseCoordinates`, `getPixelPosition`) — pure functions that correctly
  account for `contentFit="contain"` letterboxing/aspect-ratio mismatches
  between the rendered image and its container.
- Added `src/utils/calculateDistance.ts` (normalized-space Euclidean
  distance), ready for Phase 5 scoring.
- Added `GuessMarker`, `QueenMarker` (pulsing halo reveal), and
  `ConnectingLine` (rotated-`View` line, no SVG dependency) components.
- Added `PuzzleStage` (`src/components`), which composes the tappable image,
  markers, and connecting line, and owns layout/natural-image-size
  measurement (`onLayout` + `expo-image`'s `onLoad`).
- Practice screen now manages `guess`/`submitted` state per puzzle, switches
  the primary button between "Submit Guess" (disabled until a guess exists)
  and "Next Puzzle" per the PRD, disables further taps after submission, and
  resets guess/reveal state when advancing.

**Verification note:** tap interaction could not be exercised end-to-end via
simulated touch in this environment (no `idb`/accessibility automation
available to inject taps), so the coordinate-mapping and distance functions
were additionally verified with a standalone Node script covering: matching
aspect ratio (no letterboxing), a letterboxed case (including a tap inside
the padding correctly returning `null`), pixel↔normalized round-tripping,
and a real puzzle's queen coordinates round-tripping exactly. Combined with
passing `tsc`, `expo-doctor` (20/20), successful iOS/Android exports, and a
visual check of the initial Practice screen (image renders, "Submit Guess"
correctly starts disabled), this gives reasonable confidence, but the actual
tap → marker → reveal flow has not been physically exercised on a device or
simulator. Worth a manual pass before this ships.

### Goal 4 — Scoring

Implemented in-session scoring per the PRD's Scoring table.

- Added `src/utils/calculateScore.ts` — maps guess distance and the
  puzzle's `queen.radius` to a point value (100/80/60/30/0) and a result
  label (Perfect/Excellent/Good/Close/Miss), banded as multiples of
  `radius` so difficulty doesn't skew fairness.
- Practice screen now computes the result on submit, shows the label (e.g.
  "Perfect +100") next to the reveal, and accumulates a running session
  score shown live in `PracticeHeader`.
- Session totals (score, correct count, total puzzles) are passed to the
  Results screen via Expo Router navigation params on `router.replace`
  (no Context/global state introduced) when the session completes.
- Results screen now shows real Final Score, Accuracy, and Correct Answers
  (via a new small `ResultStat` row component) instead of a placeholder.

Verified: `tsc`, `expo-doctor` (20/20), iOS/Android exports, a standalone
`calculateScore` threshold sanity check, and — this time — an actual
simulator launch with a live dev server: confirmed the Results screen
correctly parses and renders params (`460`, `80%`, `8 / 10`) and the
Practice screen renders with the live `Score: 0` header and a correctly
disabled "Submit Guess" button pre-guess.

Best-score/statistics persistence across launches remains out of scope
(Phase 7) — results are session-only for now.

### Goal 5 — Animations

Rounded out the animation set from `docs/ARCHITECTURE.md` (marker fade/scale
and button press animation already existed from Goals 1 & 3).

- Added `AnimatedScore` (`src/components`) — counts up/down smoothly via a
  Reanimated shared value + `useAnimatedReaction`/`runOnJS`, used in
  `PracticeHeader` for the live session score.
- Added `ResultLabel` — a subtle `FadeInDown` entrance for the per-puzzle
  result text ("Perfect +100" etc).
- `PuzzleStage` now fades in the puzzle image (keyed by `puzzle.id`) when
  advancing between puzzles, instead of an abrupt swap.
- **Bug found and fixed:** `ConnectingLine` set a static `opacity: 0.6` in
  its style *and* used `entering={FadeIn}` on the same view — Reanimated
  warned "Property 'opacity' ... may be overwritten by a layout animation"
  because both mechanisms fight over the same property. Fixed by animating
  opacity via its own shared value (`withTiming` to `0.6`) instead of the
  `entering` shorthand, matching the pattern `QueenMarker`'s halo already
  used. Also downgraded `QueenMarker`'s static inner circle from
  `Animated.View` to a plain `View` (it never animated).

Verified: `tsc`, `expo-doctor` (20/20), iOS/Android exports, and — after an
initial false alarm caused by stale state in a repeatedly-reused simulator/
dev-server across many test iterations in one long session — a genuinely
fresh Expo Go install + first launch, confirming `Score: 0` / `Puzzle 1 of
10` render correctly at session start with no console warnings in the
Metro log. (Lesson for future verification passes: prefer a fresh
simulator + fresh dev-server port per check rather than reusing one across
many edits, to avoid chasing phantom state.)

### Goal 6 — Persistence

Implemented best-score persistence via AsyncStorage per the PRD.

- Added `src/services/bestScoreService.ts` (`getBestScore()`,
  `saveBestScoreIfHigher()`) wrapping
  `@react-native-async-storage/async-storage`, with storage failures caught
  and falling back to `0` / the existing value rather than crashing.
- Added `useBestScore(score)` hook (`src/hooks`) that saves-if-higher on
  mount and returns the resulting best.
- Results screen now shows a "Best Score" stat alongside Final
  Score/Accuracy/Correct Answers.
- Home screen now optionally shows "Best score: N" (read-only, via
  `getBestScore()`) once a best score exists, per the PRD Home Screen spirit
  without conflicting with its listed fields.

**Verification note:** confirmed via `tsc`, `expo-doctor` (20/20), iOS/
Android exports, and a simulator check that the Results screen renders real
`score`/`accuracy` params correctly after these changes (no regression).
Simulator navigation in this environment proved unreliable for a full
write-then-read-elsewhere round trip in one sitting (deep-link navigation
occasionally no-ops on repeat calls to an already-running Expo Go instance,
and there's still no tap-injection available to dismiss Expo Go's dev-menu
overlay, which repeatedly reappeared and obscured the lower stat rows). The
storage code itself is a small, standard `AsyncStorage.getItem`/`setItem`
pattern with straightforward compare-and-set logic — worth a real-device
manual check before shipping, but low-risk.

### Goal 7 — Polish

Addressed accessibility, error handling, microcopy, and performance per the
PRD/Architecture, without touching scoring/persistence/navigation.

- Accessibility: `PrimaryButton` now has `accessibilityState`, an explicit
  `min-h-[44px]` touch target, and the puzzle image's `Pressable` uses
  `accessibilityRole="button"` with a state-aware label (mentions when a
  guess has already been placed). Decorative markers (`GuessMarker`,
  `QueenMarker`, `ConnectingLine`) are now `accessible={false}` /
  `importantForAccessibility="no-hide-descendants"` so they're not announced
  as unlabeled elements.
- Error handling: `PuzzleStage` now shows a graceful inline fallback message
  if `expo-image`'s `onError` fires (previously would just be a blank box).
  Also fixed a latent bug where `imageSize` wasn't reset when the puzzle
  changed — harmless today since all 10 images share the same 1200x900
  aspect ratio, but would have shown a puzzle's marker positions computed
  against the *previous* puzzle's image bounds for one frame with any
  differently-sized production image.
- Microcopy: Home screen now pluralizes "puzzle(s) available" correctly.
- Performance: `PuzzleStage`'s bounds/pixel-position calculations are now
  memoized (`useMemo`) instead of recomputed on every render.

**Unplanned but valuable verification:** while spot-checking the Practice
screen in the simulator, a guess marker appeared centered on the image with
"Submit Guess" enabled, without any deliberate tap being simulated. The most
likely explanation is that changing the puzzle image's `accessibilityRole`
to `"button"` (done in this same goal) caused the simulator's OS-level
accessibility/automation layer to synthesize an "activate" tap at the
element's center when the screen gained focus — a well-known RN/iOS
behavior for accessibility-triggered presses. Whether or not that's the
exact mechanism, it exercised the full tap -> `normaliseCoordinates` ->
`onGuess` -> marker-render -> button-enable pipeline end-to-end in the
actual running app (not just the Node-script unit check from Goal 3), which
is stronger confirmation than previously available. Worth keeping in mind:
a screen-reader "activate" on the puzzle image will always place a guess at
dead-center rather than a chosen position — an inherent limitation of a
coordinate-tap game under assistive activation, not a bug introduced here,
but worth a product decision later (e.g. an alternative input mode for
accessibility) if that matters for release.

### Goal 8 — Testing

Set up `jest-expo` and added unit tests for the pure utility functions per
`docs/ARCHITECTURE.md`'s Testing section.

- Added `jest`, `jest-expo`, `@react-native/jest-preset`, and `@types/jest`
  as dev dependencies; `npm test` runs the suite (`"jest": { "preset":
  "jest-expo" }` in `package.json`).
- Added `types: ["jest"]` to `tsconfig.json` so test globals type-check.
- 30 tests across 6 suites, all passing:
  - `calculateDistance` — known values, symmetry.
  - `calculateScore` — every threshold boundary (Perfect/Excellent/Good/
    Close/Miss) plus the `radius <= 0` edge case.
  - `imageBounds` — matching-aspect-ratio (no letterbox), letterboxed
    cases in both directions, taps in the letterbox padding correctly
    returning `null`, edge-inclusive bounds, and pixel↔normalized
    round-tripping. This turns the throwaway Node script from Goal 3's
    manual verification into a permanent, CI-visible test.
  - `randomisePuzzleOrder` — set/length invariants and non-mutation
    (doesn't assert exact order, since that's random by design).
  - `puzzleService` — puzzle count, per-puzzle metadata validity, unique
    ids, and the 3 easy / 4 medium / 3 hard split from the PRD.
  - `bestScoreService` — using AsyncStorage's official Jest mock
    (`@react-native-async-storage/async-storage/jest/async-storage-mock`):
    defaults to 0, persists a new best, doesn't overwrite with a lower
    score, updates on a strictly higher score.

Verified: `npm test` (30/30 passing), `tsc`, `expo-doctor` (20/20), and an
`expo export --platform ios` to confirm the test files don't end up in the
app bundle (nothing imports them from the entry point, so Metro naturally
excludes them).
