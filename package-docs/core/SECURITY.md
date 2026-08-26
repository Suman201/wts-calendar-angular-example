# Security policy

## Reporting a vulnerability

Do not disclose suspected vulnerabilities in a public issue. Use the source
repository host's private security-advisory channel. If that channel is not
available, contact the maintainer through the npm package profile and request a
private reporting address. Include the affected version, reproduction, impact,
and any suggested mitigation. Never include production credentials or personal
data.

Receipt should be acknowledged within three business days. The maintainer will
triage severity, coordinate a fix and advisory, and credit the reporter unless
anonymity is requested. No guaranteed remediation deadline is offered by this
open-source package.

## Supported versions

Security fixes are made for the current stable major and, during an active
release-candidate cycle, the current RC. Older majors may receive fixes only
when a separate LTS announcement says so. See [SUPPORT.md](./SUPPORT.md).

## Security assumptions

- Event titles, descriptions, URLs, and resource labels are untrusted data.
- `customHTML`, task icon HTML, callbacks, loaders, response adapters, and
  custom fetch implementations are trusted application code.
- Remote calendar sources are restricted to HTTP(S), reject embedded URL
  credentials, and are subject to retry, delay, page, and record ceilings.
- Premium license verification is local cryptographic entitlement checking; it
  is not an authorization boundary for application data.

The complete threat review and residual risks are in
[docs/SECURITY-REVIEW.md](./docs/SECURITY-REVIEW.md).
