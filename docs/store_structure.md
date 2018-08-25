# Redux Store Structure

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

TODO: document store structure with properties and example objects in state.

