import { isString } from 'lodash'
import { HeatSDK } from 'heat-sdk'

export class HeatAddress {
  constructor() {
    this.sdk = null
  }

  /**
   * @param {string} addr
   * @returns {boolean}
   */
  isValid(addr) {
    return isString(addr) && !isNaN(Number(addr)) && Number(addr) != 0
  }

  /**
   * Returns an address for a private key 
   * @param {string} privateKey 
   * @returns {string}
   */
  getAddress(privateKey) {
    const sdk = this.sdk || (this.sdk = new HeatSDK())
    return sdk.crypto.getAccountId(privateKey);
  }
}