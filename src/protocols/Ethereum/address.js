import { isNumber } from 'lodash'
import { Wallet } from 'ethers'
import { getAddress } from 'ethers/utils'

export class EthereumAddress {
  constructor(chainId) {
    if (!isNumber(chainId)) throw new Error(`Invalid chain id '${chainId}'`)
    this.chainId = chainId;
  }

  /**
   * @param {string} addr
   * @returns {boolean}
   */
  isValid(addr) {
    try {
      getAddress(addr);
    } catch (e) { return false; }
    return true;
  }

  /**
   * Returns an address for a private key 
   * @param {string} privateKey 
   * @returns {string}
   */
  getAddress(privateKey) {
    const wallet = new Wallet(privateKey);
    return wallet.address
  }
}