/**
 * Events — demo/seed data.
 *
<<<<<<< HEAD
 * Used for local preview and when the events service cannot be reached.
 * A live backend response, including an empty list, is used as-is.
=======
 * Used as an API-fallback only: pages call the matching *Service.js first;
 * this file supplies content when the API has no records yet (e.g. during
 * early setup or local development without a backend). Once the API is
 * returning real records, this file is never read.
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
 */

export const serviceTimes = [ 
  { name: 'Sabbath Worship', day: 'Every Saturday', time: '08:00 AM - 06:00 PM' },
  { name: 'Friday Vesper', day: 'Every Friday', time: '05:00 - 06:00 PM' },
  { name: 'Prayer Session (Via Google Meet)', day: 'Every Wednesday', time: '05:00 - 05:30 AM'},
  { name: 'Prayer Session (Physical)', day: 'Every Wednesday', time: '05:00 - 06:00 PM' },
]

export const eventCategories   = [
<<<<<<< HEAD
  { id: 1, name: 'Worship Service', color: '#c9a227', icon: '' },
  { id: 2, name: 'Youth Program', color: '#c9a227', icon: '' },
  { id: 3, name: 'Community Outreach', color: '#c9a227', icon: '' },
  { id: 4, name: 'Bible Study', color: '#c9a227', icon: '' },
  { id: 5, name: 'Sabbath School', color: '#c9a227', icon: '' },
  { id: 6, name: 'Prayer Meeting', color: '#c9a227', icon: '' },
=======
  { id: 1, name: 'Sabbath Worship',    color: '#f4d03f', icon: '' },
  { id: 2, name: 'Friday Vesper',      color: '#f4d03f', icon: '' },
  { id: 3, name: 'Prayer Session (Via Google Meet)', color: '#f4d03f', icon: '' },
  { id: 4, name: 'Prayer Session (Physical)',        color: '#f4d03f', icon: '' },
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
]

export const events = [
  {
    id: 1,
    title: 'Sabbath Morning Worship',
    subtitle: 'Weekly Corporate Worship',
<<<<<<< HEAD
    category: 'Worship Service',
    category_name: 'Worship Service',
    date: '2027-01-02',
    start_date: '2027-01-02T09:00:00',
=======
    category: 1,
    category_name: 'Worship Service',
    date: '2026-05-24',
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
    start_time: '09:00',
    end_time: '12:00',
    location: 'Golani SDA Church',
    description: 'Join us every Sabbath for a spirit-filled worship experience with praise, prayer, and the Word of God. All are welcome.',
<<<<<<< HEAD
    is_featured: true,
=======
    is_featured: false,
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
    bible_verse: 'Psalm 122:1 — "I was glad when they said to me, Let us go to the house of the LORD."',
    speaker_name: 'Yoeza Kilenga',
    image: null,
    registration_required: false,
<<<<<<< HEAD
    rsvp_required: false,
=======
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  },
  {
    id: 2,
    title: 'Youth Camp Meeting 2026',
    subtitle: 'Ignite Your Faith',
<<<<<<< HEAD
    category: 'Youth Program',
    category_name: 'Youth Program',
    date: '2027-06-06',
    start_date: '2027-06-06T08:00:00',
=======
    category: 2,
    category_name: 'Youth Program',
    date: '2026-06-07',
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
    start_time: '08:00',
    end_time: '17:00',
    location: 'Golani Church Grounds',
    description: 'A powerful one-day youth gathering designed to deepen faith, build community, and equip young people for service. Expect worship, workshops, and fun.',
    is_featured: false,
    speaker_name: 'Edson Mauga',
    image: null,
    registration_required: true,
<<<<<<< HEAD
    rsvp_required: true,
=======
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  },
  {
    id: 3,
    title: 'Community Health Fair',
    subtitle: 'Whole-Person Wellness',
<<<<<<< HEAD
    category: 'Community Outreach',
    category_name: 'Community Outreach',
    date: '2027-06-13',
    start_date: '2027-06-13T08:00:00',
=======
    category: 3,
    category_name: 'Community Outreach',
    date: '2026-06-14',
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
    start_time: '08:00',
    end_time: '14:00',
    location: 'Church Grounds & Parking Area',
    description: 'Free health screenings, nutrition guidance, prayer, and community fellowship. Open to the entire Golani community. Bring your family!',
    is_featured: false,
    image: null,
    registration_required: false,
<<<<<<< HEAD
    rsvp_required: false,
=======
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  },
  {
    id: 4,
    title: 'Wednesday Bible Study',
    subtitle: 'Deep Dive into Scripture',
<<<<<<< HEAD
    category: 'Bible Study',
    category_name: 'Bible Study',
    date: '2027-01-06',
    start_date: '2027-01-06T18:30:00',
=======
    category: 4,
    category_name: 'Bible Study',
    date: '2026-05-27',
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
    start_time: '18:30',
    end_time: '20:00',
    speaker_name: 'Pastory Makoye',
    location: 'Golani SDA Church',
    description: 'Join us mid-week for an in-depth study of the Scriptures led by our elders. This week: The Book of Daniel, Chapter 7.',
    is_featured: false,
    image: null,
    registration_required: false,
<<<<<<< HEAD
    rsvp_required: false,
=======
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  },
  {
    id: 5,
    title: 'Sabbath School Teachers Training',
    subtitle: 'Equipping Educators',
<<<<<<< HEAD
    category: 'Sabbath School',
    category_name: 'Sabbath School',
    date: '2027-01-09',
    start_date: '2027-01-09T09:00:00',
=======
    category: 5,
    category_name: 'Sabbath School',
    date: '2026-05-30',
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
    start_time: '09:00',
    end_time: '12:00',
    location: 'Golani SDA Church',
    description: 'Training session for all Sabbath School teachers and leaders. Topics include curriculum planning, classroom management, and spiritual formation.',
    is_featured: false,
    image: null,
    registration_required: true,
<<<<<<< HEAD
    rsvp_required: true,
=======
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  },
  {
    id: 6,
    title: 'Prayer & Fasting Weekend',
    subtitle: 'Seeking God Together',
<<<<<<< HEAD
    category: 'Prayer Meeting',
    category_name: 'Prayer Meeting',
    date: '2027-01-15',
    start_date: '2027-01-15T18:00:00',
=======
    category: 6,
    category_name: 'Prayer Meeting',
    date: '2026-06-20',
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
    start_time: '18:00',
    end_time: '20:00',
    location: 'Golani SDA Church',
    description: 'A dedicated weekend of corporate prayer and fasting. Come with your prayer burdens and expectant faith. God answers prayer!',
    is_featured: false,
    image: null,
    registration_required: false,
<<<<<<< HEAD
    rsvp_required: false,
=======
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
  },
]

export const CATEGORY_COLORS = {
  'Worship Service':    '#f4d03f',
  'Youth Program':      '#f4d03f',
  'Community Outreach': '#f4d03f',
  'Bible Study':        '#f4d03f',
  'Sabbath School':     '#f4d03f',
  'Evangelism':         '#f4d03f',
  'Prayer Meeting':     '#f4d03f',
  'Camp Meeting':       '#f4d03f',
  'Social':             '#f4d03f',
  'Family':             '#f4d03f',
<<<<<<< HEAD
}
=======
}
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
