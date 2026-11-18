/**
 * Church stats — demo/seed data.
 *
 * Used as an API-fallback only: pages call the matching *Service.js first;
 * this file supplies content when the API has no records yet (e.g. during
 * early setup or local development without a backend). Once the API is
 * returning real records, this file is never read.
 *
 * Used by the homepage StatsSection.
 */

export const churchStats = [
  { label: 'Members',         value: '500', suffix: '+', icon: '👥' },
  { label: 'Years of Faith',  value: '30',  suffix: '+', icon: '✝️' },
  { label: 'Weekly Services', value: '4',   suffix: '',  icon: '📖' },
  { label: 'Ministries',      value: '12',  suffix: '+', icon: '🙌' },
  { label: 'Baptisms',        value: '50',  suffix: '+', icon: '💧' },
  { label: 'Volunteers',      value: '100', suffix: '+', icon: '❤️' },
]

// All categories share the single brand yellow — distinction comes
// from the label text, keeping the site to its 3-color palette.