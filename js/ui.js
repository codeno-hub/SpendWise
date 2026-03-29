// =========================================
// SpendWise — Refactored UI सिस्टम (Clean + Scalable)
// =========================================

const UI = (() => {
  let toastTimer = null;

  // ---------------- Toast ----------------
  function showToast(message, type = "default") {
    const el = document.getElementById("toast");
    if (!el) return console.warn("Toast element missing");

    el.textContent = message;
    el.className = `toast show ${type}`;

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove("show");
    }, 2400);
  }

  // ---------------- Tabs ----------------
  function switchTab(name, btn) {
    const panels = ["income", "savings", "expense", "categories"];

    panels.forEach(p => {
      const el = document.getElementById("tab-" + p);
      if (el) el.classList.toggle("hidden", p !== name);
    });

    document.querySelectorAll(".tab-btn")
      .forEach(b => b.classList.remove("active"));

    btn?.classList.add("active");
  }

  // ---------------- Date ----------------
  function fmtDate(str) {
    if (!str || str === "—") return "—";
    const d = new Date(str + "T00:00:00");
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  // ---------------- Sidebar ----------------
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebar-toggle");

  function setSidebar(open) {
    if (!sidebar) return;
    sidebar.classList.toggle("closed", !open);
    localStorage.setItem("sidebar", open ? "open" : "closed");
  }

  function initSidebar() {
    if (!sidebar) return;

    const saved = localStorage.getItem("sidebar");

    if (saved === "closed") {
      setSidebar(false);
    } else {
      setSidebar(true);
    }

    toggleBtn?.addEventListener("click", () => {
      const isClosed = sidebar.classList.contains("closed");
      setSidebar(isClosed);
    });
  }

  // ---------------- Keyboard ----------------
  function initKeyboard() {
    document.addEventListener("keydown", e => {
      if (e.key !== "Enter") return;

      const action = document.activeElement?.dataset.action;

      if (action === "add-income") window.addIncome?.();
      if (action === "add-expense") window.addExpense?.();
      if (action === "add-savings") window.addSavings?.();
      if (action === "new-category") window.openCatModal?.();
    });
  }

  // ---------------- Modal ----------------
  function initModal() {
    const overlay = document.getElementById("modal-overlay");

    overlay?.addEventListener("click", (e) => {
      if (e.target === overlay) window.closeModal?.();
    });
  }

  // ---------------- Resize (debounced) ----------------
  function debounce(fn, delay = 200) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  }

  function initResize() {
    window.addEventListener("resize", debounce(() => {
      if (window.innerWidth < 620) {
        setSidebar(false);
      } else {
        setSidebar(true);
      }
    }));
  }

  // ---------------- Init ----------------
  function init() {
    initSidebar();
    initKeyboard();
    initModal();
    initResize();
  }

  return {
    init,
    showToast,
    switchTab,
    fmtDate
  };
})();

// Auto init
window.addEventListener("DOMContentLoaded", UI.init);
