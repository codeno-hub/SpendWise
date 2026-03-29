// js/charts.js — Chart.js initialisation & updates

const charts = {};
const chartTypes = { main: 'bar', cat: 'doughnut', trend: 'line' };

function initCharts() {
  Chart.defaults.font.family = "'DM Sans', system-ui, sans-serif";

  // ── Income vs Expenses (bar/line) ──────────
  charts.main = new Chart(
    document.getElementById('main-chart').getContext('2d'), {
      type: 'bar',
      data: { labels: MONTHS, datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 10, padding: 12, font: { size: 11 } } },
          tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${fmt(ctx.raw)}` } },
        },
        scales: {
          y: { ticks: { callback: v => fmt(v), font: { size: 10 } }, grid: { color: '#E6E1D830' } },
          x: { ticks: { font: { size: 10 } }, grid: { display: false } },
        },
      },
    }
  );

  // ── Spending breakdown (doughnut/pie/polar) ─
  charts.cat = new Chart(
    document.getElementById('cat-chart').getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          borderWidth: 2,
          borderColor: '#FDFCFA',
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${fmt(ctx.raw)}` } },
        },
        animation: { animateRotate: true, duration: 500 },
      },
    }
  );

  // ── Monthly trend (line/bar) ───────────────
  charts.trend = new Chart(
    document.getElementById('trend-chart').getContext('2d'), {
      type: 'line',
      data: { labels: MONTHS, datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 10, padding: 10, font: { size: 11 } } },
          tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${fmt(ctx.raw)}` } },
        },
        scales: {
          y: { ticks: { callback: v => fmt(v), font: { size: 10 } }, grid: { color: '#E6E1D830' } },
          x: { ticks: { font: { size: 10 } }, grid: { display: false } },
        },
        elements: { point: { radius: 3 }, line: { tension: 0.4 } },
      },
    }
  );
}

function updateCharts() {
  const year = new Date().getFullYear();

  const monthlyInc = MONTHS.map((_, m) =>
    state.incomes
      .filter(x => { const d = new Date(x.date + 'T00:00:00'); return d.getMonth() === m && d.getFullYear() === year; })
      .reduce((s, x) => s + x.amount, 0)
  );
  const monthlyExp = MONTHS.map((_, m) => expSumByMonth(null, m, year));

  // Main chart
  charts.main.data.datasets = [
    { label: 'Income',   data: monthlyInc, backgroundColor: '#1B4FD840', borderColor: '#1B4FD8', borderWidth: 2 },
    { label: 'Expenses', data: monthlyExp, backgroundColor: '#D95B1A40', borderColor: '#D95B1A', borderWidth: 2 },
  ];
  charts.main.update();

  // Category doughnut
  const catTotals = expTotalsByCategory();
  const cats = Object.keys(catTotals).sort((a, b) => catTotals[b] - catTotals[a]);
  const total = Object.values(catTotals).reduce((a, b) => a + b, 0);

  charts.cat.data.labels = cats;
  charts.cat.data.datasets[0].data            = cats.map(c => catTotals[c]);
  charts.cat.data.datasets[0].backgroundColor = cats.map(c => getCatColor(c));
  charts.cat.update();

  // Legend
  const legend = document.getElementById('cat-legend');
  if (!cats.length) {
    legend.innerHTML = '<div class="leg-empty">Add expenses to see breakdown</div>';
  } else {
    legend.innerHTML = cats.map(c => `
      <div class="leg-item">
        <div class="leg-left">
          <div class="leg-dot" style="background:${getCatColor(c)}"></div>
          <span class="leg-name">${c}</span>
          <span class="leg-pct">${total ? Math.round(catTotals[c] / total * 100) : 0}%</span>
        </div>
        <span class="leg-val">${fmt(catTotals[c])}</span>
      </div>
    `).join('');
  }

  // Trend chart
  charts.trend.data.datasets = [
    { label: 'Income',   data: monthlyInc, borderColor: '#1B4FD8', backgroundColor: '#1B4FD815', fill: true },
    { label: 'Expenses', data: monthlyExp, borderColor: '#D95B1A', backgroundColor: '#D95B1A15', fill: true },
  ];
  charts.trend.update();
}

function setChartType(key, type, btn) {
  const chart = charts[key];
  if (!chart) return;

  chart.config.type = type;

  // Adjust options depending on chart family
  if (['doughnut', 'pie', 'polarArea'].includes(type)) {
    chart.options.cutout = type === 'doughnut' ? '60%' : 0;
    chart.options.scales = {};
  } else {
    chart.options.cutout = undefined;
    chart.options.scales = {
      y: { ticks: { callback: v => fmt(v), font: { size: 10 } }, grid: { color: '#E6E1D830' } },
      x: { ticks: { font: { size: 10 } }, grid: { display: false } },
    };
  }

  chart.update('none');

  // Update toggle button state
  btn.closest('.chart-toggle').querySelectorAll('.ct-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}
