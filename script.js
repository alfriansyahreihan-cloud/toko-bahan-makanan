// --- A. PENGEMBANGAN APLIKASI (Logic) ---
class Barang {
    constructor(nama, harga) {
        this.nama = nama;
        this.harga = Math.max(0, harga); // Proteksi nilai negatif
    }
}

class Transaksi {
    constructor() {
        this.daftarBelanja = []; // Gunakan nama ini secara konsisten
    }

    tambahBarang(barang, jumlah) { // Gunakan nama ini secara konsisten
        if (jumlah <= 0) return false;
        this.daftarBelanja.push({ barang, jumlah });
        return true;
    }

    hitungTotal() {
        return this.daftarBelanja.reduce((total, item) => {
            return total + (item.barang.harga * item.jumlah);
        }, 0);
    }
}

function prosesTambah() {
    const nama = document.getElementById('namaBarang').value;
    const harga = parseFloat(document.getElementById('hargaBarang').value);
    const qty = parseInt(document.getElementById('jumlahBarang').value);
    const fotoInput = document.getElementById('fotoBarang');

    if (nama && harga >= 0 && qty > 0) {
        if (fotoInput.files && fotoInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const fotoUrl = e.target.result;
                const item = new Barang(nama, harga);
                transaksiAktif.tambahBarang(item, qty);
                
                // Tambah Card ke Grid
                tambahKeGrid(nama, harga, qty, fotoUrl);
                updateUI();
            };
            reader.readAsDataURL(fotoInput.files[0]);
        } else {
            // Jika tanpa foto
            const item = new Barang(nama, harga);
            transaksiAktif.tambahBarang(item, qty);
            tambahKeGrid(nama, harga, qty, 'https://via.placeholder.com/150');
            updateUI();
        }
    }
}

function tambahKeGrid(nama, harga, qty, foto) {
    const grid = document.getElementById('itemGrid');
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
        <img src="${foto}">
        <h4>${nama}</h4>
        <span class="price-tag">Rp ${harga.toLocaleString()}</span>
        <small>Qty: ${qty}</small>
    `;
    grid.appendChild(card);
}

// FITUR CETAK STRUK
function cetakStruk() {
    const content = document.getElementById('strukContent').innerText;
    const total = document.getElementById('totalHarga').innerText;
    
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Cetak Struk - InalStore</title>');
    printWindow.document.write('<style>body{font-family:monospace; padding:20px;} .line{border-top:1px dashed #000; margin:10px 0;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>InalStore</h1>');
    printWindow.document.write('<div class="line"></div>');
    printWindow.document.write('<pre>' + content + '</pre>');
    printWindow.document.write('<div class="line"></div>');
    printWindow.document.write('<h3>' + total + '</h3>');
    printWindow.document.write('</body></html>');
    
    printWindow.document.close();
    printWindow.print();
}
// Export untuk testing (Node.js environment)
if (typeof module !== 'undefined') {
    module.exports = { Barang, Transaksi };
}