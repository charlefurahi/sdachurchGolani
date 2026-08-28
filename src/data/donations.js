/**
 * Donations — demo/seed data.
 *
 * Used as an API-fallback only: pages call the matching *Service.js first;
 * this file supplies content when the API has no records yet (e.g. during
 * early setup or local development without a backend). Once the API is
 * returning real records, this file is never read.
 */

export const donationCampaigns = [
  {
    id: 1,
    title: 'Building Fund',
    description: 'Help us complete the new multipurpose hall to serve our growing congregation and community outreach programs.',
    goal: 50000000,
    raised: 28500000,
    currency: 'TZS',
    icon: '🏗️',
    is_active: true,
  },
  {
    id: 2,
    title: 'Education Bursary',
    description: 'Support the education of talented but financially challenged youth from our church family.',
    goal: 10000000,
    raised: 6200000,
    currency: 'TZS',
    icon: '🎓',
    is_active: true,
  },
  {
    id: 3,
    title: 'Community Outreach',
    description: 'Fund our weekly feeding program and medical missions that serve hundreds of families in the Golani area.',
    goal: 8000000,
    raised: 4100000,
    currency: 'TZS',
    icon: '🤝',
    is_active: true,
  },
]