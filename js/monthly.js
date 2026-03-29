// js/monthly.js — builds the Jan–Dec breakdown grid

function buildMonthlyTable() {
  const tbl  = document.getElementById('monthly-table');
  const year = new Date().getFullYear();

  const colSpan = MONTHS.length + 2; // label + 12 months + annually

  // Helper: income sum for a named source in a given month
  function incBySourceMonth(sourceName, m) {
    return state.incomes
      .filter(x => {
        const d = new Date(x.date + 'T00:00:00');
        return x.name === sourceName && d.getMonth() === m && d.getFullYear() === year;
      })
      .reduce((s, x) => s + x.amount, 0);
  }

  const incSources  = [...new Set(state.incomes.map(x => x.name))];
  const savGoals    = [...new Set(state.savings.map(x => x.name))];
  const expCats     = [...new Set(state.expenses.map(x => x.cat))];

  // Header row
  const headerRow = `
    <tr>
      <th></th>
      ${MONTHS.map(m => `<th>${m}</th>`).join('')}
      <th>Annually</th>
    </tr>`;

  let html = headerRow;

  /* ── INCOME ─────────────────────────────── */
  html += `<tr class="hdr-income"><td colspan="${colSpan}">Income</td></tr>`;

  if (!incSources.length) {
    html += `<tr><td colspan="${colSpan}" style="color:var(--text-3);padding:8px 10px;font-size:12px">No income entries yet — add some in the Income tab.</td></tr>`;
  } else {
    incSources.forEach(src => {
      const monthVals = MONTHS.map((_, m) => incBySourceMonth(src, m));
      const annual    = monthVals.reduce((a, b) => a + b, 0);
      html += `<tr>
        <td>${src}</td>
        ${monthVals.map(v => v ? `<td class="mono">${fmt(v)}</td>` : `<td class="empty">—</td>`).join('')}
        <td class="annually">${fmt(annual)}</td>
      </tr>`;
    });

    // Income monthly totals row
    const incTotals  = MONTHS.map((_, m) =>
      state.incomes.filter(x => { const d = new Date(x.date + 'T00:00:00'); return d.getMonth() === m && d.getFullYear() === year; })
                   .reduce((s, x) => s + x.amount, 0)
    );
    const incAnnual  = incTotals.reduce((a, b) => a + b, 0);
    html += `<tr class="total-row">
      <td>Monthly Totals</td>
      ${incTotals.map(v => `<td class="mono">${fmt(v)}</td>`).join('')}
      <td class="annually">${fmt(incAnnual)}</td>
    </tr>`;
  }

  /* ── SAVINGS ─────────────────────────────── */
  html += `<tr class="hdr-savings"><td colspan="${colSpan}">Savings</td></tr>`;

  if (!savGoals.length) {
    html += `<tr><td colspan="${colSpan}" style="color:var(--text-3);padding:8px 10px;font-size:12px">No savings goals yet — add some in the Savings tab.</td></tr>`;
  } else {
    savGoals.forEach(goal => {
      const item    = state.savings.find(x => x.name === goal);
      const monthly = item ? item.amount : 0;
      const annual  = monthly * 12;
      html += `<tr>
        <td>${goal}</td>
        ${MONTHS.map(() => `<td class="mono">${fmt(monthly)}</td>`).join('')}
        <td class="annually">${fmt(annual)}</td>
      </tr>`;
    });

    const savMonthly = state.savings.reduce((s, x) => s + x.amount, 0);
    html += `<tr class="total-row">
      <td>Monthly Totals</td>
      ${MONTHS.map(() => `<td class="mono">${fmt(savMonthly)}</td>`).join('')}
      <td class="annually">${fmt(savMonthly * 12)}</td>
    </tr>`;
  }

  /* ── EXPENSES ────────────────────────────── */
  html += `<tr class="hdr-expenses"><td colspan="${colSpan}">Expenses</td></tr>`;

  if (!expCats.length) {
    html += `<tr><td colspan="${colSpan}" style="color:var(--text-3);padding:8px 10px;font-size:12px">No expenses yet — add some in the Expense tab.</td></tr>`;
  } else {
    expCats.forEach(cat => {
      const color     = getCatColor(cat);
      const monthVals = MONTHS.map((_, m) => expSumByMonth(cat, m, year));
      const annual    = monthVals.reduce((a, b) => a + b, 0);
      html += `<tr>
        <td>
          <span style="display:inline-flex;align-items:center;gap:6px">
            <span style="width:7px;height:7px;border-radius:50%;background:${color};flex-shrink:0;display:inline-block"></span>
            ${cat}
          </span>
        </td>
        ${monthVals.map(v => v ? `<td class="mono">${fmt(v)}</td>` : `<td class="empty">—</td>`).join('')}
        <td class="annually">${fmt(annual)}</td>
      </tr>`;
    });

    const expTotals = MONTHS.map((_, m) => expSumByMonth(null, m, year));
    const expAnnual = expTotals.reduce((a, b) => a + b, 0);
    html += `<tr class="total-row">
      <td>Monthly Totals</td>
      ${expTotals.map(v => `<td class="mono">${fmt(v)}</td>`).join('')}
      <td class="annually">${fmt(expAnnual)}</td>
    </tr>`;
  }

  tbl.innerHTML = html;
}
