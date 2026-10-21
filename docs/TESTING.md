# Testing Guide

## Quality gate

Every pull request should run the checks relevant to its changes. The current
repository provides:

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Do not claim a test passed if the script does not exist or was not run. Record
missing checks and manual verification in the pull request.

## Test layers

### Unit tests

Test validation schemas, permissions, status transitions, formatting, and pure
domain logic without external services.

### Database tests

Test migrations, foreign keys, check and uniqueness constraints, indexes, and
RLS using authenticated, cross-user, moderator, service, and anonymous roles.

Critical cases include:

- A user cannot cast duplicate active votes of the same type.
- A client cannot change validation status directly.
- Private evidence is unavailable to unauthorized users.
- History and moderation records cannot be fabricated by ordinary clients.
- An unvalidated problem cannot create a Solution Lab run.

### Integration tests

Test authenticated submissions, voting, evidence uploads, human review,
duplicate merging, mission creation, solution proposals, and provider failures.

### End-to-end tests

Cover at least these journeys:

1. Submit a report and receive confirmation.
2. Confirm or support from another account.
3. Review evidence and record a human validation decision.
4. Convert a verified problem into an open-source mission.
5. Propose a solution, join contributors, and record a milestone.
6. Reject Solution Lab access before validation and permit it after validation.

### Accessibility tests

Test keyboard operation, focus order, labels, error announcements, contrast,
zoom, reduced motion, and responsive layouts. See [ACCESSIBILITY.md](ACCESSIBILITY.md).

### Security and privacy tests

Test unauthorized reads and writes, role escalation, file validation, external
URLs, rate limits, sensitive logs, provider payload minimization, and secret
exposure.

## Test data

Use synthetic data. Never use real private reports, contact details, evidence,
access tokens, or precise residential locations. Fixtures should cover multiple
communities without relying on stereotypes.

## Regression tests

Every bug fix should include a test that fails before the fix when practical.
Security regressions should be narrowly scoped and avoid publishing exploit
details before coordinated disclosure.

