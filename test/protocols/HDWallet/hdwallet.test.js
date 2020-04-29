const { expect } = require('chai')
const { HDWallet } = require("../../../src/protocols/HDWallet/hdwallet")
const { networks } = require('@trezor/utxo-lib')

describe('HDWallet', function () {
  describe('#generateMnemonic', function () {
    it('should return a string', function () {
      const hdwallet = new HDWallet()
      const seed = hdwallet.generateMnemonic();
      expect(seed).to.be.a('string');
    })
  })
  describe('#validateMnemonic', function () {
    it('should regognize a valid mnemonic', function () {
      const hdwallet = new HDWallet()
      expect(hdwallet.validateMnemonic('pen orphan imitate leader rabbit decline skirt civil demand goose style stand')).to.be.true
    })
    it('should regognize an invalid mnemonic', function () {
      const hdwallet = new HDWallet()
      expect(hdwallet.validateMnemonic('hello')).to.be.false
    })
  })
  describe('#batchDeriveKeyPairs', function () {
    it('should work', function () {
      const hdwallet = new HDWallet()
      const pairs = hdwallet.batchDeriveKeyPairs('pen orphan imitate leader rabbit decline skirt civil demand goose style stand', [
        "m/44'/0'/0'/0/0",
        "m/44'/0'/0'/0/1",
      ], networks.bitcoin)
      expect(pairs).to.eql([
        {
          path: 'm/44\'/0\'/0\'/0/0',
          privateKeyHex: '6ded9a7efba00d070413ffee1a26d612f52547532ca559dd512d428f728d577a',
          publicKeyHex: '025681c2132d8bcc24746910769f58e8dfb63c1b72ecb2ed9555316ff21aa52e18',
          privateKeyWif: 'KzuPy9dAEznkHaZpTkzPVNvWxuVJYCsPVCmQBf9uU9EtmonnM3p5'
        },
        {
          path: 'm/44\'/0\'/0\'/0/1',
          privateKeyHex: '49f89999ed6db384ad9c85c67e2f9a7bb631c96307641a6aa75c331e0350bb9b',
          publicKeyHex: '028d922f5ed690e3f479dd13f27f29b6518de0af5593d04f6db69097ce66b9bba8',
          privateKeyWif: 'KyhW1gxBoSuPABc8Bwu1Bwqz33mvaKv5q4sBEsQppjFG8TMApjep'
        },
      ]);
    })
  })
})