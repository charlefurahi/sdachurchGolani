import api from './api'

export default {
  getAll:      (params) => api.get('/events', { params }),
  getById:     (id)     => api.get(`/events/${id}`),
  getUpcoming: (params) => api.get('/events/upcoming', { params }),
  getPast:     (params) => api.get('/events/past', { params }),
  getCategories: ()     => api.get('/events/categories'),
  rsvp:        (id, data) => api.post(`/events/${id}/rsvp`, data),

  // Admin
  create: (data)     => api.post('/events', data),
  update: (id, data) => api.patch(`/events/${id}`, data),
  delete: (id)       => api.delete(`/events/${id}`),
  getRsvps: (id)     => api.get(`/events/${id}/rsvps`),
}