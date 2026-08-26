# WTS Calendar third-party plugin starter

Copy this private package when starting an independently versioned WTS Calendar
plugin. It demonstrates every advanced extension surface while keeping package
imports side-effect free.

## Start a plugin

1. Copy this directory.
2. Replace the package name, plugin `name`, version, description, and author.
3. Keep `@wts-calendar/core` as a peer dependency and update both compatibility
   ranges together.
4. Remove `private: true` only after the renamed package passes verification.
5. Run `npm run plugin:verify` before every release candidate.

## Consumer usage

```ts
import { createPluginCalendar } from '@wts-calendar/core/plugin-sdk';
import { workflowPlugin } from '@wts-calendar/plugin-starter';

const calendar = createPluginCalendar({
  container,
  plugins: [workflowPlugin],
  pluginOptions: {
    '@wts-calendar/plugin-starter': {
      label: 'Delivery workflow',
    },
  },
  view: 'workflowBoard',
  headerToolbar: {
    start: 'prev,next',
    center: 'title',
    end: 'workflowReport,workflowBoard,month',
  },
});
```

The same `createPluginCalendar` function can be supplied through the
`calendarFactory` input/prop of the Angular, React, and Vue adapters or through
the Web Component's `calendarFactory` property.

## Conformance gate

`npm run plugin:verify` builds the package, packs the exact npm artifact, and
checks:

- compatibility metadata and peer dependency alignment;
- package size and exclusion of source, tests, scripts, dependencies, and
  environment files;
- ESM/CommonJS API agreement and frozen plugin identity;
- strict downstream TypeScript consumption;
- advanced factory construction with direct and source events;
- custom-view switching, asynchronous cleanup, and host restoration.

No publish command exists in this starter while it remains private.
