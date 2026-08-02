# Codemods

Migration codemods for `@k8o/arte-odyssey`, written as [ast-grep](https://ast-grep.github.io) rules.

ast-grep rewrites the matched span of the original text and leaves the rest of the file untouched, so the diff contains only the renames — no reprinting, no reformatting, no quote-style churn. Run your formatter afterwards only if you want to.

## v11 → v12

### Run it

One command, from the root of the project you are migrating:

```sh
npx --yes --package @ast-grep/cli@0.45.0 -- ast-grep scan --update-all \
  --inline-rules "$(curl -fsSL https://raw.githubusercontent.com/k35o/arte-odyssey/main/codemods/rules/v12.yml)" \
  src
```

`@ast-grep/cli` installs two executables (`ast-grep` and `sg`), neither named after the package, so npx needs `--package` and the executable spelled out after `--`. Without them it stops at `could not determine executable to run`.

`--inline-rules` only takes the rule text as an argument — nothing downloaded is executed, and ast-grep rules cannot run code. Swap `main` in the URL for a tag to pin the rules to a specific release.

If `$(...)` is awkward in your shell, download first:

```sh
curl -fsSL -o arte-odyssey-v12.yml \
  https://raw.githubusercontent.com/k35o/arte-odyssey/main/codemods/rules/v12.yml
npx --yes --package @ast-grep/cli@0.45.0 -- ast-grep scan --rule arte-odyssey-v12.yml --update-all src
```

Useful variations:

- `--interactive` instead of `--update-all` confirms every rewrite one by one.
- Drop `--update-all` entirely for a dry run: nothing is written, and every match is printed with the reason.
- `--report-style medium` prints the `note` of each rule (what to do about it) instead of just the headline.

Then run your type checker: everything the codemod cannot do is a type error in v12, by design.

### JSX in `.jsx` / `.js` files

The command above only reaches `.tsx`, because that is the only extension ast-grep maps to the TSX grammar. For a project that keeps JSX in `.jsx` or `.js`, use [`sgconfig.yml`](sgconfig.yml), which remaps those extensions:

```sh
npx --yes degit k35o/arte-odyssey/codemods arte-odyssey-codemods
npx --yes --package @ast-grep/cli@0.45.0 -- ast-grep scan --config arte-odyssey-codemods/sgconfig.yml --update-all src
```

### What it rewrites

Every rule is scoped by JSX element name. Renaming by attribute name alone would be wrong: `type` is a real prop on `Heading`, `Button` and `Popover.Root`, `value` is a real prop on `CheckboxGroup`, `CheckboxCard` and `RadioCard`, and `gray` is also a palette name in Tailwind class names.

| Rule                                   | Before                                     | After                                    |
| -------------------------------------- | ------------------------------------------ | ---------------------------------------- |
| `v12-checkbox-value-to-checked`         | `<Checkbox value={b}>`, `<Switch value={b}>`, `<CheckboxGroup.Item value={b}>` | `checked={b}`      |
| `v12-modal-type-to-placement`           | `<Modal type="center">`                    | `<Modal placement="center">`             |
| `v12-button-color-gray-to-base`         | `<Button color="gray">`                    | `<Button color="base">`                  |
| `v12-pagination-onpagechange-to-onchange` | `<Pagination onPageChange={fn}>`         | `<Pagination onChange={fn}>`             |
| `v12-listbox-triggericon-to-icontrigger` | `<ListBox.TriggerIcon>` / `</ListBox.TriggerIcon>` | `<ListBox.IconTrigger>` / `</ListBox.IconTrigger>` |

Deliberately **not** rewritten: `<CheckboxGroup value={string[]}>`, `<CheckboxCard value>`, `<RadioCard value>`, `type` on anything other than `Modal`, `IconButton`'s `color` (it never had `gray`), and any `gray` outside `<Button color>`.

### What it reports instead of rewriting

These rules have no fix. They print a location and a `note`; you do the edit.

| Rule                                          | Why it cannot be automated                                                                                                                             |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `v12-manual-listbox-option-shape`              | `ListBox` options went from `{ key, label }` to `{ value, label }`. The rule flags object literals that have both `key` and `label`, which is a heuristic: such an object is not necessarily a `ListBox` option. Reading `option.key` elsewhere has to be renamed too. |
| `v12-manual-listbox-options-prop`              | `<ListBox.Root options={NOT_A_LITERAL}>` — the array is behind an identifier, so its shape cannot be inspected. TypeScript catches it if the value is typed `Option[]`; it does not if the value comes from an API response typed `any`. |
| `v12-manual-radiocard-pressed-query`           | `RadioCard` is a real `radiogroup` of `input[type=radio]` now, not `button[aria-pressed]`. Flags `getByRole('button', { pressed })` and friends; replace with `getByRole('radio', { checked })`. |
| `v12-manual-radiocard-usage`                   | Every `<RadioCard>` instance, as a hint: the props did not change, but the rendered DOM and the ARIA roles did, so tests and CSS selectors around it need a look. |
| `v12-manual-button-non-button-attribute`       | `Button` / `IconButton` props narrowed from `HTMLProps` to `ButtonHTMLAttributes`. Attributes a `<button>` never had (`href`, `target`, `src`, …) are now type errors even though the runtime behaviour is unchanged — render the element yourself through `renderItem`. |
| `v12-manual-listbox-triggericon-outside-jsx`   | A `ListBox.TriggerIcon` reference outside a JSX tag (an alias, a `ComponentProps<…>`, a Storybook `component:` field). The rewrite is scoped to JSX tags on purpose. |
| `v12-manual-aliased-import`                    | `import { Checkbox as Check }` hides the usage from every element-name-scoped rule. Migrate those tags by hand — or drop the alias, re-run, and put it back. |

### Out of scope entirely

Not detectable by any static rule, so not attempted:

- **Spread props.** `<Checkbox {...props} />` where `props` carries `value`, and any object built elsewhere and spread into one of the renamed components.
- **Default copy is now Japanese.** `Spinner`'s `Loading` became `読み込み中`, and the rest of the built-in strings follow. Tests that assert the old English text break. To keep English, pass the dictionary: `import { en } from '@k8o/arte-odyssey/i18n'` and `<ArteOdysseyProvider messages={en}>`.
- **Stored generative-UI specs.** `validateGeneratedSpec()` reports the old prop names as unknown keys. Regenerate or hand-edit saved specs.

## Verifying a codemod

[`verify.sh`](verify.sh) runs the rules over [`__fixtures__/v12`](__fixtures__/v12) in a temp directory and checks four things:

```sh
codemods/verify.sh
```

| Fixture                                  | Assertion                                                       |
| ---------------------------------------- | --------------------------------------------------------------- |
| `rewrite.input.tsx` → `rewrite.expected.tsx` | every rewrite lands, byte for byte                          |
| `untouched.tsx`                          | unchanged — the look-alikes that must survive the run           |
| `manual.tsx`                             | unchanged, and reported exactly as `manual.expected.txt` says   |
| `legacy.input.jsx` → `legacy.expected.jsx` | the `sgconfig.yml` run reaches `.jsx` too                     |

`AST_GREP=/path/to/ast-grep codemods/verify.sh` reuses an already installed binary instead of going through `npx`.

Regenerate the `*.expected.*` snapshots by copying the temp-directory output over them after reviewing the diff — never by hand.

The fixtures are excluded from Oxfmt and Oxlint in the root [`vite.config.ts`](../vite.config.ts): they are byte-exact snapshots, and `vp check --fix` in the pre-commit hook would rewrite them out from under the diff.

> Never run a codemod over this repository's own sources. They are already on the new API; a run there can only be a no-op or a misfire.
