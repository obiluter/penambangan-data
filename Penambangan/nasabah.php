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
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Website Koperasi</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
    </style>
</head>
<body>
    <h1>Data Nasabah dan Pinjaman</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Pekerjaan</th>
                <th>Alamat</th>
                <th>Pendapatan</th>
                <th>Jumlah Pinjaman</th>
                <th>Bunga (20%)</th>
                <th>Angsuran / Minggu</th>
                <th>Tanggal Pinjaman</th>
                <th>Total Minggu</th>
                <th>P. Tepat Waktu</th>
                <th>P. Terlambat</th>
                <th>Status Pinjaman</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    echo "<tr>";
                    echo "<td>" . $row['nasabah_id'] . "</td>";
                    echo "<td>" . $row['nama'] . "</td>";
                    echo "<td>" . $row['pekerjaan'] . "</td>";
                    echo "<td>" . $row['alamat'] . "</td>";
                    echo "<td>" . $row['pendapatan'] . "</td>";
                    echo "<td>" . ($row['jumlah_pinjaman'] ?? '-') . "</td>";
                    echo "<td>" . ($row['bunga'] ?? '-') . "</td>";
                    echo "<td>" . ($row['angsuran_per_minggu'] ?? '-') . "</td>";
                    echo "<td>" . ($row['tanggal_pinjaman'] ?? '-') . "</td>";
                    echo "<td>" . ($row['total_minggu'] ?? '-') . "</td>";
                    echo "<td>" . ($row['tepat_waktu'] ?? '-') . "</td>";
                    echo "<td>" . ($row['terlambat'] ?? '-') . "</td>";
                    echo "<td>" . ($row['status_pinjaman'] ?? '-') . "</td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='13'>Tidak ada data</td></tr>";
            }
            ?>
        </tbody>
    </table>
</body>
</html>
