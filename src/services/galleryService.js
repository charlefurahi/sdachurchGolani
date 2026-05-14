import api from './api'

export default {
  getAlbums:   (params) => api.get('/gallery/albums', { params }),
  getAlbum:    (id)     => api.get(`/gallery/albums/${id}`),

  // Admin
  createAlbum: (data)           => api.post('/gallery/albums', data),
  updateAlbum: (id, data)       => api.patch(`/gallery/albums/${id}`, data),
  deleteAlbum: (id)             => api.delete(`/gallery/albums/${id}`),
  uploadPhotos: (albumId, formData) => api.post(
    `/gallery/albums/${albumId}/photos`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  ),
  deletePhoto: (id) => api.delete(`/gallery/photos/${id}`),
}