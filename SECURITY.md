# Security Policy

ProblemSpot takes the security and privacy of its users and community reports seriously. This policy explains which versions receive security fixes and how to report a vulnerability responsibly.

## Supported Versions

ProblemSpot is under active development. Until stable releases and a formal support policy are published, security fixes are generally prioritized for the latest version on the default branch.

| Version | Security updates |
| --- | --- |
| Latest version on the default branch | Best effort |
| Older versions and forks | Not guaranteed |

This policy will be updated as the project establishes formal releases and maintenance commitments.

## Reporting a Vulnerability

**Please do not report security vulnerabilities in public issues, discussions, pull requests, or social media.** Public disclosure before a fix is available can put users and their data at risk.

Use the repository's GitHub **Private vulnerability reporting** feature, if it is enabled, or contact the maintainers through a verified private security contact published in the repository or on the official project website.

When submitting a report, include as much of the following as you can safely share:

- A clear description of the vulnerability and its potential impact.
- The affected component, route, API, or version.
- Reproduction steps or a minimal proof of concept.
- Any required permissions or conditions for exploitation.
- Relevant logs or screenshots with secrets and personal data removed.
- A suggested mitigation, if you have one.

Please avoid attaching real user reports, private evidence, credentials, access tokens, or other sensitive data. Use synthetic examples whenever possible.

### What to expect

The maintainers will make a reasonable effort to:

1. Acknowledge receipt of a report.
2. Assess its severity, scope, and reproducibility.
3. Coordinate a fix or mitigation with the relevant contributors.
4. Communicate status updates where a private contact method is available.
5. Coordinate disclosure after a fix or mitigation is available, where appropriate.

ProblemSpot is an evolving community project, so response times are not guaranteed. Please allow maintainers reasonable time to investigate before sharing details publicly.

## Scope and Examples

Reports are especially useful when they identify a realistic security impact, such as:

- Authentication bypass or account takeover.
- Broken authorization or Supabase Row Level Security (RLS) policies.
- Unauthorized access to private problem evidence, profile data, or moderation records.
- Exposure of Supabase service-role keys, Solution Lab provider tokens, or other secrets.
- SQL injection, cross-site scripting (XSS), or other exploitable input-handling issues.
- Insecure file uploads or storage access.
- Vote manipulation or abuse that bypasses server-side or database integrity controls.
- Server-side request forgery (SSRF) or unsafe handling of external URLs.
- Sensitive information disclosed through logs, errors, or Solution Lab provider requests.

The following are generally not security vulnerabilities on their own, although they may still be useful product feedback:

- Findings without a credible security impact.
- Issues that require access the reporter does not have and cannot realistically obtain.
- Automated scanner output without a demonstrated impact.
- Social engineering, physical attacks, or denial-of-service testing against live systems without prior written authorization.
- Vulnerabilities in third-party services that are outside ProblemSpot's control; report those to the relevant provider as well.

This scope is illustrative, not exhaustive. If you are unsure, contact the maintainers privately.

## Safe Testing and Responsible Disclosure

- Test only systems you own or have explicit permission to assess.
- Use local development or staging environments whenever possible.
- Do not access, alter, delete, or retain another person's data.
- Do not disrupt services, degrade availability, or perform high-volume testing against live infrastructure.
- Do not use a vulnerability to access additional data or escalate privileges beyond what is necessary to demonstrate the issue.
- Stop testing and report the issue if you encounter real user data or a production secret.
- Give maintainers a reasonable opportunity to investigate and address the issue before public disclosure.

Good-faith security research conducted within these guidelines is appreciated. This policy does not grant permission to test systems owned by third parties or override applicable law or service terms.

## Security Design Expectations for Contributors

When contributing code:

- Keep secrets and privileged credentials on the server; never expose
  service-role keys or Solution Lab provider tokens to browser code.
- Keep Supabase Row Level Security enabled for tables accessible through client-facing APIs, and test both permitted and denied access.
- Enforce authorization on the server and, where appropriate, with database constraints and RLS—not only in the UI.
- Validate and constrain untrusted input, uploaded files, external URLs, and
  Solution Lab output.
- Apply least-privilege access and avoid collecting unnecessary personal information.
- Keep private evidence private and make storage permissions explicit.
- Avoid logging credentials, private reports, or sensitive user content.
- Add regression tests for security fixes when practical.
- Review new dependencies and document security-sensitive architecture changes.

Solution Lab briefs, plans, issues, documentation, and generated code are
untrusted outputs. The lab must reject unvalidated problems, respect evidence
permissions, and never bypass authorization, pull-request review, testing,
moderation controls, or the community's validation process.

## Secrets and Accidental Exposure

If you accidentally commit a secret:

1. Revoke or rotate the exposed credential immediately.
2. Notify the maintainers privately.
3. Remove the secret from the code and configuration, and follow the repository's documented cleanup process.
4. Review relevant logs and access activity where possible.

Deleting a secret from the latest commit does not necessarily remove it from Git history or invalidate it. Rotate the credential first.

## Contact and Policy Updates

Use the repository's verified private vulnerability-reporting mechanism or the security contact published by the maintainers. Do not invent or rely on an unverified email address.

The maintainers may update this policy as ProblemSpot's release process, infrastructure, and security practices mature.
