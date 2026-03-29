// js/categories.js — category CRUD & UI

let _pendingColor = COLOR_PALETTE[0];

function getCatColor(name) {
  const cat = state.categories.find(c => c.name === name);
  return cat ? cat.color : '#999';
}

function buildCategoryUI() {
  // Chip list in "Manage Categories" tab
  const chipList = document.getElementById('cat-chip-list');
  chipList.innerHTML = state.categories.map(c => `
    <span class="cat-chip" style="background:${c.color}22;color:${c.color};border:1px solid ${c.color}44">
      ${c.name}
      <span class="cat-chip__remove" onclick="removeCategory('${c.name}')">✕</span>
    </span>
  `).join('');

  // Expense category dropdown
  const sel = document.getElementById('exp-cat');
  const prev = sel.value;
  sel.innerHTML = state.categories.map(c =>
    `<option value="${c.name}">${c.name}</option>`
  ).join('');
  if (prev && state.categories.find(c => c.name === prev)) sel.value = prev;

  // Transaction filter dropdown
  const flt = document.getElementById('txn-filter-cat');
  const prevF = flt.value;
  flt.innerHTML = '<option value="">All Categories</option>' +
    state.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  if (prevF) flt.value = prevF;
}

function removeCategory(name) {
  if (state.categories.length <= 1) {
    showToast('⚠️ Keep at least one category');
    return;
  }
  state.categories = state.categories.filter(c => c.name !== name);
  saveState();
  refreshAll();
  showToast(`🗑 "${name}" removed`);
}

function openCatModal() {
  const name = document.getElementById('new-cat-name').value.trim();
  if (!name) { showToast('⚠️ Enter a category name'); return; }
  if (state.categories.find(c => c.name.toLowerCase() === name.toLowerCase())) {
    showToast('⚠️ Category already exists');
    return;
  }
  buildColorGrid();
  document.getElementById('modal-overlay').classList.add('show');
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('show');
}

function buildColorGrid() {
  const grid = document.getElementById('color-grid');
  grid.innerHTML = COLOR_PALETTE.map(hex => `
    <div
      class="color-swatch ${hex === _pendingColor ? 'picked' : ''}"
      style="background:${hex}"
      onclick="pickColor('${hex}', this)"
    ></div>
  `).join('');
}

function pickColor(hex, el) {
  _pendingColor = hex;
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('picked'));
  el.classList.add('picked');
}

function confirmAddCat() {
  const name = document.getElementById('new-cat-name').value.trim();
  if (!name) return;
  state.categories.push({ name, color: _pendingColor });
  document.getElementById('new-cat-name').value = '';
  closeModal();
  saveState();
  refreshAll();
  showToast(`✓ Category "${name}" added`);
}
