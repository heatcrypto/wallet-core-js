import { networks, ECPair, TransactionBuilder } from '@trezor/utxo-lib'
import { isUndefined, isString, forEach } from 'lodash'
import { toLegacyAddress } from 'bchaddrjs'
import { isHex } from '../../utils'

const SIGHASH_ALL = 0x01
const SIGHASH_BITCOINCASHBIP143 = 0x40

export class BitcoinPayment {
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
   * Creates a 1-to-1 transaction to an address. Returns the transaction as Hex
   * 
   * @param {Array<{
   *   vout:number;
   *   txId:string;
   *   privateKey:string; // either hex or wif
   *   sequence?: number;
   *   scriptSig?:string;
   *   keyPair?: ECPair; // this is added inside this method,
   *   value?: any; // this is added inside this method,
   * }>} inputs 
   * @param {Array<{
   *   address:string;
   *   value:number;
   * }>} outputs 
   * @returns {String}
   */
  create1to1Payment(inputs, outputs) {
    const txb = new TransactionBuilder(this.network)
    const { network, networkId } = this

    // must pass legacy address format for bitcoincash
    if (networkId == 'bitcoincash') {
      forEach(outputs, function (output) {
        if (!isUndefined(output.address)) {
          output.address = toLegacyAddress(output.address)
        }
      })
    }

    // adds a 'keyPair':ECPair to each input
    forEach(inputs, function (input) {
      if (!isString(input.privateKey)) throw new Error('Private key not a string');
      input.keyPair = isHex(input.privateKey) ?
        ECPair.fromPrivateKeyBuffer(Buffer.from(input.privateKey, 'hex'), network) :
        ECPair.fromWIF(input.privateKey, network);
    });

    // add all inputs to the builder
    forEach(inputs, function (input) {
      txb.addInput(input.txId, input.vout)
    });

    // add all outputs to the builder
    forEach(outputs, function (output) {
      let addr = output.address
      if (networkId == 'bitcoincash') {
        addr = toLegacyAddress(addr)
      }
      txb.addOutput(addr, output.value)
    });

    // sign all inputs
    forEach(inputs, function (input, index) {
      let hashType;
      if (networkId == 'bitcoincash') {
        hashType = SIGHASH_ALL | SIGHASH_BITCOINCASHBIP143
      }
      txb.sign(index, input.keyPair, undefined, hashType, input.value)
    })
    return txb.build().toHex()
  }
}