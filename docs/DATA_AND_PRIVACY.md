# Data and Privacy Guide

## Principles

- Collect the minimum data needed for a defined purpose.
- Explain visibility before submission.
- Keep sensitive evidence private by default.
- Separate public identity from authorized internal accountability.
- Do not send community data to an AI provider merely because it is available.

## Data classes

| Class | Examples | Default handling |
|---|---|---|
| Public | Approved report summary, broad location, public profile fields | Public after applicable review. |
| Account-private | Email, recovery data, private profile settings | User and authorized operations only. |
| Restricted | Precise location, private evidence, moderation notes | Explicitly authorized reviewers only. |
| Secret | Service keys, tokens, credentials | Server-side secret storage only. |

## Reports and location

Use the least precise location that still makes the problem actionable. Do not
publish home addresses or coordinates tied to a person. Offer anonymous public
attribution without making moderation unaccountable.

## Evidence

- Explain allowed file types, purpose, viewers, and retention before upload.
- Store restricted evidence in private buckets using object paths.
- Validate content type, extension, size, and authorization.
- Use short-lived signed URLs for authorized access.
- Preserve provenance and consent information.
- Remove metadata such as embedded location when policy requires it.

## Solution Lab data

The server must enforce the validated-problem gate and access permissions.
Send only approved mission context. Exclude private identities, exact locations,
secrets, and restricted evidence unless an explicit documented basis allows it.
Disclose provider identity, retention, training use, and deletion behaviour.

## Retention and deletion

Define retention periods before production launch for accounts, drafts,
evidence, moderation records, audit logs, notifications, and Solution Lab runs.
Deletion may retain limited audit records where required for security, legal
compliance, attribution, or dispute resolution; document those exceptions.

## User controls

Where supported, users should be able to view and correct profile data, manage
visibility, remove optional content, request account deletion, and obtain an
export of their data. Deleting an account must not silently falsify public
history; use anonymization or retained attribution rules that were disclosed.

## Incidents

Restrict access, preserve necessary logs, rotate exposed credentials, assess
affected data, and notify maintainers immediately. Use [SECURITY.md](../SECURITY.md)
for vulnerability reporting.

