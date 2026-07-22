# Current Goal

## Goal 7

### Polish

---

# Objective

A general polish pass addressing `docs/PRD.md`'s Accessibility section and
`docs/ARCHITECTURE.md`'s Error Handling and Performance sections, which
haven't been directly addressed by any single goal so far.

This goal is polish only. Do not change scoring, persistence, navigation
structure, or the puzzle dataset.

---

# Tasks

## Accessibility

Audit all interactive elements (buttons, the puzzle tap area) against the
PRD's "large touch targets, readable typography, good colour contrast"
requirement:

- Confirm touch targets meet a sensible minimum (~44×44pt).
- Confirm `accessibilityRole`/`accessibilityLabel` are present and accurate
  on all interactive elements (some already exist from earlier goals —
  check for gaps, e.g. the `PuzzleStage` Pressable's label when a guess has
  already been placed, or when revealed).
- Spot-check colour contrast against `src/theme/colors.ts` for text on
  backgrounds/buttons.

## Error Handling

Per `docs/ARCHITECTURE.md`, the app must never crash due to missing
metadata, invalid coordinates, or missing image assets:

- Add a graceful fallback in `PuzzleStage`/`PuzzleImage` for puzzle image
  load failures (`expo-image` exposes an `onError` callback) — show a
  simple inline message instead of a blank/broken area.
- Add a defensive guard in `usePuzzleSession`/`PracticeScreen` so an
  empty or malformed puzzle dataset can't produce a crash (it should
  currently be impossible given `src/data/queens.ts`, but the guard should
  exist per the architecture's error-handling standard).

## Microcopy Polish

- Fix pluralization: "1 puzzle available" vs "10 puzzles available" on the
  Home screen (currently always plural).
- Do a quick pass for consistent wording/capitalization across Home,
  Practice, and Results screens.

## Performance

Per `docs/ARCHITECTURE.md`'s Performance section:

- Memoize `PuzzleStage`'s bounds/pixel-position calculations (`useMemo`)
  so they aren't recomputed on every render for no reason.
- Spot-check for any obviously unnecessary re-renders introduced by
  earlier goals and address them if trivial to fix; don't go on a broad
  refactor hunt.

---

# Success Criteria

This goal is complete only when:

- Interactive elements have appropriate touch target sizes and accurate
  accessibility labels/roles.
- A failed puzzle image load shows a graceful fallback instead of a blank
  or broken UI, and does not crash the app.
- Home screen pluralizes "puzzle(s) available" correctly.
- `PuzzleStage`'s per-render calculations are memoized where sensible.
- The app builds successfully, TypeScript reports no errors, and the app
  still launches without runtime errors.
- Existing scoring, persistence, image interaction, puzzle engine,
  animations, and navigation all remain intact.

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
