document.querySelectorAll('.cert-thumb').forEach(img => {
    img.addEventListener('click', e => {
        const idx = e.target.getAttribute('data-index');
        const carousel = bootstrap.Carousel.getOrCreateInstance(document.querySelector('#modalCarousel'));
        const carousel2 = bootstrap.Carousel.getOrCreateInstance(document.querySelector('#modalCarousel2'));
        carousel.to(idx);
        carousel2.to(idx);
    });
});

// Thumb'a tıklanınca modal görselini doldur
document.querySelector('.dipl-thumb')?.addEventListener('click', function(){
    document.getElementById('modalDiplomaImage').src = this.dataset.full || this.src;
});