/*
 * The public site treats worship as a weekly rhythm, not a one-off event.
 * Keep this structure compatible with a future Django Service/Worship model.
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