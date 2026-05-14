import api from './api'

export default {
  send:        (data)  => api.post('/contact', data),
  subscribe:   (email) => api.post('/newsletter/subscribe', { email }),
  unsubscribe: (email) => api.post('/newsletter/unsubscribe', { email }),
}