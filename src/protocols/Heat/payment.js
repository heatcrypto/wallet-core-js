import { HeatSDK, Configuration, Builder, attachment, Transaction } from 'heat-sdk'
import { isString, isBoolean } from 'lodash'
import { HeatAddress } from './address'

export class HeatPayment {
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
   * @param {'prod' | 'test' | null} networkType 
   * @param {string | null} message 
   * @param {boolean | null} messageIsPrivate 
   * @param {boolean | null} messageIsBinary 
   * 
   * @returns {Promise<string>}
   */
  transferHeat(key, recipientAddress, recipientPublicKey, amount, fee, networkType, message, messageIsPrivate, messageIsBinary) {
    const address = this.address || (this.address = new HeatAddress())

    if (!isString(key)) throw new Error(`Key arg should be "String"`)
    if (!address.isValid(recipientAddress)) throw new Error(`recipientAddress arg should be "String"`)
    if (recipientPublicKey && !isString(recipientPublicKey)) throw new Error(`recipientPublicKey arg should be "String"`)
    if (!isString(amount) && !isNaN(Number(amount)) && Number(amount) > 0) throw new Error(`amount arg should be "String"`)
    if (!isString(fee) && !isNaN(Number(fee)) && Number(fee) > 0) throw new Error(`fee arg should be "String"`)
    if (!isString(networkType)) throw new Error(`networkType arg should be "String"`)
    if (message && !isString(message)) throw new Error(`message arg should be "String"`)
    if (!isBoolean(messageIsPrivate)) throw new Error(`messageIsPrivate arg should be "Boolean"`)
    if (!isBoolean(messageIsBinary)) throw new Error(`messageIsBinary arg should be "Boolean"`)

    const isTestnet = networkType == 'test' ? true : false
    const sdk = new HeatSDK(new Configuration({ isTestnet: isTestnet }))
    const recipientAddressOrPublicKey = (isString(recipientPublicKey) ? recipientPublicKey : recipientAddress)
    const builder = new Builder()
      .isTestnet(sdk.config.isTestnet)
      .genesisKey(sdk.config.genesisKey)
      .attachment(attachment.ORDINARY_PAYMENT)
      .amountHQT(amount)
      .feeHQT(fee)
    let txn = new Transaction(sdk, recipientAddressOrPublicKey, builder)
    if (message) {
      txn = messageIsPrivate ? txn.privateMessage(message, messageIsBinary) : txn.publicMessage(message, messageIsBinary)
    }
    return txn.sign(key).then(t => {
      const transaction = t.getTransaction()
      const bytes = transaction.getBytesAsHex()
      return bytes
    })
  }

  /**
   * Create a transaction to transfer HEAT.
   * 
   * @param {string} key 
   * @param {string | null} recipientAddress 
   * @param {string | null} recipientPublicKey 
   * @param {string} amount 
   * @param {string | null} fee 
   * @param {'prod' | 'test' | null} networkType 
   * @param {string | null} message 
   * @param {boolean | null} messageIsPrivate 
   * @param {boolean | null} messageIsBinary 
   * 
   * @returns {Promise<string>}
   */
  transferAsset(key, recipientAddress, recipientPublicKey, amount, fee, networkType, asset, message, messageIsPrivate, messageIsBinary) {
    const address = this.address || (this.address = new HeatAddress())

    if (!isString(key)) throw new Error(`Key arg should be "String"`)
    if (!address.isValid(recipientAddress)) throw new Error(`recipientAddress arg should be "String"`)
    if (recipientPublicKey && !isString(recipientPublicKey)) throw new Error(`recipientPublicKey arg should be "String"`)
    if (!isString(amount) && !isNaN(Number(amount)) && Number(amount) > 0) throw new Error(`amount arg should be "String"`)
    if (!isString(fee) && !isNaN(Number(fee)) && Number(fee) > 0) throw new Error(`fee arg should be "String"`)
    if (!isString(networkType)) throw new Error(`networkType arg should be "String"`)
    if (!address.isValid(asset)) throw new Error(`asset arg not valid should be "String"`)
    if (message && !isString(message)) throw new Error(`message arg should be "String"`)
    if (!isBoolean(messageIsPrivate)) throw new Error(`messageIsPrivate arg should be "Boolean"`)
    if (!isBoolean(messageIsBinary)) throw new Error(`messageIsBinary arg should be "Boolean"`)

    const isTestnet = networkType == 'test' ? true : false
    const sdk = new HeatSDK(new Configuration({ isTestnet: isTestnet }))
    const recipientAddressOrPublicKey = (isString(recipientPublicKey) ? recipientPublicKey : recipientAddress)
    const builder = new Builder()
      .isTestnet(sdk.config.isTestnet)
      .genesisKey(sdk.config.genesisKey)
      .attachment(new attachment.AssetTransfer().init(asset, amount))
      .amountHQT("0")
      .feeHQT(fee)
    let txn = new Transaction(sdk, recipientAddressOrPublicKey, builder)
    if (message) {
      txn = messageIsPrivate ? txn.privateMessage(message, messageIsBinary) : txn.publicMessage(message, messageIsBinary)
    }
    return txn.sign(key).then(t => {
      const transaction = t.getTransaction()
      const bytes = transaction.getBytesAsHex()
      return bytes
    })
  }
}