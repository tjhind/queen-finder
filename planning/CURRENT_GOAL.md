# Current Goal

## Goal 9

### Release Preparation

---

# Objective

Final release-readiness pass. This is the last roadmap phase
(`planning/ROADMAP.md` Phase 10). Verify the product actually satisfies
`docs/PRD.md`'s Acceptance Criteria, tidy up release-facing configuration,
and do a final full verification sweep.

Do not add new gameplay features. This goal is verification and
housekeeping only.

---

# Tasks

## App Configuration

- Review `app.json` for release readiness: confirm `name`, `slug`,
  `version`, and icon/splash asset paths are all sensible and non-placeholder.
- Set `ios.bundleIdentifier` and `android.package` to sensible reverse-DNS
  values (not currently set) — standard release-prep housekeeping, even
  though this project isn't going through an actual store submission here.

## Acceptance Criteria Review

Walk through `docs/PRD.md`'s Acceptance Criteria section explicitly and
confirm each item, fixing anything that doesn't hold:

- The game is fully playable end-to-end (Home → Practice → guess → reveal
  → score → next puzzle → Results → Play Again / Return Home).
- All gameplay works correctly.
- Ten puzzles are included with valid metadata.
- Images are stored locally; everything works offline (no network calls
  anywhere in the app).
- New puzzles can be added by only touching `assets/images/` and
  `src/data/queens.ts` — no UI/logic changes required.
- The application is suitable for beta testing (no leftover debug code,
  no stray `console.log`s, no crashes across the full flow).

## Documentation

Add a minimal `README.md` at the repo root covering: what the project is,
how to install dependencies, how to run it (`npm start`), and how to run
tests (`npm test`). Keep it short — this is a dev-facing quick start, not
product documentation.

## Final Verification Sweep

- `npx tsc --noEmit`
- `npm test`
- `npx expo-doctor`
- `npx expo export --platform ios` and `--platform android`
- A final simulator smoke test of the full Home → Practice → Results loop.

---

# Success Criteria

This goal is complete only when:

- Every item in the PRD's Acceptance Criteria section is verifiably true.
- `app.json` has sensible, non-placeholder release configuration including
  bundle identifiers.
- A root `README.md` exists with basic setup/run/test instructions.
- The full verification sweep (typecheck, tests, doctor, both platform
  exports) passes cleanly.
- The repository is left in a clean, buildable, working state.

---

# Completion

When every success criterion has been satisfied, this is the final
roadmap phase (`planning/ROADMAP.md` Phase 10 of 10). Per `planning/GOAL.md`'s
Automation section, once every roadmap item is complete, automation should
stop — do not invent further goals beyond the roadmap.

The automation instructions inside GOAL.md should be followed for final
progress/changelog updates and version control.
