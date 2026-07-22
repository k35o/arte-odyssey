# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

ArteOdyssey is a monorepo containing a React UI library (`@k8o/arte-odyssey`) and its documentation site, built with:

- **Vite+** (`vp`) as unified toolchain (dev, build, test, lint, format, task runner)
- **pnpm** for package management (v11.15.1, Node.js >=24.13.0)
- **TypeScript** (strict mode, `noUncheckedIndexedAccess: true`)
- **Oxlint/Oxfmt** for linting and formatting (via `vp check`)
- **Tailwind CSS 4** with semantic design tokens
- **pnpm's built-in release management** with [k35o/pnpm-release-action](https://github.com/k35o/pnpm-release-action) for versioning and publishing

### Project Structure

```
packages/
  arte-odyssey/          # Main UI library package (@k8o/arte-odyssey)
apps/
  docs/                  # Documentation site (Vite + @funstack/router)
examples/
  vite/                  # Example Vite app
  nextjs/                # Example Next.js app
```

## Development Commands

All commands run from the repository root unless noted.

### Building

```bash
pnpm build              # Build all packages
pnpm typecheck          # Type checking across all packages
```

### Code Quality

```bash
pnpm check             # Run Oxlint/Oxfmt linting/formatting checks
pnpm check:write       # Run checks and auto-fix issues
```

### Testing

```bash
pnpm test              # Run all tests
```

## Code Conventions

### Formatting & Linting

- Oxfmt with **single quotes**, 2-space indentation
- Use `type` keyword, not `interface`
- No `@ts-ignore` (use `@ts-expect-error` with explanation if needed)
- No skipped tests (`test.skip`, `describe.skip`)
- Git pre-commit hook: `vp staged` runs `vp check --fix` and auto-stages fixes

## Release

Versioning and publishing use [pnpm's built-in release management](https://pnpm.io/versioning) (pnpm >= 11.13), driven in CI by [k35o/pnpm-release-action](https://github.com/k35o/pnpm-release-action) via `.github/workflows/release.yml`.

To author a change, run `pnpm change` (writes a `.changeset/<name>.md` intent in the changesets format) and include it in the PR.

On every push to `main` the action either opens/updates the release PR (branch `pnpm-release/main`) that bumps versions and updates `CHANGELOG.md`, or — when no intents are pending — builds, publishes to npm via OIDC trusted publishing, pushes the version tag, and creates the GitHub Release.

Config lives in the `versioning` key of `pnpm-workspace.yaml` (`changelog.storage: repository` keeps `CHANGELOG.md` committed). Consumed intents are recorded in `.changeset/ledger.yaml`. Package is published as `@k8o/arte-odyssey` with public access (`publishConfig` in its `package.json`).
