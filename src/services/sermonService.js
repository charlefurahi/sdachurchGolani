import api from './api'

export default {
  getAll:      (params) => api.get('/sermons', { params }),
  getById:     (id)     => api.get(`/sermons/${id}`),
  getFeatured: ()       => api.get('/sermons/featured'),
  search:      (query)  => api.get('/sermons/search', { params: { q: query } }),
  getCategories: ()     => api.get('/sermons/categories'),
  getSpeakers:   ()     => api.get('/sermons/speakers'),

  // Admin
  create: (data)     => api.post('/sermons', data),
  update: (id, data) => api.patch(`/sermons/${id}`, data),
  delete: (id)       => api.delete(`/sermons/${id}`),
}