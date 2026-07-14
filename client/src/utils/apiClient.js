import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const adminAuthApi = {
  signup: (payload) => apiClient.post('/api/admin/signup', payload),
  login: (payload) => apiClient.post('/api/admin/login', payload),
};

export const studentAuthApi = {
  signup: (payload) => apiClient.post('/api/student/signup', payload),
  login: (payload) => apiClient.post('/api/student/login', payload),
};

export const legacyAuthApi = {
  signup: (payload) => apiClient.post('/api/auth/signup', payload),
  login: (payload) => apiClient.post('/api/auth/login', payload),
};

export const inquiryApi = {
  submit: (payload) => apiClient.post('/api/inquiries/submit', payload),
  getAll: (params) => apiClient.get('/api/inquiries', { params }),
  getById: (id) => apiClient.get(`/api/inquiries/${id}`),
  updateStatus: (id, status) => apiClient.put(`/api/inquiries/${id}`, { status }),
  delete: (id) => apiClient.delete(`/api/inquiries/${id}`),
};

export default apiClient;
