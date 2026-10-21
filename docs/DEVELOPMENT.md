# Development Guide

## Current state

ProblemSpot is in early development. The landing-page shell runs locally;
Supabase, reporting, validation, mission, and Solution Lab features described in
the product documents may not yet be implemented.

## Requirements

- Node.js 20.9 or newer.
- npm matching the committed `package-lock.json`.
- Git.
- A development Supabase project or local Supabase stack only when working on
  integrated data features.

## Setup

```bash
git clone https://github.com/geekinks/problemspot.git
cd problemspot
npm install
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>. Do not commit `.env.local`.

## Environment variables

| Variable | Exposure | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser | Publishable key used with RLS. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Privileged jobs; bypasses RLS. |
| `SOLUTION_LAB_PROVIDER` | Server only | Optional provider identifier. |
| `SOLUTION_LAB_API_TOKEN` | Server only | Optional Solution Lab credential. |

Never expose a service-role key or provider token through a `NEXT_PUBLIC_*`
variable.

## Project layout

- `app/`: Next.js routes and layouts.
- `components/`: shared UI components.
- `lib/`: shared utilities and future service adapters.
- `docs/`: product, architecture, policies, and engineering guides.
- `.github/`: templates, ownership, and automation.
- `supabase/`: versioned migrations and local configuration when added.

Follow [ARCHITECTURE.md](ARCHITECTURE.md) for intended boundaries. Keep feature
code close together and avoid adding empty architecture prematurely.

## Required checks

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Run feature-specific tests when they exist. See [TESTING.md](TESTING.md).

## Working on a change

1. Find or open an issue describing the user or community need.
2. Agree on scope before large implementation work.
3. Create a focused branch.
4. Implement the smallest complete change.
5. Add or update tests and documentation.
6. Run the required checks.
7. Open a pull request using the repository template.

Do not use production credentials or real private evidence in development.

## Troubleshooting

- Delete generated build output only when necessary; do not remove user work.
- Confirm your Node.js version when installs or builds fail unexpectedly.
- Run `npm install` when `package-lock.json` changes.
- Check `.env.local` names without printing secret values.
- Ask in GitHub Discussions when the documented setup is insufficient.

