<?php
include 'db.php'; // Menghubungkan ke database

// Query data nasabah beserta pembayaran tepat waktu dan terlambat
$sql = "
    SELECT 
        nasabah.id AS id, 
        pinjaman.id AS id_pinjaman, 
        pembayaran.tepat_waktu, 
        pembayaran.terlambat
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
