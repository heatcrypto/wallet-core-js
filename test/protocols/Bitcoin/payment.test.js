const { expect } = require('chai')
const { BitcoinPayment } = require('../../../src/protocols/Bitcoin/payment')

describe('BitcoinPayment', function () {
  describe('#create1to1Payment', function () {
    it('should create bitcoin payment', function () {
      const payment = new BitcoinPayment('bitcoin')
      const inputs = [{
        vout: 0,
        txId: '61d520ccb74288c96bc1a2b20ea1c0d5a704776dd0164a396efec3ea7040349d',
        value: 12000,
        privateKey: '43f5126d2a36a788280a1b1e6ad69bf52317075a7d50f5a38490b0178516bde1',
      }]
      const outputs = [{
        address: '1cMh228HTCiwS8ZsaakH8A8wze1JR5ZsP',
        value: 6000
      }]
      const hex = payment.create1to1Payment(inputs, outputs)
      expect(hex).to.be.a('string')
    })
    it('should create bitcoincash payment', function () {
      const payment = new BitcoinPayment('bitcoincash')
      const inputs = [{
        "txId":"70bd3035ff88abb53c12793a21b6382a507adcebc56a6fb010994cda560eafd5",
        "vout":0,
        "value":1000000,
        "privateKey":"71ffdc0e35267c1e57e260040baabf3968d5d57ea5c79da6745742dac8961086",
        "scriptSig": "48304502210085604db6cf99873745ff23a47f044c4427d7621889f13882b9a3e7d26e37968e02204c7bb3d17f4746e674271047ff2110d33ea01d0aefd1c2eb265aafe748059004412103acaa4cfe20ea91df61a38e79df8888013db6b031c806e409cb386178e29ef8cd",
        "sequence": 4294967294
      }]
      const outputs = [{
        "address":"bitcoincash:qp6z806vsuh3n5hd5q7ffxzcvutxck23eq7qt8xe89",
        "value":200000
      },{
        "address":"bitcoincash:qpeg7dh5r74dy2tgc0ht8zrdmhrw6rx54qa7gp6e7j",
        "value":786500
      }];
      const hex = payment.create1to1Payment(inputs, outputs)
      expect(hex).to.be.a('string')
    })    
  })
})