const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const seedDatabase = async () => {
    try {
        // Seed Customers
        await prisma.customer.create({
            data: {
                id: 1, 
                name: 'Chanaka Rajapaksha',
                email: 'chanaka@gamil.com',
            },
        });

        // Seed Products
        await prisma.product.createMany({
            data: [
                { id: 101, name: 'Product A', price: 100, stock: 10 },
                { id: 102, name: 'Product B', price: 200, stock: 10 },
            ],
        });

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error.message);
    } finally {
        await prisma.$disconnect();
    }
};

seedDatabase();
