# WTS Calendar plugin conformance

Local conformance CLI for independently packaged WTS Calendar plugins. It
validates compatibility metadata, conditional exports, packed contents, ESM,
CommonJS, strict TypeScript declarations, advanced factory construction,
event/source ingress, view switching, asynchronous destruction, and host
restoration.

```bash
wts-calendar-plugin-verify --package . --calendar ../calendar
```

The checked plugin package must declare `wtsCalendarPlugin` metadata:

```json
{
  "peerDependencies": { "@wts-calendar/core": ">=1.0.0 <3" },
  "wtsCalendarPlugin": {
    "export": "workflowPlugin",
    "core": ">=1.0.0 <3",
    "capabilities": ["views", "event-transform"],
    "maxPackedBytes": 100000,
    "conformance": { "pluginOptions": { "label": "Verified" } }
  }
}
```

This project remains private until the calendar reaches stable release. It is
used directly by the repository starter package and does not publish anything.
# Plugin author CLI

The package also ships `wts-calendar-plugin` for the complete author loop:

```bash
wts-calendar-plugin create ./my-calendar-plugin --name @acme/calendar-plugin
wts-calendar-plugin dev ./my-calendar-plugin
wts-calendar-plugin link ./my-calendar-plugin --consumer ./my-app
wts-calendar-plugin verify ./my-calendar-plugin
```

`create` produces strict TypeScript, compatibility metadata, conditional
exports, and a lifecycle-safe plugin skeleton. `dev` uses the plugin's watch
script, `link` connects it to a local consumer, and `verify` runs the existing
packed-size, API-compatibility, ESM/CommonJS, TypeScript, installation rollback,
listener, timer, and lifecycle checks.
