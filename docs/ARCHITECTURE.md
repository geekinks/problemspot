# ProblemSpot Architecture

**Status:** Draft\
**Version:** 1.0\
**Last updated:** 2026-10-13\
**Repository:** `problemspot`\
**Primary stack:** Next.js, TypeScript, Supabase, PostgreSQL, Supabase
Auth, Supabase Storage\
**Optional Solution Lab:** Replaceable AI or coding-agent provider, gated to
validated problems

## 1. Purpose

This document defines the proposed application architecture, service
boundaries, data model, database relationships, security model, and key
data flows for ProblemSpot.

ProblemSpot lets people report real-world community problems, confirm whether
they experience them, provide evidence, validate needs through accountable
human review, turn validated problems into open-source missions, propose
solutions, and track outcomes. AI and coding agents are excluded from problem
reporting and validation. They may optionally assist contributors inside the
Solution Lab after a problem has been validated.

## 2. Architecture principles

1.  **Community first:** reporting, categorization, discovery, voting,
    evidence, moderation, and validation are human-led and AI-independent.
2.  **Validate before building:** Solution Lab access requires a validated
    problem and approved mission context.
3.  **Database-enforced integrity:** important rules such as one active
    vote per user per problem are enforced by PostgreSQL constraints,
    not only by UI logic.
4.  **Least privilege:** browser clients use the Supabase
    publishable/anon key with Row Level Security (RLS); service-role
    credentials stay server-side.
5.  **Traceable decisions:** moderation, validation, merges, and impact
    reviews should have an auditable history.
6.  **Privacy by default:** collect only necessary personal data and
    avoid publishing precise locations or sensitive evidence.
7.  **Modular monolith first:** start with a single Next.js application
    and clear feature modules; split services only when there is a
    demonstrated need.
8.  **Optional and portable assistance:** keep the Solution Lab behind an
    internal adapter so providers can be changed or disabled without affecting
    reporting, validation, or manual solution collaboration.

## 3. High-level architecture

``` mermaid
flowchart TD
    U[Community members and contributors] --> WEB[Next.js web application]
    WEB --> AUTH[Supabase Auth]
    WEB --> API[Next.js Server Actions / Route Handlers]
    API --> DB[(Supabase PostgreSQL)]
    API --> STORAGE[Supabase Storage]
    DB --> RLS[PostgreSQL constraints, policies and RLS]
    DB --> GATE{Problem validated?}
    API --> GATE
    GATE -->|Yes| LAB[Optional AI Solution Lab]
    LAB --> AGENT[Model or coding-agent provider]
    API --> NOTIFY[Notification worker / email provider]
    API --> OBS[Logs and monitoring]
```

### Components

-   **Next.js:** public pages, authenticated experiences, forms, profile
    pages, dashboards, and server-side routes.
-   **Supabase Auth:** identity, sessions, and supported sign-in
    providers.
-   **Supabase PostgreSQL:** source of truth for users' public profiles,
    problems, votes, evidence metadata, solutions, recognition, and
    audit records.
-   **Supabase Storage:** controlled storage for uploaded evidence and
    avatars.
-   **Next.js server layer:** validates requests, checks authorization,
    coordinates database operations, and enforces the validated-problem gate.
-   **Solution Lab adapter:** exposes stable, solution-stage operations such as
    drafting briefs, comparing approaches, planning milestones, preparing
    GitHub issues, and assisting with reviewed repository work.
-   **Model or coding-agent provider:** runs only on approved mission context
    after authorization. It is never part of submission or validation.
-   **Background processing:** optional jobs for Solution Lab runs,
    notifications, and maintenance. Manual solution collaboration must not
    depend on successful provider execution.

## 4. Suggested code organization

