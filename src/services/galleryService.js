import api from './api'

const multipart = { headers: { 'Content-Type': 'multipart/form-data' } }

export default {
  // Albums
  getAlbums:      (params) => api.get('/gallery/albums/', { params }),
  getAlbumById:   (id)     => api.get(`/gallery/albums/${id}/`),
  createAlbum:    (data)   => data instanceof FormData ? api.post('/gallery/albums/', data, multipart) : api.post('/gallery/albums/', data),
  updateAlbum:    (id, d)  => d instanceof FormData ? api.patch(`/gallery/albums/${id}/`, d, multipart) : api.patch(`/gallery/albums/${id}/`, d),
  deleteAlbum:    (id)     => api.delete(`/gallery/albums/${id}/`),

  // Categories
  getCategories:  ()       => api.get('/gallery/categories/'),
  createCategory: (data)   => api.post('/gallery/categories/', data),

  // Photos
  getPhotos:      (params) => api.get('/gallery/photos/', { params }),
  uploadPhoto:    (data)   => api.post('/gallery/photos/', data, multipart),
  deletePhoto:    (id)     => api.delete(`/gallery/photos/${id}/`),
  updatePhoto:    (id, d)  => api.patch(`/gallery/photos/${id}/`, d),

  // Bulk photo upload to an album
  uploadPhotosToAlbum: (albumId, files) => {
    const fd = new FormData()
    files.forEach(f => fd.append('photos', f))
    fd.append('album', albumId)
    return api.post('/gallery/photos/bulk/', fd, multipart)
  },
}
