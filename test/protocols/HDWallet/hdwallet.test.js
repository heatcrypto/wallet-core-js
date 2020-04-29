const { expect } = require('chai')
const { HDWallet } = require("../../../src/protocols/HDWallet/hdwallet")

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
        "m/44'/1'/0'/0/0",
        "m/44'/1'/0'/0/1",
      ])
      expect(pairs).to.eql([
        {
          path: 'm/44\'/0\'/0\'/0/0',
          privateKeyHex: '6ded9a7efba00d070413ffee1a26d612f52547532ca559dd512d428f728d577a',
          publicKeyHex: '025681c2132d8bcc24746910769f58e8dfb63c1b72ecb2ed9555316ff21aa52e18'
        },
        {
          path: 'm/44\'/0\'/0\'/0/1',
          privateKeyHex: '49f89999ed6db384ad9c85c67e2f9a7bb631c96307641a6aa75c331e0350bb9b',
          publicKeyHex: '028d922f5ed690e3f479dd13f27f29b6518de0af5593d04f6db69097ce66b9bba8'
        },
        {
          path: 'm/44\'/1\'/0\'/0/0',
          privateKeyHex: 'becee20bd46019ffc6fc7446e11d1eeb0be1c268642fb13affd2b4f6e1edfe3b',
          publicKeyHex: '02f14dcd08886dde36c74e16623a1bd2783748e2409324a09c2bc5df85f22f0559'
        },
        {
          path: 'm/44\'/1\'/0\'/0/1',
          privateKeyHex: 'acbe78257ef10b614adfe0eece475bc4841c4b61f17e1f1ec7636ac3cd18da21',
          publicKeyHex: '03feebcd6f76a64aaf849615ba74594951fd9e3300e436f2f2127549feebd36589'
        }
      ]);
    })
  })
})