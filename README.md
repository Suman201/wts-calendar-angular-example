# WTS Calendar Angular example

A complete Angular 22 example for the official [`@wts-calendar/angular`](https://www.npmjs.com/package/@wts-calendar/angular) adapter and framework-agnostic [`@wts-calendar/core`](https://www.npmjs.com/package/@wts-calendar/core) package.

The example demonstrates:

- standalone Angular component integration;
- controller-driven date navigation and view switching;
- reactive event and option inputs;
- live theme and weekend controls;
- date and event click callbacks;
- lifecycle-safe calendar ownership through the Angular adapter.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Production build

```bash
npm run build
```

## Test

```bash
npm test -- --watch=false
```

## Minimal integration

Install both published packages:

```bash
npm install @wts-calendar/core @wts-calendar/angular
```

Import the adapter in a standalone Angular component:

```ts
import { Component } from '@angular/core';
import { WtsCalendarAngularComponent } from '@wts-calendar/angular';
import type { CalendarEventInput } from '@wts-calendar/core';

@Component({
  selector: 'app-calendar',
  imports: [WtsCalendarAngularComponent],
  template: `
    <wts-calendar-angular
      [initialOptions]="{ view: 'month', viewDate: '2026-08-01' }"
      [events]="events"
    />
  `,
})
export class CalendarExample {
  readonly events: readonly CalendarEventInput[] = [
    {
      id: 'planning',
      title: 'Planning',
      start: '2026-08-04T10:00:00',
      end: '2026-08-04T11:00:00',
    },
  ];
}
```

Import the production stylesheet once in the application’s global styles:

```scss
@import '@wts-calendar/core/styles/calendar.css';
```

## Package documentation

The repository includes a local copy of every Markdown document from the Angular adapter and core package sources. Their original relative structure is preserved so links from the package READMEs continue to work.

- [Complete documentation index](package-docs/README.md)
- [Angular adapter README](package-docs/angular/README.md)
- [Core package README](package-docs/core/README.md)
- [Core guides](package-docs/core/docs)

## Packages

- `@wts-calendar/angular` `1.0.0`
- `@wts-calendar/core` `1.0.0`
- Angular `22`

## License

MIT
