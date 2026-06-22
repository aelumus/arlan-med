/* =============================================
   gallery.js — Before/After slider
   Arlan Med Dental Clinic
   ============================================= */

function initBeforeAfter() {
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const after = slider.querySelector('.ba-after');
    const divider = slider.querySelector('.ba-divider');
    let dragging = false;

    function setPosition(x) {
      const rect = slider.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(5, Math.min(95, pct));
      divider.style.left = pct + '%';
      after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    }

    divider.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
    divider.addEventListener('touchstart', e => { dragging = true; }, { passive: true });

    document.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });
    document.addEventListener('touchmove', e => { if (dragging) setPosition(e.touches[0].clientX); }, { passive: true });
    document.addEventListener('mouseup', () => { dragging = false; });
    document.addEventListener('touchend', () => { dragging = false; });

    // Click to set position
    slider.addEventListener('click', e => {
      if (e.target !== divider) setPosition(e.clientX);
    });
  });
}

// Gallery filter
function initGalleryFilter() {
  const filterBar = document.querySelector('.gallery-filter');
  const cards = document.querySelectorAll('.ba-card');
  if (!filterBar || !cards.length) return;

  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    cards.forEach(card => {
      const match = cat === 'all' || card.dataset.cat === cat;
      card.style.display = match ? '' : 'none';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfter();
  initGalleryFilter();
});
