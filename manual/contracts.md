# ReDApp Contracts

Contracts can be loaded with the `addContract()` action (type `ADD_CONTRACT`).
And if you ever need to remove a contract, just use `forgetContract()` (type `FORGET_CONTRACT`).
Once the contract is loaded (type `CONTRACT_ADDED`),
 it exposes its methods (from ABI spec) in the state.
 
```js
redapp.contracts.MyContract.methods.mySoldityFunction.someRedappAction(...args)
```

There are 2 types of methods: non-constant and constant.


## Non-Constant methods

These look like:

```js
const {txID, thunk} = mySoldityFunction.trackedSend({
  from: '0x1234567890......',
  // optionally other transaction settings, see API ref.
}, ...myArguments)
```

Non-constant methods change state, by creating a transaction.
This transaction will be tracked, and the web3-provider will need to sign it.

`trackedSend` only creates the initiating redux action, it does not run it.
Instead, it returns the randomly generated ID (`txID`) with
 which the transaction will be tracked, together with a `thunk`.

Note: the `txID` is not the same as the transaction hash; 
 redapp needs to track the transaction before knowing the hash, hence it cannot use the hash.

This thunk can then be dispatched whenever you like, 
 and will start a new transaction, tracked with `txID`.

```js
store.dispatch(thunk)
```

Under the hood this creates a normal transaction, but with the txID from earlier.
The transaction data is created on the fly using the arguments from the `trackedSend`
 (ABI encoded using the ABI you used when creating the contract).

See [transactions tracking](tracking/transactions.md) on how to track transactions
 after dispatching the thunk; contract transactions are no different than raw transactions.


## Constant methods

Constant methods are very similar:

```js
const {callID, thunk} = mySoldityViewFunction.cacheCall({
  // call options, like the sender or block number, see API ref.
}, ...myArguments)

// And similarly:
const {callID, thunk} = mySoldityViewFunction.forceCall({
  // call options, like the sender or block number, see API ref.
}, ...myArguments)
```

Calls can be forced, or can try to hit the "cache" (i.e. tries to look in the calls state) first.
To hit the cache, callIDs are not random, but based on the settings of the call; 
 the sender, contract address, arguments, and blockNr form a unique ID together.

Like transactions, calls also produce an ID and a thunk.

See [calls tracking](tracking/calls.md) on how to track calls
 after dispatching the thunk; contract calls are no different than raw calls.


