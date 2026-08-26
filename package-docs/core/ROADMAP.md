# WTS Calendar evidence-based roadmap

**Baseline date:** 2026-08-10
**Reference product:** FullCalendar 7.0.2, including documented Premium capabilities
**Current parity:** 70 / 70 capability points (**100%**)
**Current functional parity excluding ecosystem delivery:** 62 / 62 (**100%**)
**Ledger evidence date:** 2026-08-12

This roadmap replaces the previous maturity estimates. It measures progress
against a frozen, reviewable baseline instead of changing the denominator as
new gaps are discovered.

The target is a production calendar that can replace FullCalendar for most
documented scheduling workflows. API-level drop-in compatibility is not a
goal; developers should expect an explicit migration adapter or migration
guide.

## Measurement contract

The 70 capability families are derived from the official FullCalendar 7.0.2
documentation for standard views, custom views, event sources, interaction,
accessibility, and Premium resource scheduling:

- <https://fullcalendar.io/docs>
- <https://fullcalendar.io/docs/custom-views>
- <https://fullcalendar.io/docs/event-source>
- <https://fullcalendar.io/docs/accessibility>
- <https://fullcalendar.io/docs/premium>
- <https://fullcalendar.io/docs/resource-data>

Each capability receives one of these scores:

| Score | Meaning |
| ---: | --- |
| `0` | Missing |
| `0.25` | Prototype or materially unsafe/incomplete |
| `0.5` | Partial implementation or substantially narrower contract |
| `0.75` | Substantial implementation with a specific remaining gap |
| `1` | Verified equivalent for the documented capability family |

The score may increase only when all of the following exist:

1. Runtime implementation.
2. Public TypeScript contract.
3. Unit or DOM tests.
4. Required Chromium, Firefox, WebKit, keyboard, and touch coverage.
5. Public documentation and a working example.

A demo alone does not earn parity credit. WTS-only features are recorded as
advantages but do not increase FullCalendar parity. A FullCalendar version
upgrade creates a new comparison baseline; it must not silently alter this one.

## Verified baseline

### Capability ledger

| Area | Current | Current parity | Release target |
| --- | ---: | ---: | ---: |
| Views and layouts | 12 / 12 | 100% | 12 / 12 |
| Events, sources, recurrence, and time zones | 10 / 10 | 100% | >= 9.5 / 10 |
| User interaction | 10 / 10 | 100% | >= 9.5 / 10 |
| Resources and scheduling | 12 / 12 | 100% | >= 11.5 / 12 |
| Customization, API, and lifecycle | 10 / 10 | 100% | >= 9 / 10 |
| Accessibility and quality assurance | 8 / 8 | 100% | >= 7.5 / 8 |
| Ecosystem and delivery | 8 / 8 | 100% | >= 7 / 8 |
| **Total** | **70 / 70** | **100%** | **>= 67 / 70 (95.7%)** |

### Reproducible performance baseline

The comparison uses the same Chromium process, 1,280 x 760 calendar viewport,
5,000 equivalent events, one warm-up iteration, and five measured iterations.
Initial-display timing begins immediately before construction for both
libraries and ends after two animation frames; event generation and module
loading are outside the timed region. FullCalendar uses its documented Classic
theme.

| Workload | WTS median | FullCalendar median | Current result |
| --- | ---: | ---: | --- |
| Month initial display | 712 ms | 561 ms | WTS 1.27x slower; R1 1.5x budget passes |
| Month event update | 83 ms | 232 ms | WTS 2.80x faster |
| Day TimeGrid initial display | 349 ms | 1,020 ms | WTS 2.92x faster |
| Day TimeGrid event update | 301 ms | 439 ms | WTS 1.46x faster |
| Month mounted DOM nodes | 511 | 20,352 | WTS mounts fewer nodes |
| Day mounted DOM nodes | 167 | 25,328 | WTS mounts fewer nodes |

### Reproducible package baseline

