// js/ui.js — shared UI helpers

// ── Toast ─────────────────────────────────────
let _toastTimer = null;

function showToast(message) {
  const el = document.getElementById('toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

// ── Tabs ──────────────────────────────────────
function switchTab(name, btn) {
  const panels = ['income', 'savings', 'expense', 'categories'];
  panels.forEach(p => {
    const el = document.getElementById('tab-' + p);
    if (el) el.classList.toggle('hidden', p !== name);
  });
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── Date formatting ───────────────────────────
function fmtDate(str) {
  if (!str || str === '—') return '—';
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Keyboard shortcuts ────────────────────────
document.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const id = document.activeElement && document.activeElement.id;
  if (id === 'inc-amount' || id === 'inc-name')  addIncome();
  if (id === 'exp-amount' || id === 'exp-desc')  addExpense();
  if (id === 'sav-amount' || id === 'sav-name')  addSavings();
  if (id === 'new-cat-name')                     openCatModal();
});

// ── Sidebar toggle ─────────────────────────
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');

function setSidebarState() {
  if (!sidebar) return;
  if (window.innerWidth > 620) {
    sidebar.classList.add('open');
  } else {
    sidebar.classList.remove('open');
  }
}

setSidebarState();
window.addEventListener('resize', setSidebarState);

sidebarToggle?.addEventListener('click', () => {
  sidebar?.classList.toggle('open');
});

// ── Close modal on overlay click ─────────────
document.getElementById('modal-overlay').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});
