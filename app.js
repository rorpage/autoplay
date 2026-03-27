const STATES = [
  { abbr: 'AL', name: 'Alabama' },      { abbr: 'AK', name: 'Alaska' },
  { abbr: 'AZ', name: 'Arizona' },      { abbr: 'AR', name: 'Arkansas' },
  { abbr: 'CA', name: 'California' },   { abbr: 'CO', name: 'Colorado' },
  { abbr: 'CT', name: 'Connecticut' },  { abbr: 'DC', name: 'Washington D.C.' },
  { abbr: 'DE', name: 'Delaware' },
  { abbr: 'FL', name: 'Florida' },      { abbr: 'GA', name: 'Georgia' },
  { abbr: 'HI', name: 'Hawaii' },       { abbr: 'ID', name: 'Idaho' },
  { abbr: 'IL', name: 'Illinois' },     { abbr: 'IN', name: 'Indiana' },
  { abbr: 'IA', name: 'Iowa' },         { abbr: 'KS', name: 'Kansas' },
  { abbr: 'KY', name: 'Kentucky' },     { abbr: 'LA', name: 'Louisiana' },
  { abbr: 'ME', name: 'Maine' },        { abbr: 'MD', name: 'Maryland' },
  { abbr: 'MA', name: 'Massachusetts' },{ abbr: 'MI', name: 'Michigan' },
  { abbr: 'MN', name: 'Minnesota' },    { abbr: 'MS', name: 'Mississippi' },
  { abbr: 'MO', name: 'Missouri' },     { abbr: 'MT', name: 'Montana' },
  { abbr: 'NE', name: 'Nebraska' },     { abbr: 'NV', name: 'Nevada' },
  { abbr: 'NH', name: 'New Hampshire' },{ abbr: 'NJ', name: 'New Jersey' },
  { abbr: 'NM', name: 'New Mexico' },   { abbr: 'NY', name: 'New York' },
  { abbr: 'NC', name: 'North Carolina' },{ abbr: 'ND', name: 'North Dakota' },
  { abbr: 'OH', name: 'Ohio' },         { abbr: 'OK', name: 'Oklahoma' },
  { abbr: 'OR', name: 'Oregon' },       { abbr: 'PA', name: 'Pennsylvania' },
  { abbr: 'RI', name: 'Rhode Island' }, { abbr: 'SC', name: 'South Carolina' },
  { abbr: 'SD', name: 'South Dakota' }, { abbr: 'TN', name: 'Tennessee' },
  { abbr: 'TX', name: 'Texas' },        { abbr: 'UT', name: 'Utah' },
  { abbr: 'VT', name: 'Vermont' },      { abbr: 'VA', name: 'Virginia' },
  { abbr: 'WA', name: 'Washington' },   { abbr: 'WV', name: 'West Virginia' },
  { abbr: 'WI', name: 'Wisconsin' },    { abbr: 'WY', name: 'Wyoming' }
];

const PROVINCES = [
  { abbr: 'AB', name: 'Alberta' },         { abbr: 'BC', name: 'British Columbia' },
  { abbr: 'MB', name: 'Manitoba' },        { abbr: 'NB', name: 'New Brunswick' },
  { abbr: 'NL', name: 'Newfoundland and Labrador' }, { abbr: 'NS', name: 'Nova Scotia' },
  { abbr: 'NT', name: 'Northwest Territories' },     { abbr: 'NU', name: 'Nunavut' },
  { abbr: 'ON', name: 'Ontario' },         { abbr: 'PE', name: 'Prince Edward Island' },
  { abbr: 'QC', name: 'Quebec' },          { abbr: 'SK', name: 'Saskatchewan' },
  { abbr: 'YT', name: 'Yukon' }
];

const PLATES_KEY    = 'license-plate-toggled';
const PROVINCES_KEY = 'license-plate-provinces-toggled';
const THEME_KEY     = 'autoplay-theme';
const TOTAL_US      = STATES.length;
const TOTAL_CA      = PROVINCES.length;
const TOTAL         = TOTAL_US + TOTAL_CA;

// ── Persistence ──────────────────────────────────────────────────────────────

function loadSet(key) {
  try {
    return new Set(JSON.parse(localStorage.getItem(key)) || []);
  } catch {
    return new Set();
  }
}

function saveSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

// ── Theme ─────────────────────────────────────────────────────────────────────

function getInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const SVG_SUN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
  <circle cx="12" cy="12" r="4"/>
  <line x1="12" y1="2"  x2="12" y2="5"/>
  <line x1="12" y1="19" x2="12" y2="22"/>
  <line x1="2"  y1="12" x2="5"  y2="12"/>
  <line x1="19" y1="12" x2="22" y2="12"/>
  <line x1="4.22"  y1="4.22"  x2="6.34"  y2="6.34"/>
  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
  <line x1="19.78" y1="4.22"  x2="17.66" y2="6.34"/>
  <line x1="6.34"  y1="17.66" x2="4.22"  y2="19.78"/>
</svg>`;

const SVG_MOON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>`;

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : '';
  themeBtn.innerHTML = theme === 'dark' ? SVG_SUN : SVG_MOON;
  themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  localStorage.setItem(THEME_KEY, theme);
}

// ── State ─────────────────────────────────────────────────────────────────────

const toggled          = loadSet(PLATES_KEY);
const toggledProvinces = loadSet(PROVINCES_KEY);

// ── DOM refs ──────────────────────────────────────────────────────────────────

const grid        = document.getElementById('grid');
const counter     = document.getElementById('counter');
const percent     = document.getElementById('percent');
const resetBtn    = document.getElementById('reset-btn');
const themeBtn    = document.getElementById('theme-btn');
const overlay     = document.getElementById('modal-overlay');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm= document.getElementById('modal-confirm');

// ── Build grid ────────────────────────────────────────────────────────────────

function buildButton(region, toggledSet, storageKey) {
  const { abbr, name } = region;
  const btn = document.createElement('button');
  btn.className = 'state-btn' + (toggledSet.has(abbr) ? ' toggled' : '');
  btn.setAttribute('aria-pressed', toggledSet.has(abbr).toString());
  btn.setAttribute('aria-label', name);

  const abbrEl = document.createElement('span');
  abbrEl.className = 'state-abbr';
  abbrEl.textContent = abbr;

  const nameEl = document.createElement('span');
  nameEl.className = 'state-name';
  nameEl.textContent = name;

  btn.appendChild(abbrEl);
  btn.appendChild(nameEl);

  btn.addEventListener('click', () => {
    if (toggledSet.has(abbr)) {
      toggledSet.delete(abbr);
      btn.classList.remove('toggled');
      btn.setAttribute('aria-pressed', 'false');
    } else {
      toggledSet.add(abbr);
      btn.classList.add('toggled');
      btn.setAttribute('aria-pressed', 'true');
    }
    saveSet(storageKey, toggledSet);
    updateCounter();
  });

  return btn;
}

function buildSection(regions, toggledSet, storageKey, title, countId) {
  const header = document.createElement('div');
  header.className = 'section-header';

  const titleEl = document.createElement('span');
  titleEl.className = 'section-title';
  titleEl.textContent = title;

  const countEl = document.createElement('span');
  countEl.className = 'section-count';
  countEl.id = countId;

  header.appendChild(titleEl);
  header.appendChild(countEl);
  grid.appendChild(header);

  regions.forEach(region => grid.appendChild(buildButton(region, toggledSet, storageKey)));
}

buildSection(STATES, toggled, PLATES_KEY, 'US States', 'us-count');
buildSection(PROVINCES, toggledProvinces, PROVINCES_KEY, 'Canadian Provinces', 'ca-count');

// ── Counter ───────────────────────────────────────────────────────────────────

function updateCounter() {
  const usN = toggled.size;
  const caN = toggledProvinces.size;
  const n = usN + caN;
  counter.textContent = `${n} / ${TOTAL}`;
  percent.textContent = `${Math.round((n / TOTAL) * 100)}%`;
  document.getElementById('us-count').textContent = `${usN} / ${TOTAL_US}`;
  document.getElementById('ca-count').textContent = `${caN} / ${TOTAL_CA}`;
}

updateCounter();

// ── Theme toggle ──────────────────────────────────────────────────────────────

let currentTheme = getInitialTheme();
applyTheme(currentTheme);

themeBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme);
});

// ── Reset flow ────────────────────────────────────────────────────────────────

resetBtn.addEventListener('click', () => {
  overlay.hidden = false;
  modalConfirm.focus();
});

modalCancel.addEventListener('click', closeModal);

overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !overlay.hidden) closeModal();
});

modalConfirm.addEventListener('click', () => {
  toggled.clear();
  toggledProvinces.clear();
  saveSet(PLATES_KEY, toggled);
  saveSet(PROVINCES_KEY, toggledProvinces);
  document.querySelectorAll('.state-btn.toggled').forEach(btn => {
    btn.classList.remove('toggled');
    btn.setAttribute('aria-pressed', 'false');
  });
  updateCounter();
  closeModal();
});

function closeModal() {
  overlay.hidden = true;
  resetBtn.focus();
}

// ── Service worker ────────────────────────────────────────────────────────────

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