``` text
problemspot/
├── app/
│   ├── (public)/
│   │   ├── page.tsx
│   │   ├── problems/
│   │   └── profiles/
│   ├── (auth)/
│   ├── dashboard/
│   ├── admin/
│   └── api/
│       ├── solution-lab/
│       ├── problems/
│       └── webhooks/
├── components/
│   ├── problems/
│   ├── voting/
│   ├── evidence/
│   ├── profiles/
│   └── recognition/
├── features/
│   ├── submissions/
│   ├── validation/
│   ├── voting/
│   ├── solution-lab/
│   ├── solutions/
│   └── impact/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── auth/
│   ├── permissions/
│   ├── schemas/
│   ├── solution-lab/
│   │   ├── adapter.ts
│   │   ├── authorization.ts
│   │   └── providers/
│   └── audit/
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── config.toml
├── tests/
├── docs/
│   ├── PRD.md
│   └── ARCHITECTURE.md
├── .env.example
├── CONTRIBUTING.md
├── SECURITY.md
└── README.md
```

This is a suggested structure, not a requirement to create every
directory on day one. Keep feature-specific code close together where
that improves maintainability.

## 5. Database design

Use PostgreSQL as the source of truth. Use UUID primary keys for
application entities, `timestamptz` for timestamps, foreign keys for
relationships, and database constraints for invariants.

### 5.1 Core tables

#### `profiles`

One public profile per Supabase Auth user.

-   `id uuid primary key references auth.users(id) on delete cascade`
-   `username text unique not null`
-   `display_name text not null`
-   `bio text`
-   `avatar_path text`
-   `location_label text`
-   `profile_visibility text not null default 'public'`
-   `created_at timestamptz not null default now()`
-   `updated_at timestamptz not null default now()`

Do not copy the user's password or authentication secrets into this
table. Keep email visibility private unless a deliberate, consent-based
feature requires otherwise. Create a profile row with a trusted signup
trigger or server-side flow and test that flow carefully.

#### `categories`

-   `id uuid primary key`
-   `name text unique not null`
-   `slug text unique not null`
-   `description text`
-   `is_active boolean not null default true`
-   `created_at timestamptz not null default now()`

Seed initial categories such as education, healthcare, agriculture,
infrastructure, environment, transportation, accessibility, business and
employment, public services, technology and connectivity, and other.

#### `problems`

-   `id uuid primary key`
-   `submitter_id uuid references profiles(id) on delete set null`
-   `category_id uuid references categories(id) on delete set null`
-   `title text not null`
-   `description text not null`
-   `location_label text`
-   `country_code text`
-   `region text`
-   `locality text`
-   `latitude numeric` (optional; restricted access if collected)
-   `longitude numeric` (optional; restricted access if collected)
-   `affected_people_description text`
-   `estimated_affected_count integer`
-   `severity text`
-   `frequency text`
-   `status text not null default 'submitted'`
-   `public_anonymous boolean not null default false`
-   `created_at timestamptz not null default now()`
-   `updated_at timestamptz not null default now()`
-   `published_at timestamptz`

Use a database check constraint for allowed `status`, `severity`, and
`frequency` values. Original reports must never be overwritten by moderator
notes, mission briefs, or Solution Lab output.

#### `problem_votes`

One row per user's active vote type on a problem.

-   `id uuid primary key`
-   `problem_id uuid not null references problems(id) on delete cascade`
-   `user_id uuid not null references profiles(id) on delete cascade`
-   `vote_type text not null`
-   `created_at timestamptz not null default now()`
-   `updated_at timestamptz not null default now()`
-   `unique (problem_id, user_id, vote_type)`

Allowed `vote_type` values: - `experiences_problem` - `supports_problem`

A unique constraint prevents duplicate active votes. Use a transaction
or a single insert/delete operation to toggle a vote safely. Do not
trust counts sent from the browser. Aggregate counts from the table or
maintain them with a carefully tested database mechanism. A user can
have one vote of each type only if the product explicitly intends that;
otherwise use one unique constraint on `(problem_id, user_id)` and store
the selected vote type in the row.

#### `evidence`

-   `id uuid primary key`
-   `problem_id uuid not null references problems(id) on delete cascade`
-   `submitted_by uuid references profiles(id) on delete set null`
-   `evidence_type text not null`
-   `description text`
-   `storage_path text`
-   `external_url text`
-   `review_status text not null default 'pending'`
-   `reviewed_by uuid references profiles(id) on delete set null`
-   `reviewed_at timestamptz`
-   `created_at timestamptz not null default now()`

