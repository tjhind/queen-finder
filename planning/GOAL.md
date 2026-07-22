# Queen Spotting Trainer

## Claude Code Automation Goal

This repository is being developed iteratively.

The overall product requirements are defined in:

- docs/PRD.md
- docs/ARCHITECTURE.md

The implementation roadmap is defined in:

- planning/ROADMAP.md

Current progress is recorded in:

- planning/PROGRESS.md

Current implementation work is defined in:

- planning/CURRENT_GOAL.md

---

# Instructions

Read, in order:

1. docs/PRD.md
2. docs/ARCHITECTURE.md
3. planning/ROADMAP.md
4. planning/PROGRESS.md
5. planning/CURRENT_GOAL.md

These files together describe:

- the product
- the engineering standards
- the implementation roadmap
- current progress
- the current task

Do not modify:

- docs/PRD.md
- docs/ARCHITECTURE.md

Treat them as the source of truth.

---

# Execution

Execute only the work described in:

planning/CURRENT_GOAL.md

Do not begin future roadmap items unless instructed by CURRENT_GOAL.md.

Make sensible engineering decisions where implementation details are unspecified.

Prioritize correctness, maintainability and production quality.

Leave the repository in a working state at all times.

---

# Quality Requirements

Every implementation must:

- compile successfully
- build successfully
- contain no TypeScript errors
- avoid runtime errors
- avoid duplicated logic
- use reusable components
- follow React Native best practices
- follow the Architecture document

Never leave unfinished implementations if they can reasonably be completed.

Never introduce TODO placeholders unless explicitly unavoidable.

---

# Version Control

At the completion of every goal:

1. Review all modified files.

2. Remove temporary code.

3. Stage all relevant files.

4. Create a Git commit using Conventional Commits.

Examples:

feat: implement puzzle scoring

fix: correct image coordinate mapping

docs: update project progress

refactor: simplify puzzle rendering

5. If Git credentials are available:

Push the current branch.

If pushing fails:

Report the failure.

Do not repeatedly retry.

---

# Progress Tracking

After every completed goal:

Update:

planning/PROGRESS.md

Append to:

planning/CHANGELOG.md

The changelog should briefly summarise:

- Added
- Changed
- Fixed

---

# Goal Management

When CURRENT_GOAL.md has been completed:

Determine the next unfinished roadmap item.

Rewrite:

planning/CURRENT_GOAL.md

using that roadmap item.

Do not modify ROADMAP.md.

---

# Automation

Continue automatically through roadmap goals.

Stop immediately when either:

- every roadmap item is complete

OR

- 15 implementation goals have been completed during this automation cycle.

Never exceed fifteen completed goals in one execution cycle.

Leave the repository in a clean, buildable state before stopping.

# Continuous Validation

After each completed goal:

- Verify the application still launches.
- Verify previous functionality has not regressed.
- Fix regressions before beginning the next goal.

Never knowingly leave the repository in a broken state.
