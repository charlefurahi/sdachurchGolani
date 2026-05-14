import api from './api'

export default {
  getAll:  (params) => api.get('/announcements', { params }),
  getById: (id)     => api.get(`/announcements/${id}`),

  // Admin
  create: (data)     => api.post('/announcements', data),
  update: (id, data) => api.patch(`/announcements/${id}`, data),
  delete: (id)       => api.delete(`/announcements/${id}`),
}