import Web3 from 'web3';

/**
 * Initializes web3 in a fairly standard way. Utility function, for the "lazy" dev.
 * @param fallback An object specifying what to use when no provider was found.
 * @returns Web3 A new web3 instance, or throws an error if failing to instantiate.
 */
export default function initWeb3(fallback) {
  let web3 = null;

  // Check for injected web3 provider.
  if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
  }

  // If no web3 provider was injected into the web-page, then try to use the fallback.
  if (!web3 && fallback) {
    switch (fallback.type) {
      case 'ws': {
        const provider = new Web3.providers.WebsocketProvider(fallback.url);
        web3 = new Web3(provider);
        break;
      }
      // TODO add more fallback types (?)
      default:
        throw new Error(`Unknown web3 provider fallback type: ${fallback.type}.`);
    }
  }

  if (!web3) {
    throw new Error('No injected web3 provider or fallback option.');
  }

  return web3;
}
