[Building a Local Proof-of-Work Blockchain.pdf](https://github.com/user-attachments/files/20698406/Building.a.Local.Proof-of-Work.Blockchain.pdf)
# Building a Local Proof-of-Work Blockchain

This project is a simplified educational implementation of a blockchain using **Node.js**.
It features a functional Proof-of-Work system, transaction signing with RSA, a mempool, mining with block rewards, and a web interface to interact with the blockchain.

---

## Features

- ✅ Wallet generation (RSA key pairs)
- ✅ Digital transaction signing and verification
- ✅ Mempool for pending transactions
- ✅ Mining new blocks with Proof-of-Work
- ✅ Block rewards for miners
- ✅ Blockchain persistence using JSON files
- ✅ Real-time balance calculation
- ✅ Simple and modern web interface (HTML/CSS/JS)

---

## Folder Structure
Local-POW-Blockchain/
├── models/ # Block, Blockchain, Transaction, Wallet
├── persistence/ # blockchainPersistence, mempoolPersistence
├── public/ # Frontend files (HTML, JS, CSS)
│ ├── index.html
│ ├── main.js
│ └── style.css
├── server.js # Express backend server
├── sign.js # Script to sign messages manually


---

## Getting Started

### 1. Clone the repository

git clone https://github.com/moonshot7/Local-POW-Blockchain.git
cd Local-POW-Blockchain

### 2. Install dependencies
npm install

### 3. Launch the server
node server.js

### Server will be available at:
http://localhost:3000

---

### How to Create a Signed Transaction
1.Run the signing script:
node sign.js
2.Paste your private key, from address, to address, and amount.
3.Copy the generated signature.
4.Paste it in the transaction form in the interface.

---
 Author
Meryem Dardouri
Cybersecurity Engineering Student – UEMF 2025
Project: Blockchain Local Proof-of-Work Implementation
