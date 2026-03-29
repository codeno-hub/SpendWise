# SpendWise — Feature Reference

## Currency Switcher
10 currencies in the sidebar. Click any to reformat all values instantly.
Preference saved in localStorage.
Supported: USD, EUR, GBP, JPY, INR, CAD, AUD, CHF, CNY, AED

## Summary Bar
| Card | Formula |
|---|---|
| Income | Sum of all income entries |
| Savings Goal | Sum of all monthly savings amounts |
| Expenses | Sum of all expense entries |
| Potential to Save | Income − Savings − Expenses |

## Charts
- **Income vs Expenses** — Bar ↔ Line, per month for current year
- **Spending Breakdown** — Donut ↔ Pie ↔ Polar, per category
- **Monthly Trend** — Line ↔ Bar, income & expenses overlay
All update in real time on every data change.

## Analytics Row
- **Savings Rate**: (Income − Expenses) / Income × 100. Green ≥20%, Blue ≥10%, Red <10%
- **Top Category**: highest total spend category with proportion bar
- **Avg Transaction**: mean expense + max expense

## Data Entry Tabs
- **Income**: name, amount, date, frequency (One-time / Monthly / Weekly / Annual)
- **Savings**: goal name, monthly amount, optional target
- **Expense**: description, amount, category, optional sub-category, date
- **Manage Categories**: add with color picker, remove, all changes live

## Monthly Breakdown Grid
Jan–Dec columns + Annually total.
Three sections: Income (by source), Savings (by goal), Expenses (by category).
Section headers dark-colored; totals rows bold-shaded.

## Transaction History
Unified view of all entry types. Newest first.
Search: live text filter.
Filters: by category, by type (income / expense / savings).
Delete any row with ✕.

## CSV Export
Downloads `spendwise-export.csv` with columns:
Type, Description, Category, Amount (CODE), Date, Notes

## Keyboard Shortcuts
- Enter on amount/name fields → submits current tab's form
- Click modal overlay → closes modal
