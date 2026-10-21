# AI Solution Lab Policy

## Purpose

AI and coding agents make software production faster. ProblemSpot uses them only
after people have established that a problem is real and worth investigating.
The Solution Lab is optional assistance for open-source contributors—not an
authority over communities, repositories, or impact.

## Access requirements

Every request must satisfy all of the following:

- The authoritative problem status is `verified`.
- The requester is authorized to contribute to the mission or solution.
- Every included source is approved for that requester and provider.
- The task supports solution research, planning, implementation, testing, or documentation.
- The platform records an auditable Solution Lab run.

The server must enforce these checks. Hiding a button is not authorization.

## Permitted tasks

- Draft an editable solution brief from approved mission context.
- Identify open questions, constraints, assumptions, and risks.
- Compare multiple technical and non-technical approaches.
- Suggest milestones, contributor roles, GitHub issues, and acceptance criteria.
- Draft documentation, tests, accessibility checks, or code for human review.
- Summarize approved feedback from solution testing.

## Prohibited tasks and powers

The Solution Lab must not:

- Submit, categorize, rank, moderate, validate, approve, reject, or verify problems.
- Decide which community deserves priority.
- Rewrite original reports or evidence.
- Contact affected people or external organizations autonomously.
- Accept a solution, merge code, deploy to production, or change status without
  explicit human authorization through the normal workflow.
- Treat generated content as evidence or publish an impact claim.
- access restricted data beyond the requester's permissions.

## Data handling

- Send only minimum-necessary, approved context.
- Exclude secrets, private identities, restricted evidence, and precise
  locations unless a documented legal and product basis explicitly allows use.
- Publish provider identity, model or agent version, retention behaviour, and
  data-sharing terms.
- Set retention limits for inputs, outputs, logs, and provider records.
- Support deletion where required by policy or law.

## Generated code and artifacts

Generated work must be labeled and reviewed like any other contribution. It
must pass repository checks, security review, licensing review, accessibility
requirements, and human approval. Contributors remain accountable for work they
submit, even when a model produced part of it.

## Audit record

Record the requester, problem, solution when applicable, task, provider, model
or agent version, source-context hash, status, sanitized error, output,
reviewer action, and timestamps. Do not retain raw sensitive prompts merely for
convenience.

## Evaluation and shutdown

Evaluate faithfulness, unsupported claims, privacy, usefulness, edit rate,
latency, cost, and failure modes. Maintainers may disable a provider or task
immediately when it creates unacceptable privacy, safety, licensing, quality,
or operational risk. Manual collaboration must remain available.

