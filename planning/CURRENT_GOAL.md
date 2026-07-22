# Current Goal

## Goal 2

### Puzzle Engine

---

# Objective

Implement the puzzle data model, the local puzzle dataset, and the loading/
sequencing engine described in the Architecture and PRD documents.

This goal is limited to the puzzle engine (data + sequencing). Do not implement:

- Tap-to-guess image interaction or coordinate mapping (Phase 4).
- Scoring, accuracy, or best-score persistence (Phase 5, Phase 7).
- Reveal/marker animations (Phase 6).

The Practice screen should be wired to the real puzzle dataset and sequencing
logic, but guessing and scoring remain out of scope for this goal.

---

# Tasks

## Puzzle Type

Create `src/types/puzzle.ts` exporting the `Puzzle` interface exactly as defined
in `docs/PRD.md`:

```ts
export interface Puzzle {
  id: string;
  image: ImageSourcePropType;
  queen: {
    x: number;
    y: number;
    radius: number;
  };
  title?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}
```

Coordinates are normalized (0–1). `radius` defines the acceptable hit area
(also normalized).

---

## Puzzle Metadata

Create `src/data/queens.ts` exporting all 10 puzzles from `assets/images/`
(`puzzle-01.png` … `puzzle-10.png`, 3 easy / 4 medium / 3 hard, per
`docs/PRD.md`).

Each entry must reference its image via a static `require(...)` and include
valid `queen` coordinates and a sensible hit `radius`.

Do not modify application logic to special-case individual puzzles — the UI
must render whatever this file contains.

---

## Business Logic

Following `docs/ARCHITECTURE.md`, keep game logic out of UI components. Add
reusable utilities, for example:

- `src/utils/randomisePuzzleOrder.ts` — returns a shuffled copy of the puzzle
  list (pure function, unit-testable, does not mutate its input).
- A small puzzle-loading service or hook (e.g. `src/services/puzzleService.ts`
  and/or `src/hooks/usePuzzleSession.ts`) that exposes the full puzzle list,
  the puzzle count, and a randomised session sequence with a "current index"
  concept.

---

## Home Screen

Update `src/screens/HomeScreen.tsx` to display the number of available
puzzles (per the PRD Home Screen spec), sourced from the puzzle dataset —
never hard-coded.

---

## Practice Screen

Update `src/screens/PracticeScreen.tsx` to:

- Load a randomised puzzle sequence on mount.
- Display the current puzzle's image (using `expo-image`), sized for mobile.
- Show puzzle progress in the top area (e.g. "Puzzle 2 of 10"), per the PRD
  Practice Screen layout.
- Provide a way to advance to the next puzzle (a simple "Next Puzzle" action
  is sufficient at this stage — full submit/reveal flow is Phase 4).
- Navigate to the Results placeholder route once every puzzle in the session
  has been shown.

A static score placeholder (e.g. "0") may be shown in the top area to match
the PRD layout, since real scoring is not implemented until Phase 5.

---

# Success Criteria

This goal is complete only when:

- `Puzzle` type is defined and used consistently.
- `src/data/queens.ts` exports 10 valid puzzles (3 easy / 4 medium / 3 hard)
  referencing the existing images in `assets/images/`.
- `randomisePuzzleOrder()` (or equivalent) is implemented as a pure,
  reusable utility, separate from UI components.
- The Home screen displays the correct puzzle count from the dataset.
- The Practice screen loads and displays puzzles from the dataset in a
  randomised sequence, with visible progress.
- Completing a session navigates to the Results placeholder.
- The app builds successfully, TypeScript reports no errors, and the app
  still launches without runtime errors.
- Existing Home screen and navigation functionality remain intact.

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