Use private Storage buckets for sensitive evidence. Store a storage path
rather than a permanent public URL when access must be controlled.

#### `problem_status_history`

-   `id uuid primary key`
-   `problem_id uuid not null references problems(id) on delete cascade`
-   `previous_status text`
-   `new_status text not null`
-   `changed_by uuid references profiles(id) on delete set null`
-   `reason text`
-   `created_at timestamptz not null default now()`

This table records transitions. Insert history entries through a trusted
server/database operation or a carefully designed trigger so a client
cannot fabricate history.

#### `problem_relations`

-   `id uuid primary key`
-   `problem_id uuid not null references problems(id) on delete cascade`
-   `related_problem_id uuid not null references problems(id) on delete cascade`
-   `relation_type text not null` --- for example `possible_duplicate`,
    `related`, or `merged_into`
-   `source text not null default 'human'`
-   `review_status text not null default 'pending'`
-   `reviewed_by uuid references profiles(id) on delete set null`
-   `created_at timestamptz not null default now()`
-   `check (problem_id <> related_problem_id)`

Add a uniqueness rule for the canonical ordered pair and relation type,
or normalize pair ordering in trusted code. Only authorized human reviewers
may approve or merge related reports.

#### `solutions`

-   `id uuid primary key`
-   `problem_id uuid not null references problems(id) on delete cascade`
-   `created_by uuid references profiles(id) on delete set null`
-   `title text not null`
-   `description text not null`
-   `repository_url text`
-   `demo_url text`
-   `status text not null default 'proposed'`
-   `created_at timestamptz not null default now()`
-   `updated_at timestamptz not null default now()`

A problem may have multiple proposed solutions.

#### `solution_contributors`

Join table for many-to-many contributor relationships.

-   `solution_id uuid not null references solutions(id) on delete cascade`
-   `user_id uuid not null references profiles(id) on delete cascade`
-   `role text not null default 'contributor'`
-   `created_at timestamptz not null default now()`
-   `primary key (solution_id, user_id)`

#### `solution_milestones`

-   `id uuid primary key`
-   `solution_id uuid not null references solutions(id) on delete cascade`
-   `title text not null`
-   `description text`
-   `status text not null default 'planned'`
-   `evidence_url text`
-   `completed_by uuid references profiles(id) on delete set null`
-   `completed_at timestamptz`
-   `created_at timestamptz not null default now()`

#### `impact_assessments`

-   `id uuid primary key`
-   `solution_id uuid not null references solutions(id) on delete cascade`
-   `submitted_by uuid references profiles(id) on delete set null`
-   `summary text not null`
-   `outcome_type text not null` --- e.g. `self_reported`,
    `community_reviewed`, `independently_reviewed`
-   `people_affected_count integer`
-   `evidence_url text`
-   `reviewed_by uuid references profiles(id) on delete set null`
-   `reviewed_at timestamptz`
-   `created_at timestamptz not null default now()`

Distinguish a developer's self-reported success from a
community-reviewed or independently reviewed outcome.

#### `badges`

-   `id uuid primary key`
-   `slug text unique not null`
-   `name text not null`
-   `description text not null`
-   `criteria jsonb`
-   `is_active boolean not null default true`
-   `created_at timestamptz not null default now()`

#### `badge_awards`

-   `id uuid primary key`
-   `badge_id uuid not null references badges(id) on delete restrict`
-   `user_id uuid not null references profiles(id) on delete cascade`
-   `reason text not null`
-   `awarded_by uuid references profiles(id) on delete set null`
-   `awarded_at timestamptz not null default now()`
-   `revoked_at timestamptz`
-   `revocation_reason text`

Use an appropriate uniqueness policy to prevent duplicate active awards
when a badge is intended to be awarded only once.

#### `solution_lab_runs` (optional)

-   `id uuid primary key`
-   `problem_id uuid not null references problems(id) on delete cascade`
-   `solution_id uuid references solutions(id) on delete cascade`
-   `requested_by uuid references profiles(id) on delete set null`
-   `task_type text not null` --- `solution_brief`, `approach_options`,
    `work_plan`, `repository_assistance`, or `feedback_summary`
