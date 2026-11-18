/**
 * Announcements — demo/seed data.
 *
 * Used as an API-fallback only: pages call the matching *Service.js first;
 * this file supplies content when the API has no records yet (e.g. during
 * early setup or local development without a backend). Once the API is
 * returning real records, this file is never read.
 *
 * Shape mirrors the real backend model: every announcement is a PDF an
 * admin uploads (see src/pages/admin/Announcements.vue) — there is no
 * long-form "content" field to hand-write here. `pdf_file_url` points at
 * a small on-brand demo PDF under /public/demo/announcements/ so the
 * cards, download and detail-page flows all work fully offline.
 *
 * `content` is kept, short, only as a plain-text fallback for the rare
 * case an announcement has no PDF attached (AnnouncementDetail.vue falls
 * back to it).
 */

export const announcementCategories = ['All', 'General', 'Urgent', 'Youth', 'Health', 'Finance', 'Ministry']

export const announcements = [
  {
    id: 1,
    title: 'New Service Time Starting June 2026',
    category: 'General',
    priority: 'normal',
    announcement_date: '2026-05-15',
    created_at: '2026-05-15',
    is_pinned: true,
    is_published: true,
    pdf_file_url: '/demo/announcements/service-time-change.pdf',
    content: 'Sabbath morning service moves to 9:00 AM starting June 7, 2026. Full schedule in the attached PDF.',
  },
  {
    id: 2,
    title: 'Quarterly Budget Review — Members Meeting',
    category: 'Finance',
    priority: 'normal',
    announcement_date: '2026-05-12',
    created_at: '2026-05-12',
    is_pinned: true,
    is_published: true,
    pdf_file_url: '/demo/announcements/budget-review-q2.pdf',
    content: 'Q2 2026 budget review meeting — May 31, 3:00 PM, Fellowship Hall. Agenda in the attached PDF.',
  },
  {
    id: 3,
    title: 'Urgent: Youth Camp Registration Closes May 30',
    category: 'Youth',
    priority: 'urgent',
    announcement_date: '2026-05-18',
    created_at: '2026-05-18',
    is_pinned: false,
    is_published: true,
    pdf_file_url: '/demo/announcements/youth-camp-registration.pdf',
    content: 'Registration for the June Youth Camp closes May 30 — only 40 spots remain. Details in the attached PDF.',
  },
  {
    id: 4,
    title: 'Volunteer Nurses Needed for Health Fair',
    category: 'Health',
    priority: 'normal',
    announcement_date: '2026-05-10',
    created_at: '2026-05-10',
    is_pinned: false,
    is_published: true,
    pdf_file_url: '/demo/announcements/health-fair-volunteers.pdf',
    content: 'Volunteer nurses, doctors and health workers needed for the June 14 Community Health Fair.',
  },
  {
    id: 5,
    title: 'Deacons & Deaconesses Election — Call for Nominations',
    category: 'Ministry',
    priority: 'normal',
    announcement_date: '2026-05-08',
    created_at: '2026-05-08',
    is_pinned: false,
    is_published: true,
    pdf_file_url: '/demo/announcements/deacons-election.pdf',
    content: 'Nominations for Deacon and Deaconess (2026–2028 term) close June 15. Eligibility in the attached PDF.',
  },
  {
    id: 6,
    title: 'GolaniSDA WhatsApp Group — Join Now',
    category: 'General',
    priority: 'low',
    announcement_date: '2026-05-05',
    created_at: '2026-05-05',
    is_pinned: false,
    is_published: true,
    pdf_file_url: '/demo/announcements/whatsapp-group.pdf',
    content: 'Join the official GolaniSDA WhatsApp group for real-time church announcements.',
  },
]