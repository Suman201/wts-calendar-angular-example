# WTS Calendar versus FullCalendar

**Comparison date:** 2026-08-19

**WTS version:** `1.0.0`

**FullCalendar version:** `7.0.2` (Standard and Scheduler)
**Capability baseline:** FullCalendar v7 documentation, including Premium

## Executive result

WTS Calendar implements all 70 evidence-scored FullCalendar capability
families in the frozen baseline (100%). It is credible for the evaluated workflows, but it is not a
drop-in replacement and is not yet the safer general production choice.
FullCalendar has a smaller browser payload, is stable and more established, and
retains a substantial browser-payload and ecosystem-adoption advantage. WTS now
has an open, typed third-party plugin SDK for independently packaged view
engines, dependencies/conflicts, refined options, event transforms, toolbar
actions, and scoped installation/view lifecycle cleanup,
plus a packed-artifact conformance CLI and copyable author starter,
but does not yet have
FullCalendar's catalog or community adoption. WTS also
exceeds the baseline resource model with nested/derived grouping,
ancestor-preserving predicates, and per-column lifecycle hooks; it also has an
essentially equal complete installed footprint and useful
differentiators in transactional mutation handling, deterministic asynchronous
lifecycle APIs, a standards-based Web Component, iCalendar export, and repeated
task workflows.

## Comparable browser delivery

The current standard entries were bundled from npm ESM with esbuild `0.28.1`,
minified with Terser `5.43.1` using the production two-pass setting, targeted
to ES2022, and compressed with gzip level 9. Each product's Temporal polyfill
was external.
CSS was minified and measured as compressed transport files. WTS now delivers
its required standard stylesheet as one combined file while retaining smaller
per-view stylesheet exports.

The FullCalendar standard fixture includes `fullcalendar/all` and the Classic
theme. The FullCalendar complete fixture adds `fullcalendar-scheduler/all`,
Google Calendar, iCalendar, and RRULE. The WTS complete fixture uses
`@wts-calendar/core/all`, which also includes repeated-task workflows and
iCalendar export.

| Browser payload | JavaScript gzip | CSS gzip | Total gzip |
| --- | ---: | ---: | ---: |
| WTS standard | 92,711 B (90.54 KiB) | 8,190 B (8.00 KiB) | **100,901 B (98.54 KiB)** |
| FullCalendar standard | 80,729 B (78.84 KiB) | 4,133 B (4.04 KiB) | **84,862 B (82.87 KiB)** |
| WTS complete | 206,916 B (202.07 KiB) | 8,190 B (8.00 KiB) | **215,106 B (210.06 KiB)** |
| FullCalendar complete | 143,680 B (140.31 KiB) | 4,133 B (4.04 KiB) | **147,813 B (144.35 KiB)** |

WTS is now 18.9% larger for the comparable standard browser payload; its
JavaScript gap is 11,982 bytes gzip. The FullCalendar complete row is the prior
one-pass scheduler capture and remains directional until that separately
licensed fixture is recaptured with the two-pass setting. The complete payloads
are also not semantically identical: FullCalendar has no direct WTS repeated-
task equivalent, and its iCalendar plugin reads feeds rather than providing
WTS's import-and-export contract.

The 2026-08-19 reduction also moved MultiMonth/year/custom multi-month behind
the explicit `multi-month` entry, alongside the existing `time-grid`, `list`,
and `interaction` modules. `/all` and the Web Component entry enable them
automatically. No feature implementation was deleted. The production-equivalent
standard executable is 92,711 bytes gzip (90.54 KiB) and passes the enforced
100 KiB limit with 9,689 bytes of headroom; the complete executable is 206,916
bytes gzip against 220 KiB. Day and Week TimeGrid remain available through
`time-grid` and `/all`.

## Published and installed package footprint

Tarball values come from `npm pack` for the exact versions. Installed values
come from clean production-only npm installations and include the resolved
runtime dependency closure. Logical bytes are used rather than filesystem block
allocation.

| Artifact or installation | Bytes | Files | Installed packages |
| --- | ---: | ---: | ---: |
| WTS current RC packed artifact | 630,646 packed / 2,645,940 unpacked | 105 | — |
| FullCalendar Standard tarball | 430,625 packed / 2,173,769 unpacked | 413 | — |
| FullCalendar Scheduler add-on tarball | 114,955 packed / 624,583 unpacked | 31 | — |
| WTS clean production install | **Recapture required** | — | 3 |
| FullCalendar Standard clean install | **4,914,970** | 648 | 7 |
| FullCalendar complete clean install | **7,602,104** | 905 | 15 |

WTS uses fewer resolved packages. Its multi-entry ESM/CommonJS build shares
internal chunks and now minifies publishable artifacts without removing a
feature or changing a public import. The clean-install byte row must be
recaptured on the pinned runner after the plugin-SDK build; the previous value
is intentionally not reused. FullCalendar v7 uses many small shared chunks,
locales, and theme files.

## Capability comparison

Scores require implementation, a public TypeScript contract, automated
verification, required browser coverage, and documentation. They are not based
on demos or API-name similarity.

