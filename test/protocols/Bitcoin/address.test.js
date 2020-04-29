const { expect } = require('chai')
const { BitcoinAddress } = require('../../../src/protocols/Bitcoin/address')
const fixtures = require('../../fixtures.json')
const { forEach } = require('lodash')

describe('BitcoinAddress', function () {
  describe('#isValid', function () {
    forEach(fixtures, function (paths, mnemonicSeed) {
      forEach(paths, function (data) {
        const {path,wif,network,types} = data
        forEach(types, function (addr, type) {
          it(`should validate ${network} ${type} address`, function () {
            const address = new BitcoinAddress(network)
            expect(address.isValid(addr)).to.be.true
          })
        })
      })
    })
  })
  describe('#getAddress', function () {
    forEach(fixtures, function (paths, mnemonicSeed) {
      forEach(paths, function (data) {
        const {path,wif,network,types} = data
        forEach(types, function (addr, type) {
          it(`should get ${network} ${type} address from wif`, function () {
            const address = new BitcoinAddress(network)
            const actualAddr = address.getAddress(wif, type)
            expect(actualAddr).to.eq(addr)
          })
        })
      })
    })
  })
})