// @ts-ignore
const LiquidCore = global.LiquidCore;

import { BitcoinAddress, BitcoinAddressTypeEnum } from './protocols/Bitcoin/address'
import { BitcoinPayment } from './protocols/Bitcoin/payment'
import { Coinselect } from './protocols/Coinselect/coinselect'
import { EthereumAddress } from './protocols/Ethereum/address'
import { EthereumPayment } from './protocols/Ethereum/payment'
import { FimkAddress } from './protocols/Fimk/address'
import { FimkPayment } from './protocols/Fimk/payment'
import { HDWallet } from './protocols/HDWallet/hdwallet'
import { KeyPair } from './protocols/HDWallet/keypair'
import { HeatAddress } from './protocols/Heat/address'
import { HeatPayment } from './protocols/Heat/payment'

const vm = require('vm');
const sandbox = {
  BitcoinAddress,
  BitcoinAddressTypeEnum,
  BitcoinPayment,
  Coinselect,
  EthereumAddress,
  EthereumPayment,
  FimkAddress,
  FimkPayment,
  HDWallet,
  KeyPair,
  HeatAddress,
  HeatPayment,
};
vm.createContext(sandbox);

// A micro service will exit when it has nothing left to do.  So to
// avoid a premature exit, let's set an indefinite timer.  When we
// exit() later, the timer will get invalidated.
setInterval(function () { }, 1000)

// Listen for a request from the host for the 'ping' event
LiquidCore.on('ping', function (name) {
  // When we get the ping from the host, respond with "Hallo, $name!"
  // and then exit.
  LiquidCore.emit('pong', { message: `Hallo, ${name}!` })
})

LiquidCore.on('exit', function (name) {
  process.exit(0);
})

LiquidCore.on('eval.request', function (param) {
  const {scriptCode,callerId} = param
  evaluateScript(scriptCode, callerId)
})

async function evaluateScript(scriptCode, callerId) {
  try {
    const result = await vm.runInContext(scriptCode, sandbox)
    LiquidCore.emit('eval.response', {
      callerId,
      result
    })
  } catch (error) {
    LiquidCore.emit('eval.response', {
      callerId,
      error
    })
  }
}

// Ok, we are all set up.  Let the host know we are ready to talk
LiquidCore.emit('ready')