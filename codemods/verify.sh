#!/usr/bin/env bash
# Runs the v12 codemod against codemods/__fixtures__ and checks that
#   - rewrite.input.tsx becomes rewrite.expected.tsx,
#   - untouched.tsx and manual.tsx are not modified at all,
#   - manual.tsx is reported exactly as manual.expected.txt says,
#   - legacy.input.jsx becomes legacy.expected.jsx under sgconfig.yml.
#
# Usage: codemods/verify.sh
# Set AST_GREP to reuse an already installed binary, e.g.
#   AST_GREP="$(pnpm bin)/ast-grep" codemods/verify.sh
set -euo pipefail

here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
fixtures="$here/__fixtures__/v12"
rules="$here/rules/v12.yml"
# `@ast-grep/cli` ships two bins (`ast-grep` and `sg`) and neither is named
# after the package, so npx cannot pick one on its own: it has to be told the
# package with `--package` and the executable after `--`.
ast_grep="${AST_GREP:-npx --yes --package @ast-grep/cli@0.45.0 -- ast-grep}"
# The fixtures are copied outside the repository, so nothing here should be
# skipped because of an ignore file that happens to sit above $TMPDIR.
no_ignore=(--no-ignore vcs --no-ignore hidden)

# Every ast-grep invocation below ends in `|| true`, because ast-grep exits
# non-zero as soon as an error-severity rule matches. That also swallows "the
# binary never ran", which then shows up as four unrelated-looking diffs, so
# the version probe is what actually asserts the command is runnable.
$ast_grep --version >/dev/null

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

cp "$fixtures/rewrite.input.tsx" "$work/rewrite.tsx"
cp "$fixtures/untouched.tsx" "$fixtures/manual.tsx" "$work/"

# The report is taken before the rewrite so that the fixable rules show up too.
# ast-grep exits non-zero whenever it reports an error-severity rule, and it
# prints that summary on stderr; neither is a failure of this script.
(cd "$work" && $ast_grep scan --rule "$rules" "${no_ignore[@]}" --report-style short . 2>/dev/null || true) \
  | sort >"$work/report.txt"

(cd "$work" && $ast_grep scan --rule "$rules" "${no_ignore[@]}" --update-all . >/dev/null 2>&1 || true)

status=0

check_file() {
  local actual="$1" expected="$2" label="$3"
  if diff -u "$expected" "$actual" >"$work/diff.txt"; then
    printf 'ok   %s\n' "$label"
  else
    printf 'FAIL %s\n' "$label"
    cat "$work/diff.txt"
    status=1
  fi
}

check_file "$work/rewrite.tsx" "$fixtures/rewrite.expected.tsx" \
  'rewrite.input.tsx -> rewrite.expected.tsx'
check_file "$work/untouched.tsx" "$fixtures/untouched.tsx" \
  'untouched.tsx is left alone'
check_file "$work/manual.tsx" "$fixtures/manual.tsx" \
  'manual.tsx is left alone'

grep '^manual\.tsx:' "$work/report.txt" >"$work/manual-report.txt" || true
check_file "$work/manual-report.txt" "$fixtures/manual.expected.txt" \
  'manual.tsx report matches manual.expected.txt'

# `--rule` alone only reaches .tsx; sgconfig.yml is what remaps .jsx / .js.
jsx_work="$(mktemp -d)"
trap 'rm -rf "$work" "$jsx_work"' EXIT
cp "$fixtures/legacy.input.jsx" "$jsx_work/legacy.jsx"
(cd "$jsx_work" && $ast_grep scan --config "$here/sgconfig.yml" "${no_ignore[@]}" --update-all . \
  >/dev/null 2>&1 || true)
check_file "$jsx_work/legacy.jsx" "$fixtures/legacy.expected.jsx" \
  'legacy.input.jsx -> legacy.expected.jsx (sgconfig.yml)'

exit "$status"
