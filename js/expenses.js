// js/expenses.js — add, delete expense entries

function addExpense() {
  const desc   = document.getElementById('exp-desc').value.trim() || 'Expense';
  const amount = parseFloat(document.getElementById('exp-amount').value);
  const cat    = document.getElementById('exp-cat').value;
  const subcat = document.getElementById('exp-subcat').value.trim();
  const date   = document.getElementById('exp-date').value;

  if (!amount || amount <= 0) { showToast('⚠️ Enter a valid amount'); return; }
  if (!date)                  { showToast('⚠️ Pick a date'); return; }

  state.expenses.push({ id: uid(), desc, amount, cat, subcat, date });
  document.getElementById('exp-amount').value = '';
  document.getElementById('exp-desc').value   = '';
  document.getElementById('exp-subcat').value = '';

  saveState();
  refreshAll();
  showToast(`✓ ${cat} expense added`);
}

function deleteExpense(id) {
  state.expenses = state.expenses.filter(x => x.id !== id);
  saveState();
  refreshAll();
  showToast('🗑 Expense removed');
}

// Helper: sum expenses for a given category and month/year
function expSumByMonth(cat, monthIndex, year) {
  return state.expenses
    .filter(e => {
      if (cat && e.cat !== cat) return false;
      const d = new Date(e.date + 'T00:00:00');
      return d.getMonth() === monthIndex && d.getFullYear() === year;
    })
    .reduce((sum, e) => sum + e.amount, 0);
}

// Helper: totals per category
function expTotalsByCategory() {
  const totals = {};
  state.expenses.forEach(e => {
    totals[e.cat] = (totals[e.cat] || 0) + e.amount;
  });
  return totals;
}
