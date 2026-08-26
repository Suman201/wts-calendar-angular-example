# Developer tools

WTS Calendar ships normal/free developer tooling as explicit opt-in entries.
None of these entries requires a premium entitlement, and none is included in
the standard or `/all` production graph.

## Typed application data

`@wts-calendar/core/developer-tools` provides additive generic helpers without
changing the default `WtsCalendar` contract:

```ts
import {
  createTypedCalendar,
  defineCalendarEvent,
} from '@wts-calendar/core/developer-tools';

interface TicketProperties {
  ticket: number;
  owner: string;
}

const event = defineCalendarEvent<TicketProperties>({
  id: 'release',
  title: 'Release',
  start: '2026-08-24T10:00:00Z',
  extendedProps: { ticket: 42, owner: 'platform' },
});

const calendar = createTypedCalendar<TicketProperties>({
  container,
  events: [event],
  eventClick({ event }) {
    console.log(event.extendedProps?.ticket);
  },
});
```

`TypedCalendarResource`, `TypedCalendarOptions`, `TypedCalendarApi`,
`defineCalendarResource`, and `asTypedCalendar` support existing instances and
resource metadata. Defaults preserve the untyped application-data behavior.

## Headless configuration validation

`validateCalendarConfiguration()` checks configuration templates without
constructing a calendar or mutating the DOM. Reports contain stable codes,
precise paths, errors, warnings, and suggestions.

```ts
const report = validateCalendarConfiguration(config, {
  requireContainer: false,
});

for (const error of report.errors) {
  console.error(error.code, error.path, error.message);
}
```

`CALENDAR_OPTIONS_JSON_SCHEMA` can be used by editors, low-code builders, and
CI checks. Runtime construction remains the authoritative complete validator;
the headless validator intentionally focuses on portable structure, dates,
events, resources, duplicates, and plugins.

## Diagnostics and profiling

```ts
import {
  CalendarDevTools,
  collectCalendarDiagnostics,
  profileCalendarOperation,
} from '@wts-calendar/core/developer-tools';

const snapshot = collectCalendarDiagnostics(calendar);
const panel = new CalendarDevTools(calendar, {
  container: debugSidebar,
  pollIntervalMs: 1000,
});

const result = await profileCalendarOperation(
  'reload-events',
  () => calendar.refetchEvents(),
  { slowThresholdMs: 250, onSlow: console.warn },
);

panel.destroy();
```

Snapshots include lifecycle state, active range, event/resource/rendered/DOM
counts, plugins, pending work, source/cache state, history, and actionable
warnings. The panel uses text-only output and explicit cleanup. Import it only
in development builds or place the import behind the application's development
condition.

## Theme generation

`generateCalendarTheme()` converts typed theme tokens to CSS and reports
WCAG-style contrast warnings for hex color pairs. Values and selectors reject
unsafe CSS delimiters. `applyCalendarTheme()` applies tokens to an element and
returns an exact restore callback.

```ts
const generated = generateCalendarTheme({
  background: '#ffffff',
  text: '#111827',
  primary: '#155eef',
  primaryForeground: '#ffffff',
});

themeStyle.textContent = generated.css;
```

## Framework-native primitives

- React exports `useWtsCalendarController()` and the concurrent-render-safe
  `useWtsCalendarSnapshot(calendar)` hook.
- Vue exports `useWtsCalendarController()` and the reactive
  `useWtsCalendarSnapshot(calendarRef)` composable.
- Angular exports `WtsCalendarAngularController`, an optional signal-based
  controller accepted through the component's `controller` input.

These primitives expose the existing calendar rather than creating a second
instance. They are designed for application-owned editors, toolbars, filters,
pending indicators, and inspector panels.

## Plugin author CLI

`wts-calendar-plugin-conformance` now provides the complete author loop:

```bash
wts-calendar-plugin create ./calendar-plugin --name @acme/calendar-plugin
wts-calendar-plugin dev ./calendar-plugin
wts-calendar-plugin link ./calendar-plugin --consumer ./application
wts-calendar-plugin verify ./calendar-plugin
```

The generated package has strict TypeScript, ESM/CommonJS output, declarations,
explicit compatibility metadata, and lifecycle-safe cleanup. Verification
covers the packed artifact, size ceiling, API compatibility, TypeScript,
installation rollback, host restoration, views, listeners, timers, and cleanup.

