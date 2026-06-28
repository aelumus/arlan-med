/* =============================================
   implants.js — Implant brands & detail modal
   ============================================= */

const IMPLANTS = [
  { id: 'megagen',   name: 'MegaGen',   flag: '🇰🇷', countryKey: 'brand_megagen_country',   image: 'img/implants/megagen.jpeg',   price: 200000 },
  { id: 'osstem',    name: 'Osstem',    flag: '🇰🇷', countryKey: 'brand_osstem_country',    image: 'img/implants/osstem.jpeg',    price: 150000 },
  { id: 'dio',       name: 'DIO',       flag: '🇰🇷', countryKey: 'brand_dio_country',       image: 'img/implants/dio.jpeg',       price: 110000 },
  { id: 'straumann', name: 'Straumann', flag: '🇨🇭', countryKey: 'brand_straumann_country', image: 'img/implants/straumann.webp', price: 350000 },
  { id: 'magicore',  name: 'Magicore',  flag: '🇰🇷', countryKey: 'brand_magicore_country',  image: 'img/implants/magicore.jpeg',  price: 250000 },
  { id: 'dentium',   name: 'Dentium',   flag: '🇰🇷', countryKey: 'brand_dentium_country',   image: 'img/implants/dentium.jpeg',   price: 160000 },
  { id: 'neodent',   name: 'Neodent',   flag: '🇧🇷', countryKey: 'brand_neodent_country',   image: 'img/implants/neodent.jpeg',   price: 300000 },
];

const IMPLANT_TEXT = {
  megagen: {
    intro: 'Импланты MegaGen — премиальная система дентальной имплантации из Южной Кореи, которой доверяют стоматологи по всему миру.',
    benefits: [
      'Высокая приживаемость — более 99%.',
      'Быстрое и надёжное срастание с костью.',
      'Подходят даже при сложных клинических случаях.',
      'Комфорт при установке и длительный срок службы.',
      'Естественная эстетика и восстановление полноценной жевательной функции.',
    ],
    outro: 'MegaGen — современное решение для тех, кто хочет вернуть красивую улыбку и уверенность на долгие годы.',
  },
  osstem: {
    intro: 'Osstem — одна из самых популярных систем имплантации в мире, сочетающая надёжность, качество и доступную стоимость.',
    benefits: [
      'Высокая приживаемость — более 98%.',
      'Проверенная система с миллионами успешных установок.',
      'Быстрое заживление и надёжная фиксация.',
      'Подходят для восстановления одного или нескольких зубов.',
      'Оптимальное соотношение цены и качества.',
    ],
    outro: 'Osstem — надёжный выбор для тех, кто хочет восстановить улыбку с гарантией качества и долговечности.',
  },
  dio: {
    intro: 'DIO — современная южнокорейская система имплантации, известная высокой точностью, надёжностью и инновационными технологиями.',
    benefits: [
      'Высокая приживаемость — более 98%.',
      'Надёжная первичная фиксация импланта.',
      'Быстрое заживление благодаря современному покрытию поверхности.',
      'Подходят для большинства клинических случаев.',
      'Долговечность, комфорт и естественный результат.',
    ],
    outro: 'DIO — отличный выбор для восстановления утраченных зубов с использованием современных технологий и проверенного качества.',
  },
  straumann: {
    intro: 'Straumann — одна из самых известных премиальных систем имплантации в мире, признанная эталоном качества, надёжности и долговечности.',
    benefits: [
      'Высокая приживаемость — до 99%.',
      'Швейцарское качество и более 70 лет опыта.',
      'Быстрое заживление благодаря инновационной поверхности импланта.',
      'Подходят даже при недостаточном объёме костной ткани.',
      'Максимальная эстетика, прочность и срок службы.',
    ],
    outro: 'Straumann — премиальное решение для тех, кто ценит безупречное качество, современные технологии и надёжный результат на долгие годы.',
  },
  magicore: {
    intro: 'Magicore — современная южнокорейская система имплантации, сочетающая надёжность, качество и доступную стоимость. Подходит для восстановления одного или нескольких утраченных зубов.',
    benefits: [
      'Высокая приживаемость — более 98%.',
      'Надёжная первичная фиксация импланта.',
      'Современная обработка поверхности для быстрого заживления.',
      'Подходят для большинства клинических случаев.',
      'Комфорт, долговечность и естественный внешний вид.',
    ],
    outro: 'Magicore — практичное решение для тех, кто хочет восстановить улыбку качественно, безопасно и по доступной цене.',
  },
  dentium: {
    intro: 'Dentium — современная система имплантации из Южной Кореи, сочетающая высокое качество, надёжность и доступную стоимость.',
    benefits: [
      'Высокая приживаемость — более 98%.',
      'Надёжная первичная фиксация импланта.',
      'Быстрое заживление благодаря специальной обработке поверхности.',
      'Подходят для восстановления одного, нескольких или всех зубов.',
      'Долговечность, комфорт и естественная эстетика.',
    ],
    outro: 'Dentium — оптимальный выбор для пациентов, которые ищут надёжную систему имплантации с отличным соотношением цены и качества.',
  },
  neodent: {
    intro: 'Neodent — одна из ведущих мировых систем имплантации, входящая в группу Straumann Group. Импланты сочетают современные технологии, высокую надёжность и доступную стоимость.',
    benefits: [
      'Высокая приживаемость — более 98%.',
      'Разработаны с использованием технологий Straumann.',
      'Надёжная первичная фиксация и быстрое заживление.',
      'Подходят для большинства клинических случаев.',
      'Естественная эстетика и долгий срок службы.',
    ],
    outro: 'Neodent — надёжное решение для восстановления зубов с мировыми стандартами качества и комфортом на долгие годы.',
  },
};

