const bitcoin = require('bitcoinjs-lib');
const bip39 = require('bip39');

export class BitcoinWallet {
  constructor(mnemonic = bip39.generateMnemonic()) {
    this.mnemonic = mnemonic;
    this.seed = bip39.mnemonicToSeedSync(mnemonic);
    this.root = bitcoin.bip32.fromSeed(this.seed);
    this.path = "m/44'/0'/0'/0/0"; // BIP44 for Bitcoin
    this.keyPair = this.root.derivePath(this.path);
    this.address = bitcoin.payments.p2pkh({ pubkey: this.keyPair.publicKey }).address;
  }

  getAddress() {
    return this.address;
  }
}