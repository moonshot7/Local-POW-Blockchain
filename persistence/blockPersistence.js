const pathFolder = "database/blocks"
const fs = require("fs");
const { loadBlockchain } = require("./blockchainPersitence");
const loadBlocks = async () => {

    try {
        let blocks = [];
        let listFiles = await fs.promises.readdir(pathFolder)
        let sortedFiles = listFiles.sort((file1, file2) => {
            let numeroFile1 = file1.slice(6, -5)
            let numeroFile2 = file2.slice(6, -5)
            return numeroFile1 - numeroFile2
        })
        let blockchain = await loadBlockchain();
        for (let i = 0; i < sortedFiles.length; i++) {
            let dataFile = await fs.promises.readFile(pathFolder + "/" + sortedFiles[i])
            dataFile = JSON.parse(dataFile)
            if (dataFile.height != i) {
                throw new Error("blockchain is broken")
            }
            let block = new Block(dataFile.height, dataFile.hash, dataFile.previousHash
                , dataFile.timestamp, dataFile.difficulty, dataFile.blockReward, dataFile.nonce,
                dataFile.miner)
            blocks.push(block)

            block.blockchain = blockchain
            if (block.height != 0)
                block.previousBlock = blocks[i - 1]
            block.transactions = dataFile.transactions
        }
        return blocks;
    } catch (error) {

    }
}
loadBlocks()
const saveBlocks = (blocks) => {

}

const saveBlock = (block) => {

}

const getBlock = (hash) => {

}

const getBlockByHeight = (height) => {

}