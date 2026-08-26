# npm trusted publishing

The repository publishing path is configured for npm's GitHub Actions OIDC
trusted publisher. It does not use a long-lived `NODE_AUTH_TOKEN`.

## Exact npm publisher claims

Configure each package on npm with these case-sensitive values:

| Package | Workflow filename | Allowed action |
| --- | --- | --- |
| `@wts-calendar/core` | `wts-calendar-release.yml` | `npm publish` |
| `@wts-calendar/react` | `wts-calendar-wrappers-release.yml` | `npm publish` |
| `@wts-calendar/vue` | `wts-calendar-wrappers-release.yml` | `npm publish` |
| `@wts-calendar/angular` | `wts-calendar-wrappers-release.yml` | `npm publish` |

Every row uses provider **GitHub Actions**, organization/user `Suman201`,
repository `angular-librerias-v-17`, and environment `npm`. npm configurations
created after 2026-05-20 must explicitly allow at least one action.

The core workflow is `.github/workflows/wts-calendar-release.yml`; the wrapper
workflow is `.github/workflows/wts-calendar-wrappers-release.yml`. Both use a
GitHub-hosted runner, grant `id-token: write`, and run only for a matching
version tag. They check out the immutable tag, use an OIDC-capable npm CLI, and
publish without a registry token. The Angular workflow publishes only the
ng-packagr `dist` output. A wrapper is blocked until the same core version is
live and the stable core sign-off passes.

Neither workflow creates or requires a GitHub Release. npm trusted publishing
generates provenance automatically, so the publish commands do not need a
separate `--provenance` flag.

## One-time registry configuration

The package owner must authenticate to npm with account-level two-factor
authentication. After each package exists on the registry, configure trust
with npm 11.5.1 or newer:

```sh
npm trust github @wts-calendar/core --repo Suman201/angular-librerias-v-17 --file wts-calendar-release.yml --env npm --allow-publish -y
npm trust github @wts-calendar/react --repo Suman201/angular-librerias-v-17 --file wts-calendar-wrappers-release.yml --env npm --allow-publish -y
npm trust github @wts-calendar/vue --repo Suman201/angular-librerias-v-17 --file wts-calendar-wrappers-release.yml --env npm --allow-publish -y
npm trust github @wts-calendar/angular --repo Suman201/angular-librerias-v-17 --file wts-calendar-wrappers-release.yml --env npm --allow-publish -y
```

npm currently requires a package to exist before `npm trust` can configure it.
Because these scoped packages are new, their first publication needs an
owner-authenticated bootstrap or npm's staged-publication flow. Do not create
that first version until all release gates pass. Retain the 2FA confirmation,
artifact integrity, and resulting package URL as bootstrap evidence, then add
the trusted publisher before any later version.

Alternatively, enter the exact claims above in the package's npm **Trusted
Publisher** settings. This npm-side operation cannot be proven by repository
files; retain the successful configuration output or npm settings screenshot as
release evidence.

On 2026-08-12, the exact command was attempted with authenticated owner
`suman_mandal` and npm 11.18.0. npm rejected it before changing package state
because the current granular token bypasses two-factor authentication; npm no
longer permits that credential class to manage trusted publishers. The npm web
settings page also requires password confirmation. A password-confirmed web
session or a non-bypass two-factor-authenticated CLI session must complete the
one-time configuration. After configuration, retain `npm trust list <package>
--json` for all four packages as proof.

After the first successful OIDC publication, verify each npm package page shows
provenance, then require two-factor authentication and disallow traditional
tokens. Revoke obsolete automation tokens.

Official references: [npm trusted publishers](https://docs.npmjs.com/trusted-publishers/)
and [provenance statements](https://docs.npmjs.com/generating-provenance-statements/).
