import api from './api'

export default {
  send:                 (data) => api.post('/contact/', data),
  getMessages:          (p)    => api.get('/contact/admin/', { params: p }),
  markRead:             (id)   => api.patch(`/contact/admin/${id}/`, { is_read: true }),
  subscribeNewsletter:  (data) => api.post('/contact/newsletter/subscribe/', data),
  unsubscribeNewsletter:(data) => api.post('/contact/newsletter/unsubscribe/', data),
}
