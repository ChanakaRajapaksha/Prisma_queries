const express = require('express');
const { placeOrder } = require('../services/orderService');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { customerId, orderItems } = req.body;
        const result = await placeOrder(customerId, orderItems);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
