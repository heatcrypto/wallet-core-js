const { expect } = require('chai')
const { HeatPayment } = require('../../../src/protocols/Heat/payment')

describe('HeatPayment', function () {
  describe('#transferHeat', function () {
    it('should create payment', async function () {
      const key = 'privatekey',
        recipientAddress = '1234',
        recipientPublicKey = null,
        amount = '10000000',
        fee = '1000000',
        networkType = 'test',
        message = null,
        messageIsPrivate = false,
        messageIsBinary = false;
      const payment = new HeatPayment()
      const bytes = await payment.transferHeat(key, recipientAddress, recipientPublicKey, amount, fee, networkType, message, messageIsPrivate, messageIsBinary)
      expect(bytes).to.be.a('string')
    })
  })
  describe('#transferAsset', function () {
    it('should create asset payment', async function () {
      const key = 'privatekey',
        recipientAddress = '1234',
        recipientPublicKey = null,
        amount = '10000000',
        fee = '1000000',
        networkType = 'test',
        asset = '111111111',
        message = null,
        messageIsPrivate = false,
        messageIsBinary = false;
      const payment = new HeatPayment()
      const bytes = await payment.transferAsset(key, recipientAddress, recipientPublicKey, amount, fee, networkType, asset, message, messageIsPrivate, messageIsBinary)
      expect(bytes).to.be.a('string')
    })
  })
})