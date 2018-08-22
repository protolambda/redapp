# Web3 object

The web3 object (Web3.js 1.0) is accessed in many different ways across the DApp ecosystem.
To keep ReDApp clean, we chose not force our own instantiation code upon the user.
Instead, the ReDApp sagas all access web3 from an argument passed to the saga.
As consumer of the ReDApp library, you can pass your own web3
 (connected to http/ws/whatever you like) to the rootSaga,
  or any sub-saga, if you decide to use it differently.


## Loading/Switching the web3 instance.

If you do not want to create the web3 instance when starting the redapp saga,
 you can hook the redapp root-saga as a generator to your own saga.
This enables you to provide a web3 instance dynamically, based on your state outside of ReDApp.
Simply stop the rootSaga and re-run if you want to pass a different web3 instance.


## Networks

ReDApp V1 does not support multiple networks at the same time yet; blocks are tracked globally,
 and call IDs do not include the network ID.
In a multi-network setting one should run multiple redapp instances,
 connected to separate redux stores.
Feedback on design to support multiple networks is appreciated, and will be considered for V2.

