/**
 * Leadership — demo/seed data.
 *
 * Used as an API-fallback only: pages call the matching *Service.js first;
 * this file supplies content when the API has no records yet (e.g. during
 * early setup or local development without a backend). Once the API is
 * returning real records, this file is never read.
 */

export const leadership = [
  {
    id: 1,
    full_name: 'Pastor Godliven Ngessi',
    role: 'pastor',
    display_role: 'Senior Pastor',
    bio: 'Pastor Ngessi has served Chuokikuu Street for many years.',
    email: 'pastor@golanisda.org',
    photo_url: null,
  },
  {
    id: 2,
    full_name: 'Elder Emmanuel Kamba',
    role: 'elder',
    display_role: 'Head Elder',
    bio: 'Elder Kamba leads the board of elders and oversees the spiritual direction of the church. He has been a pillar of GolaniSDA for over 20 years.',
    email: 'elder@golanisda.org',
    photo_url: null,
  },
  {
    id: 3,
    full_name: 'Br. Reuben Mmato',
    role: 'secretary',
    display_role: 'Church Secretary',
    bio: 'Brother Reuben coordinates church administration, member records, and communications. He brings warmth and excellence to everything he does.',
    email: 'secretary@golanisda.org',
    photo_url: null,
  },
  {
    id: 4,
    full_name: 'Brother Cyprian Kabanza',
    role: 'treasurer',
    display_role: 'Church Treasurer',
    bio: 'Brother Kabanza oversees the church finances with integrity and transparency. He is a certified accountant and has served in this role for 8 years.',
    email: 'treasurer@golanisda.org',
    photo_url: null,
  },
  {
    id: 5,
    full_name: 'Br. Yoeza Kilenga',
    role: 'other',
    display_role: 'Stewardship Leader',
    bio: 'Brother Yoeza leads the youth and young adult ministry with energy and vision. He is dedicated to nurturing the next generation of Adventist leaders.',
    email: 'youth@golanisda.org',
    photo_url: null,
  },
  {
    id: 6,
    full_name: 'Elder Peter Boniface',
    role: 'elder',
    display_role: 'Church Elder',
    bio: 'Elder Peter coordinates all community service programs, health fairs, and mission initiatives. He has a heart for the least and the lost.',
    email: 'outreach@golanisda.org',
    photo_url: null,
  },
]