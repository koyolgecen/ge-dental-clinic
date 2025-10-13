document.querySelectorAll('.cert-thumb').forEach(img => {
    img.addEventListener('click', e => {
        const idx = e.target.getAttribute('data-index');
        const carousel = bootstrap.Carousel.getOrCreateInstance(document.querySelector('#modalCarousel'));
        const carousel2 = bootstrap.Carousel.getOrCreateInstance(document.querySelector('#modalCarousel2'));
        carousel.to(idx);
        carousel2.to(idx);
    });
});

// Tüm .dipl-thumb tıklamalarını tek noktadan yakala
document.addEventListener('click', function (e) {
    const thumb = e.target.closest('.dipl-thumb');
    if (!thumb) return;

    // Hedef modal id'sini al (#diplomaModal / #diplomaModal2)
    const targetSel = thumb.getAttribute('data-bs-target');
    const modalEl = document.querySelector(targetSel);
    if (!modalEl) return;

    // Modal içindeki img'yi bul ve doldur
    const img = modalEl.querySelector('img');
    if (img) {
        img.src = thumb.dataset.full || thumb.src;
        img.alt = (thumb.alt || 'Diploma') + ' — Büyütülmüş';
    }
});
