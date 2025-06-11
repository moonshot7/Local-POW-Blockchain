// class Transaction {
//     constructor(signature, fees, amount, receiver, sender) {
//         this.signature = signature
//         this.fees = fees
//         this.amount = amount
//         this.mempool = null;
//         this.block = null
//         this.sender = receiver
//         this.receiver = sender 
//     }
// }

// module.exports = Transaction;

class Transaction {
  constructor(fromAddress, toAddress, amount, signature = '') {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.signature = signature;
  }
}

module.exports = Transaction;
