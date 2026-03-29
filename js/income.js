// js/income.js — add, delete, render income entries

function addIncome() {
  const name   = document.getElementById('inc-name').value.trim() || 'Income';
  const amount = parseFloat(document.getElementById('inc-amount').value);
  const date   = document.getElementById('inc-date').value;
  const freq   = document.getElementById('inc-freq').value;

  if (!amount || amount <= 0) { showToast('⚠️ Enter a valid amount'); return; }
  if (!date)                  { showToast('⚠️ Pick a date'); return; }

  state.incomes.push({ id: uid(), name, amount, date, freq });
  document.getElementById('inc-amount').value = '';
  document.getElementById('inc-name').value   = '';

  saveState();
  refreshAll();
  showToast('✓ Income added');
}

function deleteIncome(id) {
  state.incomes = state.incomes.filter(x => x.id !== id);
  saveState();
  refreshAll();
  showToast('🗑 Income removed');
}

function renderIncomeList() {
  const el = document.getElementById('income-list');
  if (!state.incomes.length) { el.innerHTML = ''; return; }

  el.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Source</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Frequency</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${state.incomes.map(i => `
          <tr class="anim-row">
            <td>${i.name}</td>
            <td class="mono">${fmt(i.amount)}</td>
            <td>${fmtDate(i.date)}</td>
            <td>${i.freq}</td>
            <td>
              <button class="btn btn--danger btn--sm" onclick="deleteIncome('${i.id}')">✕</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
}
