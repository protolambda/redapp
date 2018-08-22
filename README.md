<img width="600" src="manual/asset/img/redapp_full.svg"/>

# ReDApp

[![Build Status](https://travis-ci.org/protolambda/redapp.svg?branch=master)](https://travis-ci.org/protolambda/redapp)
[![dependencies Status](https://david-dm.org/protolambda/redapp/status.svg)](https://david-dm.org/protolambda/redapp)
[![devDependencies Status](https://david-dm.org/protolambda/redapp/dev-status.svg)](https://david-dm.org/protolambda/redapp?type=dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

ReDApp is a NPM package aiming to ease the development of DApps (decentralized applications)
 by performing the common web3 tasks in an idiomatic [Redux](https://github.com/reduxjs/redux) flow:

- **track**:
  - call smartcontract getters, e.g. read token balance.
  - transactions
  - accounts
  - blocks
- **interact**:
  - send regular transactions
  - send smart-contract transactions
- **lookups** (coming soon in V2):
  - retrieve history: get filtered event logs

ReDApp only supports Web3.js v1.0+.

## Documentation

API reference docs and integration docs can be found here:
[ReDApp Documentation](https://redapp.protolambda.com)


## Dependencies

### Library deps.

- Web3.0, v1.0+
- redux + redux-saga: where tracked information is maintained and updated with.
- UUID/v4: for unique ids for each transaction. Hashes do not suffice since in-broadcast transactions don't have a hash yet.


### Dev deps.

- Babel (v7): ES6 support
- Mocha, Chai: testing
- istanbul: coverage reporting
- rimraf, cross-env, npm-run-all: utils for npm run scripts
- ESLint: linting
- ESdoc: documentation generator, checks doc coverage.


## Examples

See `/examples` folder:

- [ReDApp React example](examples/react-example/README.md)
- [Minimal example](examples/simple)

## Testing & Coverage

```bash
npm run:test
npm run:cover
```

## Building

There are three build output formats: ES6, common-js, UMD.

### ES6

- Babel stage features are transformed, code is otherwise the same
- Separate modules
- Outputs to `es`

```bash
npm run build:es
```

### Common-js

- Separate modules
- Compatible with non-ES6 code
- Outputs to `/lib`

```bash
npm run build:cjs
```

### UMD

- bundled code, single module require.
- Built to work with unpkg.
- external dependencies
- external babel helpers (`regeneratorRuntime`)
- Outputs to `/dist/redapp.js`, and a minified version, `/dist/redapp.js`

```bash
npm run build:umd
npm run build:umd:min
```

## License

MIT, see [LICENSE file](LICENSE)
