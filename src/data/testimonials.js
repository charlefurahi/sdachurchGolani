/**
 * Testimonials — demo/seed data.
 *
 * Used as an API-fallback only: pages call the matching *Service.js first;
 * this file supplies content when the API has no records yet (e.g. during
 * early setup or local development without a backend). Once the API is
 * returning real records, this file is never read.
 */

export const testimonials = [
  {
    id:     1,
    name:   'Amina Juma',
    role:   'Church Member',
    avatar: '',
    rating: 5,
    text:   'This church has been a pillar of strength and spiritual growth in my life. The community here truly lives out the love of Christ.',
  },
  {
    id:     2,
    name:   'David Mwangi',
    role:   'Youth Leader',
    avatar: '',
    rating: 5,
    text:   'The youth programs transformed my faith journey. I found purpose, mentorship, and lifelong friendships here.',
  },
  {
    id:     3,
    name:   'Grace Okonkwo',
    role:   'New Member',
    avatar: '',
    rating: 5,
    text:   'From the very first Sabbath I attended, I felt welcomed and at home. The worship experience is truly spirit-filled.',
  },
  {
    id:     4,
    name:   'Samuel Kimani',
    role:   'Deacon',
    avatar: '',
    rating: 5,
    text:   'Serving in this church has deepened my relationship with God and shown me the joy of giving back to the community.',
  },
]