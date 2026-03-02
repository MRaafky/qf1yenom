import "dotenv/config";
import { generateToken } from "./src/config/helper.js";

const testAuthorization = async () => {
    console.log("=== Memulai Tes Middleware Authorization ===");

    // 1. Buat token buatan untuk 'Pegawai' (Bukan Admin)
    const tokenBukanAdmin = generateToken({
        userId: "10",
        email: "kasir@test.com",
        role: "Kasir",
        permissions: ["read_accounts"]
    });

    // 2. Buat token buatan untuk 'Admin'
    const tokenAdmin = generateToken({
        userId: "11",
        email: "admin@test.com",
        role: "Admin",
        permissions: ["read_accounts", "create_accounts"]
    });

    console.log("\n[TEST 1] Akses Tanpa Token");
    try {
        const res1 = await fetch("http://localhost:3000/api/test-admin");
        console.log(`Status: ${res1.status}`);
        const data1 = await res1.json();
        console.log("Respon:", data1);
    } catch (err) {
        console.error("Fetch gagal:", err);
    }

    console.log("\n[TEST 2] Akses dengan Token 'Kasir' (Otorisasi Gagal)");
    try {
        const res2 = await fetch("http://localhost:3000/api/test-admin", {
            headers: {
                "Authorization": `Bearer ${tokenBukanAdmin}`
            }
        });
        console.log(`Status: ${res2.status}`);
        const data2 = await res2.json();
        console.log("Respon:", data2);
    } catch (err) {
        console.error("Fetch gagal:", err);
    }

    console.log("\n[TEST 3] Akses dengan Token 'Admin' (Otorisasi Berhasil)");
    try {
        const res3 = await fetch("http://localhost:3000/api/test-admin", {
            headers: {
                "Authorization": `Bearer ${tokenAdmin}`
            }
        });
        console.log(`Status: ${res3.status}`);
        const data3 = await res3.json();
        console.log("Respon:", data3);
    } catch (err) {
        console.error("Fetch gagal:", err);
    }
};

testAuthorization();
