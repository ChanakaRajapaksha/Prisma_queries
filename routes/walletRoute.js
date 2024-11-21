const express = require('express');
const { walletTransfer } = require('../services/walletService');

const router = express.Router();

router.post('/transfer', async (req, res) => {
    try {
        const { senderId, receiverId, amount } = req.body;
        const result = await walletTransfer(senderId, receiverId, amount);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
