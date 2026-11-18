import api from './api'

export default {
  getAll:       (params) => api.get('/donations/', { params }),
  create:       (data)   => api.post('/donations/', data),
  getStats:     ()       => api.get('/donations/stats/'),
  verify:       (ref)    => api.post('/donations/verify/', { reference: ref }),
  getCampaigns: (params) => api.get('/donations/campaigns/', { params }),
}
