// ─────────────────────────────────────────
//  inventory.js  —  JA Construction
//  Employee inventory screen logic:
//  render table, search, filter, sort
// ─────────────────────────────────────────

const INVENTORY = (() => {

  // ── Sample data (replace with backend call later) ──
  const MATERIALS = [
    { id: 1,  name: 'Cimento CP II 50kg',        category: 'Estrutura',  qty: 42,  unit: 'sacos', updated: '2026-07-10' },
    { id: 2,  name: 'Balde de tinta branca 18L', category: 'Pintura',    qty: 3,   unit: 'un',    updated: '2026-07-08' },
    { id: 3,  name: 'Vergalhão CA-50 10mm',       category: 'Estrutura',  qty: 0,   unit: 'un',    updated: '2026-07-05' },
    { id: 4,  name: 'Telha cerâmica colonial',    category: 'Cobertura',  qty: 150, unit: 'un',    updated: '2026-07-12' },
    { id: 5,  name: 'Fio elétrico 2.5mm 100m',   category: 'Elétrica',   qty: 2,   unit: 'rolos', updated: '2026-07-09' },
    { id: 6,  name: 'Areia média lavada',          category: 'Estrutura',  qty: 8,   unit: 'm³',    updated: '2026-07-11' },
    { id: 7,  name: 'Tijolo 8 furos',             category: 'Alvenaria',  qty: 0,   unit: 'un',    updated: '2026-07-03' },
    { id: 8,  name: 'Rolo de lã 23cm',            category: 'Pintura',    qty: 12,  unit: 'un',    updated: '2026-07-10' },
    { id: 9,  name: 'Disjuntor 20A',              category: 'Elétrica',   qty: 5,   unit: 'un',    updated: '2026-07-07' },
    { id: 10, name: 'Calha PVC 3m',               category: 'Cobertura',  qty: 0,   unit: 'un',    updated: '2026-07-01' },
  ];

  // ── State ──
  const LOW_STOCK_THRESHOLD = 5;
  let sortCol = 'name';
  let sortDir = 1;

  // ── DOM refs ──
  const searchInput  = document.getElementById('search-input');
  const categorySel  = document.getElementById('category-filter');
  const statusSel    = document.getElementById('status-filter');
  const tableBody    = document.getElementById('inv-table-body');
  const countEl      = document.getElementById('material-count');

  // ── Session user ──
  function getUser() {
    try {
      return JSON.parse(sessionStorage.getItem('ja_user')) || { email: 'user@ja.com', role: 'employee' };
    } catch { return { email: 'user@ja.com', role: 'employee' }; }
  }

  // ── Status logic ──
  function getStatus(qty) {
    if (qty === 0)                  return { key: 'red',    label: 'Out of stock' };
    if (qty <= LOW_STOCK_THRESHOLD) return { key: 'yellow', label: 'Low stock'    };
    return                                 { key: 'green',  label: 'In stock'     };
  }

  // ── Populate category dropdown ──
  function populateCategories() {
    const cats = [...new Set(MATERIALS.map(m => m.category))].sort();
    cats.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat;
      categorySel.appendChild(opt);
    });
  }

  // ── Format date ──
  function formatDate(iso) {
    if (!iso) return '—';
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  }

  // ── Filter + sort data ──
  function getFilteredData() {
    const search   = searchInput.value.trim().toLowerCase();
    const category = categorySel.value;
    const status   = statusSel.value;

    return MATERIALS
      .filter(m => {
        if (search   && !m.name.toLowerCase().includes(search) && !m.category.toLowerCase().includes(search)) return false;
        if (category && m.category !== category) return false;
        if (status   && getStatus(m.qty).key !== status) return false;
        return true;
      })
      .sort((a, b) => {
        let va = a[sortCol] ?? '';
        let vb = b[sortCol] ?? '';
        if (sortCol === 'qty') { va = +va; vb = +vb; }
        if (va < vb) return -sortDir;
        if (va > vb) return sortDir;
        return 0;
      });
  }

  // ── Render table ──
  function render() {
    const rows = getFilteredData();
    countEl.textContent = `${rows.length} material${rows.length !== 1 ? 's' : ''}`;

    if (rows.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <div class="empty-state__icon">📦</div>
              <div class="empty-state__title">No materials found</div>
              <div class="empty-state__sub">Try adjusting your search or filters</div>
            </div>
          </td>
        </tr>`;
      return;
    }

    tableBody.innerHTML = rows.map(m => {
      const status  = getStatus(m.qty);
      const outOfStock = m.qty === 0;
      return `
        <tr>
          <td class="td-name">${m.name}</td>
          <td class="td-muted">${m.category}</td>
          <td class="td-qty">${m.qty}</td>
          <td class="td-muted td-mono">${m.unit}</td>
          <td class="td-muted td-mono">${formatDate(m.updated)}</td>
          <td>
            <span class="badge badge--${status.key}">
              <span class="badge__dot"></span>
              ${status.label}
            </span>
          </td>
          <td>
            <div class="td-action">
              <button
                class="act-btn"
                ${outOfStock ? 'disabled' : ''}
                onclick="INVENTORY.requestMaterial(${m.id})"
              >Request</button>
            </div>
          </td>
        </tr>`;
    }).join('');
  }

  // ── Sort ──
  function sortBy(col) {
    if (sortCol === col) {
      sortDir *= -1;
    } else {
      sortCol = col;
      sortDir = 1;
    }
    // Update header indicators
    document.querySelectorAll('.inv-table th[data-col]').forEach(th => {
      th.classList.remove('sorted');
      th.querySelector('.sort-icon').textContent = '↕';
    });
    const activeHeader = document.querySelector(`.inv-table th[data-col="${col}"]`);
    if (activeHeader) {
      activeHeader.classList.add('sorted');
      activeHeader.querySelector('.sort-icon').textContent = sortDir === 1 ? '↑' : '↓';
    }
    render();
  }

  // ── Request material (placeholder) ──
  function requestMaterial(id) {
    const material = MATERIALS.find(m => m.id === id);
    if (!material) return;
    // TODO: open a request modal / navigate to request form
    alert(`Request form for "${material.name}" — coming soon!`);
  }

  // ── Set user info in topbar ──
  function setUserInfo() {
    const user = getUser();
    const nameEl   = document.getElementById('topbar-username');
    const avatarEl = document.getElementById('topbar-avatar');
    if (nameEl)   nameEl.textContent   = user.email.split('@')[0];
    if (avatarEl) avatarEl.textContent = user.email[0].toUpperCase();
  }

  // ── Logout ──
  function logout() {
    sessionStorage.removeItem('ja_user');
    window.location.href = '../../index.html';
  }

  // ── Init ──
  function init() {
    setUserInfo();
    populateCategories();
    render();

    searchInput.addEventListener('input',  render);
    categorySel.addEventListener('change', render);
    statusSel.addEventListener('change',   render);

    // Sort headers
    document.querySelectorAll('.inv-table th[data-col]').forEach(th => {
      th.addEventListener('click', () => sortBy(th.dataset.col));
    });

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
  }

  return { init, sortBy, requestMaterial };

})();

document.addEventListener('DOMContentLoaded', INVENTORY.init);
