# Current Goal

## Goal 6

### Persistence

---

# Objective

Persist the player's best score locally using AsyncStorage, per
`docs/PRD.md`'s Scoring section ("Persist best score locally") and
`docs/ARCHITECTURE.md` (AsyncStorage is an approved dependency, business
logic must not live in UI components).

This goal is limited to best-score persistence. Do not implement:

- Full puzzle-by-puzzle history/analytics.
- Any backend or account system (explicitly out of scope for the whole
  product, per the PRD).

---

# Tasks

## Storage Service

Add a small service (e.g. `src/services/bestScoreService.ts`) wrapping
`@react-native-async-storage/async-storage`, exposing something like:

- `getBestScore(): Promise<number>`
- `saveBestScoreIfHigher(score: number): Promise<number>` — persists and
  returns the new best only if `score` beats the stored value, otherwise
  returns the existing best unchanged.

Handle storage failures gracefully (never crash — fall back to `0` /
leave the best score unchanged, per `docs/ARCHITECTURE.md`'s Error
Handling section).

## Results Screen

Update `src/screens/ResultsScreen.tsx` to:

- On mount, read the stored best score and update it if the current
  session's score is higher.
- Display "Best Score" alongside the existing Final Score, Accuracy, and
  Correct Answers stats.

## Home Screen (optional, only if it fits cleanly)

If it doesn't complicate the component, consider surfacing the best score
on the Home screen too (nice-to-have, not required by the PRD's Home
Screen spec, which currently lists only title / illustration / button /
puzzle count).

---

# Success Criteria

This goal is complete only when:

- The best score is persisted via AsyncStorage and correctly survives an
  app reload (verified by checking storage behavior, not just in-memory
  state).
- A new high score updates the stored value; a lower score does not
  overwrite a higher stored best.
- Storage failures do not crash the app.
- The Results screen displays the best score correctly.
- The app builds successfully, TypeScript reports no errors, and the app
  still launches without runtime errors.
- Existing scoring, image interaction, puzzle engine, animations, and
  navigation remain intact.

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
