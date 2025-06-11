// class Block {
//     constructor(height, hash, previousHash, 
//         timestamp, difficulty, blockReward,nonce,miner) {
//         this.height=height
//         this.hash=hash
//         this.previousHash=previousHash
//         this.timestamp=timestamp
//         this.difficulty=difficulty
//         this.blockReward=blockReward
//         this.nonce=nonce
//         this.miner = miner
//         this.previousBlock = null
//         this.blockchain = null
//         this.transactions = []
//     }
// }
// module.exports = Block;

const crypto = require('crypto');

class Block {
  constructor(
    height,
    previousHash,
    timestamp,
    transactions,
    difficulty   = 2,
    blockReward  = 50,
    nonce        = 0,
    miner        = null
  ) {
    this.height        = height;
    this.previousHash  = previousHash;
    this.timestamp     = timestamp;
    this.transactions  = transactions;
    this.difficulty    = difficulty;
    this.blockReward   = blockReward;
    this.nonce         = nonce;
    this.miner         = miner;
    this.hash          = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        this.height +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
      )
      .digest('hex');
  }
}

module.exports = Block;
