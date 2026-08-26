# Third-party plugin SDK

WTS Calendar has an instance-local, typed extension ecosystem for independently
published npm packages. Registration has no global side effects. There are two
deliberate tiers:

- `WtsCalendar` from the package root accepts lightweight
  `CalendarExternalPlugin` objects that contribute custom view engines,
  defaults, namespaced options, and view-scoped lifecycle work.
- `createPluginCalendar` from `@wts-calendar/core/plugin-sdk` adds dependency and
  conflict resolution, option refinement, event transforms, toolbar actions,
  and calendar-scoped installation/cleanup. Keeping this orchestration in an
  optional entry prevents ecosystem machinery from increasing the standard
  browser bundle.

## Lightweight custom-view package

```ts
import type { CalendarExternalPlugin } from '@wts-calendar/core';

export const sprintPlugin = {
  name: '@acme/wts-sprint-plugin',
  version: '1.0.0',
  defaults: { label: 'Sprint' },
  views: {
    sprintBoard: {
      duration: { weeks: 2 },
      dateAlignment: 'week',
      buttonText: 'Sprint',
      createView({ container, date, range, pluginOptions, api, lifecycle }) {
        const root = container.ownerDocument.createElement('section');
        container.appendChild(root);
        const render = (activeDate: Date) => {
          root.textContent = `${(pluginOptions as { label: string }).label}: ` +
            `${api.getEvents().length} events at ${activeDate.toISOString()}`;
        };
        render(date);
        lifecycle.addEventListener(root, 'click', () => api.changeView('month'));
        return {
          refresh: render,
          destroy() { root.remove(); },
        };
      },
    },
  },
} satisfies CalendarExternalPlugin;
```

Consumers install the plugin package independently and configure it per
calendar:

```ts
new WtsCalendar({
  container,
  plugins: [sprintPlugin],
  pluginOptions: {
    '@acme/wts-sprint-plugin': { label: 'Team A sprint' },
  },
  view: 'sprintBoard',
  headerToolbar: { start: 'prev,next', center: 'title', end: 'sprintBoard' },
});
```

Plugin names must be unique package-style names. Plugins are resolved in their
declared array order. Duplicate names and attempts to replace built-in or
registered views fail before the calendar mutates its host.

Each view factory receives a core-owned lifecycle scope. Register listeners,
timers, animation frames, and cleanup through that scope so failed initialization,
view changes, and calendar destruction cannot retain plugin state. View
factories must return `refresh(date)` and may provide `destroy`,
`unmountEvents`, `cancelInteractions`, and `pauseNowIndicator`.

The public `CalendarPluginApi` intentionally exposes stable calendar operations
instead of internal renderer classes. Plugins can add views and namespaced
options without depending on private bundle structure.

## Full ecosystem package

Use the optional SDK when a plugin contributes behavior outside a view:

```ts
import {
  defineCalendarPlugin,
  type CalendarEcosystemPlugin,
} from '@wts-calendar/core/plugin-sdk';

export const workflowPlugin = defineCalendarPlugin({
  name: '@acme/wts-workflow-plugin',
  version: '1.0.0',
  dependencies: ['@acme/wts-foundation-plugin'],
  conflicts: ['@acme/wts-legacy-workflow-plugin'],
  defaults: { prefix: 'Workflow' },
  refineOptions(value) {
    const input = value as { prefix?: string } | undefined;
    return { prefix: input?.prefix?.trim() || 'Workflow' };
  },
  eventTransform(event) {
    return { ...event, title: `Workflow: ${event.title ?? ''}` };
  },
  toolbarActions: {
    report: {
      text: 'Report',
      hint: 'Report visible workflow events',
      click({ calendar }) {
        console.log(calendar.getEvents());
      },
    },
  },
  install({ lifecycle }) {
    const controller = new AbortController();
    lifecycle.addCleanup(() => controller.abort());
  },
} satisfies CalendarEcosystemPlugin);
```

The consumer supplies every dependency explicitly and creates the calendar
through the SDK:

