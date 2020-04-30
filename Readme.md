# wallet-core-js

[![Build Status](https://travis-ci.org/heatcrypto/wallet-core-js.svg?branch=master)](https://travis-ci.org/heatcrypto/wallet-core-js)

Node.js based, cross-platform, cross-blockchain wallet library.

Heat **wallet-core-js** is a cross-platform library that implements low-level cryptographic and HD wallet functionality for all supported blockchains. The library is intended as a companion to the [wallet-core](https://github.com/trustwallet/wallet-core) library from Trust/Binance which is similar in nature but is written in `C++` instead of `Node.js Javascript`. The goal of this library is to provide exended functionality for features not supported in wallet-core and provide a low barrier of entry and coding playground to locally test new blockchain features.

This library was created for **Heat Wallet** our easy to use and extensible mobile cryptocurrency wallet, but can be used by other projects as well. 

The target environments for this library are:

1. Android and IOS apps (executed in embedded node.js runtime)
2. Server side (node.js)
3. Browser (through browserify)

## Links

- [Todo](Todo.md)

## Errors

Cant webpack

See 

1. https://github.com/ethereum/web3.js/issues/1105