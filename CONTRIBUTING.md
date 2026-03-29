# Contributing to SpendWise

## Core Rule
SpendWise must stay openable as plain files — no build step, no npm required.
External dependencies via CDN only.

## Reporting Bugs
Open an issue with: browser + OS, steps to reproduce, expected vs actual behaviour.

## Making a PR
1. Fork → branch (`feature/your-feature`)
2. Edit files in `css/` or `js/` as appropriate
3. Test in Chrome + Firefox
4. Update `CHANGELOG.md`
5. Open PR

## Code Style
- `const` / `let` only, no `var`
- All new colors as CSS variables in `variables.css`
- All new constants in `config.js`
- Each JS file has one responsibility

## Adding a Currency
`js/config.js` → `CURRENCIES` array:
```js
{ code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' }
```

## Adding a Default Category
`js/config.js` → `DEFAULT_CATEGORIES` array:
```js
{ name: 'Travel', color: '#3BB8CF' }
```

## License
By contributing you agree your code releases under MIT.
