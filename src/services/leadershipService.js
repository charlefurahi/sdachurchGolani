import api from './api'

const multipart = { headers: { 'Content-Type': 'multipart/form-data' } }

export default {
  getAll:    (params) => api.get('/leadership/leaders/', { params }),
  getById:   (id)     => api.get(`/leadership/leaders/${id}/`),
  create:    (data)   => data instanceof FormData ? api.post('/leadership/leaders/', data, multipart) : api.post('/leadership/leaders/', data),
  update:    (id, d)  => d instanceof FormData ? api.patch(`/leadership/leaders/${id}/`, d, multipart) : api.patch(`/leadership/leaders/${id}/`, d),
  delete:    (id)     => api.delete(`/leadership/leaders/${id}/`),
  submitInquiry:  (data) => api.post('/leadership/inquiries/', data),
  getInquiries:   ()     => api.get('/leadership/inquiries/'),
}