| Capability area | WTS score | Result against FullCalendar 7.0.2 |
| --- | ---: | --- |
| Views and layouts | 12 / 12 | Equivalent across the frozen families |
| Events, sources, recurrence, and time zones | 10 / 10 | Equivalent across the frozen families |
| User interaction | 10 / 10 | Equivalent across the frozen families |
| Resources and scheduling | 12 / 12 | Baseline complete; nested grouping, predicates, and per-column lifecycle extend it |
| Customization, API, and lifecycle | 10 / 10 | Equivalent across the frozen families |
| Accessibility and quality assurance | 8 / 8 | Automated equivalence is evidenced; manual AT sign-off remains an RC gate |
| Ecosystem and delivery | 8 / 8 | Open plugin SDK and one typed factory contract span Angular/React/Vue/Web Component adapters |
| **Total** | **70 / 70 (100%)** | **Frozen capability baseline complete** |

There is no remaining deficit in the frozen 70-family ledger. This does not
remove the separate release, maturity, manual-assistive-technology, performance,
or source-compatibility considerations below.

## Runtime evidence

The 2026-08-18 full local diagnostic at 5,000 events reports Month initial
render at 990.3 ms for WTS versus 682.2 ms for FullCalendar (1.45x), and Month
update at 159.2 ms versus 286.4 ms (1.80x faster). Day TimeGrid initial render
is 654.2 ms versus 1,136.8 ms (1.74x faster), while TimeGrid update is 560.2 ms
versus 513.9 ms (1.09x). WTS mounts 3 visible events and 167/153 total DOM
nodes; FullCalendar mounts 4,999 events and roughly 25,300 nodes in the same
fixtures. WTS passes all six runtime/DOM comparison budgets locally.

The identical benchmark source in `bench/browser-performance.mjs` also enforces
two-run stability and 100-cycle heap/lifecycle limits. WTS stability passes
locally; one lower-count FullCalendar diagnostic sample missed its reference-
only stability threshold. The lifecycle probes report zero retained calendars,
zero DOM/document/listener growth, +941,536 bytes Month heap, and +881,960 bytes
TimeGrid heap. Results remain provisional release evidence until the
pinned-runner JSON artifact is uploaded.

## API, framework, and migration position

Both products support Vanilla JavaScript plus Angular, React, and Vue. WTS also
ships an explicit Web Component entry. Resource DayGrid day/week layouts,
`datesAboveResources`, optional Moment/Luxon formatting plugins, FullCalendar
construction/view aliases, and the v7 table/day-row/slot-header class-hook names
are implemented and verified. Callback payloads, DOM structure, CSS, and plugin
configuration still require a deliberate migration; WTS does not claim binary
or universal source compatibility.

WTS-specific verified contracts include asynchronous validation with rollback,
undo/redo history, pending-operation accounting, `whenIdle()`, aggregated
`destroyAsync()` cleanup, iCalendar export, and repeated-task views. These are
useful differentiators beyond the parity score.

## Accessibility, licensing, and release maturity

- WTS targets WCAG 2.2 AA and has automated axe, keyboard, touch, RTL, print,
  forced-colors, reduced-motion, Chromium, Firefox, and WebKit coverage. Its
  keyboard contract goes beyond FullCalendar's documented tabbability baseline
  with roving grid navigation, keyboard range creation and event movement,
  capability-accurate `aria-keyshortcuts`, live interaction feedback, and focus
  recovery across rerendering and resource virtualization. VoiceOver and NVDA
  manual sign-off is still pending.
- FullCalendar v7 is a stable release with an established public plugin catalog and
  support offering. WTS now has a comparable extension mechanism, but not the
  catalog volume or adoption history. WTS is still `1.0.0`, with consumer-app, manual
  accessibility, pinned performance, and npm-side trusted-publisher evidence
  still open. Defect triage and repository metadata passed on 2026-08-12.
- Both standard packages state the MIT license. FullCalendar Scheduler is a
  separately licensed Premium product. The WTS repository is MIT, but its
  resource/repeated-task modules and the advanced resource-planning engine
  plus the interoperability and enterprise-workflow toolkits enforce separate
  entitlement checks;
  commercial terms
  and the entitlement distribution process must be finalized before stable
  publication.

## Decision

Choose FullCalendar today when the priorities are the smallest browser payload,
an established plugin catalog, API compatibility with existing FullCalendar
applications, and commercial
support. Installed complete-package footprint is effectively equal. Choose WTS
for controlled RC evaluation when its
transactional workflows, lifecycle guarantees, Web Component, iCalendar
export, or repeated-task features are important and the remaining RC gates are
acceptable.

WTS should not yet be advertised as universally better than or source-compatible
with FullCalendar. The defensible statement is: **100% evidence-scored capability
coverage across the frozen baseline with several WTS-specific advantages, an essentially equal installed
footprint, a larger browser payload, and incomplete stable-release evidence.**

## Sources

- FullCalendar v7 documentation: <https://fullcalendar.io/docs>
- FullCalendar 7.0.2 release: <https://github.com/fullcalendar/fullcalendar/releases/tag/v7.0.2>
- FullCalendar Premium capabilities: <https://fullcalendar.io/docs/premium>
- FullCalendar licensing: <https://fullcalendar.io/license>
- FullCalendar pricing: <https://fullcalendar.io/pricing>
- WTS evidence ledger: [CAPABILITY-LEDGER.md](CAPABILITY-LEDGER.md)
- WTS performance method and budgets: [PERFORMANCE.md](PERFORMANCE.md)
- WTS release gates: [RELEASE-CANDIDATE.md](RELEASE-CANDIDATE.md)
