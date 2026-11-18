import api from './api'

export default {
  getAll:        (params)   => api.get('/events/', { params }),
  getById:       (id)       => api.get(`/events/${id}/`),
  getUpcoming:   (params)   => api.get('/events/upcoming/', { params }),
  getAllEvents:   (params)   => api.get('/events/all_events/', { params }),
  getPast:       (params)   => api.get('/events/past/', { params }),
  getFeatured:   ()         => api.get('/events/featured/'),
  getCategories: ()         => api.get('/events/categories/'),
  rsvp:          (id, data) => api.post(`/events/${id}/rsvp/`, data),
  getRsvps:      (id)       => api.get(`/events/${id}/rsvps/`),

  create: (data) =>
    data instanceof FormData
      ? api.post('/events/', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      : api.post('/events/', data),

  update: (id, data) =>
    data instanceof FormData
      ? api.patch(`/events/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      : api.patch(`/events/${id}/`, data),

  delete: (id) => api.delete(`/events/${id}/`),
}