-   `provider text not null`
-   `model_id text not null`
-   `model_version text`
-   `input_hash text`
-   `output jsonb`
-   `status text not null default 'pending'`
-   `error_code text`
-   `review_status text not null default 'unreviewed'`
-   `created_at timestamptz not null default now()`
-   `completed_at timestamptz`

The server must confirm that the referenced problem is `verified` before
creating a run. Avoid retaining sensitive raw prompts unless necessary. Store
only the approved mission context and metadata needed for review,
reproducibility, and evaluation.

#### `moderation_actions`

-   `id uuid primary key`
-   `actor_id uuid references profiles(id) on delete set null`
-   `target_type text not null`
-   `target_id uuid not null`
-   `action_type text not null`
-   `reason text not null`
-   `metadata jsonb`
-   `created_at timestamptz not null default now()`

Because `target_id` can refer to multiple tables, this is not a
conventional foreign key. Validate targets in trusted server-side code.
For stronger relational integrity, use separate moderation tables per
target type.

#### `notifications` (optional for MVP)

-   `id uuid primary key`
-   `user_id uuid not null references profiles(id) on delete cascade`
-   `type text not null`
-   `title text not null`
-   `body text not null`
-   `href text`
-   `read_at timestamptz`
-   `created_at timestamptz not null default now()`

## 6. Database relationship overview

``` mermaid
erDiagram
    AUTH_USERS ||--|| PROFILES : has
    PROFILES ||--o{ PROBLEMS : submits
    CATEGORIES ||--o{ PROBLEMS : classifies
    PROFILES ||--o{ PROBLEM_VOTES : casts
    PROBLEMS ||--o{ PROBLEM_VOTES : receives
    PROBLEMS ||--o{ EVIDENCE : has
    PROFILES ||--o{ EVIDENCE : submits
    PROBLEMS ||--o{ PROBLEM_STATUS_HISTORY : records
    PROBLEMS ||--o{ PROBLEM_RELATIONS : relates
    PROBLEMS ||--o{ SOLUTIONS : has
    PROFILES ||--o{ SOLUTIONS : proposes
    SOLUTIONS ||--o{ SOLUTION_CONTRIBUTORS : includes
    PROFILES ||--o{ SOLUTION_CONTRIBUTORS : contributes
    SOLUTIONS ||--o{ SOLUTION_MILESTONES : tracks
    SOLUTIONS ||--o{ IMPACT_ASSESSMENTS : measures
    PROFILES ||--o{ BADGE_AWARDS : earns
    BADGES ||--o{ BADGE_AWARDS : awards
    PROBLEMS ||--o{ SOLUTION_LAB_RUNS : enables_after_validation
    SOLUTIONS ||--o{ SOLUTION_LAB_RUNS : assists
    PROFILES ||--o{ NOTIFICATIONS : receives
```

`AUTH_USERS` represents Supabase's managed `auth.users` table.
Application tables should reference it through `profiles.id`, rather
than duplicating authentication identities.

## 7. Supabase security model

### 7.1 Keys and clients

-   Browser: use the Supabase publishable key (or legacy anon key where
    applicable) with a user session and RLS.
-   Server: use the publishable key with the authenticated user's
    session for ordinary user-scoped operations.
-   Privileged background tasks: use the service-role/secret key only in
    trusted server environments. It bypasses RLS and must never be
    included in browser code, `NEXT_PUBLIC_*` variables, or a public
    repository.

Recommended environment variables:

``` dotenv
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SOLUTION_LAB_PROVIDER=
SOLUTION_LAB_API_TOKEN=
```

Only expose the first two to the browser. Keep the remaining variables
server-side. The Solution Lab token must never reach the browser. Configure
provider authentication, retention, and data-sharing controls according to the
published Solution Lab policy.

### 7.2 RLS policy intent

