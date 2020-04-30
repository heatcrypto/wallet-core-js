import { isString } from 'lodash'
import { FimkSDK, RsAddress } from 'fimk-sdk'

export class FimkAddress {
  constructor() {
    this.sdk = null
  }

  /**
   * @param {string} addr
   * @returns {boolean}
   */
  _isValidId(addr) {
    return isString(addr) && !isNaN(Number(addr)) && Number(addr) != 0
  }

  /**
   * @param {string} rsAddress
   * @returns {string}
   */
  toNumericAddress(rsAddress) {
    const addr = new RsAddress('FIM')
    addr.set(rsAddress)
    return addr.account_id()
  }

  /**
   * @param {string} numericAddress
   * @returns {string}
   */  
  toRSAddress(numericAddress) {
    const addr = new RsAddress('FIM')
    addr.set(numericAddress)
    return addr.toString()
  }

  /**
   * @param {string} addr
   * @returns {boolean}
   */
  isValid(addr) {
    if (addr.startsWith('FIM-')) {
      return this._isValidId(this.toNumericAddress(addr))
    }
    return this._isValidId(addr)
  }

  /**
   * Returns an address for a private key 
   * @param {string} privateKey 
   * @returns {string}
   */
  getAddress(privateKey) {
    const sdk = this.sdk || (this.sdk = new FimkSDK())
    return sdk.crypto.getAccountId(privateKey);
  }
}