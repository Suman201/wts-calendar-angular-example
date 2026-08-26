# Premium licensing

Need a premium WTS Calendar feature? Request a signed license token from the
WTS Calendar maintainer before enabling the premium module in production.

This token is a commercial WTS Calendar entitlement. It is **not** a Google API
key, Microsoft OAuth token, CalDAV password, or application data credential.
Provider credentials remain the responsibility of the consuming application;
see [API keys, OAuth, and browser credentials](CREDENTIALS.md).

## Request a license

Use the maintainer shown on the
[`@wts-calendar/core` npm package page](https://www.npmjs.com/package/@wts-calendar/core)
or the [maintainer's npm profile](https://www.npmjs.com/~suman_mandal) and ask
for a private licensing channel. When the repository issue tracker is publicly
available, a request titled `[Premium license request]` may also be opened
there. Do not post commercial terms, production credentials, or an issued
license token in a public issue.

Include only the information needed to scope the license:

- organization or individual name and a reply contact;
- application name and intended `@wts-calendar/core` version;
- exact production HTTPS origins that should be licensed;
- required premium feature identifiers;
- development, staging, and production environment needs; and
- expected deployment date.

The available premium feature identifiers are:

- `resource-scheduling`;
- `repeated-task-views`;
- `advanced-resource-planning`;
- `premium-interoperability`; and
- `enterprise-workflow`.

The maintainer will use a private channel to confirm terms and deliver the
signed token. WTS Calendar does not currently provide a public self-service key
generator or an automatic licensing endpoint. Do not infer pricing, support
response times, renewal terms, or production approval from this document;
confirm them with the maintainer.

## Use the signed token

Verify the token and pass the returned grant to the premium API:

```ts
import { verifyCalendarLicense } from '@wts-calendar/core';
import { AdvancedResourcePlanner } from
  '@wts-calendar/core/advanced-resource-planning';

// Inject at runtime. Never commit a real token or publish it in an npm package.
const license = await verifyCalendarLicense(runtimeConfig.wtsCalendarLicense);

const planner = new AdvancedResourcePlanner({
  license,
  resources,
  events,
  timeZone: 'Asia/Kolkata',
});
```

The verifier checks the Ed25519 signature, audience, expiry, licensed origin,
and feature grants. A plain string API key cannot enable a premium feature.
The audience remains `wts-calendar-v2` for entitlement compatibility even
though the npm package is named `@wts-calendar/core`.

## Browser-only applications

A browser-only application may receive the signed token through runtime
configuration, an authenticated user flow, or direct customer provisioning and
verify it locally. Do not embed a production token in a public repository,
documentation example, npm package, or analytics event. Any token delivered to
browser code is visible to that browser user, so licenses should be restricted
to the intended origins, features, and expiry.

Browser-only licensing does not add storage, synchronization, authorization, or
a database. It only unlocks the licensed client-side feature. Confidential
provider credentials, unattended token refresh, authoritative permissions, and
durable data still require infrastructure controlled by the consuming
application.

## Safe support request

When requesting help, provide the package version, feature identifier, licensed
origin, expiry date, and the exact verification error. Redact the compact token,
signature, provider credentials, event data, and personal information.
