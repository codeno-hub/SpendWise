// js/config.js — app-wide constants

const STORAGE_KEY = 'spendwise_v2';

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

const CURRENCIES = [
  { code: 'USD', symbol: '$',    name: 'US Dollar' },
  { code: 'EUR', symbol: '€',    name: 'Euro' },
  { code: 'GBP', symbol: '£',    name: 'British Pound' },
  { code: 'JPY', symbol: '¥',    name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹',    name: 'Indian Rupee' },
  { code: 'CAD', symbol: 'C$',   name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$',   name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'Fr',   name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥',    name: 'Chinese Yuan' },
  { code: 'AED', symbol: 'د.إ',  name: 'UAE Dirham' },
];

const COLOR_PALETTE = [
  '#1B4FD8','#1E9E6B','#D95B1A','#C46BDE',
  '#E8A838','#3BB8CF','#C93232','#7B6FDE',
  '#4CAF7E','#E06B9A','#8B7355','#5B8EF0',
];

const DEFAULT_CATEGORIES = [
  { name: 'Food',       color: '#E8A838' },
  { name: 'Rent',       color: '#1E9E6B' },
  { name: 'Transport',  color: '#1B4FD8' },
  { name: 'Fun',        color: '#C46BDE' },
  { name: 'Utilities',  color: '#D95B1A' },
  { name: 'Healthcare', color: '#3BB8CF' },
  { name: 'Shopping',   color: '#7B6FDE' },
  { name: 'Education',  color: '#C93232' },
];
