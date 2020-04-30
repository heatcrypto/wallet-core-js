import { FimkSDK, Builder, attachment, Transaction } from 'fimk-sdk'
import { isString, isBoolean, isNumber } from 'lodash'
import { FimkAddress } from './address'

export class FimkPayment {
  constructor() {
    this.address = null
  }

  /**
   * Create a transaction to transfer HEAT.
   * 
   * @param {string} key 
   * @param {string | null} recipientAddress 
   * @param {string | null} recipientPublicKey 
   * @param {string} amount 
   * @param {string | null} fee 
   * @param {number} timestamp 
   * @param {string | null} message 
   * @param {boolean | null} messageIsPrivate 
   * @param {boolean | null} messageIsBinary 
   * 
   * @returns {Promise<string>}
   */
  transferFimk(key, recipientAddress, recipientPublicKey, amount, fee, timestamp, message, messageIsPrivate, messageIsBinary) {
    const address = this.address || (this.address = new FimkAddress())

    if (!isString(key)) throw new Error(`Key arg should be "String"`)
    if (!address.isValid(recipientAddress)) throw new Error(`recipientAddress arg not valid`)
    if (recipientPublicKey && !isString(recipientPublicKey)) throw new Error(`recipientPublicKey arg should be "String"`)
    if (!isString(amount) && !isNaN(Number(amount)) && Number(amount) > 0) throw new Error(`amount arg should be "String"`)
    if (!isString(fee) && !isNaN(Number(fee)) && Number(fee) > 0) throw new Error(`fee arg should be "String"`)
    if (!isNumber(timestamp)) throw new Error(`timestamp arg should be "Number"`)
    if (message && !isString(message)) throw new Error(`message arg should be "String"`)
    if (!isBoolean(messageIsPrivate)) throw new Error(`messageIsPrivate arg should be "Boolean"`)
    if (!isBoolean(messageIsBinary)) throw new Error(`messageIsBinary arg should be "Boolean"`)

    const sdk = new FimkSDK()
    const recipientAddressOrPublicKey = (isString(recipientPublicKey) ? recipientPublicKey : recipientAddress)
    const builder = new Builder()
      .timestamp(timestamp)
      .attachment(attachment.ORDINARY_PAYMENT)
      .amountHQT(amount)
      .feeHQT(fee)
      .ecBlockHeight(1)
      .ecBlockId("0")
    let txn = new Transaction(sdk, recipientAddressOrPublicKey, builder)
    if (message) {
      txn = messageIsPrivate ? txn.privateMessage(message, messageIsBinary) : txn.publicMessage(message, messageIsBinary)
    }
    return txn.sign(key).then(t => {
      let transaction = t.getTransaction()
      let bytes = transaction.getBytesAsHex()
      return bytes
    })
  }

  /**
   * Create a transaction to transfer HEAT.
   * 
   * @param {String} key 
   * @param {String | null} recipientAddress 
   * @param {String | null} recipientPublicKey 
   * @param {String} amount 
   * @param {String | null} fee 
   * @param {number} timestamp 
   * @param {String | null} message 
   * @param {Boolean | null} messageIsPrivate 
   * @param {Boolean | null} messageIsBinary 
   * 
   * @returns bytes HEX string
   */
  transferAsset(key, recipientAddress, recipientPublicKey, amount, fee, timestamp, asset, message, messageIsPrivate, messageIsBinary) {
    const address = this.address || (this.address = new FimkAddress())

    if (!isString(key)) throw new Error(`Key arg should be "String"`)
    if (!address.isValid(recipientAddress)) throw new Error(`recipientAddress arg not valid`)
    if (recipientPublicKey && !isString(recipientPublicKey)) throw new Error(`recipientPublicKey arg should be "String"`)
    if (!isString(amount) && !isNaN(Number(amount)) && Number(amount) > 0) throw new Error(`amount arg should be "String"`)
    if (!isString(fee) && !isNaN(Number(fee)) && Number(fee) > 0) throw new Error(`fee arg should be "String"`)
    if (!isNumber(timestamp)) throw new Error(`timestamp arg should be "Number"`)
    if (!address._isValidId(asset)) throw new Error(`asset arg not valid`)
    if (message && !isString(message)) throw new Error(`message arg should be "String"`)
    if (!isBoolean(messageIsPrivate)) throw new Error(`messageIsPrivate arg should be "Boolean"`)
    if (!isBoolean(messageIsBinary)) throw new Error(`messageIsBinary arg should be "Boolean"`)

    const sdk = new FimkSDK()
    const recipientAddressOrPublicKey = (isString(recipientPublicKey) ? recipientPublicKey : recipientAddress)
    const builder = new Builder()
      .timestamp(timestamp)
      .attachment(new attachment.AssetTransfer().init(asset, amount))
      .amountHQT("0")
      .feeHQT(fee)
      .ecBlockHeight(1)
      .ecBlockId("0")
    let txn = new Transaction(sdk, recipientAddressOrPublicKey, builder)
    if (message) {
      txn = messageIsPrivate ? txn.privateMessage(message, messageIsBinary) : txn.publicMessage(message, messageIsBinary)
    }
    return txn.sign(key).then(t => {
      let transaction = t.getTransaction()
      let bytes = transaction.getBytesAsHex()
      return bytes
    })
  }
}