import { BitcoinAddress, BitcoinAddressTypeEnum } from './protocols/Bitcoin/address'
import { BitcoinPayment } from './protocols/Bitcoin/payment'
import { Coinselect } from './protocols/Coinselect/coinselect'
import { EthereumAddress } from './protocols/Ethereum/address'
import { EthereumPayment } from './protocols/Ethereum/payment'
import { HDWallet } from './protocols/HDWallet/hdwallet'
import { KeyPair } from './protocols/HDWallet/keypair'

module.exports = { 
  BitcoinAddress,
  BitcoinAddressTypeEnum,
  BitcoinPayment,
  Coinselect,
  EthereumAddress,
  EthereumPayment,
  HDWallet,
  KeyPair,
}