```ts
import { createPluginCalendar } from '@wts-calendar/core/plugin-sdk';
import { foundationPlugin } from '@acme/wts-foundation-plugin';
import { workflowPlugin } from '@acme/wts-workflow-plugin';

const calendar = createPluginCalendar({
  container,
  plugins: [workflowPlugin, foundationPlugin],
  pluginOptions: {
    '@acme/wts-workflow-plugin': { prefix: 'Delivery' },
  },
  headerToolbar: { start: 'prev,next', center: 'title', end: 'report' },
});
```

Dependencies are topologically installed regardless of input order. Missing
dependencies, dependency cycles, declared conflicts, duplicate names, toolbar
collisions, invalid options, and invalid views fail transactionally. Event
transforms compose in resolved order for initial events, `addEvent()`,
`setEvents()`, initial event sources, and `addEventSource()`.

`install()` receives the calendar, the stable plugin API, the plugin's refined
options, and a lifecycle scope. The SDK reverses installation order during
destruction, awaits asynchronous cleanup in `destroyAsync()`, detaches scoped
listeners/timers on synchronous `destroy()`, and restores the host if any
installation hook fails.

## Framework and Web Component adapters

Every official adapter accepts the same typed `CalendarFactory`. Pass
`createPluginCalendar` at construction time; omitting it preserves the standard
core path and payload.

```tsx
<WtsCalendarReact
  calendarFactory={createPluginCalendar}
  initialOptions={{ plugins: [workflowPlugin, foundationPlugin] }}
/>
```

Angular uses `[calendarFactory]="createPluginCalendar"`; Vue uses
`:calendar-factory="createPluginCalendar"`. For a Web Component instance, set
the property before connecting it:

```ts
const element = document.createElement('wts-calendar');
element.calendarFactory = createPluginCalendar;
element.options = { plugins: [workflowPlugin, foundationPlugin] };
document.body.append(element);
```

The factory is construction-only in Angular, React, and Vue. The Web Component
reconstructs immediately if its per-element factory property changes while
connected.

## Author starter and conformance gate

The repository includes a copyable
[`@wts-calendar/plugin-starter`](../../wts-calendar-plugin-starter/README.md)
and the reusable
[`wts-calendar-plugin-conformance`](../../wts-calendar-plugin-conformance/README.md)
CLI. The starter remains private to prevent accidental publication before it is
renamed.

The author CLI also scaffolds strict plugins, starts their configured watch
script, links them to a local consumer, and runs the same conformance verifier:

```bash
wts-calendar-plugin create ./my-plugin --name @acme/my-plugin
wts-calendar-plugin dev ./my-plugin
wts-calendar-plugin link ./my-plugin --consumer ./my-app
wts-calendar-plugin verify ./my-plugin
```

```bash
npm --prefix projects/wts-calendar-plugin-starter run plugin:verify
```

The command builds and packs the plugin, then verifies the exact tarball through
ESM, CommonJS, strict downstream TypeScript, factory construction, direct and
source event ingress, custom-view switching, asynchronous cleanup, and host
restoration. Source files, tests, scripts, dependencies, and environment files
are rejected if they leak into the artifact.

| Plugin peer range | Supported calendar line | Status |
| --- | --- | --- |
| `>=1.0.0 <3` | WTS Calendar 2.x | Current verified contract |
| `<1.0.0` | Earlier prereleases | Unsupported |
| `>=3` | Future major versions | Requires a new plugin release and conformance run |

## Compatibility contract

- A plugin package should expose a frozen object created with
  `defineCalendarPlugin()` and declare `@wts-calendar/core` as a peer dependency.
- Plugin and toolbar names are public identifiers; changing them is a breaking
  change for the plugin package.
- Plugins may depend only on exported types and APIs, never `dist/chunks` or
  private renderer classes.
- The SDK resolves capabilities per calendar instance. Importing a plugin does
  not register it globally.
- ESM, CommonJS, and strict TypeScript consumers are verified from the packed
  tarball by the release gate.
- `wtsCalendarPlugin.core` must exactly match the package's
  `peerDependencies.@wts-calendar/core` range.
