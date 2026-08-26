# Performance budgets

Release qualification runs `benchmark:month` and `benchmark:time-grid` after a
production build. The fixtures measure dense rendering and targeted update
costs using the same deterministic data on each run. A regression is actionable
when it exceeds the threshold encoded by the benchmark or materially worsens
the recorded baseline on equivalent hardware.

For applications, keep stable event/resource IDs, update only changed records,
bound visible ranges, paginate remote resources, and prefer virtualized resource
views for large row sets. Profile custom render hooks separately because their
cost is application code and is not covered by package budgets.

`npm run benchmark:browser` is the identical browser comparison against pinned
FullCalendar 7.0.2. It records two consecutive runs, five measured samples after
a warm-up per run, median, p95, mounted events, total DOM nodes, and CDP heap/DOM
counters for Month and TimeGrid at 100, 1,000, and 5,000 events. The lifecycle
fixture performs 100 create/update/destroy cycles with 1,000 events per cycle.
Five unmeasured lifecycle cycles warm caches before the heap baseline. The gate
also requires zero live `WeakRef` targets for destroyed calendars and an empty
static instance registry, so an observer/listener retainer cannot hide behind a
byte threshold.
Two-run stability requires no more than 10% relative median drift, with a
one-frame (16.67 ms) absolute floor because every sample deliberately includes
two animation-frame waits. WTS stability is release-enforced. FullCalendar
stability is retained separately as diagnostic reference evidence and cannot
veto the WTS gate.
Only `npm run benchmark:pinned` with `WTS_PINNED_RUNNER=1` may enforce and label
release evidence. Before measurement, the command compares the actual OS,
architecture, Node.js, and Chromium versions with `bench/pinned-runner.json`;
any mismatch fails instead of producing nominally pinned evidence. The runner
may be local and does not require a CI job. Unpinned local results remain
diagnostic and carry `"pinned": false`.

The 2026-08-26 verified local pinned run (macOS 24.3.0 x64, Node 23.9.0,
Chromium 151.0.7922.34) passes all six 5,000-event comparison/DOM budgets, all
WTS stability checks, both lifecycle/heap gates, and the reference stability
checks. Month initial render is 1,024.9 ms against a 1,077.45 ms maximum; its
update is 166.8 ms against 377.25 ms. TimeGrid initial render is 655.8 ms
against FullCalendar's 996.8 ms, and its update is 555.0 ms against a 586.88 ms
maximum. WTS mounts 167 Month DOM nodes and 153 TimeGrid DOM nodes. Across 100
measured cycles after five warm-ups, Month grows 956,676 bytes and TimeGrid
grows 891,568 bytes, with zero retained calendars and zero
DOM/document/listener growth in both views.

The complete enforced evidence is in `artifacts/performance-report.json`. It
records `"pinned": true`, `"pinVerified": true`, and `"ci": false`; no CI job
is required for this local qualification method.

## Bundle budgets

Run `npm run bundle:check` on the locked package toolchain. The gate bundles
the source with esbuild, applies the same source transforms used by Rollup,
minifies with the pinned Terser version and measures gzip level 9 output.
`@js-temporal/polyfill` remains an external runtime dependency.

The enforced executable budgets are 100 KiB gzip for the standard entry and
220 KiB gzip for the all-features entry. `styles/calendar.css` is one combined
required transport file; six smaller core/view files remain available for
selective loading. CSS package bytes are recorded separately in
`artifacts/bundle-report.json` and are not silently counted as JavaScript.

Run `npm run bundle:check` from the reviewed lockfile and retain the generated
local `artifacts/bundle-report.json` as the bundle evidence. This deterministic
gate does not require a CI job.

## Package footprint budgets

`npm run package:smoke` also fails if the publishable tarball exceeds 800,000
bytes packed or 4,200,000 bytes unpacked. The 2026-08-18 shared-chunk build
measures 610,999 bytes packed and 2,554,987 bytes unpacked. These limits protect
the multi-entry ESM/CommonJS deduplication independently of browser bundle
budgets.
