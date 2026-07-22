# Current Goal

## Goal 8

### Testing

---

# Objective

Set up a test runner and add unit tests for the pure utility functions, per
`docs/ARCHITECTURE.md`'s Testing section: "Utility functions should be
independently testable. Core gameplay should be deterministic."

This goal is testing infrastructure and unit tests only. Do not change
application behavior — if a test reveals a real bug, fix the minimum needed
and note it, but this goal is not a general refactor pass.

---

# Tasks

## Test Runner Setup

Add `jest-expo` (the Expo-recommended Jest preset for React Native/Expo
projects) as a dev dependency, with a `test` script in `package.json`. Use
`npx expo install --dev jest-expo jest` (or the equivalent) so versions stay
aligned with the installed Expo SDK.

## Utility Unit Tests

Add tests (e.g. under `src/utils/__tests__/` or colocated `*.test.ts`
files) covering:

- `calculateDistance` — known distance values (e.g. a 3-4-5 triangle).
- `calculateScore` — boundary behavior at each threshold (Perfect/
  Excellent/Good/Close/Miss), including the `radius <= 0` edge case.
- `imageBounds` (`computeContainedImageBounds`, `normaliseCoordinates`,
  `getPixelPosition`) — matching aspect ratio (no letterboxing), a
  letterboxed case, a tap in the letterbox padding returning `null`, and
  pixel↔normalized round-tripping. (This mirrors the standalone Node
  script used for manual verification in Goal 3 — turn it into real,
  permanent, CI-visible tests instead of a throwaway script.)
- `randomisePuzzleOrder` — same elements/length as input, does not mutate
  the input array, returns a new array reference.

## Service Tests (if straightforward)

If it doesn't require excessive mocking, add tests for `puzzleService`
(`getPuzzleCount()` matches the dataset length, `getPuzzles()` returns
puzzles with valid required fields) and `bestScoreService` (mocking
AsyncStorage — `@react-native-async-storage/async-storage` ships a Jest
mock for this purpose). If AsyncStorage mocking turns out to be more
trouble than it's worth for this goal, skip it and note why — utility
function coverage is the priority.

---

# Success Criteria

This goal is complete only when:

- `npm test` (or equivalent) runs the test suite successfully with no
  failures.
- The pure utility functions listed above have meaningful unit test
  coverage, including edge cases (letterbox padding, threshold boundaries,
  `radius <= 0`).
- Tests are deterministic (no flaky reliance on `Math.random()` without
  accounting for it, e.g. `randomisePuzzleOrder`'s tests check set/length
  invariants rather than exact output).
- The app still builds successfully, TypeScript reports no errors, and the
  app still launches without runtime errors.
- Existing functionality from all previous goals remains intact.

---

# Completion

When every success criterion has been satisfied:

The automation instructions inside GOAL.md should be followed.

Do not manually determine the next step here.

GOAL.md is responsible for:

- updating progress
- version control
- rewriting CURRENT_GOAL.md
- continuing automation
