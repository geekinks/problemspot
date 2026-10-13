# ProblemSpot

**Report It. Validate It. Solve It.**

ProblemSpot is an open-source, AI-assisted community problem discovery
and validation platform. It helps people report challenges affecting
their communities, enables others to confirm and support those reports,
and connects developers, researchers, volunteers, and organizations with
opportunities to build solutions.

> **Core principle:** People define the problems. Communities validate
> the needs. AI assists the process. Contributors build the solutions.
> Communities measure the impact.

**Organization:** GeekInk Innovations Ltd\
**Initiative:** Hacktoberfest 2026 --- AI for Everyone\
**Repository:** `problemspot`\
**Proposed domain:** `problemspot.tech` (availability not verified)

------------------------------------------------------------------------

## Table of contents

-   [Why ProblemSpot?](#why-problemspot)
-   [How it works](#how-it-works)
-   [Key features](#key-features)
-   [AI approach](#ai-approach)
-   [Architecture](#architecture)
-   [Technology stack](#technology-stack)
-   [Getting started](#getting-started)
-   [Environment variables](#environment-variables)
-   [Database and migrations](#database-and-migrations)
-   [Security and privacy](#security-and-privacy)
-   [Project status](#project-status)
-   [Roadmap](#roadmap)
-   [Contributing](#contributing)
-   [Community and support](#community-and-support)
-   [License](#license)

## Why ProblemSpot?

Many community challenges remain invisible, are reported in disconnected
places, or never reach people who have the skills to help. Meanwhile,
developers can struggle to find well-described problems where their work
can make a real difference.

ProblemSpot aims to bridge that gap by providing a shared workflow to:

1.  Document real-world challenges.
2.  Gather community confirmations, support, and evidence.
3.  Organize reports and identify potential duplicates.
4.  Connect problems with people willing to develop solutions.
5.  Track progress and document real-world outcomes.
6.  Recognize the people who report problems and help solve them.

ProblemSpot is designed for communities everywhere, including
underserved communities where access to technology and technical
resources may be limited.

## How it works

1.  **Report:** A community member submits a problem, its location, who
    is affected, and optional evidence.
2.  **Validate:** Other people confirm that they experience the problem,
    express support, or contribute evidence.
3.  **Organize:** AI can suggest categories, summarize reports, and
    identify potential duplicates for human review.
4.  **Collaborate:** Developers, researchers, designers, volunteers, and
    partner organizations propose solutions.
5.  **Implement:** Contributors document milestones, prototypes,
    repositories, and deployments.
6.  **Measure impact:** The community and reviewers assess outcomes and
    recognize meaningful contributions.

### Community confirmation is not the same as verification

ProblemSpot distinguishes between:

-   **Personal confirmation:** "I experience this too."
-   **Community support:** "I support addressing this problem."
-   **Evidence review:** Supporting material has been examined.
-   **Verification:** An authorized reviewer has determined that
    sufficient evidence supports the stated problem.

Vote totals and AI predictions are not, by themselves, proof that a
claim is true.

## Key features

### Community problem reporting

-   Structured reports with titles, descriptions, categories, and
    locations.
-   Optional supporting photos, documents, and references.
-   Search, filtering, and problem status tracking.

### Community validation

-   Separate personal-confirmation and support votes.
-   Duplicate-vote protection enforced by the database.
-   Evidence contributions and review workflows.
-   Traceable status changes and moderation decisions.

### AI-assisted analysis

-   Suggested problem categorization.
-   Concise report summaries.
-   Candidate duplicate and related-report discovery.
-   Structured problem briefs for potential contributors.
-   Human review of important AI-generated suggestions.

### Community Impact Profiles

-   Public or private profile options.
-   Problem submission and contribution history.
-   Solution collaboration and implementation history.
-   Recognition badges for meaningful contributions.
-   Optional GitHub profile linking.

### Solution collaboration

-   Propose multiple solutions for a single problem.
-   Link repositories, prototypes, demos, and documentation.
-   Track contributors and implementation milestones.
-   Record evidence and assessments of outcomes.

## AI approach

AI is a supporting tool, not the authority on whether a community
problem is genuine.

The initial AI workflow is designed to help with: - Categorization. -
Summarization. - Duplicate detection. - Problem-brief generation.

The project plans to evaluate an open-weight Gemma model. A prototype
may run Gemma 4 on an Arduino UNO Q using a compatible local inference
runtime. Hardware capability, model licensing, memory requirements,
latency, and model quality must be validated before claiming production
readiness.

The application should remain usable for core reporting and voting if
the AI service is unavailable.

For each deployed model, document: - Exact model identifier and
version. - Model license or usage terms. - Runtime and setup
instructions. - Hardware and memory requirements. - Evaluation
methodology and known limitations.

## Architecture

ProblemSpot is designed as a modular Next.js application backed by
Supabase. Supabase provides authentication, PostgreSQL, and file
storage. A server-side AI adapter communicates with a separate inference
service.

``` mermaid
flowchart TD
    U[Community members and contributors] --> WEB[Next.js application]
    WEB --> AUTH[Supabase Auth]
    WEB --> API[Server Actions and Route Handlers]
    API --> DB[(Supabase PostgreSQL)]
    API --> STORE[Supabase Storage]
    API --> AI[ProblemSpot AI adapter]
    AI --> MODEL[Gemma inference service]
    MODEL --> UNO[Arduino UNO Q or secured host]
```

### Database entities

The proposed data model includes:

-   `profiles`
-   `categories`
-   `problems`
-   `problem_votes`
-   `evidence`
-   `problem_status_history`
-   `problem_relations`
-   `solutions`
-   `solution_contributors`
-   `solution_milestones`
-   `impact_assessments`
-   `badges`
-   `badge_awards`
-   `ai_analyses`
-   `moderation_actions`
-   `notifications` (optional)

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the detailed
architecture, entity relationships, RLS policy intent, API boundaries,
and deployment plan.

## Technology stack

  Layer                          Technology
  ------------------------------ ---------------------------------------------
  Web application                Next.js, React, TypeScript
  Styling                        Tailwind CSS
  UI components                  shadcn/ui
  Authentication                 Supabase Auth
  Database                       Supabase PostgreSQL
  File storage                   Supabase Storage
  AI integration                 Provider-independent server-side adapter
  Local AI prototype             Gemma 4 with a compatible inference runtime
  Potential inference hardware   Arduino UNO Q
  Testing                        Unit, integration, and end-to-end tests
  CI/CD                          GitHub Actions (planned)

Technology choices may evolve as the project is tested and developed.

## Getting started

> **Project status:** The Next.js app shell is available. Reporting,
> authentication, Supabase, and AI integrations are planned but are not
> required to run the landing page.

### Prerequisites

-   Node.js 20.9 or newer.
-   npm (or the package manager configured by the repository).
-   Git.
-   Optional for future features: a Supabase project and Gemma inference service.

### 1. Clone the repository

``` bash
git clone https://github.com/geekinks/problemspot.git
cd problemspot
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

The landing page runs without environment variables. For future integrations,
create a local environment file:

``` bash
cp .env.example .env.local
```

Add the values for your development environment. Never commit
`.env.local`.

### 4. Configure Supabase when implementing integrated features

1.  Create a Supabase project.
2.  Copy the project URL and publishable key into `.env.local`.
3.  Apply the repository's database migrations when they are available.
4.  Enable and test Row Level Security (RLS) policies before exposing
    application tables.
5.  Configure Storage buckets and policies for avatars and evidence.

### 5. Start the development server

``` bash
npm run dev
```

Open <http://localhost:3000>.

Development checks: `npm run typecheck`, `npm run lint`, `npm run
format:check`, and `npm run build`. Use `npm run format` to apply formatting.
To add a shadcn/ui component, run `npx shadcn@latest add button` (or another
component name). Shared UI primitives belong in `components/ui`; reusable
layout belongs in `components/layout`; feature code belongs in `features`.
The directories for future routes and modules remain empty until those
features are implemented.

## Environment variables

Example `.env.example`:

``` dotenv
# Supabase — safe to expose in the browser when using the publishable key
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

# Server-only secrets. Never expose these through NEXT_PUBLIC_* variables.
SUPABASE_SERVICE_ROLE_KEY=

# Optional server-side AI inference configuration
GEMMA_BASE_URL=
GEMMA_API_TOKEN=
```

Notes: - Use only the publishable/anon key in browser code, together
with RLS. - The service-role/secret key bypasses RLS and must remain
server-side. - Keep `GEMMA_API_TOKEN` server-side. - If the UNO Q is
reachable only over a private network, configure the server-to-server
connection accordingly. - Do not expose an unauthenticated model
endpoint to the public internet.

## Database and migrations

All database schema changes should be version-controlled in
`supabase/migrations/`. Avoid undocumented manual changes to production.

Recommended implementation order:

1.  Profiles and categories.
2.  Problems and status history.
3.  Votes and database uniqueness constraints.
4.  Evidence and Storage policies.
5.  Solutions, contributors, milestones, and impact assessments.
6.  Badges and recognition.
7.  AI analysis and moderation records.
8.  Notifications, if required.

Test RLS as different user roles, including unauthenticated users,
regular users, submitters, and moderators. Do not rely on frontend
checks alone.

## Security and privacy

ProblemSpot handles user-generated reports and potentially sensitive
community information. Security and privacy are core requirements.

-   Enable RLS on all tables exposed through Supabase APIs.
-   Enforce permissions in the database and trusted server-side code.
-   Never commit secrets or place service-role credentials in
    client-side bundles.
-   Keep sensitive evidence in private Storage buckets.
-   Validate uploaded files, sizes, and content types.
-   Avoid collecting unnecessary personal information or precise
    locations.
-   Provide anonymous public attribution where appropriate without
    bypassing moderation.
-   Rate-limit submissions, votes, uploads, and expensive AI requests.
-   Keep AI suggestions separate from original user reports.
-   Record moderation and verification decisions.
-   Publish privacy, moderation, and security-reporting policies before
    public launch.

For vulnerability reports, follow the instructions in
[`SECURITY.md`](SECURITY.md) when available. Please do not publish
exploitable security details in public issues.

## Project status

ProblemSpot is in the planning and early development stage. The
architecture and feature descriptions in this README describe intended
functionality and should not be interpreted as confirmation that every
feature is already implemented.

Contributions are welcome as the MVP takes shape. Issues and pull
requests should clearly distinguish implemented functionality from
proposals.

## Roadmap

-   [ ] Initialize the Next.js application and Supabase project.
-   [ ] Add authentication and community profiles.
-   [ ] Implement problem submission and discovery.
-   [ ] Implement community confirmation and support voting.
-   [ ] Add validation status history and moderation.
-   [ ] Add evidence uploads with private Storage policies.
-   [ ] Add AI-assisted categorization and summarization.
-   [ ] Evaluate Gemma 4 inference on Arduino UNO Q.
-   [ ] Add duplicate detection suggestions.
-   [ ] Add solution proposals and contributor attribution.
-   [ ] Add Community Impact Profiles and recognition badges.
-   [ ] Track implementation milestones and impact assessments.
-   [ ] Add automated tests, CI, and deployment documentation.
-   [ ] Run a community pilot and publish evaluation results.

## Contributing

We welcome contributions from developers, designers, researchers,
writers, community organizers, and people who understand local
challenges.

Potential contribution areas: - Frontend and accessibility. - Backend
and Supabase database design. - RLS policies and security testing. - AI
model evaluation and integration. - Documentation and tutorials. - Hausa
and other language support. - Community research and user testing. -
Moderation and responsible AI workflows.

Before contributing:

1.  Read [`CONTRIBUTING.md`](CONTRIBUTING.md) when available.
2.  Check existing issues and discussions.
3.  Start with a clearly scoped issue.
4.  Include tests for behavior changes.
5.  Never submit secrets, private personal information, or sensitive
    evidence.
6.  Explain the problem your change solves and how it was tested.

For AI-related contributions, include the model/runtime details,
licensing information, evaluation method, and known limitations.

## Community and support

ProblemSpot is an initiative associated with **GeekInk Innovations Ltd**
and the Hacktoberfest 2026 theme **AI for Everyone**.

As the community grows, add the project's official website, discussion
space, community guidelines, and contact details here.

Please be respectful and constructive. Contributors should receive
credit for both identifying important problems and helping implement
solutions.

## License

Choose and add an approved open-source license before the first public
release. MIT and Apache-2.0 are permissive options; GPL-3.0 is a
copyleft option. The maintainers should select the license that fits the
project's goals and add the full license text in `LICENSE`.

The application license does not automatically apply to third-party
models, datasets, user-submitted evidence, or other external assets.
Document their respective terms separately.

------------------------------------------------------------------------

**ProblemSpot --- Report It. Validate It. Solve It.**
