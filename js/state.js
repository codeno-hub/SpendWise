// js/state.js — single source of truth

const state = {
  currency: 'USD',
  categories: JSON.parse(JSON.stringify(DEFAULT_CATEGORIES)),
  incomes:  [],
  savings:  [],
  expenses: [],
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved.currency)   state.currency   = saved.currency;
    if (saved.categories) state.categories = saved.categories;
    if (saved.incomes)    state.incomes    = saved.incomes;
    if (saved.savings)    state.savings    = saved.savings;
    if (saved.expenses)   state.expenses   = saved.expenses;
  } catch (e) {
    console.warn('SpendWise: could not load saved state.', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('SpendWise: could not save state.', e);
  }
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
