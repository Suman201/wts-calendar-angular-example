# Configuration guide

Start with the installation and options sections in [README.md](../README.md).
Use ISO-8601 values with explicit offsets for instants, set `timeZone`
deliberately, assign stable unique IDs, and enable only the feature entry points
your application uses.

Vertical resource views support `resource-day-grid-day`,
`resource-day-grid-week`, `resource-time-grid-day`, and
`resource-time-grid-week`. Set `datesAboveResources: true` for date-major
columns/headings; the default `false` uses resource-major columns/headings.

The v7-compatible structural class hooks are `tableClass`,
`tableHeaderClass`, `tableBodyClass`, `dayHeaderRowClass`,
`dayHeaderDividerClass`, `dayRowClass`, `slotHeaderClass`,
`slotHeaderRowClass`, and `slotHeaderDividerClass`.

Treat remote loaders, adapters, fetch functions, and HTML hooks as privileged
application code. Remote source URLs may be relative or HTTP(S), may not embed
credentials, and have fixed retry/result ceilings. Validate mutations on the
server even when client-side constraints reject them.
