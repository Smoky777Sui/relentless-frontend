import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && window.location.pathname.startsWith('/admin')) {
      localStorage.removeItem('admin_token')
      window.location.href = '/admin/login'
    }
    return Promise.reject(err)
  }
)

// Podcasts
export const getPodcasts = () => api.get('/podcasts').then(r => r.data)
export const getFeaturedPodcast = () => api.get('/podcasts/featured').then(r => r.data)
export const getPodcast = (id) => api.get(`/podcasts/${id}`).then(r => r.data)
export const createPodcast = (data) => api.post('/podcasts', data).then(r => r.data)
export const updatePodcast = (id, data) => api.put(`/podcasts/${id}`, data).then(r => r.data)
export const deletePodcast = (id) => api.delete(`/podcasts/${id}`).then(r => r.data)

// Blogs
export const getBlogs = () => api.get('/blogs').then(r => r.data)
export const getBlog = (id) => api.get(`/blogs/${id}`).then(r => r.data)
export const createBlog = (data) => api.post('/blogs', data).then(r => r.data)
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data).then(r => r.data)
export const deleteBlog = (id) => api.delete(`/blogs/${id}`).then(r => r.data)

// Guests
export const submitGuestApp = (data) => api.post('/guests', data).then(r => r.data)
export const getGuests = () => api.get('/guests').then(r => r.data)
export const getGuest = (id) => api.get(`/guests/${id}`).then(r => r.data)
export const updateGuestStatus = (id, status) => api.patch(`/guests/${id}/status`, { status }).then(r => r.data)
export const deleteGuest = (id) => api.delete(`/guests/${id}`).then(r => r.data)

// Auth
export const login = (data) => api.post('/auth/login', data).then(r => r.data)
export const getMe = () => api.get('/auth/me').then(r => r.data)

// Upload
export const uploadImage = (formData) => api.post('/upload/image', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
}).then(r => r.data)

export default api
