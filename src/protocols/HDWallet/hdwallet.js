import { mnemonicToSeedSync, generateMnemonic, validateMnemonic } from 'bip39'
import { fromSeed, } from 'bip32'
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
   * @param {{
   *  wif: number;
   *  bip32: {
   *   public: number;
   *   private: number;
   *  };
   *  messagePrefix?: string;
   *  bech32?: string;
   *  pubKeyHash?: number;
   *  scriptHash?: number;
   * }} network
   * @returns {Array<KeyPair>}
   */
  batchDeriveKeyPairs(mnemonic, paths, network) {
    if (!this.validateMnemonic(mnemonic))
      throw new Error('Invalid mnemonic')
    const seed = mnemonicToSeedSync(mnemonic)
    const root = fromSeed(seed, network)
    const result = []
    paths.forEach(path => {
      let node = root.derivePath(path)
      let privateKey = node.privateKey.toString('hex')
      let publicKey = node.publicKey.toString('hex')
      let privateKeyWif = node.toWIF()
      result.push(new KeyPair(path, privateKey, publicKey, privateKeyWif))
    })
    return result
  }
}
