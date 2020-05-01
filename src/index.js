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

module.exports = { 
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
}