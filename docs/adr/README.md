# Architecture Decision Records

Architecture Decision Records (ADRs) explain important choices and their
trade-offs. Use an ADR for decisions that are expensive to reverse or affect
security, privacy, data models, public contracts, deployment, or multiple
features.

## Naming

Use sequential files:

```text
0001-short-decision-title.md
0002-next-decision.md
```

## Template

```markdown
# ADR-NNNN: Decision title

**Status:** Proposed | Accepted | Superseded | Rejected
**Date:** YYYY-MM-DD
**Decision owners:** Maintainer names or team

## Context

What problem, constraints, evidence, and risks require a decision?

## Decision

What will the project do?

## Alternatives considered

What credible alternatives were considered and why were they not selected?

## Consequences

What becomes easier, harder, safer, more expensive, or irreversible?

## Validation

How will the project verify that the decision works?

## References

Link issues, pull requests, research, or superseded ADRs.
```

## Process

Open a discussion or issue before a consequential ADR. Merge an accepted ADR
before or with the implementation. Do not rewrite accepted history; supersede
the old ADR with a new one and link both directions.

