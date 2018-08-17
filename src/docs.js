// This file is to enhance the documentation with typedefs + external links

/**
 * A redux thunk, dispatch this to run it. https://github.com/reduxjs/redux-thunk
 * @typedef {function(dispatch:*, getState:*) | function(dispatch:*)} ReduxThunk
 */

/**
 * A redux action type.
 * @typedef {string} ReduxActionType
 */

/**
 * A redux saga (a generator returned by a generator function). https://redux-saga.js.org/
 * @typedef {Generator<*>} ReduxSaga
 */

/**
 * A redux reducer.
 * @typedef {Reducer<any> | Reducer<any, AnyAction>} ReduxReducer
 */

/**
 * Redux state selector. Maps the whole state to just a specific part of the state.
 * This is used to structure and re-combine ReDApp modules however you like,
 *  if you prefer something else than the default.
 *
 * @example
 * // get redapp root
 * getRootState: (state) => state.redapp
 *
 * // From redapp root state to tracking state.
 * getTrackingState: (state) => getRootState(state).tracking
 *
 * // From tracking state to transactions state.
 * getTransactionsState: (state) => getTrackingState(state).transactions
 *
 * @typedef {function(state:object):*} ReduxStateSelector
 */
