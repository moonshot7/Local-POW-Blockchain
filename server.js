const express = require('express');
const cors     = require('cors');
const path     = require('path');
const crypto   = require('crypto');

const Blockchain  = require('./models/blockchain');
const Block       = require('./models/block');
const Transaction = require('./models/transaction');
const Wallet      = require('./models/wallet');
const { saveBlockchain, loadBlockchain } =
  require('./persistence/blockchainPersitence');

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let blockchain;
let mempool = [];

/* -------- initialisation ---------- */
async function initBlockchain() {
  try {
    blockchain = await loadBlockchain();
    console.log('Blockchain chargée.');
  } catch {
    blockchain = new Blockchain();
    await saveBlockchain(blockchain);
    console.log('Nouvelle blockchain créée.');
  }
}

/* -------- routes REST ------------- */
app.get('/blocks', (_, res) => {
  console.log('Longueur chaîne =', blockchain.chain.length);
  res.json(blockchain.chain);
});

app.post('/transactions', (req, res) => {
  const { fromAddress, toAddress, amount, signature = '' } = req.body;
  if (!fromAddress || !toAddress || !amount)
    return res.status(400).send('Champs manquants');

  mempool.push(new Transaction(fromAddress, toAddress, amount, signature));
  res.send('Transaction ajoutée au mempool');
});

app.get('/mempool', (_, res) => res.json(mempool));

app.post('/mine', async (_, res) => {
  if (!mempool.length) return res.send('Mempool vide');

  const newBlock = new Block(
    blockchain.chain.length,
    blockchain.getLatestBlock().hash,
    Date.now(),
    [...mempool],
    blockchain.difficulty,
    blockchain.blockReward,
    0,
    'Mery'
  );

  blockchain.addBlock(newBlock);
  mempool = [];
  await saveBlockchain(blockchain);
  res.send('Bloc miné avec succès');
});

app.get('/wallet', (_, res) => res.json(new Wallet()));

app.get('/balances', (_, res) => res.json(blockchain.getBalances()));

app.post('/verify-transaction', (req, res) => {
  const { fromAddress, toAddress, amount, signature, publicKey } = req.body;
  if (![fromAddress, toAddress, amount, signature, publicKey].every(Boolean))
    return res.status(400).send('Champs manquants');

  const verifier = crypto.createVerify('RSA-SHA256');
  verifier.update(fromAddress + toAddress + amount);
  res.json({ valid: verifier.verify(publicKey, signature, 'base64') });
});

// -------- démarrage
app.listen(PORT, async () => {
  await initBlockchain();
  console.log(`http://localhost:${PORT}`);
});
