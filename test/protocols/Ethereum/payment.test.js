const { expect } = require('chai')
const { EthereumPayment } = require('../../../src/protocols/Ethereum/payment')

describe('EthereumPayment', function () {
  describe('#transferEth', function () {
    it('should create eth payment', async function () {
      const privateKey = "0xcecee6703bd6274014e0beabb7a00951c849253b1a5d9f60418422ebb8344fba",
        to = "0x2652a649aBa066D8C1e37B0A0C45dFD5E1c91527",
        nonce = "10",
        value = "10000",
        gasPrice = "20000000000",
        gas = "21000";

      const payment = new EthereumPayment(1)
      const bytes = await payment.transferEth(privateKey, to, value, nonce, gasPrice, gas)
      expect(bytes).to.be.a('string')
    })
  })
  describe('#transferErc20', function () {
    it('should create erc20 payment', async function () {
      const privateKey = "0xcecee6703bd6274014e0beabb7a00951c849253b1a5d9f60418422ebb8344fba",
        to = "0x2652a649aBa066D8C1e37B0A0C45dFD5E1c91527",
        nonce = "10",
        value = "10000",
        gasPrice = "20000000000",
        gas = "50000",
        contractAddress = "0xd26114cd6ee289accf82350c8d8487fedb8a0c07";

      const payment = new EthereumPayment(1)
      const bytes = await payment.transferErc20(privateKey, contractAddress, to, value, nonce, gasPrice, gas)
      expect(bytes).to.be.a('string')
    })
  })
})