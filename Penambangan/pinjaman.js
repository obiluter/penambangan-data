let paymentChart = null;

// Fungsi untuk memuat data pinjaman
function loadPinjamanData() {
    fetch('area1.php') // Memanggil file PHP yang akan mengembalikan data JSON
        .then(response => response.json()) // Mengonversi respons menjadi JSON
        .then(data => {
            // Tampilkan data di tabel
            populateTable(data);

            // Tampilkan data di grafik
            renderChart(data);
        })
        .catch(error => console.error('Error loading pinjaman data:', error));
}

// Fungsi untuk menampilkan data di tabel
function populateTable(data) {
    let tableBody = document.getElementById('pinjamanTable').getElementsByTagName('tbody')[0];

    // Menghapus isi tabel lama
    tableBody.innerHTML = '';

    // Menambahkan data baru ke tabel
    data.forEach(item => {
        let row = tableBody.insertRow();
        row.insertCell(0).textContent = item.id; // ID
        row.insertCell(1).textContent = item.id_pinjaman; // ID Pinjaman
        row.insertCell(2).textContent = item.tepat_waktu; // Pembayaran Tepat Waktu
        row.insertCell(3).textContent = item.terlambat; // Pembayaran Terlambat
    });

    // Inisialisasi DataTable agar tabel lebih interaktif
    $('#pinjamanTable').DataTable();
}

// Fungsi untuk menampilkan data di grafik garis
function renderChart(data) {
    // Ekstrak data untuk grafik
    const pinjamanLabels = data.map(item => `Pinjaman ${item.id_pinjaman}`);
    const tepatWaktuData = data.map(item => parseInt(item.tepat_waktu));
    const terlambatData = data.map(item => parseInt(item.terlambat));

    // Hapus grafik lama jika ada
    if (paymentChart) {
        paymentChart.destroy();
    }

    // Render grafik baru
    const ctx = document.getElementById('paymentChart').getContext('2d');
    paymentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: pinjamanLabels,
            datasets: [
                {
                    label: 'Tepat Waktu',
                    borderColor: 'rgba(78, 115, 223, 1)',
                    backgroundColor: 'rgba(78, 115, 223, 0.1)',
                    data: tepatWaktuData,
                    fill: true,
                    tension: 0.3, // Membuat garis melengkung
                    pointBackgroundColor: 'rgba(78, 115, 223, 1)',
                    pointRadius: 3
                },
                {
                    label: 'Terlambat',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    data: terlambatData,
                    fill: true,
                    tension: 0.3, // Membuat garis melengkung
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Untuk memungkinkan ukuran sedang
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw} pembayaran`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false // Menonaktifkan garis pada sumbu X
                    },
                    ticks: {
                        font: {
                            size: 12 // Ukuran font label sumbu X
                        },
                        autoSkip: false // Tidak melewatkan label, semua label ditampilkan
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString(); // Format angka
                        },
                        font: {
                            size: 12 // Ukuran font label sumbu Y
                        }
                    }
                }
            }
        }
    });
}

// Panggil fungsi saat halaman dimuat
window.onload = loadPinjamanData;
