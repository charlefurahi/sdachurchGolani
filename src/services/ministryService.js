import api from './api'

const ministryService = {
  getAll (params = {}) {
    return api.get('/ministries/', {
      params
    })
  },

  getById (id) {
    return api.get(`/ministries/${id}/`)
  }
}

export default ministryService