const blocksAT = {
  // Polling, for simple non-websocket based Web3 providers such as Metamask
  BLOCKS_START_POLL: 'BLOCKS_START_POLL',
  // Listening, for websocket based Web3 providers.
  BLOCKS_START_LISTEN: 'BLOCKS_START_LISTEN',
  // when raw block data was received
  BLOCK_RECEIVED: 'BLOCK_RECEIVED',
  // when block data from "BLOCK_RECEIVED" was processed successfully
  BLOCK_PROCESSED: 'BLOCK_PROCESSED',
  // when block data from "BLOCK_RECEIVED" could not be processed.
  BLOCK_FAILED: 'BLOCK_FAILED'
};

export default blocksAT;
