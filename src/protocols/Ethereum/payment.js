import { EthereumAddress } from './address'
import { isNumber } from 'lodash'
import { web3 } from './web3'

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
   * @param {number | string} gas // means provided gas or gas limit 
   * @returns {Promise<string>}
   */
  transferEth(privateKey, to, value, nonce, gasPrice, gas) {
    const tx = {
      to,
      nonce,
      value,
      gasPrice,
      gas,
      chainId: this.chainId
    }
    return web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
      return signed.rawTransaction;
    });
  }

  /**
   * @param {string} privateKey 
   * @param {string} contractAddress 
   * @param {string} to 
   * @param {number | string} value 
   * @param {number} nonce 
   * @param {number | string} gasPrice 
   * @param {number | string} gas 
   * @returns {Promise<string>}
   */
  transferErc20(privateKey, contractAddress, to, value, nonce, gasPrice, gas) {
    const address = new EthereumAddress(this.chainId)
    const from = address.getAddress(privateKey)    
    // @ts-ignore
    const contract = new web3.eth.Contract(erc20TransferAbi, contractAddress, { from });
    const data = contract.methods.transfer(to, value).encodeABI()
    const tx = {
      from,
      to: contractAddress,
      nonce,
      value: '0x0',
      gasPrice,
      gas,
      chainId: this.chainId,
      data,
    }
    return web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
      return signed.rawTransaction;
    });
  }
}