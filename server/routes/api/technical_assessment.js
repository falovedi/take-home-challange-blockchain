const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
const contractAddress = '0x73511669fd4dE447feD18BB79bAFeAC93aB7F31f';

router.get('/', async (req, res) => {
  try {
    const latestBlock = await provider.getBlockNumber();
    const block = await provider.getBlock(latestBlock);
    const txHash = block.transactions[0]; // Ambil transaksi pertama di blok terbaru

    if (!txHash) {
      return res
        .status(404)
        .json({ message: 'No transactions found in latest block' });
    }

    const tx = await provider.getTransactionReceipt(txHash);

    const timeStamp = (await provider.getBlock(tx.blockNumber)).timestamp;
    const deploymentDate = new Date(timeStamp * 1000); // Convert ke milidetik

    const contractInfo = {
      contractAddress: contractAddress,
      creator: tx.from,
      deploymentTimestamp: deploymentDate,
      network: await provider.getNetwork()
    };

    res.status(200).json(contractInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
