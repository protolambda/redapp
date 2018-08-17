# Design of ReDApp

This document aims to outline the core ideas and the design choices of ReDApp.
It's mostly about **structure** and **reasoning**.
 I.e. this is doc is not a series of large text bodies that nobody reads,
  *only essential stuff*.

TODO: this document is a **WORK IN PROGRESS**.

**NONE OF THIS IS FINALIZED**


## Initialization

- Web3 is used in many different settings.
- Redux is designed for immutable objects.

->

- Dev should provide an web3 instance, not this library
- The web3 instance is not mixed into the redux store
- The sagas, which use the web3 instance,
 get it from an extra argument, which trickles down every redux `call`/`take` etc.
- The contract methods are thunked,
 and access web3 from the thunk, created using the extra argument from the saga.


## Store structure


- `[root]`
  - `tracking`: keep tracking separated, it's non-actionable, just watch something or don't.
    - `accounts`: keep accounts together with their state, like balance.
      - `local`: Accounts that are locally tracked, i.e. by the application.
      - `wallet`: Accounts that are tracked, but belong to the wallet of the user.
    - `blocks`: a mapping, with block hash as key. Only the last X (configurable) blocks are
      kept in memory, older ones are removed.
    - `transactions`: a mapping, with a UUID (v4) as key. Because TX-hashes are not available
      before processing by the web3provider.
    - `calls`: a mapping, with a hash (see docs) as key (Fallback to UUID).
      Acts as a cache; it can be cleared, and cache-calls can be made
      (i.e. try to hit cache before resorting to make a new web3 call). 
  - `contracts`: actionable, more complex, not necessarily tracked, hence separated
    from the tracking. Contract methods delegate web3 work to the tracking system,
     only ABI-encoding is done by the contract.


## Tracking

// TODO

### Accounts

// TODO

### Blocks

// TODO

### Transactions

// TODO

## Contracts

// TODO
