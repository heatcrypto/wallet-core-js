export class KeyPair {
  /**
   * @param {string} path
   * @param {string} privateKeyHex
   * @param {string} publicKeyHex
   * @param {string} privateKeyWif
   */
  constructor(path, privateKeyHex, publicKeyHex, privateKeyWif) {
    this.path = path;
    this.privateKeyHex = privateKeyHex;
    this.publicKeyHex = publicKeyHex;
    this.privateKeyWif = privateKeyWif;
  }
}