// class Wallet {
//     constructor(pkey = "") {
//         this.pkey = pkey
//         this.solde = 0
//         this.sentTransactions= []
//         this.receivedTransactions= []
//         this.minedTransactions = []
//     }
// }

// module.exports=Wallet

const crypto = require('crypto');

class Wallet {
  constructor() {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 512,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    });

    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }
}

module.exports = Wallet;