import { networks, address, ECPair, script, crypto } from '@trezor/utxo-lib'
import { isUndefined,isString } from 'lodash'
import { toLegacyAddress, toCashAddress } from 'bchaddrjs'
import { isHex } from '../../utils'

export const BitcoinAddressTypeEnum = Object.freeze({
  p2pkh: 'p2pkh',
  p2sh: 'p2sh',
  bech32: 'bech32'
});

export class BitcoinAddress {
  /**
   * @param {string} networkId 
   */
  constructor(networkId) {
    if (isUndefined(networks[networkId]))
      throw new Error(`Unsupported networkId '${networkId}'`)
    this.network = networks[networkId];
    this.networkId = networkId
  }

  /**
   * @param {string} addr
   * @returns {boolean}
   */
  isValid(addr) {
    if (!isString(addr)) throw new Error('Address not a string');
    try {
      if (this.networkId == 'bitcoincash') {
        addr = toLegacyAddress(addr)
      }
      address.toOutputScript(addr, this.network)
      return true
    } catch (e) {
      console.error(e)
      return false
    }    
  }

  /**
   * Returns a ECPair from either a hex key or a wif
   * @param {string} privateKeyHexOfWif 
   */
  _keyPair(privateKeyHexOfWif) {
    return isHex(privateKeyHexOfWif) ? 
      ECPair.fromPrivateKeyBuffer(Buffer.from(privateKeyHexOfWif, 'hex'), this.network) : 
      ECPair.fromWIF(privateKeyHexOfWif, this.network);
  }

  /**
   * Returns an address for a private key which can be in either hex or wif format
   * @param {string} privateKeyHexOfWif 
   * @param {string} addressType 
   * @returns {string}
   */
  getAddress(privateKeyHexOfWif, addressType) {
    if (isUndefined(BitcoinAddressTypeEnum[addressType])) throw new Error(`Unsupported address type ${addressType}`)
    const keyPair = this._keyPair(privateKeyHexOfWif);
    let addr = this._getAddressInternal(keyPair, addressType)
    if (this.networkId == 'bitcoincash') {
      addr = toCashAddress(addr)
    }
    return addr
  }

  /**
   * @param {ECPair} keyPair 
   * @param {string} addressType 
   */
  _getAddressInternal(keyPair, addressType) {
    switch (addressType) {
      case BitcoinAddressTypeEnum.p2pkh: {
        const addr = keyPair.getAddress()
        return addr
      }
      case BitcoinAddressTypeEnum.p2sh: {
        var pubKey = keyPair.getPublicKeyBuffer()
        // var witnessScript = script.witnessPubKeyHash.output.encode(crypto.hash160(pubKey))
        // var scriptPubKey = script.scriptHash.output.encode(crypto.hash160(witnessScript))
        var scriptPubKey = script.scriptHash.output.encode(crypto.hash160(pubKey))
        var addr = address.fromOutputScript(scriptPubKey, this.network)        
        return addr
      }
      case BitcoinAddressTypeEnum.bech32: {
        const pubKey = keyPair.getPublicKeyBuffer()
        const scriptPubKey = script.witnessPubKeyHash.output.encode(crypto.hash160(pubKey))
        const addr = address.fromOutputScript(scriptPubKey, this.network)
        return addr
      }
    }
  }
}