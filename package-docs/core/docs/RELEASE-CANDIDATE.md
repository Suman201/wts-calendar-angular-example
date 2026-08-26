# Release-candidate qualification

Candidate: `@wts-calendar/core@1.0.0`

Target npm tag: `latest`

Qualification date: 2026-08-26

## Automated gates

Run `npm run release:check` from this directory. It must pass TypeScript, unit,
browser/assistive-rule, visual, performance, legal inventory, two-build
reproducibility, packed-tarball allowlist, ESM/CJS/export consumer smoke, and
release metadata checks. It also builds and verifies the reference third-party
plugin from its packed artifact, including compatibility metadata, ESM/CJS,
strict declarations, behavior, rollback, and lifecycle cleanup. CI additionally runs `npm audit --audit-level=high`
and `npm audit signatures` with current registry metadata.

The publishing workflow runs only when a Git tag matching
`wts-calendar-core-v<package version>` is pushed. It does not create or require a
GitHub Release. The public GitHub-hosted runner uses OIDC `id-token: write`;
prereleases use `next` and stable versions use `latest`. Version `1.0.0` is a
stable candidate and remains unpublished until every publication-blocking
sign-off is true.

## Qualification evidence

| Gate | Owner / evidence | Status |
| --- | --- | --- |
| VoiceOver + Safari script | Tester record in `docs/ACCESSIBILITY.md`; post-publication compatibility evidence, not a publication gate | **Pending / no compatibility claim** |
| NVDA + Firefox script | Tester record in `docs/ACCESSIBILITY.md`; post-publication compatibility evidence, not a publication gate | **Pending / no compatibility claim** |
| NVDA + Chrome script | Tester record in `docs/ACCESSIBILITY.md`; post-publication compatibility evidence, not a publication gate | **Pending / no compatibility claim** |
| Consumer application 1 | [`docs/CONSUMER-VALIDATION.md`](CONSUMER-VALIDATION.md): React clean packed scoped install, build, runtime, findings, and approval | **Passed 2026-08-26** |
| Consumer application 2 | [`docs/CONSUMER-VALIDATION.md`](CONSUMER-VALIDATION.md): Vue clean packed scoped install, build, runtime, findings, and approval | **Passed 2026-08-26** |
| P0/P1 defect triage | [`docs/DEFECT-TRIAGE.md`](DEFECT-TRIAGE.md): authenticated live query against the configured repository, reviewed source, and invalidation rule; zero open P0/P1 issues | **Passed 2026-08-26** |
| Capability ledger | [`docs/CAPABILITY-LEDGER.md`](CAPABILITY-LEDGER.md), 70 numbered/evidenced rows, verifier-enforced score **70/70** | **Passed 2026-08-12** |
| Performance and bundle budgets | Identical WTS/FullCalendar 7.0.2 benchmark is stored and enforced. The 2026-08-26 exact local runner pin passed all six comparison/DOM budgets, all stability checks, and both 100-cycle heap/lifecycle gates; the report records the verified OS/Node/Chromium fingerprint | **Passed 2026-08-26** |
| Exact public repository URL | `repository.url`, monorepo directory, homepage, and bugs URL match the local Git remote; public visibility is required for provenance | **Pending: anonymous GitHub API returns 404** |
| Wrapper build dependency audit | Core and root production audits both report 0 vulnerabilities after upgrading the wrapper/application harness to Angular 21.2.x and Express 4.22.2 | **Passed 2026-08-26** |
| npm trusted publisher | [`docs/TRUSTED-PUBLISHING.md`](TRUSTED-PUBLISHING.md) and tokenless OIDC workflows encode exact claims for all four packages; new packages require a gated bootstrap before trust can be attached | **Blocked on owner reauthentication and first-package bootstrap** |

No pending row may be represented as completed without dated evidence. The
manual screen-reader rows do not block publication and must remain described as
untested until observed. Pending publication gates still block `latest`. The
npm-side trusted-publisher proof blocks tokenless publication until npm has
accepted the exact OIDC claims.

## Rollback

Do not overwrite a published version. Deprecate a defective RC, fix forward to
the next `-rc.N`, and keep `latest` unchanged. For a stable incident, follow the
security policy, publish a patched version, and deprecate the affected version
with a concise install warning.
