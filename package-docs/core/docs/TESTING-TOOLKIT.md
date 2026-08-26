# Testing toolkit

`@wts-calendar/core/testing` is a normal/free opt-in entry for deterministic unit,
integration, accessibility, and performance fixtures. It is excluded from
production entries.

```ts
import {
  CalendarTestDriver,
  assertCalendarEvent,
  awaitCalendarIdle,
  createCalendarTestClock,
  createMockEventSource,
} from '@wts-calendar/core/testing';

const clock = createCalendarTestClock('2026-08-24T00:00:00Z');
const source = createMockEventSource(events);
const calendar = new WtsCalendar({ container, eventSources: [source.loader] });

await awaitCalendarIdle(calendar);
const driver = new CalendarTestDriver(calendar);
driver.focus('[data-calendar-date="2026-08-24"]').key('ArrowRight');
assertCalendarEvent(calendar, 'release', { title: 'Release' });
```

The entry exports:

- Deterministic clock and ID generation.
- Event/resource factories.
- Seeded dense schedules.
- Nested resource trees.
- recurrence and DST-boundary fixtures.
- accessibility fixture events.
- cancellable mock event sources with request history.
- a DOM driver for click, focus, keyboard, event lookup, and idle waiting.
- view, event, and completed-destruction assertions.

Fixtures return isolated values and deterministic seeds so failures can be
reproduced exactly. Use `destroyAsync()` before `assertCalendarDestroyed()` when
the scenario includes asynchronous sources or cleanup.

