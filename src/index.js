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

import * as contractsAT from './contracts/AT';
import contractsRed from './contracts/contractsRed';
import contractsSaga from './contracts/contractsSaga';
import * as contractsActions from './contracts/actions';
const contracts = {contractsAT, contractsRed, contractsSaga, contractsActions};


// Tracking
// -----------------------------------------------------------

import * as accountsAT from './tracking/accounts/AT';
import accountsRed from './tracking/accounts/accountsRed';
import accountsSaga from './tracking/accounts/accountsSaga';
import * as accountsActions from './tracking/accounts/actions';
const accounts = {accountsAT, accountsRed, accountsSaga, accountsActions};

import * as blocksAT from './tracking/blocks/AT';
import blocksRed from './tracking/blocks/blocksRed';
import blocksSaga from './tracking/blocks/blocksSaga';
const blocks = {blocksAT, blocksRed, blocksSaga};

import * as callsAT from './tracking/calls/AT';
import callsRed from './tracking/calls/callsRed';
import callsSaga from './tracking/calls/callsSaga';
import * as callsActions from './tracking/calls/actions';
const calls = {callsAT, callsRed, callsSaga, callsActions};

import * as transactionsAT from './tracking/transactions/AT';
import transactionsRed from './tracking/transactions/transactionsRed';
import transactionsSaga from './tracking/transactions/transactionsSaga';
import * as transactionsActions from './tracking/transactions/actions';
const transactions = {transactionsAT, transactionsRed, transactionsSaga, transactionsActions};

const tracking = {accounts, blocks, calls, transactions};

import EncodeABIError from './errors/EncodeABIError';
const errors = {EncodeABIError};

// Main
// -----------------------------------------------------------
export {rootReducer, rootSaga, initWeb3, contracts, tracking, errors};
