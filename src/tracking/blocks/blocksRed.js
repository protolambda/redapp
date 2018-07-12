import blocksAT from './blocksAT';
import mappedReducer from '../../util/mapped-reducer';

const initialState = {
  // Last X blocks, mapped with block hash as key
  blocks: {
    // empty initially
  },
  blockNr: 0
};

const mapping = {
  [blocksAT.BLOCK_FAILED]: (state, action) => ({
    ...state,
    accountsMap: action.accountsMap
  }),
  [blocksAT.BLOCK_RECEIVED]: (state, action) => ({
    ...state,
    blocks: {
      ...state.blocks,
      [action.block.hash]: action.block
    },
    // if the new block is higher, update the block height
    ...(state.blockNr < action.block.nr && {blockNr: action.block.nr})
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

export default mappedReducer(mapping, initialState);