Enable RLS on all exposed application tables. Policies should be
reviewed and tested in migrations.

  ---------------------------------------------------------------------
  Table                              Policy intent
  ---------------------------------- ----------------------------------
  `profiles`                         Public can read only fields
                                     intended for public profiles;
                                     users can update their own
                                     profile; privileged roles can
                                     moderate.

  `categories`                       Public can read active categories;
                                     administrators can manage
                                     categories.

  `problems`                         Public can read published,
                                     non-restricted reports;
                                     authenticated users can create
                                     reports as themselves; submitters
                                     can edit their own reports within
                                     policy; only authorized reviewers
                                     can change validation status.

  `problem_votes`                    Authenticated users can
                                     create/delete only their own
                                     votes; reads expose only what the
                                     product intends to show.

  `evidence`                         Users can submit evidence for
                                     allowed reports; private evidence
                                     is accessible only to authorized
                                     viewers and reviewers.

  `problem_status_history`           Public or submitter visibility
                                     follows the report's visibility;
                                     clients cannot directly insert
                                     arbitrary history.

  `problem_relations`                Users may see approved relations;
                                     only authorized users can approve
                                     or merge.

  `solutions`                        Public can read published
                                     proposals; contributors can manage
                                     their own proposals within policy;
                                     restricted status transitions
                                     require server-side authorization.

  `solution_contributors`            Visible contributor attribution;
                                     only authorized actions can
                                     add/remove contributors.

  `solution_milestones`              Public milestone visibility
                                     follows the solution's visibility;
                                     only authorized contributors can
                                     update milestones.

  `impact_assessments`               Public visibility should depend on
                                     review status and evidence
                                     sensitivity; only authorized
                                     reviewers can mark independent
                                     review.

  `badges`                           Public can read active badge
                                     definitions; only trusted
                                     code/admins can manage them.

  `badge_awards`                     Public profile visibility rules
                                     apply; only trusted code/admins
                                     can award or revoke badges.

  `solution_lab_runs`                Only authorized contributors and server
                                     operations can access runs; the related
                                     problem must be validated;
                                     public access should expose only
                                     approved, non-sensitive outputs.

  `moderation_actions`               Restricted to authorized
                                     moderators and administrators.

  `notifications`                    A user can read/update only their
                                     own notifications.
  ---------------------------------------------------------------------

Do not rely on hiding UI controls for security. Enforce authorization in
RLS and trusted server-side code. Keep moderation roles in a protected
role/permission table or trusted authorization mechanism; do not allow
users to grant themselves moderator privileges by editing their profile.

### 7.3 Voting integrity

-   Add a unique constraint to prevent duplicate active votes.
-   Validate `vote_type` with a database check constraint.
-   Derive counts from database records or use transactionally
    maintained counters.
-   Never accept client-supplied vote counts as authoritative.
-   Use rate limits and abuse monitoring.
-   Do not equate vote totals with factual verification.

### 7.4 Storage security

-   Keep evidence in a private bucket by default.
-   Store object paths in PostgreSQL.
-   Validate MIME types, file size, and allowed extensions.
-   Generate short-lived signed URLs only for authorized access.
-   Do not store secrets or sensitive identity documents in public
    buckets.
-   Use a separate public bucket only for assets intentionally made
    public, such as public avatars.

## 8. Main data flows

### 8.1 Problem submission

1.  The user submits a form.
2.  The server validates input with a schema.
3.  The server verifies the authenticated identity.
4.  PostgreSQL stores the problem with status `submitted`.
5.  A status-history row is created through trusted logic.
6.  The UI confirms receipt.
7.  Other users can discover, follow, confirm, support, and add evidence
    according to policy.
8.  Human reviewers categorize the report, resolve duplicates, and manage
    validation status.

### 8.2 Voting

1.  The user chooses personal confirmation or general support.
2.  The server verifies authentication and eligibility.
3.  A database insert or delete records the vote.
4.  A uniqueness constraint prevents duplicates.
5.  The UI displays counts derived from trusted database state.
6.  Suspicious activity may be flagged for review.

### 8.3 Validation and mission handoff

1.  An authorized human reviewer examines the report and approved evidence.
2.  The reviewer records a reason for validation, rejection, merging, or a
    request for more information.
3.  PostgreSQL records the status transition and audit history.
4.  When the status becomes `verified`, the application creates or unlocks an
    open-source mission workspace.
5.  Contributors can review the mission context and collaborate manually.

