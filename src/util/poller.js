import { call, take, race } from 'redux-saga/effects';

const delay = ms => new Promise(res => setTimeout(res, ms));

// Introducing "redux-poller", a nice side-product of ReDApp utils.
// Should I create a new package for this?

/**
 * Simple redux saga utility for polling.
 * Returns a watcher saga that listens for an action of type startAT, and then starts polling.
 * Polling is then stopped when the watcher notices an action of type stopAT.
 * Polling can be resumed with an action of type startAT again.
 *
 * @param startAT The action type to listen for to start polling.
 * This action should have a property 'interval', specifying the number of milliseconds
 *  to wait before executing the next poll iteration.
 * @param stopAT The action type to listen for to stop polling.
 * @param workerInner A saga that is called each poll iteration.
 * @param errorHandler A saga that is called on an error during a polling iteration.
 *  Optional, error is propagated otherwise.
 * @param workerArgs The remaining function arguments are forwarded to workerInner.
 * @returns {pollWatcher} The watcher saga, controlling the inner worker saga.
 */
function poller(startAT, stopAT, workerInner, errorHandler, ...workerArgs) {
  // ms: the polling interval in milliseconds
  function* pollWorker(ms) {
    // Repeat endlessly, watcher will take control away on a stop command.
    while (true) {
      try {
        // Do the necessary work
        yield call(workerInner, ...workerArgs);
        // wait for next polling iteration
        yield call(delay, ms);
      } catch (err) {
        // check for error handler
        if (errorHandler) {
          yield call(errorHandler, err);
        } else {
          // propagate error if error is not handled
          throw err;
        }
      }
    }
  }

  function* pollWatcher() {
    // Repeat the start/stop cycle.
    while (true) {
      // Wait for a start command, which specifies the interval for polling.
      const { interval } = yield take(startAT);
      // Now run the worker until we get a stop.
      yield race([
        call(pollWorker, interval),
        take(stopAT)
      ]);
    }
  }

  return pollWatcher;
}

export default poller;
