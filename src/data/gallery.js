/**
 * Gallery — demo/seed data.
 *
 * Used as an API-fallback only: pages call the matching *Service.js first;
 * this file supplies content when the API has no records yet (e.g. during
 * early setup or local development without a backend). Once the API is
 * returning real records, this file is never read.
 */

export const galleryAlbums = [
  {
    id: 1,
    title: 'Sabbath Services 2026',
    date: '2026-05-10',
    description: 'Highlights from our recent Sabbath morning worship services.',
    photoCount: 24,
    cover: null,
    photos: Array.from({ length: 24 }, (_, i) => ({ caption: `Sabbath Service – Photo ${i + 1}`, src: null })),
  },
  {
    id: 2,
    title: 'Youth Camp 2025',
    date: '2025-12-07',
    description: 'Memories from our annual Youth Camp at Golani grounds.',
    photoCount: 36,
    cover: null,
    photos: Array.from({ length: 36 }, (_, i) => ({ caption: `Youth Camp – Photo ${i + 1}`, src: null })),
  },
  {
    id: 3,
    title: 'Community Health Fair 2025',
    date: '2025-11-15',
    description: 'Serving our community through free health screenings and outreach.',
    photoCount: 18,
    cover: null,
    photos: Array.from({ length: 18 }, (_, i) => ({ caption: `Health Fair – Photo ${i + 1}`, src: null })),
  },
  {
    id: 4,
    title: 'Baptism Ceremony – October 2025',
    date: '2025-10-25',
    description: 'Celebrating new members who gave their lives to Christ.',
    photoCount: 12,
    cover: null,
    photos: Array.from({ length: 12 }, (_, i) => ({ caption: `Baptism – Photo ${i + 1}`, src: null })),
  },
]