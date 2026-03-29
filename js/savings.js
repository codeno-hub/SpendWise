// js/savings.js — add, delete, render savings goals

function addSavings() {
  const name   = document.getElementById('sav-name').value.trim() || 'Savings Goal';
  const amount = parseFloat(document.getElementById('sav-amount').value);
  const target = parseFloat(document.getElementById('sav-target').value) || 0;

  if (!amount || amount <= 0) { showToast('⚠️ Enter a valid amount'); return; }

  state.savings.push({ id: uid(), name, amount, target });
  document.getElementById('sav-amount').value = '';
  document.getElementById('sav-name').value   = '';
  document.getElementById('sav-target').value = '';

  saveState();
  refreshAll();
  showToast('✓ Savings goal added');
}

function deleteSavings(id) {
  state.savings = state.savings.filter(x => x.id !== id);
  saveState();
  refreshAll();
  showToast('🗑 Savings goal removed');
}

function renderSavingsList() {
  const el = document.getElementById('savings-list');
  if (!state.savings.length) { el.innerHTML = ''; return; }

  el.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Goal</th>
          <th>Monthly</th>
          <th>Target</th>
          <th>Annual</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${state.savings.map(s => `
          <tr class="anim-row">
            <td>${s.name}</td>
            <td class="mono">${fmt(s.amount)}</td>
            <td class="mono">${s.target ? fmt(s.target) : '—'}</td>
            <td class="mono">${fmt(s.amount * 12)}</td>
            <td>
              <button class="btn btn--danger btn--sm" onclick="deleteSavings('${s.id}')">✕</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
}
