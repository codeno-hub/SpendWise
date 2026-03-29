// js/app.js — bootstrap & master refresh orchestrator

/**
 * refreshAll() is the single function that re-renders every part
 * of the UI from the current state. Call it after any state mutation.
 */
function refreshAll() {
  refreshSummary();
  refreshAnalytics();
  updateCharts();
  buildMonthlyTable();
  renderTxns();
  renderIncomeList();
  renderSavingsList();
  buildCategoryUI();
}

/**
 * Boot sequence — runs once on DOMContentLoaded.
 * Order matters: state must load before UI builds.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Load persisted data
  loadState();

  // 2. Set month badge in topbar
  document.getElementById('month-badge').textContent =
    new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // 3. Set today as default date in all date pickers
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('inc-date').value = today;
  document.getElementById('exp-date').value = today;

  // 4. Set currency badge
  const cur = CURRENCIES.find(c => c.code === state.currency) || CURRENCIES[0];
  document.getElementById('cur-badge').textContent = `${cur.symbol} ${state.currency}`;

  // 5. Build sidebar currency grid
  buildCurrencyGrid();

  // 6. Initialise Chart.js canvases (must happen before updateCharts)
  initCharts();

  // 7. Render everything
  refreshAll();
});
