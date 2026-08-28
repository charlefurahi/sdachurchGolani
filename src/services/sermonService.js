import api from './api'

const multipart = { headers: { 'Content-Type': 'multipart/form-data' } }

export default {
  getAll:      (params) => api.get('/sermons/', { params }),
  getById:     (id)     => api.get(`/sermons/${id}/`),
  getFeatured: ()       => api.get('/sermons/featured/'),
  search:      (q)      => api.get('/sermons/', { params: { search: q } }),
  getCategories: ()     => api.get('/sermons/categories/'),
  getSpeakers:   ()     => api.get('/sermons/speakers/'),

  create: (data) =>
    data instanceof FormData
      ? api.post('/sermons/', data, multipart)
      : api.post('/sermons/', data),

  update: (id, data) =>
    data instanceof FormData
      ? api.patch(`/sermons/${id}/`, data, multipart)
      : api.patch(`/sermons/${id}/`, data),

  delete: (id) => api.delete(`/sermons/${id}/`),
}
