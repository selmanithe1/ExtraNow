const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Testing connection...");
        const extrasCount = await prisma.extra.count();
        console.log("Connection successful. Extras count:", extrasCount);
    } catch (e) {
        console.error("Connection failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
