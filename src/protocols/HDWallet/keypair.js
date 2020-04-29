export class KeyPair {
  /**
   * @param {string} path
   * @param {string} privateKeyHex
   * @param {string} publicKeyHex
   */
  constructor(path, privateKeyHex, publicKeyHex) {
    this.path = path;
    this.privateKeyHex = privateKeyHex;
    this.publicKeyHex = publicKeyHex;
  }
}