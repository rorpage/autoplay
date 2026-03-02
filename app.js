const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const STORAGE_KEY = 'states-tracker-toggled';

// Load persisted state
function loadToggled() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)) || []);
  } catch {
    return new Set();
  }
}

function saveToggled(set) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

// State
const toggled = loadToggled();

// DOM refs
const grid = document.getElementById('grid');
const counter = document.getElementById('counter');
const resetBtn = document.getElementById('reset-btn');
const overlay = document.getElementById('modal-overlay');
const modalCancel = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');

// Build grid
STATES.forEach(state => {
  const btn = document.createElement('button');
  btn.className = 'state-btn' + (toggled.has(state) ? ' toggled' : '');
  btn.textContent = state;
  btn.dataset.state = state;
  btn.setAttribute('aria-pressed', toggled.has(state).toString());

  btn.addEventListener('click', () => {
    if (toggled.has(state)) {
      toggled.delete(state);
      btn.classList.remove('toggled');
      btn.setAttribute('aria-pressed', 'false');
    } else {
      toggled.add(state);
      btn.classList.add('toggled');
      btn.setAttribute('aria-pressed', 'true');
    }
    saveToggled(toggled);
    updateCounter();
  });

  grid.appendChild(btn);
});

function updateCounter() {
  counter.textContent = `${toggled.size} / 50`;
}

updateCounter();

// Reset flow
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
  saveToggled(toggled);
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

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
