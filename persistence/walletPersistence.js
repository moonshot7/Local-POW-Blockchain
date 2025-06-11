const fs = require("fs")
const pathDb = "database/wallet.json"
const getAllWallets = async () => {
    try {
        return JSON.parse(await fs.promises.readFile(pathDb))
    }
    catch (e) {
        throw e
    }
}

const saveAllWallets = async (wallets) => {
    try {
        await fs.promises.writeFile(pathDb, JSON.stringify(wallets, null, 3))
    }
    catch (e) {
        throw e
    }
}

updateWallet = async (wallet) => {
    try {
        let wallets = await getAllWallets()
        let wallet_to_update = wallets.find(ele => ele.pkey == wallet.pkey)
        if (wallet_to_update) {
            wallet_to_update.solde = wallet.solde
            wallet_to_update.sentTransactions = wallet.sentTransactions
            wallet_to_update.receivedTransactions = wallet.receivedTransactions
            wallet_to_update.minedTransactions = wallet.minedTransactions
            await saveAllWallets(wallets);
        }
        else {
            throw new Error("wallet not found")
        }
    }
    catch (e) {
        throw e
    }
}

addWallet = async (wallet) => {
    try {
        let wallets = await getAllWallets()
        let found = wallets.find(ele => ele.pkey == wallet.pkey)
        if (!found) {
            wallets.push(wallet)
            await saveAllWallets(wallets);
        }
        else {
            throw new Error("wallet already exist")
        }
    }
    catch (e) {
        throw e
    }
}

