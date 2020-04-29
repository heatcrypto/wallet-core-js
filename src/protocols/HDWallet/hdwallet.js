import { mnemonicToSeedSync, generateMnemonic, validateMnemonic } from 'bip39'
import { fromSeed } from 'bip32'
import { KeyPair } from './keypair'

export class HDWallet {
  generateMnemonic() {
    return generateMnemonic()
  }

  validateMnemonic(value) {
    return validateMnemonic(value)
  }

  /**
   * Derives a batch of bip44 paths in one operation and returns all derived
   * key pairs in one go. 
   * 
   * @param {string} mnemonic 
   * @param {Array<string>} paths 
   * @returns {Array<KeyPair>}
   */
  batchDeriveKeyPairs(mnemonic, paths) {
    if (!this.validateMnemonic(mnemonic))
      throw new Error('Invalid mnemonic')
    const seed = mnemonicToSeedSync(mnemonic)
    const root = fromSeed(seed)
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
