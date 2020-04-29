import { isNumber } from 'lodash'
import { web3 } from './web3'

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
    return web3.utils.isAddress(addr)
  }

  /**
   * Returns an address for a private key 
   * @param {string} privateKey 
   * @returns {string}
   */
  getAddress(privateKey) {
    const data = web3.eth.accounts.privateKeyToAccount(privateKey)
    return data ? data.address : null;
  }
}