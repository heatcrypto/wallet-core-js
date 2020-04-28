const { expect } = require('chai')
const { HDWallet } = require("../../../src/protocols/HDWallet/hdwallet")

describe('HDWallet', function () {
  describe('#bip39GenerateMnemonic', function () {
    it('should return a string', function () {
      const hdwallet = new HDWallet()
      const seed = hdwallet.bip39GenerateMnemonic();
      expect(seed).to.be.a('string');
    }) 
  })
})