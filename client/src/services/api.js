import axios from "axios";

const API_URL = "/api";

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const auth = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

// User endpoints
export const users = {
  getProfile: (id) => api.get(`/users/${id}`),
  search: (query) => api.get(`/users/search/${query}`),
  follow: (id) => api.post(`/users/${id}/follow`),
};

// Post endpoints
export const posts = {
  getAll: () => api.get("/posts"),
  create: (data) => api.post("/posts", data),
  like: (id) => api.post(`/posts/${id}/like`),
  getComments: (id) => api.get(`/posts/${id}/comments`),
  addComment: (id, data) => api.post(`/posts/${id}/comments`, data),
};

export default api;
