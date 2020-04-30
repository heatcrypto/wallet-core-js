import { isNumber } from 'lodash'
import { Wallet } from 'ethers'
import { bigNumberify, Interface } from 'ethers/utils'

const erc20TransferAbi = [{
  constant: false,
  inputs: [{
    name: "_to",
    type: "address"
  },{
    name: "_value",
    type: "uint256"
  }],
  name: "transfer",
  outputs: [{
    name: "",
    type: "bool"
  }],
  type: 'function'
}];

export class EthereumPayment {
  constructor(chainId) {
    if (!isNumber(chainId)) throw new Error(`Invalid chain id '${chainId}'`)
    this.chainId = chainId;
  }

  /**
   * @param {string} privateKey 
   * @param {string} to 
   * @param {number | string} value 
   * @param {number} nonce 
   * @param {number | string} gasPrice 
   * @param {number | string} gasLimit // means provided gas or gas limit 
   * @returns {Promise<string>}
   */
  transferEth(privateKey, to, value, nonce, gasPrice, gasLimit) {
    const wallet = new Wallet(privateKey)
    const tx = {
      to,
      nonce: bigNumberify(nonce),
      value: bigNumberify(value),
      gasPrice: bigNumberify(gasPrice),
      gasLimit: bigNumberify(gasLimit),
      chainId: this.chainId
    }
    return wallet.sign(tx)
  }

  /**
   * @param {string} privateKey 
   * @param {string} contractAddress 
   * @param {string} to 
   * @param {number | string} value 
   * @param {number} nonce 
   * @param {number | string} gasPrice 
   * @param {number | string} gasLimit
   * @returns {Promise<string>}
   */
  async transferErc20(privateKey, contractAddress, to, value, nonce, gasPrice, gasLimit) {
    const wallet = new Wallet(privateKey);
    const iface = new Interface(erc20TransferAbi)
    const data = iface.functions.transfer.encode([to, bigNumberify(value)])
    const tx = {
      to: contractAddress,
      nonce: bigNumberify(nonce),
      gasPrice: bigNumberify(gasPrice),
      gasLimit: bigNumberify(gasLimit),
      chainId: this.chainId,
      data,
    }
    return wallet.sign(tx)
  }
}