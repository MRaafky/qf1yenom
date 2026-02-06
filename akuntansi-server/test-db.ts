import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    console.log('Testing MySQL connection...');
    console.log('URL:', process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@')); // Mask password

    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL!);
        console.log('✅ Connected successfully!');

        const [rows] = await connection.execute('SELECT * FROM users');
        console.log('Users found:', (rows as any[]).length);
        console.log('First user:', (rows as any[])[0]);

        await connection.end();
    } catch (error) {
        console.error('❌ Connection failed:', error);
    }
}

main();