The refreshed comparison uses FullCalendar 7.0.2 and the same esbuild 0.28.1,
Terser 5.43.1, ES2022, and gzip level 9 pipeline for both products. CSS is
included as separately compressed transport assets. See
[`docs/FULLCALENDAR-COMPARISON.md`](docs/FULLCALENDAR-COMPARISON.md) for the
fixtures, installed dependency closure, licensing, maturity, and capability
interpretation.

| Browser payload | JavaScript gzip | CSS gzip | Total gzip |
| --- | ---: | ---: | ---: |
| WTS standard | 99.86 KiB | 8.00 KiB | 107.86 KiB |
| FullCalendar standard with Classic theme | 78.84 KiB | 4.04 KiB | 82.87 KiB |
| WTS complete | 203.51 KiB | 8.00 KiB | 211.51 KiB |
| FullCalendar Scheduler plus data connectors | 140.31 KiB | 4.04 KiB | 144.35 KiB |

The current baseline contains 264 passing calendar package tests, eight passing
framework-adapter unit tests, and 477 passing browser tests with 91 intentional
platform skips. These counts are evidence, not a substitute for capability or
behavioral coverage.

### Toolbar, sizing, and themes gate

| Capability | Score | Verified contract |
| --- | ---: | --- |
| Toolbar | 1 / 1 | Header/footer composition, comma grouping, overrides, safe custom elements, icons/text display, year navigation, semantic titles, render classes, dynamic transactions, rollback, and accessibility |
| Sizing | 1 / 1 | Height, content height, aspect ratio, row expansion, sticky table headers, synchronized sticky footer scrollbar, ResizeObserver updates, and `updateSize()` |
| Themes | 1 / 1 | Preserved standard UI, five stock themes, light/dark/auto schemes, typed token overrides, dynamic rollback, and host-style restoration |
| **Slice total** | **3 / 3** | Package, Chromium, Firefox, WebKit, touch, Angular example, documentation, and lifecycle evidence pass |

The view/layout slice now earns 12/12 against the frozen capability ledger:
DayGrid day/week, named custom view definitions, validated custom durations,
and non-resource Timeline are implemented, typed, documented, demonstrated,
and exercised across Chromium, Firefox, WebKit, keyboard, and touch projects.
This does not mean the entire package has reached FullCalendar parity.

### Date, time, and locale gate

| Capability | Score | Verified contract |
| --- | ---: | --- |
| Date and time | 1 / 1 | Local/UTC/IANA zones, DST gaps and folds, wall-time calendar arithmetic, range callbacks, date navigation aliases, duration increments, programmatic scrolling, and instance/standalone date, range, and ISO formatting |
| Locale | 1 / 1 | Runtime `locale`, custom `locales`, built-in calendar text, `Intl` date text, locale-derived week starts, explicit overrides, localized hints/all-day/empty states, RTL, deprecated-alias compatibility, and Web Component forwarding |
| **Slice total** | **2 / 2** | Typed APIs, package tests, browser matrix, Angular example, documentation, dynamic rollback, and legacy compatibility pass |

### Event rendering and hooks gate

| Capability | Score | Verified contract |
| --- | ---: | --- |
| Event rendering | 1 / 1 | Calendar-wide and per-event display modes (`auto`, `block`, `list-item`, `background`, `inverse-background`, `none`), foreground/background colors, time labels, deterministic field/comparator ordering, recurring/background/resource placement, and strict dynamic updates |
| Event hooks | 1 / 1 | Static or functional class/content inputs, safe text/DOM content, complete immutable segment state, merged event classes, balanced mount/unmount, native click/hover callbacks, and shared behavior across standard and resource views |
| **Slice total** | **2 / 2** | Typed APIs, 245 package tests, Chromium/Firefox/WebKit/touch coverage, Angular example, documentation, dynamic rollback, and lifecycle evidence pass |

### View API, Calendar API, and lifecycle gate

