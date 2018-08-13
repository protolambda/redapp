import { call, take, race } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

// Introducing "redux-subber", a nice side-product of ReDApp utils. Also see poller util.
// Should I create a new package for this too?

/**
 * Maps an event-emitter (like web3.js uses) to a redux-saga event-channel,
 *  with support for being started/stopped/resumed.
 * @param startAT The action type that starts/resumes it.
 * @param stopAT The action type that stops it.
 * @param dataAT The action type that will be emitted when a "data" event
 *  is received from the subscription. Payload property = 'data'
 * @param changedAT The action type that will be emitted when a "changed" event
 *  is received from the subscription. Payload property = 'changed'
 * @param errorAT The action type that will be emitted when a "error" event
 *  is received from the subscription. Payload property = 'error'
 * @param openEventSub A function that returns a new EventEmitter ready to subscribe to.
 * @returns {subscriptionWatcher} The watcher, a redux-saga,
 *  can be shut down to stop the service completely.
 *  Controls the inner event-channel (like the worker in the poller utility).
 */
function subber(startAT, stopAT, dataAT, changedAT, errorAT, openEventSub) {
  // eventSub: the EventEmitter handle
  const createEventChannel = eventSub => eventChannel((emit) => {
    // Map the events to redux actions
    eventSub
      .on('data', data => {
        emit({type: dataAT, data});
      })
      .on('changed', changed => {
        emit({type: changedAT, changed});
      })
      .on('error', error => {
        emit({type: errorAT, error});
      });
    // Return unsubscribe function (wrap for future compatibility)
    return () => eventSub.unsubscribe();
  });

  // Watches for starts, starting the subscription
  // Watches for stops, pausing the subscription (New start will re-use same subscription settings)
  function* subscriptionWatcher() {
    let eventSub;
    // Repeat the start/stop cycle.
    while (true) {
      // Wait for a start command, which specifies the interval for polling.
      yield take(startAT);
      if (eventSub) {
        // re-subscribe (will be with old parameters)
        eventSub.subscribe();
      } else {
        // open a new subscription
        eventSub = openEventSub();
      }
      // Now run the event channel until we get a stop.
      yield race([
        call(createEventChannel, eventSub),
        take(stopAT)
      ]);
    }
  }

  return subscriptionWatcher;
}

export default subber;
