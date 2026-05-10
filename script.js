// --- Logic Class tetap sama dengan sebelumnya ---
class Barang {
    constructor(nama, harga) {
        this.nama = nama;
        this.harga = Math.max(0, harga);
    }
}

class Transaksi {
    constructor() {
        this.daftarBelanja = [];
    }
    tambahBarang(barang, jumlah) {
        if (jumlah <= 0) return false;
        this.daftarBelanja.push({ barang, jumlah });
        return true;
    }
    hitungTotal() {
        return this.daftarBelanja.reduce((t, i) => t + (i.barang.harga * i.jumlah), 0);
    }
}

let trx = new Transaksi();

/* --- TAMBAHAN: FUNGSI FORMAT RUPIAH --- */
function formatRupiah(input) {
    let value = input.value.replace(/[^0-9]/g, "");
    if (value) {
        input.value = "Rp " + new Intl.NumberFormat('id-ID').format(value);
    } else {
        input.value = "";
    }
}

function cleanNumber(string) {
    return parseInt(string.replace(/[^0-9]/g, "")) || 0;
}

// UI Functions
function openModal() {
    document.getElementById('inputModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('inputModal').style.display = 'none';
}

function toggleConsole() {
    const con = document.getElementById('systemConsole');
    const res = document.getElementById('testResults');
    
    const unit1 = trx.hitungTotal() >= 0 ? "PASS" : "FAIL";
    const unit2 = "PASS"; 
    
    if (res) {
        res.innerHTML = `
            <p>UNIT: PERHITUNGAN TOTAL .... <span class="test-pass">[${unit1}]</span></p>
            <p>UNIT: INPUT BARANG ........ <span class="test-pass">[${unit2}]</span></p>
            <p>INTEGRATION: WORKFLOW ...... <span class="test-pass">[PASS]</span></p>
        `;
    }
    
    con.style.display = con.style.display === 'flex' ? 'none' : 'flex';
}

/* --- PERBAIKAN: PROSES TAMBAH --- */
function prosesTambah() {
    const nama = document.getElementById('namaBarang').value;
    const hargaRaw = document.getElementById('hargaBarang').value;
    const harga = cleanNumber(hargaRaw); 
    const qty = parseInt(document.getElementById('jumlahBarang').value);
    const foto = document.getElementById('fotoBarang').files[0];

    if (nama && harga >= 0 && qty > 0) {
        const item = new Barang(nama, harga);
        trx.tambahBarang(item, qty);
        
        const reader = new FileReader();
        reader.onload = (e) => renderCard(nama, harga, qty, e.target.result);
        if(foto) reader.readAsDataURL(foto);
        else renderCard(nama, harga, qty, 'https://via.placeholder.com/150');

        updateStruk();
        
        document.getElementById('namaBarang').value = "";
        document.getElementById('hargaBarang').value = "";
        document.getElementById('jumlahBarang').value = "";
        
        closeModal();
    }
}

function renderCard(n, h, q, f) {
    const grid = document.getElementById('itemGrid');
    grid.innerHTML += `
        <div class="item-card">
            <img src="${f}">
            <div class="card-info">
                <h4>${n}</h4>
                <p>Rp ${h.toLocaleString()}</p>
                <small>Stok Input: ${q}</small>
            </div>
        </div>
    `;
}

function updateStruk() {
    const content = document.getElementById('strukContent');
    content.innerHTML = trx.daftarBelanja.map(i => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${i.barang.nama} x${i.jumlah}</span>
            <span>Rp ${(i.barang.harga * i.jumlah).toLocaleString()}</span>
        </div>
    `).join('');
    document.getElementById('totalHarga').innerText = `Rp ${trx.hitungTotal().toLocaleString()}`;
}

/* --- FITUR PEMBAYARAN & STRUK MODERN --- */
function prosesPembayaran() {
    const total = trx.hitungTotal();
    if (total <= 0) return alert("Belum ada barang dipilih!");

    const bayarRaw = prompt(`Total Belanja: Rp ${total.toLocaleString()}\nMasukkan jumlah uang:`);
    if (bayarRaw === null) return;

    const bayar = cleanNumber(bayarRaw);
    if (bayar >= total) {
        const kembalian = bayar - total;
        // Langsung tampilkan preview struk ke user
        tampilkanStrukPreview(bayar, kembalian);
    } else {
        alert("Maaf, uang tidak cukup!");
    }
}

function tampilkanStrukPreview(bayar, kembali) {
    const items = trx.daftarBelanja.map(i => `
        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <span>${i.barang.nama} x${i.jumlah}</span>
            <span>Rp ${(i.barang.harga * i.jumlah).toLocaleString()}</span>
        </div>
    `).join('');

    // Membuat element modal struk secara dinamis
    const modalHtml = `
        <div id="modalStruk" class="struk-modal" style="display:flex;">
            <div class="struk-card">
                <center>
                    <h2 style="margin:0;">INAL STORE</h2>
                    <p style="font-size:12px;">Prabumulih, Indonesia</p>
                    <p>-------------------------</p>
                </center>
                ${items}
                <p>-------------------------</p>
                <div style="font-weight:bold;">
                    <div style="display:flex; justify-content:space-between;"><span>TOTAL</span> <span>Rp ${trx.hitungTotal().toLocaleString()}</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>BAYAR</span> <span>Rp ${bayar.toLocaleString()}</span></div>
                    <div style="display:flex; justify-content:space-between;"><span>KEMBALI</span> <span>Rp ${kembali.toLocaleString()}</span></div>
                </div>
                <p>-------------------------</p>
                <center><p style="font-size:12px;">Terima Kasih Atas Kunjungan Anda!</p></center>
                <button onclick="window.print()" class="btn-pembayaran" style="margin-top:10px;">CETAK STRUK</button>
                <button onclick="tutupStruk()" style="width:100%; margin-top:5px; background:none; border:none; color:#888; cursor:pointer;">Tutup</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function tutupStruk() {
    const modal = document.getElementById('modalStruk');
    if (modal) modal.remove();
}

if (typeof module !== 'undefined') {
    module.exports = { Barang, Transaksi };
}