// Fungsi untuk memuat data nasabah menggunakan AJAX
function loadNasabahData() {
    fetch('area.php') // Memanggil file PHP yang akan mengembalikan data JSON
        .then(response => response.json()) // Mengonversi respons menjadi JSON
        .then(data => {
            let tableBody = document.getElementById('nasabahTable').getElementsByTagName('tbody')[0];

            // Menghapus isi tabel lama
            tableBody.innerHTML = '';

            // Menambahkan data baru ke tabel
            data.forEach((nasabah, index) => {
                let row = tableBody.insertRow(); // Membuat baris baru

                // Menambahkan data ke dalam sel
                row.insertCell(0).textContent = nasabah.nasabah_id; // ID
                row.insertCell(1).textContent = nasabah.nama; // Nama
                row.insertCell(2).textContent = nasabah.pekerjaan; // Pekerjaan
                row.insertCell(3).textContent = nasabah.alamat; // Alamat
                row.insertCell(4).textContent = `Rp. ${Number(nasabah.pendapatan).toLocaleString()}`; // Pendapatan
                row.insertCell(5).textContent = `Rp. ${Number(nasabah.jumlah_pinjaman).toLocaleString()}`; // Jumlah Pinjaman
                row.insertCell(6).textContent = `Rp. ${Number(nasabah.jumlah_pinjaman * 0.2).toLocaleString()}`; // Bunga (20%)
                row.insertCell(7).textContent = `Rp. ${Number(nasabah.angsuran_per_minggu).toLocaleString()}`; // Angsuran / Minggu
                row.insertCell(8).textContent = nasabah.tanggal_pinjaman; // Tanggal Pinjaman
                row.insertCell(9).textContent = nasabah.total_minggu; // Total Minggu
                row.insertCell(10).textContent = nasabah.tepat_waktu; // P. Tepat Waktu
                row.insertCell(11).textContent = nasabah.terlambat; // P. Terlambat
                row.insertCell(12).textContent = nasabah.status_pinjaman; // Status Pinjaman
            });

            // Inisialisasi DataTable agar tabel lebih interaktif
            $('#nasabahTable').DataTable();
        })
        .catch(error => console.error('Error loading nasabah data:', error));
}

// Memanggil fungsi untuk memuat data saat halaman dimuat
window.onload = loadNasabahData;
