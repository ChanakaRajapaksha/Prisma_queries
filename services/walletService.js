const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const walletTransfer = async (senderId, receiverId, amount) => {
    try {
        const result = await prisma.$transaction(async (prisma) => {
            // Validate Sender's Wallet
            const sender = await prisma.wallet.findUnique({
                where: { userId: senderId },
            });

            if (!sender) throw new Error(`Sender with ID ${senderId} not found.`);
            if (sender.balance < amount) throw new Error('Insufficient balance.');

            // Validate Receiver's Wallet
            const receiver = await prisma.wallet.findUnique({
                where: { userId: receiverId },
            });

            if (!receiver) throw new Error(`Receiver with ID ${receiverId} not found.`);

            // Deduct Amount from Sender
            await prisma.wallet.update({
                where: { userId: senderId },
                data: { balance: { decrement: amount } },
            });

            // Add Amount to Receiver
            await prisma.wallet.update({
                where: { userId: receiverId },
                data: { balance: { increment: amount } },
            });

            // Log Transaction
            const transactionLog = await prisma.transactionLog.create({
                data: {
                    senderId,
                    receiverId,
                    amount,
                    status: 'SUCCESS', 
                    createdAt: new Date(),
                },
            });

            return transactionLog;
        });

        console.log('Wallet transfer successful:', result);
        return result;
    } catch (error) {
        console.error('Transaction failed:', error.message);

        await prisma.transactionLog.create({
            data: {
                senderId,
                receiverId,
                amount,
                status: 'FAILED',
                createdAt: new Date(),
            },
        });

        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

module.exports = { walletTransfer };
