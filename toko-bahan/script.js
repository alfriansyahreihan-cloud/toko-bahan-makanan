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

// Export untuk testing (Node.js environment)
if (typeof module !== 'undefined') {
    module.exports = { Barang, Transaksi };
}