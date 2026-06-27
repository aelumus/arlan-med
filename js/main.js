/* =============================================
   main.js — Core functionality
   Arlan Med Dental Clinic
   ============================================= */

const INSTAGRAM = 'https://www.instagram.com/arlan_med/';
const TIKTOK = 'https://www.tiktok.com/@arlanmed.dent';
const GIS = 'https://2gis.kz/almaty/branches/70000001065666704';

// ===== HEADER SCROLL =====
function updateHeaderState() {
  const header = document.querySelector('.header');
  if (!header) return;
  const isHero = document.querySelector('.hero');
  const scrolled = window.scrollY > 40;

  header.classList.toggle('scrolled', scrolled);
  if (isHero) {
    header.classList.toggle('hero-mode', !scrolled);
  } else {
    header.classList.remove('hero-mode');
  }
}

function initHeader() {
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
  window.addEventListener('load', () => {
    updateHeaderState();
    setTimeout(updateHeaderState, 50);
    setTimeout(updateHeaderState, 300);
  });
  window.addEventListener('hashchange', () => requestAnimationFrame(updateHeaderState));
}

// ===== BURGER MENU =====
function initBurger() {
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!burger || !mobileNav) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', e => {
    if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ===== SCROLL REVEAL =====
function revealVisibleElements() {
  if (location.hash) {
    const target = document.querySelector(location.hash);
    target?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('visible');
    });
  }

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    if (el.classList.contains('visible')) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 80 && rect.bottom > -80) {
      el.classList.add('visible');
    }
  });
}

function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;

  revealVisibleElements();
  document.documentElement.classList.add('js');
  revealVisibleElements();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

  els.forEach(el => {
    if (!el.classList.contains('visible')) observer.observe(el);
  });

  const refresh = () => requestAnimationFrame(revealVisibleElements);
  let scrollTick = false;
  window.addEventListener('scroll', () => {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => {
      revealVisibleElements();
      scrollTick = false;
    });
  }, { passive: true });
  window.addEventListener('load', () => {
    refresh();
    setTimeout(revealVisibleElements, 50);
    setTimeout(revealVisibleElements, 300);
  }, { once: true });
  window.addEventListener('hashchange', refresh);
  setTimeout(revealVisibleElements, 100);
  setTimeout(revealVisibleElements, 600);
}

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = prefix + (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ===== MODAL =====
function initModal() {
  const overlay = document.querySelector('.overlay');
  const modal = document.querySelector('.modal');
  if (!overlay || !modal) return;

  function openModal(doctorName = '', service = '') {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (doctorName) {
      const commentEl = modal.querySelector('#modal-comment');
      if (commentEl) commentEl.value = `Запись к врачу: ${doctorName}`;
    }
    if (service) {
      const serviceEl = modal.querySelector('#modal-service');
      if (serviceEl) {
        const opt = [...serviceEl.options].find(o => o.value === service || o.textContent.includes(service));
        if (opt) serviceEl.value = opt.value;
      }
    }
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  modal.querySelector('.modal__close')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Trigger buttons
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const doctor = btn.dataset.doctor || '';
      const service = btn.dataset.service || '';
      openModal(doctor, service);
    });
  });

  // Form submit → WhatsApp
  const form = modal.querySelector('.form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('#modal-name')?.value || '';
      const phone = form.querySelector('#modal-phone')?.value || '';
      const service = form.querySelector('#modal-service')?.value || '';
      const branchVal = form.querySelector('#modal-branch')?.value || '';
      const comment = form.querySelector('#modal-comment')?.value || '';
      const branchObj = typeof getBranchByModalValue === 'function'
        ? getBranchByModalValue(branchVal)
        : (window.BRANCHES && window.BRANCHES[0]);
      const branchPhone = branchObj?.phone || '77770437309';

      const msg = `Здравствуйте! Хочу записаться на приём.
👤 Имя: ${name}
📞 Телефон: ${phone}
Услуга: ${service}
📍 Филиал: ${branchVal}${comment ? '\n💬 ' + comment : ''}`;

      const url = typeof waUrl === 'function'
        ? waUrl(branchPhone, msg)
        : `https://wa.me/${branchPhone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      closeModal();
    });
  }

  window.openModal = openModal;
}

// ===== ACTIVE NAV LINK =====
function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const isActive = href === path || (path === 'index.html' && href === './') || href.includes(path);
    link.classList.toggle('active', isActive);
  });
}

// ===== SMOOTH SCROLL for anchor links =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setTimeout(revealVisibleElements, 400);
        setTimeout(updateHeaderState, 400);
      }
    });
  });
}

// ===== LAZY IMAGES =====
function initLazyImages() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  if ('loading' in HTMLImageElement.prototype) return; // native support

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        observer.unobserve(img);
      }
    });
  });
  imgs.forEach(img => observer.observe(img));
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initBurger();
  initReveal();
  initCounters();
  initModal();
  initActiveNav();
  initSmoothScroll();
  initLazyImages();
  if (typeof initLang === 'function') initLang();
});
