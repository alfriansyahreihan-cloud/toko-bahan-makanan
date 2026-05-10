class Barang {
    constructor(nama, harga) {
        this.nama = nama;
        this.harga = harga < 0 ? 0 : harga; // Proteksi nilai negatif
    }
}

class Transaksi {
    constructor() {
        this.keranjang = [];
    }

    tambahItem(barang, qty) {
        if (qty <= 0) return false;
        this.keranjang.push({ barang, qty });
        return true;
    }

    hitungTotal() {
        return this.keranjang.reduce((acc, item) => acc + (item.barang.harga * item.qty), 0);
    }

    tampilkanStruk() {
        if (this.keranjang.length === 0) return "Keranjang Kosong";
        return this.keranjang.map(item => 
            `${item.barang.nama} x${item.qty} = Rp${item.barang.harga * item.qty}`
        ).join('\n');
    }
}

// Export agar bisa dibaca Jest
module.exports = { Barang, Transaksi };

// Tambahkan ini di akhir file agar bisa dibaca oleh Jest
if (typeof module !== 'undefined') {
    module.exports = { Barang, Transaksi };
}