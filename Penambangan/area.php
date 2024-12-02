<?php
include 'db.php'; // Menghubungkan ke database

// Query data nasabah beserta detail pinjaman dan pembayaran
$sql = "
    SELECT 
        nasabah.id AS nasabah_id,
        nasabah.nama,
        nasabah.pekerjaan,
        nasabah.alamat,
        nasabah.pendapatan,
        pinjaman.jumlah_pinjaman,
        pinjaman.bunga,
        pinjaman.angsuran_per_minggu,
        pinjaman.tanggal_pinjaman,
        pinjaman.total_minggu,
        pembayaran.tepat_waktu,
        pembayaran.terlambat,
        pinjaman.status_pinjaman
    FROM 
        nasabah
    LEFT JOIN 
        pinjaman ON nasabah.id = pinjaman.nasabah_id
    LEFT JOIN 
        pembayaran ON pinjaman.id = pembayaran.pinjaman_id
";

$result = $conn->query($sql);

// Menyimpan hasil query ke dalam array
$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Mengatur header untuk mengirim data sebagai JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
