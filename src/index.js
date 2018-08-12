// ReDApp
// This file is for legacy build systems, that need a single import.
// It is highly recommended to use ES6, and import all modules individually using the ES build.
// This can also be used to include ReDApp in online snippets, hosted with e.g. UNPKG

/* eslint-disable import/newline-after-import,import/first */
import rootReducer from './reducer';
import rootSaga from './saga';
import initWeb3 from './initWeb3';

// Contracts
// -----------------------------------------------------------

import contractsAT from './contracts/contractsAT';
import contractsRed from './contracts/contractsRed';
import contractsSaga from './contracts/contractsSaga';
const contracts = {contractsAT, contractsRed, contractsSaga};


// Tracking
// -----------------------------------------------------------

import accountsAT from './tracking/accounts/accountsAT';
import accountsRed from './tracking/accounts/accountsRed';
import accountsSaga from './tracking/accounts/accountsSaga';
const accounts = {accountsAT, accountsRed, accountsSaga};

import blocksAT from './tracking/blocks/blocksAT';
import blocksRed from './tracking/blocks/blocksRed';
import blocksSaga from './tracking/blocks/blocksSaga';
const blocks = {blocksAT, blocksRed, blocksSaga};

import callsAT from './tracking/calls/callsAT';
import callsRed from './tracking/calls/callsRed';
import callsSaga from './tracking/calls/callsSaga';
const calls = {callsAT, callsRed, callsSaga};

import transactionsAT from './tracking/transactions/transactionsAT';
import transactionsRed from './tracking/transactions/transactionsRed';
import transactionsSaga from './tracking/transactions/transactionsSaga';
const transactions = {transactionsAT, transactionsRed, transactionsSaga};

const tracking = {accounts, blocks, calls, transactions};

import EncodeABIError from './errors/EncodeABIError';
const errors = {EncodeABIError};

// Main
// -----------------------------------------------------------
export {rootReducer, rootSaga, initWeb3, contracts, tracking, errors};