| Capability | Score | Verified contract |
| --- | ---: | --- |
| View API | 1 / 1 | Immutable type/title/active/current range descriptor, calendar reference, compatible name aliases, custom visible ranges, active-range `datesSet`, view classes, and balanced mount/unmount hooks |
| Calendar API | 1 / 1 | Navigation and formatting aliases, `changeView`, `getView`, `getOption`, atomic option APIs, `render`, `rerenderEvents`, `updateSize`, batching, sources, events, resources, tasks, and Web Component forwarding |
| Lifecycle | 1 / 1 | Transactional initialization, bounded/coalesced rendering, exactly-once view teardown, tracked asynchronous hooks and plugin cleanup, idle accounting, idempotent synchronous/asynchronous destruction, host restoration, and failure aggregation |
| **Slice total** | **3 / 3** | Typed package conformance, custom-range tests, async lifecycle tests, Web Component forwarding, Angular example, and documentation |

The package retains the legacy string-valued `calendar.view`; the rich object
is `calendar.viewApi`. This compatibility naming difference is documented and
is not represented as literal drop-in source compatibility with FullCalendar.

### Clicking, hovering, and selection gate

| Capability | Score | Verified contract |
| --- | ---: | --- |
| Clicking | 1 / 1 | Date/time and resource `dateClick`, event activation with cancellable safe-URL navigation, immutable native-event payloads, keyboard activation, and legacy event compatibility |
| Hovering | 1 / 1 | Exactly-once native enter/leave callbacks with event element and active view across standard and resource renderers |
| Selection | 1 / 1 | Exclusive zoned ranges, pointer/keyboard/touch input, mouse distance, touch long-press with scroll cancellation, TimeGrid mirror, overlap/constraint/allow policies, automatic/cancelled unselection, resource payloads, and programmatic APIs |
| **Slice total** | **3 / 3** | Public types, package tests, Chromium/Firefox/WebKit/touch coverage, Angular example, documentation, callback cancellation, and legacy-option evidence pass |

## Delivery sequence

| Milestone | Outcome | Target parity | Relative effort |
| --- | --- | ---: | ---: |
| R0 | Lock measurement and CI evidence | 53 / 70 | 2-4 days |
| R1 | Fix performance and package efficiency | 53 / 70 | 2-4 weeks |
| R2 | Close standard view, interaction, and customization gaps | >= 58 / 70 | 4-7 weeks |
| R3 | Complete resource scheduling depth | >= 60 / 70 | 3-5 weeks |
| R4 | Add data and framework ecosystem parity | >= 65 / 70 | 5-8 weeks |
| R5 | Release qualification and compatibility commitment | >= 67 / 70 | 3-5 weeks |

Effort assumes one experienced engineer and includes implementation, tests,
documentation, examples, and review. It is a planning range, not a delivery
commitment. Parallel work may shorten elapsed time but does not reduce the
engineering effort or release gates.

## R0 - Measurement and CI truth

**Priority:** P0
**Purpose:** Make every future grade reproducible.

- [x] Add a versioned 70-item parity ledger under `docs/`, containing the
  FullCalendar documentation link, WTS implementation link, test link, score,
  and reason for every capability.
- [x] Store the identical FullCalendar/WTS browser benchmark in the repository
  rather than relying on one-off scripts.
- [x] Record median, p95, mounted event count, total DOM nodes, and heap growth
  for month and TimeGrid workloads at 100, 1,000, and 5,000 events.
- [ ] Run benchmarks on pinned hardware or a pinned CI runner and retain JSON
  artifacts for regression comparison.
- [ ] Make unit and browser test commands produce incremental output, a final
  machine-readable summary, and a hard timeout.
- [ ] Separate intentional platform skips from unsupported behavior.
- [ ] Add bundle-size reporting for core and every optional entry point.
- [ ] Publish the browser/version support matrix used by CI.

### R0 exit gates

