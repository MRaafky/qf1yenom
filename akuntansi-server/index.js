const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); 
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      
    password: '',      
    database: 'akuntansi_db'
});

app.post('/api/jurnal', (req, res) => {
    const { tanggal, deskripsi, user_id, details } = req.body;

    const sqlHeader = "INSERT INTO journals (tanggal, deskripsi, user_id) VALUES (?, ?, ?)";
    db.query(sqlHeader, [tanggal, deskripsi, user_id || 1], (err, result) => {
        if (err) return res.status(500).send(err);

        const journalId = result.insertId;

        const detailValues = details.map(d => [journalId, d.kode_akun, d.debit, d.kredit]);
        const sqlDetail = "INSERT INTO journal_details (journal_id, kode_akun, debit, kredit) VALUES ?";
        
        db.query(sqlDetail, [detailValues], (err, result) => {
            if (err) return res.status(500).send(err);
            res.send({ message: "Jurnal berhasil disimpan", id: journalId });
        });
    });
});

app.get('/api/accounts', (req, res) => {
    db.query("SELECT * FROM accounts", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

app.listen(5000, () => {
    console.log("Server berjalan di port 5000");
});