const express = require('express');

const orderRoutes = require('./routes/orderRoute');
// const walletRoutes = require('./routes/walletRoutes');

const app = express();
app.use(express.json());

app.use('/orders', orderRoutes);
// app.use('/wallets', walletRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
