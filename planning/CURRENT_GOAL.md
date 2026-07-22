# Current Goal

## Goal 3

### Image Interaction

---

# Objective

Implement tap-to-guess interaction on the puzzle image, with correct
coordinate mapping and the guess/reveal visuals described in the PRD
Gameplay section.

This goal is limited to image interaction. Do not implement:

- Numeric scoring, accuracy, or points bands (Phase 5). It is fine to
  determine hit/miss using the puzzle's `queen.radius` for visual purposes
  (e.g. which marker style to show), but do not award or display points.
- Best-score or statistics persistence (Phase 7).

---

# Tasks

## Coordinate Mapping

Following `docs/ARCHITECTURE.md`'s "Image Interaction" section, add a pure,
reusable utility (e.g. `src/utils/getRelativeCoordinates.ts`) that converts a
tap position within the rendered image container into normalized (0–1)
image coordinates. It must correctly account for:

- `contentFit="contain"` letterboxing (the rendered image may not fill the
  full width/height of its container).
- The puzzle image's natural aspect ratio vs. the container's aspect ratio.
- Different screen sizes.

## Distance Utility

Add `src/utils/calculateDistance.ts` — a pure function computing the
normalized-space distance between a guess point and the queen's `{x, y}`,
for comparison against `queen.radius`.

## Guess Marker

Add a reusable `GuessMarker` component (`src/components`) rendering a blue
marker at a given normalized position, with a subtle Reanimated fade/scale-in
animation when placed.

## Queen Reveal

Add a `QueenMarker` component and a simple connecting-line element (a
rotated `View`, no new SVG dependency required) that:

- Reveals the queen's true position with a subtle highlight animation.
- Draws a subtle line connecting the guess marker to the queen marker.

## Practice Screen Wiring

Update `src/screens/PracticeScreen.tsx` so that:

- Tapping the puzzle image places (or repositions) the blue guess marker.
  Repositioning is only allowed before submission.
- The primary button reads "Submit Guess" while no guess has been submitted
  (disabled until a guess exists) and "Next Puzzle" after submission, per
  the PRD Practice Screen spec.
- Submitting disables further taps on the image, reveals the queen marker
  and connecting line, and keeps the guess marker visible.
- Advancing to the next puzzle resets guess/reveal state.

---

# Success Criteria

This goal is complete only when:

- Tapping the puzzle image places a correctly-positioned blue guess marker,
  accounting for image letterboxing/aspect ratio at different screen sizes.
- The guess can be repositioned before submission but not after.
- The primary button correctly switches between "Submit Guess" and
  "Next Puzzle" per the PRD.
- Submitting reveals the queen with a highlight animation and a connecting
  line to the guess, and disables further interaction with the image.
- Coordinate mapping and distance calculation live in `src/utils` as pure,
  reusable, unit-testable functions — not inline in components.
- The app builds successfully, TypeScript reports no errors, and the app
  still launches without runtime errors.
- Existing puzzle engine, session sequencing, and navigation remain intact.

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
