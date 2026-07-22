# Current Goal

## Goal 4

### Scoring

---

# Objective

Implement scoring per `docs/PRD.md`'s Scoring section: award points per
puzzle based on guess accuracy, track session totals, and surface them on
the Results screen.

This goal is limited to in-session scoring. Do not implement:

- Best-score or statistics persistence across app launches (Phase 7) — the
  Results screen should show the current session's results only.

---

# Tasks

## Score Calculation

Add `src/utils/calculateScore.ts` — a pure function that maps a guess's
distance from the queen (via the existing `calculateDistance()` utility) and
the puzzle's `queen.radius` to a point value and a result label, per the PRD:

- Perfect — 100
- Excellent — 80
- Good — 60
- Close — 30
- Miss — 0

Since `queen.radius` already varies by difficulty, band the thresholds as
multiples of `radius` (e.g. within `radius` → Perfect, within `2 × radius` →
Excellent, and so on) so scoring stays fair across easy/medium/hard puzzles.
Choose specific thresholds sensibly; there is no single correct value here.

## Practice Screen

- After submitting a guess, compute the score/result for that puzzle and:
  - Display the result label (e.g. "Perfect!", "Miss") near the reveal,
    per the PRD Gameplay section ("display result").
  - Add the points to a running session score, shown live in
    `PracticeHeader` (replacing the current static `0`).
- Track, for the whole session: total score, number of puzzles answered
  correctly (non-zero score), and puzzles attempted.
- When the session completes, pass these session totals through to the
  Results screen (e.g. via Expo Router navigation params) rather than
  introducing global state/Context.

## Results Screen

Update `src/screens/ResultsScreen.tsx` to display, per the PRD Results
Screen spec:

- Final Score
- Accuracy (correct answers ÷ total puzzles)
- Correct Answers

Keep "Play Again" and "Return Home" working as they do today.

---

# Success Criteria

This goal is complete only when:

- `calculateScore()` is a pure, reusable, unit-testable utility in
  `src/utils`, not embedded in a component.
- Submitting a guess shows the correct result label and awards the correct
  points based on distance from the queen.
- The live score shown during Practice updates correctly across puzzles.
- The Results screen shows accurate Final Score, Accuracy, and Correct
  Answers for the completed session.
- The app builds successfully, TypeScript reports no errors, and the app
  still launches without runtime errors.
- Existing puzzle engine, image interaction, and navigation remain intact.

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
