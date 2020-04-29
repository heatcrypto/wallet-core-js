const { expect } = require('chai')
const { EthereumAddress } = require('../../../src/protocols/Ethereum/address')

describe('EthereumAddress', function () {
  describe('#isValid', function () {
    it(`should validate ethereum address`, function () {
      const address = new EthereumAddress(1)
      expect(address.isValid('0x79776a5f9BD9Cb9B2fAb29074189357EE253b863')).to.be.true
    })
  })
  describe('#getAddress', function () {
    it(`should get address from privateKey`, function () {
      const address = new EthereumAddress(1)
      expect(address.getAddress('db0d28e794993cc890d388fdfb41034067b0a83ea128b19d7e39881d06bdd162')).to.eq('0x42fF045CCFe38eE53067E3872e357d48f8c6A421')
    })
  })
})