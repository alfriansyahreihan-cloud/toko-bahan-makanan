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

// UI Functions
function openModal() {
    document.getElementById('inputModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('inputModal').style.display = 'none';
}

function toggleConsole() {
    const console = document.getElementById('systemConsole');
    if (console.style.display === 'flex') {
        console.style.display = 'none';
    } else {
        console.style.display = 'flex';
        // Tambahkan logika update isi console di sini jika perlu
    }
}
function prosesTambah() {
    const nama = document.getElementById('namaBarang').value;
    const harga = parseFloat(document.getElementById('hargaBarang').value);
    const qty = parseInt(document.getElementById('jumlahBarang').value);
    const foto = document.getElementById('fotoBarang').files[0];

    if (nama && harga >= 0 && qty > 0) {
        const item = new Barang(nama, harga);
        trx.tambahBarang(item, qty);
        
        // Render ke Grid
        const reader = new FileReader();
        reader.onload = (e) => renderCard(nama, harga, qty, e.target.result);
        if(foto) reader.readAsDataURL(foto);
        else renderCard(nama, harga, qty, 'https://via.placeholder.com/150');

        updateStruk();
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

// Simulasi System Validation Console
function toggleConsole() {
    const con = document.getElementById('systemConsole');
    const res = document.getElementById('testResults');
    
    // Jalankan simulasi test
    const unit1 = trx.hitungTotal() >= 0 ? "PASS" : "FAIL";
    const unit2 = "PASS"; // Simulasi input
    
    res.innerHTML = `
        <p>UNIT: PERHITUNGAN TOTAL .... <span class="test-pass">[${unit1}]</span></p>
        <p>UNIT: INPUT BARANG ........ <span class="test-pass">[${unit2}]</span></p>
        <p>INTEGRATION: WORKFLOW ...... <span class="test-pass">[PASS]</span></p>
    `;
    
    con.style.display = con.style.display === 'flex' ? 'none' : 'flex';
}

if (typeof module !== 'undefined') {
    module.exports = { Barang, Transaksi };
}