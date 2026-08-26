# Changelog

All notable changes are documented here. This project follows Semantic
Versioning.

## [1.0.0] - 2026-08-26

### Added

- Free opt-in `event-editor` entry with accessible dialog/drawer UI,
  transactional create/edit/duplicate/delete flows, recurrence scopes,
  resource/time-zone controls, typed custom fields, async validation,
  authorization, persistence conflict handling, and optimistic rollback.
- React, Vue, and Angular event-editor snapshot/controller helpers without
  adding the editor to adapter or standard runtime bundles.

- Nineteen canonical calendar views, modular premium entry points, resource
  scheduling, repeated tasks, remote sources, iCalendar, RRULE, Google Calendar,
  timezone support, keyboard interaction, RTL, print, and touch coverage.
- Runtime-only Google Identity Services connection for private calendars using
  short-lived in-memory access tokens, explicit user consent, and revocation.
- Fail-closed legal, package, reproducibility, security, accessibility,
  performance, provenance, and RC verification workflows.
- Optional `time-grid`, `list`, and `interaction` entry points. The `/all` and
  Web Component entries enable them automatically, preserving every feature
  while keeping the standard executable below 100 KiB gzip.
- Separately entitled `advanced-resource-planning` runtime entry with capacity
  heatmaps, split/rotating shifts, dependencies, substitutes, overbooking
  policy, demand forecasting, and timeline critical-path analysis.
- Separately entitled `premium-interoperability` entry with two-way Google
  Calendar, Microsoft 365, and CalDAV adapters; conditional writes; ICS diff
  and reconciliation; on-demand Moment/Luxon compatibility; and a
  FullCalendar configuration migration assistant.
- Separately entitled `enterprise-workflow` entry with configurable event state
  machines, multi-stage approval hooks, immutable hash-chained audit snapshots,
  deny-precedence field policies, optimistic/offline mutation queues, and
  transport-neutral adapters for customer-owned backends.
- Free opt-in developer entries for typed application data, headless
  configuration/schema validation, runtime diagnostics and DevTools, profiling,
  theme generation, deterministic test fixtures and drivers, and cached/retrying
  REST, GraphQL, storage, and WebSocket data adapters.
- React/Vue controller and snapshot primitives, an Angular signal controller,
  and a plugin author CLI covering scaffold, watch, local link, compatibility,
  packed size, rollback, and lifecycle verification.
- Scoped `@wts-calendar/core`, `@wts-calendar/react`, `@wts-calendar/vue`, and
  `@wts-calendar/angular` package identities under the `wts-calendar` npm
  organization.
- `llms.txt` discovery files, an AI integration guide, and credential guidance
  for safe API-key and OAuth configuration.

### Fixed

- Selective month-view event invalidation now updates changed events without
  forcing a full view rebuild.
- Weekly repeated-task custom buttons now execute the configured action.

### Security

- Remote source URLs allow only HTTP(S) and reject embedded credentials.
- Remote source retries, retry delays, response sizes, calendar pages, iCalendar
  input size, and recurrence expansion have explicit ceilings.
- Public Google Calendar keys use `X-Goog-Api-Key` and are excluded from request
  URLs; OAuth mode excludes the public key entirely.

### Release status

Version `1.0.0` is the first stable scoped-package candidate. It must be
published under npm tag `latest` only after every automated, manual
assistive-technology, pinned-runner, registry, and provenance gate documented
in `docs/RELEASE-CANDIDATE.md` is complete.

## [1.1.5] - Legacy unscoped release

The final `wts-calendar-v2` package published to npm. Its detailed historical change log
was not available in this workspace and is not reconstructed here.
