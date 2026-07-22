# Queen Spotting Trainer

A mobile-first educational puzzle game that trains players to spot the
queen bee in hive photographs. Built with Expo, Expo Router, TypeScript,
and NativeWind. Works fully offline with a local puzzle dataset — no
backend, no accounts.

See [`docs/PRD.md`](docs/PRD.md) and [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
for the full product spec and engineering standards.

## Requirements

- Node.js
- An iOS Simulator (Xcode) and/or Android emulator, or the Expo Go app on
  a physical device

## Getting started

```bash
npm install
npm start
```

Then press `i` for iOS, `a` for Android, or scan the QR code with Expo Go.

## Testing

```bash
npm test
```

Runs the unit test suite (`jest-expo`) covering the pure utility
functions in `src/utils` and `src/services`.

## Type checking

```bash
npx tsc --noEmit
```

## Adding a puzzle

1. Add the image to `assets/images/`.
2. Add its metadata to `src/data/queens.ts`.

No application code needs to change — the UI renders whatever puzzles
exist in the dataset.

## Project structure

```
assets/images/      puzzle images
src/
  components/       reusable UI components
  screens/          screen-level components (composed by app/ routes)
  hooks/            reusable stateful logic
  utils/            pure, testable business logic
  types/            shared TypeScript types
  data/             local puzzle dataset
  services/         data-loading / storage services
  constants/        shared constants (routes, etc.)
  theme/            design tokens (colours, typography, spacing, ...)
app/                Expo Router routes
```
