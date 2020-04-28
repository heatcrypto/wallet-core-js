# wallet-core-js

[![Build Status](https://travis-ci.org/heatcrypto/wallet-core-js.svg?branch=master)](https://travis-ci.org/heatcrypto/wallet-core-js)

Node.js based, cross-platform, cross-blockchain wallet library.

Heat **Wallet Core Js** is a cross-platform library that implements and collects low-level cryptographic and HD wallet functionality for all supported blockchains. The library is intended as a companion to the [wallet-core](https://github.com/trustwallet/wallet-core) library from Trust/Binance which is similar in nature but written in `C++`. The goal of this library is to provide exended functionality for features not supported in wallet-core and provide a low barrier of entry and coding playground to locally test new blockchain features.

This library is created for **Heat Wallet** our easy to use and extensible mobile cryptocurrency wallet, but can be used by other projects as well. 

The target environments for this library are:

1. Android and Ios apps (embedded node.js runtime)
2. Server side (node.js)
3. In browser environments through browserify

## Links

- [Todo](Todo.md)