### 8.4 Optional Solution Lab

1.  An authorized contributor requests a solution-stage task.
2.  The server verifies that the related problem is `verified` and that the
    requester may access every included source.
3.  A `solution_lab_runs` row is created with `pending` status.
4.  The adapter sends only the minimum approved mission context to the selected
    model or coding-agent provider.
5.  The provider returns a draft brief, approach comparison, work plan,
    repository artifact, or feedback summary.
6.  The server validates the response shape and records the result or a
    sanitized error.
7.  Contributors review, edit, accept, or discard the output through ordinary
    open-source workflows.
8.  Generated output never changes problem status, accepts a solution, merges
    code, or establishes impact automatically.

### 8.5 Solution and impact

1.  A contributor proposes a solution for a problem.
2.  The solution is reviewed and collaborators are added.
3.  Milestones record implementation progress.
4.  The contributor submits outcome evidence.
5.  An authorized reviewer records the assessment level.
6.  Recognition is awarded according to published criteria, with an
    audit trail.

## 9. API and service boundaries

Use Next.js Route Handlers or Server Actions for application operations.
Keep the optional Solution Lab adapter separate from reporting, moderation,
validation, and solution-domain code.

Suggested routes:

  --------------------------------------------------------------------------
  Method               Route                            Purpose
  -------------------- -------------------------------- --------------------
  `GET`                `/api/problems`                  Search and list
                                                        public problems

  `POST`               `/api/problems`                  Submit a problem

  `GET`                `/api/problems/[id]`             Read a problem

  `POST`               `/api/problems/[id]/votes`       Add or change a vote

  `DELETE`             `/api/problems/[id]/votes`       Remove a vote

  `POST`               `/api/problems/[id]/evidence`    Add evidence
                                                        metadata/upload
                                                        request

  `POST`               `/api/problems/[id]/solutions`   Propose a solution

  `POST`               `/api/missions/[id]/solution-lab` Request an optional
                                                        solution-stage task;
                                                        requires a validated
                                                        problem

  `POST`               `/api/reports`                   Report content for
                                                        moderation
  --------------------------------------------------------------------------

Routes are illustrative. Validate payloads, authorize every action,
return consistent error shapes, and apply rate limits to sensitive or
expensive endpoints.

## 10. AI Solution Lab integration

The Solution Lab is an optional contributor tool, not the system of record.
PostgreSQL and Supabase remain authoritative for reports, votes, evidence,
validation, solutions, milestones, and impact assessments.

Required controls:

-   Verify `problems.status = 'verified'` in trusted server-side code before
    creating every Solution Lab run.
-   Verify the requester can access the mission, solution, and included
    evidence.
-   Send only approved, minimum-necessary context to the provider.
-   Place a provider-independent adapter between application code and any
    model or coding agent.
-   Apply request timeouts, payload limits, quotas, and concurrency limits.
-   Record provider, model or agent version, requester, task, source-context
    hash, status, and reviewed output.
-   Keep a manual workflow and clear fallback when the provider is unavailable.
-   Do not expose an unauthenticated provider endpoint to the public internet.
-   Require pull-request review, automated tests, and maintainer approval for
    generated code.
-   Never allow an agent to merge code, change validation status, accept a
    solution, message affected users, or publish impact claims autonomously.

The selected provider may be self-hosted or managed. The team must evaluate
licensing, data retention, privacy, cost, latency, output quality, and
reproducibility before production use.

## 11. Observability and operations

Track: - API errors and latency. - Database errors and slow queries. -
Solution Lab gate denials, latency, failures, provider and model or agent
version, and output limits where available. - Queue backlog and retry counts if
background jobs are used. - Moderation activity and security-relevant events.
- Storage failures and upload rejections.

Avoid logging passwords, access tokens, private evidence, or unnecessary
personal data. Set retention limits and review access to production
logs.

## 12. Testing strategy

-   **Unit tests:** validation schemas, permissions, status transitions,
    Solution Lab gate enforcement, and output parsing.
-   **Database tests:** constraints, foreign keys, vote uniqueness, RLS
    policy behavior.
