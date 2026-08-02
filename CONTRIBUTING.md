# Contributing to ArteOdyssey

Thanks for your interest in contributing! This document explains how to set up the repository, the development workflow, and how changes get released.

## Setup

Tool versions are pinned in [`mise.toml`](mise.toml) and managed with [mise](https://mise.jdx.dev/):

- Node.js 24.16.0
- pnpm 11.15.1

```bash
mise install    # installs Node.js and pnpm at the pinned versions
pnpm install    # installs workspace dependencies
```

If you do not use mise, any Node.js ≥ 24.13.0 with pnpm 11.15.1 works (see `engines` / `packageManager` in [`package.json`](package.json)).

## Development commands

Run from the repository root:

```bash
pnpm build       # Build all packages and apps
pnpm test        # Run all tests
pnpm typecheck   # Type check all packages
pnpm check       # Lint/format check (Oxlint/Oxfmt via vp)
pnpm check:write # Lint/format check with auto-fix
```

Inside `packages/arte-odyssey`, useful extras:

```bash
pnpm storybook                     # Storybook dev server on port 6006
pnpm test -- --project=helpers     # Helper unit tests only (no browser)
pnpm test -- --project=hooks       # Hook tests only (headless Chromium)
pnpm test -- --project=components  # Component tests only (Storybook stories)
```

## Adding a component

Components live under a category directory (`buttons`, `form`, `overlays`, …) in `packages/arte-odyssey/src/components/` and follow a 3-file pattern:

```
src/components/<category>/<name>/
  <name>.tsx            # Implementation
  <name>.stories.tsx    # Storybook stories (these ARE the component tests)
  index.ts              # Re-export: export { ComponentName } from './<name>';
```

To expose the component from the package root, add a re-export to `src/components/index.ts` (the root entry `src/index.ts` re-exports everything from there).

## Changing the public API

### No deprecation period

Breaking changes ship as **immediate removal, plus a codemod, plus a migration guide** — we do not keep deprecated aliases around.

Two `value` props with different meanings, or a `type` that means placement on one component and heading level on another, cost every reader more than a one-time rename costs every caller. A deprecated alias postpones that cost without removing it, and it doubles the surface every future change has to stay compatible with. So rename in place, ship the codemod that rewrites call sites mechanically, and document the parts the codemod cannot reach (data-shape changes, DOM/role changes, type-only breakage) in the migration guide.

Write the codemod for what is mechanically safe, and be explicit about what is not:

- A prop rename on **one** component is not a global attribute rename. `Modal`'s `type` → `placement` must not touch `Heading` / `Button` / `Popover`, which use `type` for something else.
- A value rename is not a string replace. `Button`'s `color="gray"` → `color="base"` must not touch the `gray` palette name used elsewhere.
- Data-shape changes (e.g. `ListBox` options `{ key, label }` → `{ value, label }`) are out of reach for a codemod. They must be covered by the migration guide and by making the old shape a type error.

### Generative UI schema key order is public ABI

The prop schemas under `src/integrations/_shared/schemas.ts` are not just validation. OpenUI Lang serializes component calls as **fully positional arguments**, mapped back to named props by the schema's key order. So, for those schemas:

- **Renaming a key is safe** — positions are unchanged.
- **Deleting or reordering keys is breaking** — every stored spec shifts by one.
- **New keys must be appended at the end**, never inserted in the middle.

`validateGeneratedSpec()` reports keys it does not recognize, so specs saved against an older schema surface as explicit unknown-key findings rather than silently dropped props.

### Documentation ships with the package

`packages/arte-odyssey/docs/**` is published to npm (see `files` in the package manifest) and is read by AI coding assistants out of `node_modules/@k8o/arte-odyssey/docs/`. Stale examples there are shipped defects, not just documentation debt.

Any pull request that changes the public API must update, **in the same PR**:

- `packages/arte-odyssey/README.md`
- `packages/arte-odyssey/docs/GUIDE.md`
- `packages/arte-odyssey/docs/references/*.md`
- `packages/arte-odyssey/docs/llms.txt`
- `.claude/skills/arte-odyssey-design/` (SKILL.md and its `references/`, which mirror the shipped examples)

## Testing: writing a story is writing a test

Component tests use Storybook stories as fixtures via `@storybook/addon-vitest`: every story runs as a Vitest browser-mode test in headless Chromium (the `components` test project). There are no separate component test files — cover the states you want guaranteed with stories, and use `play` functions for interaction behavior.

The a11y addon (`@storybook/addon-a11y`) checks every story with `a11y: { test: 'error' }`, so accessibility violations fail the test run.

Hook tests (`src/hooks/**/*.test.tsx`) run in a real browser via `vitest-browser-react`; helper tests are plain unit tests.

## Visual regression testing (VRT)

Per-story VRT runs on [storybook-addon-vrt](https://github.com/k35o/storybook-addon-vrt).

Local commands:

```bash
pnpm --filter @k8o/arte-odyssey test:vrt          # capture story screenshots
pnpm --filter @k8o/arte-odyssey exec svrt compare # compare against the baseline
pnpm --filter @k8o/arte-odyssey exec svrt approve # accept changes as the new baseline
```

Approval flow on CI ([`.github/workflows/vrt.yml`](.github/workflows/vrt.yml)):

- Every pull request captures story screenshots and compares them against the latest baseline from a successful `main` run (comparison is skipped if no baseline exists yet).
- The result is posted as a sticky PR comment with a link to the visual report (published to Cloudflare Pages when configured, and always uploaded as the `vrt-report` artifact).
- Visual differences do **not** fail CI — they only produce a warning annotation. Deciding whether a diff is intended is a human review step based on the report.
- Merging the pull request makes its screenshots the next baseline: each push to `main` uploads a fresh `vrt-baseline` artifact.

Separately, [`.github/workflows/chromatic.yml`](.github/workflows/chromatic.yml) publishes Storybook to Chromatic on every push (with `onlyChanged: true`; `renovate/**` branches are skipped). The published Storybook is available at <https://main--687a213c85e2e4589d8db1bb.chromatic.com>.

## Release

Versioning uses pnpm's built-in release management (the `versioning` key in [`pnpm-workspace.yaml`](pnpm-workspace.yaml)), driven in CI by [k35o/pnpm-release-action](https://github.com/k35o/pnpm-release-action).

- Run `pnpm change` to record a release intent, and include the generated `.changeset/<name>.md` in your pull request.
- On pushes to `main`, CI either updates the release PR (branch `pnpm-release/main`) or, when no intents are pending, publishes to npm via OIDC trusted publishing.

## Commit conventions

- Follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `ci:`, `chore:`, …, with `!` for breaking changes).
- Write commit messages, PR titles, and issue text in the majority language of the existing history (bot commits excluded) — this repository contains both English and Japanese.
- The pre-commit hook (`vp staged`) runs `vp check --fix` on staged files and auto-stages the fixes.
