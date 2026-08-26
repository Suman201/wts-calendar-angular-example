# Data adapter SDK

`@wts-calendar/core/data-adapter-sdk` is a normal/free, backend-neutral data layer.
It complements the calendar's event-source API when an application needs one
shared query/mutation client outside the calendar instance.

```ts
import {
  CalendarDataClient,
  createRestCalendarDataAdapter,
} from '@wts-calendar/core/data-adapter-sdk';

const adapter = createRestCalendarDataAdapter<EventRecord>({
  url: 'https://api.example.test/calendar/events',
  mutationUrl: ({ id }) =>
    `https://api.example.test/calendar/events/${encodeURIComponent(id ?? '')}`,
  headers: async () => ({ authorization: `Bearer ${await accessToken()}` }),
});

const client = new CalendarDataClient(adapter, {
  cacheTtlMs: 30_000,
  retries: 2,
  onError: reportError,
});

const page = await client.load({ start, end, timeZone }, { signal });
```

The client provides in-flight deduplication, bounded TTL caching, retry with
backoff, cancellation, mutation conflict/rejection results, invalidation,
subscriptions, and diagnostics. Reference factories cover:

- HTTP(S) REST, including canonical records and ETag versions.
- GraphQL queries and mutations with application mapping.
- local/session/compatible storage.
- WebSocket message subscriptions.

Adapters do not store access tokens and reject REST URLs with embedded
credentials. Applications remain responsible for authentication, server-side
authorization, response-size limits appropriate to their data, durable
persistence, and reconciliation. Premium interoperability and enterprise
workflow remain separate higher-level products.

