# ProblemSpot User Flows

These flows define expected behaviour and edge cases. They are suitable for
splitting into UI, API, database, test, accessibility, and documentation issues.

## Flow 1: Report a problem

```mermaid
flowchart TD
    A[Discover ProblemSpot] --> B{Signed in?}
    B -->|No| C[Sign in or create account]
    B -->|Yes| D[Open report form]
    C --> D
    D --> E[Describe problem, people affected, broad location]
    E --> F[Select category and optional evidence]
    F --> G[Review privacy and visibility]
    G --> H{Valid submission?}
    H -->|No| I[Show actionable errors and preserve input]
    I --> E
    H -->|Yes| J[Create report and status history]
    J --> K[Show receipt, share link, and next steps]
```

**Completion:** the user receives a stable report link and can track progress.

**Important edges:** unsafe evidence, duplicate-looking reports, restricted
location, upload failure, expired session, rate limit, and anonymous public
attribution.

## Flow 2: Confirm, support, follow, or add evidence

```mermaid
flowchart TD
    A[Open report] --> B[Read claim, evidence summary, and status]
    B --> C{Choose action}
    C --> D[I experience this too]
    C --> E[I support addressing this]
    C --> F[Follow updates]
    C --> G[Add evidence]
    D --> H[Authenticate if required]
    E --> H
    F --> H
    G --> H
    H --> I[Authorize and validate]
    I --> J[Persist trusted record]
    J --> K[Update state and explain what the action means]
```

**Completion:** the user's action is visible and reversible where policy allows.

**Important edges:** duplicate request, withdrawn vote, private evidence,
unsupported file, concurrent updates, and suspended account.

## Flow 3: Human review and validation

```mermaid
flowchart TD
    A[Reviewer opens queue] --> B[Check scope, safety, completeness]
    B --> C[Review evidence and provenance]
    C --> D[Check duplicates and conflicts]
    D --> E{Decision}
    E --> F[Needs more information]
    E --> G[Evidence reviewed]
    E --> H[Verified]
    E --> I[Disputed, merged, rejected, or closed]
    F --> J[Record reason and notify]
    G --> J
    H --> K[Record decision and unlock mission handoff]
    I --> J
    K --> L[Create contributor-ready mission context]
```

**Completion:** an auditable human decision exists. Only `verified` unlocks the
mission and Solution Lab gate.

**Important edges:** reviewer conflict, insufficient evidence, high-risk
allegation, restricted material, appeal, and merge attribution.

## Flow 4: Build an open-source solution

```mermaid
flowchart TD
    A[Contributor discovers mission] --> B[Review context and open questions]
    B --> C{Existing suitable proposal?}
    C -->|Yes| D[Request to join team]
    C -->|No| E[Draft solution proposal]
    D --> F[Receive authorized role]
    E --> G[Human review of proposal]
    G -->|Accepted| F
    G -->|Changes needed| E
    F --> H[Link repository and milestones]
    H --> I[Work through issues and pull requests]
    I --> J[Community testing and feedback]
    J --> K[Implementation evidence]
    K --> L[Impact assessment]
```

**Completion:** solution progress, contributors, decisions, evidence, and
limitations are visible at the appropriate access level.

**Important edges:** competing proposals, inactive team, unsafe approach,
repository permission failure, withdrawn solution, and failed community test.

## Flow 5: Use the optional AI Solution Lab

```mermaid
flowchart TD
    A[Contributor requests Solution Lab task] --> B{Problem verified?}
    B -->|No| C[Deny and explain verification requirement]
    B -->|Yes| D{Requester and sources authorized?}
    D -->|No| E[Deny without exposing restricted data]
    D -->|Yes| F[Create audited pending run]
    F --> G[Send minimum approved context]
    G --> H{Provider succeeds?}
    H -->|No| I[Record sanitized failure and offer manual path]
    H -->|Yes| J[Validate and label output]
    J --> K[Contributor reviews, edits, accepts, or discards]
    K --> L[Normal issue, PR, test, and approval workflow]
```

**Completion:** a reviewed artifact may enter ordinary collaboration; generated
output never becomes an automatic decision.

## Flow 6: Assess impact

```mermaid
flowchart TD
    A[Solution marked implemented] --> B[Submit delivery evidence]
    B --> C[Collect approved community feedback]
    C --> D[Record outcomes and limitations]
    D --> E{Review level}
    E --> F[Self-reported]
    E --> G[Community-reviewed]
    E --> H[Independently reviewed]
    F --> I[Publish clearly labeled assessment]
    G --> I
    H --> I
    I --> J[Update mission and contributor recognition]
```

**Completion:** users can distinguish delivery from impact and see who reviewed
the claim.

## Cross-flow requirements

- Authentication does not erase the user's intended destination.
- Unauthorized responses do not reveal whether restricted data exists.
- Every consequential action has a reason, actor, and timestamp.
- Notifications link to the relevant state and respect privacy.
- Keyboard and screen-reader users can complete every flow.
- Provider, storage, or notification failure does not corrupt core records.

