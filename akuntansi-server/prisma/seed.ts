import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create connection
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);

    try {
        // Insert roles
        console.log('Creating roles...');
        await connection.execute(`
      INSERT IGNORE INTO roles (role_id, nama_role) VALUES (1, 'Admin'), (2, 'User')
    `);
        console.log('✅ Roles created');

        // Create test admin user
        console.log('Creating test admin user...');
        const hashedPassword = await bcrypt.hash('admin123', 10);

        await connection.execute(`
      INSERT INTO users (nama, email, password_hash, role_id) 
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        nama = VALUES(nama),
        password_hash = VALUES(password_hash)
    `, ['Administrator', 'admin@akuntans.com', hashedPassword, 1]);

        console.log('✅ Admin user created');
        console.log('\n🎉 Database seeding completed!');
        console.log('\n📋 Test User Credentials:');
        console.log('   Email: admin@akuntans.com');
        console.log('   Password: admin123');
    } catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    } finally {
        await connection.end();
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
