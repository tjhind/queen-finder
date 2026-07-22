# Queen Spotting Trainer

## Product Requirements Document (PRD)

---

# Product Vision

Queen Spotting Trainer is a premium mobile-first educational game that helps users improve their ability to identify queen bees in hive photographs.

Players are shown a series of hive images and must tap where they believe the queen bee is located.

After submitting a guess, the application reveals the queen, awards points based on accuracy, and progresses to the next puzzle.

The application should feel polished enough that replacing the placeholder puzzle images with production-quality images would make it suitable for App Store submission.

---

# Product Goals

The application should:

- Teach queen spotting through repeated practice.
- Be enjoyable and replayable.
- Work entirely offline.
- Require no backend.
- Require no user accounts.
- Load all puzzle data locally.
- Be easily extensible with additional puzzle packs in the future.

---

# Initial Dataset

The repository itself must include a playable dataset.

The application is **not complete** until the repository contains:

- 10 playable puzzle images.
- Metadata describing each puzzle.
- A complete playable game.

## Puzzle Images

Claude should generate an initial dataset consisting of ten original puzzle images.

Each image should:

- depict a realistic honey bee frame or hive
- contain exactly one queen bee
- vary in difficulty
- be visually distinct
- be suitable for mobile devices

The image generation should create:

- 3 Easy puzzles
- 4 Medium puzzles
- 3 Hard puzzles

Difficulty should vary through:

- bee density
- queen visibility
- queen orientation
- lighting
- clutter
- similarity between workers and queen

These images are placeholders for the MVP and should be stored locally inside the repository.

---

# Puzzle Metadata

Every puzzle should contain metadata.

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

  difficulty?: "easy" | "medium" | "hard";
}
```

Coordinates should use normalized values (0–1).

The radius defines the acceptable hit area.

---

# User Journey

Launch

↓

Home

↓

Start Practice

↓

Random Puzzle

↓

User taps queen

↓

Submit Guess

↓

Reveal Queen

↓

Award Score

↓

Next Puzzle

↓

Final Results

↓

Play Again

---

# Home Screen

Display:

- App title
- Bee illustration
- Start Practice button
- Number of available puzzles

---

# Practice Screen

Display:

Top

- Current score
- Puzzle progress

Centre

- Large hive image

Bottom

Primary button

Before guess:

Submit Guess

After reveal:

Next Puzzle

---

# Gameplay

The user taps anywhere on the image.

Display a blue marker.

Allow repositioning before submission.

After submission:

- disable further interaction
- reveal queen
- animate queen highlight
- keep user marker visible
- connect guess and queen using a subtle line
- display result
- award score

---

# Scoring

Suggested scoring:

Perfect

100

Excellent

80

Good

60

Close

30

Miss

0

Store:

- score
- accuracy
- correct answers
- best score

Persist best score locally.

---

# Results Screen

Display:

- Final Score
- Accuracy
- Correct Answers
- Play Again
- Return Home

---

# User Experience

The application should feel like a premium educational puzzle game.

Characteristics:

- Modern
- Friendly
- Calm
- Nature-inspired
- Fast
- Responsive
- Simple

---

# Accessibility

Support:

- large touch targets
- readable typography
- good colour contrast
- varying screen sizes

---

# Performance

The application should:

- render efficiently
- avoid unnecessary re-renders
- remain responsive
- support large images smoothly

---

# Acceptance Criteria

The product is complete when:

- The game is fully playable.
- All gameplay works correctly.
- Ten puzzles are included.
- Every puzzle has valid metadata.
- Images are stored locally.
- Everything works offline.
- New puzzles can be added without modifying application logic.
- The application is suitable for beta testing.
