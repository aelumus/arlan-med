/* =============================================
   branches.js — Branch phones & WhatsApp
   Arlan Med Dental Clinic
   ============================================= */

const BRANCHES = [
  { id: 'comfort',     nameKey: 'br_comfort',     addrKey: 'br_serkebaeva_addr', phone: '77770437309' },
  { id: 'khan_tengri', nameKey: 'br_khan_tengri', addrKey: 'br_kenesari_addr',   phone: '77714650525' },
  { id: 'daraboz',     nameKey: 'br_daraboz',     addrKey: 'br_daraboz_addr',    phone: '77475259349' },
  { id: 'haliulina',   nameKey: 'br_haliulina',   addrKey: 'br_haliulina_addr',  phone: '77761364213' },
];

const WA_MSG = 'Здравствуйте! Хочу записаться на приём.';

function formatPhoneDisplay(phone) {
  const p = String(phone).replace(/\D/g, '');
  if (p.length === 11 && p.startsWith('7')) {
    return `+7 ${p.slice(1, 4)} ${p.slice(4, 7)} ${p.slice(7, 9)} ${p.slice(9)}`;
  }
  return '+' + p;
}

function waUrl(phone, text) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text || WA_MSG)}`;
}

function telUrl(phone) {
  return `tel:+${String(phone).replace(/\D/g, '')}`;
}

function branchName(key, fallback) {
  if (typeof t === 'function') {
    const val = t(key);
    if (val && val !== key) return val;
  }
  return fallback || key;
}

function getBranchById(id) {
  return BRANCHES.find(b => b.id === id);
}

function getBranchByModalValue(value) {
  if (!value) return BRANCHES[0];
  const byId = getBranchById(value);
  if (byId) return byId;
  const lower = value.toLowerCase();
  return BRANCHES.find(b =>
    lower.includes(b.id.replace('_', ' ')) ||
    (b.id === 'comfort' && lower.includes('комфорт')) ||
    (b.id === 'comfort' && lower.includes('serkebaeva')) ||
    (b.id === 'khan_tengri' && (lower.includes('тенгри') || lower.includes('kenesary') || lower.includes('кенесары'))) ||
    (b.id === 'daraboz' && lower.includes('дарабоз')) ||
    (b.id === 'haliulina' && (lower.includes('халиул') || lower.includes('khaliul')))
  ) || BRANCHES[0];
}

function branchRowHtml(branch, type, rowClass) {
  const cls = rowClass || 'branch-contact-row';
  const href = type === 'wa' ? waUrl(branch.phone) : telUrl(branch.phone);
  const extra = type === 'wa' ? ' target="_blank" rel="noopener"' : '';
  const name = branchName(branch.nameKey, branch.id);
  return `<a href="${href}"${extra} class="${cls}">
    <span class="${cls}__name" data-i18n="${branch.nameKey}">${name}</span>
    <span class="${cls}__phone">${formatPhoneDisplay(branch.phone)}</span>
  </a>`;
}

function fillBranchLists() {
  document.querySelectorAll('[data-branch-list="wa"]').forEach(el => {
    el.innerHTML = BRANCHES.map(b => branchRowHtml(b, 'wa', el.dataset.rowClass || 'branch-contact-row')).join('');
  });
  document.querySelectorAll('[data-branch-list="tel"]').forEach(el => {
    el.innerHTML = BRANCHES.map(b => branchRowHtml(b, 'tel', el.dataset.rowClass || 'branch-contact-row')).join('');
  });
  if (typeof applyTranslations === 'function') applyTranslations();
}

function fillMapCardContacts() {
  document.querySelectorAll('.map-card[data-branch]').forEach(card => {
    const branch = getBranchById(card.dataset.branch);
    if (!branch) return;
    const box = card.querySelector('[data-map-contacts]');
    if (!box) return;
    box.innerHTML = `
      <a href="${telUrl(branch.phone)}" class="map-contact-link map-contact-link--tel">
        <span>📞</span>
        <span><span class="map-contact-link__branch" data-i18n="${branch.nameKey}">${branchName(branch.nameKey)}</span> · ${formatPhoneDisplay(branch.phone)}</span>
      </a>
      <a href="${waUrl(branch.phone)}" target="_blank" rel="noopener" class="map-contact-link map-contact-link--wa">
        <span><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></span>
        <span><span class="map-contact-link__branch" data-i18n="${branch.nameKey}">${branchName(branch.nameKey)}</span> · WhatsApp</span>
      </a>`;
    if (typeof applyTranslations === 'function') applyTranslations();
  });
}

function fillFooterPhones() {
  document.querySelectorAll('[data-footer-phones]').forEach(el => {
    el.innerHTML = BRANCHES.map(b => `
      <div class="footer__contact-row">
        <span>📞</span>
        <span>
          <span data-i18n="${b.nameKey}">${branchName(b.nameKey)}</span>:
          <a href="${telUrl(b.phone)}" style="color:inherit">${formatPhoneDisplay(b.phone)}</a>
        </span>
      </div>`).join('');
    if (typeof applyTranslations === 'function') applyTranslations();
  });
}

function initWaFloat() {
  const floats = document.querySelectorAll('.wa-float');
  floats.forEach(floatEl => {
    if (floatEl.dataset.branchInit) return;
    floatEl.dataset.branchInit = '1';
    floatEl.classList.add('wa-float--menu');
    floatEl.innerHTML = `
      <div class="wa-float__panel" aria-hidden="true">
        <div class="wa-float__panel-title" data-i18n="qlink_wa">Написать в WhatsApp</div>
        ${BRANCHES.map(b => `
          <a href="${waUrl(b.phone)}" target="_blank" rel="noopener" class="wa-float__branch">
            <span class="wa-float__branch-name" data-i18n="${b.nameKey}">${branchName(b.nameKey)}</span>
            <span class="wa-float__branch-phone">${formatPhoneDisplay(b.phone)}</span>
          </a>`).join('')}
      </div>
      <button type="button" class="wa-float__btn" aria-label="WhatsApp" aria-expanded="false">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </button>`;

    const btn = floatEl.querySelector('.wa-float__btn');
    const panel = floatEl.querySelector('.wa-float__panel');
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const open = floatEl.classList.toggle('wa-float--open');
      btn.setAttribute('aria-expanded', open);
      panel.setAttribute('aria-hidden', !open);
    });
    document.addEventListener('click', e => {
      if (!floatEl.contains(e.target)) {
        floatEl.classList.remove('wa-float--open');
        btn.setAttribute('aria-expanded', 'false');
        panel.setAttribute('aria-hidden', 'true');
      }
    });
    if (typeof applyTranslations === 'function') applyTranslations();
  });
}

function patchHeaderPhones() {
  const contactsHref = document.getElementById('contacts-phones')
    ? '#contacts-phones'
    : 'contacts.html#contacts-phones';

  document.querySelectorAll('.header__phone').forEach(el => {
    el.href = contactsHref;
    const span = el.querySelector('span');
    if (span) {
      span.setAttribute('data-i18n', 'header_branches_short');
      if (typeof t === 'function') span.textContent = t('header_branches_short');
    }
  });

  document.querySelectorAll('.mobile-nav__bottom a[href*="77011880101"], .mobile-nav__bottom a[href*="701188"]').forEach(el => {
    el.href = contactsHref;
    el.innerHTML = '📞 <span data-i18n="header_branches_short">' + (typeof t === 'function' ? t('header_branches_short') : '4 филиала') + '</span>';
  });
}

function patchCtaSections() {
  document.querySelectorAll('.cta-section .cta-btns').forEach(box => {
    if (box.dataset.branchPatched) return;
    const hasOldPhone = box.querySelector('a[href*="77011880101"], a[href*="701188"]');
    if (!hasOldPhone) return;
    box.dataset.branchPatched = '1';
    box.className = 'cta-btns cta-btns--branches';
    box.innerHTML = `
      <div class="cta-branch-col">
        <div class="cta-branch-col__title" data-i18n="qlink_wa">Написать в WhatsApp</div>
        <div data-branch-list="wa" data-row-class="cta-branch-row"></div>
      </div>
      <div class="cta-branch-col">
        <div class="cta-branch-col__title" data-i18n="qlink_call">Позвонить нам</div>
        <div data-branch-list="tel" data-row-class="cta-branch-row"></div>
      </div>`;
  });
}

function patchFooterSocialWa() {
  document.querySelectorAll('.footer__social a[href*="77011880101"]').forEach(el => {
    el.href = 'contacts.html#contacts-phones';
    el.title = typeof t === 'function' ? t('qlink_wa') : 'WhatsApp';
  });
}

function fillBranchCards() {
  const order = ['comfort', 'daraboz', 'khan_tengri', 'haliulina'];
  document.querySelectorAll('.branches-grid .branch-card').forEach((card, i) => {
    const branch = getBranchById(order[i]);
    if (!branch) return;
    card.dataset.branch = branch.id;
    let box = card.querySelector('.branch-card__contacts');
    if (!box) {
      box = document.createElement('div');
      box.className = 'branch-card__contacts';
      const landmark = card.querySelector('.branch-card__landmark');
      if (landmark) landmark.after(box);
    }
    box.innerHTML = `
      <a href="${telUrl(branch.phone)}" class="branch-card__contact">
        <span>📞</span> <span data-i18n="${branch.nameKey}">${branchName(branch.nameKey)}</span> · ${formatPhoneDisplay(branch.phone)}
      </a>
      <a href="${waUrl(branch.phone)}" target="_blank" rel="noopener" class="branch-card__contact branch-card__contact--wa">
        <span>WhatsApp</span> · <span data-i18n="${branch.nameKey}">${branchName(branch.nameKey)}</span>
      </a>`;
  });
}

function initBranchContacts() {
  patchCtaSections();
  fillBranchLists();
  fillMapCardContacts();
  fillFooterPhones();
  fillBranchCards();
  patchHeaderPhones();
  patchFooterSocialWa();
  initWaFloat();
  if (typeof applyTranslations === 'function') applyTranslations();
}

function refreshBranchContacts() {
  patchCtaSections();
  fillBranchLists();
  fillMapCardContacts();
  fillFooterPhones();
  fillBranchCards();
  patchHeaderPhones();
  if (typeof applyTranslations === 'function') applyTranslations();
}

window.BRANCHES = BRANCHES;
window.getBranchByModalValue = getBranchByModalValue;
window.waUrl = waUrl;
window.formatPhoneDisplay = formatPhoneDisplay;
window.initBranchContacts = initBranchContacts;
window.refreshBranchContacts = refreshBranchContacts;

document.addEventListener('DOMContentLoaded', initBranchContacts);