- Two consecutive benchmark runs stay within 10% for each median.
- A clean checkout can build, test, benchmark, and package without manual steps.
- Every one of the 70 capability scores points to inspectable evidence.
- No roadmap percentage exists without a numerator and denominator.

## R1 - Performance and package efficiency

**Priority:** P0
**Purpose:** Remove measurable regressions before expanding the API.

- [ ] Profile month event normalization, date conversion, recurrence expansion,
  sorting, lane allocation, and segment generation independently.
- [x] Build visible-range indexes so month rendering does not repeatedly scan
  all 5,000 events for every day cell.
- [x] Cache immutable month sort/range metadata and invalidate it with event
  identity changes.
- [x] Preserve structural month DOM during event-only updates.
- [x] Limit continuation bookkeeping to rendered Month event nodes instead of
  querying the DOM once for every source event.
- [x] Cache Month event range metadata and static stylesheet generation, and
  remove repeated deferred label-height measurements.
- [ ] Add bounded recurrence expansion and source-level range caches.
- [ ] Generate a bundle metafile and assign every module to core, optional
  scheduling, recurrence, iCalendar, or adapter ownership.
- [ ] Ensure the core import cannot pull RRULE, iCalendar, repeated-task, or
  resource-scheduling implementations into an application bundle.
- [ ] Investigate a smaller Temporal loading boundary while preserving named
  time-zone and DST correctness.
- [ ] Remove duplicated view CSS and duplicated helper implementations without
  changing the default UI.
- [x] Add heap and detached-node checks around 100 create/render/update/destroy
  cycles at high event density.

### R1 performance budgets

- Month 5,000-event initial render: no more than **1.5x** the pinned
  FullCalendar median.
- Month and TimeGrid single-event update: no more than **1.25x** the pinned
  FullCalendar median.
- Day TimeGrid initial render: preserve the current FullCalendar advantage.
- WTS core bundle: **<= 110 KB gzip**.
- WTS complete bundle: **<= 220 KB gzip**.
- Capped month view: **<= 600 mounted DOM nodes** at 5,000 events.
- Capped day TimeGrid: **<= 250 mounted DOM nodes** at 5,000 overlapping events.
- No statistically significant heap growth after the lifecycle stress test.

R1 intentionally does not raise the feature-parity score. It raises confidence
that the existing features are production-safe.

## R2 - Standard views, interaction, and customization

**Priority:** P0/P1
**Purpose:** Close the largest standard FullCalendar workflow gaps.

- [x] Implement DayGrid day and DayGrid week layouts using the shared day-grid
  event, overflow, selection, drag, resize, and accessibility pipelines.
- [x] Add a typed custom-view registry with named view definitions.
- [x] Support arbitrary validated durations for DayGrid, TimeGrid, list, and
  non-resource timeline views.
- [x] Add a non-resource timeline facade over the shared timeline engine.
- [x] Add declarative header/footer toolbar sections, grouped/overridable
  buttons, custom elements, render classes, active state, and accessible hints.
- [x] Complete height, content-height, aspect-ratio, row expansion, sticky
  table-header, and synchronized footer-scrollbar sizing contracts.
- [x] Add documented theme contracts, five optional stock themes, light/dark/
  auto color schemes, and CSS-variable tokens without changing
  the existing default appearance.
- [x] Complete event hover/click lifecycle callbacks.
- [x] Add drag/resize start, stop, allow, drop, receive, leave, and failure
  hooks with exactly-once callback guarantees.
- [x] Add configurable drag distance, long-press delay, revert duration,
  autoscroll, drop acceptance, and selection distance.
- [ ] Complete more-link, popover, view, toolbar, and now-indicator render hooks.
- [ ] Complete resource cell, label, group, and column render hooks shared by
  all resource views.
- [ ] Document the WTS-to-FullCalendar option and callback mapping, including
  explicit unsupported mappings.

### R2 exit gates

