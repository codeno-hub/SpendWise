// js/currency.js — currency switching & formatting

function fmt(amount) {
  const cur = CURRENCIES.find(c => c.code === state.currency) || CURRENCIES[0];
  const n = Number(amount || 0);
  return cur.symbol + n.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function buildCurrencyGrid() {
  const grid = document.getElementById('cur-grid');
  grid.innerHTML = CURRENCIES.map(c => `
    <button
      class="cur-btn ${c.code === state.currency ? 'active' : ''}"
      title="${c.name}"
      onclick="setCurrency('${c.code}')"
    >${c.symbol} ${c.code}</button>
  `).join('');
}

function setCurrency(code) {
  state.currency = code;
  saveState();
  buildCurrencyGrid();
  const cur = CURRENCIES.find(c => c.code === code);
  document.getElementById('cur-badge').textContent = `${cur.symbol} ${code}`;
  refreshAll();
}
