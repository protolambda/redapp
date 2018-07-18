const callsAT = {
  // Call, but try to hit local redux cache first. If not in cache, a FORCE_CALL will be fired.
  CACHE_CALL: 'CACHE_CALL',
  // Wipe the cache
  CLEAR_CACHE: 'CLEAR_CACHE',
  // Remove a single call from the cache
  FORGET_CALL: 'FORGET_CALL',
  // Call, ignoring the cache
  FORCE_CALL: 'FORCE_CALL',
  // When a call promise is completed by web3, adds the result to the cache.
  CALL_RETURNED: 'CALL_RETURNED',
  // When the call failed, (e.g. invalid block number)
  CALL_FAILED: 'CALL_FAILED'
};

export default callsAT;
