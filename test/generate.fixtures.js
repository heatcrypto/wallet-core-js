import { BitcoinAddress } from '../src/protocols/Bitcoin/address'
import { HDWallet } from '../src/protocols/HDWallet/hdwallet'
import { forEach } from 'lodash'
import { networks } from '@trezor/utxo-lib'

// Generates a set of test fixtures and prints the results to screen
// To run script execute:
// node -r esm ./test/generate.fixtures.js

function generateFixtures() {
  const hdwallet = new HDWallet()
  const seed = hdwallet.generateMnemonic();
  const n = [{
    network:'bitcoin',
    bip44:0,
    addrTypes:['p2pkh','p2sh','bech32']
  },{
    network:'testnet',
    bip44:1,
    addrTypes:['p2pkh','p2sh','bech32']
  },{
    network:'litecoin',
    bip44:2,
    addrTypes:['p2pkh','p2sh']        
  },{
    network:'bitcoincash',
    bip44:145,
    addrTypes:['p2pkh','p2sh']        
  }]
  const root = {}
  const paths = root[seed] = []
  forEach(n, function (data) {
    const network = networks[data.network]
    const path = `m/44'/${data.bip44}'/0'/0/0`;
    const keyPair = hdwallet.batchDeriveKeyPairs(seed, [path], network)[0]
    const fixture = {
      path: path,
      wif: keyPair.privateKeyWif,
      network: data.network,
      types: {}
    }
    paths.push(fixture)
    forEach(data.addrTypes, function (addrType) {
      const address = new BitcoinAddress(data.network)
      const addr = address.getAddress(keyPair.privateKeyWif, addrType)
      fixture.types[addrType] = addr
    })
  })

  console.log(JSON.stringify(root,null,2))
}
generateFixtures()