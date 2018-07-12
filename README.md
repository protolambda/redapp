# ReDApp

[![Build Status](https://travis-ci.org/protolambda/redapp.svg?branch=master)](https://travis-ci.org/protolambda/redapp)
[![dependencies Status](https://david-dm.org/protolambda/redapp/status.svg)](https://david-dm.org/protolambda/redapp)
[![devDependencies Status](https://david-dm.org/protolambda/redapp/dev-status.svg)](https://david-dm.org/protolambda/redapp?type=dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

ReDApp is a NodeJS package aiming to ease the development of DApps
 by performing the common web3 tasks in an idiomatic redux flow:

- **track**:
  - transactions
  - accounts
  - blocks (v2)
  - metadata (e.g. blockheight)
- **interact**:
  - send regular transactions
  - send smart-contract transactions
- **view**:
  - call smartcontract getters, e.g. read token balance.
  - retrieve history: get filtered event logs

ReDApp only support Web3.js v1.0+.

TODO: describe store structure, reducers, and sagas.



## Dependencies

- Web3.0, v1.0+
- redux + redux-saga: where tracked information is maintained and updated with.
- eth-block-tracker: used to get block info from the web3 provider, either by polling (for metamask) or by listening.
- UUID: for unique ids for each transaction. Hashes do not suffice since in-broadcast transactions don't have a hash yet.
- Babel: ES6 support
- Mocha, Chai: testing
- istanbul: coverage reporting
- rimraf, cross-env: utils for npm run scripts
- ESLint: linting


Waiting for Airbnb base config to support ESLint 5.0,
 see: https://github.com/airbnb/javascript/issues/1834

