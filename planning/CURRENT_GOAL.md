# Current Goal

## Goal 5

### Animations

---

# Objective

Round out the animation set described in `docs/ARCHITECTURE.md`'s
Animations section ("marker fade, marker scale, score animation, button
press animation") and `docs/PRD.md`'s Gameplay section ("animate queen
highlight"). Marker fade/scale (via `GuessMarker`/`QueenMarker`'s entering
animations) and button press animation already exist from earlier goals.
This goal focuses on the remaining gap — score animation — plus small,
subtle polish around puzzle transitions and the result label.

This goal is animation polish only. Do not change scoring logic, puzzle
data, navigation structure, or add new screens.

---

# Tasks

## Score Animation

Add a reusable animated score display (e.g. `src/components/AnimatedScore.tsx`)
that smoothly counts up/down when its numeric value changes, using
Reanimated (a shared value driven by `withTiming`, reflected into text via
`useAnimatedReaction` + `runOnJS`, or an equivalent Reanimated-native
approach). Use it in `PracticeHeader` in place of the current plain `Text`
score display. Keep the animation subtle and fast (a few hundred ms).

## Result Label Entrance

Give the per-puzzle result label (e.g. "Perfect +100") a subtle entrance
animation when it appears after submission, consistent in feel with the
marker animations already in place.

## Puzzle Transition

Add a subtle fade when the puzzle image changes between puzzles in
`PuzzleStage`/`PracticeScreen`, so advancing doesn't feel like an abrupt cut.
Keep it quick and unobtrusive — this is a polish detail, not a slideshow
effect.

## Performance Check

Per `docs/ARCHITECTURE.md`'s Performance section, confirm animations stay
smooth: avoid layout thrashing, don't introduce unnecessary re-renders, and
resolve any Reanimated warnings (e.g. entering/layout-animation conflicts)
encountered along the way rather than leaving them as noise.

---

# Success Criteria

This goal is complete only when:

- The score displayed during Practice animates smoothly when it changes,
  instead of jumping instantly.
- The result label has a subtle, consistent entrance animation.
- Advancing between puzzles has a subtle transition rather than an abrupt
  swap.
- No new Reanimated warnings are introduced, and any encountered during
  this goal's work are resolved.
- The app builds successfully, TypeScript reports no errors, and the app
  still launches without runtime errors.
- Existing scoring, image interaction, puzzle engine, and navigation
  functionality remain intact.

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
