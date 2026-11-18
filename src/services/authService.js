import api from './api'

export default {
  login:    (data)  => api.post('/auth/login/', data),
  register: (data)  => api.post('/auth/register/', data),
  logout:   (data)  => api.post('/auth/logout/', data),
  refresh:  (data)  => api.post('/auth/token/refresh/', data),
  me:       ()      => api.get('/auth/me/'),
  getProfile: ()    => api.get('/auth/me/'),   // alias used by store
  updateProfile: (data) =>
    data instanceof FormData
      ? api.patch('/auth/me/', data, { headers: { 'Content-Type': 'multipart/form-data' } })
      : api.patch('/auth/me/', data),
  changePassword:   (data) => api.post('/auth/change-password/', data),
  forgotPassword:   (data) => api.post('/auth/password-reset/', data),
  resetPassword:    (data) => api.post('/auth/password-reset/confirm/', data),
}
