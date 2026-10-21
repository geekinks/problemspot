# Database Guide

## Status

The database described in [ARCHITECTURE.md](ARCHITECTURE.md) is proposed. Until
versioned migrations exist, do not describe tables or policies as implemented.

## Source of truth

PostgreSQL through Supabase is authoritative for identities, profiles,
problems, votes, evidence metadata, status history, relations, missions,
solutions, contributors, milestones, impact, recognition, moderation, and
Solution Lab audit records.

## Migration rules

- Store ordered migrations in `supabase/migrations/`.
- Never change an already-applied production migration; add a new one.
- Include constraints, indexes, RLS policies, grants, and comments in version control.
- Make data backfills explicit, bounded, resumable, and reviewable.
- Test upgrades from the previous supported schema.
- Document destructive or irreversible changes and a recovery plan.

## Core invariants

- Application primary keys use UUIDs.
- Timestamps use `timestamptz`.
- Foreign keys define deletion behaviour deliberately.
- Allowed statuses and vote types use constraints.
- `(problem_id, user_id, vote_type)` prevents duplicate active votes.
- Clients cannot provide authoritative vote counts.
- Only authorized human review changes validation status.
- Status changes create immutable history records.
- A Solution Lab run requires a verified problem.

## Row Level Security

Enable RLS on every exposed table. Test both allowed and denied operations for
anonymous users, ordinary users, owners, contributors, reviewers, moderators,
and privileged server jobs. Hiding an interface control is not authorization.

Service-role credentials bypass RLS and belong only in trusted server or job
environments. Prefer user-scoped sessions for ordinary operations.

## Evidence storage

Store controlled object paths rather than permanent public URLs. Use private
buckets by default, validate uploads, and create short-lived signed URLs only
after authorization.

## Local workflow

When Supabase configuration is added:

1. Start the local stack or use the dedicated development project.
2. Apply all migrations from a clean database.
3. Seed synthetic, non-sensitive data.
4. Run constraint and RLS tests.
5. Generate or update types using the documented project command.
6. Reset the local database and confirm reproducibility.

Never test migrations against production first.

## Review checklist

- Does the database enforce critical integrity rules?
- Are reads and writes least-privileged?
- Can concurrent requests violate an invariant?
- Are sensitive fields excluded from public views?
- Do indexes support expected filters and foreign keys?
- Are audit and attribution records preserved?
- Is rollback or forward recovery understood?

