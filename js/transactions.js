// js/transactions.js — unified transaction list & CSV export

function renderTxns() {
  const search     = document.getElementById('txn-search').value.toLowerCase();
  const catFilter  = document.getElementById('txn-filter-cat').value;
  const typeFilter = document.getElementById('txn-filter-type').value;

  // Merge all entry types into a flat list
  let all = [];

  if (!typeFilter || typeFilter === 'income') {
    state.incomes.forEach(x => all.push({ ...x, _type: 'income', _sort: x.date }));
  }
  if (!typeFilter || typeFilter === 'savings') {
    const today = new Date().toISOString().split('T')[0];
    state.savings.forEach(x => all.push({ ...x, _type: 'savings', date: today, _sort: today }));
  }
  if (!typeFilter || typeFilter === 'expense') {
    state.expenses.forEach(x => all.push({ ...x, _type: 'expense', _sort: x.date }));
  }

  // Sort newest first
  all.sort((a, b) => b._sort.localeCompare(a._sort));

  // Apply search filter
  if (search) {
    all = all.filter(x =>
      (x.name || x.desc || '').toLowerCase().includes(search) ||
      (x.cat || '').toLowerCase().includes(search)
    );
  }

  // Apply category filter
  if (catFilter) {
    all = all.filter(x => x.cat === catFilter);
  }

  const area = document.getElementById('txn-area');

  if (!all.length) {
    area.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">🌿</div>
        <div class="empty-state__title">No transactions yet</div>
        <div class="empty-state__sub">Add income, savings, or expenses using the form above</div>
      </div>`;
    return;
  }

  area.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Type</th>
          <th>Category</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${all.map(x => {
          const typeBadge =
            x._type === 'income'  ? `<span class="badge badge--income">INCOME</span>` :
            x._type === 'savings' ? `<span class="badge badge--savings">SAVINGS</span>` :
                                    `<span class="badge badge--expense">EXPENSE</span>`;

          const catCell = x.cat
            ? `<span class="cat-pill" style="background:${getCatColor(x.cat)}22;color:${getCatColor(x.cat)}">
                 <span class="cat-pill__dot" style="background:${getCatColor(x.cat)}"></span>
                 ${x.cat}${x.subcat ? ` · ${x.subcat}` : ''}
               </span>`
            : '—';

          const delFn =
            x._type === 'income'  ? `deleteIncome('${x.id}')` :
            x._type === 'savings' ? `deleteSavings('${x.id}')` :
                                    `deleteExpense('${x.id}')`;

          return `
            <tr class="anim-row">
              <td>${fmtDate(x.date || '—')}</td>
              <td>${x.name || x.desc || '—'}</td>
              <td>${typeBadge}</td>
              <td>${catCell}</td>
              <td class="mono">${fmt(x.amount)}</td>
              <td><button class="btn btn--danger btn--sm" onclick="${delFn}">✕</button></td>
            </tr>`;
        }).join('')}
      </tbody>
    </table>`;
}

function exportCSV() {
  const cur = CURRENCIES.find(c => c.code === state.currency) || CURRENCIES[0];

  const rows = [
    ['Type', 'Description', 'Category', `Amount (${cur.code})`, 'Date', 'Notes'],
    ...state.incomes.map(x =>  ['Income',  x.name,  '',      x.amount, x.date, x.freq]),
    ...state.savings.map(x =>  ['Savings', x.name,  '',      x.amount, '',     `Target: ${x.target || '—'}`]),
    ...state.expenses.map(x => ['Expense', x.desc,  x.cat,  x.amount, x.date, x.subcat || '']),
  ];

  const csv   = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const blob  = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url   = URL.createObjectURL(blob);
  const a     = document.createElement('a');
  a.href      = url;
  a.download  = 'spendwise-export.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('⬇ CSV exported');
}
