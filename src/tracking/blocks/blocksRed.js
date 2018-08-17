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
  [blocksAT.BLOCK_RECEIVED]: (state, action) => ({
    ...state,
    blocks: {
      // filter the blocks, throw away blocks that are out of scope (i.e. too old).
      ...(Object.entries(state.blocks).filter(
        ([key, value]) => value.number > (state.latest.number - state.maxBlockDepth)
      ).map(([key, value]) => ({[key]: value}))),
      ...((action.block.number > (state.latest.number - state.maxBlockDepth)) && {
        [action.block.hash]: action.block
      })
    },
    // if the new block is higher, update the latest block
    ...((state.blockNr < action.block.number) && {
      latest: {
        number: action.block.number,
        hash: action.block.hash
      }
    })
  }),
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
