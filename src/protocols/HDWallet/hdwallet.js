import * as bip39 from 'bip39'
import * as bip32 from 'bip32'
import { KeyPair } from './keypair'

export class HDWallet {
  bip39GenerateMnemonic() {
    return bip39.generateMnemonic()
  }

  bip39ValidateMnemonic(value) {
    return bip39.validateMnemonic(value)
  }

  /**
   * Derives a batch of bip44 paths in one operation and returns all derived
   * key pairs in one go. 
   * 
   * @param {string} mnemonic 
   * @param {Array<string>} paths 
   * @returns {Array<KeyPair>}
   */
  bip44BatchDeriveKeyPairs(mnemonic, paths) {
    if (!this.bip39ValidateMnemonic(mnemonic))
      throw new Error('Invalid mnemonic')
    const seed = bip39.mnemonicToSeedSync(mnemonic)
    const root = bip32.fromSeed(seed)
    const result = []
    paths.forEach(path => {
      let node = root.derivePath(path)
      let privateKey = node.privateKey.toString('hex')
      let publicKey = node.publicKey.toString('hex')
      result.push(new KeyPair(path, privateKey, publicKey))
    })
    return result
  }
}
