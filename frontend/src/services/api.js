import axios from 'axios'

// URL de base du backend
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
})

// Ajoute automatiquement le token JWT à chaque requête
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('immogest_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Si le token expire → redirige vers login automatiquement
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('immogest_token')
      localStorage.removeItem('immogest_user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ── AUTH ──────────────────────────────────────────
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login:    (data) => API.post('/auth/login', data),
  profile:  ()     => API.get('/auth/profile'),
}

// ── BIENS ─────────────────────────────────────────
export const bienAPI = {
  getAll:  ()         => API.get('/biens'),
  getById: (id)       => API.get(`/biens/${id}`),
  create:  (data)     => API.post('/biens', data),
  update:  (id, data) => API.put(`/biens/${id}`, data),
  delete:  (id)       => API.delete(`/biens/${id}`),
}

// ── LOCATAIRES ────────────────────────────────────
export const locataireAPI = {
  getAll:  ()     => API.get('/locataires'),
  getById: (id)   => API.get(`/locataires/${id}`),
  create:  (data) => API.post('/locataires', data),
}

// ── CONTRATS ──────────────────────────────────────
export const contratAPI = {
  getAll:   ()     => API.get('/contrats'),
  create:   (data) => API.post('/contrats', data),
  terminer: (id)   => API.put(`/contrats/${id}/terminer`),
}

// ── PAIEMENTS ─────────────────────────────────────
export const paiementAPI = {
  getAll:   ()     => API.get('/paiements'),
  getMiens: ()     => API.get('/paiements/mes-paiements'),
  create:   (data) => API.post('/paiements', data),
}

// ── MAINTENANCE ───────────────────────────────────
export const maintenanceAPI = {
  getAll:       ()           => API.get('/maintenance'),
  create:       (data)       => API.post('/maintenance', data),
  updateStatut: (id, statut) => API.put(`/maintenance/${id}/statut`, { statut }),
}

// ── DOCUMENTS ─────────────────────────────────────
export const documentAPI = {
  getAll: ()   => API.get('/documents'),
  delete: (id) => API.delete(`/documents/${id}`),
}