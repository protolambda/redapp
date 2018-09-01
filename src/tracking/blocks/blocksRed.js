import * as blocksAT from './AT';
import mappedReducer from '../../util/mapped-reducer';

const initialState = {
  // Last X blocks, mapped with block hash as key
  blocks: {
    // empty initially
  },
  latest: {
    number: 0,
    hash: null
  },
  maxBlockDepth: 24
};

const mapping = {
  [blocksAT.BLOCK_FAILED]: (state, action) => ({
    ...state,
    accountsMap: action.accountsMap
  }),
  [blocksAT.BLOCK_RECEIVED]: (state, action) => {
    const newLatestBlockNr = action.block.number > state.latest.number
      ? action.block.number
      : state.latest.number;
    return ({
      ...state,
      blocks: Object.assign(
        {},
        // filter the blocks, throw away blocks that are out of scope (i.e. too old).
        ...(Object.entries(state.blocks).filter(
          // eslint-disable-next-line no-unused-vars
          ([key, value]) => state.maxBlockDepth > (newLatestBlockNr - value.number)
        ).map(([key, value]) => ({[key]: value}))),
        ((state.maxBlockDepth > (state.latest.number - action.block.number)) && {
          [action.block.hash]: action.block
        })
      ),
      // if the new block is higher, update the latest block
      ...((state.latest.number < action.block.number) && {
        latest: {
          number: action.block.number,
          hash: action.block.hash
        }
      })
    });
  },
  [blocksAT.BLOCK_PROCESSED]: (state, action) => ({
    ...state,
    blocks: {
      ...state.blocks,
      [action.block.hash]: {
        ...state.blocks[action.block.hash],
        processed: true
      }
    },
  }),
  [blocksAT.BLOCK_FAILED]: (state, action) => ({
    ...state,
    blocks: {
      ...state.blocks,
      [action.block.hash]: {
        ...state.blocks[action.block.hash],
        processed: false,
        processError: action.processError
      }
    },
  })
};

/**
 * Blocks reducer of redapp.
 * @type {ReduxReducer}
 */
export default mappedReducer(mapping, initialState);
