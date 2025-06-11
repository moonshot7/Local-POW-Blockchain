// class Blockchain {
//     constructor(name = "uemfBlockchain", difficulty = 6,
//         miningInterval = 600, blockReward = 50, denom = "uemfCoin"
//     ) {
//         this.name = name
//         this.difficulty = difficulty
//         this.miningInterval = miningInterval
//         this.blockReward = blockReward
//         this.denom = denom
//         this.head = null
//         this.chain = [];
//     }

//     getBalances() {
//         const balances = {};
//         for (const block of this.chain) {
//             for (const tx of block.transactions) {
//                 if (!balances[tx.fromAddress]) balances[tx.fromAddress] = 0;
//                 if (!balances[tx.toAddress]) balances[tx.toAddress] = 0;
//                 balances[tx.fromAddress] -= tx.amount;
//                 balances[tx.toAddress] += tx.amount;
//             }
//         }
//         return balances;
//     }
// }

// module.exports = Blockchain

const Block  = require('./block');

class Blockchain {
  constructor(
    name           = 'uemfBlockchain',
    difficulty     = 2,
    miningInterval = 600,
    blockReward    = 50,
    denom          = 'uemfCoin'
  ) {
    this.name           = name;
    this.difficulty     = difficulty;
    this.miningInterval = miningInterval;
    this.blockReward    = blockReward;
    this.denom          = denom;

    this.chain    = [];
    this.balances = {};

    // Bloc genesis
    const genesis = new Block(
      0,               // height
      '0',             // previousHash
      Date.now(),      // timestamp
      [],              // transactions
      this.difficulty,
      this.blockReward
    );
    this.chain.push(genesis);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;

    // Proof-of-Work
    newBlock.hash = newBlock.calculateHash();
    while (!newBlock.hash.startsWith('0'.repeat(this.difficulty))) {
      newBlock.nonce++;
      newBlock.hash = newBlock.calculateHash();
    }

    this.chain.push(newBlock);
    console.log('Bloc ajouté :', newBlock.hash);

    // Mise à jour des soldes
    for (const tx of newBlock.transactions) {
      const { fromAddress, toAddress, amount } = tx;
      if (fromAddress) {
        this.balances[fromAddress] = (this.balances[fromAddress] || 0) - amount;
      }
      this.balances[toAddress] = (this.balances[toAddress] || 0) + amount;
    }
  }

  getBalances() {
    return this.balances;
  }
}

module.exports = Blockchain;
