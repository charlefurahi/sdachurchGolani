/*
 * The public site treats worship as a weekly rhythm, not a one-off event.
 * Keep this structure compatible with a future Django Service/Worship model.
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
