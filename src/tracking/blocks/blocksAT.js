const blocksAT = {
  // Polling, for simple non-websocket based Web3 providers such as Metamask
  BLOCKS_START_POLLING: 'BLOCKS_START_POLLING',
  BLOCKS_STOP_POLLING: 'BLOCKS_STOP_POLLING',
  BLOCKS_POLL_ERROR: 'BLOCKS_POLL_ERROR',
  // Listening, for websocket based Web3 providers.
  BLOCKS_START_LISTENING: 'BLOCKS_START_LISTENING',
  BLOCKS_STOP_LISTENING: 'BLOCKS_STOP_LISTENING',
  BLOCKS_LISTEN_ERROR: 'BLOCKS_LISTEN_ERROR',
  // force get latest block
  GET_LATEST_BLOCK: 'GET_LATEST_BLOCK',
  // when retrieving a block fails.
  BLOCK_RETRIEVAL_ERROR: 'BLOCK_RETRIEVAL_ERROR',
  // when raw block data was received
  BLOCK_RECEIVED: 'BLOCK_RECEIVED',
  // when block data from "BLOCK_RECEIVED" was processed successfully
  BLOCK_PROCESSED: 'BLOCK_PROCESSED',
  // when block data from "BLOCK_RECEIVED" could not be processed.
  BLOCK_FAILED: 'BLOCK_FAILED'
};

export default blocksAT;
