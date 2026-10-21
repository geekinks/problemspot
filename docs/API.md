# API Guide

## Status

These contracts describe the intended boundaries. Routes are not guaranteed to
exist until implemented and tested.

## Principles

- Authenticate and authorize every protected operation.
- Validate request and provider payloads with explicit schemas.
- Derive identity and authoritative counts on the server.
- Use consistent status codes and machine-readable errors.
- Apply rate limits to authentication, submissions, votes, uploads, reports,
  and Solution Lab requests.
- Never expose private evidence, internal moderation notes, or server secrets.
- Support idempotency for operations that may be retried.

## Proposed routes

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/problems` | Search and filter public problems. |
| `POST` | `/api/problems` | Submit a problem as the authenticated user. |
| `GET` | `/api/problems/[id]` | Read an authorized problem view. |
| `POST` | `/api/problems/[id]/votes` | Add or change the caller's vote. |
| `DELETE` | `/api/problems/[id]/votes` | Remove the caller's vote. |
| `POST` | `/api/problems/[id]/evidence` | Create authorized evidence metadata or an upload request. |
| `POST` | `/api/problems/[id]/solutions` | Propose a solution for an eligible problem. |
| `POST` | `/api/missions/[id]/solution-lab` | Request an optional task for a validated mission. |
| `POST` | `/api/reports` | Report content for moderation. |

## Response shape

Successful responses should return the requested resource or operation result.
Errors should use a stable shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request could not be completed.",
    "fields": {}
  }
}
```

Do not return stack traces, provider secrets, SQL details, or private review
information.

## Status codes

- `200` or `201`: successful read or creation.
- `204`: successful deletion without a body.
- `400`: invalid syntax or unsupported request.
- `401`: authentication required or invalid.
- `403`: authenticated but not authorized.
- `404`: missing resource or intentionally concealed resource.
- `409`: uniqueness, state, or idempotency conflict.
- `422`: well-formed request that fails domain validation.
- `429`: rate limit exceeded.
- `500` or `503`: sanitized internal or dependency failure.

## Solution Lab boundary

The server must load the authoritative problem status and verify `verified`
before creating a run. It must also authorize the requester and every source,
minimize provider payloads, validate output, and record the run. A failed or
disabled provider must not block manual mission collaboration.

## Versioning

Prefer additive changes during early development. Announce breaking contracts,
provide migration notes, and version public APIs before external consumers rely
on them.

