// Fungsi murni untuk membuka dan menutup modal agar bisa dites
function openModalAction(modalElement) {
    if (modalElement) modalElement.style.display = "flex";
}

function closeModalAction(modalElement) {
    if (modalElement) modalElement.style.display = "none";
}

// Ekspor fungsi agar bisa dibaca oleh Jest (tanpa merusak web asli)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { openModalAction, closeModalAction };
}
/**
 * Nuswa Clothing - Main Script
 * Handle Modals and Scroll Tracking
 */

document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. LOGIKA MODAL (BELANJA & KONTAK)
    // ==========================================
    const modals = {
        shop: document.getElementById("shopModal"),
        contact: document.getElementById("contactModal")
    };

    const triggers = {
        shop: document.querySelectorAll(".btn-belanja"),
        contact: document.querySelectorAll(".btn-contact")
    };

    const closeButtons = document.querySelectorAll(".close-modal");

    // Fungsi buka modal
    const openModal = (modalType) => {
        if (modals[modalType]) {
            modals[modalType].style.display = "flex";
        }
    };

    // Fungsi tutup semua modal
    const closeAllModals = () => {
        Object.values(modals).forEach(modal => {
            if (modal) modal.style.display = "none";
        });
    };

    // Event Listener untuk tombol Belanja
    triggers.shop.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal('shop');
        });
    });

    // Event Listener untuk tombol Kontak
    triggers.contact.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal('contact');
        });
    });

    // Event Listener untuk tombol Close (X)
    closeButtons.forEach(btn => {
        btn.addEventListener("click", closeAllModals);
    });

    // Tutup modal jika klik di luar area konten putih
    window.addEventListener("click", (event) => {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });


    // ==========================================
    // 2. LOGIKA SCROLL TRACKER & DOTS
    // ==========================================
    const scrollContainer = document.querySelector('.scroll-container');

    // PENGAMAN: Jika tidak ada fitur scroll-container (misal di halaman kategori), jangan jalankan script di bawah ini
    if (scrollContainer) {
        const sections = document.querySelectorAll('.hero-section');
        const dots = document.querySelectorAll('.dot');

        const observerOptions = {
            root: scrollContainer,
            threshold: 0.5
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    dots.forEach(dot => dot.classList.remove('active'));

                    const targetId = entry.target.id;
                    const activeDot = document.querySelector(`.dot[data-target="${targetId}"]`);

                    if (activeDot) {
                        activeDot.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => scrollObserver.observe(section));

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const targetId = dot.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});