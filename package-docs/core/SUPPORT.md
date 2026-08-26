# Support and release policy

## Supported environments

`1.x` supports Node.js 20.19 through 24 for build, SSR, tests, and package
tooling. Browser runtime support covers the current and previous major releases
of Chrome/Edge and Firefox, plus the current and previous Safari releases.
Touch behavior is qualified against Playwright's current Pixel 7 profile.

The published JavaScript is framework-agnostic. Type declarations are checked
with TypeScript 5.6 and are expected to work with TypeScript 5.6 through 6.x.
Angular, React, Vue, and other wrappers are consumers rather than runtime peer
dependencies.

## Versioning

The package follows Semantic Versioning:

- patch: compatible correctness, security, accessibility, and documentation fixes;
- minor: backward-compatible features and opt-in behavior;
- major: removal or incompatible API, CSS, markup, or behavior changes.

Public exports, option names, emitted events, CSS custom properties, documented
DOM contracts, and TypeScript declarations are part of the compatibility
surface. Undocumented internals are not.

## Deprecation and LTS

Deprecations are documented in the changelog and remain for at least one minor
release and 90 days before removal in a major release. The current stable major
receives security and critical correctness fixes. No LTS line exists unless it
is explicitly announced with an end date.

Release candidates use the npm `next` tag. Stable releases use `latest` only
after all automated gates pass and the manual sign-offs in
[docs/RELEASE-CANDIDATE.md](./docs/RELEASE-CANDIDATE.md) are recorded.

## Premium licensing support

To request a premium license, use the maintainer listed on the
[`@wts-calendar/core` npm package page](https://www.npmjs.com/package/@wts-calendar/core)
or [npm profile](https://www.npmjs.com/~suman_mandal) and request a private
licensing channel. Follow [the premium licensing guide](./docs/PREMIUM-LICENSING.md)
for the required request details. Never send a license token, provider
credential, commercial terms, or customer data through a public issue.
