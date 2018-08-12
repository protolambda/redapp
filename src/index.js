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
import contractsActions from './contracts/contracts';
const contracts = {contractsAT, contractsRed, contractsSaga, contracts: contractsActions};


// Tracking
// -----------------------------------------------------------

import accountsAT from './tracking/accounts/accountsAT';
import accountsRed from './tracking/accounts/accountsRed';
import accountsSaga from './tracking/accounts/accountsSaga';
import accountsActions from './tracking/accounts/accounts';
const accounts = {accountsAT, accountsRed, accountsSaga, accounts: accountsActions};

import blocksAT from './tracking/blocks/blocksAT';
import blocksRed from './tracking/blocks/blocksRed';
import blocksSaga from './tracking/blocks/blocksSaga';
const blocks = {blocksAT, blocksRed, blocksSaga};

import callsAT from './tracking/calls/callsAT';
import callsRed from './tracking/calls/callsRed';
import callsSaga from './tracking/calls/callsSaga';
import callsActions from './tracking/calls/calls';
const calls = {callsAT, callsRed, callsSaga, calls: callsActions};

import transactionsAT from './tracking/transactions/transactionsAT';
import transactionsRed from './tracking/transactions/transactionsRed';
import transactionsSaga from './tracking/transactions/transactionsSaga';
import transactionsActions from './tracking/transactions/transactions';
const transactions = {transactionsAT, transactionsRed, transactionsSaga,
  transactions: transactionsActions};

const tracking = {accounts, blocks, calls, transactions};

import EncodeABIError from './errors/EncodeABIError';
const errors = {EncodeABIError};

// Main
// -----------------------------------------------------------
export {rootReducer, rootSaga, initWeb3, contracts, tracking, errors};
