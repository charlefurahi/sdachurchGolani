import api from './api'

// NOTE: api.js response interceptor already unwraps `response.data` for
// every successful response. Do NOT add .then(r => r.data) here — that
// would double-unwrap and return undefined (data.data doesn't exist).
// All other services (auth, event, sermon, etc.) follow this same pattern.

const multipart = { headers: { 'Content-Type': 'multipart/form-data' } }

export default {
  getAll:   (params) => api.get('/announcements/', { params }),
  getById:  (id)     => api.get(`/announcements/${id}/`),

  create: (data) =>
    data instanceof FormData
      ? api.post('/announcements/', data, multipart)
      : api.post('/announcements/', data),

  update: (id, d) =>
    d instanceof FormData
      ? api.patch(`/announcements/${id}/`, d, multipart)
      : api.patch(`/announcements/${id}/`, d),

  delete: (id) => api.delete(`/announcements/${id}/`),

  // Explicit multipart aliases for admin forms
  createMultipart: (data) => api.post('/announcements/', data, multipart),
  updateMultipart: (id, d) => api.patch(`/announcements/${id}/`, d, multipart),
}
