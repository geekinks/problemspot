# Deployment Guide

## Status

Production infrastructure is not yet defined. This guide records the minimum
delivery requirements; it does not claim that ProblemSpot is deployed.

## Environments

Use separate development, staging, and production environments with separate
Supabase projects, storage, secrets, provider credentials, and monitoring.
Never test destructive migrations or private evidence flows in production.

## Required configuration

- Application runtime compatible with the supported Node.js version.
- Supabase URL and publishable key.
- Server-only service-role key for narrowly defined privileged operations.
- Private evidence buckets and reviewed RLS policies.
- Optional Solution Lab provider and server-only token.
- Rate limiting, logs, error monitoring, backups, and recovery procedures.

## Release process

1. Review the change, migrations, privacy impact, and rollback plan.
2. Run formatting, lint, type checking, tests, and production build.
3. Apply migrations to staging and run smoke, RLS, and critical journey tests.
4. Back up production and confirm recovery access.
5. Apply production migrations through the documented automated process.
6. Deploy the application using immutable build output.
7. Run post-deployment smoke tests and monitor errors and latency.
8. Record the release in `CHANGELOG.md`.

## Migration safety

Prefer backward-compatible, expand-and-contract changes. Separate large
backfills from schema locks. Never remove a field until all deployed code has
stopped using it and recovery has been considered.

## Secrets

Store secrets in the deployment platform's secret manager. Restrict access,
rotate periodically and after exposure, and never print values in logs or CI.
Only Supabase publishable values may be exposed to the browser.

## Solution Lab

The lab is optional. Production enablement requires the validated-problem gate,
provider terms review, payload minimization, audit records, quotas, timeouts,
failure isolation, and a tested off switch. Generated code still follows the
normal review and deployment process.

## Rollback and recovery

- Roll back application code to a known compatible release.
- Prefer forward-fixing applied migrations; do not improvise destructive SQL.
- Disable optional integrations when they threaten availability or privacy.
- Restore from tested backups only through the documented recovery process.
- Preserve evidence and audit integrity during recovery.

## Production checklist

- RLS and storage policies tested with allowed and denied identities.
- Authentication redirects and recovery flows use production domains.
- Sensitive routes and provider calls are rate-limited.
- Logs exclude credentials, private evidence, and unnecessary personal data.
- Security contact, moderation process, privacy information, and support links
  are published.
- Accessibility and critical end-to-end journeys pass.
- Monitoring, backups, restore tests, and incident ownership are active.

