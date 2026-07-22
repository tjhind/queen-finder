# Queen Spotting Trainer

## Architecture & Engineering Standards

---

# Philosophy

This repository should be production-quality from day one.

Code should prioritize:

- readability
- maintainability
- extensibility
- testability
- performance

Assume multiple engineers will work on the project.

---

# Technology

Use:

- React Native
- Expo
- Expo Router
- TypeScript
- NativeWind
- Expo Image
- Reanimated
- Expo Haptics
- AsyncStorage

Avoid unnecessary dependencies.

---

# Folder Structure

```
assets/
    images/

src/

    components/

    screens/

    hooks/

    utils/

    types/

    data/

    services/

    constants/

    theme/
```

Separate presentation from business logic.

---

# Components

Components should be:

- small
- reusable
- composable

Avoid components exceeding roughly 250 lines.

Prefer composition over inheritance.

---

# State Management

Use:

- React Hooks
- Context only if required

Do not introduce Redux.

Keep state local whenever possible.

---

# Business Logic

Game logic must never live inside UI components.

Create reusable utilities.

Examples:

- calculateDistance()
- calculateScore()
- normaliseCoordinates()
- randomisePuzzleOrder()

---

# Puzzle Loading

Puzzle images are stored locally.

```
assets/images/
```

Puzzle metadata:

```
src/data/queens.ts
```

The UI should dynamically render all available puzzles.

Adding a puzzle should only require:

1. Add image

2. Add metadata

No UI modifications.

---

# Image Interaction

Coordinate conversion must correctly account for:

- scaling
- aspect ratio
- padding
- letterboxing

Coordinate mapping should produce consistent results across devices.

---

# Styling

Use NativeWind.

Avoid inline styles.

Create reusable styling patterns.

Spacing should remain consistent.

---

# Animations

Use Reanimated.

Animations should feel subtle.

Examples:

- marker fade
- marker scale
- score animation
- button press animation

---

# Performance

Prevent unnecessary renders.

Memoize expensive calculations.

Keep animations at 60fps.

Optimize image loading.

---

# Error Handling

The application should never crash due to:

- missing metadata
- invalid coordinates
- missing image assets

Display graceful fallbacks.

---

# Testing

Utility functions should be independently testable.

Core gameplay should be deterministic.

---

# Coding Standards

Use:

- Functional components
- Strong typing
- Descriptive naming
- Small files
- Single responsibility

Avoid:

- duplicated logic
- large components
- magic numbers
- unnecessary abstraction

---

# Definition of Done

Every implementation step should satisfy:

- Builds successfully
- TypeScript passes
- No runtime errors
- Responsive UI
- Works on iOS
- Works on Android
- Existing functionality remains intact

Never leave placeholder implementations, TODOs, or unfinished features.

If a feature cannot be completed within the current implementation step, leave the application in a fully working state before stopping.

Prioritize correctness over speed.

Always produce production-quality code.
