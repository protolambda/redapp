/**
 * Creates a simple reducer, based on a mapping and an initial state.
 * Similar to redux-actions, but much less bloated.
 * @param mapping An object with a mapping function for each action type,
 *  actions without key in this mapping are ignored.
 * @param initialState The state to use when there is none available.
 * @return {Function} The reducer.
 */
export default (mapping, initialState) => ((state = initialState, action) => {
  // If unknown, just return old state.
  if (!mapping[action.type]) return state;

  // Map old state to new state
  return mapping[action.type](state, action);
});