- Capability ledger reaches at least **58 / 70** without reducing another area.
- Every new view passes the same source, recurrence, time-zone, accessibility,
  interaction, print, and lifecycle conformance suite.
- Pointer, touch, keyboard, and Escape cancellation produce one mutation and
  one public completion callback.
- No default UI decoration changes are introduced as a side effect.

### Drag, resize, and external-drag gate

| Workflow | Score | Evidence |
| --- | ---: | --- |
| Internal drag | 1 / 1 | Pointer, touch, keyboard, Escape cancellation, granular editability, constraints, allow/overlap checks, autoscroll, rich start/stop/drop/change callbacks, and resource movement. |
| Resize | 1 / 1 | Start- and end-edge resize, all-day/timed/resource paths, pointer/touch/keyboard cancellation, deltas, rollback, and exactly-once lifecycle callbacks. |
| External drag | 1 / 1 | Selector/predicate acceptance, delegated data, `create: false`, pointer/touch/keyboard input, custom mirrors, receive/leave/transfer/drop contracts, and rollback. |
| **Slice total** | **3 / 3** | Package tests and Chromium, Firefox, WebKit, and touch-browser interaction suites. |

This gate measures the standard drag/resize/external-drop workflow slice. It
does not claim complete FullCalendar product parity or cover premium resource
feature breadth.

## R3 - Resource scheduling completeness

**Priority:** P1
**Purpose:** Turn the strong resource foundation into documented Premium-view
parity.

- [ ] Add resource grouping by field independently from parent/child nesting.
- [ ] Add group ordering, group content, mount, and unmount hooks.
- [ ] Add resource ordering, filtering, and visible-resource APIs without
  mutating source data.
- [ ] Complete resource-area column grouping, per-column render hooks, and
  accessible resizing persistence.
- [ ] Add dates-above-resources and resources-above-dates layouts where they
  are meaningful.
- [ ] Complete timeline scale presets, multi-tier headers, zoom levels, and
  programmatic scroll-to-date/resource APIs.
- [ ] Add atomic resource batch mutations and transaction rollback.
- [ ] Verify business hours, availability, capacity, skills, roles, selection,
  drag, resize, and recurrence across nested and grouped resources.
- [ ] Keep two-axis virtualization correct with variable row heights, expanded
  groups, keyboard focus, live source updates, and print rendering.

### R3 exit gates

- Capability ledger reaches at least **60 / 70**.
- 1,000 resources and 5,000 events remain interactive inside documented
  performance budgets.
- Grouping, nesting, filtering, and source refresh preserve stable resource and
  event identities.
- All resource interactions have pointer, touch, keyboard, cancel, validation,
  and rollback coverage.

## R4 - Data and framework ecosystem

**Priority:** P1
**Purpose:** Address the largest current parity deficit: ecosystem delivery.

- [x] Add an optional Google Calendar event-source adapter with mapping,
  pagination, cancellation, error, and retry contracts.
- [x] Define locale packs for calendar-owned text, first-day defaults, week
  calculation, button labels, hints, and RTL metadata while continuing to use
  `Intl` for date formatting.
- [x] Build the Angular adapter first, with standalone components, signals or
  typed inputs, output events, SSR safety, and lifecycle cleanup.
- [x] Build React and Vue adapters after the Angular contract stabilizes.
- [x] Run one framework-neutral adapter conformance suite against Angular,
  React, Vue, and the Web Component.
- [x] Verify that adapter-only code does not enter the framework-agnostic core
  bundle.
- [x] Ship an open third-party plugin SDK with arbitrary package identities,
  custom view engines, namespaced options, and core-owned cleanup scopes.
- [x] Prepare a private plugin author starter, compatibility matrix, and
  packed-artifact conformance CLI for independently versioned plugins.
- [ ] Publish the plugin starter and conformance CLI after the stable calendar
  release gates pass.
- [ ] Publish framework examples for event sources, interaction validation,
  recurrence, resources, timeline, and licensed features.
