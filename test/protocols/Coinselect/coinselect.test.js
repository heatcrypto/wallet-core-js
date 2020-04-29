const { expect } = require('chai')
const { Coinselect } = require('../../../src/protocols/Coinselect/coinselect')

describe('Coinselect', function () {
  describe('#coinselect', function () {
    it('should work', function () {
      const utxos = [{
        vout: 0,
        txId: '61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d',
        value: 1200000,
      }]
      const targets = [{
        address: '1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP',
        value: 4000
      }]
      const feeRate = 55;
      const coinselect = new Coinselect()
      const resp = coinselect.coinSelect(utxos,targets,feeRate)
      expect(resp).to.not.be.null
    })
  })
  describe('#coinselectSplit', function () {
    it('should work', function () {
      const utxos = [{
        vout: 0,
        txId: '61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d',
        value: 1200000,
      }]
      const targets = [{
        address: '1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP',
        value: 4000
      }]
      const feeRate = 55;
      const coinselect = new Coinselect()
      const resp = coinselect.coinSelectSplit(utxos,targets,feeRate)
      expect(resp).to.not.be.null
    })
  })  
})