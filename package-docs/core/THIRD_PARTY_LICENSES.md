# Runtime dependency notices

This inventory covers code installed at runtime by `@wts-calendar/core`. The
calendar bundles do not embed these packages; npm installs them as separate
dependencies. Development-only tooling is intentionally excluded.

| Package | Locked version | License | Copyright / notice |
| --- | --- | --- | --- |
| `@js-temporal/polyfill` | 0.5.1 | ISC | Copyright (c) 2020-2024 Ecma International |
| `jsbi` | 4.3.2 | Apache-2.0 | Copyright 2018 the V8 project authors |

The authoritative license texts are distributed in each dependency package:

- `node_modules/@js-temporal/polyfill/LICENSE`
- `node_modules/jsbi/LICENSE`

The release gate verifies the package names, versions, license identifiers,
and the presence of these notices against `package-lock.json`.