- [x] Add migration guides from FullCalendar Vanilla, Angular, React, and Vue.

### R4 exit gates

- Capability ledger reaches at least **65 / 70**.
- All adapters expose the same option, event, lifecycle, and error semantics.
- Server-side import does not access `window`, `document`, or custom-element
  registries.
- Framework mount/unmount stress tests show no listener, observer, style, or DOM
  growth.
- Core bundle budgets remain satisfied when adapters are not imported.

## R5 - Production release qualification

**Priority:** P0 release gate
**Purpose:** Convert feature coverage into a supportable production contract.

- [ ] Complete manual VoiceOver/Safari and NVDA/Firefox or NVDA/Chrome test
  scripts for navigation, selection, popovers, event editing, resources, and
  interaction results.
- [x] Run automated WCAG checks for every view and the defined interaction-state matrix in
  Chromium, Firefox, and WebKit.
- [x] Add RTL and print visual regression baselines for all supported browser
  engines and primary views.
- [x] Perform a security review of trusted HTML hooks, remote sources, URLs,
  licensing inputs, drag payloads, and denial-of-service limits.
- [x] Define supported Node, browser, TypeScript, and framework versions.
- [x] Publish semantic-versioning, deprecation, security-reporting, and LTS
  policies.
- [x] Add npm package provenance, packed-artifact smoke tests, export checks,
  dependency audit, license inventory, and reproducible-build evidence.
- [x] Publish API reference, configuration reference, troubleshooting,
  performance guidance, accessibility statement, migration guides, and a
  versioned changelog.
- [ ] Complete at least one release-candidate cycle with external application
  integration feedback and no unresolved P0/P1 defects.

### R5 release gates

- Capability ledger reaches at least **67 / 70 (95.7%)**.
- No zero-score capability remains in views, data, interaction, resources,
  lifecycle, or accessibility.
- All R1 performance and bundle budgets pass on the pinned runner.
- Zero critical or serious automated accessibility violations.
- Zero unresolved P0/P1 correctness, security, lifecycle, or packaging defects.
- Public APIs are frozen for the documented major-version support window.

Meeting these gates means WTS Calendar is a credible FullCalendar replacement
for the documented supported workflows. It does not imply source-compatible or
API-compatible drop-in replacement behavior.

## WTS-specific advantages to preserve

These features do not increase parity points, but regressions are release
blocking:

- Transactional event mutations with async validation and idempotent rollback.
- Undo and redo history.
- `whenIdle()`, pending-operation accounting, and asynchronous destruction.
- Weighted resource capacity plus skill, role, event-type, and availability
  policies.
- Monthly and weekly repeated-task workspaces.
- Framework-neutral Web Component delivery.
- Optional recurrence, iCalendar, resource, and repeated-task entry points.

## Explicitly deferred work

The following should not interrupt R0-R2 unless required by a release-blocking
customer workflow:

- A bundled backend service. The package should provide stable REST/feed
  contracts and adapters, not own application data.
- Additional bespoke views that do not close a measured parity gap.
- Licensing tokenization, billing, or entitlement-server development.
- Cosmetic redesign of the example application or default calendar UI.
- Integrations beyond the documented FullCalendar baseline.

## Immediate implementation order

1. Profile and fix 5,000-event month preprocessing.
2. Reduce the core bundle to the R1 budget without weakening time-zone or DST
   correctness.
3. Make the complete test suite deterministic, time-bounded, and
   machine-readable.
4. Complete resource grouping, ordering, filtering, and render-hook contracts.
5. Complete more-link, popover, and now-indicator render lifecycles.
6. Finish pinned performance, heap, and bundle-budget qualification.

## Definition of done

A roadmap item is complete only when implementation, public types,
documentation, example integration, applicable unit/DOM/browser tests, package
exports, and performance checks are complete. Every score change must be made
in the capability ledger with linked evidence and reviewed as part of the same
change.
