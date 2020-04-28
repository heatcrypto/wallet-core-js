export class KeyPair {
  contructor(path, privateKeyHex, publicKeyHex) {
    this.path = path;
    this.privateKeyHex = privateKeyHex;
    this.publicKeyHex = publicKeyHex;
  }
}