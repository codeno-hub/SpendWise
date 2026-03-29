// js/analytics.js — summary cards & analytics row

function refreshSummary() {
  const totalIncome  = state.incomes.reduce((s, x) => s + x.amount, 0);
  const totalSavings = state.savings.reduce((s, x) => s + x.amount, 0);
  const totalExp     = state.expenses.reduce((s, x) => s + x.amount, 0);
  const potential    = totalIncome - totalSavings - totalExp;

  // Summary bar
  document.getElementById('sum-income').textContent     = fmt(totalIncome);
  document.getElementById('sum-income-sub').textContent =
    `${state.incomes.length} source${state.incomes.length !== 1 ? 's' : ''}`;

  document.getElementById('sum-savings').textContent     = fmt(totalSavings);
  document.getElementById('sum-savings-sub').textContent =
    `${state.savings.length} goal${state.savings.length !== 1 ? 's' : ''} · monthly`;

  document.getElementById('sum-expenses').textContent   = fmt(totalExp);
  document.getElementById('sum-exp-sub').textContent    =
    `${state.expenses.length} transaction${state.expenses.length !== 1 ? 's' : ''}`;

  const potEl    = document.getElementById('sum-potential');
  potEl.textContent = fmt(Math.abs(potential));
  potEl.className   = 'sum-value ' + (potential >= 0 ? 'sum-positive' : 'sum-negative');
  document.getElementById('sum-pot-sub').textContent =
    potential < 0 ? '⚠️ Over budget!' : 'After income & goals';

  // Pulse animation on total
  potEl.classList.add('anim-pulse');
  setTimeout(() => potEl.classList.remove('anim-pulse'), 350);
}

function refreshAnalytics() {
  const totalIncome = state.incomes.reduce((s, x) => s + x.amount, 0);
  const totalExp    = state.expenses.reduce((s, x) => s + x.amount, 0);

  const savingsRate = totalIncome > 0
    ? ((totalIncome - totalExp) / totalIncome) * 100
    : 0;

  const catTotals      = expTotalsByCategory();
  const topCatEntry    = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0];
  const topCat         = topCatEntry ? topCatEntry[0] : null;
  const topCatVal      = topCatEntry ? topCatEntry[1] : 0;

  const avgExp = state.expenses.length
    ? totalExp / state.expenses.length
    : 0;

  const rateColor =
    savingsRate >= 20 ? 'var(--green)' :
    savingsRate >= 10 ? 'var(--accent)' :
                        'var(--red)';

  document.getElementById('analytics-row').innerHTML = `
    <div class="anal-card">
      <div class="anal-title">💰 Savings Rate</div>
      <div class="anal-value">${savingsRate.toFixed(1)}%</div>
      <div class="bar-row">
        <div class="bar-track">
          <div class="bar-fill" style="width:${Math.min(100, Math.max(0, savingsRate))}%;background:${rateColor}"></div>
        </div>
      </div>
      <div class="anal-sub">${savingsRate >= 20 ? '🟢 Healthy — great job!' : '⚠️ Aim for 20%+'}</div>
    </div>

    <div class="anal-card">
      <div class="anal-title">🏆 Top Expense Category</div>
      <div class="anal-value" style="font-size:17px;letter-spacing:0">
        ${topCat
          ? `<span style="display:inline-flex;align-items:center;gap:7px">
               <span style="width:10px;height:10px;border-radius:50%;background:${getCatColor(topCat)};display:inline-block"></span>
               ${topCat}
             </span>`
          : '—'}
      </div>
      ${topCat ? `
        <div class="bar-row">
          <div class="bar-track">
            <div class="bar-fill" style="width:${totalExp ? Math.min(100, topCatVal / totalExp * 100) : 0}%;background:${getCatColor(topCat)}"></div>
          </div>
        </div>
        <div class="anal-sub">${fmt(topCatVal)} total · ${totalExp ? Math.round(topCatVal / totalExp * 100) : 0}% of spend</div>
      ` : '<div class="anal-sub">No expenses logged yet</div>'}
    </div>

    <div class="anal-card">
      <div class="anal-title">📊 Avg Transaction</div>
      <div class="anal-value">${fmt(avgExp)}</div>
      <div class="anal-sub">
        ${state.expenses.length} expense${state.expenses.length !== 1 ? 's' : ''} logged
        ${state.expenses.length > 1 ? `· max ${fmt(Math.max(...state.expenses.map(e => e.amount)))}` : ''}
      </div>
    </div>
  `;
}