-   **Integration tests:** authenticated submissions, votes, evidence uploads,
    human validation, manual solution collaboration, and Solution Lab failures.
-   **End-to-end tests:** submit a report, confirm it from another
    account, propose a solution, and review a milestone.
-   **Security tests:** unauthenticated writes, cross-user access,
    moderator escalation, private storage access.
-   **Solution Lab evaluation:** faithfulness to validated context, usefulness,
    unsupported-claim rate, edit rate, safety, and task quality.
-   **Resilience tests:** provider unavailable, timeouts, malformed output,
    authorization bypass attempts, and database errors.

Use separate development and production Supabase projects. Apply schema
changes through version-controlled migrations, not undocumented manual
production edits.

## 13. Deployment environments

### Development

-   Local Next.js application.
-   Local Supabase CLI stack or dedicated development Supabase project.
-   Test data and mock Solution Lab responses.

### Staging

-   Separate Supabase project.
-   Preview deployment.
-   Restricted test accounts and non-sensitive test reports.
-   Solution Lab endpoint protected by authentication, authorization, and the
    validated-problem gate.

### Production

-   Production Supabase project with RLS and backups configured.
-   Next.js deployment with server-side secrets.
-   Optional authenticated Solution Lab provider connection.
-   Monitoring, rate limiting, security reporting, and tested recovery
    procedures.

## 14. Architecture decisions

  ---------------------------------------------------------------------
  Decision                           Rationale
  ---------------------------------- ----------------------------------
  Supabase/PostgreSQL as source of   Relational integrity, constraints,
  truth                              SQL, and RLS support the core
                                     domain.

  Next.js modular monolith           Simple to deploy and maintain
                                     during MVP development.

  Separate Solution Lab adapter      Makes providers replaceable and keeps
                                     generated work out of core workflows.

  Votes stored as rows               Provides auditability and reliable
                                     uniqueness enforcement.

  Separate Solution Lab run records  Preserves source content and generated
                                     output provenance.

  Separate status history            Makes validation decisions
                                     traceable.

  Private evidence storage           Reduces accidental exposure of
                                     sensitive material.

  Human-reviewed verification        Community popularity and generated output
                                     are not proof of truth.
  ---------------------------------------------------------------------

## 15. Implementation order

1.  Create the Supabase project and configure environment variables.
2.  Create versioned migrations for profiles, categories, problems,
    votes, and status history.
3.  Enable and test RLS before exposing tables to the browser.
4.  Build authentication, profiles, problem submission, search, and
    detail pages.
5.  Implement database-enforced voting.
6.  Add evidence storage and moderation workflows.
7.  Add solutions, contributors, milestones, and impact assessments.
8.  Add badges and notifications.
9.  Add validated-problem mission workspaces and GitHub-linked collaboration.
10. Optionally implement the Solution Lab adapter, validated-problem gate, and
    `solution_lab_runs` table.
11. Evaluate the selected provider and coding-agent safeguards on validated
    mission test cases.
12. Run security, accessibility, and end-to-end tests before the pilot.

## 16. Open decisions

Resolve these before production:

-   Which sign-in providers will be enabled at launch?
-   Which reports are public by default, and which require review before
    publication?
-   Can a user cast both a personal confirmation and a support vote on
    the same report?
-   Which geographic fields are necessary, and how will precise
    coordinates be protected?
-   Which validated status and contributor roles unlock the Solution Lab?
-   Which Solution Lab provider or self-hosted model meets privacy, licensing,
    cost, and quality requirements?
-   Which GitHub permissions may a coding agent receive, and which actions must
    always require human approval?
-   What evidence is required before a solution can be marked as having
    verified impact?
-   Who can moderate reports, award badges, and approve status
    transitions?

These decisions should be recorded as implementation issues or short
architecture decision records.

------------------------------------------------------------------------

**Summary:** ProblemSpot uses Next.js for the application and Supabase for
identity, relational data, storage, and access control. PostgreSQL constraints,
RLS, and human review protect voting integrity, validation, and user data.
Validated problems become open-source missions. A replaceable AI Solution Lab
may assist authorized contributors after validation, while manual
collaboration, review, and impact assessment remain authoritative.
