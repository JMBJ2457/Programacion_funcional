import { autos } from './data.js';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const state = {
  q: '',
  minPrice: 0,
  maxPrice: 0,
  minBound: 0,
  maxBound: 0,
};

const el = {
  q: $('#q'),
  minRange: $('#minRange'),
  maxRange: $('#maxRange'),
  minVal: $('#minVal'),
  maxVal: $('#maxVal'),
  rangeGroup: document.querySelector('.range-group'),
  clear: $('#clearBtn'),
  results: $('#results'),
  meta: $('#resultsMeta')
};

function filterAutos(items, { q, minPrice, maxPrice }) {
  const qn = q.trim().toLowerCase();
  const min = Number(minPrice) || 0;
  const max = Number(maxPrice) || 0;
  return items.filter(a => {
    const txt = `${a.marca} ${a.modelo}`.toLowerCase();
    const okText = qn === '' || txt.includes(qn);
    const okMin = a.precio >= min;
    const okMax = a.precio <= max;
    return okText && okMin && okMax;
  });
}

function formatMoney(n) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function render(items) {
  el.meta.textContent = `${items.length} resultado(s)`;
  el.results.innerHTML = items.map(a => `
    <article class="card" aria-label="${a.marca} ${a.modelo}">
      <div class="card-media">${a.imagen ? `<img src="${a.imagen}" alt="${a.marca} ${a.modelo}" loading="lazy" decoding="async">` : `${a.marca}`}</div>
      <div class="card-body">
        <h3 class="card-title">${a.marca} ${a.modelo}</h3>
        <div class="card-sub">Año ${a.anio}</div>
      </div>
      <div class="card-footer">
        <span class="price">${formatMoney(a.precio)}</span>
        <span class="badge">ID ${a.id}</span>
      </div>
    </article>
  `).join('');
}

function apply() {
  const result = filterAutos(autos, state);
  render(result);
}

function syncLabels() {
  el.minVal.textContent = formatMoney(state.minPrice);
  el.maxVal.textContent = formatMoney(state.maxPrice);
}

function onRangeInput() {
  let min = Number(el.minRange.value);
  let max = Number(el.maxRange.value);
  if (min > max) {
    if (this === el.minRange) max = min;
    else min = max;
  }
  state.minPrice = min;
  state.maxPrice = max;
  el.minRange.value = String(min);
  el.maxRange.value = String(max);
  syncLabels();
  updateRangeVisual();
  apply();
}

let t;
function debounce(fn, wait = 200) {
  return function(...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

function init() {
  const prices = autos.map(a => a.precio);
  const minBound = Math.min(...prices);
  const maxBound = Math.max(...prices);
  state.minBound = minBound;
  state.maxBound = maxBound;

  state.minPrice = minBound;
  state.maxPrice = maxBound;

  const step = 500;
  el.minRange.min = String(minBound);
  el.minRange.max = String(maxBound);
  el.minRange.step = String(step);
  el.minRange.value = String(state.minPrice);

  el.maxRange.min = String(minBound);
  el.maxRange.max = String(maxBound);
  el.maxRange.step = String(step);
  el.maxRange.value = String(state.maxPrice);

  syncLabels();
  updateRangeVisual();

  el.q.addEventListener('input', debounce(() => {
    state.q = el.q.value;
    apply();
  }));
  el.minRange.addEventListener('input', onRangeInput);
  el.maxRange.addEventListener('input', onRangeInput);
  el.clear.addEventListener('click', () => {
    el.q.value = '';
    state.q = '';
    state.minPrice = state.minBound;
    state.maxPrice = state.maxBound;
    el.minRange.value = String(state.minPrice);
    el.maxRange.value = String(state.maxPrice);
    syncLabels();
    updateRangeVisual();
    apply();
  });
  apply();
}

document.addEventListener('DOMContentLoaded', init);

function updateRangeVisual() {
  const { minBound, maxBound, minPrice, maxPrice } = state;
  const span = Math.max(1, maxBound - minBound);
  const minPct = ((minPrice - minBound) / span) * 100;
  const maxPct = ((maxPrice - minBound) / span) * 100;
  if (el.rangeGroup) {
    el.rangeGroup.style.setProperty('--min-pct', `${minPct}%`);
    el.rangeGroup.style.setProperty('--max-pct', `${maxPct}%`);
  }
}
