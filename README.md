# 💸 SpendWise — Personal Finance Dashboard

> A beautiful, zero-dependency personal finance tracker that runs entirely in your browser. No accounts, no servers, no subscriptions — just open `index.html` and go.

## ✨ Features
- **Multi-currency** — 10 currencies (USD, EUR, GBP, INR, JPY, AED…) switchable from the sidebar
- **Custom categories** — add/remove expense categories with a color picker
- **3 live charts** — Bar/Line, Donut/Pie/Polar, and Monthly Trend — all with toggle buttons
- **Monthly breakdown grid** — Smartsheet-style Jan–Dec table auto-generated from your data
- **Income, Savings & Expense tabs** — separate tracking for each money type
- **Analytics row** — savings rate, top category, avg transaction
- **Search & filter** — live search + filter by type and category
- **CSV export** — download all data as a spreadsheet
- **localStorage persistence** — data survives refreshes, no backend needed

## 🚀 Getting Started

### Open directly
Double-click `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).

### Local server (recommended)
```bash
python3 -m http.server 8080
# or
npx serve .
```
Then open `http://localhost:8080`

## 📁 Project Structure
```
spendwise/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css
│   ├── layout.css
│   ├── components.css
│   ├── charts.css
│   ├── tables.css
│   ├── animations.css
│   └── responsive.css
├── js/
│   ├── config.js
│   ├── state.js
│   ├── currency.js
│   ├── categories.js
│   ├── income.js
│   ├── savings.js
│   ├── expenses.js
│   ├── charts.js
│   ├── monthly.js
│   ├── transactions.js
│   ├── analytics.js
│   ├── ui.js
│   └── app.js
├── docs/
│   ├── FEATURES.md
│   └── ROADMAP.md
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── package.json
└── .gitignore
```

## 🎨 Customisation
- **Add currency**: edit `CURRENCIES` array in `js/config.js`
- **Default categories**: edit `DEFAULT_CATEGORIES` in `js/config.js`
- **Accent color**: change `--accent` in `css/variables.css`

## 💾 Backup & Restore
```js
// Export (browser console)
copy(localStorage.getItem('spendwise_v2'))
// Import
localStorage.setItem('spendwise_v2', '<JSON here>'); location.reload()
```

## 📄 License
MIT © 2025 SpendWise Contributors
