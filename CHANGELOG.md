# Changelog

## [2.0.0] — 2025-03-29 — "Pro Edition"

### Added
- Multi-currency support (10 currencies, sidebar switcher)
- Custom expense categories with color picker
- Chart type toggles (Bar↔Line, Donut↔Pie↔Polar, Line↔Bar)
- Monthly Breakdown Grid (Jan–Dec table, Income/Savings/Expenses sections)
- Income tab with source name, date, frequency
- Savings tab with monthly amount and target
- Analytics row (Savings Rate, Top Category, Avg Transaction)
- Sub-category field on expenses
- Transaction search + filter by category/type
- CSV export
- Keyboard shortcuts (Enter to submit active form)
- Project split into separated CSS and JS modules

### Changed
- Complete visual redesign — Fraunces + DM Sans + DM Mono typography
- Warm parchment background palette
- Summary bar matches Smartsheet layout (Income / Savings / Expenses / Potential to Save)
- All JS split into focused modules (config, state, currency, categories, etc.)
- localStorage key updated to `spendwise_v2`

## [1.0.0] — 2025-03-20 — Initial Release

### Added
- Expense entry form (Amount, Category, Date)
- Doughnut chart via Chart.js
- Transaction history table with delete
- Total Spent counter
- localStorage persistence
- Sidebar navigation layout
