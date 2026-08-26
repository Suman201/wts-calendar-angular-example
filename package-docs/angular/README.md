# @wts-calendar/angular

Official standalone Angular adapter for `@wts-calendar/core`. It creates the calendar only in the browser, keeps one core instance across input changes, exposes `getApi()`, and destroys the instance with the Angular view.

The peer range describes API compatibility, not a security recommendation.
Applications should use the newest patched Angular release supported by their
major line and monitor Angular security advisories.

AI-assisted integrations should start with [`llms.txt`](llms.txt) and the
[core documentation map](https://github.com/Suman201/angular-librerias-v-17/blob/main/projects/calendar/llms.txt).

```html
<wts-calendar-angular
  [initialOptions]="{ view: 'month', selectedDate: today }"
  [calendarFactory]="createPluginCalendar"
  [events]="events"
  [options]="dynamicOptions"
  (ready)="calendarReady($event)"
/>
```

Import `WtsCalendarAngularComponent` from `@wts-calendar/angular` in the
standalone host component's `imports` array.

Import `createPluginCalendar` from `@wts-calendar/core/plugin-sdk` in the host
component when advanced third-party plugins are needed; omit the input for the
standard core. `initialOptions` and `calendarFactory` are construction-only.
`options` is applied through the core transactional `setOptions()` API;
`events` and `resources` use their dedicated collection APIs. During Angular
SSR the component renders its host without constructing a DOM calendar.
# Signal controller

Create a `WtsCalendarAngularController` and pass it through `[controller]` when
application-owned UI needs the same calendar instance. Its `calendar` and
`ready` signals update on component mount and teardown; `getApi()` remains
available for imperative integrations.

`WtsCalendarAngularEventEditorController` provides the equivalent signal bridge
for a free opt-in `CalendarEventEditor`. Bind the editor once, consume its
`snapshot` signal, and clear it during application-owned teardown.
