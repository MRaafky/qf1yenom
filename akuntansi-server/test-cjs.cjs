const { PrismaClient } = require('./generated/prisma/client.js');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
    console.log('Connecting (CJS)...');
    await prisma.$connect();
    console.log('Connected!');
    await prisma.$disconnect();
}

main().catch(console.error);
