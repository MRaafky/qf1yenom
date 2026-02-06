import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

console.log('DB URL check:', process.env.DATABASE_URL ? 'Loaded' : 'Missing');


async function main() {
    console.log('Connecting to Prisma...');
    await prisma.$connect();
    console.log('✅ Connected successfully!');
    await prisma.$disconnect();
}

main().catch((e) => {
    console.error('❌ Error connecting:');
    console.error(e);
    process.exit(1);
});
