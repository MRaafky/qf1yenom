import { useState } from "react";
import { Table, Input, Button, DatePicker, Card, message } from "antd";
import axios from "axios";

export default function InputJurnal() {
  const [header, setHeader] = useState({ tanggal: "", deskripsi: "" });
  const [details, setDetails] = useState([]);

  const addRow = () => {
    setDetails([...details, { kode_akun: "", debit: 0, kredit: 0, key: Date.now() }]);
  };

  const columns = [
    {
      title: "Kode Akun",
      dataIndex: "kode_akun",
      render: (text, record, index) => (
        <Input 
          placeholder="Kode Akun" 
          onChange={(e) => updateDetail(index, "kode_akun", e.target.value)} 
        />
      ),
    },
    {
      title: "Debit",
      dataIndex: "debit",
      render: (text, record, index) => (
        <Input type="number" onChange={(e) => updateDetail(index, "debit", e.target.value)} />
      ),
    },
    {
      title: "Kredit",
      dataIndex: "kredit",
      render: (text, record, index) => (
        <Input type="number" onChange={(e) => updateDetail(index, "kredit", e.target.value)} />
      ),
    },
  ];

  const updateDetail = (index, field, value) => {
    const newDetails = [...details];
    newDetails[index][field] = value;
    setDetails(newDetails);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/jurnal", {
        ...header,
        details: details
      });
      message.success("Jurnal berhasil disimpan!");
    } catch (error) {
      message.error("Gagal menyimpan jurnal");
    }
  };

  return (
    <Card title="Input Jurnal Umum" style={{ margin: 20 }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <DatePicker onChange={(date, dateString) => setHeader({ ...header, tanggal: dateString })} />
        <Input 
          placeholder="Deskripsi Transaksi" 
          onChange={(e) => setHeader({ ...header, deskripsi: e.target.value })} 
        />
      </div>

      <Table dataSource={details} columns={columns} pagination={false} rowKey="key" />
      
      <Button type="dashed" onClick={addRow} style={{ marginTop: 10, width: "100%" }}>
        + Tambah Baris
      </Button>

      <Button type="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
        Simpan Transaksi
      </Button>
    </Card>
  );
}