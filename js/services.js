
// Filtre (nav-pills)
document.querySelectorAll('#svcFilter [data-filter]').forEach(link=>{
    link.addEventListener('click', (e)=>{
        e.preventDefault(); // sayfa tepesi/mevcut hash zıplamasın
        document.querySelectorAll('#svcFilter .nav-link').forEach(a=>a.classList.remove('active'));
        link.classList.add('active');

        const f = link.dataset.filter;
        document.querySelectorAll('.svc-item').forEach(card=>{
            card.style.display = (f === '*' || card.dataset.cat === f) ? '' : 'none';
        });
    });
});

// Arama
const inp = document.getElementById('svcSearch');
if (inp) {
    inp.addEventListener('input', ()=>{
        const q = inp.value.toLowerCase().trim();
        document.querySelectorAll('.svc-item').forEach(card=>{
            const hay = (card.textContent + ' ' + (card.dataset.tags||'')).toLowerCase();
            card.style.display = hay.includes(q) ? '' : 'none';
        });
    });
}

// Derin bağlantı (#implant gibi)
window.addEventListener('DOMContentLoaded', ()=>{
    if (location.hash) {
        const el = document.querySelector(location.hash);
        if (el) {
            const wrap = el.closest('.svc-item');
            if (wrap) {
                const cat = wrap.dataset.cat;
                const btn = document.querySelector(`#svcFilter [data-filter="${cat}"]`);
                if (btn) btn.click();
            }
            el.scrollIntoView({behavior:'smooth', block:'start'});
        }
    }
});