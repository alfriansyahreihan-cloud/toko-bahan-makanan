const { Barang, Transaksi } = require('./script'); 

// B. UNIT TEST
test('Unit Test Total Belanja: Perhitungan harus benar', () => {
    const trx = new Transaksi();
    // Perbaikan: Ganti tambahItem menjadi tambahBarang
    trx.tambahBarang(new Barang("Beras", 10000), 2); 
    expect(trx.hitungTotal()).toBe(20000);
});

test('Unit Test Input Barang: Tidak boleh ada harga negatif', () => {
    const item = new Barang("Garam", -5000);
    expect(item.harga).toBe(0);
});

// C. INTEGRATION TEST
test('Integration Test Toko: Input -> Transaksi -> Total', () => {
    const trx = new Transaksi();
    const b1 = new Barang("Susu", 15000);
    // Perbaikan: Ganti tambahItem menjadi tambahBarang
    trx.tambahBarang(b1, 1); 
    
    // Perbaikan: Ganti keranjang menjadi daftarBelanja
    expect(trx.daftarBelanja.length).toBe(1);
    expect(trx.hitungTotal()).toBe(15000);
});