function formatPrice(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function formatImplantPrice(implant) {
  const lang = typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'ru';
  const formatted = formatPrice(implant.price);
  if (lang === 'kz') return `${formatted} ₸-дан`;
  if (lang === 'en') return `from ${formatted} ₸`;
  const from = typeof t === 'function' ? t('impl_price_from') : 'от';
  return `${from} ${formatted} ₸`;
}

function implantNoteText(implant) {
  const country = typeof t === 'function' ? t(implant.countryKey) : '';
  return `${country} · ${formatImplantPrice(implant)}`;
}

function syncImplantPrices() {
  IMPLANTS.forEach(implant => {
    document.querySelectorAll(`[data-brand-price="${implant.id}"]`).forEach(el => {
      el.textContent = formatImplantPrice(implant);
    });
    document.querySelectorAll(`[data-implant="${implant.id}"] .brand-card__note`).forEach(el => {
      el.textContent = implantNoteText(implant);
    });
  });
}

let activeImplantId = null;

function getImplantText(id) {
  const entry = IMPLANT_TEXT[id];
  if (!entry) return null;
  const lang = typeof window.getCurrentLang === 'function' ? window.getCurrentLang() : 'ru';
  if (entry[lang]?.intro) return entry[lang];
  if (entry.intro) return entry;
  return null;
}

function openImplantModal(id) {
  const implant = IMPLANTS.find(b => b.id === id);
  const overlay = document.getElementById('implant-overlay');
  if (!implant || !overlay) return;

  activeImplantId = id;
  const text = getImplantText(id);
  const img = overlay.querySelector('#implant-modal-img');
  const meta = overlay.querySelector('#implant-modal-meta');
  const title = overlay.querySelector('#implant-modal-title');
  const intro = overlay.querySelector('#implant-modal-intro');
  const list = overlay.querySelector('#implant-modal-benefits');
  const outro = overlay.querySelector('#implant-modal-outro');
  const price = overlay.querySelector('#implant-modal-price');
  const cta = overlay.querySelector('[data-implant-cta]');

  if (img) {
    img.src = implant.image;
    img.alt = implant.name;
  }
  if (meta) meta.textContent = implantNoteText(implant);
  if (title) {
    const prefix = typeof t === 'function' ? t('impl_modal_title') : 'Импланты';
    title.textContent = `${prefix} ${implant.name}`;
  }
  if (intro) intro.textContent = text?.intro || '';
  if (list) {
    list.innerHTML = (text?.benefits || []).map(b => `<li>${b}</li>`).join('');
  }
  if (outro) outro.textContent = text?.outro || '';
  if (price) price.textContent = formatImplantPrice(implant);
  if (cta) cta.dataset.service = 'Имплантация';

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeImplantModal() {
  const overlay = document.getElementById('implant-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  activeImplantId = null;
}

function refreshImplantModal() {
  syncImplantPrices();
  if (activeImplantId) openImplantModal(activeImplantId);
}

function initImplants() {
  const grid = document.getElementById('brands-grid');
  if (grid && !grid.children.length) {
    grid.innerHTML = IMPLANTS.map(b => `
      <button type="button" class="brand-card reveal" data-implant="${b.id}" aria-label="${b.name}">
        <div class="brand-card__flag">${b.flag}</div>
        <div class="brand-card__name">${b.name}</div>
        <div class="brand-card__note">${implantNoteText(b)}</div>
        <div class="brand-card__more" data-i18n="brand_more">Подробнее →</div>
      </button>`).join('');
  }

  document.querySelectorAll('[data-implant]').forEach(btn => {
    btn.addEventListener('click', () => openImplantModal(btn.dataset.implant));
  });

  const overlay = document.getElementById('implant-overlay');
  if (!overlay) return;

  overlay.querySelector('.implant-modal__close')?.addEventListener('click', closeImplantModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeImplantModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeImplantModal();
  });

  overlay.querySelector('[data-implant-cta]')?.addEventListener('click', () => {
    closeImplantModal();
    if (typeof window.openModal === 'function') window.openModal('', 'Имплантация');
  });

  syncImplantPrices();
}

document.addEventListener('DOMContentLoaded', initImplants);
window.openImplantModal = openImplantModal;
window.closeImplantModal = closeImplantModal;
window.refreshImplantModal = refreshImplantModal;
window.syncImplantPrices = syncImplantPrices;
window.IMPLANTS = IMPLANTS;
