const { expect } = require('chai')
const { FimkPayment } = require('../../../src/protocols/Fimk/payment')

describe('FimkPayment', function () {
  describe('#transferFimk', function () {
    it('should create payment', async function () {
      let key = 'privatekey',
        recipientAddress = '1234',
        recipientPublicKey = null,
        amount = '10000000',
        fee = '1000000',
        timestamp = 10000000000,
        message = null,
        messageIsPrivate = true,
        messageIsBinary = false;
      const payment = new FimkPayment()
      const bytes = await payment.transferFimk(key, recipientAddress, recipientPublicKey, amount, fee, timestamp, message, messageIsPrivate, messageIsBinary)
      expect(bytes).to.be.a('string')
    })
  })
  describe('#transferAsset', function () {
    it('should create asset payment', async function () {
      let key = 'privatekey',
        recipientAddress = '1234',
        recipientPublicKey = null,
        amount = '10000000',
        fee = '1000000',
        timestamp = 10000000000,
        asset = '111111111',
        message = null,
        messageIsPrivate = true,
        messageIsBinary = false;
      const payment = new FimkPayment()
      const bytes = await payment.transferAsset(key, recipientAddress, recipientPublicKey, amount, fee, timestamp, asset, message, messageIsPrivate, messageIsBinary)
      expect(bytes).to.be.a('string')
    })
  })
})