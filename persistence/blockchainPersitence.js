// const fs = require("fs")
// const { resolve } = require("path")
// const pathDb = "database/blockchain.json"
// const saveBlockchain = async (blockchain) => {
//     const { name, difficulty, miningInterval,
//         blockReward, denom, head } = blockchain

//     if (head != null) {
//         head = head.hash
//     }
//     try {
//         await fs.promises.writeFile(pathDb, JSON.stringify(
//             {
//                 name, difficulty, miningInterval, blockReward, denom, head
//             }, null, 3
//         ))
//         return true;
//     }
//     catch (e) {
//         console.error(e)
//         throw e
//     }
// }
// const loadBlockchain = () => {
//     return new Promise((resolve, reject) => {
//         fs.promises.readFile(pathDb)
//             .then(data => {
//                 data = JSON.parse(data)
//                 resolve(data)
//             })
//             .catch(e => {
//                 console.error(e)
//                 reject(null)
//             })
//     })
// }
// module.exports = {
//     loadBlockchain, saveBlockchain
// }

const fs   = require('fs').promises;
const path = require('path');

const Blockchain = require('../models/blockchain');
const Block      = require('../models/block');

const DB = path.join(__dirname, '..', 'database', 'blockchain.json');

/* -------- Sauvegarde -------- */
async function saveBlockchain(bc) {
  await fs.mkdir(path.dirname(DB), { recursive: true });
  await fs.writeFile(DB, JSON.stringify(bc, null, 2), 'utf-8');
}

/* -------- Chargement + ré-hydratation -------- */
async function loadBlockchain() {
  const raw   = await fs.readFile(DB, 'utf-8');
  const plain = JSON.parse(raw);

  // recrée la vraie instance Blockchain
  const bc = new Blockchain(
    plain.name,
    plain.difficulty,
    plain.miningInterval,
    plain.blockReward,
    plain.denom
  );

  // recrée chaque Block correctement
  bc.chain = plain.chain.map(b => new Block(
    b.height,
    b.previousHash,
    b.timestamp,
    b.transactions,
    b.difficulty,
    b.blockReward,
    b.nonce,
    b.miner
  ));

  // restaure les soldes
  bc.balances = plain.balances || {};

  return bc;
}

module.exports = { saveBlockchain, loadBlockchain };
