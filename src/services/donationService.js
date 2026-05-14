import api from './api'

export default {
  getCampaigns: ()      => api.get('/donations/campaigns'),
  donate:       (data)  => api.post('/donations/give', data),
  getReceipt:   (id)    => api.get(`/donations/receipt/${id}`),
  getHistory:   ()      => api.get('/donations/history'),
}