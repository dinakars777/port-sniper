# Roadmap

Last updated: May 23, 2026

## Current Baseline

The initial repo review found and shipped two fixes:

- PR #1 fixed lockfile drift, aligned package metadata with `package.json`, and resolved the `picomatch` audit finding.
- PR #2 hardened port/PID validation, removed shell-interpolated process commands, and added the first `node:test` coverage.

Current verification on `main`:

- `npm test`
- `npm run build`
- `npx tsc --noEmit`
- `npm audit --audit-level=moderate`

## Near-Term Improvements

1. Add CI for pull requests

   Add a GitHub Actions workflow that runs `npm ci`, `npm test`, `npm run build`, `npx tsc --noEmit`, and `npm audit --audit-level=moderate` on Node 20 and current LTS. This will make the local verification gates repeatable before merges.

2. Improve process-execution error handling

   `findProcessesOnPort` still treats every `lsof` failure as an empty result. Split expected "no process found" failures from missing `lsof`, permission failures, and unexpected command errors so the CLI can tell users when the result is unknown instead of reporting that a port is free.

3. Add non-interactive CLI modes

   Add `--yes`, `--dry-run`, and `--json` flags. These would make the tool usable in scripts, shell aliases, editor tasks, and automation while preserving the current interactive default.

4. Make termination behavior configurable

   The tool currently uses `kill -9` for every selected process. Add a safer default path that tries `SIGTERM` first, then optionally escalates to `SIGKILL` with `--force` or after a timeout.

5. Expand platform compatibility checks

   Document and test behavior on macOS and Linux. If Windows support is desired, add a separate implementation based on platform-native process lookup rather than relying on `lsof`.

## Release And Packaging

1. Add release checks

   Add `prepack` or `prepublishOnly` to run tests, build, typecheck, and audit before publishing.

2. Verify package contents

   Add an `npm pack --dry-run` check to ensure only the intended built files, README, license, and package metadata ship.

3. Add versioning guidance

   Document the release flow for patch, minor, and major changes. The project is small enough that a short manual release checklist is likely better than full automation for now.

## Quality Bar

For future changes, keep this baseline:

- Any behavior change should include focused tests.
- Any CLI UX change should include at least one built CLI smoke check.
- Dependency updates should leave `npm audit --audit-level=moderate` clean.
- README examples should match the actual package name, scripts, and runtime behavior.
