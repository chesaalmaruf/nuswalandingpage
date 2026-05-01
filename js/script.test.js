// Import fungsi yang mau dites dari script.js
const { openModalAction, closeModalAction } = require('./script.js');

describe('Pengujian Pop-up Modal Nuswa Clothing', () => {

    // Setup: Buat elemen HTML tiruan sebelum tiap tes berjalan
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="testModal" style="display: none;">
                Konten Pop-up
            </div>
        `;
    });

    test('Harus mengubah style display menjadi "flex" saat modal dibuka', () => {
        const modal = document.getElementById('testModal');

        // Jalankan fungsi
        openModalAction(modal);

        // Harapan (Ekspektasi): Display harus berubah jadi flex
        expect(modal.style.display).toBe('flex');
    });

    test('Harus mengubah style display menjadi "none" saat modal ditutup', () => {
        const modal = document.getElementById('testModal');

        // Kita buka dulu
        modal.style.display = 'flex';

        // Jalankan fungsi tutup
        closeModalAction(modal);

        // Harapan (Ekspektasi): Display harus kembali ke none
        expect(modal.style.display).toBe('none');
    });
});