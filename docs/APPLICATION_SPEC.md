# ProblemSpot Application Specification

## Status

This document defines the intended MVP application. It is a build specification,
not a claim that the features already exist.

## Product statement

ProblemSpot helps communities report and validate real problems, then turns
verified needs into open-source missions where contributors can build, test,
and measure solutions together.

AI and coding agents are excluded from reporting and validation. The optional
AI Solution Lab is available only after human verification.

## MVP outcome

A community member can submit and track a problem; other people can confirm,
support, and add evidence; an authorized reviewer can record a transparent
decision; and contributors can turn a verified problem into accountable
open-source solution work.

**North-star metric:** validated problems that enter active solution development.

## User roles

| Role | Primary capability |
|---|---|
| Visitor | Discover public problems, missions, solutions, and profiles. |
| Authenticated member | Report, vote, follow, add evidence, and manage a profile. |
| Problem submitter | Edit permitted fields and track a submitted problem. |
| Contributor | Propose solutions, join teams, and update authorized work. |
| Mission steward | Maintain mission context and coordinate solution activity. |
| Reviewer | Assess evidence and record problem-validation decisions. |
| Moderator | Handle unsafe content, disputes, duplicates, and appeals. |
| Administrator | Manage roles, categories, policies, and system configuration. |

Roles are permissions, not self-selected profile labels. Apply least privilege.

## Non-negotiable product rules

1. Personal confirmation and general support are different actions.
2. Votes are signals, not verification.
3. Only authorized humans change validation status.
4. Original reports, evidence provenance, and status history are preserved.
5. Sensitive evidence is private by default.
6. A verified problem can become an open-source mission without AI.
7. The Solution Lab rejects unverified problems.
8. Generated work requires normal review, testing, and approval.
9. Impact claims identify their source and review level.
10. Recognition rewards reviewed quality and outcomes, not activity volume.

## Proposed information architecture

Routes may change during implementation, but user capabilities and boundaries
should remain stable.

| Area | Proposed route | Access | Purpose |
|---|---|---|---|
| Home | `/` | Public | Explain the value and show active community work. |
| Problems | `/problems` | Public | Search, filter, sort, and discover reports. |
| Problem detail | `/problems/[id]` | Visibility policy | Read context, evidence summary, votes, status, and history. |
| Report problem | `/report` | Member | Submit a structured problem. |
| Missions | `/missions` | Public | Discover verified problems ready for contributors. |
| Mission detail | `/missions/[id]` | Public/restricted | Review context, proposals, team, milestones, and outcomes. |
| Solution detail | `/solutions/[id]` | Public/restricted | Track a proposed or active solution. |
| Profile | `/profiles/[username]` | Visibility policy | Show reviewed contributions and impact. |
| Dashboard | `/dashboard` | Member | Track reports, followed work, contributions, and notifications. |
| Review queue | `/review` | Reviewer | Review reports, evidence, duplicates, and decisions. |
| Moderation queue | `/moderation` | Moderator | Handle reports, restrictions, disputes, and appeals. |
| Settings | `/settings` | Member | Manage profile, privacy, notifications, and account. |

## Functional modules

### 1. Authentication and profiles

Users can register, sign in, recover access, sign out, manage public fields,
choose profile visibility, link GitHub optionally, and request account deletion.

**Acceptance:** private identity data is never exposed through public profile
views, and users cannot grant themselves privileged roles.

### 2. Problem reporting

Required fields: title, description, category, appropriate location, affected
people, and consent to the reporting rules. Optional fields include evidence,
frequency, severity, estimated reach, desired outcome, and anonymous public
attribution.

**Acceptance:** invalid fields receive actionable messages; drafts survive
recoverable errors; submission creates a unique report and status-history entry.

### 3. Discovery

Visitors can search title and description; filter by category, location, status,
and solution activity; and sort by recent activity, confirmations, support, or
severity. Search and filters work together.

**Acceptance:** restricted data never appears in results, URLs, metadata, or
analytics.

### 4. Community participation

Members can choose “I experience this too,” “I support addressing this
problem,” follow a report, or contribute permitted evidence. Votes can be
withdrawn and are protected by database uniqueness constraints.

**Acceptance:** counts come from trusted records and the interface never calls
them proof.

### 5. Evidence and human validation

Reviewers assess completeness, provenance, relevance, contradictions, safety,
and policy. Decisions include needs information, evidence reviewed, verified,
disputed, merged, rejected, or closed. Every decision records a reason.

**Acceptance:** ordinary clients cannot change status, merge reports, or create
review history. Follow [VALIDATION_POLICY.md](VALIDATION_POLICY.md).

### 6. Open-source missions

A verified problem unlocks a mission workspace containing approved context,
constraints, open questions, outcomes, success criteria, people or skills
needed, proposals, contributors, repositories, milestones, and updates.

**Acceptance:** mission context does not overwrite the source report; manual
collaboration remains fully functional.

### 7. Solution collaboration

Contributors can propose multiple approaches, join authorized teams, link
repositories and artifacts, record milestones, request community testing, and
withdraw work with a reason.

**Acceptance:** implementation requires delivery evidence; acceptance and
status changes are authorized and auditable.

### 8. Optional AI Solution Lab

For verified missions only, contributors may request editable briefs, approach
comparisons, work plans, GitHub issues, documentation, test plans, or reviewed
coding assistance.

**Acceptance:** the server enforces the verification gate and source access;
the provider cannot validate problems, accept solutions, merge code, deploy, or
claim impact. Follow [SOLUTION_LAB_POLICY.md](SOLUTION_LAB_POLICY.md).

### 9. Impact and recognition

Solutions record implementation evidence, testing feedback, affected-user
feedback, limitations, and review level. Profiles credit meaningful reporting,
evidence, stewardship, building, testing, and reviewed outcomes.

**Acceptance:** self-reported, community-reviewed, and independently reviewed
outcomes remain distinguishable.

### 10. Notifications

Notify users about submission receipt, clarification requests, status changes,
new evidence or confirmations, mission creation, solution activity, milestones,
testing requests, and recognition. Users control non-essential notifications.

## Required interface states

Every data-driven screen needs loading, empty, success, validation-error,
permission-denied, dependency-failure, and retry states. Preserve user input
after recoverable failures. Explain when data is restricted rather than merely
showing an empty screen.

## Quality requirements

- Mobile-first and usable on limited bandwidth.
- WCAG 2.2 AA target.
- Server and database authorization; never UI-only security.
- Versioned migrations and tested RLS.
- Clear audit history for consequential actions.
- No secrets, private evidence, or unnecessary personal data in logs.
- Core reporting, validation, and collaboration operate without AI.

## Explicit MVP exclusions

- Emergency dispatch or government case management.
- Automatic truth scoring or AI validation.
- Financial rewards for reports or votes.
- Autonomous code merge or deployment.
- Guaranteed funding or implementation.
- Public exposure of restricted evidence or exact residential locations.

## Definition of done for a feature

A feature is complete when its acceptance criteria pass; authorization and
privacy are tested; loading, empty, error, and accessibility states exist;
documentation is current; telemetry avoids sensitive data; and the pull request
contains verification evidence.

