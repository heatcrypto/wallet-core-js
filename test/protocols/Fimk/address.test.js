const { expect } = require('chai')
const { FimkAddress } = require('../../../src/protocols/Fimk/address')

describe('FimkAddress', function () {
  describe('#isValid', function () {
    it(`works for validate address`, function () {
      const address = new FimkAddress()
      expect(address.isValid('123')).to.be.true
    })
    it(`works for in-validate address`, function () {
      const address = new FimkAddress()
      expect(address.isValid('abc')).to.be.false
    })
  })
  describe('#getAddress', function () {
    it(`should get address from privateKey`, function () {
      const address = new FimkAddress()
      expect(address.getAddress('2420e62e204d37554b3a1463ee6d2fe87133053877f51591e0b9c98ab9fd993e')).to.eq('11201384877209115915')
      expect(address.getAddress('15c33fe460045abee529918c862322bc83ebbc297152395882b52fa723eef163')).to.eq('11740260613755006687')
    })
  })
  describe('#toRSAddress', function () {
    it("should work", function () {
      const address = new FimkAddress()
      expect(address.toRSAddress('11201384877209115915')).to.eq('FIM-QRAD-8D59-288R-BJUWQ')
      expect(address.toRSAddress('FIM-QRAD-8D59-288R-BJUWQ')).to.eq('FIM-QRAD-8D59-288R-BJUWQ')
    })     
  })
  describe('#toNumericAddress', function () {
    it("should work", function () {
      const address = new FimkAddress()
      expect(address.toNumericAddress('FIM-QRAD-8D59-288R-BJUWQ')).to.eq('11201384877209115915')
      expect(address.toNumericAddress('11201384877209115915')).to.eq('11201384877209115915')
    })      
  })
})