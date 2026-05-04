// Import ketiga fungsi yang mau dites dari script.js
const { openModalAction, closeModalAction, toggleMenuAction } = require('./script.js');

// ========================================================
// 1. PENGUJIAN POP-UP MODAL
// ========================================================
describe('Pengujian Pop-up Modal Nuswa Clothing', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="testModal" style="display: none;">Konten Pop-up</div>
        `;
    });

    test('Harus mengubah style display menjadi "flex" saat modal dibuka', () => {
        const modal = document.getElementById('testModal');
        openModalAction(modal);
        expect(modal.style.display).toBe('flex');
    });

    test('Harus mengubah style display menjadi "none" saat modal ditutup', () => {
        const modal = document.getElementById('testModal');
        modal.style.display = 'flex';
        closeModalAction(modal);
        expect(modal.style.display).toBe('none');
    });
});

// ========================================================
// 2. PENGUJIAN HAMBURGER MENU (MOBILE)
// ========================================================
describe('Pengujian Hamburger Menu Mobile', () => {
    // Setup: Bikin tiruan elemen HTML Hamburger Menu
    beforeEach(() => {
        document.body.innerHTML = `
            <i id="menuToggle" class="fas fa-bars"></i>
            <div id="navLinks" class="nav-links"></div>
        `;
    });

    test('Menu TERBUKA: Harus menambah class "active" dan ubah ikon jadi silang', () => {
        const toggle = document.getElementById('menuToggle');
        const nav = document.getElementById('navLinks');

        // Simulasikan fungsi diklik
        toggleMenuAction(toggle, nav);

        // Ekspektasi Web:
        expect(nav.classList.contains('active')).toBe(true); // Menu muncul
        expect(toggle.classList.contains('fa-times')).toBe(true); // Ikon silang ada
        expect(toggle.classList.contains('fa-bars')).toBe(false); // Ikon garis tiga hilang
    });

    test('Menu TERTUTUP: Harus menghapus class "active" dan kembali ke garis tiga', () => {
        const toggle = document.getElementById('menuToggle');
        const nav = document.getElementById('navLinks');

        // Buka menu dulu
        toggleMenuAction(toggle, nav);
        // Tutup menu (klik kedua)
        toggleMenuAction(toggle, nav);

        // Ekspektasi Web:
        expect(nav.classList.contains('active')).toBe(false); // Menu hilang
        expect(toggle.classList.contains('fa-bars')).toBe(true); // Ikon garis tiga kembali
        expect(toggle.classList.contains('fa-times')).toBe(false); // Ikon silang hilang
    });
});