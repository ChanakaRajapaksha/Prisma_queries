const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const placeOrder = async (customerId, orderItems) =>{
    try {
        const result = await prisma.$transaction(async (prisma) => {

            // Validate Customer
            const customer = await prisma.customer.findUnique({
                where: { id: customerId },
            });

            if (!customer) {
                throw new Error(`Customer with ID ${customerId} does not exist.`);
            }

            // Create an Order
            const order = await prisma.order.create({
                data: {
                    customerId,
                    status: 'PENDING',
                    createdAt: new Date(),
                },
            });

            // Iterate through order items and validate stock
            for (const item of orderItems) {
                const product = await prisma.product.findUnique({
                    where: { id: item.productId },
                });

                if (!product || product.stock < item.quantity) {
                    throw new Error(
                        `Insufficient stock for product ID: ${item.productId}`
                    );
                }

                // Deduct stock
                await prisma.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                });

                // Add item to OrderDetails
                await prisma.orderDetail.create({
                    data: {
                        orderId: order.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: product.price,
                    },
                });
            }

            // Finalize order
            await prisma.order.update({
                where: { id: order.id },
                data: { status: 'CONFIRMED' },
            });

            return order;
        });

        console.log('Order placed successfully:', result);
        return result;
    } catch (error) {
        console.error('Transaction failed:', error.message);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

module.exports = { placeOrder };

