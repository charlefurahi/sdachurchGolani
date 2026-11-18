/*
 * The public site treats worship as a weekly rhythm, not a one-off event.
 * Keep this structure compatible with a future Django Service/Worship model.
<<<<<<< HEAD
 *
 * mode: 'Physical' | 'Virtual'
 * location: shown for physical gatherings (e.g. 'Golani')
 * joinUrl: shown as a "Join" action for virtual gatherings only
 */
export const defaultServices = [
  {
    key: 'saturday-physical',
    name: 'Sabbath Service',
    day: 'Saturday',
    startTime: '08:00',
    endTime: '18:00',
    mode: 'Physical',
    location: 'Golani',
    joinUrl: null,
  },
  {
    key: 'wednesday-virtual-morning',
    name: 'Prayer Meeting',
    day: 'Wednesday',
    startTime: '05:00',
    endTime: '05:30',
    mode: 'Virtual',
    location: null,
    joinUrl: 'https://meet.google.com/khq-naxx-pta',
  },
  {
    key: 'wednesday-physical-evening',
    name: 'Prayer Meeting',
    day: 'Wednesday',
    startTime: '18:00',
    endTime: '18:30',
    mode: 'Physical',
    location: 'Golani',
    joinUrl: null,
  },
  {
    key: 'friday-virtual',
    name: 'Vespers',
    day: 'Friday',
    startTime: '18:00',
    endTime: '18:30',
    mode: 'Virtual',
    location: null,
    joinUrl: 'https://meet.google.com/khq-naxx-pta',
  },
]
=======
 */
export const defaultServices = [
  {
    key: 'sabbath-school',
    name: 'Sabbath School',
    day: 'Saturday',
    startTime: '09:00',
    endTime: null,
    type: 'worship',
    onlineAvailable: false,
  },
  {
    key: 'divine-worship',
    name: 'Divine Worship',
    day: 'Saturday',
    startTime: '11:00',
    endTime: null,
    type: 'worship',
    onlineAvailable: false,
  },
  {
    key: 'afternoon-program',
    name: 'Afternoon Program',
    day: 'Saturday',
    startTime: '16:30',
    endTime: null,
    type: 'fellowship',
    onlineAvailable: false,
  },
  {
    key: 'prayer-meeting',
    name: 'Prayer Meeting',
    day: 'Wednesday',
    startTime: '18:00',
    endTime: null,
    type: 'prayer',
    onlineAvailable: false,
  },
  {
    key: 'vespers',
    name: 'Vespers',
    day: 'Friday',
    startTime: '18:00',
    endTime: null,
    type: 'worship',
    onlineAvailable: false,
  },
]
>>>>>>> 91573f2cbf9e6e54880aca85d3cd70eaf6edcee7
